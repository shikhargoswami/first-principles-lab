import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

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
