'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Dezenter Cursor nur für Maus-Geräte: Punkt + Ring. Über Links/Buttons wächst der
 * Ring, Elemente mit data-cursor="Text" zeigen ein Label (z. B. „Ziehen“).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.35 });

  useEffect(() => {
    const ok =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!ok) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button, [role="button"], input, textarea, summary');
      setHover(!!t);
      setLabel(t?.dataset.cursor ?? '');
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <span className="absolute -left-[3px] -top-[3px] block h-[6px] w-[6px] rounded-full bg-brand" />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.span
          className="absolute flex items-center justify-center rounded-full border border-white/50 text-[10px] font-mono uppercase tracking-[.16em] text-ink-900"
          animate={{
            width: label ? 84 : hover ? 54 : 30,
            height: label ? 84 : hover ? 54 : 30,
            x: label ? -42 : hover ? -27 : -15,
            y: label ? -42 : hover ? -27 : -15,
            backgroundColor: label ? 'rgba(255,106,26,1)' : 'rgba(255,255,255,0)',
            borderColor: label ? 'rgba(255,106,26,1)' : 'rgba(255,255,255,0.5)',
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
