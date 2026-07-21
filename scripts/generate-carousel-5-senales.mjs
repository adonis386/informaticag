import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'carousel-5-senales');

mkdirSync(outDir, { recursive: true });

const SIZE = 1080;
const LOGO_WIDTH = 180;

const fontFiles = [
  join(root, 'public/fonts/Tektur/static/Tektur-Bold.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-Regular.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-SemiBold.ttf'),
];

/** Español neutro · Post educativo lunes (grilla #4) */
const slides = [
  {
    file: '01-portada.png',
    variant: 'cover',
    icon: 'cover',
    number: null,
    eyebrow: 'Educativo',
    title: '5 señales de que',
    highlight: 'necesitas un sistema',
    lines: [
      'Si tu negocio aún vive en Excel',
      'y WhatsApp, ya es hora de un',
      'sistema empresarial.',
    ],
    footer: 'Desliza →',
  },
  {
    file: '02-pierdes-datos.png',
    variant: 'signal',
    icon: 'files',
    number: '01',
    title: 'Pierdes datos',
    highlight: 'entre archivos',
    lines: [
      'Información repartida en hojas, chats',
      'y carpetas. Nadie sabe cuál es la',
      'versión correcta.',
    ],
  },
  {
    file: '03-sin-reportes.png',
    variant: 'signal',
    icon: 'chart',
    number: '02',
    title: 'No tienes reportes',
    highlight: 'en tiempo real',
    lines: [
      'Para saber cómo va el negocio hay que',
      'armar tablas a mano. Las decisiones',
      'llegan tarde.',
    ],
  },
  {
    file: '04-tareas-manuales.png',
    variant: 'signal',
    icon: 'repeat',
    number: '03',
    title: 'Tu equipo repite',
    highlight: 'tareas manuales',
    lines: [
      'Copiar, pegar, buscar, reescribir.',
      'Horas que podrían ir a ventas,',
      'atención o crecimiento.',
    ],
  },
  {
    file: '05-sin-autogestion.png',
    variant: 'signal',
    icon: 'portal',
    number: '04',
    title: 'Tus clientes no',
    highlight: 'pueden autogestionarse',
    lines: [
      'Todo pasa por un mensaje o una llamada.',
      'Sin portal, sin seguimiento, sin',
      'autoservicio.',
    ],
  },
  {
    file: '06-no-escala.png',
    variant: 'cta',
    icon: 'scale',
    number: '05',
    title: 'Creciste y las',
    highlight: 'herramientas no escalan',
    lines: [
      'Lo que funcionaba con 5 clientes',
      'se rompe con 50. Es momento de',
      'un sistema empresarial.',
    ],
    footer: 'WhatsApp en bio →',
  },
];

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Ilustraciones geométricas brand (esquina superior derecha) */
const ILLUSTRATION_SIZE = 280;

const buildIllustrationSvg = (icon) => {
  const base = `
    <svg width="360" height="360" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.16"/>
          <stop offset="100%" stop-color="#2563eb" stop-opacity="0.03"/>
        </linearGradient>
      </defs>
      <circle cx="180" cy="180" r="150" fill="url(#g)"/>
  `;

  const icons = {
    cover: `
      ${base}
        <!-- hoja / chat caótico -->
        <rect x="70" y="90" width="130" height="160" rx="10" fill="#fff" stroke="#2563eb" stroke-width="3"/>
        <line x1="90" y1="120" x2="180" y2="120" stroke="#93c5fd" stroke-width="6" stroke-linecap="round"/>
        <line x1="90" y1="145" x2="165" y2="145" stroke="#bfdbfe" stroke-width="6" stroke-linecap="round"/>
        <line x1="90" y1="170" x2="175" y2="170" stroke="#bfdbfe" stroke-width="6" stroke-linecap="round"/>
        <line x1="90" y1="195" x2="150" y2="195" stroke="#bfdbfe" stroke-width="6" stroke-linecap="round"/>
        <rect x="175" y="150" width="110" height="70" rx="18" fill="#2563eb"/>
        <rect x="190" y="168" width="70" height="8" rx="4" fill="#fff" opacity="0.9"/>
        <rect x="190" y="186" width="50" height="8" rx="4" fill="#fff" opacity="0.55"/>
        <circle cx="280" cy="95" r="22" fill="#2563eb" opacity="0.2"/>
        <circle cx="300" cy="250" r="14" fill="#2563eb" opacity="0.15"/>
      </svg>`,
    files: `
      ${base}
        <rect x="55" y="100" width="90" height="120" rx="8" fill="#fff" stroke="#cbd5e1" stroke-width="2.5" transform="rotate(-12 100 160)"/>
        <rect x="110" y="85" width="100" height="130" rx="8" fill="#fff" stroke="#2563eb" stroke-width="3"/>
        <path d="M175 85 L210 85 L210 118 L175 118 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/>
        <line x1="130" y1="140" x2="190" y2="140" stroke="#93c5fd" stroke-width="5" stroke-linecap="round"/>
        <line x1="130" y1="160" x2="180" y2="160" stroke="#bfdbfe" stroke-width="5" stroke-linecap="round"/>
        <rect x="210" y="145" width="95" height="115" rx="8" fill="#fff" stroke="#94a3b8" stroke-width="2.5" transform="rotate(8 257 200)"/>
        <circle cx="95" cy="250" r="8" fill="#2563eb" opacity="0.35"/>
        <circle cx="280" cy="90" r="6" fill="#2563eb" opacity="0.25"/>
      </svg>`,
    chart: `
      ${base}
        <rect x="70" y="70" width="220" height="200" rx="16" fill="#fff" stroke="#2563eb" stroke-width="3"/>
        <line x1="100" y1="230" x2="260" y2="230" stroke="#e2e8f0" stroke-width="3"/>
        <line x1="100" y1="230" x2="100" y2="100" stroke="#e2e8f0" stroke-width="3"/>
        <rect x="120" y="175" width="28" height="55" rx="4" fill="#bfdbfe"/>
        <rect x="168" y="145" width="28" height="85" rx="4" fill="#93c5fd"/>
        <rect x="216" y="160" width="28" height="70" rx="4" fill="#2563eb" opacity="0.45"/>
        <path d="M118 200 L170 155 L218 175 L255 130" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="255" cy="130" r="7" fill="#2563eb"/>
        <circle cx="300" cy="80" r="10" fill="#2563eb" opacity="0.2"/>
      </svg>`,
    repeat: `
      ${base}
        <rect x="80" y="110" width="120" height="80" rx="12" fill="#fff" stroke="#2563eb" stroke-width="3"/>
        <text x="110" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#2563eb">Aa</text>
        <path d="M220 130 L265 150 L220 170 Z" fill="#2563eb"/>
        <rect x="160" y="185" width="120" height="80" rx="12" fill="#2563eb"/>
        <text x="190" y="235" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#fff">Aa</text>
        <path d="M120 240 Q90 210 115 185" fill="none" stroke="#93c5fd" stroke-width="4" stroke-linecap="round"/>
        <path d="M105 190 L115 185 L120 198" fill="none" stroke="#93c5fd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="290" cy="95" r="12" fill="#2563eb" opacity="0.15"/>
      </svg>`,
    portal: `
      ${base}
        <rect x="115" y="55" width="130" height="230" rx="22" fill="#fff" stroke="#2563eb" stroke-width="3"/>
        <rect x="130" y="85" width="100" height="150" rx="8" fill="#eff6ff"/>
        <circle cx="180" cy="125" r="22" fill="#bfdbfe"/>
        <rect x="155" y="155" width="50" height="8" rx="4" fill="#93c5fd"/>
        <rect x="145" y="175" width="70" height="8" rx="4" fill="#dbeafe"/>
        <rect x="145" y="195" width="70" height="22" rx="8" fill="#2563eb" opacity="0.85"/>
        <!-- candado -->
        <rect x="250" y="200" width="48" height="40" rx="8" fill="#2563eb"/>
        <path d="M260 200 V185 A14 14 0 0 1 288 185 V200" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round"/>
        <circle cx="274" cy="218" r="5" fill="#fff"/>
      </svg>`,
    scale: `
      ${base}
        <path d="M70 250 L140 250 L140 190 L200 190 L200 130 L270 130 L270 80" fill="none" stroke="#cbd5e1" stroke-width="14" stroke-linecap="square"/>
        <path d="M70 250 L140 250 L140 190 L200 190 L200 130 L235 130" fill="none" stroke="#2563eb" stroke-width="14" stroke-linecap="square"/>
        <circle cx="255" cy="95" r="28" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
        <line x1="245" y1="85" x2="265" y2="105" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
        <line x1="265" y1="85" x2="245" y2="105" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
        <text x="78" y="290" font-family="Arial,sans-serif" font-size="18" fill="#94a3b8">5</text>
        <text x="250" y="290" font-family="Arial,sans-serif" font-size="18" fill="#94a3b8">50</text>
      </svg>`,
  };

  return Buffer.from(icons[icon] ?? icons.cover);
};

const buildBackgroundSvg = (variant, accentLineY) => {
  const glow =
    variant === 'cover'
      ? `<radialGradient id="glow" cx="50%" cy="30%" r="60%">
           <stop offset="0%" stop-color="#2563eb" stop-opacity="0.12"/>
           <stop offset="100%" stop-color="#fcfcfc" stop-opacity="0"/>
         </radialGradient>`
      : `<radialGradient id="glow" cx="90%" cy="10%" r="50%">
           <stop offset="0%" stop-color="#2563eb" stop-opacity="0.08"/>
           <stop offset="100%" stop-color="#fcfcfc" stop-opacity="0"/>
         </radialGradient>`;

  return Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>${glow}</defs>
      <rect width="${SIZE}" height="${SIZE}" fill="#fcfcfc"/>
      <rect width="${SIZE}" height="${SIZE}" fill="url(#glow)"/>
      <line x1="80" y1="${accentLineY}" x2="220" y2="${accentLineY}" stroke="#2563eb" stroke-width="4"/>
      <rect x="80" y="920" width="920" height="1" fill="#e5e5e5"/>
    </svg>
  `);
};

const buildTextSvg = (slide, layout) => {
  const { titleY, numberY, linesStartY } = layout;

  const numberBlock =
    slide.number != null
      ? `<text x="80" y="${numberY}" font-family="Tektur" font-weight="600" font-size="30" fill="#2563eb" letter-spacing="10">${escapeXml(slide.number)}</text>`
      : slide.eyebrow
        ? `<text x="80" y="${numberY}" font-family="Tektur" font-weight="600" font-size="22" fill="#2563eb" letter-spacing="6">${escapeXml(slide.eyebrow.toUpperCase())}</text>`
        : '';

  const lineElements = slide.lines
    .map(
      (line, index) =>
        `<text x="80" y="${linesStartY + index * 42}" font-family="Tektur" font-weight="400" font-size="28" fill="#737373">${escapeXml(line)}</text>`,
    )
    .join('');

  const footer = slide.footer
    ? `<text x="80" y="980" font-family="Tektur" font-weight="600" font-size="24" fill="#2563eb" letter-spacing="4">${escapeXml(slide.footer.toUpperCase())}</text>`
    : `<text x="80" y="980" font-family="Tektur" font-weight="400" font-size="22" fill="#a3a3a3">informaticagonzalez.com</text>`;

  return Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      ${numberBlock}
      <text x="80" y="${titleY}" font-family="Tektur" font-weight="700" font-size="64" fill="#0a0a0a">${escapeXml(slide.title)}</text>
      <text x="80" y="${titleY + 76}" font-family="Tektur" font-weight="700" font-size="64" fill="#2563eb">${escapeXml(slide.highlight)}</text>
      ${lineElements}
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

const renderIllustration = (icon) => {
  const resvg = new Resvg(buildIllustrationSvg(icon).toString('utf8'), {
    fitTo: { mode: 'width', value: ILLUSTRATION_SIZE },
    font: { loadSystemFonts: true },
  });
  return Buffer.from(resvg.render().asPng());
};

/** Logo azul (#2563eb) con transparencia — visible sobre fondo claro */
const logoPrepared = await sharp(join(root, 'public/assets/logo-blue.png'))
  .resize(LOGO_WIDTH, null, { fit: 'inside' })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoPrepared).metadata();
const logoTop = 56;
const logoLeft = Math.round((SIZE - logoMeta.width) / 2);
const accentLineY = logoTop + logoMeta.height + 36;
const numberY = accentLineY + 56;
const titleY = (hasExtra) => (hasExtra ? numberY + 88 : accentLineY + 72);
const linesStartY = (baseTitleY) => baseTitleY + 180;

for (const slide of slides) {
  const hasExtra = slide.number != null || Boolean(slide.eyebrow);
  const currentTitleY = titleY(hasExtra);
  const layout = {
    titleY: currentTitleY,
    numberY,
    linesStartY: linesStartY(currentTitleY),
  };

  const background = await sharp(buildBackgroundSvg(slide.variant, accentLineY)).png().toBuffer();
  const textLayer = renderTextLayer(buildTextSvg(slide, layout));
  const illustration = renderIllustration(slide.icon);
  const outputPath = join(outDir, slide.file);

  // Ilustración abajo-derecha: no compite con títulos largos
  const illuTop = 620;
  const illuLeft = SIZE - ILLUSTRATION_SIZE - 40;

  await sharp(background)
    .composite([
      { input: logoPrepared, top: logoTop, left: logoLeft },
      { input: illustration, top: illuTop, left: illuLeft },
      { input: textLayer, top: 0, left: 0 },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ ${slide.file}`);
}

console.log(`\nCarrusel regenerado en: ${outDir}`);
