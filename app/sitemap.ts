import type {MetadataRoute} from 'next';
import {allPages,SITE,UPDATED} from '@/lib/profile';
export default function sitemap():MetadataRoute.Sitemap{return [{url:SITE,lastModified:UPDATED},...allPages.map(p=>({url:SITE+p.path,lastModified:UPDATED}))];}
