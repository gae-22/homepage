import { loadAllPosts } from '@/lib/posts';

export function getAllTags() {
  const map: Record<string, number> = {};
  for (const p of loadAllPosts()) {
    if (p.draft && process.env.NODE_ENV !== 'development') continue;
    for (const t of p.tags ?? []) map[t] = (map[t] ?? 0) + 1;
  }
  return Object.fromEntries(
    Object.entries(map).sort((a, b) => b[1] - a[1])
  ) as Record<string, number>;
}
