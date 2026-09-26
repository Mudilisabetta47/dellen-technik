import { Reveal } from '@/components/motion/Reveal';
import { Cta } from '@/components/ui/Cta';
import { GOOGLE_BUSINESS_PROFILE_URL } from '@/content/site';
import { REVIEWS, REVIEW_AGGREGATE } from '@/content/reviews';

/**
 * Kundenbewertungen – nur echte Daten (src/content/reviews.ts).
 * – Keine echten Bewertungen hinterlegt: der Bereich rendert nichts (auch nicht mit Profil-URL).
 * – Echte Bewertungen vorhanden: Originaltexte; Sterne/Anzahl nur, wenn REVIEW_AGGREGATE gepflegt ist.
 */
export function Reviews() {
  const hasReviews = REVIEWS.length > 0;
  // Ohne echte Bewertungstexte keine Sektion – das Profil ist stattdessen im Standortbereich und Footer verlinkt.
  if (!hasReviews) return null;

  return (
    <section aria-labelledby="reviews-h" className="section bg-ink-900">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Kundenbewertungen</p>
          <h2 id="reviews-h" className="h2 mt-6 max-w-[16ch]">Das sagen unsere Kunden.</h2>
          {hasReviews && REVIEW_AGGREGATE && (
            <p className="mt-6 text-lg text-fg-dim">
              <span className="font-medium text-fg">{REVIEW_AGGREGATE.rating.toLocaleString('de-DE')} von 5</span> · {REVIEW_AGGREGATE.count} Bewertungen bei Google
            </p>
          )}
        </Reveal>

        {hasReviews && (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <Reveal as="li" key={i} delay={i * 0.05} className="rounded-3xl border border-white/10 bg-ink-800 p-8">
                <p aria-label={`${r.rating} von 5 Sternen`} className="tracking-[.2em] text-brand">{'★'.repeat(r.rating)}</p>
                <blockquote className="mt-4 text-lead text-fg">„{r.text}“</blockquote>
                <p className="mt-6 font-mono text-[.72rem] uppercase tracking-[.16em] text-fg-mute">
                  {r.author} · {r.source} · {r.date}
                </p>
              </Reveal>
            ))}
          </ul>
        )}

        {GOOGLE_BUSINESS_PROFILE_URL && (
          <Reveal className="mt-10">
            <Cta href={GOOGLE_BUSINESS_PROFILE_URL} variant="ghost" icon="arrowUpRight" ariaLabel="Bewertungen bei Google lesen (öffnet neuen Tab)">
              Bewertungen bei Google lesen
            </Cta>
          </Reveal>
        )}
      </div>
    </section>
  );
}
