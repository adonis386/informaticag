import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'stories');

mkdirSync(outDir, { recursive: true });

const WIDTH = 1080;
const HEIGHT = 1920;
const LOGO_WIDTH = 180;
const CENTER_X = WIDTH / 2;

const fontFiles = [
  join(root, 'public/fonts/Tektur/static/Tektur-Bold.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-Regular.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-SemiBold.ttf'),
];

const stories = {
  lunes: {
    file: 'lunes-encuesta-excel-sistema.png',
    type: 'encuesta-excel',
    label: 'Encuesta',
    title: '¿Tu negocio usa',
    highlight: 'Excel o sistema?',
  },
  martes: {
    file: 'martes-behind-the-scenes.png',
    type: 'default',
    label: 'Studio',
    title: 'Qué estamos',
    highlight: 'construyendo',
    subtitle: 'Software a medida en producción',
  },
  miercoles: {
    file: 'miercoles-caso-estudio.png',
    type: 'default',
    label: 'Proyecto',
    title: 'Caso de estudio',
    highlight: 'en producción',
    subtitle: 'Proyectos reales, resultados reales',
  },
  jueves: {
    file: 'jueves-tip-rapido.png',
    type: 'default',
    label: 'Tip',
    title: 'Un buen sistema',
    highlight: 'ahorra tiempo',
    subtitle: 'Automatiza lo repetitivo. Enfócate en crecer.',
  },
  viernes: {
    file: 'viernes-whatsapp-cta.png',
    type: 'default',
    label: 'Consulta',
    title: '¿Tienes un',
    highlight: 'proyecto en mente?',
    subtitle: 'Escríbenos por WhatsApp',
    footer: 'Link en bio',
  },
};

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const renderSvg = (svg, width = WIDTH) => {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: 'Tektur',
    },
  });

  return Buffer.from(resvg.render().asPng());
};

const buildDefaultBackgroundSvg = () => `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="28%" r="60%">
        <stop offset="0%" stop-color="#2563eb" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0a0a"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
    <line x1="120" y1="360" x2="280" y2="360" stroke="#2563eb" stroke-width="4"/>
    <rect x="120" y="1680" width="840" height="1" fill="#262626"/>
  </svg>
`;

const buildEncuestaBackgroundSvg = () => `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glowGreen" cx="50%" cy="58%" r="45%">
        <stop offset="0%" stop-color="#107C41" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M48 0H0V48" fill="none" stroke="#1f2937" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0a0a"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" opacity="0.35"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowGreen)"/>
    <circle cx="${CENTER_X}" cy="1080" r="240" fill="none" stroke="#107C41" stroke-width="1" opacity="0.18"/>
    <line x1="120" y1="390" x2="300" y2="390" stroke="#2563eb" stroke-width="4"/>
    <rect x="120" y="1760" width="840" height="1" fill="#262626"/>
  </svg>
`;

const buildExcelIconSvg = (size = 220) => `
  <svg width="${size}" height="${size}" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="excelBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#33C481"/>
        <stop offset="100%" stop-color="#0B5C2E"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.45"/>
      </filter>
    </defs>
    <rect x="18" y="18" width="184" height="184" rx="28" fill="#111827" stroke="#1f2937" stroke-width="2"/>
    <rect x="34" y="34" width="152" height="152" rx="20" fill="url(#excelBg)" filter="url(#shadow)"/>
    <path d="M78 66 L110 110 L78 154 H98 L118 124 L138 154 H158 L126 110 L158 66 H138 L118 96 L98 66 Z" fill="#ffffff"/>
    <rect x="44" y="44" width="36" height="4" rx="2" fill="#ffffff" opacity="0.35"/>
    <rect x="44" y="54" width="24" height="4" rx="2" fill="#ffffff" opacity="0.25"/>
    <rect x="44" y="64" width="30" height="4" rx="2" fill="#ffffff" opacity="0.25"/>
  </svg>
`;

const buildDefaultTextSvg = (story) => {
  const footer = story.footer
    ? `<text x="${CENTER_X}" y="1760" text-anchor="middle" font-family="Tektur" font-weight="600" font-size="26" fill="#2563eb" letter-spacing="4">${escapeXml(story.footer.toUpperCase())}</text>`
    : `<text x="${CENTER_X}" y="1760" text-anchor="middle" font-family="Tektur" font-weight="400" font-size="24" fill="#525252">informaticagonzalez.com</text>`;

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <text x="120" y="420" font-family="Tektur" font-weight="600" font-size="28" fill="#2563eb" letter-spacing="8">${escapeXml(story.label.toUpperCase())}</text>
      <text x="${CENTER_X}" y="760" text-anchor="middle" font-family="Tektur" font-weight="700" font-size="72" fill="#fcfcfc">${escapeXml(story.title)}</text>
      <text x="${CENTER_X}" y="860" text-anchor="middle" font-family="Tektur" font-weight="700" font-size="72" fill="#2563eb">${escapeXml(story.highlight)}</text>
      <text x="${CENTER_X}" y="980" text-anchor="middle" font-family="Tektur" font-weight="400" font-size="32" fill="#a3a3a3">${escapeXml(story.subtitle ?? '')}</text>
      ${footer}
    </svg>
  `;
};

const buildEncuestaTextSvg = (story) => `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <text x="120" y="450" font-family="Tektur" font-weight="600" font-size="28" fill="#2563eb" letter-spacing="8">${escapeXml(story.label.toUpperCase())}</text>
    <text x="${CENTER_X}" y="700" text-anchor="middle" font-family="Tektur" font-weight="700" font-size="68" fill="#fcfcfc">${escapeXml(story.title)}</text>
    <text x="${CENTER_X}" y="1420" text-anchor="middle" font-family="Tektur" font-weight="700" font-size="68" fill="#2563eb">${escapeXml(story.highlight)}</text>
    <text x="${CENTER_X}" y="1810" text-anchor="middle" font-family="Tektur" font-weight="400" font-size="24" fill="#525252">informaticagonzalez.com</text>
  </svg>
`;

const dayArg = process.argv[2]?.toLowerCase();
const dayMap = {
  lunes: 'lunes',
  monday: 'lunes',
  martes: 'martes',
  tuesday: 'martes',
  miercoles: 'miercoles',
  miércoles: 'miercoles',
  wednesday: 'miercoles',
  jueves: 'jueves',
  thursday: 'jueves',
  viernes: 'viernes',
  friday: 'viernes',
};

const autoDay = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'sábado'][
  new Date().getDay()
];

const selectedDay = dayMap[dayArg] ?? autoDay;
const story = stories[selectedDay];

if (!story) {
  console.error(`Día no válido. Usa: ${Object.keys(stories).join(', ')}`);
  process.exit(1);
}

const logoPrepared = await sharp(join(root, 'public/assets/logo-3.webp'))
  .resize(LOGO_WIDTH, null, { fit: 'inside' })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoPrepared).metadata();
const logoTop = 140;
const logoLeft = Math.round((WIDTH - logoMeta.width) / 2);
const outputPath = join(outDir, story.file);

if (story.type === 'encuesta-excel') {
  const iconSize = 260;
  const excelIcon = renderSvg(buildExcelIconSvg(iconSize), iconSize);

  const iconY = 900;
  const excelLeft = Math.round((WIDTH - iconSize) / 2);

  const background = await sharp(Buffer.from(buildEncuestaBackgroundSvg())).png().toBuffer();
  const textLayer = renderSvg(buildEncuestaTextSvg(story));

  await sharp(background)
    .composite([
      { input: excelIcon, top: iconY, left: excelLeft },
      { input: textLayer, top: 0, left: 0 },
      { input: logoPrepared, top: logoTop, left: logoLeft },
    ])
    .png()
    .toFile(outputPath);
} else {
  const background = await sharp(Buffer.from(buildDefaultBackgroundSvg())).png().toBuffer();
  const textLayer = renderSvg(buildDefaultTextSvg(story));

  await sharp(background)
    .composite([
      { input: logoPrepared, top: logoTop, left: logoLeft },
      { input: textLayer, top: 0, left: 0 },
    ])
    .png()
    .toFile(outputPath);
}

console.log(`✓ ${story.file}`);
console.log(`\nHistoria generada en: ${outputPath}`);
console.log(`Día: ${selectedDay}`);
