import { useState, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { gsap, useGSAP } from '../lib/gsap';
import { siteConfig } from '../config/site';
import { trackWhatsAppClick } from '../lib/analytics';

const services = [
  {
    title: 'Sistemas de Administración',
    description:
      'Plataformas robustas con bases de datos centralizadas para gestionar información empresarial, procesos internos y reportes en tiempo real.',
    tags: ['Bases de datos', 'Backup automático', 'Reportes'],
  },
  {
    title: 'Aplicaciones Móviles',
    description:
      'Apps nativas e híbridas para iOS y Android con diseño intuitivo, notificaciones, sincronización en la nube y funcionalidades avanzadas.',
    tags: ['iOS & Android', 'Tiempo real', 'APIs'],
  },
  {
    title: 'Paneles Administrativos',
    description:
      'Interfaces de control para gestión de usuarios, permisos, configuración del sistema y monitoreo operativo desde un solo lugar.',
    tags: ['Roles y permisos', 'Dashboards', 'Control de acceso'],
  },
  {
    title: 'Entorno Cliente',
    description:
      'Portales personalizados donde sus clientes acceden de forma segura a datos, servicios, documentos y seguimiento de procesos.',
    tags: ['Acceso seguro', 'Portal web', 'Autogestión'],
  },
  {
    title: 'Desarrollo Web',
    description:
      'Sitios y aplicaciones web modernas con React, Node.js y TypeScript — responsivas, rápidas y optimizadas para conversión.',
    tags: ['React', 'Node.js', 'TypeScript'],
  },
  {
    title: 'E-commerce',
    description:
      'Tiendas en línea completas con catálogo, inventario, pagos seguros y experiencia de compra diseñada para vender más.',
    tags: ['Pagos seguros', 'Inventario', 'Conversión'],
  },
  {
    title: 'Redes Empresariales',
    description:
      'Diseño e implementación de redes estructuradas para conectividad, seguridad y operación confiable en entornos corporativos.',
    tags: ['Infraestructura', 'Seguridad', 'Soporte'],
  },
  {
    title: 'Consultoría Tecnológica',
    description:
      'Asesoría para definir arquitectura, elegir stack, planificar integraciones y llevar su producto digital de la idea a producción.',
    tags: ['Estrategia', 'Arquitectura', 'Roadmap'],
  },
] as const;

const ServicesAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      if (listRef.current) {
        gsap.from(listRef.current.querySelectorAll('.service-item'), {
          y: 24,
          opacity: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
        });
      }
    },
    { scope: sectionRef }
  );

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="section-padding bg-brand-light border-t border-neutral-200"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24">
          {/* Header sticky — estilo NineTwoThree */}
          <div ref={headerRef} className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">Servicios</p>
            <h2 className="font-tektur text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-neutral-950 leading-[1.08] tracking-tight">
              Software a medida.
              <br />
              <span className="text-brand-accent">Hecho para operar.</span>
            </h2>
            <p className="mt-6 text-neutral-500 leading-relaxed font-roboto max-w-sm hidden lg:block">
              Desde sistemas empresariales hasta apps móviles — cada solución diseñada para
              escalar con su negocio.
            </p>
          </div>

          {/* Acordeón numerado */}
          <div ref={listRef} className="lg:col-span-8 border-t border-neutral-200">
            {services.map((service, index) => {
              const isOpen = activeIndex === index;
              const panelId = `service-panel-${index}`;
              const buttonId = `service-button-${index}`;

              return (
                <article
                  key={service.title}
                  className="service-item border-b border-neutral-200"
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="w-full flex items-start gap-6 md:gap-10 py-7 md:py-9 text-left group"
                  >
                    <span
                      className={`shrink-0 font-mono text-sm md:text-base tabular-nums transition-colors duration-300 ${
                        isOpen ? 'text-brand-accent' : 'text-neutral-300 group-hover:text-brand-accent/70'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span
                        className={`block font-tektur text-xl md:text-2xl lg:text-[1.75rem] font-bold leading-tight transition-colors duration-300 ${
                          isOpen
                            ? 'text-brand-accent'
                            : 'text-neutral-400 group-hover:text-neutral-700'
                        }`}
                      >
                        {service.title}
                      </span>
                    </span>

                    <span
                      className={`shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'border-brand-accent bg-brand-accent text-white rotate-45'
                          : 'border-neutral-200 text-neutral-400 group-hover:border-brand-accent group-hover:text-brand-accent'
                      }`}
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8 md:pb-10 pl-[2.75rem] md:pl-[3.75rem] lg:pl-[4.5rem] pr-14 md:pr-16">
                        <p className="text-neutral-500 leading-relaxed font-roboto text-base md:text-lg max-w-2xl mb-6">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] uppercase tracking-widest px-4 py-2 border border-neutral-200 text-neutral-600 bg-white hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-12 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-neutral-500 font-roboto max-w-md">
            ¿No sabe qué servicio necesita? Hablemos y le ayudamos a definir la mejor solución.
          </p>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('services_section')}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent text-white text-sm uppercase tracking-widest hover:bg-brand-accent-hover transition-colors shrink-0"
          >
            Solicitar consulta
            <FaWhatsapp className="text-lg" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion;
