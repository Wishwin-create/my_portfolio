import { useInView } from '../../hooks/useInView';
import SkillsOrbit3D from '../SkillsOrbit3D/SkillsOrbit3D';
import {
  SiJavascript, SiReact, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiPython, SiMysql, SiMongodb,
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { TbLetterC } from 'react-icons/tb';
import './Skills.css';

const skillCategories = [
  {
  label: 'Frontend',
  items: [
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'React', icon: <SiReact /> },
    { name: 'HTML5', icon: <SiHtml5 /> },
    { name: 'CSS3', icon: <SiCss /> },
  ],
},
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express', icon: <SiExpress /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'C', icon: <TbLetterC /> },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
    ],
  },
  {
    label: 'Cloud & Tools',
    items: [
      { name: 'AWS', icon: <FaAws /> },
    ],
  },
];

const Skills = () => {
  const [headingRef, headingInView] = useInView(0.3);
  const [orbitRef, orbitInView] = useInView(0.01);
  const [gridRef, gridInView] = useInView(0.1);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 ref={headingRef} className={`about-heading skills-heading ${headingInView ? 'in-view' : ''}`}>
          My Skills
        </h2>

        <div ref={orbitRef} className="skills-orbit-container">
          {orbitInView && <SkillsOrbit3D />}
        </div>

        <div ref={gridRef} className={`skills-list-grid ${gridInView ? 'in-view' : ''}`}>
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.label}
              className="skills-category"
              style={{ transitionDelay: `${catIndex * 0.1}s` }}
            >
              <h4 className="skills-category-title">{category.label}</h4>
              <ul className="skills-category-items">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={item.name}
                    style={{ transitionDelay: `${catIndex * 0.1 + itemIndex * 0.05}s` }}
                  >
                    <span className="skill-item-icon">{item.icon}</span>
                    <span className="skill-item-name">{item.name}</span>
                  </li>
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