"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Terminal, 
  Layout, 
  Server, 
  Database, 
  Shield, 
  Brain, 
  Wrench, 
  Code2,
  Activity,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Skill {
  id: string;
  name: string;
  tag: string;
}

interface Category {
  id: string;
  label: string;
  icon: typeof Terminal;
  tagline: string;
  summary: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: "lang",
    label: "Languages",
    icon: Terminal,
    tagline: "CORE SYNTAX & PROGRAMMING FOUNDATIONS",
    summary: "Object-oriented programming, algorithmic problem solving, and modern web scripting.",
    skills: [
      { id: "LANG-01", name: "Java", tag: "Object-Oriented Programming" },
      { id: "LANG-02", name: "Python", tag: "Scripting & Data Analysis" },
      { id: "LANG-03", name: "C++", tag: "Data Structures & Algorithms" },
      { id: "LANG-04", name: "C", tag: "Low-Level Fundamentals" },
      { id: "LANG-05", name: "JavaScript", tag: "Interactive Web Logic" },
      { id: "LANG-06", name: "TypeScript", tag: "Typed Web Development" },
      { id: "LANG-07", name: "SQL", tag: "Database Queries & Joins" },
    ],
  },
  {
    id: "front",
    label: "Frontend",
    icon: Layout,
    tagline: "USER INTERFACES & RESPONSIVE DESIGN",
    summary: "Building responsive, accessible web interfaces with clean component structure and animations.",
    skills: [
      { id: "UI-01", name: "React.js", tag: "Component-Based UI" },
      { id: "UI-02", name: "Next.js", tag: "Fullstack React Framework" },
      { id: "UI-03", name: "Tailwind CSS", tag: "Utility-First Styling" },
      { id: "UI-04", name: "TypeScript", tag: "Typed Components & Props" },
      { id: "UI-05", name: "HTML5", tag: "Semantic Page Structure" },
      { id: "UI-06", name: "CSS3", tag: "Layouts, Grid & Animations" },
      { id: "UI-07", name: "Framer Motion", tag: "UI Animations & Transitions" },
      { id: "UI-08", name: "Responsive UI/UX", tag: "Mobile & Desktop Layouts" },
    ],
  },
  {
    id: "back",
    label: "Backend & APIs",
    icon: Server,
    tagline: "SERVER RUNTIMES & API SERVICES",
    summary: "Building REST endpoints, backend application logic, and real-time communication channels.",
    skills: [
      { id: "SRV-01", name: "Node.js", tag: "Server-Side JavaScript" },
      { id: "SRV-02", name: "Express.js", tag: "REST API Routing & Middleware" },
      { id: "SRV-03", name: "REST APIs", tag: "CRUD Endpoints & Integration" },
      { id: "SRV-04", name: "Authentication", tag: "JWT & Session Management" },
      { id: "SRV-05", name: "Firebase", tag: "Cloud Auth & Firestore" },
      { id: "SRV-06", name: "WebRTC", tag: "Peer-to-Peer Communication" },
    ],
  },
  {
    id: "db",
    label: "Databases",
    icon: Database,
    tagline: "DATA STORAGE & PERSISTENCE",
    summary: "Designing relational tables, document schemas, and integrating modern ORM toolkits.",
    skills: [
      { id: "DATA-01", name: "PostgreSQL", tag: "Relational Database" },
      { id: "DATA-02", name: "MongoDB", tag: "NoSQL Document Database" },
      { id: "DATA-03", name: "SQLite", tag: "Embedded File Database" },
      { id: "DATA-04", name: "Prisma ORM", tag: "Type-Safe Database Client" },
      { id: "DATA-05", name: "Supabase", tag: "Postgres Backend Platform" },
    ],
  },
  {
    id: "sec",
    label: "Cybersecurity",
    icon: Shield,
    tagline: "NETWORK ANALYSIS & SECURITY CONCEPTS",
    summary: "Network traffic inspection, threat concepts, and web application security fundamentals.",
    skills: [
      { id: "SEC-01", name: "Network Security", tag: "Network Traffic & Protocols" },
      { id: "SEC-02", name: "Wireshark", tag: "Packet Capture & Inspection" },
      { id: "SEC-03", name: "Threat Detection", tag: "Common Attack Vectors" },
      { id: "SEC-04", name: "Security Analysis", tag: "Vulnerability Assessment" },
      { id: "SEC-05", name: "OWASP Top 10", tag: "Web Security Principles" },
      { id: "SEC-06", name: "Penetration Testing", tag: "Assessment Concepts" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: Brain,
    tagline: "DATA PROCESSING & APPLIED MACHINE LEARNING",
    summary: "Data cleaning, exploratory analysis, model training, and performance evaluation.",
    skills: [
      { id: "AI-01", name: "Python", tag: "Data & ML Scripting" },
      { id: "AI-02", name: "Scikit-learn", tag: "Machine Learning Algorithms" },
      { id: "AI-03", name: "Pandas", tag: "Data Cleaning & Analysis" },
      { id: "AI-04", name: "NumPy", tag: "Numerical & Array Operations" },
      { id: "AI-05", name: "Machine Learning", tag: "Supervised Learning Basics" },
      { id: "AI-06", name: "Data Analysis", tag: "Exploratory Data Analysis" },
      { id: "AI-07", name: "Model Evaluation", tag: "Metrics & Testing" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    tagline: "DEVELOPMENT TOOLS & WORKSPACE",
    summary: "Daily tools for version control, code editing, cloud deployment, and interface design.",
    skills: [
      { id: "TOOL-01", name: "Git", tag: "Version Control & Branching" },
      { id: "TOOL-02", name: "GitHub", tag: "Repositories & Collaboration" },
      { id: "TOOL-03", name: "VS Code", tag: "Code Editor & Extensions" },
      { id: "TOOL-04", name: "Vercel", tag: "Web App Deployment" },
      { id: "TOOL-05", name: "Figma", tag: "UI Design & Wireframing" },
      { id: "TOOL-06", name: "Canva", tag: "Graphics & Visual Assets" },
    ],
  },
  {
    id: "other",
    label: "Other",
    icon: Code2,
    tagline: "CORE CONCEPTS & INTEGRATIONS",
    summary: "Foundational computer science topics, problem solving, and third-party service integrations.",
    skills: [
      { id: "CORE-01", name: "DSA", tag: "Data Structures & Algorithms" },
      { id: "CORE-02", name: "Problem Solving", tag: "Algorithmic Thinking" },
      { id: "CORE-03", name: "API Integration", tag: "Third-Party Services" },
      { id: "CORE-04", name: "Razorpay", tag: "Payment Gateway Integration" },
    ],
  },
];

const PARTICLES = [
  { top: "14%", left: "12%", size: 3.5, color: "rgba(139, 92, 246, 0.55)", duration: "22s", delay: "0s" },
  { top: "28%", left: "88%", size: 3, color: "rgba(0, 229, 255, 0.45)", duration: "26s", delay: "3s" },
  { top: "42%", left: "6%", size: 4, color: "rgba(139, 92, 246, 0.4)", duration: "20s", delay: "7s" },
  { top: "65%", left: "82%", size: 3, color: "rgba(0, 229, 255, 0.5)", duration: "24s", delay: "1.5s" },
  { top: "78%", left: "22%", size: 3.5, color: "rgba(139, 92, 246, 0.45)", duration: "28s", delay: "5s" },
  { top: "18%", left: "64%", size: 3, color: "rgba(0, 229, 255, 0.4)", duration: "21s", delay: "8s" },
  { top: "86%", left: "70%", size: 4, color: "rgba(139, 92, 246, 0.35)", duration: "25s", delay: "4s" },
  { top: "52%", left: "94%", size: 3, color: "rgba(0, 229, 255, 0.45)", duration: "23s", delay: "6s" },
];

export function Arsenal() {
  const [activeCatId, setActiveCatId] = useState("lang");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const activeCategory = CATEGORIES.find((c) => c.id === activeCatId) || CATEGORIES[0];

  // GSAP: Section Entrance on Scroll
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([".arsenal-reveal", ".arsenal-card"], { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
      },
    });

    // 1. Heading & telemetry reveal
    tl.fromTo(
      ".arsenal-header-reveal",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );

    // 2. Category tab bar reveal
    tl.fromTo(
      ".arsenal-tab-btn",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.45, ease: "power2.out" },
      "-=0.3"
    );

    // 3. Cyberdeck console panel reveal
    tl.fromTo(
      consoleRef.current,
      { opacity: 0, y: 20, scale: 0.99 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" },
      "-=0.2"
    );

    // 4. Initial skill cards stagger reveal
    tl.fromTo(
      ".arsenal-card",
      { opacity: 0, y: 16, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.035, duration: 0.45, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: sectionRef });

  // Handle category change with smooth, non-overlapping GSAP transition
  const handleCategorySwitch = useCallback((newCatId: string) => {
    if (newCatId === activeCatId || isTransitioning) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setActiveCatId(newCatId);
      setIsTransitioning(false);
      return;
    }

    setIsTransitioning(true);

    const cards = cardsContainerRef.current?.querySelectorAll(".arsenal-card");

    if (!cards || cards.length === 0) {
      setActiveCatId(newCatId);
      setIsTransitioning(false);
      return;
    }

    // Animate current cards out
    gsap.to(cards, {
      opacity: 0,
      y: -8,
      scale: 0.98,
      duration: 0.16,
      stagger: 0.015,
      ease: "power2.in",
      onComplete: () => {
        // Swap category in state
        setActiveCatId(newCatId);
      },
    });
  }, [activeCatId, isTransitioning]);

  // Animate in new cards whenever activeCatId changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const cards = cardsContainerRef.current?.querySelectorAll(".arsenal-card");
    if (!cards || cards.length === 0) {
      const timer = setTimeout(() => setIsTransitioning(false), 0);
      return () => clearTimeout(timer);
    }

    // Quick polished entrance for newly mounted cards
    gsap.fromTo(
      cards,
      { opacity: 0, y: 12, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.32,
        stagger: 0.03,
        ease: "power2.out",
        onComplete: () => {
          setIsTransitioning(false);
        },
      }
    );

    // Fallback safety timer to ensure transition lock is always released
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [activeCatId]);

  return (
    <section 
      id="arsenal" 
      ref={sectionRef} 
      className="relative w-full py-28 md:py-32 border-t border-white/5 bg-[#02050A] z-10 overflow-hidden"
    >
      <style>{`
        @keyframes ambientDriftPurple {
          0% { transform: translate(0px, 0px) scale(1); opacity: 0.65; }
          50% { transform: translate(-35px, 25px) scale(1.08); opacity: 0.9; }
          100% { transform: translate(25px, -20px) scale(0.96); opacity: 0.7; }
        }
        @keyframes ambientDriftCyan {
          0% { transform: translate(0px, 0px) scale(1); opacity: 0.55; }
          50% { transform: translate(35px, -25px) scale(0.92); opacity: 0.8; }
          100% { transform: translate(-20px, 20px) scale(1.05); opacity: 0.6; }
        }
        @keyframes ambientPulseCenter {
          0% { opacity: 0.4; transform: scale(0.96); }
          50% { opacity: 0.75; transform: scale(1.04); }
          100% { opacity: 0.4; transform: scale(0.96); }
        }
        @keyframes ambientPulseGrid {
          0% { opacity: 0.35; }
          50% { opacity: 0.65; }
          100% { opacity: 0.35; }
        }
        @keyframes dataParticleDrift {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          15% { opacity: 0.45; }
          85% { opacity: 0.35; }
          100% { transform: translateY(-45px) translateX(12px); opacity: 0; }
        }
        .ambient-orb-purple {
          animation: ambientDriftPurple 22s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }
        .ambient-orb-cyan {
          animation: ambientDriftCyan 26s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }
        .ambient-orb-center {
          animation: ambientPulseCenter 20s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }
        .ambient-grid {
          animation: ambientPulseGrid 16s ease-in-out infinite alternate;
          will-change: opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-orb-purple,
          .ambient-orb-cyan,
          .ambient-orb-center,
          .ambient-grid,
          .ambient-particle {
            animation: none !important;
            opacity: 0.5 !important;
          }
        }
      `}</style>

      {/* CONTINUOUS AMBIENT BACKGROUND SYSTEM (Behind Console & Content) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Subtle Depth Grid with slow ambient breathing */}
        <div className="ambient-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Soft Purple Light Orb */}
        <div className="ambient-orb-purple absolute top-1/4 -right-20 w-[520px] h-[520px] rounded-full blur-[140px] bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,rgba(139,92,246,0.03)_55%,transparent_70%)]" />

        {/* Faint Cyan Light Orb */}
        <div className="ambient-orb-cyan absolute bottom-12 -left-20 w-[460px] h-[460px] rounded-full blur-[130px] bg-[radial-gradient(circle,rgba(0,229,255,0.09)_0%,rgba(0,229,255,0.02)_55%,transparent_70%)]" />

        {/* Subtle Central Purple Glow */}
        <div className="ambient-orb-center absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full blur-[150px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_65%)]" />

        {/* Sparse Ambient Data Particles */}
        {PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className="ambient-particle absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animation: `dataParticleDrift ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header & Tactical Telemetry */}
        <div className="mb-12 md:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="arsenal-header-reveal">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">
              <span className="text-cyber-purple drop-shadow-[0_0_20px_rgba(139,92,246,0.45)]">Arsenal</span>
            </h2>
            <div className="font-mono text-[10px] md:text-xs text-cyber-purple tracking-[0.25em] mt-3 flex items-center gap-2">
              <span>SKILLS // TECHNOLOGY STACK</span>
              <span className="text-white/20">•</span>
              <span className="text-cyber-cyan/90">CYBERDECK CONSOLE</span>
            </div>
          </div>

          {/* Telemetry Badge (Desktop/Tablet) */}
          <div className="arsenal-header-reveal hidden sm:flex items-center gap-4 bg-[#050812]/90 border border-white/10 px-4 py-2.5 rounded-lg font-mono text-[11px] backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyber-cyan">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]" />
              </span>
              <span className="tracking-widest">SYS.STATUS: OPERATIONAL</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="text-muted tracking-wider">
              ACTIVE MODULE: <span className="text-white font-semibold">{activeCategory.label.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Interactive Category Navigation Tabs */}
        <div className="mb-8">
          <div 
            role="tablist" 
            aria-label="Technology Stack Categories"
            className="flex flex-nowrap sm:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0"
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCatId === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`tab-${cat.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => handleCategorySwitch(cat.id)}
                  disabled={isTransitioning}
                  className={`arsenal-tab-btn whitespace-nowrap px-4 py-2.5 rounded-md font-mono text-[11px] tracking-wider uppercase transition-all duration-200 flex items-center gap-2.5 border select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-purple disabled:cursor-not-allowed ${
                    isActive
                      ? "bg-cyber-purple/15 text-white border-cyber-purple/80 shadow-[0_0_18px_rgba(139,92,246,0.28)]"
                      : "bg-[#050812]/80 text-[#8892B0] border-white/10 hover:border-white/25 hover:text-[#EAF0F7] hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon 
                    size={13} 
                    className={`transition-colors ${isActive ? "text-cyber-purple" : "text-muted"}`} 
                  />
                  <span>{cat.label}</span>
                  
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple shadow-[0_0_8px_#8B5CF6]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CYBERDECK CONSOLE MAIN CHASSIS */}
        <div 
          ref={consoleRef} 
          className="relative rounded-xl border border-white/10 bg-[#030611]/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        >
          {/* Tactical Corner Brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-purple/60 pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-purple/60 pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-purple/60 pointer-events-none z-20" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-purple/60 pointer-events-none z-20" />

          {/* Cyberdeck Technical Background Grid & Radial Shading */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08)_0%,transparent_60%)] pointer-events-none" />

          {/* Console Header Bar */}
          <div className="relative z-10 border-b border-white/10 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 bg-[#050812]/90">
            {/* Terminal Protocol / Breadcrumb */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A2A]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-gold/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan/80" />
              </div>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                DECK://ARSENAL/MODULES/<span className="text-[#00E5FF]">{activeCategory.id.toUpperCase()}</span>
              </span>
            </div>

            {/* Subsystem Telemetry Counter */}
            <div className="flex items-center gap-3 font-mono text-[10px] text-muted tracking-wider">
              <span className="text-white/40 hidden md:inline">PROTOCOL: SECURE_V2</span>
              <span className="hidden md:inline text-white/20">|</span>
              <span className="text-cyber-purple flex items-center gap-1.5">
                <Cpu size={12} />
                <span>{activeCategory.skills.length} UNITS MOUNTED</span>
              </span>
            </div>
          </div>

          {/* Interactive Modules Viewport */}
          <div 
            id={`panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.id}`}
            className="p-5 sm:p-7 md:p-9 relative z-10 min-h-[380px] flex flex-col justify-between"
          >
            {/* Category Subheading & Tagline */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[#F5F7FA]">
                  {activeCategory.label}
                </h3>
                <p className="font-mono text-[10px] md:text-[11px] text-cyber-purple tracking-widest mt-1">
                  {activeCategory.tagline}
                </p>
              </div>
              <span className="font-mono text-[10px] text-muted/70 tracking-widest uppercase">
                {activeCategory.summary}
              </span>
            </div>

            {/* SKILL CARDS GRID */}
            <div 
              ref={cardsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-4.5 my-auto"
            >
              {activeCategory.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="arsenal-card group relative p-4 md:p-5 rounded-lg border border-white/10 bg-[#050812]/90 hover:bg-[#070c22] hover:border-cyber-purple/60 hover:shadow-[0_4px_24px_rgba(139,92,246,0.18)] hover:-translate-y-1 transition-all duration-300 focus-within:border-cyber-purple cursor-default"
                >
                  {/* Subtle Card Accent Corner */}
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-cyber-purple/60 transition-colors pointer-events-none" />

                  {/* Top Technical Metadata */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] text-muted tracking-widest group-hover:text-cyber-purple transition-colors">
                      {skill.id}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple/40 group-hover:bg-cyber-purple group-hover:shadow-[0_0_8px_#8B5CF6] transition-all" />
                  </div>

                  {/* Skill Name */}
                  <h4 className="text-base md:text-lg font-bold tracking-tight text-[#F5F7FA] group-hover:text-white transition-colors">
                    {skill.name}
                  </h4>

                  {/* Factual Domain / Role Tag */}
                  <p className="font-mono text-[10px] text-muted tracking-wider uppercase mt-1 group-hover:text-cyber-cyan/90 transition-colors">
                    {skill.tag}
                  </p>

                  {/* Technical Status Bottom Bar */}
                  <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-white/20 group-hover:text-muted/60 group-hover:border-cyber-purple/20 transition-colors">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-cyber-cyan/60 group-hover:text-cyber-cyan transition-colors">SYS::OK</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Console Bottom Telemetry Footer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] text-muted">
              <div className="flex items-center gap-2 text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                <span>COMMAND_CONSOLE // KARTIK PHULWARI CYBERDECK</span>
              </div>
              <div className="text-white/40 tracking-wider">
                TECH STACK // <span className="text-cyber-purple font-semibold">HANDS-ON PROJECT WORK</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
