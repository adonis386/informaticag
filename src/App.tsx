import { lazy, Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsAppButton';
import { getServicePage } from './config/service-pages';
import { privacySeo, usePageSeo } from './hooks/usePageSeo';
import { trackPageView } from './lib/analytics';

const IntroScrollSection = lazy(() => import('./components/IntroScrollSection'));
const Marquee = lazy(() => import('./components/Marquee'));
const WebProjects = lazy(() => import('./components/WebProjects'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const CrmIntegrations = lazy(() => import('./components/CrmIntegrations'));
const ToolsWeUse = lazy(() => import('./components/ToolsWeUse'));
const About = lazy(() => import('./components/About'));
const FaqSection = lazy(() => import('./components/FaqSection'));
const FooterCTA = lazy(() => import('./components/FooterCTA'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const ServiceLanding = lazy(() => import('./pages/ServiceLanding'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border border-neutral-300 border-t-neutral-950 rounded-full animate-spin" />
  </div>
);

const getServiceSlugFromPath = (pathname: string) => {
  const match = pathname.match(/^\/servicios\/([^/]+)\/?$/);
  return match?.[1] ?? null;
};

const isContactPath = (pathname: string) => pathname === '/contacto' || pathname === '/contacto/';

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const serviceSlug = getServiceSlugFromPath(pathname);
  const servicePage = serviceSlug ? getServicePage(serviceSlug) : null;
  const contactPage = isContactPath(pathname);

  usePageSeo(
    showPrivacyPolicy
      ? {
          title: `${privacySeo.title} | Informática González`,
          description: privacySeo.description,
          robots: privacySeo.robots,
          canonicalPath: '/politica-privacidad',
        }
      : {}
  );

  useEffect(() => {
    const handleNavigation = () => {
      setPathname(window.location.pathname);
      const hash = window.location.hash;
      setShowPrivacyPolicy(hash === '#privacy-policy' || hash === '#politica-privacidad');
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  useEffect(() => {
    if (showPrivacyPolicy) {
      trackPageView('/politica-privacidad', privacySeo.title);
    }
  }, [showPrivacyPolicy]);

  const handleShowPrivacy = () => {
    setShowPrivacyPolicy(true);
    window.location.hash = '#privacy-policy';
  };

  const handleHidePrivacy = () => {
    setShowPrivacyPolicy(false);
    window.location.hash = '';
    window.history.replaceState(null, '', window.location.pathname);
  };

  if (showPrivacyPolicy) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <PrivacyPolicy onBack={handleHidePrivacy} />
      </Suspense>
    );
  }

  if (contactPage) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <ContactPage onPrivacyClick={handleShowPrivacy} />
      </Suspense>
    );
  }

  if (servicePage) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <ServiceLanding page={servicePage} onPrivacyClick={handleShowPrivacy} />
      </Suspense>
    );
  }

  if (serviceSlug) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="font-tektur text-3xl font-bold text-neutral-950">Página no encontrada</h1>
        <p className="text-neutral-500 font-roboto">El servicio que busca no existe.</p>
        <a href="/" className="btn-primary">
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light">
      <>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <main id="main-content" className="relative isolate">
            <IntroScrollSection />
            <Marquee />
            <WebProjects />
            <ServicesSection />
            <CrmIntegrations />
            <ToolsWeUse />
            <About />
            <FaqSection />
            <FooterCTA />
          </main>
          <Footer onPrivacyClick={handleShowPrivacy} />
        </Suspense>
        <WhatsAppButton />
      </>
    </div>
  );
}

export default App;
