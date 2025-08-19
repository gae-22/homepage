type Props = {
  url: string;
};

async function fetchOG(url: string) {
  try {
    const res = await fetch(url, {
      cache: 'force-cache',
      next: { revalidate: 60 * 60 * 24 },
    });
    const html = await res.text();
    const title =
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i.exec(
        html
      )?.[1] || /<title>([^<]+)<\/title>/i.exec(html)?.[1];
    const desc =
      /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i.exec(
        html
      )?.[1] ||
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i.exec(
        html
      )?.[1];
    const image =
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i.exec(
        html
      )?.[1];
    const site =
      /<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["'][^>]*>/i.exec(
        html
      )?.[1];
    return { title, desc, image, site };
  } catch {
    return {
      title: undefined,
      desc: undefined,
      image: undefined,
      site: undefined,
    };
  }
}

export default async function LinkCard({ url }: Props) {
  const og = await fetchOG(url);
  const u = new URL(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose mt-6 block overflow-hidden rounded-xl border border-slate-200/70 transition hover:shadow-md dark:border-slate-700/60"
    >
      <div className="flex items-stretch">
        {og.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={og.image}
            alt=""
            className="h-28 w-40 flex-none object-cover"
          />
        ) : (
          <div className="h-28 w-40 flex-none bg-slate-100 dark:bg-slate-800" />
        )}
        <div className="min-w-0 flex-1 p-3">
          <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
            {og.title || url}
          </div>
          {og.desc && (
            <div className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-slate-300">
              {og.desc}
            </div>
          )}
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{og.site || u.hostname}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
