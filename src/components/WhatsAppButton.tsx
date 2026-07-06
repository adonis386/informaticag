import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../config/site';
import { trackWhatsAppClick } from '../lib/analytics';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={siteConfig.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        className="flex items-center justify-center w-12 h-12 bg-brand-accent text-white hover:bg-brand-accent-hover transition-all duration-300 shadow-lg shadow-brand-accent/25"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-xl" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
