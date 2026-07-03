import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

const items = [
  'Desarrollo Web',
  'Apps Móviles',
  'Integraciones CRM',
  'Sistemas Empresariales',
  'E-commerce',
  'UI/UX Design',
  'Consultoría Tech',
];

const Marquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      gsap.from(trackRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: trackRef.current, start: 'top 95%' },
      });
    },
    { scope: trackRef }
  );

  const content = [...items, ...items];

  return (
    <div className="relative z-10 bg-brand-light">
      <div
        ref={trackRef}
        className="border-y border-neutral-200 bg-neutral-950 py-6 overflow-hidden w-full"
        aria-hidden
      >
        <div className="marquee-track flex whitespace-nowrap w-max">
          {content.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-8 md:mx-12 text-neutral-500 font-tektur text-xl md:text-2xl uppercase tracking-widest hover:text-brand-accent transition-colors"
            >
              {item}
              <span className="mx-8 md:mx-12 text-brand-accent/50">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
