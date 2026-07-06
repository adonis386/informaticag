import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { mainNav, siteConfig } from '../config/site';
import { trackContactClick, trackEmailClick, trackWhatsAppClick } from '../lib/analytics';

type HeaderProps = {
  variant?: 'hero' | 'dark';
};

const Header = ({ variant = 'hero' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = variant === 'hero';

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinkClass = isDark
    ? 'text-[11px] uppercase tracking-[0.25em] font-medium text-white/70 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-brand-accent after:transition-all hover:after:w-full'
    : 'text-[11px] uppercase tracking-[0.25em] font-medium text-neutral-600 hover:text-neutral-950 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-brand-accent after:transition-all hover:after:w-full';

  const emailLinkClass = isDark
    ? 'text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-brand-accent transition-colors'
    : 'text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-brand-accent transition-colors';

  const menuButtonClass = isDark
    ? `lg:hidden p-2 transition-colors ${isMenuOpen ? 'text-neutral-950' : 'text-white'}`
    : 'lg:hidden p-2 transition-colors text-neutral-950';

  return (
    <>
      <header
        className={`fixed w-full z-50 ${isDark ? 'bg-transparent' : 'bg-brand-bg/95 backdrop-blur-sm border-b border-neutral-800'}`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20 md:h-24">
            <a href="/" className="group shrink-0" aria-label="Ir al inicio">
              <img
                src="/assets/logo-3.webp"
                alt={siteConfig.name}
                decoding="async"
                className="h-14 sm:h-16 md:h-[4.5rem] lg:h-20 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </a>

            <nav className="hidden lg:flex items-center gap-12">
              {mainNav.map((item) => (
                <a key={item.href} href={item.href} className={navLinkClass}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <a
                href={`mailto:${siteConfig.email}`}
                onClick={() => trackEmailClick('header')}
                className={emailLinkClass}
              >
                Email
              </a>
              <a
                href="/#contacto"
                onClick={() => trackContactClick('header')}
                className="text-[11px] uppercase tracking-[0.25em] font-medium px-6 py-3 bg-brand-accent text-white hover:bg-brand-accent-hover transition-all"
              >
                Iniciar Proyecto
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={menuButtonClass}
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
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-left font-tektur text-4xl md:text-5xl font-bold text-neutral-950 hover:text-brand-accent transition-colors"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contacto"
              onClick={() => {
                trackContactClick('mobile_menu');
                setIsMenuOpen(false);
              }}
              className="text-left font-tektur text-4xl md:text-5xl font-bold text-brand-accent transition-colors"
            >
              Iniciar Proyecto
            </a>
          </nav>

          <div className="space-y-4 border-t border-neutral-200 pt-8">
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => trackEmailClick('mobile_menu')}
              className="block text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('mobile_menu')}
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
