import { ScrollWords } from '@/components/motion/ScrollWords';
import { Reveal } from '@/components/motion/Reveal';
import Link from 'next/link';

/** Akt 01: Der Schaden – ein ruhiges, großes Statement, das mit dem Scrollen aufleuchtet. */
export function Statement() {
  return (
    <section id="akt-schaden" className="section relative bg-ink-900">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow">Akt 01 — Der Schaden</p>
          <ul className="mt-6 space-y-2 font-mono text-[.78rem] uppercase tracking-[.16em] text-fg-mute">
            <li>Parkrempler</li>
            <li>Türkante</li>
            <li>Einkaufswagen</li>
            <li>Hagel</li>
          </ul>
        </Reveal>
        <div className="lg:col-span-9">
          <ScrollWords
            className="font-display text-[clamp(1.9rem,1rem+3.9vw,4.6rem)] font-medium leading-[1.02] tracking-[-.04em]"
            text="Eine Delle sieht nach wenig aus. Aber sie stört bei jedem Blick aufs Auto – und oft lässt sie sich lackschonend entfernen."
          />
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-3">
            <Link href="/leistungen/dellenbeseitigung" className="link-u inline-flex w-fit items-center gap-3 text-lg text-brand">
              So entfernen wir Dellen lackschonend →
            </Link>
            <Link href="/leistungen/delle-ohne-lackieren-bremen" className="link-u inline-flex w-fit items-center gap-3 text-fg-dim hover:text-fg">
              Delle ohne Lackieren in Bremen – wann geht das?
            </Link>
            <Link href="/leistungen/parkdelle-reparieren" className="link-u inline-flex w-fit items-center gap-3 text-fg-dim hover:text-fg">
              Parkdelle reparieren lassen
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
