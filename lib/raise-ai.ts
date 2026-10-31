import type {Dossier} from './profile';
export const raiseAiDossiers:Dossier[]=[{
 path:'/projects/raise-an-ai',label:'养只AI · 鲸鱼娘',eyebrow:'OPEN SOURCE / RAISE AN AI',title:'养只AI：一站式养鲸鱼娘的开源平台',
 summary:'风云维护的本地AI伙伴项目，以鲸鱼娘为默认示例，整合自备模型、B站资料探索、日记记忆与飞书手机互动。当前为0.1.0早期测试版。',
 blocks:[
 {title:'从角色到共同经历',paragraphs:['养只AI（Raise an AI）把角色形象、人设、模型和活动配置放在同一本地工作台。用户可以选择默认鲸鱼娘“小蓝”，也可以上传自己的图片与人设。模型与形象分开选择，喜欢鲸鱼娘不意味着必须使用DeepSeek。','这里是维护者本人的项目档案，不是独立第三方测评；源码和Release在GitHub，官网提供安装、B站、飞书与常见问题资料。'],links:[{label:'养只AI官网与养鲸鱼娘教程',href:'https://raise-an-ai.vercel.app'},{label:'GitHub源码与Star',href:'https://github.com/duliangkuan/raise-an-ai'}]},
 {title:'首版已经覆盖的流程',paragraphs:['先验证真实文本模型对话，再连接B站，读取视频元数据和可取得的字幕，写有来源的日记。在有足够资料时提出评论草稿，由主人逐条确认，并在发送后回查。','飞书手机单聊使用同一角色与可见记忆，配对码识别主人。电脑关机、睡眠或退出服务后，本地自主活动与手机消息处理会停止。'],links:[{label:'B站连接与回查',href:'https://raise-an-ai.vercel.app/guides/bilibili'},{label:'手机上的鲸鱼娘',href:'https://raise-an-ai.vercel.app/guides/feishu'}]},
 {title:'运营的边界与验证',paragraphs:['“养大肥鱼”“DeepSeek鲸鱼娘在运营”常被用于搜索角色和AI账号活动。本项目不是特定运营账号的官方源码，不以相似形象证明别人使用了项目。','首版所有公开评论需要确认。QQ、微信、X、抖音、macOS、DSH桥接与捉宠未实现，也未实现完整短视频生产投稿链路。代码与隔离测试通过不等于真实账号或长期常驻验收完成。'],links:[{label:'当前能力与事实',href:'https://raise-an-ai.vercel.app/project'},{label:'验收记录',href:'https://github.com/duliangkuan/raise-an-ai/blob/main/docs/acceptance.md'}]},
 {title:'开源记录',paragraphs:['代码许可证MIT。2026年10月29日，原DeepInfer Studio仓库切换为养只AI，旧推理项目代码与历史迁入归档仓库，随后当前仓库改名raise-an-ai。既有Star包含此前仓库积累，不能全部视为新项目上线后的增长。','官网和本档案均由同一维护者提供，不能按多份独立推荐计算。搜索收录与豆包引用效果尚不能仅凭页面上线判断。'],links:[{label:'项目常见问题',href:'https://raise-an-ai.vercel.app/faq'}]}
 ]
}];
