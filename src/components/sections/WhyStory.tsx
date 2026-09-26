'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { WHY } from '@/content/site';

/**
 * Akt 05: Vertrauen – links bleibt die Bühne sichtbar, rechts wandern sieben Gründe durch.
 * Der jeweils aktive Grund wird über IntersectionObserver bestimmt (kein Scroll-Listener).
 */
export function WhyStory() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const sec = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sec, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('li');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sec} id="warum" aria-labelledby="warum-h" className="relative overflow-clip bg-ink-950">
      <motion.div aria-hidden="true" className="absolute inset-x-0 -inset-y-[10%] opacity-[.32]" style={reduced ? undefined : { y: bgY }}>
        <Image src="/images/hochglanz-lack-karosserie-detail.jpg" alt="" fill sizes="100vw" quality={60} className="object-cover" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,.96)_0%,rgba(5,5,6,.7)_50%,rgba(5,5,6,.92)_100%)]" />

      <div className="shell relative grid gap-12 py-24 lg:grid-cols-12 lg:gap-20 lg:py-40">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Akt 05 — Vertrauen</p>
            <h2 id="warum-h" className="h2 mt-6">
              <SplitLines lines={['Präzision.', 'Erfahrung.', <span key="v" className="metal-text">Vertrauen.</span>]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="lead mt-8 max-w-md">
                Saubere Handwerksarbeit, ehrliche Beratung und ein hoher Anspruch an Qualität – damit Ihr Fahrzeug wieder in Bestform ist.
              </p>
            </Reveal>
            <div className="mt-12 hidden items-end gap-6 lg:flex" aria-hidden="true">
              <span className="font-display text-[9rem] font-semibold leading-[.8] tracking-[-.06em] text-brand/90 tabular-nums">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="pb-3 font-mono text-sm text-fg-mute">/ {String(WHY.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="lg:col-span-7">
          {WHY.map((w, i) => (
            <li key={w.title} data-i={i} className="flex min-h-[34svh] flex-col justify-center border-t border-white/10 py-10 first:border-t-0 lg:min-h-[52svh]">
              <div className={`transition-opacity duration-700 ease-out ${active === i ? 'lg:opacity-100' : 'lg:opacity-30'}`}>
                <p className="font-mono text-sm text-brand">{String(i + 1).padStart(2, '0')}</p>
                <h3 className={`mt-4 font-display text-[clamp(1.9rem,1rem+3vw,4rem)] font-medium leading-[.98] tracking-[-.04em] transition-colors duration-700 ${active === i ? 'text-fg' : 'text-fg-dim'}`}>
                  {w.title}
                </h3>
                <p className="mt-5 max-w-[42ch] text-lead text-fg-dim">{w.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
