import { useState, useEffect, useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useGSAP(
    () => {
      if (!contentRef.current || isLoading) return;

      const lines = contentRef.current.querySelectorAll('.hero-line');
      const subtitle = contentRef.current.querySelector('.hero-subtitle');
      const ctas = contentRef.current.querySelector('.hero-ctas');

      gsap.from(lines, {
        y: '120%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2,
      });

      if (subtitle) {
        gsap.from(subtitle, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.8,
        });
      }

      if (ctas) {
        gsap.from(ctas, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1.1,
        });
      }
    },
    { scope: contentRef, dependencies: [isLoading] }
  );

  return (
    <section id="inicio" className="relative min-h-screen flex items-end md:items-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
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

      <div ref={contentRef} className="relative w-full pb-24 md:pb-0 pt-32">
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
              <a href="/contacto" className="btn-outline">
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
  );
};

export default Hero;
