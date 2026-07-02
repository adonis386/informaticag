import { FaGlobe, FaShoppingCart, FaPalette, FaCode, FaShieldAlt, FaRocket } from 'react-icons/fa';
import GSAPReveal from './ui/GSAPReveal';

const webServices = [
  {
    icon: FaGlobe,
    title: 'Desarrollo Web',
    description:
      'Sitios web modernos y responsivos que destacan su marca y mejoran la experiencia del usuario con tecnologías de vanguardia.',
    feature: { icon: FaCode, text: 'React, Node.js, TypeScript' },
    num: '01',
  },
  {
    icon: FaShoppingCart,
    title: 'E-commerce',
    description:
      'Tiendas en línea completas con gestión de productos, pagos seguros y experiencia de compra optimizada para conversión.',
    feature: { icon: FaShieldAlt, text: 'Pagos seguros' },
    num: '02',
  },
  {
    icon: FaPalette,
    title: 'Diseño Web',
    description:
      'Diseños modernos y atractivos que reflejan la identidad de su marca con animaciones fluidas y UX cuidada.',
    feature: { icon: FaRocket, text: 'UI/UX premium' },
    num: '03',
  },
];

const WebServices = () => {
  return (
    <div className="section-padding bg-brand-light border-t border-neutral-200">
      <div className="container-wide">
        <GSAPReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            Web & Digital
          </p>
          <h2 className="font-tektur text-3xl md:text-4xl font-bold text-neutral-950 mb-16">
            Servicios web
          </h2>
        </GSAPReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-200">
          {webServices.map((service, index) => {
            const Icon = service.icon;
            const FeatureIcon = service.feature.icon;
            return (
              <GSAPReveal key={service.title} delay={index * 0.15}>
                <div
                  className={`card-minimal h-full border-0 rounded-none ${
                    index < webServices.length - 1 ? 'md:border-r border-neutral-200' : ''
                  } ${index < webServices.length - 1 ? 'border-b md:border-b-0 border-neutral-200' : ''} group`}
                >
                  <div className="flex items-center justify-between mb-10">
                    <span className="text-xs text-neutral-400 font-mono">{service.num}</span>
                    <Icon className="text-3xl text-neutral-300 group-hover:text-neutral-950 transition-colors duration-500" />
                  </div>
                  <h3 className="font-tektur text-2xl font-bold mb-4 text-neutral-950">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed mb-8 font-roboto">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-neutral-400">
                    <FeatureIcon className="text-neutral-950" />
                    <span>{service.feature.text}</span>
                  </div>
                </div>
              </GSAPReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WebServices;
