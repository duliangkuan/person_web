'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  const number = tag.match(/(\d{2})/)?.[1] ?? '·';

  return (
    <div className="mb-9 md:mb-12">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e3ddd2] bg-white font-mono text-sm font-bold text-retina">
          {number}
        </span>
        <div className="h-px flex-1 bg-[#e6e3dd]" />
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-soft md:block">{tag}</span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
        className="mt-5 max-w-5xl border-l-[6px] border-retina pl-4 font-hans text-4xl font-black leading-tight text-ink md:text-6xl"
      >
        <span className="marker-line">{title}</span>
      </motion.h2>
      {subtitle && <p className="mt-4 max-w-3xl pl-5 text-base leading-8 text-soft md:text-lg">{subtitle}</p>}
    </div>
  );
}
