import { BeforeAfter } from '@/components/motion/BeforeAfter';
import { Reveal } from '@/components/motion/Reveal';
import { CASES } from '@/content/site';
import type { CaseId } from '@/content/guides';

/** Echtes Vorher/Nachher-Bild als Beispiel innerhalb eines Ratgebers. */
export function CaseFigure({ caseId, text }: { caseId: CaseId; text: string }) {
  const c = CASES.find((x) => x.id === caseId) ?? CASES[0];
  return (
    <Reveal>
      <figure className="mt-10">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
          <BeforeAfter before={`${c.src}-vorher.jpg`} after={`${c.src}-nachher.jpg`} alt={c.alt} w={c.w} h={c.h} sizes="(min-width: 1024px) 40vw, 92vw" />
        </div>
        <figcaption className="mt-3 text-[.9rem] text-fg-mute">{text}</figcaption>
      </figure>
    </Reveal>
  );
}
