import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'First Principles Lab — Learn Anything from Atomic Truth',
    template: '%s | First Principles Lab',
  },
  description: 'Free courses and daily posts on Product Management, Finance, and Philosophy — taught from first principles, not definitions.',
  keywords: ['first principles', 'learning', 'product management', 'finance', 'free course', 'mental models'],
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'First Principles Lab' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
