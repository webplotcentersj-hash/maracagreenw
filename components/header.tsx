"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandPaletteAccent } from "@/components/ui/brand-palette-accent";

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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl transition-all duration-500 ${
        isScrolled 
          ? "bg-[#061014]/90 border border-brand-primary/20 backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(0,196,249,0.15)]" 
          : "bg-[#061014]/40 border border-white/5 backdrop-blur-sm rounded-2xl"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3.5 gap-4">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center justify-start">
          <Link href="/" className="flex items-center flex-shrink-0">
            <img 
              src="/greenworking-soluciones-tecnologicas-logo-green-vf-1.png" 
              alt="Greenworking" 
              className="h-10 md:h-12 w-auto object-contain flex-shrink-0 hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 justify-center flex-grow">
          <Link
            href="#propuesta"
            className="text-[10px] xl:text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-brand-primary hover:drop-shadow-[0_0_4px_rgba(0,196,249,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Propuesta
          </Link>
          <Link
            href="#servicios"
            className="text-[10px] xl:text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-brand-primary hover:drop-shadow-[0_0_4px_rgba(0,196,249,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Servicios
          </Link>
          <Link
            href="#data-centers"
            className="text-[10px] xl:text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-brand-primary hover:drop-shadow-[0_0_4px_rgba(0,196,249,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Data Centers
          </Link>
          <Link
            href="#industrias"
            className="text-[10px] xl:text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-brand-primary hover:drop-shadow-[0_0_4px_rgba(0,196,249,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Industrias
          </Link>
          <Link
            href="#proyectos"
            className="text-[10px] xl:text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-brand-primary hover:drop-shadow-[0_0_4px_rgba(0,196,249,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Proyectos
          </Link>
          <Link
            href="#flota"
            className="text-[10px] xl:text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-brand-primary hover:drop-shadow-[0_0_4px_rgba(0,196,249,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Flota
          </Link>
          <Link
            href="#aliados-clientes"
            className="text-[10px] xl:text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-brand-primary hover:drop-shadow-[0_0_4px_rgba(0,196,249,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Clientes
          </Link>
          <Link
            href="#comunidad"
            className="text-[10px] xl:text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-brand-primary hover:drop-shadow-[0_0_4px_rgba(0,196,249,0.5)] transition-all duration-300 whitespace-nowrap"
          >
            Comunidades
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <BrandPaletteAccent variant="dots" className="opacity-80" />
          <Link
            href="#contacto"
            className="relative px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/30 rounded-xl overflow-hidden group transition-all duration-300 shadow-[0_0_15px_rgba(0,196,249,0.15)] hover:shadow-[0_0_25px_rgba(0,196,249,0.45)] hover:bg-brand-primary hover:text-white hover:border-brand-primary active:translate-y-0.5 whitespace-nowrap flex-shrink-0"
          >
            Solicitar Diagnóstico
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-colors lg:hidden text-white hover:text-brand-primary p-1 flex-shrink-0"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-brand-primary/20 bg-[#061014]/95 px-6 py-6 lg:hidden rounded-b-2xl backdrop-blur-md">
          <nav className="flex flex-col gap-5">
            <Link
              href="#propuesta"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-brand-primary transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Propuesta de Valor
            </Link>
            <Link
              href="#servicios"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-brand-primary transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios Principales
            </Link>
            <Link
              href="#data-centers"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-brand-primary transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Salas Técnicas / Data Centers
            </Link>
            <Link
              href="#industrias"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-brand-primary transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Soluciones por Industrias
            </Link>
            <Link
              href="#proyectos"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-brand-primary transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Casos de Éxito
            </Link>
            <Link
              href="#flota"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-brand-primary transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Nuestra Flota
            </Link>
            <Link
              href="#aliados-clientes"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-brand-primary transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Socios y Clientes
            </Link>
            <Link
              href="#comunidad"
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-brand-primary transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Desarrollo Comunitario
            </Link>
            
            <div className="h-px bg-white/10 my-2"></div>
            
            <Link
              href="#contacto"
              className="mt-2 bg-brand-primary hover:bg-brand-teal text-white px-5 py-3.5 text-center text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(0,196,249,0.25)]"
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
