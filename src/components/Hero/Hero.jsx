import Galaxy from '../Galaxy/Galaxy';
import TextType from '../TextType/TextType';
import ProfileCard from '../ProfileCard/ProfileCard';
import avatarImg from '../../assets/my_photo.png';

const Hero = () => {
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
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
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
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          textAlign: 'left',
          color: 'var(--fg)',
          pointerEvents: 'none',
          paddingLeft: '5%',
          paddingTop: '10%',
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

        {/* ProfileCard — pointerEvents re-enabled so tilt/click work */}
        <div style={{ pointerEvents: 'auto', marginTop: '2rem', maxWidth: '280px' }}>
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
      </div>
    </section>
  );
};

export default Hero;
