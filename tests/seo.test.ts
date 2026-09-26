/* eslint-disable @typescript-eslint/no-explicit-any -- JSON-LD-Knoten werden hier bewusst untypisiert geprüft */
import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { SERVICES } from '@/content/services';
import { REGIONS } from '@/content/regions';
import { GUIDES } from '@/content/guides';
import { LANDINGS } from '@/content/landings';
import { HOME_FAQ, SITE_URL } from '@/content/site';
import { articleLd, breadcrumbLd, buildMetadata, faqLd, localBusinessLd, organizationLd, serviceLd, websiteLd } from '@/lib/seo';

describe('sitemap.xml', () => {
  const urls = sitemap().map((s) => s.url);
  it('enthält alle öffentlichen, indexierbaren Seiten', () => {
    expect(urls).toContain(`${SITE_URL}/`);
    for (const s of SERVICES) expect(urls).toContain(`${SITE_URL}/leistungen/${s.slug}`);
    for (const r of REGIONS) expect(urls).toContain(`${SITE_URL}/einzugsgebiet/${r.slug}`);
    for (const l of LANDINGS) expect(urls).toContain(`${SITE_URL}/leistungen/${l.slug}`);
    for (const g of GUIDES) expect(urls).toContain(`${SITE_URL}/ratgeber/${g.slug}`);
    for (const p of ['/leistungen', '/einzugsgebiet', '/ratgeber', '/kontakt', '/vorher-nachher']) expect(urls).toContain(`${SITE_URL}${p}`);
  });
  it('enthält keine noindex-, API- oder internen Seiten', () => {
    for (const u of urls) {
      expect(u).not.toMatch(/impressum|datenschutz|\/api\/|admin|login|lab/);
      expect(u.startsWith(SITE_URL)).toBe(true);
    }
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe('robots.txt', () => {
  const r = robots();
  it('verweist auf die Sitemap und sperrt interne Bereiche', () => {
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    const rule = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rule.allow).toBe('/');
    expect(rule.disallow).toContain('/api/');
  });
});

describe('Metadaten-Builder', () => {
  it('setzt Canonical, OpenGraph und Twitter', () => {
    const m = buildMetadata({ title: 'T', description: 'D', path: '/leistungen/smart-repair' });
    expect(m.alternates?.canonical).toBe(`${SITE_URL}/leistungen/smart-repair`);
    expect((m.openGraph as { url: string }).url).toBe(`${SITE_URL}/leistungen/smart-repair`);
    expect((m.twitter as { card: string }).card).toBe('summary_large_image');
    expect((m.robots as { index: boolean }).index).toBe(true);
  });
  it('noindex für Rechtsseiten', () => {
    const m = buildMetadata({ title: 'T', description: 'D', path: '/impressum', noindex: true });
    expect((m.robots as { index: boolean }).index).toBe(false);
  });
});

describe('JSON-LD', () => {
  it('LocalBusiness: NAP und Öffnungszeiten laut Website', () => {
    const b = localBusinessLd() as Record<string, any>;
    expect(b['@type']).toContain('AutoBodyShop');
    expect(b.telephone).toBe('+491747117321');
    expect(b.address.streetAddress).toBe('Falkenberger Landstraße 77');
    expect(b.address.postalCode).toBe('28865');
    const weekdays = b.openingHoursSpecification[0];
    expect(weekdays.opens).toBe('08:30');
    expect(weekdays.closes).toBe('17:30');
    expect(b.openingHoursSpecification[1]).toMatchObject({ dayOfWeek: 'Saturday', opens: '10:00', closes: '13:00' });
    expect(b.areaServed).toHaveLength(6);
    // Echtes Google-Profil verknüpft; keine erfundenen Bewertungen im Markup
    expect(b.sameAs).toEqual(['https://maps.app.goo.gl/2mEA8NCjBuqtmzBo9']);
    expect(b.hasMap).toBe('https://maps.app.goo.gl/2mEA8NCjBuqtmzBo9');
    expect(b.geo.latitude).toBeCloseTo(53.154, 3);
    expect(b.aggregateRating).toBeUndefined();
  });
  it('Organization, WebSite, Service, Article, Breadcrumb, FAQ', () => {
    expect((organizationLd() as any)['@type']).toBe('Organization');
    expect((websiteLd() as any)['@type']).toBe('WebSite');
    expect((serviceLd({ name: 'X', description: 'Y', path: '/leistungen/x' }) as any).provider.telephone).toBe('+491747117321');
    expect((articleLd({ headline: 'H', description: 'D', path: '/ratgeber/x', published: '2026-09-26' }) as any).datePublished).toBe('2026-09-26');
    const bc = breadcrumbLd([{ name: 'Start', path: '/' }, { name: 'A', path: '/a' }]) as any;
    expect(bc.itemListElement.map((i: any) => i.position)).toEqual([1, 2]);
    expect(bc.itemListElement[1].item).toBe(`${SITE_URL}/a`);
    const f = faqLd(HOME_FAQ) as any;
    expect(f.mainEntity).toHaveLength(HOME_FAQ.length);
    expect(f.mainEntity[0].acceptedAnswer.text).toBe(HOME_FAQ[0].a);
  });
});
