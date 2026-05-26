"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Globe, CheckCircle, RefreshCw, Radio, Server } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Unified 9 network hubs mapped with precise real-world latitudes and longitudes, pings, and descriptions
const nodes = [
  { 
    id: 'sjn', 
    city: "San Juan", 
    branchName: "Sede Principal - San Juan",
    region: "Región Cuyo", 
    desc: "Instalación de UPS trifásicas online de respaldo y climatización de precisión para salas técnicas e industrias locales.", 
    lat: -31.5375, 
    lng: -68.5364, 
    status: 'Conexión Directa', 
    ping: '2ms', 
    isLocal: true 
  },
  { 
    id: 'igl', 
    city: "Iglesia, San Juan", 
    branchName: "Nodo Minero - Iglesia, San Juan",
    region: "Región Andina Minera", 
    desc: "Infraestructura robusta de fibra óptica armada y enlaces de contingencia IP67 en altura para campamentos mineros a gran escala.", 
    lat: -30.3019, 
    lng: -69.2133, 
    status: 'Operativo', 
    ping: '14ms' 
  },
  { 
    id: 'caba', 
    city: "Capital Federal", 
    branchName: "Switch Central - Capital Federal",
    region: "Centro Metropolitano", 
    desc: "Soporte corporativo de alta disponibilidad, despliegues de cableado Cat8 y soporte especializado on-site para data centers bancarios.", 
    lat: -34.6037, 
    lng: -58.3816, 
    status: 'Operativo', 
    ping: '12ms' 
  },
  { 
    id: 'pba', 
    city: "Buenos Aires", 
    branchName: "Enlace Provincia - Buenos Aires",
    region: "Sede Central / GBA", 
    desc: "Base operativa central corporativa, laboratorios de fusión por arco y testing de equipamiento crítico. Cobertura completa en GBA y provincia.", 
    lat: -34.9214, 
    lng: -57.9545, 
    status: 'Operativo', 
    ping: '15ms' 
  },
  { 
    id: 'ros', 
    city: "Rosario", 
    branchName: "Datacenter - Rosario",
    region: "Litoral / Santa Fe", 
    desc: "Soluciones de alta densidad y CCTV termográfico con analíticas de IA para terminales portuarias agro-exportadoras.", 
    lat: -32.9468, 
    lng: -60.6393, 
    status: 'Operativo', 
    ping: '18ms' 
  },
  { 
    id: 'sfe', 
    city: "Santa Fe", 
    branchName: "Nodo Litoral - Santa Fe",
    region: "Región Litoral", 
    desc: "Distribución de redes industriales OT segregadas para plantas lácteas y de alimentos. Monitoreo ambiental de salas críticas.", 
    lat: -31.6333, 
    lng: -60.7000, 
    status: 'Operativo', 
    ping: '20ms' 
  },
  { 
    id: 'par', 
    city: "Paraná", 
    branchName: "Conexión Mesopotamia - Paraná",
    region: "Región Litoral", 
    desc: "Diseño e ingeniería en telecomunicaciones, tendidos aéreos e interconexiones redundantes entre data centers gubernamentales.", 
    lat: -31.7319, 
    lng: -60.5288, 
    status: 'Operativo', 
    ping: '22ms' 
  },
  { 
    id: 'cal', 
    city: "Caleta Olivia", 
    branchName: "Base Sur - Caleta Olivia",
    region: "Patagonia Atlántica", 
    desc: "Redes industriales robustas y videovigilancia inteligente PoE para puertos, logística y bases de soporte energético.", 
    lat: -46.4412, 
    lng: -67.5273, 
    status: 'Operativo', 
    ping: '45ms' 
  },
  { 
    id: 'rio', 
    city: "Río Gallegos", 
    branchName: "Hub Austral - Río Gallegos",
    region: "Patagonia Sur", 
    desc: "Enlaces de telecomunicaciones e infraestructura de respaldo eléctrico crítico para bases y centros de datos gubernamentales.", 
    lat: -51.6226, 
    lng: -69.2181, 
    status: 'Mantenimiento', 
    ping: '65ms' 
  }
];

export function CoverageSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylinesRef = useRef<any[]>([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // 1. Dynamic safe loading of Leaflet styles and script (SSR Compatible)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
  }, []);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;

    const L = (window as any).L;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Centered geographically in the heart of Argentina
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
    }).setView([-38.4161, -63.6167], 4);

    mapInstanceRef.current = map;

    // Dark-mode Map Tiles (CartoDB Dark Matter)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18,
    }).addTo(map);

    // Central Node coordinates (Capital Federal is index 2)
    const centralNode = nodes[2];

    // Plot all nodes and polylines
    nodes.forEach((node, index) => {
      const isMaintenance = node.status === 'Mantenimiento';
      const colorClass = isMaintenance ? 'bg-orange-500 shadow-orange-500/50' : 'bg-emerald-500 shadow-emerald-500/50';
      const pulseClass = isMaintenance ? 'animate-pulse-orange' : 'animate-pulse-green';

      // Custom Glowing Pulsar DivIcon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-icon',
        html: `
          <div class="relative flex h-6 w-6 items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-125">
            <span class="absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-40 ${pulseClass}"></span>
            <span class="absolute inline-flex h-[80%] w-[80%] rounded-full ${colorClass} opacity-20 animate-ping"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 ${colorClass} border border-slate-950/80"></span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);
      markersRef.current[index] = marker;

      // Event handlers for Markers
      marker.on("click", () => {
        setHoveredNode(index);
        map.flyTo([node.lat, node.lng], 6.5, { duration: 1.2 });
      });

      marker.on("mouseover", () => {
        setHoveredNode(index);
      });

      // Polylines from every provincial node to the Central Hub (CABA at index 2)
      if (index !== 2) {
        const polyline = L.polyline([[node.lat, node.lng], [centralNode.lat, centralNode.lng]], {
          color: "#1e293b",
          weight: 0.8,
          dashArray: "3, 6",
          className: "transition-all duration-300"
        }).addTo(map);

        polylinesRef.current[index] = polyline;
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // 3. Keep Polylines and Map in perfect sync with hovering
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    polylinesRef.current.forEach((polyline, index) => {
      if (!polyline) return;
      const isHovered = hoveredNode === index;

      polyline.setStyle({
        color: isHovered ? "#10b981" : "#1e293b",
        weight: isHovered ? 2.5 : 0.8,
        dashArray: isHovered ? "8, 4" : "3, 6",
      });

      const el = polyline.getElement();
      if (el) {
        if (isHovered) {
          el.classList.add("animate-map-dash");
          el.setAttribute("stroke", "#10b981");
          el.setAttribute("filter", "drop-shadow(0px 0px 4px #10b981)");
        } else {
          el.classList.remove("animate-map-dash");
          el.removeAttribute("filter");
        }
      }
    });

    // Special highlighting on CABA connections when CABA itself is hovered
    if (hoveredNode === 2) {
      polylinesRef.current.forEach((polyline) => {
        if (!polyline) return;
        polyline.setStyle({
          color: "#10b981",
          weight: 1.5,
          dashArray: "6, 4"
        });
        const el = polyline.getElement();
        if (el) {
          el.classList.add("animate-map-dash");
          el.setAttribute("stroke", "#10b981");
        }
      });
    }
  }, [hoveredNode]);

  // Reset viewport function
  const handleResetMap = () => {
    setHoveredNode(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([-38.4161, -63.6167], 4, { duration: 1.2 });
    }
  };

  // Card activation handler
  const handleSelectNode = (index: number) => {
    setHoveredNode(index);
    if (mapInstanceRef.current) {
      const node = nodes[index];
      mapInstanceRef.current.flyTo([node.lat, node.lng], 6.5, { duration: 1.2 });
    }
  };

  return (
    <section id="cobertura" className="relative py-24 bg-[#061014] text-white border-t border-slate-900 overflow-hidden">
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none z-0"></div>

      {/* Styled overrides for Leaflet map elements */}
      <style>
        {`
          .animate-pulse-green { animation: pulseGreen 2s infinite; }
          .animate-pulse-orange { animation: pulseOrange 2s infinite; }
          
          @keyframes pulseGreen {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.75); }
            70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          @keyframes pulseOrange {
            0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.75); }
            70% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
            100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
          }

          @keyframes mapDash {
            to {
              stroke-dashoffset: -20;
            }
          }
          .animate-map-dash {
            animation: mapDash 0.7s linear infinite !important;
          }

          .custom-leaflet-icon { background: transparent !important; border: none !important; }
          .leaflet-container { 
            background: #061014 !important; 
            z-index: 10 !important; 
            outline: none !important;
          }
        `}
      </style>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text & Active Nodes Interactive Controls */}
          <motion.div 
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
              Capacidad Logística
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Presencia y capacidad <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-500">
                operativa nacional.
              </span>
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
              Brindamos soluciones de infraestructura tecnológica de primer nivel en las principales regiones productivas del país. Acompañamos tus proyectos corporativos, industriales e institucionales allá donde esté tu operación, garantizando la misma precisión de ingeniería y respuesta profesional en cada kilómetro.
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-900">
              <h3 className="text-xs uppercase text-slate-500 tracking-wider font-semibold font-mono flex items-center gap-2 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Nodos Logísticos de Servicio ({nodes.length} Sedes):
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nodes.map((node, index) => (
                  <button
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(index)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleSelectNode(index)}
                    className={`group flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden ${
                      hoveredNode === index 
                        ? "bg-[#0b141b]/95 border-emerald-500/40 text-white shadow-[0_4px_20px_rgba(16,185,129,0.08)] scale-[1.01]" 
                        : "bg-[#0b141b]/40 border-slate-900/60 text-gray-400 hover:bg-[#0b141b]/70 hover:border-slate-800 hover:text-white"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      hoveredNode === index 
                        ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30" 
                        : "bg-slate-950 text-gray-500 border border-slate-900"
                    }`}>
                      <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-white block text-xs truncate transition-colors duration-300 group-hover:text-emerald-400">
                        {node.city}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono tracking-wider block mt-0.5 truncate uppercase">
                        {node.region}
                      </span>
                    </div>
                    
                    {/* Status color bar */}
                    <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'Mantenimiento' ? 'bg-orange-500 group-hover:shadow-[0_0_8px_#f97316]' : 'bg-emerald-500 group-hover:shadow-[0_0_8px_#10b981]'} transition-all duration-300`}></div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
  
          {/* RIGHT: Dynamic Real Leaflet Map */}
          <motion.div 
            className="lg:col-span-6 bg-[#0b141b]/40 border border-slate-900 rounded-3xl p-4 md:p-6 flex flex-col justify-between items-center relative min-h-[580px] md:min-h-[660px] shadow-[0_15px_45px_rgba(0,0,0,0.35)] overflow-hidden"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Background Grid Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] rounded-3xl pointer-events-none"></div>

            {/* Map Top Navigation bar */}
            <div className="relative z-20 w-full flex justify-between items-center bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-xs font-mono select-none backdrop-blur-sm">
              <span className="text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Telemetría Satelital Real
              </span>
              
              <button 
                onClick={handleResetMap}
                className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-500/20 bg-emerald-950/20 hover:bg-emerald-950/40 px-2.5 py-1 rounded-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Vista
              </button>
            </div>

            {/* Map Container Wrap with vignette masks */}
            <div className="relative z-10 my-4 w-full h-[380px] md:h-[450px] border border-slate-900 rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
              
              {/* Dynamic Leaflet Map Holder */}
              {!leafletLoaded ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-[#061014] text-emerald-400 font-mono text-xs select-none">
                  <Globe className="w-8 h-8 mb-3 animate-spin text-emerald-400" />
                  <span className="animate-pulse">CARGANDO MAPA DE RED...</span>
                </div>
              ) : (
                <div ref={mapContainerRef} className="w-full h-full" />
              )}

              {/* Technical Vignette overlay to fade map edges into the landing page */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(6,16,20,0.85)] z-20 rounded-2xl"></div>

              {/* Dynamic Telemetry HUD overlay in the map corner */}
              <AnimatePresence>
                {hoveredNode !== null && (
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4 bg-slate-950/95 border border-emerald-500/35 rounded-xl p-4 text-left shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md z-30 select-none"
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="font-bold text-white text-sm block truncate">{nodes[hoveredNode].branchName}</span>
                      
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-semibold tracking-wider uppercase border ${
                        nodes[hoveredNode].status === 'Mantenimiento'
                          ? 'bg-orange-950/50 border-orange-500/30 text-orange-400'
                          : 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400 animate-pulse'
                      }`}>
                        {nodes[hoveredNode].status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono uppercase tracking-wide border-b border-slate-900 pb-1.5 mb-1.5">
                      <span>{nodes[hoveredNode].region}</span>
                      <span className="flex items-center gap-1.5 font-bold">
                        <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                        Latencia: {nodes[hoveredNode].ping}
                      </span>
                    </div>

                    <p className="text-[10px] text-gray-400 leading-relaxed font-light">{nodes[hoveredNode].desc}</p>
                    
                    {/* Diagnostic metadata details */}
                    <div className="mt-2.5 pt-2 border-t border-slate-900/60 flex justify-between items-center text-[8.5px] font-mono text-slate-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <Server className="w-3 h-3 text-slate-600" />
                        IP_TRUNK: NODE_0{hoveredNode + 1}
                      </span>
                      <span>COORD: {nodes[hoveredNode].lat.toFixed(4)}°S, {nodes[hoveredNode].lng.toFixed(4)}°W</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom operational disclaimer */}
            <div className="w-full text-center text-[10px] text-slate-500 font-mono select-none">
              *Trazado de enlaces redundantes y respuesta técnica coordinada a nivel nacional.
            </div>

          </motion.div>
  
        </div>
      </div>
    </section>
  );
}
