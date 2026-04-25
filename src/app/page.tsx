import Link from 'next/link';
import { getAllPosts, getAllDomains } from '@/lib/mdx';

const domainConfig: Record<string, { emoji: string; color: string; label: string; tagline: string }> = {
  'product-management': {
    emoji: '🧭',
    color: 'border-teal-200 bg-teal-50 hover:border-teal-400',
    label: 'Product Management',
    tagline: 'From "what is a product?" to shipping features that move metrics.',
  },
  'finance': {
    emoji: '📈',
    color: 'border-blue-200 bg-blue-50 hover:border-blue-400',
    label: 'Finance & Investing',
    tagline: 'From time-value of money to building wealth from atomic truth.',
  },
  'gita': {
    emoji: '🔥',
    color: 'border-orange-200 bg-orange-50 hover:border-orange-400',
    label: 'Bhagavad Gita',
    tagline: 'Ancient operating system for decisions, rebuilt from first principles.',
  },
};

export default function Home() {
  let recentPosts: ReturnType<typeof getAllPosts> = [];
  try { recentPosts = getAllPosts().slice(0, 3); } catch {}

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="min-h-[88vh] flex flex-col justify-center px-6 max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-6">
            Free · No signup · No fluff
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Stop memorizing.<br />
            <span className="text-teal-600">Start deriving.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl leading-relaxed mb-10">
            Every domain — Product Management, Finance, the Gita — taught from its{' '}
            <strong className="text-gray-700">irreducible atomic truth</strong> upward.
            Not definitions. Not summaries. The actual mechanics of how things work.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/courses/product-management" className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
              Start Learning Free →
            </Link>
            <Link href="/blog" className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-teal-400 hover:text-teal-600 transition-all">
              Read Daily Posts
            </Link>
          </div>
        </div>
      </section>

      {/* WHY OTHER COURSES FAIL */}
      <section className="py-28 bg-gray-950 text-white px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-6">Why every other course fails you</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 max-w-2xl leading-tight">
            Most learning is just expensive memorization.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800">
              <p className="text-red-400 font-mono text-xs tracking-widest uppercase mb-4">✗ The old way</p>
              <ul className="space-y-4 text-gray-300 text-lg">
                {['Teaches you what to think','Frameworks to memorize and forget','You pass a test, then nothing sticks','Cannot adapt when reality differs from slides'].map(item => (
                  <li key={item} className="flex gap-3"><span className="text-gray-600 mt-1">→</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-teal-950 border border-teal-800">
              <p className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-4">✓ First Principles Lab</p>
              <ul className="space-y-4 text-gray-200 text-lg">
                {['Teaches you how to think','Derives every framework from atomic truth','You can recreate any answer from scratch','Works in any real-world situation, forever'].map(item => (
                  <li key={item} className="flex gap-3"><span className="text-teal-500 mt-1">→</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE METHOD */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-teal-600 uppercase mb-4">The method</p>
          <h2 className="text-4xl font-bold mb-16 max-w-xl leading-tight">Every topic has a master equation.</h2>
          <div className="bg-gray-950 rounded-3xl p-8 sm:p-12 text-white font-mono overflow-x-auto mb-12">
            <p className="text-gray-500 text-sm mb-4">// Example: Product Management</p>
            <p className="text-xl sm:text-2xl text-teal-400 leading-relaxed">
              PM Excellence = <span className="text-white">f(</span>
              <span className="text-yellow-400">Problem Clarity</span>
              <span className="text-white"> × </span>
              <span className="text-blue-400">User Understanding</span>
              <span className="text-white"> × </span>
              <span className="text-green-400">Solution Design</span>
              <span className="text-white"> × </span>
              <span className="text-purple-400">Execution</span>
              <span className="text-white"> × </span>
              <span className="text-pink-400">Measurement</span>
              <span className="text-white">)</span>
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Find the atomic truth', body: 'Every pillar starts at Level 0 — the irreducible fact from which everything else follows.' },
              { step: '02', title: 'Build level by level', body: 'Each layer is derived from the layer below it. No memorization — pure derivation.' },
              { step: '03', title: 'End with a checklist', body: 'Every post ends with an executable checklist so understanding becomes action.' },
            ].map(item => (
              <div key={item.step} className="p-6 border border-gray-100 rounded-2xl">
                <p className="text-4xl font-black text-gray-100 mb-3">{item.step}</p>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-28 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-teal-600 uppercase mb-4">Free courses</p>
          <h2 className="text-4xl font-bold mb-12 max-w-xl leading-tight">Pick a domain. Go deep.</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Object.entries(domainConfig).map(([slug, config]) => (
              <Link key={slug} href={`/courses/${slug}`} className={"block p-6 rounded-2xl border-2 transition-all group " + config.color}>
                <span className="text-4xl mb-4 block">{config.emoji}</span>
                <h3 className="font-bold text-lg mb-1 group-hover:text-teal-700 transition-colors">{config.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{config.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT POSTS */}
      {recentPosts.length > 0 && (
        <section className="py-28 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-mono tracking-widest text-teal-600 uppercase mb-4">Latest posts</p>
            <h2 className="text-4xl font-bold mb-12">Fresh from the lab.</h2>
            <div className="space-y-4">
              {recentPosts.map(post => (
                <Link key={post.slug} href={"/blog/" + post.slug} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-gray-100 rounded-2xl hover:border-teal-300 hover:shadow-md transition-all group gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-mono">
                      <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{post.domain}</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-teal-600 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-1">{post.description}</p>
                  </div>
                  <span className="text-teal-600 font-bold text-xl shrink-0 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/blog" className="inline-block border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-xl font-semibold hover:bg-teal-600 hover:text-white transition-all">
                Read all posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* MANIFESTO */}
      <section className="py-28 px-6 bg-gray-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-8">The philosophy</p>
          <blockquote className="text-3xl sm:text-4xl font-bold leading-tight mb-10 text-gray-100">
            "The goal is not to memorize.<br />
            The goal is to understand deeply enough to{' '}
            <span className="text-teal-400">derive any answer yourself.</span>"
          </blockquote>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Every post on this site is a structured derivation — starting from an irreducible atomic truth,
            building upward level by level, showing every failure mode along the way.
          </p>
          <Link href="/courses" className="inline-block bg-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-teal-500 transition-all shadow-xl shadow-teal-900/40">
            Start your first course — free →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 border-t border-gray-900 px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-bold text-white tracking-tight">First Principles Lab</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/blog" className="hover:text-teal-400 transition-colors">Blog</Link>
            <Link href="/courses" className="hover:text-teal-400 transition-colors">Courses</Link>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">Twitter / X</a>
          </div>
          <p className="text-gray-600 text-xs">Free forever. No signup required.</p>
        </div>
      </footer>
    </main>
  );
}
