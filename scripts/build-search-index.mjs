import fs from 'node:fs';
import path from 'node:path';
import MiniSearch from 'minisearch';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'blog');
const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
const docs = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const { data, content } = matter(raw);
  const fm = data || {};
  const draft = !!fm.draft;
  if (draft && process.env.NODE_ENV !== 'development') continue;
  const slug =
    fm.slug || file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  docs.push({
    id: slug,
    title: fm.title || slug,
    excerpt: fm.excerpt || '',
    body: content,
    tags: fm.tags || [],
    url: `/blog/${slug}`,
    date: fm.date || '',
  });
}

const mini = new MiniSearch({
  fields: ['title', 'excerpt', 'body', 'tags'],
  storeFields: ['title', 'excerpt', 'url', 'tags', 'date'],
});

mini.addAll(docs);

const outDir = path.join(process.cwd(), 'public');
const outFile = path.join(outDir, 'search-index.json');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(mini.toJSON()));
console.log(`Wrote ${outFile}`);
