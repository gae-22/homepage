import Link from 'next/link';
import Tag from './Tag';
import { formatDate } from '@/lib/date';
import type { PostMeta } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="card card-header-line hover:shadow-soft-lg transition-shadow">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">
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
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Tag key={t} tag={t} />
          ))}
        </div>
      )}
    </article>
  );
}
