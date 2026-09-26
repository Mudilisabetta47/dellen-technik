import type { LegalSection } from '@/content/legal';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export function LegalPage({ title, sections, path }: { title: string; sections: LegalSection[]; path: string }) {
  return (
    <section className="bg-ink-950 pb-24 pt-40 md:pb-36">
      <div className="shell max-w-3xl">
        <Breadcrumbs items={[{ name: 'Start', path: '/' }, { name: title, path }]} />
        <h1 className="h1 mt-8 !text-[clamp(2.4rem,1.4rem+4vw,5rem)]">{title}</h1>
        <div className="mt-14 space-y-12">
          {sections.map((s, i) => (
            <div key={i}>
              {s.title && <h2 className="h3 !text-[clamp(1.3rem,1.1rem+.8vw,1.8rem)]">{s.title}</h2>}
              <div className={`space-y-4 text-fg-dim ${s.title ? 'mt-4' : ''}`}>
                {s.blocks.map((b, j) => {
                  if (b.type === 'p') return <p key={j}>{b.text}</p>;
                  if (b.type === 'lines')
                    return (
                      <p key={j}>
                        {b.lines.map((l, k) => (
                          <span key={k} className="block">
                            {l}
                          </span>
                        ))}
                      </p>
                    );
                  return (
                    <ul key={j} className="list-disc space-y-2 pl-6 marker:text-brand">
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
