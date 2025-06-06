import { useState, useEffect } from 'react';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Precargar el video
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background con filtros optimizados */}
      <div className="absolute inset-0 bg-black">
        {/* Placeholder de carga con gradiente animado */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-gradient transition-opacity duration-1000 ${
            isLoading ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}>
          {isMobile ? (
            // Imagen de fondo para móviles
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
                filter: 'brightness(0.6)'
              }}
            />
          ) : (
            // Video para desktop
            <iframe
              src="https://player.vimeo.com/video/1071614866?h=aab390ed2d&background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&dnt=1&quality=1080p&preload=auto"
              className="w-full h-full scale-150"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              style={{
                filter: 'brightness(0.6)',
              }}
            />
          )}
        </div>
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-tektur text-4xl sm:text-5xl md:text-7xl mb-6 text-shadow-lg">
            Software Empresarial a la Medida
          </h1>
          <p className="font-roboto text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-shadow">
            Soluciones tecnológicas seguras y escalables para empresas, instituciones y startups
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#servicios"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-roboto px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Ver Servicios
            </a>
            <a
              href="#contacto"
              className="inline-block bg-transparent border-2 border-white hover:bg-white/10 text-white font-roboto px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Solicitar Consulta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
