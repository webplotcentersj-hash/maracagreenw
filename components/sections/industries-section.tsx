"use client";

import React, { useState } from "react";
import { HardHat, Factory, Truck, Stethoscope, GraduationCap, ShoppingBag, Building2, Landmark, Database, Terminal } from "lucide-react";

export function IndustriesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const industries = [
    {
      icon: <HardHat className="w-5 h-5" />,
      name: "Minería",
      title: "Resiliencia extrema en entornos hostiles",
      desc: "Conectividad robusta a través de fibra óptica armada y enlaces inalámbricos para operaciones mineras en superficie y subterráneas. Diseños a prueba de polvo, vibraciones y temperaturas extremas.",
      techs: ["Fibra óptica armada", "Redes industriales outdoor", "Grupos electrógenos de alta resistencia", "CCTV termográfico"]
    },
    {
      icon: <Factory className="w-5 h-5" />,
      name: "Industria",
      title: "Continuidad del ciclo productivo 24/7",
      desc: "Redes industriales OT segregadas para automatización. UPS online de alta potencia para evitar paradas de producción debido a micro-cortes y perturbaciones en la red eléctrica comercial.",
      techs: ["UPS trifásicas online", "Cableado estructurado industrial", "Protección contra ruido electromagnético", "Control de accesos IP"]
    },
    {
      icon: <Truck className="w-5 h-5" />,
      name: "Logística",
      title: "Trazabilidad continua y almacenes conectados",
      desc: "Cobertura WiFi de alta densidad para terminales de radiofrecuencia (pistolas RF). Sistemas CCTV IP con inteligencia artificial para control de despachos y perímetros críticos.",
      techs: ["WiFi 6 industrial de alta densidad", "Seguridad electrónica perimetral", "Fibra óptica multimodo interna", "Mantenimiento 24/7 programado"]
    },
    {
      icon: <Stethoscope className="w-5 h-5" />,
      name: "Salud",
      title: "Energía crítica para el soporte de la vida",
      desc: "Implementamos tableros eléctricos dedicados, transformadores de aislamiento y UPS médicas redundantes con conmutación instantánea para garantizar el funcionamiento continuo en quirófanos y salas de imágenes.",
      techs: ["Energía crítica redundante (N+1)", "Detección rápida de fallas eléctricas", "Control de acceso para áreas restringidas", "Climatización de precisión hospitalaria"]
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      name: "Educación",
      title: "Campus hiperconectados y seguros",
      desc: "Estructura de red unificada capaz de soportar miles de conexiones simultáneas. Distribución lógica en VLANs para laboratorios, administración y WiFi público para estudiantes.",
      techs: ["Cableado troncal de fibra óptica de alta velocidad", "Control de accesos biométrico en accesos clave", "Data center interno educativo", "Redes escalables de distribución"]
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      name: "Retail",
      title: "Transacciones seguras y sistemas de pago activos",
      desc: "Garantizamos que los puntos de venta (POS) y los servidores de inventario estén en línea en todo momento. Redundancia de fibra óptica y sistemas de seguridad inteligentes contra pérdidas.",
      techs: ["Respaldo energético para POS", "CCTV de alta resolución con analítica de flujo", "Cableado estructurado ordenado en racks compactos", "Soporte correctivo express"]
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      name: "Edificios Corporativos",
      title: "Oficinas inteligentes de alto rendimiento",
      desc: "Redes corporativas unificadas que combinan voz, datos, control de acceso, videovigilancia y climatización bajo un mismo sistema centralizado de gestión del edificio (BMS).",
      techs: ["Canalizaciones integradas de cableado", "Control de acceso mediante tarjetas inteligentes y biometría", "Detección de incendios centralizada", "Racks de servidores elegantes y ordenados"]
    },
    {
      icon: <Landmark className="w-5 h-5" />,
      name: "Organismos Públicos",
      title: "Sistemas seguros y soberanía de datos",
      desc: "Infraestructuras de red diseñadas bajo estrictos parámetros de ciberseguridad física y redundancia. Data centers preparados para resguardar la información del ciudadano de manera confiable.",
      techs: ["Certificaciones de cableado estructurado", "Data centers Tier III homologados", "Seguridad electrónica integral", "Grupos electrógenos automáticos"]
    },
    {
      icon: <Database className="w-5 h-5" />,
      name: "Centros de Datos",
      title: "El core tecnológico de alta densidad",
      desc: "Como especialistas en infraestructura IT, aportamos soluciones integrales de ordenamiento, energía regulada y climatización extrema de precisión para salas de servidores y operadores de telecomunicaciones.",
      techs: ["Sistemas de contención de aire frío/caliente", "UPS trifásicas modulares redundantes", "Cableado estructurado de ultra-alta densidad MPO", "Monitoreo ambiental inteligente"]
    },
    {
      icon: <Terminal className="w-5 h-5" />,
      name: "Empresas Tecnológicas",
      title: "Latencia ultra-baja y conectividad escalable",
      desc: "Infraestructura de red optimizada para empresas de software, hosting y desarrollo que requieren tasas de transferencia gigabit simétricas, latencia nula y flexibilidad operativa total.",
      techs: ["Switching Core de alta gama (10G/40G)", "Backbone redundante en fibra óptica", "Climatización técnica eficiente", "Soporte preventivo e integraciones"]
    }
  ];

  return (
    <section id="industrias" className="relative py-24 md:py-32 bg-[#080d12] text-white overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute min-w-full min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-55"
        >
          <source src="/3.mp4" type="video/mp4" />
        </video>
        {/* Sleek cyber overlay to guarantee content legibility */}
        <div className="absolute inset-0 bg-[#080d12]/20 backdrop-blur-[2px] z-10" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#080d12] via-[#080d12]/30 to-transparent z-15 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#080d12] via-[#080d12]/30 to-transparent z-15 pointer-events-none" />
      </div>

      {/* Background visual cues */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Title elements */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Sectores de Operación
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Soluciones para empresas, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              industrias e instituciones.
            </span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
            Cada sector tiene necesidades técnicas específicas. En <span className="font-semibold text-emerald-400">Greenworking</span> desarrollamos soluciones de infraestructura adaptadas a entornos altamente exigentes, donde la conectividad, la seguridad física y la continuidad operativa son valores fundamentales e innegociables.
          </p>
        </div>

        {/* Industrial Interactive Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vertical scrollable selector */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
            {industries.map((ind, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "bg-[#0b141b]/50 border-slate-900 text-gray-400 hover:border-slate-800 hover:text-white"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${activeTab === index ? "bg-emerald-900/40 text-emerald-400" : "bg-slate-900 text-gray-400"}`}>
                  {ind.icon}
                </div>
                <span>{ind.name}</span>
              </button>
            ))}
          </div>

          {/* Vertical detailed display */}
          <div className="lg:col-span-8 bg-[#0b141b]/80 border border-slate-800/80 rounded-2xl p-8 md:p-10 hover:border-emerald-500/10 transition-all duration-500 min-h-[350px] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  {industries[activeTab].icon}
                </div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Vertical: {industries[activeTab].name}</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white leading-tight">
                  {industries[activeTab].title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mt-4">
                  {industries[activeTab].desc}
                </p>
              </div>

              {/* Technologies deployed */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase text-slate-500 tracking-wider font-semibold">Tecnologías Desplegadas:</h4>
                <div className="flex flex-wrap gap-2">
                  {industries[activeTab].techs.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-6 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="text-xs text-gray-500 font-light italic">
                *Diseñamos proyectos a la medida bajo estrictos SLAs corporativos.
              </span>
              <a 
                href="#contacto"
                className="px-5 py-2.5 bg-emerald-600/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-400 text-center hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Solicitar Asesoría para {industries[activeTab].name}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
