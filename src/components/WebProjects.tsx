const WebProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Portal Web Corporativo",
      description: "Sistema completo de gestión empresarial con panel de administración y frontend moderno. Integración con base de datos y sistema de autenticación.",
      image: "/assets/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"]
    },
    {
      id: 2,
      title: "Tienda Online",
      description: "E-commerce completo con carrito de compras, sistema de pagos y gestión de inventario. Interfaz intuitiva y responsive.",
      image: "/assets/project2.jpg",
      technologies: ["React", "Next.js", "Stripe", "Firebase"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-tektur text-center text-gray-900 mb-12">
          Nuestros Proyectos Web
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            >
              {/* Imagen con efecto de zoom */}
              <div className="relative h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 font-roboto">
                  {project.description}
                </p>
                
                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-roboto"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botón */}
                <a
                  href="#"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-roboto px-6 py-2 rounded-lg transition-colors duration-300"
                >
                  Ver Proyecto
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebProjects;
