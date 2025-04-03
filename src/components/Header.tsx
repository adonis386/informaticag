import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <img src="/assets/logo-1.jpeg" alt="Informática González" className="h-12 w-auto" />
            <h1 className="font-tektur text-2xl font-black">
              Informática González
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8 font-roboto text-lg">
              <li><a href="#inicio" className="hover:text-blue-600 transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-blue-600 transition-colors">Servicios</a></li>
              <li><a href="#productos" className="hover:text-blue-600 transition-colors">Productos</a></li>
              <li><a href="#contacto" className="hover:text-blue-600 transition-colors">Contacto</a></li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 shadow-lg">
            <ul className="space-y-4 font-roboto text-lg">
              <li><a href="#inicio" className="block hover:text-blue-600 transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="block hover:text-blue-600 transition-colors">Servicios</a></li>
              <li><a href="#productos" className="block hover:text-blue-600 transition-colors">Productos</a></li>
              <li><a href="#contacto" className="block hover:text-blue-600 transition-colors">Contacto</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
