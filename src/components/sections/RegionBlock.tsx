import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { Cta } from '@/components/ui/Cta';
import { BIZ } from '@/content/site';

/** Regionale Relevanz einer Landingpage: Text, Orte und Weg zur Regionalseite. */
export function RegionBlock({ id, eyebrow, title, paras, regionSlug, places }: { id: string; eyebrow: string; title: string; paras: string[]; regionSlug: string; places: string[] }) {
  return (
    <section aria-labelledby={id} className="section bg-ink-900">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id} className="h2 mt-6 max-w-[16ch]">
            <SplitLines lines={[title]} />
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {places.map((p) => (
              <li key={p} className="rounded-full border border-white/20 px-4 py-2 text-[.9rem] text-fg-dim">{p}</li>
            ))}
          </ul>
        </div>
        <div className="prose-dt lg:col-span-6 lg:pt-3">
          {paras.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
            <Cta href={BIZ.routeUrl} variant="ghost" icon="arrowUpRight" ariaLabel="Route in Google Maps planen (öffnet neuen Tab)">Route planen</Cta>
            <Link href={`/einzugsgebiet/${regionSlug}`} className="link-u text-brand">Alles zum Einzugsgebiet →</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
