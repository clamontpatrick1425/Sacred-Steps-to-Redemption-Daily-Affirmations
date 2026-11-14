import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Check, ArrowRight, Sun, Heart, Footprints } from 'lucide-react';
import { WeekData, DayEntry } from '../../types';
import { analyticsService } from '../../services/analyticsService';

interface WeeklyGraceRecapProps {
  week: WeekData;
  onOpenJournalUpsell: () => void;
  onSwitchToDailyStep: () => void;
}

export const WeeklyGraceRecap: React.FC<WeeklyGraceRecapProps> = ({
  week,
  onOpenJournalUpsell,
  onSwitchToDailyStep
}) => {
  const handleJournalCTA = () => {
    analyticsService.trackJournalUpsellClicked(week.monthName, 'weekly_grace_recap');
    onOpenJournalUpsell();
  };

  return (
    <div className="bg-[#F9F6F0] rounded-2xl border-2 border-[#D4AF37]/40 shadow-sm p-6 sm:p-8 space-y-6 text-[#2B2B2B]">
      {/* Header Banner */}
      <div className="text-center pb-2 border-b border-[#D4AF37]/25">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2A39] text-[#D4AF37] text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sabbath Day 7 · Weekly Grace Recap</span>
        </div>
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-bold text-[#1C2A39]">
          Week {week.weekNumber} in Review
        </h2>
        <p className="font-['Caveat',cursive] text-2xl text-[#D4AF37] mt-0.5">
          “{week.title}”
        </p>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#7A8B7B] mt-2 max-w-md mx-auto leading-relaxed">
          Take a slow breath. You have walked through seven days of healing truth. Review the seven anchors God gave you this week.
        </p>
      </div>

      {/* 7 Truths List */}
      <div className="space-y-3.5">
        {week.days.map((dayItem: DayEntry, idx: number) => (
          <div
            key={`weekly-recap-day-${dayItem.dayNumber}-${idx}`}
            className="bg-white border border-[#D4AF37]/25 rounded-xl p-4 shadow-xs transition-all hover:border-[#D4AF37]/60"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1C2A39] text-[#D4AF37] text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#1C2A39]">
                  Day {dayItem.dayNumber} · {dayItem.scriptureRef}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#7A8B7B]">
                Truth Anchor
              </span>
            </div>

            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm text-[#2B2B2B] leading-relaxed pl-7">
              {dayItem.truth}
            </p>

            <div className="mt-2.5 pt-2 border-t border-[#D4AF37]/15 pl-7 flex items-start gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider shrink-0 mt-0.5">
                Embrace:
              </span>
              <p className="font-['Cormorant_Garamond',serif] italic text-sm text-[#1C2A39]">
                “{dayItem.embrace}”
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Soft-Sell Journal Upsell Callout */}
      <div className="bg-[#1C2A39] text-[#F9F6F0] rounded-xl p-6 border-l-4 border-l-[#D4AF37] shadow-md text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
            Go Deeper in Reflection
          </span>
          <h4 className="font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#F9F6F0]">
            Ready to reflect? Open your {week.monthName} Transformation Journal.
          </h4>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#F9F6F0]/80">
            Write down your Sabbath inventory and process this week’s breakthroughs in the guided companion journal.
          </p>
        </div>

        <button
          onClick={handleJournalCTA}
          className="shrink-0 min-h-[46px] py-2.5 px-5 rounded-full bg-[#D4AF37] hover:bg-white text-[#1C2A39] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open {week.monthName} Journal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Switch to standard Day 7 view */}
      <div className="text-center pt-2">
        <button
          onClick={onSwitchToDailyStep}
          className="text-xs text-[#7A8B7B] hover:text-[#1C2A39] font-semibold underline underline-offset-4 cursor-pointer"
        >
          Switch to Standard Day 7 Single-Step View
        </button>
      </div>
    </div>
  );
};
