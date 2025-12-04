/** ================ Foresto ⇄ Earth Calendar Converter (all arrow) ================ */

/** ===== 設定 ===== */
export const CONFIG = {
  EPOCH_EARTH_ISO: '2025-03-01T00:00:00Z',
  EPOCH_FORESTO: { year: 2785, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
  HOURS_PER_FORESTO_DAY: 36,
  MONTHS_PER_YEAR: 8,
  DAYS_PER_MONTH: 24,
  RAINBOW_DAYS: 5,
  RAINBOW_MODE: 'freeze', // 'freeze' | 'rainbow'
  WEEKDAYS_JP: ['月曜日', '火曜日', '水曜日', '木曜日', '風曜日', '瑠璃曜日', '土曜日', '虹曜日'],
  WEEKDAYS_EN: ['Moonday', 'Fireday', 'Waterday', 'Treeday', 'Windday', 'Azureday', 'Earthday', 'Rainbowday'],
  MONTHS_JP: ['芽月', '風月', '雨月', '森月', '蒼月', '実月', '土月', '霜月'],
  MONTHS_EN: ['Bud', 'Wind', 'Rain', 'Forest', 'Azure', 'Harvest', 'Earth', 'Frost'],
};

/** ===== 内部定数 ===== */
export const MS_PER_HOUR = 3600_000;
export const MS_PER_FORESTO_DAY = CONFIG.HOURS_PER_FORESTO_DAY * MS_PER_HOUR;
export const REGULAR_DAYS_PER_YEAR = CONFIG.MONTHS_PER_YEAR * CONFIG.DAYS_PER_MONTH; // 192
export const CIVIL_DAYS_PER_YEAR = REGULAR_DAYS_PER_YEAR + CONFIG.RAINBOW_DAYS;      // 197
export const EPOCH_EARTH = new Date(CONFIG.EPOCH_EARTH_ISO);

/** ユーティリティ */
export const pad = (n, w = 2) => String(n).padStart(w, '0');
export const mod = (n, m) => ((n % m) + m) % m;
export const divFloor = (n, d) => {
  const q = Math.trunc(n / d);
  return (n >= 0 || n % d === 0) ? q : q - 1;
};

/** 年内の曜日インデックス（特別期間は freeze:null / rainbow:7 を返す） */
export const weekdayIndexWithinYear = (dayOfYear1based) => {
  if (dayOfYear1based <= REGULAR_DAYS_PER_YEAR) {
    return (dayOfYear1based - 1) % CONFIG.WEEKDAYS_JP.length;
  }
  return CONFIG.RAINBOW_MODE === 'rainbow' ? CONFIG.WEEKDAYS_JP.length - 1 : null;
};

/** Earth → Foresto */
export const toForesto = (dateEarth = new Date()) => {
  const msSinceEpoch = dateEarth.getTime() - EPOCH_EARTH.getTime();
  const forestoDaysFloat = msSinceEpoch / MS_PER_FORESTO_DAY;

  const totalDays = Math.floor(forestoDaysFloat);
  let dayTimeFrac = forestoDaysFloat - totalDays; // 0.. <1
  if (dayTimeFrac < 0) dayTimeFrac += 1;

  const yearOffset = Math.floor(divFloor(totalDays, CIVIL_DAYS_PER_YEAR));
  const year = CONFIG.EPOCH_FORESTO.year + yearOffset;
  let dayOfYear = mod(totalDays, CIVIL_DAYS_PER_YEAR) + 1; // 1..197

  let month = null, dayInMonth = null, rainbowIndex = null;
  if (dayOfYear <= REGULAR_DAYS_PER_YEAR) {
    month = Math.floor((dayOfYear - 1) / CONFIG.DAYS_PER_MONTH) + 1; // 1..8
    dayInMonth = ((dayOfYear - 1) % CONFIG.DAYS_PER_MONTH) + 1;      // 1..24
  } else {
    rainbowIndex = dayOfYear - REGULAR_DAYS_PER_YEAR;                // 1..5
  }

  const widx = weekdayIndexWithinYear(dayOfYear);
  const weekdayJP = (widx === null) ? null : CONFIG.WEEKDAYS_JP[widx];
  const weekdayEN = (widx === null) ? null : CONFIG.WEEKDAYS_EN[widx];

  const totalSecs = Math.floor(dayTimeFrac * CONFIG.HOURS_PER_FORESTO_DAY * 3600);
  const hour = Math.floor(totalSecs / 3600);
  const minute = Math.floor((totalSecs % 3600) / 60);
  const second = totalSecs % 60;

  return {
    year,
    month,
    day: dayInMonth,
    rainbowIndex,              // 1..5（特別期間のみ）
    dayOfYear,                 // 1..197
    weekday: { index: widx, jp: weekdayJP, en: weekdayEN },
    time: { hour, minute, second },
    displayJP: formatForestoJP({ year, month, dayInMonth, rainbowIndex, weekdayJP, hour, minute }),
    displayEN: formatForestoEN({ year, month, dayInMonth, rainbowIndex, weekdayEN, hour, minute }),
  };
};

/** Foresto → Earth */
export const toEarth = (f) => {
  const { year, month, day, hour = 0, minute = 0, second = 0, rainbowIndex = null } = f;

  const yearOffset = year - CONFIG.EPOCH_FORESTO.year;
  let days = yearOffset * CIVIL_DAYS_PER_YEAR;

  if (month && day) {
    days += (month - 1) * CONFIG.DAYS_PER_MONTH + (day - 1);
  } else if (rainbowIndex) {
    days += REGULAR_DAYS_PER_YEAR + (rainbowIndex - 1);
  } else {
    throw new Error('Invalid Foresto date: need (month & day) or rainbowIndex');
  }

  const ms = days * MS_PER_FORESTO_DAY + (hour * 3600 + minute * 60 + second) * 1000;
  return new Date(EPOCH_EARTH.getTime() + ms);
};

// 36hを子ども向けにラベル化
const formatClockJP = (hour, minute) => {
  // 0-11: 午前 / 12-23: 午後 / 24-35: 夜
  let label, h12;
  if (hour < 12) { label = '午前'; h12 = hour === 0 ? 12 : hour; }
  else if (hour < 24) { label = '午後'; h12 = (hour - 12) === 0 ? 12 : (hour - 12); }
  else { label = '夜'; h12 = (hour - 24) === 0 ? 12 : (hour - 24); }
  return `${label} ${String(h12).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const formatClockEN = (hour, minute) => {
  // 0-11: AM / 12-23: PM / 24-35: Night
  let label, h12;
  if (hour < 12) { label = 'AM'; h12 = hour === 0 ? 12 : hour; }
  else if (hour < 24) { label = 'PM'; h12 = (hour - 12) === 0 ? 12 : (hour - 12); }
  else { label = 'Night'; h12 = (hour - 24) === 0 ? 12 : (hour - 24); }
  return `${label} ${String(h12).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

/** 表示フォーマッタ */
export const formatForestoJP = ({ year, month, dayInMonth, rainbowIndex, weekdayJP, hour, minute }) => {
  const t = formatClockJP(hour, minute);
  if (month) {
    // 月は数字で表示
    return `森暦${year}年 ${month}月 ${dayInMonth}日（${weekdayJP}） ${t}`;
  }
  // 特別期間（虹の5日）
  const label = (CONFIG.RAINBOW_MODE === 'rainbow') ? '虹曜日' : '（曜日なし）';
  return `森暦${year}年 虹の${rainbowIndex}日 ${label} ${t}`;
};

export const formatForestoEN = ({ year, month, dayInMonth, rainbowIndex, weekdayEN, hour, minute }) => {
  const t = formatClockEN(hour, minute);
  if (month) return `Shinreki ${year}  ${month}/${dayInMonth} (${weekdayEN})  ${t}`;
  const label = (CONFIG.RAINBOW_MODE === 'rainbow') ? 'Rainbowday' : '(no weekday)';
  return `Shinreki ${year}  Rainbow ${rainbowIndex} ${label}  ${t}`;
};

// localeに応じて文字列を選択
const pickDisplay = (f, locale = 'ja') => locale.startsWith('en') ? f.displayEN : f.displayJP;

/** 例：HTMLへ描画 */
export const renderNow = (selector = '.foresto-time', { locale } = {}) => {
  const el = document.querySelector(selector);
  if (!el) return;
  const f = toForesto(new Date());
  const nowIso = new Date().toISOString().slice(0, 10);
  el.setAttribute('datetime', nowIso);
  el.setAttribute('data-foresto', `${f.year}-${String(f.month ?? 0).padStart(2, '0')}-${String(f.day ?? f.rainbowIndex).padStart(2, '0')}`);

  // ①引数 > ②<html lang> > ③ブラウザ設定 の優先順位で決定
  const docLang = document.documentElement?.lang || '';
  const navLang = (navigator.language || 'ja').toLowerCase();
  const lang = (locale || docLang || navLang).toLowerCase();

  el.textContent = pickDisplay(f, lang);
};
