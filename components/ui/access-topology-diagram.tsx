"use client";

import React, { useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccessNode = {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  wire: string;
  lineLabel?: string;
  lineBadge?: string;
  hint: string;
  render: (active: boolean, gid: string) => React.ReactNode;
};

const WIRED = "#6eb5d9";
const ORANGE = "#e8954c";
const GREEN = "#5cb87a";

/** Centro geométrico del canvas (líneas convergen aquí) */
const HUB = { x: 50, y: 50, id: "central", hint: "BioStar 2 — servidor central de accesos y presentismo." };

/** Tamaño compacto — iconos periféricos más chicos que el hub */
const SZ = {
  reader: "w-[1.35rem] h-8",
  tall: "w-[1.35rem] h-9",
  wide: "w-9 h-5",
  dual: "w-10 h-5",
  box: "w-7 h-5",
  shield: "w-6 h-6",
  hub: "w-[5rem] h-[3.1rem]",
} as const;

function useIconDefs(gid: string) {
  return (
    <defs>
      <linearGradient id={`${gid}-g`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f4f6f8" />
        <stop offset="45%" stopColor="#c8d0da" />
        <stop offset="100%" stopColor="#9aa8b8" />
      </linearGradient>
      <linearGradient id={`${gid}-scr`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3d5568" />
        <stop offset="100%" stopColor="#243040" />
      </linearGradient>
      <filter id={`${gid}-sh`} x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
  );
}

function WifiWaves({ x, y, active, sm }: { x: number; y: number; active: boolean; sm?: boolean }) {
  const c = active ? "#5eb8ff" : "#6b8ca8";
  const s = sm ? 0.85 : 1;
  return (
    <g opacity={0.9} transform={`scale(${s})`} style={{ transformOrigin: `${x}px ${y}px` }}>
      <path d={`M${x} ${y} Q${x - 5} ${y - 4} ${x - 8} ${y - 8}`} fill="none" stroke={c} strokeWidth="1" strokeLinecap="round" />
      <path d={`M${x} ${y} Q${x + 5} ${y - 4} ${x + 8} ${y - 8}`} fill="none" stroke={c} strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

/** Lector / controlador vertical gris (referencia) */
function ReaderDevice({ active, gid }: { active: boolean; gid: string }) {
  const st = active ? "#5eb8ff" : "#8a9bb0";
  return (
    <svg viewBox="0 0 24 40" className={SZ.reader} aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <rect x="5" y="2" width="14" height="36" rx="3" fill={`url(#${gid}-g)`} stroke={st} strokeWidth="0.8" />
        <rect x="7" y="5" width="10" height="11" rx="1.5" fill={`url(#${gid}-scr)`} />
        <rect x="7" y="19" width="10" height="16" rx="1.5" fill="#b8c4d0" />
        {[0, 1].flatMap((r) => [0, 1, 2].map((c) => <rect key={`${r}-${c}`} x={8 + c * 2.8} y={21 + r * 3.2} width="2.2" height="2.2" rx="0.4" fill="#8896a6" />))}
      </g>
    </svg>
  );
}

/** Torniquete / puerta superior */
function TurnstileIcon({ active, gid }: { active: boolean; gid: string }) {
  const st = active ? "#5eb8ff" : "#8a9bb0";
  return (
    <svg viewBox="0 0 28 36" className={SZ.reader} aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <rect x="10" y="28" width="8" height="6" rx="1" fill="#9aa8b8" />
        <rect x="4" y="8" width="6" height="22" rx="2" fill={`url(#${gid}-g)`} stroke={st} strokeWidth="0.7" transform="rotate(-25 7 20)" />
        <rect x="18" y="8" width="6" height="22" rx="2" fill={`url(#${gid}-g)`} stroke={st} strokeWidth="0.7" transform="rotate(25 21 20)" />
        <rect x="11" y="4" width="6" height="8" rx="1" fill="#b8c4d0" />
      </g>
      <WifiWaves x={22} y={12} active={active} sm />
    </svg>
  );
}

/** Servidor auth — caja horizontal (referencia) */
function AuthServerCaseIcon({ active, gid }: { active: boolean; gid: string }) {
  const st = active ? "#5eb8ff" : "#8a9bb0";
  return (
    <svg viewBox="0 0 36 24" className={SZ.wide} aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <rect x="2" y="6" width="32" height="16" rx="2" fill={`url(#${gid}-g)`} stroke={st} strokeWidth="0.8" />
        <rect x="5" y="9" width="10" height="4" rx="0.5" fill={`url(#${gid}-scr)`} />
        <rect x="5" y="14" width="18" height="2" rx="0.5" fill="#94a3b8" opacity="0.6" />
        <rect x="5" y="17" width="12" height="2" rx="0.5" fill="#94a3b8" opacity="0.4" />
      </g>
    </svg>
  );
}

function CredencesBoxIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 28 24" className={SZ.box} aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <path d="M6 18 L14 4 L22 18 Z" fill={`url(#${gid}-g)`} stroke="#8896a6" strokeWidth="0.7" />
        <path d="M6 18 H22 L20 21 H8 Z" fill="#a8b4c2" />
      </g>
    </svg>
  );
}

function CardSlotIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 28 28" className="w-7 h-7" aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <rect x="5" y="10" width="18" height="16" rx="2" fill="#a8b4c2" stroke={active ? "#5eb8ff" : "#788596"} strokeWidth="0.8" />
        <rect x="9" y="4" width="12" height="9" rx="1" fill="#eef2f6" stroke="#94a3b8" transform="rotate(-12 15 8)" />
        <rect x="7" y="16" width="14" height="3" rx="0.5" fill="#3d4f5f" />
      </g>
    </svg>
  );
}

function PlainBoxIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 28 20" className="w-7 h-5" aria-hidden>
      {useIconDefs(gid)}
      <rect x="3" y="4" width="22" height="14" rx="2" fill="#eef2f6" stroke={active ? ORANGE : "#94a3b8"} strokeWidth="0.9" filter={`url(#${gid}-sh)`} />
    </svg>
  );
}

function RouterIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 30 22" className="w-7 h-5" aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <rect x="2" y="8" width="26" height="12" rx="2" fill={`url(#${gid}-g)`} stroke={active ? GREEN : "#8896a6"} strokeWidth="0.8" />
        <rect x="11" y="3" width="8" height="5" rx="1" fill="#a8b4c2" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={5 + i * 5} y={12} width="3" height="2.5" rx="0.4" fill="#6b7d90" />
        ))}
      </g>
    </svg>
  );
}

/** Sensor alarma — campana / PIR compacto */
function AlarmIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 24 28" className="w-6 h-7" aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <path d="M6 22 H18 L16 10 Q12 5 8 10 Z" fill={`url(#${gid}-g)`} stroke={active ? "#fca5a5" : "#94a3b8"} strokeWidth="0.8" />
        <circle cx="12" cy="14" r="4" fill="#2a3544" />
      </g>
    </svg>
  );
}

/** Friobustes — torre + candado + wifi */
function FriobustesIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 24 44" className={SZ.tall} aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <rect x="6" y="2" width="12" height="40" rx="2.5" fill={`url(#${gid}-g)`} stroke={active ? "#5eb8ff" : "#94a3b8"} strokeWidth="0.8" />
        <rect x="8" y="5" width="8" height="14" rx="1" fill={`url(#${gid}-scr)`} />
        <rect x="10" y="10" width="4" height="5" rx="0.5" fill="none" stroke="#94a3b8" strokeWidth="0.7" />
        <path d="M11 12 V14 H13 V12 Q12 10.5 11 12" fill="#94a3b8" />
      </g>
      <WifiWaves x={18} y={16} active={active} sm />
    </svg>
  );
}

function Badge42Icon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 44 22" className={SZ.dual} aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(${i * 20}, 0)`}>
            <rect x="1" y="1" width="16" height="20" rx="2.5" fill="#b0bcc8" stroke={active ? "#5eb8ff" : "#788596"} strokeWidth="0.7" />
            <text x="9" y="14" textAnchor="middle" fill="#2a3544" fontSize="9" fontWeight="800" fontFamily="system-ui,sans-serif">
              42
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Events — dos siluetas en círculos grises */
function EventsIcon({ active, gid }: { active: boolean; gid: string }) {
  const f = active ? "#a8b8c8" : "#8a9bb0";
  return (
    <svg viewBox="0 0 40 22" className={SZ.dual} aria-hidden>
      {useIconDefs(gid)}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 18}, 0)`}>
          <circle cx="10" cy="11" r="10" fill="#6b7d90" opacity="0.35" />
          <circle cx="10" cy="7" r="4" fill={f} />
          <ellipse cx="10" cy="17" rx="6" ry="4" fill={f} />
        </g>
      ))}
    </svg>
  );
}

/** Escudo cuadrado azul con check (referencia Rarger / Armetion) */
function ShieldCheckIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={SZ.shield} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="3" fill={active ? "#38bdf8" : "#2a8fc4"} />
      <path d="M7 12 L10 15 L17 8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AuthPrinterIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 36 28" className="w-9 h-7" aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <rect x="6" y="10" width="24" height="16" rx="2" fill={`url(#${gid}-g)`} stroke={active ? "#5eb8ff" : "#94a3b8"} strokeWidth="0.8" />
        <rect x="4" y="4" width="28" height="8" rx="2" fill="#d1dae4" />
        <WifiWaves x={32} y={8} active={active} sm />
      </g>
    </svg>
  );
}

/** Puerta — teclado + candado */
function DoorKeypadIcon({ active, gid }: { active: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 24 40" className={SZ.reader} aria-hidden>
      {useIconDefs(gid)}
      <g filter={`url(#${gid}-sh)`}>
        <rect x="5" y="2" width="14" height="36" rx="3" fill={`url(#${gid}-g)`} stroke={active ? "#5eb8ff" : "#8a9bb0"} strokeWidth="0.8" />
        <rect x="7" y="18" width="10" height="16" rx="1.5" fill="#b8c4d0" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={9 + (i % 2) * 6} cy={20 + Math.floor(i / 2) * 4} r="1.2" fill="#788596" />
        ))}
        <circle cx="12" cy="10" r="3" fill="none" stroke={active ? ORANGE : "#94a3b8"} strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/** Puerta — círculo con candado (referencia bottom center) */
function DoorLockCircleIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={SZ.shield} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#b8c4d0" stroke={active ? "#5eb8ff" : "#8896a6"} strokeWidth="0.8" />
      <rect x="9" y="11" width="6" height="5" rx="1" fill="#5a6a7a" />
      <path d="M10 11 V9 Q12 7 14 9 V11" fill="none" stroke="#4a5a6a" strokeWidth="1.2" />
    </svg>
  );
}

function CentralServerIcon({ active }: { active: boolean }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 64" className={SZ.hub} aria-hidden>
      <defs>
        <linearGradient id={`${gid}-hub`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={active ? "#7dd3fc" : "#67c3eb"} />
          <stop offset="50%" stopColor={active ? "#38bdf8" : "#4db3e8"} />
          <stop offset="100%" stopColor={active ? "#0ea5e9" : "#2d9fd4"} />
        </linearGradient>
        <filter id={`${gid}-glow`}>
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {active && <ellipse cx="50" cy="32" rx="42" ry="26" fill="#38bdf8" opacity="0.12" />}
      <rect x="4" y="6" width="92" height="52" rx="12" fill={`url(#${gid}-hub)`} stroke="#0284c7" strokeWidth="1.5" />
      <rect x="12" y="14" width="76" height="4" rx="1" fill="white" opacity={active ? 0.3 : 0.15} />
      <text x="50" y="38" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        Central Server
      </text>
    </svg>
  );
}

const ACCESS_NODES: AccessNode[] = [
  { id: "readers", label: "Readers", x: 16, y: 14, wire: WIRED, lineLabel: "Wired", hint: "Lectores de pared y torniquetes.", render: (a, g) => <ReaderDevice active={a} gid={g} /> },
  { id: "controller", label: "Controller", x: 30, y: 11, wire: WIRED, lineLabel: "Wired", hint: "Controladores de puerta.", render: (a, g) => <ReaderDevice active={a} gid={g} /> },
  { id: "door_top", label: "Door", x: 42, y: 10, wire: WIRED, hint: "Torniquete / acceso.", render: (a, g) => <TurnstileIcon active={a} gid={g} /> },
  { id: "auth_top", label: "Authentication Server", x: 64, y: 11, wire: WIRED, hint: "Servidor de autenticación.", render: (a, g) => <AuthServerCaseIcon active={a} gid={g} /> },
  { id: "credences_top", label: "Credences", x: 78, y: 13, wire: WIRED, hint: "Gestión de credenciales.", render: (a, g) => <CredencesBoxIcon active={a} gid={g} /> },
  { id: "credences_left", label: "Crediences", x: 11, y: 26, wire: WIRED, hint: "Enrolamiento de tarjetas.", render: (a, g) => <CardSlotIcon active={a} gid={g} /> },
  { id: "encryption", label: "Encryption", x: 12, y: 40, wire: ORANGE, lineLabel: "Encryption", hint: "Tráfico cifrado.", render: (a, g) => <PlainBoxIcon active={a} gid={g} /> },
  { id: "router", label: "Router", x: 10, y: 54, wire: GREEN, lineLabel: "Wired", hint: "Enlace LAN.", render: (a, g) => <RouterIcon active={a} gid={g} /> },
  { id: "door_bl1", label: "Door", x: 15, y: 70, wire: WIRED, hint: "Lector en acceso inferior.", render: (a, g) => <ReaderDevice active={a} gid={g} /> },
  { id: "door_bl2", label: "Door", x: 24, y: 74, wire: ORANGE, hint: "Teclado y cerradura.", render: (a, g) => <DoorKeypadIcon active={a} gid={g} /> },
  { id: "alarm", label: "Alarm", x: 84, y: 16, wire: WIRED, lineLabel: "Alarm", hint: "Sensores de alarma.", render: (a, g) => <AlarmIcon active={a} gid={g} /> },
  { id: "friobustes", label: "Friobustes", x: 90, y: 30, wire: WIRED, lineLabel: "Wired", lineBadge: "4N 37", hint: "Terminal biométrico.", render: (a, g) => <FriobustesIcon active={a} gid={g} /> },
  { id: "access_cards", label: "Access", sublabel: "Credences", x: 86, y: 44, wire: WIRED, hint: "Tarjetas activas (42).", render: (a, g) => <Badge42Icon active={a} gid={g} /> },
  { id: "events", label: "Events", x: 84, y: 56, wire: WIRED, lineLabel: "Events", hint: "Auditoría de eventos.", render: (a, g) => <EventsIcon active={a} gid={g} /> },
  { id: "rarger", label: "Rarger", x: 76, y: 66, wire: WIRED, hint: "Reglas anti-passback.", render: (a) => <ShieldCheckIcon active={a} /> },
  { id: "armetion", label: "Armetion", x: 70, y: 74, wire: WIRED, lineLabel: "Alarm", hint: "Armado y seguridad.", render: (a) => <ShieldCheckIcon active={a} /> },
  { id: "door_center", label: "Door", x: 42, y: 80, wire: WIRED, hint: "Cerradura centralizada.", render: (a) => <DoorLockCircleIcon active={a} /> },
  { id: "auth_bottom", label: "Authentication Server", x: 58, y: 84, wire: WIRED, hint: "Plataforma BioStar.", render: (a, g) => <AuthPrinterIcon active={a} gid={g} /> },
];

const NODES = ACCESS_NODES;

function hubLinePath(nx: number, ny: number, hx: number, hy: number): string {
  const dx = hx - nx;
  const dy = hy - ny;
  if (Math.abs(dx) > Math.abs(dy)) {
    const midX = hx - Math.sign(dx) * Math.min(12, Math.abs(dx) * 0.32);
    return `M ${nx} ${ny} H ${midX} V ${hy} H ${hx}`;
  }
  const midY = hy - Math.sign(dy) * Math.min(10, Math.abs(dy) * 0.32);
  return `M ${nx} ${ny} V ${midY} H ${hx} V ${hy}`;
}

function AccessNodeButton({
  node,
  active,
  dimmed,
  gid,
  onHover,
  onLeave,
  onTap,
}: {
  node: AccessNode;
  active: boolean;
  dimmed: boolean;
  gid: string;
  onHover: () => void;
  onLeave: () => void;
  onTap: () => void;
}) {
  const wide = ["access_cards", "events", "auth_top", "auth_bottom"].includes(node.id);
  const bottom = node.y >= 68;

  return (
    <motion.button
      type="button"
      className={`absolute z-10 flex flex-col items-center outline-none transition-opacity ${
        dimmed ? "opacity-28" : "opacity-100"
      }`}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: bottom ? "translate(-50%, -62%)" : wide ? "translate(-50%, -52%)" : "translate(-50%, -50%)",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onTap}
      whileHover={{ scale: dimmed ? 1 : 1.05 }}
    >
      <div className={active ? "drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]" : "drop-shadow-sm"}>
        {node.render(active, `${gid}-${node.id}`)}
      </div>
      <span
        className={`mt-0.5 text-[7px] sm:text-[8px] text-center leading-snug max-w-[4.5rem] ${
          active ? "text-white" : "text-slate-300"
        } ${node.label.length > 12 ? "max-w-[5.5rem]" : ""}`}
      >
        {node.label}
      </span>
      {node.sublabel && <span className="text-[8px] text-slate-400 -mt-0.5">{node.sublabel}</span>}
    </motion.button>
  );
}

export function AccessTopologyDiagram({
  activeId: controlledId,
  onSelect,
}: {
  activeId?: string | null;
  onSelect?: (id: string | null) => void;
}) {
  const svgUid = useId().replace(/:/g, "");
  const [internalId, setInternalId] = useState<string | null>(null);
  const activeId = controlledId !== undefined ? controlledId : internalId;
  const setActiveId = onSelect ?? setInternalId;

  const hubActive = activeId === HUB.id;
  const hasSelection = activeId !== null;

  const activeHint = useMemo(() => {
    if (!activeId) return null;
    if (activeId === HUB.id) return HUB.hint;
    return NODES.find((n) => n.id === activeId)?.hint ?? null;
  }, [activeId]);

  return (
    <div className="relative w-full aspect-[4/3] min-h-[440px] rounded-2xl overflow-hidden border border-slate-800/80 bg-gradient-to-b from-[#0a1628] via-[#061018] to-[#040a12] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      <span className="absolute top-2 right-3 z-20 text-sm font-medium text-amber-200/70 pointer-events-none tracking-wide">
        Network
      </span>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(59,159,212,0.14),transparent_72%)]" />

      <div className="absolute inset-0 bottom-10">
        {/* Líneas — convergen al centro 50/50 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {NODES.map((node) => {
            const pathD = hubLinePath(node.x, node.y, HUB.x, HUB.y);
            const lit = activeId === node.id || hubActive;
            const dim = hasSelection && !lit;
            const mx = (node.x + HUB.x) / 2;
            const my = (node.y + HUB.y) / 2;

            return (
              <g key={node.id}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={dim ? "rgba(80,100,120,0.18)" : lit ? node.wire : `${node.wire}50`}
                  strokeWidth={lit ? 0.44 : 0.3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {node.lineLabel && !dim && (
                  <text x={mx} y={my - 1.5} textAnchor="middle" fill={lit ? node.wire : "rgba(180,200,220,0.45)"} fontSize="2.4" fontWeight="500">
                    {node.lineLabel}
                  </text>
                )}
                {node.lineBadge && !dim && (
                  <text x={mx + 4} y={my + 2} fill="#ef4444" fontSize="2.2" fontWeight="700" fontFamily="ui-monospace, monospace">
                    {node.lineBadge}
                  </text>
                )}
              </g>
            );
          })}
          <text x="18" y="46" fill="rgba(180,200,220,0.4)" fontSize="2.2">
            7%
          </text>
          <text x="22" y="60" fill="rgba(180,200,220,0.4)" fontSize="2.2">
            3%
          </text>
          <text x="82" y="64" fill="rgba(180,200,220,0.4)" fontSize="2.2">
            %3
          </text>
        </svg>

        {/* Nodos periféricos */}
        {NODES.map((node) => (
          <AccessNodeButton
            key={node.id}
            node={node}
            gid={svgUid}
            active={activeId === node.id}
            dimmed={hasSelection && activeId !== node.id && !hubActive}
            onHover={() => setActiveId(node.id)}
            onLeave={() => setActiveId(null)}
            onTap={() => setActiveId(activeId === node.id ? null : node.id)}
          />
        ))}

        {/* Central Server — centrado geométrico absoluto */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <motion.button
            type="button"
            className={`pointer-events-auto outline-none transition-opacity ${hasSelection && !hubActive ? "opacity-35" : "opacity-100"}`}
            onMouseEnter={() => setActiveId(HUB.id)}
            onMouseLeave={() => setActiveId(null)}
            onClick={() => setActiveId(hubActive ? null : HUB.id)}
            whileHover={{ scale: 1.03 }}
          >
            <CentralServerIcon active={hubActive || !hasSelection} />
          </motion.button>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 z-40 px-4 py-2 bg-[#061014]/95 border-t border-slate-800/50">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeId ?? "idle"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] sm:text-xs text-slate-400 text-center font-light"
          >
            {activeHint ?? "Diagrama de arquitectura — Servidor central BioStar 2"}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
