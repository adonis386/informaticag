import { useRef } from 'react';
import GSAPReveal from './ui/GSAPReveal';
import TextSplitReveal from './ui/TextSplitReveal';
import { gsap, useGSAP } from '../lib/gsap';

const stats = [
  { value: '50+', label: 'Proyectos entregados' },
  { value: '100%', label: 'Soluciones a medida' },
];

const About = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imageRef.current) return;

      gsap.from(imageRef.current, {
        scale: 1.12,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: imageRef }
  );

  return (
    <section id="nosotros" className="section-padding bg-brand-bg text-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-600 mb-8">Studio</p>
            <TextSplitReveal
              lines={['Pensadores humanos.', 'Creadores digitales.']}
              dark
              className="mb-10"
            />
            <GSAPReveal delay={0.2}>
              <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl font-roboto">
                Estudio de desarrollo de software en Venezuela. Diseñamos y construimos productos
                digitales para empresas que necesitan más que una web — necesitan resultados.
              </p>
            </GSAPReveal>

            <GSAPReveal delay={0.35} className="mt-12 flex gap-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-tektur text-4xl md:text-5xl font-bold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-neutral-600 mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </GSAPReveal>
          </div>

          <div ref={imageRef} className="lg:col-span-5 relative aspect-square overflow-hidden">
            <img
              src="/assets/logo-2.jpeg"
              alt="Informática González"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
