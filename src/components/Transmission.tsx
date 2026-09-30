"use client";

import { useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Code2, Briefcase, FileText, Send, Phone, CheckCircle2, AlertCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Transmission() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useGSAP(() => {
    gsap.from(".contact-reveal", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: sectionRef });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (status === 'loading') return;
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative w-full py-32 border-t border-white/5 bg-[#02050A] z-10 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#00E5FF]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Info & Socials */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between contact-reveal">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground mb-2">
              Let's <span className="text-cyber-cyan text-glow-cyan">Connect</span>
            </h2>
            <div className="font-mono text-[10px] text-cyber-cyan tracking-[0.3em] uppercase mt-2">CONTACT // TRANSMISSION</div>
            
            <p className="text-muted font-sans text-base leading-relaxed max-w-sm mt-12 mb-16">
              Ready to collaborate on a new mission? Whether you have a question, a project idea, or just want to connect, feel free to open a secure channel.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 border-l border-white/10 pl-8">
            <a href="mailto:kartikphulwari01@gmail.com" className="flex items-center gap-6 text-muted hover:text-foreground transition-colors group">
              <div className="p-3 bg-[#050812] border border-white/5 group-hover:border-cyber-cyan group-hover:bg-cyber-cyan/5 transition-colors panel-corners">
                <Mail size={20} className="group-hover:text-cyber-cyan transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-cyber-cyan tracking-widest uppercase mb-1">EMAIL</span>
                <span className="font-sans text-sm tracking-wide">kartikphulwari01@gmail.com</span>
              </div>
            </a>
            
            <a href="tel:+917877080919" className="flex items-center gap-6 text-muted hover:text-foreground transition-colors group">
              <div className="p-3 bg-[#050812] border border-white/5 group-hover:border-cyber-cyan group-hover:bg-cyber-cyan/5 transition-colors panel-corners">
                <Phone size={20} className="group-hover:text-cyber-cyan transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-cyber-cyan tracking-widest uppercase mb-1">PHONE</span>
                <span className="font-sans text-sm tracking-wide">+91 7877080919</span>
              </div>
            </a>

            <a href="https://github.com/kartikphulwari01-afk" target="_blank" rel="noreferrer" className="flex items-center gap-6 text-muted hover:text-foreground transition-colors group">
              <div className="p-3 bg-[#050812] border border-white/5 group-hover:border-cyber-cyan group-hover:bg-cyber-cyan/5 transition-colors panel-corners">
                <Code2 size={20} className="group-hover:text-cyber-cyan transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-cyber-cyan tracking-widest uppercase mb-1">GITHUB</span>
                <span className="font-sans text-sm tracking-wide">@kartikphulwari01-afk</span>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/kartik-phulwari-552337405" target="_blank" rel="noreferrer" className="flex items-center gap-6 text-muted hover:text-foreground transition-colors group">
              <div className="p-3 bg-[#050812] border border-white/5 group-hover:border-cyber-cyan group-hover:bg-cyber-cyan/5 transition-colors panel-corners">
                <Briefcase size={20} className="group-hover:text-cyber-cyan transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-cyber-cyan tracking-widest uppercase mb-1">LINKEDIN</span>
                <span className="font-sans text-sm tracking-wide">Kartik Phulwari</span>
              </div>
            </a>

            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-6 text-muted hover:text-foreground transition-colors group">
              <div className="p-3 bg-[#050812] border border-white/5 group-hover:border-cyber-cyan group-hover:bg-cyber-cyan/5 transition-colors panel-corners">
                <FileText size={20} className="group-hover:text-cyber-cyan transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-cyber-cyan tracking-widest uppercase mb-1">RESUME</span>
                <span className="font-sans text-sm tracking-wide">DOWNLOAD RESUME</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Form Panel */}
        <div className="w-full lg:w-7/12 contact-reveal">
          <form onSubmit={handleSubmit} className="panel-cyber p-8 lg:p-12 flex flex-col gap-8 shadow-2xl relative bg-[#050812]">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
            
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-cyber-cyan tracking-widest opacity-50">
              OPEN A SECURE CHANNEL
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label className="font-mono text-[10px] text-muted tracking-widest uppercase">NAME</label>
              <input 
                type="text" 
                required
                disabled={status === 'loading'}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#02050A] border border-white/10 p-4 font-sans text-sm text-foreground focus:outline-none focus:border-cyber-cyan focus:bg-cyber-cyan/5 transition-colors panel-corners disabled:opacity-50" 
                placeholder="Enter your name"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-muted tracking-widest uppercase">EMAIL</label>
              <input 
                type="email" 
                required
                disabled={status === 'loading'}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#02050A] border border-white/10 p-4 font-sans text-sm text-foreground focus:outline-none focus:border-cyber-cyan focus:bg-cyber-cyan/5 transition-colors panel-corners disabled:opacity-50" 
                placeholder="Enter your email"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-muted tracking-widest uppercase">MESSAGE</label>
              <textarea 
                required
                disabled={status === 'loading'}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#02050A] border border-white/10 p-4 font-sans text-sm text-foreground focus:outline-none focus:border-cyber-cyan focus:bg-cyber-cyan/5 transition-colors h-40 resize-none panel-corners disabled:opacity-50" 
                placeholder="Write your message"
              />
            </div>

            {status === 'success' && (
              <div className="text-haki-green font-mono text-[10px] tracking-widest flex items-center gap-2 mt-2">
                <CheckCircle2 size={14} /> SIGNAL RECEIVED. Message delivered successfully.
              </div>
            )}

            {status === 'error' && (
              <div className="text-red-500 font-mono text-[10px] tracking-widest flex items-center gap-2 mt-2">
                <AlertCircle size={14} /> TRANSMISSION FAILED. Please try again.
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="mt-4 flex items-center justify-center gap-3 bg-cyber-cyan/10 border border-cyber-cyan/30 p-5 font-mono text-sm tracking-widest uppercase text-cyber-cyan hover:bg-cyber-cyan hover:text-[#02050A] transition-all group panel-corners disabled:opacity-50 disabled:hover:bg-cyber-cyan/10 disabled:hover:text-cyber-cyan"
            >
              {status === 'loading' ? (
                <>TRANSMITTING...</>
              ) : status === 'success' ? (
                <>SIGNAL RECEIVED</>
              ) : (
                <>
                  <Send size={16} className="group-hover:translate-x-2 transition-transform" />
                  BROADCAST SIGNAL
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}

