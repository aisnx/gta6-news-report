// 纯常量与类型（不含 next/navigation 等服务端依赖），可供客户端组件安全导入。

export const locales = ['zh', 'en', 'es', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

// 语言标签映射（用于 <html lang> 属性）
export const htmlLang: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
  es: 'es',
  ja: 'ja',
};

export type VerifyStatus = 'yes' | 'no' | 'maybe';

export interface Fact {
  key: string;
  value: string;
  note?: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  text: string;
}

export interface VerifyRow {
  claim: string;
  status: VerifyStatus;
  note?: string;
}

// 站点字典：聚合所有 UI 文案 + 本地化数据（facts / timeline / verifyRows）
export interface Dictionary {
  siteName: string;
  ogLocale: string;

  header: {
    topbar: string;
    brandTagline: string;
    navHome: string;
    navNews: string;
    navVerify: string;
    navGuides: string;
  };

  footer: string;

  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    launched: string;
  };

  home: {
    heroTitle1: string;
    heroTitle2: string;
    lead: string;
    factsTitle: string;
    factsSub: string;
    newsTitle: string;
    newsSub: string;
    guidesTitle: string;
    guidesSub: string;
    viewAll: string;
    disclaimer: {
      lead: string;
      body1: string;
      body2: string;
      body3: string;
    };
  };

  verify: {
    title: string;
    description: string;
    sub: string;
    tableClaim: string;
    tableStatus: string;
    statusYes: string;
    statusNo: string;
    statusMaybe: string;
    timelineTitle: string;
    timelineSub: string;
  };

  news: {
    title: string;
    description: string;
    sub: string;
    empty: string;
  };

  guides: {
    title: string;
    description: string;
    sub: string;
    empty: string;
  };

  breadcrumbs: {
    ariaLabel: string;
    home: string;
    news: string;
    guides: string;
  };

  related: string;

  meta: {
    defaultTitle: string;
    template: string;
    description: string;
    ogDescription: string;
  };

  fallbackCategory: string;

  facts: Fact[];
  timeline: TimelineItem[];
  verifyRows: VerifyRow[];
}
