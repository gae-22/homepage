import Link from 'next/link';
import Tag from './Tag';
import { formatDate } from '@/lib/date';
import type { PostMeta } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-soft ring-1 ring-black/5 backdrop-blur transition focus-within:ring-2 focus-within:ring-primary/40 hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-slate-700/50 dark:bg-slate-900/60">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30" />
      {/* Stretched link to make the whole card clickable */}
      <Link
        href={post.url}
        className="absolute inset-0 z-20"
        aria-label={post.title}
      />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary dark:from-white dark:to-slate-200">
            {post.title}
          </span>
        </h3>
        <time className="relative z-10 shrink-0 rounded-full border border-slate-200/60 bg-white/70 px-2 py-1 text-xs text-slate-600 dark:border-slate-700/50 dark:bg-slate-800/60 dark:text-slate-300">
          {formatDate(post.date)}
        </time>
      </div>
      {post.excerpt && (
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {post.excerpt}
        </p>
      )}
      {post.tags && (
        <div className="relative z-10 mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Tag key={t} tag={t} />
          ))}
        </div>
      )}
    </article>
  );
}
