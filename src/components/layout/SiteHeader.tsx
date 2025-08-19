export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-4 border-b bg-white/80 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <nav className="flex items-center justify-between">
        <a href="/" className="font-semibold">
          Home
        </a>
        <div className="flex gap-4 text-sm">
          <a href="/blog" className="hover:text-accent">
            Blog
          </a>
        </div>
      </nav>
    </header>
  );
}
