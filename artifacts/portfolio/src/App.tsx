import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  return (
    <>
      <Cursor />

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(124, 58, 237, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at top, rgba(124, 58, 237, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(0, 212, 255, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Navbar />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
