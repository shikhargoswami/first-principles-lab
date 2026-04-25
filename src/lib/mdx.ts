import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');
const coursesDirectory = path.join(process.cwd(), 'src/content/courses');

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  domain: string;
  tags: string[];
  published: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
  readingTime: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));

  const posts = fileNames.map(fileName => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const slug = fileName.replace(/\.mdx$/, '');
    const reading = readingTime(content);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      domain: data.domain || '',
      tags: data.tags || [],
      published: data.published !== false,
      level: data.level || 'beginner',
      readingTime: reading.text,
    } as Post;
  });

  // Sort by date, newest first
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllDomains(): string[] {
  const posts = getAllPosts();
  const domains = new Set(posts.map(post => post.domain));
  return Array.from(domains).sort();
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export interface CourseLesson {
  slug: string;
  title: string;
  description: string;
  date: string;
  domain: string;
  tags: string[];
  published: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
  readingTime: string;
  courseTitle?: string;
  lessonNumber?: number;
  totalLessons?: number;
  content?: string;
}

export function getCourseLessons(courseDomain: string): CourseLesson[] {
  const courseDir = path.join(coursesDirectory, courseDomain);

  if (!fs.existsSync(courseDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(courseDir).filter(file => file.endsWith('.mdx'));

  const lessons = fileNames.map(fileName => {
    const filePath = path.join(courseDir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const slug = fileName.replace(/\.mdx$/, '');
    const reading = readingTime(content);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      domain: data.domain || '',
      tags: data.tags || [],
      published: data.published !== false,
      level: data.level || 'beginner',
      readingTime: reading.text,
      courseTitle: data.courseTitle || '',
      lessonNumber: data.lessonNumber !== undefined ? data.lessonNumber : 0,
      totalLessons: data.totalLessons || 0,
    } as CourseLesson;
  });

  return lessons.filter(lesson => lesson.published).sort((a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0));
}

export async function getCourseLessonContent(courseDomain: string, lessonSlug: string): Promise<CourseLesson & { contentSource?: any }> {
  const courseDir = path.join(coursesDirectory, courseDomain);
  const filePath = path.join(courseDir, `${lessonSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Lesson not found: ${lessonSlug}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const reading = readingTime(content);

  // Compile MDX
  let compiledContent = null;
  try {
    compiledContent = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
    });
  } catch (e) {
    console.error(`Failed to compile MDX for ${lessonSlug}:`, e);
  }

  return {
    slug: lessonSlug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || '',
    domain: data.domain || '',
    tags: data.tags || [],
    published: data.published !== false,
    level: data.level || 'beginner',
    readingTime: reading.text,
    courseTitle: data.courseTitle || '',
    lessonNumber: data.lessonNumber !== undefined ? data.lessonNumber : 0,
    totalLessons: data.totalLessons || 0,
    contentSource: compiledContent,
  };
}
