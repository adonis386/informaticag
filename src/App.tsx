import { lazy, Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy loading de componentes
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Systems = lazy(() => import('./components/Systems'));
const WebServices = lazy(() => import('./components/WebServices'));
const WebProjects = lazy(() => import('./components/WebProjects'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));

// Componente de loading
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  // Leer el hash de la URL al cargar
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#privacy-policy' || hash === '#politica-privacidad') {
      setShowPrivacyPolicy(true);
    }
  }, []);

  // Escuchar cambios en el hash
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
    <div className="min-h-screen bg-gray-50">
      {showPrivacyPolicy ? (
        <Suspense fallback={<LoadingSpinner />}>
          <PrivacyPolicy onBack={handleHidePrivacy} />
        </Suspense>
      ) : (
        <>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <main>
              <Hero />
              <About />
              <Systems />
              <WebServices />
              <WebProjects />
              <ContactForm />
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
