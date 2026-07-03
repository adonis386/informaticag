import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { mainNav, siteConfig } from '../config/site';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed w-full z-50 bg-transparent">
        <div className="container-wide">
          <div className="flex items-center justify-between h-20 md:h-24">
            <button
              onClick={() => scrollToSection('#inicio')}
              className="group shrink-0"
              aria-label="Ir al inicio"
            >
              <img
                src="/assets/logo-3.webp"
                alt={siteConfig.name}
                decoding="async"
                className="h-14 sm:h-16 md:h-[4.5rem] lg:h-20 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </button>

            <nav className="hidden lg:flex items-center gap-12">
              {mainNav.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/70 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-brand-accent after:transition-all hover:after:w-full"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-brand-accent transition-colors"
              >
                Email
              </a>
              <button
                onClick={() => scrollToSection('#contacto')}
                className="text-[11px] uppercase tracking-[0.25em] font-medium px-6 py-3 bg-brand-accent text-white hover:bg-brand-accent-hover transition-all"
              >
                Iniciar Proyecto
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isMenuOpen ? 'text-neutral-950' : 'text-white'
              }`}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-brand-light transition-all duration-500 lg:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-between h-full pt-28 pb-12 px-8">
          <nav className="flex flex-col gap-8">
            {mainNav.map((item, i) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-left font-tektur text-4xl md:text-5xl font-bold text-neutral-950 hover:text-brand-accent transition-colors"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contacto')}
              className="text-left font-tektur text-4xl md:text-5xl font-bold text-brand-accent transition-colors"
            >
              Iniciar Proyecto
            </button>
          </nav>

          <div className="space-y-4 border-t border-neutral-200 pt-8">
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

