import React from 'react';
import { FaCashRegister, FaTools, FaChartLine, FaUsers, FaCog, FaDatabase, FaWhatsapp } from 'react-icons/fa';

const Systems: React.FC = () => {
  return (
    <section id="sistemas" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-tektur font-bold mb-4 text-gray-800">
            Sistemas Administrativos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones tecnológicas diseñadas para optimizar y automatizar sus procesos empresariales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sistema de Facturación */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaCashRegister className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">Sistema de Facturación</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sistema integral que combina facturación electrónica con control de inventario en tiempo real.
                Diseñado para hacer su negocio más eficiente y productivo.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FaChartLine className="text-blue-500 mt-1" />
                  <span className="text-gray-600">Reportes detallados</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaDatabase className="text-blue-500 mt-1" />
                  <span className="text-gray-600">Control de inventario</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaUsers className="text-blue-500 mt-1" />
                  <span className="text-gray-600">Gestión de clientes</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCog className="text-blue-500 mt-1" />
                  <span className="text-gray-600">Múltiples métodos de pago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sistemas a la Medida */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaTools className="text-3xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">Sistemas a la Medida</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Desarrollamos soluciones personalizadas que se adaptan perfectamente a las necesidades específicas de su empresa.
                Automatice sus procesos y mejore la eficiencia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FaCog className="text-purple-500 mt-1" />
                  <span className="text-gray-600">Procesos personalizados</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaUsers className="text-purple-500 mt-1" />
                  <span className="text-gray-600">Control de usuarios</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaChartLine className="text-purple-500 mt-1" />
                  <span className="text-gray-600">Reportes a medida</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaDatabase className="text-purple-500 mt-1" />
                  <span className="text-gray-600">Base de datos optimizada</span>
                </div>
              </div>
              <div className="text-center mt-12">
                <a
                  href="https://wa.link/9fgi2d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-lg font-medium group"
                >
                  <span className="mr-2">Solicitar Consulta</span>
                  <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Systems;
