import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type PostMeta = {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  draft?: boolean;
  slug: string;
  url: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function loadAllPosts(): PostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const items: PostMeta[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = matter(raw);
    const fm = data as Partial<PostMeta> & { slug?: string };
    const slug =
      fm.slug || file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    items.push({
      title: fm.title ?? slug,
      date: (fm.date as string) ?? new Date().toISOString(),
      tags: fm.tags ?? [],
      excerpt: fm.excerpt ?? '',
      draft: fm.draft ?? false,
      slug,
      url: `/blog/${slug}`,
    });
  }
  return items;
}
