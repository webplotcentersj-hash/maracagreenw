"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Router,
  Shield,
  Server,
  Phone,
  Flame,
  ScanSearch,
  GlobeLock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

const serviceBlocks = [
  {
    icon: Router,
    title: "Equipamiento de Redes",
    color: "emerald",
    items: [
      "Definición, Suministro e Instalación de SWITCHES, ROUTERS, ACCESS POINT y cualquier otro Sistema de Gestión de Red y de Comunicación de Datos.",
      "IP Telephony, VoIP.",
    ],
    bullets: ["Switches y routers", "Access Points", "Telefonía IP / VoIP"],
  },
  {
    icon: Shield,
    title: "Seguridad en Redes",
    color: "cyan",
    items: [
      "Firewalls",
      "Sistemas de protección contra intrusos (IPS)",
      "Estudios de vulnerabilidad de Red",
      "Control de acceso corporativo a Internet",
    ],
    bullets: ["Firewall", "IPS", "Pentesting / vulnerabilidades"],
  },
  {
    icon: Server,
    title: "Sistemas Operativos de Red (Microinformática)",
    color: "emerald",
    items: [
      "Nuestro personal está calificado para instalar y configurar los sistemas operativos más utilizados: Windows Server, Novell, Unix, Linux.",
      "Migración de Sistemas Operativos completos, con perfil de usuario, back-up y reinstalaciones.",
    ],
    bullets: ["Windows Server", "Linux / Unix", "Migración y backup"],
  },
];

const galleryImages = [
  {
    src: "/ss/Imagen13.png",
    alt: "Switches, routers y equipamiento de red",
    label: "Equipamiento activo",
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    src: "/ss/Imagen14.jpg",
    alt: "Cableado estructurado bajo piso técnico",
    label: "Cableado certificado",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/ss/Imagen15.png",
    alt: "Sistema de detección de intrusión perimetral",
    label: "Seguridad perimetral",
    span: "lg:col-span-2 lg:row-span-1",
  },
];

export function EnergySecuritySection() {
  return (
    <section
      id="energia-seguridad"
      className="relative py-24 md:py-32 bg-[#061014] text-white overflow-hidden border-b border-slate-900/60"
    >
      <motion.div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/6 rounded-full blur-[130px] pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#00c4f9]/6 rounded-full blur-[110px] pointer-events-none"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider"
              whileHover={{ scale: 1.04 }}
            >
              <GlobeLock className="w-3.5 h-3.5" />
              Conectividad &amp; Ciberseguridad
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
              Redes,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-blue to-brand-teal">
                Seguridad
              </span>{" "}
              y Sistemas
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              Infraestructura de red integral: equipamiento activo, protección perimetral
              y plataformas de servidor bajo estándares corporativos.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Bloques de servicio */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {serviceBlocks.map((block, index) => {
              const Icon = block.icon;
              return (
                <motion.article
                  key={block.title}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(52, 211, 153, 0.35)",
                    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="relative p-6 md:p-7 rounded-2xl border border-slate-800/80 bg-[#0b141b]/75 overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500/80 to-[#00c4f9]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/25 flex-shrink-0"
                      whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
                      transition={{ duration: 0.45 }}
                    >
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-sm bg-[#00c4f9] flex-shrink-0" />
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-emerald-50 transition-colors">
                          {block.title}
                        </h3>
                      </div>
                      <ul className="space-y-3 mb-4">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-gray-300 font-light leading-relaxed pl-1"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {block.bullets.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide rounded-md border border-slate-800 bg-slate-900/60 text-gray-400 group-hover:border-emerald-500/20 group-hover:text-emerald-400/80 transition-colors"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 p-4 rounded-xl border border-slate-800/60 bg-slate-900/30"
            >
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Phone className="w-4 h-4 text-emerald-400" />
                VoIP corporativo
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Flame className="w-4 h-4 text-[#00c4f9]" />
                Firewall &amp; IPS
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ScanSearch className="w-4 h-4 text-emerald-400" />
                Estudios de vulnerabilidad
              </div>
            </motion.div>
          </div>

          {/* Galería visual — layout bento */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4 auto-rows-[minmax(120px,auto)]">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.src}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative rounded-xl overflow-hidden border border-emerald-500/20 bg-[#0b141b]/80 group ${img.span}`}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(52, 211, 153, 0.5)",
                  boxShadow: "0 20px 48px rgba(0, 196, 249, 0.12)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#061014]/90 via-[#061014]/20 to-transparent z-10 pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    index === 1 ? "h-full min-h-[220px] lg:min-h-[320px]" : "h-36 sm:h-40 lg:h-44"
                  }`}
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <span className="inline-block px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-[#0b141b]/90 border border-emerald-500/30 rounded-md backdrop-blur-sm">
                    {img.label}
                  </span>
                </div>
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-400/70 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-emerald-400/70 z-20 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <motion.a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-teal rounded-xl font-bold text-sm shadow-[0_0_24px_rgba(0,196,249,0.2)] transition-colors"
            whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(0, 196, 249, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            Consultá por redes y seguridad
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
