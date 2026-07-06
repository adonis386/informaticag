import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { footerNav, siteConfig } from '../config/site';
import { trackEmailClick, trackWhatsAppClick } from '../lib/analytics';

interface FooterProps {
  onPrivacyClick?: () => void;
}

const Footer = ({ onPrivacyClick }: FooterProps) => {
  return (
    <footer className="bg-brand-bg text-white border-t border-neutral-800">
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-600 mb-4">
              {siteConfig.name}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => trackEmailClick('footer')}
              className="font-tektur text-xl md:text-2xl text-white hover:text-brand-accent transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-brand-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            {onPrivacyClick && (
              <button
                onClick={onPrivacyClick}
                className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-brand-accent transition-colors"
              >
                Privacidad
              </button>
            )}
          </nav>

          <div className="flex gap-3">
            {[
              { href: siteConfig.social.facebook, icon: FaFacebook, label: 'Facebook' },
              { href: siteConfig.social.instagram, icon: FaInstagram, label: 'Instagram' },
              { href: siteConfig.social.whatsapp, icon: FaWhatsapp, label: 'WhatsApp' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => label === 'WhatsApp' && trackWhatsAppClick('footer_social')}
                aria-label={label}
                className="w-9 h-9 border border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-brand-accent hover:border-brand-accent transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-neutral-600 text-xs">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
          <p className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt /> Av Las Fuentes El Paraiso
            </span>
            <span className="flex items-center gap-2">
              <FaPhone /> {siteConfig.phone}
            </span>
            <span className="hidden md:flex items-center gap-2">
              <FaEnvelope /> {siteConfig.email}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
