'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const OFFSETS = { up: { y: 32 }, down: { y: -32 }, left: { x: -40 }, right: { x: 40 }, scale: { scale: 0.94 }, none: {} } as const;

/** Blur-to-sharp-Reveal beim Einscrollen. Bei reduzierter Bewegung sofort sichtbar. */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  as = 'div',
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  direction?: keyof typeof OFFSETS;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'p' | 'span';
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const M = motion[as];
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, filter: 'blur(8px)', ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}
