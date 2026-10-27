import { Tournament } from '../types';

/**
 * Омск = UTC+6, без перехода на летнее/зимнее время.
 * Считаем через Date.UTC, чтобы результат не зависел от часового пояса браузера.
 */
const OMSK_OFFSET_HOURS = 6;

const MONTHS: Record<string, number> = {
  // Родительный падеж — так даты записаны в arenaData.ts и в CMS.
  'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
  'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11,
  // Именительный падеж — на случай ручного ввода в админке.
  'январь': 0, 'февраль': 1, 'март': 2, 'апрель': 3, 'май': 4, 'июнь': 5,
  'июль': 6, 'август': 7, 'сентябрь': 8, 'октябрь': 9, 'ноябрь': 10, 'декабрь': 11,
  // Латиница.
  'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
  'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11,
};

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Дата старта турнира (ms UTC) из полей `date` + `time`.
 * Поддерживает «15 Ноября 2026», «2026-11-15» и время «12:00 Омск (09:00 МСК)».
 * Возвращает null, если дату разобрать не удалось.
 */
export const parseTournamentStart = (
  tournament: Pick<Tournament, 'date' | 'time'> | null | undefined
): number | null => {
  if (!tournament) return null;

  const dateStr = (tournament.date || '').trim();
  const timeStr = (tournament.time || '').trim();

  let year: number;
  let month: number;
  let day: number;

  const iso = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    year = Number(iso[1]);
    month = Number(iso[2]) - 1;
    day = Number(iso[3]);
  } else {
    const ru = dateStr.match(/(\d{1,2})\s+([А-Яа-яЁёA-Za-z]+)\s+(\d{4})/);
    if (!ru) return null;
    const monthIndex = MONTHS[ru[2].toLowerCase()];
    if (monthIndex === undefined) return null;
    day = Number(ru[1]);
    month = monthIndex;
    year = Number(ru[3]);
  }

  if (year < 2000 || year > 2100 || month < 0 || month > 11 || day < 1 || day > 31) {
    return null;
  }

  const hm = timeStr.match(/(\d{1,2}):(\d{2})/);
  const hours = hm ? Number(hm[1]) : 12;
  const minutes = hm ? Number(hm[2]) : 0;
  if (hours > 23 || minutes > 59) return null;

  const ms = Date.UTC(year, month, day, hours - OMSK_OFFSET_HOURS, minutes, 0);
  return Number.isNaN(ms) ? null : ms;
};

/** null = турнир уже начался (или дата не задана) — показываем LIVE, а не нули. */
export const getTimeLeft = (target: number | null, now: number = Date.now()): TimeLeft | null => {
  if (target === null) return null;
  const difference = target - now;
  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};
