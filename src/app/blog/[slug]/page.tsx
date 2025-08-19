import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/date';
import Tag from '@/components/Tag';

export const dynamicParams = false;

type Frontmatter = {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  draft?: boolean;
  slug?: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

function getAllSlugs() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = matter(raw);
    const fm = data as Frontmatter;
    return (
      fm.slug || file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
    );
  });
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = matter(raw);
    const fm = data as Frontmatter;
    const slug =
      fm.slug || file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    if (slug === params.slug) {
      return { title: fm.title, description: fm.excerpt };
    }
  }
  return {};
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const fm = data as Frontmatter;
    const draft = !!fm.draft;
    if (draft && process.env.NODE_ENV !== 'development') continue;
    const slug =
      fm.slug || file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    if (slug === params.slug) {
      return (
        <article className="prose prose-slate max-w-none dark:prose-invert">
          <h1>{fm.title}</h1>
          <p className="mt-0 text-sm text-slate-500">{formatDate(fm.date)}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {fm.tags?.map((t) => (
              <Tag key={t} tag={t} />
            ))}
          </div>
          <div className="mt-8">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>
      );
    }
  }
  return notFound();
}
