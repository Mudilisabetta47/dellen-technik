import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Statement } from '@/components/sections/Statement';
import { DentScene } from '@/components/sections/DentScene';
import { ServicesGallery } from '@/components/sections/ServicesGallery';
import { BeforeAfterGallery } from '@/components/sections/BeforeAfterGallery';
import { HailStory, HailOutro } from '@/components/sections/HailStory';
import { SmartRepair } from '@/components/sections/SmartRepair';
import { WhyStory } from '@/components/sections/WhyStory';
import { Process } from '@/components/sections/Process';
import { About } from '@/components/sections/About';
import { RegionMap } from '@/components/sections/RegionMap';
import { Faq } from '@/components/sections/Faq';
import { GuidesTeaser } from '@/components/sections/GuidesTeaser';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';
import { Reviews } from '@/components/sections/Reviews';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_FAQ } from '@/content/site';
import { buildMetadata, faqLd, localBusinessLd, organizationLd, websiteLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Dellenbeseitigung Lilienthal & Bremen | Dellen Technik',
  description:
    'Dellenbeseitigung, Hagelschaden-Reparatur & Smart-Repair in Lilienthal: lackschonend, präzise, fair. Für Bremen & Osterholz-Scharmbeck. Jetzt anrufen.',
  ogTitle: 'Dellen verschwinden. Qualität bleibt. – Dellen Technik Lilienthal',
  ogDescription:
    'Ihr Fachbetrieb für Dellenbeseitigung, Hagelschaden-Reparatur und Smart-Repair in Lilienthal – lackschonend, präzise und mit ehrlicher Beratung.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteLd(), organizationLd(), localBusinessLd(), faqLd(HOME_FAQ)]} />
      <Hero />
      <Marquee />
      <Statement />
      <DentScene />
      <ServicesGallery />
      <BeforeAfterGallery />
      <HailStory />
      <HailOutro />
      <SmartRepair />
      <WhyStory />
      <Process />
      <About />
      <RegionMap />
      <section aria-labelledby="faq-h" className="section bg-ink-950">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-h" className="h2 mt-6">Antworten rund um die Dellenreparatur.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq items={HOME_FAQ} />
          </div>
        </div>
      </section>
      <Reviews />
      <GuidesTeaser />
      <Location />
      <FinalCta />
    </>
  );
}
