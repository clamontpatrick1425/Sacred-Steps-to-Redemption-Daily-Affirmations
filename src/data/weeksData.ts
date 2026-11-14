import { WeekData, DayEntry } from '../types';
import { WEEKS_1_TO_13 } from './weeks1to13';
import { WEEKS_14_TO_26 } from './weeks14to26';
import { WEEKS_27_TO_39 } from './weeks27to39';
import { WEEKS_40_TO_52 } from './weeks40to52';

export const ALL_WEEKS: WeekData[] = [
  ...WEEKS_1_TO_13,
  ...WEEKS_14_TO_26,
  ...WEEKS_27_TO_39,
  ...WEEKS_40_TO_52
];

// Map of all 365 days
const ALL_DAYS_MAP = new Map<number, DayEntry>();
ALL_WEEKS.forEach(week => {
  week.days.forEach(day => {
    ALL_DAYS_MAP.set(day.dayNumber, day);
  });
});

export const ALL_DAYS: DayEntry[] = Array.from(ALL_DAYS_MAP.values()).sort(
  (a, b) => a.dayNumber - b.dayNumber
);

export function getDayByNumber(dayNumber: number): DayEntry {
  const bounded = Math.max(1, Math.min(365, dayNumber));
  return ALL_DAYS_MAP.get(bounded) || ALL_DAYS[0];
}

export function getWeekByNumber(weekNumber: number): WeekData {
  const bounded = Math.max(1, Math.min(52, weekNumber));
  return ALL_WEEKS.find(w => w.weekNumber === bounded) || ALL_WEEKS[0];
}

export function getWeekForDay(dayNumber: number): WeekData {
  const day = getDayByNumber(dayNumber);
  return getWeekByNumber(day.weekNumber);
}

export function getCurrentCalendarDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return Math.max(1, Math.min(365, dayOfYear));
}
