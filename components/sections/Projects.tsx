'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
      <SectionHeading
        tag="[FLAGSHIP_PROJECTS] // 04"
        title="旗舰商业作战"
        subtitle="高烈度、可复制、正反馈。下为正在运转的部分武器系统。"
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Hackathon */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="col-span-12 lg:col-span-7 glass-electro chrome-edge p-6 md:p-8 flex flex-col"
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

        {/* fengyun-publish */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="col-span-12 lg:col-span-5 glass-electro chrome-edge p-6 md:p-8 flex flex-col"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-retina tracking-[0.35em]">[FENGYUN_PUBLISH]</span>
            <span className="text-bone/40">OPEN SOURCE</span>
            <span className="text-bone/30">·</span>
            <span className="text-electro">24/7 运转中</span>
          </div>
          <h3 className="mt-2 font-hans text-3xl md:text-4xl font-black leading-[0.9] text-bone">
            <span className="glitch" data-text="端到端 AI 内容流水线">端到端 AI 内容流水线</span>
          </h3>
          <p className="mt-3 font-mono text-[13px] text-bone/80 leading-relaxed">
            自研 harness 架构多 Agent 系统：50+ 信源采集 → 数据驱动选题 → AI 写作 →
            三轨 critic 评分门控 → 排版配图 → 每天 00:00 自动产出 2 篇。不过门，不发布。
          </p>
          <a
            href="https://github.com/duliangkuan/fengyun-publish"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 block overflow-hidden border border-bone/10"
          >
            <div className="relative h-64 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fengyun-architecture.svg"
                alt="fengyun-publish 系统架构图"
                className="w-full object-cover object-top opacity-90 transition group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent" />
              <div className="absolute bottom-3 right-4 font-mono text-[11px] text-electro opacity-0 transition group-hover:opacity-100">
                查看完整架构 → GitHub
              </div>
            </div>
          </a>
          <div className="mt-auto pt-6 grid grid-cols-3 gap-3 font-mono text-[11px]">
            <Stat k="Sources" v="50+ 信源" />
            <Stat k="Gate" v="3 轨 critic" accent />
            <Stat k="Ship" v="2 篇 / 日" accent />
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
