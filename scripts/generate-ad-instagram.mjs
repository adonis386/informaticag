import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'ads');

mkdirSync(outDir, { recursive: true });

const fontFiles = [
  join(root, 'public/fonts/Tektur/static/Tektur-Bold.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-Regular.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-SemiBold.ttf'),
];

const BLUE = '#2563eb';
const BLUE_SOFT = '#dbeafe';
const BG = '#fcfcfc';
const WHITE = '#ffffff';
const INK = '#0a0a0a';
const MUTED = '#737373';
const LINE = '#e5e7eb';
const SURFACE = '#111111';

const formats = [
  { file: 'ig-ad-sistema-1x1.png', w: 1080, h: 1080, variant: 'square' },
  { file: 'ig-ad-sistema-4x5.png', w: 1080, h: 1350, variant: 'portrait' },
];

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildBgSvg = (w, h) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="base3d" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9ec0fa"/>
      <stop offset="30%" stop-color="#e8f1ff"/>
      <stop offset="65%" stop-color="#b9d2fc"/>
      <stop offset="100%" stop-color="#3b6fe8"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#base3d)"/>
  <ellipse cx="${w * 0.9}" cy="${-h * 0.05}" rx="${w * 0.75}" ry="${h * 0.48}" fill="#7dd3fc" opacity="0.7"/>
  <ellipse cx="${-w * 0.1}" cy="${h * 0.45}" rx="${w * 0.65}" ry="${h * 0.45}" fill="#2563eb" opacity="0.45"/>
  <ellipse cx="${w * 0.5}" cy="${h * 1.08}" rx="${w * 0.85}" ry="${h * 0.42}" fill="#1e40af" opacity="0.55"/>
  <ellipse cx="${w * 1.08}" cy="${h * 0.58}" rx="${w * 0.5}" ry="${h * 0.38}" fill="#3b82f6" opacity="0.5"/>
  <ellipse cx="${w * 0.4}" cy="${h * 0.32}" rx="${w * 0.55}" ry="${h * 0.35}" fill="#ffffff" opacity="0.65"/>
  <ellipse cx="${w * 0.12}" cy="${h * 0.1}" rx="${w * 0.32}" ry="${h * 0.18}" fill="#93c5fd" opacity="0.6"/>
  <ellipse cx="${w * 0.72}" cy="${h * 0.72}" rx="${w * 0.35}" ry="${h * 0.22}" fill="#60a5fa" opacity="0.4"/>
  <path d="M ${-w * 0.25} ${h * 0.18} L ${w * 1.25} ${-h * 0.02} L ${w * 1.25} ${h * 0.26} L ${-w * 0.25} ${h * 0.5} Z" fill="#ffffff" opacity="0.28"/>
  <path d="M ${-w * 0.2} ${h * 0.58} L ${w * 1.2} ${h * 0.42} L ${w * 1.2} ${h * 0.6} L ${-w * 0.2} ${h * 0.8} Z" fill="#dbeafe" opacity="0.3"/>
</svg>
`;

/**
 * Creativo para Meta Ads (CTA de WhatsApp lo pone Instagram)
 * Ángulo: desarrollamos tu sistema — no vendemos plantilla
 */
const buildAdSvg = (w, h, variant) => {
  const isPortrait = variant === 'portrait';
  const pad = 72;

  const labelY = isPortrait ? 250 : 210;
  const h1Y = isPortrait ? 340 : 290;
  const h2Y = isPortrait ? 420 : 360;
  const subY = isPortrait ? 485 : 420;

  const cardX = pad;
  const cardW = w - pad * 2;
  const cardY = isPortrait ? 540 : 470;
  const cardH = isPortrait ? 560 : 420;
  const moduleH = isPortrait ? 155 : 120;

  const footerY = isPortrait ? 1288 : 1008;

  const modules = [
    { title: 'Inventario', meta: 'Stock a tu medida', accent: true },
    { title: 'Logística', meta: 'Distribución y rutas', accent: false },
    { title: 'Tickets', meta: 'Control de operaciones', accent: false },
    { title: 'Integraciones', meta: 'APIs y sistemas existentes', accent: true },
  ];

  const gap = 18;
  const cols = 2;
  const moduleW = (cardW - 56 - gap) / cols;
  const startY = cardY + (isPortrait ? 110 : 92);

  const modulesSvg = modules
    .map((m, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = cardX + 28 + col * (moduleW + gap);
      const y = startY + row * (moduleH + gap);
      const fill = m.accent ? BLUE : WHITE;
      const titleColor = m.accent ? WHITE : INK;
      const metaColor = m.accent ? '#bfdbfe' : MUTED;
      const stroke = m.accent ? BLUE : LINE;

      return `
        <rect x="${x}" y="${y}" width="${moduleW}" height="${moduleH}" rx="18" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="${x + 28}" cy="${y + moduleH / 2}" r="8" fill="${m.accent ? '#93c5fd' : BLUE}"/>
        <text x="${x + 52}" y="${y + (isPortrait ? 62 : 48)}" font-family="Tektur" font-weight="700" font-size="${isPortrait ? 26 : 22}" fill="${titleColor}">${escapeXml(m.title)}</text>
        <text x="${x + 52}" y="${y + (isPortrait ? 98 : 78)}" font-family="Tektur" font-weight="500" font-size="${isPortrait ? 17 : 15}" fill="${metaColor}">${escapeXml(m.meta)}</text>
      `;
    })
    .join('');

  return `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="cardShadow" x="-8%" y="-8%" width="116%" height="124%">
      <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#1e3a8a" flood-opacity="0.28"/>
    </filter>
    <linearGradient id="panelHead" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${SURFACE}"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
  </defs>

  <!-- Label -->
  <text x="${pad}" y="${labelY}" font-family="Tektur" font-weight="600" font-size="20" fill="${BLUE}" letter-spacing="4">DESARROLLO A MEDIDA</text>

  <!-- Headline: verbos de construcción -->
  <text x="${pad}" y="${h1Y}" font-family="Tektur" font-weight="700" font-size="50" fill="${INK}">Desarrollamos</text>
  <text x="${pad}" y="${h2Y}" font-family="Tektur" font-weight="700" font-size="50" fill="${BLUE}">tu sistema.</text>
  <text x="${pad}" y="${subY}" font-family="Tektur" font-weight="500" font-size="22" fill="${MUTED}">Inventario, logística, tickets e integraciones — a tu medida.</text>

  <!-- Panel -->
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="24" fill="${WHITE}" stroke="${LINE}" stroke-width="2" filter="url(#cardShadow)"/>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${isPortrait ? 72 : 64}" rx="24" fill="url(#panelHead)"/>
  <rect x="${cardX}" y="${cardY + (isPortrait ? 40 : 36)}" width="${cardW}" height="${isPortrait ? 32 : 28}" fill="${SURFACE}"/>

  <circle cx="${cardX + 36}" cy="${cardY + (isPortrait ? 36 : 32)}" r="7" fill="#ef4444"/>
  <circle cx="${cardX + 60}" cy="${cardY + (isPortrait ? 36 : 32)}" r="7" fill="#eab308"/>
  <circle cx="${cardX + 84}" cy="${cardY + (isPortrait ? 36 : 32)}" r="7" fill="#22c55e"/>
  <text x="${cardX + cardW / 2}" y="${cardY + (isPortrait ? 42 : 38)}" font-family="Tektur" font-weight="600" font-size="18" fill="#a3a3a3" text-anchor="middle">Lo que tu operación necesite</text>

  ${modulesSvg}

  <!-- Footer branding -->
  <rect x="${pad}" y="${footerY - 36}" width="${cardW}" height="64" rx="16" fill="${WHITE}" opacity="0.88"/>
  <text x="${w / 2}" y="${footerY}" font-family="Tektur" font-weight="600" font-size="20" fill="${INK}" text-anchor="middle">@informatica.gonzalez · informaticagonzalez.com</text>
</svg>
`;
};

const renderSvg = (svg, width) => {
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

const logoPrepared = await sharp(join(root, 'public/assets/logo-blue.png'))
  .resize(140, null, { fit: 'inside' })
  .png()
  .toBuffer();

for (const format of formats) {
  const bgRaw = renderSvg(buildBgSvg(format.w, format.h), format.w);
  const bgSoft = await sharp(bgRaw)
    .blur(28)
    .modulate({ brightness: 1.05, saturation: 1.15 })
    .png()
    .toBuffer();

  const content = renderSvg(buildAdSvg(format.w, format.h, format.variant), format.w);

  await sharp(bgSoft)
    .composite([
      { input: content, top: 0, left: 0 },
      { input: logoPrepared, top: 40, left: 72 },
    ])
    .png()
    .toFile(join(outDir, format.file));

  console.log(`✓ ${format.file} (${format.w}x${format.h})`);
}

console.log(`\nAds generados en: ${outDir}`);
