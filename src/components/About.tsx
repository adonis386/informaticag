const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Imagen */}
          <div className="md:w-1/2 relative">
            <img
              src="/assets/logo-2.jpeg"
              alt="Informática González"
              className="w-full rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            {/* Decoración */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-600 rounded-full blur-2xl opacity-30" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 rounded-full blur-2xl opacity-30" />
          </div>

          {/* Contenido */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-tektur font-bold mb-6 text-gray-800">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-roboto">
              Somos una empresa especializada en desarrollo web y sistemas de administración de datos. 
              Nuestro equipo de expertos crea soluciones tecnológicas a medida que transforman ideas 
              en realidades digitales efectivas.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Desarrollo Web</h3>
                  <p className="text-gray-600 font-roboto">
                    Creación de sitios web modernos y aplicaciones web personalizadas que 
                    mejoran la experiencia del usuario y potencian tu presencia digital.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Sistemas de Administración</h3>
                  <p className="text-gray-600 font-roboto">
                    Desarrollo de sistemas robustos para la gestión de datos y procesos empresariales, 
                    optimizando la eficiencia operativa y la toma de decisiones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
