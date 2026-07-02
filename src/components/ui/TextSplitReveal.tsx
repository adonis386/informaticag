import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

interface TextSplitRevealProps {
  lines: string[];
  className?: string;
  dark?: boolean;
}

const TextSplitReveal = ({ lines, className = '', dark = false }: TextSplitRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const lineEls = ref.current.querySelectorAll('.split-line');

      gsap.from(lineEls, {
        y: '110%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {lines.map((line) => (
        <div key={line} className="overflow-hidden">
          <span
            className={`split-line block font-tektur text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight ${
              dark ? 'text-white' : 'text-neutral-950'
            }`}
          >
            {line}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TextSplitReveal;
