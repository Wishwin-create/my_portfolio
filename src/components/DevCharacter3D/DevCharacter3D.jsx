import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  ContactShadows,
  Sparkles,
  RoundedBox,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import './DevCharacter3D.css';

const Scene = () => {
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const screenRef = useRef();
  const chairRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 1.2) * 0.03;
      headRef.current.rotation.y = Math.sin(t * 0.6) * 0.08;
      headRef.current.position.y = 1.56 + Math.sin(t * 1.5) * 0.015;
    }

    if (leftArmRef.current) leftArmRef.current.position.y = 0.76 + Math.sin(t * 6) * 0.025;
    if (rightArmRef.current) rightArmRef.current.position.y = 0.76 + Math.sin(t * 6 + Math.PI) * 0.025;

    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.55 + Math.sin(t * 3) * 0.15;
    }

    if (chairRef.current) {
      chairRef.current.rotation.y = Math.sin(t * 0.4) * 0.02;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.35}>
      <group position={[0, -0.5, 0]}>
        <RoundedBox args={[2.7, 0.08, 1.05]} radius={0.03} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#ededed" roughness={0.5} metalness={0} />
        </RoundedBox>
        <mesh position={[-1.25, 0, 0.38]}>
          <cylinderGeometry args={[0.035, 0.035, 0.8, 12]} />
          <meshStandardMaterial color="#bfbfbf" roughness={0.5} metalness={0} />
        </mesh>
        <mesh position={[1.25, 0, 0.38]}>
          <cylinderGeometry args={[0.035, 0.035, 0.8, 12]} />
          <meshStandardMaterial color="#bfbfbf" roughness={0.5} metalness={0} />
        </mesh>

        <mesh position={[0, 0.65, -0.22]}>
          <cylinderGeometry args={[0.04, 0.05, 0.5, 12]} />
          <meshStandardMaterial color="#d4d4d4" roughness={0.5} metalness={0} />
        </mesh>
        <mesh position={[0, 0.42, -0.22]}>
          <cylinderGeometry args={[0.18, 0.18, 0.02, 24]} />
          <meshStandardMaterial color="#c9c9c9" roughness={0.5} metalness={0} />
        </mesh>

        <RoundedBox args={[1.35, 0.82, 0.05]} radius={0.04} position={[0, 1.1, -0.22]}>
          <meshStandardMaterial color="#f5f5f5" roughness={0.4} metalness={0} />
        </RoundedBox>

        <mesh ref={screenRef} position={[0, 1.1, -0.185]}>
          <planeGeometry args={[1.18, 0.68]} />
          <meshStandardMaterial
            color="#050505"
            emissive="#e8e8e8"
            emissiveIntensity={0.55}
            roughness={0.2}
          />
        </mesh>
        {[0.18, 0.1, 0.02, -0.06, -0.14].map((y, i) => (
          <mesh key={i} position={[-0.35 + (i % 2) * 0.05, 1.1 + y, -0.178]}>
            <planeGeometry args={[0.4 - i * 0.05, 0.02]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7 - i * 0.08} />
          </mesh>
        ))}

        <RoundedBox args={[0.72, 0.035, 0.26]} radius={0.015} position={[0, 0.46, 0.25]}>
          <meshStandardMaterial color="#e8e8e8" roughness={0.6} />
        </RoundedBox>

        <group ref={chairRef}>
          <RoundedBox args={[0.55, 0.9, 0.07]} radius={0.05} position={[0, 0.9, 0.92]}>
            <meshStandardMaterial color="#2a2a2a" roughness={0.7} />
          </RoundedBox>
          <mesh position={[0, 0.35, 0.92]}>
            <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
            <meshStandardMaterial color="#3a3a3a" metalness={0.2} roughness={0.5} />
          </mesh>
        </group>

        <RoundedBox args={[0.52, 0.55, 0.36]} radius={0.08} position={[0, 0.9, 0.65]}>
          <meshStandardMaterial color="#ebebeb" roughness={0.7} />
        </RoundedBox>

        <mesh ref={headRef} position={[0, 1.56, 0.65]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#f2ddc4" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.66, 0.65]}>
          <sphereGeometry args={[0.208, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#242424" roughness={0.9} />
        </mesh>

        <mesh ref={leftArmRef} position={[-0.3, 0.76, 0.4]} rotation={[0.3, 0, 0.2]}>
          <capsuleGeometry args={[0.06, 0.4, 6, 12]} />
          <meshStandardMaterial color="#ebebeb" roughness={0.7} />
        </mesh>
        <mesh ref={rightArmRef} position={[0.3, 0.76, 0.4]} rotation={[0.3, 0, -0.2]}>
          <capsuleGeometry args={[0.06, 0.4, 6, 12]} />
          <meshStandardMaterial color="#ebebeb" roughness={0.7} />
        </mesh>

        <group position={[1.02, 0.5, 0.12]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.045, 0.12, 20]} />
            <meshStandardMaterial color="#e0e0e0" roughness={0.5} metalness={0} />
          </mesh>
          <mesh position={[0.06, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.025, 0.008, 8, 16]} />
            <meshStandardMaterial color="#e0e0e0" roughness={0.5} />
          </mesh>
        </group>

        <group position={[-1.15, 0.48, -0.1]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.06, 0.12, 12]} />
            <meshStandardMaterial color="#d4d4d4" roughness={0.7} />
          </mesh>
          {[0, 1, 2].map(i => (
            <mesh key={i} position={[Math.sin(i) * 0.03, 0.15 + i * 0.03, Math.cos(i) * 0.03]} rotation={[0, i, 0.3]}>
              <coneGeometry args={[0.03, 0.18, 8]} />
              <meshStandardMaterial color="#e8e8e8" roughness={0.8} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
};

// ---------------------------------------------------------------------------
// Stable matchMedia instance – evaluated once at module scope.
// ---------------------------------------------------------------------------
const mobileQuery =
  typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 768px)')
    : { matches: false, addEventListener: () => {}, removeEventListener: () => {} };

const DevCharacter3D = () => {
  // Reactive mobile flag – updates on viewport resize without causing a
  // mount/unmount cycle (only re-renders the Canvas props, not the 3-D scene).
  const [isMobile, setIsMobile] = useState(mobileQuery.matches);

  useEffect(() => {
    const handler = (e) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', handler);
    return () => mobileQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="dev-3d-wrapper">
      <Canvas
        camera={{ position: [2.4, 1.7, 3], fov: 42 }}
        shadows
        // Fixed DPR=1 on mobile – prevents the renderer from silently resizing
        // its internal framebuffer mid-frame (the primary cause of the flicker).
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          powerPreference: 'high-performance',
          // Disabling MSAA on mobile cuts fill-rate cost and stops the
          // multisample resolve step that flickers on some mobile drivers.
          antialias: !isMobile,
          // Stencil buffer is only needed by postprocessing which we skip on
          // mobile anyway – remove it to save GPU memory bandwidth.
          stencil: false,
        }}
        frameloop="always"
        // Let R3F gracefully degrade rendering quality under GPU thermal
        // pressure (common on phones) instead of stalling / flickering.
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          {/* Lighting only — no Environment map, no reflections leaking onto the shadow plane */}
          <ambientLight intensity={0.55} />
          <directionalLight
            position={[3, 5, 2]}
            intensity={1}
            color="#ffffff"
            castShadow
            shadow-mapSize={isMobile ? [256, 256] : [512, 512]}
          />
          <pointLight position={[-2.5, 1.5, -2]} intensity={0.35} color="#ffffff" />
          <pointLight position={[0, 1.2, -0.3]} intensity={0.25} color="#dbeaff" distance={0.9} decay={2} />

          <Scene />

          <Sparkles count={15} scale={4} size={2} speed={0.3} opacity={0.2} color="#ffffff" />

          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.4}
            scale={3.5}
            blur={3.5}
            far={1.2}
            resolution={isMobile ? 256 : 512}
            color="#000000"
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.9}
            autoRotate
            autoRotateSpeed={0.7}
          />

          {/* EffectComposer is skipped on mobile.
              The ping-pong framebuffers used by Bloom's mipmapBlur are the
              #1 root cause of the GPU flicker on low-power / high-DPI mobile
              GPUs. The scene is visually identical at mobile sizes without it. */}
          {!isMobile && (
            <EffectComposer>
              <Bloom intensity={0.35} luminanceThreshold={0.65} luminanceSmoothing={0.9} mipmapBlur />
              <Vignette eskil={false} offset={0.2} darkness={0.7} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DevCharacter3D;
