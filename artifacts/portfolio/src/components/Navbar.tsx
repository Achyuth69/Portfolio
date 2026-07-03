import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger slide-down animation on mount
    const t = requestAnimationFrame(() => setMounted(true));
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`navbar${scrolled ? " scrolled" : ""}`}
      style={{
        transform: mounted ? "translateY(0)" : "translateY(-100%)",
        opacity: mounted ? 1 : 0,
        transition: "transform 0.5s ease, opacity 0.5s ease",
      }}
    >
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.75rem", fontWeight: 700, color: "white",
          fontFamily: "'Orbitron', sans-serif",
          boxShadow: "0 0 15px rgba(0,212,255,0.4)", flexShrink: 0,
        }}>AP</div>
        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "1rem",
          background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>Achyuth</span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden-mobile">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
            className="nav-link"
          >
            {link.label}
          </a>
        ))}
        <a href="/Achyuth_Parisha_Resume.pdf" download="Achyuth_Parisha_Resume.pdf"
          className="neon-btn" style={{ padding: "8px 18px", fontSize: "0.8rem" }}>
          Download CV
        </a>
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" aria-label="Toggle menu">
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: "block", width: "24px", height: "2px",
            background: "var(--neon-blue)", borderRadius: "2px",
          }} />
        ))}
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="/Achyuth_Parisha_Resume.pdf" download="Achyuth_Parisha_Resume.pdf"
            className="neon-btn" style={{ alignSelf: "flex-start" }}>
            Download CV
          </a>
        </div>
      )}

      <style>{`
        .nav-link {
          text-decoration: none; color: var(--text-muted);
          font-size: 0.875rem; font-weight: 500;
          font-family: 'JetBrains Mono', monospace;
          transition: color 0.2s; cursor: none;
        }
        .nav-link:hover { color: var(--neon-blue); }
        .mobile-menu {
          position: absolute; top: 100%; left: 0; right: 0;
          background: rgba(2,0,8,0.97);
          border-bottom: 1px solid rgba(124,58,237,0.2);
          padding: 1rem 2rem; display: flex; flex-direction: column; gap: 1rem;
          animation: slideDown 0.2s ease;
        }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
