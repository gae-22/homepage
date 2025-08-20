import ToolCard from '@/components/ToolCard';
import { loadAllTools } from '@/lib/tools';

export const metadata = { title: 'Tools' };

export default function ToolsPage() {
  const tools = loadAllTools();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
      {tools.length === 0 ? (
        <p className="text-sm text-slate-500">
          No tools yet. Add items to content/tools/index.yml.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <ToolCard key={t.url} tool={t} />
          ))}
        </div>
      )}
    </div>
  );
}
