"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, HeartHandshake, ShieldCheck, Leaf } from "lucide-react";

export function CommunitySection() {
  const pillars = [
    {
      title: "Fortalecimiento Institucional",
      desc: "Colaboramos en programas de desarrollo local para asegurar que la infraestructura tecnológica sirva como catalizador de crecimiento en las instituciones públicas y civiles de Calingasta.",
      icon: <GraduationCap className="w-5 h-5 text-amber-700" />
    },
    {
      title: "Formación e Inclusión",
      desc: "Promovemos capacitaciones técnicas conjuntas orientadas al desarrollo productivo y la formación laboral de mujeres y jóvenes, reduciendo la brecha digital y fomentando la equidad laboral.",
      icon: <HeartHandshake className="w-5 h-5 text-amber-700" />
    },
    {
      title: "Preservación Histórica",
      desc: "Apoyamos activamente el resguardo patrimonial e histórico de la Región de Calingasta, coordinando esfuerzos con autoridades e investigadores locales para mantener vivas sus raíces culturales.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-700" />
    },
    {
      title: "Desarrollo Sostenible",
      desc: "Diseñamos nuestras soluciones energéticas críticas y de telecomunicaciones con un enfoque en la sostenibilidad, minimizando el impacto ambiental en las comunidades andinas y mineras.",
      icon: <Leaf className="w-5 h-5 text-amber-700" />
    }
  ];

  return (
    <section id="comunidad" className="relative py-24 md:py-32 bg-[#eef2f4] text-slate-900 border-t border-slate-200 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 border border-amber-300/60 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider font-mono">
              Responsabilidad Social
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Comprometidos con el desarrollo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-500">
                de nuestras comunidades.
              </span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
              En <span className="font-semibold text-brand-teal">Greenworking</span>, entendemos que la tecnología debe ir de la mano con el impacto social positivo. Por ello, hemos avanzado en un convenio para el <span className="font-semibold text-slate-900">desarrollo comunitario y la preservación histórica</span> en la hermosa y productiva Región de Calingasta, San Juan.
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
              Para lograr una implementación con raíces sólidas, trabajamos en alianza estratégica con la <span className="font-semibold text-amber-800">Fundación Mujeres en la Minería</span>. Juntos, coordinamos actividades destinadas al fortalecimiento institucional, la inclusión, la formación laboral y toda acción que fomente el crecimiento social, educativo e industrial en el sector minero y comunitario.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-300/70">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">{pillar.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-light">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] bg-white border border-slate-200 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(15,23,42,0.08)] hover:border-amber-300/60 transition-all duration-500 overflow-hidden group">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400/40 group-hover:border-amber-500/70 rounded-tl-lg transition-all duration-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400/40 group-hover:border-amber-500/70 rounded-tr-lg transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400/40 group-hover:border-amber-500/70 rounded-bl-lg transition-all duration-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400/40 group-hover:border-amber-500/70 rounded-br-lg transition-all duration-500"></div>

              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-200/40 rounded-full blur-[40px] pointer-events-none group-hover:bg-amber-300/50 duration-500"></div>

              <div className="relative w-full max-w-[280px] mb-8 px-2">
                <Image
                  src="/images/mujer-en-la-mineria-logo.png"
                  alt="Fundación Mujeres en la Minería"
                  width={560}
                  height={200}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>

              <span className="text-[10px] text-amber-700 font-mono tracking-widest block uppercase mb-1">CONVENIO COMUNITARIO</span>
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors duration-300">
                Fundación Mujeres <br />
                en la Minería
              </h3>

              <p className="text-[11px] text-slate-600 font-light mt-4 leading-relaxed">
                Una alianza destinada a potenciar la participación, capacitación técnica y equidad en las principales regiones productivas.
              </p>

              <div className="w-full h-px bg-slate-200 my-6"></div>

              <span className="text-[9px] text-[#8b7355] font-mono uppercase tracking-widest font-semibold">
                Calingasta · San Juan · Argentina
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
