"""Check the rendered production site, including pages discovered via its sitemap.

Usage: python3 scripts/check_seo.py http://127.0.0.1:3103
Run after npm run build and npm start. No third-party Python packages required.
"""
import concurrent.futures
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3103').rstrip('/')
CANONICAL = 'https://www.rossenaarmarketing.nl'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}


def fetch(path):
    try:
        with urllib.request.urlopen(BASE + path, timeout=30) as response:
            return response.status, response.read().decode('utf-8')
    except urllib.error.HTTPError as error:
        return error.code, error.read().decode('utf-8')


class Page(HTMLParser):
    def __init__(self, body):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.title_open = False
        self.h1 = 0
        self.meta = {}
        self.canonicals = []
        self.links = set()
        self.ids = set()
        self.missing_alt = 0
        self.schemas = []
        self.schema_text = None
        self.feed(body)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'title':
            self.title_open = True
        if tag == 'h1':
            self.h1 += 1
        if tag == 'meta':
            self.meta[attrs.get('name', attrs.get('property', ''))] = attrs.get('content', '')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs.get('href'))
        if tag == 'a' and attrs.get('href'):
            self.links.add(attrs['href'])
        if tag == 'img' and 'alt' not in attrs:
            self.missing_alt += 1
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.schema_text = ''

    def handle_data(self, data):
        if self.title_open:
            self.title += data
        if self.schema_text is not None:
            self.schema_text += data

    def handle_endtag(self, tag):
        if tag == 'title':
            self.title_open = False
        if tag == 'script' and self.schema_text is not None:
            self.schemas.append(json.loads(self.schema_text))
            self.schema_text = None


def nodes(value):
    if isinstance(value, dict):
        yield value
        for item in value.values():
            yield from nodes(item)
    elif isinstance(value, list):
        for item in value:
            yield from nodes(item)


errors = []
status, sitemap = fetch('/sitemap.xml')
assert status == 200, 'Sitemap unavailable'
urls = [item.text for item in ET.fromstring(sitemap).findall('s:url/s:loc', NS)]
assert urls, 'Empty production sitemap'
assert len(urls) == len(set(urls)), 'Duplicate sitemap URL'
assert all(url.startswith(CANONICAL + '/') for url in urls), 'Wrong sitemap host'
paths = [urllib.parse.urlsplit(url).path or '/' for url in urls] + ['/privacy']
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    responses = dict(zip(paths, pool.map(fetch, paths)))
pages = {path: Page(body) for path, (_, body) in responses.items()}
seen_titles, seen_descriptions = set(), set()
report = []
for path, page in pages.items():
    def check(condition, message):
        if not condition:
            errors.append(f'{path}: {message}')
    check(responses[path][0] == 200, 'non-200 response')
    check(page.h1 == 1, f'expected one H1, found {page.h1}')
    check(bool(page.title) and page.title not in seen_titles, 'missing or duplicate title')
    seen_titles.add(page.title)
    description = page.meta.get('description', '')
    check(bool(description) and description not in seen_descriptions, 'missing or duplicate description')
    seen_descriptions.add(description)
    expected_url = CANONICAL + (path if path != '/' else '')
    check(page.canonicals == [expected_url], 'canonical does not match URL')
    check(page.meta.get('og:url') == expected_url, 'Open Graph URL mismatch')
    check(page.meta.get('og:title') == page.title, 'Open Graph title mismatch')
    check(page.meta.get('og:description') == description, 'Open Graph description mismatch')
    check(page.meta.get('twitter:title') == page.title, 'Twitter title mismatch')
    check(page.meta.get('twitter:card') == 'summary_large_image', 'missing large social card')
    check(page.meta.get('og:image', '').startswith(CANONICAL + '/'), 'missing local social image')
    check(page.missing_alt == 0, 'images without alt attributes')
    check(('noindex' in page.meta.get('robots', '')) == (path == '/privacy'), 'incorrect indexing policy')
    graph = [node for schema in page.schemas for node in nodes(schema)]
    types = {node.get('@type') for node in graph if isinstance(node.get('@type'), str)}
    check({'Organization', 'Person', 'WebSite'}.issubset(types), 'missing entity graph')
    if path != '/':
        check('BreadcrumbList' in types, 'missing breadcrumbs')
    if path.startswith('/diensten/'):
        check('Service' in types, 'missing Service schema')
    check('AggregateRating' not in types, 'unverified aggregate rating')
    definitions = {node['@id'] for node in graph if '@id' in node and len(node) > 1}
    for node in graph:
        if set(node) == {'@id'}:
            check(node['@id'] in definitions, f'unresolved entity {node["@id"]}')
    report.append({'path': path, 'title': page.title, 'titleLength': len(page.title), 'descriptionLength': len(description), 'h1': page.h1, 'schemaTypes': sorted(types), 'htmlBytes': len(responses[path][1].encode())})

# Resolve every internal document link and fragment from the rendered HTML.
for path, page in pages.items():
    for href in page.links:
        url = urllib.parse.urlsplit(urllib.parse.urljoin(CANONICAL + path, href))
        if url.netloc != urllib.parse.urlsplit(CANONICAL).netloc:
            continue
        target = url.path or '/'
        if target not in pages:
            errors.append(f'{path}: linked document not in crawl: {target}')
        elif url.fragment and urllib.parse.unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{path}: missing anchor {target}#{url.fragment}')
status, robots = fetch('/robots.txt')
if status != 200 or 'Allow: /' not in robots or CANONICAL + '/sitemap.xml' not in robots:
    errors.append('Production robots or sitemap declaration missing')
for path in ['/werk/bestaat-niet', '/diensten/bestaat-niet']:
    status, body = fetch(path)
    if status != 404 or 'noindex' not in Page(body).meta.get('robots', ''):
        errors.append(f'{path}: missing real 404/noindex')
_, body = fetch('/contact?interesse=Social%20media%20beheer')
if Page(body).canonicals != [CANONICAL + '/contact']:
    errors.append('Contact query variant canonical is incorrect')
print(json.dumps({'pages': report, 'errors': sorted(set(errors))}, ensure_ascii=False, indent=2))
sys.exit(1 if errors else 0)
