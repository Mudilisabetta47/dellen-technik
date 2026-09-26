import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES, serviceBySlug } from '@/content/services';
import { SERVICE_IMAGES } from '@/content/images';
import { buildMetadata, breadcrumbLd, faqLd, serviceLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { PageHero } from '@/components/sections/PageHero';
import { SplitStory } from '@/components/sections/SplitStory';
import { StepsLine } from '@/components/sections/StepsLine';
import { CaseSlider } from '@/components/sections/CaseSlider';
import { BenefitRows } from '@/components/sections/BenefitRows';
import { Faq } from '@/components/sections/Faq';
import { RelatedLinks } from '@/components/sections/RelatedLinks';
import { FinalCta } from '@/components/sections/FinalCta';
import { Location } from '@/components/sections/Location';
import { DentScene } from '@/components/sections/DentScene';
import { HailStory } from '@/components/sections/HailStory';
import { SmartRepair } from '@/components/sections/SmartRepair';
import { PhotoBand } from '@/components/sections/PhotoBand';
import { Reveal } from '@/components/motion/Reveal';
import { LandingPage } from '@/components/pages/LandingPage';
import { ClusterSection } from '@/components/sections/ClusterSection';
import { Reviews } from '@/components/sections/Reviews';
import { LANDINGS, landingBySlug } from '@/content/landings';
import { guidesForService, landingsForService } from '@/content/cluster';

export const dynamicParams = false;
export const generateStaticParams = () => [...SERVICES.map((s) => ({ slug: s.slug })), ...LANDINGS.map((l) => ({ slug: l.slug }))];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = landingBySlug(slug);
  if (l) return buildMetadata({ ...l.seo, path: `/leistungen/${l.slug}` });
  const s = serviceBySlug(slug);
  if (!s) return {};
  return buildMetadata({ ...s.seo, path: `/leistungen/${s.slug}` });
}

function StoryBlock({ slug }: { slug: string }) {
  switch (slug) {
    case 'dellenbeseitigung':
    case 'beulenentfernung':
      return <DentScene compact />;
    case 'hagelschaden-reparatur':
      return <HailStory heading={false} />;
    case 'smart-repair':
      return <SmartRepair />;
    case 'lackauffrischung':
      return <PhotoBand src="/images/glatte-karosserie-hochglanz-lack.jpg" alt="Tiefschwarzer, hochglänzender Lack mit Lichtreflexen" position="50% 50%" caption="Glanz und Farbtiefe – die Fläche reflektiert wieder sauber." />;
    default:
      return <PhotoBand src="/images/poliermaschine-fahrzeuglack-werkstatt.jpg" alt="Hände führen eine Poliermaschine über dunklen Fahrzeuglack" position="55% 50%" caption="Innen- und Außenaufbereitung mit dem Anspruch an saubere Handwerksarbeit." />;
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landing = landingBySlug(slug);
  if (landing) return <LandingPage l={landing} />;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const path = `/leistungen/${s.slug}`;
  const clusterShown = guidesForService(s.slug).length + landingsForService(s.slug).length >= 3;
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
    { name: s.title, path },
  ];

  return (
    <>
      <JsonLd data={[serviceLd({ name: s.schemaName, description: s.schemaDescription, path }), breadcrumbLd(crumbs), faqLd(s.faq)]} />
      <PageHero
        eyebrow={`${s.n} — ${s.kicker}`}
        lines={s.h1}
        sub={s.heroSub}
        crumbs={crumbs}
        image={SERVICE_IMAGES[s.image]}
        imageAlt={s.imageAlt}
        actions={
          <>
            <Cta href="/kontakt#anfrage">Schaden einschätzen lassen</Cta>
            <PhoneCta />
          </>
        }
      />
      <SplitStory id="problem-h" eyebrow="Das Problem" title={s.problem.title} paras={s.problem.paras} />
      <SplitStory id="loesung-h" eyebrow="Die Lösung" title={s.solution.title} paras={s.solution.paras} tone="darker" />
      <StoryBlock slug={s.slug} />
      <StepsLine title={s.stepsTitle} steps={s.steps} />
      <CaseSlider caseId={s.caseId} />
      <BenefitRows items={s.benefits} />
      <ClusterSection serviceSlug={s.slug} title={`Alles rund um ${s.title}.`} />
      <section aria-labelledby="faq-h" className="section bg-ink-900">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-h" className="h2 mt-6">Häufige Fragen zu {s.title}.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq items={s.faq} />
          </div>
        </div>
      </section>
      <Reviews />
      <RelatedLinks services={s.related} regions={s.regions} landings={landingsForService(s.slug).map((l) => l.slug)} guides={clusterShown ? [] : guidesForService(s.slug, 4).map((g) => g.slug)} />
      <FinalCta title={['Schaden', 'einschätzen lassen.']} eyebrow="Kostenlose Ersteinschätzung" />
      <Location id="standort" />
    </>
  );
}
