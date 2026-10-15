# SEO-Dokumentation – Dellen Technik Lilienthal

Stand: 26.09.2026 · Domain: `https://dellentechnik-lilienthal.de` · Framework: Next.js (App Router, statisch generiert)

**Leitgedanke:** nicht „mehr Seiten“, sondern mehr *relevante Suchintentionen* mit je einer eigenständigen, hilfreichen Seite –
und von jeder Seite ein klarer Weg zur Anfrage (Telefon **0174 71 17 321**, Termin/WhatsApp).

**Nicht erfunden:** keine Preise, Zeitangaben, Erfahrungswerte, Bewertungen, Zertifikate oder Leistungsversprechen. Wo Daten fehlen,
verweisen die Texte auf die kostenlose Ersteinschätzung vor Ort. `tests/content.test.ts` sperrt entsprechende Begriffe und Zahlenformate.

---

## 1. Keyword-Cluster und Ziel-URLs

| Cluster | Haupt-URL (Pillar/Landing) | Suchintention | Beispiel-Keywords |
|---|---|---|---|
| **Dellenbeseitigung** (Pillar) | `/leistungen/dellenbeseitigung` | Leistung finden / beauftragen | Dellenbeseitigung, Dellenentfernung, Dellen reparieren, Dellenreparatur, Autodelle reparieren, Karosserie Delle |
| Lackschonend + Bremen | `/leistungen/delle-ohne-lackieren-bremen` | lokal + transaktional | Delle ohne Lackieren Bremen, Delle entfernen ohne Lackieren Bremen, Parkdelle ohne Lackieren Bremen, Beule ohne Lackieren Bremen |
| Parkdelle | `/leistungen/parkdelle-reparieren` | „Was tun / wer macht das?“ | Parkdelle reparieren (lassen), Türkante Delle, Parkschaden Delle |
| Beulen | `/leistungen/beulenentfernung` | Leistung | Beulen entfernen, Beulenreparatur, Beule Auto reparieren |
| Hagel | `/leistungen/hagelschaden-reparatur` | Leistung + Notfall | Hagelschaden Reparatur, Hagelschaden Auto, Hagelschaden Bremen |
| Smart Repair | `/leistungen/smart-repair` | Leistung | Smart Repair, Smart Repair Auto, Smart Repair Lilienthal/Bremen |
| Lack / Aufbereitung | `/leistungen/lackauffrischung`, `/leistungen/fahrzeugaufbereitung` | Leistung | Lackauffrischung, Fahrzeugaufbereitung |
| Informativ (Ratgeber) | `/ratgeber/*` (15 Artikel) | Fragen vor der Entscheidung | siehe Abschnitt 5 |
| Lokal | `/einzugsgebiet/*` (10 Seiten) | Ort + Leistung | Dellenreparatur Bremen, Hagelschaden Bremen, Smart Repair Lilienthal … |

### Bewusst NICHT als eigene Seiten angelegt (Duplicate-Risiko)

| Vorgeschlagene URL | Entscheidung | Abgedeckt durch |
|---|---|---|
| `/leistungen/beule-auto-reparieren` | nein | `/leistungen/beulenentfernung` (+ FAQ „Beulenreparatur oder Beulenentfernung?“) und Ratgeber `beule-im-auto-entfernen` |
| `/leistungen/delle-auto-reparieren` | nein | Pillar `/leistungen/dellenbeseitigung` (+ FAQ „Dellenbeseitigung, Dellenentfernung, Dellenreparatur?“) |
| `/leistungen/hagelschaden-auto-reparieren` | nein | `/leistungen/hagelschaden-reparatur` + Ratgeber „Hagelschaden am Auto – was jetzt?“ / „Was kostet eine Hagelschaden-Reparatur?“ |
| `/leistungen/smart-repair-auto` | nein | `/leistungen/smart-repair` + Ratgeber „Was ist Smart Repair?“ |
| `/leistungen/dellenreparatur-ohne-lackieren` | nein | `/leistungen/delle-ohne-lackieren-bremen` + Ratgeber `delle-ohne-lackieren-entfernen` (zwei Seiten mit derselben Intention würden sich kannibalisieren) |

Neue Landingpages nur, wenn (a) eine eigene Suchintention besteht, (b) es individuellen Inhalt gibt, der nicht schon auf der Hauptseite steht.

---

## 2. Seitenstruktur (39 Seiten in der Sitemap, dazu Impressum/Datenschutz/404)

```
/                                   Startseite (Signature-Szene, Leistungen, Ergebnisse, Hagel, Ablauf, Region, FAQ, Ratgeber)
/leistungen                         Hub
/leistungen/<6 Leistungen>          Hauptleistungen (Pillar/Cluster)
/leistungen/delle-ohne-lackieren-bremen
/leistungen/parkdelle-reparieren
/einzugsgebiet                      Hub mit Karte
/einzugsgebiet/<6 Kernorte>         lilienthal, bremen, osterholz-scharmbeck, worpswede, ritterhude, grasberg
/einzugsgebiet/<4 Umland-Seiten>    landkreis-verden, landkreis-rotenburg, bremer-sueden, schwanewede-lemwerder
/ratgeber                           Hub
/ratgeber/<15 Artikel>
/vorher-nachher                     Fallbeispiele (3 echte Fälle)
/kontakt                            Anfrage (WhatsApp-Vorbereitung) + Standort
/impressum, /datenschutz            noindex, nicht in der Sitemap
```

## 3. Ortsseiten

**Kerngebiet (laut bisheriger Website bestätigt):** Lilienthal, Bremen, Osterholz-Scharmbeck, Worpswede, Ritterhude, Grasberg (inkl. Tarmstedt) –
jeweils eigener Text, eigene FAQ, Kartenpunkt. Nur diese stehen im `areaServed` des Schema-Markups.

**Umland (Sammelseiten je Landkreis/Richtung statt 13 Einzelseiten):**

| Seite | Orte | Warum gebündelt |
|---|---|---|
| `landkreis-verden` | Achim, Oyten, Ottersberg, Verden | gleicher Landkreis, gleiche Anfahrtslogik |
| `landkreis-rotenburg` | Tarmstedt, Rotenburg (Wümme), Zeven | gleicher Landkreis; Tarmstedt bereits auf der alten Seite genannt |
| `bremer-sueden` | Delmenhorst, Stuhr, Weyhe, Syke | Süden/Südwesten von Bremen, Anfahrt durch/um die Stadt |
| `schwanewede-lemwerder` | Schwanewede (LK Osterholz), Lemwerder | Unterweser-Richtung |

Diese Seiten sagen **nicht**, dass dort „regelmäßig betreut“ wird (Ausnahme Schwanewede: liegt im Landkreis Osterholz, den die alte Seite ausdrücklich nennt).
Sie laden zur Anfrage ein und raten zum Vorgespräch. `tests/content.test.ts` prüft das.

> **Vor Livegang mit dem Betrieb bestätigen:** Fahren Kunden aus diesen Gegenden tatsächlich zu Dellen Technik? Wenn nein →
> `NEXT_PUBLIC_ENABLE_UMLAND_PAGES=false` (oder `ENABLE_UMLAND_PAGES` in `src/content/site.ts`): Seiten, Sitemap-Einträge und Links verschwinden.
> Später pro Ort ausbauen, sobald echte Anfragen/Fälle vorliegen.

**Themencluster Leistung × Region** (statt automatischer Leistung × Ort-Matrix):
Dellenbeseitigung → Bremen, Lilienthal, Osterholz-Scharmbeck, Worpswede · Hagelschaden → Bremen, Osterholz-Scharmbeck, Worpswede ·
Smart Repair → Lilienthal, Bremen, Ritterhude · Beulen → Grasberg, Bremen · Lack → Ritterhude, Osterholz-Scharmbeck.
(Umgesetzt über `regions`/`services` in `src/content/*` und die Verlinkung der Vorlagen.)

## 4. Leistungsseiten und Landingpages

Alle Leistungsseiten: Hero → Problem → Lösung → Story-Block (Signature-Szene / Hagel-Story / Smart-Repair-Liste / Bildband) → Ablauf →
Vorher/Nachher → Vorteile → **Themenübersicht (Cluster)** → FAQ → Bewertungen (falls echte vorhanden) → Verwandtes → CTA → Standort.

Landingpages (`src/content/landings.ts`, Bausteine: Problem · Voraussetzungen „gut/Grenzen“ · Signature-Szene · Schadenarten/Vorteile · Ablauf · Fall · Region · FAQ).
Die Bremen-Seite behauptet ausdrücklich **nicht**, jede Delle sei ohne Lackieren reparierbar (Test prüft: „nicht jede Delle …“).

## 5. Ratgeber (15) – Suchintention und Pillar

| Slug | Intention | Pillar |
|---|---|---|
| `was-kostet-eine-dellenreparatur` | Kosten | Dellenbeseitigung |
| `delle-im-auto-was-tun` | akut: was jetzt? | Dellenbeseitigung |
| `delle-ohne-lackieren-entfernen` | Methode | Dellenbeseitigung |
| `welche-dellen-lassen-sich-ohne-lackieren-reparieren` | Checkliste/Kriterien | Dellenbeseitigung |
| `delle-nach-parkrempler-was-tun` | Verursacher/Versicherung | Dellenbeseitigung |
| `delle-vor-leasingrueckgabe-reparieren` | Leasing | Dellenbeseitigung |
| `dellen-vor-fahrzeugverkauf-reparieren` | Verkauf (inkl. Hagel) | Dellenbeseitigung |
| `wie-lange-dauert-eine-dellenreparatur` | Dauer | Dellenbeseitigung |
| `kann-eine-delle-unsichtbar-repariert-werden` | Erwartung/Ergebnis | Dellenbeseitigung |
| `ablauf-dellenreparatur` | Ablauf | Dellenbeseitigung |
| `was-kostet-eine-hagelschaden-reparatur` | Kosten Hagel | Hagelschaden-Reparatur |
| `hagelschaden-am-auto-was-jetzt` | akut Hagel | Hagelschaden-Reparatur |
| `was-ist-smart-repair` | Begriff/Methode | Smart-Repair |
| `was-kostet-ein-kleiner-parkschaden` | Kosten klein | Smart-Repair |
| `beule-im-auto-entfernen` | Beule | Beulenentfernung |

Die geforderten 13 Themen sind abgedeckt; „Parkdelle reparieren lassen“ ist die Landingpage `/leistungen/parkdelle-reparieren` (statt eines
zweiten, fast identischen Ratgebers). Jeder Artikel: klare Intention (`intent` im Datensatz), Einleitung, H2/H3, Beispiele, echtes
Vorher/Nachher-Bild (wo passend), FAQ (mit FAQPage-Markup), Rückverlinkung zur Hauptleistung, Regionen, CTA.
Keine Preise/Zeiten – Tests erkennen Zahlen mit €/Euro/Stunden/Tage/Minuten.

## 6. Interne Verlinkung

Regeln (automatisch geprüft in `npm run test:crawl`, nur im Hauptinhalt – Header/Footer zählen nicht):
- Leistung/Landing: → andere Leistung, → Regionalseite, → Ratgeber, → Kontakt/Telefon
- Region: → Leistung, → Ratgeber, → andere Region, → Kontakt
- Ratgeber: → Hauptleistung (Pillar), → Regionalseite, → weiterer Ratgeber, → Kontakt
- **Cluster:** Pillar `dellenbeseitigung` listet alle Landingpages + Ratgeber („Themenübersicht“); jeder Ratgeber verlinkt zurück (Box „Hauptleistung“).
- **Keine Waisenseiten:** jede Sitemap-Seite hat mindestens einen eingehenden Link.
- Keine `nofollow`-Links intern.

## 7. Fallbeispiele (Vorher/Nachher als SEO-Inhalt)

`/vorher-nachher`: drei echte Fälle mit Bauteil, Schaden, Ausgangslage, Vorgehen, Ergebnis. **Nur, was das Bild bzw. die bisherige Website belegt**
(z. B. „Ausbeulen ohne Lackieren“ beim Radlauf). Keine Fahrzeugmodelle, Dauer, Kosten. Mehr Details erst, wenn der Betrieb sie liefert.

## 8. Bilder-SEO

- Beschreibende Dateinamen (`delle-radlauf-ausbeulen-ohne-lackieren-vorher.jpg`, `poliermaschine-fahrzeuglack-werkstatt.jpg`, `dellen-technik-logo.png` …)
- Alt-Texte natürlich und beschreibend (Fälle: „Vorher/Nachher: Delle …“); dekorative Bilder `alt=""`. Crawl-Test: kein `<img>` ohne alt-Attribut.
- `next/image`: responsive `srcset`/`sizes`, AVIF/WebP, Lazy Loading (nur das Hero-Bild `priority`), feste Seitenverhältnisse → keine Layout Shifts
- OpenGraph: `/og.jpg` (1200×630), absolute URL auf jeder Seite
- **Offen:** hochauflösende Original-Vorher/Nachher-Bilder (die vorhandenen sind 300–900 px breit)

## 9. Technische SEO

| Bereich | Umsetzung |
|---|---|
| Sitemap | `src/app/sitemap.ts` (dynamisch aus Inhalten): Start, Hubs, Leistungen, Landings, Regionen, Ratgeber, Vorher/Nachher, Kontakt |
| Robots | `src/app/robots.ts`: `Allow: /`, `Disallow: /api/`, Sitemap-Verweis |
| Canonical | je Seite über `buildMetadata` (Crawl-Test: self-canonical) |
| Index/Noindex | Impressum & Datenschutz `noindex,follow`; alles andere indexierbar |
| Titel/Description/H1/OG | je Seite individuell (Test erzwingt Eindeutigkeit und Länge) |
| Schema | WebSite, Organization, AutoBodyShop/LocalBusiness (Start, Kontakt), Service + BreadcrumbList + FAQPage (Leistungen, Landings, Regionen), Article + FAQPage (Ratgeber). FAQPage nur für sichtbare FAQ. `sameAs`/`hasMap` nur mit echter Profil-URL. `aggregateRating` nur mit echten Bewertungen. |
| Redirects | 301 in `next.config.mjs` (alte Varianten: `/index.html`, `/ueber-uns`, `/galerie`, `/ablauf` …); alte öffentliche URLs `/`, `/impressum`, `/datenschutz` unverändert |
| NAP | zentral in `src/content/site.ts`; Test prüft Telefonformat („0174 71 17 321“), Straße („Falkenberger Landstraße 77“), Markenschreibung („Dellen Technik“) im gesamten Inhalt |
| Performance | React rendert Motion nicht pro Frame; WebGL nur im Viewport; Mobile-Varianten; `prefers-reduced-motion` |

## 10. Google-Unternehmensprofil (GBP)

**Status: verknüpft.** Profil „DellenTechnik Lilienthal“, Kurzlink `https://maps.app.goo.gl/2mEA8NCjBuqtmzBo9` (geprüft: führt auf die Maps-Place-Seite).
Der Pin des Profils (53.154033 / 8.9298011) ersetzt die frühere Näherung der alten Website (53.1372 / 8.9039) – Schema, Route-Link und Geo-Meta nutzen ihn.
Frühere Links (`share.google/…`) führten auf eine Suche und wurden nicht verwendet.

So einbinden:
1. Google Maps → Profil aufrufen → „Teilen“ → Link kopieren (z. B. `https://maps.app.goo.gl/…` oder `https://www.google.com/maps/place/…`).
2. In `src/content/site.ts` (`GBP_RAW`) bzw. als Umgebungsvariable `NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL` setzen.
3. Die URL wird validiert (`isValidGbpUrl`, Test vorhanden): Suchlinks/`share.google` werden abgelehnt.

Dann passiert automatisch: `sameAs` (Organization + LocalBusiness), `hasMap` sowie ein Link „Bei Google Maps ansehen“ im Standortbereich und Footer.

**Namensschreibweise:** Das Profil heißt „DellenTechnik Lilienthal“ (ein Wort). Im Schema steht `alternateName: DellenTechnik`. Name/Adresse/Telefon müssen im Profil, auf der Website und in Verzeichnissen **identisch** sein
(Website: „Dellen Technik“, Falkenberger Landstraße 77, 28865 Lilienthal, 0174 71 17 321, Mo–Fr 08:30–17:30, Sa 10:00–13:00).

## 11. Kundenbewertungen

`src/content/reviews.ts` ist leer – **keine erfundenen Bewertungen**. Der Bereich `Reviews` rendert nichts, solange keine echten Bewertungstexte vorliegen (das Profil ist im Standortbereich verlinkt). Mit echten Bewertungen: Originaltexte; Sterne/Anzahl **nur** wenn `REVIEW_AGGREGATE` mit echten Werten gepflegt ist (dann auch `aggregateRating`-Markup).

## 12. Nach Livegang durchführen (Search Console)

- [ ] Domain in der **Google Search Console** verifizieren (Domain-Property, DNS-TXT)
- [ ] `https://dellentechnik-lilienthal.de/sitemap.xml` einreichen
- [ ] Indexierung wichtiger Seiten prüfen (URL-Prüfung): Start, `/leistungen/dellenbeseitigung`, `/leistungen/delle-ohne-lackieren-bremen`, `/einzugsgebiet/bremen`, ein Ratgeber
- [ ] Alte URLs `/`, `/impressum`, `/datenschutz` in der Abdeckung prüfen (Impressum/Datenschutz bleiben bewusst `noindex`)
- [ ] „Seiten mit Weiterleitung“ und 404 beobachten; Core Web Vitals (Feld-Daten) nach 28 Tagen
- [ ] Nach ca. 4–8 Wochen **Leistung** auswerten: echte Suchanfragen, Impressionen, Klicks, Positionen je Cluster → Inhalte gezielt ausbauen (nicht raten)
- [ ] Bing Webmaster Tools (optional, gleiche Sitemap)
- [ ] Google-Unternehmensprofil mit der Website verknüpfen (Website-URL im Profil = `https://dellentechnik-lilienthal.de/`)

## 13. Off-Page-Maßnahmen (nicht im Code)

- Unternehmensprofil vollständig pflegen: Kategorien (z. B. Karosseriebetrieb/Autoreparatur), Leistungen, Öffnungszeiten, Fotos, Fragen & Antworten
- Regelmäßig **echte** Bewertungen erbitten (Link im Profil → „Rezensionen“), auf jede Bewertung antworten
- Einträge in Branchenverzeichnissen/regionalen Portalen mit identischen NAP-Daten
- Lokale Verlinkungen: Vereine, Autohäuser/Partnerbetriebe, Gemeinde-/Gewerbeseiten (Lilienthal, Osterholz)
- Eigene Fotos: Werkstatt, Vorher/Nachher in hoher Auflösung (mit Einverständnis der Kunden), am besten regelmäßig neue Fälle

## 14. Offene Inhalte (Backlog)

1. Hochauflösende Vorher/Nachher-Bilder + weitere echte Fälle (jeweils mit Bauteil, Schaden, Vorgehen, Ergebnis)
2. Echte Fahrzeug-/Werkstattfotos (aktuell: 2 Fotos + gerenderte Lichtreflexions-Bilder)
3. Echte Bewertungen (siehe 11) und Google-Profil-URL (siehe 10)
4. Vom Betrieb: reale Erfahrungswerte (typische Dauer, Verfahren, Fahrzeugtypen) → in Ratgeber einarbeiten; **Preise nur, wenn der Betrieb sie freigibt**
5. Bestätigung des Umland-Einzugsgebiets (siehe 3) und ggf. Einzelseiten für Orte mit echten Anfragen
6. Weitere Ratgeber-Ideen, sobald Search-Console-Daten vorliegen: „Dellen an Aluminium“, „Delle an der Türkante“, „Steinschlag vs. Delle“ – nur bei belegbarem Nutzen

## 15. Prüfen vor Livegang

```bash
npm run build:next && npm run lint && npm run typecheck && npm test && npm run test:crawl
```
`test:crawl` startet den Produktionsserver und prüft: Status aller Sitemap-URLs, Canonicals, Title/Description/OG/Twitter, genau eine H1, JSON-LD, interne Verlinkung im Hauptinhalt,
Waisenseiten, `nofollow`, Bilder (alt, Erreichbarkeit), 404, 301-Weiterleitungen, robots.txt.
