'use client';

import React, { useMemo, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// Themes
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// Languages (register only what we need)
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import less from 'react-syntax-highlighter/dist/esm/languages/prism/less';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import toml from 'react-syntax-highlighter/dist/esm/languages/prism/toml';
import ini from 'react-syntax-highlighter/dist/esm/languages/prism/ini';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin';
import swift from 'react-syntax-highlighter/dist/esm/languages/prism/swift';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import graphql from 'react-syntax-highlighter/dist/esm/languages/prism/graphql';

// Register languages
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('diff', diff);
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('less', less);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('toml', toml);
SyntaxHighlighter.registerLanguage('ini', ini);
SyntaxHighlighter.registerLanguage('docker', docker);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('graphql', graphql);

type CodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  children?: React.ReactNode;
  inline?: boolean;
};

function parseInfoFromClassName(className?: string) {
  // className example: "language-ts", or "language-ts:app.tsx" if injected by remark plugin
  if (!className)
    return {
      lang: undefined as string | undefined,
      filename: undefined as string | undefined,
    };
  const m = className.match(/language-([^\s]+)/);
  if (!m) return { lang: undefined, filename: undefined };
  const info = m[1];
  const [lang, maybeFile] = info.split(':', 2);
  return { lang, filename: maybeFile };
}

export default function CodeBlock(props: CodeProps) {
  const { className, children, inline, ...rest } = props;

  // Prefer filename set by remark plugin via data-filename attribute
  const dataFilename = (rest as unknown as Record<string, unknown>)[
    'data-filename'
  ] as string | undefined;
  const info = parseInfoFromClassName(className);
  const lang = info.lang || 'javascript';
  const filename = dataFilename || info.filename;

  const code = useMemo(
    () => String(children ?? '').replace(/\n$/, ''),
    [children]
  );

  // Always use a dark theme for code blocks
  const [isCopied, setIsCopied] = useState(false);

  // Inline code after hooks (no early returns before hooks)
  if (inline) {
    return (
      <code
        className="rounded bg-slate-100 px-1 py-0.5 text-[0.9em] dark:bg-slate-700"
        {...rest}
      >
        {children}
      </code>
    );
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch {
      // noop
    }
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-700/60">
      {(filename || lang) && (
        <div className="flex items-center justify-between border-b border-slate-800 bg-gray-700 px-3 py-2 text-xs font-medium text-slate-200">
          <span className="truncate">
            {filename ?? (lang ? `${lang}` : '')}
          </span>
          <button
            onClick={onCopy}
            onBlur={() => setIsCopied(false)}
            className="rounded bg-slate-700 px-2 py-1 text-[10px] text-slate-100 hover:bg-slate-600"
            aria-label={isCopied ? 'Copied' : 'Copy code'}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={lang}
        style={vscDarkPlus}
        PreTag="pre"
        CodeTag="code"
        customStyle={{ margin: 0, borderRadius: 0 }}
        codeTagProps={{ className: `language-${lang}` }}
        className={`m-0 overflow-auto p-4 language-${lang}`}
        wrapLongLines={false}
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
