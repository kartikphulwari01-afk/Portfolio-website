"use client";

import { Activity, ShieldAlert, Wifi, Terminal } from "lucide-react";

export function CyberCommandCenter() {
  return (
    <section className="relative w-full py-32 px-[5vw] lg:px-[10vw] bg-transparent border-t border-white/5">
      
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">
          Cyber <span className="text-haki-green text-glow-haki">Command</span>
        </h2>
        <div className="font-mono text-[10px] text-muted tracking-[0.3em] mt-2">SYSTEM TELEMETRY // NETWORK STATUS</div>
      </div>

      <div className="panel-cyber panel-corners p-8 lg:p-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#02050A]/90">
        
        {/* Module 1: Network */}
        <div className="flex flex-col p-6 bg-[#050812] border border-white/5 group transition-colors hover:border-cyber-cyan/30 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wifi size={100} />
          </div>
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <Wifi size={16} className="text-cyber-cyan" />
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Network Traffic</span>
          </div>
          <div className="mt-auto relative z-10">
            <span className="text-4xl font-bold font-sans text-foreground">14.2</span>
            <span className="font-mono text-[10px] text-cyber-cyan ml-2">TB/s</span>
          </div>
        </div>

        {/* Module 2: Security */}
        <div className="flex flex-col p-6 bg-[#050812] border border-white/5 group transition-colors hover:border-haki-green/30 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity text-haki-green">
            <ShieldAlert size={100} />
          </div>
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <ShieldAlert size={16} className="text-haki-green" />
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Intrusions</span>
          </div>
          <div className="mt-auto flex flex-col relative z-10">
            <span className="text-4xl font-bold font-sans text-haki-green text-glow-haki">892</span>
            <span className="font-mono text-[10px] text-muted mt-1">THREATS BLOCKED</span>
          </div>
        </div>

        {/* Module 3: Console Log */}
        <div className="flex flex-col p-6 bg-[#010204] border border-white/5 lg:col-span-2 group">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Terminal size={14} className="text-muted" />
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">System Console</span>
            <span className="ml-auto w-2 h-2 rounded-full bg-haki-green animate-pulse" />
          </div>
          <div className="mt-auto font-mono text-xs text-muted flex flex-col gap-2">
            <div className="flex gap-4"><span className="text-cyber-cyan">[10:04:22]</span> <span>Firewall rules updated.</span></div>
            <div className="flex gap-4"><span className="text-cyber-cyan">[10:05:01]</span> <span>Port scan detected from 192.168.x.x.</span></div>
            <div className="flex gap-4"><span className="text-haki-green">[10:05:03]</span> <span>Auto-ban engaged. Connection dropped.</span></div>
            <div className="flex gap-4"><span className="text-cyber-cyan">[10:12:44]</span> <span className="text-foreground border-r-4 border-foreground animate-pulse pr-1">Awaiting command...</span></div>
          </div>
        </div>

      </div>
    </section>
  );
}
