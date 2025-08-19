import type { Metadata } from 'next';
import './globals.css';
import Container from '@/components/layout/Container';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { Analytics } from '@vercel/analytics/react';
import { Noto_Sans_JP } from 'next/font/google';

// Unified Gothic (sans-serif) font across the site
const notoSans = Noto_Sans_JP({
  variable: '--font-sans',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'Personal site and blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`no-scrollbar ${notoSans.variable}`}
    >
      <body className="no-scrollbar min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-100">
        {/* Decorative fixed background layers */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="aurora absolute -left-40 -top-20 h-[50vmax] w-[50vmax] animate-aurora bg-gradient-to-br from-primary/35 via-secondary/25 to-primary/20" />
          <div className="aurora absolute -right-40 -top-10 h-[40vmax] w-[40vmax] animate-aurora bg-gradient-to-tr from-secondary/35 via-primary/25 to-secondary/20" />
        </div>

        <Container>
          <SiteHeader />
          <main className="py-6 sm:py-8 lg:py-10">{children}</main>
          <SiteFooter />
        </Container>
        <Analytics />
      </body>
    </html>
  );
}
