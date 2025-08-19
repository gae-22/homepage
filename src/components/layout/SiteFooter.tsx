export default function SiteFooter() {
  return (
    <footer className="relative py-10 text-sm text-slate-500">
      <div
        className="from-primary/30 via-secondary/30 to-primary/30 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r"
        aria-hidden
      />
      © {new Date().getFullYear()} Homepage
    </footer>
  );
}
