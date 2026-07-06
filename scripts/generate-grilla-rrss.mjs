import XLSX from 'xlsx';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'marketing');
const outFile = join(outDir, 'grilla-contenido-informatica-gonzalez.xlsx');

mkdirSync(outDir, { recursive: true });

const feedPosts = [
  {
    '#': 1,
    Semana: 1,
    'Día sugerido': 'Viernes',
    Fecha: '',
    Tipo: 'Presentación',
    Formato: 'Imagen estática',
    Pilar: 'Humanización',
    Título: 'Somos Informática González',
    Visual:
      'Fondo oscuro #0a0a0a, logo IG centrado, tagline "Pensadores humanos. Creadores digitales.", subtítulo "Estudio de software a medida · Caracas"',
    Caption:
      'Somos Informática González 👋\n\nEstudio de desarrollo de software en Caracas.\nNo vendemos plantillas: diseñamos productos digitales a medida.\n\n✅ Sitios web y e-commerce\n✅ Apps móviles iOS & Android\n✅ Sistemas de administración\n✅ Integraciones CRM (Odoo, HubSpot, GoHighLevel)\n\n50+ proyectos entregados.\n¿Tenés una idea? Link en bio → WhatsApp.',
    Hashtags:
      '#desarrollodesoftware #softwareamedida #caracas #venezuela #informaticag #desarrolloweb #pymes #tecnologia',
    CTA: 'Link en bio → WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 2,
    Semana: 1,
    'Día sugerido': 'Lunes (siguiente)',
    Fecha: '',
    Tipo: 'Servicios',
    Formato: 'Carrusel (8 slides)',
    Pilar: 'Servicios / oferta',
    Título: 'Todo lo que construimos',
    Visual:
      'Slide 1: portada "Servicios". Slides 2-9: Sistemas de Administración, Apps Móviles, Paneles Admin, Entorno Cliente, Desarrollo Web, E-commerce, Redes Empresariales, Consultoría',
    Caption:
      '¿Qué construimos para tu negocio? 👇\n\nDeslizá y conocé nuestros servicios. Cada solución es a medida — sin plantillas, sin atajos.\n\n¿Cuál necesitás? Escríbenos por WhatsApp (link en bio).',
    Hashtags:
      '#desarrolloweb #aplicacionesmoviles #ecommerce #sistemasempresariales #softwareamedida #caracas #venezuela',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 3,
    Semana: 1,
    'Día sugerido': 'Miércoles',
    Fecha: '',
    Tipo: 'Caso de estudio',
    Formato: 'Imagen estática',
    Pilar: 'Portfolio',
    Título: 'LogiTrack — Gestión logística',
    Visual: 'Screenshot/mockup de logitrack-gold.vercel.app, fondo oscuro, logo del proyecto',
    Caption:
      'LogiTrack 📦\n\nPlataforma de gestión logística y distribución con panel operativo para control de envíos, rutas y operaciones en tiempo real.\n\nStack: Next.js · TypeScript · Vercel\n\n¿Tu negocio necesita algo similar? Hablemos 👇',
    Hashtags:
      '#logistica #softwareamedida #nextjs #typescript #desarrollodesoftware #venezuela #startup',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 4,
    Semana: 2,
    'Día sugerido': 'Lunes',
    Fecha: '',
    Tipo: 'Educativo',
    Formato: 'Carrusel (5-6 slides)',
    Pilar: 'Autoridad',
    Título: '5 señales de que necesitás un sistema propio',
    Visual: 'Fondo claro #fcfcfc, texto grande Tektur, acento azul #2563eb',
    Caption:
      '¿Tu negocio sigue en Excel y WhatsApp? 📊\n\n5 señales de que ya necesitás un sistema a medida:\n\n1. Perdés datos entre archivos\n2. No tenés reportes en tiempo real\n3. Tu equipo repite tareas manuales\n4. Los clientes no pueden autogestionarse\n5. Creciste y las herramientas no escalan\n\n¿Te identificás con alguna? Escribinos 👇',
    Hashtags:
      '#pymes #emprendedores #digitalizacion #softwareamedida #productividad #caracas #venezuela',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 5,
    Semana: 2,
    'Día sugerido': 'Miércoles',
    Fecha: '',
    Tipo: 'Caso de estudio',
    Formato: 'Imagen estática',
    Pilar: 'Portfolio',
    Título: 'Legacy Cargo — Logística internacional',
    Visual: 'Screenshot legacycargove.com, mapa/rutas VE-China-Panamá-USA',
    Caption:
      'Legacy Cargo 🌍\n\nLogística internacional Venezuela ↔ China, Panamá y USA.\nEnvíos aéreos, marítimos, terrestres, aduana y tracking en tiempo real.\n\nUn sitio que transmite confianza y operación seria.\n\n¿Tu empresa mueve carga internacional? Conversemos.',
    Hashtags:
      '#logistica #comercioexterior #desarrolloweb #tracking #venezuela #softwareamedida',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 6,
    Semana: 2,
    'Día sugerido': 'Viernes',
    Fecha: '',
    Tipo: 'Servicios',
    Formato: 'Imagen estática',
    Pilar: 'Servicios / oferta',
    Título: 'Integraciones CRM',
    Visual: 'Logos Odoo, HubSpot, GoHighLevel sobre fondo oscuro',
    Caption:
      'Tu CRM conectado a todo 🔗\n\nImplementamos e integramos:\n\n🔹 Odoo — ERP, inventario, facturación\n🔹 HubSpot — marketing, pipelines, automatización\n🔹 GoHighLevel — funnels, WhatsApp, SMS\n\nTu web, tu app y tu CRM hablando entre sí.\n\nConsulta sin compromiso → link en bio.',
    Hashtags:
      '#crm #odoo #hubspot #gohighlevel #automatizacion #whatsapp #marketingdigital #venezuela',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 7,
    Semana: 3,
    'Día sugerido': 'Lunes',
    Fecha: '',
    Tipo: 'Caso de estudio',
    Formato: 'Imagen estática',
    Pilar: 'Portfolio',
    Título: 'Soluciones CGT — E-commerce tech',
    Visual: 'Screenshot solucionescgt.com, enfoque en catálogo PCs',
    Caption:
      'Soluciones CGT 💻\n\nE-commerce tecnológico para armar PCs, elegir equipos pre-armados y laptops — con asesoramiento inteligente integrado.\n\nVender online no es solo un catálogo: es experiencia de compra.\n\n¿Querés una tienda que convierta? Hablemos.',
    Hashtags:
      '#ecommerce #tiendaonline #desarrolloweb #nextjs #tecnologia #venezuela #pymes',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 8,
    Semana: 3,
    'Día sugerido': 'Miércoles',
    Fecha: '',
    Tipo: 'Educativo',
    Formato: 'Carrusel (4 slides)',
    Pilar: 'Autoridad',
    Título: '¿Página web o tienda online?',
    Visual: 'Comparativa lado a lado, fondo claro, iconos minimalistas',
    Caption:
      '¿Web corporativa o e-commerce? 🤔\n\nNo es lo mismo — y elegir mal cuesta tiempo y dinero.\n\n📄 Web corporativa → presencia, credibilidad, contacto\n🛒 E-commerce → catálogo, pagos, inventario, conversión\n\n¿No sabés cuál necesitás? Te asesoramos gratis → WhatsApp en bio.',
    Hashtags:
      '#desarrolloweb #ecommerce #emprendedores #pymes #digitalizacion #caracas',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 9,
    Semana: 3,
    'Día sugerido': 'Viernes',
    Fecha: '',
    Tipo: 'Caso de estudio',
    Formato: 'Imagen estática',
    Pilar: 'Portfolio',
    Título: 'Hemodinamia HCC — Sitio médico',
    Visual: 'Screenshot laboratoriohemodinamia.vercel.app',
    Caption:
      'Laboratorio Hemodinamia HCC ❤️\n\nSitio institucional para cardiología intervencionista: procedimientos, directorio médico, blog, galería y contacto.\n\n"Al Lado de tu Corazón"\n\nSectores como salud necesitan confianza digital. Nosotros la construimos.',
    Hashtags:
      '#salud #medicina #desarrolloweb #sitioinstitucional #caracas #venezuela #softwareamedida',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
  {
    '#': 10,
    Semana: 4,
    'Día sugerido': 'Lunes',
    Fecha: '',
    Tipo: 'Autoridad',
    Formato: 'Imagen estática',
    Pilar: 'Autoridad',
    Título: 'Nuestro stack tecnológico',
    Visual: 'Grid de logos: React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, Firebase, AWS, Vercel, Docker, Tailwind, Odoo',
    Caption:
      'Tecnología que escala 🚀\n\nTrabajamos con herramientas modernas y probadas:\n\nReact · Next.js · TypeScript · Node.js\nMongoDB · PostgreSQL · Firebase · AWS\nVercel · Docker · Tailwind CSS · Odoo\n\nNo usamos moda pasajera — usamos lo que funciona en producción.',
    Hashtags:
      '#react #nextjs #typescript #nodejs #desarrollodesoftware #tech #venezuela #fullstack',
    CTA: '—',
    Estado: 'Pendiente',
  },
  {
    '#': 11,
    Semana: 4,
    'Día sugerido': 'Miércoles',
    Fecha: '',
    Tipo: 'CTA directo',
    Formato: 'Imagen estática',
    Pilar: 'Servicios / oferta',
    Título: '¿Tenés una idea?',
    Visual: 'Fondo azul #2563eb, texto blanco bold "Hablemos de ideas.", botón WhatsApp',
    Caption:
      '¿Tenés un proyecto en mente? 💡\n\nContanos tu idea — sin compromiso, sin presión.\n\n📱 WhatsApp: link en bio\n📧 contacto@informaticagonzalez.com\n🌐 informaticagonzalez.com\n\n50+ proyectos entregados. El siguiente puede ser el tuyo.',
    Hashtags:
      '#softwareamedida #desarrollodesoftware #caracas #venezuela #emprendedores #pymes #hablemos',
    CTA: 'WhatsApp + email',
    Estado: 'Pendiente',
  },
  {
    '#': 12,
    Semana: 4,
    'Día sugerido': 'Viernes',
    Fecha: '',
    Tipo: 'Caso de estudio',
    Formato: 'Imagen estática',
    Pilar: 'Portfolio',
    Título: 'Sol y Sombra — Web corporativa',
    Visual: 'Screenshot solsombratoldos.com',
    Caption:
      'Sol y Sombra — Toldos & Persianas ☀️\n\nSitio corporativo con catálogo de productos, servicios de mantenimiento y formulario de contacto.\n\nNo hace falta ser una tech company para tener una web profesional.\n\n¿Tu negocio necesita presencia digital? Escribinos 👇',
    Hashtags:
      '#desarrolloweb #pymes #emprendedores #caracas #venezuela #sitioinstitucional #softwareamedida',
    CTA: 'WhatsApp',
    Estado: 'Pendiente',
  },
];

const calendarioSemanal = [
  { Día: 'Lunes', Feed: 'Educativo / tip', Stories: 'Encuesta: "¿Tu negocio usa Excel o sistema?"', Reels: '—' },
  { Día: 'Martes', Feed: '—', Stories: 'Behind the scenes / "Qué estamos construyendo"', Reels: '—' },
  { Día: 'Miércoles', Feed: 'Caso de estudio / proyecto', Stories: 'Screen recording 15s del proyecto', Reels: 'Scroll reveal del sitio web (15-30s)' },
  { Día: 'Jueves', Feed: '—', Stories: 'Tip rápido en texto', Reels: '—' },
  { Día: 'Viernes', Feed: 'Servicio o CTA', Stories: 'Link sticker → WhatsApp', Reels: '"3 cosas que hace un buen sistema" (30s)' },
  { Día: 'Sábado', Feed: '—', Stories: 'Republish mejor post de la semana', Reels: '—' },
  { Día: 'Domingo', Feed: '—', Stories: 'Descanso o repost en Stories', Reels: '—' },
];

const reels = [
  { '#': 1, Semana: 1, Idea: 'Scroll reveal de informaticagonzalez.com', Duración: '15-30s', Música: 'Trending / lo-fi tech', CTA: 'WhatsApp en bio' },
  { '#': 2, Semana: 2, Idea: 'POV: tu competencia ya tiene app y vos no', Duración: '15s', Música: 'Trending', CTA: 'WhatsApp' },
  { '#': 3, Semana: 3, Idea: 'Antes (Excel caótico) vs Después (panel LogiTrack)', Duración: '20-30s', Música: 'Transición', CTA: 'WhatsApp' },
  { '#': 4, Semana: 3, Idea: 'Qué es Odoo en 30 segundos', Duración: '30s', Música: 'Informativo', CTA: 'Consulta gratis' },
  { '#': 5, Semana: 4, Idea: '5 señales que necesitás un sistema propio', Duración: '30-45s', Música: 'Trending', CTA: 'WhatsApp' },
  { '#': 6, Semana: 4, Idea: 'Timelapse diseño → código → deploy', Duración: '20s', Música: 'Lo-fi', CTA: 'Link en bio' },
];

const highlights = [
  { Highlight: 'Proyectos', Contenido: 'Capturas LogiTrack, Legacy, CGT, Hemodinamia, Sol y Sombra, Mundialito' },
  { Highlight: 'Servicios', Contenido: '1 slide por servicio (8 total)' },
  { Highlight: 'CRM', Contenido: 'Odoo · HubSpot · GoHighLevel — qué hacemos con cada uno' },
  { Highlight: 'Stack', Contenido: 'Logos React, Next.js, TypeScript, Node, etc.' },
  { Highlight: 'Studio', Contenido: 'Equipo, valores, Caracas, 50+ proyectos' },
  { Highlight: 'Clientes', Contenido: 'Testimonios (agregar cuando estén disponibles)' },
];

const kpis = [
  { Métrica: 'Publicaciones feed (mes 1)', Meta: '12' },
  { Métrica: 'Reels (mes 1)', Meta: '4-6' },
  { Métrica: 'Seguidores orgánicos', Meta: '80-150' },
  { Métrica: 'Clics link bio', Meta: '20+' },
  { Métrica: 'Conversaciones WhatsApp desde IG', Meta: '3-5' },
  { Métrica: 'Guardados por post educativo', Meta: '> likes (señal de valor)' },
];

const marca = [
  { Campo: 'Nombre', Valor: 'Informática González' },
  { Campo: 'Tagline', Valor: 'Pensadores humanos. Creadores digitales.' },
  { Campo: 'Web', Valor: 'https://www.informaticagonzalez.com' },
  { Campo: 'WhatsApp', Valor: 'https://wa.link/p20o4u' },
  { Campo: 'Email', Valor: 'contacto@informaticagonzalez.com' },
  { Campo: 'Instagram', Valor: 'https://www.instagram.com/informatica.gonzalez' },
  { Campo: 'Facebook', Valor: 'https://www.facebook.com/share/1FBoqnXEMC/' },
  { Campo: 'Color fondo oscuro', Valor: '#0a0a0a' },
  { Campo: 'Color fondo claro', Valor: '#fcfcfc' },
  { Campo: 'Color acento', Valor: '#2563eb' },
  { Campo: 'Tipografía títulos', Valor: 'Tektur' },
  { Campo: 'Tipografía cuerpo', Valor: 'Roboto / Inter' },
  { Campo: 'Frecuencia feed', Valor: '3 posts/semana (Lun, Mié, Vie)' },
  { Campo: 'CTA principal', Valor: 'WhatsApp — consulta sin compromiso' },
];

const wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(feedPosts), 'Grilla Feed');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(calendarioSemanal), 'Calendario Semanal');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(reels), 'Reels');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(highlights), 'Highlights');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(kpis), 'KPIs Mes 1');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(marca), 'Marca');

// Column widths
wb.Sheets['Grilla Feed']['!cols'] = [
  { wch: 4 },
  { wch: 8 },
  { wch: 18 },
  { wch: 12 },
  { wch: 16 },
  { wch: 18 },
  { wch: 18 },
  { wch: 35 },
  { wch: 55 },
  { wch: 60 },
  { wch: 55 },
  { wch: 22 },
  { wch: 12 },
];

XLSX.writeFile(wb, outFile);
console.log(`Archivo creado: ${outFile}`);
