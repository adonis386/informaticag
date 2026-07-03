export type CrmPlatform = {
  name: string;
  slug?: string;
  icon?: string;
  description: string;
  capabilities: readonly string[];
};

export const crmPlatforms: readonly CrmPlatform[] = [
  {
    name: 'Odoo',
    slug: 'odoo',
    description:
      'ERP open source todo-en-uno: ventas, inventario, contabilidad, RRHH y más — implementación, personalización y módulos a medida.',
    capabilities: ['ERP & inventario', 'Facturación', 'Módulos custom'],
  },
  {
    name: 'HubSpot',
    slug: 'hubspot',
    description:
      'CRM de marketing y ventas: embudos, automatización de email, pipelines comerciales e integración con su sitio web y apps.',
    capabilities: ['Marketing automation', 'Pipelines', 'Formularios & APIs'],
  },
  {
    name: 'GoHighLevel',
    icon: '/assets/tools/gohighlevel.svg',
    description:
      'Plataforma todo-en-uno para agencias: CRM, funnels, SMS, WhatsApp, calendarios y automatizaciones de captación y seguimiento.',
    capabilities: ['Funnels', 'WhatsApp & SMS', 'Automatizaciones'],
  },
] as const;

export const crmIconUrl = (platform: CrmPlatform) =>
  platform.icon ?? `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${platform.slug}.svg`;
