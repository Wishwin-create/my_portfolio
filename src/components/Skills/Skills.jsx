import { lazy, Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { useInView } from '../../hooks/useInView';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import {
  SiJavascript, SiReact, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiPython, SiMysql, SiMongodb,
} from 'react-icons/si';
import { FaJava, FaAws, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TbLetterC } from 'react-icons/tb';
import { Monitor, Server, Database, Cloud } from 'lucide-react';
import './Skills.css';

const SkillsOrbit3D = lazy(() => import('../SkillsOrbit3D/SkillsOrbit3D'));

const skillCategories = [
  {
    label: 'Frontend',
    accent: '#ffffff',
    logo: <Monitor size={16} strokeWidth={2.2} />,
    items: [
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
      { name: 'React', icon: <SiReact />, color: '#61dafb' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#e34f26' },
      { name: 'CSS3', icon: <SiCss />, color: '#1572b6' },
    ],
  },
  {
    label: 'Backend',
    accent: '#ffffff',
    logo: <Server size={16} strokeWidth={2.2} />,
    items: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#5fa04e' },
      { name: 'Express', icon: <SiExpress />, color: '#ffffff' },
      { name: 'Python', icon: <SiPython />, color: '#3776ab' },
      { name: 'Java', icon: <FaJava />, color: '#f89820' },
      { name: 'C', icon: <TbLetterC />, color: '#00599c' },
    ],
  },
  {
    label: 'Database',
    accent: '#ffffff',
    logo: <Database size={16} strokeWidth={2.2} />,
    items: [
      { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
    ],
  },
  {
    label: 'Cloud',
    accent: '#ffffff',
    logo: <Cloud size={16} strokeWidth={2.2} />,
    items: [
      { name: 'AWS', icon: <FaAws />, color: '#ff9900' },
    ],
  },
];

// Three copies back-to-back: [clone][real][clone] — lets us scroll "past the end"
// into a clone, then silently snap back to the matching spot in the real set.
const LOOPED_CATEGORIES = [...skillCategories, ...skillCategories, ...skillCategories];
const SET_COUNT = skillCategories.length;

const Skills = () => {
  const [headingRef, headingInView] = useInView(0.3);
  const [orbitRef, orbitInView] = useInView(0, '200px 0px 200px 0px');
  const [gridRef, gridInView] = useInViewOnce(0.1);

  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isJumpingRef = useRef(false);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector('.skills-card');
    if (!track || !card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.offsetWidth + gap;
  }, []);

  // Start scrolled into the MIDDLE copy, so there's room to scroll both directions.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    track.scrollLeft = step * SET_COUNT;
  }, [getStep]);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track || isJumpingRef.current) return;
    const step = getStep();
    if (!step) return;

    const rawIndex = Math.round(track.scrollLeft / step);
    setActiveIndex(((rawIndex % SET_COUNT) + SET_COUNT) % SET_COUNT);

    const minSafe = step * SET_COUNT;
    const maxSafe = step * SET_COUNT * 2;

    if (track.scrollLeft < minSafe) {
      isJumpingRef.current = true;
      track.scrollLeft += step * SET_COUNT;
      requestAnimationFrame(() => { isJumpingRef.current = false; });
    } else if (track.scrollLeft > maxSafe) {
      isJumpingRef.current = true;
      track.scrollLeft -= step * SET_COUNT;
      requestAnimationFrame(() => { isJumpingRef.current = false; });
    }
  }, [getStep]);

  useEffect(() => {
    updateScrollState();
    const handleResize = () => {
      const track = trackRef.current;
      if (track) track.scrollLeft = getStep() * SET_COUNT;
      updateScrollState();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollState, getStep]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    // Always target the matching card inside the MIDDLE set, so direction stays natural.
    track.scrollTo({ left: step * (SET_COUNT + i), behavior: 'smooth' });
  };

  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 ref={headingRef} className={`about-heading skills-heading ${headingInView ? 'in-view' : ''}`}>
          My Skills
        </h2>

        <div ref={orbitRef} className="skills-orbit-container">
          {orbitInView && (
            <Suspense fallback={null}>
              <SkillsOrbit3D />
            </Suspense>
          )}
        </div>

        <div ref={gridRef} className={`skills-carousel ${gridInView ? 'in-view' : ''}`}>
          <div className="skills-carousel-controls">
            <button
              className="skills-arrow"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous category"
            >
              <FaChevronLeft />
            </button>
            <button
              className="skills-arrow"
              onClick={() => scrollByCard(1)}
              aria-label="Next category"
            >
              <FaChevronRight />
            </button>
          </div>

          <div
            ref={trackRef}
            className="skills-track"
            onScroll={updateScrollState}
            tabIndex={0}
            aria-label="Skill categories"
          >
            {LOOPED_CATEGORIES.map((category, idx) => (
              <div
                key={`${category.label}-${idx}`}
                className="skills-card"
                style={{
                  transitionDelay: `${(idx % SET_COUNT) * 0.1}s`,
                  '--accent': category.accent,
                }}
                onMouseMove={handleSpotlight}
              >
                <div className="skills-card-head">
                  <span className="skills-card-logo" aria-label={`${category.label} logo`}>
                    {category.logo}
                  </span>
                  <span className="skills-card-count">
                    {category.items.length} {category.items.length === 1 ? 'skill' : 'skills'}
                  </span>
                </div>

                <h4 className="skills-category-title">{category.label}</h4>

                <ul className="skills-category-items">
                  {category.items.map((item, itemIndex) => (
                    <li key={item.name} style={{ '--brand': item.color, '--i': itemIndex }}>
                      <span className="skill-item-icon">{item.icon}</span>
                      <span className="skill-item-name">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="skills-dots" role="tablist" aria-label="Skill category pagination">
            {skillCategories.map((category, i) => (
              <button
                key={category.label}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to ${category.label}`}
                className={`skills-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;