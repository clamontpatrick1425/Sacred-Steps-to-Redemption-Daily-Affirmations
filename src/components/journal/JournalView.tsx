import React, { useState, useEffect } from 'react';
import { 
  BookmarkCheck, 
  Calendar, 
  Search, 
  Download, 
  Heart, 
  Sparkles, 
  Award,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { storageService, WalkStats } from '../../services/storageService';
import { getDayByNumber, getWeekForDay } from '../../data/weeksData';
import { DayEntry } from '../../types';

interface JournalViewProps {
  onSelectDay: (dayNumber: number) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onSelectDay }) => {
  const [journalEntries, setJournalEntries] = useState<Record<number, { reflection: string; timestamp: number }>>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [stats, setStats] = useState<WalkStats>(storageService.getWalkStats());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewTab, setViewTab] = useState<'reflections' | 'favorites' | 'milestones'>('reflections');

  useEffect(() => {
    setJournalEntries(storageService.getJournalEntries());
    setCompletedSteps(storageService.getCompletedSteps());
    setFavorites(storageService.getFavorites());
    setStats(storageService.getWalkStats());
  }, []);

  const entryDays = Object.keys(journalEntries)
    .map(Number)
    .filter(dayNum => journalEntries[dayNum]?.reflection?.trim().length > 0)
    .sort((a, b) => b - a);

  const filteredDays = entryDays.filter(dayNum => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const entry = journalEntries[dayNum]?.reflection?.toLowerCase() || '';
    const day = getDayByNumber(dayNum);
    return (
      entry.includes(q) ||
      day.truth.toLowerCase().includes(q) ||
      day.scriptureRef.toLowerCase().includes(q) ||
      day.embrace.toLowerCase().includes(q)
    );
  });

  const handleExportJournal = () => {
    let exportText = `SACRED STEPS TO REDEMPTION - RECOVERY JOURNAL\n`;
    exportText += `Exported on: ${new Date().toLocaleDateString()}\n`;
    exportText += `Total Days Walked in Grace: ${stats.totalDaysWalked}\n`;
    exportText += `Sacred Steps Taken: ${completedSteps.length}\n\n`;
    exportText += `=======================================================\n\n`;

    entryDays.forEach(dayNum => {
      const day = getDayByNumber(dayNum);
      const entry = journalEntries[dayNum];
      exportText += `DAY ${dayNum} · ${day.scriptureRef}\n`;
      exportText += `Truth: ${day.truth}\n`;
      exportText += `Embrace: ${day.embrace}\n`;
      exportText += `Step: ${day.sacredStep}\n`;
      exportText += `Date: ${new Date(entry.timestamp).toLocaleDateString()}\n`;
      exportText += `Your Reflection:\n${entry.reflection}\n\n`;
      exportText += `-------------------------------------------------------\n\n`;
    });

    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SacredSteps_Journal_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const milestones = [
    {
      title: 'First Step Taken',
      desc: 'Completed your first sacred step in the recovery journey.',
      unlocked: completedSteps.length >= 1
    },
    {
      title: 'Week of Sustained Walking',
      desc: 'Walked 7 days with Christ-centered consistency.',
      unlocked: stats.totalDaysWalked >= 7
    },
    {
      title: 'Weight of Shame Released',
      desc: 'Engaged with Month 2: Releasing shame and receiving full grace.',
      unlocked: completedSteps.some(s => s >= 29 && s <= 56)
    },
    {
      title: 'Stronghold Breaker',
      desc: 'Engaged with Month 4: Naming strongholds and walking out of the cell.',
      unlocked: completedSteps.some(s => s >= 92 && s <= 119)
    },
    {
      title: 'A Heart Made Whole',
      desc: 'Engaged with Month 5: Deep emotional and relational healing.',
      unlocked: completedSteps.some(s => s >= 120 && s <= 147)
    },
    {
      title: 'Standing Firm in Grace',
      desc: 'Achieved 30+ completed sacred steps without giving up.',
      unlocked: completedSteps.length >= 30
    }
  ];

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="bg-[#1C2A39] text-[#F9F6F0] p-6 border-b border-[#D4AF37]/20">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Personal Healing Ledger
          </span>
          <h1 className="font-serif-sacred text-2xl sm:text-3xl font-bold">
            Journal & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-[#F9F6F0]/80 font-sans-sacred">
            “Consistency over perfection.” Track your steps, reflections, and answered prayers.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-3">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-semibold">
                Days in Grace
              </span>
              <span className="font-serif-sacred text-2xl font-bold text-[#F9F6F0] tabular-nums">
                {stats.totalDaysWalked}
              </span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-semibold">
                Steps Taken
              </span>
              <span className="font-serif-sacred text-2xl font-bold text-[#F9F6F0] tabular-nums">
                {completedSteps.length}
              </span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-semibold">
                Saved Days
              </span>
              <span className="font-serif-sacred text-2xl font-bold text-[#F9F6F0] tabular-nums">
                {favorites.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-5 space-y-5">
        {/* Sub Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setViewTab('reflections')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewTab === 'reflections'
                  ? 'bg-[#1C2A39] text-[#D4AF37]'
                  : 'bg-white text-[#1C2A39] border border-[#D4AF37]/25'
              }`}
            >
              My Reflections ({entryDays.length})
            </button>
            <button
              onClick={() => setViewTab('favorites')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewTab === 'favorites'
                  ? 'bg-[#1C2A39] text-[#D4AF37]'
                  : 'bg-white text-[#1C2A39] border border-[#D4AF37]/25'
              }`}
            >
              Saved ({favorites.length})
            </button>
            <button
              onClick={() => setViewTab('milestones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewTab === 'milestones'
                  ? 'bg-[#1C2A39] text-[#D4AF37]'
                  : 'bg-white text-[#1C2A39] border border-[#D4AF37]/25'
              }`}
            >
              Milestones
            </button>
          </div>

          {viewTab === 'reflections' && entryDays.length > 0 && (
            <button
              onClick={handleExportJournal}
              title="Download Journal as Text File"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#1C2A39] rounded-lg text-xs font-semibold border border-[#D4AF37]/30 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Export</span>
            </button>
          )}
        </div>

        {/* TAB: REFLECTIONS */}
        {viewTab === 'reflections' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Search */}
            {entryDays.length > 0 && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8B7B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your journal entries..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D4AF37]/30 rounded-xl text-xs text-[#1C2A39] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            )}

            {filteredDays.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-[#7A8B7B]/30 p-8 text-center space-y-2">
                <BookmarkCheck className="w-8 h-8 text-[#7A8B7B] mx-auto opacity-50" />
                <h3 className="font-serif-sacred text-lg font-bold text-[#1C2A39]">
                  No Journal Entries Yet
                </h3>
                <p className="text-xs text-[#7A8B7B] max-w-xs mx-auto">
                  When you write reflections on any day’s Sacred Step, they will be preserved here in your personal recovery ledger.
                </p>
              </div>
            ) : (
              filteredDays.map((dayNum, dIdx) => {
                const day = getDayByNumber(dayNum);
                const entry = journalEntries[dayNum];
                return (
                  <div
                    key={`journal-entry-${dayNum}-${dIdx}`}
                    className="bg-white border border-[#D4AF37]/25 rounded-2xl p-4 shadow-xs space-y-2 hover:border-[#D4AF37] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1C2A39] text-[#D4AF37] text-xs font-bold flex items-center justify-center">
                          {dayNum}
                        </span>
                        <span className="font-serif-sacred text-base font-bold text-[#1C2A39]">
                          {day.scriptureRef}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#7A8B7B]">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-[#7A8B7B] italic font-serif-sacred">
                      “{day.truth}”
                    </p>

                    <div className="bg-[#F9F6F0] p-3 rounded-xl border border-[#D4AF37]/20">
                      <p className="text-xs text-[#2B2B2B] leading-relaxed whitespace-pre-wrap font-sans-sacred">
                        {entry.reflection}
                      </p>
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => onSelectDay(dayNum)}
                        className="text-xs font-semibold text-[#D4AF37] flex items-center gap-1 hover:underline"
                      >
                        <span>View Day {dayNum} Devotional</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB: FAVORITES */}
        {viewTab === 'favorites' && (
          <div className="space-y-3 animate-fadeIn">
            {Array.from(new Set(favorites)).map((favDayNum, fIdx) => {
              const day = getDayByNumber(favDayNum);
              return (
                <div
                  key={`favorite-day-${favDayNum}-${fIdx}`}
                  onClick={() => onSelectDay(favDayNum)}
                  className="bg-white border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-2xl p-4 cursor-pointer shadow-xs transition-all flex items-start justify-between group"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#1C2A39]">Day {day.dayNumber}</span>
                      <span className="text-[#D4AF37] font-serif-sacred font-bold">{day.scriptureRef}</span>
                    </div>
                    <p className="text-sm font-medium text-[#1C2A39] mt-1 font-serif-sacred">
                      {day.scriptureText}
                    </p>
                    <p className="font-script-sacred text-base text-[#7A8B7B] mt-1">
                      “{day.embrace}”
                    </p>
                  </div>
                  <div className="min-h-[44px] flex items-center text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB: MILESTONES */}
        {viewTab === 'milestones' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-white border-l-4 border-[#D4AF37] p-4 rounded-xl shadow-xs">
              <h3 className="font-serif-sacred text-lg font-bold text-[#1C2A39]">
                Milestones of Sustained Freedom
              </h3>
              <p className="text-xs text-[#7A8B7B] mt-0.5">
                Every step taken rewires the mind. In God’s economy, even the smallest step is honored.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    m.unlocked
                      ? 'bg-white border-amber-300 shadow-xs'
                      : 'bg-white/50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      m.unlocked ? 'bg-[#D4AF37] text-[#1C2A39]' : 'bg-slate-200 text-slate-400'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif-sacred font-bold text-base text-[#1C2A39]">
                      {m.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#7A8B7B] leading-relaxed">
                    {m.desc}
                  </p>
                  <div className="mt-2 text-[11px] font-semibold">
                    {m.unlocked ? (
                      <span className="text-emerald-700">✓ Achieved in Grace</span>
                    ) : (
                      <span className="text-slate-400">In Progress</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
