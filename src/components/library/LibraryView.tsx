import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { MONTHS_DATA } from '../../data/months';
import { ALL_WEEKS, getWeekByNumber } from '../../data/weeksData';
import { WeekData, DayEntry } from '../../types';

interface LibraryViewProps {
  onSelectDay: (dayNumber: number) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onSelectDay }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [viewingWeekDetail, setViewingWeekDetail] = useState<WeekData | null>(null);

  // Filter weeks by selected month and search query
  const filteredWeeks = ALL_WEEKS.filter((week) => {
    const matchesMonth = selectedMonth === null || week.monthNumber === selectedMonth;
    if (!matchesMonth) return false;

    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();

    const matchesWeekInfo = 
      week.title.toLowerCase().includes(query) ||
      week.monthName.toLowerCase().includes(query) ||
      week.monthTheme.toLowerCase().includes(query) ||
      week.introduction.toLowerCase().includes(query) ||
      week.weeklyReflection.toLowerCase().includes(query);

    const matchesDays = week.days.some(
      (d) =>
        d.scriptureRef.toLowerCase().includes(query) ||
        d.scriptureText.toLowerCase().includes(query) ||
        d.truth.toLowerCase().includes(query) ||
        d.embrace.toLowerCase().includes(query) ||
        d.sacredStep.toLowerCase().includes(query)
    );

    return matchesWeekInfo || matchesDays;
  });

  return (
    <div className="pb-28">
      {/* Header Banner */}
      <div className="bg-[#1C2A39] text-[#F9F6F0] p-6 border-b border-[#D4AF37]/20">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            The 52-Week Curriculum
          </span>
          <h1 className="font-serif-sacred text-2xl sm:text-3xl font-bold">
            12 Months · 365 Affirmations
          </h1>
          <p className="text-xs sm:text-sm text-[#F9F6F0]/80 font-sans-sacred">
            A comprehensive journey from Identity and Grace, through Faith and Freedom, to Redemption.
          </p>

          {/* Search Box */}
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8B7B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scriptures, truths, or topics (e.g. shame, peace, fear)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-[#D4AF37]/30 rounded-xl text-sm text-[#F9F6F0] placeholder-[#F9F6F0]/50 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#D4AF37] p-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-5 space-y-6">
        {/* Month Selector Pills (Interactive Filters) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
              Filter by Month
            </span>
            {selectedMonth !== null && (
              <button
                onClick={() => setSelectedMonth(null)}
                className="text-xs text-[#D4AF37] hover:underline"
              >
                Show All Months
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedMonth(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedMonth === null
                  ? 'bg-[#1C2A39] text-[#D4AF37] shadow-xs'
                  : 'bg-white text-[#1C2A39] border border-[#D4AF37]/20 hover:bg-[#F9F6F0]'
              }`}
            >
              All 12 Months
            </button>
            {MONTHS_DATA.map((m) => {
              const isSelected = selectedMonth === m.monthNumber;
              return (
                <button
                  key={`lib-month-${m.monthNumber}`}
                  onClick={() => setSelectedMonth(isSelected ? null : m.monthNumber)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#1C2A39] text-[#D4AF37] shadow-xs'
                      : 'bg-white text-[#1C2A39] border border-[#D4AF37]/20 hover:bg-[#F9F6F0]'
                  }`}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Month Header Details if single month active */}
        {selectedMonth !== null && (
          <div className="bg-white border-l-4 border-[#D4AF37] border-y border-r border-[#D4AF37]/20 rounded-2xl p-5 shadow-xs">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Month {selectedMonth} Theme
            </span>
            <h2 className="font-serif-sacred text-xl font-bold text-[#1C2A39] mt-0.5">
              {MONTHS_DATA[selectedMonth - 1].theme}
            </h2>
            <p className="font-serif-sacred text-sm italic text-[#7A8B7B] mt-1">
              {MONTHS_DATA[selectedMonth - 1].scripture}
            </p>
            <p className="text-xs text-[#2B2B2B]/85 mt-2 leading-relaxed font-sans-sacred">
              {MONTHS_DATA[selectedMonth - 1].description}
            </p>
          </div>
        )}

        {/* Weeks List */}
        <div className="space-y-4">
          {filteredWeeks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#7A8B7B]/30 p-6">
              <BookOpen className="w-8 h-8 text-[#7A8B7B] mx-auto mb-2 opacity-50" />
              <p className="font-serif-sacred text-base font-bold text-[#1C2A39]">
                No matching devotionals found
              </p>
              <p className="text-xs text-[#7A8B7B] mt-1">
                Try searching for different keywords like “grace”, “peace”, “chains”, or “identity”.
              </p>
            </div>
          ) : (
            filteredWeeks.map((week) => {
              const isExpanded = expandedWeek === week.weekNumber;
              return (
                <div
                  key={week.weekNumber}
                  className="bg-white border border-[#D4AF37]/25 rounded-2xl overflow-hidden shadow-xs transition-shadow"
                >
                  {/* Week Accordion Header */}
                  <div
                    onClick={() => setExpandedWeek(isExpanded ? null : week.weekNumber)}
                    className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#F9F6F0]/50 transition-colors"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2 text-xs text-[#7A8B7B]">
                        <span className="font-semibold text-[#D4AF37]">
                          Week {week.weekNumber}
                        </span>
                        <span>·</span>
                        <span>{week.monthName}</span>
                        <span>·</span>
                        <span className="truncate">{week.monthTheme.split(':')[0]}</span>
                      </div>
                      <h3 className="font-serif-sacred text-lg font-bold text-[#1C2A39] mt-0.5">
                        {week.title}
                      </h3>
                    </div>
                    <div className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#7A8B7B]">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Expanded Content: Intro + 7 Days + Reflection */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-4">
                      {/* Weekly Introduction */}
                      <div className="bg-[#F9F6F0] p-3.5 rounded-xl border border-[#D4AF37]/20">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7A8B7B]">
                          Weekly Introduction
                        </span>
                        <p className="text-xs text-[#2B2B2B] leading-relaxed mt-1 font-sans-sacred">
                          {week.introduction}
                        </p>
                      </div>

                      {/* 7 Days Grid */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-[#1C2A39] block">
                          Daily Sacred S.T.E.P. Devotionals
                        </span>
                        {week.days.map((day) => (
                          <div
                            key={`week-${week.weekNumber}-day-${day.dayNumber}`}
                            onClick={() => onSelectDay(day.dayNumber)}
                            className="cursor-pointer p-3 rounded-xl border border-slate-100 hover:border-[#D4AF37]/40 hover:bg-[#F9F6F0]/60 transition-all flex items-start justify-between group"
                          >
                            <div className="flex-1 pr-2">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-bold text-[#1C2A39]">
                                  Day {day.dayNumber}
                                </span>
                                <span className="text-[#D4AF37] font-serif-sacred font-semibold">
                                  {day.scriptureRef}
                                </span>
                              </div>
                              <p className="text-xs text-[#2B2B2B]/90 line-clamp-1 mt-0.5 font-medium">
                                “{day.truth}”
                              </p>
                              <p className="font-script-sacred text-sm text-[#7A8B7B] line-clamp-1 mt-0.5">
                                {day.embrace}
                              </p>
                            </div>
                            <div className="min-h-[40px] flex items-center text-[#7A8B7B] group-hover:text-[#D4AF37] transition-colors">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Weekly Reflection */}
                      <div className="bg-[#1C2A39] text-[#F9F6F0] p-4 rounded-xl border border-[#D4AF37]/30">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D4AF37]">
                          Weekly Reflection
                        </span>
                        <p className="text-xs text-[#F9F6F0]/90 leading-relaxed mt-1 font-sans-sacred">
                          {week.weeklyReflection}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
