import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'carousel-servicios');

mkdirSync(outDir, { recursive: true });

const SIZE = 1080;
const LOGO_WIDTH = 200;

const tekturBoldPath = join(root, 'public/fonts/Tektur/static/Tektur-Bold.ttf');
const tekturRegularPath = join(root, 'public/fonts/Tektur/static/Tektur-Regular.ttf');
const tekturSemiBoldPath = join(root, 'public/fonts/Tektur/static/Tektur-SemiBold.ttf');

const fontFiles = [tekturBoldPath, tekturRegularPath, tekturSemiBoldPath];

const slides = [
  {
    file: '01-portada-servicios.png',
    variant: 'cover',
    number: null,
    title: 'Servicios',
    highlight: 'Hecho para operar.',
    lines: ['Software a medida.'],
    tags: [],
    footer: 'Desliza →',
  },
  {
    file: '02-sistemas-administracion.png',
    variant: 'service',
    number: '01',
    title: 'Sistemas de',
    highlight: 'Administración',
    lines: [
      'Plataformas con bases de datos centralizadas,',
      'procesos internos y reportes en tiempo real.',
    ],
    tags: ['Bases de datos', 'Backup', 'Reportes'],
  },
  {
    file: '03-aplicaciones-moviles.png',
    variant: 'service',
    number: '02',
    title: 'Aplicaciones',
    highlight: 'Móviles',
    lines: [
      'Apps iOS y Android con diseño intuitivo,',
      'notificaciones y sincronización en la nube.',
    ],
    tags: ['iOS & Android', 'Tiempo real', 'APIs'],
  },
  {
    file: '04-paneles-administrativos.png',
    variant: 'service',
    number: '03',
    title: 'Paneles',
    highlight: 'Administrativos',
    lines: [
      'Control de usuarios, permisos, configuración',
      'y monitoreo operativo en un solo lugar.',
    ],
    tags: ['Roles', 'Dashboards', 'Control'],
  },
  {
    file: '05-entorno-cliente.png',
    variant: 'service',
    number: '04',
    title: 'Entorno',
    highlight: 'Cliente',
    lines: [
      'Portales seguros para que sus clientes accedan',
      'a datos, documentos y seguimiento de procesos.',
    ],
    tags: ['Portal web', 'Autogestión', 'Seguridad'],
  },
  {
    file: '06-desarrollo-web.png',
    variant: 'service',
    number: '05',
    title: 'Desarrollo',
    highlight: 'Web',
    lines: [
      'Sitios y apps web con React, Node.js y TypeScript',
      '— rápidos, responsivos y listos para convertir.',
    ],
    tags: ['React', 'Node.js', 'TypeScript'],
  },
  {
    file: '07-ecommerce.png',
    variant: 'service',
    number: '06',
    title: 'E-commerce',
    highlight: 'Tiendas online',
    lines: [
      'Catálogo, inventario, pagos seguros y una',
      'experiencia de compra diseñada para vender.',
    ],
    tags: ['Pagos', 'Inventario', 'Conversión'],
  },
  {
    file: '08-redes-empresariales.png',
    variant: 'service',
    number: '07',
    title: 'Redes',
    highlight: 'Empresariales',
    lines: [
      'Infraestructura de red para conectividad,',
      'seguridad y operación confiable en su empresa.',
    ],
    tags: ['Infraestructura', 'Seguridad', 'Soporte'],
  },
  {
    file: '09-consultoria-tecnologica.png',
    variant: 'cta',
    number: '08',
    title: 'Consultoría',
    highlight: 'Tecnológica',
    lines: [
      'Arquitectura, stack, integraciones y roadmap',
      'para llevar su producto de la idea a producción.',
    ],
    tags: ['Estrategia', 'Arquitectura', 'Roadmap'],
    footer: 'WhatsApp en bio →',
  },
];

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildBackgroundSvg = (variant, accentLineY) => {
  const accentGlow =
    variant === 'cover'
      ? `<radialGradient id="glow" cx="50%" cy="35%" r="55%">
           <stop offset="0%" stop-color="#2563eb" stop-opacity="0.35"/>
           <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
         </radialGradient>`
      : `<radialGradient id="glow" cx="85%" cy="15%" r="45%">
           <stop offset="0%" stop-color="#2563eb" stop-opacity="0.22"/>
           <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
         </radialGradient>`;

  return Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>${accentGlow}</defs>
      <rect width="${SIZE}" height="${SIZE}" fill="#0a0a0a"/>
      <rect width="${SIZE}" height="${SIZE}" fill="url(#glow)"/>
      <line x1="80" y1="${accentLineY}" x2="220" y2="${accentLineY}" stroke="#2563eb" stroke-width="4"/>
      <rect x="80" y="920" width="920" height="1" fill="#262626"/>
    </svg>
  `);
};

const buildTextSvg = (slide, layout) => {
  const { titleY, numberY, linesStartY } = layout;

  const numberBlock =
    slide.number != null
      ? `<text x="80" y="${numberY}" font-family="Tektur" font-weight="600" font-size="30" fill="#2563eb" letter-spacing="10">${escapeXml(slide.number)}</text>`
      : '';

  const lineElements = slide.lines
    .map(
      (line, index) =>
        `<text x="80" y="${linesStartY + index * 40}" font-family="Tektur" font-weight="400" font-size="28" fill="#a3a3a3">${escapeXml(line)}</text>`,
    )
    .join('');

  const tagStartX = 80;
  let tagX = tagStartX;
  const tagY = 780;
  const tagElements = slide.tags
    .map((tag) => {
      const width = tag.length * 12 + 48;
      const element = `
        <rect x="${tagX}" y="${tagY}" width="${width}" height="46" fill="none" stroke="#404040" stroke-width="1.5"/>
        <text x="${tagX + 24}" y="${tagY + 30}" font-family="Tektur" font-weight="600" font-size="17" fill="#d4d4d4" letter-spacing="2">${escapeXml(tag.toUpperCase())}</text>
      `;
      tagX += width + 16;
      return element;
    })
    .join('');

  const footer = slide.footer
    ? `<text x="80" y="980" font-family="Tektur" font-weight="600" font-size="24" fill="#2563eb" letter-spacing="4">${escapeXml(slide.footer.toUpperCase())}</text>`
    : `<text x="80" y="980" font-family="Tektur" font-weight="400" font-size="22" fill="#525252">informaticagonzalez.com</text>`;

  return Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      ${numberBlock}
      <text x="80" y="${titleY}" font-family="Tektur" font-weight="700" font-size="72" fill="#fcfcfc">${escapeXml(slide.title)}</text>
      <text x="80" y="${titleY + 82}" font-family="Tektur" font-weight="700" font-size="72" fill="#2563eb">${escapeXml(slide.highlight)}</text>
      ${lineElements}
      ${tagElements}
      ${footer}
    </svg>
  `);
};

const renderTextLayer = (svg) => {
  const resvg = new Resvg(svg.toString('utf8'), {
    fitTo: { mode: 'width', value: SIZE },
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: 'Tektur',
    },
  });

  return Buffer.from(resvg.render().asPng());
};

const logoPrepared = await sharp(join(root, 'public/assets/logo-3.webp'))
  .resize(LOGO_WIDTH, null, { fit: 'inside' })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoPrepared).metadata();
const logoTop = 56;
const logoLeft = Math.round((SIZE - logoMeta.width) / 2);
const accentLineY = logoTop + logoMeta.height + 36;
const numberY = accentLineY + 56;
const titleY = (slideHasNumber) => (slideHasNumber ? numberY + 96 : accentLineY + 72);
const linesStartY = (baseTitleY) => baseTitleY + 188;

for (const slide of slides) {
  const currentTitleY = titleY(slide.number != null);
  const layout = {
    titleY: currentTitleY,
    numberY,
    linesStartY: linesStartY(currentTitleY),
  };

  const background = await sharp(buildBackgroundSvg(slide.variant, accentLineY)).png().toBuffer();
  const textLayer = renderTextLayer(buildTextSvg(slide, layout));

  const outputPath = join(outDir, slide.file);

  await sharp(background)
    .composite([
      { input: logoPrepared, top: logoTop, left: logoLeft },
      { input: textLayer, top: 0, left: 0 },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ ${slide.file}`);
}

console.log(`\nCarrusel generado en: ${outDir}`);
