import Link from 'next/link';
import { compareDesc } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import PostCard from '@/components/PostCard';
import { loadAllPosts } from '@/lib/posts';
import { getAllTags } from '@/lib/tags';
import { loadHomeMarkdown, loadHomeSections, loadHomeConfig } from '@/lib/home';
import Hobbies from '@/components/home/Hobbies';
import Career from '@/components/home/Career';
import Now from '@/components/home/Now';
import Hero from '@/components/home/Hero';
import type { HomeIntro } from '@/lib/home';

export default function HomePage() {
  const home = loadHomeMarkdown();
  const homeSections = loadHomeSections();
  const homeJson = loadHomeConfig();
  const posts = loadAllPosts()
    .filter((p) => process.env.NODE_ENV === 'development' || !p.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5);
  const tags = getAllTags();
  const intro = homeJson.find((s): s is HomeIntro => s.type === 'intro');
  const latestPostUrl = posts[0]?.url;

  return (
    <div className="space-y-10">
      {/* Hero */}
      <Hero intro={intro} latestPostUrl={latestPostUrl} />

      {/* Content sections from YAML/MD */}
      <section
        id="about"
        className="prose prose-slate max-w-none dark:prose-invert"
      >
        {home.frontmatter.title &&
        homeJson.length === 0 &&
        homeSections.length === 0 ? (
          <h1 className="mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-3xl font-extrabold">
            {home.frontmatter.title}
          </h1>
        ) : null}
        {homeJson.length > 0 ? (
          <div className="space-y-6">
            {homeJson.map((s, i) => {
              switch (s.type) {
                case 'intro':
                  // Hero で要約表示済みのため重複回避
                  return null;
                case 'hobbies':
                  return <Hobbies key={s.id ?? i} section={s} />;
                case 'career':
                  return <Career key={s.id ?? i} section={s} />;
                case 'now':
                  return <Now key={s.id ?? i} section={s} />;
                case 'custom':
                default:
                  return (
                    <div
                      key={s.id ?? i}
                      className="prose prose-slate max-w-none dark:prose-invert"
                    >
                      {'title' in s && s.title ? <h2>{s.title}</h2> : null}
                      {'body' in s ? (
                        <ReactMarkdown>{s.body as string}</ReactMarkdown>
                      ) : null}
                    </div>
                  );
              }
            })}
          </div>
        ) : homeSections.length > 0 ? (
          <div className="space-y-8">
            {homeSections.map((s) => (
              <section
                key={s.slug}
                className="prose prose-slate max-w-none dark:prose-invert"
              >
                {s.title ? <h2>{s.title}</h2> : null}
                <ReactMarkdown>{s.content}</ReactMarkdown>
              </section>
            ))}
          </div>
        ) : (
          <section className="prose prose-slate max-w-none dark:prose-invert">
            <ReactMarkdown>{home.content}</ReactMarkdown>
          </section>
        )}
      </section>

      {/* Recent posts */}
      <section id="recent" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">最新記事</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-accent hover:text-primary"
          >
            すべて見る →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Tag overview */}
      <section id="tags" className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">タグ</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(tags).map((t) => (
            <Link
              key={t}
              href={`/tags/${encodeURIComponent(t)}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {t}
              <span className="ml-1 text-slate-500">({tags[t]})</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
