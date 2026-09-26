import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { BIZ, GOOGLE_BUSINESS_PROFILE_URL, HOURS, HOURS_NOTE } from '@/content/site';
import { SERVICES } from '@/content/services';
import { CORE_REGIONS } from '@/content/regions';
import { LANDINGS } from '@/content/landings';
import { GUIDES } from '@/content/guides';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[.08] bg-ink-950 pb-24 md:pb-0">
      <div className="shell pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src="/brand/dellen-technik-logo.png" alt="Dellen Technik Logo" width={1364} height={694} sizes="200px" className="mb-10 h-24 w-auto" />
            <p className="eyebrow">Dellen Technik · Lilienthal</p>
            <p className="h2 mt-6 max-w-[14ch]">
              Dellen verschwinden. <span className="metal-text">Qualität bleibt.</span>
            </p>
            <p className="mt-6 max-w-md text-fg-mute">
              Ihr Spezialist für Dellenbeseitigung, Hagelschäden und Smart-Repair in Lilienthal. Saubere Handwerksarbeit für Bremen und Osterholz-Scharmbeck.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PhoneCta variant="primary" />
              <Cta href={BIZ.whatsapp} variant="ghost" icon="whatsapp" ariaLabel="Per WhatsApp schreiben">WhatsApp</Cta>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <nav aria-label="Leistungen">
              <h2 className="eyebrow-mute">Leistungen</h2>
              <ul className="mt-5 space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/leistungen/${s.slug}`} className="link-u text-fg-dim transition-colors hover:text-fg">
                      {s.title}
                    </Link>
                  </li>
                ))}
                {LANDINGS.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/leistungen/${l.slug}`} className="link-u text-fg-dim transition-colors hover:text-fg">
                      {l.h1.join(' ')}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/vorher-nachher" className="link-u text-fg-dim transition-colors hover:text-fg">Vorher / Nachher</Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="Einzugsgebiet">
              <h2 className="eyebrow-mute">Einzugsgebiet</h2>
              <ul className="mt-5 space-y-3">
                {CORE_REGIONS.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/einzugsgebiet/${r.slug}`} className="link-u text-fg-dim transition-colors hover:text-fg">
                      {r.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/einzugsgebiet" className="link-u text-brand">Weiteres Umland →</Link>
                </li>
              </ul>
              <h2 className="eyebrow-mute mt-8">Ratgeber</h2>
              <ul className="mt-5 space-y-3">
                {GUIDES.slice(0, 3).map((g) => (
                  <li key={g.slug}>
                    <Link href={`/ratgeber/${g.slug}`} className="link-u text-fg-dim transition-colors hover:text-fg">
                      {g.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/ratgeber" className="link-u text-brand">Alle Ratgeber →</Link>
                </li>
              </ul>
            </nav>
            <div>
              <h2 className="eyebrow-mute">Standort</h2>
              <address className="mt-5 space-y-2 not-italic text-fg-dim">
                <p className="text-fg">{BIZ.name}</p>
                <p>
                  {BIZ.street}
                  <br />
                  {BIZ.zip} {BIZ.city}
                </p>
                <p className="flex items-center gap-2 text-brand">
                  <Icon name="door" size={16} /> {BIZ.entranceNote}
                </p>
                <p>
                  <a href={`tel:${BIZ.phoneTel}`} className="link-u text-fg">{BIZ.phone}</a>
                </p>
              </address>
              {GOOGLE_BUSINESS_PROFILE_URL && (
                <p className="mt-3">
                  <a href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="link-u text-fg-dim hover:text-fg">Bei Google Maps ansehen →</a>
                </p>
              )}
              <h2 className="eyebrow-mute mt-8">Öffnungszeiten</h2>
              <dl className="mt-5 space-y-2 text-fg-dim">
                {HOURS.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6">
                    <dt>{h.days}</dt>
                    <dd className="text-fg">{h.closed ? 'Geschlossen' : `${h.open} – ${h.close}`}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[.85rem] text-fg-mute">{HOURS_NOTE}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/[.08] py-8 text-[.85rem] text-fg-mute md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dellen Technik. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/impressum" className="link-u hover:text-fg">Impressum</Link>
            <Link href="/datenschutz" className="link-u hover:text-fg">Datenschutz</Link>
            <a href="https://monvex-group.de/" target="_blank" rel="noopener" className="link-u hover:text-fg">
              Made by <span className="font-medium text-fg-dim">MONVEX</span>
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden px-[var(--shell-pad)] pb-4">
        <p className="metal-text text-center font-display text-[clamp(3.2rem,15.5vw,17rem)] font-semibold uppercase leading-[.82] tracking-[-.05em] opacity-[.16]">
          Dellen Technik
        </p>
      </div>
    </footer>
  );
}
