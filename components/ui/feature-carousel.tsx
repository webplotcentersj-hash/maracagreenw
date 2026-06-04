"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: string;
  images: CarouselImage[];
  /** Modo embebido para sidebars (sin pantalla completa) */
  compact?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      title,
      subtitle,
      images,
      compact = false,
      autoPlay = true,
      autoPlayInterval = 4000,
      className,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(
      Math.floor(images.length / 2)
    );

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const handlePrev = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    };

    React.useEffect(() => {
      if (!autoPlay || images.length <= 1) return;
      const timer = setInterval(handleNext, autoPlayInterval);
      return () => clearInterval(timer);
    }, [handleNext, autoPlay, autoPlayInterval, images.length]);

    if (images.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full flex flex-col items-center justify-center overflow-x-hidden text-foreground",
          compact
            ? "min-h-0 bg-transparent p-0"
            : "min-h-screen bg-background p-4",
          className
        )}
        {...props}
      >
        {!compact && (
          <div className="absolute inset-0 z-0 opacity-20" aria-hidden>
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(128,90,213,0.3),rgba(255,255,255,0))]" />
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,123,255,0.3),rgba(255,255,255,0))]" />
          </div>
        )}

        <div
          className={cn(
            "z-10 flex w-full flex-col items-center text-center",
            compact ? "space-y-3" : "space-y-8 md:space-y-12"
          )}
        >
          {(title || subtitle) && (
            <div className={cn("space-y-2", compact ? "w-full text-left px-1" : "space-y-4")}>
              {title && (
                <h2
                  className={cn(
                    "font-bold tracking-tight",
                    compact
                      ? "text-sm font-mono uppercase tracking-widest text-emerald-400/90"
                      : "text-4xl sm:text-5xl md:text-6xl max-w-4xl"
                  )}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className={cn(
                    compact
                      ? "text-xs text-gray-500 font-light text-left"
                      : "max-w-2xl mx-auto text-muted-foreground md:text-xl"
                  )}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div
            className={cn(
              "relative w-full flex items-center justify-center",
              compact ? "h-[220px] sm:h-[260px] lg:h-[280px]" : "h-[350px] md:h-[450px]"
            )}
          >
            <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const total = images.length;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;

                return (
                  <div
                    key={`${image.src}-${index}`}
                    className={cn(
                      "absolute transition-all duration-500 ease-in-out flex items-center justify-center",
                      compact
                        ? "w-28 h-52 sm:w-36 sm:h-60 md:w-40 md:h-64"
                        : "w-48 h-96 md:w-64 md:h-[450px]"
                    )}
                    style={{
                      transform: `
                        translateX(${pos * (compact ? 38 : 45)}%)
                        scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                        rotateY(${pos * -10}deg)
                      `,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                      filter: isCenter ? "blur(0px)" : "blur(4px)",
                      visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={cn(
                        "object-cover w-full h-full shadow-2xl",
                        compact
                          ? "rounded-xl border border-emerald-500/30"
                          : "rounded-3xl border-2 border-foreground/10"
                      )}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>

            {images.length > 1 && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 rounded-full z-20 border-emerald-500/30 bg-[#0b141b]/80 text-emerald-400 hover:bg-emerald-950/60 hover:text-emerald-300 backdrop-blur-sm",
                    compact
                      ? "left-0 h-8 w-8"
                      : "left-2 sm:left-8 h-10 w-10"
                  )}
                  onClick={handlePrev}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className={compact ? "h-4 w-4" : "h-5 w-5"} />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 rounded-full z-20 border-emerald-500/30 bg-[#0b141b]/80 text-emerald-400 hover:bg-emerald-950/60 hover:text-emerald-300 backdrop-blur-sm",
                    compact
                      ? "right-0 h-8 w-8"
                      : "right-2 sm:right-8 h-10 w-10"
                  )}
                  onClick={handleNext}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className={compact ? "h-4 w-4" : "h-5 w-5"} />
                </Button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <p className="text-[10px] font-mono text-gray-500 tabular-nums">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </div>
    );
  }
);

HeroSection.displayName = "HeroSection";
