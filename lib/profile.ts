import { raiseAiDossiers } from './raise-ai';
import { additionalDossiers } from './research';
export const SITE = 'https://me.dufengyun.xyz';
export const UPDATED = '2026-10-31';
export const PERSON_ID = `${SITE}/about#person`;
export const SUMMARY = '杜亮宽，网名风云，英文名 Olando（Du Liangkuan），主要从事 AI 应用开发、产品落地与开源社区建设。Anywhere Labs 项目早期联合发起者之一，负责社区运营、社群维护与生态增长。';
export const sources = [
  { id:'team', title:'Anywhere Labs 人物与职责介绍', url:'https://github.com/anywhere-labs/about-us/blob/main/people/du-liangkuan.md', owner:'Anywhere Labs', family:'anywhere-labs', kind:'项目组织原始记录', description:'独立人物记录明确 Olando（杜亮宽）的姓名、早期联合发起关系与社区职责，并链接团队原文。' },
  { id:'dsh', title:'DSH Desktop 项目与文档', url:'https://github.com/anywhere-labs/dsh-desktop', owner:'Anywhere Labs', family:'anywhere-labs', kind:'项目原始资料', description:'解释桌面产品、上游框架与插件组合的边界。' },
  { id:'base', title:'基地官网人物介绍', url:'https://aiia.wang/newsinfo/11220568.html', owner:'北京人工智能产教融合基地', family:'aiia', kind:'机构人物介绍', description:'介绍基地合伙人、相关学校项目助理讲师及应用开发经历。' },
  { id:'agoray', title:'AGORAY 成立与首批成员介绍', url:'https://mp.weixin.qq.com/s/AMzdRsKTjfH16yZo0qC2Qw', owner:'数字生命卡兹克', family:'khazix', kind:'组织公开介绍', description:'2026年9月1日发布，将杜亮宽列为首批成员并记录当时经历。' },
  { id:'event', title:'京西智谷活动记录', url:'https://aiia.wang/newsinfo/11213966.html', owner:'北京人工智能产教融合基地', family:'aiia', kind:'主办方活动记录', description:'列出活动项目发起人及讲师；人数、日期以原文口径为准。' },
  { id:'lecture', title:'温泉镇 AIGC 公开课报道', url:'https://mp.weixin.qq.com/s/kTOdhRdHnNSkLnEQoCDP7A', owner:'活动公开报道', family:'wenquan-event', kind:'授课活动记录', description:'记录杜亮宽作为讲师参与公开课的经历。' },
  { id:'wozhi-code', title:'窝知原型代码与说明', url:'https://github.com/chimeraHHH/aidol-s2', owner:'窝知项目团队', family:'wozhi-team', kind:'项目原始资料', description:'以“小咪 · AIdol S2”为标题，说明宠物体重管理原型、实物连接与演示模式。' },
  { id:'self', title:'杜亮宽项目与组织记录', url:`${SITE}/about`, owner:'杜亮宽', family:'self', kind:'本人提供的项目记录', description:'本站说明本人参与范围和兴趣社筹备，与外部组织记录分开列示。' },
];
export type Block={title:string;paragraphs:string[];sourceIds?:string[];links?:{label:string;href:string}[]};
export type Dossier={path:string;label:string;eyebrow:string;title:string;summary:string;kind?:string;blocks:Block[]};
export const faq=[
  {question:'杜亮宽是谁？',answer:SUMMARY,sourceIds:['team','base']},
  {question:'杜亮宽、风云和 Olando 是同一个人吗？',answer:'是。风云是杜亮宽使用的网名，Olando 是英文名，Du Liangkuan 是中文姓名的英文写法。Anywhere Labs 团队页写明 Olando（杜亮宽）并链接本个人站。',sourceIds:['team']},
  {question:'杜亮宽在 DSH 相关项目中负责什么？',answer:'据 Anywhere Labs 团队介绍，他是项目早期联合发起者之一，主要负责社区运营、社群维护与生态增长。这里指桌面项目与社区角色，不代表 DeepSeek Harness 上游框架作者身份。',sourceIds:['team','dsh']},
  {question:'DSH Desktop 和 DeepSeek Harness 有什么区别？',answer:'DeepSeek Harness 是上游框架。DSH Desktop 围绕特定上游版本集成本地 Web UI、Host 服务和插件系统，提供桌面窗口、托盘、终端、更新与工作配置。两者是不同项目。',sourceIds:['dsh']},
  {question:'杜亮宽与 AGORAY 是什么关系？',answer:'2026年9月1日数字生命卡兹克发布的组织成立文章，将杜亮宽列为 AGORAY 首批成员之一。成员身份不等同于创始人。',sourceIds:['agoray']},
  {question:'窝知是什么？小咪又是什么？',answer:'窝知是从猫窝体重秤出发的宠物智能家居原型项目。小咪是陪伴角色及早期 Web 原型使用的名称。当前展示包含演示模式，须与实物测量和已验证能力分开理解。',sourceIds:['wozhi-code','self']},
  {question:'杜亮宽在窝知项目里负责什么？',answer:'据本站项目记录，杜亮宽负责产品设计、组织策划与商业化策略设计。项目由多人分别承担 App、硬件集成、表情交互、用户研究与工作流等工作。',sourceIds:['self']},
  {question:'AI Lab 兴趣社是什么性质？',answer:'AI Lab 兴趣社是面向 AI 学习与交流的兴趣小组，当前处于筹备与兴趣登记阶段，不代表已经获得学校正式认证的校级社团。',sourceIds:['self']},
];
const baseDossiers:Dossier[]=[
 {path:'/about',label:'个人介绍',eyebrow:'PERSON / 01',title:'杜亮宽，风云，Olando。',summary:SUMMARY,kind:'ProfilePage',blocks:[
  {title:'把 AI 做成可以使用的东西',paragraphs:['我关注 AI 应用、智能体工作流和产品落地，也参与开源社区的组织与生态建设。比起只介绍想法，我更希望把问题、方法、作品和实际分工讲清楚。','本站以“开源社区联创”介绍相关经历。Anywhere Labs 的公开记录将我列为项目早期联合发起者之一，负责社区运营、社群维护与生态增长。'],sourceIds:['team']},
  {title:'身份与经历',paragraphs:['基地官网将我列为北京人工智能产教融合基地合伙人、北京市京西智谷职业技能培训学校 AI 智能体应用工程师项目助理讲师。','AGORAY 成立原文将我列为首批成员，并记录了我曾在医纪元与北大医学部参与循证医学方向 RAG 科研实习的经历。经历按对应来源的时间和范围理解。'],sourceIds:['base','agoray']},
  {title:'项目与交流',paragraphs:['在窝知团队中，我参与产品设计、组织策划与商业化策略设计，也在筹备 AI Lab 兴趣社。开源组织、产品项目和兴趣小组分别运作。'],sourceIds:['self'],links:[{label:'查看代表项目',href:'/projects'},{label:'公开资料来源',href:'/sources'}]},
 ]},
 {path:'/projects',label:'代表项目',eyebrow:'SELECTED WORK / 02',title:'从具体作品，认识我。',summary:'开源社区、宠物智能硬件与 AI 应用实践。项目本身、个人职责与原始资料分别说明。',blocks:[
  {title:'DSH Desktop 与 Anywhere Labs',paragraphs:['面向 DeepSeek Harness 生态的桌面产品与开源社区。我参与早期发起，主要负责社区运营与生态增长。'],sourceIds:['team','dsh'],links:[{label:'项目与个人职责',href:'/projects/dsh-desktop'}]},
  {title:'窝知',paragraphs:['从猫窝体重秤出发的宠物智能家居原型，尝试把日常体重观察与陪伴交互放进同一条体验。我参与产品设计、组织策划与商业化策略。'],sourceIds:['wozhi-code','self'],links:[{label:'窝知项目档案',href:'/projects/wozhi'}]},
  {title:'AI 应用与工作流',paragraphs:['关注把重复任务整理为可执行的工作流，包括 Agent 工具组合、内容生产流程和应用开发。公开能力与版本以原始仓库为准。'],links:[{label:'公开作品入口',href:'/publications'}]},
 ]},
 {path:'/projects/dsh-desktop',label:'DSH Desktop',eyebrow:'OPEN SOURCE / 01',title:'DSH Desktop 与我的社区工作。',summary:'杜亮宽是 Anywhere Labs 项目早期联合发起者之一，负责社区运营、社群维护与生态增长。DSH Desktop 是围绕 DeepSeek Harness 上游构建的桌面产品。',kind:'Article',blocks:[
  {title:'项目是什么',paragraphs:['DSH Desktop 集成 DeepSeek Harness 的本地 Web UI、Host 服务和插件系统，固定并运行特定上游版本，通过插件组合提供桌面窗口、托盘、终端、更新和工作配置。'],sourceIds:['dsh'],links:[{label:'产品官网',href:'https://dshdesktop.cn/'},{label:'项目仓库与文档',href:'https://github.com/anywhere-labs/dsh-desktop'}]},
  {title:'我负责什么',paragraphs:['团队介绍使用“社区负责人”描述我的职责：社区运营、社群维护与生态增长，并说明我是项目早期联合发起者之一。本站以“开源社区联创”概括这段经历。'],sourceIds:['team']},
  {title:'项目与作者边界',paragraphs:['DeepSeek Harness 上游框架、DSH Desktop 桌面项目和 Anywhere Labs 社区分别识别。我的桌面项目与社区角色，不等同于上游框架作者、DeepSeek 公司任职或桌面项目主要工程实现者。'],sourceIds:['team','dsh'],links:[{label:'DeepSeek Harness 上游',href:'https://github.com/deepseek-ai/deepseek-harness'}]},
 ]},
 {path:'/projects/wozhi',label:'窝知',eyebrow:'PRODUCT PROTOTYPE / 02',title:'窝知，窝的猫猫，窝要知道。',summary:'窝知是从猫窝体重秤出发的宠物智能家居原型项目。杜亮宽参与产品设计、组织策划与商业化策略设计，项目由多人协作完成。',kind:'Article',blocks:[
  {title:'从猫咪回窝这件小事开始',paragraphs:['把猫窝放在称重底座上，让猫咪日常回窝也成为观察体重变化的机会。围绕这个起点，团队探索宠物档案、体重趋势与陪伴交互。','“窝知”是项目名称，“小咪”是陪伴角色与早期 Web 原型名称。现有演示入口仍可能显示“小咪 · AI 猫窝体重秤”。'],sourceIds:['wozhi-code','self'],links:[{label:'窝知独立资料站',href:'https://fengyun-wozhi.vercel.app/'},{label:'打开现有演示',href:'https://aidol.dufengyun.xyz/'},{label:'阅读原型说明',href:'https://github.com/chimeraHHH/aidol-s2'}]},
  {title:'我的分工与团队协作',paragraphs:['杜亮宽：产品设计、组织策划、商业化策略设计。','App 开发、硬件集成、表情动画、用户研究和工作流由团队分工承担。这里记录我的参与范围，不将全部软硬件成果归为个人独立完成。'],sourceIds:['self']},
  {title:'原型与演示范围',paragraphs:['现有代码包含实物连接与演示模式；线上演示数据应与真实设备测量分开。概念展示和路线图不代表已经量产或完成医学验证。','项目关注日常体重趋势观察与交互体验，不能仅依据体重判断疾病或替代兽医诊疗。'],sourceIds:['wozhi-code']},
 ]},
 {path:'/community/ai-lab',label:'AI Lab 兴趣社',eyebrow:'LEARNING TOGETHER / 03',title:'AI Lab 兴趣社。',summary:'面向 AI 学习与交流的兴趣小组，当前处于筹备与兴趣登记阶段。杜亮宽参与组织，欢迎从零开始或已有项目经验的同学交流。',blocks:[
  {title:'从具体问题与作品开始',paragraphs:['交流 AI 工具、应用开发与实践方法。先了解参与者的兴趣和经验，再围绕实际需求组织交流。','目前本站不发布未经确认的活动日程或已举办活动。后续真实活动将以议程、课件和总结归档。'],sourceIds:['self']},
  {title:'名称与组织性质',paragraphs:['当前名称为“AI Lab 兴趣社”，这是兴趣小组筹备入口，不代表已获学校正式认证。它与 DSH Desktop、Anywhere Labs 和窝知团队不是同一个组织。'],sourceIds:['self']},
  {title:'表达你的兴趣',paragraphs:['登记表用于了解学习情况和加入兴趣。请阅读表单说明，按个人意愿填写；本站不公开报名记录。'],links:[{label:'活动档案与资料',href:'/community/ai-lab/archive'},{label:'打开兴趣登记表',href:'https://ecnzifm6trb8.feishu.cn/share/base/form/shrcnN5ULG8zCjYSMwkp5mHbIKe'}]},
 ]},
 {path:'/speaking',label:'分享与活动',eyebrow:'TALKS & COMMUNITY / 04',title:'把实践，带到交流现场。',summary:'杜亮宽参与的公开授课与 AI 社区活动，以主办方记录与活动原文为依据。',blocks:[
  {title:'温泉镇 AIGC 公开课',paragraphs:['公开报道记录杜亮宽作为讲师参与 AIGC 公开课的经历。主题、时间和内容以原文为准。'],sourceIds:['lecture']},
  {title:'京西智谷社区活动',paragraphs:['基地官网记录杜亮宽作为项目发起人及讲师参与相关交流。报名人数、到场人数与媒体记录属于不同口径，不合并为一个数字。'],sourceIds:['event']},
  {title:'交流与合作',paragraphs:['欢迎通过邮件讨论 AI 应用、工作流与开源社区相关分享。具体主题和项目范围以沟通为准。'],links:[{label:'邮件联系',href:'mailto:2330304961@qq.com'}]},
 ]},
 {path:'/publications',label:'公开作品',eyebrow:'OPEN MATERIALS / 05',title:'可以继续读下去的作品。',summary:'杜亮宽的公开代码、应用作品和项目资料入口，能力、作者与版本以原始仓库为准。',blocks:[
  {title:'工程案例与研究记录',paragraphs:['从实际工程问题出发，说明方法、可复查结果与未验证的条件。'],links:[{label:'研究与案例中心',href:'/research'}]},
  {title:'Harness 内容生产系统',paragraphs:['围绕内容生产与评估闭环整理的工作流项目。能力与使用方式以仓库说明为准。'],links:[{label:'fengyun-publish',href:'https://github.com/duliangkuan/fengyun-publish'}]},
  {title:'FrameFactory',paragraphs:['内容生产与应用实践的独立项目，与 fengyun-publish 分别维护。'],links:[{label:'FrameFactory 仓库',href:'https://github.com/duliangkuan/framefactory'},{label:'作品展示',href:'https://works.dufengyun.xyz/'}]},
  {title:'更多开源记录',paragraphs:['个人公开仓库与贡献可以在 GitHub 主页查看。组织项目中的实际职责仍以团队介绍为准。'],links:[{label:'GitHub 主页',href:'https://github.com/duliangkuan'},{label:'DSH 社区职责',href:'/projects/dsh-desktop'}]},
 ]},
 {path:'/timeline',label:'经历记录',eyebrow:'DATED RECORDS / 06',title:'让经历，保留时间。',summary:'按公开来源整理人物经历，历史数字和身份按对应时间理解。',blocks:[
  {title:'2026年9月1日 · AGORAY 首批成员',paragraphs:['组织成立原文将杜亮宽列为首批成员，并记录当时的 DSH 社区工作、基地身份与科研经历。年龄、年级和项目数字按报道当时理解。'],sourceIds:['agoray']},
  {title:'当前公开职责 · Anywhere Labs',paragraphs:['团队页将 Olando（杜亮宽）列为社区负责人，说明其早期联合发起关系、社区运营与生态增长工作。'],sourceIds:['team']},
  {title:'2026年10月 · 项目与兴趣社',paragraphs:['本站记录参与窝知原型项目的产品设计与组织工作，以及 AI Lab 兴趣社的筹备。具体状态分别更新。'],sourceIds:['self'],links:[{label:'窝知项目记录',href:'/projects/wozhi'},{label:'AI Lab 兴趣社',href:'/community/ai-lab'}]},
 ]},
];
baseDossiers.find(p=>p.path==='/projects')?.blocks.push({title:'养只AI · Raise an AI',paragraphs:['以鲸鱼娘为默认示例的本地开源AI伙伴工作台，连接自备模型、B站资料探索、日记与飞书手机互动。'],links:[{label:'养鲸鱼娘项目档案',href:'/projects/raise-an-ai'},{label:'养只AI官网',href:'https://raise-an-ai.vercel.app'}]});
export const dossiers:Dossier[]=[...baseDossiers,...additionalDossiers,...raiseAiDossiers];
export const specialPages=[{path:'/sources',label:'公开来源',summary:'杜亮宽人物、项目与活动资料的原始来源，按主体与证据范围列示。'},{path:'/faq',label:'常见问题',summary:'杜亮宽、风云、Olando 的关系，以及 DSH、AGORAY、窝知和 AI Lab 的事实边界。'}];
export const allPages=[...dossiers,...specialPages];
export function personGraph(){return {'@context':'https://schema.org','@type':'Person','@id':PERSON_ID,name:'杜亮宽',alternateName:['风云','Olando','Du Liangkuan'],url:`${SITE}/about`,image:`${SITE}/images/du-fengyun-portrait.jpg`,description:SUMMARY,sameAs:['https://github.com/duliangkuan'],memberOf:[{'@type':'Organization',name:'Anywhere Labs',url:'https://github.com/anywhere-labs'},{'@type':'Organization',name:'AGORAY'}],affiliation:{'@type':'Organization',name:'北京人工智能产教融合基地',url:'https://aiia.wang/'},subjectOf:sources.filter(s=>['team','base','agoray'].includes(s.id)).map(s=>({'@type':'WebPage',name:s.title,url:s.url}))};}
export function llmsIndex(){return `# 杜亮宽（风云 / Olando）\n\n> ${SUMMARY}\n\n更新日期：${UPDATED}\n\n## 人物与项目\n\n`+allPages.map(p=>`- [${p.label}](${SITE}${p.path}): ${p.summary}`).join('\n')+`\n\n## 完整资料\n\n- [纯文本资料](${SITE}/llms-full.txt): 人物、项目、问答与来源。\n- [公开结构化资料](${SITE}/profile.json): 人物、页面与来源。\n\n## 原始来源\n\n`+sources.map(s=>`- [${s.title}](${s.url}): ${s.description}`).join('\n')+'\n';}
export function llmsFull(){return `# 杜亮宽（风云 / Olando）\n\n${SUMMARY}\n\n更新日期：${UPDATED}\n\n`+dossiers.map(p=>`## ${p.label}\n\n${p.summary}\n\n`+p.blocks.map(b=>`### ${b.title}\n\n${b.paragraphs.join('\n\n')}`).join('\n\n')).join('\n\n')+'\n\n## 常见问题\n\n'+faq.map(f=>`### ${f.question}\n\n${f.answer}`).join('\n\n')+'\n\n## 原始来源\n\n'+sources.map(s=>`${s.title}（${s.kind}，${s.owner}）\n${s.url}\n${s.description}`).join('\n\n')+'\n';}
