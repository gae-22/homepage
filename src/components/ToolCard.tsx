import type { ToolItem } from '@/lib/tools';

export default function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-soft ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-slate-700/50 dark:bg-slate-900/60">
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label={tool.title}
      />
      <h3 className="text-xl font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary dark:from-white dark:to-slate-200">
          {tool.title}
        </span>
      </h3>
      {tool.description && (
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {tool.description}
        </p>
      )}
      {tool.tags && tool.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
