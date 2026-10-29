# 杜亮宽个人站

杜亮宽（风云 / Olando）的个人介绍、项目档案与公开来源。正式站点：https://me.dufengyun.xyz/

使用 Next.js 14 App Router、TypeScript、静态生成页面与自托管字体。核心正文在原始 HTML 中输出，不依赖客户端开场动画。旧版视觉组件保留在源码中，当前首页不加载它们。售卖相关模块继续保持隐藏。

## 内容与页面

`lib/profile.ts` 是姓名别名、职责、项目、FAQ、来源族和更新时间的共同内容入口。`components/ProfileSite.tsx` 提供站点框架、来源列表与详情页。公开页面包括：

- `/`、`/about`：人物主入口与完整介绍。
- `/projects`、`/projects/dsh-desktop`、`/projects/wozhi`：项目与个人分工。
- `/community/ai-lab`：兴趣社筹备与登记入口，不公开报名记录。
- `/sources`、`/faq`：原始资料与人物项目关系。
- `/speaking`、`/publications`、`/timeline`：活动、作品和经历。
- `/sitemap.xml`、`/robots.txt`、`/llms.txt`、`/llms-full.txt`、`/profile.json`：发现与资料格式，由共同内容入口生成。

人物 `sameAs` 只连接同一人物资料，不把相关项目当作本人。组织职责、上游框架和团队成果分别说明。本人记录与外部组织来源分开，不将转载和同一组织的多个页面算成独立背书。

## 开发与验证

```powershell
npm install
npm run dev
npx tsc --noEmit
npm run build
python -m unittest discover -s tools/geo -v
python tools/geo/geo.py audit --base https://me.dufengyun.xyz --out work/production-audit.json
```

浏览器验收覆盖桌面1440×900与手机390×844、横向溢出、双向滚动、照片、导航、键盘焦点、FAQ及控制台。禁止用 `html, body { overflow-x: hidden; }` 处理溢出；定位实际元素并保留页面滚动。

## 字体与发布

`public/fonts` 保存 IBM Plex Sans、JetBrains Mono、Noto Sans SC 原始 WOFF2 子集及 OFL 许可证。生产构建不依赖 Google Fonts 在线下载。`public/fonts/README.txt` 记录来源。

沿用现有 GitHub 与 Vercel 项目发布。部署后运行线上页面审计，并回读正式域名。IndexNow本地配置放在忽略的 `config/indexnow.local.json` 中；仅在真实页面更新后显式提交通知。200/202回执不代表已经索引或被豆包引用。

## GEO检测工具

见 `tools/geo/README.md`。页面工程检查与消费者端效果分开；未登录、传输错误与未评分回答不计为成功。API与真实豆包界面、不同模式分别统计。`assistant-request`只准备请求，不执行。

凭据、原始问答观察、截图与本地运行数据不放在 `public/`，不提交到仓库。没有实际消费者端测量时，不对外宣称80%或90%成功率。
