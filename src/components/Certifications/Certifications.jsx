import { useState, useMemo } from 'react';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { FaAward, FaClock, FaLayerGroup, FaBolt, FaMedal, FaStar, FaCheckCircle } from 'react-icons/fa';
import './Certifications.css';

import cert1Img from '../../assets/certs/Solo Learn Python Developer.png';
import cert2Img from '../../assets/certs/Solo Learn Web Development.png';
import cert3Img from '../../assets/certs/Front End Development.png';
import cert4Img from '../../assets/certs/Python Programming beginner.png';  // Placeholder for additional certificates

// Replace with your real certificates and badge images
const certifications = [
  {
    title: 'Python Developer Certificate',
    issuer: 'Solo Learn',
    category: 'Programming',
    featured: true,
    image: cert1Img,
    credentialUrl: 'https://www.sololearn.com/certificates/CC-UX3MQ25V',
  },
  {
    title: 'Web Development Certificate',
    issuer: 'Solo Learn',
    category: 'Web Development',
    featured: true,
    image: cert2Img,
    credentialUrl: 'https://www.sololearn.com/certificates/CC-E2T1T5OB',
  },
    {
    title: 'Front End Web Development',
    issuer: 'University of Moratuwa',
    category: 'Web Development',
    featured: true,
    image: cert3Img,
    credentialUrl: 'https://open.uom.lk/verify',
    credentialCode: 'kG4B2gg0Qz',  
  },
  {
    title: 'Python Programming Beginner',
    issuer: 'University of Moratuwa',
    category: 'Programming',
    featured: true,
    image: cert4Img,
    credentialUrl: 'https://open.uom.lk/verify',
    credentialCode: '7ZYuEaXPfV',  
  },
];

const stats = [
  { icon: <FaAward />, value: `${certifications.length}+`, label: 'Certificates Earned' },
  { icon: <FaClock />, value: '0+', label: 'Learning Hours' },
  { icon: <FaLayerGroup />, value: '0', label: 'Learning Platforms' },
  { icon: <FaBolt />, value: '0+', label: 'Skills Acquired' },
];

const Certifications = () => {
  const [headingRef, headingInView] = useInViewOnce(0.3);
  const [gridRef, gridInView] = useInViewOnce(0.1);

  // Which grouping mode is active: 'category' (Subject) or 'issuer' (Institute)
  const [filterMode, setFilterMode] = useState('category');
  const [activeFilter, setActiveFilter] = useState('All');

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

  const handleModeSwitch = (mode) => {
    setFilterMode(mode);
    setActiveFilter('All');   // reset filter selection when switching modes
  };

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <h2 ref={headingRef} className={`about-heading certifications-heading ${headingInView ? 'in-view' : ''}`}>
          Certifications & Qualifications
        </h2>
        <p className="certifications-subtitle">
          Formally accredited courses, diplomas, and technical specializations with verifiable certificates.
        </p>

        <div className="cert-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="cert-stat-card">
              <div className="cert-stat-icon">{stat.icon}</div>
              <div className="cert-stat-value">{stat.value}</div>
              <div className="cert-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mode switch: Subject vs Institute */}
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

        {/* Filter tabs — reflect whichever mode is active */}
        <div className="cert-filter-tabs">
          {categories.map(([name, count]) => (
            <button
              key={name}
              className={`cert-filter-tab ${activeFilter === name ? 'active' : ''}`}
              onClick={() => setActiveFilter(name)}
            >
              {name} <span className="cert-filter-count">{count}</span>
            </button>
          ))}
        </div>

        <div ref={gridRef} className={`cert-grid ${gridInView ? 'in-view' : ''}`}>
          {filteredCerts.map((cert, index) => (
            <div
              key={cert.title + index}
              className="cert-card-v2"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="cert-badge-wrapper">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="cert-badge-img" loading="lazy" />
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
                <span className="cert-issuer-v2">{cert.issuer}</span><br></br>
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
      </div>
    </section>
  );
};

export default Certifications;