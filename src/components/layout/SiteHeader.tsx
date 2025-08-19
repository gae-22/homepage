'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 -mx-4 px-4 py-5 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <nav className="card flex items-center justify-between px-4 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-3 text-lg font-semibold tracking-tight"
        >
          <span className="inline-grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/90 to-secondary/90 text-white shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 10.5L12 4l9 6.5M5 9v10h14V9"
              />
            </svg>
          </span>
          <span className="transition-colors group-hover:text-primary">
            Home
          </span>
        </Link>
        <div className="flex items-center gap-1.5 text-base">
          <Link
            href="/blog"
            aria-current={isActive('/blog') ? 'page' : undefined}
            className={`relative flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
              isActive('/blog')
                ? 'bg-slate-100/80 text-primary dark:bg-slate-800/60'
                : 'text-slate-600 hover:bg-slate-100/80 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800/60'
            }`}
          >
            <span
              aria-hidden
              className="inline-flex h-5 w-5 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M4 6h16M4 12h12M4 18h8"
                />
              </svg>
            </span>
            <span>Blog</span>
          </Link>
          <Link
            href="/search"
            aria-current={isActive('/search') ? 'page' : undefined}
            className={`relative flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
              isActive('/search')
                ? 'bg-slate-100/80 text-primary dark:bg-slate-800/60'
                : 'text-slate-600 hover:bg-slate-100/80 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800/60'
            }`}
          >
            <span
              aria-hidden
              className="inline-flex h-5 w-5 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M11 5a6 6 0 104.472 10.058L20 19.586 18.586 21l-4.528-4.528A6 6 0 0011 5z"
                />
              </svg>
            </span>
            <span>Search</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
