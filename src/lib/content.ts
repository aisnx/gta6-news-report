import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 内容管线：从 content/<type>/*.md 读取文章，frontmatter + 正文。
// 日常发稿只需往 content/news 或 content/guides 扔一个 Markdown 文件即可。

export type ContentType = 'news' | 'guides';

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  category?: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  slug: string;
  content: string;
}

const contentDir = path.join(process.cwd(), 'content');

function readPosts(type: ContentType): Post[] {
  const dir = path.join(contentDir, type);
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
      content,
    } as Post;
  });

  // 按日期倒序
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllNews(): Post[] {
  return readPosts('news');
}

export function getNewsBySlug(slug: string): Post | undefined {
  return readPosts('news').find((p) => p.slug === slug);
}

export function getAllGuides(): Post[] {
  return readPosts('guides');
}

export function getGuideBySlug(slug: string): Post | undefined {
  return readPosts('guides').find((p) => p.slug === slug);
}
