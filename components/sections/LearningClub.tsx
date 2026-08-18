'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

const SYSTEMS = [
  {
    time: '09:00',
    code: 'DAILY_AI_SIGNAL',
    title: '每日 AI 日报',
    desc: '从全天候信息池提炼真正值得关注的模型、产品、公司和行业变化。',
    status: 'CLOUD · ONLINE',
  },
  {
    time: '10:00',
    code: 'EVENT_OPPORTUNITY_RADAR',
    title: 'AI 活动信息整合',
    desc: '每日扫描全国黑客松活动与其他 AI 活动，整理时间、地点和报名入口。',
    status: 'DEEPSEEK · ONLINE',
  },
];

const COMMUNITY = [
  {
    code: 'FEISHU_CHANNEL',
    title: '飞书会员群',
    desc: '两套云端系统的每日固定交付阵地。',
  },
  {
    code: 'WECHAT_CHANNEL',
    title: '微信交流群',
    desc: '讨论 AI 学习、工具、项目、实习和行业机会；我看到后做简单文字答疑。',
  },
];

export default function LearningClub() {
  const goContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="learning" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
      <SectionHeading
        tag="[FENGYUN_AI_LEARNING_CLUB] // 01"
        title="风云AI学习社"
        subtitle="每天替你扫信息、找活动；群里聊真实问题。一个持续在线的 AI 学习与机会节点。"
      />

      <div className="grid grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="col-span-12 lg:col-span-5 glass chrome-edge p-6 md:p-8 overflow-hidden relative"
        >
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-retina/10 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-retina">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-retina opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 bg-retina shadow-retina" />
            </span>
            membership_node · accepting_signal
          </div>

          <div className="mt-8 font-mono text-bone/45 text-[11px] tracking-[0.3em]">MONTHLY_ACCESS</div>
          <div className="mt-1 flex items-end gap-3">
            <span className="font-hans text-6xl md:text-8xl font-black leading-none glow-retina">49.9</span>
            <span className="pb-2 font-mono text-sm text-bone/60">CNY / 月</span>
          </div>

          <p className="mt-6 max-w-md font-hans text-lg leading-relaxed text-bone/85">
            不堆课程，也不制造焦虑。核心是两套每天运行的信息系统，加一个能持续交流 AI 问题的会员社群。
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 font-mono text-[11px]">
            <Metric label="SYSTEMS" value="02" />
            <Metric label="CLOUD_UPTIME" value="24/7" accent />
            <Metric label="DELIVERY" value="DAILY" accent />
            <Metric label="FOUNDER" value="FENGYUN" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={goContact}
              className="px-5 py-3 border border-retina bg-retina/10 font-mono text-xs tracking-[0.28em] text-retina hover:bg-retina hover:text-black transition-colors"
            >
              联系加入 →
            </button>
            <a
              href="https://ai.dufengyun.xyz/today"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 border border-electro/50 font-mono text-xs tracking-[0.22em] text-electro hover:shadow-electro transition-shadow"
            >
              查看 AI 日报
            </a>
          </div>
        </motion.div>

        <div className="col-span-12 lg:col-span-7 grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="glass-electro chrome-edge p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-electro">
              <span>[AUTOMATED_DELIVERY_RAIL]</span>
              <span className="text-retina">2/2 ONLINE</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {SYSTEMS.map((system, index) => (
                <div key={system.code} className="group border border-bone/10 bg-black/35 p-5 hover:border-retina/40 transition-colors">
                  <div className="flex items-start justify-between gap-4 font-mono">
                    <span className="text-3xl font-black text-bone/90">{system.time}</span>
                    <span className="text-[9px] tracking-[0.22em] text-retina/75">{system.status}</span>
                  </div>
                  <div className="mt-5 text-[9px] font-mono tracking-[0.3em] text-electro/80">/{system.code.toLowerCase()}</div>
                  <h3 className="mt-1 font-hans text-2xl font-black text-bone group-hover:glow-retina transition">{system.title}</h3>
                  <p className="mt-3 font-hans text-sm leading-relaxed text-bone/70">{system.desc}</p>
                  <div className="mt-5 h-px bg-gradient-to-r from-retina/70 via-electro/40 to-transparent" />
                  <div className="mt-2 font-mono text-[10px] text-bone/40">packet_{String(index + 1).padStart(2, '0')} · verified</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="glass chrome-edge p-6 md:p-8"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-retina">[HUMAN_NETWORK_LAYER]</div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {COMMUNITY.map((item, index) => (
                <div key={item.code} className="border-l-2 border-electro/60 bg-electro/[0.04] px-4 py-3">
                  <div className="font-mono text-[9px] tracking-[0.26em] text-bone/40">NODE_{index + 1} · {item.code}</div>
                  <div className="mt-1 font-hans text-lg font-black text-bone">{item.title}</div>
                  <p className="mt-1 font-hans text-sm leading-relaxed text-bone/70">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-bone/10 pt-4 font-mono text-[10px] tracking-[0.18em] text-bone/55">
              <span className="text-retina">＋ 不定期 AI 一线从业者实战分享</span>
              <span>·</span>
              <span>不承诺固定频率</span>
              <span>·</span>
              <span>发起人档案 = 当前页面</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-bone/10 bg-black/30 p-3">
      <div className="text-[9px] tracking-[0.25em] text-bone/40">{label}</div>
      <div className={`mt-1 text-xl font-black ${accent ? 'glow-retina' : 'text-bone'}`}>{value}</div>
    </div>
  );
}
