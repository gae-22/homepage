'use client';
import { useMemo, useState } from 'react';
import { compareDesc } from 'date-fns';
import type { PostMeta } from '@/lib/posts';
import PostsList from '@/components/PostsList';
import Tag from '@/components/Tag';

export default function BlogFilter({
  allPosts,
  allTags,
}: {
  allPosts: PostMeta[];
  allTags: Record<string, number>;
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = useMemo(() => {
    const base = allPosts
      .filter((p) => process.env.NODE_ENV === 'development' || !p.draft)
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    const tagFiltered = activeTag
      ? base.filter((p) => (p.tags || []).includes(activeTag))
      : base;
    if (!searchQuery.trim()) return tagFiltered;
    const q = searchQuery.toLowerCase();
    return tagFiltered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q)
    );
  }, [allPosts, activeTag, searchQuery]);

  return (
    <div className="space-y-8">
      <section id="search" className="space-y-3">
        <h2 className="text-2xl font-semibold">Search</h2>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none ring-accent/30 focus:ring dark:border-slate-700 dark:bg-slate-800"
        />
      </section>

      <section id="tags" className="space-y-3">
        <h2 className="text-2xl font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-2">
          <Tag
            tag="All"
            onClick={() => setActiveTag(null)}
            active={activeTag === null}
          />
          {Object.entries(allTags).map(([tag]) => (
            <Tag
              key={tag}
              tag={`${tag}`}
              onClick={() => setActiveTag(tag)}
              active={activeTag === tag}
            />
          ))}
        </div>
      </section>

      <section id="posts" className="space-y-4">
        <h2 className="text-2xl font-semibold">All Posts</h2>
        <PostsList posts={filtered} />
      </section>
    </div>
  );
}
