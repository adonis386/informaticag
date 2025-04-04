import { lazy, Suspense } from 'react';
import Header from './components/Header';

// Lazy loading de componentes
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Systems = lazy(() => import('./components/Systems'));
const WebServices = lazy(() => import('./components/WebServices'));
const WebProjects = lazy(() => import('./components/WebProjects'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));

// Componente de loading
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <main>
          <Hero />
          <About />
          <Systems />
          <WebServices />
          <WebProjects />
        </main>
        <Footer />
        <WhatsAppButton />
      </Suspense>
    </div>
  );
}

export default App;
