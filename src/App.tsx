import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import WebProjects from './components/WebProjects'
import Footer from './components/Footer'
import WebServices from './components/WebServices'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <WebProjects />
        <WebServices />
        {/* Add other sections here */}
      </main>
      <Footer />
    </div>
  )
}

export default App
