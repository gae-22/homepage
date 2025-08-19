import Link from 'next/link';
import type { UrlObject } from 'url';
import Tag from './Tag';
import { formatDate } from '@/lib/date';
import type { PostMeta } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="rounded-lg border p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">
          <Link
            href={{ pathname: post.url } as UrlObject}
            className="hover:text-accent"
          >
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
