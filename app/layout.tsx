import type {Metadata,Viewport} from 'next';
import {JsonLd,SiteFrame} from '@/components/ProfileSite';
import {personGraph,SITE,SUMMARY} from '@/lib/profile';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(SITE),title:'杜亮宽（风云 / Olando）｜AI Builder · 开源社区联创',description:SUMMARY,authors:[{name:'杜亮宽',url:`${SITE}/about`}],robots:{index:true,follow:true},openGraph:{type:'website',locale:'zh_CN',siteName:'杜亮宽的个人站',title:'杜亮宽（风云 / Olando）',description:SUMMARY,url:SITE,images:[{url:'/images/du-fengyun-portrait.jpg',width:1279,height:1288,alt:'杜亮宽本人肖像'}]},twitter:{card:'summary',title:'杜亮宽（风云 / Olando）',description:SUMMARY}};
export const viewport:Viewport={themeColor:'#0b100e',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><head><link rel="stylesheet" href="/fonts/profile-fonts.css"/><link rel="describedby" href="/llms.txt" type="text/plain"/></head><body><JsonLd data={personGraph()}/><SiteFrame>{children}</SiteFrame></body></html>;}
