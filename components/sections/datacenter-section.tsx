"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Cable,
  Network,
  Eye,
  Award,
  Wrench,
  CheckCircle2,
  Compass,
  Layers,
  Zap,
  Thermometer,
  ShieldAlert,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const PARTNER_BRANDS = ["PANDUIT", "SIEMON", "AMP", "FURUKAWA"] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

const pillars = [
  {
    icon: Server,
    title: "Diseño de DATACENTERS y Salas Técnicas",
    desc: "De acuerdo a las necesidades de cada cliente, priorizando el monitoreo remoto de sus componentes y de su ambiente.",
    highlights: ["Monitoreo remoto 24/7", "Salas técnicas a medida", "Componentes y ambiente supervisados"],
  },
  {
    icon: Network,
    title: "Cableado Estructurado",
    subtitle: "Diseño, Instalación, Certificación y Mantenimiento",
    desc: "Somos Diseñadores e Instaladores Oficiales de PANDUIT, SIEMON, AMP y FURUKAWA. Esta relación permite al cliente contar con la responsabilidad unificada del instalador, distribuidor y fabricante, garantizando el sistema de cableado según normas y estándares internacionales, durante 28 años.",
    highlights: ["Certificación oficial", "Garantía 28 años", "Normas internacionales"],
  },
  {
    icon: Cable,
    title: "Redes de Fibra Óptica",
    subtitle: "Diseño, integración, reparación y mantenimiento",
    desc: "Certificación de redes con instrumental propio (FLUKE y OTDR), asegurando enlaces ópticos confiables y documentados para operación crítica.",
    highlights: ["FLUKE Networks", "Reflectometría OTDR", "Mantenimiento integral"],
  },
];

const rackFeatures = [
  { icon: Compass, title: "Diseño de Salas Técnicas", desc: "Distribución optimizada del espacio, pasillos de servicio y confinamiento térmico. Obra civil para blindaje contra incendios e inundaciones." },
  { icon: Layers, title: "Organización de Racks e Hilos", desc: "Gabinetes de alta densidad (42U/45U) con organizadores de cables verticales y horizontales de alta resistencia." },
  { icon: Cpu, title: "Cableado de Ultra-Alta Densidad", desc: "Troncales de fibra óptica MPO/MTP y cobre Cat6A/Cat8 certificados. Enrutamiento ordenado en bandejas portacables." },
  { icon: Zap, title: "Sistemas UPS y Energía Crítica", desc: "UPS trifásicas modulares redundantes (N+1) hot-swappable sin interrumpir la operación del servidor." },
  { icon: Thermometer, title: "Climatización de Precisión", desc: "Enfriamiento controlando temperatura, humedad y filtrado del aire en racks y pasillos frío/caliente." },
  { icon: ShieldAlert, title: "CCTV y Control de Acceso", desc: "Acceso biométrico en entrada de sala y puertas de rack. Videovigilancia de alta resolución integrada." },
  { icon: Eye, title: "Monitoreo Ambiental 24/7", desc: "Sensores en racks para alertar sobre fugas, humo, aperturas de puertas o picos de temperatura en tiempo real." },
  { icon: Server, title: "Mantenimiento Integral IT", desc: "Limpieza técnica de data centers activos y diagnóstico termográfico de puntos calientes en tableros." },
];

function getRackUnitActive(i: number, activeArea: number | null) {
  if (activeArea === null) return false;
  return (
    (activeArea < 3 && i < 3) ||
    (activeArea >= 3 && activeArea < 5 && i >= 3 && i < 6) ||
    (activeArea >= 5 && i >= 6)
  );
}

export function DatacenterSection() {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <section
      id="data-centers"
      className="relative py-24 md:py-32 bg-[#061014] text-white overflow-hidden border-b border-slate-900"
    >
      {/* Orbes animados */}
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#00c4f9]/8 rounded-full blur-[100px] pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16 md:mb-20">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider"
                whileHover={{ scale: 1.04, borderColor: "rgba(52, 211, 153, 0.5)" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="w-3.5 h-3.5" />
                </motion.span>
                Infraestructura Crítica
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Diseño de{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-blue to-brand-teal inline-block"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  DATACENTERS
                </motion.span>{" "}
                y Salas Técnicas
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                Diseñamos, implementamos y certificamos infraestructura de misión crítica:
                salas técnicas con monitoreo remoto, cableado estructurado de clase mundial y
                redes de fibra óptica con respaldo metrológico propio.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {PARTNER_BRANDS.map((brand, i) => (
                  <motion.span
                    key={brand}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                      boxShadow: "0 0 20px rgba(52, 211, 153, 0.25)",
                      borderColor: "rgba(52, 211, 153, 0.6)",
                    }}
                    className="px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-md border border-emerald-500/25 bg-emerald-950/30 text-emerald-400/90 cursor-default transition-colors"
                  >
                    {brand}
                  </motion.span>
                ))}
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-md border border-slate-700 bg-slate-900/60 text-gray-400"
                >
                  FLUKE · OTDR
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setImageHovered(true)}
              onHoverEnd={() => setImageHovered(false)}
            >
              <motion.div
                className="absolute -top-4 -right-4 lg:-right-8 w-[85%] h-[90%] rounded-2xl border border-emerald-500/20 bg-emerald-500/5 rotate-3 pointer-events-none"
                animate={{ rotate: [3, 5, 3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <motion.div
                className="absolute -bottom-3 -left-4 lg:-left-8 w-[80%] h-[85%] rounded-2xl border border-[#00c4f9]/15 bg-[#00c4f9]/5 -rotate-2 pointer-events-none"
                animate={{ rotate: [-2, -4, -2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <motion.div
                className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_24px_64px_rgba(0,0,0,0.5)] group bg-[#0b141b]/90"
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(52, 211, 153, 0.55)",
                  boxShadow: "0 28px 72px rgba(0, 196, 249, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-[#00c4f9]/10 z-[5] pointer-events-none"
                  animate={{ opacity: imageHovered ? 1 : 0.3 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex items-center justify-center p-4 md:p-6 min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
                  <motion.img
                    src="/images/datacenter-salas-tecnicas.png"
                    alt="Edificio con data center, sala de monitoreo NOC y cableado estructurado"
                    className="w-full h-auto max-h-[200px] sm:max-h-[260px] lg:max-h-[340px] object-contain relative z-10"
                    loading="eager"
                    animate={{ y: imageHovered ? -6 : [0, -8, 0] }}
                    transition={
                      imageHovered
                        ? { type: "spring", stiffness: 200, damping: 18 }
                        : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061014]/90 via-[#061014]/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-3">
                  <motion.div
                    className="px-3 py-2 rounded-lg bg-[#0b141b]/90 border border-emerald-500/30 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                      SYS_MONITOR // LIVE
                    </p>
                    <p className="text-xs text-gray-300 font-light mt-0.5">
                      Data center · NOC · Cableado certificado
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/40"
                    animate={{ boxShadow: ["0 0 0 rgba(0,196,249,0)", "0 0 12px rgba(0,196,249,0.4)", "0 0 0 rgba(0,196,249,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
                  </motion.div>
                </div>
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-400 z-20 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-400 z-20 pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={index}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  borderColor: "rgba(52, 211, 153, 0.35)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35), 0 0 30px rgba(0, 196, 249, 0.08)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative flex flex-col p-6 md:p-7 rounded-2xl border border-slate-800/80 bg-[#0b141b]/70 overflow-hidden group cursor-default"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-[#00c4f9]/0 group-hover:from-emerald-500/5 group-hover:to-[#00c4f9]/5 transition-colors duration-500 pointer-events-none"
                />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <motion.div
                    className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/20 group-hover:border-emerald-500/50"
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                  <span className="text-[10px] font-mono text-gray-500">
                    0{index + 1} / 03
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 leading-snug relative z-10 group-hover:text-emerald-50 transition-colors">
                  {pillar.title}
                </h3>
                {"subtitle" in pillar && pillar.subtitle && (
                  <p className="text-xs text-emerald-400/90 font-medium mb-3 relative z-10">
                    {pillar.subtitle}
                  </p>
                )}
                <p className="text-sm text-gray-400 font-light leading-relaxed flex-1 relative z-10 group-hover:text-gray-300 transition-colors">
                  {pillar.desc}
                </p>
                <ul className="mt-5 space-y-2 pt-4 border-t border-slate-800/60 relative z-10">
                  {pillar.highlights.map((item, hi) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-2 text-xs text-gray-300"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + hi * 0.06 }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h3 className="text-xs uppercase text-slate-400 tracking-wider font-semibold mb-2">
                Desglose de Componentes Críticos:
              </h3>
              <p className="text-xs text-gray-500 font-light mb-1">
                Pasá el cursor sobre cada ítem para iluminar el rack.
              </p>
              <div className="space-y-3">
                {rackFeatures.map((feat, index) => {
                  const Icon = feat.icon;
                  const isActive = activeArea === index;
                  return (
                    <motion.div
                      key={index}
                      layout
                      onMouseEnter={() => setActiveArea(index)}
                      onMouseLeave={() => setActiveArea(null)}
                      onClick={() => setActiveArea(isActive ? null : index)}
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        borderColor: isActive
                          ? "rgba(52, 211, 153, 0.5)"
                          : "rgba(15, 23, 42, 1)",
                        backgroundColor: isActive
                          ? "rgba(6, 78, 59, 0.2)"
                          : "rgba(11, 20, 27, 0.5)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      className={`p-4 rounded-xl border cursor-pointer ${
                        isActive
                          ? "text-white shadow-[0_0_20px_rgba(0,196,249,0.12)]"
                          : "text-gray-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="p-2 rounded-lg"
                          animate={{
                            backgroundColor: isActive
                              ? "rgba(6, 78, 59, 0.4)"
                              : "rgb(15 23 42)",
                            scale: isActive ? 1.1 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        >
                          <Icon
                            className={`w-5 h-5 ${isActive ? "text-emerald-400" : "text-gray-400"}`}
                          />
                        </motion.div>
                        <div>
                          <h4
                            className={`text-sm font-bold transition-colors ${
                              isActive ? "text-emerald-400" : "text-white"
                            }`}
                          >
                            {feat.title}
                          </h4>
                          <p className="text-xs font-light text-gray-400 leading-relaxed mt-1">
                            {feat.desc}
                          </p>
                        </div>
                        <motion.div
                          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                          className="ml-auto"
                        >
                          <ArrowRight className="w-4 h-4 text-emerald-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              className="lg:col-span-7 bg-[#0b141b]/40 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between items-center relative min-h-[500px] overflow-hidden"
              whileHover={{ borderColor: "rgba(52, 211, 153, 0.25)" }}
              animate={{
                boxShadow:
                  activeArea !== null
                    ? "0 0 48px rgba(0, 196, 249, 0.1)"
                    : "0 0 0 rgba(0, 196, 249, 0)",
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] rounded-2xl"
                animate={{ backgroundPosition: ["0px 0px", "24px 24px"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10 w-full flex justify-between items-center bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 text-xs">
                <span className="font-mono text-gray-400">
                  Esquema Técnico de Data Center (2D Blueprint)
                </span>
                <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sistemas en Redundancia
                </span>
              </div>

              <motion.div
                className="relative z-10 my-10 w-full max-w-[450px] aspect-[4/5] bg-slate-950/90 border border-sky-500/20 rounded-xl shadow-[0_0_40px_rgba(2,132,199,0.08)] p-6 flex flex-col justify-between overflow-hidden"
                animate={
                  activeArea !== null
                    ? { scale: 1.02, borderColor: "rgba(52, 211, 153, 0.4)" }
                    : { scale: 1, borderColor: "rgba(14, 165, 233, 0.2)" }
                }
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <AnimatePresence>
                  {activeArea !== null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-emerald-500/5 pointer-events-none z-0"
                    />
                  )}
                </AnimatePresence>

                <div className="absolute top-2 right-3 text-[9px] font-mono text-sky-500/30">
                  DIMENSIONS: 800mm x 1200mm
                </div>
                <div className="absolute bottom-2 left-3 text-[9px] font-mono text-sky-500/30">
                  SCALE: 1:20 | RACK #01-A
                </div>

                <div className="absolute top-0 bottom-0 left-6 w-1 bg-sky-500/20 border-r border-sky-500/40" />
                <div className="absolute top-0 bottom-0 right-6 w-1 bg-sky-500/20 border-l border-sky-500/40" />

                <div className="space-y-2.5 w-full flex-1 flex flex-col justify-center py-4 relative z-10">
                  {[...Array(9)].map((_, i) => {
                    const isHovered = getRackUnitActive(i, activeArea);
                    return (
                      <motion.div
                        key={i}
                        layout
                        animate={{
                          scale: isHovered ? 1.04 : 1,
                          backgroundColor: isHovered
                            ? "rgba(6, 78, 59, 0.4)"
                            : "rgba(15, 23, 42, 0.6)",
                          borderColor: isHovered
                            ? "rgba(52, 211, 153, 1)"
                            : "rgba(30, 41, 59, 1)",
                          boxShadow: isHovered
                            ? "0 0 14px rgba(0, 196, 249, 0.35)"
                            : "0 0 0 rgba(0, 0, 0, 0)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 26 }}
                        className="relative w-[90%] mx-auto h-[6%] border flex items-center justify-between px-3 rounded"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-[8px] font-mono text-slate-500">
                            U{9 - i}
                          </span>
                          <div className="h-1 bg-slate-800 flex-1 rounded-full overflow-hidden relative">
                            <motion.div
                              className="h-full absolute left-0 top-0 bg-emerald-400"
                              animate={{ width: isHovered ? "80%" : "45%" }}
                              transition={{ duration: 0.45, ease: "easeOut" }}
                            />
                            {!isHovered && (
                              <motion.div
                                className="h-full absolute left-0 top-0 bg-sky-500/50"
                                animate={{ width: ["30%", "55%", "30%"] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1.5 ml-2.5">
                          {[0, 1].map((led) => (
                            <motion.span
                              key={led}
                              className="w-1.5 h-1.5 rounded-full"
                              animate={{
                                backgroundColor: isHovered
                                  ? "rgb(52 211 153)"
                                  : "rgb(51 65 85)",
                                scale: isHovered ? [1, 1.3, 1] : 1,
                              }}
                              transition={
                                isHovered
                                  ? { duration: 0.8, repeat: Infinity, delay: led * 0.2 }
                                  : { duration: 0.3 }
                              }
                            />
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.a
                href="#contacto"
                className="relative z-10 w-full py-4 bg-brand-primary hover:bg-brand-teal rounded-xl font-bold text-center text-sm block overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 28px rgba(0, 196, 249, 0.35)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">Diseñemos la infraestructura de tu data center</span>
              </motion.a>
            </motion.div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.01,
              boxShadow: "0 16px 40px rgba(0, 196, 249, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="p-6 md:p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-[#0b141b]/80 flex flex-col sm:flex-row gap-5 items-start"
          >
            <motion.div
              className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30"
              whileHover={{ rotate: 12, scale: 1.1 }}
            >
              <Award className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">
                Instaladores Oficiales — Garantía 28 años
              </h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Como partners de PANDUIT, SIEMON, AMP y FURUKAWA, ofrecemos
                responsabilidad unificada entre instalador, distribuidor y fabricante.
                Tu sistema de cableado queda respaldado por normas y estándares
                internacionales durante 28 años.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{
              y: -6,
              scale: 1.01,
              borderColor: "rgba(52, 211, 153, 0.3)",
            }}
            className="p-6 md:p-8 rounded-2xl border border-slate-800/80 bg-[#0b141b]/60 flex flex-col sm:flex-row gap-5 items-start"
          >
            <motion.div
              className="p-3 rounded-xl bg-slate-900 border border-slate-700"
              whileHover={{ rotate: -12, scale: 1.1 }}
            >
              <Wrench className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">
                Certificación con instrumental propio
              </h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Certificamos redes de cobre y fibra óptica con equipos FLUKE y OTDR
                de última generación. Informes técnicos detallados para auditoría,
                entrega de obra y mantenimiento preventivo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
