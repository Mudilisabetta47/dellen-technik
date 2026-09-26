import type { Metadata } from 'next';
import Link from 'next/link';
import { Cta, PhoneCta } from '@/components/ui/Cta';

export const metadata: Metadata = { title: 'Seite nicht gefunden', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink-950 pt-24">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_40%,rgba(255,106,26,.14),transparent_70%)]" />
      <div className="shell relative">
        <p className="eyebrow">Fehler 404</p>
        <h1 className="h1 mt-6 max-w-[12ch]">Diese Seite hat eine Delle.</h1>
        <p className="lead mt-8 max-w-lg">Die gesuchte Seite gibt es nicht (mehr). Gehen Sie zurück zur Startseite – oder rufen Sie uns an.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Cta href="/">Zur Startseite</Cta>
          <PhoneCta />
        </div>
        <p className="mt-10 text-fg-mute">
          Oder direkt zu den <Link href="/leistungen" className="link-u text-fg">Leistungen</Link>.
        </p>
      </div>
    </section>
  );
}
