import Link from 'next/link';
import Tag from './Tag';
import { formatDate } from '@/lib/date';
import type { PostMeta } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="rounded-xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">
          <Link href={post.url} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <time className="shrink-0 text-sm text-slate-500">
          {formatDate(post.date)}
        </time>
      </div>
      {post.excerpt && (
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          {post.excerpt}
        </p>
      )}
      {post.tags && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Tag key={t} tag={t} />
          ))}
        </div>
      )}
    </article>
  );
}
