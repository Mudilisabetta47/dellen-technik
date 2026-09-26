'use client';

import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image, { type ImageProps } from 'next/image';
import { useRef } from 'react';

/**
 * Bild mit Clip-Path-Reveal (Maske fährt auf), langsamem Zoom-Out und
 * leichter Parallaxe beim Weiterscrollen.
 */
export function ClipImage({
  src,
  alt,
  sizes,
  priority,
  className = '',
  imgClassName = '',
  from = 'bottom',
  parallax = 40,
  quality = 78,
  objectPosition,
}: {
  src: ImageProps['src'];
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  from?: 'bottom' | 'top' | 'left' | 'right';
  parallax?: number;
  quality?: number;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.15 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  const hidden = { bottom: 'inset(100% 0 0 0)', top: 'inset(0 0 100% 0)', left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)' }[from];

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reduced ? false : { clipPath: hidden }}
      animate={reduced || seen ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: hidden }}
      transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute inset-[-8%] will-change-transform"
        style={reduced ? undefined : { y }}
        initial={reduced ? false : { scale: 1.3 }}
        animate={reduced || seen ? { scale: 1 } : { scale: 1.3 }}
        transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={`object-cover ${imgClassName}`}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </motion.div>
    </motion.div>
  );
}
