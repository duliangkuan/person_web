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
    time: '09:10',
    code: 'DAILY_AI_ACTIVITY_PUSH',
    title: '每日 AI 活动推送',
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

const FDE_COURSES = [
  {
    code: 'CODEX_CLI',
    title: 'Codex + CLI',
    desc: '飞书办公、多维表格与视频生成自动化。',
  },
  {
    code: 'CODEX_RPA',
    title: 'Codex + RPA',
    desc: '浏览器自动化与企业级 RPA 工作流。',
  },
  {
    code: 'CODEX_WEB',
    title: 'Codex + Web',
    desc: '低成本搭建并上线生产级网站。',
  },
];

export default function LearningClub() {
  const goJoin = () => {
    document.getElementById('learning-payment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="learning" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
      <SectionHeading
        tag="[FENGYUN_AI_PRODUCT_MATRIX] // 01"
        title="风云AI产品服务"
        subtitle="学习社提供持续的信息、活动与资源；私董会围绕真实业务和项目，提供 FDE 实战与深度指导。"
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
            <span className="pb-2 font-mono text-sm text-bone/60">CNY · 当前使用至 09.30</span>
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
              onClick={goJoin}
              className="px-5 py-3 border border-retina bg-retina/10 font-mono text-xs tracking-[0.28em] text-retina hover:bg-retina hover:text-black transition-colors"
            >
              扫码加入 →
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
                <div key={system.code} className="group rounded-xl border border-[#e6e3dd] bg-white p-5 transition-colors hover:border-retina/40 hover:bg-[#fffaf6]">
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

      <motion.div
        id="learning-payment"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65 }}
        className="mt-6 grid grid-cols-12 overflow-hidden rounded-2xl border border-[#e6e3dd] bg-white shadow-retina"
      >
        <div className="col-span-12 min-w-0 border-b border-retina/20 bg-retina/[0.03] p-5 md:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="mx-auto max-w-[330px]">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.24em] text-retina">
              <span>[MEMBERSHIP_ACCESS]</span>
              <span className="text-bone/45">PAYMENT QR</span>
            </div>
            <a
              href="/images/fengyun-ai-learning-club-payment-poster.png"
              target="_blank"
              rel="noreferrer"
              className="group block min-w-0 max-w-full"
              aria-label="在新窗口打开风云AI学习社海报与收款二维码"
            >
              <img
                src="/images/fengyun-ai-learning-club-payment-poster.png"
                alt="风云AI学习社服务与加入二维码海报"
                className="h-auto w-full max-w-full rounded-xl border border-[#e6e3dd] bg-[#f3ede4] object-contain transition-opacity group-hover:opacity-85"
              />
              <span className="mt-3 block text-center font-mono text-[10px] tracking-[0.2em] text-bone/50 group-hover:text-retina transition-colors">
                点击海报可放大 / 保存扫码
              </span>
            </a>
          </div>
        </div>

        <div className="col-span-12 min-w-0 p-6 md:p-8 lg:col-span-7 lg:p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electro">[MEMBER_SERVICE_INDEX]</div>
          <h3 className="mt-4 font-hans text-3xl font-black leading-tight text-bone md:text-5xl">
            一个持续更新的 AI 信息、机会与资源节点。
          </h3>
          <p className="mt-5 max-w-2xl font-hans text-base leading-relaxed text-bone/75 md:text-lg">
            每日信息交付在飞书会员群，日常交流留在微信社群；不做课程或固定直播，重点是让真正有用的信息、活动与使用路径持续可达。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <ServiceItem
              code="01 / DAILY_SIGNAL"
              title="每日 AI 日报"
              desc="每天整理值得关注的模型、产品、公司和行业变化。"
            />
            <ServiceItem
              code="02 / ACTIVITY_RADAR"
              title="每日 AI 活动推送"
              desc="黑客松与其他 AI 活动分开整理，尽量提供时间、地点与报名入口。"
            />
            <ServiceItem
              code="03 / RESOURCE_INDEX"
              title="会员资源整合清单"
              desc="AI 工具、资料、活动与机会入口、实用网站及其他经过筛选的资源。"
            />
            <ServiceItem
              code="04 / CODING_PATH"
              title="AI 编程工具使用路径"
              desc="Claude Code、Codex 等工具的合规使用指引、配置教程与实战路径。"
            />
          </div>

          <div className="mt-8 border-l-2 border-retina bg-retina/[0.05] px-5 py-4">
            <div className="font-mono text-[10px] tracking-[0.26em] text-retina">CURRENT_MEMBER_WINDOW</div>
            <p className="mt-2 font-hans text-lg font-bold text-bone">现在加入，支付 49.9 元即可使用至 2026 年 9 月 30 日。</p>
            <p className="mt-2 font-hans text-sm leading-relaxed text-bone/65">扫描左侧海报二维码付款后，将支付截图发给我；我会在 24 小时内拉你进入会员飞书群和微信交流社群。</p>
          </div>
        </div>
      </motion.div>

      <PrivateBoard onContact={goContact} />
    </section>
  );
}

function PrivateBoard({ onContact }: { onContact: () => void }) {
  return (
    <motion.div
      id="private-board"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="mt-10 grid grid-cols-12 overflow-hidden rounded-2xl border border-[#e2c78f] bg-[#fffdf8] shadow-[0_18px_45px_-32px_rgba(140,100,34,0.45)]"
    >
      <div className="col-span-12 min-w-0 border-b border-[#e2c78f] bg-[#f8f1df] p-5 md:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
        <div className="mx-auto max-w-[330px]">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-[#8c6422]">
            <span>[FENGYUN_AI_PRIVATE_BOARD]</span>
            <span className="text-bone/40">FDE · PRACTICE</span>
          </div>
          <a
            href="/images/fengyun-ai-private-board-poster.png"
            target="_blank"
            rel="noreferrer"
            className="group block min-w-0 max-w-full"
            aria-label="在新窗口打开风云AI私董会商品海报"
          >
            <img
              src="/images/fengyun-ai-private-board-poster.png"
              alt="风云AI私董会首期服务海报"
              className="h-auto w-full max-w-full rounded-xl border border-[#d9ad62]/30 bg-[#f3ede4] object-contain transition-opacity group-hover:opacity-85"
            />
            <span className="mt-3 block text-center font-mono text-[10px] tracking-[0.18em] text-bone/45 transition-colors group-hover:text-[#8c6422]">
              点击查看完整海报
            </span>
          </a>
        </div>
      </div>

      <div className="col-span-12 min-w-0 p-6 md:p-8 lg:col-span-7 lg:p-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8c6422]">[PRIVATE_FDE_SERVICE]</div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h3 className="font-hans text-3xl font-black leading-tight text-bone md:text-5xl">风云AI私董会</h3>
            <p className="mt-3 max-w-2xl font-hans text-base leading-relaxed text-bone/70 md:text-lg">
              面向有真实业务、项目或产品想法，希望把 AI 真正用起来的人。
            </p>
          </div>
          <div className="border-l border-[#d9ad62]/40 pl-5">
            <div className="font-mono text-[9px] tracking-[0.2em] text-bone/40">FOUNDING ACCESS</div>
            <div className="mt-1 font-hans text-4xl font-black text-[#8c6422]">1499<span className="ml-2 text-sm text-bone/45">元</span></div>
            <div className="mt-1 font-hans text-xs text-bone/50">首期服务至 2026.09.30</div>
          </div>
        </div>

        <div className="mt-8">
          <div className="font-mono text-[10px] tracking-[0.25em] text-[#8c6422]">FDE 实战录播课程</div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {FDE_COURSES.map((course, index) => (
              <article key={course.code} className="rounded-xl border border-[#eadbbd] bg-white p-4 transition-colors hover:border-[#caa35c]">
                <div className="font-mono text-[9px] tracking-[0.18em] text-[#8c6422]/70">0{index + 1} / {course.code}</div>
                <h4 className="mt-2 font-hans text-lg font-black text-bone">{course.title}</h4>
                <p className="mt-2 font-hans text-sm leading-relaxed text-bone/60">{course.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <PrivateBenefit title="纸质实战资料" desc="实战经验、SOP、案例与踩坑记录。" />
          <PrivateBenefit title="2 次业务深度分析" desc="每次 60 分钟，制定方向并阶段复盘。" />
          <PrivateBenefit title="120 分钟一对一答疑" desc="课程或项目问题，可按 30／60 分钟预约。" />
          <PrivateBenefit title="学习社全部权益" desc="AI 日报、活动推送、资源清单与社群交流。" />
        </div>

        <div className="mt-7 border-l-4 border-[#caa35c] bg-[#f8f1df] px-5 py-4">
          <p className="font-hans text-sm leading-relaxed text-bone/70">
            本期腾讯会议总时长最多 4 小时；包含教学、诊断、排查与关键原型共创，不包含完整商业项目代开发。
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onContact}
            className="rounded-lg border border-[#caa35c] bg-[#caa35c] px-5 py-3 font-mono text-xs tracking-[0.24em] text-white transition-colors hover:bg-[#a77d34]"
          >
            联系加入 →
          </button>
          <span className="font-hans text-xs leading-relaxed text-bone/45">资源对接与闭门活动按实际情况安排，不承诺固定频率。</span>
        </div>
      </div>
    </motion.div>
  );
}

function PrivateBenefit({ title, desc }: { title: string; desc: string }) {
  return (
    <article className="rounded-xl border border-[#e6e3dd] bg-white p-4">
      <h4 className="font-hans text-base font-black text-[#8c6422]">{title}</h4>
      <p className="mt-1 font-hans text-sm leading-relaxed text-bone/60">{desc}</p>
    </article>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-[#e6e3dd] bg-[#fcfaf7] p-3">
      <div className="text-[9px] tracking-[0.25em] text-bone/40">{label}</div>
      <div className={`mt-1 text-xl font-black ${accent ? 'glow-retina' : 'text-bone'}`}>{value}</div>
    </div>
  );
}

function ServiceItem({ code, title, desc }: { code: string; title: string; desc: string }) {
  return (
    <article className="rounded-xl border border-[#e6e3dd] bg-white p-4 transition-colors hover:border-electro/50">
      <div className="font-mono text-[9px] tracking-[0.2em] text-electro/80">{code}</div>
      <h4 className="mt-2 font-hans text-lg font-black text-bone">{title}</h4>
      <p className="mt-2 font-hans text-sm leading-relaxed text-bone/65">{desc}</p>
    </article>
  );
}
