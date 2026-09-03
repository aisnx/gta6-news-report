import type { Dictionary } from '../locales';

export const en: Dictionary = {
  siteName: 'GTA6 Intel Hub',
  ogLocale: 'en_US',

  header: {
    topbar: '🎮 GTA6 releases 2026-11-19 · Pre-orders open · PC expected 2027+',
    brandTagline: 'Intel / Verify / Hub ｜ Guides',
    navHome: 'Home',
    navNews: 'News',
    navVerify: 'Verify',
    navGuides: 'Guides',
  },

  footer: 'GTA6 Intel Hub · Unofficial fan site · Not affiliated with Rockstar Games / Take-Two · All trademarks belong to their respective owners · This site may contain affiliate links and may earn a commission on qualifying purchases',

  countdown: {
    days: 'd',
    hours: 'h',
    minutes: 'm',
    seconds: 's',
    launched: '🎮 GTA6 is out! Guides updating now →',
  },

  home: {
    heroTitle1: 'Grand Theft Auto VI',
    heroTitle2: 'Intel & guides, one hub',
    lead: 'Before launch, we track rumors and official news daily to help you tell fact from fiction; after launch, we deliver mission guides, easter eggs and collectibles first.',
    factsTitle: 'Confirmed facts',
    factsSub: 'Everything below is confirmed by Rockstar / Take-Two or credible sources.',
    newsTitle: 'Latest news',
    newsSub: 'The latest GTA6 updates and rumor tracking.',
    guidesTitle: 'Guides & resources',
    guidesSub: 'Characters, map, systems, soundtrack and buying guide.',
    trailersTitle: 'Watch the trailers',
    trailersSub: 'Official trailers and the latest community video, in one place.',
    viewAll: 'View all',
    disclaimer: {
      lead: 'Disclaimer: ',
      body1: 'This is a fan-made intel hub and guide site that only reports public news, official confirmations and text-based analysis. It ',
      body2: 'does not repost or redistribute any leaked footage, screenshots, source code or copyrighted material',
      body3: '. All unconfirmed information is clearly labeled — always refer to official Rockstar Games announcements.',
    },
  },

  verify: {
    title: 'Rumor verification',
    description: 'GTA6 rumor verification and intel timeline: tell confirmed, rumor and unconfirmed apart at a glance.',
    sub: 'Rumors are everywhere — here you can tell confirmed / unconfirmed / rumor apart at a glance.',
    tableClaim: 'Claim',
    tableStatus: 'Status',
    statusYes: 'Confirmed',
    statusNo: 'Rumor',
    statusMaybe: 'Unconfirmed',
    timelineTitle: 'Intel timeline',
    timelineSub: 'Key milestones from the first leak to the approaching launch.',
  },

  news: {
    title: 'News',
    description: 'The latest GTA6 news, rumor tracking, trailer breakdowns and official updates, updated daily.',
    sub: 'The latest GTA6 updates and rumor tracking, grouped by category.',
    empty: 'Nothing here yet — check back soon.',
  },

  guides: {
    title: 'Guides',
    description: 'GTA6 guides and resources: systems, character profiles, map, soundtrack, side activities and buying guide — mission guides from launch day.',
    sub: 'Systems, characters, map, soundtrack, side activities and buying guide, grouped by category.',
    empty: 'Guides unlock on launch day, 2026-11-19 — stay tuned.',
  },

  breadcrumbs: {
    ariaLabel: 'Breadcrumb',
    home: 'Home',
    news: 'News',
    guides: 'Guides',
  },

  related: 'Related reading',

  meta: {
    defaultTitle: 'GTA6 Intel Hub — release date, leaks, trailer analysis & guides',
    template: '%s — GTA6 Intel Hub',
    description: 'Your one-stop GTA6 hub: release date, price, platforms, pre-orders, trailer breakdowns, rumor verification, and full post-launch guides.',
    ogDescription: 'Your one-stop GTA6 hub: release date, price, platforms, pre-orders, trailer breakdowns, rumor verification and guides.',
  },

  fallbackCategory: 'Other',

  videos: [
    { id: 'VQRLujxTm3c', title: 'Official Trailer (1)' },
    { id: 'QdBZY2fkU-0', title: 'Official Trailer (2)' },
    { id: 'tJbzMqJGH4k', title: 'Leak long video (community, unconfirmed)' },
  ],

  facts: [
    { key: 'Release date', value: '2026-11-19' },
    { key: 'Platforms', value: 'PS5 · Xbox Series X|S', note: 'PC unannounced' },
    { key: 'Standard price', value: '$79.99', note: 'Ultimate $99.99' },
    { key: 'Protagonists', value: 'Jason Duval × Lucia Caminos', note: 'Dual protagonists · first female lead in the modern series' },
    { key: 'Setting', value: 'Leonida', note: 'Based on Florida' },
    { key: 'Core city', value: 'Vice City', note: 'Miami-inspired' },
    { key: 'Latest trailer', value: 'An Extended Look', note: 'Premiered 8/27' },
    { key: 'Official stance', value: 'No generative AI · no single-player microtransactions', note: 'Official statement in September' },
  ],

  timeline: [
    {
      date: '2022-09-18',
      title: 'Biggest leak in history',
      text: 'Hacker teapotuberhacker (linked to Lapsus$) posted ~90 early dev videos and source code on GTAForums. Rockstar admitted a network intrusion and said work "will continue as planned."',
    },
    {
      date: '2023-12',
      title: 'First trailer released',
      text: 'The first trailer broke the internet, confirming the Lucia/Jason dual protagonists and Vice City setting, becoming a YouTube phenomenon.',
    },
    {
      date: '2026-05',
      title: 'Release date set for 11-19',
      text: 'Rockstar moved the date from May 26, 2026 to November 19, then repeatedly reaffirmed it in earnings calls.',
    },
    {
      date: '2026-06-25',
      title: 'Pre-orders open + cover art revealed',
      text: 'Standard edition $79.99; Take-Two called pre-order demand "unprecedented." The official key art was revealed at the same time.',
    },
    {
      date: '2026-08-27',
      title: '"An Extended Look" premieres',
      text: 'A ~26-minute extended gameplay demo premiered exclusively on Netflix, hitting YouTube in 4K six hours later.',
    },
    {
      date: '2026-08 (this month)',
      title: 'A new wave of leaks',
      text: 'More unauthorized gameplay footage surfaced; Rockstar called it "heartbreaking" but stressed the game is "nearly complete" and on track for November.',
    },
    {
      date: '2026-09-01',
      title: '3 new screenshots + no generative AI confirmed',
      text: 'Rockstar released 3 new screenshots (Lucia, Jason and Vice City) in the official media section, and confirmed in interviews that development used no generative AI and the single-player campaign has no microtransactions.',
    },
  ],

  verifyRows: [
    { claim: 'Release date 2026-11-19', status: 'yes' },
    { claim: 'Launch platforms PS5 / Xbox X|S', status: 'yes' },
    { claim: 'Protagonists Lucia and Jason', status: 'yes' },
    { claim: 'Set in a Miami-style Vice City', status: 'yes' },
    { claim: 'PC version launches within 2026', status: 'no', note: 'No PC date announced; expected 2027+' },
    { claim: 'Standard $79.99, pre-orders open', status: 'yes' },
    { claim: 'Exact map size / number of cities', status: 'maybe' },
    { claim: 'Online mode (GTA Online 2) details', status: 'maybe' },
    { claim: 'Setting is the state of Leonida', status: 'yes' },
    { claim: 'Development used generative AI', status: 'no', note: 'Officially denied — content is human-made' },
    { claim: 'Single-player has microtransactions', status: 'no', note: 'Officially confirmed no single-player microtransactions' },
    { claim: 'GTA Online 2 included at launch', status: 'maybe', note: 'No online-mode details announced' },
  ],
};
