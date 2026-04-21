'use client';

/**
 * TelemetryPanel — [ SYS_METRICS.OVERVIEW ] KPI grid.
 *
 * Each cell runs a CountUp animation that starts when the panel enters the
 * viewport. The cadence uses easeOutCubic for a satisfying fast-then-settle
 * feel, and every cell has a jittery "tick" digit that keeps ticking over
 * after the main number locks, to create a "live telemetry" illusion without
 * inflating the real KPI value.
 */

import { useEffect, useRef, useState } from 'react';

type KPI = {
  id: string;
  label: string;
  target: number;
  suffix: string;
  hint?: string;
  accent?: 'retina' | 'electro';
};

const KPIS: KPI[] = [
  {
    id: 'traffic',
    label: 'MAX_TRAFFIC_SURGE',
    target: 1400,
    suffix: '+',
    hint: '(Single Thread)',
    accent: 'retina',
  },
  {
    id: 'offline',
    label: 'OFFLINE_NODES_SYNC',
    target: 100,
    suffix: '+',
    hint: '(Beijing Grid)',
    accent: 'retina',
  },
  {
    id: 'seed',
    label: 'SEED_USER_MATRIX',
    target: 170,
    suffix: '+ Active',
    accent: 'electro',
  },
  {
    id: 'leads',
    label: 'ENTERPRISE_LEADS',
    target: 20,
    suffix: '+ Pending',
    accent: 'electro',
  },
];

function formatNum(n: number) {
  return n.toLocaleString('en-US');
}

function Cell({ k, startOn, delay }: { k: KPI; startOn: boolean; delay: number }) {
  const [value, setValue] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!startOn) return;
    const duration = 1400 + Math.random() * 300;
    const start = performance.now() + delay;
    let raf = 0;
    const loop = (now: number) => {
      if (now < start) { raf = requestAnimationFrame(loop); return; }
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * k.target));
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [startOn, k.target, delay]);

  useEffect(() => {
    if (!startOn) return;
    const i = window.setInterval(() => setTick((n) => (n + 1) % 100), 180);
    return () => window.clearInterval(i);
  }, [startOn]);

  const bigClass =
    k.accent === 'electro' ? 'glow-electro' : 'glow-retina';

  return (
    <div className="group relative glass chrome-edge p-3 md:p-4 font-mono">
      <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-bone/50">
        <span>&gt; {k.label}</span>
        <span className="text-electro/70">
          .{String(tick).padStart(2, '0')}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span
          className={`font-hans font-black text-3xl md:text-4xl leading-none tracking-tight ${bigClass}`}
        >
          {formatNum(value)}
        </span>
        <span className="text-[11px] text-bone/70">{k.suffix}</span>
      </div>
      {k.hint && (
        <div className="mt-1 text-[10px] text-bone/40">{k.hint}</div>
      )}
      {/* Mini bar to keep the cell alive */}
      <div className="mt-3 h-[3px] w-full bg-white/5 overflow-hidden">
        <div
          className={`h-full ${k.accent === 'electro' ? 'bg-electro' : 'bg-retina'}`}
          style={{
            width: `${Math.min(100, (value / k.target) * 100)}%`,
            transition: 'width 80ms linear',
            boxShadow: k.accent === 'electro'
              ? '0 0 8px rgba(112,36,255,0.6)'
              : '0 0 8px rgba(0,255,65,0.6)',
          }}
        />
      </div>
    </div>
  );
}

export default function TelemetryPanel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (armed) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setArmed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  return (
    <div ref={rootRef} className="w-full">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-retina/80">
        <span className="h-1.5 w-1.5 bg-retina shadow-retina animate-pulse" />
        <span>[ SYS_METRICS.OVERVIEW ]</span>
        <span className="flex-1 h-px bg-gradient-to-r from-retina/50 via-electro/40 to-transparent" />
        <span className="text-bone/40">polling · 180ms</span>
      </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((k, i) => (
          <Cell key={k.id} k={k} startOn={armed} delay={i * 120} />
        ))}
      </div>
    </div>
  );
}
