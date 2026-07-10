import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import WhatsAppButton from '../components/WhatsAppButton';
import { contactSeo } from '../config/seo';
import { usePageSeo } from '../hooks/usePageSeo';
import { trackPageView } from '../lib/analytics';

type ContactPageProps = {
  onPrivacyClick?: () => void;
};

const ContactPage = ({ onPrivacyClick }: ContactPageProps) => {
  usePageSeo({
    title: contactSeo.title,
    description: contactSeo.description,
    canonicalPath: '/contacto',
  });

  useEffect(() => {
    trackPageView('/contacto', contactSeo.title);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-light">
      <Header variant="dark" />

      <main id="main-content">
        <section className="pt-32 md:pt-40 pb-4 border-b border-neutral-200">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-4">Contacto</p>
            <h1 className="font-tektur text-4xl md:text-6xl font-bold text-neutral-950 leading-tight max-w-3xl">
              Cuéntanos tu proyecto
            </h1>
            <p className="mt-6 text-neutral-500 font-roboto text-lg max-w-2xl">
              Completa el formulario y te respondemos en minutos. Sin compromiso.
            </p>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer onPrivacyClick={onPrivacyClick} />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
