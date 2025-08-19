import { HomeIntro } from '@/lib/home';

export default function Intro({ section }: { section: HomeIntro }) {
  return (
    <section className="card p-5">
      <div className="card-header-line" aria-hidden />
      {section.title && (
        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          {section.title}
        </h2>
      )}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          {section.name && (
            <p className="text-xl font-semibold">{section.name}</p>
          )}
          {section.role && (
            <p className="text-slate-600 dark:text-slate-300">{section.role}</p>
          )}
          {section.summary && (
            <p className="mt-2 text-slate-700 dark:text-slate-200">
              {section.summary}
            </p>
          )}
          {section.highlights && section.highlights.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-200">
              {section.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
        {section.links && section.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 md:mt-0">
            {section.links.map((l) => (
              <a key={l.url} href={l.url} className="btn-ghost py-1">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
