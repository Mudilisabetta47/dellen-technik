import type { Landing } from '@/content/landings';
import { SERVICE_IMAGES } from '@/content/images';
import { breadcrumbLd, faqLd, serviceLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { PageHero } from '@/components/sections/PageHero';
import { SplitStory } from '@/components/sections/SplitStory';
import { ConditionsBlock } from '@/components/sections/ConditionsBlock';
import { DentScene } from '@/components/sections/DentScene';
import { BenefitRows } from '@/components/sections/BenefitRows';
import { StepsLine } from '@/components/sections/StepsLine';
import { CaseSlider } from '@/components/sections/CaseSlider';
import { RegionBlock } from '@/components/sections/RegionBlock';
import { Faq } from '@/components/sections/Faq';
import { Reviews } from '@/components/sections/Reviews';
import { RelatedLinks } from '@/components/sections/RelatedLinks';
import { FinalCta } from '@/components/sections/FinalCta';
import { Location } from '@/components/sections/Location';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Landingpage mit eigenem, individuell geschriebenem Inhalt (siehe src/content/landings.ts).
 * Nutzt das Motion-System: H1-Reveal, Bild-Parallaxe, Signature-Szene, Vorher/Nachher, FAQ-Reveal, CTA.
 */
export function LandingPage({ l }: { l: Landing }) {
  const path = `/leistungen/${l.slug}`;
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
    { name: l.h1.join(' '), path },
  ];
  const heroImage = SERVICE_IMAGES[l.image];

  return (
    <>
      <JsonLd data={[serviceLd({ name: l.schemaName, description: l.schemaDescription, path }), breadcrumbLd(crumbs), faqLd(l.faq)]} />
      <PageHero
        eyebrow={l.eyebrow}
        lines={l.h1}
        sub={l.heroSub}
        crumbs={crumbs}
        image={heroImage}
        imageAlt={l.imageAlt}
        actions={
          <>
            <Cta href="/kontakt#anfrage">Delle kostenlos einschätzen lassen</Cta>
            <PhoneCta />
          </>
        }
      />
      {l.blocks.map((b, i) => {
        switch (b.type) {
          case 'split':
            return <SplitStory key={i} id={b.id} eyebrow={b.eyebrow} title={b.title} paras={b.paras} tone={b.tone ?? (i % 2 ? 'darker' : 'dark')} />;
          case 'conditions':
            return <ConditionsBlock key={i} id={b.id} eyebrow={b.eyebrow} title={b.title} intro={b.intro} good={b.good} limits={b.limits} note={b.note} />;
          case 'dent':
            return <DentScene key={i} compact />;
          case 'facts':
            return <BenefitRows key={i} id={b.id} eyebrow={b.eyebrow} title={b.title} items={b.items} tone={i % 2 ? 'dark' : 'darker'} />;
          case 'steps':
            return <StepsLine key={i} title={b.title} steps={b.steps} />;
          case 'case':
            return <CaseSlider key={i} caseId={b.caseId} />;
          case 'region':
            return <RegionBlock key={i} id={b.id} eyebrow={b.eyebrow} title={b.title} paras={b.paras} regionSlug={b.regionSlug} places={b.places} />;
        }
      })}
      <section aria-labelledby="faq-h" className="section bg-ink-950">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-h" className="h2 mt-6">Häufige Fragen.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq items={l.faq} />
          </div>
        </div>
      </section>
      <Reviews />
      <RelatedLinks services={[l.pillar, ...l.services.filter((s) => s !== l.pillar)]} regions={l.regions} guides={l.guides} />
      <FinalCta title={['Delle kostenlos', 'einschätzen lassen.']} eyebrow="Schaden zeigen" />
      <Location id="standort" />
    </>
  );
}
