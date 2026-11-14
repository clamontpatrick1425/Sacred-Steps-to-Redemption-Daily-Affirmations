import { PrayerItem, GratitudeEntry } from '../types';

const STORAGE_KEYS = {
  JOURNAL_ENTRIES: 'sacred_steps_journal_entries',
  COMPLETED_STEPS: 'sacred_steps_completed_steps',
  FAVORITES: 'sacred_steps_favorites',
  MEMORIZED_VERSES: 'sacred_steps_memorized_verses',
  GRATITUDE_ITEMS: 'sacred_steps_gratitude_items',
  PRAYERS: 'sacred_steps_prayers',
  WALK_STATS: 'sacred_steps_walk_stats',
  ACTIVE_DAY: 'sacred_steps_active_day',
  GRACE_MODE: 'sacred_steps_grace_mode'
};

export interface WalkStats {
  totalDaysWalked: number;
  totalStepsCompleted: number;
  lastActiveDate: string; // YYYY-MM-DD
  graceActive: boolean;
  streakCount: number; // Gentle count that never shames
}

const DEFAULT_PRAYERS: PrayerItem[] = [
  {
    id: 'p1',
    date: '2026-09-20',
    request: 'For total renewal of the mind and peace over racing thoughts during the 3pm slump.',
    category: 'Peace',
    isAnswered: true,
    testimony: 'God met me with His still presence. Took a quiet walk and repeated Week 35, Day 1.',
    answeredDate: '2026-09-22'
  },
  {
    id: 'p2',
    date: '2026-09-24',
    request: 'Humility and gentle words for upcoming amends conversation with my brother.',
    category: 'Relationships',
    isAnswered: false
  },
  {
    id: 'p3',
    date: '2026-09-25',
    request: 'Deliverance from old coping triggers and gratitude for new morning mercies.',
    category: 'Sobriety',
    isAnswered: false
  }
];

export const storageService = {
  getJournalEntries(): Record<number, { reflection: string; timestamp: number }> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveJournalEntry(dayNumber: number, reflection: string) {
    try {
      const current = this.getJournalEntries();
      current[dayNumber] = {
        reflection,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(current));
    } catch (e) {
      console.error(e);
    }
  },

  getCompletedSteps(): number[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return Array.from(new Set(parsed.map(Number).filter(n => !isNaN(n))));
        }
      }
      return [1, 2]; // Initial sample completed
    } catch {
      return [1, 2];
    }
  },

  toggleCompletedStep(dayNumber: number): boolean {
    try {
      const steps = this.getCompletedSteps();
      const index = steps.indexOf(dayNumber);
      let isCompleted = false;
      if (index > -1) {
        steps.splice(index, 1);
        isCompleted = false;
      } else {
        steps.push(dayNumber);
        isCompleted = true;
      }
      const unique = Array.from(new Set(steps));
      localStorage.setItem(STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(unique));
      this.updateStepCompletionStats(unique.length);
      return isCompleted;
    } catch {
      return false;
    }
  },

  setCompletedStep(dayNumber: number, completed: boolean): void {
    try {
      const steps = this.getCompletedSteps();
      const index = steps.indexOf(dayNumber);
      if (completed && index === -1) {
        steps.push(dayNumber);
      } else if (!completed && index > -1) {
        steps.splice(index, 1);
      }
      const unique = Array.from(new Set(steps));
      localStorage.setItem(STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(unique));
      this.updateStepCompletionStats(unique.length);
    } catch {
      // ignore storage errors
    }
  },

  getFavorites(): number[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return Array.from(new Set(parsed.map(Number).filter(n => !isNaN(n))));
        }
      }
      return [1, 8, 22, 50];
    } catch {
      return [1, 8, 22, 50];
    }
  },

  toggleFavorite(dayNumber: number): boolean {
    try {
      const favorites = this.getFavorites();
      const index = favorites.indexOf(dayNumber);
      let isFav = false;
      if (index > -1) {
        favorites.splice(index, 1);
        isFav = false;
      } else {
        favorites.push(dayNumber);
        isFav = true;
      }
      const unique = Array.from(new Set(favorites));
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(unique));
      return isFav;
    } catch {
      return false;
    }
  },

  getWalkStats(): WalkStats {
    const todayStr = new Date().toISOString().split('T')[0];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WALK_STATS);
      if (data) {
        const stats: WalkStats = JSON.parse(data);
        // Check if day changed
        if (stats.lastActiveDate !== todayStr) {
          // Check if missed days -> activate Grace Mode gently without zeroing
          const lastDate = new Date(stats.lastActiveDate);
          const currentDate = new Date(todayStr);
          const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

          if (diffDays > 1) {
            stats.graceActive = true; // Grace Mode triggered
          }
          stats.totalDaysWalked += 1;
          stats.lastActiveDate = todayStr;
          localStorage.setItem(STORAGE_KEYS.WALK_STATS, JSON.stringify(stats));
        }
        return stats;
      }
    } catch {
      // Fallback
    }

    const initial: WalkStats = {
      totalDaysWalked: 14,
      totalStepsCompleted: 12,
      lastActiveDate: todayStr,
      graceActive: false,
      streakCount: 7
    };
    try {
      localStorage.setItem(STORAGE_KEYS.WALK_STATS, JSON.stringify(initial));
    } catch {
      // ignore
    }
    return initial;
  },

  setGraceMode(active: boolean) {
    try {
      const stats = this.getWalkStats();
      stats.graceActive = active;
      localStorage.setItem(STORAGE_KEYS.WALK_STATS, JSON.stringify(stats));
    } catch {
      // ignore
    }
  },

  updateStepCompletionStats(totalCompleted: number) {
    try {
      const stats = this.getWalkStats();
      stats.totalStepsCompleted = totalCompleted;
      localStorage.setItem(STORAGE_KEYS.WALK_STATS, JSON.stringify(stats));
    } catch {
      // ignore
    }
  },

  // Memorized verses
  getMemorizedVerses(): number[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMORIZED_VERSES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return Array.from(new Set(parsed.map(Number).filter(n => !isNaN(n))));
        }
      }
      return [1, 2];
    } catch {
      return [1, 2];
    }
  },

  toggleMemorizedVerse(monthNumber: number): boolean {
    try {
      const list = this.getMemorizedVerses();
      const idx = list.indexOf(monthNumber);
      let memorized = false;
      if (idx > -1) {
        list.splice(idx, 1);
        memorized = false;
      } else {
        list.push(monthNumber);
        memorized = true;
      }
      const unique = Array.from(new Set(list));
      localStorage.setItem(STORAGE_KEYS.MEMORIZED_VERSES, JSON.stringify(unique));
      return memorized;
    } catch {
      return false;
    }
  },

  // Gratitude entries
  getGratitudeEntries(): Record<number, GratitudeEntry> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GRATITUDE_ITEMS);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    // Initial sample
    return {
      1: { dayIndex: 1, entry: 'Waking up clear-headed and grateful for God’s quiet morning mercy.', date: '2026-09-24' },
      2: { dayIndex: 2, entry: 'The friend who picked up the phone when I felt the old shame rising.', date: '2026-09-25' }
    };
  },

  saveGratitudeEntry(dayIndex: number, text: string) {
    try {
      const entries = this.getGratitudeEntries();
      entries[dayIndex] = {
        dayIndex,
        entry: text,
        date: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEYS.GRATITUDE_ITEMS, JSON.stringify(entries));
    } catch (e) {
      console.error(e);
    }
  },

  // Prayer list
  getPrayers(): PrayerItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRAYERS);
      return data ? JSON.parse(data) : DEFAULT_PRAYERS;
    } catch {
      return DEFAULT_PRAYERS;
    }
  },

  savePrayers(prayers: PrayerItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(prayers));
    } catch (e) {
      console.error(e);
    }
  },

  // Backup & Restore
  exportBackup(): string {
    const backupData = {
      app: 'Sacred Steps Daily Grace',
      version: 1,
      exportedAt: new Date().toISOString(),
      journalEntries: this.getJournalEntries(),
      completedSteps: this.getCompletedSteps(),
      favorites: this.getFavorites(),
      memorizedVerses: this.getMemorizedVerses(),
      gratitudeEntries: this.getGratitudeEntries(),
      prayers: this.getPrayers(),
      walkStats: this.getWalkStats()
    };
    return JSON.stringify(backupData, null, 2);
  },

  restoreBackup(jsonString: string): { success: boolean; message: string; count?: number } {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'Invalid backup file format.' };
      }
      if (data.journalEntries) {
        localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(data.journalEntries));
      }
      if (Array.isArray(data.completedSteps)) {
        localStorage.setItem(STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(data.completedSteps));
      }
      if (Array.isArray(data.favorites)) {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(data.favorites));
      }
      if (Array.isArray(data.memorizedVerses)) {
        localStorage.setItem(STORAGE_KEYS.MEMORIZED_VERSES, JSON.stringify(data.memorizedVerses));
      }
      if (data.gratitudeEntries) {
        localStorage.setItem(STORAGE_KEYS.GRATITUDE_ITEMS, JSON.stringify(data.gratitudeEntries));
      }
      if (Array.isArray(data.prayers)) {
        localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(data.prayers));
      }
      if (data.walkStats) {
        localStorage.setItem(STORAGE_KEYS.WALK_STATS, JSON.stringify(data.walkStats));
      }
      return {
        success: true,
        message: 'Your sacred walk, journals, prayers, and milestones have been fully restored.'
      };
    } catch {
      return { success: false, message: 'Unable to parse backup data. Please check the file format.' };
    }
  },

  restoreDefaults(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_STEPS);
      localStorage.removeItem(STORAGE_KEYS.FAVORITES);
      localStorage.removeItem(STORAGE_KEYS.MEMORIZED_VERSES);
      localStorage.removeItem(STORAGE_KEYS.GRATITUDE_ITEMS);
      localStorage.removeItem(STORAGE_KEYS.PRAYERS);
      localStorage.removeItem(STORAGE_KEYS.WALK_STATS);
      localStorage.removeItem(STORAGE_KEYS.GRACE_MODE);
    } catch (e) {
      console.error(e);
    }
  }
};
