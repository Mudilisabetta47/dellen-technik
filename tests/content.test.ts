import { describe, expect, it } from 'vitest';
import { BIZ, CASES, HOME_FAQ, HOURS, SITE_URL, isValidGbpUrl } from '@/content/site';
import { LANDINGS } from '@/content/landings';
import { readMinutes } from '@/content/guides';
import { REVIEWS, REVIEW_AGGREGATE } from '@/content/reviews';
import { CORE_REGIONS, UMLAND_REGIONS } from '@/content/regions';
import { SERVICES } from '@/content/services';
import { REGIONS } from '@/content/regions';
import { GUIDES } from '@/content/guides';
import { DATENSCHUTZ, IMPRESSUM } from '@/content/legal';

const uniq = <T,>(a: T[]) => new Set(a).size === a.length;

describe('Stammdaten (NAP)', () => {
  it('Telefon, Adresse und Zeiten entsprechen der bisherigen Website', () => {
    expect(BIZ.phone).toBe('0174 71 17 321');
    expect(BIZ.phoneTel).toBe('+491747117321');
    expect(BIZ.street).toBe('Falkenberger Landstraße 77');
    expect(BIZ.zip).toBe('28865');
    expect(BIZ.city).toBe('Lilienthal');
    expect(BIZ.entranceNote).toMatch(/hinter dem Gebäude/i);
    expect(HOURS.map((h) => `${h.label} ${h.open ?? 'zu'}-${h.close ?? ''}`)).toEqual(['Mo – Fr 08:30-17:30', 'Sa 10:00-13:00', 'So zu-']);
    expect(SITE_URL).toBe('https://dellentechnik-lilienthal.de');
  });
  it('drei echte Vorher/Nachher-Fälle', () => {
    expect(CASES.map((c) => c.id)).toEqual(['heckstossstange', 'radlauf', 'kotfluegel']);
  });
});

describe('Seitenarchitektur', () => {
  it('sechs Leistungen wie auf der bisherigen Website', () => {
    expect(SERVICES.map((s) => s.title)).toEqual([
      'Dellenbeseitigung',
      'Hagelschaden-Reparatur',
      'Beulenentfernung',
      'Smart-Repair',
      'Lackauffrischung',
      'Fahrzeugaufbereitung',
    ]);
  });
  it('Slugs sind eindeutig', () => {
    expect(uniq(SERVICES.map((s) => s.slug))).toBe(true);
    expect(uniq(REGIONS.map((s) => s.slug))).toBe(true);
    expect(uniq(GUIDES.map((s) => s.slug))).toBe(true);
  });
  it('alle internen Querverweise lösen auf', () => {
    const sv = new Set(SERVICES.map((s) => s.slug));
    const rg = new Set(REGIONS.map((s) => s.slug));
    const gd = new Set(GUIDES.map((s) => s.slug));
    for (const s of SERVICES) {
      s.related.forEach((r) => expect(sv.has(r), `${s.slug} → ${r}`).toBe(true));
      s.guides.forEach((r) => expect(gd.has(r), `${s.slug} → ${r}`).toBe(true));
      s.regions.forEach((r) => expect(rg.has(r), `${s.slug} → ${r}`).toBe(true));
      expect(CASES.some((c) => c.id === s.caseId)).toBe(true);
    }
    for (const r of REGIONS) {
      r.services.forEach((x) => expect(sv.has(x)).toBe(true));
      r.guides.forEach((x) => expect(gd.has(x)).toBe(true));
      r.neighbors.forEach((x) => expect(rg.has(x)).toBe(true));
    }
    const ld = new Set(LANDINGS.map((l) => l.slug));
    for (const g of GUIDES) {
      expect(sv.has(g.pillar), `${g.slug} pillar`).toBe(true);
      g.services.forEach((x) => expect(sv.has(x)).toBe(true));
      g.regions.forEach((x) => expect(rg.has(x), `${g.slug} → ${x}`).toBe(true));
      (g.landings ?? []).forEach((x) => expect(ld.has(x), `${g.slug} → ${x}`).toBe(true));
      g.related.forEach((x) => expect(gd.has(x), `${g.slug} → ${x}`).toBe(true));
      expect(g.related).not.toContain(g.slug);
    }
    for (const l of LANDINGS) {
      expect(sv.has(l.pillar)).toBe(true);
      l.services.forEach((x) => expect(sv.has(x)).toBe(true));
      l.regions.forEach((x) => expect(rg.has(x), `${l.slug} → ${x}`).toBe(true));
      l.guides.forEach((x) => expect(gd.has(x), `${l.slug} → ${x}`).toBe(true));
    }
    for (const r of REGIONS) (r.landings ?? []).forEach((x) => expect(ld.has(x)).toBe(true));
  });
  it('Slug-Kollisionen zwischen Leistungen und Landingpages gibt es nicht', () => {
    const all = [...SERVICES.map((s) => s.slug), ...LANDINGS.map((l) => l.slug)];
    expect(uniq(all)).toBe(true);
  });
});

describe('SEO-Texte je Seite individuell', () => {
  const all = [
    ...SERVICES.map((s) => ({ id: s.slug, ...s.seo, h1: s.h1.join(' ') })),
    ...REGIONS.map((r) => ({ id: r.slug, ...r.seo, h1: r.h1.join(' ') })),
    ...GUIDES.map((g) => ({ id: g.slug, ...g.seo, h1: g.h1 })),
    ...LANDINGS.map((l) => ({ id: l.slug, ...l.seo, h1: l.h1.join(' ') })),
  ];
  it('Title, Description, OG-Title, OG-Description und H1 sind vorhanden und eindeutig', () => {
    for (const k of ['title', 'description', 'ogTitle', 'ogDescription', 'h1'] as const) {
      const vals = all.map((a) => a[k]);
      vals.forEach((v) => expect(v.length).toBeGreaterThan(10));
      expect(uniq(vals), `${k} doppelt`).toBe(true);
    }
  });
  it('Länge im Suchergebnis-Rahmen', () => {
    for (const a of all) {
      expect(a.title.length, `${a.id} title`).toBeLessThanOrEqual(64);
      expect(a.description.length, `${a.id} description`).toBeGreaterThanOrEqual(90);
      expect(a.description.length, `${a.id} description`).toBeLessThanOrEqual(172);
    }
  });
  it('OG-Titel ist nicht bloß der Seitentitel', () => {
    for (const a of all) expect(a.ogTitle).not.toBe(a.title);
  });
});

describe('FAQ-Inhalte', () => {
  it('jede Leistungs- und Regionsseite hat sichtbare FAQ mit Antworten', () => {
    for (const s of SERVICES) expect(s.faq.length).toBeGreaterThanOrEqual(3);
    for (const r of REGIONS) expect(r.faq.length).toBeGreaterThanOrEqual(3);
    for (const f of [...HOME_FAQ, ...SERVICES.flatMap((s) => s.faq), ...REGIONS.flatMap((r) => r.faq)]) {
      expect(f.q.endsWith('?')).toBe(true);
      expect(f.a.length).toBeGreaterThan(40);
    }
  });
});

describe('keine erfundenen Aussagen', () => {
  const text = JSON.stringify([SERVICES, REGIONS, GUIDES, LANDINGS, HOME_FAQ, CASES]).toLowerCase();
  it.each(['zertifiziert', 'ausgezeichnet', 'testsieger', 'tüv', '5 sterne', 'euro', '€', 'ab 49', 'garantiert', 'preisgarantie', 'jahre erfahrung', 'über 1000', 'bestpreis'])('enthält nicht „%s“', (w) => {
    expect(text.includes(w), w).toBe(false);
  });
});

describe('Rechtstexte', () => {
  it('Impressum und Datenschutz entsprechen der bisherigen Website', () => {
    const imp = JSON.stringify(IMPRESSUM);
    expect(imp).toContain('Akin Hoshaber');
    expect(imp).toContain('60 232 19415');
    expect(imp).toContain('Falkenberger Landstraße 77, 28865 Lilienthal');
    const ds = JSON.stringify(DATENSCHUTZ);
    expect(ds).toContain('Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen');
    expect(ds).toContain('1. Verantwortlicher');
    expect(DATENSCHUTZ.filter((s) => s.title).length).toBe(10);
  });
});

describe('Guides: Tiefe und Struktur', () => {
  it('jeder Ratgeber hat Einleitung, Abschnitte, FAQ und keine Preis-/Zeitzahlen', () => {
    for (const g of GUIDES) {
      expect(g.intro.length, g.slug).toBeGreaterThan(200);
      expect(g.sections.length, g.slug).toBeGreaterThanOrEqual(3);
      expect(g.faq.length, g.slug).toBeGreaterThanOrEqual(3);
      expect(readMinutes(g), g.slug).toBeGreaterThanOrEqual(2);
      const body = JSON.stringify([g.intro, g.tldr, g.sections, g.faq]);
      expect(/\d+\s?(€|Euro|Stunden|Std\.|Tage|Tagen|Minuten)/i.test(body), `${g.slug}: Preis-/Zeitangabe`).toBe(false);
    }
  });
  it('die 13 geforderten Themen sind abgedeckt', () => {
    const slugs = GUIDES.map((g) => g.slug);
    for (const s of [
      'was-kostet-eine-dellenreparatur',
      'delle-im-auto-was-tun',
      'delle-ohne-lackieren-entfernen',
      'was-kostet-eine-hagelschaden-reparatur',
      'hagelschaden-am-auto-was-jetzt',
      'was-ist-smart-repair',
      'welche-dellen-lassen-sich-ohne-lackieren-reparieren',
      'delle-nach-parkrempler-was-tun',
      'delle-vor-leasingrueckgabe-reparieren',
      'dellen-vor-fahrzeugverkauf-reparieren',
      'wie-lange-dauert-eine-dellenreparatur',
      'kann-eine-delle-unsichtbar-repariert-werden',
    ]) expect(slugs).toContain(s);
    expect(LANDINGS.map((l) => l.slug)).toContain('parkdelle-reparieren'); // „Parkdelle reparieren lassen“
  });
  it('jede Ratgeber-Hauptleistung verlinkt zurück (Cluster)', () => {
    const dellen = GUIDES.filter((g) => g.pillar === 'dellenbeseitigung');
    expect(dellen.length).toBeGreaterThanOrEqual(6);
  });
});

describe('Landingpages', () => {
  it('haben Problem, Voraussetzungen, Ablauf, Fall, Region und FAQ', () => {
    for (const l of LANDINGS) {
      const types = l.blocks.map((b) => b.type);
      for (const t of ['split', 'conditions', 'steps', 'case', 'region'] as const) expect(types, `${l.slug}: ${t}`).toContain(t);
      expect(l.faq.length).toBeGreaterThanOrEqual(4);
      expect(l.keywords.length).toBeGreaterThanOrEqual(3);
    }
  });
  it('„Delle ohne Lackieren Bremen“ behauptet nicht, jede Delle sei reparierbar', () => {
    const l = LANDINGS.find((x) => x.slug === 'delle-ohne-lackieren-bremen')!;
    const body = JSON.stringify(l).toLowerCase();
    expect(body).toContain('nicht jede delle');
    expect(body).not.toMatch(/jede delle (lässt sich|kann) (ohne|lackschonend)/);
    expect(l.keywords).toEqual(expect.arrayContaining(['Delle ohne Lackieren Bremen', 'Parkdelle ohne Lackieren Bremen', 'Beule ohne Lackieren Bremen']));
  });
});

describe('Regionen', () => {
  it('Kerngebiet = sechs Orte der bisherigen Website, Umland als Sammelseiten je Landkreis/Richtung', () => {
    expect(CORE_REGIONS.map((r) => r.slug)).toEqual(['lilienthal', 'bremen', 'osterholz-scharmbeck', 'worpswede', 'ritterhude', 'grasberg']);
    const places = UMLAND_REGIONS.flatMap((r) => r.places ?? []);
    for (const p of ['Schwanewede', 'Lemwerder', 'Achim', 'Oyten', 'Ottersberg', 'Tarmstedt', 'Delmenhorst', 'Stuhr', 'Weyhe', 'Syke', 'Verden', 'Rotenburg', 'Zeven']) expect(places.join(' ')).toContain(p);
  });
  it('Umland-Seiten behaupten keine regelmäßige Betreuung außerhalb des bestätigten Gebiets', () => {
    for (const r of UMLAND_REGIONS.filter((x) => x.slug !== 'schwanewede-lemwerder')) {
      expect(JSON.stringify(r).toLowerCase()).not.toContain('regelmäßig');
    }
  });
});

describe('Google-Unternehmensprofil und Bewertungen', () => {
  it('nur echte Profil-Links werden akzeptiert', () => {
    expect(isValidGbpUrl('https://maps.app.goo.gl/abc123')).toBe(true);
    expect(isValidGbpUrl('https://g.page/dellentechnik')).toBe(true);
    expect(isValidGbpUrl('https://www.google.com/maps/place/Dellen+Technik/@53.13,8.90')).toBe(true);
    expect(isValidGbpUrl('https://share.google/roAsRmtFbpXdmiE4c')).toBe(false);
    expect(isValidGbpUrl('https://www.google.com/search?q=DellenTechnik+Lilienthal')).toBe(false);
    expect(isValidGbpUrl('http://maps.app.goo.gl/abc')).toBe(false);
    expect(isValidGbpUrl('')).toBe(false);
  });
  it('keine erfundenen Bewertungen', () => {
    expect(REVIEWS).toHaveLength(0);
    expect(REVIEW_AGGREGATE).toBeNull();
  });
});

describe('NAP-Konsistenz', () => {
  it('jede Telefonnummer im Inhalt hat dasselbe Format', () => {
    const all = JSON.stringify([SERVICES, REGIONS, GUIDES, LANDINGS, HOME_FAQ, IMPRESSUM, DATENSCHUTZ]);
    const found = all.match(/0174[\s\d]*/g) ?? [];
    expect(found.length).toBeGreaterThan(5);
    for (const f of found) expect(f.trim()).toBe('0174 71 17 321');
  });
  it('Straße immer identisch, Name immer „Dellen Technik“', () => {
    const all = JSON.stringify([SERVICES, REGIONS, GUIDES, LANDINGS, HOME_FAQ, IMPRESSUM, DATENSCHUTZ]);
    for (const m of all.matchAll(/Falkenberger Landstra(ß|ss)e\s?(\d+)?/g)) {
      expect(m[1]).toBe('ß');
      if (m[2]) expect(m[2]).toBe('77');
    }
    expect(/DellenTechnik|Dellen-Technik/.test(all)).toBe(false);
  });
});
