"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    
    if (!cursor || !ring) return;

    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      ring.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0, ease: "none" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };

    const onMouseDown = () => gsap.to(ring, { scale: 0.5, duration: 0.1 });
    const onMouseUp = () => gsap.to(ring, { scale: 1, duration: 0.1 });

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('button, a')) {
        gsap.to(ring, { scale: 1.5, borderColor: "var(--color-haki-green)", backgroundColor: "rgba(57,255,20,0.1)", duration: 0.2 });
        gsap.to(cursor, { backgroundColor: "var(--color-haki-green)", duration: 0.2 });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('button, a')) {
        gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "transparent", duration: 0.2 });
        gsap.to(cursor, { backgroundColor: "var(--color-foreground)", duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        ref={ringRef} 
        className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full border border-white/20 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-colors"
      />
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed top-0 left-0 w-1 h-1 rounded-full bg-foreground pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-colors"
      />
    </>
  );
}
