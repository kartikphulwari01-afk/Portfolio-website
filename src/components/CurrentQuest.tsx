"use client";

import { Target, CheckCircle2, Circle } from "lucide-react";

export function CurrentQuest() {
  const objectives = [
    { text: "Advanced Distributed Systems Architecture", status: "in-progress" },
    { text: "Zero-Trust Security Implementation", status: "in-progress" },
    { text: "Web3 Protocol Integration", status: "pending" },
    { text: "Kernel-Level Exploit Analysis", status: "pending" }
  ];

  return (
    <section className="relative w-full py-32 px-[5vw] lg:px-[10vw] bg-transparent border-t border-white/5">
      
      <div className="panel-cyber panel-corners flex flex-col lg:flex-row w-full min-h-[400px] shadow-2xl bg-[#02050A]/90">
        
        {/* Left: Title Area */}
        <div className="w-full lg:w-1/3 p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 bg-[#050812]">
          <div>
            <Target size={40} className="text-cyber-gold mb-8 text-glow-gold" />
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-foreground leading-none">
              Current<br/><span className="text-cyber-gold">Quest</span>
            </h2>
          </div>
          <div className="mt-16 font-mono text-[10px] text-muted tracking-widest uppercase flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-cyber-gold animate-pulse" />
            ACTIVE LEARNING OBJECTIVES
          </div>
        </div>

        {/* Right: Objectives List */}
        <div className="w-full lg:w-2/3 p-12 lg:p-20 flex flex-col justify-center">
          <div className="flex flex-col gap-8">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-6 group p-4 border border-white/5 bg-[#020408] hover:border-cyber-gold/30 hover:bg-cyber-gold/5 transition-colors panel-corners">
                {obj.status === "in-progress" ? (
                  <div className="relative flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-cyber-gold shrink-0 relative z-10" />
                    <div className="absolute inset-0 bg-cyber-gold blur-md opacity-50 z-0" />
                  </div>
                ) : (
                  <Circle size={24} className="text-white/20 shrink-0 group-hover:text-white/40 transition-colors" />
                )}
                
                <span className={`font-mono text-sm lg:text-base tracking-wide ${obj.status === 'in-progress' ? 'text-foreground font-bold' : 'text-muted'}`}>
                  {obj.text}
                </span>
                
                {obj.status === "in-progress" && (
                  <span className="ml-auto font-mono text-[10px] text-cyber-gold tracking-widest uppercase border border-cyber-gold/20 px-2 py-1 bg-cyber-gold/10 hidden md:block">
                    In Progress
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
