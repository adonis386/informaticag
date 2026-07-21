import sharp from 'sharp';
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'posts');

mkdirSync(outDir, { recursive: true });

const GEMINI = join(root, 'marketing', 'Gemini_Generated_Image_l2rlpyl2rlpyl2rl.png');
const OUT = join(outDir, 'mundialito-2026-gemini-4x5.png');
const SITE = 'https://mundial-futbol.vercel.app';
const FALLBACK = join(root, 'public/assets/projects/mundialito.webp');

const W = 1080;
const H = 1350;

/** Pantallas en canvas 1080×1350 (ajustadas al mockup Gemini) */
const PHONES = {
  left: { left: 158, top: 452, width: 248, height: 536, rotate: -16 },
  right: { left: 668, top: 398, width: 248, height: 536, rotate: 13 },
};

const ORANGE = { r: 210, g: 78, b: 48 };

const captureScreens = async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    return null;
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
    const link = page.locator('a:has-text("Partidos"), a:has-text("Ranking")').first();
    if (await link.count()) {
      await link.click({ timeout: 5000 }).catch(() => null);
      await page.waitForTimeout(1500);
      second = await page.screenshot({ type: 'png' });
    }

    await browser.close();
    return { home, second };
  } catch {
    await browser.close().catch(() => null);
    return null;
  }
};

const roundedMask = async (width, height, radius) => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
};

const prepareScreen = async (input, { width, height, rotate }) => {
  const radius = Math.round(width * 0.09);
  const mask = await roundedMask(width, height, radius);

  const screen = await sharp(input)
    .resize(width, height, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const masked = await sharp(screen)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  return sharp(masked)
    .rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
};

/** Quitar marca Gemini en resolución original antes de escalar */
const removeGeminiStar = async (imageBuf) => {
  const { width: sw, height: sh } = await sharp(imageBuf).metadata();

  const patchW = Math.round(sw * 0.22);
  const patchH = Math.round(sh * 0.12);
  const patchLeft = sw - patchW;
  const patchTop = sh - patchH;

  const clean = await sharp(imageBuf)
    .extract({
      left: Math.round(sw * 0.35),
      top: sh - Math.round(sh * 0.11),
      width: Math.round(sw * 0.28),
      height: Math.round(sh * 0.07),
    })
    .blur(4)
    .resize(patchW, patchH, { fit: 'fill' })
    .png()
    .toBuffer();

  return sharp(imageBuf).composite([{ input: clean, top: patchTop, left: patchLeft }]).png().toBuffer();
};

/** Segundo pase sobre canvas 1080×1080 por si queda rastro de la estrella */
const touchUpStarCorner = async (imageBuf) => {
  const patchW = 130;
  const patchH = 90;
  const left = W - patchW;
  const top = W - patchH;

  const sample = await sharp(imageBuf)
    .extract({ left: W - 360, top: W - 150, width: 300, height: 110 })
    .blur(6)
    .resize(patchW, patchH, { fit: 'fill' })
    .png()
    .toBuffer();

  return sharp(imageBuf).composite([{ input: sample, top, left }]).png().toBuffer();
};

const shots = await captureScreens();
let screenA;
let screenB;

if (shots) {
  screenA = shots.home;
  screenB = shots.second;
  console.log('✓ Capturas desde mundial-futbol.vercel.app');
} else {
  screenA = FALLBACK;
  screenB = FALLBACK;
  console.log('✓ Usando imagen local mundialito.webp');
}

const leftScreen = await prepareScreen(screenA, PHONES.left);
const rightScreen = await prepareScreen(screenB, PHONES.right);

const leftMeta = await sharp(leftScreen).metadata();
const rightMeta = await sharp(rightScreen).metadata();

const leftTop = PHONES.left.top - Math.round((leftMeta.height - PHONES.left.height) / 2);
const leftLeft = PHONES.left.left - Math.round((leftMeta.width - PHONES.left.width) / 2);
const rightTop = PHONES.right.top - Math.round((rightMeta.height - PHONES.right.height) / 2);
const rightLeft = PHONES.right.left - Math.round((rightMeta.width - PHONES.right.width) / 2);

// Base: quitar estrella en alta res → escalar → pad 4:5
let base = await sharp(GEMINI).png().toBuffer();
base = await removeGeminiStar(base);

base = await sharp(base)
  .resize(W, W, { fit: 'cover' })
  .png()
  .toBuffer();

base = await touchUpStarCorner(base);

const padTop = Math.round((H - W) / 2);
base = await sharp({
  create: {
    width: W,
    height: H,
    channels: 3,
    background: ORANGE,
  },
})
  .composite([{ input: base, top: padTop, left: 0 }])
  .png()
  .toBuffer();

await sharp(base)
  .composite([
    { input: leftScreen, top: leftTop + padTop, left: leftLeft },
    { input: rightScreen, top: rightTop + padTop, left: rightLeft },
  ])
  .png()
  .toFile(OUT);

console.log(`\n✓ Post 4:5 generado: ${OUT}`);
