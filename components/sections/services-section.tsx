"use client";

import React, { useState } from "react";
import { Network, Cable, Server, BatteryCharging, ShieldAlert, ThermometerSnowflake, Wrench, ArrowRight } from "lucide-react";

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      icon: <Network className="w-6 h-6 text-emerald-400" />,
      title: "Redes y Cableado Estructurado",
      subtitle: "Conectividad robusta a nivel corporativo",
      desc: "Diseñamos e implementamos redes de datos de alto rendimiento, estructuradas bajo estándares internacionales de ingeniería. Organizamos y canalizamos tendidos de cobre (Cat6, Cat6A, Cat8) garantizando el máximo rendimiento del canal y cero interferencias.",
      bullets: [
        "Certificación de puntos de red de cobre Cat6 / Cat6A / Cat8.",
        "Ordenamiento, etiquetado y peinado de racks y gabinetes técnicos.",
        "Sistemas de canalización aérea y subterránea (bandejas, ductos).",
        "Configuración lógica de switches, routers corporativos y VLANs."
      ],
      keywords: ["cableado estructurado", "redes corporativas", "infraestructura de red", "instalación de redes empresariales"],
      features: "Normativa ANSI/TIA-568-D y certificación Fluke Networks.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <Cable className="w-6 h-6 text-emerald-400" />,
      title: "Fibra Óptica",
      subtitle: "Enlaces de alta velocidad a distancias ilimitadas",
      desc: "Realizamos tendido, instalación, fusión por arco voltaico y mantenimiento de redes de fibra óptica multimodo y monomodo para conectar naves industriales, oficinas, campus y enlaces de larga distancia con atenuación nula.",
      bullets: [
        "Fusión de fibra óptica monomodo (SM) y multimodo (MM).",
        "Tendido aéreo, subterráneo e interno para alta densidad.",
        "Pruebas de atenuación y certificación OTDR de enlaces.",
        "Conectividad Backbone para interconexión de salas técnicas."
      ],
      keywords: ["tendido de fibra óptica", "instalación de fibra óptica", "conectividad empresarial"],
      features: "Fusiones por núcleo con fusionadoras de precisión certificadas.",
      image: "https://images.unsplash.com/photo-1551703551-3850527f625c?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      title: "Data Centers",
      subtitle: "Salas de servidores preparadas para alta disponibilidad",
      desc: "Especialistas en el diseño tridimensional, optimización, ordenamiento y equipamiento de centros de datos corporativos e industriales. Garantizamos la redundancia física y la eficiencia en el flujo del aire caliente/frío.",
      bullets: [
        "Planificación y obra civil de salas técnicas (muros cortafuego).",
        "Suministro e instalación de gabinetes racks inteligentes (PDU).",
        "Pisos técnicos elevados y distribución inteligente de cableado.",
        "Monitoreo ambiental inteligente de temperatura y humedad en racks."
      ],
      keywords: ["data center", "infraestructura para data center", "salas de servidores", "alta disponibilidad"],
      features: "Diseños alineados a estándares Uptime Institute Tier II y Tier III.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <BatteryCharging className="w-6 h-6 text-emerald-400" />,
      title: "Energía Crítica",
      subtitle: "Continuidad eléctrica absoluta ante cualquier apagón",
      desc: "Diseñamos soluciones eléctricas de respaldo redundante e infraestructura de energía para proteger sistemas informáticos, servidores y maquinaria ante fluctuaciones y cortes totales del suministro comercial.",
      bullets: [
        "Instalación de UPS corporativas online de doble conversión.",
        "Integración de grupos electrógenos con tableros de transferencia automática (TTA).",
        "Tableros eléctricos de distribución dedicados para IT.",
        "Sistemas de puesta a tierra de precisión para protección de hardware."
      ],
      keywords: ["energía crítica", "UPS para empresas", "respaldo energético", "continuidad eléctrica"],
      features: "Sistemas de conmutación estática rápida (ATS) con tiempo de transferencia cero.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
      title: "Seguridad Electrónica",
      subtitle: "Protección integral para infraestructura, activos y personal",
      desc: "Integramos tecnologías avanzadas de videovigilancia inteligente, control de accesos biométrico y seguridad perimetral para blindar tus instalaciones físicas contra intrusiones no autorizadas.",
      bullets: [
        "Sistemas de CCTV IP con analítica de video avanzada e IA.",
        "Control de accesos por biometría, tarjeta y reconocimiento facial.",
        "Sistemas de detección temprana de incendios (sensores, alarmas).",
        "Integración unificada bajo consolas centrales de monitoreo."
      ],
      keywords: ["seguridad electrónica", "CCTV empresas", "control de acceso", "cámaras de seguridad"],
      features: "Sistemas autónomos de seguridad con alimentación PoE y respaldo crítico.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <ThermometerSnowflake className="w-6 h-6 text-emerald-400" />,
      title: "Climatización Técnica",
      subtitle: "Refrigeración constante para salas de alta temperatura",
      desc: "El hardware de alto desempeño genera calor extremo. Diseñamos e instalamos climatización térmica de precisión para disipar la carga calórica constante de salas técnicas y data centers empresariales de forma eficiente.",
      bullets: [
        "Instalación de aire acondicionado de precisión para IT.",
        "Configuración de pasillo frío y pasillo caliente en data centers.",
        "Sistemas In-Row de climatización localizada entre racks.",
        "Mantenimiento térmico para prevenir sobrecalentamientos fatales."
      ],
      keywords: ["climatización técnica", "refrigeración para data center", "climatización para salas de servidores"],
      features: "Control de humedad automático y operaciones 24/7 sin paros por ciclo.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <Wrench className="w-6 h-6 text-emerald-400" />,
      title: "Soporte y Mantenimiento",
      subtitle: "Respaldo de ingeniería en campo las 24 horas",
      desc: "Nuestros ingenieros operan como tu departamento de soporte de nivel superior. Brindamos pólizas de mantenimiento preventivo y correctivo con acuerdos de nivel de servicio (SLA) rigurosos para la estabilidad de tu infraestructura.",
      bullets: [
        "Pólizas de soporte con SLAs adaptables de 4 a 24 horas en terreno.",
        "Mantenimientos preventivos programados de tableros, UPS y fibra.",
        "Resolución de fallas urgentes físicas y lógicas.",
        "Monitoreo IT preventivo remoto de estabilidad de red."
      ],
      keywords: ["soporte técnico empresarial", "mantenimiento de infraestructura tecnológica", "monitoreo IT"],
      features: "Ingenieros especializados con herramientas y repuestos de contingencia.",
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section id="servicios" className="relative py-24 md:py-32 bg-[#061014] text-white overflow-hidden">
      {/* Premium Background Video & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/Portada%20Facebook%20Servicios%20Autolavado%20Moderno%20Azul.mp4" type="video/mp4" />
        </video>
        {/* Sleek Dark Cyber-Overlay */}
        <div className="absolute inset-0 bg-[#061014]/85 backdrop-blur-[3.5px] z-0"></div>
        {/* Soft edge blending gradients */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#061014] to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#061014] to-transparent z-0"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Soluciones Integrales
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Ecosistema de Infraestructura Tecnológica
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
            No vendemos servicios aislados. Diseñamos e implementamos una solución unificada e integrada que garantiza la estabilidad, velocidad y continuidad de tu negocio corporativo.
          </p>
        </div>

        {/* Tabbed Interactive Services Area */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Service Left Nav tabs */}
          <div className="w-full lg:w-2/5 flex flex-col gap-3">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-4 text-left p-4.5 rounded-xl border transition-all duration-300 ${
                  activeTab === index
                    ? "bg-[#0b141b]/90 border-emerald-500/30 text-white shadow-[0_4px_20px_rgba(16,185,129,0.08)] scale-[1.01]"
                    : "bg-[#0b141b]/40 border-slate-900/60 text-gray-400 hover:bg-[#0b141b]/60 hover:text-white hover:border-slate-800"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  activeTab === index ? "bg-emerald-950/50 border border-emerald-500/30" : "bg-slate-900"
                }`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-base font-bold transition-colors ${activeTab === index ? "text-emerald-400" : "text-gray-300"}`}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light truncate max-w-[250px] mt-0.5">
                    {service.subtitle}
                  </p>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${activeTab === index ? "translate-x-1 text-emerald-400" : "text-gray-600 group-hover:text-gray-400"}`} />
              </button>
            ))}
          </div>

          {/* Service Detail Box */}
          <div className="w-full lg:w-3/5 bg-[#0b141b]/80 border border-slate-800/80 rounded-2xl p-8 md:p-10 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-500 relative overflow-hidden">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Left Column: Technical Details */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/20 rounded-md text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                    Especificación Técnica
                  </span>
                  <span className="text-xs text-gray-500 font-mono">Status: Optimal</span>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                    {services[activeTab].title}
                  </h3>
                  <p className="text-emerald-400 text-sm font-medium mt-1">
                    {services[activeTab].subtitle}
                  </p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light mt-4">
                    {services[activeTab].desc}
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase text-slate-400 tracking-wider font-semibold">Alcance del Servicio:</h4>
                  <ul className="space-y-3 text-sm text-gray-300 font-light">
                    {services[activeTab].bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Premium Cyber Image */}
              <div className="w-full md:w-[240px] lg:w-[280px] flex-shrink-0 self-center md:self-start mt-6 md:mt-0">
                <div className="relative group rounded-xl overflow-hidden border border-emerald-500/30 bg-[#061014]/90 shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-500 hover:border-emerald-500/60">
                  {/* Decorative Scan Lines / HUD overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent pointer-events-none z-10"></div>
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-emerald-500/30 animate-pulse pointer-events-none z-10"></div>
                  
                  {/* Image */}
                  <div className="aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] overflow-hidden">
                    <img 
                      src={services[activeTab].image} 
                      alt={services[activeTab].title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter saturate-[0.85] contrast-[1.05]"
                      loading="lazy"
                    />
                  </div>

                  {/* Tech HUD Corner Accents */}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-emerald-950/80 border border-emerald-500/40 rounded text-[9px] font-mono text-emerald-400 tracking-wider uppercase z-20">
                    SYS_FEED // LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-slate-950/80 border border-slate-800 rounded text-[9px] font-mono text-slate-400 tracking-wider uppercase z-20">
                    0{activeTab + 1} / 0{services.length}
                  </div>

                  {/* Corner Sci-fi decorative borders */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400 pointer-events-none z-20"></div>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400 pointer-events-none z-20"></div>
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400 pointer-events-none z-20"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400 pointer-events-none z-20"></div>
                </div>
              </div>
            </div>

            {/* Bottom Meta Information (Keywords and Standards) */}
            <div className="border-t border-slate-800/80 pt-6 mt-8 space-y-4">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Keywords SEO:</span>
                {services[activeTab].keywords.map((kw, idx) => (
                  <span key={idx} className="text-xs text-emerald-400/90 font-light italic">
                    #{kw}{idx < services[activeTab].keywords.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-900/60 rounded-lg p-3 border border-slate-800/40">
                <span className="font-mono text-gray-400">Estándar de Calidad:</span>
                <span className="font-bold text-white text-right">{services[activeTab].features}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
