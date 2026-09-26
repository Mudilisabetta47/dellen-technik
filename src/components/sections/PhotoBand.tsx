import { ClipImage } from '@/components/motion/ClipImage';
import { Reveal } from '@/components/motion/Reveal';

export function PhotoBand({ src, alt, position, caption }: { src: string; alt: string; position: string; caption: string }) {
  return (
    <section className="bg-ink-900 pb-8 md:pb-16">
      <div className="shell">
        <ClipImage src={src} alt={alt} sizes="(min-width: 1440px) 1300px, 94vw" className="aspect-[4/3] rounded-[2rem] md:aspect-[21/9]" objectPosition={position} parallax={60} />
        <Reveal className="mt-4">
          <p className="font-mono text-[.7rem] uppercase tracking-[.2em] text-fg-mute">{caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
