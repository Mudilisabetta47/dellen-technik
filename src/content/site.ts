/**
 * Stammdaten (NAP) – die einzige Quelle für Name, Adresse, Telefon und Zeiten.
 * Alles hier stammt aus der bisherigen Website dellentechnik-lilienthal.de.
 */
export const SITE_URL = 'https://dellentechnik-lilienthal.de';

export const BIZ = {
  name: 'Dellen Technik',
  /** Schreibweise im Google-Profil – nur für das Schema-Markup (alternateName). */
  alternateName: 'DellenTechnik',
  legalName: 'Dellen Technik – Einzelunternehmen',
  owner: 'Akin Hoshaber',
  tagline: 'Dellenbeseitigung, Hagelschaden-Reparatur und Smart-Repair in Lilienthal',
  phone: '0174 71 17 321',
  phoneTel: '+491747117321',
  whatsapp: 'https://wa.me/491747117321',
  street: 'Falkenberger Landstraße 77',
  zip: '28865',
  city: 'Lilienthal',
  region: 'Niedersachsen',
  country: 'DE',
  // Koordinaten des Google-Profil-Pins (bisherige Website: 53.1372 / 8.9039, eine Näherung)
  geo: { lat: 53.154033, lng: 8.9298011 },
  entranceNote: 'Eingang hinter dem Gebäude',
  entranceHint: 'Bitte hinten herum fahren',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.154033,8.9298011',
  routeUrl: 'https://www.google.com/maps/dir/?api=1&destination=53.154033,8.9298011',
  legalEmail: 'mudi@mep-agentur.de',
  taxNumber: '60 232 19415',
} as const;

/**
 * GOOGLE-UNTERNEHMENSPROFIL
 * Gesetzt am 26.09.2026 (Kurzlink auf das Profil „DellenTechnik Lilienthal“, geprüft). Zum Ändern die ECHTE Profil-URL eintragen (Google Maps → Profil → „Teilen“ → Link kopieren,
 * z. B. https://maps.app.goo.gl/… oder https://www.google.com/maps/place/…) – oder per Umgebungsvariable
 * NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL setzen. KEINEN Suchlink (google.com/search?…) und keinen
 * share.google-Link verwenden: Solche Links zeigen auf eine Suche, nicht auf das Profil, und werden abgelehnt.
 * Ist sie leer: kein sameAs/hasMap im Markup, keine Profil-Links auf der Seite.
 */
const GBP_RAW = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL ?? 'https://maps.app.goo.gl/2mEA8NCjBuqtmzBo9';

export function isValidGbpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return false;
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'g.page' || host === 'maps.app.goo.gl') return true;
    if (host === 'google.com' || host === 'google.de') return u.pathname.startsWith('/maps/place') || (u.pathname.startsWith('/maps') && u.searchParams.has('cid'));
    return false;
  } catch {
    return false;
  }
}

/** Nur eine geprüfte Profil-URL wird verwendet, sonst leer. */
export const GOOGLE_BUSINESS_PROFILE_URL = isValidGbpUrl(GBP_RAW) ? GBP_RAW : '';

/** Steuert die vier „Umland“-Seiten (Landkreis Verden/Rotenburg, Bremer Süden, Schwanewede). Vor Livegang mit dem Betrieb bestätigen. */
export const ENABLE_UMLAND_PAGES = (process.env.NEXT_PUBLIC_ENABLE_UMLAND_PAGES ?? 'true') !== 'false';

export const ADDRESS_LINE = `${BIZ.street}, ${BIZ.zip} ${BIZ.city}`;

export type HoursRow = { days: string; label: string; open?: string; close?: string; closed?: boolean };

export const HOURS: HoursRow[] = [
  { days: 'Montag – Freitag', label: 'Mo – Fr', open: '08:30', close: '17:30' },
  { days: 'Samstag', label: 'Sa', open: '10:00', close: '13:00' },
  { days: 'Sonntag', label: 'So', closed: true },
];

export const HOURS_NOTE = 'Termine außerhalb der Zeiten auf Anfrage möglich.';

/** Öffnungszeiten je Wochentag (0 = Sonntag) in Minuten – für die „Jetzt geöffnet“-Anzeige. */
export const OPEN_MINUTES: Record<number, [number, number] | null> = {
  0: null,
  1: [8 * 60 + 30, 17 * 60 + 30],
  2: [8 * 60 + 30, 17 * 60 + 30],
  3: [8 * 60 + 30, 17 * 60 + 30],
  4: [8 * 60 + 30, 17 * 60 + 30],
  5: [8 * 60 + 30, 17 * 60 + 30],
  6: [10 * 60, 13 * 60],
};

export const NAV = [
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Vorher / Nachher', href: '/#galerie' },
  { label: 'Ablauf', href: '/#ablauf' },
  { label: 'Einzugsgebiet', href: '/einzugsgebiet' },
  { label: 'Ratgeber', href: '/ratgeber' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;

export const WHY = [
  { title: 'Lackschonende Reparatur', text: 'Wo der originale Lack erhalten bleiben kann, soll er erhalten bleiben. Das sichert Optik und Fahrzeugwert.' },
  { title: 'Schnelle Terminvereinbarung', text: 'Termine vergeben wir kurzfristig nach Vereinbarung. Ein Anruf genügt.' },
  { title: 'Faire Preise', text: 'Ein transparenter Preis für saubere Arbeit – die Einschätzung dazu bekommen Sie kostenlos vor Ort.' },
  { title: 'Persönliche Beratung', text: 'Wir nehmen uns Zeit für Ihr Anliegen und beraten ehrlich und persönlich.' },
  { title: 'Saubere Handwerksarbeit', text: 'Ein hoher Anspruch an Qualität – damit Ihr Fahrzeug wieder gepflegt und hochwertig aussieht.' },
  { title: 'Erfahrung in Dellen- und Hagelreparatur', text: 'Kleine Parkdelle oder viele Hageltreffer: Wir kennen die Unterschiede und planen entsprechend.' },
  { title: 'Kostenlose Ersteinschätzung vor Ort', text: 'Kommen Sie mit Ihrem Fahrzeug vorbei. Wir schauen es uns an und sagen Ihnen offen, was möglich ist.' },
] as const;

export const PROCESS = [
  {
    n: '01',
    title: 'Schaden zeigen',
    text: 'Kommen Sie zur unverbindlichen Begutachtung direkt bei uns vorbei. Der Eingang befindet sich hinter dem Gebäude.',
  },
  {
    n: '02',
    title: 'Einschätzung erhalten',
    text: 'Wir prüfen den Schaden und geben Ihnen eine transparente Einschätzung – kostenlos und vor Ort.',
  },
  {
    n: '03',
    title: 'Termin vereinbaren',
    text: 'Gemeinsam finden wir einen passenden Termin für die Reparatur.',
  },
  {
    n: '04',
    title: 'Fahrzeug abholen',
    text: 'Ihr Fahrzeug wird professionell instandgesetzt und ist wieder in Bestform.',
  },
] as const;

/** Die drei echten Vorher/Nachher-Fälle der bisherigen Website. */
export const CASES = [
  {
    id: 'heckstossstange',
    src: '/images/cases/delle-heckstossstange',
    w: 392,
    h: 300,
    title: 'Heckstoßstange',
    label: 'Delle entfernt',
    alt: 'Vorher/Nachher: Delle an der Heckstoßstange entfernt',
    caption: 'Vorher / Nachher Heckstoßstange – Delle entfernt',
    study: {
      title: 'Delle an der Heckstoßstange entfernt',
      part: 'Heck / Heckstoßstange',
      damage: 'Delle',
      before: 'Im Vorher-Bild ist im Heckbereich eine deutlich sichtbare Delle zu erkennen.',
      method: 'Dellenbeseitigung.',
      after: 'Im Nachher-Bild ist die Fläche wieder gleichmäßig – die Delle ist nicht mehr zu erkennen.',
      service: 'dellenbeseitigung',
    },
  },
  {
    id: 'radlauf',
    src: '/images/cases/delle-radlauf-ausbeulen-ohne-lackieren',
    w: 416,
    h: 330,
    title: 'Radlauf',
    label: 'Ausbeulen ohne Lackieren',
    alt: 'Vorher/Nachher: Ausbeulen ohne Lackieren am Radlauf',
    caption: 'Vorher / Nachher Radlauf – Ausbeulen ohne Lackieren',
    study: {
      title: 'Delle im Radlauf – ohne Lackieren entfernt',
      part: 'Kotflügel im Bereich des Radlaufs',
      damage: 'Verformung / Delle',
      before: 'Im Vorher-Bild ist im Kotflügel oberhalb des Radlaufs eine deutliche Verformung zu sehen.',
      method: 'Ausbeulen ohne Lackieren – der Lack wurde nicht neu aufgebracht.',
      after: 'Im Nachher-Bild verlaufen die Spiegelungen wieder gleichmäßig über die Fläche.',
      service: 'dellenbeseitigung',
    },
  },
  {
    id: 'kotfluegel',
    src: '/images/cases/delle-kotfluegel',
    w: 294,
    h: 293,
    title: 'Kotflügel',
    label: 'Dellenbeseitigung',
    alt: 'Vorher/Nachher: Delle auf dem Kotflügel beseitigt',
    caption: 'Vorher / Nachher Kotflügel – Dellenbeseitigung',
    study: {
      title: 'Delle am Kotflügel beseitigt',
      part: 'Kotflügel im vorderen Bereich neben dem Scheinwerfer',
      damage: 'Delle',
      before: 'Im Vorher-Bild ist neben dem Scheinwerfer eine Delle in der Fläche erkennbar.',
      method: 'Dellenbeseitigung.',
      after: 'Im Nachher-Bild ist die Fläche glatt, die Lichtreflexe laufen ruhig.',
      service: 'dellenbeseitigung',
    },
  },
] as const;

export const HOME_FAQ = [
  {
    q: 'Wo befindet sich Dellen Technik?',
    a: 'Unsere Werkstatt liegt in der Falkenberger Landstraße 77 in 28865 Lilienthal – verkehrsgünstig erreichbar aus Bremen, Osterholz-Scharmbeck, Worpswede und dem gesamten Umland. Der Eingang befindet sich hinter dem Gebäude.',
  },
  {
    q: 'Kann eine Delle ohne Lackieren entfernt werden?',
    a: 'In den meisten Fällen ja. Mit moderner Dellentechnik beheben wir Schäden lackschonend – der originale Werkslack bleibt erhalten und Ihr Fahrzeug behält seinen Wert. Ob es bei Ihrer Delle möglich ist, sehen wir bei der kostenlosen Ersteinschätzung vor Ort.',
  },
  {
    q: 'Bedienen Sie auch Bremen und Osterholz-Scharmbeck?',
    a: 'Ja. Wir betreuen regelmäßig Kunden aus Bremen, Lilienthal, Osterholz-Scharmbeck, Ritterhude, Worpswede, Grasberg und dem gesamten Landkreis Osterholz.',
  },
  {
    q: 'Wie schnell bekomme ich einen Termin?',
    a: 'Termine vergeben wir kurzfristig nach Vereinbarung. Rufen Sie uns einfach an – wir finden gemeinsam einen passenden Zeitpunkt.',
  },
  {
    q: 'Welche Reparaturen bieten Sie an?',
    a: 'Wir sind Spezialist für Dellenbeseitigung, Hagelschaden-Reparatur, Beulenentfernung, Smart-Repair sowie Lackauffrischung und Fahrzeugaufbereitung.',
  },
] as const;

export const MARQUEE = [
  'Dellenbeseitigung',
  'Hagelschaden-Reparatur',
  'Beulenentfernung',
  'Smart-Repair',
  'Lackauffrischung',
  'Fahrzeugaufbereitung',
] as const;
