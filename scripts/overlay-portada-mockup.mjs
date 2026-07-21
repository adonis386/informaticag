import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'ads', 'carousel-sistemas');

const W = 1080;
const H = 1350;
const PAD = 72;

const BLUE = '#2563eb';
const WHITE = '#ffffff';
const INK = '#0a0a0a';

const fontFiles = [
  join(root, 'public/fonts/Tektur/static/Tektur-Bold.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-Regular.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-SemiBold.ttf'),
];

const SRC = join(outDir, '71799d26-969d-4921-9e31-eff60e5212b2.png');
const OUT = join(outDir, '01-portada.png');

/**
 * Título ejecutivo (mejor que “Soluciones Empresariales en una web o app”):
 * “Soluciones empresariales / en web o app.”
 */
const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#0a0a0a" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
    </linearGradient>
    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Lectura del título sobre la pared -->
  <rect width="${W}" height="420" fill="url(#topFade)"/>

  <!-- Pill -->
  <rect x="${(W - 320) / 2}" y="56" width="320" height="44" rx="22" fill="${BLUE}"/>
  <text x="${W / 2}" y="86" font-family="Tektur" font-weight="600" font-size="18" fill="${WHITE}" text-anchor="middle" letter-spacing="3">SOFTWARE A MEDIDA</text>

  <!-- Título ejecutivo -->
  <g filter="url(#textShadow)">
    <text x="${W / 2}" y="170" font-family="Tektur" font-weight="700" font-size="44" fill="${WHITE}" text-anchor="middle">Soluciones empresariales</text>
    <text x="${W / 2}" y="230" font-family="Tektur" font-weight="700" font-size="44" fill="${BLUE}" text-anchor="middle">en web o app.</text>
  </g>

  <!-- Sub banner -->
  <rect x="${PAD}" y="270" width="${W - PAD * 2}" height="64" rx="16" fill="${WHITE}" opacity="0.94"/>
  <text x="${W / 2}" y="312" font-family="Tektur" font-weight="500" font-size="20" fill="${INK}" text-anchor="middle">Desarrollamos el sistema que tu operación necesita.</text>

  <!-- Footer -->
  <rect x="${PAD}" y="${H - 100}" width="${W - PAD * 2}" height="64" rx="16" fill="${WHITE}" opacity="0.94"/>
  <text x="${W / 2}" y="${H - 60}" font-family="Tektur" font-weight="600" font-size="20" fill="${INK}" text-anchor="middle">@informatica.gonzalez · informaticagonzalez.com</text>
</svg>
`;

const resvg = new Resvg(overlaySvg, {
  fitTo: { mode: 'width', value: W },
  font: {
    fontFiles,
    loadSystemFonts: false,
    defaultFontFamily: 'Tektur',
  },
});
const overlay = Buffer.from(resvg.render().asPng());

const logo = await sharp(join(root, 'public/assets/logo-blue.png'))
  .resize(110, null, { fit: 'inside' })
  .png()
  .toBuffer();

const base = await sharp(SRC)
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer();

await sharp(base)
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: 48, left: PAD },
  ])
  .png()
  .toFile(OUT);

console.log(`✓ Portada: ${OUT}`);
console.log('Título: Soluciones empresariales en web o app.');
