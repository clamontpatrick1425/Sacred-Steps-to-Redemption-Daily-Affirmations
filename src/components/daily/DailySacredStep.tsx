import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  BookOpen, 
  Heart, 
  Footprints, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  Headphones, 
  Bell, 
  PenTool, 
  Flame, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { analyticsService } from '../../services/analyticsService';
import { getJournalPageReference } from '../../data/journalsData';
import { ShareGraphicModal } from './ShareGraphicModal';
import { AudioAffirmationPlayer } from './AudioAffirmationPlayer';
import { DailyReminderModal } from './DailyReminderModal';
import { JournalUpsellModal } from '../journals/JournalUpsellModal';
import { MonthlySampleLeadMagnet } from '../lead/MonthlySampleLeadMagnet';

export interface DailySacredStepProps {
  dayNumber?: number; // 1 - 7 in current week
  totalDaysInWeek?: number;
  globalDayNumber?: number; // 1 - 365
  weekNumber?: number; // 1 - 52
  monthNumber?: number; // 1 - 12
  monthName?: string;
  themeTitle?: string;
  scriptureRef?: string;
  scriptureText?: string;
  truth?: string;
  embrace?: string;
  practiceStep?: string;
  onStepCompleted?: (completed: boolean) => void;
  isInitialCompleted?: boolean;
  /** Grace Mode: Consistency over perfection - never shame or zero out progress */
  isGraceModeActive?: boolean;
  onToggleGraceMode?: (active: boolean) => void;
  accumulatedSteps?: number;
  onOpenLeadMagnet?: () => void;
}

/**
 * Enhanced Daily Sacred Step Screen
 * Conforms strictly to the Sacred Steps to Redemption Brandbook (v1.0, 2026):
 * - Visual progress ring & gentle anti-shame streak indicator in Dawn Gold (#D4AF37)
 * - In-app micro-journaling under PRACTICE: "How will you apply this today?"
 * - Post-action contextual micro-upsell: "Want to go deeper? Reflect on this week's theme..."
 * - Cross-referencing footer: "This is Day [X] from 365 Ebook. Dive deeper in [Month] Journal, Page [Y]."
 * - 1-tap Audio affirmation narration & 1080x1080 shareable graphics generation.
 */
export const DailySacredStep: React.FC<DailySacredStepProps> = ({
  dayNumber = 1,
  totalDaysInWeek = 7,
  globalDayNumber = 1,
  weekNumber = 1,
  monthNumber = 1,
  monthName = 'January',
  themeTitle = 'A Path to Recovery, A Life in Grace',
  scriptureRef = '2 Corinthians 5:17',
  scriptureText = '“Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.”',
  truth = 'My worst year does not get to write my name. Relapse, regrets, and old labels do not define the person God is forming today.',
  embrace = '“I am a new creation in Christ. The old things have passed away, and I do not have to carry yesterday’s guilt into today’s walk.”',
  practiceStep = 'Write down one label you’ve been calling yourself in shame. Cross it out cleanly with a pen, and write “New Creation” right beside it.',
  onStepCompleted,
  isInitialCompleted = false,
  isGraceModeActive = false,
  onToggleGraceMode,
  accumulatedSteps = 12,
  onOpenLeadMagnet
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(isInitialCompleted);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [graceActive, setGraceActive] = useState<boolean>(isGraceModeActive);

  // Micro-journaling state
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [journalReflection, setJournalReflection] = useState<string>('');
  const [isReflectionSaved, setIsReflectionSaved] = useState<boolean>(false);

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState<boolean>(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState<boolean>(false);
  const [isJournalUpsellOpen, setIsJournalUpsellOpen] = useState<boolean>(false);
  const [isSampleLeadMagnetOpen, setIsSampleLeadMagnetOpen] = useState<boolean>(false);

  // Page cross-referencing calculations
  const journalRef = getJournalPageReference(globalDayNumber);

  // Sync state on day change
  useEffect(() => {
    setIsCompleted(isInitialCompleted);
    setGraceActive(isGraceModeActive);

    const entries = storageService.getJournalEntries();
    if (entries[globalDayNumber]?.reflection) {
      setJournalReflection(entries[globalDayNumber].reflection);
      setIsJournalOpen(true);
    } else {
      setJournalReflection('');
    }
  }, [globalDayNumber, isInitialCompleted, isGraceModeActive]);

  const handleButtonClick = () => {
    setIsAnimating(true);
    const nextState = !isCompleted;
    setIsCompleted(nextState);

    if (onStepCompleted) {
      onStepCompleted(nextState);
    }

    analyticsService.trackTookThisStepClicked(globalDayNumber, nextState);

    setTimeout(() => {
      setIsAnimating(false);
    }, 450);
  };

  const handleToggleGrace = () => {
    const next = !graceActive;
    setGraceActive(next);
    if (onToggleGraceMode) {
      onToggleGraceMode(next);
    }
  };

  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJournalReflection(text);
    storageService.saveJournalEntry(globalDayNumber, text);
    setIsReflectionSaved(true);
    setTimeout(() => setIsReflectionSaved(false), 2000);
  };

  const handleOpenUpsell = () => {
    analyticsService.trackJournalUpsellClicked(monthName, 'post_action_cta', journalRef.journalPage);
    setIsJournalUpsellOpen(true);
  };

  // Visual Progress Ring Math (Day of 365)
  const progressPercent = Math.min(100, Math.max(1, (globalDayNumber / 365) * 100));
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#2B2B2B] p-6 sm:p-8 md:p-12 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Import Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* 1. TOP HEADER & PROGRESS RING ZONE */}
        <header className="mb-6 flex items-center justify-between border-b border-[#D4AF37]/25 pb-4 gap-2 flex-wrap">
          {/* Left: Visual Progress Ring & Day Indicator */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
              <svg className="w-11 h-11 -rotate-90 transform" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-[#7A8B7B]/20"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-[#D4AF37] transition-all duration-700 ease-out"
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-[#1C2A39]">
                {Math.round(progressPercent)}%
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#7A8B7B] font-bold tracking-wide uppercase">
                  Month {monthNumber} · {monthName}
                </span>
                <span className="text-[#D4AF37]">·</span>
                <span className="text-xs text-[#7A8B7B] font-semibold">
                  Week {weekNumber} of 52
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-['Cormorant_Garamond',serif] text-lg font-bold text-[#1C2A39]">
                  Day {globalDayNumber} of 365
                </span>
                {/* Gentle Streak Badge */}
                <div 
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#1C2A39] border border-[#D4AF37]/35 text-[10px] font-semibold"
                  title="Consistency over perfection: Grace covers every step."
                >
                  <Flame className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>{accumulatedSteps} Sacred Steps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Icons (Audio, Share, Reminder, Grace Mode) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Affirmations Listen Button */}
            <button
              onClick={() => setIsAudioPlayerOpen(!isAudioPlayerOpen)}
              title="Listen to Audio Devotional"
              aria-label="Listen to Audio Affirmation"
              className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAudioPlayerOpen
                  ? 'bg-[#1C2A39] text-[#D4AF37] border-[#D4AF37]'
                  : 'bg-white border-[#D4AF37]/30 text-[#1C2A39] hover:bg-[#D4AF37]/10'
              }`}
            >
              <Headphones className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">Listen</span>
            </button>

            {/* Shareable Graphic Modal Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              title="Generate 1080x1080 Branded Shareable Graphic"
              aria-label="Share Graphic"
              className="min-h-[38px] min-w-[38px] rounded-xl bg-white border border-[#D4AF37]/30 text-[#1C2A39] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#D4AF37]" />
            </button>

            {/* Daily Reminder Button */}
            <button
              onClick={() => setIsReminderModalOpen(true)}
              title="Daily Morning Reminder"
              aria-label="Set Reminder"
              className="min-h-[38px] min-w-[38px] rounded-xl bg-white border border-[#D4AF37]/30 text-[#1C2A39] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4 text-[#7A8B7B]" />
            </button>

            {/* Grace Mode Indicator Button */}
            <button
              onClick={handleToggleGrace}
              title="Grace Mode: Consistency over perfection"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all duration-200 cursor-pointer ${
                graceActive
                  ? 'bg-[#1C2A39] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xs'
                  : 'bg-[#7A8B7B]/15 text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span className="hidden md:inline">{graceActive ? 'Grace Active' : 'Grace'}</span>
            </button>
          </div>
        </header>

        {/* AUDIO PLAYER INLINE BANNER (Feature 4) */}
        <AudioAffirmationPlayer
          isOpen={isAudioPlayerOpen}
          onClose={() => setIsAudioPlayerOpen(false)}
          dayNumber={globalDayNumber}
          scriptureRef={scriptureRef}
          scriptureText={scriptureText}
          truth={truth}
          embrace={embrace}
        />

        {/* GRACE MODE LOGIC BANNER (Anti-shame, no zero-reset streak policy) */}
        <AnimatePresence>
          {graceActive && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 28 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="bg-[#1C2A39] text-[#F9F6F0] rounded-xl p-4 sm:p-5 border-l-4 border-l-[#D4AF37] shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                        Grace Mode Active · Consistency Over Perfection
                      </span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm text-[#F9F6F0]/90 leading-relaxed">
                      You have not lost ground. Your streak is not zero; every step you have taken ({accumulatedSteps} sacred steps walked) remains honored. Grace covers every pause.
                    </p>
                  </div>
                  <button
                    onClick={handleToggleGrace}
                    className="text-xs text-[#D4AF37] hover:underline font-['Plus_Jakarta_Sans',sans-serif] shrink-0 pt-0.5 cursor-pointer"
                  >
                    Rest in Grace
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. SCRIPTURE CARD (Exact Brandbook Specs) */}
        <section className="mb-8 bg-[#7A8B7B]/10 border-2 border-[#D4AF37] border-l-4 border-l-[#D4AF37] rounded-lg shadow-md p-6 sm:p-8 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-3 text-[#D4AF37]">
            <BookOpen className="w-5 h-5 stroke-[1.75]" />
          </div>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl text-[#1C2A39] text-center font-bold tracking-tight mb-3">
            {scriptureRef}
          </h2>
          <p className="font-['Caveat',cursive] italic text-xl text-[#1C2A39] text-center leading-relaxed">
            {scriptureText}
          </p>
        </section>

        {/* 3. TRUTH SECTION */}
        <section className="mb-8">
          <div className="flex items-center gap-1.5 mb-2">
            <Heart className="w-3.5 h-3.5 text-[#7A8B7B]" />
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold">
              TRUTH
            </h3>
          </div>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-base text-[#2B2B2B] font-normal leading-relaxed">
            {truth}
          </p>
        </section>

        {/* 4. EMBRACE SECTION */}
        <section className="mb-8 bg-white/50 border border-[#D4AF37]/30 rounded-lg p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold text-center">
              EMBRACE
            </h3>
          </div>
          <p className="font-['Cormorant_Garamond',serif] italic text-2xl font-semibold text-[#1C2A39] text-center leading-relaxed">
            {embrace}
          </p>
        </section>

        {/* 5. PRACTICE SECTION + IN-APP MICRO-JOURNALING */}
        <section className="mb-8 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Footprints className="w-3.5 h-3.5 text-[#7A8B7B]" />
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold">
                PRACTICE
              </h3>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-[#2B2B2B] leading-relaxed">
              {practiceStep}
            </p>
          </div>

          {/* Micro-Journaling Collapsible Component (Feature 3) */}
          <div className="pt-2">
            <button
              onClick={() => setIsJournalOpen(!isJournalOpen)}
              className="flex items-center justify-between w-full p-3.5 bg-white border border-[#D4AF37]/35 rounded-xl hover:bg-[#F9F6F0] text-left transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold text-[#1C2A39]">
                  How will you apply this today? (Micro-Journal)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {journalReflection && (
                  <span className="text-[10px] text-[#7A8B7B] font-medium hidden sm:inline">
                    {journalReflection.length} chars
                  </span>
                )}
                {isJournalOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#7A8B7B]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#7A8B7B]" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {isJournalOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-2"
                >
                  <div className="bg-white border border-[#D4AF37]/30 rounded-xl p-4 shadow-sm">
                    <textarea
                      rows={3}
                      value={journalReflection}
                      onChange={handleReflectionChange}
                      placeholder="Write your honest reflection... God meets you in reality, not pretension."
                      className="w-full text-sm font-['Plus_Jakarta_Sans',sans-serif] text-[#2B2B2B] placeholder-[#2B2B2B]/40 bg-transparent resize-none focus:outline-none"
                    />
                    <div className="flex items-center justify-between pt-2 border-t border-black/5 text-[11px] text-[#7A8B7B]">
                      <span>{isReflectionSaved ? 'Saved in your heart & journal.' : 'Autosaved locally'}</span>
                      <span className="text-[#D4AF37] font-medium">Safe & Private</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 6. PRIMARY ACTION BUTTON & POST-ACTION MICRO-UPSELL */}
        <div className="pt-2 flex flex-col items-center">
          <motion.button
            onClick={handleButtonClick}
            animate={isAnimating ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            whileTap={{ scale: 0.98 }}
            className={`min-h-[56px] py-4 px-8 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-base font-semibold transition-colors duration-300 shadow-md flex items-center justify-center gap-2.5 cursor-pointer ${
              isCompleted
                ? 'bg-[#D4AF37] text-[#1C2A39] hover:bg-[#c29f31]'
                : 'bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#1C2A39]'
            }`}
          >
            {isCompleted ? (
              <>
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>Step Completed · Grace Received</span>
              </>
            ) : (
              <>
                <Footprints className="w-5 h-5" />
                <span>I Took This Step</span>
              </>
            )}
          </motion.button>

          {/* Calming Framer Motion Success Message */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-5 text-center w-full"
              >
                <p className="font-['Caveat',cursive] text-2xl text-[#1C2A39] leading-snug">
                  Well done. Grace covers today, and tomorrow is new.
                </p>

                {/* POST-ACTION CONTEXTUAL MICRO-UPSELL FOOTER (Feature 2) */}
                <div className="mt-4 p-4 rounded-xl bg-white border border-[#D4AF37]/35 shadow-xs max-w-lg mx-auto text-left">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#1C2A39] text-[#D4AF37] rounded-lg shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#2B2B2B]">
                        Want to go deeper? Reflect on this week’s theme in the <strong>{monthName} Sacred Steps Journal</strong>.
                      </p>
                      <button
                        onClick={handleOpenUpsell}
                        className="text-xs text-[#D4AF37] hover:text-[#b89528] font-bold font-['Plus_Jakarta_Sans',sans-serif] inline-flex items-center gap-1 cursor-pointer underline underline-offset-2"
                      >
                        <span>Learn More / Get the Journal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 7. CROSS-REFERENCING FOOTER (Feature 2) */}
        <footer className="mt-12 pt-6 border-t border-[#D4AF37]/25 text-center space-y-3">
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#7A8B7B] leading-relaxed">
            This is Day {globalDayNumber} from the <em>Sacred Steps to Redemption 365 Ebook</em>. Dive deeper in the <strong>{monthName} Journal, Page {journalRef.journalPage}</strong>.
          </p>

          <div className="pt-1">
            <button
              onClick={() => setIsSampleLeadMagnetOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#1C2A39] border border-[#D4AF37]/40 text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Read {monthName} Free Sample Chapter & Guided Exercises (5 Pages)</span>
              <ArrowRight className="w-3 h-3 text-[#7A8B7B]" />
            </button>
          </div>
        </footer>
      </div>

      {/* MODALS */}
      <ShareGraphicModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        dayNumber={globalDayNumber}
        scriptureRef={scriptureRef}
        scriptureText={scriptureText}
        embrace={embrace}
        truth={truth}
        practiceStep={practiceStep}
        themeTitle={themeTitle}
      />

      <DailyReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
      />

      <JournalUpsellModal
        isOpen={isJournalUpsellOpen}
        onClose={() => setIsJournalUpsellOpen(false)}
        dayNumber={globalDayNumber}
        source="post_action_cta"
        onOpenSampleLeadMagnet={(m) => setIsSampleLeadMagnetOpen(true)}
      />

      <MonthlySampleLeadMagnet
        isOpen={isSampleLeadMagnetOpen}
        onClose={() => setIsSampleLeadMagnetOpen(false)}
        initialMonth={journalRef.monthNumber}
      />
    </div>
  );
};

export default DailySacredStep;
