import { useRef } from 'react';
import Galaxy from '../Galaxy/Galaxy';
import TextType from '../TextType/TextType';
import ProfileCard from '../ProfileCard/ProfileCard';
import avatarImg from '../../assets/my_photo.png';
import SocialLinks from '../SocialLinks/SocialLinks';
import { useInView } from '../../hooks/useInView';
import './Hero.css';

const Hero = () => {
  const bioRef = useRef(null);
  const [galaxyRef, galaxyInView] = useInView(0.05);

  const handleBioMouseMove = (e) => {
    const el = bioRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; // max ~4deg tilt
    const rotateY = ((x - centerX) / centerX) * 4;
    el.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleBioMouseLeave = () => {
    const el = bioRef.current;
    if (!el) return;
    el.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        height: 'auto',
        overflow: 'visible',
        background: 'var(--bg)',
        paddingTop: '80px',
        paddingBottom: '4rem',
      }}
    >
      <div ref={galaxyRef} style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {galaxyInView && (
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={0}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        )}
      </div>

      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'var(--fg)',
          pointerEvents: 'none',
        }}
      >
        <TextType
          text={[
            "Hi...",
            "Welcome to my portfolio!",
            "I'm a passionate developer."
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          deletingSpeed={50}
          showCursor
          cursorCharacter="_"
          loop
          style={{ fontSize: '3rem' }}
        />

        <div className="hero-profile-card" style={{ pointerEvents: 'auto', marginTop: '2rem' }}>
          <ProfileCard
            name=""
            title=""
            handle="Wishwin-create"
            status="Open to opportunities"
            contactText="Contact Me"
            avatarUrl={avatarImg}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            behindGlowColor="rgba(255, 255, 255, 0.4)"
            innerGradient="linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 100%)"
          />
        </div>

        <div
          ref={bioRef}
          className="hero-bio"
          style={{ marginTop: '1.5rem', pointerEvents: 'auto' }}
          onMouseMove={handleBioMouseMove}
          onMouseLeave={handleBioMouseLeave}
        >
          <p
            className="hero-bio-name"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              fontWeight: '700',
              color: 'var(--fg)',
              marginBottom: '0.5rem',
              cursor: 'default',
            }}
          >
            I'm Wishvin Gesara
          </p>
          <p
            className="hero-bio-text"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.75)',
              cursor: 'default',
            }}
          >
            I'm a Full Stack Developer and undergraduate at the University of Colombo.
            I build modern, responsive web applications with a focus on clean UI and great user experience.
          </p>
            <SocialLinks />
        </div>
      </div>
    </section>
  );
};

export default Hero;
