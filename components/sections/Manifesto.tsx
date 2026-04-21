'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../SectionHeading';

const CONTACT = {
  Name: '杜亮宽 (Du Fengyun)',
  Role: 'AI Architect & Product & Commercial Lead',
  Phone: '15614325230',
  Email: '2330304961@qq.com',
};

function playBeep() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.06);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    o.connect(g); g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.24);
  } catch { /* no-op */ }
}

function flashGreen() {
  const div = document.createElement('div');
  div.style.cssText =
    'position:fixed;inset:0;background:rgba(0,255,65,0.08);pointer-events:none;z-index:200;transition:opacity .5s';
  document.body.appendChild(div);
  requestAnimationFrame(() => {
    div.style.opacity = '0';
    setTimeout(() => div.remove(), 520);
  });
}

export default function Manifesto() {
  const [copied, setCopied] = useState(false);
  const [seq, setSeq] = useState<string[]>([]);
  const codeRef = useRef<HTMLPreElement>(null);

  const raw = JSON.stringify(CONTACT, null, 2);

  useEffect(() => {
    // reveal lines on scroll
    const timers: number[] = [];
    raw.split('\n').forEach((line, i) => {
      timers.push(window.setTimeout(() => setSeq((p) => [...p, line]), 180 + i * 55));
    });
    return () => timers.forEach(clearTimeout);
  }, [raw]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      flashGreen();
      playBeep();
      setTimeout(() => setCopied(false), 1800);
    } catch { /* noop */ }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
      <SectionHeading
        tag="[CORE_MANIFESTO & CONNECTION] // 06"
        title="终极宣告 · API 接入"
        subtitle="read this, copy that, ring me. the rest is noise."
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Code block / API */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="col-span-12 lg:col-span-7 glass chrome-edge overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-retina/20 font-mono text-[10px] uppercase tracking-[0.35em]">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-retina shadow-retina" />
              <span className="inline-block h-2 w-2 bg-electro shadow-electro" />
              <span className="inline-block h-2 w-2 bg-bone/40" />
              <span className="ml-2 text-bone/60">POST /contact</span>
            </div>
            <button
              onClick={handleCopy}
              aria-label="Copy contact JSON"
              className="group inline-flex items-center gap-2 border border-retina/40 px-3 py-1 text-retina hover:shadow-retina transition-shadow"
            >
              <span className="h-1.5 w-1.5 bg-retina shadow-retina" />
              <span className="text-[10px] tracking-[0.35em]">
                {copied ? '[DATA_EXTRACTED]' : 'COPY.JSON'}
              </span>
            </button>
          </div>

          <div className="relative px-6 py-5 font-mono text-sm">
            {/* line numbers column */}
            <pre
              ref={codeRef}
              className="whitespace-pre overflow-x-auto text-bone/90 leading-[1.85]"
            >
{seq.map((line, i) => (
  <div key={i} className="flex">
    <span className="select-none w-8 mr-4 text-bone/30 text-right">{String(i + 1).padStart(2, '0')}</span>
    <span>
      {syntaxColor(line)}
    </span>
  </div>
))}
              {seq.length < raw.split('\n').length && (
                <span className="animate-blinkCursor text-retina">▌</span>
              )}
            </pre>

            {copied && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-retina text-xl tracking-[0.3em] glow-retina"
                >
                  [ DATA_EXTRACTED ]
                </motion.div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-retina/20 px-4 py-3 font-mono text-[11px]">
            <a
              href="mailto:2330304961@qq.com"
              className="inline-flex items-center gap-2 px-3 py-1 border border-retina/30 text-retina hover:shadow-retina"
            >
              <span className="h-1.5 w-1.5 bg-retina" /> MAIL
            </a>
            <a
              href="tel:+8615614325230"
              className="inline-flex items-center gap-2 px-3 py-1 border border-electro/30 text-electro hover:shadow-electro"
            >
              <span className="h-1.5 w-1.5 bg-electro" /> PHONE
            </a>
            <a
              href="https://github.com/duliangkuan"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 border border-bone/20 text-bone/80 hover:text-bone"
            >
              <span className="h-1.5 w-1.5 bg-bone/60" /> GITHUB
            </a>
            <a
              href="https://xhslink.com/m/7eb3LTMdsmM"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 border border-bone/20 text-bone/80 hover:text-bone"
            >
              <span className="h-1.5 w-1.5 bg-bone/60" /> XIAOHONGSHU
            </a>
          </div>
        </motion.div>

        {/* Manifesto */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="col-span-12 lg:col-span-5 relative"
        >
          <div className="glass-electro chrome-edge p-6 md:p-8 h-full">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-electro/90">
              /self_eval.final
            </div>
            <p className="mt-3 font-hans text-2xl md:text-3xl leading-[1.2] font-black text-bone">
              <span className="glow-retina">极具自驱力</span> 的复合型 AI 产品与商业化人才。
              具备极强的<span className="glow-electro"> 资源整合与破局 </span>能力。
            </p>
            <p className="mt-4 font-hans text-lg md:text-xl text-bone/80 leading-relaxed">
              对 AI 技术有敏锐的商业嗅觉 —
              <span className="text-retina"> All in AI</span>，
              致力于用技术重塑业务边界、创造真实价值。
            </p>
            <div className="dashed-x my-6" />
            <div className="font-mono text-[12px] text-bone/70 space-y-1">
              <div>&gt; if (problem.noisy &amp;&amp; stake.high):</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;return du.solve(it)</div>
              <div className="text-retina">&gt; # 99.8% uptime · 0 excuses</div>
            </div>
          </div>
        </motion.div>

        <div className="col-span-12 mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.35em] text-bone/40">
          <span>© {new Date().getFullYear()} DU.VIBE.SPACE — private consciousness terminal</span>
          <span>handcrafted with <span className="text-retina">neural flux</span> · shader v4.7</span>
        </div>
      </div>
    </section>
  );
}

function syntaxColor(line: string) {
  // naive JSON tokenization for pretty colors
  const keyMatch = line.match(/("\w+"):/);
  if (!keyMatch) {
    // string value / brace
    if (/^[\s]*[{}]/.test(line)) return <span className="text-electro">{line}</span>;
    if (/"[^"]*"/.test(line)) {
      const idx = line.indexOf(':');
      const before = line.slice(0, idx + 1);
      const after = line.slice(idx + 1);
      return (
        <>
          <span>{before}</span>
          <span className="text-retina">{after}</span>
        </>
      );
    }
    return <span>{line}</span>;
  }
  const idx = line.indexOf(keyMatch[0]);
  const before = line.slice(0, idx);
  const key = keyMatch[1];
  const rest = line.slice(idx + keyMatch[0].length);
  return (
    <>
      <span>{before}</span>
      <span className="text-electro">{key}</span>
      <span>:</span>
      <span className="text-retina">{rest}</span>
    </>
  );
}
