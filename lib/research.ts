import type { Dossier } from './profile';

export const readableHtmlEvidence = {
  title: '个人站原始HTML可读取改造',
  date: '2026-10-29',
  maintainedBy: '杜亮宽',
  assistance: 'Codex 协助实施与记录',
  scope: '网页工程验证，不是豆包检索或引用效果实验',
  before: { revision: 'a2ec8db', readableBodyCharacters: 28, state: '原始HTML正文仅启动提示，人物介绍等待客户端加载' },
  after: { revision: '3dc0def', readableBodyCharacters: 1514, htmlPagesChecked: 11, discoveryResourcesChecked: 5, selfHostedFontAssetsChecked: 113 },
  method: '普通HTTP请求，解析body，排除script/style，合并空白后计数字符；包含导航与页脚，非净正文长度。',
  consumerDoubaoSuccessRate: null,
  limitations: ['两个数值来自指定版本快照，不表示后续页面永远保持相同长度。', '页面可读取不代表已被搜索引擎收录或模型采用。', '本记录由实施方整理，不是独立第三方评测。'],
  source: 'https://github.com/duliangkuan/person_web/tree/main/tools/geo',
};

export const additionalDossiers: Dossier[] = [
  { path: '/research', label: '研究与案例', eyebrow: 'BUILD NOTES / 07', title: '让方法，也可以被检查。', summary: '杜亮宽的工程案例与实践记录，从任务、实现、证据和局限四个方面展开。', blocks: [
    { title: '个人站正文可读取改造', paragraphs: ['一个网页在浏览器中能打开，不代表普通请求能读到人物介绍。这次案例记录从启动门控到静态人物档案的改造，以及具体采用的验证方式。', '案例由本人整理，Codex 协助实施与记录；它证明工程读取条件的变化，不报告尚未完成的豆包检索成功率。'], links: [{ label: '阅读完整工程案例', href: '/research/readable-html' }] },
    { title: '项目的资料与边界', paragraphs: ['项目说明与实测结论分开记录：窝知的原型、数据与团队范围在独立资料站继续展开；DSH 相关职责由组织原始资料支持。'], links: [{ label: '窝知项目资料站', href: 'https://fengyun-wozhi.vercel.app/' }, { label: 'DSH 项目职责', href: '/projects/dsh-desktop' }] },
    { title: '后续记录原则', paragraphs: ['新案例需要明确任务、环境、操作方法、可核查结果和未覆盖的条件。没有完成的实测保留为待验证，不用演示结果替代实际结果。'] },
  ] },
  { path: '/research/readable-html', label: '正文可读取工程案例', eyebrow: 'ENGINEERING CASE / 01', title: '从启动提示，到可直接读取的人物档案。', summary: '2026年10月29日，杜亮宽个人站完成原始HTML正文改造。本文记录指定版本下的读取结果、方法与局限，非搜索排名或模型引用效果报告。', kind: 'Article', blocks: [
    { title: '问题：页面能开，资料却未直接输出', paragraphs: ['改造前的首页以客户端状态决定是否显示人物介绍。普通HTTP请求获取的body中仅有启动提示，姓名和部分描述虽在metadata中，完整人物资料却没有直接出现在正文。', '这使不执行脚本的读取方式无法拿到与浏览器完整渲染后相同的信息。我们没有据此断言某一个搜索引擎一定无法渲染。'] },
    { title: '改造：把事实与展示解耦', paragraphs: ['使用共同资料源维护姓名别名、项目职责、FAQ和来源，页面在构建时生成可读HTML。metadata、纯文本资料和结构化数据引用同一份内容。', '保留人物视觉风格与真实照片，移除正文等待启动状态的依赖。字体改为自托管，避免云端构建依赖在线字体下载。'] },
    { title: '指定版本的观察结果', paragraphs: ['a2ec8db版本的原始HTML可读文字约28字符；3dc0def版本为1514字符。计数包含导航与页脚，方法为解析body、排除script和style、合并空白后计数字符，并非净正文长度或内容质量评分。', '该轮线上检查覆盖11个正文页面、5个资料端点和113个字体资源。页面、规范链接、结构化数据、内链及双端滚动检查通过。后续内容新增后，长度和页面数量会变化。'], links: [{ label: '读取结构化案例记录', href: '/research-evidence.json' }] },
    { title: '如何复查', paragraphs: ['以普通HTTP客户端请求页面，对比原始HTML和脚本渲染后的页面，检查姓名、职责与来源是否已经存在。项目仓库提供标准库实现的页面检查工具，可复查H1、metadata、canonical、JSON-LD和内链。', '本记录由实施方整理，Codex协助实施与记录，不作为独立第三方实验。'], links: [{ label: '检查工具源码', href: 'https://github.com/duliangkuan/person_web/tree/main/tools/geo' }, { label: '当前人物页面', href: '/about' }] },
    { title: '哪些结论还不能得出', paragraphs: ['工程检查通过，表示页面具备更清楚的读取条件。它不等于已经被豆包收录、引用，更不等于人物检索成功率达到90%。', '消费者端实测需要在不预先提供背景和链接的条件下，跨日期、账号与问题分组采样。该项按当前安排留待后续进行，本文不填入模拟结果。'] },
  ] },
  { path: '/community/ai-lab/archive', label: 'AI Lab 活动档案', eyebrow: 'COMMUNITY RECORDS / 08', title: 'AI Lab 活动档案。', summary: 'AI Lab 兴趣社的活动资料入口。当前处于筹备与兴趣登记阶段，尚无已核实的活动档案在此发布。', blocks: [
    { title: '当前状态', paragraphs: ['兴趣社先了解参与者的经验与需求。这里保留真实活动的档案结构，不将计划中的交流主题写成已经举办的活动。'], links: [{ label: '了解兴趣社与登记入口', href: '/community/ai-lab' }] },
    { title: '一场活动会留下什么', paragraphs: ['活动实际举行后，按真实名称与时间记录组织者、议程、分享材料、可公开的演示、讨论结论与后续问题。资料发布尊重讲者与参与者的公开意愿。', '活动人数、合作方与学校关联均以可核验记录为准。报名记录和个人联系方式不在公开档案中展示。'] },
    { title: '活动结束后继续使用', paragraphs: ['课件与复现方法便于未到场的人继续学习；活动总结记录已解决的问题与尚未验证的结论。对后续更新保留时间说明，不用新的结论覆盖历史记录。'] },
  ] },
];
