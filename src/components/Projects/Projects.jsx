import { useInView } from '../../hooks/useInView';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

import compassLkImg from '../../assets/projects/compass-lk.webp';
import fotboxingImg from '../../assets/projects/fotboxing-web.webp';
import ecoLearnImg from '../../assets/projects/EcoLearn.webp';
import cineVaultImg from '../../assets/projects/CineVault.webp';
import doNextImg from '../../assets/projects/DoNext.webp';

const projects = [
  {
    title: 'Compass LK',
    image: compassLkImg,
    description: 'Compass LK is a web-based travel planning system developed to help users explore destinations in Sri Lanka, organize travel itineraries, and manage personalized trip experiences through a user-friendly interface.',
    tags: ['HTML', 'CSS', 'JS', 'Node.js','Express.js', 'SQL'],
    github: 'https://github.com/Wishwin-create/Compass---LK-',
    live: '',
  },
  {
    title: 'FOTBOXING_WEB',
    image: fotboxingImg,
    description: 'FOTBOXING is a modern responsive web application developed for the Faculty of Technology, University of Colombo, to promote and showcase the university’s boxing activities. The website provides information about boxing events, athletes, training activities, and the university boxing community through an engaging and user-friendly interface.',
    tags: ['React', 'Vite', 'CSS'],
    github: 'https://github.com/Wishwin-create/FOTBOXING-WEB.git',
    live: 'https://fotboxing-web-p2vi.vercel.app/',
  },
  {
    title: 'EcoLearn',
    image: ecoLearnImg,
    description: 'EcoLearn is an interactive multimedia learning application designed to raise awareness about waste management and recycling practices among students and the general public. The project aims to educate users through engaging visuals and animations to make learning about environmental responsibility both fun and memorable.',
    tags: ['React', 'CSS'],
    github: 'https://github.com/Wishwin-create/ecolearn-website',
    live: 'https://ecolearn-website.vercel.app/',
  },
  {
    title: 'CineVault',
    image: cineVaultImg,
    description: 'CineVault provides a complete entertainment management experience where users can explore featured titles, search content, view detailed metadata, create personal watchlists, and stream locally stored videos with smooth playback support.',
    tags: ['React', 'Express.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/Wishwin-create/CINE_VAULT',
    live: '',
  },
  {
    title: 'DoNext',
    image: doNextImg,
    description: 'DoNext is a clean and modern Android task management application designed to help users organize daily activities, manage schedules, and improve productivity with a smooth and user-friendly experience.',
    tags: ['Java', 'Android XML', 'SQLite'],
    github: 'https://github.com/Wishwin-create/DoNext',
    live: '',
  }
];

const Projects = () => {
  const [headingRef, headingInView] = useInView(0.01);
  const [gridRef, gridInView] = useInView(0.01);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2
          ref={headingRef}
          className={`about-heading projects-heading ${headingInView ? 'in-view' : ''}`}
        >
          My Projects
        </h2>

        <div ref={gridRef} className={`projects-grid ${gridInView ? 'in-view' : ''}`}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="project-image"
                  loading="lazy"
                  width="800"
                  height="500"
                />
                <div className="project-image-overlay">
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer noopener" aria-label={`${project.title} GitHub repository`}>
                        <FaGithub />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer noopener" aria-label={`${project.title} live site`}>
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;