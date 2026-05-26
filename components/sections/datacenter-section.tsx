"use client";

import React, { useState } from "react";
import { Server, Compass, Layers, Zap, Thermometer, ShieldAlert, Cpu, Eye } from "lucide-react";

export function DatacenterSection() {
  const [activeArea, setActiveArea] = useState<number | null>(null);

  const rackFeatures = [
    {
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      title: "Diseño de Salas Técnicas",
      desc: "Distribución optimizada del espacio, pasillos de servicio y confinamiento térmico. Obra civil para blindaje contra incendios e inundaciones.",
      coord: "top-[10%] left-[2%]"
    },
    {
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      title: "Organización de Racks e Hilos",
      desc: "Implementación de gabinetes de alta densidad (42U/45U) con organizadores de cables verticales y horizontales de alta resistencia.",
      coord: "top-[25%] left-[25%]"
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      title: "Cableado de Ultra-Alta Densidad",
      desc: "Troncales de fibra óptica MPO/MTP y cobre Cat6A/Cat8 certificados. Enrutamiento ordenado a través de bandejas superiores porta-cables.",
      coord: "top-[40%] left-[10%]"
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      title: "Sistemas UPS y Energía Crítica",
      desc: "Instalación de UPS trifásicas modulares redundantes (N+1) que se acoplan en caliente (hot-swappable) sin interrumpir la operación del servidor.",
      coord: "top-[55%] left-[30%]"
    },
    {
      icon: <Thermometer className="w-5 h-5 text-emerald-400" />,
      title: "Climatización de Precisión",
      desc: "Sistemas de enfriamiento controlando temperatura, humedad y filtrado del aire, manteniendo constantes las condiciones térmicas de los racks.",
      coord: "top-[70%] left-[12%]"
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-emerald-400" />,
      title: "CCTV y Control de Acceso",
      desc: "Acceso biométrico de doble factor en la entrada de la sala y en las puertas de cada rack individual. Cámaras de videovigilancia de alta resolución.",
      coord: "top-[85%] left-[28%]"
    },
    {
      icon: <Eye className="w-5 h-5 text-emerald-400" />,
      title: "Monitoreo Ambiental 24/7",
      desc: "Sensores inteligentes distribuidos en racks para alertar instantáneamente sobre fugas de agua, humo, aperturas de puertas o picos de temperatura.",
      coord: "top-[48%] left-[80%]"
    },
    {
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      title: "Mantenimiento Integral IT",
      desc: "Servicio de limpieza técnica de data centers activos (libres de polvo y estática) y diagnóstico termográfico de puntos calientes en tableros.",
      coord: "top-[78%] left-[82%]"
    }
  ];

  return (
    <section id="data-centers" className="relative py-24 md:py-32 bg-[#061014] text-white overflow-hidden border-b border-slate-900">
      
      {/* Design elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Layout Title */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              Uptime Inquebrantable
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Infraestructura Crítica para Data Centers
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
              Diseñamos, implementamos y optimizamos salas técnicas preparadas para resguardar la operatividad de tus sistemas críticos. Contemplamos de forma integrada y milimétrica el cableado, energía regulada, refrigeración de precisión, seguridad física inteligente y automatización del monitoreo ambiental.
            </p>
          </div>
          
          <div className="bg-[#0b141b]/60 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white mb-2">Diseños Alineados a Estándares</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
              Cada proyecto de data center es planificado en base a las normativas globales de diseño de infraestructuras críticas para asegurar la mayor disponibilidad operativa:
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                <span className="font-bold text-emerald-400 block mb-1">ANSI/TIA-942</span>
                <span className="text-gray-400 font-light">Infraestructura de Red y Telecomunicaciones.</span>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                <span className="font-bold text-emerald-400 block mb-1">UPTIME INSTITUTE</span>
                <span className="text-gray-400 font-light">Homologaciones de Redundancia Tier II y III.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blueprint Layout & Technical breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Grid Items */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-xs uppercase text-slate-400 tracking-wider font-semibold mb-2">Desglose de Componentes Críticos:</h3>
            <div className="space-y-3">
              {rackFeatures.map((feat, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveArea(index)}
                  onMouseLeave={() => setActiveArea(null)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeArea === index
                      ? "bg-emerald-950/20 border-emerald-500/40 text-white shadow-[0_0_15px_rgba(16,185,129,0.05)] scale-[1.01]"
                      : "bg-[#0b141b]/50 border-slate-900 text-gray-400 hover:border-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeArea === index ? "bg-emerald-900/30 text-emerald-400" : "bg-slate-900 text-gray-400"}`}>
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${activeArea === index ? "text-emerald-400" : "text-white"}`}>
                        {feat.title}
                      </h4>
                      <p className="text-xs font-light text-gray-400 leading-relaxed mt-1">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Interactive Blueprint Box */}
          <div className="lg:col-span-7 bg-[#0b141b]/40 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between items-center relative min-h-[500px]">
            {/* Blueprint Grid backdrop */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] rounded-2xl"></div>
            
            {/* Status box */}
            <div className="relative z-10 w-full flex justify-between items-center bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 text-xs">
              <span className="font-mono text-gray-400">Esquema Técnico de Data Center (2D Blueprint)</span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Sistemas en Redundancia
              </span>
            </div>

            {/* Futuristic Vector Server Rack Layout mockup */}
            <div className="relative z-10 my-10 w-full max-w-[450px] aspect-[4/5] bg-slate-950/90 border border-sky-500/20 rounded-xl shadow-[0_0_40px_rgba(2,132,199,0.08)] p-6 flex flex-col justify-between overflow-hidden">
              {/* Technical background measurements */}
              <div className="absolute top-2 right-3 text-[9px] font-mono text-sky-500/30">DIMENSIONS: 800mm x 1200mm</div>
              <div className="absolute bottom-2 left-3 text-[9px] font-mono text-sky-500/30">SCALE: 1:20 | RACK #01-A</div>
              
              {/* Vertical side bars for server rack support */}
              <div className="absolute top-0 bottom-0 left-6 w-1 bg-sky-500/20 border-r border-sky-500/40"></div>
              <div className="absolute top-0 bottom-0 right-6 w-1 bg-sky-500/20 border-l border-sky-500/40"></div>
              
              {/* Server Racks levels */}
              <div className="space-y-2.5 w-full flex-1 flex flex-col justify-center py-4">
                {[...Array(9)].map((_, i) => {
                  const isHovered = activeArea !== null && ((activeArea < 3 && i < 3) || (activeArea >= 3 && activeArea < 5 && i >= 3 && i < 6) || (activeArea >= 5 && i >= 6));
                  return (
                    <div 
                      key={i} 
                      className={`relative w-[90%] mx-auto h-[6%] border flex items-center justify-between px-3 transition-all duration-300 rounded ${
                        isHovered 
                          ? "bg-emerald-950/40 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] scale-[1.01]" 
                          : "bg-slate-900/60 border-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-[8px] font-mono text-slate-500">U{9-i}</span>
                        <div className="h-1 bg-slate-800 flex-1 rounded-full overflow-hidden relative">
                          <div className={`h-full absolute left-0 top-0 transition-all duration-500 ${isHovered ? "bg-emerald-400 w-[80%]" : "bg-sky-500/50 w-[45%]"}`}></div>
                        </div>
                      </div>
                      
                      {/* LED pulses */}
                      <div className="flex gap-1.5 ml-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovered ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`}></span>
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovered ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`}></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions CTA */}
            <div className="relative z-10 w-full">
              <a 
                href="#contacto"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-center text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 block"
              >
                Diseñemos la infraestructura de tu data center
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
