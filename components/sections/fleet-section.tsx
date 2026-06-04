"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, Navigation, ShieldCheck, MapPin, type LucideIcon } from "lucide-react";
import { BrandPaletteAccent, BRAND_ACCENT_ICON } from "@/components/ui/brand-palette-accent";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const fleetVehicles = [
  {
    src: "/Flota/Imagen38.png",
    alt: "Toyota Hilux Greenworking con gráfica de data center",
    badge: "Móvil de Ingeniería",
    badgeClass: "bg-brand-primary/90 border-brand-primary text-white",
    title: "Unidad de Enlace y Redes",
    desc: "Equipada para tendido de fibra óptica y redes de alta velocidad en minería de altura y campamentos.",
    hoverClass: "group-hover:text-brand-primary",
    accent: "group-hover:border-brand-primary/40 group-hover:shadow-[0_0_30px_rgba(0,196,249,0.12)]",
  },
  {
    src: "/Flota/Imagen39.png",
    alt: "Vans Citroën y Renault de la flota Greenworking",
    badge: "Móvil de Soporte",
    badgeClass: "bg-brand-lime border-brand-lime text-[#061014]",
    title: "Unidad de Soporte 24/7",
    desc: "Móviles de respuesta ágil para el mantenimiento correctivo y preventivo de redes críticas y energía.",
    hoverClass: "group-hover:text-brand-lime",
    accent: "group-hover:border-brand-lime/40 group-hover:shadow-[0_0_30px_rgba(171,198,79,0.12)]",
  },
  {
    src: "/Flota/Imagen40.png",
    alt: "Hilux con branding de comunicaciones satelitales",
    badge: "Comunicaciones",
    badgeClass: "bg-brand-blue/90 border-brand-blue text-white",
    title: "Comunicaciones Satelitales",
    desc: "Unidades equipadas para conectividad en campo sin cobertura de telefonía celular estándar.",
    hoverClass: "group-hover:text-brand-blue",
    accent: "group-hover:border-brand-blue/40 group-hover:shadow-[0_0_30px_rgba(0,158,226,0.12)]",
  },
  {
    src: "/Flota/Imagen41.jpg",
    alt: "Pick-up 4x4 Greenworking en Patagonia",
    badge: "4x4 Patagonia",
    badgeClass: "bg-brand-teal/90 border-brand-teal text-white",
    title: "Despliegue en Terrenos Hostiles",
    desc: "Vehículos preparados para operar en climas adversos y zonas de difícil acceso del país.",
    hoverClass: "group-hover:text-brand-teal",
    accent: "group-hover:border-brand-teal/40 group-hover:shadow-[0_0_30px_rgba(0,142,191,0.12)]",
  },
];

const fleetInfo: { title: string; desc: string; icon: LucideIcon; tag: string }[] = [
  {
    title: "Logística y Soporte de Campo",
    desc: "Nuestras unidades están equipadas con instrumental de fusión óptica por arco voltaico, herramientas de medición certificadas y repuestos críticos de contingencia para resolver incidentes en tiempo récord.",
    icon: Truck,
    tag: "SLA · Campo",
  },
  {
    title: "Despliegues en Terrenos Hostiles",
    desc: "Contamos con camionetas 4x4 activas preparadas para operar en climas adversos y zonas de difícil acceso como yacimientos mineros de alta montaña o bases logísticas patagónicas.",
    icon: Navigation,
    tag: "4x4 · Minería",
  },
  {
    title: "Comunicaciones Integradas",
    desc: "Unidades móviles con soporte satelital integrado en campo para garantizar la conectividad de nuestros ingenieros y técnicos incluso en zonas sin cobertura de telefonía celular estándar.",
    icon: ShieldCheck,
    tag: "Satelital · Red",
  },
];

function FleetInfoCard({
  item,
  index,
}: {
  item: (typeof fleetInfo)[number];
  index: number;
}) {
  const Icon = item.icon;
  const accent = BRAND_ACCENT_ICON[index % BRAND_ACCENT_ICON.length];

  return (
    <motion.div
      custom={index + 1}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="group relative"
    >
      <motion.div
        className="relative flex gap-4 p-5 rounded-2xl border border-slate-800/80 bg-[#0b141b]/70 backdrop-blur-sm overflow-hidden cursor-default transition-colors duration-500 group-hover:border-brand-primary/30 group-hover:bg-[#0e1c25]/90 group-hover:shadow-[0_12px_40px_rgba(0,196,249,0.08)]"
        whileHover={{ x: 8 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <motion.span
          className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-r"
        />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(0,196,249,0.06), transparent 70%)",
          }}
        />

        <motion.div
          className={`relative shrink-0 w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-brand-primary/40 group-hover:bg-brand-petrol/30 transition-all duration-500`}
          whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
          transition={{ duration: 0.45 }}
        >
          <Icon className={`w-5 h-5 ${accent} group-hover:text-white transition-colors`} strokeWidth={1.75} />
        </motion.div>

        <div className="relative flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h4 className="text-sm font-bold text-white group-hover:text-brand-primary transition-colors duration-300">
              {item.title}
            </h4>
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border border-brand-primary/20 bg-brand-primary/5 text-brand-primary/90 opacity-70 group-hover:opacity-100 transition-opacity">
              {item.tag}
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-300">
            {item.desc}
          </p>
        </div>

        <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-slate-700 group-hover:border-brand-primary/50 transition-colors duration-300 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-slate-700 group-hover:border-brand-lime/40 transition-colors duration-300 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function FleetSection() {
  return (
    <section id="flota" className="relative bg-[#080d12] text-white overflow-hidden border-t border-slate-900">
      <div className="bg-brand-petrol py-14 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border border-brand-primary/30 rounded-lg bg-brand-teal/20 text-brand-primary text-xs font-semibold uppercase tracking-wider font-mono">
              <BrandPaletteAccent variant="dots" />
              Movilidad y Respuesta Rápida
            </div>
            <BrandPaletteAccent className="mb-4 opacity-80" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Flota corporativa equipada <br />
              <span className="text-white/90">para soporte en todo el país.</span>
            </h2>
            <p className="text-white/85 text-base md:text-lg font-light leading-relaxed">
              La ingeniería de excelencia requiere presencia física y agilidad operativa. Disponemos de una flota móvil de vehículos todo terreno (4x4) y unidades de soporte técnico equipadas con tecnología de punta para brindar soluciones on-site urgentes y certificar infraestructuras en cualquier punto de la Argentina.
            </p>
          </div>
        </div>
        <BrandPaletteAccent variant="strip" className="absolute bottom-0 inset-x-0" />
      </div>

      <div className="relative py-20 md:py-28">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-px bg-brand-primary/60" />
                <h3 className="text-xs uppercase text-brand-primary/90 tracking-[0.2em] font-semibold font-mono">
                  Capacidad Logística Móvil
                </h3>
              </motion.div>

              <div className="space-y-4">
                {fleetInfo.map((item, idx) => (
                  <FleetInfoCard key={item.title} item={item} index={idx} />
                ))}
              </div>

              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative p-5 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl flex items-start gap-4 overflow-hidden hover:border-brand-primary/35 hover:bg-brand-primary/5 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,196,249,0.08)]"
              >
                <motion.div
                  className="shrink-0 w-11 h-11 rounded-xl bg-brand-petrol/40 border border-brand-primary/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MapPin className="w-5 h-5 text-brand-primary" />
                </motion.div>
                <p className="text-xs text-gray-300 font-light leading-relaxed group-hover:text-white/90 transition-colors">
                  Nuestras bases en Buenos Aires, San Juan, Cuyo, Litoral y Patagonia coordinan la salida inmediata de móviles según acuerdos de SLA firmados.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fleetVehicles.map((vehicle, idx) => (
                <motion.div
                  key={vehicle.src}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className={`group relative bg-[#0b141b]/50 border border-slate-900 rounded-2xl p-3 flex flex-col overflow-hidden transition-all duration-500 shadow-xl ${vehicle.accent}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <div className="relative overflow-hidden rounded-xl h-[200px] sm:h-[210px] md:h-[220px] bg-gradient-to-b from-[#0c151c] via-[#081018] to-[#050a0f] border border-slate-800/80">
                    <Image
                      src={vehicle.src}
                      alt={vehicle.alt}
                      fill
                      className="object-contain object-center p-3 sm:p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061014]/80 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <div
                      className={`absolute top-2 left-2 px-1.5 py-0.5 border rounded text-[8px] font-mono uppercase tracking-widest z-10 font-bold ${vehicle.badgeClass}`}
                    >
                      {vehicle.badge}
                    </div>
                  </div>
                  <div className="pt-4 px-2 pb-1">
                    <h4 className={`text-sm font-bold text-white transition-colors ${vehicle.hoverClass}`}>
                      {vehicle.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-1 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                      {vehicle.desc}
                    </p>
                  </div>
                  <motion.div
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
