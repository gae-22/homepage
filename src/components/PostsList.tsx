'use client';
import PostCard from '@/components/PostCard';
import type { PostMeta } from '@/lib/posts';

export default function PostsList({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) {
    return (
      <p className="text-sm text-slate-500">
        No posts match the current filter.
      </p>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
