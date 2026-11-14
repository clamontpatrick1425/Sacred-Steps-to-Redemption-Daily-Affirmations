import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Printer, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2, 
  Mail, 
  ExternalLink,
  Tag,
  PenLine,
  Compass,
  ArrowRight,
  FileText
} from 'lucide-react';
import { 
  MONTHLY_LEAD_MAGNET_DATA, 
  MonthlyLeadMagnetData 
} from '../../data/monthlyLeadMagnetData';
import { leadMagnetService } from '../../services/leadMagnetService';
import { leadMagnetPdfService } from '../../services/leadMagnetPdfService';
import { analyticsService } from '../../services/analyticsService';
import { sacredAudio } from '../../services/audioService';
import { LeadMagnetModal } from './LeadMagnetModal';
import { JournalUpsellModal } from '../journals/JournalUpsellModal';

interface MonthlySampleLeadMagnetProps {
  isOpen: boolean;
  onClose: () => void;
  initialMonth?: number;
}

export const MonthlySampleLeadMagnet: React.FC<MonthlySampleLeadMagnetProps> = ({
  isOpen,
  onClose,
  initialMonth = 1
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);
  const [currentPage, setCurrentPage] = useState<number>(1); // 1 to 5
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [showJournalUpsell, setShowJournalUpsell] = useState<boolean>(false);
  
  // Local exercise response storage key per month
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [dayJournalReflection, setDayJournalReflection] = useState<string>('');

  const monthData: MonthlyLeadMagnetData = MONTHLY_LEAD_MAGNET_DATA[selectedMonth] || MONTHLY_LEAD_MAGNET_DATA[1];
  const isUnlocked = leadMagnetService.isUnlocked();

  useEffect(() => {
    if (initialMonth >= 1 && initialMonth <= 12) {
      setSelectedMonth(initialMonth);
    }
  }, [initialMonth]);

  // Load saved exercise responses for the current month
  useEffect(() => {
    try {
      const storageKey = `sacred_lead_magnet_month_${selectedMonth}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setExerciseAnswers(parsed.exercises || {});
        setDayJournalReflection(parsed.reflection || '');
      } else {
        setExerciseAnswers({});
        setDayJournalReflection('');
      }
    } catch {
      // ignore
    }
    sacredAudio.stopSpeaking();
    setIsSpeaking(false);
  }, [selectedMonth]);

  if (!isOpen) return null;

  const handleSaveExerciseAnswer = (stepNum: number, text: string) => {
    const updated = { ...exerciseAnswers, [stepNum]: text };
    setExerciseAnswers(updated);
    try {
      const storageKey = `sacred_lead_magnet_month_${selectedMonth}`;
      localStorage.setItem(storageKey, JSON.stringify({
        exercises: updated,
        reflection: dayJournalReflection
      }));
    } catch {
      // ignore
    }
  };

  const handleSaveReflection = (text: string) => {
    setDayJournalReflection(text);
    try {
      const storageKey = `sacred_lead_magnet_month_${selectedMonth}`;
      localStorage.setItem(storageKey, JSON.stringify({
        exercises: exerciseAnswers,
        reflection: text
      }));
    } catch {
      // ignore
    }
  };

  const handleToggleAudio = () => {
    if (isSpeaking) {
      sacredAudio.stopSpeaking();
      setIsSpeaking(false);
    } else {
      let scriptToRead = '';
      if (currentPage === 1) {
        scriptToRead = `Sacred Steps to Redemption. ${monthData.monthName} Free Sample Chapter and Guided Exercises. Experience the Sacred S.T.E.P. Method and begin your journey of ${monthData.monthTheme}. You don't have to clean yourself up before you begin. You just have to be willing to take the next step.`;
      } else if (currentPage === 2) {
        scriptToRead = `A Note From the Author. ${monthData.authorLetter.join(' ')}`;
      } else if (currentPage === 3) {
        scriptToRead = `${monthData.dailyTheme}. Scripture: ${monthData.scriptureText}. S.T.E.P. Method. Truth: ${monthData.theTruth}. Embrace: ${monthData.embraceAffirmation}. Practice: ${monthData.practiceActionStep}. Prayer: ${monthData.conversationalPrayer}`;
      } else if (currentPage === 4) {
        scriptToRead = `${monthData.exerciseName}. A trauma-informed exercise for ${monthData.monthTheme}. ${monthData.exerciseTraumaIntro}`;
      } else {
        scriptToRead = `You don't have to walk alone. Three ways to go deeper in your recovery with Sacred Steps to Redemption.`;
      }

      setIsSpeaking(true);
      sacredAudio.speakDevotional(
        scriptToRead,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const handlePrint = () => {
    analyticsService.trackLeadMagnetDownloaded(monthData.monthName);
    // Switch to all-page mode for clean printing
    setViewMode('all');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleDownloadTextGuide = () => {
    analyticsService.trackLeadMagnetDownloaded(monthData.monthName);
    const content = `=====================================================
SACRED STEPS TO REDEMPTION
${monthData.monthName.toUpperCase()} FREE SAMPLE CHAPTER & GUIDED EXERCISES
Theme: ${monthData.monthTheme}
Author: C. Lamont Patrick | Kya Daisy Publishing
sacred-steps-affirmations.ai.studio
=====================================================

[PAGE 1: COVER]
A PATH TO RECOVERY, A LIFE IN GRACE.
Experience the S.T.E.P. Method™ and Begin Your Journey of ${monthData.monthTheme}

"You don’t have to clean yourself up before you begin.
You just have to be willing to take the next step."

Inside this free guide:
✔ A Full Daily Devotional Entry: Day ${monthData.dayNumber} of ${monthData.monthTheme}
✔ The Sacred S.T.E.P. Method™: The 4-part rhythm that renews the mind
✔ Guided Trauma-Informed Exercise: "${monthData.exerciseName}"

-----------------------------------------------------
[PAGE 2: WELCOME LETTER - A NOTE FROM THE AUTHOR]
-----------------------------------------------------
${monthData.authorLetter.join('\n\n')}

— C. Lamont Patrick

-----------------------------------------------------
[PAGE 3: SAMPLE CHAPTER - DAY ${monthData.dayNumber}]
-----------------------------------------------------
${monthData.monthName.toUpperCase()} • ${monthData.monthThemeUppercase} • DAY ${monthData.dayNumber} OF 30
THEME: ${monthData.dailyTheme}

SCRIPTURE:
"${monthData.scriptureText}"
— ${monthData.scriptureReference}, KJV

WHAT THIS MEANS:
${monthData.whatThisMeans.join('\n\n')}

THE SACRED S.T.E.P. METHOD™:
S — Scripture: ${monthData.scriptureReference}
T — Truth:
    Lie: "${monthData.theLie}"
    Truth: ${monthData.theTruth}
E — Embrace:
    "${monthData.embraceAffirmation}"
P — Practice:
    ${monthData.practiceActionStep}

REFLECTION & PRAYER:
1. ${monthData.reflectionQuestions[0]}
2. ${monthData.reflectionQuestions[1]}
3. ${monthData.reflectionQuestions[2]}

PRAYER:
"${monthData.conversationalPrayer}"

MY JOURNAL REFLECTION:
${dayJournalReflection || '(Write your personal reflection here)'}

-----------------------------------------------------
[PAGE 4: GUIDED EXERCISE - ${monthData.exerciseName.toUpperCase()}]
-----------------------------------------------------
${monthData.exerciseSubtitle}

${monthData.exerciseTraumaIntro}

${monthData.exerciseSteps.map(step => `
STEP ${step.stepNumber}: ${step.title.toUpperCase()}
Instruction: ${step.instruction}
Prompt: ${step.prompt}
My Response: ${exerciseAnswers[step.stepNumber] || '(Your response)'}
`).join('\n')}

AUTHOR'S ENCOURAGEMENT:
"${monthData.authorEncouragementQuote}"
— C. Lamont Patrick

-----------------------------------------------------
[PAGE 5: CONTINUE YOUR JOURNEY]
-----------------------------------------------------
YOU DON'T HAVE TO WALK ALONE
Three Ways to Go Deeper in Your Recovery:

1. THE FULL ${monthData.monthName.toUpperCase()} TRANSFORMATION JOURNAL (120+ Pages)
   - 30 days of guided S.T.E.P. exercises
   - Deep weekly inventories & root healing
   - Habit & mood tracking ribbon companion

2. SACRED STEPS TO REDEMPTION: 365 BIBLICAL AFFIRMATIONS EBOOK
   - The complete year-long daily devotional
   - Scripture, truth reframes, and affirmations for every day

3. SACRED STEPS AUDIO & COMMUNITY
   - Narrated daily devotionals, ambient prayer sounds, and weekly encouragement

SPECIAL COMMUNITY OFFER:
Use code GRACE20 at checkout for 20% off all physical journals & bundle editions.

"Keep taking the steps. One breath. One prayer. One day at a time."
— C. Lamont Patrick
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sacred_Steps_${monthData.monthName}_Sample_Guide.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFormattedPdf = () => {
    leadMagnetPdfService.downloadFormattedPdf(selectedMonth);
  };

  const monthsList = [
    { num: 1, name: 'Jan', full: 'January', theme: 'Identity' },
    { num: 2, name: 'Feb', full: 'February', theme: 'Grace' },
    { num: 3, name: 'Mar', full: 'March', theme: 'Faith' },
    { num: 4, name: 'Apr', full: 'April', theme: 'Freedom' },
    { num: 5, name: 'May', full: 'May', theme: 'Healing' },
    { num: 6, name: 'Jun', full: 'June', theme: 'Discipline' },
    { num: 7, name: 'Jul', full: 'July', theme: 'Courage' },
    { num: 8, name: 'Aug', full: 'August', theme: 'Forgiveness' },
    { num: 9, name: 'Sep', full: 'September', theme: 'Peace' },
    { num: 10, name: 'Oct', full: 'October', theme: 'Purpose' },
    { num: 11, name: 'Nov', full: 'November', theme: 'Gratitude' },
    { num: 12, name: 'Dec', full: 'December', theme: 'Redemption' }
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C2A39]/90 backdrop-blur-md flex flex-col items-center p-2 sm:p-4 print:p-0 print:bg-white">
        {/* Top Control Bar (Hidden when printing) */}
        <header className="no-print w-full max-w-4xl bg-[#1C2A39] border border-[#D4AF37]/30 rounded-2xl p-3 sm:p-4 mb-3 text-[#F9F6F0] flex flex-col gap-3 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <h2 className="font-['Cinzel',serif] text-base sm:text-lg font-bold tracking-wide text-[#F9F6F0]">
                Monthly Sample Lead Magnet
              </h2>
              <span className="text-[10px] uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] font-semibold px-2 py-0.5 rounded-full border border-[#D4AF37]/40 hidden sm:inline-block">
                5-Page Guided PDF
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Listen Button */}
              <button
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  isSpeaking 
                    ? 'bg-[#D4AF37] text-[#1C2A39] border-[#D4AF37]' 
                    : 'bg-[#1C2A39] text-[#F9F6F0] border-[#7A8B7B]/40 hover:border-[#D4AF37]'
                }`}
                title="Listen to this page"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-bounce" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isSpeaking ? 'Pause' : 'Listen'}</span>
              </button>

              {/* Download Formatted PDF Button */}
              <button
                onClick={handleDownloadFormattedPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#D4AF37] hover:bg-[#c29f31] text-[#1C2A39] border border-[#D4AF37] transition-all cursor-pointer shadow-xs"
                title="Download formatted 5-page PDF"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              {/* Print / Save PDF Button */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#7A8B7B]/20 text-[#F9F6F0] border border-[#7A8B7B]/40 hover:bg-[#7A8B7B]/30 hover:border-[#D4AF37] transition-colors cursor-pointer hidden md:flex"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Print</span>
              </button>

              {/* Download Text Guide */}
              <button
                onClick={handleDownloadTextGuide}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-[#F9F6F0] border border-white/20 transition-colors cursor-pointer hidden sm:flex"
                title="Download formatted text guide (.txt)"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>.TXT</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 text-[#F9F6F0]/70 hover:text-[#F9F6F0] hover:bg-white/10 rounded-lg transition-colors cursor-pointer ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Month Selector Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-[#7A8B7B]/20 pt-2.5 scrollbar-thin">
            <span className="text-[11px] text-[#7A8B7B] uppercase font-bold tracking-wider mr-1 shrink-0">
              Select Month:
            </span>
            {monthsList.map((m) => {
              const isSelected = selectedMonth === m.num;
              return (
                <button
                  key={m.num}
                  onClick={() => {
                    setSelectedMonth(m.num);
                    analyticsService.trackEvent('lead_magnet_month_selected', { month: m.full });
                  }}
                  className={`px-2.5 py-1 rounded-md shrink-0 transition-all cursor-pointer font-medium text-[11px] ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#1C2A39] font-bold shadow-md scale-105'
                      : 'bg-black/20 text-[#F9F6F0]/70 hover:text-[#F9F6F0] hover:bg-white/10'
                  }`}
                >
                  {m.name} · <span className="opacity-80">{m.theme}</span>
                </button>
              );
            })}
          </div>

          {/* Page Stepper & View Mode Controls */}
          <div className="flex items-center justify-between border-t border-[#7A8B7B]/20 pt-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#F9F6F0]/80">View Mode:</span>
              <button
                onClick={() => setViewMode('single')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  viewMode === 'single' ? 'bg-[#D4AF37]/30 text-[#D4AF37] font-semibold border border-[#D4AF37]/50' : 'text-[#F9F6F0]/60'
                }`}
              >
                Page-by-Page
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  viewMode === 'all' ? 'bg-[#D4AF37]/30 text-[#D4AF37] font-semibold border border-[#D4AF37]/50' : 'text-[#F9F6F0]/60'
                }`}
              >
                Continuous Document (All 5 Pages)
              </button>
            </div>

            {viewMode === 'single' && (
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-1 rounded bg-black/20 text-[#F9F6F0] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-['Cinzel',serif] text-xs font-semibold text-[#D4AF37]">
                  Page {currentPage} of 5
                </span>
                <button
                  disabled={currentPage === 5}
                  onClick={() => setCurrentPage(p => Math.min(5, p + 1))}
                  className="p-1 rounded bg-black/20 text-[#F9F6F0] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* 5-Page Document Canvas */}
        <div className="w-full max-w-4xl flex flex-col gap-6 print:gap-0 print:max-w-none">
          {/* ================= PAGE 1: COVER / LANDING PAGE ================= */}
          {(viewMode === 'all' || currentPage === 1) && (
            <section className="page-break bg-[#F9F6F0] text-[#2B2B2B] rounded-2xl print:rounded-none border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-12 min-h-[780px] flex flex-col justify-between relative overflow-hidden">
              {/* Subtle decorative background watermarks */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7A8B7B]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Top Center Tag */}
              <div className="text-center">
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-[0.25em] text-[#7A8B7B] font-bold">
                  A Path to Recovery, a Life in Grace.
                </p>
                <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
              </div>

              {/* Center Content */}
              <div className="my-auto py-8 text-center max-w-2xl mx-auto">
                {/* Thin-line decorative icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#D4AF37]/10 shadow-inner">
                    <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                </div>

                <h1 className="font-['Cinzel',serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C2A39] tracking-tight leading-tight">
                  SACRED STEPS TO REDEMPTION
                </h1>

                <h2 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold text-[#1C2A39] mt-3">
                  {monthData.monthName} Free Sample Chapter & Guided Exercises
                </h2>

                <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#D4AF37] mt-3 font-medium">
                  Experience the S.T.E.P. Method™ and Begin Your Journey of {monthData.monthTheme}
                </p>

                <div className="w-24 h-0.5 bg-[#7A8B7B]/30 mx-auto my-6" />

                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-[#2B2B2B] leading-relaxed space-y-3 px-4">
                  <p className="font-medium text-[#1C2A39]">
                    You don’t have to clean yourself up before you begin.
                    <br />
                    You just have to be willing to take the next step.
                  </p>
                  <p className="text-[#2B2B2B]/85">
                    Inside this free guide, you will experience the exact framework used in the <em>Sacred Steps to Redemption</em> 365-Day Devotional and the {monthData.monthName} Transformation Journal.
                  </p>
                </div>

                {/* Key Bullet Points */}
                <div className="mt-8 bg-white/70 border border-[#D4AF37]/30 rounded-xl p-5 text-left max-w-xl mx-auto shadow-sm space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong className="font-bold">A Full Daily Devotional Entry:</strong> Walk through Day {monthData.dayNumber} of the {monthData.monthTheme} journey.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong className="font-bold">The Sacred S.T.E.P. Method™:</strong> Learn the 4-part rhythm (Scripture, Truth, Embrace, Practice) that renews the mind.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong className="font-bold">A Guided Trauma-Informed Exercise:</strong> "{monthData.exerciseName}" worksheet with personal reflection prompts.
                    </p>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="mt-8 no-print flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      if (!isUnlocked) {
                        setShowEmailModal(true);
                      } else {
                        handleDownloadFormattedPdf();
                      }
                    }}
                    className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1C2A39] hover:bg-[#25384d] text-[#D4AF37] font-bold rounded-xl border-2 border-[#D4AF37] shadow-xl hover:shadow-2xl transition-all scale-100 hover:scale-[1.02] cursor-pointer text-sm sm:text-base tracking-wide"
                  >
                    <FileText className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isUnlocked ? 'DOWNLOAD FORMATTED PDF (5 PAGES)' : 'GET FREE PDF & EXERCISES'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (viewMode === 'single') setCurrentPage(2);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F9F6F0] text-[#1C2A39] font-bold rounded-xl border border-[#D4AF37]/50 shadow-md transition-all cursor-pointer text-sm sm:text-base"
                  >
                    <span>Read Sample Online</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
                <p className="text-[11px] text-[#7A8B7B] mt-2 text-center">
                  Instant publication-grade PDF • Brandbook v1.0 formatted • Free to keep
                </p>
              </div>

              {/* Page 1 Footer */}
              <div className="text-center pt-4 border-t border-[#7A8B7B]/20">
                <p className="text-[11px] text-[#7A8B7B] font-['Plus_Jakarta_Sans',sans-serif]">
                  © 2026 C. Lamont Patrick | Kya Daisy Publishing | sacred-steps-affirmations.ai.studio
                </p>
              </div>
            </section>
          )}

          {/* ================= PAGE 2: WELCOME LETTER ================= */}
          {(viewMode === 'all' || currentPage === 2) && (
            <section className="page-break bg-[#F9F6F0] text-[#2B2B2B] rounded-2xl print:rounded-none border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-12 min-h-[780px] flex flex-col justify-between relative">
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-[#7A8B7B]/20 pb-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A8B7B] font-bold">
                    {monthData.monthName} Sample Guide • Page 2 of 5
                  </span>
                  <span className="font-['Cinzel',serif] text-xs text-[#D4AF37] font-semibold">
                    The Author's Heart
                  </span>
                </div>

                <div className="mt-8 max-w-2xl mx-auto">
                  <h2 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-extrabold text-[#1C2A39]">
                    A Note From the Author
                  </h2>
                  <div className="w-16 h-1 bg-[#D4AF37] mt-2 mb-6" />

                  {/* Vulnerable Letter Body in C. Lamont Patrick Voice */}
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base leading-relaxed text-[#2B2B2B] space-y-4 text-justify">
                    {monthData.authorLetter.map((paragraph, idx) => (
                      <p key={idx} className="first-letter:text-3xl first-letter:font-['Cinzel',serif] first-letter:font-bold first-letter:text-[#1C2A39] first-letter:mr-1">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Sign-off */}
                  <div className="mt-8 text-right">
                    <p className="font-['Caveat',cursive] text-3xl sm:text-4xl text-[#1C2A39] font-bold">
                      — C. Lamont Patrick
                    </p>
                    <p className="text-xs text-[#7A8B7B] tracking-wide mt-1">
                      Redeemed Author & Fellow Traveler
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quote Banner */}
              <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] p-4 rounded-r-xl max-w-2xl mx-auto w-full mt-6">
                <p className="font-['Caveat',cursive] text-xl sm:text-2xl text-[#1C2A39] italic">
                  "{monthData.authorEncouragementQuote}"
                </p>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-[#7A8B7B]/20 mt-6">
                <p className="text-[11px] text-[#7A8B7B]">
                  Sacred Steps to Redemption • {monthData.monthName} Transformation Journal
                </p>
              </div>
            </section>
          )}

          {/* ================= PAGE 3: SAMPLE CHAPTER - DAY {{DAY_NUMBER}} ================= */}
          {(viewMode === 'all' || currentPage === 3) && (
            <section className="page-break bg-[#F9F6F0] text-[#2B2B2B] rounded-2xl print:rounded-none border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-12 min-h-[780px] flex flex-col justify-between relative">
              <div>
                {/* Header Tag */}
                <div className="text-center border-b border-[#7A8B7B]/20 pb-2">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-widest text-[#7A8B7B] font-bold">
                    {monthData.monthName} • {monthData.monthThemeUppercase} • DAY {monthData.dayNumber} OF 30
                  </p>
                </div>

                <div className="mt-6 max-w-2xl mx-auto space-y-6">
                  {/* Daily Theme */}
                  <h2 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-extrabold text-[#1C2A39] text-center">
                    {monthData.dailyTheme}
                  </h2>

                  {/* Scripture Block */}
                  <blockquote className="border-l-4 border-[#D4AF37] pl-4 py-3 bg-[#D4AF37]/5 rounded-r-xl font-['Cormorant_Garamond',serif] text-lg sm:text-xl text-[#1C2A39] leading-relaxed italic">
                    "{monthData.scriptureText}"
                    <cite className="block not-italic text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase font-bold text-[#7A8B7B] tracking-wider mt-2">
                      — {monthData.scriptureReference}, KJV
                    </cite>
                  </blockquote>

                  {/* What This Means */}
                  <div className="space-y-2">
                    <h3 className="font-['Cinzel',serif] text-base font-bold text-[#1C2A39] tracking-wide">
                      What This Means
                    </h3>
                    <div className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed space-y-2">
                      {monthData.whatThisMeans.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* The Sacred S.T.E.P. Method™ */}
                  <div className="bg-white/80 border border-[#D4AF37]/40 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
                    <h3 className="font-['Cinzel',serif] text-sm font-bold text-[#D4AF37] tracking-wider uppercase flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      The Sacred S.T.E.P. Method™
                    </h3>

                    <div className="text-xs sm:text-sm space-y-2.5">
                      <p>
                        <strong className="text-[#1C2A39] font-bold">S — Scripture:</strong>{' '}
                        <span className="text-[#7A8B7B] font-semibold">{monthData.scriptureReference}</span>
                      </p>
                      <div className="p-2.5 bg-[#F9F6F0] rounded-lg border border-[#7A8B7B]/20">
                        <strong className="text-[#1C2A39] font-bold">T — Truth:</strong>
                        <div className="mt-1 pl-2 border-l-2 border-[#D4AF37]/50 space-y-1">
                          <p className="text-[#2B2B2B]/70 italic">Lie: “{monthData.theLie}”</p>
                          <p className="text-[#1C2A39] font-medium">Truth: {monthData.theTruth}</p>
                        </div>
                      </div>
                      <p>
                        <strong className="text-[#1C2A39] font-bold">E — Embrace:</strong>{' '}
                        <span className="italic font-medium text-[#1C2A39]">“{monthData.embraceAffirmation}”</span>
                      </p>
                      <p>
                        <strong className="text-[#1C2A39] font-bold">P — Practice:</strong>{' '}
                        <span className="text-[#2B2B2B]">{monthData.practiceActionStep}</span>
                      </p>
                    </div>
                  </div>

                  {/* Reflection & Prayer */}
                  <div className="space-y-3">
                    <h3 className="font-['Cinzel',serif] text-base font-bold text-[#1C2A39] tracking-wide">
                      Reflection & Prayer
                    </h3>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-[#2B2B2B]">
                      {monthData.reflectionQuestions.map((q, idx) => (
                        <li key={idx} className="leading-relaxed">
                          <span className="font-medium text-[#1C2A39]">{q}</span>
                        </li>
                      ))}
                    </ol>

                    {/* Prayer Box */}
                    <div className="bg-[#7A8B7B]/10 border border-[#7A8B7B]/30 rounded-xl p-3 sm:p-4 text-xs sm:text-sm italic text-[#1C2A39] leading-relaxed">
                      "{monthData.conversationalPrayer}"
                    </div>
                  </div>

                  {/* Journal Space (Interactive & Print-Friendly Ruled Lines) */}
                  <div className="mt-4 pt-3 border-t border-[#7A8B7B]/20">
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="day-reflection" className="font-['Cinzel',serif] text-xs font-bold text-[#1C2A39] flex items-center gap-1.5">
                        <PenLine className="w-3.5 h-3.5 text-[#D4AF37]" />
                        My Daily Reflection (Space for Writing):
                      </label>
                      <span className="text-[10px] text-[#7A8B7B] no-print">Auto-saves locally</span>
                    </div>

                    <textarea
                      id="day-reflection"
                      value={dayJournalReflection}
                      onChange={(e) => handleSaveReflection(e.target.value)}
                      placeholder="Write your honest thoughts, prayers, or what God is speaking to you today..."
                      rows={3}
                      className="w-full bg-white/90 border border-[#D4AF37]/40 rounded-xl p-3 text-xs sm:text-sm text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] resize-y print:hidden"
                    />

                    {/* Printed Ruled Lines for physical notebooks/printouts */}
                    <div className="hidden print:block space-y-4 pt-2">
                      <div className="border-b border-[#7A8B7B]/40 pb-1 text-xs text-[#2B2B2B] min-h-[22px]">
                        {dayJournalReflection}
                      </div>
                      <div className="border-b border-[#7A8B7B]/40 h-5" />
                      <div className="border-b border-[#7A8B7B]/40 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-[#7A8B7B]/20 mt-6">
                <p className="text-[11px] text-[#7A8B7B]">
                  Day {monthData.dayNumber} of 365 • Sacred Steps Daily Devotional Guide
                </p>
              </div>
            </section>
          )}

          {/* ================= PAGE 4: GUIDED EXERCISE ================= */}
          {(viewMode === 'all' || currentPage === 4) && (
            <section className="page-break bg-[#F9F6F0] text-[#2B2B2B] rounded-2xl print:rounded-none border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-12 min-h-[780px] flex flex-col justify-between relative">
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-[#7A8B7B]/20 pb-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A8B7B] font-bold">
                    {monthData.monthName} Sample Guide • Page 4 of 5
                  </span>
                  <span className="font-['Cinzel',serif] text-xs text-[#D4AF37] font-semibold">
                    Trauma-Informed Worksheet
                  </span>
                </div>

                <div className="mt-6 max-w-2xl mx-auto space-y-6">
                  <div className="text-center">
                    <h2 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-extrabold text-[#1C2A39]">
                      {monthData.exerciseName}
                    </h2>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#7A8B7B] font-semibold mt-1">
                      {monthData.exerciseSubtitle}
                    </p>
                  </div>

                  {/* Trauma-Informed Intro Box */}
                  <div className="bg-[#7A8B7B]/10 border border-[#7A8B7B]/30 rounded-xl p-4 text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <Compass className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1C2A39] block font-bold mb-1">
                          Gentle Trauma-Informed Notice:
                        </strong>
                        <p>{monthData.exerciseTraumaIntro}</p>
                      </div>
                    </div>
                  </div>

                  {/* 3 Step Interactive / Ruled Form */}
                  <div className="space-y-5">
                    {monthData.exerciseSteps.map((step) => {
                      const answer = exerciseAnswers[step.stepNumber] || '';
                      return (
                        <div 
                          key={`exercise-step-${monthData.monthNumber}-${step.stepNumber}`} 
                          className="bg-white/80 border border-[#D4AF37]/30 rounded-xl p-4 sm:p-5 shadow-sm space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#1C2A39] text-[#D4AF37] text-xs font-bold flex items-center justify-center shrink-0">
                              {step.stepNumber}
                            </span>
                            <h4 className="font-['Cinzel',serif] text-sm font-bold text-[#1C2A39]">
                              {step.title}
                            </h4>
                          </div>

                          <p className="text-xs text-[#2B2B2B]/85">
                            {step.instruction}
                          </p>

                          <p className="text-xs font-semibold text-[#1C2A39]">
                            {step.prompt}
                          </p>

                          {step.exampleHint && (
                            <p className="text-[11px] text-[#7A8B7B] italic">
                              {step.exampleHint}
                            </p>
                          )}

                          {/* Digital Text Input */}
                          <textarea
                            value={answer}
                            onChange={(e) => handleSaveExerciseAnswer(step.stepNumber, e.target.value)}
                            placeholder="Type your response here..."
                            rows={2}
                            className="w-full bg-[#F9F6F0] border border-[#7A8B7B]/30 rounded-lg p-2.5 text-xs text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] resize-y print:hidden mt-2"
                          />

                          {/* Print Underline Ruled Lines */}
                          <div className="hidden print:block space-y-3 pt-2">
                            <div className="border-b border-[#7A8B7B]/40 pb-1 text-xs text-[#2B2B2B] min-h-[20px]">
                              {answer}
                            </div>
                            <div className="border-b border-[#7A8B7B]/40 h-4" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Callout Quote in Caveat Font */}
              <div className="mt-6 text-center max-w-2xl mx-auto w-full pt-4 border-t border-[#7A8B7B]/20">
                <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#D4AF37] font-bold">
                  "{monthData.authorEncouragementQuote}"
                </p>
                <p className="text-xs text-[#7A8B7B] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                  — C. Lamont Patrick, Author
                </p>
              </div>
            </section>
          )}

          {/* ================= PAGE 5: CONTINUE YOUR JOURNEY ================= */}
          {(viewMode === 'all' || currentPage === 5) && (
            <section className="page-break bg-[#F9F6F0] text-[#2B2B2B] rounded-2xl print:rounded-none border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-12 min-h-[780px] flex flex-col justify-between relative">
              <div>
                {/* Header Tag */}
                <div className="text-center border-b border-[#7A8B7B]/20 pb-2">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-widest text-[#7A8B7B] font-bold">
                    Next Steps in Redemption • Page 5 of 5
                  </p>
                </div>

                <div className="mt-6 max-w-2xl mx-auto text-center space-y-3">
                  <h2 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-extrabold text-[#1C2A39]">
                    You Don't Have to Walk Alone
                  </h2>
                  <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#D4AF37] font-medium">
                    Three Ways to Go Deeper in Your Recovery
                  </p>
                  <p className="text-xs sm:text-sm text-[#2B2B2B]/85 max-w-lg mx-auto">
                    Today’s exercise is just one step on a sacred pathway. Here is how you can continue building sustained, lifelong spiritual sobriety:
                  </p>
                </div>

                {/* 3 High-Converting Upsell Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-w-3xl mx-auto">
                  {/* Card 1: Monthly Transformation Journal */}
                  <div className="bg-white rounded-xl border-2 border-[#D4AF37]/60 p-5 shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#1C2A39] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-bl">
                      Recommended
                    </div>
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center mb-3">
                        <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <h4 className="font-['Cinzel',serif] text-sm font-bold text-[#1C2A39]">
                        {monthData.monthName} Journal
                      </h4>
                      <p className="text-[11px] text-[#7A8B7B] font-medium mt-0.5 mb-2">
                        {monthData.journalSubtitle}
                      </p>
                      <p className="text-xs text-[#2B2B2B]/80 leading-relaxed">
                        Full {monthData.journalPageCount}-page physical & digital journal. 30 daily exercises, weekly inventory check-ins, and lay-flat linen binding.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#7A8B7B]/20">
                      <button
                        onClick={() => setShowJournalUpsell(true)}
                        className="w-full py-2 bg-[#1C2A39] hover:bg-[#1C2A39]/90 text-[#D4AF37] font-bold text-xs rounded-lg shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Get the Journal
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 2: 365 Affirmations Ebook */}
                  <div className="bg-white rounded-xl border border-[#7A8B7B]/30 p-5 shadow-sm flex flex-col justify-between text-left">
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-[#1C2A39]/10 flex items-center justify-center mb-3">
                        <Sparkles className="w-5 h-5 text-[#1C2A39]" />
                      </div>
                      <h4 className="font-['Cinzel',serif] text-sm font-bold text-[#1C2A39]">
                        365 Affirmations Ebook
                      </h4>
                      <p className="text-[11px] text-[#7A8B7B] font-medium mt-0.5 mb-2">
                        Sacred Steps to Redemption
                      </p>
                      <p className="text-xs text-[#2B2B2B]/80 leading-relaxed">
                        The core year-long companion. 365 daily S.T.E.P. devotionals, biblically grounded truth reframes, and full digital searchability.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#7A8B7B]/20">
                      <button
                        onClick={() => setShowJournalUpsell(true)}
                        className="w-full py-2 bg-[#7A8B7B]/20 hover:bg-[#7A8B7B]/30 text-[#1C2A39] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Explore 365 Ebook
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Sacred Steps Audio & Community */}
                  <div className="bg-white rounded-xl border border-[#7A8B7B]/30 p-5 shadow-sm flex flex-col justify-between text-left">
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-[#7A8B7B]/15 flex items-center justify-center mb-3">
                        <Volume2 className="w-5 h-5 text-[#7A8B7B]" />
                      </div>
                      <h4 className="font-['Cinzel',serif] text-sm font-bold text-[#1C2A39]">
                        Audio & Community
                      </h4>
                      <p className="text-[11px] text-[#7A8B7B] font-medium mt-0.5 mb-2">
                        Sacred Walk Daily Audio
                      </p>
                      <p className="text-xs text-[#2B2B2B]/80 leading-relaxed">
                        Calm, steady voice affirmations with ambient dawn cathedrals, guided breathwork, and weekly community fellowship discussions.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#7A8B7B]/20">
                      <button
                        onClick={() => {
                          sacredAudio.startAmbient('dawn-cathedral');
                        }}
                        className="w-full py-2 bg-[#7A8B7B]/20 hover:bg-[#7A8B7B]/30 text-[#1C2A39] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Listen to Preview
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Special Community Discount Banner */}
                <div className="mt-6 bg-[#D4AF37]/10 border-2 border-dashed border-[#D4AF37] rounded-xl p-4 max-w-2xl mx-auto text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <Tag className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-['Cinzel',serif] text-xs font-bold text-[#1C2A39] uppercase tracking-wider">
                      Special Fellowship Community Discount
                    </span>
                  </div>
                  <p className="text-xs text-[#2B2B2B]">
                    Use discount code <strong className="font-mono bg-white px-2 py-0.5 rounded border border-[#D4AF37] text-[#1C2A39] font-bold">GRACE20</strong> at checkout for 20% off all journals & bundle collections.
                  </p>
                  <p className="text-[10px] text-[#7A8B7B]">
                    Valid on Amazon and direct publisher bookstore orders.
                  </p>
                </div>
              </div>

              {/* Author Final Benediction & Sign-Off */}
              <div className="text-center pt-6 border-t border-[#7A8B7B]/20 mt-6 max-w-xl mx-auto space-y-2">
                <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#1C2A39] font-bold">
                  "Keep taking the steps. One breath. One prayer. One day at a time."
                </p>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#7A8B7B] font-semibold">
                  — C. Lamont Patrick, Author
                </p>
                <p className="text-[10px] text-[#7A8B7B]/70 pt-2">
                  Published by Kya Daisy Publishing • sacred-steps-affirmations.ai.studio
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Floating Page Nav for Mobile/Single Page view */}
        {viewMode === 'single' && (
          <div className="no-print fixed bottom-4 z-50 flex items-center gap-3 bg-[#1C2A39]/95 text-[#F9F6F0] px-4 py-2 rounded-full border border-[#D4AF37]/40 shadow-2xl backdrop-blur-md">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="flex items-center gap-1 text-xs font-medium text-[#F9F6F0] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#D4AF37] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="font-['Cinzel',serif] text-xs font-semibold text-[#D4AF37] px-2 border-x border-[#7A8B7B]/30">
              Page {currentPage} of 5
            </span>

            <button
              disabled={currentPage === 5}
              onClick={() => setCurrentPage(p => Math.min(5, p + 1))}
              className="flex items-center gap-1 text-xs font-medium text-[#F9F6F0] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#D4AF37] cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Email Capture Modal */}
      <LeadMagnetModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        dayAttempted={monthData.dayNumber}
        onSuccessUnlock={() => {
          setShowEmailModal(false);
          handleDownloadTextGuide();
        }}
      />

      {/* Journal Upsell Modal */}
      <JournalUpsellModal
        isOpen={showJournalUpsell}
        onClose={() => setShowJournalUpsell(false)}
        dayNumber={monthData.dayNumber}
        source="lead_magnet_page_5"
      />
    </>
  );
};
