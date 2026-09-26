'use client';

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Props = {
  before: string;
  after: string;
  alt: string;
  w: number;
  h: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Startposition, wenn keine Intro-Animation läuft (Prozent Vorher-Anteil). */
  start?: number;
  /** Intro-Animation erst starten, wenn true (z. B. am Ende der Signature-Szene). */
  active?: boolean;
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Vorher/Nachher-Regler mit Touch-Unterstützung.
 * – Zeiger/Finger ziehen, Pfeiltasten am Griff, vertikales Scrollen bleibt auf Touch erhalten
 *   (touch-action: pan-y).
 * – Beim Einscrollen fährt der Regler einmal über das Bild und zoomt sanft heraus.
 */
export function BeforeAfter({ before, after, alt, w, h, sizes = '(min-width: 1024px) 60vw, 100vw', className = '', priority, start = 50, active = true }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(box, { once: true, amount: 0.45 });
  const pos = useMotionValue(reduced ? start : 100);
  const dragging = useRef(false);
  const introRef = useRef<ReturnType<typeof animate> | null>(null);

  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);

  useEffect(() => {
    return pos.on('change', (v) => handle.current?.setAttribute('aria-valuenow', String(Math.round(v))));
  }, [pos]);

  useEffect(() => {
    if (reduced || !inView || !active) return;
    introRef.current = animate(pos, [100, 26, 68, start], { duration: 3, ease: [0.65, 0, 0.35, 1], times: [0, 0.38, 0.76, 1] });
    return () => introRef.current?.stop();
  }, [inView, active, reduced, pos, start]);

  const setFromEvent = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(clamp(((clientX - r.left) / r.width) * 100));
  };

  return (
    <motion.div
      ref={box}
      className={`ba-touch group relative w-full select-none overflow-hidden bg-ink-800 ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
      initial={reduced ? false : { scale: 1.06 }}
      animate={reduced || inView ? { scale: 1 } : { scale: 1.06 }}
      transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="Ziehen"
      onPointerDown={(e) => {
        introRef.current?.stop();
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setFromEvent(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromEvent(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={after} alt={alt} fill sizes={sizes} priority={priority} className="pointer-events-none object-cover" draggable={false} />
      <motion.div className="pointer-events-none absolute inset-0" style={{ clipPath: clip }}>
        <Image src={before} alt="" fill sizes={sizes} priority={priority} className="object-cover" draggable={false} />
      </motion.div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink-900/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.18em] text-fg backdrop-blur">
        Vorher
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.18em] text-ink-900">
        Nachher
      </span>

      <motion.div className="absolute inset-y-0 z-10 w-0" style={{ left }}>
        <div className="absolute inset-y-0 -left-px w-[2px] bg-white/90 shadow-[0_0_24px_rgba(255,255,255,.35)]" />
        <div
          ref={handle}
          role="slider"
          tabIndex={0}
          aria-label="Vorher-Nachher-Regler"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={start}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') pos.set(clamp(pos.get() - 5));
            if (e.key === 'ArrowRight') pos.set(clamp(pos.get() + 5));
            if (e.key === 'Home') pos.set(0);
            if (e.key === 'End') pos.set(100);
          }}
          className="absolute left-0 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-ink-900/60 text-white backdrop-blur-md transition-transform duration-500 ease-out group-hover:scale-110"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
