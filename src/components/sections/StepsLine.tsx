'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import type { Step } from '@/content/services';

/** Ablauf-Liste mit Progress-Linie, die sich beim Scrollen füllt; große Ziffer im Hintergrund. */
export function StepsLine({ title, steps }: { title: string; steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section aria-labelledby="steps-h" className="section bg-ink-900">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">Ablauf</p>
              <h2 id="steps-h" className="h2 mt-6 max-w-[14ch]">{title}</h2>
            </Reveal>
          </div>
        </div>
        <div ref={ref} className="relative lg:col-span-7">
          <div aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-white/15">
            <motion.div className="h-full w-px origin-top bg-brand" style={reduced ? undefined : { scaleY: fill }} />
          </div>
          <ol className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <li key={s.title} className="relative pl-14">
                <span className="absolute left-[9px] top-2 h-3.5 w-3.5 rounded-full border-2 border-brand bg-ink-900" />
                <Reveal>
                  <span aria-hidden="true" className="pointer-events-none absolute -top-8 right-0 select-none font-display text-[clamp(6rem,4rem+10vw,12rem)] font-semibold leading-none tracking-[-.06em] text-white/[.045]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-sm text-brand">Schritt {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="h3 mt-3 !text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)]">{s.title}</h3>
                  <p className="mt-4 max-w-[44ch] text-lead text-fg-dim">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
