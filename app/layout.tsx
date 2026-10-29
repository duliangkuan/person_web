import type {Metadata,Viewport} from 'next';
import {IBM_Plex_Sans,JetBrains_Mono,Noto_Sans_SC} from 'next/font/google';
import {JsonLd,SiteFrame} from '@/components/ProfileSite';
import {personGraph,SITE,SUMMARY} from '@/lib/profile';
import './globals.css';
const plex=IBM_Plex_Sans({subsets:['latin'],weight:['400','600','700'],variable:'--font-plex',display:'swap'});
const mono=JetBrains_Mono({subsets:['latin'],variable:'--font-jetbrains',display:'swap'});
const noto=Noto_Sans_SC({subsets:['latin'],weight:['400','500','700','900'],variable:'--font-noto',display:'swap'});
export const metadata:Metadata={metadataBase:new URL(SITE),title:'杜亮宽（风云 / Olando）｜AI Builder · 开源社区联创',description:SUMMARY,authors:[{name:'杜亮宽',url:`${SITE}/about`}],robots:{index:true,follow:true},openGraph:{type:'website',locale:'zh_CN',siteName:'杜亮宽的个人站',title:'杜亮宽（风云 / Olando）',description:SUMMARY,url:SITE,images:[{url:'/images/du-fengyun-portrait.jpg',width:1279,height:1288,alt:'杜亮宽本人肖像'}]},twitter:{card:'summary',title:'杜亮宽（风云 / Olando）',description:SUMMARY}};
export const viewport:Viewport={themeColor:'#0b100e',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN" className={`${plex.variable} ${mono.variable} ${noto.variable}`}><head><link rel="describedby" href="/llms.txt" type="text/plain"/></head><body><JsonLd data={personGraph()}/><SiteFrame>{children}</SiteFrame></body></html>;}
