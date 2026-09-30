"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { User, Cpu, Target } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function CaptainsLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // 1. Heading reveals
    tl.fromTo(".log-heading", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // 2. Left identity metadata settles in
    tl.fromTo(".log-meta-item",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

    // 3. Right profile panel reveals (clip-path)
    tl.fromTo(panelRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "power3.inOut" },
      "-=0.5"
    );

    // 4. Text blocks appear sequentially
    tl.fromTo(".log-text",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.3"
    );

    // 5. Final "END OF LOG" marker
    tl.fromTo(".log-end",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

  }, { scope: sectionRef });

  return (
    <section id="log" ref={sectionRef} className="relative w-full py-32 border-t border-white/5 bg-transparent z-10">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16">
        
        {/* Left: Metadata Profile */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div className="log-heading opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-foreground mb-2">
              Captain's <span className="text-white">Log</span>
            </h2>
            <div className="font-mono text-[10px] text-muted tracking-[0.3em] uppercase mt-2">ABOUT ME // PERSONAL PROFILE ?</div>
          </div>
          
          <div className="flex flex-col gap-8 font-mono text-xs tracking-widest text-muted border-l border-white/10 pl-8 py-2 mt-8">
            <div className="flex flex-col gap-2 log-meta-item opacity-0">
              <span className="text-foreground/30 text-[10px]">DESIGNATION</span>
              <span className="text-foreground flex items-center gap-3"><User size={14} className="text-cyber-cyan"/> KARTIK PHULWARI</span>
            </div>
            <div className="flex flex-col gap-2 log-meta-item opacity-0">
              <span className="text-foreground/30 text-[10px]">CLASS</span>
              <span className="text-foreground flex items-center gap-3"><Cpu size={14} className="text-cyber-green"/> B.TECH CSE</span>
            </div>
            <div className="flex flex-col gap-2 log-meta-item opacity-0">
              <span className="text-foreground/30 text-[10px]">FOCUS</span>
              <span className="text-foreground flex items-center gap-3"><Target size={14} className="text-cyber-gold"/> CYBERSEC / FULLSTACK / UI-UX</span>
            </div>
            <div className="flex flex-col gap-2 log-meta-item opacity-0">
              <span className="text-foreground/30 text-[10px]">CURRENTLY EXPLORING</span>
              <span className="text-foreground leading-relaxed">NETWORKING / SECURITY / MODERN WEB DEVELOPMENT</span>
            </div>
          </div>
        </div>

        {/* Right: Editorial Content */}
        <div className="w-full lg:w-2/3">
          <div ref={panelRef} className="panel-cyber p-8 lg:p-12 bg-[#02050A] border border-white/10 relative overflow-hidden opacity-0">
            
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

            <p className="log-text opacity-0 text-lg lg:text-xl text-foreground font-sans leading-relaxed mb-8 relative z-10">
              I am a B.Tech CSE student passionate about understanding how complex systems work from the inside out. My technical journey spans both building modern, beautiful user interfaces and uncovering the deep, low-level mechanics of cybersecurity.
            </p>
            <p className="log-text opacity-0 text-lg lg:text-xl text-muted font-sans leading-relaxed relative z-10">
              I believe the best engineers exist at the intersection of disciplines. By combining fullstack development with offensive security principles and UI/UX design, I aim to create platforms that are not only highly functional and intuitive but structurally impenetrable. Whether it's hunting for vulnerabilities in networks or architecting scalable web applications, I am driven by a constant desire to learn, experiment, and build.
            </p>
            
            <div className="log-end opacity-0 mt-16 flex items-center gap-4 border-t border-white/5 pt-8 relative z-10">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                End of Log
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


