import { FaLaptop, FaDatabase, FaUserLock, FaChartLine, FaUsers } from 'react-icons/fa';

const WebServices = () => {
  const services = [
    {
      icon: <FaLaptop className="text-4xl" />,
      title: "Landing Pages",
      description: "Páginas web modernas y atractivas para presentar tu negocio o producto",
    },
    {
      icon: <FaDatabase className="text-4xl" />,
      title: "Sistemas de Administración",
      description: "Gestión completa de datos con interfaces intuitivas y eficientes",
    },
    {
      icon: <FaUserLock className="text-4xl" />,
      title: "Login y Autenticación",
      description: "Sistemas de seguridad robustos para proteger tu información",
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Panel Administrativo",
      description: "Interfaces de gestión personalizadas para control total",
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Entorno Cliente",
      description: "Espacios dedicados para tus clientes con acceso seguro",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-tektur text-center mb-12">
          Servicios de Desarrollo Web
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center h-20 mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-tektur mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 font-roboto">{service.description}</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebServices;