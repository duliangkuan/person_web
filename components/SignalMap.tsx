'use client';

/**
 * SignalMap — a faux radar with a sweeping line picking up named "signals".
 *
 * Each signal represents a real business node in Du Fengyun's current graph
 * (Tsinghua Lab / HK Prudential / XHS Matrix / PKU Medical / OpenClaw /
 * Meituan). The sweep line is a conic-gradient SVG segment that rotates; when
 * it passes over a blip, the blip briefly "pings" (scales + halo). Below the
 * radar sits a compact table of the same nodes with signal-strength bars.
 */

import { useEffect, useMemo, useRef, useState } from 'react';

type Status = 'live' | 'negotiating' | 'deployed' | 'past' | 'contributing';

type Node = {
  label: string;
  sub: string;
  angleDeg: number;   // 0 = east, clockwise
  distance: number;   // 0..1 radar radius
  strength: number;   // 0..100 for the bar
  status: Status;
};

const NODES: Node[] = [
  { label: 'TSINGHUA_LAB',     sub: 'pilot · ongoing',  angleDeg: 18,  distance: 0.38, strength: 82, status: 'live' },
  { label: 'HK_PRUDENTIAL',    sub: 'negotiating · Q2', angleDeg: 78,  distance: 0.65, strength: 58, status: 'negotiating' },
  { label: 'XHS_MATRIX',       sub: '1400+ reach',      angleDeg: 148, distance: 0.50, strength: 91, status: 'live' },
  { label: 'PKU_MEDICAL',      sub: 'MVP shipped',      angleDeg: 212, distance: 0.55, strength: 74, status: 'deployed' },
  { label: 'OPENCLAW_CORE',    sub: 'contributor',      angleDeg: 278, distance: 0.28, strength: 66, status: 'contributing' },
  { label: 'MEITUAN_ALUMNI',   sub: 'past · referable', angleDeg: 332, distance: 0.78, strength: 34, status: 'past' },
];

const STATUS_COLOR: Record<Status, string> = {
  live:          '#00FF41',
  negotiating:   '#FFC83D',
  deployed:      '#00FF41',
  past:          '#8A8F89',
  contributing:  '#B59BFF',
};

const STATUS_TONE: Record<Status, string> = {
  live:          'text-retina',
  negotiating:   'text-amber-300',
  deployed:      'text-retina/80',
  past:          'text-bone/50',
  contributing:  'text-electro',
};

export default function SignalMap({ className = '' }: { className?: string }) {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef(0);

  // Smooth sweep — one full revolution every ~6s
  useEffect(() => {
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      setAngle((a) => (a + dt * 0.06) % 360);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Precompute blip XY in radar-local coords (-1..1)
  const blips = useMemo(
    () =>
      NODES.map((n) => {
        const rad = (n.angleDeg * Math.PI) / 180;
        return {
          ...n,
          x: Math.cos(rad) * n.distance,
          y: Math.sin(rad) * n.distance,
        };
      }),
    []
  );

  // Distance from sweep in degrees, used to "ping" blips.
  const pingFor = (nodeAngle: number) => {
    const diff = ((nodeAngle - angle + 540) % 360) - 180;
    const absDiff = Math.abs(diff);
    return Math.max(0, 1 - absDiff / 18); // 18° ping window
  };

  return (
    <div className={`glass chrome-edge relative p-4 md:p-5 ${className}`}>
      {/* header */}
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em]">
        <span className="h-1.5 w-1.5 bg-retina shadow-retina animate-pulse" />
        <span className="text-retina/80">[ SIGNAL_MAP.RADAR ]</span>
        <span className="flex-1 h-px bg-gradient-to-r from-retina/50 via-electro/40 to-transparent" />
        <span className="text-bone/40">sweep · 10°/s</span>
      </div>

      {/* radar area */}
      <div className="relative mx-auto mt-3 aspect-square w-full max-w-[340px]">
        {/* concentric rings */}
        <svg viewBox="-1 -1 2 2" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="radar-bg" cx="0" cy="0" r="1">
              <stop offset="0%"  stopColor="rgba(0,255,65,0.08)" />
              <stop offset="65%" stopColor="rgba(0,255,65,0.02)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <circle cx="0" cy="0" r="0.98" fill="url(#radar-bg)" />
          {[0.25, 0.5, 0.75, 1].map((r) => (
            <circle
              key={r}
              cx="0" cy="0" r={r}
              fill="none"
              stroke="rgba(0,255,65,0.20)"
              strokeWidth="0.006"
              strokeDasharray="0.02 0.03"
            />
          ))}
          {/* crosshair */}
          <line x1="-1" y1="0" x2="1" y2="0" stroke="rgba(0,255,65,0.18)" strokeWidth="0.004" />
          <line x1="0" y1="-1" x2="0" y2="1" stroke="rgba(0,255,65,0.18)" strokeWidth="0.004" />

          {/* blips */}
          {blips.map((b) => {
            const ping = pingFor(b.angleDeg);
            const color = STATUS_COLOR[b.status];
            const r = 0.025 + ping * 0.02;
            return (
              <g key={b.label}>
                {ping > 0 && (
                  <circle
                    cx={b.x}
                    cy={b.y}
                    r={0.04 + ping * 0.08}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.006"
                    opacity={ping * 0.9}
                  />
                )}
                <circle
                  cx={b.x}
                  cy={b.y}
                  r={r}
                  fill={color}
                  style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                />
              </g>
            );
          })}
        </svg>

        {/* sweep line (CSS rotate of a conic gradient wedge) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(0,255,65,0.45) 0deg, rgba(0,255,65,0.12) 12deg, rgba(0,255,65,0) 24deg, rgba(0,255,65,0) 360deg)',
              mask: 'radial-gradient(circle, transparent 6%, black 10%, black 96%, transparent 100%)',
              WebkitMask:
                'radial-gradient(circle, transparent 6%, black 10%, black 96%, transparent 100%)',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[50%] w-[1px] origin-top"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,255,65,0.95), rgba(0,255,65,0.1) 70%, transparent)',
              boxShadow: '0 0 6px rgba(0,255,65,0.8)',
              transformOrigin: '0 0',
              transform: 'translate(-0.5px, 0)',
            }}
          />
        </div>

        {/* center core */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-2 w-2 bg-retina shadow-retina" />
        </div>

        {/* Cardinal labels */}
        <div className="pointer-events-none absolute inset-0 font-mono text-[10px] text-bone/35">
          <span className="absolute top-0 left-1/2 -translate-x-1/2">N</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2">S</span>
          <span className="absolute left-0 top-1/2 -translate-y-1/2">W</span>
          <span className="absolute right-0 top-1/2 -translate-y-1/2">E</span>
        </div>
      </div>

      {/* node table */}
      <div className="dashed-x my-3" />
      <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
        {NODES.map((n) => {
          const ping = pingFor(n.angleDeg);
          return (
            <div key={n.label} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0"
                style={{
                  background: STATUS_COLOR[n.status],
                  boxShadow:
                    ping > 0.1
                      ? `0 0 8px ${STATUS_COLOR[n.status]}`
                      : `0 0 2px ${STATUS_COLOR[n.status]}`,
                }}
              />
              <span className={`w-[11ch] truncate ${STATUS_TONE[n.status]}`}>
                {n.label}
              </span>
              <span className="shrink-0 text-bone/35">::</span>
              <span className="flex-1 truncate text-bone/60">{n.sub}</span>
              <div className="h-[3px] w-[40px] shrink-0 bg-white/5 overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${n.strength}%`,
                    background: STATUS_COLOR[n.status],
                    boxShadow: `0 0 4px ${STATUS_COLOR[n.status]}`,
                  }}
                />
              </div>
              <span className="w-[3ch] text-right text-bone/50">
                {String(n.strength).padStart(2, '0')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
