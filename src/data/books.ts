export type Item = {
  src: string;
  alt?: string;
};

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;

  publishedAt: string;
  updatedAt: string;

  categories?: string;
  tags?: string[];

  items?: Item[];
};

export const getLatestBook = (books: Book[]): Book | null => {
  if (!books || books.length === 0) return null;
  /* 初期値が null なので、そのままだと latest は
      null 型と推論されてしまう。
      そのため、latest が「最終的に Book を入れる予定の変数」で
      あることを明示するために Book | null の型宣言が必須になる。*/
  let latest: Book | null = null;

  for (const book of books) {
    if (!book.publishedAt) continue;
    const currentTime = new Date(book.publishedAt).getTime();
    if (!latest) {
      latest = book;
      continue;
    }
    const latestTime = new Date(latest.publishedAt).getTime();
    if (currentTime > latestTime) latest = book;
  }
  return latest;
};

export const books: Book[] = [
  {
    slug: "Safaïa-holiday",
    title:
      "サファイア<ruby>太砂<rp>(</rp><rt>たいさ</rt><rp>)</rp></ruby>の夏休み",
    subtitle: "「だれだ〜ワタシのしあわせをこわすやつは〜〜！！」",
    description:
      "サファイア<ruby>太砂<rp>(</rp><rt>たいさ</rt><rp>)</rp></ruby>のまちにまった夏休み‥！！<br>ちょうどエルネストハカセはラボでとある<ruby>発表<rp>(</rp><rt>はっぴょう</rt><rp>)</rp></ruby>をしようとしていた‥！",

    publishedAt: "2025-11-15",
    updatedAt: "2025-11-16",

    categories: "まんが",
    tags: ["惑星フォレスト", "サファイア太砂", "エルネスト博士"],

    items: [
      {
        src: "/img/book01/book_sample_1.webp",
        alt: "タイサの羽ペンはとくべつ‥！ペンの台もとってもめずらしい鉱石（こうせき）なんだよ",
      },
      {
        src: "/img/book01/book_sample_2.webp",
        alt: "このおもちがエルネストはかせ？？",
      },
      {
        src: "/img/book01/book_sample_3.webp",
        alt: "ひごろの疲れがたまってるから、ヘンテコなゆめをみるんだよね",
      },
      {
        src: "/img/book01/book_sample_4.webp",
        alt: "のんびり、ゆっくり、ごうかなふねで行くのがいいのだ",
      },
      {
        src: "/img/book01/book_sample_5.webp",
        alt: "ディープはかせのラボでは12 + 2 siRobot が毎日はたらいているよ！",
      },
    ],
  },
];


