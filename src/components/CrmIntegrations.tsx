import { useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { gsap, useGSAP } from '../lib/gsap';
import { siteConfig } from '../config/site';
import { crmPlatforms, crmIconUrl } from '../config/crm';

const CrmIntegrations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
      }

      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll('.crm-card'), {
          y: 32,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="integraciones-crm"
      ref={sectionRef}
      className="section-padding bg-brand-bg text-white border-t border-neutral-800"
    >
      <div className="container-wide">
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">CRM & ERP</p>
          <h2 className="font-tektur text-3xl md:text-5xl font-bold leading-[1.08] tracking-tight mb-6">
            Integraciones CRM
          </h2>
          <p className="text-neutral-400 leading-relaxed font-roboto text-base md:text-lg">
            Conectamos su negocio con las plataformas que ya usa — o le ayudamos a elegir e
            implementar la correcta. Migración de datos, automatizaciones, APIs y flujos entre
            ventas, marketing y operaciones.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {crmPlatforms.map((platform) => (
            <article
              key={platform.name}
              className="crm-card border border-neutral-800 bg-brand-surface p-8 md:p-10 flex flex-col hover:border-neutral-600 transition-colors duration-500"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 flex items-center justify-center bg-white rounded-lg p-2">
                  <img
                    src={crmIconUrl(platform)}
                    alt={platform.name}
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-tektur text-2xl font-bold">{platform.name}</h3>
              </div>

              <p className="text-neutral-400 leading-relaxed font-roboto mb-8 flex-1">
                {platform.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {platform.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-neutral-700 text-neutral-500"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-neutral-500 font-roboto max-w-lg">
            ¿Necesita integrar su CRM con un sitio web, app móvil o sistema interno? Lo
            implementamos de punta a punta.
          </p>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-neutral-950 transition-all shrink-0"
          >
            Consultar integración
            <FaWhatsapp className="text-lg" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CrmIntegrations;
