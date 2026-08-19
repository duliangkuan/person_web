'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

const CONTACT_TEXT = `风云 / 杜亮宽\nAI Builder · Co-founder & COO\n电话：15614325230\n邮箱：2330304961@qq.com`;

const CHANNELS = [
  { label: '发送邮件', value: '2330304961@qq.com', href: 'mailto:2330304961@qq.com', tone: 'orange' },
  { label: '电话联系', value: '15614325230', href: 'tel:+8615614325230', tone: 'blue' },
  { label: 'GitHub', value: '@duliangkuan', href: 'https://github.com/duliangkuan', tone: 'purple' },
  { label: '小红书', value: '查看风云的内容', href: 'https://xhslink.com/m/7eb3LTMdsmM', tone: 'orange' },
];

export default function Manifesto() {
  const [copied, setCopied] = useState(false);

  const copyContact = async () => {
    await navigator.clipboard.writeText(CONTACT_TEXT);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <SectionHeading
        tag="[CONNECTION] // 06"
        title="联系与合作"
        subtitle="如果你想聊 AI 产品、智能体、开源社区、内容合作或真实业务落地，可以从这里找到我。"
      />

      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass chrome-edge p-6 md:p-8"
        >
          <span className="note-label">ABOUT THIS PERSON</span>
          <h3 className="mt-5 font-hans text-3xl font-black leading-tight text-ink md:text-5xl">
            极具自驱力的复合型 AI 产品与商业化实践者。
          </h3>
          <p className="mt-5 text-base leading-8 text-soft">
            我更喜欢从真实问题开始：先把事情做出来，再把过程变成可以复用的系统。对复杂项目、混乱信息和高压交付，我通常会先找到最小闭环，然后一路迭代到可用。
          </p>

          <div className="paper-note mt-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8492c]">合作方向</div>
            <p className="mt-2 text-sm leading-7">AI 产品与智能体、工作流自动化、FDE 实战、开源社区运营、AI 内容与活动合作。</p>
          </div>

          <button onClick={copyContact} className="paper-button mt-7" aria-live="polite">
            {copied ? '联系方式已复制' : '复制联系方式'}
          </button>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CHANNELS.map((channel, index) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * .05 }}
              className="glass chip flex min-h-44 flex-col justify-between p-5 md:p-6"
            >
              <div className="flex items-center justify-between">
                <span className={`h-3 w-3 rounded-full ${channel.tone === 'blue' ? 'bg-[#5b8def]' : channel.tone === 'purple' ? 'bg-[#9a6ad8]' : 'bg-retina'}`} />
                <span className="font-mono text-xs text-soft">↗</span>
              </div>
              <div>
                <div className="font-hans text-xl font-black text-ink">{channel.label}</div>
                <div className="mt-2 break-all text-sm text-soft">{channel.value}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#e6e3dd] pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft">
        <span>© {new Date().getFullYear()} 风云 · DU FENGYUN</span>
        <span>Built as a living AI practice note.</span>
      </footer>
    </section>
  );
}
