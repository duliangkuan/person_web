'use client';

/**
 * LiveLog — rolling "OPSLOG" terminal that fills the empty zone below the
 * telemetry grid. A weighted template pool synthesizes plausible logs from
 * Du Fengyun's actual stack (OpenClaw, Hermes, Coze, Dify, n8n,
 * Cursor, Claude Code, Xiaohongshu). New lines append at 280–980ms and the
 * buffer is capped at 18 rows for performance.
 *
 * SSR-safe: no Date / Math.random is called during render. All live data is
 * materialized inside useEffect, so the first paint is an empty skeleton.
 */

import { useEffect, useRef, useState } from 'react';

type Level = 'info' | 'ok' | 'warn' | 'neural' | 'commerce';

type Tpl = { build: (i: number) => string; level: Level; weight: number };

const TEMPLATES: Tpl[] = [
  { level: 'info',     weight: 3, build: (i) => `agent.openclaw.skill("rag_retrieve") → dispatched ok` },
  { level: 'commerce', weight: 3, build: (i) => `client.deliver(order#${2100 + ((i * 7) % 900)}) → shipped` },
  { level: 'neural',   weight: 2, build: (i) => `xhs.feed.engagement += ${30 + ((i * 13) % 220)}` },
  { level: 'ok',       weight: 2, build: (i) => `hermes.plan(step=${3 + (i % 9)}) → return_ok` },
  { level: 'commerce', weight: 2, build: ()  => `bitable.workflow.fire("保险_需求抽取→RAG→定价")` },
  { level: 'info',     weight: 2, build: ()  => `coze.node.exec(OCR→RAG→rerank) ${220 + ((Math.random() * 360) | 0)}ms` },
  { level: 'ok',       weight: 1, build: (i) => `dify.chatflow deployed // rev ${800 + ((i * 3) % 400)}` },
  { level: 'info',     weight: 2, build: (i) => `cursor.session.commit "++perf fix" (+${80 + ((i * 9) % 360)} LOC)` },
  { level: 'commerce', weight: 1, build: ()  => `n8n.trigger("webhook_seed_user") 1 → 170` },
  { level: 'ok',       weight: 1, build: ()  => `claudecode.fix(tsx/GlitchText) patched` },
  { level: 'warn',     weight: 1, build: ()  => `warn: token rate hit soft-cap on model=gpt-4.5` },
  { level: 'warn',     weight: 1, build: ()  => `warn: latency spike 612ms on region=HKG, auto-retry` },
  { level: 'neural',   weight: 1, build: ()  => `neural.flux.shader recompile ok · ${(400 + Math.random() * 400) | 0}μs` },
  { level: 'neural',   weight: 1, build: ()  => `vibe_coding.intent("ship fast") score=${(0.9 + Math.random() * 0.09).toFixed(2)}` },
  { level: 'commerce', weight: 1, build: ()  => `payout: freelance invoice #${1000 + ((Math.random() * 200) | 0)} settled ¥${(2 + Math.random() * 3).toFixed(1)}k` },
  { level: 'info',     weight: 1, build: ()  => `figma.frame "medops_mvp_v3" → export ok` },
];

function pickTemplate(i: number): Tpl {
  const total = TEMPLATES.reduce((s, t) => s + t.weight, 0);
  let r = Math.random() * total;
  for (const t of TEMPLATES) {
    r -= t.weight;
    if (r <= 0) return t;
  }
  return TEMPLATES[0];
}

function pad(n: number) { return String(n).padStart(2, '0'); }
function stampOf(d: Date) { return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; }

type LogLine = { id: number; ts: string; msg: string; level: Level };

const MAX_LINES = 18;

export default function LiveLog({ className = '' }: { className?: string }) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [stats, setStats] = useState({ running: 12, warn: 0, err: 0 });
  const idRef = useRef(0);

  useEffect(() => {
    // seed 10 back-dated entries so the panel opens "in progress"
    const now = Date.now();
    const seed: LogLine[] = [];
    for (let i = 0; i < 10; i++) {
      const t = pickTemplate(i);
      seed.push({
        id: idRef.current++,
        ts: stampOf(new Date(now - (10 - i) * 1400)),
        msg: t.build(i),
        level: t.level,
      });
    }
    setLines(seed);

    let cancelled = false;
    let timer = 0;
    const schedule = () => {
      if (cancelled) return;
      timer = window.setTimeout(() => {
        const i = idRef.current;
        const t = pickTemplate(i);
        const line: LogLine = {
          id: idRef.current++,
          ts: stampOf(new Date()),
          msg: t.build(i),
          level: t.level,
        };
        setLines((prev) => {
          const next = [...prev, line];
          if (next.length > MAX_LINES) next.splice(0, next.length - MAX_LINES);
          return next;
        });
        setStats((s) => ({
          running: 12 + ((Math.random() * 5) | 0) - 2,
          warn: line.level === 'warn' ? s.warn + 1 : s.warn,
          err: s.err,
        }));
        schedule();
      }, 280 + Math.random() * 700);
    };
    schedule();
    return () => { cancelled = true; if (timer) clearTimeout(timer); };
  }, []);

  return (
    <div className={`glass chrome-edge relative p-4 md:p-5 ${className}`}>
      {/* header */}
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em]">
        <span className="h-1.5 w-1.5 bg-retina shadow-retina animate-pulse" />
        <span className="text-retina/80">[ OPSLOG.LIVE ]</span>
        <span className="flex-1 h-px bg-gradient-to-r from-retina/50 via-electro/40 to-transparent" />
        <span className="text-bone/40">stream · 4Hz</span>
      </div>

      {/* body — reverse-flex flows new lines from bottom so motion feels like a tail */}
      <div className="relative mt-3 h-[320px] md:h-[360px] overflow-hidden font-mono text-[12px] leading-[1.55]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="flex flex-col-reverse gap-[2px]">
          {lines.slice().reverse().map((l, idx) => (
            <Row key={l.id} line={l} fresh={idx === 0} />
          ))}
        </div>
      </div>

      <div className="dashed-x my-3" />
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] text-bone/50">
        <span>
          <span className="text-retina">{stats.running}</span> running
        </span>
        <span>
          <span className={stats.warn > 0 ? 'text-amber-300' : 'text-bone/80'}>
            {stats.warn}
          </span>{' '}
          warnings
        </span>
        <span>
          <span className="text-bone/90">{stats.err}</span> errors
        </span>
        <span className="ml-auto text-electro/70">tail -f ∞</span>
      </div>
    </div>
  );
}

function Row({ line, fresh }: { line: LogLine; fresh: boolean }) {
  const levelTone = {
    info:     'text-bone/75',
    ok:       'text-retina/90',
    warn:     'text-amber-300/85',
    neural:   'text-electro/90',
    commerce: 'text-bone/90',
  }[line.level];

  const badgeTone = {
    info:     'bg-bone/10 text-bone/70 border-bone/15',
    ok:       'bg-retina/15 text-retina border-retina/25',
    warn:     'bg-amber-300/15 text-amber-300 border-amber-300/25',
    neural:   'bg-electro/15 text-electro border-electro/30',
    commerce: 'bg-retina/10 text-retina/85 border-retina/20',
  }[line.level];

  const badgeText = {
    info:     'INFO',
    ok:       ' OK ',
    warn:     'WARN',
    neural:   'NRAL',
    commerce: 'COMM',
  }[line.level];

  return (
    <div
      className={`flex items-baseline gap-2 whitespace-nowrap overflow-hidden ${
        fresh ? 'crt-fresh' : ''
      }`}
    >
      <span className="shrink-0 text-bone/35">{line.ts}</span>
      <span
        className={`shrink-0 border px-1.5 py-[1px] text-[10px] tracking-[0.15em] ${badgeTone}`}
      >
        {badgeText}
      </span>
      <span className={`truncate ${levelTone}`}>{line.msg}</span>

      <style jsx>{`
        .crt-fresh {
          animation: crt-fresh-in 380ms cubic-bezier(0.22, 1, 0.36, 1);
          text-shadow: 0 0 6px rgba(0, 255, 65, 0.4);
        }
        @keyframes crt-fresh-in {
          0%   { opacity: 0; transform: translateX(-6px); filter: blur(3px); }
          100% { opacity: 1; transform: translateX(0);    filter: blur(0); }
        }
      `}</style>
    </div>
  );
}
