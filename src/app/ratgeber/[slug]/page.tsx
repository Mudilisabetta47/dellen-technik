import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES, GUIDES_PUBLISHED, GUIDE_DISCLAIMER, guideBySlug, readMinutes } from '@/content/guides';
import { SERVICES } from '@/content/services';
import { SERVICE_IMAGES } from '@/content/images';
import { buildMetadata, breadcrumbLd, articleLd, faqLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Cta, PhoneCta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { ScrollWords } from '@/components/motion/ScrollWords';
import { CaseFigure } from '@/components/sections/CaseFigure';
import { Faq } from '@/components/sections/Faq';
import { RelatedLinks } from '@/components/sections/RelatedLinks';
import { FinalCta } from '@/components/sections/FinalCta';

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return buildMetadata({ ...g.seo, path: `/ratgeber/${g.slug}`, type: 'article' });
}

const idOf = (t: string) => t.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const path = `/ratgeber/${g.slug}`;
  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Ratgeber', path: '/ratgeber' },
    { name: g.title, path },
  ];
  const pillar = SERVICES.find((s) => s.slug === g.pillar)!;
  const others = g.related.filter((r) => GUIDES.some((x) => x.slug === r));

  return (
    <>
      <JsonLd data={[articleLd({ headline: g.h1, description: g.seo.description, path, published: GUIDES_PUBLISHED }), breadcrumbLd(crumbs), faqLd(g.faq)]} />
      <PageHero
        compact
        eyebrow={`${g.category} · ${readMinutes(g)} Min. Lesezeit`}
        lines={splitTitle(g.h1)}
        crumbs={crumbs}
        image={SERVICE_IMAGES[g.image]}
      />
      <article className="bg-ink-900">
        <div className="shell py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8 lg:col-start-4">
              <ScrollWords className="font-display text-[clamp(1.4rem,1rem+1.6vw,2.2rem)] font-medium leading-[1.2] tracking-[-.025em]" text={g.intro} />
              <Reveal className="mt-10 rounded-3xl border border-brand/30 bg-brand/[.07] p-6 md:p-8">
                <p className="eyebrow">Kurz gesagt</p>
                <p className="mt-3 text-lead text-fg">{g.tldr}</p>
              </Reveal>
            </div>

            <nav aria-label="Inhalt" className="hidden lg:col-span-3 lg:row-span-2 lg:row-start-1 lg:block">
              <div className="sticky top-32">
                <p className="eyebrow-mute">Inhalt</p>
                <ol className="mt-5 space-y-3 border-l border-white/10 pl-5">
                  {g.sections.map((s) => (
                    <li key={s.title}>
                      <a href={`#${idOf(s.title)}`} className="link-u text-[.95rem] text-fg-dim hover:text-fg">{s.title}</a>
                    </li>
                  ))}
                  <li>
                    <a href="#faq" className="link-u text-[.95rem] text-fg-dim hover:text-fg">Häufige Fragen</a>
                  </li>
                </ol>
                <div className="mt-10 rounded-2xl border border-white/10 p-5">
                  <p className="eyebrow-mute">Hauptleistung</p>
                  <Link href={`/leistungen/${pillar.slug}`} className="link-u mt-2 inline-block font-medium text-brand">{pillar.title} →</Link>
                </div>
              </div>
            </nav>

            <div className="lg:col-span-8 lg:col-start-4">
              {g.sections.map((s) => (
                <Reveal key={s.title} className="mb-16 last:mb-0">
                  <h2 id={idOf(s.title)} className="h3 scroll-mt-28 !text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)]">{s.title}</h2>
                  {s.paras.length > 0 && (
                    <div className="prose-dt mt-6">
                      {s.paras.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}
                  {s.sub && (
                    <div className="mt-8 space-y-8">
                      {s.sub.map((x) => (
                        <div key={x.title} className="border-l border-brand/40 pl-6">
                          <h3 className="font-display text-xl font-medium tracking-[-.02em]">{x.title}</h3>
                          <div className="prose-dt mt-3 [&_p]:!text-base">
                            {x.paras.map((p, i) => (
                              <p key={i}>{p}</p>
                            ))}
                          </div>
                          {x.list && (
                            <ul className="mt-3 space-y-2 text-fg-dim">
                              {x.list.map((li) => (
                                <li key={li}>{li}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {s.list && (
                    <ul className="mt-6 space-y-3">
                      {s.list.map((li) => (
                        <li key={li} className="flex gap-4 text-lead text-fg-dim">
                          <span aria-hidden="true" className="mt-[.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.callout && (
                    <aside className="mt-8 rounded-2xl border border-white/10 bg-ink-800 p-6">
                      <p className="eyebrow">{s.callout.title}</p>
                      <p className="mt-2 text-fg-dim">{s.callout.text}</p>
                    </aside>
                  )}
                  {s.figure && <CaseFigure caseId={s.figure.caseId} text={s.figure.text} />}
                </Reveal>
              ))}

              <section id="faq" aria-labelledby="guide-faq-h" className="mt-20 scroll-mt-28">
                <h2 id="guide-faq-h" className="h3 mb-8 !text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)]">Häufige Fragen</h2>
                <Faq items={g.faq} defaultOpen={null} />
              </section>

              <Reveal className="mt-16 rounded-[2rem] border border-white/10 bg-ink-800 p-8 md:p-10">
                <p className="eyebrow">Delle kostenlos einschätzen lassen</p>
                <p className="mt-3 font-display text-[clamp(1.5rem,1rem+2vw,2.4rem)] font-medium leading-tight tracking-[-.03em]">
                  Zeigen Sie uns den Schaden – wir sagen Ihnen ehrlich, was möglich ist.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Cta href="/kontakt#anfrage">Schaden zeigen</Cta>
                  <PhoneCta />
                </div>
                <Link href={`/leistungen/${pillar.slug}`} className="link-u mt-6 inline-flex items-center gap-2 text-fg-dim hover:text-fg">
                  Mehr zur Leistung: {pillar.title} <Icon name="arrow" size={16} />
                </Link>
              </Reveal>
              <p className="mt-10 text-[.85rem] text-fg-mute">{GUIDE_DISCLAIMER}</p>
            </div>
          </div>
        </div>
      </article>
      <RelatedLinks services={g.services} landings={g.landings} regions={g.regions} guides={others} title="Weiterlesen." />
      <FinalCta title={['Jetzt Schaden', 'besprechen.']} eyebrow="Termin" />
    </>
  );
}

/** Teilt die H1 für den Hero in zwei Zeilen (Mitte am nächsten Leerzeichen). */
function splitTitle(h1: string): [string, string] {
  const w = h1.split(' ');
  if (w.length < 3) return [h1, ''];
  let best = 1;
  let diff = Infinity;
  for (let i = 1; i < w.length; i++) {
    const d = Math.abs(w.slice(0, i).join(' ').length - w.slice(i).join(' ').length);
    if (d < diff) {
      diff = d;
      best = i;
    }
  }
  return [w.slice(0, best).join(' '), w.slice(best).join(' ')];
}
