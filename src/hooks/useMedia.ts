'use client';

import { useEffect, useState } from 'react';

/** Reagiert auf eine Media Query; auf dem Server immer `fallback`. */
export function useMedia(query: string, fallback = false) {
  const [match, setMatch] = useState(fallback);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

/** Schmale Viewports bzw. Touch-Geräte: vereinfachte Motion-Varianten. */
export function useLiteMotion() {
  const narrow = useMedia('(max-width: 767px)');
  const coarse = useMedia('(pointer: coarse)');
  return narrow || coarse;
}

export function useFinePointer() {
  return useMedia('(hover: hover) and (pointer: fine)');
}
