import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
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
  const { size } = useThree();

  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;

  const sunPosition = isMobile
    ? [-1.65, 2.6, -5]
    : isTablet
    ? [-3.1, 2.65, -5]
    : [-4.2, 2.55, -5];

  const sunScale = isMobile ? 0.75 : isTablet ? 0.9 : 1;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (sunRef.current) {
      sunRef.current.scale.setScalar(
        sunScale * (1 + Math.sin(t * 1.4) * 0.025)
      );
    }
  });

  return (
    <group position={sunPosition}>
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.32, 48, 48]} />
        <meshStandardMaterial
          color="#ffb84d"
          emissive="#ff8a00"
          emissiveIntensity={3.5}
          roughness={0.35}
        />
      </mesh>

      <mesh scale={1.9 * sunScale}>
        <sphereGeometry args={[0.32, 48, 48]} />
        <meshBasicMaterial
          color="#ff9f1c"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={3.1 * sunScale}>
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
  const { size } = useThree();

  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;

  const marsTexture = useTexture("/textures/mars.jpg");

  const basePosition = isMobile
    ? [1.05, 3.55, -9]
    : isTablet
    ? [1.55, 2.65, -9]
    : [1.15, 3.85, -8];

  const baseScale = isMobile ? 0.08 : isTablet ? 0.1 : 0.12;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (marsRef.current) {
      marsRef.current.rotation.y += 0.001;

      marsRef.current.position.x =
        basePosition[0] + Math.sin(t * 0.05) * 0.04;
      marsRef.current.position.y =
        basePosition[1] + Math.cos(t * 0.04) * 0.025;
    }
  });

  return (
    <mesh ref={marsRef} position={basePosition} scale={baseScale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={marsTexture}
        roughness={0.9}
        metalness={0.02}
        emissive="#2a0c04"
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

function Earth() {
  const earthGroupRef = useRef();
  const earthRef = useRef();
  const cloudsRef = useRef();
  const outerGlowRef = useRef();

  const { size } = useThree();

  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;

  const earthTexture = useTexture("/textures/earth.jpg");
  const cloudsTexture = useTexture("/textures/clouds.jpg");

  earthTexture.colorSpace = THREE.SRGBColorSpace;

  const basePosition = isMobile
    ? [1.66, 1.2, -7]
    : isTablet
    ? [2.7, 1.0, -7]
    : [3.35, 2.05, -7];

  const baseScale = isMobile ? 0.42 : isTablet ? 0.55 : 0.62;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (earthGroupRef.current) {
      earthGroupRef.current.position.x =
        basePosition[0] + Math.sin(t * 0.09) * 0.12;
      earthGroupRef.current.position.y =
        basePosition[1] + Math.cos(t * 0.07) * 0.06;
    }

    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0019;
    }

    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(
        1.018 + Math.sin(t * 0.6) * 0.002
      );
    }
  });

  return (
    <group
      ref={earthGroupRef}
      position={basePosition}
      scale={baseScale}
    >
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.38}
          metalness={0.02}
          emissive="#0c4a8a"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={1.015}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          color="#ffffff"
          alphaMap={cloudsTexture}
          transparent
          opacity={1}
          roughness={0.23}
          metalness={0}
          emissive="#d9f1ff"
          emissiveIntensity={0.32}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={outerGlowRef} scale={1.018}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshBasicMaterial
          color="#4aa3ff"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}


function MoonTerrain() {
  const meshRef = useRef();
  const moonTexture = useTexture("/textures/moon-foreground.png");

  moonTexture.colorSpace = THREE.SRGBColorSpace;
  moonTexture.wrapS = THREE.RepeatWrapping;
  moonTexture.wrapT = THREE.RepeatWrapping;
  moonTexture.repeat.set(4, 2);

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
      <meshStandardMaterial
        map={moonTexture}
        color="#b8b3aa"
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function PlanetScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 48 }}>
        <color attach="background" args={["#02040a"]} />

        <ambientLight intensity={0.12} />

        <directionalLight
          position={[-6, 5, 4]}
          intensity={3.6}
          color="#fff2cc"
        />

        <pointLight
          position={[-4.2, 2.55, -3]}
          intensity={7}
          distance={10}
          color="#ffb347"
        />

        <pointLight position={[3, 1, 2]} intensity={1.1} color="#7db7ff" />

        <pointLight
          position={[4.8, 2.2, -4]}
          intensity={1.8}
          distance={5}
          color="#4aa3ff"
        />
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