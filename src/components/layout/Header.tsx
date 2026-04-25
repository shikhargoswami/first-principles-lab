'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight hover:text-teal-600 transition-colors">
          <span className="bg-teal-600 text-white w-7 h-7 rounded-md flex items-center justify-center text-sm font-black">
            FP
          </span>
          First Principles Lab
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname?.startsWith(link.href)
                  ? 'px-4 py-2 rounded-lg text-sm font-medium bg-teal-50 text-teal-700'
                  : 'px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors'
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/courses"
            className="ml-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors"
          >
            Start Free →
          </Link>
        </nav>
      </div>
    </header>
  );
}
