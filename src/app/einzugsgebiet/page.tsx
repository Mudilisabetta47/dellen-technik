import type { Metadata } from 'next';
import { buildMetadata, breadcrumbLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { RegionMap } from '@/components/sections/RegionMap';
import { FinalCta } from '@/components/sections/FinalCta';
import { Location } from '@/components/sections/Location';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { SERVICE_IMAGES } from '@/content/images';

export const metadata: Metadata = buildMetadata({
  title: 'Einzugsgebiet: Dellenreparatur Lilienthal, Bremen & Umgebung',
  description:
    'Dellenreparatur für Lilienthal, Bremen, Osterholz-Scharmbeck, Worpswede, Ritterhude und Grasberg – kurze Wege zur Werkstatt in Lilienthal.',
  ogTitle: 'Einzugsgebiet – Dellen Technik Lilienthal',
  ogDescription: 'Für Kunden aus Lilienthal, Bremen, dem Landkreis Osterholz und dem Teufelsmoor.',
  path: '/einzugsgebiet',
});

export default function EinzugsgebietPage() {
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Einzugsgebiet', path: '/einzugsgebiet' },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        compact
        eyebrow="Einzugsgebiet"
        lines={['Kurze Wege.', 'Aus der ganzen Region.']}
        sub="Unsere Werkstatt liegt in Lilienthal – für Kunden aus Bremen, dem Landkreis Osterholz und dem Teufelsmoor ist sie schnell erreichbar."
        crumbs={crumbs}
        image={SERVICE_IMAGES.gloss}
        actions={
          <>
            <Cta href="/kontakt#anfrage">Termin anfragen</Cta>
            <PhoneCta />
          </>
        }
      />
      <RegionMap />
      <Location id="standort" />
      <FinalCta title={['Jetzt Schaden', 'besprechen.']} eyebrow="Termin" />
    </>
  );
}
