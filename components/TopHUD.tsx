'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'hero', label: '关于风云' },
  { id: 'learning', label: 'AI产品' },
  { id: 'stack', label: '能力栈' },
  { id: 'experience', label: '实战经历' },
  { id: 'projects', label: '代表项目' },
  { id: 'influence', label: '影响力' },
  { id: 'contact', label: '联系我' },
];

export default function TopHUD() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-42% 0px -48% 0px', threshold: 0 }
    );

    LINKS.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-[60] border-b border-[#e6e3dd] bg-[#faf8f5]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-10">
        <button onClick={go('hero')} className="group flex shrink-0 items-center gap-2" aria-label="返回首页">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-retina font-mono text-xs font-black text-white shadow-retina">FY</span>
          <span className="hidden font-hans text-sm font-black text-ink sm:inline">风云的 AI 实践手册</span>
        </button>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="页面导航">
          {LINKS.map((link, index) => (
            <button
              key={link.id}
              onClick={go(link.id)}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                active === link.id
                  ? 'bg-[#f3ede4] font-bold text-[#b8492c]'
                  : 'text-[#5b6472] hover:bg-white hover:text-ink'
              }`}
            >
              <span className="mr-1 font-mono text-[10px] text-retina/70">{String(index + 1).padStart(2, '0')}</span>
              {link.label}
            </button>
          ))}
        </nav>

        <a href="#contact" className="paper-button ml-auto !min-h-10 !px-3 !py-2 text-sm lg:ml-3">
          联系 / 合作
        </a>
      </div>

      <div className="flex gap-1 overflow-x-auto border-t border-[#ece7df] px-4 py-2 lg:hidden">
        {LINKS.map((link) => (
          <button
            key={link.id}
            onClick={go(link.id)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs ${active === link.id ? 'bg-retina text-white' : 'bg-white text-soft'}`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
}
