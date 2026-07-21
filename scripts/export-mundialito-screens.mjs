import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'marketing', 'posts', 'mundialito-screens');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
});

await page.goto('https://mundial-futbol.vercel.app', {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(2500);

const left = join(outDir, '01-ligas.png');
await page.screenshot({ path: left, type: 'png' });

const partidos = page.getByRole('link', { name: /Partidos/i }).first();
const ranking = page.getByRole('link', { name: /Ranking/i }).first();

if (await partidos.count()) {
  await partidos.click({ timeout: 5000 }).catch(() => null);
  await page.waitForTimeout(1500);
} else if (await ranking.count()) {
  await ranking.click({ timeout: 5000 }).catch(() => null);
  await page.waitForTimeout(1500);
}

const right = join(outDir, '02-partidos.png');
await page.screenshot({ path: right, type: 'png' });

await browser.close();
console.log('✓ Pantallas exportadas:');
console.log(left);
console.log(right);
