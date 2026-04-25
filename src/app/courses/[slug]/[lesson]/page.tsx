import Link from 'next/link';
import { getCourseLessonContent, getCourseLessons } from '@/lib/mdx';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug: courseSlug, lesson: lessonSlug } = await params;

  try {
    const lesson = await getCourseLessonContent(courseSlug, lessonSlug);
    const allLessons = getCourseLessons(courseSlug);
    const currentIndex = allLessons.findIndex(l => l.slug === lessonSlug);
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    const courseMetadata: Record<string, { title: string; emoji: string; }> = {
      'product-management': {
        title: 'Product Management from First Principles',
        emoji: '🧭',
      },
      'finance': {
        title: 'Finance & Investing from First Principles',
        emoji: '📈',
      },
      'gita': {
        title: 'Bhagavad Gita from First Principles',
        emoji: '🔥',
      },
    };

    const courseMeta = courseMetadata[courseSlug as keyof typeof courseMetadata];

    return (
      <main className="min-h-screen bg-white">
        {/* BREADCRUMB & HEADER */}
        <div className="border-b border-gray-100 sticky top-0 bg-white z-40">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/courses" className="hover:text-teal-600">
                Courses
              </Link>
              <span>/</span>
              <Link href={`/courses/${courseSlug}`} className="hover:text-teal-600">
                {courseMeta?.title}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate">{lesson.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase text-teal-600 mb-2">
                  Lesson {lesson.lessonNumber} of {lesson.totalLessons}
                </p>
              </div>
              <span className="text-sm text-gray-500">{lesson.readingTime}</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <article className="max-w-3xl mx-auto px-6 py-16">
          {/* TITLE */}
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">{lesson.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{lesson.description}</p>
          </header>

          {/* MDX CONTENT */}
          {lesson.contentSource ? (
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-600 hover:prose-a:text-teal-700 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-strong:font-bold prose-strong:text-gray-900 mb-12">
              {/* Render the compiled MDX content */}
              {lesson.contentSource.content && (
                <div dangerouslySetInnerHTML={{ __html: lesson.contentSource.content as any }} />
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600 mb-12">
              <p>Content loading...</p>
            </div>
          )}
        </article>

        {/* NAVIGATION */}
        <nav className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
          <div className="grid sm:grid-cols-2 gap-4">
            {prevLesson ? (
              <Link
                href={`/courses/${courseSlug}/${prevLesson.slug}`}
                className="p-4 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all group text-left"
              >
                <p className="text-xs text-gray-500 mb-2">← Previous lesson</p>
                <p className="font-semibold group-hover:text-teal-600 transition-colors">{prevLesson.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link
                href={`/courses/${courseSlug}/${nextLesson.slug}`}
                className="p-4 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all group text-right sm:col-start-2"
              >
                <p className="text-xs text-gray-500 mb-2">Next lesson →</p>
                <p className="font-semibold group-hover:text-teal-600 transition-colors">{nextLesson.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/courses/${courseSlug}`}
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              ← Back to {courseMeta?.title}
            </Link>
          </div>
        </nav>
      </main>
    );
  } catch (error) {
    console.error('Error loading lesson:', error);
    return (
      <main className="min-h-screen bg-white px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Lesson not found</h1>
          <Link href={`/courses/${courseSlug}`} className="text-teal-600 hover:text-teal-700 font-semibold">
            ← Back to course
          </Link>
        </div>
      </main>
    );
  }
}
