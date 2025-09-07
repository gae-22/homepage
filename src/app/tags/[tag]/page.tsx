import { loadAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export function generateStaticParams() {
  const tagSet = new Set<string>();
  for (const p of loadAllPosts()) {
    if (p.draft && process.env.NODE_ENV !== 'development') continue;
    if (p.tags) p.tags.forEach((t) => tagSet.add(t));
  }
  return Array.from(tagSet).map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return { title: `Tag: ${tag}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = loadAllPosts()
    .filter(
      (p) =>
        (process.env.NODE_ENV === 'development' || !p.draft) &&
        p.tags?.includes(tag)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tag: {tag}</h1>
        <Link href="/tags" className="text-accent hover:text-primary">
          All tags
        </Link>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
