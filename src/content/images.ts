import type { ServiceImageKey } from './services';

/** Bildzuordnung der Leistungen. panel-* sind gerenderte Standbilder der Dent-Engine, die anderen echte Fotos. */
export const SERVICE_IMAGES: Record<ServiceImageKey, { src: string; position: string }> = {
  dent: { src: '/images/delle-karosserie-lichtreflexion.jpg', position: '60% 50%' },
  hail: { src: '/images/hageldellen-karosserie-lichtreflexion.jpg', position: '50% 50%' },
  large: { src: '/images/beule-karosserie-lichtreflexion.jpg', position: '58% 50%' },
  workshop: { src: '/images/hochglanz-lack-karosserie-detail.jpg', position: '40% 50%' },
  gloss: { src: '/images/glatte-karosserie-hochglanz-lack.jpg', position: '50% 50%' },
  polish: { src: '/images/poliermaschine-fahrzeuglack-werkstatt.jpg', position: '55% 50%' },
};
