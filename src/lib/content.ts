import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from './i18n';

// 内容管线：从 content/<locale>/<type>/*.md 读取文章，frontmatter + 正文。
// 日常发稿只需往 content/<locale>/news 或 content/<locale>/guides 扔一个 Markdown 文件即可。
// 不同语言使用相同 slug，便于语言切换器映射；未翻译的文章在对应语言下不存在（列表不显示、直达 404）。

export type ContentType = 'news' | 'guides';

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  category?: string;
  tags?: string[];
  cover?: string;
  coverCaption?: string;
}

export interface Post extends PostMeta {
  slug: string;
  content: string;
}

const contentDir = path.join(process.cwd(), 'content');

function readPosts(type: ContentType, locale: Locale): Post[] {
  const dir = path.join(contentDir, locale, type);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? '',
      description: (data.description as string) ?? '',
      category: data.category as string | undefined,
      tags: (data.tags as string[]) ?? [],
      cover: data.cover as string | undefined,
      coverCaption: data.coverCaption as string | undefined,
      content,
    } as Post;
  });

  // 按日期倒序
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllNews(locale: Locale): Post[] {
  return readPosts('news', locale);
}

export function getNewsBySlug(locale: Locale, slug: string): Post | undefined {
  return readPosts('news', locale).find((p) => p.slug === slug);
}

export function getAllGuides(locale: Locale): Post[] {
  return readPosts('guides', locale);
}

export function getGuideBySlug(locale: Locale, slug: string): Post | undefined {
  return readPosts('guides', locale).find((p) => p.slug === slug);
}

// 相关阅读：按分类 / 标签匹配打分，不足时用最近发布补齐。
export function getRelatedPosts(type: ContentType, locale: Locale, post: Post, limit = 4): Post[] {
  const all = readPosts(type, locale).filter((p) => p.slug !== post.slug);
  const scored = all
    .map((p) => {
      let score = 0;
      if (post.category && p.category === post.category) score += 3;
      if (post.tags && p.tags) {
        const overlap = post.tags.filter((t) => p.tags?.includes(t)).length;
        score += overlap * 2;
      }
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const related = scored.map((x) => x.p);
  for (const p of all) {
    if (related.length >= limit) break;
    if (!related.includes(p)) related.push(p);
  }
  return related.slice(0, limit);
}

// 按分类分组（保持分类首次出现顺序，即按最新文章日期倒序）。
export function groupByCategory(posts: Post[], fallbackCategory: string): [string, Post[]][] {
  const map = new Map<string, Post[]>();
  for (const p of posts) {
    const c = p.category ?? fallbackCategory;
    if (!map.has(c)) map.set(c, []);
    map.get(c)!.push(p);
  }
  return [...map.entries()];
}
