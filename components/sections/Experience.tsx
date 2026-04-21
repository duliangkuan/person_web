'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

const ITEMS = [
  {
    org: '北京三快在线科技有限公司 · 美团',
    codename: 'MEITUAN_LOW_CODE_R&D',
    period: '2025.07.17 ~ 2025.08.29',
    role: 'Agent 测试开发 · 项目实习生',
    bullets: [
      '深度参与对标 Coze 的低代码搭建平台 0→1 打磨',
      '每日闭环 10-20 个 Bug 定位；配合撰写 PRD 与原型设计',
      '完成系统性竞品分析，联动团队快速迭代上线',
    ],
    badges: ['Agent', 'QA→Dev', 'Low-Code Platform'],
  },
  {
    org: '医纪元 × 北京大学医学部 · 循证医学 AI 科研工具',
    codename: 'PKU_EBM_AGENT',
    period: '2025.09.01 ~ 2025.11.20',
    role: '全链路实习生 · 产品 / 测试 / 工作流',
    bullets: [
      '作为唯一非医学背景成员跟进从原型到 MVP 上线闭环',
      '边学边用 Figma 0→1 搭建功能框架；扣子实现 RAG 与文献解析工作流',
      '选定最优 OCR（TextIn / 全能扫描王）并开发批量抽取系统及专用站点',
      '参与海外推广工作流，在北大师生高强度组会中推进迭代',
    ],
    badges: ['RAG', 'OCR Pipeline', 'PM × QA', 'Figma 0→1'],
  },
];

function CommitHeatmap() {
  const weeks = 26;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, () => Math.random());
  return (
    <div
      className="grid gap-[2px]"
      style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)`, gridAutoFlow: 'column', gridTemplateRows: `repeat(${days}, 1fr)` }}
    >
      {cells.map((v, i) => (
        <div
          key={i}
          className="h-2 w-2"
          style={{
            background: v < 0.2 ? 'rgba(0,255,65,0.06)' :
              v < 0.5 ? 'rgba(0,255,65,0.25)' :
                v < 0.8 ? 'rgba(0,255,65,0.55)' : '#00FF41',
            boxShadow: v > 0.85 ? '0 0 6px rgba(0,255,65,0.9)' : undefined,
          }}
        />
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
      <SectionHeading
        tag="[OPERATIONAL_RECORDS] // 03"
        title="顶级实战档案"
        subtitle="git log --oneline --graph。以下为被允许公开的作战记录。"
      />

      <div className="relative pl-6 md:pl-10">
        {/* timeline beam */}
        <div
          className="absolute left-0 md:left-3 top-0 bottom-0 w-[2px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,255,65,0.9), rgba(112,36,255,0.9), rgba(0,255,65,0))',
            boxShadow: '0 0 12px rgba(0,255,65,0.6)',
          }}
        />

        <div className="space-y-10">
          {ITEMS.map((x, i) => (
            <motion.article
              key={x.codename}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* node */}
              <div className="absolute -left-6 md:-left-[27px] top-4">
                <div className="relative h-4 w-4">
                  <div className="absolute inset-0 bg-retina shadow-retina" />
                  <div className="absolute inset-0 bg-retina animate-pulseRing" />
                </div>
              </div>

              <div className="glass chrome-edge p-5 md:p-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px]">
                  <span className="text-electro tracking-[0.35em]">[{x.codename}]</span>
                  <span className="text-bone/40">{x.period}</span>
                  <span className="text-bone/30">·</span>
                  <span className="text-retina">{x.role}</span>
                </div>
                <h3 className="mt-2 font-hans text-2xl md:text-3xl font-black text-bone">
                  <span className="glitch" data-text={x.org}>{x.org}</span>
                </h3>

                <div className="mt-5 grid grid-cols-12 gap-6">
                  <ul className="col-span-12 lg:col-span-7 space-y-2 font-mono text-[13px] text-bone/80">
                    {x.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2">
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-retina shadow-retina" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="col-span-12 lg:col-span-5 space-y-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                      commit_heatmap · {x.period.split(' ~ ')[0]}
                    </div>
                    <CommitHeatmap />
                    <div className="flex flex-wrap gap-2 pt-2">
                      {x.badges.map((b) => (
                        <span key={b} className="chip px-2 py-1 border border-retina/25 text-retina/85 font-mono text-[10px]">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
