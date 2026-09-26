/**
 * KUNDENBEWERTUNGEN
 * Hier stehen ausschließlich ECHTE, nachweisbare Bewertungen (z. B. Google). Nichts erfinden.
 *
 * So werden echte Bewertungen eingebunden:
 *   1. In REVIEWS je Bewertung Originaltext, Vorname + Initial, Quelle, Datum eintragen.
 *   2. Erst wenn Anzahl und Durchschnitt aus dem Profil bekannt sind: REVIEW_AGGREGATE ausfüllen.
 *      Nur dann erscheinen Sterne/Anzahl sichtbar – und nur dann wird AggregateRating im JSON-LD ausgegeben
 *      (Google verlangt, dass die Bewertungen auch sichtbar auf der Seite stehen).
 * Solange REVIEWS leer ist, zeigt der Bewertungsbereich (falls ein Google-Profil hinterlegt ist)
 * nur einen Link „Bewertungen bei Google lesen“ – und sonst gar nichts.
 */
export type Review = { text: string; author: string; source: 'Google'; date: string; rating: 1 | 2 | 3 | 4 | 5 };

export const REVIEWS: Review[] = [];

/** Erst ausfüllen, wenn echte Werte vorliegen: { rating: 4.9, count: 37 } – Beispielwerte, KEINE Vorgabe. */
export const REVIEW_AGGREGATE: { rating: number; count: number } | null = null;

export function reviewAggregateLd() {
  if (!REVIEW_AGGREGATE || REVIEWS.length === 0) return {};
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEW_AGGREGATE.rating,
      reviewCount: REVIEW_AGGREGATE.count,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
