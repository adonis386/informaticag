import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.link/p20o4u"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-brand-accent text-white hover:bg-brand-accent-hover transition-all duration-300 shadow-lg shadow-brand-accent/25"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-xl" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
