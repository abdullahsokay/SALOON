"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#ec3013";
const INK = "#201e1d";

function Stack({ photoUrl }: { photoUrl: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(photoUrl, (tex) => {
    (tex as THREE.Texture).colorSpace = THREE.SRGBColorSpace;
  });

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    // Pointer-driven tilt (damped toward target) + a slow idle drift so the
    // stack never looks perfectly static, mirroring the mockup's CSS
    // perspective tilt + jgFloat-style idle motion.
    const targetX = -state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.5;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 4, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 4, delta);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* back — accent card */}
      <mesh position={[0.55, -0.5, -1.8]} rotation={[0, 0, 0.06]}>
        <planeGeometry args={[3.2, 3.8]} />
        <meshStandardMaterial color={ACCENT} roughness={0.6} />
      </mesh>
      {/* mid — dark card */}
      <mesh position={[0.28, -0.25, -0.9]} rotation={[0, 0, 0.03]}>
        <planeGeometry args={[3.2, 3.8]} />
        <meshStandardMaterial color={INK} roughness={0.7} />
      </mesh>
      {/* front — photo card */}
      <mesh>
        <planeGeometry args={[3.2, 3.8]} />
        <meshStandardMaterial map={texture} roughness={0.85} />
      </mesh>
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  camera.position.set(0, 0, 6.2);
  return null;
}

export default function PortalHero3D({ photoUrl }: { photoUrl: string }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    >
      <Rig />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, 2]} intensity={0.3} />
      <Suspense fallback={null}>
        <Stack photoUrl={photoUrl} />
      </Suspense>
    </Canvas>
  );
}
