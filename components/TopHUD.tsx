'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'hero', label: '00 ∙ boot' },
  { id: 'stack', label: '02 ∙ stack' },
  { id: 'experience', label: '03 ∙ records' },
  { id: 'projects', label: '04 ∙ flagship' },
  { id: 'influence', label: '05 ∙ influence' },
  { id: 'contact', label: '06 ∙ api' },
];

export default function TopHUD() {
  const [active, setActive] = useState('hero');
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            break;
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const ts = now.toISOString().replace('T', ' ').slice(0, 19);

  const go = (id: string) => () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-4 pointer-events-auto">
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <button onClick={go('hero')} className="flex items-center gap-2 group">
            <span className="h-2 w-2 bg-retina shadow-retina" />
            <span className="tracking-[0.35em] text-bone group-hover:glow-retina">DU.VIBE.SPACE</span>
          </button>
          <span className="text-bone/30">::</span>
          <span className="text-electro/80 tracking-[0.3em]">AI_ARCHITECT</span>
          <span className="flex-1 h-px bg-gradient-to-r from-retina/40 via-electro/30 to-transparent" />
          <span className="hidden md:inline text-bone/40">UTC {ts}</span>
        </div>

        <nav className="mt-3 hidden md:flex gap-2 flex-wrap">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={go(l.id)}
              className={`px-3 py-1 font-mono text-[11px] tracking-[0.25em] border transition ${
                active === l.id
                  ? 'border-retina text-retina shadow-retina bg-retina/5'
                  : 'border-bone/10 text-bone/60 hover:text-bone hover:border-retina/40'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
