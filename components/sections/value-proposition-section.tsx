"use client";

import React from "react";
import { Shield, Cpu, Share2, Zap, Eye, Headset } from "lucide-react";
import { NeutrinoBackground } from "@/components/ui/neutrino-background";

export function ValuePropositionSection() {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Continuidad Operativa",
      desc: "Mitigamos riesgos de inactividad con infraestructura redundante que asegura que tus sistemas críticos nunca se detengan.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-emerald-400" />,
      title: "Infraestructura Segura",
      desc: "Diseños robustos que protegen tus activos digitales, cableados y hardware ante amenazas físicas, ambientales y eléctricas.",
    },
    {
      icon: <Share2 className="w-8 h-8 text-emerald-400" />,
      title: "Redes Escalables",
      desc: "Soluciones de conectividad preparadas para absorber el crecimiento futuro de ancho de banda y cantidad de dispositivos corporativos.",
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-400" />,
      title: "Energía de Respaldo",
      desc: "Sistemas UPS de última generación y grupos electrógenos dimensionados para soportar cortes prolongados de energía comercial.",
    },
    {
      icon: <Eye className="w-8 h-8 text-emerald-400" />,
      title: "Monitoreo Constante",
      desc: "Supervisión proactiva en tiempo real para anticipar fallas en temperatura, humedad, enlaces y suministro energético.",
    },
    {
      icon: <Headset className="w-8 h-8 text-emerald-400" />,
      title: "Soporte Especializado",
      desc: "Ingenieros certificados y técnicos en terreno disponibles para mantenimiento preventivo, correctivo y respuesta urgente.",
    },
  ];

  return (
    <section id="propuesta" className="relative py-24 md:py-32 bg-[#061014] overflow-hidden">
      {/* Dynamic HTML5 Canvas Neutrino & Guide Grid Background */}
      <NeutrinoBackground opacity={0.65} />
      
      {/* Radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>


      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header content */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Arquitectura de Redundancia
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Tecnología crítica para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              operaciones críticas.
            </span>
          </h2>
          
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
            En <span className="font-semibold text-emerald-400">Greenworking</span> diseñamos, instalamos y mantenemos infraestructura tecnológica para organizaciones que necesitan funcionar con continuidad absoluta, seguridad impenetrable y máxima eficiencia. Integramos conectividad, energía, seguridad electrónica, climatización de precisión y soporte de alta gama en un solo ecosistema de alto rendimiento.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="group relative bg-[#0b141b]/80 border border-slate-800/80 rounded-2xl p-8 hover:border-emerald-500/30 hover:bg-[#0e1c25]/90 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(16,185,129,0.05)] flex flex-col justify-between"
            >
              {/* Card glowing borders simulation */}
              <div className="absolute inset-0 border border-emerald-500/0 rounded-2xl group-hover:border-emerald-500/10 transition-colors duration-500 pointer-events-none"></div>

              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:bg-emerald-950/40 group-hover:border-emerald-500/30 transition-all duration-500 shadow-inner">
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {benefit.desc}
                </p>
              </div>
              
              {/* Technical corner lines */}
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-slate-800 group-hover:border-emerald-500/40 transition-colors duration-300"></div>
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-slate-800 group-hover:border-emerald-500/40 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
