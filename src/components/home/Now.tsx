import { HomeNow } from '@/lib/home';

export default function Now({ section }: { section: HomeNow }) {
  return (
    <section>
      {section.title && (
        <h2 className="font-display mb-3 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
          {section.title}
        </h2>
      )}
      <div className="card p-5">
        <div className="card-header-line" aria-hidden />
        <ul className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {section.items.map((item, i) => (
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
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
