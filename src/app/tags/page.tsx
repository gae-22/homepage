import Link from 'next/link';
import { getAllTags } from '@/lib/tags';

export const metadata = { title: 'Tags' };

export default function TagsIndex() {
  const tags = getAllTags();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tags</h1>
      <ul className="flex flex-wrap gap-3">
        {Object.entries(tags).map(([tag, count]) => (
          <li key={tag}>
            <Link
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {tag} <span className="text-slate-500">({count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
