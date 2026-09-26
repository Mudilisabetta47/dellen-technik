import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/ui/Icon';
import { guidesForService, landingsForService } from '@/content/cluster';
import { readMinutes } from '@/content/guides';

/** Themenübersicht auf der Hauptleistung (Pillar): alle passenden Landingpages und Ratgeber. */
export function ClusterSection({ serviceSlug, title }: { serviceSlug: string; title: string }) {
  const guides = guidesForService(serviceSlug, 12);
  const landings = landingsForService(serviceSlug);
  if (guides.length + landings.length < 3) return null;
  return (
    <section aria-labelledby="cluster-h" className="section bg-ink-950">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <p className="eyebrow">Themenübersicht</p>
            <h2 id="cluster-h" className="h2 mt-6">{title}</h2>
            <p className="lead mt-6">Antworten zu den häufigsten Fragen rund um dieses Thema – jeweils mit direktem Weg zur Einschätzung.</p>
          </Reveal>
        </div>
        <ul className="lg:col-span-8">
          {landings.map((l, i) => (
            <Reveal as="li" key={l.slug} delay={i * 0.04} className="border-t border-white/10">
              <Link href={`/leistungen/${l.slug}`} className="group flex items-center justify-between gap-6 py-6">
                <span>
                  <span className="block font-mono text-[.66rem] uppercase tracking-[.18em] text-brand">Seite zum Thema</span>
                  <span className="mt-1 block font-display text-[clamp(1.2rem,1rem+1vw,1.8rem)] font-medium tracking-[-.03em] transition-colors duration-500 group-hover:text-brand">{l.h1.join(' ')}</span>
                </span>
                <Icon name="arrowUpRight" size={20} className="text-fg-mute transition-colors group-hover:text-brand" />
              </Link>
            </Reveal>
          ))}
          {guides.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={(landings.length + i) * 0.04} className="border-t border-white/10 last:border-b">
              <Link href={`/ratgeber/${g.slug}`} className="group flex items-center justify-between gap-6 py-6">
                <span>
                  <span className="block font-mono text-[.66rem] uppercase tracking-[.18em] text-fg-mute">{g.category} · {readMinutes(g)} Min.</span>
                  <span className="mt-1 block font-display text-[clamp(1.2rem,1rem+1vw,1.8rem)] font-medium tracking-[-.03em] transition-colors duration-500 group-hover:text-brand">{g.title}</span>
                </span>
                <Icon name="arrowUpRight" size={20} className="text-fg-mute transition-colors group-hover:text-brand" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
