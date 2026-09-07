import { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import './SkillsOrbit3D.css';

const innerSkills = [
  { name: 'JavaScript', size: 0.34, color: '#ffffff' },
  { name: 'React', size: 0.46, hasRing: true, color: '#d9d9d9' },
  { name: 'Node.js', size: 0.26, color: '#bdbdbd' },
  { name: 'MySQL', size: 0.3, color: '#eeeeee' },
];

const outerSkills = [
  { name: 'AWS', size: 0.4, hasRing: true, color: '#f5f5f5' },
  { name: 'Java', size: 0.24, color: '#a8a8a8' },
  { name: 'Python', size: 0.32, color: '#cfcfcf' },
  { name: 'MongoDB', size: 0.28, color: '#989898' },
  { name: 'C', size: 0.2, color: '#ffffff' },
  { name: 'Express', size: 0.36, color: '#e6e6e6' },
];

const Planet = ({ skill, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  const size = skill.size;

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(skill); }}
    >
      <mesh ref={meshRef} scale={hovered ? 1.15 : 1}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.65 : 0.25}
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

      <Html center distanceFactor={10} position={[0, 0, size]}>
        <div className={`skill-planet-label ${hovered ? 'hovered' : ''}`}>
          {skill.name}
        </div>
      </Html>
    </group>
  );
};

const OrbitRing = ({ skills, radius, speed, onSelect }) => {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * speed;
  });

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
    });
  }, [skills, radius]);

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.006, radius + 0.006, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} side={2} />
      </mesh>

      <group ref={groupRef}>
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
    <Html center distanceFactor={10}>
      <div className="skill-hub-label">Skills</div>
    </Html>
  </group>
);

const Scene = ({ onSelect }) => (
  <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.2}>
    <group position={[1.5, 0, 0]}>
      <CentralStar onSelect={onSelect} />
      <OrbitRing skills={innerSkills} radius={3.2} speed={0.12} onSelect={onSelect} />
      <OrbitRing skills={outerSkills} radius={5.5} speed={-0.08} onSelect={onSelect} />
    </group>

   
  </Float>
);

const SkillsOrbit3D = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div className="skills-orbit-wrapper">
      <Canvas camera={{ position: [0, 5.5, 11], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={['#080808', 8, 22]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 4, 2]} intensity={0.65} color="#ffffff" />
          <Stars radius={28} depth={20} count={750} factor={1.8} saturation={0.7} fade speed={0.35} />

          <Scene onSelect={setSelectedSkill} />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI * 0.32}
            maxPolarAngle={Math.PI * 0.68}
            rotateSpeed={0.55}
          />

          <EffectComposer>
            <Bloom intensity={0.75} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur />
            <Vignette eskil={false} offset={0.05} darkness={0.85} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className={`skills-orbit-hint ${selectedSkill ? 'is-hidden' : ''}`}>
        Drag to explore · Click a planet
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
