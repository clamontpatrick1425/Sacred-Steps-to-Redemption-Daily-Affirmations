import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, BookOpen, ArrowRight, X, HeartHandshake } from 'lucide-react';
import { WeekData } from '../../types';
import { analyticsService } from '../../services/analyticsService';

interface MilestoneCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  week: WeekData;
  onOpenJournalUpsell: () => void;
}

export const MilestoneCelebrationModal: React.FC<MilestoneCelebrationModalProps> = ({
  isOpen,
  onClose,
  week,
  onOpenJournalUpsell
}) => {
  if (!isOpen) return null;

  const handleJournalCTA = () => {
    analyticsService.trackJournalUpsellClicked(week.monthName, 'milestone_modal');
    onClose();
    onOpenJournalUpsell();
  };

  return (
    <AnimatePresence>
      <div key="milestone-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/85 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-[#F9F6F0] rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 text-[#2B2B2B] text-center my-auto"
        >
          <button
            onClick={onClose}
            aria-label="Close Celebration"
            className="absolute top-4 right-4 p-2 text-[#7A8B7B] hover:text-[#1C2A39] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gentle Sun / Milestone Badge */}
          <div className="w-16 h-16 rounded-full bg-[#1C2A39] border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Sparkles className="w-8 h-8 animate-pulse text-[#D4AF37]" />
          </div>

          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-widest text-[#7A8B7B] font-bold">
            Milestone Reached in Grace
          </span>

          <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-bold text-[#1C2A39] mt-1">
            Week {week.weekNumber} Complete!
          </h2>

          <p className="font-['Caveat',cursive] text-2xl text-[#D4AF37] mt-1">
            “Seven steps walked in truth. Seven victories covered in grace.”
          </p>

          {/* Week Recap Summary Card */}
          <div className="bg-white border border-[#D4AF37]/30 rounded-xl p-5 my-5 text-left shadow-xs space-y-2">
            <div className="text-xs uppercase font-bold text-[#7A8B7B] tracking-wider">
              Month {week.monthNumber} · {week.monthName}
            </div>
            <div className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#1C2A39]">
              {week.title}
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#2B2B2B]/85 leading-relaxed">
              {week.introduction}
            </p>
          </div>

          {/* Soft-sell / Journal Reflection CTA */}
          <div className="bg-[#7A8B7B]/10 rounded-xl p-4 border border-[#D4AF37]/30 mb-5 text-xs text-[#1C2A39] leading-relaxed">
            <p className="font-medium font-['Plus_Jakarta_Sans',sans-serif]">
              Ready to process this week’s breakthroughs? Reflect deeply in your <strong>{week.monthName} Transformation Journal</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleJournalCTA}
              className="w-full min-h-[48px] py-3 px-6 rounded-full bg-[#1C2A39] hover:bg-[#D4AF37] text-[#F9F6F0] hover:text-[#1C2A39] font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open {week.monthName} Journal Prompts</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs text-[#7A8B7B] hover:text-[#1C2A39] font-medium font-['Plus_Jakarta_Sans',sans-serif] cursor-pointer"
            >
              Continue to Next Week
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
