// Función para sanitizar el input
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '') // Eliminar etiquetas HTML
    .replace(/[&<>"']/g, '') // Eliminar caracteres especiales peligrosos
    .trim();
};

// Función para validar el email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para validar el teléfono
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

// Función para generar un token CSRF
export const generateCSRFToken = (): string => {
  const array = new Uint32Array(8);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
};

// Función para validar el rate limiting
export const checkRateLimit = (): boolean => {
  const now = Date.now();
  const lastSubmission = localStorage.getItem('lastFormSubmission');
  
  if (lastSubmission) {
    const timeSinceLastSubmission = now - parseInt(lastSubmission);
    if (timeSinceLastSubmission < 30000) { // 30 segundos entre envíos
      return false;
    }
  }
  
  localStorage.setItem('lastFormSubmission', now.toString());
  return true;
};

// Función para detectar bots
export const isLikelyBot = (): boolean => {
  // Verificar si el usuario tiene JavaScript habilitado
  if (typeof window === 'undefined') return true;
  
  // Verificar el user agent
  const userAgent = navigator.userAgent.toLowerCase();
  const botKeywords = ['bot', 'crawler', 'spider', 'slurp', 'postman'];
  return botKeywords.some(keyword => userAgent.includes(keyword));
}; 