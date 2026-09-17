import { lazy, Suspense } from 'react';
import LogoLoop from '../LogoLoop/LogoLoop';
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress,
  SiPython, SiMysql, SiHtml5, SiCss
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';
import RotatingText from '../RotatingText/RotatingText';
import { useInView } from '../../hooks/useInView';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import './About.css';
import EducationJourney from '../EducationJourney/EducationJourney';

// Three.js is only needed after the character enters the viewport.
const DevCharacter3D = lazy(() => import('../DevCharacter3D/DevCharacter3D'));


const techLogos = [
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiExpress />, title: 'Express', href: 'https://expressjs.com' },
  { node: <SiPython />, title: 'Python', href: 'https://python.org' },
  { node: <FaJava />, title: 'Java', href: 'https://www.java.com' },
  { node: <SiHtml5 />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { node: <SiCss />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <FaAws />, title: 'AWS', href: 'https://aws.amazon.com' },
];

const About = () => {
  const [logoRef, logoInView] = useInView(0.2);
  const [headingRef, headingInView] = useInView(0.2);
  const [textRef, textInView] = useInView(0.2);
  // The canvas changes the wrapper's height when it mounts. Observing that
  // same wrapper with a toggling observer can cause a mobile mount/unmount
  // loop, which presents as a flicker. Load the scene once when reached.
  const [charRef, charInView] = useInViewOnce(0.1);

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div ref={logoRef} className={`about-logoloop-wrapper ${logoInView ? 'in-view' : ''}`}>
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={36}
            gap={48}
            pauseOnHover
            fadeOut
            fadeOutColor="#000000"
            scaleOnHover
            ariaLabel="Technologies I work with"
          />
        </div>

        <div className="about-rotating-wrapper">
          <span className="about-rotating-label">Creative</span>
          <RotatingText
            texts={['Thinking', 'Designing', 'Developing']}
            mainClassName="rotating-text-pill"
            staggerFrom="last"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="rotating-text-split"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
            splitBy="characters"
            auto
            loop
          />
        </div>

        <h2 ref={headingRef} className={`about-heading ${headingInView ? 'in-view' : ''}`}>
          About Me
        </h2>
       <div className="about-main-grid">
        <div className="about-text" ref={textRef}>
          <p className={textInView ? 'in-view' : ''}>
            I'm an ICT undergraduate at the University of Colombo, passionate about
            building clean, functional, and user-focused web applications. I enjoy
            working across the full stack - from designing intuitive interfaces to
            building reliable backend systems.
          </p>
          <p className={textInView ? 'in-view' : ''}>
            I take pride in writing code properly rather than patching quickly,
            and I'm always looking to deepen my understanding of the tools and
            systems I work with.
          </p>

          {/*Download CV button */}
          <a
            href="/Wishwin_Gesara_CV.pdf"
            download
            className={`about-cv-button ${textInView ? 'in-view' : ''}`}
          >
            Download CV
          </a>
        </div>


          <div ref={charRef} className="about-character-wrapper">
             {charInView && (
               <Suspense fallback={null}>
                 <DevCharacter3D />
               </Suspense>
             )}
          </div>
      </div>
       <EducationJourney />
      </div>
    </section>
  );
};

export default About;
