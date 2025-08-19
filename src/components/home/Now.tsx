import { HomeNow } from '@/lib/home';

export default function Now({ section }: { section: HomeNow }) {
  return (
    <section className="card p-5">
      <div className="card-header-line" aria-hidden />
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
