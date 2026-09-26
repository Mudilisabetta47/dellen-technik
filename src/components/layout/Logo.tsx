import Image from 'next/image';
import Link from 'next/link';

/** Das echte Dellen-Technik-Logo (transparent freigestellt). */
export function Logo({ className = '', height = 46 }: { className?: string; height?: number }) {
  return (
    <Link href="/" aria-label="Dellen Technik – Startseite" className={`group inline-flex items-center ${className}`} data-cursor="Start">
      <Image
        src="/brand/dellen-technik-logo.png"
        alt="Dellen Technik"
        width={1364}
        height={694}
        priority
        sizes="120px"
        quality={80}
        style={{ height, width: 'auto' }}
        className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
    </Link>
  );
}
