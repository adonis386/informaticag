import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.link/p20o4u"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
};

export default WhatsAppButton;