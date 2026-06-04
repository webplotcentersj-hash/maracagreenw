"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type LogoItem = {
  src: string;
  alt: string;
};

function logoUrl(filename: string) {
  return encodeURI(`/LOGOS CLIENTES/${filename}`);
}

export const partnerLogos: LogoItem[] = [
  { src: logoUrl("logo_w.png"), alt: "Wesco | Anixter" },
  { src: logoUrl("FINNING CAT.png"), alt: "Finning CAT" },
  { src: logoUrl("Hikvision_logo.svg.png"), alt: "Hikvision" },
  { src: logoUrl("Axis_logo.png"), alt: "Axis Communications" },
  {
    src: logoUrl("67dc400b8d0c490a7daa35fc_Logo Silicon Access Smart Security -Blanco.png"),
    alt: "Silicon Access",
  },
  { src: logoUrl("newcom.png"), alt: "New Com" },
  { src: logoUrl("Sullair-Logo-Horizontal-No-tag-White_740x140x24.png"), alt: "Sullair" },
  { src: logoUrl("f8744e64198089.5acab01c461f3.png"), alt: "Hanwha" },
  { src: logoUrl("intelektron.png"), alt: "Intelektron" },
];

export const clientLogos: LogoItem[] = [
  { src: logoUrl("SANTANDER.png"), alt: "Santander" },
  { src: logoUrl("Quilmes_Logo_Nuevo.png"), alt: "Quilmes" },
  { src: logoUrl("marca-pirelli.png"), alt: "Pirelli" },
  { src: logoUrl("SANDVIK.png"), alt: "Sandvik" },
  { src: logoUrl("banco-santa-fe.png"), alt: "Banco Santa Fe" },
  { src: logoUrl("NATURA.png"), alt: "Natura" },
  { src: logoUrl("Telecentro.png"), alt: "TeleCentro" },
  { src: logoUrl("Logo_Oficial_Banco_Comafi.png"), alt: "Banco Comafi" },
  { src: logoUrl("BANCO SAN JUAN.png"), alt: "Banco San Juan" },
  { src: logoUrl("banco entre rios.png"), alt: "Banco Entre Ríos" },
  { src: logoUrl("BANCO SANTA CRUZ.png"), alt: "Banco Santa Cruz" },
  { src: logoUrl("Bridgenext.png"), alt: "Bridgenext" },
  { src: logoUrl("Logo-FundacionesGP-White-768x183.png"), alt: "G-P" },
  { src: logoUrl("PLOT CENTER.png"), alt: "Plot Center" },
  { src: logoUrl("super estant.png"), alt: "Super Estant S.R.L." },
  { src: logoUrl("esteban fleitas.png"), alt: "Esteban Fleitas Inmobiliaria" },
  { src: logoUrl("escuela del alamo.png"), alt: "Escuela Del Álamo" },
];

type LogoMarqueeProps = {
  logos: LogoItem[];
  reverse?: boolean;
  duration?: number;
  className?: string;
};

export function LogoMarquee({
  logos,
  reverse = false,
  duration = 48,
  className,
}: LogoMarqueeProps) {
  const track = [...logos, ...logos];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24 bg-gradient-to-r from-[#061014] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24 bg-gradient-to-l from-[#061014] to-transparent" />

      <div
        className={cn("flex w-max items-center gap-10 md:gap-14 py-2", reverse ? "logo-marquee-reverse" : "logo-marquee")}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="group relative flex h-16 w-36 md:h-[4.5rem] md:w-44 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-brand-primary/25 hover:bg-white/[0.06]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={64}
              className="max-h-10 md:max-h-12 w-auto object-contain opacity-80 grayscale-[30%] group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
