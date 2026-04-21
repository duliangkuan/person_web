'use client';

/**
 * CRT_TYPING_ENGINE
 *
 * A cold-cathode, phosphor-burn terminal readout. Lines are typed row-by-row,
 * character-by-character, at a randomized 10–50ms cadence. The active caret
 * (█) follows the typing head; when the stream finishes, the caret parks at
 * the end of the final line and breathes at 800ms cycle.
 *
 * - Respects IntersectionObserver: typing starts only when the card enters
 *   the viewport, so the reveal syncs with scroll.
 * - Honors prefers-reduced-motion: shows all lines instantly.
 * - Exposes `playKeystrokeSound(ch)` as a silent hook for future sound.
 */

import { useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Audio hook stub — intentionally silent                             */
/* ------------------------------------------------------------------ */

let _kbAudioCtx: AudioContext | null = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ensureAudioCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (_kbAudioCtx) return _kbAudioCtx;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    _kbAudioCtx = new AC();
    return _kbAudioCtx;
  } catch {
    return null;
  }
}

/**
 * playKeystrokeSound — reserved hook for a future mechanical-key audio bed.
 * Currently a no-op. Engineers can enable the impl block to hear a 1kHz tick.
 */
export function playKeystrokeSound(_char: string) {
  // === intentionally silent ===
  // const ctx = ensureAudioCtx();
  // if (!ctx) return;
  // const o = ctx.createOscillator();
  // const g = ctx.createGain();
  // o.type = 'square';
  // o.frequency.value = 980 + Math.random() * 220;
  // g.gain.setValueAtTime(0.0001, ctx.currentTime);
  // g.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 0.004);
  // g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
  // o.connect(g); g.connect(ctx.destination);
  // o.start();
  // o.stop(ctx.currentTime + 0.05);
}

/* ------------------------------------------------------------------ */
/*  Public types                                                       */
/* ------------------------------------------------------------------ */

export type CRTLine = {
  key: string;
  value: string;
  tint?: 'retina' | 'electro' | 'bone';
  /** Optional trailing meta tag after value (e.g. `[ONLINE]`) */
  badge?: string;
  badgeTint?: 'retina' | 'electro' | 'bone';
};

type Props = {
  title?: string;
  lines: CRTLine[];
  /** Override per-char delay in ms (min,max). Defaults [10, 50] */
  cadence?: [number, number];
  /** Delay between lines (ms). Defaults 90 */
  lineGap?: number;
  /** Whether to auto-start on mount regardless of viewport. Defaults false */
  autoStart?: boolean;
  className?: string;
};

/* ------------------------------------------------------------------ */
/*  Engine                                                             */
/* ------------------------------------------------------------------ */

export default function CRTIdent({
  title = '/ P R I V A T E _ I D E N T',
  lines,
  cadence = [10, 50],
  lineGap = 90,
  autoStart = false,
  className = '',
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(autoStart);
  const [row, setRow] = useState(0); // active row index (0..lines.length)
  const [col, setCol] = useState(0); // active char index within row
  const [done, setDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Composed character stream per line — WITHOUT padding: layout is done via CSS
  // columns, so the typewriter cadence only walks real glyphs. This keeps the
  // reveal fast and prevents overflow regardless of value length.
  //   shape: KEY + "::" + VALUE + (badge ? " [BADGE]" : "")
  const composed = useMemo(
    () =>
      lines.map((l) => {
        const badge = l.badge ? ` [${l.badge}]` : '';
        return `${l.key}::${l.value}${badge}`;
      }),
    [lines]
  );

  // Honor prefers-reduced-motion: instantly reveal everything.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  }, []);

  // Arm when scrolled into view.
  useEffect(() => {
    if (autoStart || armed) return;
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
  }, [armed, autoStart]);

  // Drive the typing engine.
  useEffect(() => {
    if (!armed || done || reducedMotion) return;

    if (row >= composed.length) {
      setDone(true);
      return;
    }

    const current = composed[row] ?? '';
    // when col exceeds the line, roll to next row after lineGap
    if (col > current.length) {
      const t = window.setTimeout(() => {
        setRow((r) => r + 1);
        setCol(0);
      }, lineGap);
      return () => clearTimeout(t);
    }

    const [lo, hi] = cadence;
    const delay = lo + Math.random() * (hi - lo);
    const t = window.setTimeout(() => {
      const nextChar = current[col];
      if (nextChar) playKeystrokeSound(nextChar);
      setCol((c) => c + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [armed, row, col, done, composed, cadence, lineGap, reducedMotion]);

  // Reduced motion shortcut — paint everything at once.
  useEffect(() => {
    if (reducedMotion && armed) {
      setRow(composed.length);
      setDone(true);
    }
  }, [reducedMotion, armed, composed.length]);

  return (
    <div
      ref={rootRef}
      className={`crt-root glass chrome-edge relative font-mono text-[12px] md:text-[13px] leading-[1.8] ${className}`}
      aria-label="Private Identity Terminal Card"
    >
      {/* Title tab */}
      <div className="crt-title absolute -top-3 left-4 bg-black px-2 text-[10px] tracking-[0.35em]">
        <span>{title}</span>
      </div>

      {/* Scanlines + flicker overlay, scoped to the card */}
      <div className="crt-scanlines pointer-events-none absolute inset-0" />
      <div className="crt-flicker pointer-events-none absolute inset-0" />

      {/* Content */}
      <div className="relative p-5 md:p-6">
        <div className="space-y-1.5">
          {composed.map((lineStr, i) => {
            const active = armed && !done && row === i;
            const typed = i < row ? lineStr.length : active ? Math.min(col, lineStr.length) : 0;
            const isLastDone = done && i === composed.length - 1;
            return (
              <LineView
                key={i}
                meta={lines[i]}
                typed={typed}
                showCaret={active || isLastDone}
                steadyCaret={isLastDone}
              />
            );
          })}
        </div>

        {/* System footer */}
        <div className="dashed-x my-4" />
        <div className="flex items-center gap-2 text-[10px] text-bone/50">
          <span className="h-1.5 w-1.5 bg-retina shadow-retina animate-pulse" />
          <span className="crt-text-dim">
            {done ? 'stream closed · carriage returned · tls ok' : 'decoding stream · awaiting next buffer'}
          </span>
        </div>
      </div>

      <style jsx>{`
        .crt-root {
          isolation: isolate;
          background:
            radial-gradient(120% 120% at 50% -20%, rgba(0, 255, 65, 0.07), transparent 60%),
            radial-gradient(80% 80% at 100% 120%, rgba(112, 36, 255, 0.06), transparent 60%),
            rgba(4, 10, 6, 0.78);
          box-shadow:
            inset 0 0 0 1px rgba(0, 255, 65, 0.22),
            inset 0 0 80px rgba(0, 255, 65, 0.06),
            0 0 1px rgba(0, 255, 65, 0.35),
            0 20px 60px -25px rgba(0, 255, 65, 0.35);
        }
        .crt-title {
          color: #00ff41;
          text-shadow:
            0 0 4px #00ff41,
            0 0 10px rgba(0, 255, 65, 0.8),
            0 0 22px rgba(0, 255, 65, 0.35);
        }
        /* Animated scanlines — very subtle horizontal bands drifting down */
        .crt-scanlines {
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0.28) 3px,
            rgba(0, 0, 0, 0) 4px
          );
          mix-blend-mode: multiply;
          animation: crt-scan 7s linear infinite;
          opacity: 0.65;
        }
        @keyframes crt-scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 120px; }
        }
        /* Rare 1–2% brightness dip for voltage instability */
        .crt-flicker {
          background: rgba(0, 255, 65, 0.012);
          mix-blend-mode: screen;
          animation: crt-flick 2.3s steps(12) infinite;
        }
        @keyframes crt-flick {
          0%, 100% { opacity: 0.98; }
          12% { opacity: 0.985; }
          38% { opacity: 0.965; }
          47% { opacity: 0.995; }
          61% { opacity: 0.97; }
          79% { opacity: 0.988; }
          92% { opacity: 0.98; }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Line renderer — fragments key, separator, value, caret             */
/* ------------------------------------------------------------------ */

function LineView({
  meta,
  typed,
  showCaret,
  steadyCaret,
}: {
  meta: CRTLine;
  typed: number;
  showCaret: boolean;
  steadyCaret: boolean;
}) {
  // Character stream layout (no padding, no hard spaces):
  //   [0, keyEnd)   → KEY
  //   [keyEnd, sepEnd) → "::"
  //   [sepEnd, valEnd) → VALUE
  //   [valEnd, badgeEnd) → " [BADGE]"  (leading space acts as gap)
  const SEP = '::';
  const keyEnd = meta.key.length;
  const sepEnd = keyEnd + SEP.length;
  const valEnd = sepEnd + meta.value.length;
  const badgeText = meta.badge ? ` [${meta.badge}]` : '';
  const badgeEnd = valEnd + badgeText.length;

  const v = Math.min(typed, badgeEnd);
  const keyVis = meta.key.slice(0, Math.min(v, keyEnd));
  // `::` is drawn via the column separator, but we still count it toward cadence
  const sepArmed = v >= sepEnd;
  const valVis = v > sepEnd ? meta.value.slice(0, Math.min(v - sepEnd, meta.value.length)) : '';
  const badgeVis = v > valEnd ? badgeText.slice(0, Math.min(v - valEnd, badgeText.length)) : '';

  // Decide where the caret currently sits so it attaches to the right segment.
  let caretSlot: 'key' | 'value' | 'badge' | 'end' = 'end';
  if (!showCaret) caretSlot = 'end';
  else if (v < keyEnd) caretSlot = 'key';
  else if (v < valEnd) caretSlot = 'value';
  else if (v < badgeEnd) caretSlot = 'badge';
  else caretSlot = 'badge'; // park on last visible segment

  const valueClass =
    meta.tint === 'electro'
      ? 'crt-text-electro'
      : meta.tint === 'bone'
      ? 'crt-text-bone'
      : 'crt-text';
  const badgeClass =
    meta.badgeTint === 'electro'
      ? 'crt-text-electro'
      : meta.badgeTint === 'bone'
      ? 'crt-text-bone'
      : 'crt-text';

  const Caret = (
    <span
      aria-hidden
      className={`crt-caret ${steadyCaret ? 'crt-caret-steady' : 'crt-caret-active'}`}
    >
      █
    </span>
  );

  return (
    <div className="flex items-start gap-x-2 md:gap-x-3 crt-line">
      {/* KEY column — fixed width in ch, never wraps */}
      <div className="crt-key-col shrink-0 w-[17ch] md:w-[18ch] crt-text-key">
        <span className="whitespace-nowrap">{keyVis}</span>
        {showCaret && caretSlot === 'key' && Caret}
      </div>

      {/* SEP column — 2-char fixed */}
      <div className="shrink-0 w-[2ch] text-center crt-text-sep">
        {sepArmed ? SEP : ''}
      </div>

      {/* VALUE + BADGE — wraps freely, never escapes card */}
      <div className="min-w-0 flex-1 leading-[1.6]">
        <span className={`${valueClass} break-words`}>{valVis}</span>
        {showCaret && caretSlot === 'value' && Caret}
        {badgeVis && (
          <span className={`${badgeClass} break-words whitespace-pre-wrap`}>{badgeVis}</span>
        )}
        {showCaret && caretSlot === 'badge' && Caret}
      </div>
      <style jsx>{`
        .crt-line {
          /* Subtle per-line phosphor glow baseline */
        }
        .crt-text-key {
          color: rgba(215, 227, 219, 0.55);
          letter-spacing: 0.06em;
          text-shadow: 0 0 6px rgba(0, 255, 65, 0.18);
        }
        .crt-text-sep {
          color: rgba(0, 255, 65, 0.55);
          text-shadow: 0 0 4px rgba(0, 255, 65, 0.5);
        }
        .crt-text {
          color: #00ff41;
          text-shadow:
            0 0 4px #00ff41,
            0 0 10px rgba(0, 255, 65, 0.9),
            0 0 22px rgba(0, 255, 65, 0.5),
            0 0 38px rgba(0, 255, 65, 0.25);
          animation: crt-char-flicker 1.7s steps(18) infinite;
        }
        .crt-text-electro {
          color: #b59bff;
          text-shadow:
            0 0 4px #7024ff,
            0 0 12px rgba(112, 36, 255, 0.85),
            0 0 26px rgba(112, 36, 255, 0.4);
          animation: crt-char-flicker 1.7s steps(18) infinite;
        }
        .crt-text-bone {
          color: #e9f2ec;
          text-shadow: 0 0 6px rgba(0, 255, 65, 0.25);
          animation: crt-char-flicker 1.7s steps(18) infinite;
        }
        @keyframes crt-char-flicker {
          0%, 100% { opacity: 1; }
          4% { opacity: 0.985; }
          18% { opacity: 0.992; }
          31% { opacity: 0.974; }
          44% { opacity: 0.996; }
          57% { opacity: 0.982; }
          73% { opacity: 0.99; }
          88% { opacity: 0.978; }
        }
        .crt-caret {
          display: inline-block;
          margin-left: 2px;
          color: #00ff41;
          text-shadow:
            0 0 6px #00ff41,
            0 0 18px rgba(0, 255, 65, 0.8);
          transform: translateY(1px);
        }
        /* Active caret: solid while typing, minimal blink to feel alive */
        .crt-caret-active {
          animation: crt-caret-active 0.42s steps(2) infinite;
        }
        @keyframes crt-caret-active {
          0%, 60% { opacity: 1; }
          61%, 100% { opacity: 0.55; }
        }
        /* Steady caret: 800ms breathing when stream is done */
        .crt-caret-steady {
          animation: crt-caret-steady 0.8s steps(2) infinite;
        }
        @keyframes crt-caret-steady {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
