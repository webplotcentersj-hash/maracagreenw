"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 ${
        isScrolled 
          ? "bg-[#061014]/90 border border-emerald-500/20 backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)]" 
          : "bg-[#061014]/40 border border-white/5 backdrop-blur-sm rounded-2xl"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3.5">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center justify-start">
          <Link href="/" className="flex items-center flex-shrink-0">
            <img 
              src="/greenworking-soluciones-tecnologicas-logo-green-vf-1.png" 
              alt="Greenworking" 
              className="h-8 md:h-9 w-auto object-contain flex-shrink-0 hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link
            href="#propuesta"
            className="text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-emerald-400 hover:drop-shadow-[0_0_4px_rgba(16,185,129,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Propuesta
          </Link>
          <Link
            href="#servicios"
            className="text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-emerald-400 hover:drop-shadow-[0_0_4px_rgba(16,185,129,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Servicios
          </Link>
          <Link
            href="#data-centers"
            className="text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-emerald-400 hover:drop-shadow-[0_0_4px_rgba(16,185,129,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Data Centers
          </Link>
          <Link
            href="#industrias"
            className="text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-emerald-400 hover:drop-shadow-[0_0_4px_rgba(16,185,129,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Industrias
          </Link>
          <Link
            href="#proyectos"
            className="text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-emerald-400 hover:drop-shadow-[0_0_4px_rgba(16,185,129,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Proyectos
          </Link>
        </nav>

        {/* CTA Button & Marca */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <a
            href="#marca"
            className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.05)] whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]"></span>
            Marca 3D
          </a>
          <Link
            href="#contacto"
            className="relative px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-xl overflow-hidden group transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:bg-emerald-500 hover:text-[#061014] hover:border-emerald-400 active:translate-y-0.5 whitespace-nowrap flex-shrink-0"
          >
            Solicitar Diagnóstico
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-colors lg:hidden text-white hover:text-emerald-400 p-1 flex-shrink-0"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-emerald-500/20 bg-[#061014]/95 px-6 py-6 lg:hidden rounded-b-2xl backdrop-blur-md">
          <nav className="flex flex-col gap-5">
            <Link
              href="#propuesta"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-emerald-400 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Propuesta de Valor
            </Link>
            <Link
              href="#servicios"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-emerald-400 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios Principales
            </Link>
            <Link
              href="#data-centers"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-emerald-400 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Salas Técnicas / Data Centers
            </Link>
            <Link
              href="#industrias"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-emerald-400 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Soluciones por Industrias
            </Link>
            <Link
              href="#proyectos"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-emerald-400 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Casos de Éxito
            </Link>
            <a
              href="#marca"
              className="text-sm font-medium tracking-wide text-emerald-400 transition-colors py-1 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Marca 3D
              <span className="px-1.5 py-0.5 text-[8px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded uppercase font-bold tracking-widest font-mono animate-pulse">Nuevo</span>
            </a>
            
            <div className="h-px bg-white/10 my-2"></div>
            
            <Link
              href="#contacto"
              className="mt-2 bg-emerald-600 hover:bg-emerald-500 px-5 py-3.5 text-center text-sm font-bold text-white rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Solicitar Diagnóstico Técnico
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
