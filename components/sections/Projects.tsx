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
        {/* Harness / fengyun-publish */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="col-span-12 lg:col-span-7 glass-electro chrome-edge p-6 md:p-8 flex flex-col"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-retina tracking-[0.35em]">[HARNESS]</span>
            <span className="text-bone/40">OPEN SOURCE</span>
            <span className="text-bone/30">·</span>
            <span className="text-electro">24/7 运转中</span>
          </div>
          <h3 className="mt-2 font-hans text-3xl md:text-4xl font-black leading-[0.9] text-bone">
            <span className="glitch" data-text="Agent 评估闭环内容系统">Agent 评估闭环内容系统</span>
          </h3>
          <p className="mt-3 font-mono text-[13px] text-bone/80 leading-relaxed">
            Writer Agent 生成 → Judge Agent 按五维 Analytic Rubric（钩子力 / 信息密度 / 风格一致性 /
            传播设计 / 可信度）打分归因 → 不过门带修改意见回炉重写，最多三轮强制输出。
            LLM-as-Judge 用 Spearman 相关性对齐人工排序，显式条款对冲长度偏见与自我偏爱；
            配套 50+ 信源独立采集层做选题与素材召回。不过门，不发布。
          </p>
          <a
            href="https://github.com/duliangkuan/fengyun-publish"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 block overflow-hidden border border-bone/10"
          >
            <div className="relative h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fengyun-architecture.svg"
                alt="Harness 评估闭环系统架构图"
                className="w-full object-cover object-top opacity-90 transition group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent" />
              <div className="absolute bottom-3 right-4 font-mono text-[11px] text-electro opacity-0 transition group-hover:opacity-100">
                查看完整架构 → GitHub
              </div>
            </div>
          </a>
          <div className="mt-auto pt-6 grid grid-cols-3 gap-3 font-mono text-[11px]">
            <Stat k="Refactor" v="W0–W10" />
            <Stat k="Tests" v="173 unit ✓" accent />
            <Stat k="Ship" v="2 篇 / 日" accent />
          </div>
        </motion.div>

        {/* AutoVideo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="col-span-12 lg:col-span-5 glass-electro chrome-edge p-6 md:p-8 flex flex-col"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-retina tracking-[0.35em]">[AUTOVIDEO]</span>
            <span className="text-bone/40">抖音 AI 科普 IP 引擎</span>
            <span className="text-bone/30">·</span>
            <span className="text-electro">持续迭代中</span>
          </div>
          <h3 className="mt-2 font-hans text-3xl md:text-4xl font-black leading-[0.9] text-bone">
            <span className="glitch" data-text="AI 短视频自动流水线">AI 短视频自动流水线</span>
          </h3>
          <p className="mt-3 font-mono text-[13px] text-bone/80 leading-relaxed">
            打通「选题 → 脚本 → TTS 配音 → Remotion 渲染 → 成片」全链路，
            支撑抖音 AI 科普 IP 规模化生产，单条制作从数小时压缩到分钟级。
          </p>
          <ul className="mt-4 space-y-2 font-mono text-[13px] text-bone/80">
            {[
              '横评 MiniMax / 火山引擎 / Qwen3-TTS / Fish Audio，围绕音色自然度与成本完成 TTS 选型',
              'Remotion（React 程序化视频）沉淀转场动画组件库',
              'Topic-first 钩子开场模板，风格统一、参数化批量出片',
              '依托本流水线入选抖音 AI 创变者计划大区赛',
            ].map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-electro shadow-electro" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6 grid grid-cols-3 gap-3 font-mono text-[11px]">
            <Stat k="Chain" v="5 级全自动" />
            <Stat k="Render" v="Remotion" accent />
            <Stat k="Cost" v="小时 → 分钟" accent />
          </div>
        </motion.div>

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

        {/* Selected arenas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="col-span-12 lg:col-span-5 glass chrome-edge p-6 md:p-8 flex flex-col"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-retina tracking-[0.35em]">[SELECTED_ARENAS]</span>
            <span className="text-bone/40">竞赛入选与认证</span>
          </div>
          <h3 className="mt-2 font-hans text-3xl md:text-4xl font-black leading-[0.9] text-bone">
            <span className="glitch" data-text="战场准入记录">战场准入记录</span>
          </h3>
          <div className="mt-5 space-y-5">
            {[
              {
                code: 'DOUYIN_AI_CREATOR',
                date: '2026',
                title: '抖音 AI 创变者计划 · 大区赛入选',
                desc: '以 AI 短视频创作者身份入选，依托自研 AutoVideo 流水线做内容创作与账号运营。',
              },
              {
                code: 'ADVENTUREX_2026',
                date: '2026.07 · 杭州',
                title: 'AdventureX 全球青年黑客松 · 入选选手',
                desc: '中国规模最大的青年黑客松。120 小时从 0 组队完成技术创新项目，向投资人与评委公开路演。',
              },
              {
                code: 'MIIT_CERT',
                date: '认证',
                title: '工信部「AI 智能体应用工程师（高级）」',
                desc: 'Agent 系统能力的部委级认证背书。',
              },
            ].map((a) => (
              <div key={a.code} className="border-l-2 border-retina/30 pl-4">
                <div className="flex flex-wrap items-center gap-x-3 font-mono text-[10px]">
                  <span className="text-electro tracking-[0.25em]">[{a.code}]</span>
                  <span className="text-bone/40">{a.date}</span>
                </div>
                <div className="mt-1 font-hans text-lg font-black text-bone leading-tight">{a.title}</div>
                <p className="mt-1 font-mono text-[12px] text-bone/70 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-6 font-mono text-[11px] text-bone/50">
            &gt; arenas.filter(a =&gt; a.selected).length = <span className="text-retina">3</span>
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
