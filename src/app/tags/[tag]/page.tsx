import { loadAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export function generateStaticParams() {
  const tagSet = new Set<string>();
  for (const p of loadAllPosts()) {
    if (p.draft && process.env.NODE_ENV !== 'development') continue;
    if (p.tags) p.tags.forEach((t) => tagSet.add(t));
  }
  return Array.from(tagSet).map((tag) => ({ tag }));
}

export function generateMetadata({ params }: { params: { tag: string } }) {
  return { title: `Tag: ${params.tag}` };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = loadAllPosts()
    .filter(
      (p) =>
        (process.env.NODE_ENV === 'development' || !p.draft) &&
        p.tags?.includes(params.tag)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tag: {params.tag}</h1>
        <a href="/tags" className="text-primary hover:text-secondary">
          All tags
        </a>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
