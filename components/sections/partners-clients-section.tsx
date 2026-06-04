"use client";

import React from "react";
import { Handshake, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { BrandPaletteAccent } from "@/components/ui/brand-palette-accent";
import { LogoMarquee, partnerLogos, clientLogos } from "@/components/ui/logo-marquee";

export function PartnersClientsSection() {
  return (
    <section id="aliados-clientes" className="relative bg-[#061014] text-white border-t border-slate-900 overflow-hidden">
      <div className="bg-brand-primary py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border border-white/25 rounded-lg bg-white/10 text-white text-xs font-semibold uppercase tracking-wider font-mono">
              <BrandPaletteAccent variant="dots" />
              Respaldo y Confianza
            </div>
            <BrandPaletteAccent className="mb-4 opacity-90" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Ecosistema de alianzas y <br />
              <span className="text-white/90">clientes corporativos.</span>
            </h2>
            <p className="text-white/85 text-base md:text-lg font-light leading-relaxed">
              Trabajamos con los fabricantes globales más importantes para certificar nuestras instalaciones y proveer repuestos y equipamiento original de primer nivel. Asimismo, grandes compañías e instituciones bancarias confían su continuidad operativa en nuestras manos todos los días.
            </p>
          </div>
        </div>
        <BrandPaletteAccent variant="strip" className="absolute bottom-0 inset-x-0" />
      </div>

      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-[135px] pointer-events-none z-0" />
        <div className="absolute bottom-1/2 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[110px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
                <Handshake className="w-4 h-4" />
                Aliados Tecnológicos
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                {partnerLogos.length} marcas
              </span>
            </div>
            <LogoMarquee logos={partnerLogos} duration={42} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-lime/30 bg-brand-lime/10 text-brand-lime text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                Nuestros Clientes
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                {clientLogos.length} organizaciones
              </span>
            </div>
            <LogoMarquee logos={clientLogos} reverse duration={55} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 bg-[#0b141b]/50 border border-slate-900 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-900 text-brand-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Ingeniería Homologada y Oficial</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xl">
                  Al ser diseñadores e instaladores certificados por marcas de nivel mundial, brindamos garantías extendidas de infraestructura y certificaciones de red directas validadas internacionalmente.
                </p>
              </div>
            </div>
            <a
              href="#contacto"
              className="px-5 py-3 bg-brand-primary hover:bg-brand-teal rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,196,249,0.2)] hover:shadow-[0_0_25px_rgba(0,196,249,0.35)] block w-full md:w-auto text-center"
            >
              Contáctanos para tu proyecto
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
