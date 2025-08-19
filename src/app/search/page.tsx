'use client';
import { useEffect, useState } from 'react';
import MiniSearch from 'minisearch';
import Link from 'next/link';
import Tag from '@/components/Tag';

type Doc = {
  id: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  url: string;
  date: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<MiniSearch<Doc> | null>(null);
  const [results, setResults] = useState<Doc[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/search-index.json');
        const json = await res.json();
        const mini = MiniSearch.loadJSON<Doc>(json, {
          fields: ['title', 'excerpt', 'body', 'tags'],
          storeFields: ['title', 'excerpt', 'url', 'tags', 'date'],
        });
        setIndex(mini);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!index) return;
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const hits = index
      .search(query, { prefix: true, fuzzy: 0.2 })
      .map((r) => r.doc);
    setResults(hits);
  }, [query, index]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 shadow-inner outline-none ring-primary/30 focus:ring dark:border-slate-700 dark:bg-slate-800/70"
      />
      <ul className="space-y-4">
        {results.map((r) => (
          <li
            key={r.id}
            className="shadow-soft hover:shadow-soft-lg rounded-xl border border-slate-200/70 bg-white/70 p-4 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/60"
          >
            <Link
              href={r.url}
              className="text-lg font-semibold tracking-tight hover:text-primary"
            >
              {r.title}
            </Link>
            {r.excerpt && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {r.excerpt}
              </p>
            )}
            {r.tags && (
              <div className="mt-2 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <Tag key={t} tag={t} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
