'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Logo } from './Logo';
import { BIZ, NAV } from '@/content/site';
import { SERVICES } from '@/content/services';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    setMenu(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        setMega(false);
      }
    };
    window.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('keydown', esc);
      document.documentElement.style.overflow = '';
    };
  }, [menu]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMega(false), 160);
  };

  return (
    <>
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-ink-900">
        Zum Inhalt springen
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background,backdrop-filter,border-color] duration-500 ease-out ${
          scrolled || menu ? 'border-b border-white/[.08] bg-ink-900/75 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const isServices = item.href === '/leistungen';
              const active = pathname === item.href || (!item.href.includes('#') && pathname.startsWith(item.href));
              if (isServices) {
                return (
                  <div key={item.href} className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                    <Link
                      href={item.href}
                      aria-haspopup="true"
                      aria-expanded={mega}
                      onFocus={openMega}
                      className={`link-u flex items-center gap-1.5 rounded-full px-4 py-2 text-[.92rem] transition-colors ${active ? 'text-brand' : 'text-fg-dim hover:text-fg'}`}
                    >
                      {item.label}
                      <Icon name="chevron" size={14} className={`transition-transform duration-500 ease-out ${mega ? 'rotate-180' : ''}`} />
                    </Link>
                    <AnimatePresence>
                      {mega && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, clipPath: 'inset(0 0 100% 0)' }}
                          animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                          exit={{ opacity: 0, y: 6, clipPath: 'inset(0 0 100% 0)' }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 top-full w-[38rem] -translate-x-1/2 pt-3"
                          onMouseEnter={openMega}
                          onMouseLeave={closeMega}
                        >
                          <div className="grid grid-cols-2 gap-1 rounded-3xl border border-white/10 bg-ink-800/95 p-3 shadow-2xl backdrop-blur-xl">
                            {SERVICES.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/leistungen/${s.slug}`}
                                onBlur={(e) => {
                                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setMega(false);
                                }}
                                className="group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-white/[.05]"
                              >
                                <span className="font-mono text-[.7rem] text-brand">{s.n}</span>
                                <span>
                                  <span className="block font-medium text-fg">{s.title}</span>
                                  <span className="mt-1 block text-[.82rem] leading-snug text-fg-mute">{s.kicker}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-u rounded-full px-4 py-2 text-[.92rem] transition-colors ${active ? 'text-brand' : 'text-fg-dim hover:text-fg'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BIZ.phoneTel}`}
              data-cursor="Anrufen"
              className="hidden items-center gap-2.5 rounded-full bg-brand px-5 py-2.5 text-[.92rem] font-medium text-ink-900 transition-colors duration-500 hover:bg-[#ff7f38] sm:inline-flex"
            >
              <Icon name="phone" size={16} />
              {BIZ.phone}
            </a>
            <button
              type="button"
              aria-label={menu ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-fg lg:hidden"
            >
              <Icon name={menu ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-ink-950 px-[var(--shell-pad)] pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={item.href} onClick={() => setMenu(false)} className="flex items-baseline gap-4 border-b border-white/10 py-4 text-[2rem] font-medium tracking-tight text-fg">
                    <span className="font-mono text-xs text-brand">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pt-10">
              <p className="eyebrow-mute">Werkstatt Lilienthal</p>
              <p className="mt-3 text-fg-dim">
                {BIZ.street}
                <br />
                {BIZ.zip} {BIZ.city}
              </p>
              <p className="mt-1 text-[.9rem] text-brand">{BIZ.entranceNote}</p>
              <a href={`tel:${BIZ.phoneTel}`} className="mt-6 flex items-center justify-center gap-3 rounded-full bg-brand py-4 text-lg font-medium text-ink-900">
                <Icon name="phone" size={20} /> {BIZ.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
