import Link from 'next/link';

const coursesConfig: Record<string, { emoji: string; title: string; description: string; color: string; }> = {
  'product-management': {
    emoji: '🧭',
    title: 'Product Management from First Principles',
    description: 'Master product thinking from atomic truths. From "what is a product?" to shipping features that move metrics.',
    color: 'border-teal-200 bg-teal-50 hover:border-teal-400',
  },
  'finance': {
    emoji: '📈',
    title: 'Finance & Investing from First Principles',
    description: 'From time-value of money to building wealth from atomic truth.',
    color: 'border-blue-200 bg-blue-50 hover:border-blue-400',
  },
  'gita': {
    emoji: '🔥',
    title: 'Bhagavad Gita from First Principles',
    description: 'Ancient operating system for decisions, rebuilt from atomic truths.',
    color: 'border-orange-200 bg-orange-50 hover:border-orange-400',
  },
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <section className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
          Pick a domain.<br />
          <span className="text-teal-600">Go deep.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          Every course starts from irreducible atomic truths and builds upward. Not frameworks. Not summaries. The mechanics of how things actually work.
        </p>
      </section>

      {/* COURSES GRID */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(coursesConfig).map(([slug, config]) => (
            <Link
              key={slug}
              href={`/courses/${slug}`}
              className={`block p-8 rounded-2xl border-2 transition-all group ${config.color}`}
            >
              <span className="text-5xl mb-4 block">{config.emoji}</span>
              <h2 className="font-bold text-lg mb-3 group-hover:text-teal-700 transition-colors">{config.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{config.description}</p>
              <span className="text-teal-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                Start course →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20 px-6 bg-gray-950 text-white mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why These Courses</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Most learning reverses the natural order. It starts with frameworks and forces you to memorize their applications. This doesn't build understanding—it builds fragility.
          </p>
          <p className="text-teal-400 font-semibold">
            We start from the ground up. From atomic truths. So you understand not just what to do, but why.
          </p>
        </div>
      </section>
    </main>
  );
}
