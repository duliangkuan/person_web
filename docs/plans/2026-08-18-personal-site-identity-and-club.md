# Personal Site Identity & AI Learning Club Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 更新 me.dufengyun.xyz 的最新身份、deepseek-harness-desktop 联创经历和风云AI学习社会员服务。

**Architecture:** 保持现有 Next.js 单页“私人意识终端”架构，在 Hero 后新增编号 01 的 Learning Club 模块；同步更新导航、终端命令、身份节点、项目卡和 SEO。加入动作只跳转现有联系区，不增加支付或会员后台。

**Tech Stack:** Next.js 14、React 18、TypeScript、Tailwind CSS、Framer Motion、Vercel。

---

### Task 1: 建立新信息架构

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/TopHUD.tsx`
- Modify: `components/TerminalInput.tsx`
- Create: `components/sections/LearningClub.tsx`

**Steps:**
1. 在 Hero 与 Stack 之间增加 `learning` 区块。
2. 导航增加 `01 · learning`。
3. 终端增加 `show learning`、`show club` 命令。
4. 实现会员价格、两套系统、两个社群、答疑和嘉宾分享信息。
5. “联系加入”只滚动到联系区。

### Task 2: 更新最高权重身份

**Files:**
- Modify: `components/sections/Hero.tsx`
- Modify: `components/RoleMatrix.tsx`
- Modify: `components/sections/Manifesto.tsx`

**Steps:**
1. Hero 当前任务改为 deepseek-harness-desktop 与风云AI学习社。
2. RoleMatrix 加入 Co-founder & COO、学习社发起人、数字生命卡兹克 AGORAY 成员。
3. 联系信息 Role 更新为 AI Builder / Co-founder & COO / 社群发起人。

### Task 3: 增加 deepseek-harness-desktop 项目卡

**Files:**
- Modify: `components/sections/Projects.tsx`

**Steps:**
1. 增加全宽高权重项目卡。
2. 展示 13K+ Stars、603 Forks、MIT、TypeScript。
3. 明确三位联合创始人之一、Co-founder & COO。
4. 链接官方 GitHub 仓库。

### Task 4: 更新身份节点和 SEO

**Files:**
- Modify: `components/sections/Influence.tsx`
- Modify: `app/layout.tsx`

**Steps:**
1. 新增学习社发起人、数字生命卡兹克 AGORAY 成员、项目联创兼 COO。
2. 保留 AI 智能体应用工程师（高级）认证。
3. 更新 title、description 和 keywords。

### Task 5: 响应式与生产验收

**Files:**
- Modify as needed: `app/globals.css`

**Steps:**
1. 运行 lint 和 production build。
2. 本地启动生产构建。
3. 检查桌面端和手机端截图。
4. 核对链接、导航、终端命令和内容。
5. 提交、推送 GitHub，部署 Vercel，并验证 me.dufengyun.xyz。
