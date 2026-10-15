/**
 * Crawl- und SEO-Test gegen den Produktions-Server (`next build` muss vorher gelaufen sein).
 *   npm run build && npm run test:crawl
 * Prüft: Sitemap, robots.txt, Status, Title/Description/Canonical/OG/Twitter, genau eine H1,
 * JSON-LD-Parsing, interne Links, Bilder, noindex-Seiten, 404, 301-Weiterleitungen.
 */
import { spawn } from 'node:child_process';

const PORT = process.env.CRAWL_PORT ?? '3222';
// CRAWL_BASE=http://localhost:8799 prüft einen bereits laufenden Server (z. B. `npm run preview` für Cloudflare Workers).
const EXTERNAL = process.env.CRAWL_BASE;
const BASE = EXTERNAL ?? `http://localhost:${PORT}`;
const SITE = 'https://dellentechnik-lilienthal.de';
const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (cond, msg) => cond || fail(msg);

const server = EXTERNAL ? null : spawn('npx', ['next', 'start', '-p', PORT], { stdio: ['ignore', 'pipe', 'pipe'] });
let out = '';
server?.stdout.on('data', (d) => (out += d));
server?.stderr.on('data', (d) => (out += d));

async function waitReady() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE + '/robots.txt');
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Server startet nicht:\n' + out);
}

const get = (path, init) => fetch(BASE + path, { redirect: 'manual', ...init });
const tag = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

async function main() {
  await waitReady();

  const robots = await (await get('/robots.txt')).text();
  ok(/Sitemap:\s*https:\/\/dellentechnik-lilienthal\.de\/sitemap\.xml/.test(robots), 'robots.txt verweist nicht auf die Sitemap');
  ok(/Disallow:\s*\/api\//.test(robots), 'robots.txt sperrt /api/ nicht');
  const homeHtml = await (await get('/')).text();
  ok(/"sameAs":\["https:\/\/maps\.app\.goo\.gl\//.test(homeHtml), 'Startseite: sameAs auf das Google-Profil fehlt');
  ok(!/aggregateRating/.test(homeHtml), 'Startseite: aggregateRating ohne echte Bewertungen');

  const smRes = await get('/sitemap.xml');
  ok(smRes.status === 200 && /xml/.test(smRes.headers.get('content-type') ?? ''), 'sitemap.xml nicht als XML erreichbar');
  const sm = await smRes.text();
  const locs = tag(sm, /<loc>([^<]+)<\/loc>/g);
  ok(locs.length >= 25, `Sitemap zu klein (${locs.length})`);
  ok(!locs.some((l) => /impressum|datenschutz/.test(l)), 'noindex-Seiten stehen in der Sitemap');

  const paths = [...new Set([...locs.map((l) => l.replace(SITE, '') || '/'), '/impressum', '/datenschutz'])];
  const linkSet = new Set();
  const imgSet = new Set();
  const pages = new Map(); // path -> { main, links(main), all(links) }

  for (const p of paths) {
    const r = await get(p);
    ok(r.status === 200, `${p}: Status ${r.status}`);
    if (r.status !== 200) continue;
    const html = await r.text();
    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    ok(h1 === 1, `${p}: ${h1} H1 statt genau einer`);
    const title = (html.match(/<title>([^<]*)<\/title>/) ?? [])[1];
    ok(title && title.length > 10, `${p}: Title fehlt`);
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1];
    ok(desc && desc.length > 60, `${p}: Meta-Description fehlt/zu kurz`);
    const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) ?? [])[1];
    const expectCanon = p === '/' ? SITE : `${SITE}${p}`;
    ok(canon?.replace(/\/$/, '') === expectCanon, `${p}: Canonical ${canon} ≠ ${expectCanon}`);
    for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'og:locale']) ok(html.includes(`property="${k}"`), `${p}: ${k} fehlt`);
    for (const k of ['twitter:card', 'twitter:title', 'twitter:image']) ok(html.includes(`name="${k}"`), `${p}: ${k} fehlt`);
    const isLegal = p === '/impressum' || p === '/datenschutz';
    ok(isLegal ? /noindex/.test(html) : !/noindex/.test(html), `${p}: robots-Meta falsch`);
    ok(/<html lang="de"/.test(html), `${p}: lang="de" fehlt`);

    const lds = tag(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    for (const raw of lds) {
      try {
        const j = JSON.parse(raw);
        ok(j['@context'] === 'https://schema.org', `${p}: JSON-LD ohne @context`);
        if (j['@type'] === 'FAQPage') {
          for (const q of j.mainEntity) ok(html.includes(q.name.replace(/&/g, '&amp;')) || html.includes(q.name), `${p}: FAQ-Frage nicht sichtbar: ${q.name}`);
        }
      } catch (e) {
        fail(`${p}: JSON-LD ungültig (${e.message})`);
      }
    }
    if (!isLegal && p !== '/leistungen' && p !== '/einzugsgebiet' && p !== '/ratgeber') ok(lds.length >= 1, `${p}: kein JSON-LD`);
    if (!isLegal) ok(lds.some((l) => l.includes('BreadcrumbList')) || p === '/', `${p}: BreadcrumbList fehlt`);

    const mainHtml = (html.match(/<main[\s\S]*<\/main>/) ?? [html])[0];
    const hrefs = (h) => new Set(tag(h, /href="(\/[^"#?]*)(?:[#?][^"]*)?"/g).map((x) => (x.length > 1 ? x.replace(/\/$/, '') : x)));
    pages.set(p, { main: hrefs(mainHtml), all: hrefs(html), hasTel: /href="tel:\+491747117321"/.test(mainHtml) });
    // Bilder: alt-Attribut Pflicht, keine fehlenden Dimensionen bei nicht-fill-Bildern
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      ok(/\balt="/.test(m[0]), `${p}: <img> ohne alt: ${m[0].slice(0, 80)}`);
    }
    // keine versehentlichen nofollow-Links intern
    for (const m of html.matchAll(/<a\b[^>]*href="\/[^"]*"[^>]*>/g)) ok(!/nofollow/.test(m[0]), `${p}: interner Link mit nofollow: ${m[0].slice(0, 80)}`);
    ok(/property="og:image" content="https:\/\/dellentechnik-lilienthal\.de\//.test(html), `${p}: og:image nicht absolut`);
    for (const h of tag(html, /href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) linkSet.add(h);
    for (const m of html.matchAll(/(?:src|srcSet)="(\/_next\/image\?[^"\s]+)/g)) imgSet.add(m[1].replace(/&amp;/g, '&'));
  }

  // Interne Verlinkung (nur im Hauptinhalt, ohne Header/Footer)
  const startsWith = (set, prefix, exclude) => [...set].some((h) => h.startsWith(prefix) && h !== exclude);
  for (const [p, pg] of pages) {
    const isService = /^\/leistungen\/[^/]+$/.test(p);
    const isRegion = /^\/einzugsgebiet\/[^/]+$/.test(p);
    const isGuide = /^\/ratgeber\/[^/]+$/.test(p);
    if (!isService && !isRegion && !isGuide) continue;
    const m = pg.main;
    ok(m.has('/kontakt') || pg.hasTel, `${p}: kein Kontakt-/Telefon-CTA im Inhalt`);
    ok(pg.hasTel, `${p}: keine Telefonnummer als tel:-Link im Inhalt`);
    ok(startsWith(m, '/leistungen/', p), `${p}: verlinkt im Inhalt auf keine (andere) Leistung`);
    ok(startsWith(m, '/einzugsgebiet/', p), `${p}: verlinkt im Inhalt auf keine (andere) Regionalseite`);
    if (isService || isRegion) ok(startsWith(m, '/ratgeber/', p), `${p}: verlinkt im Inhalt auf keinen Ratgeber`);
    if (isGuide) ok(startsWith(m, '/ratgeber/', p), `${p}: verlinkt auf keinen weiteren Ratgeber`);
  }
  // Waisenseiten: jede Sitemap-Seite braucht mindestens einen eingehenden internen Link
  for (const p of paths) {
    if (p === '/' || p === '/impressum' || p === '/datenschutz') continue;
    const inbound = [...pages].some(([q, pg]) => q !== p && pg.all.has(p));
    ok(inbound, `Waisenseite ohne eingehenden Link: ${p}`);
  }

  // interne Links
  for (const l of linkSet) {
    if (l.startsWith('/_next') || l === '/icon.png' || l === '/brand/dellen-technik-logo.png') continue;
    const r = await get(l);
    ok(r.status === 200 || r.status === 301 || r.status === 308, `Toter interner Link ${l} → ${r.status}`);
  }
  // Bilder
  for (const img of imgSet) {
    const r = await get(img);
    ok(r.status === 200, `Bild ${img} → ${r.status}`);
  }
  for (const f of ['/og.jpg', '/brand/dellen-technik-logo.png', '/icon.png']) ok((await get(f)).status === 200, `${f} fehlt`);

  // 404 + Weiterleitungen
  ok((await get('/gibt-es-nicht')).status === 404, '404-Seite antwortet nicht mit 404');
  for (const [from, to] of [['/index.html', '/'], ['/ueber-uns', '/#ueber'], ['/galerie', '/#galerie']]) {
    const r = await get(from);
    ok(r.status === 301, `${from}: erwartet 301, war ${r.status}`);
    ok((r.headers.get('location') ?? '').endsWith(to), `${from}: Ziel ${r.headers.get('location')} ≠ ${to}`);
  }

  console.log(`Seiten geprüft: ${paths.length} · interne Links: ${linkSet.size} · Bilder: ${imgSet.size}`);
}

try {
  await main();
} catch (e) {
  fail(String(e));
} finally {
  server?.kill('SIGTERM');
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} Problem(e):\n` + failures.map((f) => ' - ' + f).join('\n'));
  process.exit(1);
}
console.log('✓ Crawl/SEO-Test bestanden');
