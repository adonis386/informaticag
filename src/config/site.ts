export const siteConfig = {
  name: 'Informática González',
  email: 'contacto@informaticagonzalez.com',
  phone: '+58 412 366 8513',
  whatsapp: 'https://wa.link/p20o4u',
  social: {
    facebook: 'https://www.facebook.com/share/1FBoqnXEMC/',
    instagram: 'https://www.instagram.com/informatica.gonzalez?igsh=Y21lMmtrZ3p3dnM3',
    whatsapp: 'https://wa.link/9fgi2d',
  },
} as const;

/** Nav estilo agencia: pocos ítems, CTA claro (como Cappen: Works · About · Start Project) */
export const mainNav = [
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Studio', href: '/#nosotros' },
] as const;

export const footerNav = [
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Studio', href: '/#nosotros' },
  { label: 'Hablemos', href: '/contacto' },
] as const;

/**
 * Orden visual-first (portfolio → servicios → credibilidad → conversión)
 * Igual que Cappen, ++hellohello, DockYard: impacto antes que texto.
 */
export const sectionOrder = [
  'hero',
  'statement',
  'marquee',
  'works',
  'services',
  'studio',
  'cta',
] as const;
