import Galaxy from '../Galaxy/Galaxy';
import TextType from '../TextType/TextType';

const Hero = () => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg)',
        paddingTop: '80px',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
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
      </div>
    </section>
  );
};

export default Hero;