import { ReactNode, useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

interface GSAPRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

const GSAPReveal = ({
  children,
  className = '',
  delay = 0,
  y = 60,
  duration = 1,
}: GSAPRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default GSAPReveal;
