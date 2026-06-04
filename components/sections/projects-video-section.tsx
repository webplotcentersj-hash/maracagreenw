"use client";

import React, { useRef, useState } from "react";
import { Play, Film, Monitor } from "lucide-react";

export function ProjectsVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay blocked or video error:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#061014] text-white border-t border-slate-900 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f242d_1px,transparent_1px),linear-gradient(to_bottom,#0f242d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Film className="w-3.5 h-3.5" />
            Registro de Campo // Operaciones Reales
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ingeniería de campo en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-blue to-brand-teal">
              plena ejecución técnica.
            </span>
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Visualizá las maniobras de montaje, calibración y despliegue de infraestructura crítica realizado por nuestro cuerpo de ingenieros a lo largo de todo el territorio nacional.
          </p>
        </div>

        {/* Video Monitor Box (Highly styled cyberpunk console) */}
        <div 
          className="relative bg-[#0b141b]/40 border border-slate-800/80 rounded-2xl p-4 md:p-6 hover:border-emerald-500/30 transition-all duration-500 shadow-[0_20px_50px_rgba(6,16,20,0.8)] max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Tech HUD decorative details */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-700/80"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-700/80"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-700/80"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-700/80"></div>

          {/* Top telemetry bar */}
          <div className="flex items-center justify-between border-b border-slate-800/50 pb-3 mb-4 font-mono text-[9px] text-gray-500">
            <div className="flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span>TERMINAL // CAPTURE_FEED_01.MOV</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_#00c4f9]" : "bg-amber-500"}`}></span>
              <span className={isPlaying ? "text-emerald-400" : "text-amber-500"}>
                {isPlaying ? "STATUS // REPRODUCIENDO_FEED" : "STATUS // STANDBY"}
              </span>
            </div>
          </div>

          {/* Actual Video viewport */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800/40 bg-black/60 group shadow-inner">
            <video
              ref={videoRef}
              src="/copy_5600D41E-D6BE-419B-8F72-645F52286A58.mov"
              className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-[1.02]"
              muted
              loop
              playsInline
              preload="metadata"
            />

            {/* Hover overlay indicator when NOT playing */}
            <div className={`absolute inset-0 bg-[#061014]/65 backdrop-blur-xs flex flex-col items-center justify-center transition-all duration-500 ease-out z-10 ${
              isPlaying ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            }`}>
              <div className="w-16 h-16 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(0, 196, 249,0.15)] group-hover:scale-110 group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(0, 196, 249,0.35)] transition-all duration-300 relative">
                <Play className="w-6 h-6 fill-emerald-400 translate-x-0.5" />
                
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-full border border-emerald-500 animate-ping opacity-25"></div>
              </div>
              
              <span className="mt-4 font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded">
                Pasar el cursor para reproducir
              </span>
            </div>
          </div>

          {/* Bottom hardware telemetry */}
          <div className="flex items-center justify-between mt-3 font-mono text-[8px] text-gray-600">
            <span>RESOLUCIÓN: 1920X1080 // GRADE: A // DIRECT_PLAY</span>
            <span>GREEN WORKING S.A. DEPARTAMENTO TÉCNICO</span>
          </div>

        </div>

      </div>
    </section>
  );
}
