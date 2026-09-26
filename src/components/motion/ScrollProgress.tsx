'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Hauchdünne Fortschrittslinie ganz oben – der „Filmstreifen“ der Seite. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}
