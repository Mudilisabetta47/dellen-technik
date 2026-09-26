'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Cta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { SplitLines } from '@/components/motion/SplitLines';
import { BIZ } from '@/content/site';

/**
 * Cinematic Hero: Vollbild, langsamer Zoom-Out beim Laden, Parallaxe und Abdunkeln
 * beim Scrollen, Headline zeilenweise aus der Maske, CTAs zeitversetzt.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const shade = useTransform(scrollYProgress, [0, 0.9], [0, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-950" aria-labelledby="hero-h1">
      <motion.div className="absolute inset-0 -z-10 will-change-transform" style={reduced ? undefined : { y: bgY, scale: bgScale }}>
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.22 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/poliermaschine-fahrzeuglack-werkstatt.jpg"
            alt="Fahrzeuglack wird in der Werkstatt mit einer Poliermaschine bearbeitet"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover object-[62%_50%] md:object-center"
          />
        </motion.div>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(5,5,6,.92)_0%,rgba(5,5,6,.66)_38%,rgba(5,5,6,.2)_72%,rgba(5,5,6,.35)_100%)] max-md:bg-[linear-gradient(0deg,rgba(5,5,6,.96)_8%,rgba(5,5,6,.62)_55%,rgba(5,5,6,.45)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink-900 to-transparent" />
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-950" style={{ opacity: shade }} />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <motion.div style={reduced ? undefined : { y: textY, opacity: textOpacity }} className="shell relative flex flex-1 flex-col justify-end pb-28 pt-36 md:justify-center md:pb-24">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="h-px w-10 bg-brand" /> Akt 01 — Dellen Technik · Lilienthal
        </motion.p>

        <h1 id="hero-h1" className="h1 mt-6 max-w-[18ch]">
          <SplitLines immediate delay={0.35} lines={['Dellen verschwinden.', <span key="q" className="metal-text">Qualität bleibt.</span>]} />
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lead mt-8 max-w-[34rem] text-fg"
        >
          Professionelle Dellenbeseitigung, Hagelschaden-Reparatur und Smart-Repair in Lilienthal.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <Cta href="/kontakt#anfrage">Schaden begutachten lassen</Cta>
          <Cta href="#leistungen" variant="ghost" icon="arrowUpRight">Leistungen entdecken</Cta>
        </motion.div>

        <motion.a
          href={`tel:${BIZ.phoneTel}`}
          data-cursor="Anrufen"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-10 inline-flex w-fit items-center gap-4"
          aria-label={`Anrufen: ${BIZ.phone}`}
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand text-ink-900">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" aria-hidden="true" />
            <Icon name="phone" size={20} className="relative" />
          </span>
          <span>
            <span className="block font-mono text-[.68rem] uppercase tracking-[.22em] text-fg-mute">Direkt anrufen</span>
            <span className="block text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-medium leading-none tracking-tight transition-colors duration-500 group-hover:text-brand">{BIZ.phone}</span>
          </span>
        </motion.a>
      </motion.div>

      <div className="shell relative z-10 hidden items-end justify-between pb-8 md:flex">
        <p className="flex items-center gap-3 font-mono text-[.7rem] uppercase tracking-[.2em] text-fg-mute">
          <Icon name="pin" size={16} className="text-brand" /> {BIZ.street}, {BIZ.city} · {BIZ.entranceNote}
        </p>
        <a href="#akt-schaden" className="flex items-center gap-3 font-mono text-[.7rem] uppercase tracking-[.2em] text-fg-mute" aria-label="Nach unten scrollen">
          Scrollen <span className="h-10 w-px animate-hint bg-fg-mute" />
        </a>
      </div>
    </section>
  );
}
