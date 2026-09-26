import type { DentState } from './dent-engine';

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOutBack = (t: number) => {
  const c1 = 1.9;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/**
 * Signature-Timeline (p = 0–1):
 *   0–20 %   makellos (Licht gleitet über die Fläche)
 *  20–40 %   Delle entsteht (Einschlag, Welle, leichter Überschwinger)
 *  40–55 %   Delle voll sichtbar, Analyse-Overlay
 *  55–70 %   Reparatur beginnt (Werkzeug erscheint, erste Züge)
 *  70–90 %   Delle verschwindet Stück für Stück
 *  90–100 %  perfektes Finish, Highlight-Sweep
 */
export function signatureState(p: number): Partial<DentState> {
  const form = p < 0.2 ? 0 : easeOutBack(seg(p, 0.2, 0.4));
  const ripple = p < 0.2 ? 0 : seg(p, 0.2, 0.4);
  const markIn = smooth(seg(p, 0.4, 0.44));
  const markOut = smooth(seg(p, 0.55, 0.59));
  const repair = seg(p, 0.55, 0.9);
  const toolIn = smooth(seg(p, 0.55, 0.6));
  const toolOut = 1 - smooth(seg(p, 0.88, 0.92));
  const introSweep = p < 0.2 ? seg(p, 0.02, 0.18) * 0.95 : -1;
  const finishSweep = p >= 0.9 ? seg(p, 0.9, 1) : -1;
  return {
    form,
    ripple: ripple >= 1 ? 0 : ripple,
    mark: markIn * (1 - markOut),
    repair,
    tool: Math.min(toolIn, toolOut),
    sweep: finishSweep >= 0 ? finishSweep : introSweep,
    time: p * 30,
  };
}

/** Hagel-Timeline: viele Dellen; Reparatur in fünf Abschnitten (Schritte 1–5 der Story). */
export function hailState(p: number): Partial<DentState> {
  return {
    form: smooth(seg(p, 0.02, 0.2)),
    ripple: 0,
    mark: smooth(seg(p, 0.22, 0.28)) * (1 - smooth(seg(p, 0.6, 0.66))),
    repair: seg(p, 0.78, 0.97),
    tool: smooth(seg(p, 0.78, 0.82)) * (1 - smooth(seg(p, 0.95, 0.98))),
    sweep: p > 0.97 ? seg(p, 0.97, 1) : -1,
    time: p * 30,
  };
}

/** Feste Endzustände für reduzierte Bewegung und Standbilder. */
export const STATIC = {
  damaged: { form: 1, repair: 0, mark: 0, tool: 0, sweep: -1, ripple: 0, time: 1.3 } as Partial<DentState>,
  repaired: { form: 1, repair: 1, mark: 0, tool: 0, sweep: -1, ripple: 0, time: 1.3 } as Partial<DentState>,
};
