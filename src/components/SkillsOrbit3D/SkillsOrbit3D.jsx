import { Suspense, useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Stars } from '@react-three/drei';
import './SkillsOrbit3D.css';

const innerSkills = [
  { name: 'JavaScript', size: 0.34, color: '#ffffff' },
  { name: 'React', size: 0.46, hasRing: true, color: '#d9d9d9' },
  { name: 'Node.js', size: 0.26, color: '#bdbdbd' },
  { name: 'SQL', size: 0.3, color: '#eeeeee' },
];

const outerSkills = [
  { name: 'AWS', size: 0.4, hasRing: true, color: '#f5f5f5' },
  { name: 'Java', size: 0.24, color: '#a8a8a8' },
  { name: 'Python', size: 0.32, color: '#cfcfcf' },
  { name: 'MongoDB', size: 0.28, color: '#989898' },
  { name: 'C', size: 0.2, color: '#ffffff' },
  { name: 'Express', size: 0.36, color: '#e6e6e6' },
];

/* Shared drag state — written by the wrapper div, read by OrbitRing in useFrame */
const drag = {
  dragging: false,
  activeOrbit: null,
  orbits: {},
};

const Planet = ({ skill, onSelect }) => {
  const size = skill.size;
  const fontSize = size * 0.38;

  return (
    <group onClick={(e) => { e.stopPropagation(); onSelect(skill); }}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.18}
        />
      </mesh>

      {skill.hasRing && (
        <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
          <ringGeometry args={[size * 1.5, size * 2, 48]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.55} side={2} />
        </mesh>
      )}

      <Text
        position={[0, 0, size + 0.01]}
        fontSize={fontSize}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
        outlineWidth={fontSize * 0.08}
        outlineColor="#333333"
      >
        {skill.name}
      </Text>
    </group>
  );
};

const OrbitRing = ({ id, skills, radius, speed, onSelect, onOrbitPointerDown }) => {
  const groupRef = useRef();
  const baseRotation = useRef(0);
  const orbitState = useRef(
    drag.orbits[id] || { offsetX: 0, offsetY: 0, velocityX: 0, velocityY: 0 },
  );

  useEffect(() => {
    drag.orbits[id] = orbitState.current;
  }, [id]);

  useFrame((_, delta) => {
    /* Auto-rotate slowly + apply mouse drag offset */
    if (!drag.dragging || drag.activeOrbit !== id) {
      /* Apply momentum when not dragging */
      orbitState.current.velocityX *= 0.95;
      orbitState.current.velocityY *= 0.95;
      orbitState.current.offsetX += orbitState.current.velocityX;
      orbitState.current.offsetY += orbitState.current.velocityY;
    }
    baseRotation.current += delta * speed;
    if (groupRef.current) {
      groupRef.current.rotation.y = baseRotation.current + orbitState.current.offsetX;
      groupRef.current.rotation.x = orbitState.current.offsetY;
    }
  });

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
    });
  }, [skills, radius]);

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        onOrbitPointerDown(id, e);
      }}
    >
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.006, radius + 0.006, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} side={2} />
      </mesh>

      <group>
        {skills.map((skill, i) => (
          <group key={skill.name} position={positions[i]}>
            <Planet skill={skill} onSelect={onSelect} />
          </group>
        ))}
      </group>
    </group>
  );
};

const CentralStar = ({ onSelect }) => (
  <group>
    <mesh onClick={(e) => { e.stopPropagation(); onSelect({ name: 'Skills', color: '#ffffff' }); }}>
      <sphereGeometry args={[0.75, 32, 32]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.7} roughness={0.15} />
    </mesh>
    <mesh scale={2.1}>
      <sphereGeometry args={[0.75, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.13} />
    </mesh>
    <pointLight position={[0, 0, 0]} intensity={2.2} color="#ffffff" distance={14} decay={1.4} />
    <Text
      position={[0, 0, 0.77]}
      fontSize={0.28}
      color="#000000"
      anchorX="center"
      anchorY="middle"
      fontWeight={700}
      outlineWidth={0.02}
      outlineColor="#333333"
    >
      Skills
    </Text>
  </group>
);

const Scene = ({ onSelect, onOrbitPointerDown }) => (
  <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.2}>
    <group position={[0, 0, 0]}>
      <CentralStar onSelect={onSelect} />
      <OrbitRing id="inner" skills={innerSkills} radius={3.2} speed={0.12} onSelect={onSelect} onOrbitPointerDown={onOrbitPointerDown} />
      <OrbitRing id="outer" skills={outerSkills} radius={5.5} speed={-0.08} onSelect={onSelect} onOrbitPointerDown={onOrbitPointerDown} />
    </group>
  </Float>
);

const mobileQuery =
  typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 768px)')
    : { matches: false, addEventListener: () => {}, removeEventListener: () => {} };

const SkillsOrbit3D = () => {
  const [isMobile, setIsMobile] = useState(mobileQuery.matches);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const wrapperRef = useRef();
  const pointerRef = useRef({ active: false, lastX: 0, lastY: 0 });

  const onOrbitPointerDown = useCallback((orbitId, e) => {
    pointerRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
    drag.activeOrbit = orbitId;
    drag.dragging = true;
    drag.orbits[orbitId].velocityX = 0;
    drag.orbits[orbitId].velocityY = 0;
  }, []);

  const onPointerDown = useCallback((e) => {
    pointerRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
    drag.activeOrbit = null;
    drag.dragging = true;
    Object.values(drag.orbits).forEach((orbit) => {
      orbit.velocityX = 0;
      orbit.velocityY = 0;
    });
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!pointerRef.current.active) return;
    const deltaX = e.clientX - pointerRef.current.lastX;
    const deltaY = e.clientY - pointerRef.current.lastY;
    const targetOrbits = drag.activeOrbit
      ? [drag.orbits[drag.activeOrbit]]
      : Object.values(drag.orbits);
    targetOrbits.forEach((orbit) => {
      orbit.offsetX += deltaX * 0.008;
      orbit.offsetY += deltaY * 0.008;
      orbit.velocityX = deltaX * 0.008;
      orbit.velocityY = deltaY * 0.008;
    });
    pointerRef.current.lastX = e.clientX;
    pointerRef.current.lastY = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    pointerRef.current.active = false;
    drag.dragging = false;
    drag.activeOrbit = null;
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  useEffect(() => {
    const handler = (e) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', handler);
    return () => mobileQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="skills-orbit-wrapper" ref={wrapperRef} onPointerDown={onPointerDown}>
      <Canvas
        camera={{ position: [0, 5.5, 11], fov: 42 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 4, 2]} intensity={0.65} color="#ffffff" />
          <Stars radius={28} depth={20} count={isMobile ? 350 : 750} factor={1.8} saturation={0} fade speed={0.35} />

          <Scene onSelect={setSelectedSkill} onOrbitPointerDown={onOrbitPointerDown} />
        </Suspense>
      </Canvas>

      <div className={`skills-orbit-hint ${selectedSkill ? 'is-hidden' : ''}`}>
        Drag to spin and tilt · Click a planet
      </div>

      {selectedSkill && (
        <button
          className="skills-orbit-selection"
          type="button"
          onClick={() => setSelectedSkill(null)}
          aria-label={`Clear selected skill ${selectedSkill.name}`}
        >
          <span className="selection-dot" style={{ backgroundColor: selectedSkill.color }} />
          <span>{selectedSkill.name}</span>
          <span className="selection-close">×</span>
        </button>
      )}
    </div>
  );
};

export default SkillsOrbit3D;
