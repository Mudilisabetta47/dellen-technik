'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { PROCESS } from '@/content/site';
import { SERVICE_IMAGES } from '@/content/images';

const VISUALS = [SERVICE_IMAGES.dent, SERVICE_IMAGES.workshop, SERVICE_IMAGES.polish, SERVICE_IMAGES.gloss];

function ProcessStatic() {
  return (
      <section aria-labelledby="ablauf-h-m" className="section relative bg-ink-900">
        <div className="shell">
          <p className="eyebrow">Ablauf</p>
          <h2 id="ablauf-h-m" className="h2 mt-6 max-w-[14ch]">In vier Schritten zum Ergebnis.</h2>
          <ol className="relative mt-14 space-y-14 border-l border-white/15 pl-8">
            {PROCESS.map((p, i) => (
              <li key={p.n} className="relative">
                <span className="absolute -left-[2.45rem] top-1 h-3 w-3 rounded-full bg-brand" />
                <Reveal>
                  <span aria-hidden="true" className="absolute -top-6 right-0 -z-10 font-display text-[7rem] font-semibold leading-none tracking-[-.06em] text-white/[.05]">{p.n}</span>
                  <p className="font-mono text-sm text-brand">{p.n}</p>
                  <h3 className="h3 mt-3">{p.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-fg-dim">{p.text}</p>
                  <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl">
                    <Image src={VISUALS[i].src} alt="" fill sizes="92vw" quality={65} className="object-cover" style={{ objectPosition: VISUALS[i].position }} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
  );
}

function ProcessSticky() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const line = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(PROCESS.length - 1, Math.max(0, Math.floor(v * PROCESS.length)));
    setActive((cur) => (cur === i ? cur : i));
  });
  const step = PROCESS[active];

  const list = (
    <ol className="mt-10 space-y-2">
      {PROCESS.map((p, i) => (
        <li key={p.n} className="relative pl-10">
          <span className={`absolute left-0 top-[1.05rem] h-3 w-3 rounded-full border transition-colors duration-500 ${i <= active ? 'border-brand bg-brand' : 'border-white/30'}`} />
          <p className={`font-display text-[clamp(1.4rem,1rem+1.4vw,2.2rem)] font-medium tracking-[-.03em] transition-colors duration-500 ${i === active ? 'text-fg' : 'text-fg-mute'}`}>{p.title}</p>
        </li>
      ))}
    </ol>
  );

  return (
    <section ref={ref} aria-labelledby="ablauf-h" className="relative bg-ink-900" style={{ height: '420svh' }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        {/* Große Ziffer im Hintergrund */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={step.n}
            aria-hidden="true"
            initial={{ opacity: 0, y: 80, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -80, scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute -left-[2vw] top-1/2 -translate-y-1/2 select-none font-display text-[min(46vw,60svh)] font-semibold leading-none tracking-[-.07em] text-white/[.045]"
          >
            {step.n}
          </motion.span>
        </AnimatePresence>

        <div className="shell relative grid w-full items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">Ablauf</p>
            <h2 id="ablauf-h" className="h2 mt-5 max-w-[14ch]">In vier Schritten zum Ergebnis.</h2>
            <div className="relative">
              <div aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-white/15">
                <motion.div className="h-full w-px origin-top bg-brand" style={{ scaleY: line }} />
              </div>
              {list}
            </div>
            <div className="relative mt-8 min-h-[7rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-sm text-brand">Schritt {step.n}</p>
                  <p className="mt-2 max-w-[40ch] text-lead text-fg-dim">{step.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative hidden aspect-[4/5] max-h-[72svh] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-800 lg:col-span-6 lg:block lg:justify-self-end lg:w-[min(100%,34rem)]" aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.div
                key={step.n}
                className="absolute inset-0"
                initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.2 }}
                animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                exit={{ opacity: 0.85 }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image src={VISUALS[active].src} alt="" fill sizes="34rem" quality={70} className="object-cover" style={{ objectPosition: VISUALS[active].position }} />
              </motion.div>
            </AnimatePresence>
            <span className="absolute left-5 top-5 rounded-full bg-ink-900/70 px-3 py-1.5 font-mono text-[.68rem] uppercase tracking-[.2em] backdrop-blur">{step.n} / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Ablauf in vier Schritten. Desktop: pinnt und schaltet beim Scrollen; Mobile/Reduced: ruhige Liste. */
export function Process() {
  const reduced = useReducedMotion();
  return (
    <div id="ablauf">
      {reduced ? (
        <ProcessStatic />
      ) : (
        <>
          <div className="hidden lg:block">
            <ProcessSticky />
          </div>
          <div className="lg:hidden">
            <ProcessStatic />
          </div>
        </>
      )}
    </div>
  );
}
