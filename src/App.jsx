import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Certifications from './components/Certifications/Certifications';
import Contact from './components/Contact/Contact';
import moonImage from './moon.webp';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
         <Projects />
        <Certifications />
        <Contact />
      </main>
      <div className="portfolio-moon">
       <img src={moonImage} alt="" loading="lazy" width="1600" height="569" />
      </div>
    </div>
  );
}

export default App;
