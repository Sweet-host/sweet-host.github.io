"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. Random generation OUTSIDE the component (Perfect R3F Stability)
const generateParticles = () => {
  const count = 3000;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 5 * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
    pos[i * 3 + 2] = r * Math.cos(phi); // z
  }
  return pos;
};

const particlePositions = generateParticles();

function StarCloud() {
  const ref = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      // 1. The automatic slow rotation
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;

      // 2. THE MOUSE INTERACTION (Parallax)
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        state.pointer.x * 0.5,
        0.05,
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        state.pointer.y * 0.5,
        0.05,
      );
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={particlePositions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.017}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function ParticleBackground() {
  return (
    // CHEAT SHEET FIX: Added pointer-events-none to prevent touch-scroll blocking on mobile
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <StarCloud />
      </Canvas>
    </div>
  );
}
