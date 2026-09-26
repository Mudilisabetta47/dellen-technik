'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Sanftes Scrollen (Lenis) – nur mit Maus und ohne reduzierte Bewegung.
 * Auf Touch bleibt natives Scrollen aktiv: dort ist es besser und billiger.
 * Ankerlinks (#galerie, /#ablauf …) werden weich angefahren.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !fine) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      const href = a?.getAttribute('href');
      if (!a || !href || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const hash = href.startsWith('#') ? href : href.startsWith('/#') && location.pathname === '/' ? href.slice(1) : null;
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      history.replaceState(null, '', hash);
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
