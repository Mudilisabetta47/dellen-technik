'use client';

import { useMotionValue, useMotionValueEvent, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createDentRenderer, DEFAULT_STATE, type DentPreset, type DentRenderer, type DentState } from './dent-engine';

type Props = {
  preset: DentPreset;
  /** Scroll-Fortschritt 0–1 (nur bei animierten Szenen). */
  progress?: MotionValue<number>;
  /** Übersetzt Fortschritt in Shader-Zustand. */
  map?: (p: number) => Partial<DentState>;
  /** Fester Zustand (reduzierte Bewegung, Standbilder). */
  fixed?: Partial<DentState>;
  className?: string;
  /** Renderauflösung relativ zur CSS-Größe (Mobile kleiner). */
  scale?: number;
  /** Zeigerbewegung verschiebt das Licht minimal. */
  interactive?: boolean;
  label?: string;
};

/**
 * WebGL-Fläche. Der Canvas entsteht erst, wenn der Container in die Nähe des Viewports
 * kommt, und wird beim Verlassen wieder freigegeben – so laufen nie mehrere Kontexte parallel.
 * Ohne WebGL bleibt ein ruhiger, dunkler Verlauf stehen (Inhalt bleibt lesbar).
 */
export function DentCanvas({ preset, progress, map, fixed, className = '', scale = 1, interactive = false, label }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const renderer = useRef<DentRenderer | null>(null);
  const state = useRef<DentState>({ ...DEFAULT_STATE });
  const raf = useRef(0);
  const mapRef = useRef(map);
  mapRef.current = map;
  const [failed, setFailed] = useState(false);

  const schedule = () => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      renderer.current?.render(state.current);
    });
  };

  const apply = (p: number) => {
    const next = mapRef.current?.(p);
    if (next) Object.assign(state.current, next);
    schedule();
  };

  const idle = useMotionValue(0);
  useMotionValueEvent(progress ?? idle, 'change', (v) => {
    if (progress) apply(v);
  });

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let canvas: HTMLCanvasElement | null = null;
    let ro: ResizeObserver | null = null;

    const mount = () => {
      if (canvas) return;
      canvas = document.createElement('canvas');
      canvas.className = 'absolute inset-0 h-full w-full';
      canvas.setAttribute('aria-hidden', 'true');
      el.appendChild(canvas);
      const r = createDentRenderer(canvas, preset);
      if (!r) {
        canvas.remove();
        canvas = null;
        setFailed(true);
        return;
      }
      renderer.current = r;
      const size = () => {
        const b = el.getBoundingClientRect();
        // Auflösung deckeln: sonst frisst ein 4K-Display die GPU ohne sichtbaren Gewinn.
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * scale;
        const cap = Math.min(1, 1800 / Math.max(1, b.width * dpr));
        r.resize(b.width, b.height, dpr * cap);
        if (fixed) Object.assign(state.current, fixed);
        else if (progress) Object.assign(state.current, mapRef.current?.(progress.get()));
        schedule();
      };
      size();
      ro = new ResizeObserver(size);
      ro.observe(el);
    };

    const unmount = () => {
      ro?.disconnect();
      ro = null;
      renderer.current?.destroy();
      renderer.current = null;
      canvas?.remove();
      canvas = null;
    };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? mount() : unmount()),
      { rootMargin: '25% 0px 25% 0px' },
    );
    io.observe(el);

    let onMove: ((e: PointerEvent) => void) | null = null;
    if (interactive && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      onMove = (e) => {
        const b = el.getBoundingClientRect();
        state.current.look = [((e.clientX - b.left) / b.width) * 2 - 1, ((e.clientY - b.top) / b.height) * 2 - 1];
        schedule();
      };
      el.addEventListener('pointermove', onMove);
    }

    return () => {
      io.disconnect();
      if (onMove) el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      unmount();
    };
    // Die Zustände kommen über Refs; nur Preset/Scale/Fixed starten neu.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, scale, interactive, JSON.stringify(fixed)]);

  return (
    <div
      ref={host}
      role={label ? 'img' : undefined}
      aria-label={label}
      className={`${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} overflow-hidden bg-[radial-gradient(120%_90%_at_60%_40%,#15171b_0%,#08090a_70%)] ${className}`}
    >
      {failed && <span className="sr-only">Grafik wird auf diesem Gerät nicht dargestellt.</span>}
    </div>
  );
}
