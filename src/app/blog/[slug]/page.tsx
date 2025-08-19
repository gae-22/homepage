import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/components/CodeBlock';
import LinkCard from '@/components/LinkCard';
import React from 'react';
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
  const slugs: string[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = matter(raw);
    const fm = data as Frontmatter;
    const draft = !!fm.draft;
    if (draft && process.env.NODE_ENV !== 'development') continue;
    const slug =
      fm.slug || file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    slugs.push(slug);
  }
  return slugs;
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
    if (fm.draft && process.env.NODE_ENV !== 'development') continue;
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
        <article className="shadow-soft prose prose-slate w-full max-w-none rounded-2xl border border-slate-200/60 bg-white/85 p-6 ring-1 ring-black/5 backdrop-blur-md dark:prose-invert dark:border-slate-700/50 dark:bg-slate-900/70 sm:p-8">
          <h1>{fm.title}</h1>
          <p className="mt-0 text-sm text-slate-600 dark:text-slate-300">
            {formatDate(fm.date)}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {fm.tags?.map((t) => (
              <Tag key={t} tag={t} />
            ))}
          </div>
          <div className="mt-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Code blocks with syntax highlight, filename label, copy button
                code(props) {
                  return <CodeBlock {...props} />;
                },
                // Remove default <pre> wrapper to avoid double frames
                pre({ children }) {
                  return <>{children}</>;
                },
                // Convert a paragraph that contains only a URL (either plain text or a single anchor) into a LinkCard
                p({ children, ...pProps }) {
                  const kids = React.Children.toArray(children);

                  function textFrom(node: React.ReactNode): string {
                    if (node == null) return '';
                    if (typeof node === 'string') return node;
                    if (Array.isArray(node)) return node.map(textFrom).join('');
                    if (React.isValidElement(node)) {
                      return textFrom(node.props?.children);
                    }
                    return '';
                  }

                  function toAbsoluteHttpUrl(
                    href?: string
                  ): string | undefined {
                    if (!href) return undefined;
                    try {
                      const u = new URL(href);
                      return u.protocol === 'http:' || u.protocol === 'https:'
                        ? href
                        : undefined;
                    } catch {
                      return undefined;
                    }
                  }

                  // Ignore purely whitespace nodes
                  const nonWs = kids.filter((k) => textFrom(k).trim() !== '');

                  // Case 1: a single plain-text URL
                  if (nonWs.length === 1 && typeof nonWs[0] === 'string') {
                    const s = (nonWs[0] as string).trim();
                    const abs = toAbsoluteHttpUrl(s);
                    if (abs) return <LinkCard url={abs} />;
                  }

                  // Case 2: a single anchor whose text equals its href
                  if (
                    nonWs.length === 1 &&
                    React.isValidElement(nonWs[0]) &&
                    typeof (nonWs[0] as any).type === 'string' &&
                    (nonWs[0] as any).type === 'a'
                  ) {
                    const aEl = nonWs[0] as React.ReactElement<{
                      href?: string;
                      children?: React.ReactNode;
                    }>;
                    const href = aEl.props.href;
                    const text = textFrom(aEl.props.children).trim();
                    const abs = toAbsoluteHttpUrl(href);
                    if (abs && href && text === href.trim()) {
                      return <LinkCard url={abs} />;
                    }
                  }

                  return <p {...pProps}>{children}</p>;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </article>
      );
    }
  }
  return notFound();
}
