import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

interface FooterProps {
  onPrivacyClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
  return (
    <footer id="contacto" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-tektur text-xl mb-4">Informática González</h3>
            <p className="text-gray-400 mb-4">
              Soluciones tecnológicas personalizadas para impulsar su negocio al siguiente nivel.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1FBoqnXEMC/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a 
                href="https://www.instagram.com/informatica.gonzalez?igsh=Y21lMmtrZ3p3dnM3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a 
                href="https://wa.link/9fgi2d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-tektur text-xl mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a>
              </li>
              <li>
                <a href="#sistemas" className="hover:text-white transition-colors">Sistemas</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">Servicios Web</a>
              </li>
              <li>
                <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-tektur text-xl mb-4">Contacto</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-xl mt-1 flex-shrink-0 text-blue-400" />
                <span>Av Las Fuentes El Paraiso</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-xl flex-shrink-0 text-blue-400" />
                <span>+58 412 366 8513</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-xl flex-shrink-0 text-blue-400" />
                <span>contacto@informaticagonzalez.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Informática González. Todos los derechos reservados.</p>
          <div className="mt-4 space-x-4">
            {onPrivacyClick && (
              <button
                onClick={onPrivacyClick}
                className="text-gray-400 hover:text-white transition-colors underline"
              >
                Política de Privacidad
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
