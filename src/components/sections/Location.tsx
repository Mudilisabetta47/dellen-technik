'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { BIZ, GOOGLE_BUSINESS_PROFILE_URL, HOURS, HOURS_NOTE, OPEN_MINUTES } from '@/content/site';

function useOpenStatus() {
  const [s, setS] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    const calc = () => {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      const mins = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
      const win = OPEN_MINUTES[day];
      const open = !!win && mins >= win[0] && mins < win[1];
      setS({ open, label: open ? 'Jetzt geöffnet' : 'Aktuell geschlossen' });
    };
    calc();
    const t = setInterval(calc, 60_000);
    return () => clearInterval(t);
  }, []);
  return s;
}

/** Schematische Darstellung: Gebäude, Straße und der Weg zum Eingang hinter dem Gebäude. */
function EntranceSchematic() {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  return (
    <svg ref={ref} viewBox="0 0 520 420" className="h-full w-full" role="img" aria-label="Schematische Skizze: Der Eingang der Werkstatt befindet sich hinter dem Gebäude, bitte hinten herum fahren.">
      <defs>
        <pattern id="loc-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke="rgba(255,255,255,.045)" />
        </pattern>
      </defs>
      <rect width="520" height="420" fill="url(#loc-grid)" />
      <rect x="0" y="330" width="520" height="52" fill="rgba(255,255,255,.05)" />
      <path d="M0 356H520" stroke="rgba(255,255,255,.28)" strokeDasharray="14 12" />
      <text x="20" y="404" fill="rgba(236,235,231,.55)" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="2">FALKENBERGER LANDSTRASSE</text>
      <rect x="120" y="150" width="280" height="140" rx="10" fill="#17181b" stroke="rgba(255,255,255,.22)" />
      <text x="260" y="226" textAnchor="middle" fill="rgba(236,235,231,.85)" fontSize="15" fontFamily="var(--font-display)" fontWeight="600">DELLEN TECHNIK</text>
      <text x="260" y="248" textAnchor="middle" fill="rgba(236,235,231,.5)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2">NR. 77</text>
      <motion.path
        d="M70 350 C 70 300, 70 120, 130 110 S 380 80, 452 128 S 452 190, 452 214"
        fill="none"
        stroke="#ff6a1a"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 9"
        initial={reduced ? false : { pathLength: 0 }}
        animate={reduced || seen ? { pathLength: 1 } : {}}
        transition={{ duration: 3, ease: [0.65, 0, 0.35, 1] }}
      />
      <g transform="translate(452 226)">
        <circle r="16" fill="#ff6a1a" />
        <circle r="26" fill="none" stroke="#ff6a1a" opacity=".4" />
        <path d="M-5 -3v9h10v-9M-7 -3l7-6 7 6" fill="none" stroke="#0a0a0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="452" y="272" textAnchor="middle" fill="#ff6a1a" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="2">EINGANG</text>
      <text x="70" y="318" textAnchor="middle" fill="rgba(236,235,231,.6)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2">START</text>
      <text x="14" y="24" fill="rgba(236,235,231,.4)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="2">SCHEMATISCH · NICHT MASSSTÄBLICH</text>
    </svg>
  );
}

/** Große Location-Section: Adresse, Öffnungszeiten, Telefon, Anfahrt – ohne eingebettete Karte. */
export function Location({ id = 'kontakt' }: { id?: string }) {
  const status = useOpenStatus();
  return (
    <section id={id} aria-labelledby="loc-h" className="section relative bg-ink-950">
      <div className="shell">
        <p className="eyebrow">Standort & Anfahrt</p>
        <h2 id="loc-h" className="h2 mt-6 max-w-[15ch]">
          <SplitLines lines={['Unsere Werkstatt', 'in Lilienthal.']} />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="min-w-0 rounded-[2rem] border border-white/10 bg-ink-800 p-6 sm:p-8 md:p-12 lg:col-span-6">
            <p className="eyebrow-mute">Adresse</p>
            <address className="mt-4 not-italic font-display text-[clamp(1.7rem,1.1rem+1.8vw,2.8rem)] font-medium leading-[1.05] tracking-[-.035em]">
              {BIZ.street}
              <br />
              {BIZ.zip} {BIZ.city}
            </address>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand/40 bg-brand/[.08] p-4">
              <Icon name="door" size={22} className="mt-0.5 shrink-0 text-brand" />
              <p>
                <span className="block font-medium text-brand">{BIZ.entranceNote}.</span>
                <span className="block text-fg-dim">{BIZ.entranceHint}.</span>
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <p className="eyebrow-mute">Öffnungszeiten</p>
              {status && (
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[.66rem] uppercase tracking-[.16em] ${status.open ? 'border-emerald-400/40 text-emerald-300' : 'border-white/20 text-fg-mute'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-fg-mute'}`} />
                  {status.label}
                </span>
              )}
            </div>
            <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {HOURS.map((h) => (
                <div key={h.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3.5">
                  <dt className="text-fg-dim">{h.days}</dt>
                  <dd className="font-medium">{h.closed ? 'Geschlossen' : `${h.open} – ${h.close} Uhr`}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[.9rem] text-fg-mute">{HOURS_NOTE}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <PhoneCta variant="primary" />
              <Cta href={BIZ.routeUrl} variant="ghost" icon="arrowUpRight" ariaLabel="Route in Google Maps planen (öffnet neuen Tab)">Route planen</Cta>
              <Cta href={BIZ.whatsapp} variant="ghost" icon="whatsapp" ariaLabel="Per WhatsApp schreiben (öffnet neuen Tab)">WhatsApp</Cta>
            </div>
            {GOOGLE_BUSINESS_PROFILE_URL && (
              <p className="mt-6">
                <a href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="link-u text-fg-dim hover:text-fg">
                  Dellen Technik bei Google Maps ansehen →
                </a>
              </p>
            )}
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(100%_90%_at_60%_40%,#15171b_0%,#08090a_80%)] lg:col-span-6">
            <div className="absolute inset-0 p-4 md:p-8">
              <EntranceSchematic />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
