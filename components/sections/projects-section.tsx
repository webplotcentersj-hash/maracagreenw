"use client";

import React from "react";
import { ExpandableCard } from "../ui/expandable-card";

export function ProjectsSection() {
  const projects = [
    {
      title: "Minera del Altiplano - Catamarca",
      sector: "Minería y Recursos Naturales",
      src: "/projects/mineria.png",
      problem: "Operación minera de litio a más de 4000 msnm con desconexiones severas debido a vibraciones constantes, polvo en suspensión extremo y caídas de tensión que interrumpían el control lógicos programable (PLCs).",
      solution: "Instalación de backbone troncal de fibra óptica monomodo armada anti-roedores de alta resistencia. Montaje de gabinetes de distribución técnicos IP67 estancos con control ambiental de temperatura y UPS robustas online de grado industrial con blindaje térmico.",
      services: ["Tendido de fibra óptica monomodo", "Redes industriales robustas", "Gabinetes técnicos certificados", "Energía de respaldo industrial"],
      results: "Uptime de conectividad del 100% de la planta de producción. Cero paradas por micro-cortes eléctricos durante el último año.",
      metric: "99.999% Conectividad"
    },
    {
      title: "Centro de Distribución Logística - Dock Sud",
      sector: "Logística y Distribución Mayorista",
      src: "/projects/logistica.png",
      problem: "Centro logístico de 45,000 m² con zonas ciegas de WiFi que generaban pérdida de datos en pistolas RF durante la lectura de pallets. Falta de trazabilidad física y robos hormiga por puntos ciegos en cámaras analógicas obsoletas.",
      solution: "Instalación de cableado estructurado en cobre Cat6A y tendido interno en fibra multimodo. Implementación de WiFi 6 de alta densidad para almacenes de racks elevados. Montaje de sistema CCTV IP integrado con IA para detección de rostros e intrusiones.",
      services: ["Cableado estructurado Cat6A", "WiFi 6 corporativo", "CCTV IP con inteligencia artificial", "Soporte correctivo programado"],
      results: "Reducción a cero en las pérdidas por problemas de lectura RF. Aumento del 95% en la efectividad del control de inventarios mediante analítica inteligente.",
      metric: "100% Cobertura RF"
    },
    {
      title: "Sanatorio Privado Metropolitano - CABA",
      sector: "Salud y Clínicas Complejas",
      src: "/projects/salud.png",
      problem: "Fluctuaciones críticas de voltaje que causaban descalibración y fallas recurrentes en resonadores magnéticos y tomógrafos. El data center interno carecía de control térmico redundante y ordenamiento lógico.",
      solution: "Montaje de sistema de energía crítica modular trifásico redundante (N+1) con UPS hot-swappable de 80kVA. Instalación de pasillo frío/caliente con aire de precisión In-Row 24/7. Reestructuración de cableado troncal del centro de cómputos.",
      services: ["UPS trifásicas modulares (N+1)", "Refrigeración de precisión para salas técnicas", "Reordenamiento de data center", "Mantenimiento preventivo mensual"],
      results: "Estabilidad de corriente absoluta asegurada en quirófanos y salas de diagnóstico. Reducción del 30% en costos de energía térmica debido a la eficiencia del flujo de aire.",
      metric: "0 ms Transferencia Eléctrica"
    }
  ];

  return (
    <section id="proyectos" className="relative py-24 md:py-32 bg-[#061014] text-white border-t border-slate-900">
      
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
            Casos de Estudio Reales
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Proyectos que sostienen <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-blue to-brand-teal">
              operaciones reales en el país.
            </span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
            Cada instalación cuenta una historia técnica: una empresa que necesitaba resguardo, una red que debía escalar con urgencia o un centro de cómputos que requería energía confiable y climatización de precisión. Descubre cómo convertimos desafíos complejos en soluciones operativas seguras.
          </p>
        </div>

        {/* 3-Column Expandable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {projects.map((proj, idx) => (
            <ExpandableCard
              key={idx}
              title={proj.title}
              src={proj.src}
              description={proj.sector}
              classNameExpanded="[&_h4]:text-white [&_p]:text-gray-300"
            >
              <div className="space-y-6 text-gray-300 w-full">
                
                {/* Metric Badge in Expanded View */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Métrica Clave Asegurada:</span>
                  <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg">
                    {proj.metric}
                  </span>
                </div>

                {/* Challenge */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2 font-mono">El Desafío / Problema:</h4>
                  <p className="text-sm md:text-base font-light leading-relaxed text-gray-300">
                    {proj.problem}
                  </p>
                </div>
                
                {/* Solution */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-2 font-mono">La Solución Implementada:</h4>
                  <p className="text-sm md:text-base font-light leading-relaxed text-gray-300">
                    {proj.solution}
                  </p>
                </div>

                {/* Technologies used */}
                <div>
                  <h4 className="text-xs uppercase text-slate-400 tracking-wider font-semibold mb-2.5 font-mono">Servicios Clave Utilizados:</h4>
                  <div className="flex flex-wrap gap-2">
                    {proj.services.map((srv, srvIdx) => (
                      <span
                        key={srvIdx}
                        className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-xs text-gray-400 font-light"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4.5 flex gap-3 items-start mt-4">
                  <div className="text-emerald-400 text-sm font-bold w-full">
                    <span className="uppercase text-[9px] tracking-widest text-emerald-500 block font-mono">Resultado de Ingeniería</span>
                    <span className="text-sm md:text-base text-white mt-1 block font-light leading-relaxed">
                      {proj.results}
                    </span>
                  </div>
                </div>
              </div>
            </ExpandableCard>
          ))}
        </div>

      </div>
    </section>
  );
}
