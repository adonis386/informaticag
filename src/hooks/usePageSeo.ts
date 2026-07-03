import { useEffect } from 'react';
import { privacySeo, seoConfig } from '../config/seo';

type PageSeoOptions = {
  title?: string;
  description?: string;
  robots?: string;
  canonicalPath?: string;
};

const setMeta = (name: string, content: string, property = false) => {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
};

/** Actualiza title y meta tags en rutas/vistas del SPA (ej. política de privacidad). */
export const usePageSeo = ({ title, description, robots, canonicalPath }: PageSeoOptions) => {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDescription =
      document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    const prevRobots =
      document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
    const prevCanonical =
      (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href ?? '';

    const nextTitle = title ?? seoConfig.defaultTitle;
    const nextDescription = description ?? seoConfig.description;
    const nextRobots = robots ?? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    const nextCanonical = `${seoConfig.siteUrl}${canonicalPath ?? '/'}`;

    document.title = nextTitle;
    setMeta('description', nextDescription);
    setMeta('robots', nextRobots);
    setMeta('og:title', nextTitle, true);
    setMeta('og:description', nextDescription, true);
    setMeta('twitter:title', nextTitle);
    setMeta('twitter:description', nextDescription);
    setCanonical(nextCanonical);

    return () => {
      document.title = prevTitle;
      setMeta('description', prevDescription);
      setMeta('robots', prevRobots);
      setMeta('og:title', prevTitle, true);
      setMeta('og:description', prevDescription, true);
      setMeta('twitter:title', prevTitle);
      setMeta('twitter:description', prevDescription);
      if (prevCanonical) setCanonical(prevCanonical);
    };
  }, [title, description, robots, canonicalPath]);
};

export { privacySeo, seoConfig };
