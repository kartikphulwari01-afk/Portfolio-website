"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Compass, Crosshair } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// --- Data Structures ---
interface Point { x: number; y: number; }
interface CrackData { points: Point[]; branches: CrackData[]; }
interface Particle { x: number; y: number; z: number; size: number; speed: number; pulseSpeed: number; }
interface Contour { sx: number; sy: number; cp1x: number; cp1y: number; cp2x: number; cp2y: number; ex: number; ey: number; }

// --- Generators ---
function generateCrack(startX: number, startY: number, angle: number, length: number, branchDepth: number = 0): CrackData {
  const points: Point[] = [{ x: startX, y: startY }];
  let currX = startX, currY = startY, currAngle = angle;
  const branches: CrackData[] = [];
  
  const segments = Math.floor(length / 20);
  for (let i = 0; i < segments; i++) {
    currAngle += (Math.random() - 0.5) * 0.8; 
    currX += Math.cos(currAngle) * 20;
    currY += Math.sin(currAngle) * 20;
    points.push({ x: currX, y: currY });
    
    if (branchDepth < 1 && Math.random() < 0.12) {
      branches.push(generateCrack(currX, currY, currAngle + (Math.random() > 0.5 ? 0.8 : -0.8), length * 0.4, branchDepth + 1));
    }
  }
  return { points, branches };
}

function generateParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 0.8 + 0.2, // Depth: 0.2 (far) to 1.0 (near)
    size: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.1,
    pulseSpeed: Math.random() * 0.05 + 0.01
  }));
}

function generateContours(width: number, height: number): Contour[] {
  const contours: Contour[] = [];
  for (let i = 0; i < 6; i++) {
    contours.push({
      sx: -100,
      sy: (height / 5) * i + (Math.random() * 200 - 100),
      cp1x: width * 0.3,
      cp1y: (height / 5) * i + (Math.random() * 400 - 200),
      cp2x: width * 0.7,
      cp2y: (height / 5) * i + (Math.random() * 400 - 200),
      ex: width + 100,
      ey: (height / 5) * i + (Math.random() * 200 - 100)
    });
  }
  return contours;
}

export function OpeningSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const proxyRef = useRef({ hakiProgress: 0, transitionSweep: 0, globalScroll: 0 });
  
  const cracksData = useRef<CrackData[]>([]);
  const particlesData = useRef<Particle[]>([]);
  const contoursData = useRef<Contour[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    cracksData.current = [
      generateCrack(width * 0.1, height * 0.2, 0.3, width * 0.8),
      generateCrack(width * 0.9, height * 0.8, Math.PI - 0.2, width * 0.7),
      generateCrack(width * 0.2, -100, Math.PI / 2 + 0.2, height * 0.8)
    ];
    particlesData.current = generateParticles(80, width, height);
    contoursData.current = generateContours(width, height);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=350%", 
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          proxyRef.current.globalScroll = self.progress;
        }
      }
    });

    // Phase 1: 0% -> 40% (Haki Awakens)
    tl.to(proxyRef.current, { hakiProgress: 1, ease: "power2.inOut", duration: 2 }, 0);

    // Phase 2: 40% -> 75% (Hero scaling / Haki intensifies)
    tl.to(".hero-content", { scale: 1.5, opacity: 0, y: -50, duration: 1.5, ease: "power2.in" }, 1.5);
    tl.to(".hud-elements", { opacity: 0, duration: 0.5, ease: "power1.in" }, 1.5);

    // Phase 3: 75% -> 85% (Massive Haki Sweep across screen)
    tl.to(proxyRef.current, { transitionSweep: 1, ease: "power4.inOut", duration: 1.5 }, 2);

    // Phase 4: 85% -> 100% (Grand Line reveals)
    tl.fromTo(".grand-line-intro", 
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, 
      3
    );
    
    const routeLen = 3000;
    tl.fromTo(".gl-route", 
      { strokeDasharray: routeLen, strokeDashoffset: routeLen },
      { strokeDashoffset: 0, duration: 1.5, ease: "none" },
      3
    );

    let time = 0;
    
    // --- CANVAS RENDER LOOP ---
    const renderCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;
      
      const w = canvas.width;
      const h = canvas.height;
      time += 1;
      
      ctx.clearRect(0, 0, w, h);
      
      const { hakiProgress, transitionSweep, globalScroll } = proxyRef.current;
      
      // 1. Draw Topographic Contours (Layer 2)
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 - transitionSweep * 0.02})`;
      contoursData.current.forEach((c, i) => {
        const drift = globalScroll * 200 * (i % 2 === 0 ? 1 : -1);
        ctx.beginPath();
        ctx.moveTo(c.sx, c.sy + drift);
        ctx.bezierCurveTo(c.cp1x, c.cp1y + drift, c.cp2x, c.cp2y + drift, c.ex, c.ey + drift);
        ctx.stroke();
      });

      // 2. Draw Distant Particles (Layer 3)
      particlesData.current.forEach(p => {
        const px = (p.x - globalScroll * p.speed * 300 * p.z) % w;
        const py = p.y;
        const finalX = px < 0 ? px + w : px;
        const alpha = (0.1 + Math.sin(time * p.pulseSpeed) * 0.1) * (1 - transitionSweep);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(finalX, py, p.size * p.z, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Gold Navigation Traces (Layer 6)
      if (globalScroll > 0) {
        ctx.strokeStyle = `rgba(255, 200, 87, ${0.05 * (1 - transitionSweep)})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 20]);
        ctx.beginPath();
        ctx.moveTo(0, h * 0.8);
        ctx.bezierCurveTo(w * 0.3, h * 0.9, w * 0.7, h * 0.6, w, h * 0.7);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4 & 5. Haki Environment Bloom & Core (Layers 5 & 6)
      if (hakiProgress > 0 && hakiProgress < 1.1) {
        const drawCrack = (crack: CrackData, prog: number) => {
          if (prog <= 0) return;
          const p = Math.min(1, prog);
          
          const drawPts = (pts: Point[], val: number) => {
            const count = Math.max(1, Math.floor(pts.length * val));
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < count; i++) ctx.lineTo(pts[i].x, pts[i].y);
            ctx.stroke();
          };

          // Haki Bloom (Atmospheric Green Energy modifying the environment)
          ctx.strokeStyle = "rgba(57, 255, 20, 0.08)";
          ctx.lineWidth = 40 * p;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowBlur = 0; // Performance: use thick transparent stroke instead of blur for bloom
          drawPts(crack.points, p);
          crack.branches.forEach(b => drawCrack(b, p * 1.5));

          // Outer Glow (Neon Green)
          ctx.strokeStyle = "#39FF14";
          ctx.lineWidth = 8;
          ctx.shadowColor = "#39FF14";
          ctx.shadowBlur = 15 * p;
          drawPts(crack.points, p);
          crack.branches.forEach(b => drawCrack(b, p * 1.5));

          // Inner Core (Black)
          ctx.strokeStyle = "#02050A";
          ctx.lineWidth = 4;
          ctx.shadowBlur = 0;
          drawPts(crack.points, p);
          crack.branches.forEach(b => drawCrack(b, p * 1.5));
        };

        cracksData.current.forEach((crack, i) => {
          drawCrack(crack, hakiProgress * 1.5 - (i * 0.2));
        });
      }

      // 6. Transition Sweep (Massive black Haki tear revealing the Grand Line)
      if (transitionSweep > 0) {
        const sweepW = w * transitionSweep * 3;
        ctx.fillStyle = "#02050A"; // Deep abyss base
        ctx.strokeStyle = "#39FF14";
        ctx.lineWidth = 6;
        ctx.shadowBlur = 40;
        ctx.shadowColor = "#39FF14";
        
        ctx.beginPath();
        ctx.moveTo(w/2 - sweepW, -h);
        ctx.lineTo(w/2 + sweepW, -h);
        ctx.lineTo(w/2 + sweepW - 300*transitionSweep, h/2);
        ctx.lineTo(w/2 + sweepW + 150*transitionSweep, h*2);
        ctx.lineTo(w/2 - sweepW - 150*transitionSweep, h*2);
        ctx.lineTo(w/2 - sweepW + 300*transitionSweep, h/2);
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    gsap.ticker.add(renderCanvas);
    
    const handleResize = () => {
      if (canvasRef.current) {
        // Cap DPR for performance
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(renderCanvas);
      window.removeEventListener("resize", handleResize);
    };
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div 
        ref={containerRef} 
        className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#02050A] via-[#050A12] to-[#07111B]"
      >
      {/* Soft volumetric clouds / shadow depth overlay (Layer 1) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.02),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(57,255,20,0.02),transparent_50%)] pointer-events-none z-0" />
      
      {/* Master Canvas Layer (Particles, Contours, Haki, Transition) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Cyber HUD Elements (Layer 4) */}
      <div className="hud-elements absolute inset-0 z-20 pointer-events-none p-8 flex flex-col justify-between opacity-80">
        <div className="flex justify-between items-start w-full">
          <div className="font-mono text-[10px] text-cyber-cyan/40 tracking-[0.2em] flex flex-col gap-1">
            <span>[ SYS.NAV_ACTIVE ]</span>
            <span>ENV_ABYSS // 0.9.4</span>
          </div>
          <Crosshair size={16} className="text-foreground/20 animate-[spin_10s_linear_infinite]" />
        </div>
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-1">
            <div className="w-12 h-[1px] bg-foreground/20" />
            <div className="w-8 h-[1px] bg-foreground/10" />
            <div className="w-16 h-[1px] bg-foreground/20" />
          </div>
          <div className="font-mono text-[10px] text-foreground/30 tracking-widest text-right">
            COORD: 34.05N 118.24W<br />
            TARGET LOCK SECURED
          </div>
        </div>
      </div>

      {/* HERO LAYER (Layer 8) */}
      <div className="hero-content absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
        
        {/* Controlled Center: Minimal elements behind text */}
        <div className="absolute w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_center,rgba(2,5,10,0.8)_0%,transparent_70%)] pointer-events-none -z-10" />

        <div className="font-mono text-haki-green text-xs md:text-sm tracking-[0.5em] uppercase mb-8 opacity-90 text-glow-haki">
          Entering the New World
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-bold uppercase tracking-tighter leading-none m-0 text-foreground">
          Kartik<br />Phulwari
        </h1>
        
        <p className="mt-8 font-mono text-cyber-cyan tracking-widest text-xs md:text-sm uppercase bg-background/30 backdrop-blur-sm px-4 py-2 border border-white/5">
          Cybersecurity &times; Fullstack Engineering
        </p>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50 transition-opacity hover:opacity-100">
          <span className="font-mono text-[10px] tracking-widest uppercase">Initiate Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent" />
        </div>
      </div>

      {/* GRAND LINE INTRO LAYER */}
      <div className="grand-line-intro absolute inset-0 z-40 opacity-0 pointer-events-none flex flex-col justify-center px-[10vw]">
        
        <div className="relative z-50">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground mb-4">
            The <span className="text-cyber-gold text-glow-gold">Voyage</span>
          </h2>
          <div className="font-mono text-xs text-cyber-cyan tracking-[0.3em]">NAVIGATING THE GRAND LINE</div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="w-16 h-16 rounded-full border border-cyber-gold/50 flex items-center justify-center bg-[#02050A] box-glow-gold relative">
              <Compass size={24} className="text-cyber-gold" />
              <div className="absolute inset-0 rounded-full border border-dashed border-cyber-gold animate-[spin_10s_linear_infinite]" />
            </div>
            
            <div className="font-mono text-xs text-foreground/50 border-l border-white/10 pl-4">
              COORDINATES:<br />
              <span className="text-cyber-gold">34.0522° N, 118.2437° W</span>
            </div>
          </div>
        </div>

        {/* Gold Navigation Route Line */}
        <svg className="absolute top-1/2 left-0 w-full h-[400px] -translate-y-1/2 z-40 pointer-events-none" overflow="visible">
          <path 
            className="gl-route"
            d="M -100,200 Q 300,50 600,200 T 1200,200 T 1800,200 T 2400,200 T 3000,200" 
            fill="none" 
            stroke="var(--color-cyber-gold)" 
            strokeWidth="3" 
            style={{ filter: "drop-shadow(0 0 10px rgba(255, 200, 87, 0.5))" }}
          />
        </svg>

        {/* Origin Node */}
        <div className="absolute top-1/2 left-[20vw] -translate-y-[20px] z-50 w-[300px]">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-cyber-gold opacity-50 ml-6" />
          <div className="flex items-center gap-4 mt-2">
            <div className="w-12 h-12 rounded-full border-2 border-cyber-gold bg-[#02050A] flex items-center justify-center box-glow-gold">
              <div className="w-4 h-4 rounded-full bg-cyber-gold animate-pulse" />
            </div>
            <div className="bg-[#02050A]/80 backdrop-blur-md border border-white/10 p-4">
              <span className="font-mono text-[10px] text-cyber-gold tracking-widest block mb-1">ORIGIN // LOG 01</span>
              <h3 className="font-bold uppercase text-sm">EAST BLUE</h3>
            </div>
          </div>
        </div>

      </div>

    </div>
    </div>
  );
}
