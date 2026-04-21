'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionHeading from '../SectionHeading';

const LOOPS = [
  {
    id: 'value',
    label: '价值闭环',
    short: 'VALUE',
    detail: '锚定特殊数据与数据主权痛点 — 为垂直行业提供模型私有化与分润确权。',
    tag: '01',
  },
  {
    id: 'user',
    label: '用户闭环',
    short: 'USER',
    detail: '搭建近 200 人种子用户群；形成「使用 → 训练 → 上架 → 分润」飞轮。',
    tag: '02',
  },
  {
    id: 'commerce',
    label: '商业闭环',
    short: 'COMMERCE',
    detail: '定制化服务验证 + SaaS 订阅 + 模型分润，混合收入结构，抗周期。',
    tag: '03',
  },
  {
    id: 'land',
    label: '落地闭环',
    short: 'LANDING',
    detail: '清华实验室 → 香港保诚保险 → 规模化推广 — 从 lab 级 POC 到企业级部署。',
    tag: '04',
  },
] as const;

type LoopId = typeof LOOPS[number]['id'];

function EasyRing() {
  const [active, setActive] = useState<LoopId>('value');
  const radius = 150;

  return (
    <div className="relative mx-auto flex items-center justify-center h-[360px] md:h-[440px] w-full">
      {/* rotating dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute h-[320px] w-[320px] md:h-[400px] md:w-[400px] rounded-full border border-dashed border-retina/25"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute h-[260px] w-[260px] md:h-[340px] md:w-[340px] rounded-full border border-dashed border-electro/20"
      />

      {/* connector lines */}
      <svg className="absolute h-[360px] w-[360px] md:h-[440px] md:w-[440px]" viewBox="-200 -200 400 400">
        <defs>
          <radialGradient id="ringGlow" cx="0" cy="0" r="0.6">
            <stop offset="0%" stopColor="#00FF41" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7024FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="60" fill="url(#ringGlow)" />
        {LOOPS.map((_, i) => {
          const a = (i / LOOPS.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * radius;
          const y = Math.sin(a) * radius;
          return (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={x}
              y2={y}
              stroke="rgba(0,255,65,0.25)"
              strokeDasharray="3 4"
            />
          );
        })}
      </svg>

      {/* center core */}
      <div className="absolute z-10 flex flex-col items-center justify-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-retina/80">core</div>
        <div className="mt-1 font-hans font-black text-lg md:text-xl text-bone glow-retina">EasyModel ML</div>
        <div className="mt-1 font-mono text-[10px] text-bone/40">v0.9-alpha · ring</div>
      </div>

      {/* nodes */}
      {LOOPS.map((l, i) => {
        const a = (i / LOOPS.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;
        const isActive = active === l.id;
        return (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className="absolute group"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <motion.div
              animate={{ scale: isActive ? 1.15 : 1 }}
              className={`h-12 w-12 md:h-16 md:w-16 grid place-items-center border text-[10px] md:text-xs font-mono ${
                isActive
                  ? 'bg-retina/10 border-retina text-retina shadow-retina'
                  : 'border-retina/30 text-bone/80 hover:border-retina/80'
              }`}
            >
              <div>
                <div className="text-[9px] text-bone/50">[{l.tag}]</div>
                <div className="font-black">{l.short}</div>
              </div>
            </motion.div>
          </button>
        );
      })}

      {/* Detail drawer */}
      <div className="absolute bottom-[-20px] md:bottom-[-30px] left-1/2 -translate-x-1/2 w-full max-w-md px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
            transition={{ duration: 0.3 }}
            className="glass p-3 font-mono text-[12px] text-bone/80"
          >
            <span className="text-retina">&gt; loop[{active}].describe() </span>
            <span className="text-bone/90">{LOOPS.find((l) => l.id === active)?.detail}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
      <SectionHeading
        tag="[FLAGSHIP_PROJECTS] // 04"
        title="旗舰商业作战"
        subtitle="高烈度、可复制、正反馈。下为正在运转的部分武器系统。"
      />

      <div className="grid grid-cols-12 gap-6">
        {/* EasyModel ML */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="col-span-12 lg:col-span-7 glass chrome-edge p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-electro tracking-[0.35em]">[EASYMODEL_ML]</span>
            <span className="text-bone/40">2026.04.10 → RUNNING</span>
            <span className="text-bone/30">·</span>
            <span className="text-retina">产品 & 商业化负责人</span>
          </div>
          <h3 className="mt-2 font-hans text-3xl md:text-5xl font-black leading-[0.9] text-bone">
            <span className="glitch" data-text="EasyModel ML">EasyModel ML</span>
          </h3>
          <p className="mt-3 font-mono text-[13px] text-bone/80 leading-relaxed">
            面向垂直行业的 AI 模型自动化训练 SaaS —
            <span className="text-retina"> 模型训练界的 ClaudeCode</span>。
            支持自然语言交互、零代码垂类小模型训练与私有化部署。
          </p>

          <EasyRing />

          <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-[11px]">
            <Stat k="Seed Users" v="≈ 200" />
            <Stat k="Flywheel" v="USE→TRAIN→LIST→$" />
            <Stat k="Pilot" v="Tsinghua Lab" accent />
            <Stat k="Scale-Up" v="HK Prudential" accent />
          </div>
        </motion.div>

        {/* Hackathon */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="col-span-12 lg:col-span-5 glass-electro chrome-edge p-6 md:p-8 flex flex-col"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-retina tracking-[0.35em]">[XHS_HACKATHON_FINALE]</span>
            <span className="text-bone/40">2026.04.07 → 04.10</span>
            <span className="text-bone/30">·</span>
            <span className="text-electro">选手</span>
          </div>
          <h3 className="mt-2 font-hans text-3xl md:text-4xl font-black leading-[0.9] text-bone">
            <span className="glitch" data-text="小红书黑客松 · 巅峰赛">小红书黑客松 · 巅峰赛</span>
          </h3>
          <p className="mt-3 font-mono text-[13px] text-bone/80 leading-relaxed">
            与港科大博士 · 中科大少年班组建 6 人战队。主导市场调研（100+ 种子群）与路演 PPT，
            把晦涩底层技术产品化。
          </p>
          <ul className="mt-4 space-y-2 font-mono text-[13px] text-bone/80">
            {[
              '48h 完成 Demo，48h 内完成一次完整商业叙事',
              '赛后积累 20 家企业意向，用户扩至 170 人',
              '获得多家风投关注与后续谈判入场券',
            ].map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-electro shadow-electro" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6 grid grid-cols-3 gap-3 font-mono text-[11px]">
            <Stat k="Team" v="PhD × 少年班" />
            <Stat k="Demo" v="48h MVP" accent />
            <Stat k="Leads" v="20 corp / 170 u" accent />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="glass p-3">
      <div className="text-[9px] uppercase tracking-[0.3em] text-bone/40">{k}</div>
      <div className={`mt-1 ${accent ? 'glow-retina' : 'text-bone/90'}`}>{v}</div>
    </div>
  );
}
