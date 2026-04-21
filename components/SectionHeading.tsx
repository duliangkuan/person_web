'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 md:mb-16">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-retina/80">
        <span className="h-1.5 w-1.5 bg-retina shadow-retina" />
        <span>{tag}</span>
        <span className="flex-1 h-px bg-gradient-to-r from-retina/60 via-electro/40 to-transparent" />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 12, letterSpacing: '0.12em' }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: '-0.04em' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="brutal mt-3 text-5xl md:text-7xl lg:text-8xl text-bone font-hans"
        data-text={title}
      >
        <span className="glitch" data-text={title}>{title}</span>
      </motion.h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl font-mono text-sm text-bone/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}
