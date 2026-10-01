import { useState, useMemo } from 'react';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountup';
import { updateCardSpotlight } from '../../cardSpotlight';
import { FaAward, FaClock, FaLayerGroup, FaBolt, FaMedal, FaStar, FaCheckCircle } from 'react-icons/fa';
import './Certifications.css';

import cert1Img from '../../assets/certs/Solo Learn Python Developer.webp';
import cert2Img from '../../assets/certs/Solo Learn Web Development.webp';
import cert3Img from '../../assets/certs/Front End Development.webp';
import cert4Img from '../../assets/certs/Python Programming beginner.webp';
import cert5img from '../../assets/certs/Web development beginner.webp';  
import cert6Img from '../../assets/certs/JavaScript Essentials 1.webp';
import cert7Img from '../../assets/certs/Networking Basics.webp';


const certifications = [
  {
    title: 'Python Developer Certificate',
    issuer: 'Solo Learn',
    category: 'Programming',
    featured: true,
    image: cert1Img,
    credentialUrl: 'https://www.sololearn.com/certificates/CC-UX3MQ25V',
    hours: 10,
  },
  {
    title: 'Web Development Certificate',
    issuer: 'Solo Learn',
    category: 'Web Development',
    featured: true,
    image: cert2Img,
    credentialUrl: 'https://www.sololearn.com/certificates/CC-E2T1T5OB',
    hours: 10,
  },
    {
    title: 'Front End Web Development',
    issuer: 'University of Moratuwa',
    category: 'Web Development',
    featured: true,
    image: cert3Img,
    credentialUrl: 'https://open.uom.lk/verify',
    credentialCode: 'kG4B2gg0Qz',  
    hours: 15,
  },
  {
    title: 'Python Programming Beginner',
    issuer: 'University of Moratuwa',
    category: 'Programming',
    featured: true,
    image: cert4Img,
    credentialUrl: 'https://open.uom.lk/verify',
    credentialCode: '7ZYuEaXPfV',  
    hours: 20,
  },
  {
    title: 'Web Development Beginner',
    issuer: 'University of Moratuwa',
    category: 'Web Development',
    featured: true,
    image: cert5img,
    credentialUrl: 'https://open.uom.lk/verify',
    credentialCode: '7ZYuEaXPfV',
    hours: 9,
  },
  {
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco Networking Academy',
    category: 'Programming',
    featured: true,
    image: cert6Img,
    credentialUrl: 'https://www.credly.com/earner/earned/badge/189c4b8d-7211-48de-abea-2f2ceb67e345',
    credentialCode: '',
    hours: 40,
  },
  {
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    category: 'Networking',
    featured: true,
    image: cert7Img,
    credentialUrl: 'https://www.credly.com/earner/earned/badge/36962835-2a90-4b32-b0bf-71389af3641c',
    credentialCode: '',
    hours: 20,
  },
];

const totalHours = certifications.reduce((sum, cert) => sum + (cert.hours || 0), 0);
const uniquePlatforms = new Set(certifications.map((cert) => cert.issuer)).size;
const uniqueSkillCategories = new Set(certifications.map((cert) => cert.category)).size;

const stats = [
  { icon: <FaAward />, target: certifications.length, suffix: '+', label: 'Certificates Earned' },
  { icon: <FaClock />, target: totalHours, suffix: '+', label: 'Learning Hours' },
  { icon: <FaLayerGroup />, target: uniquePlatforms, suffix: '', label: 'Learning Platforms' },
  { icon: <FaBolt />, target: uniqueSkillCategories, suffix: '', label: 'Skills Acquired' },
];

const StatCard = ({ stat, isActive }) => {
  const count = useCountUp(stat.target, isActive);

  return (
    <div className="cert-stat-card glow-card" onMouseMove={updateCardSpotlight}>
      <div className="cert-stat-icon">{stat.icon}</div>
      <div className="cert-stat-value">{count}{stat.suffix}</div>
      <div className="cert-stat-label">{stat.label}</div>
    </div>
  );
};

const Certifications = () => {
  const [sectionRef, sectionInView] = useInView(0.01);
  const [headingRef, headingInView] = useInView(0.3);
  const [gridRef, gridInView] = useInView(0.01);

  const [filterMode, setFilterMode] = useState('category');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filterKey = filterMode === 'category' ? 'category' : 'issuer';

  const categories = useMemo(() => {
    const counts = { All: certifications.length };
    certifications.forEach((cert) => {
      const key = cert[filterKey];
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts);
  }, [filterKey]);

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'All') return certifications;
    return certifications.filter((cert) => cert[filterKey] === activeFilter);
  }, [activeFilter, filterKey]);

  const visibleCerts = showAll ? filteredCerts : filteredCerts.slice(0, 4);

  const handleModeSwitch = (mode) => {
    setFilterMode(mode);
    setActiveFilter('All');
    setShowAll(false);
  };

  const handleFilterChange = (name) => {
    setActiveFilter(name);
    setShowAll(false);
  };

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className={`certifications-section ${sectionInView ? 'in-view' : ''}`}
    >
      <div className="certifications-container">
        <h2 ref={headingRef} className={`about-heading certifications-heading ${headingInView ? 'in-view' : ''}`}>
          Certifications & Qualifications
        </h2>
        <p className="certifications-subtitle">
          Formally accredited courses and technical specializations with verifiable certificates.
        </p>

        <div className="cert-stats-grid">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              stat={stat}
              isActive={sectionInView}
            />
          ))}
        </div>

        <div className="cert-mode-switch">
          <button
            className={`cert-mode-btn ${filterMode === 'category' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('category')}
          >
            By Subject
          </button>
          <button
            className={`cert-mode-btn ${filterMode === 'issuer' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('issuer')}
          >
            By Institute
          </button>
        </div>

        <div className="cert-filter-tabs-wrapper">
          <div className="cert-filter-tabs">
            {categories.map(([name, count]) => (
              <button
                key={name}
                className={`cert-filter-tab ${activeFilter === name ? 'active' : ''}`}
                onClick={() => handleFilterChange(name)}
              >
                {name} <span className="cert-filter-count">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className={`cert-grid ${gridInView ? 'in-view' : ''}`}>
          {visibleCerts.map((cert, index) => (
            <div
              key={cert.title + index}
              className="cert-card-v2 glow-card"
              style={{ transitionDelay: `${index * 0.08}s` }}
              onMouseMove={updateCardSpotlight}
            >
              <div className="cert-badge-wrapper">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cert-badge-img"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                ) : (
                  <div className="cert-badge-placeholder">
                    <FaAward />
                  </div>
                )}
              </div>

              <div className="cert-card-v2-body">
                <div className="cert-tags-row">
                  <span className="cert-category-tag">{cert.category}</span>
                  {cert.featured && (
                    <span className="cert-featured-tag">
                      <FaStar /> Featured
                    </span>
                  )}
                </div>
                <div className="cert-title-row">
                  <FaMedal className="cert-title-icon" />
                  <h3 className="cert-title-v2">{cert.title}</h3>
                </div>
                <span className="cert-issuer-v2">{cert.issuer}</span>
                {cert.credentialCode && (
                  <span className="cert-credential-code">ID: {cert.credentialCode}</span>
                )}
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="cert-verify-link"
                  >
                    <FaCheckCircle /> Verify Credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCerts.length > 4 && (
          <div className="cert-view-all-wrapper">
            <button
              className="cert-view-all-btn"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show Less' : `View All Certificates (${filteredCerts.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;