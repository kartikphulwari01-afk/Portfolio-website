"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Code2, FolderGit2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PROJECTS = [
  { 
    id: "01",
    title: "PROJECT BLACKOUT", 
    category: "CYBERSECURITY // NETWORK",
    desc: "Controlled cybersecurity simulation project combining a realistic e-commerce application with an isolated attack-simulation environment for security analysis.",
    stack: ["Python", "C++", "Wireshark API"],
    repo: "https://github.com/kartikphulwari01-afk/Project-Blackout",
    live: null,
    image: "/blackout-preview.png"
  },
  { 
    id: "02",
    title: "HAVEN", 
    category: "SOCIAL // MESSAGING", 
    desc: "A modern real-time social messaging platform built for seamless conversations, personal connections, and a clean, engaging communication experience.", 
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    repo: "https://github.com/kartikphulwari01-afk/HAVEN",
    live: null,
    status: "STAY TUNED"
  },
  { 
    id: "03",
    title: "CAFE BUDDY", 
    category: "WEB // COMMERCE", 
    desc: "Smart ordering, inventory management, and POS system designed for local cafes.", 
    stack: ["React", "Node.js", "MongoDB"],
    repo: "https://github.com/kartikphulwari01-afk/cafeteria-app",
    live: null,
    status: "STAY TUNED",
    image: "/cafebuddy-card.png"
  },
  { 
    id: "04",
    title: "JEEVANJYOTI", 
    category: "WEB // HEALTHCARE", 
    desc: "Digital healthcare platform improving rural medical access and electronic record management.", 
    stack: ["React", "Express", "MongoDB"],
    repo: "https://github.com/aryanchaturvedi2006-cpu/telemedicine-rural-healthcare",
    live: null,
    status: "STAY TUNED",
    image: "/jeevanjyoti-preview.png"
  },
  { 
    id: "05",
    title: "VIRTUALBRO", 
    category: "FULLSTACK // UTILITY", 
    desc: "AI-powered virtual assistant and desktop utility platform.", 
    stack: ["Next.js", "Python", "Tailwind"],
    repo: "https://github.com",
    live: null,
    status: "STAY TUNED",
    image: "/virtualbro-preview.png"
  }
];

export function Missions() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const rafPendingRef = useRef<boolean>(false);

  const updateVideo = (progress: number) => {
    if (!videoRef.current || isNaN(videoRef.current.duration) || videoRef.current.duration <= 0) return;
    targetTimeRef.current = progress * Math.max(0, videoRef.current.duration - 0.05);
    if (!rafPendingRef.current) {
      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.currentTime = targetTimeRef.current;
        rafPendingRef.current = false;
      });
    }
  };

  useGSAP(() => {
    if (bgRef.current) {
      // 1. Fade in over the last 100vh of Voyage
      gsap.to(bgRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", 
          scrub: true,
        }
      });

      // 2. Slide out natively when the section ends
      gsap.to(bgRef.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "+=100%",
          scrub: true,
        }
      });
    }

    if (sectionRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => updateVideo(self.progress)
        }
      });
    }

    // Animate central line drawing down
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
    }

    // Animate project cards progressively
    const cards = gsap.utils.toArray('.project-card');
    cards.forEach((card: any, i) => {
      gsap.fromTo(card, 
        { y: 100, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1,
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section id="missions" ref={sectionRef} className="relative w-full border-t border-white/5 -mt-[100vh] z-20">
      
      {/* FIXED Cinematic Background for Scene 3 (Fades in over Voyage) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div ref={bgRef} className="fixed top-0 left-0 w-full h-screen overflow-hidden opacity-0 z-0">
          <video 
            ref={videoRef} 
            src="/scene3-scroll-scrub-web.mp4" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
            muted playsInline preload="auto" 
          />
          {/* Extremely subtle overlay to retain cinematic colors but keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02050A]/10 to-[#02050A]/60 pointer-events-none" />
        </div>
      </div>

      <div className="relative w-full pb-32 pt-[100vh] z-10 pointer-events-auto">
        {/* Added extra padding-top inside the wrapper to push the actual content down below the 100vh overlap */}
        <div className="pt-32 lg:pt-48 relative">
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-[#00E5FF]/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-24 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">
            Classified <span className="text-cyber-cyan text-glow-cyan">Missions</span>
          </h2>
          <div className="font-mono text-[10px] text-cyber-cyan tracking-[0.3em] mt-2">PROJECTS // SELECTED WORK</div>
        </div>

        <div className="relative">
          {/* Central Route Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block">
            <div 
              ref={lineRef} 
              className="absolute top-0 left-0 w-full h-full bg-cyber-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)] origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          <div className="flex flex-col gap-24 md:gap-32">
            {PROJECTS.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={project.id} className={`project-card relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center w-full`}>
                  
                  {/* Node Connector (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-cyber-cyan bg-[#02050A] items-center justify-center z-10">
                    <div className="w-1 h-1 rounded-full bg-cyber-cyan animate-pulse" />
                  </div>

                  {/* Media Placeholder */}
                  <div className={`w-full md:w-1/2 panel-cyber p-2 group overflow-hidden ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="w-full aspect-video bg-[#050812] border border-white/5 relative flex items-center justify-center overflow-hidden">
                      {/* Grid background */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      
                      {/* @ts-ignore */}
                      {project.image ? (
                        <img 
                          /* @ts-ignore */
                          src={project.image} 
                          alt={`${project.title} Preview`}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 z-10" 
                        />
                      ) : (
                        <div className="flex flex-col items-center opacity-50 group-hover:opacity-100 transition-opacity z-10 relative">
                          <FolderGit2 className="text-cyber-cyan mb-2" size={32} />
                          <span className="font-mono text-[10px] tracking-widest text-muted">PROJECT PREVIEW</span>
                          <span className="font-mono text-[8px] tracking-widest text-cyber-cyan mt-1">ID: {project.id}</span>
                        </div>
                      )}
                      
                      {/* Scanline */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-cyan/30 animate-scanline opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Dossier Content */}
                  <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start' : 'md:items-end md:text-right'}`}>
                    <span className="font-mono text-[10px] text-cyber-cyan tracking-widest border border-cyber-cyan/20 px-2 py-1 bg-cyber-cyan/5 mb-4 inline-block">
                      {project.category}
                    </span>
                    
                    <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 text-foreground hover:text-cyber-cyan transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted leading-relaxed mb-6 max-w-md">
                      {project.desc}
                    </p>
                    
                    <div className={`flex flex-wrap gap-2 mb-8 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                      {project.stack.map(tech => (
                        <span key={tech} className="text-[10px] font-mono text-muted bg-white/5 px-2 py-1 rounded-sm">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 items-center">
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-colors group">
                          <Code2 size={14} className="group-hover:text-cyber-cyan transition-colors" /> SOURCE
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-colors group">
                          <ExternalLink size={14} className="group-hover:text-cyber-cyan transition-colors" /> LIVE DEMO
                        </a>
                      )}
                      {/* @ts-ignore */}
                      {project.status && !project.live && (
                        <span className="flex items-center gap-2 text-xs font-mono text-muted/50 cursor-not-allowed">
                          <ExternalLink size={14} className="opacity-50" /> {project.status}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}






