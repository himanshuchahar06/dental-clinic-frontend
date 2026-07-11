'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import Tooth3D from './Tooth3D';
import DentalChair3D from './DentalChair3D';
import Toothbrush3D from './Toothbrush3D';

// --- Mouse Parallax Wrapper ---
function SceneController({ activeModel }: { activeModel: 'tooth' | 'chair' | 'brush' }) {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth lerp for mouse parallax
    const targetX = mouse.x * 0.3;
    const targetY = mouse.y * 0.2;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      {activeModel === 'tooth' && <Tooth3D />}
      {activeModel === 'chair' && <DentalChair3D />}
      {activeModel === 'brush' && <Toothbrush3D />}
    </group>
  );
}

// --- Floating Particles ---
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create randomized points data
  const [particleData] = useState(() => {
    const temp = new Float32Array(300); // 100 particles (x, y, z)
    for (let i = 0; i < 300; i++) {
      temp[i] = (Math.random() - 0.5) * 8;
    }
    return temp;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Drift down slowly
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#93c5fd" // Ice white-blue particles
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </points>
  );
}

// --- Main Canvas ---
interface ThreeCanvasProps {
  activeModel?: 'tooth' | 'chair' | 'brush';
  className?: string;
}

export default function ThreeCanvas({ activeModel = 'tooth', className = '' }: ThreeCanvasProps) {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.7} />
        
        {/* Cinematic White and Blue Studio Lights */}
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#60a5fa" /> {/* Sky Blue key light */}
        <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#3b82f6" /> {/* Deep Blue fill light */}
        
        {/* Soft highlighting spotlight */}
        <spotLight
          position={[0, 8, 2]}
          intensity={2.8}
          angle={0.6}
          penumbra={0.5}
          color="#ffffff" // Pristine white spotlight
          castShadow
        />

        <Suspense fallback={null}>
          <SceneController activeModel={activeModel} />
          <FloatingParticles />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
