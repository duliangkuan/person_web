'use client';

import { useEffect, useRef, useState } from 'react';

const COMMANDS: Record<string, { target?: string; say?: string }> = {
  help: { say: '[cmds] show projects | show stack | show experience | show influence | show contact | whoami | clear' },
  whoami: { say: 'du.fengyun — AI Architect · Product × Commercial · OpenClaw contributor' },
  'show hero': { target: 'hero' },
  'show stack': { target: 'stack' },
  'show skills': { target: 'stack' },
  'show experience': { target: 'experience' },
  'show records': { target: 'experience' },
  'show projects': { target: 'projects' },
  'show flagship': { target: 'projects' },
  'show influence': { target: 'influence' },
  'show commerce': { target: 'influence' },
  'show contact': { target: 'contact' },
  'show manifesto': { target: 'contact' },
  'goto top': { target: 'hero' },
  sudo: { say: 'permission denied: user is already root-level vibe_architect.' },
  rm: { say: 'rm: operation not permitted on self.' },
};

export default function TerminalInput() {
  const [value, setValue] = useState('');
  const [log, setLog] = useState<string[]>(['> type `help` to see commands.']);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);
    if (cmd === 'clear' || cmd === 'cls') {
      setLog([]);
      return;
    }
    const entry = COMMANDS[cmd];
    if (entry?.target) {
      const el = document.getElementById(entry.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setLog((l) => [...l, `> ${cmd}`, `[jump] → #${entry.target}`]);
        return;
      }
    }
    if (entry?.say) {
      setLog((l) => [...l, `> ${cmd}`, entry.say!]);
      return;
    }
    setLog((l) => [...l, `> ${cmd}`, `zsh: command not found: ${cmd} — try \`help\``]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-6xl px-3 pb-3 md:pb-5">
        <div
          className="glass chrome-edge p-3 md:p-4 font-mono transition-[max-height] duration-300 overflow-hidden"
          style={{ maxHeight: open ? 260 : 64 }}
        >
          {open && (
            <div className="max-h-36 overflow-y-auto mb-2 text-[11px] leading-relaxed text-bone/70 pr-2">
              {log.map((line, i) => (
                <div key={i} className={line.startsWith('>') ? 'text-retina' : undefined}>
                  {line}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-retina tracking-[0.2em] shrink-0">du@vibe</span>
            <span className="text-bone/40">:</span>
            <span className="text-electro/90">~/consciousness</span>
            <span className="text-bone/40">$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { run(value); setValue(''); }
                else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  if (history.length === 0) return;
                  const next = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
                  setHistIdx(next);
                  setValue(history[next] ?? '');
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  if (history.length === 0) return;
                  const next = histIdx < 0 ? -1 : Math.min(history.length, histIdx + 1);
                  setHistIdx(next);
                  setValue(history[next] ?? '');
                }
              }}
              placeholder="show projects | show stack | whoami | help  (press `/`)"
              className="flex-1 bg-transparent outline-none text-bone placeholder:text-bone/30 caret-retina"
              autoComplete="off" spellCheck={false}
            />
            <span className="hidden md:inline text-[10px] uppercase tracking-[0.35em] text-bone/40">
              enter → run · / → focus · esc → close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
