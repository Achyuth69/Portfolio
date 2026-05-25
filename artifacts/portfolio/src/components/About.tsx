import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { label: "Python", color: "blue" },
  { label: "Java", color: "blue" },
  { label: "LLMs", color: "purple" },
  { label: "Agentic AI", color: "purple" },
  { label: "RAG", color: "blue" },
  { label: "Multi-Agent Systems", color: "purple" },
  { label: "LangChain", color: "blue" },
  { label: "LangGraph", color: "purple" },
  { label: "Ollama", color: "blue" },
  { label: "FastAPI", color: "purple" },
  { label: "Vector Databases", color: "blue" },
  { label: "Prompt Engineering", color: "purple" },
  { label: "WebSockets", color: "blue" },
  { label: "System Design", color: "purple" },
];

const stats = [
  { value: "4+", label: "AI Projects" },
  { value: "5", label: "Roles & Internships" },
  { value: "7.89", label: "CGPA" },
  { value: "∞", label: "Curiosity" },
];

const experience = [
  {
    role: "Tech Lead Intern",
    org: "Viswam AI",
    detail: "Led technical guidance & team support in an 8-week Summer of AI Internship.",
    color: "#00d4ff",
  },
  {
    role: "Intern",
    org: "TechSaksham (Microsoft & SAP)",
    detail: "Gained hands-on AI/ML experience under the Microsoft–SAP initiative.",
    color: "#7c3aed",
  },
  {
    role: "Overall Coordinator",
    org: "Nexovate 2k25",
    detail: "Led a national-level innovation event — managing teams, operations & execution.",
    color: "#f0abfc",
  },
  {
    role: "Chairperson",
    org: "IEEE Student Branch @GCET",
    detail: "Led IEEE activities, organized technical events, coordinated partnerships & workshops.",
    color: "#00d4ff",
  },
  {
    role: "Investment Banking Simulation",
    org: "JPMorganChase (Forage)",
    detail: "Identified M&A target, valued via DCF model, prepared 2-page client summary.",
    color: "#7c3aed",
  },
];

const achievements = [
  "🏆 Finalist – Tech Mahindra AI Days 2025 (National-Level)",
  "🎖️ Merit Certificate – MERN Stack Development (Brain O Vision) 2025",
  "🎓 Participant at ISRC 2023 – WestFord University",
  "🚀 Participant at Geenovate 2024",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="section" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--neon-blue)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ flex: 0, whiteSpace: "nowrap" }}>01. about</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,212,255,0.4), transparent)" }} />
          </div>
          <h2 className="section-title neon-gradient-text">About Me</h2>
        </motion.div>

        {/* Top row: bio + skills */}
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start", marginBottom: "3.5rem" }}>
          {/* Bio + stats */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ position: "relative", padding: "1.75rem", borderRadius: "16px", background: "rgba(10,5,30,0.6)", border: "1px solid rgba(124,58,237,0.2)", marginBottom: "1.75rem" }}>
              <div style={{ position: "absolute", top: 0, left: "1.75rem", transform: "translateY(-50%)", background: "var(--deep-bg)", padding: "0 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--neon-blue)" }}>
                // who_am_i.py
              </div>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
                AI/ML student at GCET with a passion for building intelligent systems. My work spans
                agentic AI, multi-agent architectures, and real-world LLM applications — focused
                on solving problems that actually matter.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                From{" "}
                <span style={{ color: "var(--neon-blue)", fontWeight: 600 }}>Sahayak AI</span> (multilingual teacher assistant) to a{" "}
                <span style={{ color: "#a78bfa", fontWeight: 600 }}>Disaster Response Multi-Agent System</span>,
                I build technology that genuinely helps people — one neural network at a time.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass-card"
                  style={{ padding: "1.25rem", textAlign: "center" }}
                >
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.75rem", fontWeight: 800, background: "linear-gradient(135deg, #00d4ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills + focus */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>{">"} skills_and_expertise</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skills.map((skill) => (
                  <motion.span key={skill.label} variants={itemVariants} className={`skill-chip ${skill.color === "purple" ? "purple" : ""}`}>
                    {skill.label}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 }}
              style={{ padding: "1.5rem", borderRadius: "12px", background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(124,58,237,0.05))", border: "1px solid rgba(0,212,255,0.15)", marginTop: "1.25rem" }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--neon-blue)", marginBottom: "0.75rem" }}>{">"} currently_focused_on</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Agentic AI & multi-agent orchestration (LangGraph)",
                  "Production LLM systems with RAG pipelines",
                  "Real-time AI applications with WebSockets",
                  "Open-source AI research & automation",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    <span style={{ color: "var(--neon-blue)", flexShrink: 0, marginTop: "2px" }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Experience timeline */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--neon-blue)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ flex: 0, whiteSpace: "nowrap" }}>{">"} experience_log</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,212,255,0.3), transparent)" }} />
          </div>

          <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {experience.map((exp, i) => (
              <motion.div
                key={exp.org}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                style={{ padding: "1.25rem", borderRadius: "12px", background: "rgba(10,5,30,0.5)", border: `1px solid ${exp.color}22`, position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle, ${exp.color}12, transparent 70%)`, borderRadius: "50%", transform: "translate(20%, -20%)" }} />
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: exp.color, marginBottom: "4px", letterSpacing: "0.05em" }}>{exp.role}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-primary)", fontWeight: 600, marginBottom: "6px" }}>{exp.org}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{exp.detail}</div>
              </motion.div>
            ))}
          </div>

          {/* Achievements */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "#a78bfa", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ flex: 0, whiteSpace: "nowrap" }}>{">"} achievements</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(124,58,237,0.3), transparent)" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {achievements.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.07 }}
                style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)", color: "var(--text-muted)", fontSize: "0.82rem" }}
              >
                {a}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
