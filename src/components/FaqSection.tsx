import { homeFaq } from '../config/seo';

const FaqSection = () => (
  <section id="faq" className="section-padding bg-white border-t border-neutral-200">
    <div className="container-wide max-w-3xl">
      <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">FAQ</p>
      <h2 className="font-tektur text-3xl md:text-5xl font-bold text-neutral-950 mb-12 leading-[1.05]">
        Preguntas frecuentes
      </h2>
      <div className="divide-y divide-neutral-200">
        {homeFaq.map((item) => (
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
);

export default FaqSection;
