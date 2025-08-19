export default function SiteFooter() {
  return (
    <footer className="border-t py-8 text-sm text-slate-500 dark:border-slate-800">
      © {new Date().getFullYear()} Homepage
    </footer>
  );
}
