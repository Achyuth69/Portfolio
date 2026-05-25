import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Jennifer AI Assistant",
    description:
      "A conversational AI assistant powered by local LLMs via Ollama. Features context-aware multi-turn dialogue, retrieval-augmented generation over personal knowledge bases, and a clean chat interface — all running fully offline.",
    tech: ["Ollama", "LangChain", "RAG", "Python", "React", "Local LLMs"],
    color: "#00d4ff",
    accentColor: "rgba(0, 212, 255, 0.1)",
    borderColor: "rgba(0, 212, 255, 0.25)",
    icon: "🤖",
    demo: "https://github.com/Achyuth69",
    github: "https://github.com/Achyuth69",
    featured: true,
  },
  {
    id: 2,
    title: "Sahayak AI Teaching Assistant",
    description:
      "Multilingual AI assistant for teachers with lesson planning, worksheet generation, and voice interaction. Powered by LLM-driven content generation with multimodal inputs — text, image, and voice.",
    tech: ["LangChain", "LLMs", "Voice AI", "Multimodal", "React", "Firebase"],
    color: "#7c3aed",
    accentColor: "rgba(124, 58, 237, 0.1)",
    borderColor: "rgba(124, 58, 237, 0.25)",
    icon: "📚",
    demo: "https://sahayak-ai-assistant-7d448.web.app/dashboard",
    github: "https://github.com/Achyuth69",
    featured: true,
  },
  {
    id: 3,
    title: "Secure Inter-Branch Payment System",
    description:
      "Secure inter-branch banking transaction system with AES-256 encryption, RSA-2048 digital signatures, SHA-256 blockchain logging, JWT auth, fraud detection, and replay attack prevention. Real-time MITM attack simulation included.",
    tech: ["Java", "Node.js", "TypeScript", "React", "PostgreSQL", "AES-256", "RSA-2048"],
    color: "#34d399",
    accentColor: "rgba(52, 211, 153, 0.08)",
    borderColor: "rgba(52, 211, 153, 0.2)",
    icon: "🔐",
    demo: "https://github.com/Achyuth69/Hybrid-Secure-Inter-Branch-Payment-System",
    github: "https://github.com/Achyuth69/Hybrid-Secure-Inter-Branch-Payment-System",
    featured: true,
  },
  {
    id: 4,
    title: "Disaster Response AI Agents",
    description:
      "Real-time multi-agent system for disaster response with dedicated planning, resource allocation, and communication agents. Implements orchestration, consensus decision-making, and resilient architecture with fallbacks & checkpoints.",
    tech: ["LangGraph", "Multi-Agent", "FastAPI", "Orchestration", "Python", "WebSockets"],
    color: "#f0abfc",
    accentColor: "rgba(240, 171, 252, 0.08)",
    borderColor: "rgba(240, 171, 252, 0.2)",
    icon: "🌐",
    demo: "https://disaster-response-ai.up.railway.app/ui/index.html",
    github: "https://github.com/Achyuth69",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      x: ((y - rect.height / 2) / rect.height) * -8,
      y: ((x - rect.width / 2) / rect.width) * 8,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: "transform 0.2s ease, box-shadow 0.3s ease",
        cursor: "none",
      }}
      className="project-card glass-card"
    >
      <div style={{ padding: "2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: `radial-gradient(circle, ${project.accentColor} 0%, transparent 70%)`, borderRadius: "50%", transform: "translate(30%, -30%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: "12px", background: project.accentColor, border: `1px solid ${project.borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
            {project.icon}
          </div>
          {project.featured && (
            <span style={{ background: project.accentColor, border: `1px solid ${project.borderColor}`, color: project.color, padding: "3px 10px", borderRadius: "50px", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
              FEATURED
            </span>
          )}
        </div>

        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", color: project.color }}>
          {project.title}
        </h3>

        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.75rem" }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-chip" style={{ borderColor: project.borderColor, color: project.color + "cc" }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn"
              style={{ borderColor: project.color, color: project.color, flex: 1, justifyContent: "center", cursor: "none", fontSize: "0.8rem" }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Demo
            </a>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: `${project.accentColor}`, border: `1px solid ${project.borderColor}`, color: project.color + "66", padding: "10px 16px", borderRadius: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              View Project
            </div>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-muted)", padding: "10px 16px", borderRadius: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", textDecoration: "none", transition: "all 0.3s ease", cursor: "none" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={sectionRef} className="section">
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--neon-blue)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ flex: 0, whiteSpace: "nowrap" }}>02. projects</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,212,255,0.4), transparent)" }} />
          </div>
          <h2 className="section-title neon-gradient-text">Featured Work</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.75rem", maxWidth: "500px" }}>
            AI systems, multi-agent architectures, and production-grade software.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
