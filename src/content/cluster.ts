import { GUIDES, type Guide } from './guides';
import { LANDINGS, type Landing } from './landings';
import { SERVICES } from './services';

/**
 * Themencluster: Die Hauptleistung (Pillar) verlinkt auf alle passenden Ratgeber und Landingpages,
 * jeder Ratgeber und jede Landingpage verlinkt zurück auf ihre Hauptleistung.
 */
export function guidesForService(slug: string, max = 12): Guide[] {
  const svc = SERVICES.find((s) => s.slug === slug);
  const pillar = GUIDES.filter((g) => g.pillar === slug);
  const mentioned = GUIDES.filter((g) => g.pillar !== slug && g.services.includes(slug));
  const explicit = (svc?.guides ?? []).map((x) => GUIDES.find((g) => g.slug === x)).filter(Boolean) as Guide[];
  const out: Guide[] = [];
  for (const g of [...pillar, ...explicit, ...mentioned]) if (!out.includes(g)) out.push(g);
  return out.slice(0, max);
}

export function landingsForService(slug: string): Landing[] {
  return LANDINGS.filter((l) => l.pillar === slug || l.services.includes(slug));
}

export const PILLAR = 'dellenbeseitigung';
