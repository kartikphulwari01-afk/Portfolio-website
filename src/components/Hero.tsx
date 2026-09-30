"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Entrance Animation for text
    gsap.fromTo(".hero-element", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );

    // Pin the Hero and scrub the video.
    // We extend the pin to 400vh. The video finishes playing at 300vh (75%), 
    // leaving a 100vh "HOLD" at the end where the final sunset frame is safely frozen.
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=400%", 
      pin: true,
      pinSpacing: false, // <--- CRITICAL for overlap handoff
      scrub: 0.5,
      onUpdate: (self) => {
        if (videoRef.current && !isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
          // Video finishes at exactly 75% of this 400vh pin (i.e. at 300vh)
          const videoProgress = Math.min(1, self.progress / 0.75);
          
          // Epsilon (0.05s) prevents browser black-frame bugs at exact duration
          const safeDuration = Math.max(0, videoRef.current.duration - 0.05);
          const targetTime = videoProgress * safeDuration;
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.01) {
            videoRef.current.currentTime = targetTime;
          }
        }
      }
    });

    // Fade out text while scrolling down
    gsap.to(textGroupRef.current, {
      y: -150,
      opacity: 0,
      scale: 0.9,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: true
      }
    });

  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="relative w-full">
      <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center px-[5vw] lg:px-[10vw] bg-[#02050A] pt-20 perspective-[1000px] overflow-hidden border-b border-white/5">
        
        {/* Background Video Layer */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen pointer-events-none"
          muted
          playsInline
          preload="auto"
        />

        {/* Deep overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02050A]/50 to-[#02050A] z-0 pointer-events-none" />
        
        {/* Central Composition */}
        <div ref={textGroupRef} className="relative z-10 w-full flex flex-col items-center text-center">
          
          <div className="hero-element font-mono text-[10px] md:text-xs text-cyber-gold tracking-[0.4em] mb-8 uppercase flex items-center gap-4 opacity-90 border border-cyber-gold/20 px-4 py-1 bg-cyber-gold/5 backdrop-blur-sm">
            <Compass size={12} className="animate-[spin_4s_linear_infinite]" />
            Entering the New World
          </div>
          
          <h1 className="hero-element text-[12vw] sm:text-6xl md:text-8xl lg:text-[12vw] font-bold uppercase tracking-tighter leading-[0.85] text-foreground mb-8 text-glow-cyan drop-shadow-2xl">
            Kartik<br />Phulwari
          </h1>
          
          <div className="hero-element font-mono text-xs md:text-sm text-cyber-cyan uppercase tracking-widest leading-relaxed max-w-lg bg-[#02050A]/80 backdrop-blur-md border border-white/10 p-3 px-6 shadow-2xl box-glow-cyan">
            ? Cybersecurity <span className="text-foreground px-2">//</span> Fullstack Engineering
          </div>

          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hero-element mt-12 px-8 py-4 border border-white/20 font-mono text-xs tracking-widest uppercase text-foreground hover:text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all backdrop-blur-md">
            DOWNLOAD RESUME
          </a>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 transition-opacity hover:opacity-100 z-20">
          <span className="font-mono text-[10px] tracking-widest uppercase text-cyber-gold">Scroll to scrub video</span>
          <div className="w-4 h-6 border border-cyber-gold/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-1 bg-cyber-gold rounded-full animate-bounce" />
          </div>
        </div>

      </section>
    </div>
  );
}




