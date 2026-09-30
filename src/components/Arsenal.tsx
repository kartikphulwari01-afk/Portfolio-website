"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, Terminal, Shield, Database, Wrench, Layout, Server, Brain, Code2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CATEGORIES = [
  { id: "lang", label: "LANGUAGES", icon: Terminal, primary: ["Java", "Python", "C++", "JavaScript", "TypeScript"], secondary: ["C", "SQL"] },
  { id: "front", label: "FRONTEND", icon: Layout, primary: ["React.js", "Next.js", "Tailwind CSS"], secondary: ["HTML5", "CSS3", "Framer Motion", "Responsive UI/UX"] },
  { id: "back", label: "BACKEND & APIs", icon: Server, primary: ["Node.js", "Express.js", "REST APIs"], secondary: ["Firebase", "Authentication"] },
  { id: "db", label: "DATABASES", icon: Database, primary: ["MongoDB", "PostgreSQL"], secondary: ["Prisma"] },
  { id: "sec", label: "CYBERSECURITY", icon: Shield, primary: ["Network Security", "Threat Detection"], secondary: ["Security Analysis", "Authentication", "Cybersecurity Projects"] },
  { id: "ai", label: "AI / ML", icon: Brain, primary: ["Scikit-learn", "Machine Learning"], secondary: ["Pandas", "NumPy", "Data Analysis", "Model Evaluation"] },
  { id: "tools", label: "TOOLS", icon: Wrench, primary: ["Git", "GitHub", "VS Code"], secondary: ["Vercel", "Figma", "Canva"] },
  { id: "other", label: "OTHER", icon: Code2, primary: ["WebRTC", "Razorpay"], secondary: [] },
];

export function Arsenal() {
  const [activeCat, setActiveCat] = useState("lang");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll entry animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".arsenal-title",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(".cat-btn", 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    );
  }, { scope: sectionRef });

  useGSAP(() => {
    // Entry animation whenever activeCat changes
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      const primaryCards = gsap.utils.toArray('.primary-card');
      const secondaryCards = gsap.utils.toArray('.secondary-card');

      gsap.fromTo(primaryCards,
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "back.out(1.2)" }
      );

      if (secondaryCards.length) {
        gsap.fromTo(secondaryCards,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.03, duration: 0.3, ease: "power2.out", delay: 0.2 }
        );
      }
    }, contentRef);
    return () => ctx.revert();
  }, { dependencies: [activeCat], scope: contentRef });

  const handleCategorySwitch = (newCatId: string) => {
    if (newCatId === activeCat || isTransitioning || !contentRef.current) return;
    
    setIsTransitioning(true);
    
    // Animate out current
    const primaryCards = contentRef.current.querySelectorAll('.primary-card');
    const secondaryCards = contentRef.current.querySelectorAll('.secondary-card');
    
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveCat(newCatId);
        setIsTransitioning(false);
      }
    });

    if (secondaryCards.length) {
      tl.to(secondaryCards, { opacity: 0, y: -5, duration: 0.2, stagger: 0.01, ease: "power2.in" });
    }
    if (primaryCards.length) {
      tl.to(primaryCards, { opacity: 0, scale: 0.98, y: -5, duration: 0.2, stagger: 0.02, ease: "power2.in" }, secondaryCards.length ? "-=0.1" : 0);
    }
    
    // Fallback if no cards exist to prevent getting stuck
    if (!primaryCards.length && !secondaryCards.length) {
      setActiveCat(newCatId);
      setIsTransitioning(false);
    }
  };

  return (
    <section id="arsenal" ref={sectionRef} className="relative w-full py-32 border-t border-white/5 bg-[#02050A] z-10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="arsenal-title opacity-0">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">
              <span className="text-cyber-purple text-glow-purple">Arsenal</span>
            </h2>
            <div className="font-mono text-[10px] text-cyber-purple tracking-[0.3em] mt-2">SKILLS // TECHNOLOGY STACK ?</div>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySwitch(cat.id)}
                disabled={isTransitioning}
                className={`cat-btn opacity-0 px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all border flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeCat === cat.id 
                    ? "bg-cyber-purple/10 text-cyber-purple border-cyber-purple/50 box-glow-purple" 
                    : "bg-[#050812] text-muted border-white/10 hover:border-white/30 hover:text-foreground"
                }`}
              >
                <cat.icon size={12} className={activeCat === cat.id ? "text-cyber-purple" : ""} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-cyber p-4 sm:p-6 md:p-12 min-h-[400px] flex items-start bg-[#050812] relative overflow-hidden">
          {/* Subtle tech background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-cyber-purple/5 to-transparent pointer-events-none" />
          
          <div className="w-full relative z-10" ref={contentRef}>
            {CATEGORIES.map((cat) => (
              activeCat === cat.id && (
                <div key={cat.id} className="w-full flex flex-col gap-8 md:gap-12">
                  
                  {/* Primary Skills */}
                  <div>
                    <h4 className="font-mono text-xs text-muted tracking-widest mb-4 md:mb-6 border-b border-white/10 pb-2">PRIMARY PROFICIENCY</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                      {cat.primary.map((skill) => (
                        <div 
                          key={skill}
                          className="primary-card bg-[#02050A] border border-cyber-purple/30 p-4 md:p-6 flex flex-col items-start transition-all hover:border-cyber-purple hover:bg-cyber-purple/5 group hover:-translate-y-1"
                        >
                          <span className="font-sans text-sm md:text-xl font-bold tracking-tight text-foreground group-hover:text-cyber-purple transition-colors break-words">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Skills */}
                  {cat.secondary.length > 0 && (
                    <div>
                      <h4 className="font-mono text-xs text-muted tracking-widest mb-6 border-b border-white/10 pb-2">SECONDARY & TOOLS</h4>
                      <div className="flex flex-wrap gap-4">
                        {cat.secondary.map((skill) => (
                          <div 
                            key={skill}
                            className="secondary-card bg-[#02050A] border border-white/10 px-6 py-3 flex items-center justify-center transition-all hover:border-white/30 hover:bg-white/5"
                          >
                            <span className="font-sans text-sm font-medium tracking-tight text-muted">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


