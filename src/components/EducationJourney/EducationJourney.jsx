import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import './EducationJourney.css';

const milestones = [
  {
    year: '2024 - Present',
    title: 'Bachelor of Information & Communication Technology',
    place: 'University of Colombo, Faculty of Technology',
    detail: [
      'Coursework spanning software engineering, mobile application development, and programming.',
      'Hands-on project work across full-stack web and Android development.',
      'Statistical data analysis and applied problem-solving through academic projects.',
    ],
  },
  {
    year: '2023',
    title: 'Diploma in English Language',
    place: "Sri Lanka English Language Graduates/' Association (SLEGA)",
    detail: [
      'Completed a comprehensive English language program, enhancing communication skills.',
      'Focused on advanced grammar, vocabulary, and effective writing techniques.'

    ],
  },
  {
    year: '2022',
    title: 'Advanced Level, Technology Stream',
    place: 'Mahinda Rajapaksa College, Homagama',
    detail: [
      'Science for Technoloy  - A',
      'Engineering Technology - B',
      'Information & Communication Technology - A',
    ],
  },
];

const EducationJourney = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const nodeRefs = useRef([]);
  const [titleRef, titleInView] = useInView(0.3);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const total = rect.height - viewportH * 0.5;
      const scrolled = viewportH * 0.75 - rect.top;
      const ratio = Math.min(1, Math.max(0, scrolled / total));
      setProgress(ratio);

      let newActiveIndex = -1;
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const nodeRect = node.getBoundingClientRect();
        if (nodeRect.top < viewportH * 0.75) {
          newActiveIndex = i;
        }
      });
      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="journey-wrapper" ref={containerRef}>
      <h3 ref={titleRef} className={`journey-title about-heading ${titleInView ? 'in-view' : ''}`}>
        My Education
      </h3>

      <div className="journey-track">
        <div className="journey-line-bg" />
        <div className="journey-line-progress" style={{ height: `${progress * 100}%` }} />

       {milestones.map((item, index) => {
  const isLeft = index % 2 === 0;
  return (
    <div
      key={item.year}
      ref={(el) => (nodeRefs.current[index] = el)}
      className={`journey-row ${isLeft ? 'row-left' : 'row-right'} ${index <= activeIndex ? 'active' : ''}`}
    >
      <div className="journey-side card-side">
        <div className="journey-card">
          <h4 className="journey-node-title">{item.title}</h4>
          <span className="journey-place">{item.place}</span>
          <ul className="journey-detail-list">
            {item.detail.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="journey-node-icon">
        <span className="journey-dot" />
      </div>

      <div className="journey-side year-side">
        <span className="journey-year">{item.year}</span>
      </div>
    </div>
  );
})}
      </div>
    </div>
  );
};

export default EducationJourney;