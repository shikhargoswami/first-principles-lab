import Link from 'next/link';
import { getCourseLessons } from '@/lib/mdx';

const courseMetadata: Record<string, { title: string; emoji: string; description: string; }> = {
  'product-management': {
    title: 'Product Management from First Principles',
    emoji: '🧭',
    description: 'Master product thinking from atomic truths. Understand the irreducible foundations that make products work.',
  },
  'finance': {
    title: 'Finance & Investing from First Principles',
    emoji: '📈',
    description: 'Build wealth on atomic truths, not tips. Understand the mechanics from first principles.',
  },
  'gita': {
    title: 'Bhagavad Gita from First Principles',
    emoji: '🔥',
    description: 'Ancient wisdom rebuilt from atomic truths. A decision-making operating system.',
  },
};

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: courseSlug } = await params;
  const metadata = courseMetadata[courseSlug as keyof typeof courseMetadata];
  const lessons = getCourseLessons(courseSlug);

  if (!metadata) {
    return (
      <main className="min-h-screen bg-white px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Course not found</h1>
          <Link href="/courses" className="text-teal-600 hover:text-teal-700 font-semibold">
            ← Back to courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <section className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
        <Link href="/courses" className="text-teal-600 hover:text-teal-700 font-semibold mb-6 inline-block">
          ← All courses
        </Link>
        <div className="mb-8">
          <span className="text-6xl block mb-4">{metadata.emoji}</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">{metadata.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">{metadata.description}</p>
        </div>
      </section>

      {/* LESSONS */}
      {lessons.length > 0 ? (
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-sm font-mono uppercase text-gray-500 mb-4">Course content</p>
            <h2 className="text-3xl font-bold mb-8">
              {lessons.length} lessons
            </h2>
          </div>
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.slug}
                href={`/courses/${courseSlug}/${lesson.slug}`}
                className="flex items-start gap-6 p-6 border border-gray-100 rounded-2xl hover:border-teal-300 hover:shadow-lg transition-all group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center font-bold text-teal-600">
                    {index}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wide bg-teal-50 text-teal-700 px-2 py-1 rounded">
                      {lesson.level}
                    </span>
                    <span className="text-xs text-gray-400">{lesson.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-teal-600 transition-colors leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{lesson.description}</p>
                </div>
                <span className="text-teal-600 font-bold text-xl shrink-0 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Coming soon. More lessons are being prepared.</p>
            <Link href="/courses" className="text-teal-600 hover:text-teal-700 font-semibold">
              ← Back to courses
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
