"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Environment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    
    // Slow drift for background particles
    gsap.to(particlesRef.current.children, {
      y: "-=100",
      x: "random(-50, 50)",
      rotation: "random(-15, 15)",
      duration: "random(20, 40)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-gradient-to-b from-[#02050A] via-[#050812] to-[#07111F]">
      
      {/* Deep atmospheric radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.03)_0%,transparent_50%),radial-gradient(circle_at_50%_100%,rgba(57,255,20,0.02)_0%,transparent_50%)]" />
      
      {/* Faint HUD / Nav markers at edges */}
      <div className="absolute top-8 left-8 font-mono text-[10px] text-white/10 tracking-[0.3em]">
        [ SYS.CORE // ONLINE ]
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-white/10 tracking-[0.3em]">
        LAT: 34.0522 // LNG: -118.2437
      </div>

      {/* Topographic / Map Contour SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
        <path d="M-100,200 C300,400 600,100 1200,300 C1800,500 2400,200 3000,400" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        <path d="M-100,300 C300,500 600,200 1200,400 C1800,600 2400,300 3000,500" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        <path d="M-100,400 C300,600 600,300 1200,500 C1800,700 2400,400 3000,600" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        <path d="M-100,500 C300,700 600,400 1200,600 C1800,800 2400,500 3000,700" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      </svg>

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              boxShadow: '0 0 10px rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>

    </div>
  );
}
