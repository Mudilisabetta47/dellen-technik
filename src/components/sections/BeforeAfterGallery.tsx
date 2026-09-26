'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { BeforeAfter } from '@/components/motion/BeforeAfter';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { Cta } from '@/components/ui/Cta';
import { CASES } from '@/content/site';

function MaskIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { clipPath: 'inset(12% 8% 12% 8% round 2rem)', opacity: 0 }}
      animate={reduced || seen ? { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', opacity: 1 } : {}}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Akt 04: Das Ergebnis – die drei echten Vorher/Nachher-Fälle groß inszeniert. */
export function BeforeAfterGallery() {
  return (
    <section id="galerie" aria-labelledby="galerie-h" className="section relative bg-ink-900">
      <div className="shell">
        <p className="eyebrow">Akt 04 — Das Ergebnis</p>
        <h2 id="galerie-h" className="h2 mt-6 max-w-[14ch]">
          <SplitLines lines={['Ergebnisse aus', 'unserer Werkstatt.']} />
        </h2>
        <Reveal delay={0.15}>
          <p className="lead mt-8 max-w-xl">Echte Reparaturen aus unserer Werkstatt – ziehen Sie den Regler und sehen Sie selbst den Unterschied.</p>
        </Reveal>

        <div className="mt-20 space-y-24 md:space-y-36">
          {CASES.map((c, i) => (
            <article key={c.id} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <MaskIn className={`overflow-hidden ${i % 2 ? 'lg:order-2 lg:col-span-7' : 'lg:col-span-7'}`}>
                <BeforeAfter before={`${c.src}-vorher.jpg`} after={`${c.src}-nachher.jpg`} alt={c.alt} w={c.w} h={c.h} sizes="(min-width: 1024px) 55vw, 92vw" className="rounded-[1.5rem]" />
              </MaskIn>
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}>
                <Reveal>
                  <p className="font-mono text-sm text-brand">0{i + 1} / 0{CASES.length}</p>
                  <h3 className="h3 mt-4 !text-[clamp(1.8rem,1.2rem+2vw,3rem)]">{c.title}</h3>
                  <p className="mt-2 font-mono text-[.78rem] uppercase tracking-[.18em] text-fg-mute">{c.label}</p>
                  <p className="mt-6 max-w-sm text-fg-dim">{c.caption}</p>
                  <Link href={`/vorher-nachher#${c.id}`} className="link-u mt-6 inline-block text-brand">Fallbeispiel ansehen →</Link>
                </Reveal>
              </div>
            </article>
          ))}
        </div>

        <Reveal className="mt-24 flex flex-wrap items-center gap-4">
          <Cta href="/kontakt#anfrage">Schaden einschätzen lassen</Cta>
          <p className="text-fg-mute">Kostenlose Ersteinschätzung vor Ort.</p>
        </Reveal>
      </div>
    </section>
  );
}
