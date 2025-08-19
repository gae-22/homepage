import { HomeNow } from '@/lib/home';

export default function Now({ section }: { section: HomeNow }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {section.title && (
        <h2 className="mb-3 text-2xl font-bold tracking-tight">
          {section.title}
        </h2>
      )}
      <ul className="list-disc space-y-1 pl-5">
        {section.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
