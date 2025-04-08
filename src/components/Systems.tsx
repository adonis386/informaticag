import React, { useState, useEffect, useCallback } from 'react';
import { FaServer, FaLaptop, FaDatabase, FaShieldAlt, FaUsers, FaWhatsapp, FaChevronLeft, FaChevronRight, FaNetworkWired, FaUserShield, FaMobileAlt } from 'react-icons/fa';

const Systems: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const checkDesktop = useCallback(() => {
    setIsDesktop(window.innerWidth > 1024);
  }, []);

  useEffect(() => {
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, [checkDesktop]);

  const services = [
    {
      title: "Aplicaciones Móviles",
      description: "Desarrollo de apps nativas e híbridas para iOS y Android con funcionalidades avanzadas y diseño intuitivo.",
      icon: FaMobileAlt,
      features: [
        { icon: FaShieldAlt, text: "Seguridad avanzada" },
        { icon: FaDatabase, text: "Sincronización en tiempo real" }
      ],
      color: "blue"
    },
    {
      title: "Sistemas de Administración",
      description: "Plataformas robustas con servidores de bases de datos para gestión eficiente de información empresarial.",
      icon: FaDatabase,
      features: [
        { icon: FaServer, text: "Bases de datos seguras" },
        { icon: FaShieldAlt, text: "Backup automático" }
      ],
      color: "purple"
    },
    {
      title: "Panel Administrativo",
      description: "Interfaces intuitivas para gestión completa de usuarios, permisos y configuración del sistema.",
      icon: FaUserShield,
      features: [
        { icon: FaUsers, text: "Control de acceso" },
        { icon: FaShieldAlt, text: "Roles y permisos" }
      ],
      color: "green"
    },
    {
      title: "Entorno Cliente",
      description: "Plataformas personalizadas para clientes con acceso seguro a sus datos y servicios.",
      icon: FaUsers,
      features: [
        { icon: FaShieldAlt, text: "Acceso seguro" },
        { icon: FaDatabase, text: "Datos en tiempo real" }
      ],
      color: "yellow"
    },
    {
      title: "Redes Empresariales",
      description: "Implementación de redes estructuradas para optimizar la conectividad y seguridad de su empresa.",
      icon: FaNetworkWired,
      features: [
        { icon: FaServer, text: "Infraestructura robusta" },
        { icon: FaShieldAlt, text: "Seguridad perimetral" }
      ],
      color: "red"
    },
    {
      title: "Sistemas Web",
      description: "Desarrollo de aplicaciones web modernas con interfaces responsivas y funcionalidades avanzadas.",
      icon: FaLaptop,
      features: [
        { icon: FaServer, text: "Hosting optimizado" },
        { icon: FaShieldAlt, text: "SSL y seguridad" }
      ],
      color: "indigo"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  }, [services.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  }, [services.length]);

  const renderService = useCallback((service: typeof services[0], index: number) => {
    const Icon = service.icon;
    const colorClasses = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-500' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-500' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-500' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-500' }
    };

    const colors = colorClasses[service.color as keyof typeof colorClasses];

    return (
      <div key={index} className="group">
        <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden border-t-4 ${colors.border}`}>
          <div className={`absolute top-0 right-0 w-40 h-40 ${colors.bg} opacity-10 rounded-full transform translate-x-20 -translate-y-20`}></div>
          <div className="flex items-center mb-6">
            <div className={`p-3 ${colors.bg} rounded-lg`}>
              <Icon className={`text-3xl ${colors.text}`} />
            </div>
            <h3 className="text-2xl font-bold ml-4 text-gray-800">{service.title}</h3>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
          <div className="grid grid-cols-2 gap-4">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <feature.icon className={`${colors.text} mt-1`} />
                <span className="text-gray-600">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-tektur font-bold mb-4 text-gray-800">
            Soluciones Empresariales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desarrollamos sistemas integrales para la gestión eficiente de su empresa, desde aplicaciones móviles hasta redes estructuradas
          </p>
        </div>

        {isDesktop ? (
          <div className="relative">
            <div className="flex items-center justify-center space-x-8">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Servicio anterior"
              >
                <FaChevronLeft className="text-gray-600 text-xl" />
              </button>
              
              <div className="w-full max-w-4xl">
                {renderService(services[currentIndex], currentIndex)}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Siguiente servicio"
              >
                <FaChevronRight className="text-gray-600 text-xl" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => renderService(service, index))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://wa.link/p20o4u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-medium group"
          >
            <span className="mr-2">Solicitar Consulta</span>
            <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Systems);
