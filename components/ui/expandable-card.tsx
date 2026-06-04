"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  [key: string]: any;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#061014]/80 backdrop-blur-md h-full w-full z-[90]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div
            className={cn(
              "fixed inset-0 grid place-items-center z-[100] p-4 sm:p-6 overflow-y-auto before:pointer-events-none",
            )}
          >
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-[850px] flex flex-col rounded-2xl bg-[#0b141b]/95 border border-slate-800/80 shadow-[0_0_50px_rgba(0, 196, 249,0.12)] relative overflow-hidden my-8 max-h-[85vh]",
                classNameExpanded,
              )}
              {...props}
            >
              <motion.div layoutId={`image-${title}-${id}`} className="relative h-72 md:h-80 w-full shrink-0">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b141b] via-[#0b141b]/40 to-transparent" />
                <img
                  src={src}
                  alt={title}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-emerald-400 text-xs font-mono uppercase tracking-wider"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-extrabold text-white text-2xl md:text-3xl mt-1 leading-tight"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-brand-primary hover:text-white transition-all duration-300 focus:outline-none"
                    onClick={() => setActive(false)}
                  >
                    <motion.div
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>
                <div className="relative">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-300 text-sm md:text-base leading-relaxed flex flex-col gap-4 font-light pb-4"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "group p-4 flex flex-col bg-[#0b141b]/60 border border-slate-900/80 rounded-2xl cursor-pointer hover:border-emerald-500/30 hover:bg-[#0b141b]/90 hover:shadow-[0_4px_20px_rgba(0, 196, 249,0.06)] transition-all duration-300 w-full",
          className,
        )}
      >
        <div className="flex gap-4 flex-col w-full">
          <motion.div layoutId={`image-${title}-${id}`} className="relative overflow-hidden rounded-xl w-full h-48 md:h-52 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b141b]/70 via-transparent to-transparent z-10 transition-opacity duration-300 opacity-60 group-hover:opacity-40" />
            <img
              src={src}
              alt={title}
              className="w-full h-full rounded-xl object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
          
          <div className="flex justify-between items-center w-full mt-1">
            <div className="flex flex-col flex-1 pr-3">
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="text-emerald-400/90 text-[10px] md:text-xs font-mono uppercase tracking-wider"
              >
                {description}
              </motion.p>
              <motion.h3
                layoutId={`title-${title}-${id}`}
                className="text-white text-base md:text-lg font-bold mt-0.5 leading-tight group-hover:text-emerald-400 transition-colors"
              >
                {title}
              </motion.h3>
            </div>
            
            <motion.button
              aria-label="Open card"
              layoutId={`button-${title}-${id}`}
              className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-[#061014] transition-all duration-300 focus:outline-none"
            >
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
