'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

// Fullscreen fragment shader: liquid metal neural flux with mouse-driven distortion.
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform float uPulse;

  // --- Hash / noise utils
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  // Cheap domain-warp flow
  vec3 flow(vec2 uv, float t) {
    vec2 p = uv * 2.4;
    vec2 q = vec2(fbm(p + t * 0.08), fbm(p - t * 0.09 + 4.3));
    vec2 r = vec2(fbm(p + q + t * 0.12 + 1.7), fbm(p + q - t * 0.10 + 9.1));
    float f = fbm(p + r);
    // Synaptic filaments: accentuate ridges
    float ridge = pow(1.0 - abs(f - 0.5) * 2.0, 3.0);
    vec3 green = vec3(0.0, 1.0, 0.25);
    vec3 purple = vec3(0.44, 0.14, 1.0);
    vec3 col = mix(purple * 0.4, green * 0.85, f);
    col += green * ridge * 0.6;
    col += purple * pow(r.x, 3.0) * 0.8;
    return col;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uRes.x / uRes.y;

    // Mouse gravity well
    vec2 m = uMouse;
    m.x *= uRes.x / uRes.y;
    vec2 toM = m - p;
    float d = length(toM);
    float pull = exp(-d * 3.2) * 0.12;
    p += normalize(toM + 1e-4) * pull;

    // Flow color
    vec3 col = flow(p, uTime);

    // Central depth fog towards black
    float vig = smoothstep(1.2, 0.25, length(p));
    col *= vig;

    // Mouse highlight bloom
    float hot = smoothstep(0.35, 0.0, d);
    col += vec3(0.0, 1.0, 0.3) * hot * (0.25 + 0.35 * uPulse);

    // Scanline pulse (very subtle)
    float scan = 0.04 * sin(uv.y * 800.0 + uTime * 14.0);
    col += vec3(scan * 0.3, scan, scan * 0.4);

    // Global darken to keep it ambient
    col *= 0.55;

    // Gamma + vignette
    col = pow(col, vec3(1.15));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function FluxPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const pulseTarget = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uPulse: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5);
      mouseTarget.current.y = -(e.clientY / window.innerHeight - 0.5);
    };
    const handleDown = () => { pulseTarget.current = 1; };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerdown', handleDown);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
    };
  }, []);

  useFrame((state, delta) => {
    const u = matRef.current.uniforms;
    u.uTime.value += delta;
    // smooth mouse
    const m = u.uMouse.value as THREE.Vector2;
    m.x += (mouseTarget.current.x - m.x) * 0.08;
    m.y += (mouseTarget.current.y - m.y) * 0.08;
    // smooth pulse decay
    u.uPulse.value += (pulseTarget.current - u.uPulse.value) * 0.12;
    pulseTarget.current *= 0.92;
    // resolution
    const { size } = state;
    (u.uRes.value as THREE.Vector2).set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function NeuralFlux() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 1] }}
      >
        <FluxPlane />
      </Canvas>
      <div className="absolute inset-0 bg-substrate opacity-60" />
    </div>
  );
}
