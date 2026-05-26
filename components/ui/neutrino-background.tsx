"use client";

import React, { useEffect, useRef } from "react";

interface NeutrinoBackgroundProps {
  opacity?: number;
}

export function NeutrinoBackground({ opacity = 0.6 }: NeutrinoBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const GRID_SIZE = 64; // Coincide con el grid de 4rem de CSS
    const NEUTRINO_COUNT = 24; // Número de neutrinos simultáneos
    
    // Lista de direcciones disponibles
    const DIRECTIONS = ["up", "down", "left", "right"] as const;
    type Direction = typeof DIRECTIONS[number];

    interface Particle {
      x: number;
      y: number;
      dir: Direction;
      speed: number;
      size: number;
      color: string;
      glowColor: string;
      life: number;
      maxLife: number;
    }

    let particles: Particle[] = [];

    // Helper para obtener una intersección válida aleatoria
    const getRandomIntersection = () => {
      const cols = Math.floor(width / GRID_SIZE);
      const rows = Math.floor(height / GRID_SIZE);
      // Evitar los bordes extremos si es posible
      const col = Math.max(1, Math.floor(Math.random() * (cols - 1)));
      const row = Math.max(1, Math.floor(Math.random() * (rows - 1)));
      return {
        x: col * GRID_SIZE,
        y: row * GRID_SIZE,
      };
    };

    // Crear una sola partícula neutrino
    const createParticle = (init = false): Particle => {
      const pos = getRandomIntersection();
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      // Velocidad aleatoria: 4 u 8 píxeles por frame (ambos dividen a GRID_SIZE=64 de manera exacta)
      const speed = Math.random() > 0.5 ? 4 : 8;
      const size = 1.2 + Math.random() * 1.3; // Radio del neutrino
      
      // Algunas partículas serán cian y la mayoría verde esmeralda
      const isCyan = Math.random() > 0.85;
      const color = isCyan ? "#e0f2fe" : "#ffffff"; // Núcleo muy brillante
      const glowColor = isCyan ? "rgba(6, 182, 212, " : "rgba(16, 185, 129, "; // Cyan o Emerald

      return {
        x: pos.x,
        y: pos.y,
        dir,
        speed,
        size,
        color,
        glowColor,
        life: 0,
        maxLife: 200 + Math.floor(Math.random() * 300), // Cuánto dura antes de desvanecerse
      };
    };

    // Inicializar el pool de neutrinos
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < NEUTRINO_COUNT; i++) {
        particles.push(createParticle(true));
      }
    };

    initParticles();

    // Redimensionado óptimo
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      // Reinicializar para evitar partículas flotando fuera de límites
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Animación principal
    const render = () => {
      // Fondo muy oscuro con opacidad sutil para lograr el efecto de estela difusa ("comet trail")
      ctx.fillStyle = "rgba(6, 16, 20, 0.16)";
      ctx.fillRect(0, 0, width, height);

      // Dibujar la grilla de guía sutil en segundo plano para dar contexto físico a los neutrinos
      ctx.strokeStyle = "rgba(16, 185, 129, 0.03)";
      ctx.lineWidth = 1;
      
      // Líneas verticales
      for (let x = 0; x < width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      // Líneas horizontales
      for (let y = 0; y < height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Renderizar y actualizar neutrinos
      particles.forEach((p, idx) => {
        p.life++;

        // Movimiento físico según la dirección actual
        if (p.dir === "right") p.x += p.speed;
        else if (p.dir === "left") p.x -= p.speed;
        else if (p.dir === "down") p.y += p.speed;
        else if (p.dir === "up") p.y -= p.speed;

        // Comprobación de límites de pantalla
        const outOfBounds = p.x < 0 || p.x > width || p.y < 0 || p.y > height;

        // Si llega exactamente a una intersección, decidir si cambia de dirección
        if (!outOfBounds && p.x % GRID_SIZE === 0 && p.y % GRID_SIZE === 0) {
          const roll = Math.random();
          
          if (roll < 0.10 || p.life > p.maxLife) {
            // El neutrino se extingue o desintegra y nace otro
            particles[idx] = createParticle();
            return;
          } else if (roll < 0.35) {
            // Decidir girar a 90 grados
            const currentAxis = p.dir === "left" || p.dir === "right" ? "h" : "v";
            if (currentAxis === "h") {
              // Si va horizontal, puede girar verticalmente
              p.dir = Math.random() > 0.5 ? "up" : "down";
            } else {
              // Si va vertical, puede girar horizontalmente
              p.dir = Math.random() > 0.5 ? "left" : "right";
            }
          }
        }

        // Si se sale de los límites de pantalla, se regenera instantáneamente
        if (outOfBounds) {
          particles[idx] = createParticle();
          return;
        }

        // Dibujar el haz de luz del neutrino
        const alpha = Math.min(1, (p.maxLife - p.life) / 40); // Desvanecimiento suave al final de su vida
        
        if (alpha > 0) {
          // 1. Dibujar el resplandor difuso (Glow)
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.glowColor}${0.35 * alpha})`;
          ctx.fill();

          // 2. Dibujar el núcleo super brillante (Core)
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity, mixBlendMode: "screen" }}
    />
  );
}
