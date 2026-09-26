import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES } from '@/content/services';
import { SERVICE_IMAGES } from '@/content/images';
import { buildMetadata, breadcrumbLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta } from '@/components/sections/FinalCta';
import { Reveal } from '@/components/motion/Reveal';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';

export const metadata: Metadata = buildMetadata({
  title: 'Leistungen: Dellen, Hagelschaden, Smart-Repair | Lilienthal',
  description:
    'Unsere Leistungen in Lilienthal: Dellenbeseitigung, Hagelschaden-Reparatur, Beulenentfernung, Smart-Repair, Lackauffrischung und Fahrzeugaufbereitung.',
  ogTitle: 'Leistungen – Dellen Technik Lilienthal',
  ogDescription: 'Sechs Leistungen, ein Anspruch: saubere Handwerksarbeit an Karosserie und Lack.',
  path: '/leistungen',
});

export default function LeistungenPage() {
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        compact
        eyebrow="Leistungen"
        lines={['Sechs Leistungen.', 'Ein Anspruch.']}
        sub="Von der Parkdelle bis zum Hagelschaden: Wir entfernen Dellen und Beulen lackschonend, reparieren kleine Schäden punktgenau und bringen Lack und Fahrzeug wieder in Form."
        crumbs={crumbs}
        image={SERVICE_IMAGES.gloss}
        actions={
          <>
            <Cta href="/kontakt#anfrage">Schaden einschätzen lassen</Cta>
            <PhoneCta />
          </>
        }
      />
      <section aria-label="Alle Leistungen" className="section bg-ink-900">
        <div className="shell space-y-6 md:space-y-10">
          {SERVICES.map((s, i) => {
            const img = SERVICE_IMAGES[s.image];
            return (
              <Reveal key={s.slug}>
                <Link href={`/leistungen/${s.slug}`} data-cursor="Ansehen" className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-ink-800 lg:grid-cols-12">
                  <div className={`relative aspect-[16/10] overflow-hidden lg:col-span-6 lg:aspect-auto lg:min-h-[26rem] ${i % 2 ? 'lg:order-2' : ''}`}>
                    <Image src={img.src} alt={s.imageAlt} fill sizes="(min-width: 1024px) 50vw, 92vw" quality={72} className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]" style={{ objectPosition: img.position }} />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-14 lg:col-span-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-brand">{s.n}</span>
                      <span className="font-mono text-[.68rem] uppercase tracking-[.2em] text-fg-mute">{s.kicker}</span>
                    </div>
                    <h2 className="h2 mt-8 !text-[clamp(1.75rem,1.1rem+2.6vw,3.8rem)]">{s.title}</h2>
                    <p className="mt-5 max-w-[40ch] text-lead text-fg-dim">{s.short}</p>
                    <span className="mt-8 inline-flex items-center gap-3 font-mono text-[.72rem] uppercase tracking-[.2em] text-brand">
                      Mehr erfahren <Icon name="arrow" size={16} className="transition-transform duration-500 ease-out group-hover:translate-x-2" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      <FinalCta title={['Jetzt Schaden', 'besprechen.']} eyebrow="Termin" />
    </>
  );
}
