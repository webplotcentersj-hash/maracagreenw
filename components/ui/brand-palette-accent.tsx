import React from "react";

const PALETTE = [
  "bg-brand-primary",
  "bg-brand-blue",
  "bg-brand-teal",
  "bg-brand-petrol",
  "bg-brand-lime",
] as const;

/** Barra o puntos con los 5 colores oficiales de marca */
export function BrandPaletteAccent({
  variant = "bar",
  className = "",
}: {
  variant?: "bar" | "dots" | "strip";
  className?: string;
}) {
  if (variant === "strip") {
    return (
      <div className={`flex w-full h-1 ${className}`} aria-hidden>
        {PALETTE.map((color) => (
          <span key={color} className={`flex-1 ${color}`} />
        ))}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`} aria-hidden>
        {PALETTE.map((color) => (
          <span key={color} className={`w-1.5 h-1.5 rounded-full ${color}`} />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-hidden>
      {PALETTE.map((color, i) => (
        <span
          key={color}
          className={`h-1 rounded-full ${color} ${i === 0 ? "w-8" : "w-4"}`}
        />
      ))}
    </div>
  );
}

export const BRAND_ACCENT_ICON = [
  "text-brand-primary",
  "text-brand-blue",
  "text-brand-teal",
  "text-brand-lime",
  "text-brand-petrol",
] as const;

export const BRAND_ACCENT_BORDER = [
  "group-hover:border-brand-primary/40",
  "group-hover:border-brand-blue/40",
  "group-hover:border-brand-teal/40",
  "group-hover:border-brand-lime/40",
  "group-hover:border-brand-petrol/40",
  "group-hover:border-brand-primary/40",
] as const;
