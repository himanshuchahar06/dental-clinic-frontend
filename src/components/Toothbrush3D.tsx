'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Toothbrush3D() {
  const brushRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!brushRef.current) return;
    
    // Slow rotation
    brushRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.3;
    brushRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    brushRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.8) * 0.1;
  });

  return (
    <group ref={brushRef} scale={1.3} rotation={[0.4, 0.2, 0.5]}>
      {/* 1. Long Handle */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.8, 16]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          roughness={0.15}
          transmission={0.6}
          thickness={0.5}
          clearcoat={1.0}
        />
      </mesh>

      {/* 2. Neck of the brush */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.4, 16]} />
        <meshPhysicalMaterial color="#0891b2" roughness={0.1} />
      </mesh>

      {/* 3. Brush Head Support */}
      <mesh position={[0, 0.72, 0.04]}>
        <boxGeometry args={[0.12, 0.28, 0.06]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* 4. Bristles (Group of columns) */}
      <group position={[0, 0.72, 0.1]}>
        {/* Row 1 */}
        <mesh position={[-0.03, 0.09, 0]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <mesh position={[0.03, 0.09, 0]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#f87171" roughness={0.9} />
        </mesh>

        {/* Row 2 */}
        <mesh position={[-0.03, 0.03, 0]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <mesh position={[0.03, 0.03, 0]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#38bdf8" roughness={0.9} />
        </mesh>

        {/* Row 3 */}
        <mesh position={[-0.03, -0.03, 0]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <mesh position={[0.03, -0.03, 0]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#38bdf8" roughness={0.9} />
        </mesh>

        {/* Row 4 */}
        <mesh position={[-0.03, -0.09, 0]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <mesh position={[0.03, -0.09, 0]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#f87171" roughness={0.9} />
        </mesh>
      </group>

      {/* Decorative Rubber Grip Accent */}
      <mesh position={[0, -0.6, 0.01]} scale={[1.05, 0.4, 1.05]}>
        <cylinderGeometry args={[0.07, 0.075, 1.0, 16]} />
        <meshPhysicalMaterial color="#1e293b" roughness={0.8} />
      </mesh>
    </group>
  );
}
