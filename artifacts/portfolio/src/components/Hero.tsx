import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      r: number; color: string;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(0,212,255,", "rgba(124,58,237,", "rgba(240,171,252,"];
    for (let i = 0; i < 180; i++) {
      const c = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: -Math.random() * 1.5 - 0.5,
        r: Math.random() * 1.5 + 0.5,
        color: c,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.z <= 0) p.z = 1000;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const scale = 1000 / (1000 + p.z);
        const px = cx + (p.x - cx) * scale;
        const py = cy + (p.y - cy) * scale;
        const alpha = Math.max(0, (1 - p.z / 1000) * 0.8);
        const radius = p.r * scale;

        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.3, radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha + ")";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

function OrbCSS3D({ mousePos }: { mousePos: { x: number; y: number } }) {
  const rotX = mousePos.y * 25;
  const rotY = mousePos.x * 25;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "8%",
        transform: "translate(0, -50%)",
        width: 340,
        height: 340,
        perspective: "800px",
      }}
    >
      {/* Outer glow ring */}
      <div style={{
        position: "absolute",
        inset: "-40px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)",
        animation: "pulse-glow 3s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Main 3D container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: "transform 0.1s ease-out",
          animation: "orbit-float 6s ease-in-out infinite",
        }}
      >
        {/* Core sphere */}
        <div style={{
          position: "absolute",
          inset: "40px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, rgba(0,212,255,0.5) 0%, rgba(0,80,120,0.6) 35%, rgba(10,0,40,0.95) 70%)",
          boxShadow: "0 0 60px rgba(0,212,255,0.3), 0 0 120px rgba(124,58,237,0.2), inset -20px -20px 60px rgba(124,58,237,0.3), inset 10px 10px 30px rgba(0,212,255,0.2)",
        }} />

        {/* Highlight sheen */}
        <div style={{
          position: "absolute",
          top: "52px",
          left: "55px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
          transform: "rotate(-30deg)",
          pointerEvents: "none",
        }} />

        {/* Orbit ring 1 */}
        <div style={{
          position: "absolute",
          inset: "20px",
          borderRadius: "50%",
          border: "1.5px solid rgba(0,212,255,0.6)",
          boxShadow: "0 0 12px rgba(0,212,255,0.4), inset 0 0 12px rgba(0,212,255,0.1)",
          transform: "rotateX(70deg)",
          animation: "ring-spin-1 4s linear infinite",
        }}>
          {/* Ring dot */}
          <div style={{
            position: "absolute",
            top: "-4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#00d4ff",
            boxShadow: "0 0 10px #00d4ff",
          }} />
        </div>

        {/* Orbit ring 2 */}
        <div style={{
          position: "absolute",
          inset: "10px",
          borderRadius: "50%",
          border: "1px solid rgba(124,58,237,0.5)",
          boxShadow: "0 0 10px rgba(124,58,237,0.3)",
          transform: "rotateX(30deg) rotateY(60deg)",
          animation: "ring-spin-2 6s linear infinite reverse",
        }}>
          <div style={{
            position: "absolute",
            bottom: "-4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#a78bfa",
            boxShadow: "0 0 8px #a78bfa",
          }} />
        </div>

        {/* Orbit ring 3 */}
        <div style={{
          position: "absolute",
          inset: "55px",
          borderRadius: "50%",
          border: "1px solid rgba(240,171,252,0.35)",
          transform: "rotateY(80deg) rotateX(15deg)",
          animation: "ring-spin-3 8s linear infinite",
        }} />

        {/* Data nodes orbiting */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 6,
            height: 6,
            marginTop: -3,
            marginLeft: -3,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#00d4ff" : "#7c3aed",
            boxShadow: i % 2 === 0 ? "0 0 8px #00d4ff" : "0 0 8px #7c3aed",
            transform: `rotate(${deg}deg) translateX(140px)`,
            animation: `node-orbit-${i % 3} ${4 + i}s linear infinite`,
          }} />
        ))}
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useParticleCanvas(canvasRef);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      />

      {/* Gradient overlays */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.1) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.06) 0%, transparent 50%)",
      }} />

      {/* 3D CSS orb */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
        <OrbCSS3D mousePos={mousePos} />
      </div>

      {/* Hero text */}
      <div style={{
        position: "relative", zIndex: 4,
        maxWidth: 1200, margin: "0 auto",
        padding: "0 2rem",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "5rem",
      }}>
        <div style={{ maxWidth: "560px" }}>
          <motion.div {...fadeUp(0)} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.875rem",
            color: "var(--neon-blue)",
            marginBottom: "0.75rem",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--neon-blue)", display: "inline-block",
              boxShadow: "0 0 10px rgba(0,212,255,0.9)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            Available for opportunities
          </motion.div>

          <motion.h1 {...fadeUp(0.15)} className="hero-heading" style={{ marginBottom: "1.25rem" }}>
            Hi, I'm{" "}
            <span className="neon-gradient-text">Achyuth</span>
            <br />
            <span style={{ fontSize: "0.7em", color: "#94a3b8" }}>AI Developer &amp;</span>
            <br />
            <span className="neon-blue-text">Future Innovator</span>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} style={{
            color: "var(--text-muted)", fontSize: "1rem",
            lineHeight: 1.75, marginBottom: "2rem", maxWidth: "500px",
          }}>
            Building intelligent systems like{" "}
            <span style={{ color: "var(--neon-blue)", fontWeight: 600 }}>Jennifer AI Assistant</span>.
            CS student crafting tomorrow's technology today — one neural network at a time.
          </motion.p>

          <motion.div {...fadeUp(0.45)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#projects" onClick={e => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="neon-btn" style={{ cursor: "none" }}>
              <span>View Projects</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#" onClick={e => e.preventDefault()} className="neon-btn neon-btn-purple" style={{ cursor: "none" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)", zIndex: 5,
          background: "transparent", border: "none", cursor: "none",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          color: "var(--text-muted)", fontSize: "0.7rem",
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em",
        }}
      >
        <span>SCROLL</span>
        <div style={{
          width: 22, height: 38,
          border: "2px solid rgba(124,58,237,0.4)", borderRadius: 11,
          display: "flex", justifyContent: "center", paddingTop: "5px",
        }}>
          <div style={{
            width: 3, height: 7, background: "var(--neon-blue)",
            borderRadius: 2, animation: "scroll-bounce 1.5s ease-in-out infinite",
          }} />
        </div>
      </motion.button>

      <style>{`
        @keyframes orbit-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes ring-spin-1 {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes ring-spin-2 {
          from { transform: rotateX(30deg) rotateY(60deg) rotateZ(0deg); }
          to   { transform: rotateX(30deg) rotateY(60deg) rotateZ(360deg); }
        }
        @keyframes ring-spin-3 {
          from { transform: rotateY(80deg) rotateX(15deg) rotateZ(0deg); }
          to   { transform: rotateY(80deg) rotateX(15deg) rotateZ(360deg); }
        }
        @keyframes node-orbit-0 {
          from { transform: rotate(0deg) translateX(140px); }
          to   { transform: rotate(360deg) translateX(140px); }
        }
        @keyframes node-orbit-1 {
          from { transform: rotate(0deg) translateX(140px); }
          to   { transform: rotate(-360deg) translateX(140px); }
        }
        @keyframes node-orbit-2 {
          from { transform: rotate(0deg) translateX(140px); }
          to   { transform: rotate(360deg) translateX(140px); }
        }
        @media (max-width: 768px) {
          .orb-3d { display: none; }
        }
      `}</style>
    </section>
  );
}
