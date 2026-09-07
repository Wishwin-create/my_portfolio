import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        {/* your portfolio sections go here */}
        <section id="home">Home</section>
        <section id="about">About</section>
        <section id="projects">Projects</section>
        <section id="contact">Contact</section>
      </main>
    </div>
  );
}

export default App;
