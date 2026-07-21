import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'posts');

mkdirSync(outDir, { recursive: true });

const SIZE = 1080;

const fontFiles = [
  join(root, 'public/fonts/Tektur/static/Tektur-Bold.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-Regular.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-SemiBold.ttf'),
];

const cgtBase = {
  clientLogoUrl: 'https://www.solucionescgt.com/logo.png',
  label: 'Caso de estudio',
  title: 'Soluciones',
  highlight: 'CGT',
  tags: ['Next.js', 'E-commerce', 'IA'],
  site: 'solucionescgt.com',
  fallbackImage: join(root, 'public/assets/projects/cgt.webp'),
};

const cases = {
  cgt: [
    {
      ...cgtBase,
      file: 'soluciones-cgt-caso-estudio-home.png',
      captureUrl: 'https://www.solucionescgt.com/',
      lines: [
        'E-commerce tech para armar PCs, equipos',
        'pre-armados y laptops con IA integrada.',
      ],
      carouselHint: 'Desliza →',
    },
    {
      ...cgtBase,
      file: 'soluciones-cgt-caso-estudio-build.png',
      captureUrl: 'https://www.solucionescgt.com/build',
      dismissButtonText: 'entendido',
      lines: [
        'Ensamblador de PCs con selección de componentes,',
        'compatibilidad por IA y cotización online.',
      ],
    },
  ],
};

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const renderSvg = (svg, width = SIZE) => {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Tektur' },
  });
  return Buffer.from(resvg.render().asPng());
};

const captureScreenshot = async (item) => {
  const browser = await chromium.launch({ headless: true }).catch((error) => {
    if (String(error).includes("Executable doesn't exist")) {
      console.warn('\nPlaywright sin Chromium — usando imagen local de respaldo.\n');
      return null;
    }
    throw error;
  });

  if (!browser) return null;

  const context = await browser.newContext({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    await page.goto(item.captureUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForTimeout(2500);

    if (item.dismissButtonText) {
      const dismiss = page.getByRole('button', {
        name: new RegExp(item.dismissButtonText, 'i'),
      });
      if ((await dismiss.count()) > 0) {
        await dismiss.first().click({ force: true });
        await page.waitForTimeout(1500);
      }
    }

    await page.waitForTimeout(2000);
    const shot = await page.screenshot({ type: 'png' });
    await context.close();
    await browser.close();
    return shot;
  } catch {
    await context.close();
    await browser.close();
    return null;
  }
};

const fetchClientLogo = async (logoUrl) => {
  try {
    const response = await fetch(logoUrl);
    if (!response.ok) return null;
    return Buffer.from(await response.arrayBuffer());
  } catch {
    return null;
  }
};

const buildOverlaySvg = (item, clientLogoWidth = 100) => {
  const headerTextX = 48 + clientLogoWidth + 28;
  const tagStartX = 80;
  let tagX = tagStartX;
  const tagY = 900;
  const tagElements = item.tags
    .map((tag) => {
      const width = tag.length * 12 + 48;
      const el = `
        <rect x="${tagX}" y="${tagY}" width="${width}" height="46" fill="none" stroke="#404040" stroke-width="1.5"/>
        <text x="${tagX + 24}" y="${tagY + 30}" font-family="Tektur" font-weight="600" font-size="17" fill="#d4d4d4" letter-spacing="2">${escapeXml(tag.toUpperCase())}</text>
      `;
      tagX += width + 16;
      return el;
    })
    .join('');

  const lineElements = item.lines
    .map(
      (line, i) =>
        `<text x="80" y="${760 + i * 38}" font-family="Tektur" font-weight="400" font-size="26" fill="#a3a3a3">${escapeXml(line)}</text>`,
    )
    .join('');

  const carouselHint = item.carouselHint
    ? `<text x="880" y="108" text-anchor="end" font-family="Tektur" font-weight="600" font-size="22" fill="#2563eb" letter-spacing="3">${escapeXml(item.carouselHint.toUpperCase())}</text>`
    : '';

  return `
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headerFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.96"/>
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0"/>
          <stop offset="42%" stop-color="#0a0a0a" stop-opacity="0.1"/>
          <stop offset="62%" stop-color="#0a0a0a" stop-opacity="0.94"/>
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect width="${SIZE}" height="170" fill="url(#headerFade)"/>
      <text x="${headerTextX}" y="62" font-family="Tektur" font-weight="600" font-size="20" fill="#2563eb" letter-spacing="6">${escapeXml(item.label.toUpperCase())}</text>
      <text x="${headerTextX}" y="108" font-family="Tektur" font-weight="700" font-size="42" fill="#fcfcfc">${escapeXml(item.title)} <tspan fill="#2563eb">${escapeXml(item.highlight)}</tspan></text>
      ${carouselHint}
      <rect width="${SIZE}" height="${SIZE}" fill="url(#fade)"/>
      <line x1="80" y1="700" x2="220" y2="700" stroke="#2563eb" stroke-width="4"/>
      ${lineElements}
      ${tagElements}
      <text x="80" y="980" font-family="Tektur" font-weight="400" font-size="20" fill="#404040">por Informática González</text>
      <text x="80" y="1010" font-family="Tektur" font-weight="400" font-size="22" fill="#525252">${escapeXml(item.site)}</text>
      <rect x="80" y="1030" width="920" height="1" fill="#262626"/>
    </svg>
  `;
};

const generatePost = async (item) => {
  let screenshot = await captureScreenshot(item);

  if (!screenshot) {
    screenshot = await sharp(item.fallbackImage)
      .resize(SIZE, Math.round(SIZE * 0.62), { fit: 'cover', position: 'top' })
      .png()
      .toBuffer();
  }

  const screenshotPrepared = await sharp(screenshot)
    .resize(SIZE, SIZE, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const clientLogoRaw = await fetchClientLogo(item.clientLogoUrl);
  const clientLogoPrepared = clientLogoRaw
    ? await sharp(clientLogoRaw)
        .resize(100, 100, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    : null;

  const clientLogoMeta = clientLogoPrepared
    ? await sharp(clientLogoPrepared).metadata()
    : { width: 100 };

  const igLogoPrepared = await sharp(join(root, 'public/assets/logo-3.webp'))
    .resize(72, null, { fit: 'inside' })
    .png()
    .toBuffer();

  const igLogoMeta = await sharp(igLogoPrepared).metadata();
  const overlay = renderSvg(buildOverlaySvg(item, clientLogoMeta.width ?? 100));
  const outputPath = join(outDir, item.file);

  const composites = [
    { input: overlay, top: 0, left: 0 },
    { input: igLogoPrepared, top: 48, left: SIZE - (igLogoMeta.width ?? 72) - 48 },
  ];

  if (clientLogoPrepared) {
    composites.splice(1, 0, { input: clientLogoPrepared, top: 44, left: 48 });
  }

  await sharp(screenshotPrepared).composite(composites).png().toFile(outputPath);

  return outputPath;
};

const slug = process.argv[2] ?? 'cgt';
const selected = cases[slug];

if (!selected) {
  console.error(`Caso no encontrado. Disponibles: ${Object.keys(cases).join(', ')}`);
  process.exit(1);
}

const items = Array.isArray(selected) ? selected : [selected];

for (const item of items) {
  const outputPath = await generatePost(item);
  console.log(`✓ ${item.file}`);
}

console.log(`\n${items.length} post(s) generados en: ${outDir}`);
