import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa';

import { useInView } from '../../hooks/useInView';
import SocialLinks from '../SocialLinks/SocialLinks';
import './Contact.css';


const contactDetails = [
  { icon: <FaEnvelope />, label: 'Email', value: 'gesarawishwin@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=gesarawishwin@gmail.com' },
  { icon: <FaPhone />, label: 'Phone', value: '+94 719764101', href: 'tel:0719764101' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Colombo, Sri Lanka' },
];

const Contact = () => {
  const [headingRef, headingInView] = useInView(0.05);
  const [sectionRef, isInView] = useInView(0.15);
  const [status, setStatus] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();
  setStatus('sending');

  const form = event.currentTarget; 
  const formData = new FormData(event.currentTarget);

  try {
    const response = await fetch('https://formspree.io/f/mjykyrjz', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });
     ;

    if (response.ok) {
      setStatus("Thanks for reaching out - I'll get back to you soon.");
      form.reset();
    } else {
      setStatus('error');
    }
  } catch {
    setStatus('error');
  }
};

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <p className={`contact-eyebrow ${isInView ? 'in-view' : ''}`}>
         Let's work together
       </p>
       <h2
          ref={headingRef}
          className={`about-heading contact-heading ${headingInView ? 'in-view' : ''}`} 
        >
        Get In Touch
        </h2>
        <p className={`contact-subtitle ${isInView ? 'in-view' : ''}`}>
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
            <p className="contact-copyright">
            © {new Date().getFullYear()} Wishwin Gesara. All rights reserved.
            </p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="contact-name">Your name</label>
                <input id="contact-name" name="name" type="text" placeholder="name" required />
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
            <button className="contact-submit-btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : (
                <>Send Message <FaPaperPlane aria-hidden="true" /></>
              )}
            </button>
            {status === 'error' && (
              <p className="contact-status contact-status-error" role="status">
                Something went wrong — please email me directly instead.
              </p>
            )}
            {status && status !== 'error' && status !== 'sending' && (
              <p className="contact-status contact-status-success" role="status" aria-live="polite">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
