import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

function useHyperspaceCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 350;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 600,
      speed: Math.random() * 3.5 + 0.8,
      colorIdx: Math.floor(Math.random() * 3),
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const NEBULA = [
      { x: 0.2, y: 0.3, r: 280, c: "rgba(124,58,237," },
      { x: 0.8, y: 0.6, r: 320, c: "rgba(0,212,255," },
      { x: 0.5, y: 0.8, r: 200, c: "rgba(240,171,252," },
      { x: 0.6, y: 0.15, r: 240, c: "rgba(0,100,180," },
    ];
    const nebulaOffsets = NEBULA.map(() => ({ dx: (Math.random() - 0.5) * 0.08, dy: (Math.random() - 0.5) * 0.08, px: 0, py: 0 }));

    const colors = ["#00d4ff", "#7c3aed", "#c4b5fd"];

    let frame = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      ctx.fillStyle = "rgba(2,0,8,0.18)";
      ctx.fillRect(0, 0, w, h);

      if (frame % 4 === 0) {
        for (let i = 0; i < NEBULA.length; i++) {
          const n = NEBULA[i];
          const off = nebulaOffsets[i];
          off.px += off.dx * 0.3;
          off.py += off.dy * 0.3;
          const nx = (n.x + off.px * 0.01) * w;
          const ny = (n.y + off.py * 0.01) * h;
          const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r);
          grad.addColorStop(0, n.c + "0.045)");
          grad.addColorStop(0.5, n.c + "0.02)");
          grad.addColorStop(1, n.c + "0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const s of stars) {
        const prevDist = s.dist;
        s.dist += s.speed * (s.dist / maxDist * 4 + 0.4);
        if (s.dist > maxDist + 20) {
          s.dist = Math.random() * 30;
          s.angle = Math.random() * Math.PI * 2;
          s.speed = Math.random() * 3.5 + 0.8;
        }
        const ratio = s.dist / maxDist;
        const x1 = cx + Math.cos(s.angle) * prevDist;
        const y1 = cy + Math.sin(s.angle) * prevDist;
        const x2 = cx + Math.cos(s.angle) * s.dist;
        const y2 = cy + Math.sin(s.angle) * s.dist;
        const a = ratio * s.alpha;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        const hex = Math.min(255, Math.floor(a * 255)).toString(16).padStart(2, "0");
        ctx.strokeStyle = colors[s.colorIdx] + hex;
        ctx.lineWidth = ratio * 2.2 + 0.3;
        ctx.stroke();
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

function GlitchText({ text }: { text: string }) {
  return (
    <span className="glitch-wrapper" data-text={text}>
      {text}
    </span>
  );
}

function TypewriterText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    const current = words[index];
    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => setSubIndex(s => s + (deleting ? -1 : 1)), speed);
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span style={{ opacity: blink ? 1 : 0, color: "var(--neon-blue)" }}>|</span>
    </span>
  );
}

function CosmicOrb({ mousePos }: { mousePos: { x: number; y: number } }) {
  const rx = mousePos.y * 18;
  const ry = mousePos.x * 18;

  return (
    <div style={{ position: "relative", width: 420, height: 420 }}>
      {/* Outer energy halo */}
      <div style={{
        position: "absolute", inset: "-70px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)",
        animation: "halo-pulse 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      {/* Outer mega ring */}
      <div style={{
        position: "absolute", inset: "-50px", borderRadius: "50%",
        border: "1px solid rgba(0,212,255,0.12)",
        boxShadow: "0 0 30px rgba(0,212,255,0.06)",
        animation: "mega-ring-spin 25s linear infinite",
      }}>
        <div style={{ position: "absolute", top: -4, left: "45%", width: 8, height: 8, borderRadius: "50%", background: "rgba(0,212,255,0.8)", boxShadow: "0 0 12px #00d4ff" }} />
        <div style={{ position: "absolute", bottom: -4, right: "30%", width: 5, height: 5, borderRadius: "50%", background: "rgba(124,58,237,0.9)", boxShadow: "0 0 10px #7c3aed" }} />
      </div>

      {/* 3D scene */}
      <div style={{
        position: "absolute", inset: 0,
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`,
        transition: "transform 0.08s ease-out",
        animation: "orb-float 7s ease-in-out infinite",
      }}>
        {/* Ring A - main equatorial */}
        <div style={{
          position: "absolute", inset: "30px", borderRadius: "50%",
          border: "2px solid rgba(0,212,255,0.75)",
          boxShadow: "0 0 18px rgba(0,212,255,0.5), inset 0 0 18px rgba(0,212,255,0.08)",
          transform: "rotateX(72deg)",
          animation: "ring-a 4s linear infinite",
        }}>
          <div style={{ position: "absolute", top: -5, left: "50%", marginLeft: -5, width: 10, height: 10, borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,0.5)" }} />
        </div>
        {/* Ring B */}
        <div style={{
          position: "absolute", inset: "20px", borderRadius: "50%",
          border: "1.5px solid rgba(124,58,237,0.8)",
          boxShadow: "0 0 15px rgba(124,58,237,0.4)",
          transform: "rotateX(35deg) rotateY(55deg)",
          animation: "ring-b 7s linear infinite reverse",
        }}>
          <div style={{ position: "absolute", bottom: -5, left: "50%", marginLeft: -4, width: 8, height: 8, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 16px #a78bfa" }} />
        </div>
        {/* Ring C */}
        <div style={{
          position: "absolute", inset: "10px", borderRadius: "50%",
          border: "1px solid rgba(240,171,252,0.5)",
          transform: "rotateX(15deg) rotateY(80deg)",
          animation: "ring-c 10s linear infinite",
        }}>
          <div style={{ position: "absolute", top: "20%", right: -4, width: 7, height: 7, borderRadius: "50%", background: "#f0abfc", boxShadow: "0 0 12px #f0abfc" }} />
        </div>
        {/* Ring D - tilted */}
        <div style={{
          position: "absolute", inset: "60px", borderRadius: "50%",
          border: "2px solid rgba(0,212,255,0.3)",
          transform: "rotateX(20deg) rotateZ(45deg)",
          animation: "ring-d 5s linear infinite",
        }} />
        {/* Ring E - fast inner */}
        <div style={{
          position: "absolute", inset: "100px", borderRadius: "50%",
          border: "1.5px solid rgba(196,181,253,0.6)",
          boxShadow: "0 0 10px rgba(196,181,253,0.3)",
          transform: "rotateX(55deg) rotateY(20deg)",
          animation: "ring-e 2.5s linear infinite reverse",
        }}>
          <div style={{ position: "absolute", top: -4, left: "50%", marginLeft: -3, width: 6, height: 6, borderRadius: "50%", background: "#c4b5fd", boxShadow: "0 0 10px #c4b5fd" }} />
        </div>

        {/* Core sphere */}
        <div style={{
          position: "absolute", inset: "80px", borderRadius: "50%",
          background: "radial-gradient(circle at 32% 28%, rgba(0,212,255,0.6) 0%, rgba(0,80,180,0.5) 25%, rgba(30,0,80,0.9) 55%, rgba(2,0,8,1) 80%)",
          boxShadow: "0 0 60px rgba(0,212,255,0.25), 0 0 100px rgba(124,58,237,0.15), inset -15px -15px 50px rgba(124,58,237,0.4), inset 8px 8px 30px rgba(0,212,255,0.25)",
        }}>
          {/* Specular highlight */}
          <div style={{ position: "absolute", top: "15%", left: "18%", width: "35%", height: "30%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)", transform: "rotate(-25deg)" }} />
          {/* Inner glow core */}
          <div style={{ position: "absolute", inset: "30%", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)", animation: "core-pulse 2.5s ease-in-out infinite" }} />
          {/* Scan line */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), rgba(0,212,255,0.9), rgba(0,212,255,0.6), transparent)", animation: "scan-sweep 3s ease-in-out infinite", boxShadow: "0 0 10px rgba(0,212,255,0.5)" }} />
          </div>
        </div>

        {/* Energy beams */}
        {[0, 120, 240].map((deg, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            width: "50%", height: "1px",
            transformOrigin: "0 50%",
            transform: `rotate(${deg}deg)`,
          }}>
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(90deg, ${i % 2 === 0 ? "rgba(0,212,255,0.6)" : "rgba(124,58,237,0.6)"}, transparent)`, animation: `beam-pulse ${1.5 + i * 0.4}s ease-in-out infinite` }} />
          </div>
        ))}
      </div>

      {/* HUD panel top-left */}
      <div style={{
        position: "absolute", top: -10, left: -90,
        background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.25)",
        borderRadius: 6, padding: "6px 10px", backdropFilter: "blur(10px)",
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
        color: "rgba(0,212,255,0.8)", minWidth: 80,
        animation: "hud-blink 4s ease-in-out infinite",
      }}>
        <div style={{ color: "#00d4ff", marginBottom: 3, fontSize: "0.55rem", letterSpacing: "0.1em" }}>SYS STATUS</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 6px #00ff88", animation: "core-pulse 1.5s ease-in-out infinite" }} />
          ONLINE
        </div>
        <div style={{ marginTop: 4, color: "#c4b5fd", fontSize: "0.55rem" }}>NEURAL: ACTIVE</div>
      </div>

      {/* HUD panel bottom-right */}
      <div style={{
        position: "absolute", bottom: 20, right: -100,
        background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: 6, padding: "6px 10px", backdropFilter: "blur(10px)",
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
        color: "rgba(196,181,253,0.85)", minWidth: 88,
        animation: "hud-blink 5s ease-in-out infinite 1s",
      }}>
        <div style={{ color: "#a78bfa", marginBottom: 4, fontSize: "0.55rem", letterSpacing: "0.1em" }}>AI CORE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
          <div style={{ flex: 1, height: 3, background: "rgba(124,58,237,0.2)", borderRadius: 2 }}>
            <div style={{ width: "92%", height: "100%", background: "linear-gradient(90deg, #7c3aed, #c4b5fd)", borderRadius: 2, animation: "bar-fill 3s ease-in-out infinite" }} />
          </div>
          <span>92%</span>
        </div>
        <div style={{ fontSize: "0.5rem", color: "rgba(196,181,253,0.5)" }}>PROC: 1.24T OPS</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  useHyperspaceCanvas(canvasRef);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const h = (e: MouseEvent) => setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -((e.clientY / window.innerHeight) * 2 - 1),
    });
    window.addEventListener("mousemove", h);
    return () => { clearTimeout(t); window.removeEventListener("mousemove", h); };
  }, []);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Hyperspace canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} />

      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(2,0,8,0.7) 100%)",
      }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to bottom, transparent, rgba(2,0,8,0.95))",
      }} />

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 4,
        maxWidth: 1280, margin: "0 auto",
        padding: "0 2rem",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "5rem",
        gap: "2rem",
      }}>
        {/* Left: text */}
        <div style={{ flex: "0 0 auto", maxWidth: 540 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#00ff88", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.15em" }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", display: "inline-block", boxShadow: "0 0 12px #00ff88", animation: "core-pulse 2s ease-in-out infinite" }} />
            NEURAL LINK ESTABLISHED
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2rem, 5.5vw, 4.8rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "0.02em", marginBottom: "1rem" }}
          >
            <span style={{ color: "#94a3b8", fontSize: "0.5em", display: "block", marginBottom: "0.3em", fontWeight: 400 }}>Hi, I'm</span>
            <GlitchText text="ACHYUTH" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontWeight: 600, marginBottom: "1.5rem", minHeight: "2.2em" }}
          >
            <span style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              <TypewriterText words={["AI Developer", "CS Student", "Future Innovator", "Neural Engineer"]} />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 460 }}
          >
            Building intelligent systems like{" "}
            <span style={{ color: "#00d4ff", fontWeight: 600 }}>Jennifer AI</span> &{" "}
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>Sahayak AI</span>.
            {" "}CS student forging tomorrow's technology — one neural network at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                position: "relative", overflow: "hidden",
                background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
                border: "1px solid rgba(0,212,255,0.6)",
                color: "#00d4ff", padding: "12px 28px", borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                boxShadow: "0 0 20px rgba(0,212,255,0.2), inset 0 0 20px rgba(0,212,255,0.05)",
                transition: "all 0.3s", cursor: "none",
                animation: "btn-glow 3s ease-in-out infinite",
              }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              EXPLORE PROJECTS
            </a>
            <a
              href="#"
              onClick={e => e.preventDefault()}
              style={{
                background: "transparent",
                border: "1px solid rgba(124,58,237,0.5)",
                color: "#a78bfa", padding: "12px 28px", borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 0.3s", cursor: "none",
              }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              DOWNLOAD CV
            </a>
          </motion.div>

          {/* Coordinate display */}
          <motion.div
            initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
            style={{ marginTop: "2rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(124,58,237,0.5)", letterSpacing: "0.12em", display: "flex", gap: "1.5rem" }}
          >
            <span>LAT: 17.38°N</span>
            <span>LON: 78.49°E</span>
            <span style={{ animation: "hud-blink 2s ease-in-out infinite" }}>◉ VISAKHAPATNAM</span>
          </motion.div>
        </div>

        {/* Right: Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }} animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <CosmicOrb mousePos={mousePos} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)", zIndex: 5,
          background: "transparent", border: "none", cursor: "none",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: "rgba(124,58,237,0.5)", fontSize: "0.6rem",
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em",
        }}
      >
        <span>SCROLL</span>
        <div style={{ width: 20, height: 35, border: "1px solid rgba(124,58,237,0.35)", borderRadius: 10, display: "flex", justifyContent: "center", paddingTop: "5px" }}>
          <div style={{ width: 3, height: 6, background: "#7c3aed", borderRadius: 2, animation: "scroll-bounce 1.5s ease-in-out infinite" }} />
        </div>
      </motion.button>

      <style>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #f0abfc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glitch-wrapper::before,
        .glitch-wrapper::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          background: inherit;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glitch-wrapper::before {
          animation: glitch-1 4s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          transform: translateX(-3px);
        }
        .glitch-wrapper::after {
          animation: glitch-2 4s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          transform: translateX(3px);
        }
        @keyframes glitch-1 {
          0%, 90%, 100% { transform: translateX(0); opacity: 1; }
          92% { transform: translateX(-4px); filter: hue-rotate(90deg); }
          94% { transform: translateX(4px); }
          96% { transform: translateX(-2px); opacity: 0.8; }
          98% { transform: translateX(2px); filter: hue-rotate(0deg); }
        }
        @keyframes glitch-2 {
          0%, 88%, 100% { transform: translateX(0); opacity: 1; }
          90% { transform: translateX(4px); filter: hue-rotate(-90deg); }
          93% { transform: translateX(-4px); }
          95% { transform: translateX(3px); opacity: 0.8; }
          97% { transform: translateX(-2px); filter: hue-rotate(0deg); }
        }
        @keyframes orb-float {
          0%, 100% { transform: perspective(900px) translateY(0px); }
          50% { transform: perspective(900px) translateY(-18px); }
        }
        @keyframes ring-a {
          from { transform: rotateX(72deg) rotateZ(0deg); }
          to   { transform: rotateX(72deg) rotateZ(360deg); }
        }
        @keyframes ring-b {
          from { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }
          to   { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); }
        }
        @keyframes ring-c {
          from { transform: rotateX(15deg) rotateY(80deg) rotateZ(0deg); }
          to   { transform: rotateX(15deg) rotateY(80deg) rotateZ(360deg); }
        }
        @keyframes ring-d {
          from { transform: rotateX(20deg) rotateZ(45deg) rotateY(0deg); }
          to   { transform: rotateX(20deg) rotateZ(45deg) rotateY(360deg); }
        }
        @keyframes ring-e {
          from { transform: rotateX(55deg) rotateY(20deg) rotateZ(0deg); }
          to   { transform: rotateX(55deg) rotateY(20deg) rotateZ(360deg); }
        }
        @keyframes mega-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes scan-sweep {
          0%   { top: -10%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes core-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes halo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes beam-pulse {
          0%, 100% { opacity: 0.3; transform: scaleX(0.7); }
          50% { opacity: 0.8; transform: scaleX(1); }
        }
        @keyframes hud-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @keyframes bar-fill {
          0%, 100% { width: 92%; }
          50% { width: 96%; }
        }
        @keyframes btn-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,212,255,0.2), inset 0 0 20px rgba(0,212,255,0.05); }
          50% { box-shadow: 0 0 35px rgba(0,212,255,0.4), inset 0 0 30px rgba(0,212,255,0.1); }
        }
        @media (max-width: 900px) {
          .cosmic-orb-container { display: none; }
        }
      `}</style>
    </section>
  );
}
