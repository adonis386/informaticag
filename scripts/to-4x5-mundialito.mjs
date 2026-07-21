import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'posts');
mkdirSync(outDir, { recursive: true });

const SRC = join(
  process.env.USERPROFILE,
  '.cursor/projects/c-Users-USER-Desktop-informaticag/assets',
  'c__Users_USER_AppData_Roaming_Cursor_User_workspaceStorage_e6371d4c4b98cdc9136f22a729ef4903_images_Gemini_Generated_Image_f8opdqf8opdqf8op_-_Editada-9f41ade6-15b4-46f9-93e6-f7ec9df46d52.png',
);
const OUT = join(outDir, 'mundialito-2026-4x5.png');

const W = 1080;
const H = 1350;

const meta = await sharp(SRC).metadata();
console.log(`Origen: ${meta.width}x${meta.height}`);

// Muestrear azul del fondo (esquina superior derecha)
const { data } = await sharp(SRC)
  .extract({ left: Math.max(0, meta.width - 40), top: 20, width: 20, height: 20 })
  .raw()
  .toBuffer({ resolveWithObject: true });

const BLUE = { r: data[0], g: data[1], b: data[2] };
console.log(`Fondo muestreado: rgb(${BLUE.r}, ${BLUE.g}, ${BLUE.b})`);

const square = await sharp(SRC)
  .resize(W, W, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer();

const padTop = Math.round((H - W) / 2);

await sharp({
  create: { width: W, height: H, channels: 3, background: BLUE },
})
  .composite([{ input: square, top: padTop, left: 0 }])
  .png()
  .toFile(OUT);

const outMeta = await sharp(OUT).metadata();
console.log(`✓ ${OUT}`);
console.log(`  ${outMeta.width}x${outMeta.height} (4:5)`);
