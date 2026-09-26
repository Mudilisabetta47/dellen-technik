import type { Metadata } from 'next';
import { GUIDES } from '@/content/guides';
import { SERVICE_IMAGES } from '@/content/images';
import { buildMetadata, breadcrumbLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { GuideRows } from '@/components/sections/GuidesTeaser';
import { FinalCta } from '@/components/sections/FinalCta';

export const metadata: Metadata = buildMetadata({
  title: 'Ratgeber: Dellen, Hagelschaden & Smart Repair einfach erklärt',
  description:
    'Ratgeber rund um Dellenreparatur, Hagelschaden, Smart Repair, Parkschäden und Leasingrückgabe – verständlich erklärt von Dellen Technik in Lilienthal.',
  ogTitle: 'Ratgeber – Dellen Technik Lilienthal',
  ogDescription: 'Antworten auf die häufigsten Fragen zu Dellen, Hagelschäden und Smart-Repair.',
  path: '/ratgeber',
});

export default function RatgeberPage() {
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Ratgeber', path: '/ratgeber' },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        compact
        eyebrow="Ratgeber"
        lines={['Gut zu wissen.', 'Klar erklärt.']}
        sub="Was kostet eine Dellenreparatur? Was tun bei Hagelschaden? Antworten auf die häufigsten Fragen – ohne Fachchinesisch."
        crumbs={crumbs}
        image={SERVICE_IMAGES.dent}
      />
      <section aria-label="Alle Ratgeber" className="section bg-ink-900">
        <div className="shell">
          <GuideRows guides={GUIDES} />
        </div>
      </section>
      <FinalCta title={['Noch eine', 'Frage?']} eyebrow="Persönlich" />
    </>
  );
}
