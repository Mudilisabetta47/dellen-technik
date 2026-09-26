import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';

/** Zweispaltiger Textblock: großer Titel links (sticky), Absätze rechts. */
export function SplitStory({ eyebrow, title, paras, id, tone = 'dark' }: { eyebrow: string; title: string; paras: string[]; id: string; tone?: 'dark' | 'darker' }) {
  return (
    <section aria-labelledby={id} className={`section ${tone === 'dark' ? 'bg-ink-900' : 'bg-ink-950'}`}>
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id} className="h2 mt-6 max-w-[18ch]">
            <SplitLines lines={[title]} />
          </h2>
        </div>
        <div className="prose-dt lg:col-span-5 lg:pt-3">
          {paras.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
