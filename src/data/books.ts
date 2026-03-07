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
    subtitle: "「しあわせだ‥しあわせがすぐそこまで‥」",
    description:
      "サファイア<ruby>太砂<rp>(</rp><rt>たいさ</rt><rp>)</rp></ruby>のまちにまった夏休み‥！！<br>ちょうどエルネスト博士はラボでとある<ruby>発表<rp>(</rp><rt>はっぴょう</rt><rp>)</rp></ruby>をしようとしていた‥！",

    publishedAt: "2026-03-08",
    updatedAt: "",

    categories: "まんが",
    tags: ["惑星フォレスト", "サファイア太砂", "エルネスト博士"],

    items: [
      {
        src: "./img/book01/book_top.webp",
        alt: "",
      },
      {
        src: "./img/book01/book1.webp",
        alt: "フォレスト宇宙船ステーション、レインボーターミナルはいつも大忙し！",
      },
      {
        src: "./img/book01/book2.webp",
        alt: "タイサのひさしぶりのなが〜いおやすみ！！",
      },
      {
        src: "./img/book01/book3.webp",
        alt: "エルネスト博士が何やら新しい発明を見せてくれるみたい",
      },
      {
        src: "./img/book01/book4.webp",
        alt: "モルモルは隊員見習い！まだ入隊して1年ミマンの新人です",
      },
      {
        src: "./img/book01/book5.webp",
        alt: "おもちは、フォレストで地球のぶんかが知られてから人気の食べものだよ！",
      },
      {
        src: "./img/book01/book6.webp",
        alt: "タイサは何日もかけて南の島に行くんですって",
      },
      {
        src: "./img/book01/book7.webp",
        alt: "アイス食べ放題のごうかフェリーなんだよ！！いいなー",
      },
      {
        src: "./img/book01/book8.webp",
        alt: "ディープはかせのラボでは12 + 2 siRobot が毎日ディープ博士のもとではたらいているよ！",
      },
      {
        src: "./img/book01/book9.webp",
        alt: "ウシのスケはみんなのリーダーなのだ",
      },
      {
        src: "./img/book01/book10.webp",
        alt: "エルネスト博士とディープ博士は学生時代からの友だちだよ",
      },
      {
        src: "./img/book01/book11.webp",
        alt: "ネズミのスケのラボはディープ博士がむかし使っていたラボなんだ",
      },
      {
        src: "./img/book01/book12.webp",
        alt: "ラボのみんなは、なんだかんだ、エルネスト博士のことが大好きなんだよね",
      },
      {
        src: "./img/book01/book13.webp",
        alt: "いやなよかんが‥！",
      },
      {
        src: "./img/book01/book14.webp",
        alt: "モルモルは新人だけど、1日なんかいもお昼ねしている‥",
      },
      {
        src: "./img/book01/book15.webp",
        alt: "しあわせのキワミとはこのことさ‥",
      },
      {
        src: "./img/book01/book16.webp",
        alt: "頭の上のパイナップルは、おどりの後、みんなでいただくのです",
      },
      {
        src: "./img/book01/book17.webp",
        alt: "おしろのろうかはとても良い景色が見えるんだ",
      },
      {
        src: "./img/book01/book18.webp",
        alt: "セルリアンちゅうさはシティの中心部のパトロールをとりしきってるんだ",
      },
      {
        src: "./img/book01/book19.webp",
        alt: "タイサのうちは天井がクリスタルガラスで、夜は星がよく見えるんだ！",
      },
      {
        src: "./img/book01/book20.webp",
        alt: "はじめはこのトンネル、水が流れていたみたい",
      },
      {
        src: "./img/book01/book21.webp",
        alt: "ホラーなエルネスト博士。増えたらなんか性格が変わっちゃったみたい？！",
      },
      {
        src: "./img/book01/book22.webp",
        alt: "エルネストはまったく運動しないから‥",
      },
      {
        src: "./img/book01/book23.webp",
        alt: "タイサの仕事部屋は床は天然の芝生なんだよ。フカフカなんだ！すごいでしょ？",
      },
      {
        src: "./img/book01/book24.webp",
        alt: "だれかタイサにきちんとあやまって〜",
      },
      {
        src: "./img/book01/book25.webp",
        alt: "そして甘いものにいやされるのだ",
      },
      {
        src: "./img/book01/book26.webp",
        alt: "オーシャンはハイテクがお好み。マッサージや温泉も大好き",
      },
      {
        src: "./img/book01/book27.webp",
        alt: "タイサ、羽はいったいどこでもらったのさ‥",
      },
    ],
  },
];
