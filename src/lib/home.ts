import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import YAML from 'yaml';

export type HomeFrontmatter = {
  title?: string;
  description?: string;
};

const HOME_MD_PATH = path.join(process.cwd(), 'content', 'home', 'index.md');
const HOME_JSON_PATH = path.join(
  process.cwd(),
  'content',
  'home',
  'index.json'
);
const HOME_YAML_PATHS = [
  path.join(process.cwd(), 'content', 'home', 'index.yml'),
  path.join(process.cwd(), 'content', 'home', 'index.yaml'),
];

export function loadHomeMarkdown(): {
  frontmatter: HomeFrontmatter;
  content: string;
  exists: boolean;
} {
  if (!fs.existsSync(HOME_MD_PATH)) {
    return {
      frontmatter: { title: 'About me' },
      content:
        'Create content/home/index.md to write your self-introduction in Markdown. You can include headings, lists, links, and images.',
      exists: false,
    };
  }
  const raw = fs.readFileSync(HOME_MD_PATH, 'utf8');
  const { data, content } = matter(raw);
  return {
    frontmatter: (data as HomeFrontmatter) ?? {},
    content,
    exists: true,
  };
}

export type HomeSection = {
  order: number;
  slug: string;
  filename: string;
  title?: string;
  content: string;
};

/**
 * Load all markdown files under content/home, ordered by leading numeric index.
 * Examples:
 *  - 01-profile.md (order 1)
 *  - 02-hobbies.md (order 2)
 *  - 10-now.md (order 10)
 *  - index.md (treated as order 0)
 */
export function loadHomeSections(): HomeSection[] {
  const dir = path.join(process.cwd(), 'content', 'home');
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.md'));

  const sections: HomeSection[] = [];
  for (const file of files) {
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, 'utf8');
    const { data, content } = matter(raw);
    const fm = (data as HomeFrontmatter) ?? {};
    // Determine order from leading digits in filename; index.md -> 0
    let order = 999;
    if (/^index\.md$/i.test(file)) order = 0;
    else {
      const m = file.match(/^(\d{1,})[-_.\s]/);
      if (m) order = parseInt(m[1], 10);
    }
    const slug = file.replace(/\.md$/i, '');
    sections.push({
      order,
      slug,
      filename: file,
      title: fm.title,
      content,
    });
  }

  sections.sort(
    (a, b) => a.order - b.order || a.filename.localeCompare(b.filename)
  );
  return sections;
}

// JSON-based home schema
export type HomeSectionBase = {
  id?: string;
  order?: number;
  title?: string;
  type: 'intro' | 'hobbies' | 'career' | 'now' | 'custom';
};

export type HomeIntro = HomeSectionBase & {
  type: 'intro';
  name?: string;
  role?: string;
  summary?: string;
  highlights?: string[];
  links?: { label: string; url: string }[];
};

export type HomeHobbies = HomeSectionBase & {
  type: 'hobbies';
  items: string[];
};

export type HomeCareer = HomeSectionBase & {
  type: 'career';
  timeline: Array<{
    // Either period (legacy) or start/end pair
    period?: string; // e.g. "2018-2020" (legacy)
    start?: string; // e.g. "2018"
    end?: string; // if missing => ongoing
    role?: string;
    org?: string;
    description?: string;
  }>;
};

export type HomeNow = HomeSectionBase & {
  type: 'now';
  items: string[]; // things I'm working on now
};

export type HomeCustom = HomeSectionBase & {
  type: 'custom';
  body: string; // plain text/markdown (optional rendering)
};

export type HomeJsonSection =
  | HomeIntro
  | HomeHobbies
  | HomeCareer
  | HomeNow
  | HomeCustom;

export function loadHomeJson(): HomeJsonSection[] {
  if (!fs.existsSync(HOME_JSON_PATH)) return [];
  const raw = fs.readFileSync(HOME_JSON_PATH, 'utf8');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error('Invalid JSON in content/home/index.json');
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const sections = (parsed as HomeJsonSection[])
    .filter((s) => s && typeof s === 'object' && 'type' in s)
    .map((s, idx) => ({
      order: s.order ?? idx,
      ...s,
    }))
    .sort((a, b) => a.order! - b.order!);
  return sections as HomeJsonSection[];
}

export function loadHomeYaml(): HomeJsonSection[] {
  const yamlPath = HOME_YAML_PATHS.find((p) => fs.existsSync(p));
  if (!yamlPath) return [];
  const raw = fs.readFileSync(yamlPath, 'utf8');
  let parsed: unknown;
  try {
    parsed = YAML.parse(raw);
  } catch {
    console.error(`Invalid YAML in ${path.basename(yamlPath)}`);
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const sections = (parsed as HomeJsonSection[])
    .filter((s) => s && typeof s === 'object' && 'type' in s)
    .map((s, idx) => ({
      order: s.order ?? idx,
      ...s,
    }))
    .sort((a, b) => a.order! - b.order!);
  return sections as HomeJsonSection[];
}

// Prefer YAML if present, otherwise JSON, otherwise []
export function loadHomeConfig(): HomeJsonSection[] {
  const y = loadHomeYaml();
  if (y.length) return y;
  return loadHomeJson();
}
