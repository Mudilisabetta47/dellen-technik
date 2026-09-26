'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function Word({ w, range, progress }: { w: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {w}&nbsp;
    </motion.span>
  );
}

/** Wörter leuchten nacheinander auf, gesteuert vom Scroll-Fortschritt. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  if (reduced) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const s = i / words.length;
        return <Word key={i} w={w} progress={scrollYProgress} range={[s, Math.min(1, s + 1.5 / words.length)]} />;
      })}
    </p>
  );
}
