"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { BrandPaletteAccent } from "@/components/ui/brand-palette-accent";

// Unified 9 network hubs mapped with precise real-world latitudes and longitudes
const nodes = [
  { 
    id: 'sjn', 
    city: "San Juan, Capital", 
    branchName: "Sede Regional - San Juan Capital",
    region: "Región Cuyo", 
    lat: -31.5375, 
    lng: -68.5364, 
    status: 'Operativo', 
    ping: '8ms',
    isHQ: false
  },
  { 
    id: 'sjb', 
    city: "San Juan, Barreal", 
    branchName: "Nodo Cuyo - Barreal",
    region: "Región Andina / Calingasta", 
    lat: -31.6441, 
    lng: -69.4533, 
    status: 'Operativo', 
    ping: '12ms',
    isHQ: false
  },
  { 
    id: 'caba', 
    city: "Microcentro, CABA", 
    branchName: "Enlace Metropolitano - Microcentro",
    region: "Capital Federal", 
    lat: -34.6037, 
    lng: -58.3816, 
    status: 'Operativo', 
    ping: '2ms',
    isHQ: false
  },
  { 
    id: 'pba', 
    city: "Ramos Mejía, Buenos Aires", 
    branchName: "Casa Central - Ramos Mejía",
    region: "Sede Central / GBA", 
    lat: -34.6469, 
    lng: -58.5615, 
    status: 'Operativo', 
    ping: '3ms',
    isHQ: true 
  },
  { 
    id: 'ros', 
    city: "Rosario, Santa Fe", 
    branchName: "Base Rosario - Santa Fe",
    region: "Litoral / Santa Fe", 
    lat: -32.9468, 
    lng: -60.6393, 
    status: 'Operativo', 
    ping: '10ms',
    isHQ: false
  },
  { 
    id: 'sfe', 
    city: "Santa Fe, Capital", 
    branchName: "Base Santa Fe - Capital",
    region: "Litoral / Santa Fe", 
    lat: -31.6333, 
    lng: -60.7000, 
    status: 'Operativo', 
    ping: '11ms',
    isHQ: false
  },
  { 
    id: 'par', 
    city: "Paraná, Entre Ríos", 
    branchName: "Base Paraná - Entre Ríos",
    region: "Litoral / Entre Ríos", 
    lat: -31.7319, 
    lng: -60.5288, 
    status: 'Operativo', 
    ping: '13ms',
    isHQ: false
  },
  { 
    id: 'cal', 
    city: "Caleta Olivia, Santa Cruz", 
    branchName: "Base Patagonia - Caleta Olivia",
    region: "Patagonia / Santa Cruz", 
    lat: -46.4412, 
    lng: -67.5273, 
    status: 'Operativo', 
    ping: '35ms',
    isHQ: false
  },
  { 
    id: 'rio', 
    city: "Río Gallegos, Santa Cruz", 
    branchName: "Hub Austral - Río Gallegos",
    region: "Patagonia / Santa Cruz", 
    lat: -51.6226, 
    lng: -69.2181, 
    status: 'Operativo', 
    ping: '42ms',
    isHQ: false
  }
];

export function FooterSection() {
  const footerMapContainerRef = useRef<HTMLDivElement>(null);
  const footerMapInstanceRef = useRef<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [hoveredFooterNode, setHoveredFooterNode] = useState<number | null>(null);
  const [hqHovered, setHqHovered] = useState(false);

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

  // 2. Initialize Leaflet Map for the Footer
  useEffect(() => {
    if (!leafletLoaded || !footerMapContainerRef.current) return;

    const L = (window as any).L;

    if (footerMapInstanceRef.current) {
      footerMapInstanceRef.current.remove();
    }

    // Centered in Argentina but zoomed out for the miniature format
    const map = L.map(footerMapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      touchZoom: false,
    }).setView([-39.0, -64.0], 3.2);

    footerMapInstanceRef.current = map;

    // Dark-mode Map Tiles (CartoDB Dark Matter)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18,
    }).addTo(map);

    const markers: any[] = [];
    const polylines: any[] = [];

    // Central Node (Capital Federal is index 2)
    const centralNode = nodes[2];

    nodes.forEach((node, index) => {
      const isMaintenance = node.status === 'Mantenimiento';
      const colorClass = isMaintenance ? 'bg-orange-500 shadow-orange-500/50' : 'bg-emerald-500 shadow-emerald-500/50';
      const pulseClass = isMaintenance ? 'animate-pulse-orange' : 'animate-pulse-green';

      // Custom Glowing Pulsar DivIcon (small format)
      const customIcon = L.divIcon({
        className: 'custom-leaflet-icon',
        html: `
          <div class="relative flex h-4 w-4 items-center justify-center cursor-pointer">
            <span class="absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-40 ${pulseClass}"></span>
            <span class="absolute inline-flex h-[80%] w-[80%] rounded-full ${colorClass} opacity-20 animate-ping"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 ${colorClass} border border-slate-950/80"></span>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);
      markers.push(marker);

      // Mouse events to trigger live HUD telemetry
      marker.on("mouseover", () => {
        setHoveredFooterNode(index);
      });

      marker.on("mouseout", () => {
        setHoveredFooterNode(null);
      });

      // Polylines from every provincial node to the Central Hub
      if (index !== 2) {
        const polyline = L.polyline([[node.lat, node.lng], [centralNode.lat, centralNode.lng]], {
          color: "#1e293b",
          weight: 0.6,
          dashArray: "2, 4",
        }).addTo(map);
        polylines.push({ polyline, index });
      }
    });

    return () => {
      if (footerMapInstanceRef.current) {
        footerMapInstanceRef.current.remove();
        footerMapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // 3. Connect HQ Hover State with Map Highlighting
  useEffect(() => {
    if (hqHovered) {
      setHoveredFooterNode(3); // Index 3 is Sede Central (Buenos Aires/Ramos Mejía)
    } else {
      setHoveredFooterNode(null);
    }
  }, [hqHovered]);

  return (
    <footer className="relative bg-[#04080c] text-white pt-20 pb-12 border-t border-brand-primary/10 shadow-[0_-8px_40px_rgba(0,196,249,0.06)] overflow-hidden">
      <BrandPaletteAccent variant="strip" className="absolute top-0 inset-x-0" />
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Styled overrides for Leaflet map elements and scanner line */}
      <style dangerouslySetInnerHTML={{ __html: `

        .animate-pulse-green { animation: pulseGreen 2s infinite; }
        .animate-pulse-orange { animation: pulseOrange 2s infinite; }
        
        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(0, 196, 249, 0.75); }
          70% { box-shadow: 0 0 0 8px rgba(0, 196, 249, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 196, 249, 0); }
        }
        @keyframes pulseOrange {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.75); }
          70% { box-shadow: 0 0 0 8px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }

        .custom-leaflet-icon { background: transparent !important; border: none !important; }
        
        .leaflet-container { 
          background: #04080c !important; 
          outline: none !important;
          z-index: 10 !important;
        }
      `}} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Logo and B2B Description */}
          <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-slate-900/50 lg:pr-6">
            <Link href="/" className="flex items-center">
              <img 
                src="/greenworking-soluciones-tecnologicas-logo-green-vf-1.png" 
                alt="Greenworking" 
                className="h-10 w-auto object-contain hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              />
            </Link>
            
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
              Especialistas en ingeniería e infraestructura tecnológica integral para organizaciones que necesitan operar sin interrupciones. Conectando y protegiendo el futuro digital de las empresas más exigentes de la Argentina.
            </p>

            <div className="flex flex-col gap-2.5">
              <div className="inline-flex items-center gap-2 w-fit px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 rounded-md text-[11px] font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>INFRAESTRUCTURA DE ALTA DISPONIBILIDAD</span>
              </div>
              <div className="inline-flex items-center gap-2 w-fit px-3 py-1 bg-slate-950/40 border border-slate-800/20 rounded-md text-[10px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SISTEMA: ONLINE // REDUNDANCIA ACTIVA</span>
              </div>
              <div className="pt-2">
                <Link
                  href="#marca"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-all duration-300 shadow-[0_0_15px_rgba(0, 196, 249,0.05)] w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#00c4f9]"></span>
                  Visualizar Marca 3D
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-5 lg:pl-4 lg:border-r lg:border-slate-900/50 lg:pr-4">
            <h4 className="text-xs uppercase text-slate-400 tracking-wider font-bold font-mono border-l-2 border-emerald-500 pl-2">
              Navegación
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400 font-light font-mono">
              {[
                { href: "#propuesta", label: "Propuesta de Valor", num: "01" },
                { href: "#servicios", label: "Servicios Principales", num: "02" },
                { href: "#data-centers", label: "Data Centers & Racks", num: "03" },
                { href: "#industrias", label: "Soluciones Industriales", num: "04" },
                { href: "#proyectos", label: "Casos de Éxito", num: "05" },
                { href: "#marca", label: "Marca 3D (Modelo)", num: "06" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 group">
                    <span className="text-[9px] text-emerald-500/40 group-hover:text-emerald-400 font-bold">{item.num}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div className="lg:col-span-3 space-y-5 lg:pl-4 lg:border-r lg:border-slate-900/50 lg:pr-4">
            <h4 className="text-xs uppercase text-slate-400 tracking-wider font-bold font-mono border-l-2 border-emerald-500 pl-2">
              Credenciales S.A.
            </h4>
            <ul className="space-y-4 text-xs text-gray-400 font-light">
              <li 
                className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-800/40 hover:bg-slate-950/20 transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setHqHovered(true)}
                onMouseLeave={() => setHqHovered(false)}
              >
                <MapPin className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400 flex-shrink-0 mt-0.5 transition-colors" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-white text-[11px] group-hover:text-emerald-400 transition-colors">SEDE CENTRAL [HQ]</span>
                  <span className="leading-relaxed text-gray-400 text-[11px] group-hover:text-white transition-colors">Humboldt 324, Ramos Mejía, Prov. de Buenos Aires, Argentina.</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-800/40 hover:bg-slate-950/20 transition-all duration-300 group">
                <Phone className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400 flex-shrink-0 mt-0.5 transition-colors" />
                <div className="flex flex-col gap-1 text-[11px]">
                  <span className="font-bold text-white text-[11px] group-hover:text-emerald-400 transition-colors">CENTRO DE SOPORTE</span>
                  <a href="tel:+541139740970" className="hover:text-white text-gray-400 transition-colors">011 3974-0970</a>
                  <a href="tel:+541124026142" className="hover:text-white text-gray-400 transition-colors">(011) 2402-6142</a>
                </div>
              </li>
              
              <li className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-800/40 hover:bg-slate-950/20 transition-all duration-300 group">
                <Mail className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400 flex-shrink-0 mt-0.5 transition-colors" />
                <div className="flex flex-col gap-0.5 text-[11px] w-full min-w-0">
                  <span className="font-bold text-white text-[11px] group-hover:text-emerald-400 transition-colors">CONSULTAS GENERALES</span>
                  <a href="mailto:info@greenworking.com.ar" className="hover:text-white text-gray-400 transition-colors truncate block">info@greenworking.com.ar</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Argentina Sedes HUD Leaflet Map */}
          <div className="lg:col-span-3 space-y-4 lg:pl-4">
            <h4 className="text-xs uppercase text-slate-400 tracking-wider font-bold font-mono border-l-2 border-emerald-500 pl-2">
              Cobertura Nacional
            </h4>
            
            <div className="relative border border-slate-800/80 bg-slate-950/40 backdrop-blur-md rounded-xl overflow-hidden h-[180px] hover:border-emerald-500/20 transition-all duration-500 group shadow-inner">
              
              {/* Radar grid backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#00c4f9_1px,transparent_1px)] bg-[size:10px_10px] opacity-[0.03] pointer-events-none z-20"></div>

              {/* Leaflet map holder */}
              {!leafletLoaded ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-[#061014] text-emerald-400 font-mono text-[9px] select-none">
                  <span className="animate-pulse">CARGANDO RADAR DE COBERTURA...</span>
                </div>
              ) : (
                <div ref={footerMapContainerRef} className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              {/* Dark vignette to blend map edges */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_15px_rgba(4,8,12,0.95)] z-20"></div>
            </div>
          </div>

        </div>

        {/* Footer Bottom bar */}
        <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-light">
          <div>
            <span>© {new Date().getFullYear()} Greenworking S.A. Todos los derechos reservados.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="/robots.txt" className="hover:text-emerald-400 transition-colors">Robots.txt</a>
            <a href="/sitemap.xml" className="hover:text-emerald-400 transition-colors">Sitemap XML</a>
            <span className="font-mono">IP: 190.111.99.* (Argentina Core)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
