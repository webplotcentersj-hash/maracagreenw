"use client";

import React from "react";
import { GraduationCap, HeartHandshake, ShieldCheck, Leaf } from "lucide-react";

export function CommunitySection() {
  const pillars = [
    {
      title: "Fortalecimiento Institucional",
      desc: "Colaboramos en programas de desarrollo local para asegurar que la infraestructura tecnológica sirva como catalizador de crecimiento en las instituciones públicas y civiles de Calingasta.",
      icon: <GraduationCap className="w-5 h-5 text-amber-500" />
    },
    {
      title: "Formación e Inclusión",
      desc: "Promovemos capacitaciones técnicas conjuntas orientadas al desarrollo productivo y la formación laboral de mujeres y jóvenes, reduciendo la brecha digital y fomentando la equidad laboral.",
      icon: <HeartHandshake className="w-5 h-5 text-amber-500" />
    },
    {
      title: "Preservación Histórica",
      desc: "Apoyamos activamente el resguardo patrimonial e histórico de la Región de Calingasta, coordinando esfuerzos con autoridades e investigadores locales para mantener vivas sus raíces culturales.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />
    },
    {
      title: "Desarrollo Sostenible",
      desc: "Diseñamos nuestras soluciones energéticas críticas y de telecomunicaciones con un enfoque en la sostenibilidad, minimizando el impacto ambiental en las comunidades andinas y mineras.",
      icon: <Leaf className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <section id="comunidad" className="relative py-24 md:py-32 bg-[#080d12] text-white border-t border-slate-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left panel: text copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 border border-amber-500/20 rounded-lg bg-amber-950/20 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
              Responsabilidad Social
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Comprometidos con el desarrollo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                de nuestras comunidades.
              </span>
            </h2>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
              En <span className="font-semibold text-emerald-400">Greenworking</span>, entendemos que la tecnología debe ir de la mano con el impacto social positivo. Por ello, hemos avanzado en un convenio para el <span className="font-semibold text-white">desarrollo comunitario y la preservación histórica</span> en la hermosa y productiva Región de Calingasta, San Juan.
            </p>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
              Para lograr una implementación con raíces sólidas, trabajamos en alianza estratégica con la <span className="font-semibold text-amber-400">Fundación Mujeres en la Minería</span>. Juntos, coordinamos actividades destinadas al fortalecimiento institucional, la inclusión, la formación laboral y toda acción que fomente el crecimiento social, educativo e industrial en el sector minero y comunitario.
            </p>

            {/* Pillars list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-900">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{pillar.title}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: graphic badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] bg-[#0b141b]/60 border border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:border-amber-500/20 transition-all duration-500 overflow-hidden group">
              {/* Corner styling accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500/30 group-hover:border-amber-500/60 rounded-tl-lg transition-all duration-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500/30 group-hover:border-amber-500/60 rounded-tr-lg transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500/30 group-hover:border-amber-500/60 rounded-bl-lg transition-all duration-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500/30 group-hover:border-amber-500/60 rounded-br-lg transition-all duration-500"></div>

              {/* Glowing ring overlay */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-amber-500/15 duration-500"></div>

              {/* Custom SVG logo: Mujer en la Minería */}
              <div className="w-32 h-32 mb-8 bg-slate-950 border border-slate-900 rounded-full flex items-center justify-center relative shadow-inner group-hover:border-amber-500/25 duration-500">
                {/* Outer animated ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/20 group-hover:rotate-45 duration-1000"></div>
                
                {/* SVG representation of the slides logo */}
                <svg className="w-20 h-20 text-[#a8825c] drop-shadow-[0_0_8px_rgba(168,130,92,0.3)]" viewBox="0 0 100 100" fill="currentColor">
                  {/* Head/Circle representing a person */}
                  <circle cx="50" cy="30" r="10" fill="#a8825c" />
                  
                  {/* Body representing person + gear/M shape */}
                  <path d="M25,50 C25,60 30,60 35,60 C40,60 45,50 50,50 C55,50 60,60 65,60 C70,60 75,60 75,50 C75,45 68,45 65,45 C60,45 55,40 50,40 C45,40 40,45 35,45 C32,45 25,45 25,50 Z" />
                  
                  {/* M-shaped pillars at the bottom */}
                  <path d="M25,50 L25,75 L38,75 L38,62 L43,62 L43,75 L57,75 L57,62 L62,62 L62,75 L75,75 L75,50" fill="none" stroke="#a8825c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <span className="text-[10px] text-amber-500 font-mono tracking-widest block uppercase mb-1">CONVENIO COMUNITARIO</span>
              <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors duration-300">
                Fundación Mujeres <br />
                en la Minería
              </h3>
              
              <p className="text-[11px] text-gray-400 font-light mt-4 leading-relaxed">
                Una alianza destinada a potenciar la participación, capacitación técnica y equidad en las principales regiones productivas.
              </p>

              <div className="w-full h-px bg-slate-900 my-6"></div>

              <span className="text-[9px] text-[#a8825c] font-mono uppercase tracking-widest font-semibold">
                Calingasta · San Juan · Argentina
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
