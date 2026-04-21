'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading';

function Waveform({ height = 80, points = 140, hot = 0.45 }: { height?: number; points?: number; hot?: number }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const data = Array.from({ length: points }, (_, i) => {
    const x = i / (points - 1);
    const base = Math.sin(x * Math.PI * 6 + t * 1.2) * 0.4;
    const noise = Math.sin(x * 37 + t * 3.1) * 0.18 + Math.sin(x * 71 - t * 2.1) * 0.12;
    const spike = i > points * hot - 2 && i < points * hot + 2 ? 0.75 : 0;
    return Math.max(-1, Math.min(1, base + noise + spike));
  });

  const path = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points - 1)) * 100} ${50 - v * 42}`)
    .join(' ');

  return (
    <svg viewBox={`0 0 100 100`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="wave" x1="0" x2="1">
          <stop offset="0%" stopColor="#7024FF" />
          <stop offset="60%" stopColor="#00FF41" />
          <stop offset="100%" stopColor="#00FF41" />
        </linearGradient>
      </defs>
      <line x1="0" x2="100" y1="50" y2="50" stroke="rgba(0,255,65,0.12)" strokeDasharray="1 2" />
      <path d={path} stroke="url(#wave)" strokeWidth="0.7" fill="none" vectorEffect="non-scaling-stroke" />
      <path d={path + ' L100 100 L0 100 Z'} fill="rgba(0,255,65,0.04)" />
    </svg>
  );
}

const RADAR_AXES = [
  { label: '交付速度', v: 0.92 },
  { label: '需求拆解', v: 0.88 },
  { label: '技术深度', v: 0.8 },
  { label: '商务谈判', v: 0.86 },
  { label: '复购转介', v: 0.9 },
  { label: '报价精度', v: 0.84 },
];

function Radar() {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 86;
  const n = RADAR_AXES.length;

  const pts = RADAR_AXES.map((a, i) => {
    const theta = (i / n) * Math.PI * 2 - Math.PI / 2;
    const rr = r * a.v;
    return [cx + Math.cos(theta) * rr, cy + Math.sin(theta) * rr];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.25, 0.5, 0.75, 1].map((k) => (
        <polygon
          key={k}
          points={RADAR_AXES.map((_, i) => {
            const theta = (i / n) * Math.PI * 2 - Math.PI / 2;
            return `${cx + Math.cos(theta) * r * k},${cy + Math.sin(theta) * r * k}`;
          }).join(' ')}
          fill="none"
          stroke="rgba(0,255,65,0.15)"
          strokeDasharray="2 3"
        />
      ))}
      {RADAR_AXES.map((a, i) => {
        const theta = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(theta) * (r + 10);
        const y = cy + Math.sin(theta) * (r + 10);
        return (
          <g key={a.label}>
            <line
              x1={cx} y1={cy}
              x2={cx + Math.cos(theta) * r}
              y2={cy + Math.sin(theta) * r}
              stroke="rgba(0,255,65,0.18)"
              strokeDasharray="2 3"
            />
            <text
              x={x} y={y}
              fontSize="9"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(215,227,219,0.7)"
              fontFamily="JetBrains Mono, monospace"
            >
              {a.label}
            </text>
          </g>
        );
      })}
      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        d={path}
        fill="rgba(0,255,65,0.18)"
        stroke="#00FF41"
        strokeWidth="1.2"
        style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,65,0.6))' }}
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.4" fill="#00FF41" />
      ))}
    </svg>
  );
}

const FREELANCE = {
  title: '工作流 / 智能体 / 网站定制化开发',
  period: '2025.10.01 ~ 2026.02.03',
  role: '独立开发者',
  bullets: [
    '服务自媒体 / 保险 / 电商等多行业',
    '稳定月入 1w+，峰值 2w；毛利率高，低人力杠杆',
    '沉淀「需求分析 → 方案 → 报价 → 开发 → 交付」标准化 SOP',
    '技术栈：coze / n8n / dify / 企业工作流自建',
  ],
};

const EVENTS = [
  {
    title: '京西智谷 · OpenClaw 百人线下大会',
    period: '2026.03.07 ~ 2026.03.22',
    role: '全链路操盘手',
    bullets: [
      '借力「北京市人工智能产教融合基地合伙人」身份落地',
      '单篇小红书笔记引流 1400+，零成本获客 550+ 报名',
      '半月独立完成流程 / 3 位嘉宾邀约 / 5 个实战案例',
      '保障 100+ 线下实地到场；受北京新闻广播电视台采访与官方媒体宣发',
    ],
    traffic: { post: 1400, signup: 550, offline: 100 },
  },
  {
    title: 'Way to AGI · 石家庄分会场',
    period: '2025.03 ~ 2025.05',
    role: '组织者',
    bullets: [
      '举办 3 场线下活动：飞书多维表格 / trae / AI 生成视频',
      '搭建本地 AI 社区冷启动 → 持续内容节奏',
    ],
    traffic: { post: 300, signup: 180, offline: 60 },
  },
];

export default function Influence() {
  return (
    <section id="influence" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
      <SectionHeading
        tag="[COMMERCIAL_INFLUENCE] // 05"
        title="商业化与影响力"
        subtitle="流量、营收、声量，全部可复现、可追踪、可再点火。"
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Freelance — waveform + revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="col-span-12 lg:col-span-7 glass chrome-edge p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-electro tracking-[0.35em]">[SOLO_OPS_REVENUE]</span>
            <span className="text-bone/40">{FREELANCE.period}</span>
            <span className="text-bone/30">·</span>
            <span className="text-retina">{FREELANCE.role}</span>
          </div>
          <h3 className="mt-2 font-hans text-2xl md:text-4xl font-black text-bone">
            <span className="glitch" data-text={FREELANCE.title}>{FREELANCE.title}</span>
          </h3>

          <div className="mt-5 glass-electro p-4 font-mono">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-bone/50 mb-2">
              <span>monthly_revenue · normalized</span>
              <span className="text-retina">peak · ¥20,000+</span>
            </div>
            <Waveform height={110} hot={0.66} />
            <div className="mt-2 flex items-center justify-between text-[10px] text-bone/40">
              <span>OCT</span><span>NOV</span><span>DEC</span><span>JAN</span><span>FEB</span>
            </div>
          </div>

          <ul className="mt-5 grid sm:grid-cols-2 gap-2 font-mono text-[12px] text-bone/80">
            {FREELANCE.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-retina shadow-retina" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="col-span-12 lg:col-span-5 glass chrome-edge p-6 md:p-8"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-retina/80">
            /delivery_profile.radar
          </div>
          <h3 className="mt-1 font-hans text-2xl md:text-3xl font-black text-bone">
            交付能力雷达
          </h3>
          <div className="mt-4 flex items-center justify-center">
            <Radar />
          </div>
          <div className="mt-4 font-mono text-[11px] text-bone/60">
            &gt; self_eval = np.array([{RADAR_AXES.map((a) => a.v).join(', ')}])
          </div>
        </motion.div>

        {/* Events */}
        {EVENTS.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="col-span-12 lg:col-span-6 glass chrome-edge p-6 md:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
              <span className="text-electro tracking-[0.35em]">[EVENT_{String(i + 1).padStart(2, '0')}]</span>
              <span className="text-bone/40">{e.period}</span>
              <span className="text-bone/30">·</span>
              <span className="text-retina">{e.role}</span>
            </div>
            <h3 className="mt-2 font-hans text-2xl md:text-3xl font-black text-bone leading-[0.95]">
              <span className="glitch" data-text={e.title}>{e.title}</span>
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-[11px]">
              <KPI k="POST_REACH" v={`${e.traffic.post}+`} />
              <KPI k="SIGNUPS" v={`${e.traffic.signup}+`} accent />
              <KPI k="OFFLINE" v={`${e.traffic.offline}+`} />
            </div>
            <ul className="mt-4 space-y-2 font-mono text-[12px] text-bone/80">
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-retina shadow-retina" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function KPI({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="glass-electro p-3">
      <div className="text-[9px] uppercase tracking-[0.3em] text-bone/40">{k}</div>
      <div className={`mt-1 text-xl font-black font-hans ${accent ? 'glow-retina' : 'text-bone/90'}`}>{v}</div>
    </div>
  );
}
