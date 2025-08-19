export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-4 border-b border-transparent bg-white/70 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-slate-900/70">
      <nav className="relative flex items-center justify-between">
        <a href="/" className="font-semibold">
          Home
        </a>
        <div className="flex gap-1 text-sm">
          <a
            href="/blog"
            className="hover:text-primary rounded-md px-2 py-1 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Blog
          </a>
        </div>
        <div
          className="from-primary/40 via-secondary/40 to-primary/40 pointer-events-none absolute inset-x-0 -bottom-4 h-px bg-gradient-to-r"
          aria-hidden
        />
      </nav>
    </header>
  );
}
