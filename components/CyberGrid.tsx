'use client';

/**
 * CyberGrid — fixed, pointer-events:none, purely CSS global backdrop:
 *   - Perspective floor grid (TRON-style receding horizon)
 *   - Subtle top ceiling grid (inverted)
 *   - A slim horizontal scanline that drifts from top to bottom forever
 *
 * Sits ABOVE the WebGL neural flux but BELOW all DOM content.
 */

export default function CyberGrid() {
  return (
    <div className="cyber-grid-root pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="cg-plane cg-floor" />
      <div className="cg-plane cg-ceil" />
      <div className="cg-scan" />
      <div className="cg-vignette" />

      <style jsx>{`
        .cyber-grid-root { mix-blend-mode: screen; }
        .cg-plane {
          position: absolute;
          left: -50%;
          width: 200%;
          height: 65vh;
          background-image:
            linear-gradient(to right, rgba(0, 255, 65, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 65, 0.18) 1px, transparent 1px);
          background-size: 72px 72px, 72px 72px;
          animation: cg-run 3.2s linear infinite;
          will-change: background-position;
        }
        .cg-floor {
          bottom: -5vh;
          transform: perspective(900px) rotateX(62deg);
          transform-origin: 50% 100%;
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.9) 30%, transparent 85%);
                  mask-image: linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.9) 30%, transparent 85%);
          opacity: 0.35;
        }
        .cg-ceil {
          top: -5vh;
          transform: perspective(900px) rotateX(-62deg);
          transform-origin: 50% 0%;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 5%, rgba(0,0,0,0.6) 40%, transparent 85%);
                  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 5%, rgba(0,0,0,0.6) 40%, transparent 85%);
          opacity: 0.14;
        }
        @keyframes cg-run {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 0 72px, 0 72px; }
        }
        .cg-scan {
          position: absolute;
          left: 0;
          right: 0;
          height: 220px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 255, 65, 0.04) 48%,
            rgba(0, 255, 65, 0.10) 50%,
            rgba(0, 255, 65, 0.04) 52%,
            transparent 100%
          );
          animation: cg-scan-run 9s linear infinite;
          filter: blur(0.4px);
        }
        @keyframes cg-scan-run {
          0%   { transform: translateY(-220px); }
          100% { transform: translateY(105vh); }
        }
        .cg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 55%, transparent 40%, rgba(0,0,0,0.55) 100%);
          mix-blend-mode: multiply;
        }
        @media (prefers-reduced-motion: reduce) {
          .cg-plane, .cg-scan { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
