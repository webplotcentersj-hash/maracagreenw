"use client";

import React from "react";
import { Compass, Activity, ShieldCheck, Cpu } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

// High-performance canvas-based network nodes constellation backdrop with cursor interaction
const NetworkNodesBackground = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    // Create random nodes
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 1,
      color: Math.random() > 0.5 ? "rgba(16, 185, 129, 0.4)" : "rgba(6, 182, 212, 0.4)"
    }));
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((p) => {
        // Move away from mouse
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distToMouse = Math.hypot(dx, dy);
        if (distToMouse < 180) {
          const force = (180 - distToMouse) / 180;
          const angle = Math.atan2(dy, dx);
          // Soft physical push away
          p.x += Math.cos(angle) * force * 1.8;
          p.y += Math.sin(angle) * force * 1.8;
        }

        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around boundary coordinates
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Draw technical links between close nodes (glowing stronger near cursor)
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          
          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.14;
            const mx = (p1.x + p2.x) / 2 - mouseRef.current.x;
            const my = (p1.y + p2.y) / 2 - mouseRef.current.y;
            const distToM = Math.hypot(mx, my);
            
            let finalAlpha = alpha;
            let strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            
            if (distToM < 160) {
              const mForce = (160 - distToM) / 160;
              finalAlpha = alpha * (1.6 + mForce * 2.8);
              // Transmit a cyan neon flow in close proximity to the pointer
              strokeStyle = `rgba(6, 182, 212, ${Math.min(finalAlpha, 0.48)})`;
            }
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = distToM < 160 ? 1.2 : 0.8;
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas) canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" />;
};

// Mini real-time oscilloscope canvas for telemetry dashboard widgets
const SparklineCanvas = ({ color = "#10b981", speed = 0.04 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let offset = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      
      for (let x = 0; x < canvas.width; x++) {
        // Sophisticated wave equation combining multiple sine signals for a complex waveform
        const y = canvas.height / 2 + 
                  Math.sin(x * 0.08 + offset) * 3 + 
                  Math.cos(x * 0.15 + offset * 1.5) * 1.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      offset += speed;
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [color, speed]);
  
  return <canvas ref={canvasRef} width={120} height={20} className="w-full h-5 mt-2 opacity-50" />;
};

// Animated counter that counts up to the target number once inside the viewport
const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const numVal = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 45, damping: 15 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(numVal);
    }
  }, [isInView, motionValue, numVal]);

  React.useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="font-mono">0{suffix}</span>;
};

export function AboutSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const values = [
    { 
      title: "Precisión Técnica", 
      desc: "Planificación al milímetro siguiendo estrictos estándares internacionales de diseño (TIA/EIA y Uptime Institute).",
      icon: <Compass className="w-5 h-5 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />,
      tag: "[ TIA-942 COMPLIANT ]"
    },
    { 
      title: "Compromiso Uptime", 
      desc: "Comprendemos que cada minuto fuera de línea cuesta dinero. Operamos con sentido de máxima urgencia.",
      icon: <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />,
      tag: "[ SYSTEM_AVAIL: 99.999% ]"
    },
    { 
      title: "Responsabilidad y Seguridad", 
      desc: "Garantizamos la máxima protección física de las instalaciones del cliente, sus operarios y su hardware.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />,
      tag: "[ HSE_SECURE: LEVEL_4 ]"
    },
    { 
      title: "Innovación y Eficiencia", 
      desc: "Desplegamos tecnologías de vanguardia para optimizar consumo energético y disipación de calor.",
      icon: <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />,
      tag: "[ PUE_OPTIMIZED: 1.25 ]"
    }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-24 md:py-32 bg-[#060a0f] text-white overflow-hidden border-t border-slate-900/60"
    >
      {/* 1. Subtle, high-tech background video layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-[0.14] select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/3.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Cyber-overlay grid filter and gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a0f] via-[#060a0f]/80 to-[#060a0f] z-0 pointer-events-none" />
      
      {/* 3. Interactive mouse-spotlight background glow */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none duration-300 ease-out z-0 bg-[radial-gradient(circle_300px_at_var(--x)_var(--y),rgba(16,185,129,0.07),transparent_80%)]"
          style={{
            inset: 0,
            "--x": `${mousePos.x}px`,
            "--y": `${mousePos.y}px`,
          } as React.CSSProperties}
        />
      )}

      {/* 4. Constellation nodes particle canvas */}
      <NetworkNodesBackground />
      
      {/* 5. Glowing ambient highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Layout dual panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text Corporate Information */}
          <motion.div 
            className="lg:col-span-6 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
              }
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Sobre la Compañía
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Un equipo de ingeniería <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-500">
                preparado para desafíos reales.
              </span>
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
              Fundada en 2009, <span className="font-semibold text-emerald-400">Greenworking S.A.</span> nació con el firme propósito de estructurar y sostener el core tecnológico de las empresas más dinámicas del país. Con sede central en Ramos Mejía (Buenos Aires) y cobertura de ingeniería en toda la Argentina, acompañamos a organizaciones que no pueden permitirse un solo minuto de interrupción.
            </p>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
              Nuestra metodología combina un profundo rigor técnico, planificación milimétrica en CAD/BIM y ejecución profesional en terreno. Proveemos un único canal de responsabilidad para redes corporativas, centros de cómputos, climatización técnica y sistemas de respaldo energético.
            </p>

            {/* Stats widgets */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="relative bg-[#0b141b]/55 border border-slate-800/40 rounded-xl p-4 text-center hover:border-emerald-500/30 hover:bg-[#0b141b]/85 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] overflow-hidden group">
                <div className="absolute top-0 right-0 p-1 text-[7px] font-mono text-gray-600 select-none group-hover:text-emerald-500/50">
                  SYS_UP
                </div>
                <span className="block text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">
                  <AnimatedCounter value="15" suffix="+" />
                </span>
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block mt-1">Años de Trayectoria</span>
                <SparklineCanvas color="#10b981" speed={0.02} />
              </div>
              
              <div className="relative bg-[#0b141b]/55 border border-slate-800/40 rounded-xl p-4 text-center hover:border-cyan-500/30 hover:bg-[#0b141b]/85 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] overflow-hidden group">
                <div className="absolute top-0 right-0 p-1 text-[7px] font-mono text-gray-600 select-none group-hover:text-cyan-500/50">
                  SYS_DB
                </div>
                <span className="block text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">
                  <AnimatedCounter value="500" suffix="+" />
                </span>
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block mt-1">Proyectos Activos</span>
                <SparklineCanvas color="#06b6d4" speed={0.035} />
              </div>
              
              <div className="relative bg-[#0b141b]/55 border border-slate-800/40 rounded-xl p-4 text-center hover:border-emerald-500/30 hover:bg-[#0b141b]/85 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] overflow-hidden group">
                <div className="absolute top-0 right-0 p-1 text-[7px] font-mono text-gray-600 select-none group-hover:text-emerald-500/50">
                  SYS_SLA
                </div>
                <span className="block text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">
                  <AnimatedCounter value="100" suffix="%" />
                </span>
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block mt-1">Fidelidad SLAs</span>
                <SparklineCanvas color="#10b981" speed={0.015} />
              </div>
            </div>
          </motion.div>
  
          {/* RIGHT: Values interactive panel */}
          <motion.div 
            className="lg:col-span-6 bg-[#0b141b]/65 border border-slate-800/60 rounded-3xl p-8 md:p-10 space-y-6 hover:border-emerald-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-500 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
              }
            }}
          >
            {/* Corner Bracket decorations for a tactical HUD look */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/40 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500/40 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500/40 rounded-br-lg"></div>
            
            <h3 className="text-xl font-bold text-white border-b border-slate-800/80 pb-4 flex items-center gap-2 font-mono tracking-tight">
              <Compass className="w-5 h-5 text-emerald-400 animate-pulse" />
              Nuestros Pilares Operativos
            </h3>
            
            <div className="space-y-4 pt-1">
              {values.map((val, index) => (
                <div 
                  key={index} 
                  className="group relative flex gap-4 items-start p-4 rounded-2xl bg-[#0b141b]/50 border border-slate-800/30 hover:border-emerald-500/30 hover:bg-[#0b141b]/95 hover:shadow-[0_8px_30px_rgba(16,185,129,0.06)] transition-all duration-300 overflow-hidden"
                >
                  {/* Laser scan line sweep on hover */}
                  <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-sweep pointer-events-none" />

                  {/* Icon Container */}
                  <div className="w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-800 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-950/40 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300">
                    {val.icon}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {val.title}
                      </h4>
                      <span className="text-[8px] text-gray-500 font-mono tracking-wider font-light group-hover:text-emerald-500/50 transition-colors select-none">
                        {val.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
  
        </div>
  
      </div>
    </section>
  );
}
