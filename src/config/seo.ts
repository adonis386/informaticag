import { siteConfig } from './site';

/** URL canónica de producción (www) */
export const SITE_URL = 'https://www.informaticagonzalez.com';

export const seoConfig = {
  siteName: siteConfig.name,
  siteUrl: SITE_URL,
  locale: 'es_VE',
  language: 'es-VE',

  defaultTitle:
    'Desarrollo de Software a Medida en Venezuela | Informática González',
  titleSuffix: 'Informática González',

  description:
    'Estudio de desarrollo de software en Caracas, Venezuela. Apps móviles, sistemas empresariales, e-commerce e integraciones CRM con Odoo, HubSpot y GoHighLevel.',

  keywords: [
    'desarrollo de software Venezuela',
    'desarrollo web Caracas',
    'software a medida',
    'sistemas empresariales',
    'aplicaciones móviles',
    'integración CRM',
    'Odoo Venezuela',
    'HubSpot',
    'GoHighLevel',
    'e-commerce',
    'Informática González',
  ].join(', '),

  logo: `${SITE_URL}/assets/logo-3.webp`,
  ogImage: `${SITE_URL}/assets/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'Informática González — desarrollo de software a medida',

  twitterHandle: '',

  address: {
    streetAddress: 'Av. Las Fuentes, El Paraíso',
    addressLocality: 'Caracas',
    addressRegion: 'Distrito Capital',
    postalCode: '1020',
    addressCountry: 'VE',
  },

  geo: {
    region: 'VE-A',
    placename: 'Caracas',
    position: '10.4806;-66.9036',
  },

  services: [
    'Desarrollo de software a medida',
    'Aplicaciones móviles',
    'Sistemas de administración',
    'Desarrollo web',
    'E-commerce',
    'Integraciones CRM',
    'Consultoría tecnológica',
  ],
} as const;

export const privacySeo = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad de Informática González. Conozca cómo recopilamos, usamos y protegemos su información personal.',
  robots: 'noindex, follow',
} as const;

const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: seoConfig.siteName,
  url: SITE_URL,
  logo: seoConfig.logo,
  image: seoConfig.ogImage,
  description: seoConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    ...seoConfig.address,
  },
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.whatsapp,
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Venezuela',
  },
});

const webSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: seoConfig.siteName,
  url: SITE_URL,
  description: seoConfig.description,
  inLanguage: 'es-VE',
  publisher: { '@id': `${SITE_URL}/#organization` },
});

const professionalServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#service`,
  name: seoConfig.siteName,
  url: SITE_URL,
  image: seoConfig.ogImage,
  logo: seoConfig.logo,
  description: seoConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    ...seoConfig.address,
  },
  areaServed: ['Venezuela', 'Caracas', 'Latinoamérica'],
  serviceType: seoConfig.services,
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Odoo',
    'HubSpot',
    'GoHighLevel',
  ],
});

export const structuredDataGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [organizationSchema(), webSiteSchema(), professionalServiceSchema()],
});

export const buildSeoHead = (options?: { title?: string; description?: string; robots?: string }) => {
  const title = options?.title ?? seoConfig.defaultTitle;
  const description = options?.description ?? seoConfig.description;
  const robots = options?.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const jsonLd = JSON.stringify(structuredDataGraph()).replace(/</g, '\\u003c');

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${seoConfig.keywords}" />
    <meta name="author" content="${seoConfig.siteName}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${SITE_URL}/" />
    <meta name="theme-color" content="#2563eb" />

    <meta name="geo.region" content="${seoConfig.geo.region}" />
    <meta name="geo.placename" content="${seoConfig.geo.placename}" />
    <meta name="geo.position" content="${seoConfig.geo.position}" />
    <meta name="ICBM" content="${seoConfig.geo.position.replace(';', ', ')}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${seoConfig.siteName}" />
    <meta property="og:locale" content="${seoConfig.locale}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${SITE_URL}/" />
    <meta property="og:image" content="${seoConfig.ogImage}" />
    <meta property="og:image:width" content="${seoConfig.ogImageWidth}" />
    <meta property="og:image:height" content="${seoConfig.ogImageHeight}" />
    <meta property="og:image:type" content="${seoConfig.ogImageType}" />
    <meta property="og:image:alt" content="${seoConfig.ogImageAlt}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${seoConfig.ogImage}" />
    <meta name="twitter:image:alt" content="${seoConfig.ogImageAlt}" />

    <script type="application/ld+json">${jsonLd}</script>
  `.trim();
};

export const buildSeoNoscript = () => `
  <noscript>
    <article>
      <h1>${seoConfig.siteName} — Desarrollo de software a medida en Venezuela</h1>
      <p>${seoConfig.description}</p>
      <h2>Servicios</h2>
      <ul>
        ${seoConfig.services.map((s) => `<li>${s}</li>`).join('')}
      </ul>
      <p>Contacto: <a href="mailto:${siteConfig.email}">${siteConfig.email}</a> · ${siteConfig.phone}</p>
    </article>
  </noscript>
`.trim();
