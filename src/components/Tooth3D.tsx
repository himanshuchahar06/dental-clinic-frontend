'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Tooth3D({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const toothRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!toothRef.current) return;
    
    // Slow ambient rotation
    toothRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 + scrollProgress * Math.PI * 2;
    // Floating movement
    toothRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
  });

  return (
    <group ref={toothRef} scale={1.2}>
      {/* --- Tooth Crown (Top Enamel) --- */}
      {/* Main crown body - smooth pearlescent white */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          roughness={0.1}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.4} // frosted glass look
          thickness={0.8}
          ior={1.5}
        />
      </mesh>

      {/* Cusp Details (Top ridges of the molar) */}
      {/* Front-Left Cusp */}
      <mesh position={[-0.35, 0.9, -0.35]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1.0} transmission={0.3} />
      </mesh>
      {/* Front-Right Cusp */}
      <mesh position={[0.35, 0.9, -0.35]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1.0} transmission={0.3} />
      </mesh>
      {/* Back-Left Cusp */}
      <mesh position={[-0.35, 0.9, 0.35]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1.0} transmission={0.3} />
      </mesh>
      {/* Back-Right Cusp */}
      <mesh position={[0.35, 0.9, 0.35]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1.0} transmission={0.3} />
      </mesh>

      {/* --- Tooth Roots (Bottom Tapered Cones) --- */}
      {/* Root 1 - Left */}
      <group position={[-0.25, -0.2, 0]} rotation={[0, 0, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.05, 1.0, 16]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            roughness={0.4}
            metalness={0.0}
            clearcoat={0.3}
            transmission={0.1}
          />
        </mesh>
      </group>

      {/* Root 2 - Right */}
      <group position={[0.25, -0.2, 0]} rotation={[0, 0, -0.2]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.05, 1.0, 16]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            roughness={0.4}
            metalness={0.0}
            clearcoat={0.3}
            transmission={0.1}
          />
        </mesh>
      </group>
      
      {/* Root 3 - Back */}
      <group position={[0, -0.2, 0.25]} rotation={[-0.2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.05, 0.9, 16]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            roughness={0.4}
            metalness={0.0}
            clearcoat={0.3}
            transmission={0.1}
          />
        </mesh>
      </group>

      {/* Subtle Golden/Blue Core Accent (Simulating nerve glow deep inside) */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
