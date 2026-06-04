"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpandableGalleryProps {
  images: string[];
  alts?: string[];
  className?: string;
  galleryClassName?: string;
}

export function ExpandableGallery({
  images,
  alts,
  className = "",
  galleryClassName = "h-64 md:h-72 lg:h-80",
}: ExpandableGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) {
      return 1;
    }
    return hoveredIndex === index ? 2 : 0.5;
  };

  const getAlt = (index: number) =>
    alts?.[index] ?? `Proyecto Green Working ${index + 1}`;

  return (
    <div className={className}>
      <div className={cn("flex gap-1.5 w-full", galleryClassName)}>
        {images.map((image, index) => (
          <motion.div
            key={`${image}-${index}`}
            className="relative cursor-pointer overflow-hidden rounded-lg border border-emerald-500/20"
            style={{ flex: 1 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openImage(index)}
          >
            <img
              src={image}
              alt={getAlt(index)}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <motion.div
              className="absolute inset-0 bg-[#061014]"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0 : 0.45 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061014]/95 backdrop-blur-sm p-4"
            onClick={closeImage}
          >
            <button
              type="button"
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-emerald-400 transition-colors"
              onClick={closeImage}
              aria-label="Cerrar galería"
            >
              <X className="w-8 h-8" />
            </button>

            {images.length > 1 && (
              <button
                type="button"
                className="absolute left-4 z-10 text-white/80 hover:text-emerald-400 transition-colors"
                onClick={goToPrev}
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}

            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={getAlt(selectedIndex)}
                className="w-full h-full object-contain rounded-lg border border-emerald-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {images.length > 1 && (
              <button
                type="button"
                className="absolute right-4 z-10 text-white/80 hover:text-emerald-400 transition-colors"
                onClick={goToNext}
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-[#0b141b]/80 border border-emerald-500/30 px-4 py-2 rounded-md font-mono">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
