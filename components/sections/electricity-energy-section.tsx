"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Gauge,
  Anchor,
  ShieldCheck,
  LayoutGrid,
  Cable,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BrandPaletteAccent } from "@/components/ui/brand-palette-accent";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const projectBullets: { text: string; icon: LucideIcon }[] = [
  { text: "Sistemas de potencia y de distribución.", icon: Gauge },
  { text: "Instalación y puesta a tierra, posicionamiento y manipulación.", icon: Anchor },
  { text: "Medición y Certificación de puesta a tierra.", icon: ShieldCheck },
  { text: "Tableros.", icon: LayoutGrid },
  { text: "Cableado.", icon: Cable },
];

/** Icono del slide: rayo central + flechas circulares de respaldo */
function EnergyBackupIcon() {
  return (
    <div className="relative mb-8 w-[5.5rem] h-[5.5rem]">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/25"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-1 rounded-full border border-white/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <svg viewBox="0 0 88 88" className="relative w-full h-full drop-shadow-lg" aria-hidden>
        <defs>
          <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f7fa" />
          </linearGradient>
        </defs>
        {/* Flecha circular superior */}
        <motion.path
          d="M44 14 A30 30 0 0 1 68 44"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <path d="M66 38 L72 44 L66 50" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        {/* Flecha circular inferior */}
        <motion.path
          d="M44 74 A30 30 0 0 1 20 44"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
        />
        <path d="M22 50 L16 44 L22 38" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        {/* Rayo central */}
        <motion.path
          d="M44 26 L36 44 H44 L40 62 L52 42 H44 Z"
          fill="url(#boltGrad)"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          style={{ transformOrigin: "44px 44px" }}
        />
      </svg>
    </div>
  );
}

function ProjectBulletItem({
  item,
  index,
}: {
  item: (typeof projectBullets)[number];
  index: number;
}) {
  const Icon = item.icon;
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
        className="relative flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm overflow-hidden cursor-default transition-colors duration-300 group-hover:border-brand-primary-light/40 group-hover:bg-white/[0.1]"
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.span
          className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary-light scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-r"
          layout={false}
        />
        <div className="relative shrink-0 w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-brand-primary-light/50 group-hover:shadow-[0_0_16px_rgba(0,196,249,0.3)] transition-all duration-300">
          <Icon className="w-5 h-5 text-brand-primary-light group-hover:text-white transition-colors" strokeWidth={1.75} />
        </div>
        <p className="text-sm md:text-[15px] text-white/80 font-light leading-relaxed group-hover:text-white transition-colors pt-1.5">
          {item.text}
        </p>
      </motion.div>
    </motion.li>
  );
}

const gallery = [
  {
    src: "/ss/Imagen24.png",
    alt: "Tablero eléctrico con disyuntores",
    label: "Tableros",
    className: "min-h-[150px]",
  },
  {
    src: "/ss/Imagen14.jpg",
    alt: "Cableado estructurado en piso técnico",
    label: "Cableado",
    className: "min-h-[150px]",
  },
  {
    src: "/ss/Imagen26.jpg",
    alt: "Grupo electrógeno en jaula de seguridad",
    label: "Generación",
    className: "col-span-2 min-h-[200px] lg:min-h-[220px]",
  },
  {
    src: "/ss/Imagen27.png",
    alt: "Bandejas portacables y fibra",
    label: "Distribución",
    className: "col-span-2 lg:col-span-1 min-h-[150px]",
  },
];

function GalleryTile({
  item,
  index,
}: {
  item: (typeof gallery)[number];
  index: number;
}) {
  return (
    <motion.div
      custom={index + 2}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 ${item.className}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider text-cyan-200/90">
        {item.label}
      </span>
      <motion.div
        className="absolute inset-0 border-2 border-cyan-400/0 group-hover:border-cyan-400/40 rounded-xl transition-colors duration-500 pointer-events-none"
      />
    </motion.div>
  );
}

export function ElectricityEnergySection() {
  return (
    <section
      id="energia-electrica"
      className="relative bg-[#061014] text-white overflow-hidden border-b border-slate-900/60"
    >
      {/* ── Bloque 1: split slide electricidad ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[480px]">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center justify-center px-8 py-16 lg:py-20 text-center bg-brand-primary overflow-hidden"
        >
          <BrandPaletteAccent variant="strip" className="absolute bottom-0 inset-x-0 z-10" />
          <motion.div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, white 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.15) 0%, transparent 40%)",
            }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <EnergyBackupIcon />
          <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold uppercase leading-snug tracking-wide text-white max-w-xs">
            Electricidad, Generación y Respaldo de Energía
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative min-h-[280px] lg:min-h-full"
        >
          <Image
            src="/ss/Imagen44.jpg"
            alt="Grupos electrógenos Caterpillar en sala técnica"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-black/30 lg:from-brand-primary/30" />
          <motion.div
            className="absolute bottom-0 inset-x-0 h-1 bg-brand-primary"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      </div>

      {/* ── Bloque 2: proyectos + galería ── */}
      <div className="relative py-20 md:py-28 overflow-hidden bg-brand-petrol">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0}
              >
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-primary-light/90 mb-4">
                  Infraestructura eléctrica
                </p>
                <h3 className="text-2xl md:text-3xl font-bold uppercase leading-tight text-white mb-8">
                  Proyectos de provisión, instalación y mantenimiento de:
                </h3>
                <ul className="space-y-3">
                  {projectBullets.map((item, i) => (
                    <ProjectBulletItem key={item.text} item={item} index={i} />
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
              {gallery.map((item, i) => (
                <GalleryTile key={item.src} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
