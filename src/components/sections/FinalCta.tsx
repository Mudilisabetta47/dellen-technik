'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Cta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { Magnetic } from '@/components/motion/Magnetic';
import { SplitLines } from '@/components/motion/SplitLines';
import { Reveal } from '@/components/motion/Reveal';
import { BIZ } from '@/content/site';

/** Akt 06: Termin – der Abschluss. Großes Bild, große Nummer, klare Handlung. */
export function FinalCta({ title = ['Jetzt Schaden', 'besprechen.'], eyebrow = 'Akt 06 — Termin' }: { title?: [string, string]; eyebrow?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '0%']);
  return (
    <section ref={ref} aria-labelledby="cta-h" className="relative isolate overflow-hidden bg-ink-950 py-32 md:py-48">
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={reduced ? undefined : { scale, y }}>
        <Image src="/images/glatte-karosserie-hochglanz-lack.jpg" alt="" fill sizes="100vw" quality={70} className="object-cover" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(5,5,6,.9)_0%,rgba(5,5,6,.55)_50%,rgba(5,5,6,.85)_100%)]" />
      <div className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="cta-h" className="mt-6 font-display text-[clamp(2.75rem,1rem+9.5vw,12rem)] font-medium leading-[.88] tracking-[-.055em]">
          <SplitLines lines={[title[0], <span key="b" className="metal-text">{title[1]}</span>]} stagger={0.14} />
        </h2>
        <Reveal delay={0.2} className="mt-10 max-w-xl">
          <p className="lead text-fg">Wir nehmen uns gerne Zeit für Ihr Anliegen und besprechen alles persönlich – am Telefon oder direkt bei uns in der Werkstatt.</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-12 flex flex-col items-start gap-8 md:flex-row md:items-center">
          <Magnetic strength={0.15}>
            <a
              href={`tel:${BIZ.phoneTel}`}
              data-cursor="Anrufen"
              className="group flex items-center gap-5 rounded-full bg-brand px-8 py-5 text-ink-900 transition-colors duration-500 hover:bg-[#ff7f38] md:px-12 md:py-7"
              aria-label={`Anrufen: ${BIZ.phone}`}
            >
              <Icon name="phone" size={28} />
              <span className="text-[clamp(1.6rem,1.1rem+2vw,3rem)] font-medium leading-none tracking-tight">{BIZ.phone}</span>
            </a>
          </Magnetic>
          <div className="flex flex-wrap gap-3">
            <Cta href="/kontakt#anfrage" variant="ghost">Termin vereinbaren</Cta>
            <Cta href={BIZ.whatsapp} variant="ghost" icon="whatsapp" ariaLabel="Per WhatsApp schreiben (öffnet neuen Tab)">WhatsApp</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
