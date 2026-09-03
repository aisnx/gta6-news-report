# GTA6 情报站 — 内容排期（冲稳定 1 万 PV/月）

> 目标：稳定 **1 万 PV/月**（≈ 350 PV/天，真实自然搜索，非爬虫/测试脉冲）。
> 现状：站点上线 2 天，真实流量 ~90 UV/天、~450 PV/天；英文(US)为主、中文(CN)上升。
> 关键节点：GTA6 **2026-11-19** 发售，今天 2026-09-03，距发售 ~11 周。

## 1. 策略总纲

- 主攻 **英文 + 美国市场**（当前 70% 流量来自 US），抢发售前高搜索量信息词。
- 中文市场单独一条线（Baidu 站长 + B站/知乎），不依赖 Google。
- 内容形态：攻略(guides) 吃长尾，情报(news) 吃时效。

## 2. 内容缺口 → 待写清单（按搜索量排序）

### Phase 1：发售前信息补全（现在 → 10 月底）

| 待写 slug | 目标关键词 | 优先级 |
|---|---|---|
| `gta6-system-requirements` | GTA6 system requirements / PC 配置 | P0 |
| `gta6-editions` | GTA6 editions / Standard vs Deluxe vs Collector's | P0 |
| `gta6-price` | GTA6 price / how much | P0 |
| `gta6-pc-release-date` | GTA6 PC release date（PC 党搜索量巨大） | P0 |
| `gta6-file-size` | GTA6 file size / GB | P1 |
| `gta6-crossplay` | GTA6 crossplay / cross-platform | P1 |
| `gta6-collectors-edition` | GTA6 collector's edition contents | P1 |

### Phase 2：发售前冲刺（11/1 → 11/18）

| 待写 slug | 目标关键词 | 优先级 |
|---|---|---|
| `gta6-countdown` | GTA6 countdown / release date countdown | P0（互动页，吃流量） |
| `gta6-preorder-guide` | GTA6 preorder guide / where to buy | P0 |
| `gta6-launch-time` | GTA6 release time / midnight launch | P1 |
| `gta6-day-one-patch` | GTA6 day one patch | P1 |

### Phase 3：发售后爆发（11/19 起）

| 待写 slug | 目标关键词 | 优先级 |
|---|---|---|
| `gta6-cheats` | GTA6 cheats / codes（搜索量极大） | P0 |
| `gta6-money-guide` | GTA6 how to make money fast | P0 |
| `gta6-100-percent` | GTA6 100% completion | P0 |
| `gta6-secret-locations` | GTA6 secrets / easter eggs / collectibles | P1 |
| `gta6-walkthrough` | GTA6 walkthrough / missions | P1 |
| `gta6-best-cars` | GTA6 best cars / vehicles | P1 |

## 3. 排期节奏（周）

| 周 | 时间 | 动作 |
|---|---|---|
| W1–W2 | 9/3–9/16 | Phase 1 的 P0：`system-requirements`、`editions`、`price`、`pc-release-date` |
| W3–W4 | 9/17–9/30 | Phase 1 的 P1：`file-size`、`crossplay`、`collectors-edition` |
| W5–W8 | 10 月 | 周更 2–3 篇 news 追时效 + 优化旧文 SEO（标题/描述/内链） |
| W9–W10 | 11/1–11/18 | Phase 2：`countdown`、`preorder-guide`、`launch-time` |
| W11+ | 11/19 起 | Phase 3：`cheats`、`money`、`100%` 等，抢发售后搜索洪峰 |

## 4. 每篇文章 SOP（保证收录与排名）

1. 四语言同名文件（zh/en/es/ja），frontmatter 齐全，`coverCaption` 用双引号包住（含 `: ` 时）。
2. 标题含目标关键词 + 搜索意图（how/why/guide/list）。
3. 文内互链到相关旧文（内链是免费权重）。
4. `npm run build` → commit → push → Cloudflare 自动部署。
5. 提交 URL 到 GSC/Bing（新文章用「URL 检查」工具加速收录）。

## 5. 分发（别只等搜索引擎）

- 英文：Reddit r/GTA6、X(Twitter) 带图、Discord。
- 中文：B站专栏、知乎「GTA6」相关问题、贴吧、小红书。
- 每个平台引流回对应语言版本，顺便给站内做外链。
