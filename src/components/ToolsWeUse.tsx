import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { techTools, toolIconUrl } from '../config/tools';

const ToolLogo = ({ tool }: { tool: (typeof techTools)[number] }) => (
  <div className="flex items-center gap-3 shrink-0 px-6 md:px-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
    <img
      src={toolIconUrl(tool)}
      alt={tool.name}
      width={28}
      height={28}
      loading="lazy"
      className="h-7 w-7 object-contain"
    />
    <span className="text-sm md:text-base font-medium text-neutral-700 whitespace-nowrap tracking-tight">
      {tool.name}
    </span>
  </div>
);

const ToolsWeUse = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current || !sectionRef.current) return;
      gsap.from(headerRef.current, {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    },
    { scope: sectionRef }
  );

  const tools = [...techTools, ...techTools];

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-light border-t border-neutral-200 overflow-hidden py-16 md:py-24"
      aria-label="Herramientas que usamos"
    >
      <div ref={headerRef} className="container-wide text-center mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
          De la idea al despliegue
        </p>
        <h2 className="font-tektur text-2xl md:text-4xl font-bold text-neutral-950 tracking-tight">
          Herramientas que usamos
        </h2>
      </div>

      <div className="overflow-hidden border-y border-neutral-200 py-8 md:py-10">
        <div className="marquee-track flex items-center w-max">
          {tools.map((tool, i) => (
            <ToolLogo key={`${tool.name}-${i}`} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsWeUse;
