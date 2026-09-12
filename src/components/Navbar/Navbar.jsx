import GooeyNav from '../GooeyNav/GooeyNav';
import './Navbar.css';

const Navbar = () => {
  const items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        background: 'transparent',
        padding: 0,
      }}
    >
      <div className="navbar-shell">
        <a className="navbar-brand" href="#home" aria-label="Wishwin home">
          Wishwin.
        </a>
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 4, 1, 2, 3, 4]}
        />
      </div>
    </header>
  );
};

export default Navbar;
