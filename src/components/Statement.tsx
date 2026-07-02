import { useRef } from 'react';
import TextSplitReveal from './ui/TextSplitReveal';
import GSAPReveal from './ui/GSAPReveal';

const Statement = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="section-padding bg-brand-light border-b border-neutral-200">
      <div className="container-wide">
        <TextSplitReveal
          lines={[
            'Ideas audaces.',
            'Código impecable.',
            'Experiencias que importan.',
          ]}
        />
        <GSAPReveal className="mt-12 md:mt-16 max-w-3xl" delay={0.3}>
          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed font-roboto">
            Somos un estudio de desarrollo de software que combina diseño, ingeniería y estrategia
            para crear productos digitales a medida — desde sitios web inmersivos hasta sistemas
            empresariales completos.
          </p>
        </GSAPReveal>
      </div>
    </section>
  );
};

export default Statement;
