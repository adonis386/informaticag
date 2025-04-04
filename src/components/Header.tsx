import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo y Título */}
          <div className="flex items-center space-x-4">
            <img
              src="/assets/logo-1.jpeg"
              alt="Informática González"
              className="h-16 w-16 rounded-full object-cover"
            />
            <h1 className="text-2xl font-tektur font-bold text-gray-800">
              Informática González
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('#inicio')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('#nosotros')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('#sistemas')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Sistemas
            </button>
            <button
              onClick={() => scrollToSection('#servicios')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Servicios Web
            </button>
            <button
              onClick={() => scrollToSection('#proyectos')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection('#contacto')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6 text-gray-600" />
            ) : (
              <FaBars className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('#inicio')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('#nosotros')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('#sistemas')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sistemas
              </button>
              <button
                onClick={() => scrollToSection('#servicios')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Servicios Web
              </button>
              <button
                onClick={() => scrollToSection('#proyectos')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Proyectos
              </button>
              <button
                onClick={() => scrollToSection('#contacto')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
