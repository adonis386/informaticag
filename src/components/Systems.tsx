import React from 'react';
import { FaServer, FaLaptop, FaDatabase, FaShieldAlt, FaUsers, FaWhatsapp } from 'react-icons/fa';

const Systems: React.FC = () => {
  return (
    <section id="sistemas" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-tektur font-bold mb-4 text-gray-800">
            Soluciones Empresariales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistemas robustos y seguros diseñados para optimizar la gestión de su empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sistema de Escritorio */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaLaptop className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">Sistemas de Escritorio</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Soluciones robustas con servidor propio para una gestión eficiente y segura de sus operaciones.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FaServer className="text-blue-500 mt-1" />
                  <span className="text-gray-600">Servidor local</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaShieldAlt className="text-blue-500 mt-1" />
                  <span className="text-gray-600">Máxima seguridad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Aplicaciones Web */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaServer className="text-3xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">Aplicaciones Web</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Plataformas web empresariales que potencian la productividad y la colaboración.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FaUsers className="text-purple-500 mt-1" />
                  <span className="text-gray-600">Acceso remoto</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaDatabase className="text-purple-500 mt-1" />
                  <span className="text-gray-600">Gestión centralizada</span>
                </div>
              </div>
            </div>
          </div>

          {/* CRM Local */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500 opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaUsers className="text-3xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">CRM Local</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sistema de gestión de relaciones con clientes con servidor local para máxima privacidad y control.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FaServer className="text-green-500 mt-1" />
                  <span className="text-gray-600">Servidor propio</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaShieldAlt className="text-green-500 mt-1" />
                  <span className="text-gray-600">Datos seguros</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://wa.link/9fgi2d"
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

export default Systems;
