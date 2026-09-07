import { useInView } from '../../hooks/useInView';
import SkillsOrbit3D from '../SkillsOrbit3D/SkillsOrbit3D';
import './Skills.css';

const skillCategories = [
  { label: 'Frontend', items: ['JavaScript', 'React', 'HTML5', 'CSS3'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'Python', 'Java', 'C'] },
  { label: 'Database', items: ['MySQL', 'MongoDB'] },
  { label: 'Cloud & Tools', items: ['AWS'] },
];

const Skills = () => {
  const [headingRef, headingInView] = useInView(0.3);
  const [orbitRef, orbitInView] = useInView(0.1);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 ref={headingRef} className={`about-heading skills-heading ${headingInView ? 'in-view' : ''}`}>
          My Skills
        </h2>

        <div ref={orbitRef} className="skills-orbit-container">
          {orbitInView && <SkillsOrbit3D />}
        </div>

        {/* Fallback list — always visible, also serves mobile users where 3D is hidden */}
        <div className="skills-list-grid">
          {skillCategories.map((category) => (
            <div key={category.label} className="skills-category">
              <h4 className="skills-category-title">{category.label}</h4>
              <ul className="skills-category-items">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;