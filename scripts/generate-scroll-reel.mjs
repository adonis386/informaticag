import { chromium } from 'playwright';
import { mkdirSync, readdirSync, renameSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'reels');

mkdirSync(outDir, { recursive: true });

const url = process.argv[2] ?? 'https://www.informaticagonzalez.com/';
const durationMs = 22_000;
const outputName =
  url.includes('informaticagonzalez') ? 'ig-scroll-reveal.webm' : 'cgt-scroll-reveal.webm';
const outputFile = join(outDir, outputName);

const browser = await chromium.launch({ headless: true }).catch((error) => {
  if (String(error).includes("Executable doesn't exist")) {
    console.error(
      '\nChromium de Playwright no está instalado. Ejecuta primero:\n\n  npm run generate:reel:setup\n',
    );
  }
  throw error;
});
const context = await browser.newContext({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
  recordVideo: {
    dir: outDir,
    size: { width: 1080, height: 1920 },
  },
});

const page = await context.newPage();

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
await page.waitForTimeout(2500);

await page.evaluate(
  async ({ totalMs }) => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );
    const start = performance.now();

    while (performance.now() - start < totalMs) {
      const progress = (performance.now() - start) / totalMs;
      const eased = 1 - (1 - progress) ** 2;
      window.scrollTo(0, maxScroll * eased);
      await wait(50);
    }
  },
  { totalMs: durationMs },
);

await page.waitForTimeout(1200);
await context.close();
await browser.close();

const recorded = readdirSync(outDir).find((file) => file.endsWith('.webm'));
if (!recorded) {
  throw new Error('No se generó el video.');
}

renameSync(join(outDir, recorded), outputFile);
console.log(`✓ Video generado: ${outputFile}`);
console.log('Formato: WebM 1080x1920 — conviértelo a MP4 en CapCut o sube directo a Instagram.');
