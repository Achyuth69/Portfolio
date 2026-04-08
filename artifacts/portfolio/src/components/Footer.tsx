export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "0.875rem",
          background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: 600,
        }}>
          Achyuth Parisha
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          AI Developer & Future Innovator
        </p>
        <p style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.5)", fontFamily: "'JetBrains Mono', monospace" }}>
          Built with React · Three.js · Framer Motion · 2024
        </p>
      </div>
    </footer>
  );
}
