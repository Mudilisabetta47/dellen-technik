import type { Metadata, Viewport } from 'next';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { SITE_URL } from '@/content/site';

const display = Inter_Tight({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Dellen Technik Lilienthal – Dellenbeseitigung & Smart-Repair', template: '%s | Dellen Technik' },
  description:
    'Dellen Technik in Lilienthal: Dellenbeseitigung, Hagelschaden-Reparatur, Beulenentfernung, Smart-Repair und Lackauffrischung für Bremen, Lilienthal und Osterholz-Scharmbeck.',
  applicationName: 'Dellen Technik',
  formatDetection: { telephone: true, address: true, email: false },
  other: { 'geo.region': 'DE-NI', 'geo.placename': 'Lilienthal', 'geo.position': '53.154033;8.9298011', ICBM: '53.154033, 8.9298011' },
};

export const viewport: Viewport = { themeColor: '#0a0a0b', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
