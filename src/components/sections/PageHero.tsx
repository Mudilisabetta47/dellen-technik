'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs';
import { SplitLines } from '@/components/motion/SplitLines';

/** Hero für Unterseiten: H1-Reveal, Bild-Parallaxe, ruhiger Übergang in die Seite. */
export function PageHero({
  eyebrow,
  lines,
  sub,
  crumbs,
  image,
  imageAlt = '',
  actions,
  compact = false,
}: {
  eyebrow: string;
  lines: [string, string] | string[];
  sub?: string;
  crumbs?: Crumb[];
  image?: { src: string; position: string };
  imageAlt?: string;
  actions?: ReactNode;
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);

  return (
    <section ref={ref} className={`relative isolate flex flex-col justify-end overflow-hidden bg-ink-950 ${compact ? 'min-h-[62svh]' : 'min-h-[86svh]'}`}>
      {image && (
        <motion.div className="absolute inset-0 -z-10" style={reduced ? undefined : { y, scale }}>
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { scale: 1.18, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={image.src} alt={imageAlt} fill priority sizes="100vw" quality={75} className="object-cover" style={{ objectPosition: image.position }} />
          </motion.div>
        </motion.div>
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(5,5,6,.96)_4%,rgba(5,5,6,.55)_55%,rgba(5,5,6,.6)_100%)]" />
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-950" style={{ opacity: shade }} />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <motion.div style={reduced ? undefined : { y: textY }} className="shell pb-16 pt-40 md:pb-24">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <p className="eyebrow mt-8 flex items-center gap-3">
          <span className="h-px w-10 bg-brand" /> {eyebrow}
        </p>
        <h1 className="h1 mt-5 max-w-[14ch] !text-[clamp(2.5rem,1.2rem+6vw,7.25rem)]">
          <SplitLines immediate delay={0.15} lines={[lines[0], <span key="b" className="metal-text">{lines[1]}</span>]} />
        </h1>
        {sub && <p className="lead mt-8 max-w-[38rem] text-fg">{sub}</p>}
        {actions && <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>}
      </motion.div>
    </section>
  );
}
