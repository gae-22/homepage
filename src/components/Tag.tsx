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
  const className = `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs transition-colors ${
    active
      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary'
      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
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
