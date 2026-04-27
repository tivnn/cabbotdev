import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Earth() {
  const earthRef = useRef();

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <mesh ref={earthRef} position={[2.8, 1.3, -3]} scale={1.15}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#6aa9ff"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

function MoonSurface() {
  const moonRef = useRef();

  useFrame(({ clock }) => {
    if (moonRef.current) {
      moonRef.current.position.x = Math.sin(clock.elapsedTime * 0.08) * 0.08;
    }
  });

  return (
    <mesh ref={moonRef} position={[0, -2.25, -1]} rotation={[-1.35, 0, 0]}>
      <planeGeometry args={[14, 5, 64, 64]} />
      <meshStandardMaterial color="#8b8b8b" roughness={1} />
    </mesh>
  );
}

function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.18} />

        <directionalLight
          position={[-4, 4, 4]}
          intensity={2.4}
          color="#f8fbff"
        />

        <pointLight position={[-3, 2, 2]} intensity={3} color="#9fc7ff" />

        <Stars
          radius={120}
          depth={60}
          count={3500}
          factor={4}
          saturation={0}
          fade
          speed={0.35}
        />

        <Earth />
        <MoonSurface />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(147,197,253,0.28),transparent_28%),radial-gradient(circle_at_75%_45%,rgba(37,99,235,0.16),transparent_30%),linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.25)_55%,black_100%)]" />
    </div>
  );
}

export default HeroScene;