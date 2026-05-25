import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
        className="flex items-center gap-2"
        style={{ textDecoration: "none" }}
      >
        <div style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "white",
          fontFamily: "'Orbitron', sans-serif",
          boxShadow: "0 0 15px rgba(0, 212, 255, 0.4)",
          flexShrink: 0
        }}>AP</div>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>Achyuth</span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden-mobile">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
            style={{
              textDecoration: "none",
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              fontWeight: 500,
              fontFamily: "'JetBrains Mono', monospace",
              transition: "color 0.2s",
              cursor: "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--neon-blue)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://drive.google.com/drive/folders/1_your_cv_placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="neon-btn"
          style={{ padding: "8px 18px", fontSize: "0.8rem", cursor: "pointer" }}
        >
          Download CV
        </a>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "none",
          flexDirection: "column",
          gap: "5px",
          padding: "4px",
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: "block",
            width: "24px",
            height: "2px",
            background: "var(--neon-blue)",
            borderRadius: "2px",
            transition: "all 0.3s",
          }} />
        ))}
      </button>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(2, 0, 8, 0.97)",
            borderBottom: "1px solid rgba(124, 58, 237, 0.2)",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              style={{
                textDecoration: "none",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="https://drive.google.com/drive/folders/1_your_cv_placeholder" target="_blank" rel="noopener noreferrer" className="neon-btn" style={{ alignSelf: "flex-start", cursor: "pointer" }}>
            Download CV
          </a>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
