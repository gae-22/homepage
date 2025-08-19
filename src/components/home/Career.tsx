import { HomeCareer } from '@/lib/home';

export default function Career({ section }: { section: HomeCareer }) {
  return (
    <section>
      {section.title && (
        <h2 className="font-display mb-3 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
          {section.title}
        </h2>
      )}
      <div className="card p-5">
        <div className="card-header-line" aria-hidden />
        <ol className="relative ml-2 border-l border-slate-200 dark:border-slate-700">
          {section.timeline.map((t, i) => (
            <li key={i} className="mb-6 ml-4">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gradient-to-br from-primary to-secondary shadow-sm dark:border-slate-900" />
              <time className="text-sm text-slate-500">
                {t.start ? (
                  <>
                    {t.start}–{t.end ?? '現在'}
                  </>
                ) : (
                  t.period
                )}
              </time>
              {(t.role || t.org) && (
                <h3 className="text-lg font-semibold">
                  {[t.role, t.org].filter(Boolean).join(' @ ')}
                </h3>
              )}
              {t.description && (
                <p className="text-slate-700 dark:text-slate-200">
                  {t.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
