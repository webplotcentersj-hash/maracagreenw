"use client";

import React, { useState } from "react";
import { Server, Cable, BatteryCharging, Wifi, ShieldAlert, ThermometerSnowflake, ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/ui/feature-carousel";
import { SS_GALLERY_CAROUSEL } from "@/lib/ss-gallery-images";

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      title: "Centro de Cómputos y Redes",
      subtitle: "Diseño, Implementación y Certificación de Redes y Data Centers",
      desc: "Diseñamos y equipamos centros de cómputos (Data Centers) y sistemas de redes corporativas de alto rendimiento. Implementamos cableado estructurado en Cat6, Cat6A y Cat8, switches, routers y ordenamiento inteligente para garantizar disponibilidad y escalabilidad operativa.",
      bullets: [
        "Obra civil y diseño de Data Centers bajo normativas ANSI/TIA-942 e Uptime Institute.",
        "Cableado estructurado de datos (Cat6 / Cat6A / Cat8) con certificación oficial Fluke Networks.",
        "Suministro, montaje y configuración de equipamiento activo (Switches, Routers, Access Points y Firewalls).",
        "Pisos técnicos elevados, racks auto-soportados y bandejas portacables aéreas/subterráneas."
      ],
      keywords: ["centro de cómputos", "cableado estructurado", "data centers", "switches y routers", "ANSI/TIA-942"],
      features: "Certificación FLUKE e ingeniería de diseño certificada.",
      image: "/ss/Imagen43.jpg"
    },
    {
      icon: <Cable className="w-6 h-6 text-emerald-400" />,
      title: "Tendido de Fibra Óptica",
      subtitle: "Diseño, Fusión, Certificación y Mantenimiento de Enlaces",
      desc: "Implementamos tendidos de fibra óptica multimodo (MM) y monomodo (SM) para interconectar plantas, naves industriales y sedes corporativas. Contamos con fusionadoras propias por arco voltaico e instrumental OTDR de última generación.",
      bullets: [
        "Fusión por arco voltaico con niveles de atenuación mínimos certificados (< 0.02 dB).",
        "Tendido aéreo, subterráneo, interno y de planta externa de alta durabilidad.",
        "Certificación de enlaces ópticos con equipos OTDR y Power Meters calibrados.",
        "Guardias técnicas 24/7 y contratos de mantenimiento preventivo y correctivo ante cortes."
      ],
      keywords: ["tendido de fibra óptica", "fusión de fibra", "certificación OTDR", "backbone óptico"],
      features: "Fusión de precisión e informes reflectométricos detallados.",
      image: "/ss/ChatGPT%20Image%204%20jun%202026%2C%2009_28_14.png"
    },
    {
      icon: <BatteryCharging className="w-6 h-6 text-emerald-400" />,
      title: "Electricidad, Generación y Respaldo de Energía",
      subtitle: "Sistemas de Energía Ininterrumpida y Calidad de Potencia",
      desc: "Aseguramos el suministro eléctrico continuo para proteger tus servidores, redes y maquinarias críticas. Diseñamos tableros eléctricos, llaves de transferencia automática (TTA) e instalamos sistemas de UPS industriales y grupos electrógenos.",
      bullets: [
        "Instalación y mantenimiento de UPS corporativas (trifásicas/monofásicas) y bancos de baterías.",
        "Suministro e instalación de Grupos Electrógenos con Tableros de Transferencia Automática (TTA).",
        "Montaje de tableros eléctricos de distribución de potencia y circuitos estabilizados.",
        "Diseño, medición, puesta a tierra de seguridad y certificación según normativas AEA."
      ],
      keywords: ["energía de respaldo", "UPS modulares", "grupos electrógenos", "puesta a tierra", "transferencia automática"],
      features: "Certificación de puesta a tierra y tableros bajo normativa AEA.",
      image: "/ss/Imagen44.jpg"
    },
    {
      icon: <Wifi className="w-6 h-6 text-emerald-400" />,
      title: "Telecomunicaciones",
      subtitle: "Infraestructura de Conectividad, Enlaces Inalámbricos y Voz IP",
      desc: "Proporcionamos soluciones de conectividad inalámbrica y redes de voz y datos corporativas. Diseñamos radioenlaces punto a punto y multipunto, sistemas de telefonía IP corporativa y redes Wi-Fi de alta densidad.",
      bullets: [
        "Diseño, cálculo e instalación de Radioenlaces inalámbricos de alta disponibilidad y largo alcance.",
        "Redes Wi-Fi corporativas de alta densidad y sistemas de controladora centralizada.",
        "Telefonía IP (VoIP) y configuración de centrales telefónicas de última generación.",
        "Suministro, montaje de mástiles, torres de telecomunicaciones y sistemas de pararrayos."
      ],
      keywords: ["telecomunicaciones", "radioenlaces", "Wi-Fi corporativo", "Voz sobre IP", "torres de comunicación"],
      features: "Redes inalámbricas gestionadas y radioenlaces certificados de nivel carrier.",
      image: "/ss/Imagen13.png"
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
      title: "Sistemas de Seguridad",
      subtitle: "Control de Accesos Biométrico, CCTV IP y Detección de Intrusos",
      desc: "Protegemos tus activos físicos e instalaciones mediante sistemas inteligentes de seguridad electrónica integrados. Diseñamos e instalamos cámaras IP con analíticas de inteligencia artificial y controles de acceso biométricos unificados.",
      bullets: [
        "Sistemas de CCTV IP de alta definición con analítica de vídeo (reconocimiento facial y patentes).",
        "Control de Accesos y Presentismo mediante biometría (facial, huella), RFID y códigos QR dinámicos.",
        "Integración centralizada de sistemas de seguridad física bajo plataformas como Suprema (BioStar) y Hikvision.",
        "Sistemas de intrusión perimetral, sensores de doble tecnología y detección de incendios direccionable."
      ],
      keywords: ["sistemas de seguridad", "CCTV IP", "control de accesos", "reconocimiento facial", "Suprema BioStar"],
      features: "Sistemas unificados e integrados con técnicos certificados Hikvision y Suprema.",
      image: "/ss/Imagen15.png"
    },
    {
      icon: <ThermometerSnowflake className="w-6 h-6 text-emerald-400" />,
      title: "Refrigeración y Calefacción",
      subtitle: "Sistemas de Refrigeración de Precisión e Industrial HVAC",
      desc: "Controlamos y regulamos las condiciones de temperatura y humedad en salas de servidores y oficinas técnicas. Diseñamos sistemas de pasillo frío/caliente, conductos de distribución y equipos HVAC de precisión para garantizar la vida útil de tus equipos.",
      bullets: [
        "Equipos de refrigeración de precisión In-Row y perimetrales para contención térmica en Data Centers.",
        "Sistemas de climatización central comercial e industrial (sistemas VRF, Rooftops, chillers).",
        "Control inteligente de humedad relativa y temperatura constante las 24 horas.",
        "Mantenimiento predictivo térmico con auditorías de termografía infrarroja y refacciones originales."
      ],
      keywords: ["climatización técnica", "aire de precisión", "sistemas VRF", "HVAC industrial", "termografía"],
      features: "Guardia técnica permanente y control de humedad de precisión industrial.",
      image: "/ss/Imagen32.jpg"
    }
  ];

  return (
    <section id="servicios" className="relative py-24 md:py-32 bg-[#061014] text-white overflow-hidden">
      {/* Premium Solid Blue Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#041219] via-[#0b2434] to-[#041219] pointer-events-none">
        {/* Sleek Cyber Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0, 196, 249,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0, 196, 249,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25" />
        {/* Soft radial glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#00c4f9]/5 rounded-full blur-[120px]" />
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
          
          {/* Columna izquierda: galería asimétrica + navegación */}
          <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:gap-8">
            {/* Carrusel 3D — layout asimétrico */}
            <div className="relative w-full">
              <div
                className="absolute -top-3 -right-2 lg:-right-6 w-[88%] h-full rounded-2xl border border-emerald-500/15 bg-emerald-500/5 rotate-3 pointer-events-none"
                aria-hidden
              />
              <div
                className="absolute -bottom-2 -left-3 lg:-left-6 w-[92%] h-full rounded-2xl border border-[#00c4f9]/10 bg-[#00c4f9]/5 -rotate-2 pointer-events-none"
                aria-hidden
              />
              <div className="relative z-10 -rotate-1 lg:-rotate-[1.5deg] translate-x-1 lg:translate-x-4 rounded-xl overflow-hidden border border-emerald-500/25 bg-[#0b141b]/60 shadow-[0_16px_48px_rgba(0,0,0,0.45)] px-2 pt-3 pb-2">
                <HeroSection
                  compact
                  title="Portafolio // Infraestructura"
                  subtitle="Proyectos reales en data centers, fibra, energía y seguridad."
                  images={SS_GALLERY_CAROUSEL}
                  autoPlay
                  autoPlayInterval={4500}
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-1 right-6 lg:right-10 w-12 h-12 border-r-2 border-b-2 border-emerald-500/40 rounded-br-lg pointer-events-none z-20" aria-hidden />
            </div>

            {/* Pestañas de servicios — desplazadas al lado opuesto */}
            <div className="flex flex-col gap-3 lg:translate-x-6 lg:-mt-2 relative z-10">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-4 text-left p-4.5 rounded-xl border transition-all duration-300 ${
                  activeTab === index
                    ? "bg-[#0b141b]/90 border-emerald-500/30 text-white shadow-[0_4px_20px_rgba(0, 196, 249,0.08)] scale-[1.01]"
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
                <div className="relative group rounded-xl overflow-hidden border border-emerald-500/30 bg-[#061014]/90 shadow-[0_0_20px_rgba(0, 196, 249,0.1)] transition-all duration-500 hover:border-emerald-500/60">
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
