import { useRef, useState, useEffect } from 'react';
import {
  FaLaptop,
  FaDatabase,
  FaUsers,
  FaWhatsapp,
  FaNetworkWired,
  FaUserShield,
  FaMobileAlt,
} from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';
import GSAPReveal from './ui/GSAPReveal';
import { gsap, useGSAP } from '../lib/gsap';

const services = [
  {
    title: 'Aplicaciones Móviles',
    description:
      'Apps nativas e híbridas para iOS y Android con funcionalidades avanzadas y diseño intuitivo.',
    icon: FaMobileAlt,
    tags: ['iOS & Android', 'Tiempo real'],
  },
  {
    title: 'Sistemas de Administración',
    description:
      'Plataformas robustas con servidores de bases de datos para gestión eficiente de información empresarial.',
    icon: FaDatabase,
    tags: ['Bases de datos', 'Backup automático'],
  },
  {
    title: 'Panel Administrativo',
    description:
      'Interfaces intuitivas para gestión completa de usuarios, permisos y configuración del sistema.',
    icon: FaUserShield,
    tags: ['Control de acceso', 'Roles y permisos'],
  },
  {
    title: 'Entorno Cliente',
    description:
      'Plataformas personalizadas para clientes con acceso seguro a sus datos y servicios.',
    icon: FaUsers,
    tags: ['Acceso seguro', 'Datos en vivo'],
  },
  {
    title: 'Redes Empresariales',
    description:
      'Implementación de redes estructuradas para optimizar conectividad y seguridad empresarial.',
    icon: FaNetworkWired,
    tags: ['Infraestructura', 'Seguridad'],
  },
  {
    title: 'Sistemas Web',
    description:
      'Aplicaciones web modernas con interfaces responsivas y funcionalidades avanzadas.',
    icon: FaLaptop,
    tags: ['Hosting optimizado', 'SSL'],
  },
];

const ServiceCard = ({
  service,
  index,
  className = '',
}: {
  service: (typeof services)[0];
  index: number;
  className?: string;
}) => {
  const Icon = service.icon;
  return (
    <article
      className={`service-card border border-neutral-800 bg-brand-surface p-8 md:p-10 group hover:border-neutral-600 transition-colors duration-500 ${className}`}
    >
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs text-neutral-600 font-mono">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Icon className="text-2xl text-neutral-500 group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-tektur text-2xl md:text-3xl font-bold mb-4 leading-tight">
        {service.title}
      </h3>
      <p className="text-neutral-400 leading-relaxed mb-8 font-roboto">{service.description}</p>
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-neutral-700 text-neutral-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

const Systems = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useGSAP(
    () => {
      if (!isDesktop || !sectionRef.current || !trackRef.current) return;

      const scrollDistance = trackRef.current.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [isDesktop] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-bg text-white overflow-hidden"
    >
      <div className="container-wide pt-24 md:pt-32 pb-8">
        <SectionHeader
          label="Capabilities"
          title="Lo que construimos"
          subtitle="Desde aplicaciones móviles hasta redes estructuradas — cada solución diseñada para escalar con su empresa."
          dark
        />
      </div>

      {isDesktop ? (
        <div className="overflow-hidden pb-24 md:pb-32">
          <div ref={trackRef} className="flex gap-6 md:gap-8 px-5 md:px-8 lg:px-12 w-max">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                className="w-[85vw] md:w-[420px] lg:w-[480px] flex-shrink-0"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container-wide pb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <GSAPReveal key={service.title} delay={index * 0.05}>
              <ServiceCard service={service} index={index} />
            </GSAPReveal>
          ))}
        </div>
      )}

      <div className="container-wide pb-16 md:pb-24">
        <a
          href="https://wa.link/p20o4u"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-white border border-neutral-700 px-8 py-4 hover:bg-white hover:text-neutral-950 transition-all duration-300"
        >
          Solicitar Consulta
          <FaWhatsapp className="text-lg" />
        </a>
      </div>
    </section>
  );
};

export default Systems;
