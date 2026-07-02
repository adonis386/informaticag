import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { submitContactForm } from '../api/contact';
import {
  isValidEmail,
  isValidPhone,
  generateCSRFToken,
  checkRateLimit,
  isLikelyBot,
} from '../utils/security';
import SectionHeader from './ui/SectionHeader';
import GSAPReveal from './ui/GSAPReveal';
import { gsap, useGSAP } from '../lib/gsap';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    csrfToken: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = generateCSRFToken();
    localStorage.setItem('csrfToken', token);
    setFormData((prev) => ({ ...prev, csrfToken: token }));
  }, []);

  useGSAP(
    () => {
      if (!formRef.current) return;

      gsap.from(formRef.current.querySelectorAll('.form-field'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: formRef }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'El nombre es requerido';
    else if (formData.name.length < 2) errors.name = 'Mínimo 2 caracteres';

    if (!formData.email.trim()) errors.email = 'El email es requerido';
    else if (!isValidEmail(formData.email)) errors.email = 'Email inválido';

    if (!formData.phone.trim()) errors.phone = 'El teléfono es requerido';
    else if (!isValidPhone(formData.phone)) errors.phone = 'Teléfono inválido';

    if (!formData.company.trim()) errors.company = 'La empresa es requerida';

    if (!formData.message.trim()) errors.message = 'El mensaje es requerido';
    else if (formData.message.length < 10) errors.message = 'Mínimo 10 caracteres';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLikelyBot() || !checkRateLimit() || !validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const currentToken = localStorage.getItem('csrfToken');
      if (!currentToken) throw new Error('Token de seguridad no encontrado');

      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        csrfToken: currentToken,
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        csrfToken: currentToken,
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `form-field w-full bg-transparent border-b py-4 text-neutral-950 placeholder:text-neutral-400 focus:outline-none transition-colors font-roboto ${
      validationErrors[field]
        ? 'border-red-500'
        : 'border-neutral-300 focus:border-neutral-950'
    }`;

  return (
    <section id="contacto" className="section-padding bg-brand-light border-t border-neutral-200">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <GSAPReveal>
            <SectionHeader
              label="Contacto"
              title="Cuéntanos tu idea"
              subtitle="Respondemos en minutos. Sin compromiso."
            />
            <div className="mt-8 space-y-4 text-neutral-500 font-roboto">
              <p>
                <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-1">
                  Email
                </span>
                contacto@informaticagonzalez.com
              </p>
              <p>
                <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-1">
                  Teléfono
                </span>
                +58 412 366 8513
              </p>
            </div>
          </GSAPReveal>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  className={inputClass('name')}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-xs mt-2">{validationErrors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  className={inputClass('email')}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-xs mt-2">{validationErrors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  className={inputClass('phone')}
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-xs mt-2">{validationErrors.phone}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Empresa"
                  className={inputClass('company')}
                />
                {validationErrors.company && (
                  <p className="text-red-500 text-xs mt-2">{validationErrors.company}</p>
                )}
              </div>
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto"
                rows={4}
                className={`${inputClass('message')} resize-none`}
              />
              {validationErrors.message && (
                <p className="text-red-500 text-xs mt-2">{validationErrors.message}</p>
              )}
            </div>

            <div className="form-field pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-dark w-full md:w-auto gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    Enviar Mensaje
                    <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>
            </div>

            {submitStatus === 'success' && (
              <p className="text-green-700 text-sm border border-green-200 bg-green-50 px-4 py-3">
                ¡Mensaje enviado! Nos pondremos en contacto contigo pronto.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 text-sm border border-red-200 bg-red-50 px-4 py-3">
                Error al enviar. Por favor, intenta nuevamente.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
