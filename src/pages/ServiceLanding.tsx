import { useEffect } from 'react';
import { FaArrowLeft, FaExternalLinkAlt, FaWhatsapp } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import type { ServicePageConfig } from '../config/service-pages';
import { seoConfig } from '../config/seo';
import { siteConfig } from '../config/site';
import { usePageSeo } from '../hooks/usePageSeo';
import { trackPageView, trackWhatsAppClick } from '../lib/analytics';

type ServiceLandingProps = {
  page: ServicePageConfig;
  onPrivacyClick?: () => void;
};

const ServiceLanding = ({ page, onPrivacyClick }: ServiceLandingProps) => {
  const canonicalPath = `/servicios/${page.slug}`;

  usePageSeo({
    title: page.metaTitle,
    description: page.metaDescription,
    canonicalPath,
  });

  useEffect(() => {
    trackPageView(canonicalPath, page.metaTitle);
    window.scrollTo(0, 0);
  }, [canonicalPath, page.metaTitle]);

  useEffect(() => {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.name,
      description: page.metaDescription,
      provider: {
        '@type': 'Organization',
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
      },
      areaServed: ['Venezuela', 'Caracas'],
      serviceType: page.name,
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'service-page-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [serviceSchema, faqSchema],
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById('service-page-schema')?.remove();
    };
  }, [page]);

  return (
    <div className="min-h-screen bg-brand-light">
      <Header variant="dark" />

      <main id="main-content">
        <section className="bg-brand-bg text-white pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="container-wide section-padding !pt-0">
            <a
              href="/#servicios"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-brand-accent transition-colors mb-10"
            >
              <FaArrowLeft className="text-sm" />
              Servicios
            </a>

            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">{page.name}</p>
            <h1 className="font-tektur text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl">
              {page.h1}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-roboto">
              {page.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`service_${page.slug}`)}
                className="btn-primary"
              >
                Solicitar consulta
              </a>
              <a href="/#proyectos" className="btn-outline">
                Ver proyectos
              </a>
            </div>
          </div>
        </section>

        <section className="section-padding border-b border-neutral-200">
          <div className="container-wide max-w-3xl">
            <p className="text-xl md:text-2xl text-neutral-800 leading-relaxed font-roboto mb-8">
              {page.intro}
            </p>
            {page.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-neutral-500 leading-relaxed font-roboto mb-6 text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="section-padding bg-white border-b border-neutral-200">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">Beneficios</p>
            <h2 className="font-tektur text-3xl md:text-4xl font-bold text-neutral-950 mb-12 max-w-2xl">
              Por qué desarrollar su sitio con nosotros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {page.benefits.map((benefit) => (
                <article key={benefit.title} className="border-t border-neutral-200 pt-8">
                  <h3 className="font-tektur text-xl md:text-2xl font-bold text-neutral-950 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed font-roboto">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding border-b border-neutral-200">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">Proceso</p>
            <h2 className="font-tektur text-3xl md:text-4xl font-bold text-neutral-950 mb-12">
              Cómo trabajamos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {page.process.map((step) => (
                <article key={step.step} className="flex gap-6">
                  <span className="font-mono text-sm text-brand-accent shrink-0 pt-1">{step.step}</span>
                  <div>
                    <h3 className="font-tektur text-xl font-bold text-neutral-950 mb-3">{step.title}</h3>
                    <p className="text-neutral-500 leading-relaxed font-roboto">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-bg text-white border-b border-neutral-800">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">Stack</p>
            <h2 className="font-tektur text-3xl md:text-4xl font-bold mb-10">Tecnologías que usamos</h2>
            <div className="flex flex-wrap gap-3">
              {page.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] uppercase tracking-widest px-4 py-2 border border-neutral-700 text-neutral-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding border-b border-neutral-200">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">Portfolio</p>
            <h2 className="font-tektur text-3xl md:text-4xl font-bold text-neutral-950 mb-12">
              Proyectos web en producción
            </h2>
            <div className="divide-y divide-neutral-200">
              {page.relatedProjects.map((project) => (
                <article
                  key={project.url}
                  className="py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-tektur text-2xl font-bold text-neutral-950 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-neutral-500 font-roboto max-w-xl">{project.description}</p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brand-accent hover:text-brand-accent-hover transition-colors shrink-0"
                    aria-label={`Ver ${project.title}`}
                  >
                    Ver sitio
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white border-b border-neutral-200">
          <div className="container-wide max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">FAQ</p>
            <h2 className="font-tektur text-3xl md:text-4xl font-bold text-neutral-950 mb-12">
              Preguntas frecuentes
            </h2>
            <div className="divide-y divide-neutral-200">
              {page.faq.map((item) => (
                <article key={item.question} className="py-8">
                  <h3 className="font-tektur text-lg md:text-xl font-bold text-neutral-950 mb-4">
                    {item.question}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed font-roboto">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-light border-t border-neutral-200">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">
                  ¿Listo para empezar?
                </p>
                <h2 className="font-tektur text-4xl md:text-5xl font-bold text-neutral-950 leading-[1.05]">
                  Hablemos de su
                  <br />
                  <span className="text-brand-accent">proyecto web.</span>
                </h2>
              </div>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`service_${page.slug}_footer`)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent text-white text-sm uppercase tracking-widest hover:bg-brand-accent-hover transition-colors shrink-0"
              >
                WhatsApp
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer onPrivacyClick={onPrivacyClick} />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceLanding;
