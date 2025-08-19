import Link from 'next/link';
import Image from 'next/image';
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
    <section className="shadow-soft relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 p-6 ring-1 ring-black/5 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/60">
      <div className="card-header-line" aria-hidden />
      {/* subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
      />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
            {Array.isArray(role) ? role.join(' / ') : role || 'Portfolio'}
          </div>
          <h1 className="headline bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {name ? <>{name}</> : title}
          </h1>
          {summary ? <p className="subtle mt-3 text-lg">{summary}</p> : null}
          {intro?.highlights?.length ? (
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {intro.highlights.map((h, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200/60 bg-white/70 px-3 py-2 text-sm text-slate-700 backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-4 w-4 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/blog" className="btn-primary">
              ブログを見る
            </Link>
            {latestPostUrl ? (
              <Link href={latestPostUrl} className="btn-ghost">
                最新記事へ
              </Link>
            ) : null}
            {links.map((l) => (
              <a key={l.url} href={l.url} className="btn-ghost">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        {/* Avatar / art */}
        <div className="shadow-soft relative mx-auto h-28 w-28 shrink-0 rounded-2xl border border-slate-200/60 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 p-[2px] dark:border-slate-700/50 md:mx-0 md:h-36 md:w-36">
          {/* subtle glow ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl"
          />
          <div className="h-full w-full rounded-xl bg-white/70 p-2 backdrop-blur dark:bg-slate-900/60">
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                src="/gae.svg"
                alt={name ? `${name} avatar` : 'Avatar'}
                fill
                className="object-contain"
                priority
                sizes="(min-width: 768px) 9rem, 7rem"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
