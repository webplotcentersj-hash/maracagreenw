"use client";

import React, { useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

type PinKind = "alert" | "site" | false;
type NodeKind =
  | "camera"
  | "hub"
  | "monitors"
  | "server"
  | "network"
  | "reader"
  | "door"
  | "acc-reader"
  | "acc-controller"
  | "acc-door-alarm"
  | "acc-auth"
  | "acc-credentials"
  | "acc-alarm"
  | "acc-biometric"
  | "acc-idcards"
  | "acc-events"
  | "acc-shield"
  | "acc-router"
  | "acc-encryption"
  | "acc-card-slot"
  | "acc-auth-rack"
  | "acc-door-keypad"
  | "acc-door-bio";

export type TopologyNode = {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  kind: NodeKind;
  pin?: PinKind;
  wire: string;
  wireLabel?: string;
  hint: string;
};

export type TopologyConfig = {
  variant: "cctv" | "access";
  hub: { id: string; label: string; x: number; y: number; hint: string };
  nodes: TopologyNode[];
};

/** Rutas en ángulo recto hacia el NVR, estilo diagrama técnico */
function orthogonalPath(nx: number, ny: number, hx: number, hy: number): string {
  const pad = 6;
  if (nx < hx - 8) {
    const elbowX = hx - pad;
    return `M ${nx} ${ny} H ${elbowX} V ${hy} H ${hx}`;
  }
  if (nx > hx + 8) {
    const elbowX = hx + pad;
    return `M ${nx} ${ny} H ${elbowX} V ${hy} H ${hx}`;
  }
  if (ny < hy - 6) {
    const elbowY = hy - pad;
    return `M ${nx} ${ny} V ${elbowY} H ${hx} V ${hy}`;
  }
  const elbowY = hy + pad;
  return `M ${nx} ${ny} V ${elbowY} H ${hx} V ${hy}`;
}

function BulletCameraSvg({ active }: { active: boolean }) {
  const gid = useId().replace(/:/g, "");
  const accent = active ? "#34d399" : "#64748b";
  const accentBright = active ? "#6ee7b7" : "#94a3b8";
  const ring = active ? "#00c4f9" : "#475569";

  return (
    <svg viewBox="0 0 88 60" className="w-[4.25rem] h-[2.9rem]" aria-hidden>
      <defs>
        <linearGradient id={`${gid}-body`} x1="0%" y1="20%" x2="100%" y2="80%">
          <stop offset="0%" stopColor={active ? "#f8fafc" : "#e8edf2"} />
          <stop offset="35%" stopColor={active ? "#e2e8f0" : "#d1d9e0"} />
          <stop offset="70%" stopColor={active ? "#b8c5d0" : "#a8b4c0"} />
          <stop offset="100%" stopColor={active ? "#8fa3b0" : "#7a8a98"} />
        </linearGradient>
        <linearGradient id={`${gid}-hood`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#3d4f5f" />
          <stop offset="100%" stopColor="#1a2330" />
        </linearGradient>
        <linearGradient id={`${gid}-bracket`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <radialGradient id={`${gid}-lens`} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor={active ? "#a5f3fc" : "#64748b"} />
          <stop offset="25%" stopColor={active ? "#22d3ee" : "#475569"} />
          <stop offset="55%" stopColor="#0c1929" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <radialGradient id={`${gid}-lensGlow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={active ? "rgba(0,196,249,0.35)" : "transparent"} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={`${gid}-shadow`} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.55" />
        </filter>
        <filter id={`${gid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${gid}-shadow)`}>
        {/* Base de montaje */}
        <path
          d="M26 14 L30 8 L38 8 L42 14 L42 18 L26 18 Z"
          fill={`url(#${gid}-bracket)`}
          stroke="#1e293b"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <rect x="30" y="16" width="8" height="5" rx="1" fill="#1e293b" />

        {/* Cuerpo cilíndrico */}
        <ellipse cx="38" cy="36" rx="24" ry="15" fill={`url(#${gid}-body)`} stroke={accent} strokeWidth="1.1" />
        <ellipse cx="34" cy="32" rx="14" ry="6" fill="white" opacity={active ? 0.22 : 0.12} />
        <path
          d="M18 36 C18 28 26 22 38 22 C50 22 58 28 58 36"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.15"
        />

        {/* Visera solar */}
        <path
          d="M54 24 C72 26 78 32 78 38 C78 44 72 50 54 48 L50 44 L54 24 Z"
          fill={`url(#${gid}-hood)`}
          stroke="#0f172a"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path d="M54 26 L76 30" stroke="#475569" strokeWidth="0.5" opacity="0.5" />

        {/* Anillo de lente */}
        {active && (
          <circle cx="64" cy="37" r="16" fill={`url(#${gid}-lensGlow)`} filter={`url(#${gid}-soft)`} />
        )}
        <circle cx="64" cy="37" r="13.5" fill="#0f172a" stroke={ring} strokeWidth="1.4" />
        <circle cx="64" cy="37" r="11.5" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
        <circle cx="64" cy="37" r="9.5" fill={`url(#${gid}-lens)`} />
        <circle cx="64" cy="37" r="4.5" fill="#020617" opacity="0.85" />
        <ellipse cx="60" cy="33" rx="3" ry="2" fill="white" opacity={active ? 0.55 : 0.3} />
        <ellipse cx="67" cy="40" rx="1.2" ry="0.8" fill="white" opacity={active ? 0.2 : 0.1} />

        {/* LEDs IR */}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={46 + i * 4.5}
            cy={50}
            r="1.6"
            fill={active ? accentBright : "#475569"}
            opacity={active ? 0.95 : 0.55}
          />
        ))}
        {active && (
          <circle cx="46" cy="50" r="3" fill="#34d399" opacity="0.15">
            <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
          </circle>
        )}

        {/* LED de estado */}
        <circle cx="22" cy="34" r="2.2" fill={active ? "#34d399" : "#334155"} stroke="#0f172a" strokeWidth="0.5">
          {active && (
            <animate attributeName="opacity" values="1;0.45;1" dur="1.6s" repeatCount="indefinite" />
          )}
        </circle>

        {/* Tornillos decorativos */}
        <circle cx="28" cy="40" r="1" fill="#64748b" opacity="0.6" />
        <circle cx="48" cy="42" r="1" fill="#64748b" opacity="0.6" />
      </g>
    </svg>
  );
}

function NvrHubSvg({ active }: { active: boolean }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 72 48" className="w-[4.5rem] h-12" aria-hidden>
      <defs>
        <linearGradient id={`${gid}-nvrGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={active ? "#1e3a2f" : "#1e293b"} />
          <stop offset="100%" stopColor="#0b141b" />
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="64" height="34" rx="4" fill={`url(#${gid}-nvrGrad)`} stroke={active ? "#34d399" : "#475569"} strokeWidth="1.5" />
      <rect x="10" y="14" width="28" height="14" rx="2" fill="#061014" stroke={active ? "#00c4f9" : "#334155"} />
      <rect x="12" y="16" width="8" height="3" rx="0.5" fill={active ? "#34d399" : "#64748b"} />
      <rect x="12" y="21" width="14" height="2" rx="0.5" fill="#334155" />
      <rect x="12" y="24" width="10" height="2" rx="0.5" fill="#334155" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={48 + i * 5} cy={22} r="2" fill={active ? "#34d399" : "#475569"} opacity={active ? 1 : 0.6} />
      ))}
      <rect x="42" y="30" width="20" height="6" rx="1" fill="#0f172a" stroke="#334155" />
    </svg>
  );
}

function DualMonitorSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 76 38" className="w-[5.25rem] h-[2.6rem] overflow-visible" aria-hidden>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 36}, 0)`}>
          <rect x="2" y="3" width="32" height="20" rx="2" fill={active ? "#0e7490" : "#1e3a5f"} stroke={active ? "#00c4f9" : "#475569"} strokeWidth="1.2" />
          <rect x="5" y="6" width="26" height="14" rx="1" fill="#061014" opacity="0.9" />
          {active && <rect x="7" y="8" width="10" height="6" rx="0.5" fill="#00c4f9" opacity="0.12" />}
          <rect x="13" y="23" width="10" height="4" rx="1" fill="#334155" />
          <rect x="9" y="27" width="18" height="3" rx="1" fill="#475569" />
        </g>
      ))}
    </svg>
  );
}

function ServerTowerSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 32 56" className="w-8 h-14" aria-hidden>
      <rect x="6" y="4" width="20" height="48" rx="3" fill={active ? "#134e4a" : "#1e293b"} stroke={active ? "#34d399" : "#475569"} strokeWidth="1.2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="9" y={10 + i * 8} width="14" height="4" rx="1" fill="#061014" stroke={active ? "#00c4f9" : "#334155"} strokeWidth="0.8" />
      ))}
      <circle cx="16" cy="6" r="2" fill={active ? "#34d399" : "#64748b"} />
    </svg>
  );
}

function NetworkRackSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 56 36" className="w-14 h-9" aria-hidden>
      <rect x="2" y="6" width="52" height="26" rx="2" fill={active ? "#0c4a6e" : "#1e293b"} stroke={active ? "#00c4f9" : "#475569"} strokeWidth="1.2" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="6" y={10 + i * 7} width="44" height="4" rx="1" fill="#061014" stroke="#334155" strokeWidth="0.6" />
      ))}
      <circle cx="48" cy="10" r="3" fill={active ? "#fbbf24" : "#64748b"} />
    </svg>
  );
}

function ReaderSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 48" className="w-10 h-12" aria-hidden>
      <rect x="8" y="4" width="24" height="40" rx="4" fill={active ? "#134e4a" : "#1e293b"} stroke={active ? "#34d399" : "#64748b"} strokeWidth="1.2" />
      <circle cx="20" cy="18" r="8" fill="none" stroke={active ? "#00c4f9" : "#475569"} strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="12" y="30" width="16" height="8" rx="2" fill="#061014" stroke="#334155" />
    </svg>
  );
}

function DoorSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 48" className="w-10 h-12" aria-hidden>
      <rect x="6" y="4" width="28" height="42" rx="2" fill={active ? "#1e3a2f" : "#1e293b"} stroke={active ? "#34d399" : "#64748b"} strokeWidth="1.2" />
      <rect x="10" y="8" width="20" height="34" rx="1" fill="#061014" opacity="0.85" />
      <circle cx="26" cy="26" r="2.5" fill={active ? "#fbbf24" : "#64748b"} />
    </svg>
  );
}

function CentralServerHubSvg({ active }: { active: boolean }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 88 56" className="w-[5.5rem] h-[3.25rem]" aria-hidden>
      <defs>
        <linearGradient id={`${gid}-cs`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={active ? "#22d3ee" : "#0e7490"} />
          <stop offset="50%" stopColor={active ? "#00c4f9" : "#0891b2"} />
          <stop offset="100%" stopColor={active ? "#34d399" : "#0d9488"} />
        </linearGradient>
      </defs>
      <rect x="6" y="8" width="76" height="40" rx="10" fill={`url(#${gid}-cs)`} stroke={active ? "#6ee7b7" : "#334155"} strokeWidth="1.5" />
      <rect x="14" y="16" width="60" height="8" rx="2" fill="white" opacity={active ? 0.35 : 0.2} />
      <rect x="14" y="28" width="40" height="4" rx="1" fill="white" opacity="0.15" />
      <rect x="14" y="35" width="28" height="4" rx="1" fill="white" opacity="0.1" />
      <circle cx="68" cy="32" r="5" fill="#061014" opacity="0.35" />
      <circle cx="68" cy="32" r="2.5" fill={active ? "#a7f3d0" : "#94a3b8"} />
    </svg>
  );
}

function AccReaderSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 36 52" className="w-9 h-[2.65rem]" aria-hidden>
      <rect x="8" y="4" width="20" height="44" rx="4" fill="#e2e8f0" stroke={active ? "#00c4f9" : "#64748b"} strokeWidth="1.2" />
      <rect x="11" y="8" width="14" height="18" rx="2" fill="#061014" stroke={active ? "#34d399" : "#475569"} />
      <rect x="12" y="30" width="12" height="14" rx="2" fill="#cbd5e1" />
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={13 + c * 3.5} y={32 + r * 3.5} width="2.5" height="2.5" rx="0.5" fill="#64748b" />
        ))
      )}
    </svg>
  );
}

function AccControllerSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 48" className="w-10 h-12" aria-hidden>
      <rect x="6" y="6" width="28" height="38" rx="6" fill="#f1f5f9" stroke={active ? "#00c4f9" : "#64748b"} strokeWidth="1.2" />
      <rect x="10" y="10" width="20" height="12" rx="2" fill="#061014" opacity="0.85" />
      <circle cx="15" cy="28" r="2" fill="#94a3b8" /><circle cx="20" cy="28" r="2" fill="#94a3b8" /><circle cx="25" cy="28" r="2" fill="#94a3b8" />
      <circle cx="15" cy="34" r="2" fill="#94a3b8" /><circle cx="20" cy="34" r="2" fill={active ? "#34d399" : "#94a3b8"} /><circle cx="25" cy="34" r="2" fill="#94a3b8" />
    </svg>
  );
}

function AccDoorAlarmSvg({ active }: { active: boolean }) {
  const c = active ? "#00c4f9" : "#64748b";
  return (
    <svg viewBox="0 0 48 44" className="w-11 h-10" aria-hidden>
      <path d="M14 32 L14 18 Q24 8 34 18 L34 32 Z" fill="#e2e8f0" stroke={c} strokeWidth="1.2" />
      <circle cx="24" cy="22" r="5" fill="#061014" stroke={c} />
      <path d="M6 20 Q2 14 6 8" fill="none" stroke={c} strokeWidth="1" opacity="0.7" />
      <path d="M42 20 Q46 14 42 8" fill="none" stroke={c} strokeWidth="1" opacity="0.7" />
      <path d="M24 4 Q28 0 32 4" fill="none" stroke={c} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function AccAuthDeviceSvg({ active }: { active: boolean }) {
  return <AccControllerSvg active={active} />;
}

function AccCredentialsSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 36" className="w-10 h-9" aria-hidden>
      <rect x="4" y="10" width="28" height="22" rx="3" fill="#f8fafc" stroke={active ? "#34d399" : "#64748b"} strokeWidth="1.2" />
      <rect x="8" y="4" width="24" height="10" rx="2" fill="#e2e8f0" stroke="#94a3b8" />
      <rect x="10" y="16" width="16" height="3" rx="1" fill="#cbd5e1" />
      <rect x="10" y="22" width="12" height="3" rx="1" fill="#cbd5e1" />
    </svg>
  );
}

function AccAlarmSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden>
      <rect x="10" y="8" width="20" height="26" rx="3" fill="#e2e8f0" stroke={active ? "#f87171" : "#64748b"} strokeWidth="1.2" />
      <circle cx="20" cy="18" r="6" fill="#061014" stroke={active ? "#f87171" : "#475569"} />
      <path d="M20 6 L22 10 L18 10 Z" fill={active ? "#f87171" : "#94a3b8"} />
    </svg>
  );
}

function AccBiometricSvg({ active }: { active: boolean }) {
  const c = active ? "#00c4f9" : "#64748b";
  return (
    <svg viewBox="0 0 36 56" className="w-9 h-14" aria-hidden>
      <rect x="8" y="4" width="20" height="48" rx="4" fill="#f8fafc" stroke={c} strokeWidth="1.2" />
      <rect x="11" y="8" width="14" height="20" rx="2" fill="#061014" stroke={c} />
      <ellipse cx="18" cy="38" rx="6" ry="8" fill="none" stroke={c} strokeWidth="1" strokeDasharray="2 2" />
      <path d="M32 24 Q36 18 32 12" fill="none" stroke={c} strokeWidth="1" opacity="0.6" />
      <path d="M4 24 Q0 18 4 12" fill="none" stroke={c} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function AccIdCardsSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 52 40" className="w-[3.1rem] h-10" aria-hidden>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 22}, ${i * 2})`}>
          <rect x="2" y="4" width="26" height="32" rx="3" fill="#cbd5e1" stroke={active ? "#00c4f9" : "#64748b"} strokeWidth="1" />
          <text x="15" y="24" textAnchor="middle" fill={active ? "#34d399" : "#475569"} fontSize="11" fontWeight="bold" fontFamily="system-ui">42</text>
        </g>
      ))}
    </svg>
  );
}

function AccEventsSvg({ active }: { active: boolean }) {
  const fill = active ? "#94a3b8" : "#64748b";
  return (
    <svg viewBox="0 0 48 36" className="w-12 h-9" aria-hidden>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 20}, 0)`}>
          <circle cx="14" cy="8" r="5" fill={fill} />
          <path d="M6 32 Q14 22 22 32" fill={fill} />
        </g>
      ))}
    </svg>
  );
}

function AccShieldSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 52 40" className="w-[3.1rem] h-10" aria-hidden>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 22}, 0)`}>
          <path
            d="M14 4 L24 8 L24 22 Q14 30 4 22 L4 8 Z"
            fill={active ? "#00c4f9" : "#1e3a5f"}
            stroke={active ? "#6ee7b7" : "#475569"}
            strokeWidth="1"
          />
          <path d="M10 16 L13 20 L18 12" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

function AccRouterSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 44 28" className="w-11 h-7" aria-hidden>
      <rect x="4" y="8" width="36" height="16" rx="3" fill="#f1f5f9" stroke={active ? "#34d399" : "#64748b"} strokeWidth="1.2" />
      <circle cx="12" cy="16" r="2" fill={active ? "#34d399" : "#94a3b8"} />
      <circle cx="22" cy="16" r="2" fill="#94a3b8" />
      <circle cx="32" cy="16" r="2" fill="#94a3b8" />
      <rect x="18" y="4" width="8" height="4" rx="1" fill="#cbd5e1" />
    </svg>
  );
}

function AccEncryptionSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 36 32" className="w-9 h-8" aria-hidden>
      <rect x="4" y="6" width="28" height="20" rx="2" fill="#f8fafc" stroke={active ? "#fbbf24" : "#64748b"} strokeWidth="1.2" />
      <rect x="8" y="10" width="20" height="3" rx="1" fill="#cbd5e1" />
      <rect x="8" y="16" width="14" height="3" rx="1" fill="#cbd5e1" />
      <path d="M26 12 L30 16 L26 20" fill="none" stroke={active ? "#fbbf24" : "#94a3b8"} strokeWidth="1.2" />
    </svg>
  );
}

function AccCardSlotSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 44 40" className="w-11 h-10" aria-hidden>
      <rect x="6" y="12" width="32" height="24" rx="3" fill="#475569" stroke={active ? "#00c4f9" : "#64748b"} strokeWidth="1.2" />
      <rect x="14" y="4" width="22" height="16" rx="2" fill="#f1f5f9" stroke={active ? "#34d399" : "#94a3b8"} transform="rotate(-8 25 12)" />
      <rect x="10" y="20" width="24" height="4" rx="1" fill="#1e293b" />
    </svg>
  );
}

function AccAuthRackSvg({ active }: { active: boolean }) {
  const c = active ? "#00c4f9" : "#64748b";
  return (
    <svg viewBox="0 0 48 40" className="w-12 h-10" aria-hidden>
      <rect x="8" y="8" width="28" height="28" rx="2" fill="#e2e8f0" stroke={c} strokeWidth="1.2" />
      <rect x="11" y="12" width="22" height="5" rx="1" fill="#061014" opacity="0.8" />
      <rect x="11" y="20" width="22" height="5" rx="1" fill="#061014" opacity="0.6" />
      <path d="M40 14 Q44 10 40 6" fill="none" stroke={c} strokeWidth="1" />
      <path d="M40 22 Q46 18 40 14" fill="none" stroke={c} strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

function AccDoorKeypadSvg({ active }: { active: boolean }) {
  return <AccControllerSvg active={active} />;
}

function AccDoorBioSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 44" className="w-10 h-11" aria-hidden>
      <rect x="8" y="6" width="24" height="34" rx="4" fill="#e2e8f0" stroke={active ? "#34d399" : "#64748b"} strokeWidth="1.2" />
      <circle cx="20" cy="20" r="8" fill="none" stroke={active ? "#00c4f9" : "#475569"} strokeWidth="1.2" />
      <path d="M16 24 Q20 30 24 24" fill="none" stroke={active ? "#34d399" : "#64748b"} strokeWidth="1" />
      <ellipse cx="17" cy="17" rx="1.5" ry="2" fill="#64748b" /><ellipse cx="23" cy="17" rx="1.5" ry="2" fill="#64748b" />
    </svg>
  );
}

function NodeIllustration({ kind, active }: { kind: NodeKind; active: boolean }) {
  switch (kind) {
    case "camera":
      return <BulletCameraSvg active={active} />;
    case "hub":
      return <NvrHubSvg active={active} />;
    case "monitors":
      return <DualMonitorSvg active={active} />;
    case "server":
      return <ServerTowerSvg active={active} />;
    case "network":
      return <NetworkRackSvg active={active} />;
    case "reader":
      return <ReaderSvg active={active} />;
    case "door":
      return <DoorSvg active={active} />;
    case "acc-reader":
      return <AccReaderSvg active={active} />;
    case "acc-controller":
      return <AccControllerSvg active={active} />;
    case "acc-door-alarm":
      return <AccDoorAlarmSvg active={active} />;
    case "acc-auth":
      return <AccAuthDeviceSvg active={active} />;
    case "acc-credentials":
      return <AccCredentialsSvg active={active} />;
    case "acc-alarm":
      return <AccAlarmSvg active={active} />;
    case "acc-biometric":
      return <AccBiometricSvg active={active} />;
    case "acc-idcards":
      return <AccIdCardsSvg active={active} />;
    case "acc-events":
      return <AccEventsSvg active={active} />;
    case "acc-shield":
      return <AccShieldSvg active={active} />;
    case "acc-router":
      return <AccRouterSvg active={active} />;
    case "acc-encryption":
      return <AccEncryptionSvg active={active} />;
    case "acc-card-slot":
      return <AccCardSlotSvg active={active} />;
    case "acc-auth-rack":
      return <AccAuthRackSvg active={active} />;
    case "acc-door-keypad":
      return <AccDoorKeypadSvg active={active} />;
    case "acc-door-bio":
      return <AccDoorBioSvg active={active} />;
    default:
      return null;
  }
}

function PinBadge({ kind }: { kind: PinKind }) {
  if (!kind) return null;
  const colors =
    kind === "alert"
      ? "text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.6)]"
      : "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]";
  return (
    <MapPin
      className={`absolute -top-1 -right-2 w-3.5 h-3.5 fill-current ${colors}`}
      strokeWidth={1.5}
    />
  );
}

function TopologyNodeButton({
  node,
  isActive,
  isDimmed,
  onHover,
  onLeave,
  onTap,
}: {
  node: TopologyNode;
  isActive: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  onTap: () => void;
}) {
  const wide =
    node.kind === "monitors" ||
    node.kind === "acc-idcards" ||
    node.kind === "acc-events" ||
    node.kind === "acc-shield";
  const compactLabel = node.kind.startsWith("acc-");

  return (
    <motion.button
      type="button"
      className={`absolute z-10 flex flex-col items-center gap-0.5 outline-none ${
        isDimmed ? "opacity-35 scale-[0.97]" : "opacity-100"
      }`}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: wide ? "translate(-50%, -58%)" : "translate(-50%, -50%)",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onTap}
      whileHover={{ scale: isDimmed ? 1 : 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <div className={`relative ${wide ? "px-1" : ""}`}>
        {node.pin && <PinBadge kind={node.pin} />}
        <motion.div
          className={`relative rounded-xl ${
            isActive
              ? "ring-2 ring-emerald-400/60 shadow-[0_0_28px_rgba(0,196,249,0.35)]"
              : ""
          }`}
          animate={
            isActive
              ? { boxShadow: ["0 0 0 rgba(0,196,249,0)", "0 0 24px rgba(0,196,249,0.35)", "0 0 0 rgba(0,196,249,0)"] }
              : {}
          }
          transition={{ duration: 1.8, repeat: isActive ? Infinity : 0 }}
        >
          <NodeIllustration kind={node.kind} active={isActive} />
        </motion.div>
      </div>
      <span
        className={`${compactLabel ? "text-[8px]" : "text-[9px] sm:text-[10px]"} font-medium tracking-wide whitespace-nowrap px-1.5 py-0.5 rounded-md ${
          isActive
            ? "text-white bg-emerald-900/80 border border-emerald-500/40"
            : "text-slate-400 bg-[#061014]/70"
        }`}
      >
        {node.label}
      </span>
      {node.sublabel && (
        <span className="text-[8px] text-slate-500 -mt-0.5">{node.sublabel}</span>
      )}
    </motion.button>
  );
}

export const cctvTopology: TopologyConfig = {
  variant: "cctv",
  hub: {
    id: "nvr",
    label: "NVR",
    x: 50,
    y: 46,
    hint: "Grabación, conmutación PoE y gestión central del circuito CCTV.",
  },
  nodes: [
    {
      id: "cam_access",
      label: "Acceso entrada",
      x: 22,
      y: 13,
      kind: "camera",
      wire: "#00c4f9",
      hint: "Cobertura del acceso principal y control de ingreso.",
    },
    {
      id: "cam_entrance",
      label: "Entrada",
      x: 10,
      y: 30,
      kind: "camera",
      pin: "alert",
      wire: "#34d399",
      hint: "Punto crítico con geolocalización y alertas.",
    },
    {
      id: "cam_dvr",
      label: "DVR / backup",
      x: 13,
      y: 66,
      kind: "camera",
      wire: "#14b8a6",
      hint: "Respaldo local y redundancia de grabación.",
    },
    {
      id: "server",
      label: "Servidor",
      x: 50,
      y: 9,
      kind: "server",
      pin: "alert",
      wire: "#00c4f9",
      hint: "Procesamiento, VMS y almacenamiento extendido.",
    },
    {
      id: "cam_hall_a",
      label: "Pasillo",
      x: 74,
      y: 14,
      kind: "camera",
      wire: "#34d399",
      hint: "Circulación interna y corredores.",
    },
    {
      id: "cam_hall_b",
      label: "Pasillo",
      sublabel: "Zona B",
      x: 90,
      y: 26,
      kind: "camera",
      wire: "#2dd4bf",
      hint: "Segunda cámara en eje de pasillo.",
    },
    {
      id: "cam_analytics",
      label: "Analítica",
      sublabel: "IA / eventos",
      x: 82,
      y: 20,
      kind: "camera",
      wire: "#a78bfa",
      hint: "Detección inteligente, LPR y analítica de video.",
    },
    {
      id: "cam_park",
      label: "Exterior",
      x: 88,
      y: 56,
      kind: "camera",
      pin: "alert",
      wire: "#f87171",
      hint: "Perímetro, playa de estacionamiento o vía pública.",
    },
    {
      id: "monitors",
      label: "Monitores",
      x: 46,
      y: 84,
      kind: "monitors",
      wire: "#00c4f9",
      hint: "Sala de monitoreo y operadores en tiempo real.",
    },
    {
      id: "network",
      label: "Red",
      x: 84,
      y: 80,
      kind: "network",
      pin: "site",
      wire: "#fbbf24",
      hint: "Core de red, uplink y enlace a nube / sede remota.",
    },
  ],
};

export const accessTopology: TopologyConfig = {
  variant: "access",
  hub: {
    id: "central",
    label: "Servidor Central",
    x: 50,
    y: 44,
    hint: "BioStar 2 — núcleo de accesos, presentismo, eventos e integración CCTV.",
  },
  nodes: [
    { id: "readers", label: "Lectores", x: 14, y: 15, kind: "acc-reader", wire: "#00c4f9", wireLabel: "Cableado", hint: "Lectores de pared y torniquetes en accesos." },
    { id: "controller", label: "Controlador", x: 28, y: 10, kind: "acc-controller", wire: "#00c4f9", wireLabel: "Cableado", hint: "Controladores de puerta y expansores." },
    { id: "door_alarm", label: "Puerta", x: 42, y: 8, kind: "acc-door-alarm", wire: "#34d399", hint: "Sirena, sensor y estado de puerta." },
    { id: "auth_top", label: "Servidor Auth", x: 58, y: 10, kind: "acc-auth", wire: "#00c4f9", hint: "Autenticación y políticas de acceso." },
    { id: "credentials", label: "Credenciales", x: 74, y: 14, kind: "acc-credentials", wire: "#34d399", hint: "Emisión y gestión de credenciales." },
    { id: "alarm", label: "Alarma", x: 90, y: 20, kind: "acc-alarm", wire: "#f87171", wireLabel: "Alarma", hint: "Sensores y eventos de intrusión." },
    { id: "biometric", label: "Biométrico", x: 93, y: 36, kind: "acc-biometric", pin: "alert", wire: "#00c4f9", wireLabel: "Cableado", hint: "Terminal facial / huella Suprema." },
    { id: "idcards", label: "Acceso", x: 91, y: 50, kind: "acc-idcards", wire: "#94a3b8", hint: "Tarjetas, tags y credenciales asignadas." },
    { id: "events", label: "Eventos", x: 88, y: 64, kind: "acc-events", wire: "#00c4f9", wireLabel: "Eventos", hint: "Registro de ingresos, egresos y auditoría." },
    { id: "shield", label: "Seguridad", x: 76, y: 52, kind: "acc-shield", wire: "#00c4f9", hint: "Anti-passback y reglas de armado." },
    { id: "auth_rack", label: "Plataforma", x: 56, y: 84, kind: "acc-auth-rack", wire: "#00c4f9", hint: "Servidor de aplicación y base de datos." },
    { id: "door_bio", label: "Puerta", x: 40, y: 86, kind: "acc-door-bio", wire: "#34d399", hint: "Cerradura con lector biométrico integrado." },
    { id: "door_keypad", label: "Puerta", x: 26, y: 84, kind: "acc-door-keypad", wire: "#34d399", hint: "Teclado PIN y apertura remota." },
    { id: "router", label: "Router", x: 10, y: 56, kind: "acc-router", wire: "#94a3b8", wireLabel: "Cableado", hint: "Enlace de red LAN hacia el servidor." },
    { id: "encryption", label: "Cifrado", x: 12, y: 38, kind: "acc-encryption", wire: "#fbbf24", wireLabel: "Cifrado", hint: "Comunicaciones cifradas extremo a extremo." },
    { id: "card_slot", label: "Credenciales", x: 10, y: 22, kind: "acc-card-slot", wire: "#00c4f9", hint: "Lectura de tarjetas en enrolamiento." },
  ],
};

export function NetworkTopologyDiagram({
  config,
  activeId,
  onSelect,
}: {
  config: TopologyConfig;
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const uid = useId().replace(/:/g, "");
  const { hub, nodes, variant } = config;
  const isAccess = variant === "access";
  const hubActive = activeId === hub.id;
  const hasSelection = activeId !== null;

  const activeHint = useMemo(() => {
    if (!activeId) return null;
    if (activeId === hub.id) return hub.hint;
    return nodes.find((n) => n.id === activeId)?.hint ?? null;
  }, [activeId, hub, nodes]);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-700/50 bg-[#040a0e] shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${
        isAccess ? "aspect-[16/12] min-h-[400px]" : "aspect-[16/11] min-h-[340px]"
      }`}
    >
      {/* Ambiente */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(0,196,249,0.08),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_48%,rgba(0,196,249,0.06),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,196,249,0.5) 1px, transparent 1px), linear-gradient(rgba(0,196,249,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute inset-0 bottom-11">
      {/* Cables ortogonales */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {nodes.map((node) => (
            <linearGradient key={`${uid}-g-${node.id}`} id={`${uid}-g-${node.id}`} gradientUnits="userSpaceOnUse" x1={node.x} y1={node.y} x2={hub.x} y2={hub.y}>
              <stop offset="0%" stopColor={node.wire} stopOpacity="0.9" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.5" />
            </linearGradient>
          ))}
        </defs>
        {nodes.map((node) => {
          const pathD = orthogonalPath(node.x, node.y, hub.x, hub.y);
          const lit = activeId === node.id || hubActive;
          const dim = hasSelection && !lit;
          return (
            <g key={node.id}>
              <path
                d={pathD}
                fill="none"
                stroke={dim ? "rgba(51,65,85,0.25)" : lit ? `url(#${uid}-g-${node.id})` : `${node.wire}33`}
                strokeWidth={lit ? 0.55 : 0.38}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {lit && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={node.wire}
                  strokeWidth={0.35}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 4"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -12 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  opacity={0.9}
                />
              )}
              {node.wireLabel && (lit || !hasSelection) && (
                <text
                  x={(node.x + hub.x) / 2}
                  y={(node.y + hub.y) / 2 - 1}
                  textAnchor="middle"
                  fill={lit ? node.wire : "rgba(148,163,184,0.45)"}
                  fontSize="2.2"
                  fontFamily="ui-monospace, monospace"
                  opacity={dim ? 0.3 : 0.85}
                >
                  {node.wireLabel}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Halo central */}
      <motion.div
        className={`absolute pointer-events-none z-[2] border ${
          isAccess ? "rounded-2xl border-cyan-500/20" : "rounded-lg border-emerald-500/15"
        }`}
        style={{
          left: `${hub.x}%`,
          top: `${hub.y}%`,
          width: isAccess ? "6rem" : "5.5rem",
          height: isAccess ? "4rem" : "3.5rem",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Hub */}
      <motion.button
        type="button"
        className={`absolute z-20 flex flex-col items-center gap-1 outline-none ${
          hasSelection && !hubActive ? "opacity-40" : ""
        }`}
        style={{ left: `${hub.x}%`, top: `${hub.y}%`, transform: "translate(-50%, -50%)" }}
        onMouseEnter={() => onSelect(hub.id)}
        onMouseLeave={() => onSelect(null)}
        onClick={() => onSelect(hubActive ? null : hub.id)}
        whileHover={{ scale: 1.03 }}
      >
        <div
          className={
            hubActive
              ? `ring-2 rounded-xl shadow-[0_0_32px_rgba(0,196,249,0.4)] ${
                  isAccess ? "ring-cyan-400/70 rounded-2xl" : "ring-emerald-400/70"
                }`
              : ""
          }
        >
          {isAccess ? (
            <CentralServerHubSvg active={hubActive || !hasSelection} />
          ) : (
            <NvrHubSvg active={hubActive || !hasSelection} />
          )}
        </div>
        <span
          className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-center px-2.5 py-1 rounded-md max-w-[7rem] leading-tight ${
            hubActive
              ? "text-emerald-300 bg-emerald-950/90 border border-emerald-500/50"
              : "text-slate-300 bg-slate-900/80"
          }`}
        >
          {hub.label}
        </span>
      </motion.button>

      {/* Nodos periféricos */}
      {nodes.map((node) => (
        <TopologyNodeButton
          key={node.id}
          node={node}
          isActive={activeId === node.id}
          isDimmed={hasSelection && activeId !== node.id && !hubActive}
          onHover={() => onSelect(node.id)}
          onLeave={() => onSelect(null)}
          onTap={() => onSelect(activeId === node.id ? null : node.id)}
        />
      ))}
      </div>

      {/* Panel inferior */}
      <div className="absolute bottom-0 inset-x-0 z-30 flex items-center gap-3 px-4 py-2.5 bg-gradient-to-t from-[#061014] via-[#061014]/95 to-transparent border-t border-slate-800/60">
        <div className="flex gap-1.5 shrink-0">
          {["#00c4f9", "#34d399", "#fbbf24", "#f87171"].map((c) => (
            <span key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c, opacity: 0.85 }} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={activeId ?? "idle"}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="text-[10px] sm:text-xs text-slate-400 font-light flex-1 text-center sm:text-left"
          >
            {activeHint ?? "Explorá el diagrama: cada cable conecta un punto físico con el núcleo central"}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
