import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { label: "Artificial Intelligence", color: "blue" },
  { label: "Machine Learning", color: "blue" },
  { label: "Natural Language Processing", color: "purple" },
  { label: "React.js", color: "blue" },
  { label: "Python", color: "purple" },
  { label: "Web Development", color: "blue" },
  { label: "TensorFlow", color: "purple" },
  { label: "Deep Learning", color: "blue" },
  { label: "Node.js", color: "purple" },
  { label: "Data Structures", color: "blue" },
  { label: "Computer Vision", color: "purple" },
  { label: "REST APIs", color: "blue" },
];

const stats = [
  { value: "3+", label: "AI Projects" },
  { value: "5+", label: "Technologies" },
  { value: "2+", label: "Years Learning" },
  { value: "∞", label: "Curiosity" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="section" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            color: "var(--neon-blue)",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <span style={{ flex: 0, whiteSpace: "nowrap" }}>01. about</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,212,255,0.4), transparent)" }} />
          </div>
          <h2 className="section-title neon-gradient-text">About Me</h2>
        </motion.div>

        <div className="about-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{
              position: "relative",
              padding: "2rem",
              borderRadius: "16px",
              background: "rgba(10, 5, 30, 0.6)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              marginBottom: "2rem",
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: "2rem",
                transform: "translateY(-50%)",
                background: "var(--deep-bg)",
                padding: "0 12px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "var(--neon-blue)",
              }}>
                // who_am_i.py
              </div>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
                I'm a passionate Computer Science student and AI developer with a deep fascination
                for building intelligent systems. My journey into AI began with curiosity — why do
                machines learn? — and evolved into building real solutions.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                From developing{" "}
                <span style={{ color: "var(--neon-blue)", fontWeight: 600 }}>Jennifer AI</span>,
                a voice-controlled assistant, to{" "}
                <span style={{ color: "#a78bfa", fontWeight: 600 }}>Sahayak</span>,
                an AI teaching companion, I focus on creating technology that genuinely helps
                people. I believe the future belongs to those who can blend intelligence with empathy.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass-card"
                  style={{ padding: "1.25rem", textAlign: "center" }}
                >
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "4px",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}>
                {">"} skills_and_expertise
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {skills.map((skill) => (
                  <motion.span
                    key={skill.label}
                    variants={itemVariants}
                    className={`skill-chip ${skill.color === "purple" ? "purple" : ""}`}
                  >
                    {skill.label}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                padding: "1.5rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(124, 58, 237, 0.05))",
                border: "1px solid rgba(0, 212, 255, 0.15)",
                marginTop: "1.5rem",
              }}
            >
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                color: "var(--neon-blue)",
                marginBottom: "0.75rem",
              }}>
                {">"} currently_focused_on
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Large Language Models & Prompt Engineering",
                  "Voice AI systems & NLP pipelines",
                  "Full-stack web applications with AI integration",
                  "Open-source contributions & research",
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
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
