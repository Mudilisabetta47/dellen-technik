import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { GUIDES, readMinutes, type Guide } from '@/content/guides';

export function GuideRows({ guides }: { guides: Guide[] }) {
  return (
    <ul>
      {guides.map((g, i) => (
        <Reveal as="li" key={g.slug} delay={i * 0.05} className="border-t border-white/10 last:border-b">
          <Link href={`/ratgeber/${g.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-1 py-6 md:py-8">
            <span className="font-mono text-sm text-fg-mute">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="block font-display text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-medium tracking-[-.03em] transition-colors duration-500 group-hover:text-brand">{g.title}</span>
              <span className="mt-1 block font-mono text-[.68rem] uppercase tracking-[.18em] text-fg-mute">{g.category} · {readMinutes(g)} Min. Lesezeit</span>
            </span>
            <Icon name="arrowUpRight" size={22} className="text-fg-mute transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

export function GuidesTeaser() {
  const items = GUIDES.slice(0, 5);
  return (
    <section aria-labelledby="ratgeber-h" className="section bg-ink-900">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">Ratgeber</p>
            <h2 id="ratgeber-h" className="h2 mt-6">Gut zu wissen.</h2>
            <p className="lead mt-6">Antworten auf die häufigsten Fragen rund um Dellen, Hagelschäden und Smart-Repair.</p>
            <Link href="/ratgeber" className="link-u mt-8 inline-flex items-center gap-2 text-brand">Alle Ratgeber →</Link>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <GuideRows guides={items} />
        </div>
      </div>
    </section>
  );
}
