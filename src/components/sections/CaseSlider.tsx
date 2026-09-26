import Link from 'next/link';
import { BeforeAfter } from '@/components/motion/BeforeAfter';
import { Reveal } from '@/components/motion/Reveal';
import { CASES } from '@/content/site';

/** Echter Vorher/Nachher-Fall auf Leistungsseiten. */
export function CaseSlider({ caseId }: { caseId: (typeof CASES)[number]['id'] }) {
  const c = CASES.find((x) => x.id === caseId) ?? CASES[0];
  return (
    <section aria-labelledby="case-h" className="section bg-ink-950">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Vorher / Nachher</p>
            <h2 id="case-h" className="h2 mt-6 max-w-[12ch]">Echtes Ergebnis.</h2>
            <p className="mt-6 text-lg text-fg-dim">{c.caption}</p>
            <Link href="/#galerie" className="link-u mt-8 inline-flex items-center gap-2 text-brand">
              Weitere Ergebnisse ansehen →
            </Link>
          </Reveal>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] lg:col-span-7">
          <BeforeAfter before={`${c.src}-vorher.jpg`} after={`${c.src}-nachher.jpg`} alt={c.alt} w={c.w} h={c.h} sizes="(min-width: 1024px) 55vw, 92vw" />
        </div>
      </div>
    </section>
  );
}
