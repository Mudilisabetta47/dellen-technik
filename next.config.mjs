import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve('.'),
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 65, 70, 72, 75, 78, 80],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920, 2560],
  },
  async redirects() {
    // Alte, öffentlich bekannte URLs der bisherigen Website:
    //   /  /impressum  /datenschutz  – bleiben unverändert erhalten.
    // Die früheren Anker (#leistungen, #warum, #ablauf, #galerie, #ueber, #kontakt)
    // existieren weiterhin auf der Startseite. Für gängige Varianten:
    return [
      { source: '/index.html', destination: '/', statusCode: 301 },
      { source: '/impressum/', destination: '/impressum', statusCode: 301 },
      { source: '/datenschutz/', destination: '/datenschutz', statusCode: 301 },
      { source: '/leistungen/dellen', destination: '/leistungen/dellenbeseitigung', statusCode: 301 },
      { source: '/leistungen/hagelschaden', destination: '/leistungen/hagelschaden-reparatur', statusCode: 301 },
      { source: '/leistungen/beulen', destination: '/leistungen/beulenentfernung', statusCode: 301 },
      { source: '/kontakt/', destination: '/kontakt', statusCode: 301 },
      { source: '/ueber-uns', destination: '/#ueber', statusCode: 301 },
      { source: '/galerie', destination: '/#galerie', statusCode: 301 },
      { source: '/ablauf', destination: '/#ablauf', statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
