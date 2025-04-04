import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.link/9fgi2d"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="text-2xl md:text-3xl" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Contactar por WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
