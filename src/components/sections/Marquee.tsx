import { MARQUEE } from '@/content/site';

/** Endlos laufendes Leistungsband. Rein CSS (transform), bei reduzierter Bewegung angehalten. */
export function Marquee() {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {MARQUEE.map((m) => (
        <li key={m} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-[clamp(1.6rem,1rem+2vw,3rem)] font-medium uppercase tracking-[-.02em] text-fg/85">{m}</span>
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/[.08] bg-ink-900 py-6" aria-label="Unsere Leistungen">
      <div className="flex w-max animate-marquee will-change-transform">
        {row}
        <div aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}
