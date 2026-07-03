import { useEffect, useRef, useState } from "react";

/**
 * Lightweight IntersectionObserver hook — replaces framer-motion's useInView.
 * Triggers once when the element enters the viewport.
 */
export function useInView(margin = "-80px") {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView };
}
