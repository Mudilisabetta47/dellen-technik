import type { Metadata } from 'next';
import { ADDRESS_LINE, BIZ, GOOGLE_BUSINESS_PROFILE_URL, HOURS_NOTE, SITE_URL } from '@/content/site';
import { reviewAggregateLd } from '@/content/reviews';
import { CORE_REGIONS } from '@/content/regions';
import type { Faq } from '@/content/services';

export const OG_IMAGE = { url: '/og.jpg', width: 1200, height: 630, alt: 'Dellen Technik – Dellenbeseitigung und Smart-Repair in Lilienthal' };

export const absUrl = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

type MetaInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
};

/** Individuell geschriebene Metadaten je Seite (Title, Description, OG, Twitter, Canonical). */
export function buildMetadata({ title, description, path, ogTitle, ogDescription, noindex, type = 'website' }: MetaInput): Metadata {
  const url = absUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      type,
      url,
      siteName: BIZ.name,
      locale: 'de_DE',
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [{ url: absUrl(OG_IMAGE.url), width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [absUrl(OG_IMAGE.url)],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

export const ID = {
  business: `${SITE_URL}/#business`,
  org: `${SITE_URL}/#organization`,
  site: `${SITE_URL}/#website`,
};

// Nur das bestätigte Kerngebiet im Markup; Umland-Orte stehen als Text auf den jeweiligen Seiten.
const areaServed = CORE_REGIONS.map((r) => ({ '@type': 'City', name: r.name }));

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ID.org,
    name: BIZ.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/dellen-technik-logo.png`,
    telephone: BIZ.phoneTel,
    address: addressLd(),
    ...(GOOGLE_BUSINESS_PROFILE_URL ? { sameAs: [GOOGLE_BUSINESS_PROFILE_URL] } : {}),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ID.site,
    url: `${SITE_URL}/`,
    name: BIZ.name,
    inLanguage: 'de-DE',
    publisher: { '@id': ID.org },
  };
}

function addressLd() {
  return {
    '@type': 'PostalAddress',
    streetAddress: BIZ.street,
    postalCode: BIZ.zip,
    addressLocality: BIZ.city,
    addressRegion: BIZ.region,
    addressCountry: BIZ.country,
  };
}

/** Vollständiger LocalBusiness-Knoten (Startseite und Kontakt). */
export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoBodyShop', 'LocalBusiness'],
    '@id': ID.business,
    name: BIZ.name,
    alternateName: BIZ.alternateName,
    url: `${SITE_URL}/`,
    image: absUrl(OG_IMAGE.url),
    logo: `${SITE_URL}/brand/dellen-technik-logo.png`,
    telephone: BIZ.phoneTel,
    address: addressLd(),
    geo: { '@type': 'GeoCoordinates', latitude: BIZ.geo.lat, longitude: BIZ.geo.lng },
    ...(GOOGLE_BUSINESS_PROFILE_URL ? { hasMap: GOOGLE_BUSINESS_PROFILE_URL, sameAs: [GOOGLE_BUSINESS_PROFILE_URL] } : {}),
    ...reviewAggregateLd(),
    areaServed,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '17:30',
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '13:00' },
    ],
    description: `${BIZ.tagline}. ${HOURS_NOTE} Adresse: ${ADDRESS_LINE}. ${BIZ.entranceNote}.`,
    parentOrganization: { '@id': ID.org },
  };
}

/** Kompakter Anbieter-Knoten (NAP identisch zur Startseite). */
function providerLd() {
  return {
    '@type': ['AutoBodyShop', 'LocalBusiness'],
    '@id': ID.business,
    name: BIZ.name,
    url: `${SITE_URL}/`,
    telephone: BIZ.phoneTel,
    address: addressLd(),
  };
}

export function serviceLd(s: { name: string; description: string; path: string; type?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.type ?? s.name,
    description: s.description,
    url: absUrl(s.path),
    provider: providerLd(),
    areaServed,
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

/** FAQPage – nur mit Fragen, die auf der Seite sichtbar stehen. */
export function faqLd(faq: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleLd(a: { headline: string; description: string; path: string; published: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    datePublished: a.published,
    dateModified: a.published,
    inLanguage: 'de-DE',
    mainEntityOfPage: absUrl(a.path),
    image: absUrl(OG_IMAGE.url),
    author: { '@id': ID.org },
    publisher: { '@id': ID.org },
  };
}
