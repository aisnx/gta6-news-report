# GTA6 情报站 — 变现（Affiliate）落地方案

> 目标：流量还小（<1 万 PV/月）时先铺联盟链接，零成本起量变现。
> 原则：**只在「购买意图」页面挂链接**，纯内容页（剧情/角色/地图）不硬塞，避免伤体验与 SEO。

## 1. 挂哪些联盟（按地区）

| 联盟 | 覆盖地区 | 佣金 | 适合挂什么 |
|---|---|---|---|
| Amazon Associates | 美/英/日/西 | 1–4% | 主机、手柄、SSD、显示器、GTA6 实体盘 |
| Best Buy / GameStop | 美国 | ~1–3% | 主机、预购 |
| Green Man Gaming | 全球 PC | 3–7% | PC 版 key（若出 PC） |
| Fanatics / Rockstar Store | 全球 | 变动 | 官方周边 |
| 京东联盟 / 淘宝联盟（阿里妈妈） | 中国 | 1–5% | 主机、手柄、外设 |
| 楽天 / Amazon JP | 日本 | 1–4% | 主机、游戏 |
| CJ / Impact / Awin（平台） | 全球 | 看品牌 | PlayStation/Xbox 官方、第三方 key |

> 起步建议：先上 **Amazon Associates + 京东联盟 + 淘宝联盟**，覆盖英文主力 + 中文市场；PC 版有消息后再加 GMG。

## 2. 挂在哪（页面清单）

### P0 — 必挂（强购买意图）

| slug | 页面 | 挂什么 |
|---|---|---|
| `gta6-console-buying-guide` | 主机购买指南 | PS5/Xbox、手柄、SSD |
| `gta6-digital-vs-physical` | 数字版 vs 实体版 | 各平台预购链接 |
| `preorder-details`（news） | 预购详情 | 预购链接（各版本） |
| `buying-guide` | 购买指南 | 通用购买 + 配件 |
| `pre-launch-checklist` | 发售前清单 | 主机/配件/预购 |

### P1 — 可挂（相关意图）

| slug | 页面 | 挂什么 |
|---|---|---|
| `gta6-faq` | FAQ | 购买/平台问题处插链接 |
| `vehicle-system` | 载具系统 | 方向盘/手柄 |
| `side-activities` | 支线活动 | 手柄/周边 |
| `gta6-vs-gta5` | GTA6 vs GTA5 | GTA5 打折链接 |

### P2 — 不挂（纯内容，别硬塞）

`story-theories`、`jason-duval-and-cast`、`lucia-caminos-profile`、`leonida-map-locations`、`wanted-system-police-ai`、`vice-city-legacy`、`social-media`、`soundtrack`、`everything-confirmed`、`three-new-screenshots`、`an-extended-look`、`no-generative-ai`、`gta6-pc-release-rumors`、`gta-online-2-rumors`

## 3. 怎么挂（技术）

- 内容在 `content/{语言}/{类型}/*.md`，正文是 Markdown，直接插 `[文字](你的联盟链接)` 即可。
- **注意**：同 slug 四个语言各有一份文件，挂链接要**四份都改**；链接可按语言区分（中文挂京东/淘宝、英文挂 Amazon）。
- **合规（必做）**：文末加 affiliate 披露，例如「本文含推广链接，购买我可能获得佣金」，否则违反 FTC / Amazon 政策会封号。
- 建议封装：抽一个 `AffiliateLink` 组件或脚本来管理链接，避免每条手写重复、便于后续统一换链接。

## 4. 收入预期（当前量级）

- 当前 ~450 PV/天、~1.3 万 PV/月；购买意图页约占 30% → 每月约 4000 次「可转化曝光」。
- 转化率 0.5–1% × 客单价 $50–500 → 每月 $20–200，波动大。
- **结论**：现在挂是「顺手埋点」，别指望大钱；真正变现要等流量稳定 1 万 PV/月以上。
