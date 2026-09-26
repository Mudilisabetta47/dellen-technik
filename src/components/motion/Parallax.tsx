'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useLiteMotion } from '@/hooks/useMedia';

/** Verschiebt den Inhalt beim Scrollen leicht gegenläufig (transform only). */
export function Parallax({ children, distance = 60, className }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const lite = useLiteMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const d = lite ? distance * 0.5 : distance;
  const y = useTransform(scrollYProgress, [0, 1], [d, -d]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
