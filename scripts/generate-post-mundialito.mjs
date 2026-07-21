import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'posts');
mkdirSync(outDir, { recursive: true });

const SIZE = 1080;
const PHONE_W = 320;
const PHONE_H = 660;
const SCREEN_PAD = 14;
const SCREEN_TOP = 48;
const SCREEN_W = PHONE_W - SCREEN_PAD * 2;
const SCREEN_H = PHONE_H - SCREEN_TOP - 28;

const fontFiles = [
  join(root, 'public/fonts/Tektur/static/Tektur-Bold.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-Regular.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-SemiBold.ttf'),
];

const SITE = 'https://mundial-futbol.vercel.app';
const FALLBACK = join(root, 'public/assets/projects/mundialito.webp');

const escapeXml = (v) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const renderSvg = (svg, width = SIZE) => {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Tektur' },
  });
  return Buffer.from(resvg.render().asPng());
};

/** Fondo bold estilo Cappen + sombra orgánica */
const buildBackground = () =>
  Buffer.from(`
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="spot" cx="70%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#fb923c" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="#ea580c"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#spot)"/>
  <!-- Sombra orgánica tipo hoja (izquierda) -->
  <ellipse cx="80" cy="420" rx="220" ry="340" fill="#c2410c" opacity="0.35" transform="rotate(-18 80 420)"/>
  <ellipse cx="40" cy="520" rx="160" ry="260" fill="#9a3412" opacity="0.25" transform="rotate(-25 40 520)"/>
  <!-- Podio -->
  <ellipse cx="540" cy="980" rx="280" ry="36" fill="#9a3412" opacity="0.45"/>
  <ellipse cx="540" cy="968" rx="240" ry="28" fill="#c2410c" opacity="0.7"/>
</svg>
`);

const buildPhoneFrame = () =>
  Buffer.from(`
<svg width="${PHONE_W}" height="${PHONE_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bezel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#0c0a09"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect x="4" y="4" width="${PHONE_W - 8}" height="${PHONE_H - 8}" rx="48" fill="url(#bezel)" filter="url(#shadow)"/>
  <rect x="${SCREEN_PAD}" y="${SCREEN_TOP}" width="${SCREEN_W}" height="${SCREEN_H}" rx="28" fill="#0a0a0a"/>
  <!-- Dynamic Island -->
  <rect x="${PHONE_W / 2 - 48}" y="22" width="96" height="22" rx="11" fill="#0c0a09"/>
  <!-- Home indicator -->
  <rect x="${PHONE_W / 2 - 40}" y="${PHONE_H - 22}" width="80" height="5" rx="2.5" fill="#44403c"/>
</svg>
`);

const buildOverlayText = () =>
  Buffer.from(`
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <text x="64" y="88" font-family="Tektur" font-weight="600" font-size="18" fill="#fff7ed" letter-spacing="4" opacity="0.9">CASO DE ESTUDIO</text>
  <text x="64" y="150" font-family="Tektur" font-weight="700" font-size="52" fill="#ffffff">Mundialito</text>
  <text x="64" y="210" font-family="Tektur" font-weight="700" font-size="52" fill="#ffedd5">2026</text>

  <text x="64" y="980" font-family="Tektur" font-weight="600" font-size="20" fill="#ffedd5">Quiniela · Ligas · Ranking</text>
  <text x="64" y="1020" font-family="Tektur" font-weight="500" font-size="18" fill="#fed7aa">informaticagonzalez.com</text>
</svg>
`);

const captureMobileScreens = async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    if (String(error).includes("Executable doesn't exist")) {
      console.warn('Playwright sin Chromium — usando imagen local.');
      return null;
    }
    throw error;
  }

  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  try {
    await page.goto(SITE, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2500);
    const home = await page.screenshot({ type: 'png' });

    let second = home;
    const ranking = page.locator('a:has-text("Ranking"), a:has-text("Ligas"), a:has-text("Partidos")').first();
    if (await ranking.count()) {
      await ranking.click({ timeout: 5000 }).catch(() => null);
      await page.waitForTimeout(1500);
      second = await page.screenshot({ type: 'png' });
    }

    await browser.close();
    return { home, second };
  } catch (e) {
    await browser.close().catch(() => null);
    console.warn('Capture falló:', e.message);
    return null;
  }
};

const prepareScreen = async (input) => {
  const img = sharp(input);
  const meta = await img.metadata();
  // Recorte tipo móvil y resize al hueco de pantalla
  return img
    .resize(SCREEN_W * 2, SCREEN_H * 2, { fit: 'cover', position: 'top' })
    .resize(SCREEN_W, SCREEN_H)
    .png()
    .toBuffer();
};

const composePhone = async (screenBuf) => {
  const frame = await sharp(buildPhoneFrame()).png().toBuffer();
  return sharp(frame)
    .composite([{ input: screenBuf, top: SCREEN_TOP, left: SCREEN_PAD }])
    .png()
    .toBuffer();
};

/** Rotación aproximada vía affine (grados → radianes) */
const rotatePhone = async (phoneBuf, degrees) => {
  return sharp(phoneBuf)
    .rotate(degrees, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
};

const shots = await captureMobileScreens();

let screenA;
let screenB;

if (shots) {
  screenA = await prepareScreen(shots.home);
  screenB = await prepareScreen(shots.second);
  console.log('✓ Capturas desde mundial-futbol.vercel.app');
} else {
  // Dos recortes distintos del asset local para variar las pantallas
  screenA = await sharp(FALLBACK)
    .resize(SCREEN_W, SCREEN_H, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();
  screenB = await sharp(FALLBACK)
    .resize(SCREEN_W, SCREEN_H, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();
  console.log('✓ Usando mundialito.webp local (2 recortes)');
}

const phoneA = await composePhone(screenA);
const phoneB = await composePhone(screenB);
const phoneLeft = await rotatePhone(phoneA, -14);
const phoneRight = await rotatePhone(phoneB, 10);

const leftMeta = await sharp(phoneLeft).metadata();
const rightMeta = await sharp(phoneRight).metadata();

const bg = await sharp(buildBackground()).png().toBuffer();
const text = renderSvg(buildOverlayText());

const logo = await sharp(join(root, 'public/assets/logo-blue.png'))
  .resize(110, null, { fit: 'inside' })
  .png()
  .toBuffer();

// Posiciones flotantes (estilo Cappen)
const leftTop = 280;
const leftLeft = 70;
const rightTop = 220;
const rightLeft = SIZE - rightMeta.width - 40;

const outPath = join(outDir, 'mundialito-2026-showcase.png');

await sharp(bg)
  .composite([
    { input: phoneLeft, top: leftTop, left: leftLeft },
    { input: phoneRight, top: rightTop, left: rightLeft },
    { input: text, top: 0, left: 0 },
    { input: logo, top: 980, left: SIZE - 180 },
  ])
  .png()
  .toFile(outPath);

console.log(`\n✓ Post generado: ${outPath}`);
console.log(`  Phones: ${leftMeta.width}x${leftMeta.height} / ${rightMeta.width}x${rightMeta.height}`);
