import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.link/p20o4u"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-neutral-950 text-white border border-neutral-700 hover:bg-white hover:text-neutral-950 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-xl" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
