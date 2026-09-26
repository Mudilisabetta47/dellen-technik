'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import type { Faq as FaqItem } from '@/content/services';

/** Barrierearmes Akkordeon. Alle Antworten stehen im DOM (für FAQPage-Markup sichtbar erreichbar). */
export function Faq({ items, defaultOpen = 0 }: { items: readonly FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.05}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                id={`${uid}-h-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
              >
                <span className={`font-display text-[clamp(1.2rem,1rem+.9vw,1.75rem)] font-medium tracking-[-.02em] transition-colors duration-500 ${isOpen ? 'text-brand' : 'text-fg group-hover:text-brand'}`}>{f.q}</span>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out ${isOpen ? 'rotate-180 border-brand bg-brand text-ink-900' : 'border-white/25'}`}>
                  <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                </span>
              </button>
            </h3>
            <div
              id={`${uid}-${i}`}
              role="region"
              aria-labelledby={`${uid}-h-${i}`}
              className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-8 text-lead text-fg-dim" {...(isOpen ? {} : { inert: true })}>{f.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
