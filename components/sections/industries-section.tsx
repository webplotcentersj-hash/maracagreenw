"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  ScanFace,
  Smartphone,
  QrCode,
  CreditCard,
  Fingerprint,
  Users,
  Car,
  Thermometer,
  Eye,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { NetworkTopologyDiagram, cctvTopology } from "@/components/ui/network-topology-diagram";
import { AccessTopologyDiagram } from "@/components/ui/access-topology-diagram";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const heroCameras = [
  {
    src: "/ss/Imagen17.png",
    alt: "Cámara domo CCTV",
    className: "top-[5%] left-[3%] w-[46%] -rotate-2 z-10",
  },
  {
    src: "/ss/ChatGPT%20Image%204%20jun%202026%2C%2009_19_47.png",
    alt: "Cámara PTZ",
    className: "top-[30%] left-[18%] w-[60%] rotate-1 z-20",
  },
  {
    src: "/ss/ChatGPT%20Image%204%20jun%202026%2C%2009_20_49.png",
    alt: "Cámaras bullet",
    className: "bottom-[6%] right-[2%] w-[52%] rotate-2 z-15",
  },
];

const accessMethods = [
  {
    id: "facial",
    icon: ScanFace,
    label: "Reconocimiento Facial",
    desc: "Biometría facial en tiempo real para accesos de alta seguridad.",
    thumb: "/ss/Imagen17.png",
    orbitClass: "top-[2%] left-1/2 -translate-x-1/2",
  },
  {
    id: "mobile",
    icon: Smartphone,
    label: "Acceso Móvil",
    desc: "Credenciales digitales vía smartphone y lectores NFC/Bluetooth.",
    thumb: "/ss/Imagen18.png",
    orbitClass: "top-[38%] -translate-y-1/2 right-[2%]",
  },
  {
    id: "qr",
    icon: QrCode,
    label: "QR y Código de Barras",
    desc: "Visitas y proveedores con códigos dinámicos escaneables.",
    thumb: "/ss/Imagen15.png",
    orbitClass: "bottom-[8%] left-[4%]",
  },
  {
    id: "rfid",
    icon: CreditCard,
    label: "Tarjeta RFID",
    desc: "Proximidad clásica para flujos corporativos de alto volumen.",
    thumb: "/ss/Imagen16.png",
    orbitClass: "bottom-[8%] right-[4%]",
  },
];

const cctvBullets = [
  "Diseño, Instalación, Certificación y Mantenimiento de Sistemas de CCTV.",
  "Provisión de sistemas con cámaras inteligentes, térmicas, reconocimiento vehicular, conteo de personas, monitoreo de área estéril y reconocimiento humano.",
  "Técnicos certificados en las líneas Hikvision y Provision, marcas de alta calidad técnica para soluciones CCTV.",
];

const accessBullets = [
  "Diseño, Instalación, Certificación y Mantenimiento de Sistemas de Control de Accesos y Presentismo.",
  "Sistemas CCAA con variantes por tarjeta/tag, huella, facial, PIN, móvil, QR y sus interacciones.",
  "Capacidad de control de presentismo integrado bajo un mismo sistema.",
  "Integración con CCTV para un entorno 360° desde la plataforma BioStar 2 de Suprema.",
  "Técnicos certificados en las líneas Suprema y Hikvision según alcance y necesidad de cada cliente.",
];

const cameraGallery = [
  { src: "/ss/Imagen17.png", alt: "Cámara CCTV profesional" },
  { src: "/ss/ChatGPT%20Image%204%20jun%202026%2C%2009_19_47.png", alt: "Cámara PTZ" },
  { src: "/ss/ChatGPT%20Image%204%20jun%202026%2C%2009_18_44.png", alt: "Cámara domo en data center" },
  { src: "/ss/Imagen15.png", alt: "Detección de intrusión" },
];

const cctvFeatures = [
  { icon: Eye, text: "Analítica de video" },
  { icon: Car, text: "LPR / patentes" },
  { icon: Users, text: "Conteo de personas" },
  { icon: Thermometer, text: "Cámaras térmicas" },
];

function TurnstileVisual() {
  return (
    <div className="relative w-28 h-36 mx-auto">
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 rounded-sm bg-gradient-to-b from-slate-500 to-slate-700 shadow-inner"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[4.5rem] h-28 rounded-t-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-400 border border-slate-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="absolute inset-x-2 top-3 bottom-10 bg-gradient-to-b from-slate-800/25 to-transparent rounded-sm" />
        <div className="absolute top-10 left-1 w-7 h-1.5 bg-slate-400/90 rounded-full -rotate-[28deg]" />
        <div className="absolute top-10 right-1 w-7 h-1.5 bg-slate-400/90 rounded-full rotate-[28deg]" />
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-slate-500/60 bg-slate-300/50" />
      </div>
      <motion.div
        className="absolute -inset-6 rounded-full border border-emerald-500/15 pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}

function CctvAccessHeroVisual({
  activeAccess,
  onSelectAccess,
}: {
  activeAccess: string | null;
  onSelectAccess: (id: string | null) => void;
}) {
  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] flex flex-col md:flex-row gap-3 md:gap-0">
      {/* Columna CCTV — collage como el slide */}
      <div className="relative md:w-[46%] min-h-[220px] md:min-h-full rounded-xl md:rounded-r-none bg-gradient-to-br from-slate-900/40 to-[#061014]/60 border border-slate-800/50 md:border-r-0 overflow-hidden">
        <span className="absolute top-3 left-3 z-30 px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-emerald-400 bg-[#0b141b]/90 border border-emerald-500/30 rounded-md">
          CCTV
        </span>
        {heroCameras.map((cam, i) => (
          <motion.div
            key={cam.src}
            className={`absolute ${cam.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{ scale: 1.05, zIndex: 40, rotate: 0 }}
          >
            <div className="rounded-xl overflow-hidden border-2 border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.45)] bg-slate-900">
              <img
                src={cam.src}
                alt={cam.alt}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
        <motion.div
          className="absolute bottom-3 left-3 flex items-center gap-1.5 z-30"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span className="text-[9px] font-mono text-gray-400">REC</span>
        </motion.div>
      </div>

      {/* Columna Control de accesos — hub + órbita */}
      <div className="relative flex-1 min-h-[260px] rounded-xl md:rounded-l-none bg-gradient-to-bl from-emerald-950/15 to-[#061014]/80 border border-slate-800/50 overflow-hidden">
        <span className="absolute top-3 right-3 z-30 px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-[#00c4f9] bg-[#0b141b]/90 border border-[#00c4f9]/30 rounded-md">
          Accesos
        </span>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="100" cy="105" r="55" fill="none" stroke="rgba(0,196,249,0.2)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="100" y1="105" x2="100" y2="35" stroke="rgba(0,196,249,0.25)" strokeWidth="1" />
          <line x1="100" y1="105" x2="165" y2="105" stroke="rgba(0,196,249,0.25)" strokeWidth="1" />
          <line x1="100" y1="105" x2="35" y2="155" stroke="rgba(0,196,249,0.25)" strokeWidth="1" />
          <line x1="100" y1="105" x2="165" y2="155" stroke="rgba(0,196,249,0.25)" strokeWidth="1" />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pt-4">
          <TurnstileVisual />
        </div>

        {accessMethods.map((method, i) => {
          const Icon = method.icon;
          const isActive = activeAccess === method.id;
          return (
            <motion.button
              key={method.id}
              type="button"
              className={`absolute z-20 flex flex-col items-center gap-1.5 ${method.orbitClass}`}
              onMouseEnter={() => onSelectAccess(method.id)}
              onMouseLeave={() => onSelectAccess(null)}
              onClick={() => onSelectAccess(isActive ? null : method.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`relative w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full overflow-hidden border-2 p-0.5 ${
                  isActive
                    ? "border-emerald-400 shadow-[0_0_24px_rgba(0,196,249,0.35)]"
                    : "border-slate-600 hover:border-emerald-500/50"
                }`}
                animate={isActive ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
              >
                <img
                  src={method.thumb}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-[#061014]/40 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`p-1.5 rounded-full ${isActive ? "bg-emerald-500/90" : "bg-[#0b141b]/80"}`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-emerald-400"}`} />
                  </div>
                </div>
              </motion.div>
              <span
                className={`text-[9px] sm:text-[10px] font-bold text-center max-w-[100px] leading-tight px-1.5 py-0.5 rounded-md ${
                  isActive
                    ? "text-emerald-300 bg-emerald-950/80 border border-emerald-500/40"
                    : "text-gray-300 bg-[#0b141b]/70"
                }`}
              >
                {method.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function IndustriesSection() {
  const [activeTab, setActiveTab] = useState<"cctv" | "accesos">("cctv");
  const [activeAccess, setActiveAccess] = useState<string | null>(null);
  const [diagramNode, setDiagramNode] = useState<string | null>(null);

  const activeMethod = accessMethods.find((m) => m.id === activeAccess);

  return (
    <section
      id="industrias"
      className="relative py-24 md:py-32 bg-[#061014] text-white overflow-hidden border-b border-slate-900/60"
    >
      <motion.div
        className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider"
              whileHover={{ scale: 1.04 }}
            >
              <Camera className="w-3.5 h-3.5" />
              Seguridad Electrónica
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
              CCTV y{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-blue to-brand-teal">
                Control de Accesos
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              Videovigilancia inteligente y control de accesos unificado con
              presentismo, integración 360° y técnicos certificados Hikvision,
              Provision y Suprema.
            </p>
          </div>
        </ScrollReveal>

        {/* Hero: imagen del slide + métodos de acceso interactivos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-14 md:mb-18">
          <motion.div
            className="lg:col-span-7 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-[#00c4f9]/10 blur-sm pointer-events-none" />
            <div className="relative h-full rounded-2xl border border-emerald-500/25 bg-[#0b141b]/80 overflow-hidden p-3 md:p-4">
              <CctvAccessHeroVisual
                activeAccess={activeAccess}
                onSelectAccess={setActiveAccess}
              />
            </div>
          </motion.div>

          {/* Panel lateral dinámico */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#0b141b]/70 flex-1 min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAccess ?? "default"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeMethod ? (
                    <>
                      <p className="text-[10px] font-mono uppercase text-emerald-400 mb-2">
                        Método activo
                      </p>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {activeMethod.label}
                      </h3>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        {activeMethod.desc}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[10px] font-mono uppercase text-gray-500 mb-2">
                        Control de accesos
                      </p>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Elegí un método
                      </h3>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        Interactuá con los círculos de acceso junto al torniquete:
                        facial, móvil, QR o RFID.
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {cameraGallery.slice(0, 2).map((img, i) => (
                <motion.div
                  key={img.src}
                  className="relative rounded-lg overflow-hidden border border-slate-800 aspect-[4/3] group"
                  whileHover={{ scale: 1.03, borderColor: "rgba(0,196,249,0.4)" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs CCTV / Accesos */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(
            [
              { id: "cctv" as const, label: "Sistemas de CCTV", icon: Camera },
              { id: "accesos" as const, label: "Control de Accesos y Presentismo", icon: Fingerprint },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setDiagramNode(null);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-400"
                    : "bg-[#0b141b]/50 border-slate-800 text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start"
          >
            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-[#00c4f9]" />
                {activeTab === "cctv"
                  ? "Sistemas de CCTV"
                  : "Control de Accesos y Presentismo"}
              </h3>
              <ul className="space-y-4">
                {(activeTab === "cctv" ? cctvBullets : accessBullets).map(
                  (bullet, i) => (
                    <motion.li
                      key={bullet}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="flex gap-3 text-sm text-gray-300 font-light leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {bullet}
                    </motion.li>
                  )
                )}
              </ul>
              <div className="flex flex-wrap gap-2 pt-2">
                {(activeTab === "cctv"
                  ? ["Hikvision", "Provision"]
                  : ["Suprema", "BioStar 2", "Hikvision"]
                ).map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border border-emerald-500/25 bg-emerald-950/30 text-emerald-400"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              {activeTab === "cctv" && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {cctvFeatures.map((f) => {
                    const Icon = f.icon;
                    return (
                      <motion.div
                        key={f.text}
                        whileHover={{ x: 4, borderColor: "rgba(0,196,249,0.3)" }}
                        className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-800 bg-slate-900/40 text-xs text-gray-400"
                      >
                        <Icon className="w-4 h-4 text-emerald-400" />
                        {f.text}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-500 font-mono">
                {activeTab === "cctv"
                  ? "Topología CCTV — cables ortogonales al NVR"
                  : "Arquitectura de accesos — Servidor central"}
              </p>
              {activeTab === "cctv" ? (
                <NetworkTopologyDiagram
                  config={cctvTopology}
                  activeId={diagramNode}
                  onSelect={setDiagramNode}
                />
              ) : (
                <AccessTopologyDiagram activeId={diagramNode} onSelect={setDiagramNode} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Galería de cámaras */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {cameraGallery.map((img, i) => (
            <motion.div
              key={img.src}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                borderColor: "rgba(52, 211, 153, 0.45)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
              }}
              className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[4/3] group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061014]/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-teal rounded-xl font-bold text-sm"
            whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(0,196,249,0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            Solicitá asesoría en CCTV o accesos
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
