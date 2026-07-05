"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Fewer motes on small screens to keep phones smooth. This module only ever
// evaluates on the client (imported with ssr:false), so window is available.
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;
const COUNT = IS_MOBILE ? 1200 : 2600; // total motes in the depth field
const NODES = IS_MOBILE ? 45 : 90; // brighter "fleet" nodes among them

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // depth fade — motes dissolve into the void as they recede
    float depth = -mv.z;
    float fade = smoothstep(34.0, 6.0, depth);
    gl_PointSize = aSize * (260.0 / depth);
    gl_Position = projectionMatrix * mv;
    vAlpha = aAlpha * fade;
    vColor = aColor;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, soft * vAlpha);
  }
`;

function DepthField() {
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const foam = new THREE.Color("#cfe4ee");
    const signal = new THREE.Color("#3DE0D0");
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const alphas = new Float32Array(COUNT);
    const drift = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // volume biased wide and deep
      positions[i * 3] = (Math.random() - 0.5) * 46;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = -Math.random() * 30 - 2;

      const isNode = i < NODES;
      const c = isNode ? signal : foam;
      // tint a few non-nodes faintly toward signal for cohesion
      const tint = !isNode && Math.random() > 0.86 ? 0.4 : 0;
      const col = c.clone().lerp(signal, tint);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = isNode ? 5.5 + Math.random() * 3 : 1.2 + Math.random() * 2.2;
      alphas[i] = isNode ? 0.9 : 0.25 + Math.random() * 0.4;
      drift[i] = Math.random() * Math.PI * 2;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    (g as any).userData.drift = drift;
    (g as any).userData.baseY = positions.slice();
    return g;
  }, []);

  // mouse parallax
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // ease camera-ish parallax via group rotation
    current.current.x += (target.current.x - current.current.x) * 0.03;
    current.current.y += (target.current.y - current.current.y) * 0.03;
    if (points.current) {
      points.current.rotation.y = current.current.x * 0.12 + t * 0.012;
      points.current.rotation.x = -current.current.y * 0.08;

      // gentle vertical drift of motes
      const pos = points.current.geometry.attributes.position
        .array as Float32Array;
      const drift = (points.current.geometry as any).userData.drift as Float32Array;
      const baseY = (points.current.geometry as any).userData.baseY as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] = baseY[i * 3 + 1] + Math.sin(t * 0.15 + drift[i]) * 0.5;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 14], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <DepthField />
    </Canvas>
  );
}
