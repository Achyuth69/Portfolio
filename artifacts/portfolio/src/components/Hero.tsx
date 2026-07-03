import { useEffect, useState } from "react";
import CosmicCanvas from "./CosmicCanvas";

// ─── Typewriter ───────────────────────────────────────────────────────────────
function TypewriterText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const word = words[index];
    if (!del && sub === word.length) {
      const t = setTimeout(() => setDel(true), 1800);
      return () => clearTimeout(t);
    }
    if (del && sub === 0) { setDel(false); setIndex(i => (i + 1) % words.length); return; }
    const t = setTimeout(() => setSub(s => s + (del ? -1 : 1)), del ? 40 : 75);
    return () => clearTimeout(t);
  }, [sub, del, index, words]);

  return (
    <span>
      {words[index].substring(0, sub)}
      <span style={{ opacity: blink ? 1 : 0, color: "#00d4ff" }}>|</span>
    </span>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#020008" }}>
      <CosmicCanvas />

      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.018) 2px,rgba(0,0,0,0.018) 4px)" }} />

      {/* Radial vignette */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(2,0,8,0.7) 100%)" }} />

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "28%", zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to bottom, transparent, rgba(2,0,8,0.98))" }} />

      {/* Text content */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", alignItems: "center",
        paddingLeft: "clamp(1.5rem, 5vw, 4rem)", paddingTop: "5rem", maxWidth: 700,
      }}>
        <div>
          {/* Status tag */}
          <div className={`hero-item hero-item-1${loaded ? " visible" : ""}`} style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem",
            color: "#00ff88", marginBottom: "1.1rem",
            display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.18em",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#00ff88",
              display: "inline-block", boxShadow: "0 0 12px #00ff88",
              animation: "core-pulse 2s ease-in-out infinite",
            }} />
            NEURAL LINK ESTABLISHED
          </div>

          {/* Name */}
          <h1 className={`hero-item hero-item-2${loaded ? " visible" : ""}`} style={{
            fontFamily: "'Orbitron',sans-serif",
            fontSize: "clamp(2.6rem, 8vw, 6rem)",
            fontWeight: 900, lineHeight: 0.95,
            letterSpacing: "0.03em", marginBottom: "0.6rem",
          }}>
            <span style={{ color: "#475569", fontSize: "0.36em", display: "block",
              marginBottom: "0.5em", fontWeight: 400, letterSpacing: "0.15em" }}>
              Hi, I'm
            </span>
            <span className="glitch-wrapper" data-text="ACHYUTH">ACHYUTH</span>
          </h1>

          {/* Typewriter */}
          <div className={`hero-item hero-item-3${loaded ? " visible" : ""}`} style={{
            fontFamily: "'Orbitron',sans-serif",
            fontSize: "clamp(0.95rem, 2.5vw, 1.5rem)",
            fontWeight: 600, marginBottom: "1.4rem", minHeight: "2em",
          }}>
            <span style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              <TypewriterText words={["AI Developer", "CS Student", "Future Innovator", "Neural Engineer", "Agent Builder"]} />
            </span>
          </div>

          {/* Description */}
          <p className={`hero-item hero-item-4${loaded ? " visible" : ""}`} style={{
            color: "#94a3b8", fontSize: "0.93rem", lineHeight: 1.85,
            marginBottom: "2.2rem", maxWidth: 480,
          }}>
            Building intelligent systems like{" "}
            <span style={{ color: "#00d4ff", fontWeight: 600 }}>Sahayak AI</span> &{" "}
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>Disaster Response Agents</span>.{" "}
            CS (AI&ML) student at GCET — forging tomorrow's technology, one neural network at a time.
          </p>

          {/* CTA buttons */}
          <div className={`hero-item hero-item-5${loaded ? " visible" : ""}`}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#projects"
              onClick={e => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                position: "relative", overflow: "hidden",
                background: "linear-gradient(135deg,rgba(0,212,255,0.13),rgba(124,58,237,0.13))",
                border: "1px solid rgba(0,212,255,0.55)", color: "#00d4ff",
                padding: "12px 28px", borderRadius: 7,
                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.82rem",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                boxShadow: "0 0 24px rgba(0,212,255,0.14)",
                animation: "btn-glow 3s ease-in-out infinite",
              }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              EXPLORE PROJECTS
            </a>
            <a href="/Achyuth_Parisha_Resume.pdf" download="Achyuth_Parisha_Resume.pdf" style={{
              background: "transparent", border: "1px solid rgba(124,58,237,0.5)",
              color: "#a78bfa", padding: "12px 28px", borderRadius: 7,
              fontFamily: "'JetBrains Mono',monospace", fontSize: "0.82rem",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.3s",
            }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD CV
            </a>
          </div>

          {/* Coordinates HUD */}
          <div className={`hero-item hero-item-6${loaded ? " visible" : ""}`} style={{
            marginTop: "1.8rem",
            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem",
            color: "rgba(124,58,237,0.4)", letterSpacing: "0.12em",
            display: "flex", gap: "1.2rem",
          }}>
            <span>LAT: 17.38°N</span>
            <span>LON: 78.49°E</span>
            <span style={{ animation: "hud-blink 2s ease-in-out infinite" }}>◉ VISAKHAPATNAM</span>
          </div>
        </div>
      </div>

      {/* HUD corner */}
      <div className={`hero-item hero-item-6${loaded ? " visible" : ""}`} style={{
        position: "absolute", top: "5.5rem", right: "2rem", zIndex: 6,
        fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem",
        color: "rgba(0,212,255,0.3)", textAlign: "right", lineHeight: 2, letterSpacing: "0.1em",
      }}>
        <div style={{ animation: "hud-blink 3s ease-in-out infinite" }}>SYS: ONLINE</div>
        <div>VER: 2.4.1</div>
        <div>NODES: 18,000</div>
        <div style={{ animation: "hud-blink 4s ease-in-out infinite" }}>◈ RENDER: ACTIVE</div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)", zIndex: 6,
          background: "transparent", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: "rgba(124,58,237,0.4)", fontSize: "0.55rem",
          fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.2em",
          opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1.8s",
        }}
      >
        <span>SCROLL</span>
        <div style={{ width: 20, height: 34, border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: 10, display: "flex", justifyContent: "center", paddingTop: "5px" }}>
          <div style={{ width: 3, height: 6, background: "#7c3aed", borderRadius: 2,
            animation: "scroll-bounce 1.5s ease-in-out infinite" }} />
        </div>
      </button>

      <style>{`
        /* Staggered fade-up for hero items */
        .hero-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hero-item.visible { opacity: 1; transform: translateY(0); }
        .hero-item-1 { transition-delay: 0.15s; }
        .hero-item-2 { transition-delay: 0.25s; }
        .hero-item-3 { transition-delay: 0.40s; }
        .hero-item-4 { transition-delay: 0.55s; }
        .hero-item-5 { transition-delay: 0.70s; }
        .hero-item-6 { transition-delay: 1.2s; }

        /* Glitch */
        .glitch-wrapper {
          position: relative; display: inline-block;
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #f0abfc 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .glitch-wrapper::before, .glitch-wrapper::after {
          content: attr(data-text); position: absolute; top: 0; left: 0;
          background: inherit;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .glitch-wrapper::before {
          animation: glitch-1 6s infinite;
          clip-path: polygon(0 0,100% 0,100% 35%,0 35%);
          transform: translateX(-3px);
        }
        .glitch-wrapper::after {
          animation: glitch-2 6s infinite;
          clip-path: polygon(0 65%,100% 65%,100% 100%,0 100%);
          transform: translateX(3px);
        }
        @keyframes glitch-1 {
          0%,87%,100%{transform:translateX(0);opacity:1;}
          89%{transform:translateX(-6px);filter:hue-rotate(90deg);}
          91%{transform:translateX(5px);}
          93%{transform:translateX(-3px);opacity:0.8;}
          95%{transform:translateX(3px);filter:hue-rotate(0);}
        }
        @keyframes glitch-2 {
          0%,85%,100%{transform:translateX(0);opacity:1;}
          87%{transform:translateX(6px);filter:hue-rotate(-90deg);}
          90%{transform:translateX(-5px);}
          92%{transform:translateX(5px);opacity:0.8;}
          94%{transform:translateX(-3px);filter:hue-rotate(0);}
        }
        @keyframes core-pulse { 0%,100%{opacity:0.5;transform:scale(1);} 50%{opacity:1;transform:scale(1.25);} }
        @keyframes hud-blink  { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        @keyframes btn-glow   { 0%,100%{box-shadow:0 0 24px rgba(0,212,255,0.14);} 50%{box-shadow:0 0 44px rgba(0,212,255,0.38),0 0 80px rgba(0,212,255,0.1);} }
        @keyframes scroll-bounce { 0%,100%{transform:translateY(0);opacity:1;} 50%{transform:translateY(8px);opacity:0.4;} }
      `}</style>
    </section>
  );
}
