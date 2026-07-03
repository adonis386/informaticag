import { useRef } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';
import { gsap, useGSAP } from '../lib/gsap';
import { featuredProjects } from '../config/projects';

const WebProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }

      if (!listRef.current) return;

      listRef.current.querySelectorAll('.project-row').forEach((item) => {
        gsap.from(item, {
          y: 36,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 92%',
            end: 'top 68%',
            scrub: 1,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="proyectos" ref={sectionRef} className="relative z-10 bg-brand-bg text-white">
      <div ref={headerRef} className="section-padding pb-0">
        <div className="container-wide">
          <SectionHeader
            label="Works"
            title="Proyectos seleccionados"
            subtitle="Proyectos en producción — diseño, código y estrategia en acción."
            dark
          />
        </div>
      </div>

      <div className="container-wide section-padding !pt-0">
        <div ref={listRef} className="divide-y divide-neutral-800">
          {featuredProjects.map((project, index) => (
            <article
              key={project.url}
              className="project-row group grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 md:py-16 items-center"
            >
              <div className="lg:col-span-1 hidden lg:block">
                <span className="text-xs text-neutral-600 font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-5 overflow-hidden aspect-[16/10] bg-neutral-900 block"
                aria-label={`Ver ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={`Portada de ${project.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
                />
              </a>

              <div className="lg:col-span-6 lg:pl-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs text-neutral-600 uppercase tracking-widest">
                    {project.year}
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-brand-accent transition-colors"
                    aria-label={`Abrir ${project.title}`}
                  >
                    <FaExternalLinkAlt className="text-sm" />
                  </a>
                </div>
                <h3 className="font-tektur text-3xl md:text-4xl font-bold mb-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group-hover:text-brand-accent transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-neutral-400 leading-relaxed mb-6 font-roboto">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-neutral-700 text-neutral-500 group-hover:border-brand-accent/50 group-hover:text-brand-accent/80 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebProjects;
