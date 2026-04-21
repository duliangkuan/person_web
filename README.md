# DU'S_VIBE_SPACE — Private Consciousness Terminal

A cyber-brutalist / digital-consciousness portfolio for **Du Fengyun (杜亮宽)** —
AI Architect · Commercial Lead · OpenClaw contributor.

Built as a single-page experience that reads as a private AI architect's
terminal rather than a corporate CV.

## Stack

- **Next.js 14 (App Router)** — headless runtime
- **React Three Fiber + custom GLSL shader** — the "neural flux" liquid-metal
  background with mouse-driven gravity well
- **Framer Motion** — spring physics for every DOM transition
- **TailwindCSS** — layout + tokens
- **JetBrains Mono / Inter / Noto Sans SC** — brutalist typographic stack

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Keyboard

- Press **`/`** anywhere to focus the pseudo terminal at the bottom.
- Try `show projects`, `show stack`, `show experience`, `show influence`,
  `show contact`, `whoami`, `help`, `clear`.

## Structure

```
app/
  layout.tsx          # fonts, metadata
  page.tsx            # composes boot sequence + all sections
  globals.css         # design system tokens & glitch effects
components/
  NeuralFlux.tsx      # R3F fullscreen shader plane
  BootSequence.tsx    # cold-boot terminal intro
  CursorBlock.tsx     # custom terminal-block cursor
  TopHUD.tsx          # persistent top navigation
  TerminalInput.tsx   # command line at the bottom
  SectionHeading.tsx  # brutalist section heads
  sections/
    Hero.tsx
    Stack.tsx
    Experience.tsx
    Projects.tsx      # EasyModel ML 4-node ring + hackathon
    Influence.tsx     # waveform + radar + events
    Manifesto.tsx     # contact API + manifesto
```

## Design principles

- Absolute black `#000000` substrate.
- Retina-green `#00FF41` primary, electromagnetic-purple `#7024FF` secondary.
- Never a friendly Bootstrap gradient. Every hover should feel mechanical,
  dampened, deliberate.
- Micro-glitch (`RGB split`) on headings hover.
- All data surfaces mimic a PCAP / terminal log / JSON payload.

## Production build

```bash
npm run build
npm start
```

The GLSL shader and the R3F canvas are dynamically imported with `ssr: false`
to keep LCP fast and avoid a server-rendered WebGL stub.
