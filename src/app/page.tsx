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
import Tag from '@/components/Tag';

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
    <div className="space-y-8">
      {/* Hero */}
      <Hero intro={intro} latestPostUrl={latestPostUrl} />

      {/* Recent posts */}
      <section id="recent" className="space-y-2.5">
        <h2 className="section-title">最新記事</h2>
        <div className="card p-5">
          <div className="card-header-line" aria-hidden />
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Link href="/blog" className="btn-ghost">
              すべて見る →
            </Link>
          </div>
        </div>
      </section>

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

      {/* Tag overview */}
      <section id="tags" className="space-y-2.5">
        <h2 className="section-title">タグ</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(tags).map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Tag tag={t} />
              <span className="text-xs text-slate-500">({tags[t]})</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
