'use client';

/**
 * RoleMatrix — scramble-decode role cycler.
 *
 * Every `interval` ms, the current target string is swapped for the next. During
 * the transition we run a per-character "lock-in" decoder:
 *   - The reveal index walks left→right across the composed string.
 *   - Characters to the LEFT of the reveal index lock to the target character.
 *   - Characters to the RIGHT flicker through a cryptic ASCII charset.
 * Chinese glyphs keep their codepoint width; Latin charset replaces them during
 * scramble to produce the cyber-decode look.
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const ROLES = [
  'VIBE_CODING 极客',
  'EASYMODEL_ML 商业化负责人',
  'OPENCLAW 核心架构玩家',
  '小红书 AI 博主',
];

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/?|=_-+{}[]~';

function randChar() {
  return CHARSET[(Math.random() * CHARSET.length) | 0];
}

type Props = {
  interval?: number; // ms between role changes
  duration?: number; // ms of scramble reveal
  className?: string;
};

export default function RoleMatrix({
  interval = 2000,
  duration = 520,
  className = '',
}: Props) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState(ROLES[0]);
  const [phase, setPhase] = useState<'hold' | 'scramble'>('hold');
  const rafRef = useRef<number | null>(null);

  // Cycle timer — after `interval` hold, kick off scramble toward the next role.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const nextIdx = (idx + 1) % ROLES.length;
      setPhase('scramble');
      scrambleTo(ROLES[nextIdx], duration, (final) => {
        setDisplay(final);
        setIdx(nextIdx);
        setPhase('hold');
      });
    }, interval);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // Cleanup any in-flight RAF on unmount.
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  function scrambleTo(target: string, dur: number, done: (s: string) => void) {
    const start = performance.now();
    const len = target.length;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const reveal = Math.floor(t * len);
      let out = '';
      for (let i = 0; i < len; i++) {
        out += i < reveal ? target[i] : randChar();
      }
      setDisplay(out);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        done(target);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  return (
    <div className={`font-mono text-base md:text-xl leading-tight ${className}`}>
      <span className="text-bone/50">role:= </span>
      <span className="relative inline-flex items-center align-baseline">
        {/* Bracket markers */}
        <span className="text-bone/30 mr-1">[</span>

        <AnimatePresence mode="popLayout">
          <motion.span
            key={`${idx}-${phase}`}
            initial={{ opacity: 0, filter: 'blur(4px)', letterSpacing: '0.04em' }}
            animate={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0em' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={
              phase === 'scramble'
                ? 'glow-electro tracking-tight'
                : 'glow-retina tracking-tight'
            }
          >
            {display}
          </motion.span>
        </AnimatePresence>

        <span className="text-bone/30 ml-1">]</span>
        <span className="ml-2 animate-blinkCursor text-retina">▌</span>

        {/* Tiny slot tag indicating which role is showing */}
        <span className="ml-3 hidden md:inline font-mono text-[10px] tracking-[0.4em] text-electro/80">
          SLOT_{String(idx).padStart(2, '0')}/{String(ROLES.length - 1).padStart(2, '0')}
        </span>
      </span>
    </div>
  );
}
