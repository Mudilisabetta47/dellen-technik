'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SERVICES, type Service } from '@/content/services';
import { SERVICE_IMAGES } from '@/content/images';

const PANEL_VW = 62;
const GAP_VW = 3;
const INTRO_VW = 40;
const TOTAL_VW = INTRO_VW + SERVICES.length * (PANEL_VW + GAP_VW) + 8;

function Panel({ s, drift }: { s: Service; drift: MotionValue<number> }) {
  const img = SERVICE_IMAGES[s.image];
  const x = useTransform(drift, [0, 1], ['6vw', '-6vw']);
  return (
    <Link
      href={`/leistungen/${s.slug}`}
      data-cursor="Ansehen"
      className="group relative block h-[72svh] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-ink-800"
      style={{ width: `${PANEL_VW}vw` }}
    >
      <motion.div className="absolute inset-y-0 -left-[8vw] -right-[8vw]" style={{ x }}>
        <Image
          src={img.src}
          alt={s.imageAlt}
          fill
          sizes="80vw"
          quality={72}
          className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
          style={{ objectPosition: img.position }}
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,6,.92)_0%,rgba(5,5,6,.3)_50%,rgba(5,5,6,.25)_100%)]" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-8">
        <span className="font-mono text-sm text-brand">{s.n}</span>
        <span className="rounded-full border border-white/25 bg-ink-900/40 px-4 py-1.5 font-mono text-[.68rem] uppercase tracking-[.2em] text-fg backdrop-blur">{s.kicker}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
        <h3 className="font-display text-[clamp(2rem,1rem+2.6vw,4.2rem)] font-medium leading-[.95] tracking-[-.04em]">{s.title}</h3>
        <p className="mt-4 max-w-[34ch] text-lead text-fg-dim">{s.quote}</p>
        <span className="mt-6 inline-flex items-center gap-3 font-mono text-[.72rem] uppercase tracking-[.2em] text-brand">
          Mehr erfahren <Icon name="arrow" size={16} className="transition-transform duration-500 ease-out group-hover:translate-x-2" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Akt 03: Die Reparatur – sechs Leistungen als horizontale Galerie.
 * Desktop: die Sektion pinnt, vertikales Scrollen bewegt die Spur seitwärts.
 * Mobile: natives Wischen mit Scroll-Snap (kein Pinning, keine Scroll-Fallen).
 */
export function ServicesGallery() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${TOTAL_VW - 100}vw`]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const intro = (
    <div className="shrink-0" style={{ width: `${INTRO_VW}vw` }}>
      <p className="eyebrow">Akt 03 — Die Reparatur</p>
      <h2 id="leistungen-h" className="h2 mt-6 max-w-[10ch]">
        Sechs Leistungen. <span className="metal-text">Ein Anspruch.</span>
      </h2>
      <p className="lead mt-6 max-w-[26rem]">Saubere Handwerksarbeit an Karosserie und Lack – von der Parkdelle bis zum Hagelschaden.</p>
    </div>
  );

  return (
    <>
      {/* Desktop: gepinnte horizontale Spur */}
      <section
        ref={ref}
        id="leistungen"
        aria-labelledby="leistungen-h"
        className="relative hidden bg-ink-950 lg:block"
        style={{ height: reduced ? 'auto' : `calc(${TOTAL_VW - 100}vw + 100svh)` }}
      >
        <div className={reduced ? 'py-24' : 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden'}>
          <motion.div className={`flex items-center ${reduced ? 'flex-wrap gap-6 px-[var(--shell-pad)]' : ''}`} style={reduced ? undefined : { x, gap: `${GAP_VW}vw`, paddingLeft: '4vw' }}>
            {intro}
            {SERVICES.map((s) => (
              <Panel key={s.slug} s={s} drift={scrollYProgress} />
            ))}
          </motion.div>
          {!reduced && (
            <div className="absolute inset-x-[var(--shell-pad)] bottom-8 flex items-center gap-6">
              <span className="font-mono text-[.7rem] uppercase tracking-[.2em] text-fg-mute">Weiter scrollen</span>
              <div className="h-px flex-1 bg-white/15">
                <motion.div className="h-full origin-left bg-brand" style={{ scaleX: bar }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile/Tablet: Wisch-Galerie */}
      <section id="leistungen-mobil" aria-labelledby="leistungen-h-m" className="relative overflow-hidden bg-ink-950 py-20 lg:hidden">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Akt 03 — Die Reparatur</p>
            <h2 id="leistungen-h-m" className="h2 mt-5 max-w-[10ch]">
              Sechs Leistungen. <span className="metal-text">Ein Anspruch.</span>
            </h2>
            <p className="lead mt-5">Saubere Handwerksarbeit an Karosserie und Lack – von der Parkdelle bis zum Hagelschaden.</p>
          </Reveal>
        </div>
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--shell-pad)] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICES.map((s) => {
            const img = SERVICE_IMAGES[s.image];
            return (
              <li key={s.slug} className="w-[82vw] max-w-[26rem] shrink-0 snap-center">
                <Link href={`/leistungen/${s.slug}`} className="group relative block h-[30rem] overflow-hidden rounded-3xl border border-white/10 bg-ink-800">
                  <Image src={img.src} alt={s.imageAlt} fill sizes="82vw" quality={70} className="object-cover" style={{ objectPosition: img.position }} />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,6,.95)_0%,rgba(5,5,6,.35)_55%,rgba(5,5,6,.2)_100%)]" />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
                    <span className="font-mono text-sm text-brand">{s.n}</span>
                    <span className="rounded-full border border-white/25 bg-ink-900/40 px-3 py-1 font-mono text-[.62rem] uppercase tracking-[.18em] backdrop-blur">{s.kicker}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-[clamp(1.3rem,5.9vw,2rem)] font-medium leading-[.98] tracking-[-.04em]">{s.title}</h3>
                    <p className="mt-3 text-[.95rem] text-fg-dim">{s.quote}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[.68rem] uppercase tracking-[.2em] text-brand">
                      Mehr erfahren <Icon name="arrow" size={14} />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
