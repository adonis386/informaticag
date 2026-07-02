import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

const statementLines = [
  'Ideas audaces.',
  'Código impecable.',
  'Experiencias que importan.',
];

/**
 * Hero + Statement — scroll normal con reveal de texto.
 */
const IntroScrollSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [isLoading]);

  // Animación de entrada del hero (al cargar)
  useGSAP(
    () => {
      if (!heroContentRef.current || isLoading) return;

      const lines = heroContentRef.current.querySelectorAll('.hero-line');
      const subtitle = heroContentRef.current.querySelector('.hero-subtitle');
      const ctas = heroContentRef.current.querySelector('.hero-ctas');

      gsap.from(lines, {
        y: '120%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2,
      });
      if (subtitle) {
        gsap.from(subtitle, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.8 });
      }
      if (ctas) {
        gsap.from(ctas, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 });
      }
    },
    { scope: heroContentRef, dependencies: [isLoading] }
  );

  // Animaciones al scroll (sin pin — el hero sale con el scroll normal)
  useGSAP(
    () => {
      if (isLoading || !heroRef.current || !statementRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const splitLines = statementRef.current.querySelectorAll('.split-line');
      const statementText = statementRef.current.querySelector('.statement-body');

      // Ocultar hero por completo cuando sale del viewport (evita que el video quede fijo)
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'bottom top',
        onEnter: () => gsap.set(heroRef.current, { visibility: 'hidden' }),
        onLeaveBack: () => gsap.set(heroRef.current, { visibility: 'visible' }),
      });

      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      gsap.from(splitLines, {
        y: 48,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      if (statementText) {
        gsap.from(statementText, {
          y: 32,
          duration: 0.9,
          delay: 0.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section
        id="inicio"
        ref={heroRef}
        className="relative h-[100svh] flex items-end md:items-center overflow-hidden"
      >
        <div ref={heroBgRef} className="absolute inset-0 bg-black will-change-transform">
          <div
            className={`absolute inset-0 bg-neutral-950 transition-opacity duration-1000 ${
              isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-10 h-10 border border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {isMobile ? (
              <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
                  filter: 'brightness(0.45)',
                }}
              />
            ) : (
              <iframe
                src="https://player.vimeo.com/video/1071614866?h=aab390ed2d&background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&dnt=1&quality=1080p&preload=auto"
                className="w-full h-full scale-150 pointer-events-none"
                title="Video de fondo"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{ filter: 'brightness(0.45)' }}
              />
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        </div>

        <div ref={heroContentRef} className="relative w-full pb-24 md:pb-0 pt-32 z-10">
          <div className="container-wide">
            <div className="max-w-5xl">
              <h1 className="mb-6">
                {['Software', 'Empresarial', 'a la Medida'].map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span className="hero-line block font-tektur text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight text-shadow-lg">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <p className="hero-subtitle text-base md:text-xl text-white/70 max-w-xl mb-10 font-roboto leading-relaxed text-shadow">
                Soluciones tecnológicas seguras y escalables para empresas, instituciones y startups.
              </p>

              <div className="hero-ctas flex flex-col sm:flex-row gap-4">
                <a href="#proyectos" className="btn-primary">
                  Ver Proyectos
                </a>
                <a href="#contacto" className="btn-outline">
                  Iniciar Proyecto
                </a>
              </div>
            </div>

            <div className="hidden md:flex absolute bottom-12 right-12 flex-col items-center gap-3 text-white/40">
              <span className="text-[10px] uppercase tracking-[0.3em] rotate-90 origin-center translate-y-8">
                Scroll
              </span>
              <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/40 to-white/0 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section
        ref={statementRef}
        className="relative bg-brand-light border-b border-neutral-200"
      >
        <div className="container-wide section-padding w-full">
          <div>
            {statementLines.map((line) => (
              <div key={line} className="overflow-hidden">
                <span className="split-line block font-tektur text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-neutral-950">
                  {line}
                </span>
              </div>
            ))}
          </div>
          <p className="statement-body mt-12 md:mt-16 max-w-3xl text-lg md:text-xl text-neutral-500 leading-relaxed font-roboto">
            Somos un estudio de desarrollo de software que combina diseño, ingeniería y estrategia
            para crear productos digitales a medida — desde sitios web inmersivos hasta sistemas
            empresariales completos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default IntroScrollSection;
