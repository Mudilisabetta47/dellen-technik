import Link from 'next/link';

export type Crumb = { name: string; path: string };

/** Sichtbare Brotkrumen; das passende BreadcrumbList-Markup setzt die jeweilige Seite. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen" className="font-mono text-[.68rem] uppercase tracking-[.16em] text-fg-mute">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-fg-dim">{c.name}</span>
              ) : (
                <Link href={c.path} className="link-u hover:text-fg">{c.name}</Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
