import LogoLoop from '../LogoLoop/LogoLoop';
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress,
  SiPython, SiMysql, SiHtml5, SiCss
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';
import RotatingText from '../RotatingText/RotatingText';
import { useInView } from '../../hooks/useInView';
import './About.css';

const skills = [
  'JavaScript', 'React', 'Node.js', 'Express',
  'Python', 'Java', 'HTML5', 'CSS3', 'MySQL', 'AWS'
];

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
  const [eduRef, eduInView] = useInView(0.2);
  const [skillsRef, skillsInView] = useInView(0.2);

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

        <div className="about-grid">
          <div className="about-text" ref={textRef}>
            <p className={textInView ? 'in-view' : ''}>
              I'm an ICT undergraduate at the University of Colombo, passionate about
              building clean, functional, and user-focused web applications. I enjoy
              working across the full stack — from designing intuitive interfaces to
              building reliable backend systems.
            </p>
            <p className={textInView ? 'in-view' : ''}>
              I take pride in writing code properly rather than patching quickly,
              and I'm always looking to deepen my understanding of the tools and
              systems I work with.
            </p>

            <div ref={eduRef} className={`about-education ${eduInView ? 'in-view' : ''}`}>
              <h3>Education</h3>
              <div className="about-edu-item">
                <span className="about-edu-degree">BSc in ICT</span>
                <span className="about-edu-school">University of Colombo</span>
              </div>
            </div>
          </div>

          <div ref={skillsRef} className={`about-skills ${skillsInView ? 'in-view' : ''}`}>
            <h3>Tech Stack</h3>
            <div className="about-skills-grid">
              {skills.map((skill) => (
                <div key={skill} className="about-skill-chip">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;