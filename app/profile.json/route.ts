import {personGraph,sources,allPages,SITE,UPDATED} from '@/lib/profile';
export const dynamic='force-static';
export function GET(){return Response.json({updated:UPDATED,person:personGraph(),pages:allPages.map(p=>({url:SITE+p.path,title:p.label,description:p.summary})),sources});}
