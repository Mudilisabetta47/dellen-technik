'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { DentCanvas } from '@/components/motion/DentCanvas';
import { hailState, STATIC } from '@/components/motion/dent-timeline';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { Reveal } from '@/components/motion/Reveal';
import { useLiteMotion } from '@/hooks/useMedia';

const STEPS = [
  { n: '01', title: 'Schaden prüfen', text: 'Wir sehen uns Ihr Fahrzeug an und nehmen die betroffenen Flächen auf – Motorhaube, Dach, Kofferraum, Seitenteile.', r: [0, 0.03, 0.18, 0.22] },
  { n: '02', title: 'Ausmaß einschätzen', text: 'Wie viele Treffer, wie tief, an welchen Teilen? Sie erhalten eine transparente Einschätzung – ohne überzogene Versprechen.', r: [0.22, 0.26, 0.4, 0.44] },
  { n: '03', title: 'Reparaturmöglichkeit prüfen', text: 'Wir klären, wo eine schonende Reparatur möglich ist und wo nicht. Wo der Originallack erhalten bleiben kann, soll er es.', r: [0.44, 0.48, 0.6, 0.64] },
  { n: '04', title: 'Termin vereinbaren', text: 'Gemeinsam finden wir einen passenden Termin für die Instandsetzung. Termine vergeben wir kurzfristig nach Vereinbarung.', r: [0.64, 0.68, 0.72, 0.76] },
  { n: '05', title: 'Instandsetzung', text: 'Ihr Fahrzeug wird professionell instandgesetzt – Treffer für Treffer – und ist wieder in Bestform.', r: [0.76, 0.8, 1, 1.001] },
] as const;

function Step({ s, p }: { s: (typeof STEPS)[number]; p: MotionValue<number> }) {
  const opacity = useTransform(p, [...s.r], [0, 1, 1, 0]);
  const y = useTransform(p, [...s.r], [34, 0, 0, -26]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 bottom-0">
      <p className="eyebrow">
        {s.n} / 05
      </p>
      <p className="mt-4 font-display text-[clamp(1.9rem,1rem+3.4vw,4rem)] font-medium leading-[.96] tracking-[-.04em]">{s.title}</p>
      <p className="mt-4 max-w-[36ch] text-lead text-fg-dim">{s.text}</p>
    </motion.div>
  );
}

function Dot({ i, p }: { i: number; p: MotionValue<number> }) {
  const r = STEPS[i].r;
  const o = useTransform(p, [r[0], r[1], r[2], r[3]], [0.25, 1, 1, i === 4 ? 1 : 0.25]);
  return <motion.li style={{ opacity: o }} className="h-1.5 w-8 rounded-full bg-brand" />;
}

/** Eigenes Storytelling für Hagelschäden – gleiche Engine, viele kleine Dellen, fünf Schritte. */
export function HailStory({ heading = true }: { heading?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const lite = useLiteMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const headShow = useTransform(scrollYProgress, [0, 0.16, 0.999], [1, 0.35, 0.35]);

  if (reduced) {
    return (
      <section id="hagelschaden" aria-labelledby="hail-h" className="section bg-ink-950">
        <div className="shell">
          <p className="eyebrow">Hagelschaden</p>
          <h2 id="hail-h" className="h2 mt-5 max-w-[16ch]">Hagel hinterlässt Spuren. Wir entfernen sie.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <DentCanvas preset="hail" fixed={STATIC.damaged} className="aspect-[4/3] rounded-3xl" label="Fahrzeugfläche mit vielen Hageldellen" />
            <DentCanvas preset="hail" fixed={STATIC.repaired} className="aspect-[4/3] rounded-3xl" label="Reparierte Fahrzeugfläche" />
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.n}>
                <p className="font-mono text-sm text-brand">{s.n}</p>
                <p className="mt-2 text-xl font-medium">{s.title}</p>
                <p className="mt-2 text-fg-dim">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="hagelschaden" aria-labelledby="hail-h" className="relative h-[420svh] bg-ink-950 md:h-[600svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <DentCanvas
          preset="hail"
          progress={scrollYProgress}
          map={hailState}
          scale={lite ? 0.62 : 1}
          interactive={!lite}
          className="absolute inset-0"
          label="Fahrzeugfläche mit Hageldellen, die Schritt für Schritt repariert werden"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,.85)_0%,rgba(5,5,6,.3)_45%,transparent_70%)] max-md:bg-[linear-gradient(0deg,rgba(5,5,6,.94)_0%,rgba(5,5,6,.5)_42%,transparent_75%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950 to-transparent" />

        <div className="absolute inset-x-0 top-0 z-20">
          <div className="shell pt-24 md:pt-28">
            {heading && <p className="eyebrow">Hagelschaden</p>}
            <motion.h2 id="hail-h" style={{ opacity: headShow }} className="mt-4 font-display text-[clamp(2rem,1.1rem+3.6vw,4.6rem)] font-medium leading-[.94] tracking-[-.045em]">
              <span className="block">Hagel hinterlässt Spuren.</span>
              <span className="metal-text block">Wir entfernen sie.</span>
            </motion.h2>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="shell pb-[6.5rem] md:pb-[11svh]">
            <div className="relative h-[15rem] md:h-[17rem]">
              {STEPS.map((s) => (
                <Step key={s.n} s={s} p={scrollYProgress} />
              ))}
            </div>
            <ul className="mt-6 flex gap-2" aria-hidden="true">
              {STEPS.map((_, i) => (
                <Dot key={i} i={i} p={scrollYProgress} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HailOutro() {
  return (
    <div className="bg-ink-950 pb-24 pt-4">
      <div className="shell">
        <Reveal className="flex flex-wrap items-center gap-4">
          <Cta href="/leistungen/hagelschaden-reparatur">Hagelschaden-Reparatur ansehen</Cta>
          <PhoneCta />
          <Link href="/ratgeber/hagelschaden-am-auto-was-jetzt" className="link-u text-fg-dim hover:text-fg">
            Ratgeber: Was tun bei Hagelschaden?
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
