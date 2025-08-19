import Link from 'next/link';
import type { HomeIntro } from '@/lib/home';

export default function Hero({
  intro,
  latestPostUrl,
}: {
  intro?: HomeIntro;
  latestPostUrl?: string;
}) {
  const title = intro?.title || 'ようこそ';
  const name = intro?.name;
  const role = intro?.role;
  const summary = intro?.summary;
  const links = intro?.links || [];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/60">
      <div
        className="pointer-events-none absolute inset-x-0 -top-0.5 h-px bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40"
        aria-hidden
      />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h1 className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-3xl font-extrabold leading-tight text-transparent">
            {name ? (
              <>
                {name}
                {role ? (
                  <span className="ml-2 text-lg font-semibold text-slate-600 dark:text-slate-300">
                    / {role}
                  </span>
                ) : null}
              </>
            ) : (
              title
            )}
          </h1>
          {summary ? (
            <p className="mt-2 text-slate-700 dark:text-slate-200">{summary}</p>
          ) : null}
          {intro?.highlights?.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-200">
              {intro.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              ブログを見る
            </Link>
            {latestPostUrl ? (
              <Link
                href={latestPostUrl}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                最新記事へ
              </Link>
            ) : null}
            {links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
