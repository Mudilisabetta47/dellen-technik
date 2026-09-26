import Image from 'next/image';
import { ClipImage } from '@/components/motion/ClipImage';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { Tilt } from '@/components/motion/Tilt';

/** „Über uns“ – nur Aussagen, die die bisherige Website bereits getroffen hat. */
export function About() {
  return (
    <section id="ueber" aria-labelledby="ueber-h" className="section relative bg-ink-950">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-6">
          <ClipImage
            src="/images/poliermaschine-fahrzeuglack-werkstatt.jpg"
            alt="Nahaufnahme: Hände führen eine Poliermaschine über dunklen Fahrzeuglack"
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="aspect-[4/5] rounded-[2rem]"
            objectPosition="52% 50%"
            from="left"
          />
          <Reveal direction="scale" delay={0.3} className="absolute -bottom-8 right-4 w-[46%] max-w-[15rem] md:-right-8">
            <Tilt>
              <Image src="/brand/dellen-technik-logo.png" alt="Logo Dellen Technik" width={1364} height={694} className="h-auto w-full drop-shadow-[0_30px_50px_rgba(0,0,0,.7)]" sizes="15rem" />
            </Tilt>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <p className="eyebrow">Über uns</p>
          <h2 id="ueber-h" className="h2 mt-6 max-w-[12ch]">
            <SplitLines lines={['Handwerk', 'mit Anspruch.']} />
          </h2>
          <Reveal delay={0.1} className="prose-dt mt-8 max-w-xl">
            <p>
              Dellen Technik ist Ihr Spezialist für Dellenbeseitigung, Hagelschäden, Beulenentfernung, Smart-Repair und Lackauffrischung. Mit Erfahrung, Präzision und einem hohen Anspruch an Qualität sorgen wir dafür, dass Ihr Fahrzeug wieder gepflegt und hochwertig aussieht.
            </p>
            <p>Unser Fokus liegt auf sauberer Arbeit, ehrlicher Beratung und kundenfreundlichem Service.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
