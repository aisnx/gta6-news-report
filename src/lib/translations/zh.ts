import type { Dictionary } from '../locales';

export const zh: Dictionary = {
  siteName: 'GTA6 情报站',
  ogLocale: 'zh_CN',

  header: {
    topbar: '🎮 GTA6 定档 2026-11-19 · 预购已开启 · PC 版预计 2027+',
    brandTagline: '情报 / 求证 / 汇总 ｜ 攻略',
    navHome: '首页',
    navNews: '情报',
    navVerify: '真伪求证',
    navGuides: '攻略',
  },

  footer: 'GTA6 情报站 · 非官方粉丝站 · 与 Rockstar Games / Take-Two 无任何关联 · 相关商标归其权利人所有',

  countdown: {
    days: '天',
    hours: '小时',
    minutes: '分',
    seconds: '秒',
    launched: '🎮 GTA6 已发售！攻略更新中 →',
  },

  home: {
    heroTitle1: '侠盗猎车手 VI',
    heroTitle2: '情报与攻略一站通',
    lead: '发售前每日追踪爆料与官方动态、帮你分清真假；发售后第一时间更新任务攻略、彩蛋与收集。',
    factsTitle: '已知信息（官方确认）',
    factsSub: '以下均为 Rockstar / Take-Two 官方或可信来源确认的信息。',
    newsTitle: '最新情报',
    newsSub: 'GTA6 最新动态与爆料追踪。',
    guidesTitle: '攻略与资料',
    guidesSub: '角色、地图、系统、配乐与购买指南。',
    viewAll: '查看全部',
    disclaimer: {
      lead: '免责与边界声明：',
      body1: '本站为玩家自建的情报汇总与攻略站，仅报道公开新闻事实、官方确认信息与文字性分析，',
      body2: '不转载、不搬运任何泄露的游戏画面、截图、源码或受版权保护的素材',
      body3: '。所有未确认信息均会明确标注，请以 Rockstar Games 官方公告为准。',
    },
  },

  verify: {
    title: '真伪求证',
    description: 'GTA6 传言求证与情报时间线：一键分清官方确认、谣言与未确认信息。',
    sub: '网上传言满天飞，这里帮你一键分清「已确认 / 未确认 / 谣言」。',
    tableClaim: '说法',
    tableStatus: '状态',
    statusYes: '官方确认',
    statusNo: '谣言',
    statusMaybe: '未确认',
    timelineTitle: '情报时间线',
    timelineSub: '从首次泄露到临近发售的关键节点。',
  },

  news: {
    title: '情报',
    description: 'GTA6 最新情报、爆料追踪、预告解析与官方动态，每日更新。',
    sub: 'GTA6 最新动态与爆料追踪，按类别整理。',
    empty: '暂无内容，敬请期待。',
  },

  guides: {
    title: '攻略',
    description: 'GTA6 攻略与资料：系统详解、角色档案、地图、配乐、支线活动与购买指南，发售日起更新任务攻略。',
    sub: '系统详解、角色、地图、配乐、支线与购买指南，按类别整理。',
    empty: '攻略将在 2026-11-19 发售日解锁，敬请期待。',
  },

  breadcrumbs: {
    ariaLabel: '面包屑',
    home: '首页',
    news: '情报',
    guides: '攻略',
  },

  related: '相关阅读',

  meta: {
    defaultTitle: 'GTA6 情报站｜发售日期、爆料汇总、预告解析、攻略',
    template: '%s｜GTA6 情报站',
    description: 'GTA6 一站式情报站：发售日期、价格、平台、预购、预告片解析、爆料真伪求证，以及发售后的全攻略。',
    ogDescription: 'GTA6 一站式情报站：发售日期、价格、平台、预购、预告解析、爆料真伪求证与攻略。',
  },

  fallbackCategory: '其他',

  facts: [
    { key: '发售日期', value: '2026-11-19' },
    { key: '平台', value: 'PS5 · Xbox Series X|S', note: 'PC 版未公布' },
    { key: '标准版价格', value: '$79.99', note: '终极版 $99.99' },
    { key: '主角', value: 'Jason Duval × Lucia Caminos', note: '双主角 · 当代 GTA 首位女性主角' },
    { key: '世界观', value: '莱昂尼达州（Leonida）', note: '以佛罗里达为原型' },
    { key: '核心城市', value: '罪恶都市（Vice City）', note: '迈阿密风格' },
    { key: '最新预告', value: 'An Extended Look', note: '8/27 首映' },
    { key: '官方确认', value: '无生成式 AI · 单机无内购', note: '9 月官方声明' },
  ],

  timeline: [
    {
      date: '2022-09-18',
      title: '史上最大规模泄露',
      text: '黑客 teapotuberhacker（关联 Lapsus$）在 GTAForums 放出约 90 段早期开发视频与源码，Rockstar 承认遭网络入侵，称"工作将继续按计划进行"。',
    },
    {
      date: '2023-12',
      title: '首支预告片发布',
      text: '首支预告引爆全球，确认 Lucia/Jason 双主角与罪恶都市舞台，成为 YouTube 现象级视频。',
    },
    {
      date: '2026-05',
      title: '发售日期定档 11-19',
      text: '官方将日期从 2026 年 5 月 26 日顺延至 11 月 19 日，随后在财报中反复确认"稳了"。',
    },
    {
      date: '2026-06-25',
      title: '预购开启 + 公布封面',
      text: '标准版 $79.99，Take-Two 称预购需求"空前"。官方封面艺术同步公布。',
    },
    {
      date: '2026-08-27',
      title: '《An Extended Look》首映',
      text: '约 26 分钟的扩展实机演示在 Netflix 独家首映，6 小时后上线 YouTube 4K。',
    },
    {
      date: '2026-08（本月）',
      title: '新一波泄露',
      text: '再有未经授权的实机片段流出，Rockstar 称"令人心碎"，但强调游戏"已接近完成"、11 月如期。',
    },
    {
      date: '2026-09-01',
      title: '3 张新截图 + 确认无生成式 AI',
      text: 'Rockstar 在官网媒体区放出 3 张新截图（Lucia、Jason 与罪恶都市）；并在媒体采访中确认开发未使用生成式 AI、单机战役无内购。',
    },
  ],

  verifyRows: [
    { claim: '发售日期 2026-11-19', status: 'yes' },
    { claim: '首发平台 PS5 / Xbox X|S', status: 'yes' },
    { claim: '主角 Lucia 与 Jason', status: 'yes' },
    { claim: '舞台为迈阿密式罪恶都市', status: 'yes' },
    { claim: 'PC 版 2026 年内同步发售', status: 'no', note: '官方未公布 PC 日期，预计 2027+' },
    { claim: '标准版 $79.99、预购已开启', status: 'yes' },
    { claim: '具体地图面积 / 城市数量', status: 'maybe' },
    { claim: '线上模式（GTA Online 2）细节', status: 'maybe' },
    { claim: '世界观为莱昂尼达州（Leonida）', status: 'yes' },
    { claim: '开发使用生成式 AI', status: 'no', note: '官方明确否认，内容由人工制作' },
    { claim: '单机战役含内购', status: 'no', note: '官方确认单机无内购' },
    { claim: '首发即含 GTA Online 2', status: 'maybe', note: '官方未公布线上模式细节' },
  ],
};
