import React from 'react';
import { FaGlobe, FaShoppingCart, FaPalette, FaCode, FaShieldAlt, FaRocket } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

const WebServices: React.FC = () => {
  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-tektur font-bold mb-4 text-gray-800">
              Servicios Web
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creamos soluciones web innovadoras y personalizadas para impulsar su presencia digital
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Desarrollo Web */}
          <ScrollAnimation delay={0.2} key="servicio-desarrollo">
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaGlobe className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold ml-4 text-gray-800">Desarrollo Web</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Sitios web modernos y responsivos que destacan su marca y mejoran la experiencia del usuario.
                </p>
                <div className="flex items-start space-x-3">
                  <FaCode className="text-blue-500 mt-1" />
                  <span className="text-gray-600">Tecnologías modernas</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* E-commerce */}
          <ScrollAnimation delay={0.4} key="servicio-ecommerce">
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500 opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaShoppingCart className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold ml-4 text-gray-800">E-commerce</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Tiendas en línea completas con gestión de productos, pagos seguros y experiencia de compra optimizada.
                </p>
                <div className="flex items-start space-x-3">
                  <FaShieldAlt className="text-green-500 mt-1" />
                  <span className="text-gray-600">Pagos seguros</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Diseño Web */}
          <ScrollAnimation delay={0.6} key="servicio-diseno">
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500 opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <FaPalette className="text-3xl text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold ml-4 text-gray-800">Diseño Web</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Diseños modernos y atractivos que reflejan la identidad de su marca y cautivan a sus visitantes.
                </p>
                <div className="flex items-start space-x-3">
                  <FaRocket className="text-pink-500 mt-1" />
                  <span className="text-gray-600">Diseño moderno</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default WebServices;