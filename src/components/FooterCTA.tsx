import { siteConfig } from '../config/site';
import GSAPReveal from './ui/GSAPReveal';
import { trackContactClick, trackWhatsAppClick } from '../lib/analytics';

const FooterCTA = () => (
  <section id="contacto" className="section-padding bg-brand-light border-t border-neutral-200">
    <div className="container-wide">
      <GSAPReveal>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">
              ¿Tienes un proyecto?
            </p>
            <h2 className="font-tektur text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-950 leading-[1.05]">
              Hablemos
              <br />
              <span className="text-brand-accent">de ideas.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:pb-2">
            <a
              href="/contacto"
              onClick={() => trackContactClick('footer_cta')}
              className="btn-dark"
            >
              Formulario de contacto
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('footer_cta')}
              className="btn-outline-dark"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </GSAPReveal>
    </div>
  </section>
);

export default FooterCTA;
