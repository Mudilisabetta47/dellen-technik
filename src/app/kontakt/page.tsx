import type { Metadata } from 'next';
import { buildMetadata, breadcrumbLd, localBusinessLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Location } from '@/components/sections/Location';
import { RequestForm } from '@/components/sections/RequestForm';
import { SERVICE_IMAGES } from '@/content/images';
import { BIZ } from '@/content/site';
import { Reveal } from '@/components/motion/Reveal';
import { Reviews } from '@/components/sections/Reviews';

export const metadata: Metadata = buildMetadata({
  title: 'Termin & Kontakt – Dellen Technik Lilienthal',
  description:
    'Schaden besprechen oder Termin vereinbaren: Dellen Technik, Falkenberger Landstraße 77, 28865 Lilienthal. Tel. 0174 71 17 321. Mo–Fr 08:30–17:30, Sa 10–13 Uhr.',
  ogTitle: 'Jetzt Schaden besprechen – Dellen Technik Lilienthal',
  ogDescription: 'Rufen Sie an oder senden Sie uns Ihre Anfrage per WhatsApp. Kostenlose Ersteinschätzung vor Ort.',
  path: '/kontakt',
});

export default function KontaktPage() {
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Kontakt', path: '/kontakt' },
  ];
  return (
    <>
      <JsonLd data={[localBusinessLd(), breadcrumbLd(crumbs)]} />
      <PageHero
        compact
        eyebrow="Kontakt"
        lines={['Jetzt Schaden', 'besprechen.']}
        sub={`Rufen Sie uns an unter ${BIZ.phone} oder schicken Sie uns Ihre Anfrage. Wir nehmen uns gerne Zeit für Ihr Anliegen.`}
        crumbs={crumbs}
        image={SERVICE_IMAGES.polish}
      />
      <section id="anfrage" aria-labelledby="anfrage-h" className="section scroll-mt-20 bg-ink-900">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Termin anfragen</p>
              <h2 id="anfrage-h" className="h2 mt-6 max-w-[12ch]">Schreiben Sie uns.</h2>
              <p className="lead mt-6">
                Beschreiben Sie kurz Ihren Schaden – gern mit einem Foto, das Sie in WhatsApp anhängen. Die Einschätzung, was möglich ist, geben wir Ihnen kostenlos vor Ort.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <RequestForm />
          </div>
        </div>
      </section>
      <Reviews />
      <Location id="standort" />
    </>
  );
}
