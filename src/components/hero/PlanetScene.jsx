import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SceneDrift({ children }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(t * 0.08) * 0.12;
      groupRef.current.position.y = Math.cos(t * 0.06) * 0.05;
      groupRef.current.rotation.z = Math.sin(t * 0.04) * 0.01;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function SunOrb() {
  const sunRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (sunRef.current) {
      sunRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.025);
    }
  });

  return (
    <group position={[-4.2, 2.55, -5]}>
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.32, 48, 48]} />
        <meshStandardMaterial
          color="#ffb84d"
          emissive="#ff8a00"
          emissiveIntensity={3.5}
          roughness={0.35}
        />
      </mesh>

      {/* soft outer glow */}
      <mesh scale={1.9}>
        <sphereGeometry args={[0.32, 48, 48]} />
        <meshBasicMaterial
          color="#ff9f1c"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* larger halo */}
      <mesh scale={3.1}>
        <sphereGeometry args={[0.32, 48, 48]} />
        <meshBasicMaterial
          color="#ffd166"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function DistantMars() {
  const marsRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (marsRef.current) {
      marsRef.current.rotation.y += 0.001;
      marsRef.current.position.x = 3.55 + Math.sin(t * 0.05) * 0.06;
      marsRef.current.position.y = 4.25 + Math.cos(t * 0.04) * 0.035;
    }
  });

  return (
    <mesh ref={marsRef} position={[3.55, 4.45, -9]} scale={0.12}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#d86b32"
        roughness={0.85}
        metalness={0.02}
        emissive="#4a1608"
        emissiveIntensity={0.55}
      />
    </mesh>
  );
}

function Earth() {
  const earthRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015;
      earthRef.current.position.x = 3.8 + Math.sin(t * 0.09) * 0.18;
      earthRef.current.position.y = 1.55 + Math.cos(t * 0.07) * 0.08;
    }
  });

  return (
    <mesh ref={earthRef} position={[3.8, 1.55, -7]} scale={0.72}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#7eb6ff"
        roughness={0.9}
        metalness={0.05}
        emissive="#0c2b5a"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

function MoonTerrain() {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(26, 10, 180, 80);
    const position = geo.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      const rolling =
        Math.sin(x * 0.45) * 0.22 +
        Math.cos(y * 0.7) * 0.14 +
        Math.sin((x + y) * 0.3) * 0.1;

      const crater1 =
        -Math.exp(-((x - 3.2) ** 2 + (y + 0.8) ** 2) / 2.4) * 0.6;

      const crater2 =
        -Math.exp(-((x + 4.6) ** 2 + (y - 0.4) ** 2) / 3.5) * 0.42;

      const crater3 =
        -Math.exp(-((x - 7.2) ** 2 + (y + 1.6) ** 2) / 2.0) * 0.28;

      const crater4 =
        -Math.exp(-((x + 8.4) ** 2 + (y + 1.2) ** 2) / 2.8) * 0.24;

      position.setY(i, rolling + crater1 + crater2 + crater3 + crater4);
    }

    position.needsUpdate = true;
    geo.computeVertexNormals();

    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(t * 0.04) * 0.18;
      meshRef.current.position.z = -1.4 + Math.cos(t * 0.03) * 0.02;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-1.28, 0, 0]}
      position={[0, -2.55, -1.4]}
    >
      <meshStandardMaterial color="#8f8c88" roughness={1} metalness={0.02} />
    </mesh>
  );
}

function PlanetScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 48 }}>
        <color attach="background" args={["#02040a"]} />

        <ambientLight intensity={0.12} />

        {/* Main sunlight direction from upper-left */}
        <directionalLight
          position={[-6, 5, 4]}
          intensity={3.6}
          color="#fff2cc"
        />

        {/* Warm sun light */}
        <pointLight
          position={[-4.2, 2.55, -3]}
          intensity={7}
          distance={10}
          color="#ffb347"
        />

        {/* Cool fill light so shadows are not fully dead */}
        <pointLight position={[3, 1, 2]} intensity={1.1} color="#7db7ff" />

        <Stars
          radius={140}
          depth={70}
          count={4300}
          factor={3.2}
          saturation={0}
          fade
          speed={0.25}
        />

        <SceneDrift>
          <SunOrb />
          <DistantMars />
          <Earth />
          <MoonTerrain />
        </SceneDrift>
      </Canvas>

      {/* Cinematic sunlight + darkness overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_7%_8%,rgba(255,184,77,0.38),transparent_17%),radial-gradient(circle_at_14%_18%,rgba(255,209,102,0.18),transparent_28%),radial-gradient(circle_at_24%_28%,rgba(96,165,250,0.12),transparent_34%),linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.1)_48%,rgba(0,0,0,0.5)_78%,black_100%)]" />

      {/* subtle yellow/orange beam across the scene */}
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(120deg,rgba(255,183,77,0.24)_0%,rgba(255,183,77,0.08)_18%,transparent_45%)]" />
    </div>
  );
}

export default PlanetScene;