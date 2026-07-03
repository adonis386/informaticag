import sharp from 'sharp';
import { join } from 'path';

/** Logo azul de marca — visible en pestañas claras del navegador */
const src = 'public/assets/logo-blue.png';
const out = 'public';

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

for (const { size, name } of sizes) {
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(out, name));
  console.log(`✓ ${name}`);
}
