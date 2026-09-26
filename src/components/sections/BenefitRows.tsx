import { Reveal } from '@/components/motion/Reveal';
import type { Step } from '@/content/services';

export function BenefitRows({ title = 'Ihre Vorteile.', items, eyebrow = 'Vorteile', id = 'benefits-h', tone = 'darker' }: { title?: string; items: Step[]; eyebrow?: string; id?: string; tone?: 'dark' | 'darker' }) {
  return (
    <section aria-labelledby={id} className={`section ${tone === 'dark' ? 'bg-ink-900' : 'bg-ink-950'}`}>
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id} className="h2 mt-6 max-w-[20ch]">{title}</h2>
        </Reveal>
        <ul className="mt-14">
          {items.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.05} className="grid gap-3 border-t border-white/10 py-7 last:border-b md:grid-cols-12 md:gap-8 md:py-9">
              <span className="font-mono text-sm text-brand md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-[clamp(1.4rem,1rem+1.4vw,2.2rem)] font-medium tracking-[-.03em] md:col-span-5">{b.title}</h3>
              <p className="text-fg-dim md:col-span-6">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
