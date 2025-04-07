import { useState, useEffect } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import { submitContactForm } from '../api/contact';
import {  
  isValidEmail, 
  isValidPhone, 
  generateCSRFToken, 
  checkRateLimit,
  isLikelyBot 
} from '../utils/security';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    csrfToken: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Generar token CSRF al montar el componente
  useEffect(() => {
    const token = generateCSRFToken();
    localStorage.setItem('csrfToken', token);
    setFormData(prev => ({
      ...prev,
      csrfToken: token
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value // Ya no sanitizamos el input aquí para permitir espacios
    }));
    // Limpiar error de validación cuando el usuario escribe
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = 'Por favor ingresa un teléfono válido';
    }

    if (!formData.company.trim()) {
      errors.company = 'La empresa es requerida';
    }

    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si es un bot
    if (isLikelyBot()) {
      setSubmitStatus('error');
      return;
    }

    // Verificar rate limiting
    if (!checkRateLimit()) {
      setSubmitStatus('error');
      return;
    }

    // Validar el formulario
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Obtener el token actual del localStorage
      const currentToken = localStorage.getItem('csrfToken');
      if (!currentToken) {
        throw new Error('Token de seguridad no encontrado');
      }

      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        csrfToken: currentToken
      });
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        csrfToken: currentToken // Mantener el mismo token
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-tektur font-bold mb-4 text-gray-800">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Listo para transformar tu negocio? Déjanos tus datos y nos pondremos en contacto contigo.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  required
                  minLength={2}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    validationErrors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  required
                  className={`w-full pl-10 pr-4 py-3 border ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  required
                  className={`w-full pl-10 pr-4 py-3 border ${
                    validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Empresa"
                  required
                  className={`w-full pl-10 pr-4 py-3 border ${
                    validationErrors.company ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                />
                {validationErrors.company && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.company}</p>
                )}
              </div>
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto"
                required
                minLength={10}
                rows={4}
                className={`w-full px-4 py-3 border ${
                  validationErrors.message ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              />
              {validationErrors.message && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center px-8 py-3 rounded-lg text-white font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </button>
              <p className="mt-4 text-sm text-gray-500">
                * Nos pondremos en contacto contigo en un máximo de 10 minutos
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="text-center text-green-600 bg-green-100 py-3 px-4 rounded-lg">
                ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-center text-red-600 bg-red-100 py-3 px-4 rounded-lg">
                Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 