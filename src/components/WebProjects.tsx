import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaCheck } from 'react-icons/fa';

const WebProjects: React.FC = () => {
  const projects = [
    {
      title: "Denis Tattoo Gallery",
      description: "Aplicación web para artistas de tatuajes que permite publicar y gestionar sus trabajos. Incluye sistema de autenticación y CRUD completo para la gestión de imágenes.",
      image: "/assets/denis.webp",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      features: [
        "Sistema de login seguro",
        "Gestión de galería de tatuajes",
        "Panel de administración",
        "Diseño responsive"
      ]
    },
    {
      title: "Portfolio Creativo",
      description: "Portfolio profesional desarrollado en WordPress, demostrando nuestra capacidad para crear sitios web personales atractivos y únicos que destacan el trabajo y la personalidad del cliente.",
      image: "/assets/portfolio.webp",
      technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
      features: [
        "Diseño personalizado",
        "Galería de proyectos",
        "Blog integrado",
        "SEO optimizado"
      ]
    },
    {
      title: "Freestyle Battle App",
      description: "Plataforma web para la comunidad del freestyle rap, con sistema de rankings, gestión de eventos y perfiles de competidores. Permite a los usuarios registrarse y mantener su historial de batallas.",
      image: "/assets/rap.webp",
      technologies: ["React", "Firebase", "Node.js", "Express"],
      features: [
        "Sistema de rankings en tiempo real",
        "Gestión de eventos",
        "Perfiles de competidores",
        "Historial de batallas"
      ]
    }
  ];

  return (
    <section id="proyectos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-tektur text-center text-gray-900 mb-16">
          Nuestros Proyectos Web
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-6">
                  <a href="https://github.com/adonis386/estudiotatuajes" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors transform hover:scale-110">
                    <FaGithub className="text-3xl" />
                  </a>
                  <a href="https://jolly-brigadeiros-76a0f4.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors transform hover:scale-110">
                    <FaExternalLinkAlt className="text-3xl" />
                  </a>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-tektur font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Tecnologías</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Características</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebProjects;
