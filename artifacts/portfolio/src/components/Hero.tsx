import { useRef, useEffect, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      (canvas.getContext as (ctx: string) => unknown)("experimental-webgl")
    );
  } catch {
    return false;
  }
}

function randomInSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number;
    do {
      x = (Math.random() * 2 - 1) * radius;
      y = (Math.random() * 2 - 1) * radius;
      z = (Math.random() * 2 - 1) * radius;
    } while (x * x + y * y + z * z > radius * radius);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => randomInSphere(4000, 1.5), []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00d4ff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

function AIOrb({ mousePos }: { mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1 + mousePos.y * 0.4;
      meshRef.current.rotation.y = t * 0.15 + mousePos.x * 0.4;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.3;
      ringRef1.current.rotation.z = t * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * 0.25;
      ringRef2.current.rotation.x = t * 0.15;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
      innerRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshStandardMaterial
          color="#050015"
          emissive="#00d4ff"
          emissiveIntensity={0.25}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>

      <mesh ref={innerRef} scale={0.7}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#0a0030"
          emissive="#7c3aed"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          wireframe={true}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          transparent
          opacity={0.04}
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh ref={ringRef1}>
        <torusGeometry args={[0.65, 0.015, 16, 120]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[0.78, 0.01, 16, 120]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <pointLight color="#00d4ff" intensity={2.5} distance={3} />
      <pointLight color="#7c3aed" intensity={1.5} distance={2} position={[0.5, 0.5, 0.5]} />
      <ambientLight intensity={0.08} />
    </group>
  );
}

function Scene({ mousePos }: { mousePos: { x: number; y: number } }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mousePos.x * 0.25 - camera.position.x) * 0.05;
    camera.position.y += (mousePos.y * 0.15 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <StarField />
      <AIOrb mousePos={mousePos} />
    </>
  );
}

function ParticleFallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(124, 58, 237, 0.15) 0%, rgba(0, 212, 255, 0.05) 40%, transparent 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          position: "relative",
          animation: "pulse-glow 3s ease-in-out infinite",
          boxShadow: "0 0 40px rgba(0, 212, 255, 0.2), inset 0 0 40px rgba(124, 58, 237, 0.1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "20%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.3), rgba(0, 212, 255, 0.1))",
            animation: "rotate-slow 8s linear infinite",
            border: "1px solid rgba(124, 58, 237, 0.4)",
          }}
        />
      </div>
    </div>
  );
}

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay },
  };
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(canUseWebGL());
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {webglAvailable ? (
          <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene mousePos={mousePos} />
            </Suspense>
          </Canvas>
        ) : (
          <ParticleFallback />
        )}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(124, 58, 237, 0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 30%, rgba(0, 212, 255, 0.05) 0%, transparent 55%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          width: "100%",
          paddingTop: "5rem",
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "580px" }}>
          <motion.div
            {...fadeUp(0)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.875rem",
              color: "var(--neon-blue)",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--neon-blue)",
                display: "inline-block",
                boxShadow: "0 0 10px rgba(0,212,255,0.8)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            Available for opportunities
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="hero-heading"
            style={{ marginBottom: "1.25rem" }}
          >
            Hi, I'm{" "}
            <span className="neon-gradient-text">Achyuth</span>
            <br />
            <span style={{ fontSize: "0.7em", color: "#94a3b8" }}>
              AI Developer &amp;
            </span>
            <br />
            <span className="neon-blue-text">Future Innovator</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            style={{
              color: "var(--text-muted)",
              fontSize: "1rem",
              lineHeight: 1.75,
              marginBottom: "2rem",
              maxWidth: "500px",
            }}
          >
            Building intelligent systems like{" "}
            <span style={{ color: "var(--neon-blue)", fontWeight: 600 }}>
              Jennifer AI Assistant
            </span>
            . CS student crafting tomorrow's technology today — one neural
            network at a time.
          </motion.p>

          <motion.div
            {...fadeUp(0.45)}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="neon-btn"
              style={{ cursor: "none" }}
            >
              <span>View Projects</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="neon-btn neon-btn-purple"
              style={{ cursor: "none" }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          background: "transparent",
          border: "none",
          cursor: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-muted)",
          fontSize: "0.7rem",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.1em",
        }}
      >
        <span>SCROLL</span>
        <div
          style={{
            width: 22,
            height: 38,
            border: "2px solid rgba(124, 58, 237, 0.4)",
            borderRadius: 11,
            display: "flex",
            justifyContent: "center",
            paddingTop: "5px",
          }}
        >
          <div
            style={{
              width: 3,
              height: 7,
              background: "var(--neon-blue)",
              borderRadius: 2,
              animation: "scroll-bounce 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </motion.button>
    </section>
  );
}
