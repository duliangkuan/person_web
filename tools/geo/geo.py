"""Public-page audit and private GEO observation analysis. Python stdlib only."""
import argparse
import collections
import concurrent.futures
import datetime as dt
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

SITE = 'https://me.dufengyun.xyz'
ROUTES = ['/', '/about', '/projects', '/projects/dsh-desktop', '/projects/wozhi', '/community/ai-lab', '/sources', '/faq', '/speaking', '/publications', '/timeline', '/research', '/research/readable-html', '/community/ai-lab/archive']

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.body = False
        self.ignored = 0
        self.parts = []
        self.title = ''
        self.in_title = False
        self.h1 = 0
        self.meta = {}
        self.links = []
        self.canonical = None
        self.ids = set()
        self.json_blocks = []
        self.json_capture = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'body': self.body = True
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'meta': self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag in ('script', 'style'):
            self.ignored += 1
            if tag == 'script' and a.get('type') == 'application/ld+json': self.json_capture = []

    def handle_endtag(self, tag):
        if tag == 'body': self.body = False
        if tag == 'title': self.in_title = False
        if tag in ('script', 'style'):
            if tag == 'script' and self.json_capture is not None:
                self.json_blocks.append(''.join(self.json_capture))
                self.json_capture = None
            self.ignored = max(0, self.ignored - 1)

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.json_capture is not None: self.json_capture.append(data)
        if self.body and not self.ignored: self.parts.append(data)

    @property
    def text(self): return re.sub(r'\s+', ' ', ' '.join(self.parts)).strip()

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'FengyunGEOAudit/1.0 (public-page verification)', 'Accept': '*/*'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return {'url':url, 'status':r.status, 'final_url':r.url, 'content_type':r.headers.get('Content-Type', ''), 'headers':dict(r.headers), 'body':r.read().decode('utf-8')}
    except (urllib.error.URLError, UnicodeError) as e:
        return {'url':url, 'status':getattr(e, 'code', None), 'error':str(e), 'body':''}

def inspect_html(body, path, canonical_origin=SITE):
    p = Page(); p.feed(body)
    errors = []
    if p.h1 != 1: errors.append(f'Expected one h1; found {p.h1}')
    if '杜亮宽' not in p.text: errors.append('Name missing from no-JavaScript body')
    if len(p.text) < 150: errors.append('Insufficient readable body')
    if not p.meta.get('description'): errors.append('Missing description')
    if '杜亮宽' not in p.title: errors.append('Name missing from title')
    expected = canonical_origin.rstrip('/') + ('' if path == '/' else path)
    if (p.canonical or '').rstrip('/') != expected: errors.append(f'Unexpected canonical: {p.canonical}')
    if 'noindex' in p.meta.get('robots', '').lower(): errors.append('Unexpected noindex')
    if 'COO' in p.text or 'COO' in p.title or 'COO' in p.meta.get('description', ''): errors.append('Legacy COO copy remains')
    graphs = []
    for raw in p.json_blocks:
        try: graphs.append(json.loads(raw))
        except ValueError: errors.append('Invalid JSON-LD')
    persons = [g for g in graphs if g.get('@type') == 'Person']
    if path != '/':
        crumbs = [g for g in graphs if g.get('@type') == 'BreadcrumbList']
        if not crumbs or not crumbs[0].get('itemListElement'):
            errors.append('Missing breadcrumb chain')
        elif crumbs[0]['itemListElement'][-1].get('item', '').rstrip('/') != expected:
            errors.append('Breadcrumb does not identify this page')
    if not persons or persons[0].get('name') != '杜亮宽': errors.append('Missing canonical Person')
    elif any('dsh-desktop' in u or 'aiia.wang' in u for u in persons[0].get('sameAs', [])):
        errors.append('Related project misused as person sameAs')
    if path == '/about' and not any(g.get('@type') == 'ProfilePage' for g in graphs): errors.append('Missing ProfilePage')
    if path == '/faq':
        fs = [g for g in graphs if g.get('@type') == 'FAQPage']
        if not fs: errors.append('Missing FAQPage')
        else:
            for q in fs[0].get('mainEntity', []):
                if q.get('name', '') not in p.text or q.get('acceptedAnswer', {}).get('text', '') not in p.text:
                    errors.append('FAQ schema does not match visible copy')
    return {'path':path, 'title':p.title, 'body_characters':len(p.text), 'h1':p.h1, 'canonical':p.canonical, 'schema_types':[g.get('@type') for g in graphs], 'errors':errors, 'internal_links':[u for u in p.links if u.startswith('/')], 'ids':sorted(p.ids)}

def audit(base):
    base = base.rstrip('/')
    wanted = ROUTES + ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/profile.json', '/research-evidence.json']
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        fetched = list(pool.map(lambda p:fetch(base+p), wanted))
    by_path = dict(zip(wanted, fetched))
    results = []
    for path in ROUTES:
        r = by_path[path]
        item = inspect_html(r['body'], path)
        item['status'] = r['status']
        if r['status'] != 200: item['errors'].append(f'HTTP {r["status"]}: {r.get("error", "")}')
        if 'noindex' in r.get('headers', {}).get('X-Robots-Tag', '').lower(): item['errors'].append('X-Robots-Tag noindex')
        results.append(item)
    page_by_path = {r['path']:r for r in results}
    for item in results:
        for href in item['internal_links']:
            u = urllib.parse.urlsplit(href)
            target = u.path or item['path']
            if target not in wanted:
                item['errors'].append('Unverified internal route: '+href)
            elif u.fragment and target in page_by_path and u.fragment not in page_by_path[target]['ids']:
                item['errors'].append('Missing anchor: '+href)
    resources = []
    for path in wanted[len(ROUTES):]:
        r = by_path[path]; errors = []
        if r['status'] != 200: errors.append(f'HTTP {r["status"]}')
        if path in ('/llms.txt','/llms-full.txt') and ('杜亮宽' not in r['body'] or 'text/plain' not in r.get('content_type','')):
            errors.append('Expected UTF-8 plain-text profile')
        if path == '/robots.txt' and ('Allow: /' not in r['body'] or SITE+'/sitemap.xml' not in r['body']): errors.append('robots discovery contract missing')
        if path == '/sitemap.xml':
            try:
                root=ET.fromstring(r['body']); urls=[e.text.rstrip('/') for e in root.findall('.//{*}loc')]
                if set(urls) != {SITE+(p if p!='/' else '') for p in ROUTES}: errors.append('Sitemap route coverage mismatch')
            except ET.ParseError: errors.append('Malformed sitemap')
        if path == '/profile.json':
            try:
                data=json.loads(r['body'])
                if data['person']['name']!='杜亮宽' or len(data['pages'])!=len(ROUTES)-1: errors.append('Profile data contract mismatch')
            except (ValueError,KeyError): errors.append('Invalid public profile JSON')
        resources.append({'path':path,'status':r['status'],'content_type':r.get('content_type'),'errors':errors})
    return {'captured_at':dt.datetime.now(dt.timezone.utc).isoformat(),'base_url':base,'scope':'Public page engineering checks only; not Doubao discovery or ranking','passed':all(not r['errors'] for r in results+resources),'pages':results,'resources':resources}

def summarize(observations):
    ids=set(); groups=collections.defaultdict(list)
    for o in observations:
        for key in ('id','surface','mode','group','prompt','captured_at','transport_status'):
            if not isinstance(o.get(key),str) or not o[key].strip(): raise ValueError('Missing or invalid '+key)
        if o['id'] in ids: raise ValueError('Duplicate observation id: '+o['id'])
        ids.add(o['id'])
        if o['transport_status'] not in ('complete','blocked','error'): raise ValueError('Invalid transport status')
        review=o.get('review')
        if review is not None:
            required=('identity_correct','core_facts_sufficient','major_error')
            if any(type(review.get(k)) is not bool for k in required): raise ValueError('Review requires explicit boolean judgments')
        groups[(o['surface'],o['mode'],o['group'])].append(o)
    result=[]
    for (surface,mode,group),rows in sorted(groups.items()):
        complete=[o for o in rows if o['transport_status']=='complete']
        reviewed=[o for o in complete if o.get('review') is not None]
        for o in complete:
            if not isinstance(o.get('answer'),str) or not o['answer'].strip(): raise ValueError('Complete observation requires original answer')
        success=sum(o['review']['identity_correct'] and o['review']['core_facts_sufficient'] and not o['review']['major_error'] for o in reviewed)
        result.append({'surface':surface,'mode':mode,'group':group,'attempted':len(rows),'blocked_or_transport_errors':len(rows)-len(complete),'pending_review':len(complete)-len(reviewed),'reviewed':len(reviewed),'success':success,'success_rate':success/len(reviewed) if reviewed else None,'major_errors':sum(o['review']['major_error'] for o in reviewed),'general_population_claim_allowed':False})
    return {'scope':'Descriptive grouped counts, not a population estimate or clustered confidence interval','groups':result,'observation_count':len(ids)}

def write_json(path, data):
    p=Path(path); p.parent.mkdir(parents=True,exist_ok=True); p.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')

def report(data, destination):
    content=html.escape(json.dumps(data,ensure_ascii=False,indent=2))
    doc=f'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GEO 验收记录</title><style>body{{max-width:1000px;margin:50px auto;padding:0 24px;font:16px/1.8 sans-serif;background:#f4f7f5;color:#183a30}}pre{{background:white;padding:24px;border:1px solid #cbdcd2;white-space:pre-wrap;overflow-wrap:anywhere}}h1{{font-size:30px}}</style><h1>GEO 验收记录</h1><p>工程检查与消费者端效果分开记录；空值表示尚无对应结果。</p><pre>{content}</pre></html>'
    Path(destination).write_text(doc,encoding='utf-8')

def main():
    p=argparse.ArgumentParser(description=__doc__); sub=p.add_subparsers(dest='command',required=True)
    a=sub.add_parser('audit');a.add_argument('--base',default=SITE);a.add_argument('--out',required=True)
    a=sub.add_parser('summarize');a.add_argument('--input',required=True);a.add_argument('--out',required=True)
    a=sub.add_parser('report');a.add_argument('--input',required=True);a.add_argument('--out',required=True)
    a=sub.add_parser('assistant-request');a.add_argument('--model',required=True);a.add_argument('--prompt',required=True);a.add_argument('--feature',choices=['chat','deep_chat','ai_search','reasoning_search'],default='ai_search');a.add_argument('--out',required=True)
    a=sub.add_parser('submit-indexnow');a.add_argument('--config',required=True);a.add_argument('--out',required=True)
    args=p.parse_args()
    if args.command=='submit-indexnow':
        cfg=json.loads(Path(args.config).read_text(encoding='utf-8'))
        if cfg.get('host')!='me.dufengyun.xyz' or not re.fullmatch('[a-f0-9]{32}',cfg.get('key','')):
            raise ValueError('Unexpected host or verification key format')
        check=fetch(cfg['keyLocation'])
        if check['status']!=200 or check['body'].strip()!=cfg['key']:raise ValueError('Live ownership file is not available')
        payload={**cfg,'urlList':[SITE+(p if p!='/' else '') for p in ROUTES]}
        req=urllib.request.Request('https://api.indexnow.org/indexnow',data=json.dumps(payload).encode(),headers={'Content-Type':'application/json; charset=utf-8'},method='POST')
        try:
            with urllib.request.urlopen(req,timeout=40) as r:status=r.status;response=r.read().decode('utf-8')
        except urllib.error.HTTPError as e:status=e.code;response=e.read().decode('utf-8',errors='replace')
        record={'captured_at':dt.datetime.now(dt.timezone.utc).isoformat(),'endpoint':'https://api.indexnow.org/indexnow','host':cfg['host'],'url_count':len(ROUTES),'status':status,'response':response,'meaning':'URL notification only; not an indexing, ranking or Doubao success confirmation'}
        write_json(args.out,record);print(json.dumps({'status':status,'url_count':len(ROUTES)}));return 0 if status in (200,202) else 1
    if args.command=='audit':
        data=audit(args.base);write_json(args.out,data);print(json.dumps({'passed':data['passed'],'pages':len(data['pages']),'resources':len(data['resources'])}));return 0 if data['passed'] else 1
    if args.command=='summarize':
        rows=[json.loads(l) for l in Path(args.input).read_text(encoding='utf-8-sig').splitlines() if l.strip()];write_json(args.out,summarize(rows));return 0
    if args.command=='report':report(json.loads(Path(args.input).read_text(encoding='utf-8-sig')),args.out);return 0
    if args.command=='assistant-request':
        # Prepare only; never obtain credentials or issue an API call implicitly.
        data={'model':args.model,'tools':[{'type':'doubao_app','feature':{args.feature:{'type':'enabled'}}}],'input':args.prompt}
        write_json(args.out,{'status':'prepared_not_executed','endpoint':'https://ark.cn-beijing.volces.com/api/v3/responses','headers_required':['Authorization: Bearer <local credential>','ark-beta-doubao-app: true'],'body':data});return 0

if __name__=='__main__':
    try: sys.exit(main())
    except (ValueError,OSError) as e: print(str(e),file=sys.stderr);sys.exit(2)
