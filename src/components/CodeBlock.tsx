'use client';

import React, { useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-graphql';

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

  const html = useMemo(() => {
    const allLangs: Record<string, unknown> = (
      Prism as unknown as {
        languages: Record<string, unknown>;
      }
    ).languages;
    const grammar =
      (allLangs[lang] as Prism.Grammar) || Prism.languages.javascript;
    try {
      return Prism.highlight(code, grammar, lang);
    } catch {
      return code;
    }
  }, [code, lang]);

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
    } catch {
      // noop
    }
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-700/60">
      {(filename || lang) && (
        <div className="flex items-center justify-between border-b border-slate-200/70 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-700/60 dark:bg-slate-800 dark:text-slate-300">
          <span className="truncate">
            {filename ?? (lang ? `${lang}` : '')}
          </span>
          <button
            onClick={onCopy}
            className="rounded bg-slate-200 px-2 py-1 text-[10px] text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            aria-label="Copy code"
          >
            Copy
          </button>
        </div>
      )}
      <pre className="m-0 overflow-auto p-4">
        {/* eslint-disable-next-line react/no-danger */}
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}
