"use client";

import React, { useEffect, useRef } from "react";
import { Zap, ShieldCheck, CheckCircle2, AlertTriangle, Eye, Lock, HardDrive, Bell, ArrowUpRight } from "lucide-react";

// Canvas visualizer for Left Card: Critical Energy (stable 50Hz sine wave oscilloscope)
function OscilloscopeVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 140;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(8, 14, 20, 0.22)"; // smooth trails clearing
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle oscillocope grid lines
      ctx.strokeStyle = "rgba(245, 158, 11, 0.04)";
      ctx.lineWidth = 1;
      const gap = 20;
      for (let x = 0; x < canvas.width; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw middle horizontal dashed line
      ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw real-time sine wave
      ctx.beginPath();
      ctx.strokeStyle = "#f59e0b"; // Amber color
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.8;

      for (let x = 0; x < canvas.width; x++) {
        const frequency = 0.018;
        const amplitude = 28 * Math.sin(x * 0.004 + time * 0.03); // dynamic amplitude modulation
        const y = canvas.height / 2 + Math.sin(x * frequency - time * 0.12) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset glow

      time += 0.25;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block rounded-xl z-10 relative" />;
}

// Canvas visualizer for Right Card: Electronic Security (revolving radar sweep with targets)
function RadarVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 140;
    };
    resize();
    window.addEventListener("resize", resize);

    // Hardcode coordinate points for simulated CCTV / active security nodes
    const targets = [
      { r: 42, a: 1.1, size: 3.5, pulse: 0 },
      { r: 80, a: 3.2, size: 4, pulse: 0 },
      { r: 105, a: 5.3, size: 3.5, pulse: 0 }
    ];

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(8, 14, 20, 0.18)"; // smooth trails clearing
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.04)";
      ctx.lineWidth = 1;
      const gap = 30;
      for (let x = 0; x < canvas.width; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw concentric radar lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.arc(cx, cy, 64, 0, Math.PI * 2);
      ctx.arc(cx, cy, 96, 0, Math.PI * 2);
      ctx.stroke();

      // Radar crosshair lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.06)";
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy); ctx.lineTo(cx + 120, cy);
      ctx.moveTo(cx, cy - 70); ctx.lineTo(cx, cy + 70);
      ctx.stroke();

      // Calculate vector of the sweep line
      const targetX = cx + Math.cos(angle) * 110;
      const targetY = cy + Math.sin(angle) * 110;

      // Draw glowing radar sweep line
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 4;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Update and draw radar nodes
      targets.forEach(t => {
        const tx = cx + Math.cos(t.a) * t.r;
        const ty = cy + Math.sin(t.a) * t.r;

        // Triggers glow active when the scanning vector sweeps by it
        let diff = Math.abs(angle % (Math.PI * 2) - t.a);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;

        if (diff < 0.12) {
          t.pulse = 1.0;
        }

        if (t.pulse > 0) {
          ctx.beginPath();
          ctx.arc(tx, ty, t.size * (1 + (1 - t.pulse) * 1.6), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${t.pulse * 0.4})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(tx, ty, t.size, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          t.pulse -= 0.025; // fade out speed
        } else {
          // Draw dim standard inactive target
          ctx.beginPath();
          ctx.arc(tx, ty, t.size - 1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
          ctx.fill();
        }
      });

      // Scan sweeper head
      ctx.beginPath();
      ctx.arc(targetX, targetY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();

      angle += 0.007; // speed of rotation
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block rounded-xl z-10 relative" />;
}

export function EnergySecuritySection() {
  const energyBenefits = [
    { title: "Reducción de Interrupciones", desc: "Evita pérdidas financieras bloqueando cortes y micro-cortes instantáneos." },
    { title: "Protección de Equipamiento", desc: "Disipa picos de tensión y ruido eléctrico comercial que desgastan tu hardware." },
    { title: "Respaldo ante Apagones", desc: "Grupos electrógenos automáticos dimensionados para operar indefinidamente." },
    { title: "Continuidad del Negocio", desc: "Mantén tus POS, ERPs, comunicaciones y servidores en funcionamiento permanente." }
  ];

  const securityServices = [
    { icon: <Eye className="w-5 h-5 text-emerald-400" />, title: "Cámaras de Seguridad y CCTV IP", desc: "Cámaras profesionales con visión nocturna, analítica inteligente de comportamiento y grabación redundante." },
    { icon: <Lock className="w-5 h-5 text-emerald-400" />, title: "Control de Acceso y Presencia", desc: "Sistemas biométricos, RFID y reconocimiento facial integrados a molinetes y puertas electromagnéticas." },
    { icon: <Bell className="w-5 h-5 text-emerald-400" />, title: "Alarmas y Seguridad Perimetral", desc: "Sensores de movimiento, barreras infrarrojas y sistemas disuasivos conectados a una central de monitoreo." },
    { icon: <HardDrive className="w-5 h-5 text-emerald-400" />, title: "Integración unificada (BMS)", desc: "Software de gestión unificado que coordina cámaras, alarmas y accesos en una sola pantalla de control." }
  ];

  return (
    <section id="energia-seguridad" className="relative py-24 bg-[#061014] text-white overflow-hidden border-b border-slate-900/60">
      
      {/* Design elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* LEFT PANEL: ENERGY & CONTINUITY */}
          <div className="group relative card-border overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-amber-500/30 hover:shadow-[0_0_35px_rgba(245,158,11,0.08)] transition-all duration-500">
            
            {/* Corner styling accents */}
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-slate-800 group-hover:border-amber-500/40 transition-colors duration-300"></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-slate-800 group-hover:border-amber-500/40 transition-colors duration-300"></div>

            <div>
              {/* Header glass tag & Icon bar */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:border-amber-500/50 transition-all duration-500 shadow-inner">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-amber-400 block font-bold">Energía Crítica</span>
                    <span className="text-[9px] text-gray-500 font-mono block">SYSTEM CLASS: TIER III</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 glass text-amber-400 rounded-full text-[10px] font-mono font-medium tracking-wide border border-amber-500/30">
                  Power Active
                </span>
              </div>

              {/* Graphical oscilliscope header visualizer */}
              <div className="w-full h-32 rounded-xl gradient-border inner-glow overflow-hidden relative bg-[#061014]/90 mb-6 flex items-center justify-center shadow-inner">
                {/* Micro-grid overlay */}
                <div className="absolute inset-0 opacity-15 pointer-events-none z-20">
                  <div 
                    className="w-full h-full" 
                    style={{ 
                      backgroundImage: 'linear-gradient(90deg, rgba(245,158,11,0.15) 1px, transparent 1px), linear-gradient(rgba(245,158,11,0.15) 1px, transparent 1px)', 
                      backgroundSize: '12px 12px' 
                    }} 
                  />
                </div>
                <OscilloscopeVisualizer />
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-3">
                Energía confiable para empresas que <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">no pueden detenerse</span>
              </h3>

              <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed mb-6">
                Una falla en el suministro eléctrico destruye bases de datos y frena ventas. Diseñamos infraestructuras de energía que neutralizan cortes, regulando el voltaje y transfiriendo cargas sin retraso de milisegundos.
              </p>

              {/* Gradient dividing neon line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent my-6" />

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {energyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors duration-300">{benefit.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-light">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom telemetry monitoring block */}
            <div className="glass border-white/5 pt-4 mt-6 flex justify-between items-center p-4 rounded-xl text-[10px]">
              <span className="flex items-center gap-2 text-gray-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                GRID: 50.0 HZ STABLE
              </span>
              <span className="font-mono text-amber-400 font-bold glass px-2.5 py-1 rounded border border-amber-500/25 tracking-wide uppercase">Respaldo: OK (100%)</span>
            </div>
          </div>

          {/* RIGHT PANEL: ELECTRONIC SECURITY */}
          <div className="group relative card-border overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-[0_0_35px_rgba(16,185,129,0.08)] transition-all duration-500">
            
            {/* Corner styling accents */}
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-slate-800 group-hover:border-emerald-500/40 transition-colors duration-300"></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-slate-800 group-hover:border-emerald-500/40 transition-colors duration-300"></div>

            <div>
              {/* Header glass tag & Icon bar */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:border-emerald-500/50 transition-all duration-500 shadow-inner">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 block font-bold">Seguridad Electrónica</span>
                    <span className="text-[9px] text-gray-500 font-mono block">SYSTEM SECURITY: AES-256</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 glass text-emerald-400 rounded-full text-[10px] font-mono font-medium tracking-wide border border-emerald-500/30">
                  CCTV Online
                </span>
              </div>

              {/* Graphical radar header visualizer */}
              <div className="w-full h-32 rounded-xl gradient-border inner-glow overflow-hidden relative bg-[#061014]/90 mb-6 flex items-center justify-center shadow-inner">
                {/* Micro-grid overlay */}
                <div className="absolute inset-0 opacity-15 pointer-events-none z-20">
                  <div 
                    className="w-full h-full" 
                    style={{ 
                      backgroundImage: 'linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px)', 
                      backgroundSize: '12px 12px' 
                    }} 
                  />
                </div>
                <RadarVisualizer />
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-3">
                Protección digital y física de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">activos y personas</span>
              </h3>

              <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed mb-6">
                El blindaje físico es el primer eslabón en la seguridad. Implementamos sistemas coordinados de videovigilancia y control de accesos perimetrales con trazabilidad absoluta en tus salas técnicas.
              </p>

              {/* Gradient dividing neon line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent my-6" />

              {/* Security Services list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {securityServices.map((service, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <div className="p-1.5 glass border border-slate-800 rounded-lg text-emerald-400 flex-shrink-0 group-hover:border-emerald-500/30 transition-all duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">{service.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-light">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom telemetry monitoring block */}
            <div className="glass border-white/5 pt-4 mt-6 flex justify-between items-center p-4 rounded-xl text-[10px]">
              <span className="flex items-center gap-2 text-gray-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ACTIVE MONITOR: ALL CHANNELS
              </span>
              <span className="font-mono text-emerald-400 font-bold glass px-2.5 py-1 rounded border border-emerald-500/25 tracking-wide uppercase">Monitoreo: Activo</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
