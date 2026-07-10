import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;

const PROJECT_TYPES = new Set([
  'Desarrollo Web',
  'Aplicación Móvil',
  'Sistema Empresarial',
  'E-commerce',
  'Integración CRM',
  'Otro',
]);

const sanitize = (value: unknown, maxLength = 500): string => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[&<>"']/g, '')
    .trim()
    .slice(0, maxLength);
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const body = req.body ?? {};
  const honeypot = sanitize(body.website, 100);

  if (honeypot) {
    return res.status(200).json({ success: true });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 254);
  const phone = sanitize(body.phone, 40);
  const company = sanitize(body.company, 120);
  const projectType = sanitize(body.projectType, 60);
  const message = sanitize(body.message, 5000);

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Nombre inválido' });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (!phone || !PHONE_REGEX.test(phone)) {
    return res.status(400).json({ error: 'Teléfono inválido' });
  }
  if (!company || company.length < 2) {
    return res.status(400).json({ error: 'Empresa inválida' });
  }
  if (!message || message.length < 10) {
    return res.status(400).json({ error: 'Mensaje inválido' });
  }
  if (projectType && !PROJECT_TYPES.has(projectType)) {
    return res.status(400).json({ error: 'Tipo de proyecto inválido' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY no configurada');
    return res.status(500).json({ error: 'Error de configuración del servidor' });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'contacto@informaticagonzalez.com';
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? 'Informática González <noreply@informaticagonzalez.com>';

  const resend = new Resend(apiKey);
  const subject = `Nuevo contacto: ${name}${company ? ` — ${company}` : ''}`;

  const text = [
    'Nuevo mensaje desde el formulario de contacto',
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Teléfono: ${phone}`,
    `Empresa: ${company}`,
    projectType ? `Tipo de proyecto: ${projectType}` : null,
    '',
    'Mensaje:',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(company)}</p>
    ${projectType ? `<p><strong>Tipo de proyecto:</strong> ${escapeHtml(projectType)}</p>` : ''}
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'No se pudo enviar el mensaje' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'No se pudo enviar el mensaje' });
  }
}
