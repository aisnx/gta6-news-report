// 构建前生成站内搜索索引：读取 content/<locale>/<type>/*.md 的 frontmatter，输出 public/search-index.json。
// 由 package.json 的 prebuild 钩子调用（npm run build 前自动执行）。
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const LOCALES = ['en', 'zh', 'es', 'ja'];
const TYPES = ['news', 'guides'];

const index = [];

for (const locale of LOCALES) {
  for (const type of TYPES) {
    const dir = path.join(CONTENT_DIR, locale, type);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data } = matter(raw);
      index.push({
        title: data.title ?? slug,
        description: data.description ?? '',
        category: data.category ?? '',
        type,
        locale,
        slug,
        url: `/${locale}/${type}/${slug}`,
      });
    }
  }
}

const outDir = path.join(process.cwd(), 'public');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'search-index.json'), JSON.stringify(index));
console.log(`[search-index] ${index.length} entries -> public/search-index.json`);
