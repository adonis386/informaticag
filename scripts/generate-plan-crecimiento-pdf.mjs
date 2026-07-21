import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'marketing');
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, 'plan-crecimiento-instagram.pdf');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Plan de crecimiento Instagram — Informática González</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Segoe UI", system-ui, sans-serif;
    color: #0a0a0a;
    line-height: 1.45;
    font-size: 11.5px;
    margin: 0;
  }
  h1 {
    font-size: 22px;
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }
  h2 {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #2563eb;
    margin: 22px 0 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #e5e5e5;
  }
  h3 {
    font-size: 12px;
    margin: 14px 0 6px;
    color: #171717;
  }
  p { margin: 0 0 8px; color: #404040; }
  .muted { color: #737373; font-size: 10.5px; }
  .hero {
    background: #0a0a0a;
    color: #fcfcfc;
    padding: 22px 24px;
    margin: 0 0 18px;
  }
  .hero p { color: #a3a3a3; margin: 0; }
  .hero strong { color: #fcfcfc; }
  .accent { color: #2563eb; }
  .badge {
    display: inline-block;
    background: #2563eb;
    color: white;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 4px 8px;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px;
    font-size: 10.5px;
  }
  th, td {
    border: 1px solid #e5e5e5;
    padding: 7px 8px;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: #f5f5f5;
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #525252;
  }
  ul { margin: 6px 0 10px; padding-left: 18px; color: #404040; }
  li { margin-bottom: 4px; }
  .box {
    border: 1px solid #e5e5e5;
    padding: 12px 14px;
    margin: 10px 0;
    background: #fcfcfc;
  }
  .box strong { color: #0a0a0a; }
  .phases {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin: 10px 0;
  }
  .phase {
    border: 1px solid #e5e5e5;
    padding: 12px;
    min-height: 140px;
  }
  .phase .pct {
    font-size: 20px;
    font-weight: 700;
    color: #2563eb;
    margin: 0 0 4px;
  }
  .phase h3 { margin-top: 0; }
  .footer {
    margin-top: 28px;
    padding-top: 10px;
    border-top: 1px solid #e5e5e5;
    font-size: 10px;
    color: #737373;
    display: flex;
    justify-content: space-between;
  }
  .summary {
    background: #eff6ff;
    border-left: 3px solid #2563eb;
    padding: 10px 12px;
    margin: 12px 0;
  }
</style>
</head>
<body>

<div class="hero">
  <div class="badge">Marketing · Instagram</div>
  <h1>Plan de crecimiento de seguidores</h1>
  <p><strong>Informática González</strong> · Estrategia orgánica + Meta Ads</p>
  <p class="muted" style="color:#737373;margin-top:8px">Julio 2026 · Objetivo: visibilidad, seguidores de calidad y conversaciones por WhatsApp</p>
</div>

<div class="summary">
  <strong>Resumen:</strong> no optimizar solo a “visitas al perfil”.
  Encadenar <strong>descubrimiento → valor → seguir → consulta</strong>.
  Los anuncios aceleran el alcance; el contenido sostiene el crecimiento.
</div>

<h2>1. Estrategia orgánica (base)</h2>
<p>Frecuencia alineada a la grilla de contenido:</p>
<table>
  <thead>
    <tr><th>Canal</th><th>Ritmo</th><th>Enfoque</th></tr>
  </thead>
  <tbody>
    <tr><td>Feed</td><td>Lunes · Miércoles · Viernes</td><td>Educativo, casos, servicios / CTA</td></tr>
    <tr><td>Stories</td><td>Casi diario (1–3)</td><td>Encuestas, tips, behind the scenes</td></tr>
    <tr><td>Reels</td><td>1–2 por semana</td><td>Formato que más crece: tips + proyectos reales</td></tr>
  </tbody>
</table>
<p>Lo que más sube seguidores: <strong>Reels educativos + casos reales</strong>, no solo posts estáticos.</p>

<h2>2. Publicidad: objetivos de Meta Ads</h2>
<table>
  <thead>
    <tr><th>Objetivo</th><th>Para qué sirve</th><th>¿Para seguidores?</th></tr>
  </thead>
  <tbody>
    <tr><td>Visitas al perfil</td><td>Notoriedad rápida</td><td>Débil: mucha gente entra y no sigue</td></tr>
    <tr><td>Interacción</td><td>Likes, guardados, comentarios</td><td>Mejor que visitas</td></tr>
    <tr><td>Reproducciones / ThruPlay</td><td>Alcance barato con Reels</td><td>Bueno para descubrirte</td></tr>
    <tr><td>Mensajes (WhatsApp)</td><td>Clientes y consultas</td><td>El más valioso para el negocio</td></tr>
    <tr><td>Tráfico al sitio (/contacto)</td><td>Leads al formulario</td><td>Útil con el form activo</td></tr>
  </tbody>
</table>
<p><strong>Recomendación:</strong> no usar solo “visitas al perfil” como estrategia principal.</p>

<h2>3. Estructura de campañas (Mes 1)</h2>
<div class="phases">
  <div class="phase">
    <div class="pct">60%</div>
    <h3>A · Descubrimiento</h3>
    <p>Objetivo: reproducciones de video o interacción.</p>
    <p>Creativo: Reel (web / 5 señales / caso).</p>
    <p>Meta: que te conozcan y vean valor.</p>
  </div>
  <div class="phase">
    <div class="pct">20%</div>
    <h3>B · Perfil</h3>
    <p>Objetivo: visitas al perfil o interacción al mejor post.</p>
    <p>Solo con el Reel/carrusel que ya rindió en orgánico.</p>
    <p>Presupuesto bajo: refuerzo, no pilar.</p>
  </div>
  <div class="phase">
    <div class="pct">20%</div>
    <h3>C · Conversión</h3>
    <p>Objetivo: mensajes → WhatsApp.</p>
    <p>Copy: app o sistema para tu negocio.</p>
    <p>Aquí ganas clientes, no solo followers.</p>
  </div>
</div>

<h2>4. Presupuesto orientativo</h2>
<table>
  <thead>
    <tr><th>Nivel</th><th>Diario</th><th>Semanal</th></tr>
  </thead>
  <tbody>
    <tr><td>Test</td><td>$3–5 USD</td><td>~$25–35</td></tr>
    <tr><td>Activo</td><td>$8–15 USD</td><td>~$60–100</td></tr>
  </tbody>
</table>
<p>Priorizar <strong>1–2 creativos</strong> (Reel + carrusel de señales), no muchos anuncios a la vez.</p>

<h2>5. Creativos listos para potenciar</h2>
<ul>
  <li>Carrusel “5 señales de que necesitas un sistema empresarial”</li>
  <li>Reel scroll reveal de informaticagonzalez.com</li>
  <li>Casos: Soluciones CGT, LogiTrack, servicios</li>
</ul>
<p>Ángulo de perfil más emprendedor: <em>apps + software</em> para negocios que quieren crecer.</p>

<h2>6. KPIs a medir (Mes 1)</h2>
<table>
  <thead>
    <tr><th>Métrica</th><th>Meta sugerida</th></tr>
  </thead>
  <tbody>
    <tr><td>Publicaciones feed</td><td>12</td></tr>
    <tr><td>Reels</td><td>4–6</td></tr>
    <tr><td>Seguidores (orgánico + ads)</td><td>+80–150</td></tr>
    <tr><td>Clics link en bio</td><td>20+</td></tr>
    <tr><td>Conversaciones WhatsApp desde IG</td><td>3–5</td></tr>
    <tr><td>Guardados en posts educativos</td><td>Idealmente &gt; likes</td></tr>
  </tbody>
</table>

<h3>En Ads Manager, priorizar:</h3>
<ol>
  <li>Costo por visita al perfil</li>
  <li>% que sigue después de visitar (si Meta lo muestra)</li>
  <li>Guardados y compartidos</li>
  <li>Conversaciones de WhatsApp</li>
  <li>Clics al link en bio / formulario /contacto</li>
</ol>

<h2>7. Conclusión operativa</h2>
<div class="box">
  <p><strong>1.</strong> Mantener la grilla orgánica (Lun / Mié / Vie + Stories + Reels).</p>
  <p><strong>2.</strong> Ads: primeras campañas a <strong>reproducciones / interacción</strong> con Reels.</p>
  <p><strong>3.</strong> Usar “visitas al perfil” solo como refuerzo del mejor creativo.</p>
  <p><strong>4.</strong> Reservar parte del presupuesto a <strong>WhatsApp</strong> (clientes reales).</p>
  <p><strong>5.</strong> Medir conversaciones y guardados, no solo seguidores.</p>
</div>

<div class="footer">
  <span>Informática González · informaticagonzalez.com</span>
  <span>Instagram @informatica.gonzalez</span>
</div>

</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
});
await browser.close();

console.log(`PDF generado: ${outPath}`);
