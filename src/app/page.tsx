import Link from 'next/link';
import { compareDesc } from 'date-fns';
import PostCard from '@/components/PostCard';
import { loadAllPosts } from '@/lib/posts';
import { getAllTags } from '@/lib/tags';
import SearchBox from '@/components/SearchBox';

export default function HomePage() {
  const posts = loadAllPosts()
    .filter((p) => process.env.NODE_ENV === 'development' || !p.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5);
  const tags = getAllTags();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-2 text-3xl font-bold">Welcome</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Markdown-first blog with tags and search.
        </p>
      </section>
      <section id="search">
        <h2 className="mb-3 text-2xl font-semibold">Search</h2>
        <SearchBox />
      </section>
      <section id="tags">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Tags</h2>
          <Link href="/tags" className="text-accent">
            All tags →
          </Link>
        </div>
        <ul className="flex flex-wrap gap-3">
          {Object.entries(tags).map(([tag, count]) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                {tag} <span className="text-slate-500">({count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="blog">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <Link href="/blog" className="text-accent">
            All posts →
          </Link>
        </div>
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
