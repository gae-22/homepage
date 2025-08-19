import Link from 'next/link';

export default function Tag({
  tag,
  onClick,
  active = false,
}: {
  tag: string;
  onClick?: (tag: string) => void;
  active?: boolean;
}) {
  const className = `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
    active
      ? 'border-transparent bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/15 text-primary'
      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
  }`;

  if (onClick) {
    return (
      <button type="button" onClick={() => onClick(tag)} className={className}>
        {tag}
      </button>
    );
  }

  return (
    <Link href={`/tags/${encodeURIComponent(tag)}`} className={`${className}`}>
      {tag}
    </Link>
  );
}
