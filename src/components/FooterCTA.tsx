import { siteConfig } from '../config/site';
import GSAPReveal from './ui/GSAPReveal';

const FooterCTA = () => (
  <section id="contacto" className="section-padding bg-brand-light border-t border-neutral-200">
    <div className="container-wide">
      <GSAPReveal>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6">
              ¿Tienes un proyecto?
            </p>
            <h2 className="font-tektur text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-950 leading-[1.05]">
              Hablemos
              <br />
              <span className="text-neutral-400">de ideas.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:pb-2">
            <a href={`mailto:${siteConfig.email}`} className="btn-dark">
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-neutral-950 text-neutral-950 text-sm uppercase tracking-widest hover:bg-neutral-950 hover:text-white transition-all"
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
