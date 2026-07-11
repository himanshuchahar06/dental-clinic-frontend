'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DentalChair3D() {
  const chairRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!chairRef.current) return;
    
    // Slow swing to mimic clinic operation
    chairRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
    chairRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.05 - 0.2;
  });

  return (
    <group ref={chairRef} scale={0.8} rotation={[0.2, -0.6, 0]}>
      {/* 1. Chrome Circular Base */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.2, 1.25, 0.1, 32]} />
        <meshPhysicalMaterial color="#94a3b8" metalness={0.9} roughness={0.1} clearcoat={1.0} />
      </mesh>

      {/* 2. Main Hydraulic Support Column */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.9, 16]} />
        <meshPhysicalMaterial color="#cbd5e1" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* 3. Seat Base Frame */}
      <mesh position={[0, -0.2, 0.2]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.9, 0.15, 1.6]} />
        <meshPhysicalMaterial color="#0f172a" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* 4. Seat Cushion (Luxury Leather) */}
      <mesh position={[0, -0.05, 0.25]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.85, 0.18, 1.5]} />
        <meshPhysicalMaterial
          color="#38bdf8" // Electric Teal leather
          roughness={0.65}
          metalness={0.1}
          clearcoat={0.1}
        />
      </mesh>

      {/* 5. Backrest Cushion (Luxury Leather) */}
      <group position={[0, 0.5, -0.4]} rotation={[-0.4, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.15, 1.1]} />
          <meshPhysicalMaterial color="#0ea5e9" roughness={0.65} metalness={0.1} />
        </mesh>
      </group>

      {/* 6. Headrest */}
      <group position={[0, 1.1, -0.85]} rotation={[-0.45, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.12, 0.35]} />
          <meshPhysicalMaterial color="#0d9488" roughness={0.7} />
        </mesh>
      </group>

      {/* 7. Metallic Armrests */}
      {/* Left Armrest */}
      <group position={[-0.5, 0.2, 0.1]} rotation={[0.1, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.08, 0.1, 0.9]} />
          <meshPhysicalMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* Right Armrest */}
      <group position={[0.5, 0.2, 0.1]} rotation={[0.1, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.08, 0.1, 0.9]} />
          <meshPhysicalMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 8. Modern Overhead Dentist Spotlight Arm */}
      <group position={[-0.8, -0.5, -0.6]}>
        {/* Support Pillar */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 2.0, 12]} />
          <meshPhysicalMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Swivel Arm */}
        <group position={[0, 2.0, 0]} rotation={[0, 0.8, -1.1]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.2, 12]} />
            <meshPhysicalMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          
          {/* Spotlight Head */}
          <group position={[0, 1.1, 0]} rotation={[0, 0, 1.1]}>
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshPhysicalMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            
            {/* Glowing Lamp lens */}
            <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
            
            {/* Simulated spotlight ray */}
            <pointLight position={[0, -0.3, 0]} intensity={1.5} color="#fef08a" distance={3.5} />
          </group>
        </group>
      </group>
    </group>
  );
}
