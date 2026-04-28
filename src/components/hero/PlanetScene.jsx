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


function DistantMars() {
  const marsRef = useRef();
  const { size } = useThree();

  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;

  const marsTexture = useTexture("/textures/mars.jpg");

  const basePosition = isMobile
    ? [1.05, 3.8, -9]
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
    ? [1.8, 1.2, -7]
    : isTablet
    ? [2.7, 1.0, -7]
    : [3.35, 2.05, -7];

  const baseScale = isMobile ? 0.42 : isTablet ? 0.55 : 0.62;

  const nightShadowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        opacity: { value: 0.58 },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float opacity;

        void main() {
          float dist = distance(vUv, vec2(0.5, 0.5));
          float circleMask = 1.0 - smoothstep(0.47, 0.51, dist);

          float rightShadow = smoothstep(0.45, 0.82, vUv.x);
          float edgeFade = smoothstep(0.05, 0.18, vUv.y) * (1.0 - smoothstep(0.88, 1.0, vUv.y));

          float alpha = rightShadow * circleMask * edgeFade * opacity;

          gl_FragColor = vec4(0.0, 0.015, 0.04, alpha);
        }
      `,
    });
  }, []);

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
    <group ref={earthGroupRef} position={basePosition} scale={baseScale}>
      {/* Earth surface */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.42}
          metalness={0.02}
          emissive="#08366d"
          emissiveIntensity={0.38}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={1.015}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          color="#ffffff"
          alphaMap={cloudsTexture}
          transparent
          opacity={0.95}
          roughness={0.3}
          metalness={0}
          emissive="#d9f1ff"
          emissiveIntensity={0.22}
          depthWrite={false}
        />
      </mesh>

      {/* Right-side night shadow */}
      <mesh position={[0, 0, 1.04]} material={nightShadowMaterial}>
        <circleGeometry args={[1.04, 128]} />
      </mesh>

      {/* Thin atmosphere rim */}
      <mesh ref={outerGlowRef} scale={1.018}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshBasicMaterial
          color="#4aa3ff"
          transparent
          opacity={0.16}
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

function Comet() {
  const headRef = useRef();
  const glowRef = useRef();
  const trailRefs = useRef([]);

  const cometState = useRef({
    active: false,
    startTime: 0,
    duration: 2.8,
    nextSpawn: 4,
    start: new THREE.Vector3(-11, 3.8, -6),
    end: new THREE.Vector3(11, 1.8, -6),
  });

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const state = cometState.current;

    if (!headRef.current || !glowRef.current) return;

    if (!state.active) {
      if (t >= state.nextSpawn) {
        state.active = true;
        state.startTime = t;
        state.duration = 2.4 + Math.random() * 1.1;

        state.start.set(
          -11,
          3.2 + Math.random() * 2.2,
          -6.2 + Math.random() * 0.5
        );

        state.end.set(
          11,
          1.4 + Math.random() * 2.0,
          -6.2 + Math.random() * 0.5
        );

        headRef.current.visible = true;
        glowRef.current.visible = true;

        trailRefs.current.forEach((trail) => {
          if (trail) trail.visible = true;
        });
      } else {
        headRef.current.visible = false;
        glowRef.current.visible = false;

        trailRefs.current.forEach((trail) => {
          if (trail) trail.visible = false;
        });

        return;
      }
    }

    let progress = (t - state.startTime) / state.duration;

    if (progress >= 1) {
      state.active = false;
      state.nextSpawn = t + 7 + Math.random() * 8;

      headRef.current.visible = false;
      glowRef.current.visible = false;

      trailRefs.current.forEach((trail) => {
        if (trail) trail.visible = false;
      });

      return;
    }

    progress = THREE.MathUtils.smoothstep(progress, 0, 1);

    const currentPos = new THREE.Vector3().lerpVectors(
      state.start,
      state.end,
      progress
    );

    headRef.current.position.copy(currentPos);
    glowRef.current.position.copy(currentPos);

    const pulse = 1 + Math.sin(t * 18) * 0.08;
    headRef.current.scale.setScalar(1 * pulse);
    glowRef.current.scale.setScalar(1.35 * pulse);

    trailRefs.current.forEach((trail, i) => {
      if (!trail) return;

      const lag = (i + 1) * 0.035;
      const trailProgress = Math.max(0, progress - lag);

      const trailPos = new THREE.Vector3().lerpVectors(
        state.start,
        state.end,
        trailProgress
      );

      trail.position.copy(trailPos);

      const size = 1 - i * 0.09;
      trail.scale.setScalar(Math.max(0.25, size));

      if (trail.material) {
        trail.material.opacity = Math.max(0.02, 0.22 - i * 0.025);
      }
    });
  });

  return (
    <group>
      {/* comet head */}
      <mesh ref={headRef} visible={false}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshBasicMaterial color="#fff7c2" toneMapped={false} />
      </mesh>

      {/* comet glow */}
      <mesh ref={glowRef} visible={false}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshBasicMaterial
          color="#ffcc66"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      {/* comet tail */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          visible={false}
        >
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial
            color="#ffb347"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
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
          radius={160}
          depth={90}
          count={8000}
          factor={3.5}
          saturation={0}
          fade
          speed={0.20}
        />

         <SceneDrift>
          <DistantMars />
          <Earth />
        </SceneDrift>
      </Canvas>
      

      

      {/* Cinematic sunlight + darkness overlay */}
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(96,165,250,0.08),transparent_34%),linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.45)_78%,black_100%)]" />

      {/* subtle yellow/orange beam across the scene */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,rgba(255,183,77,0.14)_0%,rgba(255,183,77,0.05)_18%,transparent_45%)]" />
    </div>
  );
}

export default PlanetScene;