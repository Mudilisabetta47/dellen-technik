'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { BIZ } from '@/content/site';
import { SERVICES } from '@/content/services';
import Link from 'next/link';

const field =
  'w-full rounded-2xl border border-white/15 bg-ink-800 px-5 py-4 text-fg placeholder:text-fg-mute transition-colors duration-300 focus:border-brand focus:outline-none';

/**
 * Anfrage ohne Backend: Die Eingaben werden zu einer WhatsApp-Nachricht zusammengesetzt und im
 * neuen Tab geöffnet. Es werden keine Daten an diese Website oder Dritte gesendet, bevor
 * der Nutzer in WhatsApp selbst auf „Senden“ tippt.
 */
export function RequestForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? '').trim();
    const opt = (label: string, key: string) => (g(key) ? `${label}: ${g(key)}` : '');
    const lines = [
      'Hallo Dellen Technik, ich möchte einen Schaden besprechen / einen Termin anfragen.',
      '',
      opt('Name', 'name'),
      opt('Fahrzeug', 'fahrzeug'),
      opt('Schaden', 'art'),
      opt('Nachricht', 'nachricht'),
      opt('Rückruf unter', 'telefon'),
    ].filter((x, i) => i < 2 || x !== '');
    const url = `${BIZ.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="space-y-5" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow-mute">Name</span>
          <input name="name" autoComplete="name" className={`${field} mt-2`} placeholder="Ihr Name" />
        </label>
        <label className="block">
          <span className="eyebrow-mute">Telefon (für Rückruf)</span>
          <input name="telefon" type="tel" autoComplete="tel" inputMode="tel" className={`${field} mt-2`} placeholder="0174 …" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow-mute">Fahrzeug</span>
          <input name="fahrzeug" className={`${field} mt-2`} placeholder="Marke / Modell" />
        </label>
        <label className="block">
          <span className="eyebrow-mute">Art des Schadens</span>
          <select name="art" defaultValue="" className={`${field} mt-2 appearance-none`}>
            <option value="">Bitte wählen</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Weiß ich nicht genau">Weiß ich nicht genau</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="eyebrow-mute">Nachricht</span>
        <textarea name="nachricht" rows={5} className={`${field} mt-2 resize-y`} placeholder="Wo ist der Schaden? Seit wann? Gibt es Lackschäden?" />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="btn btn-primary group" data-cursor="Senden">
          <Icon name="whatsapp" size={20} />
          Per WhatsApp anfragen
        </button>
        <a href={`tel:${BIZ.phoneTel}`} className="btn btn-ghost" data-cursor="Anrufen">
          <Icon name="phone" size={18} /> {BIZ.phone}
        </a>
      </div>
      <p id="form-note" className="max-w-xl text-[.85rem] leading-relaxed text-fg-mute">
        Beim Absenden öffnet sich WhatsApp mit Ihrer vorbereiteten Nachricht. Es werden keine Daten an diese Website übertragen; die Übermittlung erfolgt erst, wenn Sie in WhatsApp senden. Mehr dazu in der{' '}
        <Link href="/datenschutz" className="link-u text-fg-dim hover:text-fg">Datenschutzerklärung</Link>.
      </p>
      {sent && (
        <p role="status" className="rounded-2xl border border-brand/40 bg-brand/[.08] p-4 text-fg">
          WhatsApp wurde geöffnet. Falls nicht: Rufen Sie uns einfach an – {BIZ.phone}.
        </p>
      )}
    </form>
  );
}
