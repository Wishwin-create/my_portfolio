import LogoLoop from '../LogoLoop/LogoLoop';
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress,
  SiPython, SiMysql, SiHtml5, SiCss
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';
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
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Logo loop added above the heading */}
        <div className="about-logoloop-wrapper">
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

        <h2 className="about-heading">About Me</h2>

        <div className="about-grid">
          {/* Left column — narrative */}
          <div className="about-text">
            <p>
              I'm an ICT undergraduate at the University of Colombo, passionate about
              building clean, functional, and user-focused web applications. I enjoy
              working across the full stack — from designing intuitive interfaces to
              building reliable backend systems.
            </p>
            <p>
              I take pride in writing code properly rather than patching quickly,
              and I'm always looking to deepen my understanding of the tools and
              systems I work with.
            </p>

            <div className="about-education">
              <h3>Education</h3>
              <div className="about-edu-item">
                <span className="about-edu-degree">BSc in ICT</span>
                <span className="about-edu-school">University of Colombo</span>
              </div>
            </div>
          </div>

          {/* Right column — skills grid */}
          <div className="about-skills">
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
