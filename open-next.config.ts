import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Die Seite ist vollständig statisch vorgerendert. Die vorgerenderten Seiten werden aus den Worker-Assets
// gelesen (kein KV, kein R2, keine Datenbank nötig). Revalidierung gibt es nicht – Änderungen = neuer Deploy.
const config = {
  ...defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache }),
  // `npm run build` ruft den OpenNext-Build auf; der darf nicht wieder `npm run build` starten (Endlosschleife).
  buildCommand: 'npm run build:next',
};

export default config;
