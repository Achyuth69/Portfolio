import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:achyuth@example.com",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    value: "achyuth@example.com",
    color: "#00d4ff",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/achyuth-parisha",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    value: "linkedin.com/in/achyuth-parisha",
    color: "#7c3aed",
  },
  {
    label: "GitHub",
    href: "https://github.com/achyuth-parisha",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    value: "github.com/achyuth-parisha",
    color: "#f0abfc",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="section" style={{ background: "rgba(0,0,0,0.3)" }}>
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
            <span style={{ flex: 0, whiteSpace: "nowrap" }}>03. contact</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,212,255,0.4), transparent)" }} />
          </div>
          <h2 className="section-title neon-gradient-text">Get In Touch</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.75rem", maxWidth: "480px" }}>
            Have an exciting project or opportunity? Let's connect and build something amazing together.
          </p>
        </motion.div>

        <div className="contact-grid" style={{
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
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{
                color: "var(--text-muted)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}>
                I'm currently open to internships, collaborations, and exciting projects.
                Whether it's AI research, web development, or anything tech — I'd love to hear from you.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="glass-card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.25rem",
                      textDecoration: "none",
                      color: "var(--text-primary)",
                      transition: "all 0.3s ease",
                      cursor: "none",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = link.color + "66";
                      e.currentTarget.style.transform = "translateX(6px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--glass-border)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background: `${link.color}15`,
                      border: `1px solid ${link.color}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: link.color,
                      flexShrink: 0,
                    }}>
                      {link.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: link.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: "2px" }}>
                        {link.label}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {link.value}
                      </div>
                    </div>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginLeft: "auto", color: "var(--text-muted)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="animated-border" style={{ position: "relative" }}>
              <div className="glass-card" style={{ padding: "2rem" }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--neon-blue)",
                  marginBottom: "1.5rem",
                }}>
                  {">"} send_message()
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      textAlign: "center",
                      padding: "3rem 1rem",
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                    <div style={{ color: "var(--neon-blue)", fontFamily: "'Orbitron', sans-serif", fontSize: "1.1rem" }}>
                      Message Sent!
                    </div>
                    <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.875rem" }}>
                      I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: "6px",
                      }}>
                        Name
                      </label>
                      <input
                        type="text"
                        className="glow-input"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: "6px",
                      }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="glow-input"
                        placeholder="your@email.com"
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: "6px",
                      }}>
                        Message
                      </label>
                      <textarea
                        className="glow-input"
                        placeholder="Tell me about your project or opportunity..."
                        value={formState.message}
                        onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                        required
                        rows={5}
                        style={{ resize: "vertical", minHeight: "120px" }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15))",
                        border: "1px solid rgba(0, 212, 255, 0.4)",
                        color: "var(--neon-blue)",
                        padding: "14px 28px",
                        borderRadius: "8px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "box-shadow 0.3s ease",
                        width: "100%",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glow-blue)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
