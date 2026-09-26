import type { Metadata } from 'next';
import { IMPRESSUM } from '@/content/legal';
import { LegalPage } from '@/components/sections/LegalPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Impressum – Dellen Technik Lilienthal',
  description: 'Impressum von Dellen Technik, Falkenberger Landstraße 77, 28865 Lilienthal.',
  path: '/impressum',
  noindex: true,
});

export default function ImpressumPage() {
  return <LegalPage title="Impressum" sections={IMPRESSUM} path="/impressum" />;
}
