'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { CORE_REGIONS as REGIONS, UMLAND_REGIONS } from '@/content/regions';

const W = 800;
const H = 560;
const B = { lat: [53.02, 53.28], lng: [8.58, 9.12] } as const;
const px = (lng: number) => ((lng - B.lng[0]) / (B.lng[1] - B.lng[0])) * W;
const py = (lat: number) => ((B.lat[1] - lat) / (B.lat[1] - B.lat[0])) * H;

/** Schematische Karte des Einzugsgebiets – ohne Kartenkacheln, ohne Drittanbieter, ohne Tracking. */
export function RegionMap({ showList = true, activeSlug }: { showList?: boolean; activeSlug?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<string | null>(activeSlug ?? null);
  const home = REGIONS.find((r) => r.slug === 'lilienthal')!;
  const hx = px(home.geo!.lng);
  const hy = py(home.geo!.lat);

  return (
    <section id="einzugsgebiet" aria-labelledby="region-h" className="section relative overflow-hidden bg-ink-900">
      <div className="shell">
        <p className="eyebrow">Einzugsgebiet</p>
        <h2 id="region-h" className="h2 mt-6 max-w-[16ch]">
          <SplitLines lines={['Dellenreparatur in', 'Lilienthal, Bremen &', 'Osterholz-Scharmbeck.']} />
        </h2>
        <Reveal delay={0.1}>
          <p className="lead mt-8 max-w-2xl">
            Von unserem Standort in Lilienthal sind wir schnell für Kunden aus der gesamten Region da – egal ob aus Bremen, dem Landkreis Osterholz oder dem Teufelsmoor.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12">
          <div ref={ref} className="relative lg:col-span-7">
            <div className="relative aspect-[800/560] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(90%_80%_at_58%_55%,#15171b_0%,#08090a_75%)]">
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.045)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width={W} height={H} fill="url(#grid)" />
                {[90, 190, 300].map((r, i) => (
                  <motion.circle
                    key={r}
                    cx={hx}
                    cy={hy}
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,.12)"
                    strokeDasharray="3 7"
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    animate={reduced || seen ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.8, delay: 0.2 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
                {REGIONS.filter((r) => r.slug !== 'lilienthal').map((r, i) => {
                  const x = px(r.geo!.lng);
                  const y = py(r.geo!.lat);
                  const on = hover === r.slug;
                  return (
                    <motion.line
                      key={r.slug}
                      x1={hx}
                      y1={hy}
                      x2={x}
                      y2={y}
                      stroke={on ? '#ff6a1a' : 'rgba(255,106,26,.4)'}
                      strokeWidth={on ? 2 : 1}
                      initial={reduced ? false : { pathLength: 0 }}
                      animate={reduced || seen ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.4, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  );
                })}
              </svg>

              {REGIONS.map((r) => {
                const isHome = r.slug === 'lilienthal';
                const on = hover === r.slug || isHome;
                return (
                  <Link
                    key={r.slug}
                    href={`/einzugsgebiet/${r.slug}`}
                    onMouseEnter={() => setHover(r.slug)}
                    onMouseLeave={() => setHover(activeSlug ?? null)}
                    onFocus={() => setHover(r.slug)}
                    onBlur={() => setHover(activeSlug ?? null)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${(px(r.geo!.lng) / W) * 100}%`, top: `${(py(r.geo!.lat) / H) * 100}%` }}
                    aria-label={`${r.name}${isHome ? ' – unser Standort' : ''}`}
                  >
                    <span className="relative flex items-center justify-center">
                      {isHome && <span className="absolute h-10 w-10 animate-ping rounded-full bg-brand/40" />}
                      <span className={`relative block rounded-full transition-all duration-500 ease-out ${isHome ? 'h-4 w-4 bg-brand' : on ? 'h-3.5 w-3.5 bg-brand' : 'h-2.5 w-2.5 bg-fg'}`} />
                    </span>
                    <span
                      className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[.62rem] uppercase tracking-[.14em] transition-colors duration-500 sm:text-[.7rem] ${on ? 'text-brand' : 'text-fg-dim'}`}
                    >
                      {r.name}
                    </span>
                  </Link>
                );
              })}
              <p className="absolute bottom-3 left-4 font-mono text-[.6rem] uppercase tracking-[.16em] text-fg-mute">Schematisch, nicht maßstäblich</p>
            </div>
          </div>

          {showList && (
            <ul className="lg:col-span-5">
              {REGIONS.map((r) => (
                <li key={r.slug} className="border-t border-white/10 last:border-b">
                  <Link
                    href={`/einzugsgebiet/${r.slug}`}
                    onMouseEnter={() => setHover(r.slug)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(r.slug)}
                    className="group flex items-start justify-between gap-6 py-5"
                  >
                    <span>
                      <span className={`block font-display text-2xl font-medium tracking-[-.03em] transition-colors duration-500 ${hover === r.slug ? 'text-brand' : 'text-fg'}`}>{r.name}</span>
                      <span className="mt-1 block max-w-[36ch] text-[.92rem] text-fg-mute">{r.teaser}</span>
                    </span>
                    <Icon name="arrowUpRight" size={20} className="mt-1.5 shrink-0 text-fg-mute transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {UMLAND_REGIONS.length > 0 && (
          <Reveal className="mt-14 border-t border-white/10 pt-10">
            <h3 className="eyebrow-mute">Weiteres Umland</h3>
            <p className="mt-4 max-w-3xl text-fg-mute">
              Sie kommen aus dem weiteren Umland? Anfragen sind willkommen – rufen Sie einfach an, dann besprechen wir gemeinsam, wie wir Ihnen weiterhelfen können.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {UMLAND_REGIONS.map((r) => (
                <li key={r.slug}>
                  <Link href={`/einzugsgebiet/${r.slug}`} className="inline-flex flex-col rounded-2xl border border-white/15 px-5 py-3 transition-colors duration-500 hover:border-brand">
                    <span className="font-medium text-fg">{r.name}</span>
                    <span className="mt-0.5 text-[.82rem] text-fg-mute">{r.places?.join(' · ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
