const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/assets/logo-1.jpeg" alt="Informática González" className="h-10 w-auto" />
              <h2 className="font-tektur text-xl">Informática González</h2>
            </div>
            <p className="font-roboto text-gray-400">
              Soluciones digitales innovadoras para tu negocio
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-tektur text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="font-roboto space-y-2 text-gray-400">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#productos" className="hover:text-white transition-colors">Productos</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-tektur text-lg mb-4">Contacto</h3>
            <ul className="font-roboto space-y-2 text-gray-400">
              <li>📍 Dirección del Negocio</li>
              <li>📞 Teléfono: +XX XXX XXX XXX</li>
              <li>✉️ Email: contacto@informaticagonzalez.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center font-roboto text-gray-400">
          <p>&copy; {new Date().getFullYear()} Informática González. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
