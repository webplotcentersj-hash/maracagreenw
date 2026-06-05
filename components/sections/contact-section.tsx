"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, Check, Bot, X } from "lucide-react";
import { NeutrinoBackground } from "@/components/ui/neutrino-background";
import type { ChatTurn } from "@/lib/greenworking-assistant";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const WELCOME_MESSAGE =
  "¡Hola! Soy el **Asistente IA de Green Working**. Estoy acá para ayudarte con consultas sobre servicios, urgencias, cobertura nacional, cotizaciones y contacto con nuestro equipo de ingeniería.\n\nContame qué necesita tu empresa y te oriento paso a paso.";

async function requestAssistantReply(message: string, history: ChatTurn[]): Promise<{ reply: string; mode: string }> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  const data = (await response.json()) as { reply?: string; mode?: string; error?: string };
  if (!response.ok || !data.reply) {
    throw new Error(data.error || "No se pudo obtener respuesta");
  }

  return { reply: data.reply, mode: data.mode || "local" };
}

function toHistory(messages: ChatMessage[]): ChatTurn[] {
  return messages
    .filter((m) => m.id !== "welcome")
    .map((m) => ({
      role: m.sender === "bot" ? "assistant" : "user",
      content: m.text,
    }));
}

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
  const [assistantMode, setAssistantMode] = useState<
    "gemini" | "local" | "unknown"
  >("unknown");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: WELCOME_MESSAGE,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendToAssistant = useCallback(async (userText: string, currentMessages: ChatMessage[]) => {
    setIsTyping(true);
    try {
      const history = toHistory(currentMessages);
      const { reply, mode } = await requestAssistantReply(userText, history);
      if (mode === "gemini") setAssistantMode("gemini");

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setAssistantMode("local");
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text:
          "Tuve un inconveniente de conexión, pero puedo ayudarte igual. Escribinos por WhatsApp: [+54 011 3370 9716](https://wa.me/541133709716) o contame tu consulta y la reenvío al equipo comercial.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  }, []);

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

    setMessages((prev) => {
      void sendToAssistant(userText, prev);
      return [...prev, userMsg];
    });
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

    setMessages((prev) => {
      void sendToAssistant(cleanText, prev);
      return [...prev, userMsg];
    });
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-blue to-brand-teal">
                  operar sin interrupciones.
                </span>
              </h2>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                En <strong>Greenworking S.A.</strong> desarrollamos soluciones de infraestructura tecnológica robusta e integral. Completa el formulario de diagnóstico para coordinar una evaluación con nuestro equipo de ingenieros. Los canales directos (WhatsApp, email y redes) están disponibles en el pie de página.
              </p>
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
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(0, 196, 249,0.3)]">
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
                    <option value="redes">Centro de Cómputos y Redes</option>
                    <option value="fibra">Tendido de Fibra Óptica</option>
                    <option value="energia">Electricidad, Generación y Respaldo de Energía</option>
                    <option value="telecomunicaciones">Telecomunicaciones</option>
                    <option value="seguridad">Sistemas de Seguridad</option>
                    <option value="climatizacion">Refrigeración y Calefacción</option>
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
                  className="w-full py-4 bg-brand-primary hover:bg-brand-teal text-white font-bold rounded-xl text-center shadow-[0_0_20px_rgba(0,196,249,0.25)] hover:shadow-[0_0_30px_rgba(0,196,249,0.45)] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
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
            className="flex items-center gap-2.5 px-5 py-4 bg-brand-primary hover:bg-brand-teal text-white rounded-full shadow-[0_10px_35px_rgba(0,196,249,0.4)] border border-brand-primary-light/30 hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase font-mono">Hablá con IA</span>
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
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950 shadow-[0_0_8px_#00c4f9] animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-wider font-mono text-white uppercase">GW Asistente IA</h4>
                  <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                    {assistantMode === "gemini"
                      ? "MOTOR GEMINI ACTIVO"
                      : "ATENCIÓN COMERCIAL INTELIGENTE"}
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
                      ? "bg-brand-primary text-white rounded-tr-none shadow-[0_4px_15px_rgba(0,196,249,0.15)]"
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
                placeholder="Escribí tu consulta..." 
                className="flex-1 px-3 py-2 border border-slate-800 bg-slate-950/80 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/10"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 bg-brand-primary hover:bg-brand-teal disabled:bg-slate-900 disabled:text-gray-600 text-white rounded-xl flex items-center justify-center shadow-[0_4px_10px_rgba(0,196,249,0.2)] hover:scale-105 transition-all"
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
