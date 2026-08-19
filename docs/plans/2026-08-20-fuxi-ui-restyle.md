# Fuxi UI Personal Site Restyle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use the local probability-review visual system in `D:\Dev\fuxi-template` and `D:\Dev\gailv-fuxi` as the source of truth.

**Goal:** Restyle the complete personal site into the probability-review / Claude-like warm paper UI while preserving all published content, links, product details, and responsive behavior.

**Architecture:** Keep the current Next.js section components and content model, but replace the global visual system and the most identity-heavy shell components. Remove the boot/terminal-only presentation layer, introduce a warm editorial notebook shell, and remap existing cards to a consistent paper-card system.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, Framer Motion, CSS variables.

---

### Task 1: Establish reversible preview branch

**Files:**
- Worktree: `D:\Dev\person_web-fuxi-ui-preview`
- Branch: `preview/fuxi-ui`

**Steps:**
1. Confirm branch and clean worktree.
2. Record `f77d46f` as the production rollback point.

### Task 2: Replace global design tokens and page atmosphere

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Steps:**
1. Map the gold-standard palette: orange `#D97757`, ink `#1F2430`, soft `#5B6472`, line `#E6E3DD`, background `#FAF8F5`, card `#FFFFFF`.
2. Replace terminal glow, scanline and glass treatments with paper texture, editorial borders, restrained shadows and annotated accents.
3. Restore native cursor and accessible focus states.
4. Set the light theme browser color and use a readable Chinese editorial font stack.

### Task 3: Replace the terminal shell with a notebook navigation shell

**Files:**
- Modify: `app/page.tsx`
- Rewrite: `components/TopHUD.tsx`
- Rewrite: `components/SectionHeading.tsx`

**Steps:**
1. Remove boot gating, neural animation, CRT overlays, custom cursor and fixed terminal input from the rendered page.
2. Build a sticky paper navigation with clear Chinese section names and direct social actions.
3. Convert section headings to numbered course-note dividers with orange marker accents.

### Task 4: Recompose the hero for a human-first personal brand

**Files:**
- Rewrite: `components/sections/Hero.tsx`

**Steps:**
1. Lead with “风云” and keep “杜亮宽” as the formal identity.
2. Present current roles in plain Chinese, supported by a compact credentials card.
3. Add direct actions for projects, learning club, GitHub and Xiaohongshu.
4. Preserve the existing factual identity claims without adding new claims.

### Task 5: Restyle all existing content sections

**Files:**
- Modify: `components/sections/LearningClub.tsx`
- Modify: `components/sections/Stack.tsx`
- Modify: `components/sections/Experience.tsx`
- Modify: `components/sections/Projects.tsx`
- Modify: `components/sections/Influence.tsx`
- Modify: `components/sections/Manifesto.tsx`

**Steps:**
1. Preserve all copy, links, QR images and product boundaries.
2. Convert dark terminal panels into white paper cards, note blocks, comparison tables and colored category tags.
3. Reduce excessive uppercase microcopy and improve Chinese scanning order.
4. Ensure all cards stack cleanly at 390px.

### Task 6: Verify and publish a non-production preview

**Files:**
- Test the complete worktree.

**Steps:**
1. Run `npx tsc --noEmit`.
2. Run `npm run build`.
3. Run locally and inspect 1440x900 and 390x844.
4. Verify vertical scroll 0→1000→500 and 0→1200→600, plus `scrollWidth <= innerWidth`.
5. Check console errors and all primary links.
6. Commit the preview branch.
7. Create a Vercel preview deployment only; do not update the production alias.
