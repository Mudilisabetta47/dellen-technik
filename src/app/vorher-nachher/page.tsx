import type { Metadata } from 'next';
import Link from 'next/link';
import { CASES } from '@/content/site';
import { SERVICES } from '@/content/services';
import { SERVICE_IMAGES } from '@/content/images';
import { buildMetadata, breadcrumbLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { PageHero } from '@/components/sections/PageHero';
import { BeforeAfter } from '@/components/motion/BeforeAfter';
import { Reveal } from '@/components/motion/Reveal';
import { FinalCta } from '@/components/sections/FinalCta';
import { RelatedLinks } from '@/components/sections/RelatedLinks';

export const metadata: Metadata = buildMetadata({
  title: 'Dellen vorher & nachher – echte Fälle aus Lilienthal',
  description:
    'Echte Vorher-Nachher-Beispiele aus unserer Werkstatt in Lilienthal: Delle an der Heckstoßstange, im Radlauf ohne Lackieren und am Kotflügel – mit Regler zum Vergleichen.',
  ogTitle: 'Vorher / Nachher – echte Reparaturen von Dellen Technik',
  ogDescription: 'Drei echte Fälle: Heckstoßstange, Radlauf, Kotflügel. Ziehen Sie den Regler und sehen Sie den Unterschied.',
  path: '/vorher-nachher',
});

export default function VorherNachherPage() {
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Vorher / Nachher', path: '/vorher-nachher' },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        compact
        eyebrow="Vorher / Nachher"
        lines={['Echte Fälle.', 'Echte Ergebnisse.']}
        sub="Reparaturen aus unserer Werkstatt: ziehen Sie den Regler und sehen Sie selbst den Unterschied. Zu jedem Fall steht, was das Bild zeigt – nicht mehr und nicht weniger."
        crumbs={crumbs}
        image={SERVICE_IMAGES.gloss}
        actions={
          <>
            <Cta href="/kontakt#anfrage">Schaden einschätzen lassen</Cta>
            <PhoneCta />
          </>
        }
      />
      <section aria-label="Fallbeispiele" className="section bg-ink-900">
        <div className="shell space-y-24 md:space-y-36">
          {CASES.map((c, i) => {
            const svc = SERVICES.find((s) => s.slug === c.study.service)!;
            return (
              <article key={c.id} id={c.id} className="grid scroll-mt-28 items-start gap-8 lg:grid-cols-12 lg:gap-14">
                <div className={`overflow-hidden rounded-[1.5rem] lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <BeforeAfter before={`${c.src}-vorher.jpg`} after={`${c.src}-nachher.jpg`} alt={c.alt} w={c.w} h={c.h} sizes="(min-width: 1024px) 55vw, 92vw" />
                </div>
                <div className="lg:col-span-5">
                  <Reveal>
                    <p className="font-mono text-sm text-brand">Fall 0{i + 1}</p>
                    <h2 className="h3 mt-4 !text-[clamp(1.8rem,1.2rem+2vw,3rem)]">{c.study.title}</h2>
                    <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                      {[
                        ['Bauteil', c.study.part],
                        ['Schaden', c.study.damage],
                        ['Ausgangslage', c.study.before],
                        ['Vorgehen', c.study.method],
                        ['Ergebnis', c.study.after],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-3 gap-4 py-4">
                          <dt className="font-mono text-[.7rem] uppercase tracking-[.16em] text-fg-mute">{k}</dt>
                          <dd className="col-span-2 text-fg-dim">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-6">
                      <Link href={`/leistungen/${svc.slug}`} className="link-u text-brand">Mehr zur Leistung: {svc.title} →</Link>
                    </p>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <RelatedLinks services={['dellenbeseitigung', 'beulenentfernung']} landings={['delle-ohne-lackieren-bremen', 'parkdelle-reparieren']} regions={['lilienthal', 'bremen']} guides={['kann-eine-delle-unsichtbar-repariert-werden', 'welche-dellen-lassen-sich-ohne-lackieren-reparieren']} />
      <FinalCta title={['Ihr Fahrzeug', 'als Nächstes?']} eyebrow="Schaden zeigen" />
    </>
  );
}
