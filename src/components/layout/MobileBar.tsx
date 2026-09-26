'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { BIZ } from '@/content/site';

/** Feste untere CTA-Leiste – nur auf Mobile. */
export function MobileBar() {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-[50] border-t border-white/10 bg-ink-900/90 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={`tel:${BIZ.phoneTel}`}
          className="flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-mono text-[.72rem] font-medium uppercase tracking-[.16em] text-ink-900"
        >
          <Icon name="phone" size={16} /> Anrufen
        </a>
        <Link
          href="/kontakt#anfrage"
          className="flex items-center justify-center gap-2 rounded-full border border-white/25 py-3.5 font-mono text-[.72rem] font-medium uppercase tracking-[.16em] text-fg"
        >
          Termin anfragen
        </Link>
      </div>
    </div>
  );
}
