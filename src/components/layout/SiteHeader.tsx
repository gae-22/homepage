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
    <header className="sticky top-0 z-50 py-2">
      <nav className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/70 px-3 py-2.5 shadow-soft ring-1 ring-black/5 backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/60">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-base font-semibold tracking-tight md:text-lg"
        >
          <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary/90 to-secondary/90 text-white shadow-md md:h-9 md:w-9">
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
          <span className="font-display transition-colors group-hover:text-primary">
            Home
          </span>
        </Link>
        <div className="flex items-center gap-1 text-base">
          <Link
            href="/blog"
            aria-current={isActive('/blog') ? 'page' : undefined}
            className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition ${
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
            <span className="font-medium">Blog</span>
            <span
              aria-hidden
              className={`absolute inset-x-2 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-gradient-to-r from-primary to-secondary transition-transform ${
                isActive('/blog') ? 'scale-x-100' : 'group-hover:scale-x-100'
              }`}
            />
          </Link>
          <Link
            href="/tools"
            aria-current={isActive('/tools') ? 'page' : undefined}
            className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition ${
              isActive('/tools')
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
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </span>
            <span className="font-medium">Tools</span>
            <span
              aria-hidden
              className={`absolute inset-x-2 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-gradient-to-r from-primary to-secondary transition-transform ${
                isActive('/tools') ? 'scale-x-100' : 'group-hover:scale-x-100'
              }`}
            />
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
