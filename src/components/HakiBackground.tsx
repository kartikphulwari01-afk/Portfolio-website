"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

class Crack {
  x: number;
  y: number;
  angle: number;
  length: number;
  segments: { x: number, y: number }[];
  active: boolean;
  branchChance: number;
  progress: number;
  width: number;

  constructor(x: number, y: number, angle: number, width: number) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = Math.random() * 200 + 100;
    this.segments = [{ x, y }];
    this.active = true;
    this.branchChance = 0.05;
    this.progress = 0;
    this.width = width;
  }

  update(cracks: Crack[]) {
    if (!this.active) return;
    
    // Add jitter to angle
    this.angle += (Math.random() - 0.5) * 0.5;
    
    const step = 15;
    const nx = this.segments[this.segments.length - 1].x + Math.cos(this.angle) * step;
    const ny = this.segments[this.segments.length - 1].y + Math.sin(this.angle) * step;
    
    this.segments.push({ x: nx, y: ny });
    this.progress += step;

    // Branching
    if (Math.random() < this.branchChance && this.width > 1) {
      cracks.push(new Crack(nx, ny, this.angle + (Math.random() > 0.5 ? 0.8 : -0.8), this.width * 0.6));
    }

    if (this.progress >= this.length || nx < 0 || ny < 0 || nx > window.innerWidth || ny > window.innerHeight) {
      this.active = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D, scrollOffset: number) {
    if (this.segments.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(this.segments[0].x, this.segments[0].y - scrollOffset * 0.2); // slight parallax
    for (let i = 1; i < this.segments.length; i++) {
      ctx.lineTo(this.segments[i].x, this.segments[i].y - scrollOffset * 0.2);
    }

    // Neon Green Glow Outline
    ctx.strokeStyle = "#39FF14";
    ctx.lineWidth = this.width + 4;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#39FF14";
    ctx.stroke();

    // Deep Black Interior
    ctx.strokeStyle = "#020205";
    ctx.lineWidth = this.width;
    ctx.shadowBlur = 0;
    ctx.stroke();
  }
}

export function HakiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef({ y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    // Track scroll for subtle parallax reaction
    const onScroll = () => {
      scrollRef.current.y = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    let cracks: Crack[] = [];

    // Initialize static cracks
    const initCracks = () => {
      cracks = [];
      // Create cracks originating from sides
      for (let i = 0; i < 5; i++) {
        cracks.push(new Crack(0, Math.random() * height, (Math.random() - 0.5) * 1.5, Math.random() * 4 + 2));
        cracks.push(new Crack(width, Math.random() * height, Math.PI + (Math.random() - 0.5) * 1.5, Math.random() * 4 + 2));
      }
    };
    initCracks();

    let frameId: number;
    let time = 0;

    const render = () => {
      time += 0.01;
      
      // Clear with very low opacity to leave trails (optional, here we fully clear to keep it sharp)
      ctx.clearRect(0, 0, width, height);

      // Periodically generate new lightning strikes
      if (Math.random() < 0.01) {
        const side = Math.random() > 0.5;
        cracks.push(new Crack(
          side ? 0 : width, 
          Math.random() * (height + scrollRef.current.y), 
          side ? (Math.random() - 0.5) : Math.PI + (Math.random() - 0.5), 
          Math.random() * 6 + 2
        ));
      }

      cracks.forEach(crack => crack.update(cracks));
      
      // Remove dead cracks if there are too many to save memory
      if (cracks.length > 50) {
        cracks = cracks.filter(c => c.active || Math.random() > 0.05); // slowly cull inactive
      }

      // Draw all
      ctx.globalAlpha = 0.6 + Math.sin(time * 5) * 0.1; // Slight overall pulse
      cracks.forEach(crack => crack.draw(ctx, scrollRef.current.y));

      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
    />
  );
}
