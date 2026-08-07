import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import './SocialLinks.css';

const socialLinks = [
  { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/Wishwin-create' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/wisvin-gesara-0137652a6/' },
  { icon: <FaFacebook />, label: 'Facebook', href: 'https://facebook.com/your-profile' },
  { icon: <HiOutlineMail />, label: 'Email', href: 'mailto:gesarawishwin@gmail.com' },
];

const SocialLinks = () => {
  return (
    <div className="social-links-wrapper">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
          className="social-link-item"
          aria-label={link.label}
        >
          <span className="social-link-circle">{link.icon}</span>
          <span className="social-link-label">{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;