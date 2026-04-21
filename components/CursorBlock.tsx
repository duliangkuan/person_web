'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorBlock() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x, ty = y;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (hidden) setHidden(false);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest('a, button, [role="button"], .interactive');
      setActive(!!interactive);
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener('pointermove', move);
    window.addEventListener('mouseover', over);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    let raf = 0;
    const tick = () => {
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx - 6}px, ${ty - 6}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0) scale(${active ? 1.25 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [hidden, active]);

  return (
    <div
      aria-hidden
      className="cursor-block pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 180ms' }}
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-9 w-9 border transition-[border-color,background-color,box-shadow] duration-200"
        style={{
          borderColor: active ? '#7024FF' : '#00FF41',
          boxShadow: active
            ? '0 0 24px rgba(112, 36, 255, 0.55), inset 0 0 8px rgba(112, 36, 255, 0.25)'
            : '0 0 14px rgba(0, 255, 65, 0.5)',
        }}
      >
        <span className="absolute -left-[1px] -top-[1px] h-2 w-2 border-l border-t" style={{ borderColor: 'inherit' }} />
        <span className="absolute -right-[1px] -top-[1px] h-2 w-2 border-r border-t" style={{ borderColor: 'inherit' }} />
        <span className="absolute -left-[1px] -bottom-[1px] h-2 w-2 border-l border-b" style={{ borderColor: 'inherit' }} />
        <span className="absolute -right-[1px] -bottom-[1px] h-2 w-2 border-r border-b" style={{ borderColor: 'inherit' }} />
      </div>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-3 w-3"
        style={{
          background: active ? '#7024FF' : '#00FF41',
          boxShadow: active
            ? '0 0 14px rgba(112, 36, 255, 0.9)'
            : '0 0 14px rgba(0, 255, 65, 0.9)',
        }}
      />
    </div>
  );
}
