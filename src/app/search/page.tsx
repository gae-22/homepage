'use client';
import { useEffect, useState } from 'react';
import MiniSearch from 'minisearch';
import Link from 'next/link';
import type { UrlObject } from 'url';
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
      <h1 className="text-3xl font-bold">Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring dark:border-slate-700 dark:bg-slate-800"
      />
      <ul className="space-y-4">
        {results.map((r) => (
          <li
            key={r.id}
            className="rounded-md border p-4 dark:border-slate-800"
          >
            <Link
              href={{ pathname: r.url } as UrlObject}
              className="text-lg font-semibold hover:text-accent"
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
