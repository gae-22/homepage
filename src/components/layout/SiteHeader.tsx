import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-4 border-b border-transparent bg-white/70 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-slate-900/70 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <nav className="relative flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Home
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/blog"
            className="rounded-md px-2 py-1 text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Blog
          </Link>
          <Link
            href="/search"
            className="rounded-md px-2 py-1 text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Search
          </Link>
          <ThemeToggle />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30"
          aria-hidden
        />
      </nav>
    </header>
  );
}
