import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    const animate = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.left = trailPos.current.x + "px";
        trailRef.current.style.top = trailPos.current.y + "px";
      }
      requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "20px";
        cursorRef.current.style.height = "20px";
        cursorRef.current.style.backgroundColor = "rgba(0, 212, 255, 0.5)";
      }
      if (trailRef.current) {
        trailRef.current.style.width = "60px";
        trailRef.current.style.height = "60px";
      }
    };

    const onMouseLeaveLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "12px";
        cursorRef.current.style.height = "12px";
        cursorRef.current.style.backgroundColor = "var(--neon-blue)";
      }
      if (trailRef.current) {
        trailRef.current.style.width = "36px";
        trailRef.current.style.height = "36px";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    const links = document.querySelectorAll("a, button, .neon-btn, .project-card");
    links.forEach(link => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    const raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach(link => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
}
