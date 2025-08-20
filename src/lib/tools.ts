import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export type ToolItem = {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  order?: number;
};

const TOOLS_YAML_PATHS = [
  path.join(process.cwd(), 'content', 'tools', 'index.yml'),
  path.join(process.cwd(), 'content', 'tools', 'index.yaml'),
];

/**
 * Load tools from YAML.
 * Accepts either:
 *  - an array of tool items
 *  - an object with a `tools` array property
 */
export function loadAllTools(): ToolItem[] {
  const yamlPath = TOOLS_YAML_PATHS.find((p) => fs.existsSync(p));
  if (!yamlPath) return [];
  const raw = fs.readFileSync(yamlPath, 'utf8');
  let parsed: unknown;
  try {
    parsed = YAML.parse(raw);
  } catch (e) {
    console.error('Invalid YAML in tools config:', e);
    return [];
  }

  let items: unknown = parsed;
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const obj = parsed as Record<string, unknown>;
    if (Array.isArray(obj.tools)) items = obj.tools;
  }

  if (!Array.isArray(items)) return [];
  return (items as ToolItem[])
    .filter(
      (t) => t && typeof t.title === 'string' && typeof t.url === 'string'
    )
    .map((t, idx) => ({ ...t, order: t.order ?? idx }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
