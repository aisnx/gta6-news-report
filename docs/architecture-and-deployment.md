# GTA6 情报站 — 架构与部署技术文档

> 本文档记录本项目的完整技术架构，以及每一步设计决策的**原理与作用**。供后续维护、扩展与迁移参考。

---

## 1. 项目概览

| 项 | 内容 |
|---|---|
| 定位 | GTA6 情报汇总 + 攻略站（多语言） |
| 框架 | Next.js 16.3.3（App Router）+ React 19 |
| 渲染模式 | **纯静态导出**（`output: 'export'`），产物在 `out/` |
| 内容来源 | `content/{语言}/{类型}/*.md` Markdown 文件 |
| 语言 | 中文(zh)、英文(en)、西班牙语(es)、日语(ja) |
| 托管 | Cloudflare Pages（连 GitHub 自动构建） |
| 域名 | `gta6gameleaksandguides.asia` |

**为什么选「静态导出」而不是 SSR？**
内容全是发布时确定的 Markdown，无用户交互、无后端。静态导出意味着：无服务器成本、全球 CDN 分发快、SEO 友好（搜索引擎直接抓静态 HTML）、可部署到任意静态托管（Cloudflare Pages / Nginx / OSS）。

---

## 2. 内容管线（Content Pipeline）

**文件位置**：`src/lib/content.ts`

### 原理
用 [gray-matter](https://github.com/jonschlinkert/gray-matter) 解析 Markdown 文件顶部的 YAML frontmatter（标题、日期、描述、分类、标签、封面），正文走 `react-markdown` + `remark-gfm` 渲染成 HTML。

### 目录结构
```
content/
  zh/  en/  es/  ja/          ← 每语言一套
    news/      （情报，按日期倒序）
    guides/    （攻略，按日期倒序）
```

### 关键函数
- `readPosts(type, locale)`：读某语言某类型的全部 `.md`，按日期倒序
- `getAllNews/getAllGuides(locale)`、`getNewsBySlug/getGuideBySlug(locale, slug)`
- `getRelatedPosts(type, locale, post)`：按分类/标签打分，不足用最近文章补齐
- `groupByCategory(posts, fallbackCategory)`：按分类分组（分类来自 frontmatter，随语言本地化）

### 作用 / 为什么要这样设计
1. **发稿零代码**：新增文章 = 往 `content/{语言}/{类型}/` 扔一个 `.md` 文件，改 frontmatter 即可，无需改任何代码。
2. **slug 跨语言对齐**：同名文件 = 同一篇文章的不同语言版本，语言切换器据此做 `/{新语言}/同路径` 映射。
3. **未翻译 = 不存在**：某语言下没有某文件，该语言列表页不显示、直达 404，诚实且简单（无需"未翻译"占位符）。

---

## 3. 多语言（i18n）架构

**核心文件**：
- `src/lib/locales.ts` — 纯常量与类型（**无服务端依赖，客户端可安全导入**）
- `src/lib/i18n.ts` — 服务端：字典加载 + 语言校验
- `src/lib/translations/{zh,en,es,ja}.ts` — 四个字典（UI 文案 + 本地化数据）

### 3.1 路由：`[lang]` 路径前缀

```
src/app/
  (root)/              ← 根路由 `/`（客户端跳转到 /zh）
  [lang]/              ← 语言路由（真正的主体）
    layout.tsx         ← root layout（<html lang>、Header/Footer）
    page.tsx           ← 首页
    news/  guides/  verify/
```

**原理**：`[lang]` 是动态段，`generateStaticParams()` 返回 `[{lang:'zh'},{lang:'en'},{lang:'es'},{lang:'ja'}]`，构建时为每种语言各生成一套静态页（`/zh/...`、`/en/...` 等）。

**为什么用路径前缀而不是 cookie / 域名？**
- 静态导出**无法**用 middleware/Proxy 做 `Accept-Language` 重定向（那些是运行时能力）。
- 路径前缀（`/en/...`）对 SEO 最友好：每个语言版本有独立 URL，可被独立收录、独立配 hreflang。

### 3.2 字典系统（UI 文案）

`Dictionary` 接口聚合所有 UI 字符串 + 本地化数据（`facts` 事实卡、`timeline` 时间线、`verifyRows` 求证表）。页面/组件通过 `getDictionary(locale)` 拿字典。

**关键点**：`locales.ts`（纯常量）与 `i18n.ts`（含 `next/navigation` 的 `notFound`）**拆开**——因为客户端组件（语言切换器、根跳转）只能 import 纯常量，不能把 `notFound` 和服务端字典打包进客户端 bundle。

### 3.3 内容本地化

文章的 frontmatter（title/description/category/tags/coverCaption）与正文本身随文件语言化。`content.ts` 按 `locale` 读 `content/{locale}/{type}`。

### 3.4 语言切换器

`src/components/LanguageSwitcher.tsx`（客户端组件）：用 `usePathname()` 取当前路径，剥离开头的 `/{lang}` 段，对每个语言生成 `/{新lang}${其余路径}` 链接，实现「切换语言保持当前页面」。

### 3.5 踩过的坑（重要）

1. **双 root layout 导致嵌套 `<html>`**：最初把 `app/layout.tsx` 和 `app/[lang]/layout.tsx` 都写成含 `<html>/<body>`，结果 `[lang]` 的 `<html>` 被嵌套进根 layout 里，产生非法 HTML 且 `<html lang>` 永远是 zh-CN。**解法**：用路由组 `app/(root)/` 放 `/` 的独立 root layout，`app/[lang]/layout.tsx` 作为语言路由的 root layout（各自负责自己的 `<html lang>`）。这是 Next 16「Multiple root layouts」特性。

2. **`generateStaticParams` 的 `params` 是普通对象，不是 Promise**：页面组件的 `params` 是 `Promise`（要 `await`），但 `generateStaticParams` 接收的 `params` 是**同步普通对象**。写错类型会导致 typegen 报错。

3. **frontmatter 里的 ASCII 冒号 `: `**：`coverCaption: xxx · Source: Rockstar Games` 里的 `Source:` 后的 ASCII 冒号+空格会被 YAML 当成映射分隔符报错。**解法**：把含 `: ` 的封面说明用双引号包起来（中文原稿用全角 `：` 所以没事）。

---

## 4. SEO 架构

| 机制 | 文件 | 作用 |
|---|---|---|
| hreflang | 各页 `generateMetadata` 的 `alternates.languages` + `src/lib/seo.ts` | 告诉搜索引擎各语言版本的对应关系，避免重复内容惩罚 |
| sitemap | `src/app/sitemap.ts` | 枚举 4 语言全部 URL，供搜索引擎抓取 |
| robots.txt | `src/app/robots.ts` | 允许全部爬取 + 指向 sitemap |
| JSON-LD | `src/lib/schema.ts` + `JsonLd` 组件 | 结构化数据（Article/NewsArticle/BreadcrumbList/WebSite），利于富结果与 AI 引用 |
| `<html lang>` | `[lang]/layout.tsx` | 每语言正确标注，利于无障碍与 SEO |
| canonical + og | 各页 `generateMetadata` | 去重 + 社交分享卡片 |

**`alternateLanguages()` 的关键设计**：只对「该语言下实际存在译文的文章」输出 hreflang，避免指向 404 的语言链接。

---

## 5. 组件系统

| 组件 | 职责 |
|---|---|
| `Header` | 顶部提示条 + 导航 + 语言切换器（接收 `locale`+`dict`） |
| `Footer` | 版权声明（随语言） |
| `Countdown` | 发售倒计时（客户端 `'use client'`，接收 `labels`） |
| `VerifyTable` | 真伪求证表（接收 `dict`，用 `dict.verifyRows`） |
| `Breadcrumbs` | 面包屑（接收 `items`+`ariaLabel`） |
| `RelatedPosts` | 相关阅读（接收 `posts`+`title`） |
| `Markdown` | 正文渲染（react-markdown + gfm） |
| `JsonLd` | 注入 `<script type="application/ld+json">` |
| `LanguageSwitcher` | 语言切换（客户端，usePathname） |

**组件接字典的原则**：客户端组件（Countdown、LanguageSwitcher）不能直接读服务端字典，改为接收 `props`（labels/current）；服务端组件直接接收 `dict` 或 `locale`。

---

## 6. 部署流程

### 6.1 Cloudflare Pages 配置

| 项 | 值 |
|---|---|
| 连接 | GitHub 仓库 `aisnx/gta6-news-report`，生产分支 `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| 环境变量 | `NODE_VERSION = 22`（**关键**） |

**`NODE_VERSION=22` 是踩过的坑**：Next.js 16 要求 Node ≥ 20.9，而 Cloudflare Pages 默认 Node 18，会构建失败（提交上出现红叉）。本地 Node 24 正常、线上 18 失败，就是这个原因。

### 6.2 域名与 DNS

- 域名 `gta6gameleaksandguides.asia` 注册在腾讯云，后把 **NS 迁到 Cloudflare**（`Begin DNS transfer`）。
- 自定义域名在 Pages 后台「激活」后由 Cloudflare 自动托管路由（根域名 `@` → Pages 无需手动 CNAME 记录，因域名已在 Cloudflare 上）。
- `www` 子域名可额外加 CNAME 或再激活一个自定义域名。

### 6.3 发布流程（日常）

1. 改内容（丢 `.md`）或改代码
2. `npm run build` 本地验证
3. `git add -A && git commit && git push origin main`
4. Cloudflare 自动构建部署（约 1–2 分钟）

---

## 7. 每一步的原理与作用（速查表）

| 步骤 | 做了什么 | 原理 / 为什么 |
|---|---|---|
| 内容用 Markdown | `content/**/*.md` | 发稿零代码、git 可版本管理、AI 易读 |
| 静态导出 | `output:'export'` | 无服务器、CDN 快、SEO 好、可任意托管 |
| `[lang]` 前缀路由 | 每语言独立 URL | SEO 独立收录、可配 hreflang |
| 字典拆 `locales.ts` / `i18n.ts` | 纯常量与服务端分离 | 客户端组件不能打包 `notFound` 和服务端字典 |
| 双 root layout | `(root)/` + `[lang]/` | 让每语言 `<html lang>` 正确、避免嵌套 html |
| hreflang 只输出存在的语言 | `alternateLanguages` | 避免指向 404 的 hreflang |
| sitemap 枚举 4 语言 | `sitemap.ts` | 让搜索引擎发现全部语言版本 |
| JSON-LD | `schema.ts` | 富结果 + 利于 AI 引用 |
| `NODE_VERSION=22` | Cloudflare 环境变量 | 满足 Next 16 的 Node ≥20.9 要求 |
| frontmatter 冒号加引号 | 译文 coverCaption 用双引号 | 避免 YAML 把 `: ` 当映射分隔符 |

---

## 8. 如何新增一篇文章（发稿 SOP）

1. 写中文：`content/zh/news/`（或 `guides/`）下新建 `我的新文章.md`，frontmatter 填 title/date/description/category/tags/cover
2. 写英文/西语/日语：同名文件放进 `content/en|es|ja/` 对应目录，翻译 frontmatter + 正文（**coverCaption 用双引号包住**）
3. `npm run build` 验证
4. 提交推送，Cloudflare 自动部署

> 只发中文、暂不翻译也可——未翻译语言下该文章自然不显示（不 404 页面本身，只是列表不出现）。
