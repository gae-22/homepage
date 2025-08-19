# Homepage

Next.js (App Router) + TypeScript + Tailwind CSS + Minisearch.

## Run locally

1. Install dependencies
2. Build search index (optional; dev builds it on demand)
3. Start dev server

```bash
npm install
npm run search:build
npm run dev
```

## Write a post

- Add a Markdown file under `content/blog/` with frontmatter:

---

title: "タイトル"
date: 2025-08-19
tags: ["tag1", "tag2"]
excerpt: "短い説明"
draft: false
slug: "optional-slug"

---

## Edit the top page (About/self-intro)

- Update `content/home.md` (Markdown). Supported frontmatter:
  - `title`: ページタイトル
  - `excerpt`: 説明文（meta description に利用）
  - 本文は通常の Markdown で書けます。

## Rebuild search

```bash
npm run search:build
```

## Deploy (Vercel)

- Import the repo into Vercel
- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Node version: 20 (set via package.json engines)
- Environment variables: none required by default
