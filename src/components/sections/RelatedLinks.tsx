import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/ui/Icon';
import { SERVICES } from '@/content/services';
import { REGIONS } from '@/content/regions';
import { GUIDES } from '@/content/guides';
import { LANDINGS } from '@/content/landings';
import { GuideRows } from './GuidesTeaser';

/** Interne Verlinkung: Leistung → verwandte Leistung → Landingpage → Region → Ratgeber. */
export function RelatedLinks({
  services = [],
  regions = [],
  guides = [],
  landings = [],
  title = 'Passend dazu.',
}: {
  services?: string[];
  regions?: string[];
  guides?: string[];
  landings?: string[];
  title?: string;
}) {
  const sv = services.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean) as typeof SERVICES;
  const rg = regions.map((s) => REGIONS.find((x) => x.slug === s)).filter(Boolean) as typeof REGIONS;
  const gd = guides.map((s) => GUIDES.find((x) => x.slug === s)).filter(Boolean) as typeof GUIDES;
  const ld = landings.map((s) => LANDINGS.find((x) => x.slug === s)).filter(Boolean) as typeof LANDINGS;
  return (
    <section aria-labelledby="related-h" className="section bg-ink-900">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Weiterlesen</p>
          <h2 id="related-h" className="h2 mt-6">{title}</h2>
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {(sv.length > 0 || ld.length > 0) && (
              <>
                <h3 className="eyebrow-mute">Leistungen</h3>
                <ul className="mt-5">
                  {sv.map((s) => (
                    <li key={s.slug} className="border-t border-white/10 last:border-b">
                      <Link href={`/leistungen/${s.slug}`} className="group flex items-center justify-between gap-4 py-5">
                        <span className="font-display text-xl font-medium tracking-[-.02em] transition-colors duration-500 group-hover:text-brand">{s.title}</span>
                        <Icon name="arrowUpRight" size={18} className="text-fg-mute transition-colors group-hover:text-brand" />
                      </Link>
                    </li>
                  ))}
                  {ld.map((l) => (
                    <li key={l.slug} className="border-t border-white/10 last:border-b">
                      <Link href={`/leistungen/${l.slug}`} className="group flex items-center justify-between gap-4 py-5">
                        <span className="font-display text-xl font-medium tracking-[-.02em] transition-colors duration-500 group-hover:text-brand">{l.h1.join(' ')}</span>
                        <Icon name="arrowUpRight" size={18} className="text-fg-mute transition-colors group-hover:text-brand" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {rg.length > 0 && (
              <>
                <h3 className="eyebrow-mute mt-10">In Ihrer Region</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {rg.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/einzugsgebiet/${r.slug}`} className="inline-flex rounded-full border border-white/20 px-4 py-2 text-[.9rem] transition-colors duration-500 hover:border-brand hover:text-brand">
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {gd.length > 0 && (
            <div className="lg:col-span-8">
              <h3 className="eyebrow-mute">Ratgeber</h3>
              <div className="mt-5">
                <GuideRows guides={gd} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
