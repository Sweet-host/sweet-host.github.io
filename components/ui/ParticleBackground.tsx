"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. Move the random generation OUTSIDE the component.
// This runs exactly once and makes the React linter perfectly happy.
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
      // 1. The automatic slow rotation (kept the same perfect speed)
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;

      // 2. THE NEW MOUSE INTERACTION (Parallax)
      // This smoothly moves the cloud based on your cursor's X and Y position
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
          size={0.017} // Changed from 0.03 to 0.015 for a sharper, finer look
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
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <StarCloud />
      </Canvas>
    </div>
  );
}
