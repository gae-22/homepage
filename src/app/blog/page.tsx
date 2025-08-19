import { compareDesc } from 'date-fns';
import { loadAllPosts } from '@/lib/posts';
import { getAllTags } from '@/lib/tags';
import BlogFilter from '@/components/BlogFilter';

export const metadata = { title: 'Blog' };

export default function BlogIndex() {
  const posts = loadAllPosts()
    .filter((p) => process.env.NODE_ENV === 'development' || !p.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const tags = getAllTags();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <BlogFilter allPosts={posts} allTags={tags} />
    </div>
  );
}
