// 构建前生成 llms.txt 与 llms-full.txt，供 AI 爬虫（GPTBot/ClaudeBot 等）结构化引用。
// 以默认语言（英文）为 canonical 索引；其余语言内容仍可被正常抓取。
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://gta6gameleaksandguides.asia';
const CONTENT_DIR = path.join(process.cwd(), 'content');
const LOCALE = 'en';

function readPosts(type) {
  const dir = path.join(CONTENT_DIR, LOCALE, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        date: data.date ?? '',
        content: content.trim(),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const news = readPosts('news');
const guides = readPosts('guides');
const url = (type, slug) => `${SITE_URL}/${LOCALE}/${type}/${slug}`;

const lines = [];
lines.push('# GTA6 Intel Hub');
lines.push('');
lines.push(
  '> Unofficial GTA6 intel hub: release date, price, platforms, pre-orders, trailer breakdowns, rumor verification and guides. Multilingual (English default, plus zh/es/ja).',
);
lines.push('');
lines.push('## News');
for (const p of news) lines.push(`- [${p.title}](${url('news', p.slug)}): ${p.description}`);
lines.push('');
lines.push('## Guides');
for (const p of guides) lines.push(`- [${p.title}](${url('guides', p.slug)}): ${p.description}`);
lines.push('');
lines.push('## Key pages');
lines.push(`- [Rumor verification](${SITE_URL}/${LOCALE}/verify): tell confirmed, rumor and unconfirmed apart.`);
lines.push(`- [About & editorial policy](${SITE_URL}/${LOCALE}/about): how we separate fact from rumor.`);
lines.push('');

const full = [];
full.push('# GTA6 Intel Hub — full content');
full.push('');
for (const p of [...news, ...guides]) {
  full.push(`# ${p.title}`);
  full.push('');
  full.push(p.content);
  full.push('');
}

const outDir = path.join(process.cwd(), 'public');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'llms.txt'), lines.join('\n'));
fs.writeFileSync(path.join(outDir, 'llms-full.txt'), full.join('\n'));
console.log(`[llms] llms.txt (${news.length + guides.length} entries) + llms-full.txt generated`);
