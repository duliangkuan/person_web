'use client';

import { motion } from 'framer-motion';
import CRTIdent, { type CRTLine } from '../CRTIdent';
import LiveLog from '../LiveLog';
import RoleMatrix from '../RoleMatrix';
import SignalMap from '../SignalMap';
import TelemetryPanel from '../TelemetryPanel';

const IDENT_LINES: CRTLine[] = [
  { key: 'PERSONA',         value: 'Du Fengyun / 杜亮宽',                          tint: 'retina' },
  { key: 'CALLSIGN',        value: 'VIBE_ARCHITECT',                               tint: 'retina' },
  { key: 'STATUS',          value: 'Lvl 20 / STDU_NODE / NEURAL_NETWORK_BUILDER',  tint: 'bone' },
  { key: 'BASE_NODE',       value: 'BEIJING_GRID',                                 tint: 'retina', badge: 'ONLINE & SYNCED', badgeTint: 'electro' },
  { key: 'CURRENT_TASK',    value: 'SCALING_EASYMODEL_ML / OPENCLAW_OPTIMIZATION', tint: 'retina' },
  { key: 'COMMITS',         value: '804 this quarter',                             tint: 'bone' },
  { key: 'AGENTS_DEPLOYED', value: 'OpenClaw · Hermes · Coze',                     tint: 'retina' },
  { key: 'WEAPONRY',        value: 'Cursor · ClaudeCode · Vibe_Coding',            tint: 'electro' },
];

const IconGithub = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.8 2.74 1.28 3.42.98.1-.76.41-1.28.75-1.58-2.56-.3-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.08-.12-.3-.52-1.49.11-3.1 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.61.24 2.8.12 3.1.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.26 5.67.42.37.8 1.08.8 2.19v3.24c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const IconBook = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M4 3h12a4 4 0 0 1 4 4v12a2 2 0 0 1-2 2H7a3 3 0 0 1-3-3V3Zm2 14a1 1 0 0 0 1 1h11V7a2 2 0 0 0-2-2H6v12Zm3-9h7v2H9V8Zm0 4h7v2H9v-2Z" />
  </svg>
);

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full pt-24 md:pt-32 pb-24">
      {/* meta bar */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-retina/70">
        <span className="h-1.5 w-1.5 bg-retina shadow-retina animate-pulse" />
        <span>kernel_boot_sequence</span>
        <span className="text-bone/30">//</span>
        <span className="text-bone/50">session</span>
        <span className="text-electro">#0001</span>
        <span className="flex-1 h-px bg-gradient-to-r from-retina/50 via-electro/40 to-transparent" />
        <span className="hidden md:inline text-bone/40">
          uptime: {new Date().getFullYear() - 2006}y
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-10 md:mt-16 grid grid-cols-12 gap-6">
        {/* LEFT — identity + role + telemetry */}
        <div className="col-span-12 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs md:text-sm text-electro/80 uppercase tracking-[0.5em]"
          >
            &gt; persona.decrypt(&quot;du_fengyun&quot;)
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="brutal mt-4 font-hans text-[18vw] md:text-[12vw] lg:text-[10vw] xl:text-[9rem] leading-[0.95] pb-2 md:pb-3 text-bone"
          >
            <span className="glitch" data-text="杜亮宽">杜亮宽</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 md:mt-8 font-mono text-2xl md:text-4xl text-bone/80"
          >
            <span className="text-bone/40">// </span>
            <span className="glow-electro">DU.FENGYUN</span>
            <span className="text-bone/30"> — </span>
            <span className="glow-retina">AI ARCHITECT</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <RoleMatrix />
          </motion.div>

          {/* Telemetry grid — fills the empty area under the role line */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="mt-10"
          >
            <TelemetryPanel />
          </motion.div>

          {/* chips row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px] text-bone/60"
          >
            {[
              'OpenClaw_Contributor',
              'EasyModel_ML',
              'RAG',
              'Agent_Ops',
              'Vibe_Coding',
              'Coze × Dify × n8n',
              'Figma',
              'Bitable',
            ].map((t) => (
              <span
                key={t}
                className="chip px-2.5 py-1 border border-retina/25 text-retina/80 hover:text-retina"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* OPSLOG live feed — fills the bottom-left vacuum */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-8"
          >
            <LiveLog />
          </motion.div>
        </div>

        {/* RIGHT — ident + topology + signal radar */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="col-span-12 lg:col-span-5"
        >
          <CRTIdent lines={IDENT_LINES} />

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com/duliangkuan"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-3 py-2 border border-retina/40 text-retina hover:shadow-retina transition-shadow"
            >
              <IconGithub />
              <span className="text-[11px] tracking-[0.25em] font-mono">GITHUB</span>
            </a>
            <a
              href="https://xhslink.com/m/7eb3LTMdsmM"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-3 py-2 border border-electro/40 text-electro hover:shadow-electro transition-shadow"
            >
              <IconBook />
              <span className="text-[11px] tracking-[0.25em] font-mono">XIAOHONGSHU</span>
            </a>
          </div>

          {/* Signal radar — lives where the topology globe used to be */}
          <div className="mt-5">
            <SignalMap />
          </div>
        </motion.div>

        {/* Bottom scroll indicator */}
        <div className="col-span-12 mt-6 flex justify-end">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/50">
            <span className="animate-pulse">scroll</span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-retina to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
