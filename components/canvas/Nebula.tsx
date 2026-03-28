"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/store/useStore";

const PARTICLE_COUNT = 150000; // High count for volumetric feel

const generateParticles = () => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const randomness = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    // Torus/Galaxy distribution for a more organic shape
    const radius = Math.random() * 12 + 2;
    const theta = Math.random() * 2 * Math.PI;
    const phi = (Math.random() - 0.5) * 2.0;

    positions[i3] = radius * Math.cos(theta) + (Math.random() - 0.5) * 4;
    positions[i3 + 1] = radius * Math.sin(theta) + (Math.random() - 0.5) * 4;
    positions[i3 + 2] = phi * 4.0 + (Math.random() - 0.5) * 4;

    randomness[i3] = (Math.random() - 0.5) * 3;
    randomness[i3 + 1] = (Math.random() - 0.5) * 3;
    randomness[i3 + 2] = (Math.random() - 0.5) * 3;

    sizes[i] = Math.random() * 40 + 5;
  }

  return { positions, randomness, sizes };
};

const { positions, randomness, sizes } = generateParticles();

const vertexShader = `
  uniform float uTime;
  uniform vec3 uPointer;
  uniform float uIsListening;
  uniform vec3 uInputCoords;
  uniform float uMode;

  attribute vec3 aRandomness;
  attribute float aSize;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    
    // Complex Volumetric breathing (Multi-octave sine wave)
    float noise1 = sin(pos.x * 0.3 + uTime * 0.4) * cos(pos.y * 0.3 + uTime * 0.4) * sin(pos.z * 0.3);
    float noise2 = sin(pos.y * 0.6 - uTime * 0.2) * cos(pos.z * 0.6 - uTime * 0.2);
    
    pos += aRandomness * (noise1 + noise2) * 2.5;

    // Orbital rotation
    float angle = uTime * 0.05;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    pos.xy *= rot;

    // Cursor Interaction (Magnetic Repulsion/Attraction)
    vec3 dirToCursor = uPointer - pos;
    float distToCursor = length(dirToCursor);
    float cursorInfluence = smoothstep(8.0, 0.0, distToCursor);
    pos += dirToCursor * cursorInfluence * 0.15;

    // Gravitational Listening (FFT Simulation)
    vec3 dirToInput = uInputCoords - pos;
    float distToInput = length(dirToInput);
    float inputInfluence = smoothstep(12.0, 0.0, distToInput);
    
    // Create a "pulling" effect towards the input
    float pullStrength = uIsListening * 0.4 * (sin(distToInput * 2.0 - uTime * 10.0) * 0.5 + 0.5);
    pos += dirToInput * inputInfluence * pullStrength;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = aSize * (1.0 / -viewPosition.z);

    // Colors
    vec3 agentColor1 = vec3(1.0, 0.0, 0.498); // #FF007F
    vec3 agentColor2 = vec3(0.0, 0.0, 0.545); // #00008B
    vec3 agentColor3 = vec3(0.5, 0.0, 1.0);   // Deep Purple
    
    vec3 assistantColor1 = vec3(1.0, 1.0, 1.0);
    vec3 assistantColor2 = vec3(1.0, 0.71, 0.76);
    vec3 assistantColor3 = vec3(0.8, 0.9, 1.0);

    vec3 color1 = mix(agentColor1, assistantColor1, uMode);
    vec3 color2 = mix(agentColor2, assistantColor2, uMode);
    vec3 color3 = mix(agentColor3, assistantColor3, uMode);

    float mixRatio1 = (sin(pos.x * 0.2 + uTime * 0.5) + 1.0) * 0.5;
    float mixRatio2 = (cos(pos.y * 0.2 - uTime * 0.3) + 1.0) * 0.5;
    
    vec3 finalColor = mix(color1, color2, mixRatio1);
    finalColor = mix(finalColor, color3, mixRatio2);
    
    vColor = finalColor;
    
    // Dynamic Alpha
    vAlpha = smoothstep(20.0, 0.0, length(pos.xy)) * 0.7;
    vAlpha *= (sin(uTime * 2.0 + aRandomness.x * 10.0) * 0.5 + 0.5) * 0.5 + 0.5; // Twinkle
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular particle
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    
    if (strength < 0.0) discard;

    gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`;

export default function Nebula() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const mode = useStore((state) => state.mode);
  const isListening = useStore((state) => state.isListening);
  const inputCoordinates = useStore((state) => state.inputCoordinates);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3() },
      uIsListening: { value: 0 },
      uInputCoords: { value: new THREE.Vector3() },
      uMode: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Map pointer coordinates to 3D space
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    materialRef.current.uniforms.uPointer.value.set(x, y, 0);

    // Smooth mode transition
    const targetMode = mode === "agent" ? 0 : 1;
    materialRef.current.uniforms.uMode.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uMode.value,
      targetMode,
      0.05,
    );

    materialRef.current.uniforms.uIsListening.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uIsListening.value,
      isListening ? 1 : 0,
      0.1,
    );

    if (inputCoordinates) {
      // Map DOM coordinates to 3D space (approximate)
      const nx = (inputCoordinates.x / window.innerWidth) * 2 - 1;
      const ny = -(inputCoordinates.y / window.innerHeight) * 2 + 1;
      materialRef.current.uniforms.uInputCoords.value.set(
        (nx * viewport.width) / 2,
        (ny * viewport.height) / 2,
        0,
      );
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={PARTICLE_COUNT}
          array={randomness}
          itemSize={3}
          args={[randomness, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
