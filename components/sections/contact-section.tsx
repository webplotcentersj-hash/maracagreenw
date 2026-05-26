"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Bot, X } from "lucide-react";
import { NeutrinoBackground } from "@/components/ui/neutrino-background";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface Intent {
  keywords: string[];
  response: string;
}

const KNOWLEDGE_BASE: Intent[] = [
  {
    keywords: ["hola", "buen", "dia", "tarde", "noche", "saludos", "que tal", "alguien"],
    response: "¡Hola! Un gusto saludarte. Soy el **Asistente de Inteligencia Artificial de Green Working S.A.**\n\nEstoy capacitado para brindarte información técnica e institucional sobre nuestros servicios de infraestructura de telecomunicaciones, energía crítica, climatización técnica de precisión y soporte técnico corporativo.\n\n¿En qué puedo asistirte hoy?"
  },
  {
    keywords: ["servicio", "servicios", "que hacen", "ofrecen", "ingenieria", "portafolio", "solucion", "soluciones", "trabajos", "obra", "obras"],
    response: "En **Green Working S.A.** desarrollamos soluciones de infraestructura tecnológica de nivel industrial. Nuestro catálogo abarca:\n\n* **Redes y Cableado Estructurado**: Diseño de tendidos de Cat6, Cat6A y Cat8 de alta densidad.\n* **Fibra Óptica**: Tendidos aéreos, subterráneos y fusiones por arco voltaico en planta interna y externa.\n* **Data Centers y Salas Técnicas**: Construcción 'llave en mano', pasillos fríos/calientes y cerramientos de contención.\n* **Energía Crítica e Ininterrumpida**: Sistemas de UPS modulares, bancos de baterías y grupos electrógenos.\n* **Climatización de Precisión**: Equipos de aire acondicionado técnicos para control exacto de humedad y temperatura (HVAC).\n* **Seguridad Electrónica**: CCTV IP, control de accesos biométrico e intrusión para plantas industriales.\n\n¿Te interesaría recibir asesoramiento específico sobre alguno de estos servicios?"
  },
  {
    keywords: ["fibra", "optica", "optico", "opticos", "tendido", "fusion", "fusiones", "otdr"],
    response: "Somos especialistas en **infraestructura de Fibra Óptica** de alta capacidad para entornos exigentes:\n\n* **Tendidos de Planta Externa e Interna**: Canalizaciones subterráneas, aéreas, bandejas portacables e infraestructura de ductos.\n* **Fusión por Arco Voltaico**: Contamos con fusionadoras de última generación que garantizan una atenuación de empalme inferior a 0.02 dB.\n* **Certificación y Medición**: Informes detallados de reflectometría óptica mediante instrumental OTDR y Power Meters calibrados.\n* **Mantenimiento Preventivo y Correctivo**: Localización rápida de cortes de fibra y reparación de emergencia 24/7.\n\n¿Estás planificando una interconexión entre sedes o un backbone de fibra?"
  },
  {
    keywords: ["data center", "data centers", "datacenter", "datacenters", "sala tecnica", "salas tecnicas", "rack", "racks", "servidores"],
    response: "Diseñamos y construimos **Data Centers y Salas Técnicas** de alta disponibilidad bajo estándares internacionales:\n\n* **Diseño e Ingeniería**: Distribución física de racks, optimización del espacio de pasillo frío y pasillo caliente.\n* **Sistemas de Contención**: Cerramientos para aislamiento térmico que reducen el consumo energético hasta un 30%.\n* **Monitoreo Ambiental**: Sensores IP de temperatura, humedad, inundación y gases para alertas tempranas.\n* **Piso Técnico**: Suministro e instalación de placas modulares con recubrimientos antiestáticos y alta capacidad de carga estructural.\n\n¿Tenés en mente el rediseño de tu sala de servidores actual o una obra de cero?"
  },
  {
    keywords: ["energia", "ups", "critica", "bateria", "baterias", "tension", "corte", "cortes", "grupo", "electrogeno", "tablero", "tableros"],
    response: "Para asegurar la continuidad de tus operaciones críticas, ofrecemos soluciones integrales de **Energía Crítica e Ininterrumpida**:\n\n* **UPS Modulares y Monolíticas**: Sistemas monofásicos y trifásicos desde 1kVA hasta potencias de escala industrial con redundancia N+1 o 2N.\n* **Bancos de Baterías**: Reemplazo de celdas VRLA/Litio, pruebas de descarga y mantenimiento preventivo sistemático.\n* **Tableros de Transferencia Automática (TTA)**: Conmutación segura y automática entre red comercial y grupos electrógenos.\n* **Análisis de Calidad de Energía**: Medición de armónicos, fluctuaciones de tensión y corrección del factor de potencia.\n\n¿Buscás proteger tus servidores o maquinaria industrial contra cortes eléctricos?"
  },
  {
    keywords: ["seguridad", "cctv", "camara", "camaras", "acceso", "accesos", "biometrico", "alarma", "control", "intrusion", "monitoreo"],
    response: "Implementamos sistemas avanzados de **Seguridad Electrónica y Control de Accesos** corporativos:\n\n* **Sistemas de CCTV IP**: Cámaras de alta resolución con analítica de video por IA, visión nocturna avanzada y grabación centralizada o en nube.\n* **Control de Accesos**: Lectores biométricos, tarjetas de proximidad RFID, reconocimiento facial y barreras vehiculares de alto tránsito.\n* **Sistemas de Intrusión**: Detección perimetral mediante barreras infrarrojas, sensores de movimiento de doble tecnología y paneles conectados a central de alarmas.\n* **Sistemas de Detección e Incendio**: Centrales direccionables, sensores ópticos de humo y barreras lineales en naves industriales.\n\n¿Querés modernizar el control de acceso en tus plantas o el sistema de vigilancia?"
  },
  {
    keywords: ["clima", "climatizacion", "aire", "acondicionado", "precision", "humedad", "temperatura", "frio", "calor", "hvac"],
    response: "Garantizamos las condiciones óptimas de operación para tu hardware mediante **Climatización de Precisión**:\n\n* **Equipos Técnicos HVAC**: Control estricto de temperatura (+/- 1°C) y humedad relativa (+/- 5%) las 24 horas del día.\n* **Flujo de Aire Optimizado**: Sistemas de inyección inferior (bajo piso técnico) o superior para un enfriamiento focalizado en servidores.\n* **Eficiencia Energética**: Compresores con tecnología Inverter y sistemas de free-cooling para reducir el coeficiente PUE del Data Center.\n* **Servicio Técnico de Guardia**: Cobertura de emergencia por fallas en compresores o pérdida de refrigerante.\n\n¿Necesitás cotizar la climatización de una sala técnica nueva?"
  },
  {
    keywords: ["sede", "sedes", "donde estan", "oficina", "oficinas", "cobertura", "alcanze", "alcance", "mapa", "argentina", "buenos aires", "ramos mejia", "provincias", "donde operan", "interior"],
    response: "En **Green Working S.A.** tenemos un alcance de cobertura federal y operamos de manera activa en **toda la República Argentina**:\n\n* **Sede Central / HQ**: Ubicada en Humboldt 324, Ramos Mejía, Provincia de Buenos Aires (Zona Oeste GBA).\n* **Nodos de Operación Local**: Contamos con bases operativas, cuadrillas y depósitos logísticos estratégicamente ubicados en:\n  * **Región Centro**: Córdoba y Rosario (Santa Fe).\n  * **Región Cuyo**: Mendoza.\n  * **Región Norte**: San Miguel de Tucumán.\n  * **Región Patagonia / Sur**: Neuquén y Comodoro Rivadavia.\n\nEsto nos permite realizar despliegues de infraestructura complejos en cualquier punto del país, garantizando tiempos de respuesta mínimos e ingeniería de campo local."
  },
  {
    keywords: ["urgencia", "urgencias", "soporte", "mantenimiento", "abono", "poliza", "guardia", "guardias", "24/7", "sla", "horas", "emergencia", "emergencias"],
    response: "Entendemos que la infraestructura de IT es el motor de tu empresa. Por eso ofrecemos **Servicios de Mantenimiento y Pólizas de Soporte con SLA Garantizado**:\n\n* **Guardias Técnicas 24/7/365**: Ingenieros y técnicos de campo disponibles de forma permanente para incidentes críticos.\n* **Acuerdos de Nivel de Servicio (SLA)**: Tiempos de respuesta física en sitio desde **2 a 4 horas** para abonados corporativos.\n* **Mantenimiento Preventivo Planificado**: Visitas programadas mensuales o bimestrales para limpieza, calibración, pruebas de baterías y control de tableros.\n* **Atención Remota y Help Desk**: Asistencia telefónica inmediata y diagnóstico inicial mediante herramientas de gestión IP.\n\n¿Tu empresa requiere un abono de soporte técnico mensual con SLA estricto?"
  },
  {
    keywords: ["mineria", "minero", "minera", "altura", "puna", "patagonia", "desierto", "petroleo", "gas", "industria", "industrial", "especial", "extrema", "extremas"],
    response: "Tenemos amplia experiencia en **Proyectos Especiales en Entornos Extremos**, adaptando la ingeniería a condiciones geográficas y climáticas hostiles:\n\n* **Despliegues Mineros**: Infraestructura de telecomunicaciones, shelter técnicos de energía y enlaces de fibra óptica en alta montaña (a más de 4000 msnm) en la Puna argentina (Salta, Jujuy, Catamarca).\n* **Sector Oil & Gas**: Sistemas de comunicación robustos, CCTV a prueba de explosión (ATEX) y gabinetes industriales con protección ambiental extrema en pozos de la Patagonia (Neuquén, Vaca Muerta, Santa Cruz).\n* **Shelters Autónomos**: Contenedores marítimos reacondicionados como salas técnicas móviles con energía solar híbrida y climatización reforzada.\n\nNuestros ingenieros cuentan con certificaciones médicas de altura, cursos de seguridad industrial específicos e instrumental resistente a climas extremos."
  },
  {
    keywords: ["contacto", "telefono", "mail", "correo", "llamar", "hablar", "presupuesto", "cotizacion", "comunicar", "direccion", "humboldt", "mapa", "ubicar", "donde queda"],
    response: "Podés comunicarte con nuestro departamento de ingeniería de las siguientes formas:\n\n* 📞 **Teléfono de Ingeniería**: [011 3974-0970](tel:+541139740970) (Lunes a Viernes de 8:00 a 18:00 hs).\n* ✉️ **Correo Electrónico**: [info@greenworking.com.ar](mailto:info@greenworking.com.ar) (Las consultas comerciales se responden en menos de 2 horas hábiles).\n* 📍 **Sede Central**: Humboldt 324, Ramos Mejía, Provincia de Buenos Aires (Argentina).\n\nSi lo preferís, también podés completar el **Formulario de Diagnóstico Técnico** que se encuentra aquí al lado, y un ingeniero especialista te contactará de inmediato."
  },
  {
    keywords: ["gracias", "excelente", "buenisimo", "perfecto", "joya", "espectacular", "crack", "genio", "entendido", "ok", "bueno"],
    response: "¡De nada! Es un placer ayudarte. En Green Working S.A. trabajamos para brindar soluciones tecnológicas de excelencia.\n\nSi tenés alguna otra consulta sobre redes, fibra óptica, UPS, Data Centers o proyectos en el interior del país, no dudes en escribirme. ¡Que tengas un excelente día!"
  }
];

const getAIResponse = (userMessage: string): string => {
  const normalized = userMessage.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:]/g, "");

  const words = normalized.split(/\s+/).filter(w => w.length > 0);

  let bestIntent: Intent | null = null;
  let maxScore = 0;

  for (const intent of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const cleanKeyword = keyword.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (cleanKeyword.includes(" ")) {
        if (normalized.includes(cleanKeyword)) {
          score += 3;
        }
      } else {
        for (const word of words) {
          if (word === cleanKeyword) {
            score += 2;
          } else if (word.startsWith(cleanKeyword) || cleanKeyword.startsWith(word)) {
            if (cleanKeyword.length > 3 && word.length > 3) {
              score += 1;
            }
          }
        }
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  if (maxScore > 0 && bestIntent) {
    return bestIntent.response;
  }

  return "Aprecio tu consulta. Para brindarte una respuesta precisa, me especializo en temas como:\n\n* 🛠️ **Servicios de Ingeniería** (redes, fibra óptica, Data Centers, UPS modulares, CCTV).\n* 📍 **Sede Central y Cobertura Nacional** (nodos operativos en todo el país).\n* ⚡ **Urgencias 24/7 y Pólizas de Soporte** (SLA de 2 a 4 horas).\n* 🏔️ **Proyectos Extremos** (infraestructura minera en la Puna y Oil & Gas en Patagonia).\n* 📞 **Datos de Contacto Directo** (teléfono, email y ubicación de la sede).\n\n¿Podrías reformular tu pregunta incluyendo algunos de estos términos, o preferís que te proporcione el contacto de un ingeniero comercial?";
};

const formatChatMessage = (text: string) => {
  return text.split("\n").map((line, i) => {
    let content = line;
    const isBullet = content.startsWith("* ") || content.startsWith("- ");
    if (isBullet) {
      content = content.substring(2);
    }
    
    const boldParts = content.split("**");
    const renderedLine = boldParts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-bold text-emerald-400">{part}</strong>;
      }
      
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const links = [...part.matchAll(linkRegex)];
      if (links.length > 0) {
        const linkParts = [];
        let lastIdx = 0;
        part.replace(linkRegex, (match, linkText, href, offset) => {
          linkParts.push(part.substring(lastIdx, offset));
          linkParts.push(
            <a 
              key={offset} 
              href={href} 
              className="text-emerald-400 hover:text-emerald-300 underline font-medium"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {linkText}
            </a>
          );
          lastIdx = offset + match.length;
          return match;
        });
        linkParts.push(part.substring(lastIdx));
        return <span key={idx}>{linkParts}</span>;
      }
      return <span key={idx}>{part}</span>;
    });

    if (isBullet) {
      return (
        <li key={i} className="ml-4 list-disc text-gray-300 mb-1.5 leading-relaxed text-xs">
          {renderedLine}
        </li>
      );
    } else {
      return (
        <p key={i} className="text-gray-300 mb-2 leading-relaxed text-xs min-h-[0.5rem]">
          {renderedLine}
        </p>
      );
    }
  });
};

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "redes",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  // Chatbot States
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "¡Hola! Soy el **Asistente de IA de Green Working**. Estoy aquí para responder tus consultas técnicas sobre nuestros servicios de infraestructura, cobertura, urgencias técnicas 24/7 y proyectos especiales.\n\n¿En qué puedo ayudarte hoy?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAIResponse(userText);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickChip = (text: string) => {
    if (isTyping) return;

    const cleanText = text.replace(/^[^\s]+\s+/, "");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: cleanText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAIResponse(cleanText);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos envío B2B
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "redes",
        message: ""
      });
    }, 4000);
  };

  return (
    <section id="contacto" className="relative py-24 md:py-32 bg-[#061014] text-white border-t border-slate-900 overflow-hidden">
      {/* Dynamic HTML5 Canvas Neutrino Background */}
      <NeutrinoBackground opacity={0.5} />
      
      {/* Design elements - Glowing Orbs and Tech Grid */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f242d_1px,transparent_1px),linear-gradient(to_bottom,#0f242d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: B2B Copywriting & Contact Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
                Contacto Corporativo
              </div>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Prepará tu empresa para <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
                  operar sin interrupciones.
                </span>
              </h2>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                En <strong>Greenworking S.A.</strong> desarrollamos soluciones de infraestructura tecnológica robusta e integral. Completa el formulario de diagnóstico para coordinar una llamada de evaluación con nuestro equipo de ingenieros o contáctanos de inmediato por nuestros canales directos.
              </p>
            </div>

            {/* Direct contact info - Glassmorphism B2B Cards */}
            <div className="space-y-4">
              <a 
                href="tel:+541139740970"
                className="flex items-center gap-4 p-5 rounded-2xl border border-slate-800/40 bg-slate-950/40 backdrop-blur-md hover:border-emerald-500/40 hover:bg-emerald-950/10 transition-all duration-300 group relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                {/* Slide-in side glow highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>
                <div className="w-11 h-11 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Teléfono de Ingeniería</span>
                  <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">011 3974-0970</span>
                  <span className="text-[11px] text-gray-400 block font-light mt-0.5">Lunes a Viernes 8:00 a 18:00 hs</span>
                </div>
              </a>

              <a 
                href="mailto:info@greenworking.com.ar"
                className="flex items-center gap-4 p-5 rounded-2xl border border-slate-800/40 bg-slate-950/40 backdrop-blur-md hover:border-emerald-500/40 hover:bg-emerald-950/10 transition-all duration-300 group relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                {/* Slide-in side glow highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>
                <div className="w-11 h-11 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Correo Electrónico</span>
                  <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">info@greenworking.com.ar</span>
                  <span className="text-[11px] text-gray-400 block font-light mt-0.5">Respuesta en menos de 2 horas hábiles</span>
                </div>
              </a>

              <div 
                className="flex items-center gap-4 p-5 rounded-2xl border border-slate-800/40 bg-slate-950/40 backdrop-blur-md relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-950/40 border border-emerald-500/10 text-emerald-400/80 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Sede Central</span>
                  <span className="text-sm font-bold text-gray-200">Humboldt 324, Ramos Mejía</span>
                  <span className="text-[11px] text-gray-400 block font-light mt-0.5">Provincia de Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Conversional Technical Form (Highly styled Sci-Fi Panel) */}
          <div className="lg:col-span-7 bg-[#0b141b]/60 backdrop-blur-lg border border-slate-800/80 rounded-2xl p-8 md:p-10 hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden shadow-[0_20px_50px_rgba(6,16,20,0.8)]">
            
            {/* Tech decorative HUD corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-emerald-500/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/30"></div>
            
            {/* Status indicators */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
              <h3 className="text-xl font-bold text-white tracking-wide">
                Solicitar Diagnóstico Técnico Integrado
              </h3>
              <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                PORTAL // ENCRYPTED_SSL
              </div>
            </div>

            {submitted ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-white">¡Solicitud Recibida Correctamente!</h4>
                <p className="text-gray-400 text-sm max-w-sm font-light leading-relaxed">
                  Un ingeniero especialista de nuestro departamento técnico analizará tu caso y se pondrá en contacto contigo en las próximas horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold font-mono block">Nombre y Apellido *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ej. Carlos Pérez" 
                      className="w-full px-4 py-3 border border-slate-800/80 rounded-xl bg-slate-950/50 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold font-mono block">Email Corporativo *</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Ej. cperez@empresa.com" 
                      className="w-full px-4 py-3 border border-slate-800/80 rounded-xl bg-slate-950/50 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold font-mono block">Empresa / Organización *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Ej. Servicios Logísticos S.A." 
                      className="w-full px-4 py-3 border border-slate-800/80 rounded-xl bg-slate-950/50 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold font-mono block">Teléfono de Contacto</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Ej. +54 9 11 1234-5678" 
                      className="w-full px-4 py-3 border border-slate-800/80 rounded-xl bg-slate-950/50 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold font-mono block">Servicio Principal de Interés</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-800/80 rounded-xl bg-slate-950/70 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm font-light transition-all duration-300"
                  >
                    <option value="redes">Redes & Cableado Estructurado</option>
                    <option value="fibra">Tendido de Fibra Óptica</option>
                    <option value="data-centers">Data Centers & Salas Técnicas</option>
                    <option value="energia">Energía Crítica & UPS modulares</option>
                    <option value="seguridad">Seguridad Electrónica & CCTV / Accesos</option>
                    <option value="climatizacion">Climatización Técnica de Precisión</option>
                    <option value="soporte">Pólizas de Soporte & Mantenimiento</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold font-mono block">Detalles del Proyecto / Comentarios</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describa brevemente su requerimiento técnico (Ej. número de puntos de red, potencia de UPS requerida, etc.)" 
                    className="w-full px-4 py-3 border border-slate-800/80 rounded-xl bg-slate-950/50 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm resize-none transition-all duration-300"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl text-center shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
                >
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  <span>Enviar Solicitud a Ingeniería</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Floating Premium AI Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2.5 px-5 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_10px_35px_rgba(16,185,129,0.4)] border border-emerald-400/30 hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase font-mono">(hablanos)</span>
          </button>
        ) : (
          <div className="w-[340px] sm:w-[380px] h-[500px] max-h-[80vh] bg-[#0b141b]/95 backdrop-blur-xl border border-emerald-500/35 rounded-2xl flex flex-col shadow-[0_20px_50px_rgba(4,120,87,0.25)] overflow-hidden animate-scale-in relative">
            {/* Tech decorative HUD corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/50 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-500/50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-500/50 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/50 pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/60 border-b border-slate-900/80">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950 shadow-[0_0_8px_#10b981] animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-wider font-mono text-white uppercase">GW-BOT // INTELLIGENCE</h4>
                  <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                    ONLINE_DASHBOARD // ENCRYPTED
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="w-7 h-7 rounded-lg border border-slate-800 bg-slate-950/40 text-gray-400 hover:text-white hover:border-emerald-500/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-emerald-600 text-white rounded-tr-none shadow-[0_4px_15px_rgba(16,185,129,0.15)]"
                      : "bg-slate-950/70 border border-slate-800/80 text-gray-200 rounded-tl-none backdrop-blur-md"
                  }`}>
                    {msg.sender === "bot" ? (
                      <div>
                        {formatChatMessage(msg.text)}
                      </div>
                    ) : (
                      <p className="text-xs">{msg.text}</p>
                    )}
                    <span className="block text-[8px] text-gray-500 mt-1 text-right font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="px-3 py-2 bg-slate-950/20 border-t border-slate-900/50 flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
              <button 
                onClick={() => handleQuickChip("🛠️ Servicios de Ingeniería")}
                className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950/40 text-[9px] text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-mono"
              >
                🛠️ Servicios
              </button>
              <button 
                onClick={() => handleQuickChip("📍 Cobertura y Sedes")}
                className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950/40 text-[9px] text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-mono"
              >
                📍 Cobertura
              </button>
              <button 
                onClick={() => handleQuickChip("⚡ Urgencias 24/7")}
                className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950/40 text-[9px] text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-mono"
              >
                ⚡ Urgencias
              </button>
              <button 
                onClick={() => handleQuickChip("📞 Contacto Directo")}
                className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950/40 text-[9px] text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-mono"
              >
                📞 Contacto
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-950/60 border-t border-slate-900/80 flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Hacé una pregunta técnica..." 
                className="flex-1 px-3 py-2 border border-slate-800 bg-slate-950/80 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/10"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-gray-600 text-white rounded-xl flex items-center justify-center shadow-[0_4px_10px_rgba(16,185,129,0.2)] hover:scale-105 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Bottom Monitored Bar */}
            <div className="px-4 py-1 bg-slate-950 text-center border-t border-slate-900/40">
              <span className="text-[7px] font-mono text-gray-600 uppercase tracking-widest block">
                DEPARTAMENTO DE INGENIERÍA // GREEN WORKING S.A.
              </span>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
