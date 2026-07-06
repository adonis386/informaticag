export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceBenefit = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type RelatedProject = {
  title: string;
  url: string;
  description: string;
};

export type ServicePageConfig = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  body: readonly string[];
  benefits: readonly ServiceBenefit[];
  process: readonly ServiceProcessStep[];
  technologies: readonly string[];
  relatedProjects: readonly RelatedProject[];
  faq: readonly ServiceFaq[];
};

export const servicePages = {
  'desarrollo-web': {
    slug: 'desarrollo-web',
    name: 'Desarrollo Web',
    metaTitle: 'Desarrollo Web | Sitios con React y Next.js | Informática González',
    metaDescription:
      'Desarrollo web profesional en Caracas, Venezuela. Sitios rápidos, responsivos y optimizados para SEO con React, Next.js y TypeScript. Consulta sin compromiso.',
    h1: 'Desarrollo Web',
    heroSubtitle:
      'Sitios y aplicaciones web modernas, rápidas y pensadas para convertir visitantes en clientes.',
    heroImage: '/assets/services/desarrollo-web-hero.webp',
    heroImageAlt: 'Ilustración de desarrollo web: interfaz y código en estilo wireframe',
    intro:
      'En Informática González diseñamos y desarrollamos sitios web a medida para empresas en Caracas y toda Venezuela. No usamos plantillas genéricas: cada proyecto se construye con tecnologías modernas, arquitectura escalable y foco en resultados de negocio.',
    body: [
      'Un sitio web profesional es la base de su presencia digital. Es donde sus clientes lo encuentran, evalúan su propuesta y deciden contactarlo. Por eso combinamos diseño cuidado, ingeniería sólida y optimización para buscadores desde el primer día.',
      'Trabajamos con React, Next.js, TypeScript y Node.js — el mismo stack que usan empresas tecnológicas a nivel global. Eso significa sitios rápidos, seguros, fáciles de mantener y listos para crecer con su negocio.',
      'Ya sea un sitio corporativo, un portal de servicios o una aplicación web con panel administrativo, adaptamos la solución a sus objetivos, su sector y su presupuesto.',
    ],
    benefits: [
      {
        title: 'Rendimiento y SEO',
        description:
          'Sitios optimizados para cargar rápido y posicionarse en Google. Meta tags, schema markup y estructura semántica incluidos.',
      },
      {
        title: 'Diseño a medida',
        description:
          'Interfaces que reflejan su marca y guían al usuario hacia la acción: contacto, compra o solicitud de cotización.',
      },
      {
        title: 'Escalable y mantenible',
        description:
          'Código limpio con TypeScript y arquitectura modular. Agregar funcionalidades después no significa empezar de cero.',
      },
      {
        title: 'Responsivo total',
        description:
          'Su sitio se ve y funciona perfecto en móvil, tablet y escritorio — donde están la mayoría de sus clientes.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Descubrimiento',
        description: 'Entendemos su negocio, objetivos, público y competencia para definir el alcance.',
      },
      {
        step: '02',
        title: 'Diseño y prototipo',
        description: 'Wireframes y diseño visual alineado a su marca antes de escribir código.',
      },
      {
        step: '03',
        title: 'Desarrollo',
        description: 'Construcción iterativa con React/Next.js, pruebas y revisión continua con usted.',
      },
      {
        step: '04',
        title: 'Lanzamiento y soporte',
        description: 'Deploy en producción, configuración de dominio, SSL y acompañamiento post-lanzamiento.',
      },
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vercel'],
    relatedProjects: [
      {
        title: 'Soluciones CGT',
        url: 'https://www.solucionescgt.com/',
        description: 'E-commerce tecnológico con catálogo dinámico y asesoría integrada.',
      },
      {
        title: 'Laboratorio Hemodinamia HCC',
        url: 'https://laboratoriohemodinamia.vercel.app',
        description: 'Sitio institucional para cardiología con blog, galería y directorio médico.',
      },
      {
        title: 'Sol y Sombra',
        url: 'https://solsombratoldos.com',
        description: 'Web corporativa con catálogo de productos y formulario de contacto.',
      },
    ],
    faq: [
      {
        question: '¿Cuánto tarda un sitio web profesional?',
        answer:
          'Depende del alcance. Un sitio corporativo puede estar listo en 4–8 semanas. Proyectos con funcionalidades avanzadas o integraciones pueden tomar más. Le damos un cronograma claro antes de empezar.',
      },
      {
        question: '¿Trabajan con empresas fuera de Caracas?',
        answer:
          'Sí. Trabajamos con clientes en toda Venezuela y Latinoamérica de forma remota, con reuniones por videollamada y comunicación por WhatsApp.',
      },
      {
        question: '¿Incluyen hosting y dominio?',
        answer:
          'Asesoramos en la elección y configuración de hosting (recomendamos Vercel o infraestructura según el proyecto). El dominio lo registra el cliente o lo gestionamos por usted.',
      },
      {
        question: '¿Pueden rediseñar mi sitio actual?',
        answer:
          'Sí. Evaluamos su sitio existente, migramos el contenido relevante y construimos una versión moderna sin perder posicionamiento en Google.',
      },
    ],
  },
  'aplicaciones-moviles': {
    slug: 'aplicaciones-moviles',
    name: 'Aplicaciones Móviles',
    metaTitle:
      'Desarrollo de Apps Móviles en Caracas | iOS y Android | Informática González',
    metaDescription:
      'Desarrollo de aplicaciones móviles a medida en Venezuela. Apps iOS y Android con Firebase, APIs, integración Odoo y seguimiento en tiempo real. Consulta sin compromiso.',
    h1: 'Aplicaciones Móviles a Medida',
    heroSubtitle:
      'Apps nativas e híbridas para iOS y Android — conectadas a su operación, su ERP y sus clientes en tiempo real.',
    heroImage: '/assets/services/aplicaciones-moviles-hero.webp',
    heroImageAlt: 'Ilustración de aplicaciones móviles conectadas a Firebase y Odoo',
    intro:
      'Desarrollamos aplicaciones móviles que resuelven problemas reales de negocio: seguimiento logístico, autogestión de clientes, operaciones de campo y sincronización con sistemas empresariales como Odoo.',
    body: [
      'Una app bien construida no es un accesorio: es una extensión de su operación. Por eso diseñamos cada aplicación pensando en usuarios, conectividad, rendimiento offline y la integración con su infraestructura existente.',
      'Integramos Firebase para notificaciones push, sincronización en tiempo real y autenticación segura. Cuando su negocio ya usa Odoo u otro ERP, conectamos la app para que operaciones, clientes y backoffice hablen el mismo idioma.',
      'Desde el prototipo hasta la publicación en App Store y Google Play, acompañamos todo el ciclo — o entregamos apps internas para su equipo sin pasar por las tiendas.',
    ],
    benefits: [
      {
        title: 'iOS y Android',
        description:
          'Una sola base de código con React Native o desarrollo híbrido, o nativo según lo que su proyecto requiera.',
      },
      {
        title: 'Tiempo real con Firebase',
        description:
          'Tracking de envíos, estados de pedidos y notificaciones push actualizadas al instante para usuarios y operadores.',
      },
      {
        title: 'Integración con Odoo y APIs',
        description:
          'Su app sincronizada con inventario, facturación, CRM y procesos internos del ERP — sin doble carga de datos.',
      },
      {
        title: 'UX pensada para operar',
        description:
          'Interfaces claras para clientes finales o equipos en campo: pocos toques, información relevante, cero fricción.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Definición del producto',
        description:
          'Mapeamos flujos de usuario, integraciones necesarias (Odoo, Firebase, APIs) y requisitos de iOS/Android.',
      },
      {
        step: '02',
        title: 'Prototipo y diseño',
        description: 'Pantallas navegables y diseño de interfaz antes del desarrollo para validar con su equipo.',
      },
      {
        step: '03',
        title: 'Desarrollo e integración',
        description:
          'Construcción de la app, conexión con backend, Firebase y Odoo. Pruebas en dispositivos reales.',
      },
      {
        step: '04',
        title: 'Publicación y evolución',
        description:
          'Deploy en tiendas o distribución interna, monitoreo y mejoras continuas según uso real.',
      },
    ],
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Odoo', 'Node.js', 'APIs REST'],
    relatedProjects: [
      {
        title: 'Legacy Cargo',
        url: 'https://www.legacycargove.com/',
        description:
          'Integración Firebase + Odoo para logística internacional VE ↔ China, Panamá y USA: app y web con tracking en tiempo real sincronizado con el ERP.',
      },
      {
        title: 'LogiTrack',
        url: 'https://logitrack-gold.vercel.app',
        description:
          'Plataforma de gestión logística con panel operativo para control de envíos, rutas y operaciones en tiempo real.',
      },
      {
        title: 'Mundialito 2026',
        url: 'https://mundial-futbol.vercel.app',
        description:
          'App web con ligas privadas, ranking en vivo y sincronización de resultados en tiempo real con Supabase.',
      },
    ],
    faq: [
      {
        question: '¿Desarrollan para iOS y Android?',
        answer:
          'Sí. Trabajamos con desarrollo híbrido (React Native) o soluciones web progresivas según el alcance y presupuesto del proyecto.',
      },
      {
        question: '¿Pueden integrar la app con Odoo?',
        answer:
          'Sí. Tenemos experiencia integrando aplicaciones móviles y webs con Odoo para sincronizar pedidos, inventario, tracking y datos operativos en tiempo real — como en Legacy Cargo.',
      },
      {
        question: '¿Qué es Firebase y por qué lo usan?',
        answer:
          'Firebase es la plataforma de Google para autenticación, base de datos en tiempo real, notificaciones push y hosting. Ideal para apps que necesitan actualizaciones instantáneas sin recargar.',
      },
      {
        question: '¿Publican la app en App Store y Google Play?',
        answer:
          'Sí. Gestionamos el proceso de publicación o entregamos la app lista para distribución interna si es solo para su equipo.',
      },
    ],
  },
} as const satisfies Record<string, ServicePageConfig>;

export type ServicePageSlug = keyof typeof servicePages;

export const getServicePage = (slug: string): ServicePageConfig | null =>
  slug in servicePages ? servicePages[slug as ServicePageSlug] : null;

export const servicePageSlugs = Object.keys(servicePages) as ServicePageSlug[];
