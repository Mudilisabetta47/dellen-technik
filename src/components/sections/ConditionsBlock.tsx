import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { Icon } from '@/components/ui/Icon';

/** „Wann geht es – wann nicht“: zwei ehrliche Listen statt Versprechen. */
export function ConditionsBlock({ id, eyebrow, title, intro, good, limits, note }: { id: string; eyebrow: string; title: string; intro: string; good: string[]; limits: string[]; note?: string }) {
  return (
    <section aria-labelledby={id} className="section bg-ink-950">
      <div className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h2 mt-6 max-w-[18ch]">
          <SplitLines lines={[title]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="lead mt-8 max-w-2xl">{intro}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[2rem] border border-brand/30 bg-brand/[.06] p-8 md:p-10">
            <h3 className="eyebrow">Gute Voraussetzungen</h3>
            <ul className="mt-6 space-y-4">
              {good.map((g) => (
                <li key={g} className="flex gap-4 text-fg">
                  <Icon name="check" size={20} className="mt-1 shrink-0 text-brand" />
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] border border-white/10 bg-ink-800 p-8 md:p-10">
            <h3 className="eyebrow-mute">Grenzen</h3>
            <ul className="mt-6 space-y-4">
              {limits.map((l) => (
                <li key={l} className="flex gap-4 text-fg-dim">
                  <Icon name="minus" size={20} className="mt-1 shrink-0 text-fg-mute" />
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        {note && (
          <Reveal className="mt-8">
            <p className="text-lg text-fg">{note}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
