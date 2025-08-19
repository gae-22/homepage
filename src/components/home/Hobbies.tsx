import { HomeHobbies } from '@/lib/home';

export default function Hobbies({ section }: { section: HomeHobbies }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {section.title && (
        <h2 className="mb-3 text-2xl font-bold tracking-tight">
          {section.title}
        </h2>
      )}
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {section.items.map((item, i) => (
          <li
            key={i}
            className="rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-800"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
