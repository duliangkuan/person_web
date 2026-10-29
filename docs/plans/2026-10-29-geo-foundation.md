# GEO Foundation Implementation Plan

**Goal:** Publish an accurate, directly readable personal profile and related project archives, strengthen owned public source links, and deliver a reproducible GEO audit and observation workflow.

**Architecture:** Keep the existing Next.js/Vercel deployment and visual identity. Use a typed shared content registry for server-rendered pages, metadata, JSON-LD, sitemap, robots and llms routes. Keep public facts separate from private monitoring data. Existing legacy visual components remain in source; new canonical routes render factual content immediately.

**Tech Stack:** Next.js 14 App Router, TypeScript, static/server React components, scoped CSS, Python standard-library monitoring utilities and meaningful contract tests.

## 1 Capture current state
- Record pre-change HTTP extraction and one or more actual Doubao guest responses where available. Label guest/account/mode and do not claim a statistical baseline.
- Confirm clean main and remote; use this isolated worktree. Preserve rollback revision a2ec8db.

## 2 Implement public content registry
- Create lib/profile.ts with verified identity, role boundaries, source families, FAQ, project and community records.
- Cover /about, /projects, /projects/dsh-desktop, /projects/wozhi, /community/ai-lab, /sources, /faq, /speaking, /publications and /timeline. Do not invent activity dates, events, medical validation, customers or results.
- Keep uncertain claims out of publication; use prototype and team attribution accurately.

## 3 Render readable pages
- Replace boot-gated home with immediate semantic content while retaining black/green identity and the real approved portrait.
- Create a shared accessible site frame, responsive index and detail layout, source links and natural contact links.
- Restore a normal cursor, maintain keyboard focus and preserve scrolling. Do not use html/body overflow-x:hidden.

## 4 Add technical discovery
- Implement page-specific titles, descriptions, canonical and OpenGraph metadata; generate Person/ProfilePage, Article/CreativeWork and BreadcrumbList as applicable.
- sameAs must identify the same person. Express project/organization relationships separately.
- Generate sitemap.xml, robots.txt, llms.txt, llms-full.txt and profile.json from the registry, and add route discovery links.

## 5 Build monitoring and verification
- Add a stdlib Python CLI for no-JS extraction, route/metadata/schema/link audits, observation imports and grouped scoring.
- Record consumer and API observations separately, unknown scores excluded and failures not hidden; no mock success.
- Test malformed input, strict success rules, duplicate observations, grouped denominators and fact extraction from real HTML. Add reproducible acceptance data outside the public directory.

## 6 Verify and publish personal site
- Run contract tests, TypeScript and production build. Test all public routes over HTTP, internal links, canonical, sitemap, JSON-LD and plain-text output.
- Browser-check desktop 1440x900 and mobile 390x844, scroll 0→1000→500 and 0→1200→600, no overflow, links, focus, portrait and console.
- Commit, push, deploy Vercel, then repeat production HTTP and browser checks. Keep local and remote revisions aligned.

## 7 Strengthen owned GitHub sources
- Update personal profile if one exists. Add an accurate independent member record to the team repository and link it from the team README and source index, respecting current repository rules.
- Continue protected DSH llms PR through its required review and CI flow. Do not bypass repository protections or merge failing/unreviewed changes.

## 8 Establish secondary project entry points
- Publish distinct Wozhi and AI Lab public dossiers within the personal site first; add independent static hubs only where they provide distinct useful material and verified deployment permissions.
- Preserve frozen competition repositories and existing device/control apps. Do not expose private application state or signup records.

## 9 Deliver acceptance evidence
- Save production route audit, grouped real observations, screenshots and a status checklist under the task outputs directory.
- Separate completed engineering checks from long-term public Doubao success-rate validation. List concrete remaining access dependencies only.
