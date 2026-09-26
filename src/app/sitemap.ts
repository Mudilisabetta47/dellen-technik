import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';
import { SERVICES } from '@/content/services';
import { REGIONS } from '@/content/regions';
import { GUIDES, GUIDES_PUBLISHED } from '@/content/guides';
import { LANDINGS } from '@/content/landings';

const BUILD = new Date();

/** Nur öffentliche, indexierbare Seiten. Impressum/Datenschutz sind noindex und bleiben draußen. */
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], lastModified: Date = BUILD) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    u('/', 1, 'weekly'),
    u('/leistungen', 0.9, 'monthly'),
    ...SERVICES.map((s) => u(`/leistungen/${s.slug}`, 0.9, 'monthly')),
    ...LANDINGS.map((l) => u(`/leistungen/${l.slug}`, 0.85, 'monthly')),
    u('/vorher-nachher', 0.6, 'monthly'),
    u('/einzugsgebiet', 0.7, 'monthly'),
    ...REGIONS.map((r) => u(`/einzugsgebiet/${r.slug}`, 0.8, 'monthly')),
    u('/ratgeber', 0.7, 'weekly'),
    ...GUIDES.map((g) => u(`/ratgeber/${g.slug}`, 0.6, 'monthly', new Date(GUIDES_PUBLISHED))),
    u('/kontakt', 0.8, 'yearly'),
  ];
}
