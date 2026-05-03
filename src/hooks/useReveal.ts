"use client";

import { useCallback, useEffect, useState } from "react";

export function useReveal(delay = 0) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useCallback((node: HTMLDivElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 300ms cubic-bezier(0.645,0.045,0.355,1) ${delay}ms, transform 300ms cubic-bezier(0.645,0.045,0.355,1) ${delay}ms`,
  };

  return { revealRef: ref, revealStyle: style };
}
