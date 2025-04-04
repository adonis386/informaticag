import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WebServices from './components/WebServices';
import WebProjects from './components/WebProjects';
import Footer from './components/Footer';
import Systems from './components/Systems';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Systems />
        <WebServices />
        <WebProjects />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
