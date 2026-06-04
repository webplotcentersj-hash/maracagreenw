"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wind,
  Box,
  Cloud,
  Fan,
  Building2,
  Package,
  Droplets,
  ArrowLeftRight,
  LayoutPanelTop,
  Wrench,
  Calendar,
  Activity,
  Radio,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BrandPaletteAccent, BRAND_ACCENT_ICON } from "@/components/ui/brand-palette-accent";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/** Icono del slide: copo + flechas circulares frío/calor */
function HvacCycleIcon() {
  return (
    <div className="relative w-[5.5rem] h-[5.5rem] md:w-[6.5rem] md:h-[6.5rem]">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/25"
        animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-1 rounded-full border border-white/35"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      <svg viewBox="0 0 88 88" className="relative w-full h-full drop-shadow-lg" aria-hidden>
        <motion.path
          d="M44 12 A32 32 0 0 1 72 44"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
        />
        <path d="M70 38 L76 44 L70 50" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <motion.path
          d="M44 76 A32 32 0 0 1 16 44"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <path d="M18 50 L12 44 L18 38" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Copo central */}
        <g stroke="white" strokeWidth="2" strokeLinecap="round">
          <line x1="44" y1="28" x2="44" y2="60" />
          <line x1="28" y1="44" x2="60" y2="44" />
          <line x1="32.7" y1="32.7" x2="55.3" y2="55.3" />
          <line x1="55.3" y1="32.7" x2="32.7" y2="55.3" />
          <line x1="44" y1="28" x2="38" y2="34" />
          <line x1="44" y1="28" x2="50" y2="34" />
          <line x1="44" y1="60" x2="38" y2="54" />
          <line x1="44" y1="60" x2="50" y2="54" />
          <line x1="28" y1="44" x2="34" y2="38" />
          <line x1="28" y1="44" x2="34" y2="50" />
          <line x1="60" y1="44" x2="54" y2="38" />
          <line x1="60" y1="44" x2="54" y2="50" />
        </g>
      </svg>
    </div>
  );
}

function BulletItem({
  text,
  icon: Icon,
  index,
  variant = "petrol",
}: {
  text: string;
  icon: LucideIcon;
  index: number;
  variant?: "petrol" | "dark";
}) {
  const accent = BRAND_ACCENT_ICON[index % BRAND_ACCENT_ICON.length];
  const cardBg =
    variant === "petrol"
      ? "border-white/10 bg-white/[0.06] group-hover:bg-white/[0.1]"
      : "border-brand-primary/10 bg-[#0b141b]/60 group-hover:bg-[#0e1c25]/80";

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
        className={`relative flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-sm overflow-hidden cursor-default transition-colors duration-300 group-hover:border-brand-primary/35 ${cardBg}`}
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-r" />
        <span className="w-2.5 h-2.5 rounded-sm bg-brand-primary shadow-[0_0_8px_rgba(0,196,249,0.45)] shrink-0 mt-2 group-hover:scale-110 transition-transform" />
        <div className="w-9 h-9 rounded-lg bg-brand-petrol/40 border border-brand-primary/20 flex items-center justify-center shrink-0 group-hover:border-brand-primary/50 transition-all">
          <Icon className={`w-4 h-4 ${accent} group-hover:text-white transition-colors`} strokeWidth={1.75} />
        </div>
        <p className="text-sm text-white/80 font-light leading-relaxed group-hover:text-white transition-colors pt-1.5">
          {text}
        </p>
      </motion.div>
    </motion.li>
  );
}

const commercialBullets: { text: string; icon: LucideIcon }[] = [
  { text: "VRF", icon: Wind },
  { text: "Equipos paquete compactos", icon: Box },
  { text: "Sistema de Aire Exterior Dedicado", icon: Cloud },
  { text: "Condensadores", icon: Fan },
  { text: "Unidades de Techo", icon: Building2 },
  { text: "Unidades paquete", icon: Package },
];

const maintenanceBullets: { text: string; icon: LucideIcon }[] = [
  { text: "Evaporadores", icon: Droplets },
  { text: "Intercambiadores de calor", icon: ArrowLeftRight },
  { text: "Paneles de control", icon: LayoutPanelTop },
  { text: "Refacciones", icon: Wrench },
  { text: "Planes de mantenimiento", icon: Calendar },
  { text: "Servicios de diagnóstico predictivo", icon: Activity },
  { text: "Monitoreo y operaciones remotos", icon: Radio },
  { text: "Servicios de reparación", icon: Hammer },
];

function GalleryTile({
  src,
  alt,
  label,
  className,
  index,
  sizes,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  index: number;
  sizes: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] ${className ?? "min-h-[160px]"}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes={sizes} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-85" />
      <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider text-brand-primary">{label}</span>
    </motion.div>
  );
}

export function RefrigerationHvacSection() {
  return (
    <section id="refrigeracion-calefaccion" className="relative bg-[#061014] text-white overflow-hidden border-b border-slate-900/60">
      {/* ── Bloque 1: hero refrigeración ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] min-h-[400px] lg:min-h-[460px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[280px] lg:min-h-full order-2 lg:order-1"
        >
          <Image
            src="/ss/Imagen32.jpg"
            alt="Chiller industrial en azotea con skyline urbano"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-primary/25 lg:to-brand-primary/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-end justify-center px-8 py-14 lg:py-20 text-right bg-brand-primary overflow-hidden order-1 lg:order-2"
        >
          <BrandPaletteAccent variant="strip" className="absolute bottom-0 inset-x-0 z-10" />
          <motion.div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 45%)",
            }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold uppercase leading-snug tracking-wide text-white max-w-xs mb-10 relative z-10">
            Refrigeración y Calefacción
          </h2>
          <div className="relative z-10">
            <HvacCycleIcon />
          </div>
        </motion.div>
      </div>

      {/* ── Bloque 2: equipos comerciales e industriales ── */}
      <div className="relative py-20 md:py-28 overflow-hidden bg-brand-petrol">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
            <ScrollReveal>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={0}>
                <BrandPaletteAccent className="mb-4 opacity-90" />
                <h3 className="text-xl md:text-2xl lg:text-[1.4rem] font-bold uppercase leading-snug text-white mb-8">
                  Instalación, reparación y mantenimiento de equipos de refrigeración comerciales e industriales
                </h3>
                <ul className="space-y-2.5">
                  {commercialBullets.map((item, i) => (
                    <BulletItem key={item.text} text={item.text} icon={item.icon} index={i} variant="petrol" />
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3 auto-rows-[minmax(140px,auto)]">
              <GalleryTile
                src="/ss/Imagen35.png"
                alt="Técnico en mantenimiento de equipo de refrigeración"
                label="Mantenimiento"
                className="col-span-1 row-span-2 min-h-[280px]"
                index={1}
                sizes="(max-width: 768px) 45vw, 22vw"
              />
              <GalleryTile
                src="/ss/Imagen34.png"
                alt="Unidades condensadoras BGH en fachada"
                label="Condensadoras"
                className="col-span-1 min-h-[135px]"
                index={2}
                sizes="(max-width: 768px) 45vw, 22vw"
              />
              <GalleryTile
                src="/ss/Imagen33.jpg"
                alt="Equipos Goodman en sala técnica"
                label="Equipos Paquete"
                className="col-span-1 min-h-[135px]"
                index={3}
                sizes="(max-width: 768px) 45vw, 22vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bloque 3: componentes y servicios ── */}
      <div className="relative py-20 md:py-28 overflow-hidden bg-[#061014]">
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={0}>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-primary mb-4">Componentes y soporte</p>
                <h3 className="text-xl md:text-2xl font-bold uppercase leading-snug text-white mb-8">
                  Instalación, reparación y mantenimiento de equipos de refrigeración comerciales e industriales
                </h3>
                <ul className="space-y-2.5">
                  {maintenanceBullets.map((item, i) => (
                    <BulletItem key={item.text} text={item.text} icon={item.icon} index={i} variant="dark" />
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>

            <div className="relative grid grid-cols-1 gap-4">
              <GalleryTile
                src="/ss/Imagen37.jpg"
                alt="Evaporadores industriales montados en pared"
                label="Evaporadores"
                className="min-h-[200px] z-[2]"
                index={1}
                sizes="(max-width: 768px) 90vw, 40vw"
              />
              <GalleryTile
                src="/ss/Imagen36.png"
                alt="Condensadores en azotea al atardecer"
                label="Condensadores"
                className="min-h-[200px] -mt-16 ml-8 lg:ml-12 z-[3] border-brand-primary/20"
                index={2}
                sizes="(max-width: 768px) 90vw, 40vw"
              />
              <BrandPaletteAccent variant="strip" className="mt-2 rounded-full overflow-hidden opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
