"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const differentialValues = {
  left: [
    {
      title: "Ingeniería + Instalación Integral",
      desc: "En Greenworking, la Ingeniería es solo el comienzo.",
    },
    {
      title: "Soporte Post Proyecto",
      desc: "Estamos cuando más nos necesitan: asistencia presencial y remota, seguimiento activo y tiempo de respuesta ágiles.",
    },
  ],
  right: [
    {
      title: "Mantenimiento que Aseguran Continuidad",
      desc: "Planes preventivos y correctivos según cada solución instalada para garantizar rendimiento y disponibilidad.",
    },
  ],
};

function ValueItem({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      className="group flex gap-4 items-start"
    >
      <span className="w-2.5 h-2.5 rounded-sm bg-brand-primary shadow-[0_0_10px_rgba(0,196,249,0.55)] shrink-0 mt-1.5 group-hover:scale-110 transition-transform" />
      <div>
        <h4 className="text-sm md:text-base font-bold uppercase tracking-wide text-white mb-2 group-hover:text-brand-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-gray-300 font-light leading-relaxed group-hover:text-gray-100 transition-colors">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

const NetworkNodesBackground = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const particleCount = 72;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1.2,
      color: Math.random() > 0.35 ? "rgba(0, 196, 249, 0.75)" : "rgba(0, 158, 226, 0.65)",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distToMouse = Math.hypot(dx, dy);
        if (distToMouse < 200) {
          const force = (200 - distToMouse) / 200;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 2.2;
          p.y += Math.sin(angle) * force * 2.2;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "rgba(0, 196, 249, 0.9)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 165) {
            const alpha = (1 - dist / 165) * 0.28;
            const mx = (p1.x + p2.x) / 2 - mouseRef.current.x;
            const my = (p1.y + p2.y) / 2 - mouseRef.current.y;
            const distToM = Math.hypot(mx, my);

            let finalAlpha = alpha;
            let strokeStyle = `rgba(0, 196, 249, ${alpha})`;

            if (distToM < 180) {
              const mForce = (180 - distToM) / 180;
              finalAlpha = alpha * (1.8 + mForce * 3.2);
              strokeStyle = `rgba(0, 196, 249, ${Math.min(finalAlpha, 0.72)})`;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = distToM < 180 ? 1.4 : 1;
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
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-95"
      aria-hidden
    />
  );
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-[#060a0f] text-white overflow-hidden border-t border-slate-900/60"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-[0.08] select-none">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
          <source src="/3.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#060a0f]/40 via-transparent to-[#060a0f]/70 z-[2] pointer-events-none" />

      <NetworkNodesBackground />

      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-primary/8 rounded-full blur-[140px] pointer-events-none z-[2]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/6 rounded-full blur-[120px] pointer-events-none z-[2]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-white leading-tight max-w-xl">
            Nuestro Valor Diferencial
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-brand-primary/15 bg-[#0b141b]/55 backdrop-blur-md p-8 md:p-10 space-y-8 hover:border-brand-primary/30 hover:bg-[#0b141b]/70 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-primary/40 rounded-tl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-primary/40 rounded-br-lg" />
            {differentialValues.left.map((item, i) => (
              <ValueItem key={item.title} title={item.title} desc={item.desc} index={i + 1} />
            ))}
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-brand-primary/15 bg-[#0b141b]/55 backdrop-blur-md p-8 md:p-10 flex flex-col justify-center hover:border-brand-primary/30 hover:bg-[#0b141b]/70 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-teal/40 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-teal/40 rounded-bl-lg" />
            {differentialValues.right.map((item, i) => (
              <ValueItem key={item.title} title={item.title} desc={item.desc} index={i + 3} />
            ))}
          </motion.div>
        </div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl bg-brand-lime px-6 py-5 md:px-10 md:py-6 text-center shadow-[0_12px_40px_rgba(171,198,79,0.2)] hover:shadow-[0_16px_50px_rgba(171,198,79,0.28)] transition-shadow duration-500"
        >
          <p className="text-sm md:text-base text-[#061014] font-light leading-relaxed">
            No limitamos nuestros servicios a instalaciones.{" "}
            <span className="font-bold italic">
              Construimos relaciones, confianza y operaciones que funcionan.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
