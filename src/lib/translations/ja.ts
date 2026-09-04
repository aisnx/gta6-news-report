import type { Dictionary } from '../locales';

export const ja: Dictionary = {
  siteName: 'GTA6 情報ステーション',
  ogLocale: 'ja_JP',

  header: {
    topbar: '🎮 GTA6 発売日 2026-11-19 · 予約受付中 · PC版は2027年以降の見込み',
    brandTagline: '情報 / 検証 / まとめ ｜ 攻略',
    navHome: 'ホーム',
    navNews: 'ニュース',
    navVerify: '検証',
    navGuides: '攻略',
  },

  footer: 'GTA6 情報ステーション · 非公式ファンサイト · Rockstar Games / Take-Two とは一切関係ありません · 各商標は権利者に帰属します · 本サイトにはアフィリエイトリンクが含まれる場合があります',

  countdown: {
    days: '日',
    hours: '時間',
    minutes: '分',
    seconds: '秒',
    launched: '🎮 GTA6 発売！攻略を更新中 →',
  },

  home: {
    heroTitle1: 'グランド・セフト・オート VI',
    heroTitle2: '情報と攻略をひとつに',
    lead: '発売前はリークと公式情報を毎日追い、真偽を見分けるお手伝い。発売後はミッション攻略・イースターエッグ・収集品をいち早く更新します。',
    factsTitle: '確定情報（公式確認済み）',
    factsSub: '以下はすべて Rockstar / Take-Two の公式発表または信頼できる情報源による確認事項です。',
    newsTitle: '最新ニュース',
    newsSub: 'GTA6 の最新動向とリーク情報の追跡。',
    guidesTitle: '攻略と資料',
    guidesSub: 'キャラクター・マップ・システム・サウンドトラック・購入ガイド。',
    trailersTitle: 'トレーラー & 動画',
    trailersSub: '公式トレーラーと最新のコミュニティ動画をまとめて視聴。',
    buyingGuideTitle: '購入ガイド',
    buyingGuideSub: 'どの本体を選ぶか、地域ごとの価格も一括で。',
    viewAll: 'すべて見る',
    disclaimer: {
      lead: '免責事項：',
      body1: '当サイトはファン運営の情報・攻略サイトで、公開されたニュース事実・公式確認情報・テキスト分析のみを掲載し、',
      body2: 'リークされたゲーム映像・スクリーンショット・ソースコード・著作権保護素材の転載や再配布は行いません',
      body3: '。未確認情報はすべて明記しています。最新情報は必ず Rockstar Games の公式発表をご確認ください。',
    },
  },

  verify: {
    title: '真偽の検証',
    description: 'GTA6 の噂の検証と情報タイムライン：公式確認・デマ・未確認をひと目で見分けます。',
    sub: 'ネットには噂が溢れています。ここで「確認済み / 未確認 / デマ」をひと目で見分けられます。',
    tableClaim: '主張',
    tableStatus: 'ステータス',
    statusYes: '公式確認',
    statusNo: 'デマ',
    statusMaybe: '未確認',
    timelineTitle: '情報タイムライン',
    timelineSub: '初のリークから発売間近までの重要な節目。',
  },

  news: {
    title: 'ニュース',
    description: 'GTA6 の最新ニュース・リーク追跡・予告編解説・公式動向を毎日更新。',
    sub: 'GTA6 の最新動向とリーク情報をカテゴリ別に整理。',
    empty: 'まだコンテンツがありません。お楽しみに。',
  },

  guides: {
    title: '攻略',
    description: 'GTA6 の攻略と資料：システム解説・キャラクター・マップ・サウンドトラック・サブアクティビティ・購入ガイド。発売日からミッション攻略を更新。',
    sub: 'システム・キャラクター・マップ・サウンドトラック・サブアクティビティ・購入ガイドをカテゴリ別に整理。',
    empty: '攻略は発売日の 2026-11-19 に解禁予定です。お楽しみに。',
  },

  breadcrumbs: {
    ariaLabel: 'パンくずリスト',
    home: 'ホーム',
    news: 'ニュース',
    guides: '攻略',
  },

  related: '関連記事',
  comments: 'コメント',

  meta: {
    defaultTitle: 'GTA6 情報ステーション｜発売日・リークまとめ・予告編解説・攻略',
    template: '%s｜GTA6 情報ステーション',
    description: 'GTA6 の総合情報ステーション：発売日・価格・プラットフォーム・予約・予告編解説・噂の検証、そして発売後の全攻略。',
    ogDescription: 'GTA6 の総合情報ステーション：発売日・価格・プラットフォーム・予約・予告編解説・噂の検証と攻略。',
  },

  fallbackCategory: 'その他',

  videos: [
    { id: 'QdBZY2fkU-0', title: '公式トレーラー1' },
    { id: 'VQRLujxTm3c', title: '公式トレーラー2' },
    { id: 'tJbzMqJGH4k', title: '公式映像：An Extended Look' },
  ],

  facts: [
    { key: '発売日', value: '2026-11-19' },
    { key: 'プラットフォーム', value: 'PS5 · Xbox Series X|S', note: 'PC版は未発表' },
    { key: '通常版価格', value: '$79.99', note: 'アルティメット版 $99.99' },
    { key: '主人公', value: 'Jason Duval × Lucia Caminos', note: 'ダブル主人公 · 現行シリーズ初の女性主人公' },
    { key: '舞台', value: 'レオニダ州（Leonida）', note: 'フロリダがモデル' },
    { key: '主要都市', value: 'バイスシティ（Vice City）', note: 'マイアミ風' },
    { key: '最新予告編', value: 'An Extended Look', note: '8/27 初公開' },
    { key: '公式見解', value: '生成AI不使用 · ストーリーモードに課金なし', note: '9月の公式声明' },
  ],

  timeline: [
    {
      date: '2022-09-18',
      title: '史上最大規模のリーク',
      text: 'ハッカーの teapotuberhacker（Lapsus$ 関連）が GTAForums に約90本の初期開発動画とソースコードを投稿。Rockstar はネットワーク侵害を認め、「作業は予定通り続ける」と表明。',
    },
    {
      date: '2023-12',
      title: '初の予告編を公開',
      text: '初の予告編が世界を席巻し、Lucia/Jason のダブル主人公とバイスシティの舞台を確定。YouTube で社会現象となった。',
    },
    {
      date: '2026-05',
      title: '発売日を 11-19 に決定',
      text: '公式が発売日を 2026年5月26日 から 11月19日 に延期し、その後も決算発表で「予定通り」と繰り返し確認。',
    },
    {
      date: '2026-06-25',
      title: '予約開始 + キービジュアル公開',
      text: '通常版 $79.99。Take-Two は予約需要を「前例のない規模」と表現。公式キービジュアルも同時公開。',
    },
    {
      date: '2026-08-27',
      title: '「An Extended Look」初公開',
      text: '約26分の拡張ゲームプレイ映像が Netflix で独占初公開され、6時間後に YouTube で 4K 版が公開。',
    },
    {
      date: '2026-08（今月）',
      title: '新たなリークの波',
      text: '未承認のゲームプレイ映像が再び流出。Rockstar は「胸が張り裂ける思い」としながらも、ゲームは「ほぼ完成」しており11月の発売に間に合うと強調。',
    },
    {
      date: '2026-09-01',
      title: '新スクリーンショット3点 + 生成AI不使用を確認',
      text: 'Rockstar は公式メディア欄に新スクリーンショット3点（Lucia、Jason、バイスシティ）を公開。取材では開発に生成AIを使用していないこと、ストーリーモードに課金がないことを確認。',
    },
  ],

  verifyRows: [
    { claim: '発売日 2026-11-19', status: 'yes' },
    { claim: '発売プラットフォーム PS5 / Xbox X|S', status: 'yes' },
    { claim: '主人公は Lucia と Jason', status: 'yes' },
    { claim: 'マイアミ風バイスシティが舞台', status: 'yes' },
    { claim: 'PC版は2026年内に発売', status: 'no', note: 'PC版の日付は未発表。2027年以降の見込み' },
    { claim: '通常版 $79.99、予約受付中', status: 'yes' },
    { claim: '正確なマップ面積 / 都市数', status: 'maybe' },
    { claim: 'オンラインモード（GTA Online 2）の詳細', status: 'maybe' },
    { claim: '舞台はレオニダ州（Leonida）', status: 'yes' },
    { claim: '開発に生成AIを使用', status: 'no', note: '公式が否定。コンテンツは人間が制作' },
    { claim: 'ストーリーモードに課金あり', status: 'no', note: 'ストーリーモードに課金なしと公式確認' },
    { claim: 'GTA Online 2 は発売当初から収録', status: 'maybe', note: 'オンラインモードの詳細は未発表' },
  ],
};
