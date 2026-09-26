'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ElementType, type ReactNode } from 'react';

/**
 * Zeilenweiser Text-Reveal: jede Zeile fährt aus einer Maske nach oben.
 * Die Zeilen werden redaktionell vorgegeben – so ist der Umbruch auf jedem
 * Viewport vorhersehbar und nichts wird abgeschnitten.
 */
export function SplitLines({
  lines,
  as: Tag = 'span',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  immediate = false,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** true = sofort beim Laden (Hero), sonst beim Einscrollen. */
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const go = immediate || seen;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={`block will-change-transform ${lineClassName ?? ''}`}
            initial={reduced ? false : { y: '112%', rotate: 2.5 }}
            animate={reduced || go ? { y: '0%', rotate: 0 } : { y: '112%', rotate: 2.5 }}
            transition={{ duration: 1.15, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
