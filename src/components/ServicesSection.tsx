import Systems from './Systems';
import WebServices from './WebServices';

/** Bloque único de servicios — un id, dos capas visuales (enterprise + web) */
const ServicesSection = () => (
  <div id="servicios">
    <Systems />
    <WebServices />
  </div>
);

export default ServicesSection;
