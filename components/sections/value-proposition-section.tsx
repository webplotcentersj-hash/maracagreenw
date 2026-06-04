"use client";

import React from "react";
import { Shield, Cpu, Share2, Zap, Eye, Headset, type LucideIcon } from "lucide-react";
import { NeutrinoBackground } from "@/components/ui/neutrino-background";
import { BrandPaletteAccent, BRAND_ACCENT_ICON } from "@/components/ui/brand-palette-accent";

const CORNER_BORDER = [
  "group-hover:border-brand-primary/40",
  "group-hover:border-brand-blue/40",
  "group-hover:border-brand-teal/40",
  "group-hover:border-brand-lime/40",
  "group-hover:border-brand-petrol/40",
  "group-hover:border-brand-primary/40",
] as const;

export function ValuePropositionSection() {
  const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
    {
      icon: Shield,
      title: "Continuidad Operativa",
      desc: "Mitigamos riesgos de inactividad con infraestructura redundante que asegura que tus sistemas críticos nunca se detengan.",
    },
    {
      icon: Cpu,
      title: "Infraestructura Segura",
      desc: "Diseños robustos que protegen tus activos digitales, cableados y hardware ante amenazas físicas, ambientales y eléctricas.",
    },
    {
      icon: Share2,
      title: "Redes Escalables",
      desc: "Soluciones de conectividad preparadas para absorber el crecimiento futuro de ancho de banda y cantidad de dispositivos corporativos.",
    },
    {
      icon: Zap,
      title: "Energía de Respaldo",
      desc: "Sistemas UPS de última generación y grupos electrógenos dimensionados para soportar cortes prolongados de energía comercial.",
    },
    {
      icon: Eye,
      title: "Monitoreo Constante",
      desc: "Supervisión proactiva en tiempo real para anticipar fallas en temperatura, humedad, enlaces y suministro energético.",
    },
    {
      icon: Headset,
      title: "Soporte Especializado",
      desc: "Ingenieros certificados y técnicos en terreno disponibles para mantenimiento preventivo, correctivo y respuesta urgente.",
    },
  ];

  return (
    <section id="propuesta" className="relative py-24 md:py-32 bg-[#061014] overflow-hidden">
      <NeutrinoBackground opacity={0.65} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-24 right-0 w-64 h-64 bg-brand-lime/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border border-brand-primary/20 rounded-lg bg-brand-petrol/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
            <BrandPaletteAccent variant="dots" />
            Arquitectura de Redundancia
          </div>
          <BrandPaletteAccent className="mb-4" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Tecnología crítica para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-blue to-brand-teal">
              operaciones críticas.
            </span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
            En <span className="font-semibold text-brand-primary">Greenworking</span> diseñamos, instalamos y mantenemos infraestructura tecnológica para organizaciones que necesitan funcionar con continuidad absoluta, seguridad impenetrable y máxima eficiencia. Integramos conectividad, energía, seguridad electrónica, climatización de precisión y soporte de alta gama en un solo ecosistema de alto rendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            const accent = BRAND_ACCENT_ICON[idx % BRAND_ACCENT_ICON.length];
            const corner = CORNER_BORDER[idx % CORNER_BORDER.length];

            return (
              <div
                key={benefit.title}
                className="group relative bg-[#0b141b]/80 border border-slate-800/80 rounded-2xl p-8 hover:border-brand-primary/20 hover:bg-[#0e1c25]/90 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,196,249,0.05)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:bg-brand-petrol/30 group-hover:border-brand-primary/30 transition-all duration-500 shadow-inner">
                    <Icon className={`w-8 h-8 ${accent}`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed font-light">{benefit.desc}</p>
                </div>

                <div className={`absolute top-3 right-3 w-3 h-3 border-t border-r border-slate-800 transition-colors duration-300 ${corner}`} />
                <div className={`absolute bottom-3 left-3 w-3 h-3 border-b border-l border-slate-800 transition-colors duration-300 ${corner}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
