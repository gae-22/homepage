import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const standaloneDir = path.join(root, '.next', 'standalone');
const standaloneNextDir = path.join(standaloneDir, '.next');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (!fs.existsSync(standaloneDir)) {
  console.error('Standalone directory not found. Run `npm run build` first.');
  process.exit(1);
}

// Copy .next/static => .next/standalone/.next/static
const srcStatic = path.join(root, '.next', 'static');
const destStatic = path.join(standaloneNextDir, 'static');
if (fs.existsSync(srcStatic)) {
  copyDir(srcStatic, destStatic);
  console.log(`Copied: ${srcStatic} -> ${destStatic}`);
} else {
  console.warn('No .next/static found to copy.');
}

// Copy public => .next/standalone/public (optional but recommended)
const srcPublic = path.join(root, 'public');
const destPublic = path.join(standaloneDir, 'public');
if (fs.existsSync(srcPublic)) {
  copyDir(srcPublic, destPublic);
  console.log(`Copied: ${srcPublic} -> ${destPublic}`);
}

// Ensure content/ (already present in many cases) includes search-index.json if needed
const srcSearchIndex = path.join(root, 'public', 'search-index.json');
const destSearchIndex = path.join(standaloneDir, 'public', 'search-index.json');
if (fs.existsSync(srcSearchIndex)) {
  fs.mkdirSync(path.dirname(destSearchIndex), { recursive: true });
  fs.copyFileSync(srcSearchIndex, destSearchIndex);
}

console.log('Standalone pack complete.');
