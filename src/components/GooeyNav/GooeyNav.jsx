import { useRef, useEffect, useState } from 'react';
import './GooeyNav.css';

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const navElRef = useRef(null);   // ref on the <nav> element for position calculation
  const filterRef = useRef(null);
  const textRef = useRef(null);    // crisp text clone that sits above the blurred blob
  const animationCleanupRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = element => {
    // Use tighter burst radius and faster timing on mobile
    const isMobile = window.innerWidth <= 768;
    const d = isMobile ? [32, 5] : particleDistances;
    const r = isMobile ? 45 : particleR;
    const effectiveAnimTime   = isMobile ? animationTime * 0.5   : animationTime;
    const effectiveTimeVar    = isMobile ? timeVariance  * 0.5   : timeVariance;
    const bubbleTime = effectiveAnimTime * 2 + effectiveTimeVar;

    if (animationCleanupRef.current) {
      clearTimeout(animationCleanupRef.current);
    }

    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }

    animationCleanupRef.current = setTimeout(() => {
      element.classList.remove('active');
      animationCleanupRef.current = null;
    }, bubbleTime + 100);
  };

  const updateEffectPosition = element => {
    // Positions the effect spans relative to the <nav> element (their parent),
    // which works correctly for both desktop (nav is position:relative) and
    // mobile (nav is position:absolute inside the container).
    if (!navElRef.current || !filterRef.current) return;
    const navRect = navElRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - navRect.x}px`,
      top: `${pos.y - navRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    filterRef.current.classList.add('positioned');

    if (textRef.current) {
      Object.assign(textRef.current.style, styles);
      textRef.current.innerText = element.innerText;
    }
  };

  const handleClick = (e, index) => {
    const liEl = e.currentTarget;
    if (activeIndex === index) {
     setTimeout(() => setIsMobileOpen(false), 300);
      return;
    }

    setActiveIndex(index);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current.removeChild(p));
    }

    if (textRef.current) {
      // restart the text color-swap animation even if it's already "active"
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth; // force reflow
      textRef.current.classList.add('active');
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

   setTimeout(() => setIsMobileOpen(false), 500);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl }, index);
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    if (isMobileOpen) {
      requestAnimationFrame(() => {
        const activeLi = navRef.current?.querySelectorAll('li')[activeIndex];
        if (activeLi) {
          updateEffectPosition(activeLi);
        }
      });
    } else {
      // Clear any leftover particles when closing, so they don't linger mid-animation
      if (filterRef.current) {
        const particles = filterRef.current.querySelectorAll('.particle');
        particles.forEach((p) => filterRef.current.removeChild(p));
      }
    }
  }, [isMobileOpen, activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <button
        className={`gooey-nav-toggle ${isMobileOpen ? 'open' : ''}`}
        onClick={() => setIsMobileOpen(prev => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={isMobileOpen ? 'mobile-open' : ''} ref={navElRef}>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={index} className={activeIndex === index ? 'active' : ''}>
              <a href={item.href} onClick={e => handleClick(e, index)} onKeyDown={e => handleKeyDown(e, index)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {/* effect layers live inside nav so they're always above nav's black
            background and correctly positioned regardless of dropdown state */}
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </nav>
    </div>
  );
};

export default GooeyNav;