import { analyticsConfig } from '../config/analytics';

type EventParams = Record<string, string | number | boolean | undefined>;

const gtag = (...args: unknown[]) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...args);
};

export const trackEvent = (eventName: string, params?: EventParams) => {
  gtag('event', eventName, params);
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  gtag('config', analyticsConfig.measurementId, {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

export const trackWhatsAppClick = (location: string) => {
  trackEvent('whatsapp_click', {
    event_category: 'conversion',
    event_label: location,
    method: 'whatsapp',
  });
};

export const trackEmailClick = (location: string) => {
  trackEvent('email_click', {
    event_category: 'conversion',
    event_label: location,
    method: 'email',
  });
};

export const trackContactClick = (location: string) => {
  trackEvent('contact_click', {
    event_category: 'conversion',
    event_label: location,
    method: 'contact_section',
  });
};

export const trackContactFormSubmit = (projectType: string) => {
  trackEvent('contact_form_submit', {
    event_category: 'conversion',
    event_label: projectType,
    method: 'contact_form',
  });
};
