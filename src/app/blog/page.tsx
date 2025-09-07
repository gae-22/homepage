import { compareDesc } from 'date-fns';
import { loadAllPosts } from '@/lib/posts';
import { getAllTags } from '@/lib/tags';
import BlogFilter from '@/components/BlogFilter';
import Image from 'next/image';

export const metadata = { title: 'Blog' };

export default function BlogIndex() {
  const posts = loadAllPosts()
    .filter((p) => process.env.NODE_ENV === 'development' || !p.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const tags = getAllTags();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>

      {/* External platforms section */}
      <div className="space-y-4 rounded-lg bg-muted/50 p-6">
        <h2 className="text-xl font-semibold">Other Platforms</h2>
        <p className="text-muted-foreground">
          I also write articles on these platforms:
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://zenn.dev/gae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
          >
            <Image
              src="/zenn.png"
              alt="Zenn"
              width={64}
              height={20}
              className="h-5 w-auto"
              priority={false}
            />
          </a>
          <a
            href="https://qiita.com/gae-22"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-4 py-2 text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30"
          >
            <span className="sr-only">Qiita</span>
            <Image
              src="/qiita-icon.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-auto"
            />
            <Image
              src="/qiita.png"
              alt=""
              width={64}
              height={20}
              className="h-5 w-auto"
            />
          </a>
        </div>
      </div>

      <BlogFilter allPosts={posts} allTags={tags} />
    </div>
  );
}
