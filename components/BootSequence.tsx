'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LINES = [
  '[00:00.001] BIOS: Loading DU_KERNEL v4.7.1 ...',
  '[00:00.012] POST: CPU cortex integrity ............ [ OK ]',
  '[00:00.024] POST: Neural lattice mount /dev/brain .. [ OK ]',
  '[00:00.041] INIT: Agent runtime (OpenClaw)  ........ [ LINKED ]',
  '[00:00.058] INIT: Commercial subsystem solo_ops .... [ ONLINE ]',
  '[00:00.076] LOAD: sigils/vibe_coding.sig ........... [ VERIFIED ]',
  '[00:00.094] LOAD: memory/xiaohongshu.mem ........... [ 170k fans mounted ]',
  '[00:00.112] LOAD: personas/architect.persona ....... [ 杜亮宽 / Du Fengyun ]',
  '[00:00.131] NET : bind 0.0.0.0:443  ................ [ TLS ]',
  '[00:00.158] GPU : shader flux.frag ................. [ COMPILED ]',
  '[00:00.181] SELF_TEST: creativity ≥ threshold ...... [ PASS ]',
  '[00:00.204] SELF_TEST: pragmatism ≥ threshold ...... [ PASS ]',
  '[00:00.239] DAEMON: vibe-coder, product-lead, hacker [ SPAWNED ]',
  '[00:00.291] WARN: user is a genius. expect showoff.',
  '[00:00.340] SUCCESS: DU_KERNEL ready.',
  '',
  '>> Press any key to enter DU\'S_VIBE_SPACE',
];

export default function BootSequence({ onExit }: { onExit: () => void }) {
  const [visible, setVisible] = useState(true);
  const [printed, setPrinted] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let acc = 0;
    LINES.forEach((line, i) => {
      const delay = i === 0 ? 120 : 35 + Math.random() * 55;
      acc += delay;
      const t = window.setTimeout(() => {
        setPrinted((prev) => [...prev, line]);
        if (i === LINES.length - 1) setDone(true);
      }, acc);
      timers.current.push(t);
    });
    return () => { timers.current.forEach(clearTimeout); };
  }, []);

  useEffect(() => {
    if (!done) return;
    const exit = () => {
      setVisible(false);
      setTimeout(onExit, 420);
    };
    const autoTimer = window.setTimeout(exit, 3500);
    window.addEventListener('keydown', exit, { once: true });
    window.addEventListener('pointerdown', exit, { once: true });
    return () => {
      clearTimeout(autoTimer);
      window.removeEventListener('keydown', exit);
      window.removeEventListener('pointerdown', exit);
    };
  }, [done, onExit]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(14px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] bg-black"
        >
          <div className="absolute inset-0 bg-substrate opacity-40" />
          <div className="scanlines" />
          <div className="relative h-full w-full p-6 md:p-10 font-mono text-[12px] md:text-[13px] leading-[1.55]">
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-retina/70">
              <span className="h-2 w-2 bg-retina shadow-retina animate-pulse" />
              du_kernel • cold boot
              <span className="ml-auto text-electro">v4.7.1</span>
            </div>
            <pre className="whitespace-pre-wrap text-retina/90">
              {printed.map((line, i) => (
                <div key={i} className={line.startsWith('[00:00.291]') ? 'text-electro' : undefined}>
                  {line}
                  {i === printed.length - 1 && !done && <span className="animate-blinkCursor">▌</span>}
                </div>
              ))}
            </pre>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 flex items-center gap-3 text-retina"
              >
                <span className="h-3 w-3 bg-retina shadow-retina animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.3em]">
                  press any key / click to continue
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
