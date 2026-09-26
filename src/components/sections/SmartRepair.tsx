'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { SERVICE_IMAGES } from '@/content/images';

const ITEMS = [
  { n: '01', title: 'Kleinere Karosserieschäden', text: 'Begrenzte Schäden an der Karosserie, für die keine große Reparatur nötig ist.', image: 'workshop' as const, href: '/leistungen/smart-repair' },
  { n: '02', title: 'Dellen', text: 'Lackschonend zurückgeformt – oft ohne Spachteln und Neulackierung.', image: 'dent' as const, href: '/leistungen/dellenbeseitigung' },
  { n: '03', title: 'Beulen', text: 'Saubere Entfernung von Beulen an Karosserie und Fahrzeugteilen.', image: 'large' as const, href: '/leistungen/beulenentfernung' },
  { n: '04', title: 'Lackauffrischung', text: 'Mehr Glanz, mehr Farbtiefe – für ein gepflegtes Gesamtbild.', image: 'gloss' as const, href: '/leistungen/lackauffrischung' },
];

export function SmartRepair() {
  const [active, setActive] = useState(0);
  const img = SERVICE_IMAGES[ITEMS[active].image];

  return (
    <section id="smart-repair" aria-labelledby="smart-h" className="section relative bg-ink-900">
      <div className="shell">
        <p className="eyebrow">Smart-Repair</p>
        <h2 id="smart-h" className="h2 mt-6 max-w-[17ch]">
          <SplitLines lines={['Kleine Schäden müssen', 'nicht nach großer', 'Reparatur aussehen.']} />
        </h2>
        <Reveal delay={0.1}>
          <p className="lead mt-8 max-w-xl">
            Effiziente Reparatur kleiner Schäden ohne aufwendige Komplettlackierung – punktgenau, sauber und so schonend wie möglich.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <ul className="lg:col-span-6" onMouseLeave={() => undefined}>
            {ITEMS.map((it, i) => (
              <li key={it.n} className="border-t border-white/10 last:border-b">
                <Link
                  href={it.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-start gap-6 py-7 md:py-9"
                  aria-current={active === i ? 'true' : undefined}
                >
                  <span className={`font-mono text-sm transition-colors duration-500 ${active === i ? 'text-brand' : 'text-fg-mute'}`}>{it.n}</span>
                  <span className="flex-1">
                    <span className={`block font-display text-[clamp(1.35rem,1rem+2.2vw,3rem)] [hyphens:auto] break-words font-medium leading-none tracking-[-.035em] transition-[color,transform] duration-500 ease-out ${active === i ? 'translate-x-2 text-fg' : 'text-fg-mute group-hover:text-fg'}`}>
                      {it.title}
                    </span>
                    <span className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out ${active === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 lg:opacity-0'}`}>
                      <span className="overflow-hidden">
                        <span className="mt-4 block max-w-[38ch] text-fg-dim">{it.text}</span>
                      </span>
                    </span>
                  </span>
                  <Icon name="arrowUpRight" size={22} className={`mt-1 transition-all duration-500 ease-out ${active === i ? 'translate-x-0 text-brand opacity-100' : '-translate-x-2 opacity-0'}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-800 lg:col-span-6 lg:aspect-[5/6]" aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.15 }}
                animate={{ clipPath: 'inset(0 0 0% 0)', scale: 1 }}
                exit={{ opacity: 0.9 }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 45vw, 92vw" quality={72} className="object-cover" style={{ objectPosition: img.position }} />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,6,.6)_0%,transparent_45%)]" />
            <p className="absolute bottom-6 left-6 font-mono text-[.7rem] uppercase tracking-[.2em] text-fg">{ITEMS[active].n} — {ITEMS[active].title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
