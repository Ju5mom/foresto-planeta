/** ================ Foresto ⇄ Earth Calendar Converter (single file) ================ */

/** ===== 設定 ===== */
export const CONFIG = {
  EPOCH_EARTH_ISO: '2025-03-01T00:00:00Z',
  EPOCH_FORESTO: { year: 2785, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
  HOURS_PER_FORESTO_DAY: 36,
  MONTHS_PER_YEAR: 8,
  DAYS_PER_MONTH: 24,
  RAINBOW_DAYS: 5,
  RAINBOW_MODE: 'freeze', // 'freeze' | 'rainbow'
  WEEKDAYS_JP: ['友(とも)曜日', '火(か）曜日', '水(すい）曜日', '木(もく）曜日', '風(かぜ）曜日', '瑠璃(るり）曜日', '土(ど)曜日', '虹(にじ)曜日'],
  WEEKDAYS_EN: ['Kinday', 'Fireday', 'Waterday', 'Treeday', 'Windday', 'Azureday', 'Earthday', 'Rainbowday'],
  MONTHS_JP: ['芽月', '風月', '雨月', '森月', '蒼月', '実月', '土月', '霜月'],
  MONTHS_EN: ['Bud', 'Wind', 'Rain', 'Forest', 'Azure', 'Harvest', 'Earth', 'Frost'],
};

/** ===== 内部定数 ===== */
export const MS_PER_HOUR = 3600_000;
export const MS_PER_FORESTO_DAY = CONFIG.HOURS_PER_FORESTO_DAY * MS_PER_HOUR;
export const REGULAR_DAYS_PER_YEAR = CONFIG.MONTHS_PER_YEAR * CONFIG.DAYS_PER_MONTH; // 192
export const CIVIL_DAYS_PER_YEAR = REGULAR_DAYS_PER_YEAR + CONFIG.RAINBOW_DAYS;      // 197
export const EPOCH_EARTH = new Date(CONFIG.EPOCH_EARTH_ISO);

/** ===== ユーティリティ ===== */
export const pad = (value, width = 2) => String(value).padStart(width, '0');

export const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;

export const divFloor = (value, divisor) => {
  const quotient = Math.trunc(value / divisor);
  if (value >= 0 || value % divisor === 0) return quotient;
  return quotient - 1;
};

/** 年内の曜日インデックス（特別期間は freeze:null / rainbow:7） */
export const weekdayIndexWithinYear = (dayOfYear1based) => {
  if (dayOfYear1based <= REGULAR_DAYS_PER_YEAR) {
    return (dayOfYear1based - 1) % CONFIG.WEEKDAYS_JP.length;
  }
  if (CONFIG.RAINBOW_MODE === 'rainbow') return CONFIG.WEEKDAYS_JP.length - 1;
  return null;
};

/** ===== 36hを子ども向けにラベル化 ===== */
const formatClockJP = (hour, minute) => {
  // 0-11: 午前 / 12-23: 午後 / 24-35: 夜
  let label;
  let h12;

  if (hour < 12) {
    label = '午前（ごぜん）';
    h12 = hour === 0 ? 12 : hour;
  } else if (hour < 24) {
    label = '午後（ごご）';
    h12 = (hour - 12) === 0 ? 12 : (hour - 12);
  } else {
    label = '夜';
    h12 = (hour - 24) === 0 ? 12 : (hour - 24);
  }

  return `${label} ${pad(h12, 2)}:${pad(minute, 2)}`;
};

const formatClockEN = (hour, minute) => {
  // 0-11: AM / 12-23: PM / 24-35: Night
  let label;
  let h12;

  if (hour < 12) {
    label = 'AM';
    h12 = hour === 0 ? 12 : hour;
  } else if (hour < 24) {
    label = 'PM';
    h12 = (hour - 12) === 0 ? 12 : (hour - 12);
  } else {
    label = 'Night';
    h12 = (hour - 24) === 0 ? 12 : (hour - 24);
  }

  return `${label} ${pad(h12, 2)}:${pad(minute, 2)}`;
};

/** ===== 表示フォーマッタ ===== */
export const formatForestoJP = ({
  year,
  month,
  dayInMonth,
  rainbowIndex,
  weekdayJP,
  hour,
  minute,
}) => {
  const clockText = formatClockJP(hour, minute);

  if (month) {
    return `森暦（しんれき）${year} 年 ${month} 月 ${dayInMonth} 日 （ ${weekdayJP} ） ${clockText}`;
  }

  const weekdayLabel =
    CONFIG.RAINBOW_MODE === 'rainbow' ? '虹曜日' : '（曜日なし）';

  return `森暦${year}年 虹の${rainbowIndex}日 ${weekdayLabel} ${clockText}`;
};

export const formatForestoEN = ({
  year,
  month,
  dayInMonth,
  rainbowIndex,
  weekdayEN,
  hour,
  minute,
}) => {
  const clockText = formatClockEN(hour, minute);

  if (month) {
    return `Forest Reckoning ${year} ${month} / ${dayInMonth} (${weekdayEN}) ${clockText}`;
  }

  const weekdayLabel =
    CONFIG.RAINBOW_MODE === 'rainbow' ? 'Rainbowday' : '(no weekday)';

  return `Forest Reckoning ${year} - ${rainbowIndex} Rainbow Day - ${weekdayLabel}  ${clockText}`;
};

/** ===== Earth → Foresto ===== */
export const toForesto = (dateEarth = new Date()) => {
  const msSinceEpoch = dateEarth.getTime() - EPOCH_EARTH.getTime();
  const forestoDaysFloat = msSinceEpoch / MS_PER_FORESTO_DAY;

  const totalDays = Math.floor(forestoDaysFloat);

  let dayFraction = forestoDaysFloat - totalDays;
  if (dayFraction < 0) dayFraction += 1;

  const yearOffset = Math.floor(divFloor(totalDays, CIVIL_DAYS_PER_YEAR));
  const year = CONFIG.EPOCH_FORESTO.year + yearOffset;

  const dayOfYear = mod(totalDays, CIVIL_DAYS_PER_YEAR) + 1; // 1..197

  let month = null;
  let dayInMonth = null;
  let rainbowIndex = null;

  if (dayOfYear <= REGULAR_DAYS_PER_YEAR) {
    month = Math.floor((dayOfYear - 1) / CONFIG.DAYS_PER_MONTH) + 1; // 1..8
    dayInMonth = ((dayOfYear - 1) % CONFIG.DAYS_PER_MONTH) + 1;      // 1..24
  } else {
    rainbowIndex = dayOfYear - REGULAR_DAYS_PER_YEAR;                // 1..5
  }

  const weekdayIndex = weekdayIndexWithinYear(dayOfYear);
  const weekdayJP = weekdayIndex === null ? null : CONFIG.WEEKDAYS_JP[weekdayIndex];
  const weekdayEN = weekdayIndex === null ? null : CONFIG.WEEKDAYS_EN[weekdayIndex];
  const weekdayIconSrc = weekdayIndex === null ? null : `./img/weekday-icons/${weekdayIndex}.webp`;

  const totalSeconds = Math.floor(dayFraction * CONFIG.HOURS_PER_FORESTO_DAY * 3600);
  const hour = Math.floor(totalSeconds / 3600);
  const minute = Math.floor((totalSeconds % 3600) / 60);
  const second = totalSeconds % 60;

  return {
    year,
    month,
    day: dayInMonth,
    rainbowIndex,
    dayOfYear,
    weekday: { index: weekdayIndex, jp: weekdayJP, en: weekdayEN },
    weekdayIconSrc,
    time: { hour, minute, second },
    displayJP: formatForestoJP({ year, month, dayInMonth, rainbowIndex, weekdayJP, hour, minute }),
    displayEN: formatForestoEN({ year, month, dayInMonth, rainbowIndex, weekdayEN, hour, minute }),
  };
};

/** ===== Foresto → Earth ===== */
export const toEarth = (forestoDate) => {
  const {
    year,
    month,
    day,
    hour = 0,
    minute = 0,
    second = 0,
    rainbowIndex = null,
  } = forestoDate;

  const yearOffset = year - CONFIG.EPOCH_FORESTO.year;
  let totalCivilDays = yearOffset * CIVIL_DAYS_PER_YEAR;

  if (month && day) {
    totalCivilDays += (month - 1) * CONFIG.DAYS_PER_MONTH + (day - 1);
  } else if (rainbowIndex) {
    totalCivilDays += REGULAR_DAYS_PER_YEAR + (rainbowIndex - 1);
  } else {
    throw new Error('Invalid Foresto date: need (month & day) or rainbowIndex');
  }

  const totalMilliseconds =
    totalCivilDays * MS_PER_FORESTO_DAY +
    (hour * 3600 + minute * 60 + second) * 1000;

  return new Date(EPOCH_EARTH.getTime() + totalMilliseconds);
};

/** localeに応じて文字列を選択 */
const pickDisplay = (forestoResult, locale = 'ja') =>
  locale.startsWith('en') ? forestoResult.displayEN : forestoResult.displayJP;

const renderForestoTable = (tableObj, forestoNow, locale = 'ja') => {
  const isEn = locale.startsWith('en');
  const isRainbowPeriod = Boolean(forestoNow.rainbowIndex)

  if (isEn) {
    tableObj.year.textContent = `${forestoNow.year} `;
  } else {
    tableObj.year.textContent = `${forestoNow.year} 年`;
  }

  if (isRainbowPeriod) {//虹期間 & freezeモード
    if (isEn) {
      const weekdayLabel =
        CONFIG.RAINBOW_MODE === 'rainbow' ? 'Rainbowday' : '(no weekday)';
      tableObj.date.textContent = `${forestoNow.rainbowIndex} Rainbow Day`;
      tableObj.weekdayText.textContent = weekdayLabel;
      tableObj.weekdayIcon.src = "./img/weekday-icons/7.webp"; // 虹曜日のアイコンパス
      tableObj.time.textContent = formatClockEN(forestoNow.time.hour, forestoNow.time.minute);
    } else {
      const weekdayLabel =
        CONFIG.RAINBOW_MODE === 'rainbow' ? '虹曜日' : '（曜日なし）';

      tableObj.date.textContent = `虹の${forestoNow.rainbowIndex}日`;
      tableObj.weekdayText.textContent = weekdayLabel;
      tableObj.weekdayIcon.src = "./img/weekday-icons/7.webp"; // 虹曜日のアイコンパス
      tableObj.time.textContent = formatClockJP(forestoNow.time.hour, forestoNow.time.minute);
    }

  } else { // 通常期間
    const month = forestoNow.month;
    const day = forestoNow.day;
    if (isEn) {
      tableObj.date.textContent = `${month} / ${day}`;
      tableObj.weekdayText.textContent = forestoNow.weekday.en;
      tableObj.weekdayIcon.src = forestoNow.weekdayIconSrc;
      tableObj.time.textContent = formatClockEN(forestoNow.time.hour, forestoNow.time.minute);
    } else {
      tableObj.date.textContent = `${month} 月 ${day} 日`;
      tableObj.weekdayText.textContent = forestoNow.weekday.jp;
      tableObj.weekdayIcon.src = forestoNow.weekdayIconSrc;
      tableObj.time.textContent = formatClockJP(forestoNow.time.hour, forestoNow.time.minute);
    }
  }
}

/** 例：HTMLへ描画 */
export const renderNow = (tableSelector = '#foresto-time-table', selector = '.foresto-time', { locale } = {}) => {
  const element = document.querySelector(selector);
  const table = document.querySelector(tableSelector);
  if (!element || !table) return;

  const tableObj = {
    year: table.querySelector('[data-foresto="year"]'),
    date: table.querySelector('[data-foresto="date"]'),
    weekdayText: table.querySelector('[data-foresto="weekday-text"]'),
    weekdayIcon: table.querySelector('[data-foresto="weekday-icon"]'),
    time: table.querySelector('[data-foresto="time"]'),
  }

  const forestoNow = toForesto(new Date());
  const nowIso = new Date().toISOString().slice(0, 10);

  element.setAttribute('datetime', nowIso);
  element.setAttribute(
    'data-foresto',
    `${forestoNow.year}-${pad(forestoNow.month ?? 0, 2)}-${pad(forestoNow.day ?? forestoNow.rainbowIndex, 2)}`
  );

  const docLang = document.documentElement?.lang || '';
  const navLang = (navigator.language || 'ja').toLowerCase();
  const resolvedLang = (locale || docLang || navLang).toLowerCase();

  element.textContent = pickDisplay(forestoNow, resolvedLang);
  renderForestoTable(tableObj, forestoNow, resolvedLang);
};