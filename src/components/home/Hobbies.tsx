import { HomeHobbies } from '@/lib/home';

export default function Hobbies({ section }: { section: HomeHobbies }) {
  return (
    <section className="card p-5">
      <div className="card-header-line" aria-hidden />
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
