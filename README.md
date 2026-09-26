# Dellen Technik – Website (Next.js · React · TypeScript · Tailwind · Framer Motion)

Komplett neu entwickelte Website für **Dellen Technik, Lilienthal** – ohne Lovable, ohne Lovable-Komponenten.
Cinematic-Automotive-Design, scroll-gesteuerte Szenen, ein WebGL-Signature-Effekt („Delle entsteht und wird repariert“)
und eine skalierbare lokale SEO-Architektur.

## Starten

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Produktions-Build
npm run start        # Produktionsserver
npm run lint
npm run typecheck
npm test             # Vitest: Inhalte, NAP, Sitemap, robots, JSON-LD
npm run test:crawl   # nach `npm run build`: startet den Server und crawlt alle Seiten
```

Hosting: Node-Host (z. B. Vercel). Es gibt bewusst **keinen** statischen Export – 301-Weiterleitungen und Header
laufen über `next.config.mjs`.

## Struktur

```
src/
  app/                    Routen (App Router), sitemap.ts, robots.ts, not-found.tsx
  content/                ALLE Inhalte: site.ts (NAP, Zeiten, Ablauf, Fälle), services.ts, regions.ts,
                          guides.ts, legal.ts (Impressum/Datenschutz wörtlich von der alten Seite), images.ts
  lib/seo.ts              Metadata-Builder + JSON-LD (LocalBusiness, Service, Breadcrumb, FAQ, Article, WebSite, Organization)
  components/
    motion/               Motion-System: dent-engine (WebGL), DentCanvas, BeforeAfter, SplitLines, Reveal,
                          ScrollWords, ClipImage, Parallax, Magnetic, Tilt, CustomCursor, SmoothScroll (Lenis)
    sections/             Hero, DentScene (Signature), ServicesGallery, HailStory, Process, WhyStory, …
    layout/               Header, Footer, MobileBar, Logo, Breadcrumbs
tests/                    Vitest
scripts/crawl.mjs         Crawl-/SEO-Test gegen den Produktionsserver
```

**Inhalte ändern:** fast alles steht in `src/content/*`. Neue Leistung/Region/Ratgeber eintragen → Seite, Sitemap,
Footer-Link, interne Verlinkung und Schema entstehen automatisch (`tests/` prüfen Slugs, Querverweise, Titel-Längen).

## Routen

`/` · `/leistungen` · `/leistungen/{dellenbeseitigung, hagelschaden-reparatur, beulenentfernung, smart-repair, lackauffrischung, fahrzeugaufbereitung}`
· Landingpages `/leistungen/{delle-ohne-lackieren-bremen, parkdelle-reparieren}`
· `/einzugsgebiet` · `/einzugsgebiet/{lilienthal, bremen, osterholz-scharmbeck, worpswede, ritterhude, grasberg}`
· Umland `/einzugsgebiet/{landkreis-verden, landkreis-rotenburg, bremer-sueden, schwanewede-lemwerder}`
· `/ratgeber` · `/ratgeber/{15 Artikel}` · `/vorher-nachher` · `/kontakt` · `/impressum` · `/datenschutz`

**SEO-Strategie, Keyword-Cluster, Google-Profil, Search-Console-Checkliste und offene Inhalte: [`docs/SEO.md`](docs/SEO.md).**

Alte öffentliche URLs (`/`, `/impressum`, `/datenschutz`) bleiben unverändert. Die alten Anker (`#leistungen`, `#warum`,
`#ablauf`, `#galerie`, `#ueber`, `#kontakt`) existieren weiter auf der Startseite. Weiterleitungen (301) für gängige
Varianten stehen in `next.config.mjs`.

## Signature-Effekt: „Delle entsteht und wird repariert“

`src/components/motion/dent-engine.ts` rendert eine Karosseriefläche per WebGL (kein Three.js, ~0 KB Abhängigkeit):
Die Fläche ist ein **Höhenfeld**; aus dessen Gefälle entsteht die Normale, an der ein Studiolicht (Softboxen, Lichtstreifen)
gespiegelt wird. Eine Delle verbiegt deshalb die Lichtlinien – genau so erkennt ein Karosseriebauer Dellen. Die Reparatur läuft
in mehreren „Zügen“ zurück, danach folgt ein Highlight-Sweep.

`DentScene.tsx` steuert alles über den Scroll-Fortschritt (Timeline in `dent-timeline.ts`):
0–20 % makellos · 20–40 % Delle entsteht · 40–55 % Analyse-Overlay · 55–70 % Reparatur beginnt · 70–90 % verschwindet Stück
für Stück · 90–100 % Finish – danach zoomt die Kamera heraus, das **echte Vorher/Nachher** erscheint und der Slider wird aktiv.

- **Performance:** React rendert nicht pro Frame; nur Uniforms werden geschrieben, rAF-koalesziert. Der Canvas wird erst
  in Viewport-Nähe erzeugt und beim Verlassen freigegeben (nie mehrere Kontexte parallel). Auflösung gedeckelt.
- **Mobile:** kürzere Scrollstrecke (`390svh` statt `580svh`), Renderauflösung 0,62×, kein Zeigerlicht, keine Callouts.
- **Reduced Motion:** kein Pinning, zwei Standbilder (Schaden / repariert) + statischer Vorher/Nachher-Regler.
- **Ohne WebGL:** ruhiger dunkler Verlauf, Text und CTAs bleiben voll nutzbar.
- Dieselbe Engine liefert die gerenderten Standbilder `public/images/panel-*.jpg` und die Hagel-Story (viele kleine Dellen).

## SEO

Individuelle Title/Description/H1/OG-Texte je Seite (Tests erzwingen Eindeutigkeit und Längen), Canonical, OpenGraph,
Twitter Cards, `sitemap.xml` und `robots.txt` (dynamisch aus den Inhalten), JSON-LD nur passend zum sichtbaren Inhalt:
`WebSite`/`Organization`/`AutoBodyShop` (Start), `Service` + `BreadcrumbList` + `FAQPage` (Leistungen, Regionen),
`Article` (Ratgeber). Impressum/Datenschutz sind `noindex` und nicht in der Sitemap.

## Nicht erfunden

Keine Zertifikate, Auszeichnungen, Mitarbeiter, Bewertungen oder Preise. Aussagen stammen von der bisherigen Website;
Ratgeber und Leistungstexte erklären allgemein und nennen bewusst keine Preise (`tests/content.test.ts` sperrt Begriffe wie
„zertifiziert“, „Testsieger“, „€“).

## Offene Punkte – bitte vor Livegang prüfen

Siehe `docs/SEO.md` (Abschnitte 10–14): Google-Profil-URL eintragen, Umland-Einzugsgebiet bestätigen, echte Bewertungen, hochauflösende Vorher/Nachher-Originale, echte Fahrzeugfotos, fachliche Freigabe der Ratgeber, Datenschutz-Hosting-Angabe.
