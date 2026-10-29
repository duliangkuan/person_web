import Link from 'next/link';
import { allPages, SITE } from '@/lib/profile';
import { JsonLd } from '@/components/ProfileSite';

export default function Breadcrumbs({ path, label }: { path: string; label: string }) {
  const parts = path.slice(1).split('/');
  const items = [{ path: '/', label: '首页' }];
  for (let i = 1; i <= parts.length; i++) {
    const current = '/' + parts.slice(0, i).join('/');
    const known = allPages.find(p => p.path === current);
    if (known) items.push({ path: current, label: i === parts.length ? label : known.label });
  }
  return <><JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.label, item: SITE + (item.path === '/' ? '' : item.path) })) }} /><nav className="breadcrumbs" aria-label="当前位置"><ol>{items.map((item, i) => <li key={item.path}>{i < items.length - 1 ? <Link href={item.path}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav></>;
}
