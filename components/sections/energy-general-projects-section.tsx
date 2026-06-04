"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, BatteryCharging, Sun, Lightbulb, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BrandPaletteAccent, BRAND_ACCENT_ICON } from "@/components/ui/brand-palette-accent";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const serviceBullets: { text: string; icon: LucideIcon }[] = [
  { text: "Grupos Generadores.", icon: Zap },
  { text: "UPS", icon: BatteryCharging },
  { text: "Paneles Solares", icon: Sun },
  { text: "Iluminación", icon: Lightbulb },
];

function ServiceBulletItem({
  item,
  index,
}: {
  item: (typeof serviceBullets)[number];
  index: number;
}) {
  const Icon = item.icon;
  const accent = BRAND_ACCENT_ICON[index % BRAND_ACCENT_ICON.length];

  return (
    <motion.li
      custom={index + 1}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      className="group list-none"
    >
      <motion.div
        className="relative flex items-start gap-4 p-4 rounded-xl border border-brand-primary/10 bg-[#0b141b]/60 backdrop-blur-sm overflow-hidden cursor-default transition-colors duration-300 group-hover:border-brand-primary/35 group-hover:bg-[#0e1c25]/80"
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-r" />
        <div className="relative shrink-0 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-sm bg-brand-primary shadow-[0_0_8px_rgba(0,196,249,0.5)] group-hover:scale-110 transition-transform" />
          <div className="w-10 h-10 rounded-lg bg-brand-petrol/40 border border-brand-primary/20 flex items-center justify-center group-hover:border-brand-primary/50 group-hover:shadow-[0_0_16px_rgba(0,196,249,0.25)] transition-all duration-300">
            <Icon className={`w-5 h-5 ${accent} group-hover:text-white transition-colors`} strokeWidth={1.75} />
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors pt-2">
          {item.text}
        </p>
      </motion.div>
    </motion.li>
  );
}

const collage = [
  {
    src: "/ss/Imagen28.jpg",
    alt: "Paneles solares en cubierta industrial",
    label: "Paneles Solares",
    className: "col-start-1 row-start-1 z-[2] -rotate-1",
    sizes: "(max-width: 768px) 50vw, 28vw",
  },
  {
    src: "/ss/Imagen29.jpg",
    alt: "Grupo generador Palmero Power Systems",
    label: "Grupos Generadores",
    className: "col-start-2 row-start-1 z-[3] rotate-1 translate-y-2",
    sizes: "(max-width: 768px) 50vw, 28vw",
  },
  {
    src: "/ss/Imagen30.png",
    alt: "Izaje de grupo electrógeno con grúa",
    label: "Logística e Instalación",
    className: "col-start-1 row-start-2 z-[1] rotate-1 -translate-y-3",
    sizes: "(max-width: 768px) 50vw, 28vw",
  },
  {
    src: "/ss/Imagen31.png",
    alt: "Rack con sistemas UPS Eaton",
    label: "UPS",
    className: "col-start-2 row-start-2 z-[4] -rotate-2 translate-y-1",
    sizes: "(max-width: 768px) 50vw, 28vw",
  },
];

function CollageTile({
  item,
  index,
}: {
  item: (typeof collage)[number];
  index: number;
}) {
  return (
    <motion.div
      custom={index + 2}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`group relative aspect-[4/3] min-h-[140px] sm:min-h-[160px] overflow-hidden rounded-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ${item.className}`}
      whileHover={{ scale: 1.03, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes={item.sizes}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
      <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider text-brand-primary">
        {item.label}
      </span>
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-brand-primary/0 group-hover:border-brand-primary/60 transition-colors duration-300" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-brand-lime/0 group-hover:border-brand-lime/60 transition-colors duration-300" />
    </motion.div>
  );
}

export function EnergyGeneralProjectsSection() {
  return (
    <section
      id="proyectos-generales-energia"
      className="relative bg-[#061014] text-white overflow-hidden border-b border-slate-900/60"
    >
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-brand-lime/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0}
              >
                <BrandPaletteAccent className="mb-4" />
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-primary mb-4">
                  Soluciones integrales
                </p>
                <h3 className="text-2xl md:text-3xl font-bold uppercase leading-tight text-white mb-8">
                  Proyectos de provisión, instalación y mantenimiento de:
                </h3>
                <ul className="space-y-3 mb-10">
                  {serviceBullets.map((item, i) => (
                    <ServiceBulletItem key={item.text} item={item} index={i} />
                  ))}
                </ul>
                <motion.p
                  variants={fadeUp}
                  custom={5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-sm md:text-[15px] text-gray-400 font-light leading-relaxed border-l-2 border-brand-teal/50 pl-4"
                >
                  Nuestros Proyectos Generales incluyen también aspectos arquitectónicos, tales como
                  canalizaciones y toda otra obra civil que se requiera para la concreción del
                  proyecto, tanto en interiores como en exteriores.
                </motion.p>
              </motion.div>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-petrol/10 pointer-events-none" />
              <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 relative p-2">
                {collage.map((item, i) => (
                  <CollageTile key={item.src} item={item} index={i} />
                ))}
              </div>
              <BrandPaletteAccent variant="strip" className="mt-6 rounded-full overflow-hidden opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
