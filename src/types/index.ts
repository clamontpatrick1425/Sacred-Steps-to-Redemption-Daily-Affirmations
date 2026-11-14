export interface DayEntry {
  dayNumber: number; // 1 - 365
  weekNumber: number; // 1 - 52
  dayOfWeek: number; // 1 - 7
  scriptureRef: string;
  scriptureText: string;
  truth: string;
  embrace: string;
  sacredStep: string;
}

export interface WeekData {
  weekNumber: number;
  monthNumber: number;
  monthName: string;
  monthTheme: string;
  title: string;
  introduction: string;
  days: DayEntry[];
  weeklyReflection: string;
}

export interface MonthData {
  monthNumber: number;
  name: string;
  theme: string;
  scripture: string;
  description: string;
  weeks: number[];
}

export interface JournalRecord {
  dayNumber: number;
  date: string;
  reflection: string;
  completedStep: boolean;
  timestamp: number;
}

export interface PrayerItem {
  id: string;
  date: string;
  request: string;
  category: 'Sobriety' | 'Healing' | 'Relationships' | 'Courage' | 'Peace' | 'Gratitude';
  isAnswered: boolean;
  testimony?: string;
  answeredDate?: string;
}

export interface GratitudeEntry {
  dayIndex: number; // 1 to 30
  entry: string;
  date: string;
}

export interface MemoryVerse {
  monthNumber: number;
  monthName: string;
  reference: string;
  text: string;
  theme: string;
}

export type ActiveTab = 'today' | 'library' | 'sanctuary' | 'features' | 'journal';
