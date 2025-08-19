export default function SiteFooter() {
  return (
    <footer className="relative -mx-4 px-4 pb-10 pt-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="shadow-soft rounded-2xl border border-slate-200/60 bg-white/70 px-6 py-6 text-center text-base text-slate-600 ring-1 ring-black/5 backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/60">
          <div className="card-header-line" aria-hidden />
          <p className="inline-flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-lg font-semibold text-transparent">
              gae
            </span>
            <span>© {new Date().getFullYear()}</span>
          </p>
          <div className="mt-2 text-xs text-slate-500">
            <span>Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
