export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#020008",
      color: "#e2e8f0",
      fontFamily: "'Inter', sans-serif",
      flexDirection: "column",
      gap: "1rem",
    }}>
      <h1 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "4rem",
        background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>404</h1>
      <p style={{ color: "#94a3b8" }}>Page not found.</p>
      <a href="/" style={{ color: "#00d4ff", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.875rem" }}>
        ← Back to home
      </a>
    </div>
  );
}
