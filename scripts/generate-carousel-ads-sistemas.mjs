import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing', 'ads', 'carousel-sistemas');

mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 1350;
const PAD = 72;

const fontFiles = [
  join(root, 'public/fonts/Tektur/static/Tektur-Bold.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-Regular.ttf'),
  join(root, 'public/fonts/Tektur/static/Tektur-SemiBold.ttf'),
];

const BLUE = '#2563eb';
const BLUE_SOFT = '#dbeafe';
const WHITE = '#ffffff';
const INK = '#0a0a0a';
const MUTED = '#475569';
const WALL = '#9eb8e0';

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Fondo azul claro + grid ondulado (mismo lenguaje que la portada) */
const buildBgSvg = () => {
  const lines = [];
  for (let i = 0; i < 18; i++) {
    const y = 40 + i * 78;
    const amp = 10 + (i % 3) * 4;
    lines.push(
      `<path d="M -40 ${y} Q ${W * 0.25} ${y - amp} ${W * 0.5} ${y} T ${W + 40} ${y}" fill="none" stroke="#ffffff" stroke-opacity="0.28" stroke-width="1.5"/>`,
    );
  }
  for (let i = 0; i < 14; i++) {
    const x = 30 + i * 85;
    const amp = 12 + (i % 4) * 3;
    lines.push(
      `<path d="M ${x} -40 Q ${x + amp} ${H * 0.25} ${x} ${H * 0.5} T ${x} ${H + 40}" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.5"/>`,
    );
  }

  return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b6cceb"/>
      <stop offset="45%" stop-color="#9eb8e0"/>
      <stop offset="100%" stop-color="#7fa0d4"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#wall)"/>
  ${lines.join('\n')}
</svg>`;
};

const defsShared = `
  <defs>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#1e3a8a" flood-opacity="0.2"/>
    </filter>
    <linearGradient id="pillBlue" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
`;

const pillLabel = (label, y = 200) => {
  const approxW = Math.max(280, label.length * 16 + 48);
  const x = (W - approxW) / 2;
  return `
  <rect x="${x}" y="${y}" width="${approxW}" height="44" rx="22" fill="url(#pillBlue)" filter="url(#cardShadow)"/>
  <text x="${W / 2}" y="${y + 30}" font-family="Tektur" font-weight="600" font-size="18" fill="${WHITE}" text-anchor="middle" letter-spacing="3">${escapeXml(label)}</text>`;
};

const footerBar = () => `
  <rect x="${PAD}" y="${H - 100}" width="${W - PAD * 2}" height="64" rx="16" fill="${WHITE}" opacity="0.95" filter="url(#cardShadow)"/>
  <text x="${W / 2}" y="${H - 60}" font-family="Tektur" font-weight="600" font-size="20" fill="${INK}" text-anchor="middle">@informatica.gonzalez · informaticagonzalez.com</text>
`;

const whiteBar = (text, y, h = 64) => `
  <rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="${h}" rx="16" fill="${WHITE}" opacity="0.95" filter="url(#cardShadow)"/>
  <text x="${W / 2}" y="${y + h / 2 + 8}" font-family="Tektur" font-weight="500" font-size="20" fill="${INK}" text-anchor="middle">${escapeXml(text)}</text>
`;

/** Slide 2 — Qué entregamos */
const buildEntrega = () => `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${defsShared}
  ${pillLabel('QUÉ ENTREGAMOS', 200)}
  <text x="${PAD}" y="320" font-family="Tektur" font-weight="700" font-size="40" fill="${INK}">No te adaptas al</text>
  <text x="${PAD}" y="380" font-family="Tektur" font-weight="700" font-size="40" fill="${INK}">software.</text>
  <text x="${PAD}" y="450" font-family="Tektur" font-weight="700" font-size="40" fill="${BLUE}">El software se</text>
  <text x="${PAD}" y="510" font-family="Tektur" font-weight="700" font-size="40" fill="${BLUE}">adapta a ti.</text>

  <rect x="${PAD}" y="580" width="${W - PAD * 2}" height="200" rx="24" fill="${WHITE}" opacity="0.96" filter="url(#cardShadow)"/>
  <rect x="${PAD + 28}" y="608" width="220" height="48" rx="24" fill="url(#pillBlue)"/>
  <text x="${PAD + 138}" y="640" font-family="Tektur" font-weight="700" font-size="18" fill="${WHITE}" text-anchor="middle">WEB EMPRESARIAL</text>
  <text x="${PAD + 28}" y="710" font-family="Tektur" font-weight="500" font-size="22" fill="${MUTED}">Paneles, portales y sistemas</text>
  <text x="${PAD + 28}" y="746" font-family="Tektur" font-weight="500" font-size="22" fill="${MUTED}">en el navegador.</text>

  <rect x="${PAD}" y="820" width="${W - PAD * 2}" height="200" rx="24" fill="${WHITE}" opacity="0.96" filter="url(#cardShadow)"/>
  <rect x="${PAD + 28}" y="848" width="180" height="48" rx="24" fill="${INK}"/>
  <text x="${PAD + 118}" y="880" font-family="Tektur" font-weight="700" font-size="18" fill="${WHITE}" text-anchor="middle">APP MÓVIL</text>
  <text x="${PAD + 28}" y="950" font-family="Tektur" font-weight="500" font-size="22" fill="${MUTED}">Operación en campo, inventario</text>
  <text x="${PAD + 28}" y="986" font-family="Tektur" font-weight="500" font-size="22" fill="${MUTED}">y seguimiento desde el celular.</text>

  ${whiteBar('Construimos tu solución. No vendemos plantillas.', 1080)}
  ${footerBar()}
</svg>`;

/** Slide 3 — Soluciones */
const buildSoluciones = () => {
  const items = [
    { title: 'Sistemas a medida', meta: 'Según cómo trabaja tu negocio', accent: true },
    { title: 'Inventario y logística', meta: 'Control de stock y distribución', accent: false },
    { title: 'Automatización', meta: 'Menos tareas manuales, menos errores', accent: true },
    { title: 'APIs e integraciones', meta: 'Conecta tus sistemas y clientes', accent: false },
  ];

  const list = items
    .map((item, i) => {
      const y = 400 + i * 130;
      const bg = item.accent ? BLUE : WHITE;
      const titleC = item.accent ? WHITE : INK;
      const metaC = item.accent ? BLUE_SOFT : MUTED;
      return `
        <rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="112" rx="20" fill="${bg}" opacity="0.97" filter="url(#cardShadow)"/>
        <text x="${PAD + 40}" y="${y + 48}" font-family="Tektur" font-weight="700" font-size="26" fill="${titleC}">${escapeXml(item.title)}</text>
        <text x="${PAD + 40}" y="${y + 82}" font-family="Tektur" font-weight="500" font-size="18" fill="${metaC}">${escapeXml(item.meta)}</text>
      `;
    })
    .join('');

  return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${defsShared}
  ${pillLabel('SOLUCIONES', 200)}
  <text x="${PAD}" y="320" font-family="Tektur" font-weight="700" font-size="42" fill="${INK}">Qué podemos</text>
  <text x="${PAD}" y="380" font-family="Tektur" font-weight="700" font-size="42" fill="${BLUE}">construir para ti</text>
  ${list}
  ${whiteBar('Todo entregado como web, app, o ambas.', 960)}
  ${footerBar()}
</svg>`;
};

/** Slide 4 — Proceso */
const buildProceso = () => {
  const steps = [
    { n: '1', title: 'Toma de requerimientos', meta: 'Escuchamos tu empresa' },
    { n: '2', title: 'Levantamiento e infraestructura', meta: 'Evaluamos tu entorno técnico' },
    { n: '3', title: 'Asesoría del stack ideal', meta: 'Definimos la arquitectura' },
    { n: '4', title: 'Propuesta y desarrollo', meta: 'Presupuesto e inicio del proyecto' },
  ];

  const list = steps
    .map((s, i) => {
      const y = 390 + i * 145;
      return `
        <rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="124" rx="20" fill="${WHITE}" opacity="0.96" filter="url(#cardShadow)"/>
        <circle cx="${PAD + 56}" cy="${y + 62}" r="30" fill="${BLUE}"/>
        <text x="${PAD + 56}" y="${y + 72}" font-family="Tektur" font-weight="700" font-size="26" fill="${WHITE}" text-anchor="middle">${s.n}</text>
        <text x="${PAD + 110}" y="${y + 52}" font-family="Tektur" font-weight="700" font-size="24" fill="${INK}">${escapeXml(s.title)}</text>
        <text x="${PAD + 110}" y="${y + 88}" font-family="Tektur" font-weight="500" font-size="18" fill="${MUTED}">${escapeXml(s.meta)}</text>
      `;
    })
    .join('');

  return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${defsShared}
  ${pillLabel('PROCESO', 200)}
  <text x="${PAD}" y="330" font-family="Tektur" font-weight="700" font-size="46" fill="${INK}">Cómo trabajamos</text>
  ${list}
  ${whiteBar('Proceso claro. Proyecto a tu medida.', 1010)}
  ${footerBar()}
</svg>`;
};

/** Slide 5 — Cierre */
const buildCierre = () => `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${defsShared}
  ${pillLabel('INFORMÁTICA GONZÁLEZ', 220)}
  <text x="${PAD}" y="360" font-family="Tektur" font-weight="700" font-size="42" fill="${INK}">Transformamos tus</text>
  <text x="${PAD}" y="430" font-family="Tektur" font-weight="700" font-size="42" fill="${INK}">procesos con</text>
  <text x="${PAD}" y="500" font-family="Tektur" font-weight="700" font-size="42" fill="${BLUE}">software a medida.</text>

  <rect x="${PAD}" y="580" width="${W - PAD * 2}" height="100" rx="24" fill="${WHITE}" opacity="0.96" filter="url(#cardShadow)"/>
  <text x="${W / 2}" y="645" font-family="Tektur" font-weight="700" font-size="28" fill="${INK}" text-anchor="middle">Web · App · Integraciones</text>

  ${whiteBar('Desarrollamos el sistema que tu operación necesita.', 730)}

  <rect x="${PAD}" y="860" width="${W - PAD * 2}" height="140" rx="24" fill="url(#pillBlue)" filter="url(#cardShadow)"/>
  <text x="${W / 2}" y="930" font-family="Tektur" font-weight="700" font-size="28" fill="${WHITE}" text-anchor="middle">@informatica.gonzalez</text>
  <text x="${W / 2}" y="975" font-family="Tektur" font-weight="500" font-size="20" fill="${BLUE_SOFT}" text-anchor="middle">informaticagonzalez.com</text>

  ${footerBar()}
</svg>`;

const renderSvg = (svg) => {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: W },
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: 'Tektur',
    },
  });
  return Buffer.from(resvg.render().asPng());
};

const CAPTION = `📦 Desarrollamos el sistema que tu empresa necesita — en web o app móvil.

No vendemos software genérico. Construimos soluciones a tu medida:
• Inventario y logística
• Automatización de procesos
• Control de tickets
• APIs e integraciones
• Lo que tu operación requiera

Nuestro proceso:
1⃣ Diagnóstico
2⃣ Levantamiento técnico
3⃣ Asesoría de arquitectura
4⃣ Propuesta y desarrollo

💬 ¿Tienes un proyecto en mente? Escríbenos.
`;

const slides = [
  { file: '02-entrega.png', build: buildEntrega },
  { file: '03-soluciones.png', build: buildSoluciones },
  { file: '04-proceso.png', build: buildProceso },
  { file: '05-cierre.png', build: buildCierre },
];

const bgSoft = await sharp(Buffer.from(buildBgSvg()))
  .resize(W, H)
  .blur(1.2)
  .png()
  .toBuffer();

// Prefer exact wall color match from mockup when available
const mockup = join(outDir, '71799d26-969d-4921-9e31-eff60e5212b2.png');
let background = bgSoft;
if (existsSync(mockup)) {
  const meta = await sharp(mockup).metadata();
  const cropH = Math.min(meta.height, Math.round(meta.height * 0.35));
  background = await sharp(mockup)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .resize(W, H, { fit: 'cover', position: 'top' })
    .modulate({ brightness: 1.05, saturation: 0.95 })
    .blur(0.8)
    .png()
    .toBuffer();
}

const logoPrepared = await sharp(join(root, 'public/assets/logo-blue.png'))
  .resize(110, null, { fit: 'inside' })
  .png()
  .toBuffer();

for (const slide of slides) {
  const content = renderSvg(slide.build());
  await sharp(background)
    .composite([
      { input: content, top: 0, left: 0 },
      { input: logoPrepared, top: 48, left: PAD },
    ])
    .png()
    .toFile(join(outDir, slide.file));
  console.log(`✓ ${slide.file}`);
}

// Mantener portada con mockup + título ejecutivo
const overlayScript = join(__dirname, 'overlay-portada-mockup.mjs');
if (existsSync(mockup) && existsSync(overlayScript)) {
  spawnSync(process.execPath, [overlayScript], { stdio: 'inherit' });
} else {
  console.log('⚠ Portada mockup no regenerada (falta imagen o script)');
}

writeFileSync(join(outDir, 'caption-meta.txt'), CAPTION, 'utf8');
writeFileSync(
  join(outDir, 'meta-titulos.txt'),
  'Título: Tu sistema en web o app\nDescripción: Desarrollo a medida · Informática González\n',
  'utf8',
);

console.log(`\nCarrusel 4:5 en: ${outDir}`);
