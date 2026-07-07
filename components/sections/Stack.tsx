'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

type Chip = {
  name: string;
  role: string;
  tag: 'ai' | 'lowcode' | 'commerce';
  level?: number; // 0-100
};

const CHIPS: Chip[] = [
  // AI & Agents
  { name: 'OpenClaw', role: '架构 / Skill 自定义 / 云端部署 / soul.md', tag: 'ai', level: 95 },
  { name: 'Hermes Agent', role: '多智能体编排实战熟悉度', tag: 'ai', level: 78 },
  { name: 'Vibe Coding', role: 'Cursor / ClaudeCode 高效交付模式', tag: 'ai', level: 96 },
  { name: 'Prompt Engineering', role: 'Gemini / GPT / Kimi 调优矩阵', tag: 'ai', level: 92 },
  { name: 'RAG & OCR Pipeline', role: 'TextIn / 全能扫描王 · 批量抽取系统', tag: 'ai', level: 86 },
  { name: 'Agent Harness / Eval', role: 'LLM-as-Judge · Spearman 校准 · 偏见对冲条款', tag: 'ai', level: 93 },
  { name: 'MCP & 向量检索', role: '自研 MCP server · Chroma 语义召回', tag: 'ai', level: 85 },
  // Low-code
  { name: 'Coze', role: '复杂智能体与工作流编排', tag: 'lowcode', level: 94 },
  { name: 'Dify', role: '生产级 Chatflow / Agent 部署', tag: 'lowcode', level: 90 },
  { name: 'n8n', role: '企业级事件驱动自动化', tag: 'lowcode', level: 88 },
  { name: '飞书 Bitable', role: '多维表格 · 企业工作流中台', tag: 'lowcode', level: 92 },
  { name: 'Figma', role: '原型 / 设计交付 / 0→1 搭建', tag: 'lowcode', level: 80 },
  { name: 'NotebookLM', role: '知识库与上下文管理', tag: 'lowcode', level: 78 },
  { name: 'Remotion', role: 'React 程序化视频 · 转场组件库参数化出片', tag: 'lowcode', level: 87 },
  // Commercial
  { name: '技术商业化', role: '底层技术 → 通俗落地方案', tag: 'commerce', level: 93 },
  { name: 'AI 产品经理', role: '技术驱动型 · 抗压执行力', tag: 'commerce', level: 90 },
  { name: '公众演讲 / 媒体', role: '线下大会操盘 · 媒体对接', tag: 'commerce', level: 88 },
];

const GROUPS = [
  { id: 'ai', label: 'AI & AGENT OPS', hint: '/01 · 智能体开发' },
  { id: 'lowcode', label: 'LOW-CODE FORGE', hint: '/02 · 低代码与效能' },
  { id: 'commerce', label: 'COMMERCIAL STRIKE', hint: '/03 · 商业落地' },
] as const;

function Chip({ chip, index }: { chip: Chip; index: number }) {
  const accent =
    chip.tag === 'ai' ? 'retina' : chip.tag === 'lowcode' ? 'electro' : 'retina';
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate: -0.8 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.2, 0.9, 0.3, 1.2] }}
      className="chip group relative glass p-4 font-mono text-[12px] overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[9px] uppercase tracking-[0.4em] text-bone/40">
            {chip.tag === 'ai' ? '/core/ai' : chip.tag === 'lowcode' ? '/core/forge' : '/core/strike'}
          </div>
          <div className={`mt-1 text-base md:text-lg font-semibold ${accent === 'electro' ? 'glow-electro' : 'glow-retina'} font-hans`}>
            {chip.name}
          </div>
        </div>
        <div className="text-[10px] text-bone/40">
          <span className="text-retina">{String(chip.level ?? 80).padStart(2, '0')}</span>
          <span>/100</span>
        </div>
      </div>
      <p className="mt-2 text-bone/70 leading-relaxed">{chip.role}</p>

      <div className="mt-3 h-1 w-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${chip.level ?? 80}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 + index * 0.02 }}
          className={`h-full ${accent === 'electro' ? 'bg-electro shadow-electro' : 'bg-retina shadow-retina'}`}
        />
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: accent === 'electro' ? 'radial-gradient(circle, rgba(112,36,255,0.35), transparent 60%)' : 'radial-gradient(circle, rgba(0,255,65,0.3), transparent 60%)' }}
      />
    </motion.div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
      <SectionHeading
        tag="[CORE_NEURAL_STACK] // 02"
        title="核心神经栈"
        subtitle="hw: human · sw: model · wetware: intent. 一个被反复 fuzz 过的商业化作战包。"
      />

      {GROUPS.map((g) => {
        const items = CHIPS.filter((c) => c.tag === g.id);
        return (
          <div key={g.id} className="mb-10">
            <div className="flex items-baseline justify-between mb-4 font-mono">
              <div className="text-lg md:text-xl font-bold text-bone/90 tracking-wide">{g.label}</div>
              <div className="text-[11px] tracking-[0.35em] text-retina/70">{g.hint}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((c, i) => (
                <Chip key={c.name} chip={c} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
