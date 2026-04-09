"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- GLSL MATH START ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  varying vec2 vUv;

  vec3 palette( in float t ) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.3, 0.2, 0.8); 
      return a + b * cos( 6.28318 * (c * t + d) );
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 3.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + float(i)*0.4 + u_time);
        d = sin(d * 8.0 + u_time) / 8.0;
        d = abs(d);
        d = pow(0.02 / d, 1.2); 
        finalColor += col * d;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
// --- GLSL MATH END ---

// NEW: Accept 'isVisible' as a prop from the parent HTML DOM
export default function HeroFluidShader({ isVisible }: { isVisible: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
    }),
    [],
  );

  // NEW: Removed the unused 'state' variable
  useFrame(() => {
    // Rely on the parent DOM tracker to kill the math
    if (!isVisible || !materialRef.current) return;
    materialRef.current.uniforms.u_time.value += 0.005;
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}
