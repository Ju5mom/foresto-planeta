type Character = {
  kana: string;
  roman: string;
  slug: string;
  description: string;
};

export const characters: Character[] = [
  {
    kana: "サファイア<ruby>太砂<rp>(</rp><rt>たいさ</rt><rp>)</rp></ruby>",
    roman: "Safaïa",
    slug: "safaia",
    description:
      "<ruby>隊員<rp>(</rp><rt>たいいん</rt><rp>)</rp></ruby>をまとめるリーダー。<br>とても勇気がある。<br>ふるきよきものをあいする。",
  },
  {
    kana: "トロップ・トロシー",
    roman: "Toropp’ Toloshi",
    slug: "toropp-toloshi",
    description:
      "サファイアの<ruby>秘書<rp>(</rp><rt>ひしょ</rt><rp>)</rp></ruby>。<br>とてもしっかりもの。<br>トロップ・トロシィいちぞく。",
  },
  {
    kana: "エルネストはかせ",
    roman: "Elnesto",
    slug: "elnesto",
    description:
      "フォレストの天才はかせ。<br>おもしろいことが大好き。<br>サファイアのしんゆう",
  },
  {
    kana: "ディープ一家",
    roman: "Dìp",
    slug: "dip",
    description:
      "ディープ（パパ）・ライト（ママ）・ターコイズ（長男）・グリン（次男） + 14SI ロボットの大家族",
  },
  {
    kana: "ルリ<ruby>中砂<rp>(</rp><rt>ちゅうさ</rt><rp>)</rp></ruby>",
    roman: "Luli",
    slug: "luli",
    description:
      "<ruby>隊員<rp>(</rp><rt>たいいん</rt><rp>)</rp></ruby>でサファイアの部下。<br>心やさしい青年。<br>サファイアをそんけいしている。",
  },
  {
    kana: "モルモル",
    roman: "Molmol",
    slug: "molmol",
    description:
      "<ruby>隊員<rp>(</rp><rt>たいいん</rt><rp>)</rp></ruby>みならい。<br>食べることが大好き。<br>サファイアの<ruby>甥<rp>(</rp><rt>おい</rt><rp>)</rp></ruby>っ子。",
  },
  {
    kana: "ドゥゴー",
    roman: "Dugoò",
    slug: "dugoo",
    description:
      "こんちゅう<ruby>惑星<rp>(</rp><rt>わくせい</rt><rp>)</rp></ruby>の王様。<br>宇宙アンティークに目がない。<br>クーデターでネルネルを<ruby>退位<rp>(</rp><rt>たいい</rt><rp>)</rp></ruby>させた。",
  },
  {
    kana: "ネルネル",
    roman: "Nérunëru",
    slug: "neruneru",
    description:
      "元こんちゅう<ruby>惑星<rp>(</rp><rt>わくせい</rt><rp>)</rp></ruby>の王様。<br>じぶんがだいすき<br>フォレストへ<ruby>亡命<rp>(</rp><rt>ぼうめい</rt><rp>)</rp></ruby>してきた。",
  },
];
