import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  SquareCheck, 
  Square, 
  Copy, 
  Check, 
  Heart, 
  Sparkles, 
  BookOpen, 
  PenTool, 
  Calendar,
  Lock,
  ArrowRight,
  Gift,
  Share2
} from 'lucide-react';
import { DayEntry, WeekData } from '../../types';
import { getDayByNumber, getWeekForDay, getCurrentCalendarDayOfYear } from '../../data/weeksData';
import { storageService } from '../../services/storageService';
import { sacredAudio } from '../../services/audioService';
import { leadMagnetService } from '../../services/leadMagnetService';
import { analyticsService } from '../../services/analyticsService';
import { DailySacredStep } from './DailySacredStep';
import { WeeklyGraceRecap } from './WeeklyGraceRecap';
import { LeadMagnetModal } from '../lead/LeadMagnetModal';
import { MilestoneCelebrationModal } from './MilestoneCelebrationModal';
import { JournalUpsellModal } from '../journals/JournalUpsellModal';
import { ShareGraphicModal } from './ShareGraphicModal';

interface DailyWalkViewProps {
  currentDayNumber: number;
  onSelectDay: (day: number) => void;
  graceActive: boolean;
  onDismissGrace: () => void;
}

export const DailyWalkView: React.FC<DailyWalkViewProps> = ({
  currentDayNumber,
  onSelectDay,
  graceActive,
  onDismissGrace
}) => {
  const day: DayEntry = getDayByNumber(currentDayNumber);
  const week: WeekData = getWeekForDay(currentDayNumber);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [reflection, setReflection] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [dayInput, setDayInput] = useState<string>(currentDayNumber.toString());
  const [displayMode, setDisplayMode] = useState<'sacred-step' | 'full-walk'>('sacred-step');

  // Lead magnet gating & Sunday recap state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => leadMagnetService.isUnlocked());
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);
  const [attemptedDay, setAttemptedDay] = useState<number>(currentDayNumber);
  const [showWeeklyRecap, setShowWeeklyRecap] = useState<boolean>(() => day.dayOfWeek === 7);
  const [showMilestoneModal, setShowMilestoneModal] = useState<boolean>(false);
  const [showJournalUpsell, setShowJournalUpsell] = useState<boolean>(false);

  // Check access permission for the active day
  const canAccessCurrentDay = leadMagnetService.canAccessDay(currentDayNumber);

  // Load state on day change and evaluate 7-day usage trigger
  useEffect(() => {
    const completedList = storageService.getCompletedSteps();
    setIsCompleted(completedList.includes(currentDayNumber));

    const favoritesList = storageService.getFavorites();
    setIsFavorite(favoritesList.includes(currentDayNumber));

    const entries = storageService.getJournalEntries();
    setReflection(entries[currentDayNumber]?.reflection || '');

    setDayInput(currentDayNumber.toString());
    sacredAudio.stopSpeaking();
    setIsSpeaking(false);

    // On Sunday (day 7 of week), default to Weekly Grace Recap
    if (day.dayOfWeek === 7) {
      setShowWeeklyRecap(true);
    } else {
      setShowWeeklyRecap(false);
    }

    // Record usage for today
    leadMagnetService.recordTodayUsage(currentDayNumber);

    // Check if 7-day usage milestone has been reached or if day is locked
    if (leadMagnetService.shouldTrigger7DayModal(currentDayNumber)) {
      setAttemptedDay(currentDayNumber);
      setShowLeadModal(true);
    }
  }, [currentDayNumber, day.dayOfWeek]);

  const handleToggleComplete = () => {
    const newState = storageService.toggleCompletedStep(currentDayNumber);
    setIsCompleted(newState);
    analyticsService.trackTookThisStepClicked(currentDayNumber, newState);

    if (newState) {
      sacredAudio.playSacredChime();
      // If completing day 7 of week, trigger milestone celebration modal
      if (day.dayOfWeek === 7) {
        setShowMilestoneModal(true);
      }
    }
  };

  const handleToggleFavorite = () => {
    const newState = storageService.toggleFavorite(currentDayNumber);
    setIsFavorite(newState);
  };

  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setReflection(val);
    storageService.saveJournalEntry(currentDayNumber, val);
  };

  const handleCopyScripture = () => {
    navigator.clipboard.writeText(`${day.scriptureText} — ${day.scriptureRef}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakAloud = () => {
    if (isSpeaking) {
      sacredAudio.stopSpeaking();
      setIsSpeaking(false);
    } else {
      const fullText = `Day ${day.dayNumber}. Scripture: ${day.scriptureRef}. ${day.scriptureText}. Truth: ${day.truth}. Embrace this truth: ${day.embrace}. Today's sacred step: ${day.sacredStep}`;
      analyticsService.track('audio_affirmation_played', { dayNumber: day.dayNumber, section: 'full' });
      sacredAudio.speakDevotional(
        fullText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const tryNavigateToDay = (targetDay: number) => {
    if (targetDay < 1 || targetDay > 365) return;

    if (!leadMagnetService.canAccessDay(targetDay)) {
      setAttemptedDay(targetDay);
      setShowLeadModal(true);
      return;
    }

    onSelectDay(targetDay);
  };

  const handlePrevDay = () => {
    if (currentDayNumber > 1) {
      tryNavigateToDay(currentDayNumber - 1);
    }
  };

  const handleNextDay = () => {
    if (currentDayNumber < 365) {
      tryNavigateToDay(currentDayNumber + 1);
    }
  };

  const handleJumpToday = () => {
    const calDay = getCurrentCalendarDayOfYear();
    tryNavigateToDay(calDay);
  };

  const handleManualDaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(dayInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 365) {
      setShowCalendarModal(false);
      tryNavigateToDay(parsed);
    }
  };

  return (
    <div className="pb-28">
      {/* Hero Visual Banner with Dawn Theme */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#1C2A39]">
        <img
          src="/src/assets/images/dawn_serene_path_1790367293980.jpg"
          alt="Serene morning path at dawn with gentle sunlight"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-85 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A39] via-[#1C2A39]/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-5 text-[#F9F6F0]">
          <div className="flex items-center justify-between text-xs text-[#D4AF37] tracking-wider uppercase font-semibold">
            <span>Month {week.monthNumber} · {week.monthName}</span>
            <span>Week {week.weekNumber} of 52</span>
          </div>
          <h1 className="font-serif-sacred text-2xl sm:text-3xl font-bold tracking-tight text-[#F9F6F0] mt-1 text-balance">
            {week.title}
          </h1>
          <p className="font-script-sacred text-[#D4AF37] text-lg sm:text-xl mt-0.5 opacity-95">
            “A Path to Recovery, A Life in Grace.”
          </p>
        </div>
      </div>

      {/* LEAD MAGNET INLINE BANNER (For Days 1-7 when not yet unlocked) */}
      {!isUnlocked && currentDayNumber <= 7 && (
        <div className="max-w-xl mx-auto px-4 mt-3">
          <div className="bg-[#1C2A39] text-[#F9F6F0] rounded-xl p-3 sm:p-4 border border-[#D4AF37]/50 shadow-sm flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-2.5">
              <Gift className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[#F9F6F0]">
                  Free 7-Day Experience · <span className="text-[#D4AF37]">Day {Math.min(7, leadMagnetService.getDaysOfUsageCount())} of 7 Walked</span>
                </p>
                <p className="text-[11px] text-[#7A8B7B] mt-0.5">
                  Unlock the full 365-day walk and get your complimentary <em>30-Day Redemption Prayer Guide</em>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  leadMagnetService.simulate7DaysUsage(7);
                  setAttemptedDay(currentDayNumber);
                  setShowLeadModal(true);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] text-[11px] font-semibold transition-all cursor-pointer border border-[#D4AF37]/30"
                title="Simulate 7 days of app usage for testing"
              >
                Test 7-Day Trigger
              </button>
              <button
                onClick={() => {
                  setAttemptedDay(8);
                  setShowLeadModal(true);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c29f31] text-[#1C2A39] text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] transition-all cursor-pointer shadow-xs"
              >
                Get Free Guide
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 mt-4 space-y-5">
        {/* Day Selector Navigation Bar */}
        <div className="flex items-center justify-between bg-white border border-[#D4AF37]/25 rounded-2xl p-2 shadow-sm">
          <button
            onClick={handlePrevDay}
            disabled={currentDayNumber <= 1}
            aria-label="Previous Day"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#1C2A39] hover:bg-[#F9F6F0] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowCalendarModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#F9F6F0] text-center transition-colors group cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-wider text-[#7A8B7B] font-medium">
                Day {day.dayNumber} of 365
              </span>
              <span className="font-serif-sacred text-base font-bold text-[#1C2A39] group-hover:text-[#D4AF37] transition-colors">
                Day {day.dayOfWeek} of Week {day.weekNumber}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowShareModal(true)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#1C2A39] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#1C2A39] transition-all cursor-pointer flex items-center gap-1 shadow-xs"
              title="Share Daily S.T.E.P. (1080×1080 Square Graphic)"
              aria-label="Share Graphic"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={handleJumpToday}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#1C2A39] transition-all cursor-pointer"
              title="Jump to Today's Calendar Day"
            >
              Today
            </button>
            <button
              onClick={handleNextDay}
              disabled={currentDayNumber >= 365}
              aria-label="Next Day"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#1C2A39] hover:bg-[#F9F6F0] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Locked Day Warning Placeholder if Day > 7 and not yet unlocked */}
        {!canAccessCurrentDay ? (
          <div className="bg-[#F9F6F0] rounded-2xl border-2 border-[#D4AF37] p-8 text-center shadow-lg space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-[#7A8B7B]">
                Day {currentDayNumber} · Sacred Step Locked
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-bold text-[#1C2A39]">
                Unlock the Full 365-Day Walk
              </h3>
              <p className="font-['Caveat',cursive] text-xl text-[#D4AF37]">
                “Your free 30-Day Redemption Prayer Guide is ready.”
              </p>
            </div>
            <p className="text-xs text-[#2B2B2B]/80 font-['Plus_Jakarta_Sans',sans-serif] max-w-md mx-auto leading-relaxed">
              Days 1 through 7 are completely free. Join our faith and recovery community to unlock Day {currentDayNumber} and all 365 daily devotionals.
            </p>
            <button
              onClick={() => {
                setAttemptedDay(currentDayNumber);
                setShowLeadModal(true);
              }}
              className="min-h-[50px] py-3.5 px-8 rounded-full bg-[#1C2A39] hover:bg-[#D4AF37] text-[#F9F6F0] hover:text-[#1C2A39] font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold transition-all duration-300 shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Unlock Full App & Get Free Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Sunday / Day 7 of Week: Option to View Weekly Grace Recap or Sacred Step Screen */}
            {day.dayOfWeek === 7 && (
              <div className="flex items-center justify-center gap-2 p-1 bg-[#1C2A39]/5 rounded-xl border border-[#D4AF37]/25 max-w-sm mx-auto">
                <button
                  onClick={() => setShowWeeklyRecap(true)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    showWeeklyRecap
                      ? 'bg-[#1C2A39] text-[#D4AF37] shadow-xs'
                      : 'text-[#7A8B7B] hover:text-[#1C2A39]'
                  }`}
                >
                  Weekly Grace Recap
                </button>
                <button
                  onClick={() => setShowWeeklyRecap(false)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    !showWeeklyRecap
                      ? 'bg-[#1C2A39] text-[#F9F6F0] shadow-xs'
                      : 'text-[#7A8B7B] hover:text-[#1C2A39]'
                  }`}
                >
                  Day 7 Sacred Step
                </button>
              </div>
            )}

            {/* SUNDAY RECAP VIEW (Feature 6) */}
            {showWeeklyRecap && day.dayOfWeek === 7 ? (
              <WeeklyGraceRecap
                week={week}
                onOpenJournalUpsell={() => setShowJournalUpsell(true)}
                onSwitchToDailyStep={() => setShowWeeklyRecap(false)}
              />
            ) : (
              /* PRIMARY DAILY SACRED STEP VIEW */
              <div className="bg-[#F9F6F0] rounded-2xl border border-[#D4AF37]/30 shadow-xs overflow-hidden">
                <DailySacredStep
                  dayNumber={day.dayOfWeek}
                  totalDaysInWeek={7}
                  globalDayNumber={currentDayNumber}
                  weekNumber={week.weekNumber}
                  monthNumber={week.monthNumber}
                  monthName={week.monthName}
                  themeTitle={week.title}
                  scriptureRef={day.scriptureRef}
                  scriptureText={day.scriptureText}
                  truth={day.truth}
                  embrace={day.embrace}
                  practiceStep={day.sacredStep}
                  isInitialCompleted={isCompleted}
                  isGraceModeActive={graceActive}
                  onToggleGraceMode={(active) => {
                    if (active) {
                      storageService.setGraceMode(true);
                      sacredAudio.playSacredChime();
                    } else {
                      onDismissGrace();
                    }
                  }}
                  accumulatedSteps={storageService.getCompletedSteps().length}
                  onStepCompleted={(completed) => {
                    storageService.setCompletedStep(currentDayNumber, completed);
                    setIsCompleted(completed);
                    if (completed) {
                      sacredAudio.playSacredChime();
                      if (day.dayOfWeek === 7) {
                        setShowMilestoneModal(true);
                      }
                    }
                  }}
                  onOpenLeadMagnet={() => {
                    setAttemptedDay(currentDayNumber);
                    setShowLeadModal(true);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* LEAD MAGNET & EMAIL CAPTURE MODAL (Feature 1) */}
      <LeadMagnetModal
        isOpen={showLeadModal}
        onClose={() => {
          setShowLeadModal(false);
          // If attempted day was locked and user closed, keep on a free day (1-7)
          if (!leadMagnetService.canAccessDay(currentDayNumber)) {
            onSelectDay(1);
          }
        }}
        dayAttempted={attemptedDay}
        daysOfUsage={leadMagnetService.getDaysOfUsageCount()}
        onSuccessUnlock={() => {
          setIsUnlocked(true);
        }}
      />

      {/* SHAREABLE GRAPHIC MODAL (Feature 3 - html2canvas DOM Capture) */}
      <ShareGraphicModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        dayNumber={currentDayNumber}
        scriptureRef={day.scriptureRef}
        scriptureText={day.scriptureText}
        embrace={day.embrace}
        truth={day.truth}
        practiceStep={day.sacredStep}
        themeTitle={week.title}
      />

      {/* MILESTONE CELEBRATION MODAL (Feature 5) */}
      <MilestoneCelebrationModal
        isOpen={showMilestoneModal}
        onClose={() => setShowMilestoneModal(false)}
        week={week}
        onOpenJournalUpsell={() => setShowJournalUpsell(true)}
      />

      {/* MONTHLY JOURNAL PREVIEW & UPSELL MODAL (Feature 2) */}
      <JournalUpsellModal
        isOpen={showJournalUpsell}
        onClose={() => setShowJournalUpsell(false)}
        dayNumber={currentDayNumber}
        source="weekly_recap"
      />

      {/* Jump to Day Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-[#D4AF37]/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-sacred text-xl font-bold text-[#1C2A39]">
                Select Day in the Journey
              </h3>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="text-[#7A8B7B] hover:text-[#1C2A39] text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#7A8B7B]">
              Enter any day between 1 and 365, or jump quickly to today’s calendar date.
            </p>

            <form onSubmit={handleManualDaySubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#1C2A39]">Day Number (1 - 365)</label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={dayInput}
                  onChange={(e) => setDayInput(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-[#D4AF37]/40 rounded-xl text-lg font-bold text-center text-[#1C2A39] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleJumpToday}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold border border-[#7A8B7B] text-[#7A8B7B] hover:bg-[#F9F6F0] cursor-pointer"
                >
                  Current Day ({getCurrentCalendarDayOfYear()})
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#D4AF37] text-[#1C2A39] hover:bg-[#c29f31] cursor-pointer"
                >
                  Go to Day
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
