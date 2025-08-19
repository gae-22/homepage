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

## Rebuild search

```bash
npm run search:build
```

## Deploy (Netlify)

- Connect this repository to Netlify
- Build command: `npm run build`
- Publish directory: `.next`
- Use the official `@netlify/plugin-nextjs` (configured in `netlify.toml`)
