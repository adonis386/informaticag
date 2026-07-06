import { useRef, useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { siteConfig } from '../config/site';
import { trackWhatsAppClick } from '../lib/analytics';
import { crmPlatforms, crmIconUrl, type CrmPlatform } from '../config/crm';
import GSAPReveal from './ui/GSAPReveal';

const CrmCard = ({
  platform,
  index,
  className = '',
}: {
  platform: CrmPlatform;
  index: number;
  className?: string;
}) => (
  <article
    className={`crm-panel border border-neutral-800 bg-brand-surface flex flex-col justify-between hover:border-brand-accent/60 transition-colors duration-500 ${className}`}
  >
    <div className="p-8 md:p-12 lg:p-14 flex-1 flex flex-col">
      <div className="flex items-start justify-between mb-10 md:mb-14">
        <span className="text-xs text-neutral-600 font-mono">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="h-14 w-14 flex items-center justify-center bg-white rounded-lg p-2.5">
          <img
            src={crmIconUrl(platform)}
            alt={platform.name}
            className="h-9 w-9 object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <h3 className="font-tektur text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] mb-6 md:mb-8">
        {platform.name}
      </h3>

      <p className="text-neutral-400 leading-relaxed font-roboto text-base md:text-lg max-w-xl flex-1">
        {platform.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-10 md:mt-12">
        {platform.capabilities.map((cap) => (
          <span
            key={cap}
            className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-neutral-700 text-neutral-500"
          >
            {cap}
          </span>
        ))}
      </div>
    </div>
  </article>
);

const CrmIntegrations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackViewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useGSAP(
    () => {
      if (!isDesktop || !sectionRef.current || !trackRef.current || !trackViewportRef.current) {
        return;
      }

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const panels = trackRef.current.querySelectorAll('.crm-panel');
      const getScrollDistance = () =>
        Math.max(0, trackRef.current!.scrollWidth - trackViewportRef.current!.clientWidth);

      const tween = gsap.to(trackRef.current, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (!progressRef.current) return;
            const index = Math.min(
              crmPlatforms.length,
              Math.max(1, Math.ceil(self.progress * crmPlatforms.length) || 1)
            );
            progressRef.current.textContent = `${String(index).padStart(2, '0')} — ${String(crmPlatforms.length).padStart(2, '0')}`;
          },
        },
      });

      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { scale: 0.94, opacity: 0.55 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 85%',
              end: 'left 45%',
              scrub: true,
            },
          }
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef, dependencies: [isDesktop] }
  );

  return (
    <section
      id="integraciones-crm"
      ref={sectionRef}
      className="relative bg-brand-bg text-white border-t border-neutral-800 overflow-hidden"
    >
      {isDesktop ? (
        <div className="h-screen flex">
          <div className="w-[38%] max-w-xl shrink-0 flex flex-col justify-between px-8 lg:px-12 xl:px-16 py-16 border-r border-neutral-800/80">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">CRM & ERP</p>
              <h2 className="font-tektur text-3xl xl:text-4xl font-bold leading-[1.08] tracking-tight mb-6">
                Integraciones CRM
              </h2>
              <p className="text-neutral-400 leading-relaxed font-roboto text-sm xl:text-base max-w-sm">
                Conectamos su negocio con las plataformas que ya usa — migración, automatizaciones,
                APIs y flujos entre ventas, marketing y operaciones.
              </p>
            </div>

            <div className="flex items-end justify-between gap-6 pt-12">
              <span
                ref={progressRef}
                className="text-xs font-mono text-neutral-600 tracking-widest"
              >
                01 — {String(crmPlatforms.length).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-600 hidden xl:block">
                Scroll →
              </span>
            </div>
          </div>

          <div ref={trackViewportRef} className="flex-1 overflow-hidden flex items-center">
            <div ref={trackRef} className="flex items-stretch gap-6 xl:gap-8 pl-6 xl:pl-10 pr-6 xl:pr-10 w-max h-[min(78vh,720px)]">
              {crmPlatforms.map((platform, index) => (
                <CrmCard
                  key={platform.name}
                  platform={platform}
                  index={index}
                  className="w-[58vw] max-w-[640px] min-h-full flex-shrink-0"
                />
              ))}

              <article className="crm-panel w-[42vw] max-w-[480px] min-h-full flex-shrink-0 border border-neutral-800 bg-neutral-950 flex flex-col justify-center p-10 xl:p-14">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-600 mb-6">Siguiente paso</p>
                <h3 className="font-tektur text-2xl xl:text-3xl font-bold leading-tight mb-6">
                  ¿Integrar su CRM con web, app o sistema interno?
                </h3>
                <p className="text-neutral-500 font-roboto leading-relaxed mb-10">
                  Lo implementamos de punta a punta — desde la estrategia hasta el despliegue en
                  producción.
                </p>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('crm_section_desktop')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent text-white text-sm uppercase tracking-widest hover:bg-brand-accent-hover transition-all w-fit"
                >
                  Consultar integración
                  <FaWhatsapp className="text-lg" />
                </a>
              </article>
            </div>
          </div>
        </div>
      ) : (
        <div className="section-padding">
          <div className="container-wide">
            <div className="max-w-3xl mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-4">CRM & ERP</p>
              <h2 className="font-tektur text-3xl md:text-5xl font-bold leading-[1.08] tracking-tight mb-6">
                Integraciones CRM
              </h2>
              <p className="text-neutral-400 leading-relaxed font-roboto text-base md:text-lg">
                Conectamos su negocio con las plataformas que ya usa — o le ayudamos a elegir e
                implementar la correcta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {crmPlatforms.map((platform, index) => (
                <GSAPReveal key={platform.name} delay={index * 0.06}>
                  <CrmCard platform={platform} index={index} className="h-full" />
                </GSAPReveal>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <p className="text-neutral-500 font-roboto max-w-lg">
                ¿Necesita integrar su CRM con un sitio web, app móvil o sistema interno?
              </p>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('crm_section_mobile')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent text-white text-sm uppercase tracking-widest hover:bg-brand-accent-hover transition-all shrink-0"
              >
                Consultar integración
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CrmIntegrations;
