"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { 
          opacity: 0, 
          duration: 0.4, 
          ease: "power2.inOut", 
          onComplete 
        });
      }
    });

    tl.fromTo(".boot-text-1", { opacity: 0 }, { opacity: 1, duration: 0.15 })
      .to(".boot-text-1", { opacity: 0, duration: 0.1 }, "+=0.2")
      .fromTo(".boot-text-2", { opacity: 0 }, { opacity: 1, duration: 0.15 })
      .to(".boot-text-2", { opacity: 0, duration: 0.1 }, "+=0.2")
      .fromTo(".boot-text-3", { opacity: 0 }, { opacity: 1, duration: 0.15 })
      .to(".boot-text-3", { opacity: 0, duration: 0.1 }, "+=0.2")
      .fromTo(".boot-name", 
        { opacity: 0, scale: 0.95, filter: "blur(4px)" }, 
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }
      )
      .to({}, { duration: 0.4 }); // hold briefly

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[5000] bg-[#050812] flex flex-col items-center justify-center font-mono"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwNTA4MTIiLz48cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSIjMDcwNzE1Ii8+PC9zdmc+')] opacity-50 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <p className="boot-text-1 absolute text-haki-green text-sm md:text-base tracking-widest opacity-0">
          NAVIGATION CORE INITIALIZING...
        </p>
        <p className="boot-text-2 absolute text-haki-green text-sm md:text-base tracking-widest opacity-0">
          NETWORK LINK ESTABLISHED
        </p>
        <p className="boot-text-3 absolute text-haki-green text-sm md:text-base tracking-widest opacity-0">
          IDENTITY FOUND
        </p>
        
        <h1 className="boot-name absolute font-sans text-4xl md:text-6xl font-bold tracking-tighter text-foreground uppercase opacity-0 whitespace-nowrap">
          Kartik Phulwari
        </h1>
      </div>
      
      {/* Subtle green atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.03)_0%,transparent_50%)] pointer-events-none" />
    </div>
  );
}
