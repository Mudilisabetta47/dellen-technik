import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { REGIONS, regionBySlug } from '@/content/regions';
import { SERVICES } from '@/content/services';
import { SERVICE_IMAGES } from '@/content/images';
import { buildMetadata, breadcrumbLd, faqLd, serviceLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { PageHero } from '@/components/sections/PageHero';
import { SplitStory } from '@/components/sections/SplitStory';
import { RegionMap } from '@/components/sections/RegionMap';
import { Faq } from '@/components/sections/Faq';
import { RelatedLinks } from '@/components/sections/RelatedLinks';
import { FinalCta } from '@/components/sections/FinalCta';
import { Location } from '@/components/sections/Location';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Reviews } from '@/components/sections/Reviews';

export const dynamicParams = false;
export const generateStaticParams = () => REGIONS.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = regionBySlug(slug);
  if (!r) return {};
  return buildMetadata({ ...r.seo, path: `/einzugsgebiet/${r.slug}` });
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = regionBySlug(slug);
  if (!r) notFound();
  const path = `/einzugsgebiet/${r.slug}`;
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Einzugsgebiet', path: '/einzugsgebiet' },
    { name: r.name, path },
  ];
  const focus = r.services.map((s) => SERVICES.find((x) => x.slug === s)!);
  const others = REGIONS.filter((x) => x.slug !== r.slug && r.neighbors.includes(x.slug)).map((x) => x.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceLd({ name: `Dellenreparatur ${r.name}`, type: 'Dellenreparatur', description: r.heroSub, path }),
          breadcrumbLd(crumbs),
          faqLd(r.faq),
        ]}
      />
      <PageHero
        eyebrow={`Einzugsgebiet — ${r.name}`}
        lines={r.h1}
        sub={r.heroSub}
        crumbs={crumbs}
        image={SERVICE_IMAGES[focus[0].image]}
        actions={
          <>
            <Cta href="/kontakt#anfrage">Schaden einschätzen lassen</Cta>
            <PhoneCta />
          </>
        }
      />
      {r.sections.map((s, i) => (
        <SplitStory key={s.title} id={`sec-${i}`} eyebrow={i === 0 ? r.name : 'Gut zu wissen'} title={s.title} paras={s.paras} tone={i % 2 ? 'darker' : 'dark'} />
      ))}

      <section aria-labelledby="focus-h" className="section bg-ink-950">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Leistungen für {r.name}</p>
            <h2 id="focus-h" className="h2 mt-6 max-w-[16ch]">Was wir für Sie tun.</h2>
          </Reveal>
          <ul className="mt-14">
            {focus.map((s) => (
              <Reveal as="li" key={s.slug} className="border-t border-white/10 last:border-b">
                <Link href={`/leistungen/${s.slug}`} className="group grid items-center gap-4 py-7 md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="font-mono text-sm text-brand md:col-span-1">{s.n}</span>
                  <span className="font-display text-[clamp(1.6rem,1rem+2vw,3rem)] font-medium tracking-[-.035em] transition-colors duration-500 group-hover:text-brand md:col-span-5">{s.title}</span>
                  <span className="text-fg-dim md:col-span-5">{s.short}</span>
                  <Icon name="arrowUpRight" size={22} className="hidden text-fg-mute transition-colors group-hover:text-brand md:col-span-1 md:block" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <RegionMap showList={false} activeSlug={r.slug} />

      <section aria-labelledby="faq-h" className="section bg-ink-950">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-h" className="h2 mt-6">Fragen aus {r.name}.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq items={r.faq} />
          </div>
        </div>
      </section>
      <Reviews />
      <RelatedLinks services={r.services} regions={others} landings={r.landings} guides={r.guides} title={`Mehr für ${r.name}.`} />
      <FinalCta title={['Jetzt Schaden', 'besprechen.']} eyebrow={`Termin — ${r.name}`} />
      <Location id="standort" />
    </>
  );
}
