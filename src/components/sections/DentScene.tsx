'use client';

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { BeforeAfter } from '@/components/motion/BeforeAfter';
import { DentCanvas } from '@/components/motion/DentCanvas';
import { clamp01, signatureState, STATIC } from '@/components/motion/dent-timeline';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { Reveal } from '@/components/motion/Reveal';
import { useLiteMotion } from '@/hooks/useMedia';
import { CASES } from '@/content/site';

/** Zeitfenster der Szene im Scroll-Fortschritt: bis HANDOFF läuft die Delle, danach übernimmt das echte Ergebnis. */
const HANDOFF = 0.84;

const PHASES = [
  {
    idx: '00',
    tag: 'Makellos',
    title: 'Makellos.',
    text: 'So sieht eine unbeschädigte Fläche aus: gleichmäßig, klar, mit ruhig verlaufenden Lichtlinien.',
    range: [0, 0.16, 0.2] as const,
    out: [1, 1, 0] as const,
  },
  {
    idx: '01',
    tag: 'Schaden zeigen',
    title: 'Ein Schaden passiert.',
    text: 'Ein Parkrempler, eine Türkante, ein Hagelkorn – und die Lichtlinien brechen. Genau daran erkennt man eine Delle.',
    range: [0.2, 0.25, 0.36, 0.4] as const,
    out: [0, 1, 1, 0] as const,
  },
  {
    idx: '02',
    tag: 'Analyse',
    title: 'Wir analysieren.',
    text: 'Wir prüfen Lack, Tiefe und Lage der Delle und sagen Ihnen ehrlich, ob eine lackschonende Reparatur möglich ist.',
    range: [0.4, 0.44, 0.52, 0.56] as const,
    out: [0, 1, 1, 0] as const,
  },
  {
    idx: '03',
    tag: 'Reparatur',
    title: 'Wir reparieren.',
    text: 'Schritt für Schritt wird die Delle zurückgeformt – ohne Spachteln und Neulackieren, wo der Lack intakt ist.',
    range: [0.56, 0.6, 0.86, 0.9] as const,
    out: [0, 1, 1, 0] as const,
  },
  {
    idx: '04',
    tag: 'Finish',
    title: 'Das Ergebnis.',
    text: 'Die Lichtlinien laufen wieder gerade. Der Lack reflektiert sauber – genau das ist das Ziel jeder Reparatur.',
    range: [0.9, 0.93, 1, 1.001] as const,
    out: [0, 1, 1, 0] as const,
  },
];

const HUD = [
  { n: '01', label: 'Schaden' },
  { n: '02', label: 'Analyse' },
  { n: '03', label: 'Reparatur' },
  { n: '04', label: 'Finish' },
  { n: '05', label: 'Ergebnis' },
];
const HUD_RANGES: [number, number][] = [
  [0.2, 0.4],
  [0.4, 0.56],
  [0.56, 0.9],
  [0.9, 1.001],
  [1.01, 2],
];

function PhaseText({ p, timeline }: { p: (typeof PHASES)[number]; timeline: MotionValue<number> }) {
  const opacity = useTransform(timeline, [...p.range], [...p.out]);
  const y = useTransform(timeline, [...p.range], p.range.length === 3 ? [0, 0, -28] : [36, 0, 0, -28]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 bottom-0 will-change-transform">
      <p className="eyebrow">
        {p.idx} — {p.tag}
      </p>
      <p className="mt-4 font-display text-[clamp(2.4rem,1.2rem+5.2vw,6rem)] font-medium leading-[.92] tracking-[-.045em] text-fg">{p.title}</p>
      <p className="mt-5 max-w-[34ch] text-lead text-fg-dim md:max-w-[38ch]">{p.text}</p>
    </motion.div>
  );
}

function HudItem({ i, timeline, progress }: { i: number; timeline: MotionValue<number>; progress: MotionValue<number> }) {
  const [a, b] = HUD_RANGES[i];
  const src = i === 4 ? progress : timeline;
  const range = i === 4 ? [0.94, 0.97] : [a - 0.001, a];
  const opacity = useTransform(src, i === 4 ? range : [range[0], range[1], b, b + 0.001], i === 4 ? [0.3, 1] : [0.3, 1, 1, 0.3]);
  return (
    <motion.li style={{ opacity }} className="flex items-center gap-3">
      <span className="font-mono text-[.7rem] text-brand">{HUD[i].n}</span>
      <span className="font-mono text-[.7rem] uppercase tracking-[.2em] text-fg">{HUD[i].label}</span>
    </motion.li>
  );
}

/** Callout mit Leitlinie, positioniert an den Ecken des Messrahmens. */
function Callout({ x, y, label, align, timeline }: { x: string; y: string; label: string; align: 'left' | 'right'; timeline: MotionValue<number> }) {
  const opacity = useTransform(timeline, [0.4, 0.44, 0.53, 0.57], [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity, left: x, top: y }} className="absolute z-10 hidden md:block">
      <div className={`flex items-center gap-2 ${align === 'right' ? '-translate-y-1/2 pl-1' : '-translate-x-full -translate-y-1/2 flex-row-reverse pr-1'}`}>
        <span className="h-px w-8 bg-brand" />
        <span className="whitespace-nowrap font-mono text-[.68rem] uppercase tracking-[.18em] text-brand">{label}</span>
      </div>
    </motion.div>
  );
}

function StaticVariant() {
  const c = CASES[0];
  return (
    <section aria-labelledby="dent-static-h" className="section relative border-y border-white/[.06] bg-ink-950">
      <div className="shell">
        <p className="eyebrow">Akt 02 — Vom Schaden zum sauberen Ergebnis</p>
        <h2 id="dent-static-h" className="h2 mt-5 max-w-[16ch]">
          Vom Schaden zum sauberen Ergebnis.
        </h2>
        <p className="lead mt-6 max-w-xl">
          So erkennt man eine Delle: Die Lichtlinien brechen. Nach der Reparatur laufen sie wieder gerade – der Lack reflektiert sauber.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <figure>
            <DentCanvas preset="single" fixed={STATIC.damaged} className="aspect-[4/3] rounded-3xl" label="Fahrzeugfläche mit Delle: die Lichtlinien sind verbogen" />
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-[.18em] text-fg-mute">Schaden</figcaption>
          </figure>
          <figure>
            <DentCanvas preset="single" fixed={STATIC.repaired} className="aspect-[4/3] rounded-3xl" label="Reparierte Fläche: die Lichtlinien laufen wieder gerade" />
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-[.18em] text-fg-mute">Repariert</figcaption>
          </figure>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <BeforeAfter before={`${c.src}-vorher.jpg`} after={`${c.src}-nachher.jpg`} alt={c.alt} w={c.w} h={c.h} className="rounded-3xl" start={50} />
          <p className="mt-3 text-sm text-fg-mute">{c.caption}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Cta href="/kontakt#anfrage">Schaden einschätzen lassen</Cta>
          <PhoneCta />
        </div>
      </div>
    </section>
  );
}

export function DentScene({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  const lite = useLiteMotion();
  const ref = useRef<HTMLElement>(null);
  const [interactive, setInteractive] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const timeline = useTransform(scrollYProgress, (v) => clamp01(v / HANDOFF));
  const handoff = useTransform(scrollYProgress, [HANDOFF, 1], [0, 1]);

  const canvasScale = useTransform(handoff, [0, 0.7], [1, 0.9]);
  const dim = useTransform(handoff, [0.05, 0.6], [0, 0.72]);
  const stageText = useTransform(handoff, [0, 0.2], [1, 0]);
  const cardOpacity = useTransform(handoff, [0.25, 0.6], [0, 1]);
  const cardScale = useTransform(handoff, [0.25, 0.8], [0.9, 1]);
  const cardY = useTransform(handoff, [0.25, 0.8], [40, 0]);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(handoff, 'change', (v) => setInteractive(v > 0.72));

  if (reduced) return <StaticVariant />;
  const c = CASES[0];

  return (
    <section
      ref={ref}
      aria-labelledby="dent-h"
      className={`relative border-y border-white/[.06] bg-ink-950 ${compact ? 'h-[330svh] md:h-[440svh]' : 'h-[390svh] md:h-[580svh]'}`}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Bühne: WebGL-Fläche */}
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: canvasScale }}>
          <DentCanvas
            preset="single"
            progress={timeline}
            map={signatureState}
            scale={lite ? 0.62 : 1}
            interactive={!lite}
            className="absolute inset-0"
            label="Fahrzeugfläche: eine Delle entsteht und wird Schritt für Schritt repariert"
          />
        </motion.div>
        <motion.div aria-hidden="true" className="absolute inset-0 bg-ink-950" style={{ opacity: dim }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,.82)_0%,rgba(5,5,6,.35)_42%,transparent_70%)] max-md:bg-[linear-gradient(0deg,rgba(5,5,6,.92)_0%,rgba(5,5,6,.55)_38%,transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950/80 to-transparent" />

        {/* Callouts am Messrahmen (nur Desktop) */}
        {!lite && (
          <>
            <Callout timeline={timeline} x="calc(60% + 33svh)" y="calc(50% - 33svh)" label="01 · Lackzustand" align="right" />
            <Callout timeline={timeline} x="calc(60% + 33svh)" y="calc(50% + 33svh)" label="02 · Tiefe & Form" align="right" />
            <Callout timeline={timeline} x="calc(60% - 33svh)" y="calc(50% + 33svh)" label="03 · Zugänglichkeit" align="left" />
          </>
        )}

        {/* Kopfzeile */}
        <motion.div style={{ opacity: stageText }} className="absolute inset-x-0 top-0 z-20">
          <div className="shell flex items-center justify-between pt-24 md:pt-28">
            <h2 id="dent-h" className="eyebrow">
              Akt 02 — Vom Schaden zum sauberen Ergebnis
            </h2>
          </div>
        </motion.div>

        {/* Phasentexte */}
        <motion.div style={{ opacity: stageText }} className="absolute inset-x-0 bottom-0 z-20">
          <div className="shell pb-[6.5rem] md:pb-[12svh]">
            <div className="relative h-[15rem] md:h-[19rem]">
              {PHASES.map((p) => (
                <PhaseText key={p.idx} p={p} timeline={timeline} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Fortschritt / Szenen */}
        <motion.div style={{ opacity: stageText }} className="pointer-events-none absolute right-[var(--shell-pad)] top-1/2 z-20 hidden -translate-y-1/2 md:block">
          <ol className="space-y-4" aria-label="Szenen">
            {HUD.map((_, i) => (
              <HudItem key={i} i={i} timeline={timeline} progress={scrollYProgress} />
            ))}
          </ol>
          <div className="mt-6 h-24 w-px bg-white/15">
            <motion.div className="h-full w-px origin-top bg-brand" style={{ scaleY: line }} />
          </div>
        </motion.div>
        <motion.div style={{ opacity: stageText }} className="absolute inset-x-0 top-[4.5rem] z-20 md:hidden">
          <div className="mx-[var(--shell-pad)] h-px bg-white/15">
            <motion.div className="h-full origin-left bg-brand" style={{ scaleX: line }} />
          </div>
        </motion.div>

        {/* Übergabe: echtes Ergebnis + Slider */}
        <motion.div
          style={{ opacity: cardOpacity, pointerEvents: interactive ? 'auto' : 'none' }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 pb-16 pt-24 md:pb-0"
        >
          <motion.div style={{ scale: cardScale, y: cardY }} className="flex w-full flex-col items-center">
            <p className="eyebrow text-center">05 — Ergebnis</p>
            <p className="mt-4 max-w-[18ch] text-center font-display text-[clamp(1.8rem,1rem+3vw,3.6rem)] font-medium leading-[.98] tracking-[-.04em]">
              So sieht das an echten Fahrzeugen aus.
            </p>
            <div className="mt-6 w-[min(86vw,calc(48svh*1.307),760px)] overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)]">
              <BeforeAfter before={`${c.src}-vorher.jpg`} after={`${c.src}-nachher.jpg`} alt={c.alt} w={c.w} h={c.h} active={interactive} />
            </div>
            <p className="mt-3 text-center text-sm text-fg-mute">{c.caption}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Cta href="/kontakt#anfrage">Schaden einschätzen lassen</Cta>
              <PhoneCta />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Kurzer Einleiter vor der Szene (statisch, damit die Szene selbst ruhig bleibt). */
export function DentSceneIntro() {
  return (
    <div className="shell pb-10 pt-6 text-center">
      <Reveal>
        <p className="eyebrow-mute">Scrollen Sie weiter – und sehen Sie, was wir tun.</p>
      </Reveal>
    </div>
  );
}
