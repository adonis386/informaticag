import { TELEGRAM_API_URL, TELEGRAM_CHAT_ID } from '../config/telegram';

interface TelegramMessage {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export const sendTelegramMessage = async (data: TelegramMessage): Promise<void> => {
  const message = `
🆕 Nuevo mensaje de contacto:
👤 Nombre: ${data.name}
📧 Email: ${data.email}
📱 Teléfono: ${data.phone}
🏢 Empresa: ${data.company}
💬 Mensaje: ${data.message}
  `.trim();

  try {
    console.log('Enviando mensaje a Telegram...');
    console.log('URL:', TELEGRAM_API_URL);
    console.log('Chat ID:', TELEGRAM_CHAT_ID);

    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const responseData = await response.json();
    console.log('Respuesta de Telegram:', responseData);

    if (!response.ok) {
      throw new Error(`Error al enviar mensaje a Telegram: ${responseData.description || 'Error desconocido'}`);
    }
  } catch (error) {
    console.error('Error detallado en sendTelegramMessage:', error);
    throw new Error(`Error al enviar mensaje a Telegram: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}; 