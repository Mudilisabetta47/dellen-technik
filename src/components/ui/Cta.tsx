import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { Magnetic } from '@/components/motion/Magnetic';
import { BIZ } from '@/content/site';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  icon?: IconName;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
  cursor?: string;
};

/** Einheitlicher Button-Stil. Interne Ziele als Link, tel:/https: als normales <a>. */
export function Cta({ href, children, variant = 'primary', icon = 'arrow', magnetic = true, className = '', ariaLabel, external, cursor }: Props) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} group ${className}`;
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <Icon name={icon} size={18} className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-1" />
    </>
  );
  const isInternal = href.startsWith('/') || href.startsWith('#');
  const node = isInternal && !external ? (
    <Link href={href} className={cls} aria-label={ariaLabel} data-cursor={cursor}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} aria-label={ariaLabel} data-cursor={cursor} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  );
  return magnetic ? <Magnetic strength={0.22}>{node}</Magnetic> : node;
}

export function PhoneCta({ variant = 'ghost', className = '', label }: { variant?: 'primary' | 'ghost'; className?: string; label?: string }) {
  return (
    <Cta href={`tel:${BIZ.phoneTel}`} variant={variant} icon="phone" className={className} ariaLabel={`Anrufen: ${BIZ.phone}`} cursor="Anrufen">
      {label ?? BIZ.phone}
    </Cta>
  );
}
