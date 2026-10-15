import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Die Seite ist vollständig statisch vorgerendert. Die vorgerenderten Seiten werden aus den Worker-Assets
// gelesen (kein KV, kein R2, keine Datenbank nötig). Revalidierung gibt es nicht – Änderungen = neuer Deploy.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
