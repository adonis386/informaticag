import { lazy, Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsAppButton';

const IntroScrollSection = lazy(() => import('./components/IntroScrollSection'));
const Marquee = lazy(() => import('./components/Marquee'));
const WebProjects = lazy(() => import('./components/WebProjects'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const About = lazy(() => import('./components/About'));
const FooterCTA = lazy(() => import('./components/FooterCTA'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border border-neutral-300 border-t-neutral-950 rounded-full animate-spin" />
  </div>
);

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#privacy-policy' || hash === '#politica-privacidad') {
      setShowPrivacyPolicy(true);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setShowPrivacyPolicy(hash === '#privacy-policy' || hash === '#politica-privacidad');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleShowPrivacy = () => {
    setShowPrivacyPolicy(true);
    window.location.hash = '#privacy-policy';
  };

  const handleHidePrivacy = () => {
    setShowPrivacyPolicy(false);
    window.location.hash = '';
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-brand-light">
      {showPrivacyPolicy ? (
        <Suspense fallback={<LoadingSpinner />}>
          <PrivacyPolicy onBack={handleHidePrivacy} />
        </Suspense>
      ) : (
        <>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <main className="relative isolate">
              {/* 1. Impacto */}
              <IntroScrollSection />
              <Marquee />
              <WebProjects />
              {/* 3. Qué hacemos */}
              <ServicesSection />
              {/* 4. Credibilidad breve */}
              <About />
              <FooterCTA />
            </main>
            <Footer onPrivacyClick={handleShowPrivacy} />
          </Suspense>
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}

export default App;
