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
      trigger: wrapperRef.current,
      start: "top top",
      end: "+=400%", 
      pin: true,
      pinSpacing: false, // <--- CRITICAL for overlap handoff
      scrub: 0.5,
      onUpdate: (self) => {
        if (videoRef.current && !isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
          // Video finishes at exactly 75% of this 400vh pin (i.e. at 300vh)
          const videoProgress = Math.min(1, self.progress);
          
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
        trigger: wrapperRef.current,
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
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          muted
          playsInline
          preload="auto"
        />

        {/* Deep overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,5,10,0.4)_0%,transparent_50%)] z-0 pointer-events-none" />
        
        {/* Central Composition */}
        <div ref={textGroupRef} className="relative z-10 w-full flex flex-col items-center text-center pb-20">
          
          <div className="hero-element font-mono text-[10px] md:text-xs text-cyber-gold tracking-[0.4em] mb-8 uppercase flex items-center gap-4 opacity-90 border border-cyber-gold/20 px-4 py-1 bg-cyber-gold/5 backdrop-blur-sm">
            <Compass size={12} className="animate-[spin_4s_linear_infinite]" />
            Entering the New World
          </div>
          
          {/* Title Composition with Dark Haki Lightning Strike */}
          <div className="hero-element relative inline-block mb-8">
            <style>{`
              @keyframes hakiStrike {
                0%, 29.6% {
                  opacity: 0;
                  transform: scale(0.97) translateY(-2px);
                }
                30.0% {
                  opacity: 0.8;
                  transform: scale(0.99) translateY(0);
                }
                30.3% {
                  opacity: 0.15;
                }
                30.6% {
                  opacity: 1;
                  transform: scale(1.01) translateY(0);
                }
                31.4% {
                  opacity: 0.85;
                  transform: scale(1);
                }
                32.2% {
                  opacity: 0.35;
                }
                33.0%, 70.4% {
                  opacity: 0;
                  transform: scale(0.97);
                }
                71.0% {
                  opacity: 0.9;
                  transform: scale(1.01) translateY(0);
                }
                71.4% {
                  opacity: 0.2;
                }
                71.8% {
                  opacity: 1;
                  transform: scale(1.02);
                }
                72.3% {
                  opacity: 0.3;
                }
                72.7% {
                  opacity: 0.85;
                }
                73.5% {
                  opacity: 0.25;
                }
                74.5%, 100% {
                  opacity: 0;
                  transform: scale(0.97);
                }
              }

              @keyframes hakiTextImpact {
                0%, 29.8% {
                  text-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
                }
                30.6% {
                  text-shadow: 0 0 25px rgba(0, 229, 255, 0.95), 0 0 45px rgba(255, 255, 255, 0.85), 0 0 8px rgba(57, 255, 20, 0.45);
                }
                31.5% {
                  text-shadow: 0 0 20px rgba(0, 229, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.7);
                }
                33.0%, 71.0% {
                  text-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
                }
                71.8% {
                  text-shadow: 0 0 25px rgba(0, 229, 255, 0.95), 0 0 45px rgba(255, 255, 255, 0.85), 0 0 8px rgba(57, 255, 20, 0.45);
                }
                72.7% {
                  text-shadow: 0 0 20px rgba(0, 229, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.7);
                }
                74.5%, 100% {
                  text-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
                }
              }

              .haki-lightning-svg {
                animation: hakiStrike 14s cubic-bezier(0.16, 1, 0.3, 1) infinite;
                will-change: opacity, transform;
                transform-origin: center;
              }

              .haki-title {
                animation: hakiTextImpact 14s ease-out infinite;
                will-change: text-shadow;
              }

              @media (prefers-reduced-motion: reduce) {
                .haki-lightning-svg,
                .haki-title {
                  animation: none !important;
                }
                .haki-lightning-svg {
                  opacity: 0 !important;
                }
                .haki-title {
                  text-shadow: 0 0 15px rgba(0, 229, 255, 0.6) !important;
                }
              }
            `}</style>

            {/* Dark Haki Lightning Bolt Layer (Behind text) */}
            <div className="absolute -inset-4 sm:-inset-6 md:-inset-10 pointer-events-none z-0 overflow-visible" aria-hidden="true">
              <svg 
                className="haki-lightning-svg w-full h-full"
                viewBox="0 0 600 320"
                fill="none"
                preserveAspectRatio="none"
              >
                {/* Outer Neon-Green Edge / Aura */}
                <path
                  d="M 440 10 L 405 55 L 425 68 L 360 130 L 385 142 L 290 205 L 315 218 L 220 280 L 235 292 L 170 310"
                  stroke="#39FF14"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  style={{ filter: "drop-shadow(0 0 4px #39FF14)" }}
                />
                <path
                  d="M 360 130 L 300 150 L 320 160 L 250 195"
                  stroke="#39FF14"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  style={{ filter: "drop-shadow(0 0 4px #39FF14)" }}
                />

                {/* Inner Pitch-Black Core */}
                <path
                  d="M 440 10 L 405 55 L 425 68 L 360 130 L 385 142 L 290 205 L 315 218 L 220 280 L 235 292 L 170 310"
                  stroke="#020408"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                />
                <path
                  d="M 360 130 L 300 150 L 320 160 L 250 195"
                  stroke="#020408"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>

            <h1 className="haki-title relative z-10 text-[12vw] sm:text-6xl md:text-8xl lg:text-[12vw] font-bold uppercase tracking-tighter leading-[0.85] text-foreground text-glow-cyan drop-shadow-2xl">
              Kartik<br />Phulwari
            </h1>
          </div>
          
          <div className="hero-element font-mono text-xs md:text-sm text-cyber-cyan uppercase tracking-widest leading-relaxed max-w-lg bg-[#02050A]/80 backdrop-blur-md border border-white/10 p-3 px-6 shadow-2xl box-glow-cyan">
            ? Cybersecurity <span className="text-foreground px-2">//</span> Fullstack Engineering
          </div>

          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hero-element mt-6 px-8 py-4 border border-white/20 font-mono text-xs tracking-widest uppercase text-foreground hover:text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all backdrop-blur-md">
            DOWNLOAD RESUME
          </a>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100 z-20">
          <span className="font-mono text-[10px] tracking-widest uppercase text-cyber-gold">Scroll to scrub video</span>
          <div className="w-4 h-6 border border-cyber-gold/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-1 bg-cyber-gold rounded-full animate-bounce" />
          </div>
        </div>

      </section>
    </div>
  );
}













