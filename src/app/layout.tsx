import type { Metadata } from 'next';
import './globals.css';
import Container from '@/components/layout/Container';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

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
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-100">
        <Container>
          <SiteHeader />
          <main className="py-10">{children}</main>
          <SiteFooter />
        </Container>
      </body>
    </html>
  );
}
