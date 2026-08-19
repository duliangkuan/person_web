'use client';

import { motion } from 'framer-motion';

const IDENTITIES = [
  ['01', '风云AI学习社发起人'],
  ['02', 'deepseek-harness-desktop Co-founder & COO'],
  ['03', 'AI 智能体应用工程师（高级）'],
  ['04', '数字生命卡兹克 AGORAY 成员'],
];

const METRICS = [
  ['13K+', '开源项目 Stars'],
  ['1,400+', '单篇内容触达'],
  ['100+', '线下活动到场'],
  ['20', '企业意向线索'],
];

export default function Hero() {
  return (
    <section id="hero" className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24">
      <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="note-label">
            <span className="h-2 w-2 rounded-full bg-retina" />
            PERSONAL NOTE · 2026
          </div>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.24em] text-[#b8492c]">杜亮宽 · Du Fengyun</p>
          <h1 className="mt-2 font-hans text-[20vw] font-black leading-none tracking-[-0.08em] text-ink sm:text-8xl md:text-9xl lg:text-[9.5rem]">
            <span className="marker-line">风云</span>
          </h1>

          <p className="mt-7 max-w-3xl font-hans text-2xl font-black leading-snug text-ink md:text-4xl">
            把 AI 从“看起来很厉害”，做成真正能运行、能交付、能被人用起来的东西。
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-soft md:text-lg">
            我在做智能体、自动化、开源项目和 AI 内容，也在经营风云AI学习社。这个网站记录我的真实项目、实战经验，以及正在推进的产品。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="paper-button">查看代表项目</a>
            <a href="#learning" className="paper-button secondary">了解风云AI学习社</a>
            <a href="https://github.com/duliangkuan" target="_blank" rel="noreferrer" className="paper-button secondary">GitHub ↗</a>
            <a href="https://xhslink.com/m/7eb3LTMdsmM" target="_blank" rel="noreferrer" className="paper-button secondary">小红书 ↗</a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {METRICS.map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: .12 + index * .06 }}
                className="glass p-4"
              >
                <div className="font-hans text-2xl font-black text-retina md:text-3xl">{value}</div>
                <div className="mt-1 text-xs leading-5 text-soft">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: .12 }}
          className="glass chrome-edge overflow-hidden"
        >
          <div className="border-b border-[#e6e3dd] bg-[#f3ede4] px-5 py-4 md:px-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6a4d33]">当前身份 / Current roles</div>
            <p className="mt-1 text-sm text-soft">不堆标签，只保留目前真正承担的角色。</p>
          </div>

          <div className="space-y-1 p-4 md:p-5">
            {IDENTITIES.map(([index, label]) => (
              <div key={label} className="flex gap-4 rounded-xl border border-transparent px-3 py-3 transition hover:border-[#e6e3dd] hover:bg-[#fcfaf7]">
                <span className="font-mono text-xs font-bold text-retina">{index}</span>
                <span className="font-hans text-sm font-bold leading-6 text-ink">{label}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e6e3dd] p-5 md:p-6">
            <div className="paper-note">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8492c]">NOW / 正在做</div>
              <p className="mt-2 text-sm leading-7">
                维护每日 AI 日报与活动系统，推进 deepseek-harness-desktop 社区运营，同时把 Codex、CLI、RPA 与 Web 的实战经验沉淀成可复用的方法。
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
