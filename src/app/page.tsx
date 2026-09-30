"use client";

import { useState } from "react";
import { BootSequence } from "@/components/BootSequence";
import { CustomCursor } from "@/components/CustomCursor";
import { Environment } from "@/components/Environment";
import { Hero } from "@/components/Hero";
import { TheVoyage } from "@/components/TheVoyage";
import dynamic from "next/dynamic";

const Missions = dynamic(() => import("@/components/Missions").then(mod => mod.Missions));
const Arsenal = dynamic(() => import("@/components/Arsenal").then(mod => mod.Arsenal));
const CaptainsLog = dynamic(() => import("@/components/CaptainsLog").then(mod => mod.CaptainsLog));
const Transmission = dynamic(() => import("@/components/Transmission").then(mod => mod.Transmission));

export default function Home() {
  const [booting, setBooting] = useState(true);

  return (
    <main className="relative min-h-screen bg-transparent selection:bg-cyber-cyan selection:text-background">
      <CustomCursor />
      
      {booting ? (
        <BootSequence onComplete={() => setBooting(false)} />
      ) : (
        <div className="animate-in fade-in duration-1000 relative">
          <Environment />
          
          <div className="relative z-10 w-full">
            <Hero />
            <TheVoyage />
            <Missions />
            <Arsenal />
            <CaptainsLog />
            <Transmission />
            
            <footer className="py-12 text-center border-t border-white/5 bg-[#02050A]/80 backdrop-blur-md relative z-20">
              <h2 className="text-xl font-bold uppercase tracking-tighter mb-2 text-foreground">
                End of Line
              </h2>
              <p className="font-mono text-[10px] text-muted tracking-widest uppercase">SYSTEM STANDBY</p>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}



