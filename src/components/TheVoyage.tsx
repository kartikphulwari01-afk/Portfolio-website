"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Anchor } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const MILESTONES = [
  { id: "01", title: "ORIGIN", subtitle: "PROGRAMMING FOUNDATIONS", desc: "Core computer science concepts, object-oriented design, and algorithmic problem solving using Python and C++.", active: true },
  { id: "02", title: "FULLSTACK", subtitle: "WEB DEVELOPMENT", desc: "Building scalable, responsive user interfaces and robust APIs with React, Next.js, Node.js, and TypeScript.", active: false },
  { id: "03", title: "DATA", subtitle: "DATABASES / BACKEND", desc: "Designing resilient data architectures, optimizing queries, and managing state across PostgreSQL and MongoDB.", active: false },
  { id: "04", title: "CYBERSECURITY", subtitle: "SECURITY / NETWORKING", desc: "Network traffic analysis, ethical hacking operations, penetration testing, and securing modern web infrastructure.", active: false },
  { id: "05", title: "CURRENT FOCUS", subtitle: "SECURITY // FULLSTACK", desc: "Fusing offensive security principles with modern frontend frameworks to build beautiful, impenetrable platforms.", active: false },
];

export function TheVoyage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!trackRef.current || !wrapperRef.current) return;
    
    const isDesktop = window.innerWidth >= 1024;
    
    // Shared Video Sync Timing
    const syncWait1 = window.innerHeight * 2; // 200vh
    const syncReveal = window.innerHeight * 0.6; // 60vh
    const syncBgFade = window.innerHeight * 0.4; // 40vh
    const totalVideoSync = syncWait1 + syncReveal + syncBgFade; // Exactly 300vh

    if (isDesktop) {
      // DESKTOP LOGIC (Horizontal Scroll)
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollAmount = trackWidth - windowWidth + (windowWidth * 0.2);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${totalVideoSync + scrollAmount}`, 
          pin: true,
          scrub: 1,
        }
      });

      tl.to({}, { duration: syncWait1 });
      tl.fromTo(".voyage-reveal",
        { opacity: 0, clipPath: "inset(0 50% 0 50%)", scale: 0.95 },
        { opacity: 1, clipPath: "inset(0 0% 0 0%)", scale: 1, duration: syncReveal, ease: "power2.inOut" }
      );
      tl.to(".voyage-bg", { opacity: 1, duration: syncBgFade }, ">");

      tl.add("scrollStart");
      tl.to(trackRef.current, { x: -scrollAmount, ease: "none", duration: scrollAmount }, "scrollStart");

      if (lineRef.current) {
        const len = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(lineRef.current, { strokeDashoffset: 0, ease: "none", duration: scrollAmount }, "scrollStart");
      }

      const nodeDuration = scrollAmount * 0.3;
      const settleDuration = scrollAmount * 0.2;
      
      nodesRef.current.forEach((node, idx) => {
        if (!node) return;
        const prog = (idx / (MILESTONES.length - 1)) * (scrollAmount * 0.8);
        tl.fromTo(node, 
          { opacity: 0.2, filter: "grayscale(100%)", scale: 0.95 },
          { opacity: 1, filter: "grayscale(0%)", scale: 1.05, duration: nodeDuration, ease: "power2.out" },
          `scrollStart+=${prog}`
        );
        if (idx < MILESTONES.length - 1) {
          tl.to(node,
            { opacity: 1, filter: "grayscale(0%)", scale: 1, duration: settleDuration, ease: "power2.inOut" },
            `scrollStart+=${prog + nodeDuration * 0.5}`
          );
        }
      });
    } else {
      // MOBILE LOGIC (Vertical Journey)
      
      // 1. Sync Timeline (Pins for totalVideoSync to match Hero)
      const syncTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${totalVideoSync}`,
          pin: true,
          scrub: 1,
        }
      });
      syncTl.to({}, { duration: syncWait1 });
      syncTl.fromTo(".voyage-reveal",
        { opacity: 0, clipPath: "inset(0 50% 0 50%)", scale: 0.95 },
        { opacity: 1, clipPath: "inset(0 0% 0 0%)", scale: 1, duration: syncReveal, ease: "power2.inOut" }
      );
      syncTl.to(".voyage-bg", { opacity: 1, duration: syncBgFade }, ">");

      // 2. Vertical Line Draw
      if (mobileLineRef.current) {
        gsap.fromTo(mobileLineRef.current, 
          { scaleY: 0 }, 
          { 
            scaleY: 1, 
            ease: "none", 
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1
            }
          }
        );
      }

      // 3. Node Reveals
      nodesRef.current.forEach((node, idx) => {
        if (!node) return;
        gsap.fromTo(node,
          { opacity: 0.3, scale: 0.95, filter: "grayscale(100%)" },
          {
            opacity: 1,
            scale: 1,
            filter: "grayscale(0%)",
            duration: 0.8,
            scrollTrigger: {
              trigger: node,
              start: "top 70%",
              end: "top 40%",
              scrub: 1
            }
          }
        );
      });
    }

  }, { scope: wrapperRef });

  const generatePath = () => {
    let d = "M 0,100 ";
    for (let i = 0; i < MILESTONES.length; i++) {
      const startX = i * 500;
      d += `C ${startX + 150},200 ${startX + 350},0 ${startX + 500},100 `;
    }
    return d;
  };

  return (
    <div id="voyage" ref={wrapperRef} className="relative w-full border-t border-white/5">
      <div className="voyage-bg absolute inset-0 bg-[#02050A] opacity-0 z-0 pointer-events-none" />
      <section className="voyage-reveal relative min-h-screen lg:h-screen w-full flex flex-col justify-start lg:justify-center overflow-hidden z-10 opacity-0 bg-transparent pt-32 lg:pt-0">
        
        <div className="relative lg:absolute top-0 lg:top-24 left-[5vw] lg:left-[10vw] z-20 mb-16 lg:mb-0">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">
            The <span className="text-cyber-gold text-glow-gold">Voyage</span>
          </h2>
          <div className="font-mono text-[10px] text-cyber-cyan tracking-[0.3em] mt-2">MY JOURNEY // TECHNICAL TIMELINE 🌊</div>
        </div>

        <div className="w-full overflow-hidden mt-8 lg:mt-[160px] relative z-10 flex-1">
          <div ref={trackRef} className="flex flex-col lg:flex-row items-center px-[5vw] lg:px-[10vw] w-full lg:w-max h-full lg:h-[500px] gap-16 lg:gap-0 relative">
            
            {/* MOBILE VERTICAL ROUTE LINE */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-cyber-gold/20 block lg:hidden z-0" />
            <div 
              ref={mobileLineRef} 
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-cyber-gold shadow-[0_0_10px_var(--color-cyber-gold)] block lg:hidden z-0 origin-top" 
              style={{ transform: "scaleY(0)" }} 
            />
            
            {/* DESKTOP HORIZONTAL ROUTE SVG */}
            <svg className="absolute top-1/2 left-0 w-full h-[200px] -translate-y-1/2 pointer-events-none z-0 hidden lg:block" overflow="visible">
              <path d={generatePath()} fill="none" stroke="rgba(255, 200, 87, 0.1)" strokeWidth="2" strokeDasharray="5 5" />
              <path ref={lineRef} d={generatePath()} fill="none" stroke="var(--color-cyber-gold)" strokeWidth="3" className="text-glow-gold drop-shadow-xl" />
            </svg>
            
            {MILESTONES.map((stone, idx) => (
              <div 
                key={stone.id} 
                ref={el => { nodesRef.current[idx] = el; }}
                className={`relative flex flex-col items-center w-full max-w-[400px] lg:w-[500px] shrink-0 z-10 lg:mb-32`}
              >
                {/* Node Point */}
                <div className={`w-8 h-8 rounded-full border-2 border-cyber-gold bg-[#02050A] flex items-center justify-center box-glow-gold z-20 mt-4 lg:mt-8 lg:order-2`}>
                  <div className={`w-2 h-2 rounded-full ${stone.active ? 'bg-cyber-gold animate-pulse' : 'bg-cyber-gold'}`} />
                </div>

                {/* Panel */}
                <div className={`panel-cyber panel-corners p-6 lg:p-8 w-full lg:w-[320px] bg-[#050812] transition-all hover:border-cyber-gold/30 hover:-translate-y-2 group mb-4 lg:mb-8 lg:order-1`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <span className="font-mono text-[10px] text-cyber-gold tracking-widest border border-cyber-gold/20 px-2 py-1 bg-cyber-gold/5">
                      NODE {stone.id}
                    </span>
                    <span className="font-mono text-[10px] text-muted tracking-widest">{stone.subtitle}</span>
                  </div>
                  
                  <h3 className="text-lg lg:text-xl font-bold uppercase mb-2 lg:mb-4 text-foreground">{stone.title}</h3>
                  <p className="text-xs text-muted leading-relaxed font-sans">{stone.desc}</p>
                </div>

              </div>
            ))}
            
            {/* End anchor */}
            <div className="w-full lg:w-[200px] flex justify-center py-16 lg:py-0 opacity-20">
              <Anchor size={48} className="text-cyber-gold" />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}





