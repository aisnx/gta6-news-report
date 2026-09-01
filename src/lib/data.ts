// 站点核心数据 —— 全部为官方/可信来源确认的事实，修改这里即可更新首页。

export const RELEASE_DATE = '2026-11-19T00:00:00';
export const RELEASE_DATE_LABEL = '2026-11-19';
export const SITE_NAME = 'GTA6 情报站';
export const SITE_URL = 'https://gta6.example.com'; // TODO: 部署后替换为真实域名

export interface Fact {
  key: string;
  value: string;
  note?: string;
}

export const facts: Fact[] = [
  { key: '发售日期', value: '2026-11-19' },
  { key: '平台', value: 'PS5 · Xbox Series X|S', note: 'PC 版未公布' },
  { key: '标准版价格', value: '$79.99', note: '终极版 $99.99' },
  { key: '主角', value: 'Jason Duval × Lucia Caminos', note: '双主角 · 当代 GTA 首位女性主角' },
  { key: '世界观', value: '莱昂尼达州（Leonida）', note: '以佛罗里达为原型' },
  { key: '核心城市', value: '罪恶都市（Vice City）', note: '迈阿密风格' },
  { key: '最新预告', value: 'An Extended Look', note: '8/27 首映' },
  { key: '官方确认', value: '无生成式 AI · 单机无内购', note: '9 月官方声明' },
];

export interface TimelineItem {
  date: string;
  title: string;
  text: string;
}

export const timeline: TimelineItem[] = [
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
];

export type VerifyStatus = 'yes' | 'no' | 'maybe';

export interface VerifyRow {
  claim: string;
  status: VerifyStatus;
  note?: string;
}

export const verifyRows: VerifyRow[] = [
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
];
