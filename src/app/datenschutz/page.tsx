import type { Metadata } from 'next';
import { DATENSCHUTZ } from '@/content/legal';
import { LegalPage } from '@/components/sections/LegalPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Datenschutzerklärung – Dellen Technik Lilienthal',
  description: 'Datenschutzerklärung von Dellen Technik, Falkenberger Landstraße 77, 28865 Lilienthal: Informationen zur Verarbeitung Ihrer Daten.',
  path: '/datenschutz',
  noindex: true,
});

export default function DatenschutzPage() {
  return <LegalPage title="Datenschutzerklärung" sections={DATENSCHUTZ} path="/datenschutz" />;
}
