import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import SocialLinks from '../SocialLinks/SocialLinks';
import './Contact.css';

const contactDetails = [
  { icon: <FaEnvelope />, label: 'Email', value: 'gesarawishwin@gmail.com', href: 'mailto:gesarawishwin@gmail.com' },
  { icon: <FaPhone />, label: 'Phone', value: '+94 77 123 4567', href: 'tel:+94771234567' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Colombo, Sri Lanka' },
];

const Contact = () => {
  const [sectionRef, isInView] = useInViewOnce(0.15);
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Thanks for reaching out - I'll get back to you soon.");
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <p className="contact-eyebrow">Let's work together</p>
        <h2 className="contact-heading">Get In Touch</h2>
        <p className="contact-subtitle">
          Have an idea, a project, or just want to say hello? Send a message and
          let's make something useful and memorable.
        </p>
        <div className={`contact-grid ${isInView ? 'in-view' : ''}`}>
          <div className="contact-info">
            <div className="contact-intro">
              <span className="contact-intro-line" />
              <p>I'm currently open to conversations about internships, freelance work, and creative collaborations.</p>
            </div>
            {contactDetails.map((detail) => {
              const content = (
                <>
                  <span className="contact-info-icon">{detail.icon}</span>
                  <span className="contact-info-copy">
                    <span className="contact-info-label">{detail.label}</span>
                    <span className="contact-info-value">{detail.value}</span>
                  </span>
                </>
              );
              return detail.href ? (
                <a className="contact-info-item" href={detail.href} key={detail.label}>{content}</a>
              ) : (
                <div className="contact-info-item" key={detail.label}>{content}</div>
              );
            })}
            <SocialLinks />
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="contact-name">Your name</label>
                <input id="contact-name" name="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="contact-form-group">
                <label htmlFor="contact-email">Email address</label>
                <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="contact-form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" name="subject" type="text" placeholder="Let's build something great" required />
            </div>
            <div className="contact-form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="6" placeholder="Tell me a little about your idea..." required />
            </div>
            <button className="contact-submit-btn" type="submit">
              Send Message <FaPaperPlane aria-hidden="true" />
            </button>
            {status && <p className="contact-status contact-status-success" role="status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
