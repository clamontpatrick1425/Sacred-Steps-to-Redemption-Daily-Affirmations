import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ExternalLink, Download, Check, Sparkles, Heart } from 'lucide-react';
import { getJournalPageReference, MONTHLY_JOURNALS, MonthlyJournalMeta } from '../../data/journalsData';
import { analyticsService } from '../../services/analyticsService';
import { MonthlySampleLeadMagnet } from '../lead/MonthlySampleLeadMagnet';

interface JournalUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  source?: string;
  onOpenSampleLeadMagnet?: (monthNumber: number) => void;
}

export const JournalUpsellModal: React.FC<JournalUpsellModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  source = 'contextual_upsell',
  onOpenSampleLeadMagnet
}) => {
  const [showSampleLeadMagnet, setShowSampleLeadMagnet] = React.useState<boolean>(false);
  if (!isOpen) return null;

  const refInfo = getJournalPageReference(dayNumber);
  const journal: MonthlyJournalMeta = MONTHLY_JOURNALS[refInfo.monthNumber] || MONTHLY_JOURNALS[1];

  const handleLearnMore = (type: 'physical' | 'digital') => {
    analyticsService.trackJournalUpsellClicked(journal.monthName, `${source}_${type}`, refInfo.journalPage);
    // In preview, we simulate opening or downloading the journal preview
    const sampleText = `SACRED STEPS TRANSFORMATION JOURNAL: ${journal.monthName.toUpperCase()}
Theme: ${journal.theme}
Subtitle: ${journal.subtitle}
Page Reference for Day ${dayNumber}: Page ${refInfo.journalPage}

WEEKLY REFLECTION PROMPT:
"${refInfo.reflectionPrompt}"

CORE TEACHING & GUIDED INQUIRY:
${journal.coreFocus}

PHYSICAL JOURNAL: 120 pages, linen cloth binding, lay-flat ribbon.
Available on Amazon and Sacred Steps bookstore.`;

    const blob = new Blob([sampleText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sacred_Steps_${journal.monthName}_Journal_Preview.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-lg bg-[#F9F6F0] rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-7 text-[#2B2B2B] my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Journal Preview"
            className="absolute top-4 right-4 p-2 text-[#7A8B7B] hover:text-[#1C2A39] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center pb-2">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] uppercase tracking-widest text-[#7A8B7B] font-bold">
              Companion Transformation Journal
            </span>
            <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-bold text-[#1C2A39] mt-1">
              {journal.monthName} Sacred Steps Journal
            </h3>
            <p className="font-['Caveat',cursive] text-xl text-[#D4AF37] mt-0.5">
              Theme: {journal.theme}
            </p>
          </div>

          {/* Book Mockup & Key Stats */}
          <div className="my-4 bg-white border border-[#D4AF37]/30 rounded-xl p-4 shadow-sm flex items-start gap-4">
            <div className="w-20 h-28 bg-[#1C2A39] text-[#D4AF37] rounded-lg border-2 border-[#D4AF37] flex flex-col items-center justify-center p-2 text-center shrink-0 shadow-md">
              <BookOpen className="w-6 h-6 mb-1 text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F9F6F0]">
                {journal.monthName}
              </span>
              <span className="text-[9px] text-[#D4AF37] mt-0.5 font-['Caveat',cursive]">
                120 Pages
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-[#2B2B2B]">
              <div className="font-bold text-[#1C2A39] text-sm font-['Plus_Jakarta_Sans',sans-serif]">
                {journal.subtitle}
              </div>
              <p className="text-[#7A8B7B] leading-relaxed">
                {journal.coreFocus}
              </p>
              <div className="pt-1 text-[11px] font-semibold text-[#1C2A39]">
                📍 Day {dayNumber} corresponds to <strong>Page {refInfo.journalPage}</strong> in this Journal.
              </div>
            </div>
          </div>

          {/* Reflection Prompt Preview */}
          <div className="bg-[#7A8B7B]/10 rounded-xl p-4 border-l-4 border-l-[#D4AF37] my-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8B7B] block mb-1">
              Sample Guided Journal Prompt:
            </span>
            <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-[#1C2A39] leading-snug">
              “{refInfo.reflectionPrompt}”
            </p>
          </div>

          {/* What’s Inside */}
          <div className="space-y-2 py-2 text-xs text-[#2B2B2B]/90 font-['Plus_Jakarta_Sans',sans-serif]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Full 30-day deep-dive prompts & weekly Sabbath inventories</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Trauma-informed recovery exercises anchored in Christ</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Includes digital PDF download + printable reflection worksheets</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 space-y-2">
            <button
              onClick={() => handleLearnMore('physical')}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#1C2A39] hover:bg-[#D4AF37] text-[#F9F6F0] hover:text-[#1C2A39] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Get the {journal.monthName} Journal (Physical & Digital)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                if (onOpenSampleLeadMagnet) {
                  onOpenSampleLeadMagnet(refInfo.monthNumber);
                  onClose();
                } else {
                  setShowSampleLeadMagnet(true);
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-[#D4AF37]/50 text-[#1C2A39] hover:bg-white text-xs font-semibold font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Read Free 5-Page Sample Chapter & Exercises</span>
            </button>
          </div>
        </motion.div>
      </div>

      <MonthlySampleLeadMagnet
        isOpen={showSampleLeadMagnet}
        onClose={() => setShowSampleLeadMagnet(false)}
        initialMonth={refInfo.monthNumber}
      />
    </AnimatePresence>
  );
};
