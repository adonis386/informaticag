import { sendTelegramMessage } from './telegram';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  csrfToken: string;
}

export const submitContactForm = async (formData: ContactFormData) => {
  // Validar que todos los campos requeridos estén presentes
  if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.message || !formData.csrfToken) {
    throw new Error('Todos los campos son requeridos');
  }

  // Validar el token CSRF
  const storedToken = localStorage.getItem('csrfToken');
  if (!storedToken || storedToken !== formData.csrfToken) {
    throw new Error('Token de seguridad inválido');
  }

  const message = `
<b>Nuevo mensaje de contacto</b>
  
👤 <b>Nombre:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
📱 <b>Teléfono:</b> ${formData.phone}
🏢 <b>Empresa:</b> ${formData.company}

💬 <b>Mensaje:</b>
${formData.message}

🔒 <b>Token de Seguridad:</b> ${formData.csrfToken}
  `;

  return await sendTelegramMessage(message);
}; 