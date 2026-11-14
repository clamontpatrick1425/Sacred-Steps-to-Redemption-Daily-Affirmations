import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  CheckCircle, 
  Circle, 
  Plus, 
  Sparkles, 
  Heart, 
  BookOpen, 
  Calendar,
  MessageSquareHeart,
  Award,
  FileText
} from 'lucide-react';
import { MEMORY_VERSES } from '../../data/memoryVerses';
import { BOOK_FOUNDATION } from '../../data/bookFoundation';
import { MONTHLY_LEAD_MAGNET_DATA } from '../../data/monthlyLeadMagnetData';
import { storageService } from '../../services/storageService';
import { sacredAudio } from '../../services/audioService';
import { leadMagnetPdfService } from '../../services/leadMagnetPdfService';
import { PrayerItem, GratitudeEntry } from '../../types';
import { MonthlySampleLeadMagnet } from '../lead/MonthlySampleLeadMagnet';

export const SpecialFeaturesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'memory' | 'guides' | 'gratitude' | 'prayers' | 'story'>('memory');
  const [selectedLeadMonth, setSelectedLeadMonth] = useState<number>(1);
  const [isLeadMagnetModalOpen, setIsLeadMagnetModalOpen] = useState<boolean>(false);

  // Scripture Memory state
  const [memorizedList, setMemorizedList] = useState<number[]>([]);

  // Gratitude state
  const [gratitudeEntries, setGratitudeEntries] = useState<Record<number, GratitudeEntry>>({});
  const [activeGratitudeDay, setActiveGratitudeDay] = useState<number>(1);
  const [gratitudeText, setGratitudeText] = useState<string>('');

  // Prayer state
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [newPrayerRequest, setNewPrayerRequest] = useState<string>('');
  const [newPrayerCategory, setNewPrayerCategory] = useState<PrayerItem['category']>('Sobriety');
  const [showAddPrayer, setShowAddPrayer] = useState<boolean>(false);
  const [answeringPrayerId, setAnsweringPrayerId] = useState<string | null>(null);
  const [testimonyText, setTestimonyText] = useState<string>('');

  useEffect(() => {
    setMemorizedList(storageService.getMemorizedVerses());
    const gEntries = storageService.getGratitudeEntries();
    setGratitudeEntries(gEntries);
    setPrayers(storageService.getPrayers());

    // Set active gratitude text if day 1 exists
    if (gEntries[1]) {
      setGratitudeText(gEntries[1].entry);
    }
  }, []);

  const handleToggleMemorized = (monthNum: number) => {
    const isNowMem = storageService.toggleMemorizedVerse(monthNum);
    setMemorizedList(storageService.getMemorizedVerses());
    if (isNowMem) {
      sacredAudio.playSacredChime();
    }
  };

  const handleSelectGratitudeDay = (day: number) => {
    setActiveGratitudeDay(day);
    setGratitudeText(gratitudeEntries[day]?.entry || '');
  };

  const handleSaveGratitude = () => {
    if (!gratitudeText.trim()) return;
    storageService.saveGratitudeEntry(activeGratitudeDay, gratitudeText.trim());
    setGratitudeEntries(storageService.getGratitudeEntries());
    sacredAudio.playSacredChime();
  };

  const handleCreatePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerRequest.trim()) return;
    const newP: PrayerItem = {
      id: 'p_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      request: newPrayerRequest.trim(),
      category: newPrayerCategory,
      isAnswered: false
    };
    const updated = [newP, ...prayers];
    setPrayers(updated);
    storageService.savePrayers(updated);
    setNewPrayerRequest('');
    setShowAddPrayer(false);
    sacredAudio.playSacredChime();
  };

  const handleRecordTestimony = (prayerId: string) => {
    if (!testimonyText.trim()) return;
    const updated = prayers.map(p => {
      if (p.id === prayerId) {
        return {
          ...p,
          isAnswered: true,
          testimony: testimonyText.trim(),
          answeredDate: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    });
    setPrayers(updated);
    storageService.savePrayers(updated);
    setAnsweringPrayerId(null);
    setTestimonyText('');
    sacredAudio.playSacredChime();
  };

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="bg-[#1C2A39] text-[#F9F6F0] p-6 border-b border-[#D4AF37]/20">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Spiritual Exercises & Foundation
          </span>
          <h1 className="font-serif-sacred text-2xl sm:text-3xl font-bold">
            Sacred Companion Practices
          </h1>
          <p className="text-xs sm:text-sm text-[#F9F6F0]/80 font-sans-sacred">
            Scripture memory, a 30-day gratitude ledger, prayer testimonies, and the author’s story.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex gap-1.5 pt-3 overflow-x-auto scrollbar-none">
            {[
              { id: 'memory', label: 'Scripture Memory' },
              { id: 'guides', label: '12 Free Guides' },
              { id: 'gratitude', label: '30-Day Gratitude' },
              { id: 'prayers', label: 'Prayer Tracker' },
              { id: 'story', label: 'Author Story' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] text-[#1C2A39]'
                    : 'bg-white/10 text-[#F9F6F0]/80 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-5 space-y-5">
        {/* TAB 1: SCRIPTURE MEMORY */}
        {activeTab === 'memory' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white border-l-4 border-[#D4AF37] p-4 rounded-xl shadow-xs">
              <h2 className="font-serif-sacred text-xl font-bold text-[#1C2A39]">
                Scripture Memory Challenge
              </h2>
              <p className="text-xs text-[#7A8B7B] mt-1 leading-relaxed">
                Commit one foundational verse from each month to memory — twelve in total. Over time, these verses will become instinctual armor when temptation or shame strikes.
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-[#1C2A39]">
                <span className="font-semibold">{memorizedList.length} of 12 Verses Committed</span>
                <span className="text-[#D4AF37] font-bold font-mono">
                  {Math.round((memorizedList.length / 12) * 100)}%
                </span>
              </div>
              <div className="w-full bg-[#F9F6F0] rounded-full h-2 mt-1.5 overflow-hidden">
                <div
                  className="bg-[#D4AF37] h-full transition-all duration-500"
                  style={{ width: `${(memorizedList.length / 12) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {MEMORY_VERSES.map((mv, mvIdx) => {
                const isMemorized = memorizedList.includes(mv.monthNumber);
                return (
                  <div
                    key={`memory-verse-${mv.monthNumber}-${mvIdx}`}
                    className={`bg-white border rounded-2xl p-4 transition-all shadow-xs ${
                      isMemorized
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-[#D4AF37]/25 hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                          Month {mv.monthNumber} · {mv.monthName}
                        </span>
                        <span className="text-xs text-[#7A8B7B]">({mv.theme})</span>
                      </div>
                      <button
                        onClick={() => handleToggleMemorized(mv.monthNumber)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          isMemorized
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-[#F9F6F0] text-[#1C2A39] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30'
                        }`}
                      >
                        {isMemorized ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Memorized</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5 text-[#7A8B7B]" />
                            <span>Mark Memorized</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="font-serif-sacred text-lg text-[#1C2A39] font-medium leading-relaxed">
                      {mv.text}
                    </p>
                    <span className="text-xs font-semibold text-[#D4AF37] mt-1 block text-right font-serif-sacred">
                      — {mv.reference}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: 12 MONTHLY FREE SAMPLE GUIDES & EXERCISES */}
        {activeTab === 'guides' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white border-l-4 border-[#D4AF37] p-5 rounded-2xl shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A8B7B]">
                Free Sample Lead Magnets
              </span>
              <h2 className="font-['Cinzel',serif] text-xl font-bold text-[#1C2A39]">
                12 Transformation Journal Guides
              </h2>
              <p className="text-xs text-[#2B2B2B]/85 leading-relaxed">
                Experience the Sacred S.T.E.P. Method™ and guided trauma-informed exercises for every monthly theme of the year. Read online, type your personal reflections, or print / save as a clean 5-page PDF workbook.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {Object.values(MONTHLY_LEAD_MAGNET_DATA).map((guide, gIdx) => (
                <div
                  key={`lead-guide-${guide.monthNumber}-${gIdx}`}
                  className="bg-white border border-[#D4AF37]/35 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#7A8B7B] tracking-wider">
                        Month {guide.monthNumber} · Day {guide.dayNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#1C2A39] border border-[#D4AF37]/30">
                        {guide.monthTheme}
                      </span>
                    </div>

                    <h3 className="font-['Cinzel',serif] text-base font-bold text-[#1C2A39]">
                      {guide.monthName}: {guide.dailyTheme}
                    </h3>

                    <p className="text-xs text-[#7A8B7B] font-['Cormorant_Garamond',serif] italic">
                      "{guide.scriptureReference}" — {guide.scriptureText.slice(0, 75)}...
                    </p>

                    <div className="bg-[#F9F6F0] rounded-lg p-2.5 text-xs space-y-1">
                      <p className="font-semibold text-[#1C2A39]">
                        Worksheet: <span className="font-normal text-[#2B2B2B]">{guide.exerciseName}</span>
                      </p>
                      <p className="text-[11px] text-[#7A8B7B] line-clamp-2">
                        {guide.exerciseSubtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#7A8B7B]/15 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-medium text-[#7A8B7B]">
                      5-Page Guide
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => leadMagnetPdfService.downloadFormattedPdf(guide.monthNumber)}
                        className="px-2.5 py-1.5 bg-[#D4AF37] hover:bg-[#c29f31] text-[#1C2A39] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                        title={`Download formatted PDF for ${guide.monthName}`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLeadMonth(guide.monthNumber);
                          setIsLeadMagnetModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-[#1C2A39] hover:bg-[#25384d] text-[#D4AF37] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 30-DAY GRATITUDE CHALLENGE */}
        {activeTab === 'gratitude' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white border-l-4 border-[#7A8B7B] p-4 rounded-xl shadow-xs">
              <h2 className="font-serif-sacred text-xl font-bold text-[#1C2A39]">
                30-Day Gratitude Challenge
              </h2>
              <p className="text-xs text-[#7A8B7B] mt-1 leading-relaxed">
                “For the next 30 days, write down one specific, concrete thing you’re grateful for before bed — not a repeat of a previous day’s answer. By day thirty, you’ll have a written record of thirty distinct evidences of God’s goodness in your life.”
              </p>
            </div>

            {/* Day Selector Chips */}
            <div className="bg-white p-3 rounded-2xl border border-[#D4AF37]/20">
              <span className="text-[11px] font-semibold text-[#7A8B7B] uppercase tracking-wider block mb-2">
                Select Day (1–30)
              </span>
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
                  const hasEntry = !!gratitudeEntries[d];
                  const isCurrent = activeGratitudeDay === d;
                  return (
                    <button
                      key={d}
                      onClick={() => handleSelectGratitudeDay(d)}
                      className={`h-9 rounded-lg text-xs font-bold transition-all relative ${
                        isCurrent
                          ? 'bg-[#1C2A39] text-[#D4AF37] ring-2 ring-[#D4AF37]'
                          : hasEntry
                          ? 'bg-[#D4AF37]/20 text-[#1C2A39] border border-[#D4AF37]/40'
                          : 'bg-[#F9F6F0] text-[#7A8B7B] hover:bg-slate-200'
                      }`}
                    >
                      {d}
                      {hasEntry && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4AF37] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gratitude Active Form */}
            <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif-sacred text-lg font-bold text-[#1C2A39]">
                  Gratitude Entry · Day {activeGratitudeDay}
                </span>
                {gratitudeEntries[activeGratitudeDay]?.date && (
                  <span className="text-xs text-[#7A8B7B]">
                    Recorded: {gratitudeEntries[activeGratitudeDay].date}
                  </span>
                )}
              </div>

              <textarea
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
                rows={4}
                placeholder={`Name one concrete, unrepeatable evidence of God's grace for Day ${activeGratitudeDay}...`}
                className="w-full text-sm p-3.5 rounded-xl border border-[#D4AF37]/30 bg-[#F9F6F0]/60 text-[#2B2B2B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 resize-none"
              />

              <button
                onClick={handleSaveGratitude}
                className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#c29f31] text-[#1C2A39] font-semibold text-xs rounded-xl shadow-xs transition-all active:scale-[0.99]"
              >
                Save Day {activeGratitudeDay} Gratitude
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PRAYER TRACKER */}
        {activeTab === 'prayers' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white border-l-4 border-[#1C2A39] p-4 rounded-xl shadow-xs flex items-center justify-between">
              <div>
                <h2 className="font-serif-sacred text-xl font-bold text-[#1C2A39]">
                  Prayer & Testimony Ledger
                </h2>
                <p className="text-xs text-[#7A8B7B] mt-0.5">
                  Keep a running list of what you prayed for, and how God answered.
                </p>
              </div>
              <button
                onClick={() => setShowAddPrayer(!showAddPrayer)}
                className="min-h-[40px] px-3 py-1.5 bg-[#1C2A39] text-[#D4AF37] rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-[#25384d] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Prayer</span>
              </button>
            </div>

            {/* Add Prayer Card */}
            {showAddPrayer && (
              <form onSubmit={handleCreatePrayer} className="bg-white p-5 rounded-2xl border border-[#D4AF37] shadow-sm space-y-3">
                <h3 className="font-serif-sacred text-base font-bold text-[#1C2A39]">
                  Record a Prayer Request
                </h3>
                <textarea
                  value={newPrayerRequest}
                  onChange={(e) => setNewPrayerRequest(e.target.value)}
                  placeholder="What are you crying out to God for right now?..."
                  rows={3}
                  required
                  className="w-full text-sm p-3 rounded-xl border border-[#D4AF37]/30 bg-[#F9F6F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <div className="flex gap-2">
                  <select
                    value={newPrayerCategory}
                    onChange={(e) => setNewPrayerCategory(e.target.value as PrayerItem['category'])}
                    className="text-xs px-3 py-2 rounded-xl border border-[#D4AF37]/30 bg-[#F9F6F0] text-[#1C2A39]"
                  >
                    <option value="Sobriety">Sobriety</option>
                    <option value="Healing">Healing</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Courage">Courage</option>
                    <option value="Peace">Peace</option>
                    <option value="Gratitude">Gratitude</option>
                  </select>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#D4AF37] text-[#1C2A39] font-semibold text-xs rounded-xl hover:bg-[#c29f31]"
                  >
                    Save Prayer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddPrayer(false)}
                    className="px-3 py-2 text-xs text-[#7A8B7B]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Prayers List */}
            <div className="space-y-3">
              {prayers.map((prayer, pIdx) => (
                <div
                  key={`prayer-${prayer.id || pIdx}-${pIdx}`}
                  className={`bg-white rounded-2xl p-4 border transition-all shadow-xs ${
                    prayer.isAnswered ? 'border-amber-300 bg-amber-50/20' : 'border-[#D4AF37]/25'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#1C2A39]">
                        {prayer.category}
                      </span>
                      <span className="text-[11px] text-[#7A8B7B]">
                        · {prayer.date}
                      </span>
                    </div>
                    {prayer.isAnswered ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        <Award className="w-3.5 h-3.5" />
                        <span>Answered Testimony</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setAnsweringPrayerId(prayer.id)}
                        className="text-xs text-[#7A8B7B] hover:text-[#D4AF37] underline"
                      >
                        Record Answer
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-[#1C2A39] leading-relaxed">
                    {prayer.request}
                  </p>

                  {/* Testimony Section */}
                  {prayer.isAnswered && prayer.testimony && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                        God’s Faithfulness ({prayer.answeredDate})
                      </span>
                      <p className="font-serif-sacred text-sm italic text-[#1C2A39] mt-0.5">
                        “{prayer.testimony}”
                      </p>
                    </div>
                  )}

                  {/* Answer Form */}
                  {answeringPrayerId === prayer.id && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                      <label className="text-xs font-bold text-[#1C2A39] block">
                        How did God meet or answer this prayer?
                      </label>
                      <textarea
                        value={testimonyText}
                        onChange={(e) => setTestimonyText(e.target.value)}
                        placeholder="Write the testimony of God's faithfulness..."
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-xl border border-amber-300 bg-amber-50/30"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRecordTestimony(prayer.id)}
                          className="px-3 py-1.5 bg-[#D4AF37] text-[#1C2A39] font-bold text-xs rounded-lg"
                        >
                          Save Testimony
                        </button>
                        <button
                          onClick={() => setAnsweringPrayerId(null)}
                          className="px-3 py-1.5 text-xs text-[#7A8B7B]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AUTHOR STORY & S.T.E.P. FOUNDATION */}
        {activeTab === 'story' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Visual Image */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-sm">
              <img
                src="/src/assets/images/open_door_freedom_1790367314643.jpg"
                alt="Open rustic door to golden mountain valley"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A39] via-[#1C2A39]/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[#F9F6F0]">
                <h2 className="font-serif-sacred text-2xl font-bold">
                  {BOOK_FOUNDATION.authorStory.heading}
                </h2>
                <p className="text-xs text-[#D4AF37] font-script-sacred text-lg">
                  “He met me in the relapse as much as in the recovery meeting.”
                </p>
              </div>
            </div>

            {/* Author's Personal Testimony from Book */}
            <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xs space-y-3 font-sans-sacred text-sm text-[#2B2B2B] leading-relaxed">
              {BOOK_FOUNDATION.authorStory.paragraphs.map((p, idx) => (
                <p key={`story-para-${idx}`}>{p}</p>
              ))}
            </div>

            {/* Dedication */}
            <div className="bg-[#1C2A39] text-[#F9F6F0] rounded-2xl p-5 border border-[#D4AF37]/30 space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                {BOOK_FOUNDATION.dedication.heading}
              </span>
              <p className="font-serif-sacred text-base italic leading-relaxed text-[#F9F6F0]">
                {BOOK_FOUNDATION.dedication.toText}
              </p>
              <p className="text-xs text-[#F9F6F0]/90 leading-relaxed font-sans-sacred">
                {BOOK_FOUNDATION.dedication.bodyText}
              </p>
            </div>

            {/* The S.T.E.P. Method Breakdown */}
            <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-serif-sacred text-xl font-bold text-[#1C2A39]">
                {BOOK_FOUNDATION.stepMethod.heading}
              </h3>
              <p className="text-xs text-[#7A8B7B] leading-relaxed">
                {BOOK_FOUNDATION.stepMethod.intro}
              </p>
              <div className="space-y-3">
                {BOOK_FOUNDATION.stepMethod.steps.map((st, sIdx) => (
                  <div key={`step-method-${st.letter}-${sIdx}`} className="flex items-start gap-3 p-3 bg-[#F9F6F0] rounded-xl border border-[#D4AF37]/20">
                    <span className="w-7 h-7 rounded-full bg-[#1C2A39] text-[#D4AF37] font-bold text-sm flex items-center justify-center shrink-0">
                      {st.letter}
                    </span>
                    <div>
                      <h4 className="font-serif-sacred font-bold text-base text-[#1C2A39]">
                        {st.name}
                      </h4>
                      <p className="text-xs text-[#2B2B2B]/85 mt-0.5 leading-relaxed font-sans-sacred">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold italic text-[#1C2A39] border-t border-slate-100 pt-3">
                {BOOK_FOUNDATION.stepMethod.instructions}
              </p>
            </div>

            {/* Closing Prayer from Page 114 */}
            <div className="bg-white border-l-4 border-[#D4AF37] p-4 rounded-xl shadow-xs">
              <span className="text-[11px] font-bold text-[#7A8B7B] uppercase tracking-wider block mb-1">
                A Closing Pastoral Prayer
              </span>
              <p className="font-serif-sacred text-base italic text-[#1C2A39] leading-relaxed">
                “{BOOK_FOUNDATION.conclusion.closingPrayer}”
              </p>
            </div>
          </div>
        )}
      </div>

      <MonthlySampleLeadMagnet
        isOpen={isLeadMagnetModalOpen}
        onClose={() => setIsLeadMagnetModalOpen(false)}
        initialMonth={selectedLeadMonth}
      />
    </div>
  );
};
