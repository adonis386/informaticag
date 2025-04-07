import { sendTelegramMessage } from './telegram';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  csrfToken: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
  try {
    // Enviar mensaje a Telegram
    await sendTelegramMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message
    });

    // Aquí podrías añadir más lógica, como guardar en una base de datos
    console.log('Formulario enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    throw error;
  }
}; 