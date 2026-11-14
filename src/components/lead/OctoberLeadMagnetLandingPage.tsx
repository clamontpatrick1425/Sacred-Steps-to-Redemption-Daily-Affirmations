import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Download, 
  Mail, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2, 
  FileText, 
  Printer, 
  Compass, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Sparkle,
  Bookmark,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { sacredAudio } from '../../services/audioService';
import { leadMagnetPdfService } from '../../services/leadMagnetPdfService';
import { MONTHLY_LEAD_MAGNET_DATA } from '../../data/monthlyLeadMagnetData';

interface OctoberLandingPageProps {
  onBackToApp?: () => void;
}

export const OctoberLeadMagnetLandingPage: React.FC<OctoberLandingPageProps> = ({ onBackToApp }) => {
  // Navigation & View Mode
  const [activeSection, setActiveSection] = useState<'cover' | 'letter' | 'sample' | 'exercise' | 'upsell'>('cover');
  const [viewMode, setViewMode] = useState<'continuous' | 'pages'>('continuous');

  // Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);
  const [capturedEmail, setCapturedEmail] = useState<string>('');

  // Audio State
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isAmbientActive, setIsAmbientActive] = useState(false);

  // Journal and Exercise Interactive State (persisted locally)
  const [journalReflection, setJournalReflection] = useState('');
  const [step1Response, setStep1Response] = useState('');
  const [step2Response, setStep2Response] = useState('');
  const [step3Response, setStep3Response] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Modal State for Upsells
  const [selectedProduct, setSelectedProduct] = useState<{
    title: string;
    subtitle: string;
    price: string;
    description: string;
    features: string[];
  } | null>(null);

  // October Month Data from authoritative curriculum
  const octoberData = MONTHLY_LEAD_MAGNET_DATA[10];

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('sacred_october_lead_email');
      if (savedEmail) {
        setIsSubmitted(true);
        setCapturedEmail(savedEmail);
        setEmail(savedEmail);
      }

      const savedReflection = localStorage.getItem('sacred_october_journal_reflection');
      if (savedReflection) setJournalReflection(savedReflection);

      const savedSteps = localStorage.getItem('sacred_october_exercise_steps');
      if (savedSteps) {
        const parsed = JSON.parse(savedSteps);
        if (parsed.step1) setStep1Response(parsed.step1);
        if (parsed.step2) setStep2Response(parsed.step2);
        if (parsed.step3) setStep3Response(parsed.step3);
      }
    } catch {
      // ignore
    }

    return () => {
      sacredAudio.stopSpeaking();
    };
  }, []);

  // Save reflections to localStorage
  const handleSaveResponses = () => {
    try {
      localStorage.setItem('sacred_october_journal_reflection', journalReflection);
      localStorage.setItem(
        'sacred_october_exercise_steps',
        JSON.stringify({
          step1: step1Response,
          step2: step2Response,
          step3: step3Response
        })
      );
      setSaveStatus('Responses saved quietly to your device.');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      // ignore
    }
  };

  // Functional Mock Submission Handler
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitFeedback('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitFeedback(null);

    // Simulate network delay & CRM/ESP integration (ConvertKit/ActiveCampaign)
    setTimeout(() => {
      try {
        localStorage.setItem('sacred_october_lead_email', email.trim());
        localStorage.setItem('sacred_lead_magnet_unlocked', 'true');
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setCapturedEmail(email.trim());
      setSubmitFeedback('Your free October guide & exercises are unlocked! Check your inbox or download below.');

      // Automatically scroll down to the welcome letter if in continuous view
      if (viewMode === 'continuous') {
        const letterEl = document.getElementById('author-letter');
        if (letterEl) {
          letterEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 850);
  };

  // Trigger PDF Download
  const handleDownloadPdf = async () => {
    leadMagnetPdfService.downloadFormattedPdf(10);
  };

  // Audio Read Aloud
  const handleToggleReadAloud = () => {
    if (isReadingAloud) {
      sacredAudio.stopSpeaking();
      setIsReadingAloud(false);
    } else {
      const textToRead = `Sacred Steps to Redemption. October. Day 276. Transforming Pain into Ministry. Scripture from Isaiah chapter 6, verse 8: Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me. Truth: God redeems my brokenness into a vessel of comfort and purpose for others. Affirmation: Here am I, Lord. Use my story and my redeemed life to bring hope to someone today.`;
      sacredAudio.speakDevotional(
        textToRead,
        () => setIsReadingAloud(true),
        () => setIsReadingAloud(false)
      );
    }
  };

  const handleToggleAmbient = () => {
    const nextState = sacredAudio.toggleAmbient('dawn-cathedral');
    setIsAmbientActive(nextState);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#2B2B2B] font-sans-sacred selection:bg-[#D4AF37]/25 selection:text-[#1C2A39]">
      {/* Top Sticky Navigation / Sub-header */}
      <nav className="sticky top-0 z-40 bg-[#1C2A39] text-[#F9F6F0] border-b border-[#D4AF37]/30 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToApp && (
              <button
                onClick={onBackToApp}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#D4AF37] bg-white/5 hover:bg-white/10 rounded-md transition-colors"
                title="Return to Daily Companion"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back to App</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-cinzel text-sm sm:text-base tracking-wider text-[#F9F6F0] font-semibold">
                OCTOBER SAMPLE GUIDE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center bg-white/10 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setViewMode('continuous')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'continuous' ? 'bg-[#D4AF37] text-[#1C2A39] font-semibold' : 'text-[#F9F6F0]/70 hover:text-white'
                }`}
              >
                Continuous View
              </button>
              <button
                onClick={() => setViewMode('pages')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'pages' ? 'bg-[#D4AF37] text-[#1C2A39] font-semibold' : 'text-[#F9F6F0]/70 hover:text-white'
                }`}
              >
                5-Page Flip
              </button>
            </div>

            {/* Ambient Sound */}
            <button
              onClick={handleToggleAmbient}
              title={isAmbientActive ? 'Mute Sacred Chords' : 'Play Sacred Ambient Music'}
              className={`p-1.5 rounded-full border transition-all ${
                isAmbientActive
                  ? 'bg-[#D4AF37] text-[#1C2A39] border-[#D4AF37]'
                  : 'bg-white/5 text-[#F9F6F0]/70 border-white/20 hover:text-white'
              }`}
            >
              {isAmbientActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Direct PDF Download */}
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1C2A39] text-xs font-bold rounded-lg shadow-sm transition-transform active:scale-95"
              title="Download Full 5-Page PDF Guide"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>

        {/* Section Quick Jump Bar (for Continuous Mode) or Page Indicator (for Pages Mode) */}
        {viewMode === 'continuous' ? (
          <div className="bg-[#15202B] border-t border-white/10 px-4 py-1.5 overflow-x-auto no-scrollbar">
            <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-[#F9F6F0]/70 min-w-max gap-4">
              <a href="#cover" className="hover:text-[#D4AF37] transition-colors">1. Cover & Claim</a>
              <span className="text-[#D4AF37]/30">•</span>
              <a href="#author-letter" className="hover:text-[#D4AF37] transition-colors">2. Author Letter</a>
              <span className="text-[#D4AF37]/30">•</span>
              <a href="#sample-chapter" className="hover:text-[#D4AF37] transition-colors">3. Day 276 (S.T.E.P.)</a>
              <span className="text-[#D4AF37]/30">•</span>
              <a href="#guided-exercise" className="hover:text-[#D4AF37] transition-colors">4. The Wounded Healer</a>
              <span className="text-[#D4AF37]/30">•</span>
              <a href="#continue-journey" className="hover:text-[#D4AF37] transition-colors">5. Continue Journey</a>
            </div>
          </div>
        ) : (
          <div className="bg-[#15202B] border-t border-white/10 px-4 py-2">
            <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  const pages: ('cover' | 'letter' | 'sample' | 'exercise' | 'upsell')[] = ['cover', 'letter', 'sample', 'exercise', 'upsell'];
                  const idx = pages.indexOf(activeSection);
                  if (idx > 0) setActiveSection(pages[idx - 1]);
                }}
                disabled={activeSection === 'cover'}
                className="flex items-center gap-1 text-[#F9F6F0]/70 hover:text-[#D4AF37] disabled:opacity-30"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous Page
              </button>
              <div className="flex items-center gap-1.5">
                {(['cover', 'letter', 'sample', 'exercise', 'upsell'] as const).map((sec, i) => (
                  <button
                    key={sec}
                    onClick={() => setActiveSection(sec)}
                    className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                      activeSection === sec
                        ? 'bg-[#D4AF37] text-[#1C2A39] scale-110 shadow-sm'
                        : 'bg-white/10 text-[#F9F6F0]/60 hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const pages: ('cover' | 'letter' | 'sample' | 'exercise' | 'upsell')[] = ['cover', 'letter', 'sample', 'exercise', 'upsell'];
                  const idx = pages.indexOf(activeSection);
                  if (idx < pages.length - 1) setActiveSection(pages[idx + 1]);
                }}
                disabled={activeSection === 'upsell'}
                className="flex items-center gap-1 text-[#F9F6F0]/70 hover:text-[#D4AF37] disabled:opacity-30"
              >
                Next Page <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* ========================================================================= */}
        {/* PAGE 1: COVER / LANDING PAGE HERO */}
        {/* ========================================================================= */}
        {(viewMode === 'continuous' || activeSection === 'cover') && (
          <section id="cover" className="relative bg-[#F9F6F0] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-12 shadow-sm">
            {/* Subtle Dawn Gold Accent Header Line */}
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6" />

            {/* Top Center Tagline */}
            <p className="text-center text-xs tracking-widest uppercase font-semibold text-[#7A8B7B] mb-4">
              A PATH TO RECOVERY, A LIFE IN GRACE.
            </p>

            {/* Main Titles in Cinzel */}
            <div className="text-center mb-4">
              <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C2A39] leading-tight mb-2">
                SACRED STEPS TO REDEMPTION
              </h1>
              <h2 className="font-cinzel text-lg sm:text-2xl font-semibold text-[#1C2A39]/90 tracking-wide">
                October Free Sample Chapter & Guided Exercises
              </h2>
            </div>

            {/* Subheader in Dawn Gold Script / Italic */}
            <p className="font-script-sacred text-center text-xl sm:text-2xl text-[#D4AF37] mb-8 font-medium">
              *Experience the S.T.E.P. Method™ and Begin Your Journey of PURPOSE*
            </p>

            {/* Body Copy */}
            <div className="max-w-xl mx-auto text-center space-y-3 text-[#2B2B2B] text-sm sm:text-base leading-relaxed mb-8">
              <p className="font-medium text-[#1C2A39]">
                You don’t have to clean yourself up before you begin.
                <br />
                You just have to be willing to take the next step.
              </p>
              <p className="text-[#2B2B2B]/85 text-sm">
                Inside this free guide, you will experience the exact framework used in the{' '}
                <em>Sacred Steps to Redemption</em> 365-Day Devotional and the October Transformation Journal.
              </p>
            </div>

            {/* Bullet Points */}
            <div className="max-w-lg mx-auto bg-white/70 backdrop-blur-sm border border-[#7A8B7B]/25 rounded-xl p-5 sm:p-6 mb-8 shadow-sm">
              <ul className="space-y-3 text-sm sm:text-base text-[#1C2A39]">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#1C2A39]">A Full Daily Devotional Entry:</strong>{' '}
                    <span className="text-[#2B2B2B]">Walk through Day 276 of the PURPOSE journey.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#1C2A39]">The Sacred S.T.E.P. Method™:</strong>{' '}
                    <span className="text-[#2B2B2B]">Learn the 4-part rhythm that renews the mind.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#1C2A39]">A Guided Trauma-Informed Exercise:</strong>{' '}
                    <span className="text-[#2B2B2B]">"The Wounded Healer" worksheet to help you process this month's theme.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Functional Email Capture Form */}
            <div className="max-w-md mx-auto bg-[#F9F6F0] border-2 border-[#1C2A39] rounded-2xl p-6 sm:p-7 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-cinzel text-base font-bold text-[#1C2A39]">
                  Claim Your Free October Chapter & PDF
                </h3>
              </div>

              {isSubmitted ? (
                <div className="bg-[#7A8B7B]/15 border border-[#7A8B7B] rounded-xl p-4 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#7A8B7B] text-white mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-[#1C2A39]">
                    Sample Unlocked for {capturedEmail}
                  </p>
                  <p className="text-xs text-[#2B2B2B]/80">
                    Your free 5-page guide is ready below. You can also download the printable PDF for offline journaling:
                  </p>
                  <button
                    onClick={handleDownloadPdf}
                    className="w-full py-2.5 px-4 bg-[#1C2A39] hover:bg-[#D4AF37] hover:text-[#1C2A39] text-[#D4AF37] font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download 5-Page October Guide PDF
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="first-name" className="block text-xs font-semibold text-[#1C2A39] mb-1">
                      First Name (Optional)
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Sarah"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7A8B7B]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#2B2B2B]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email-input" className="block text-xs font-semibold text-[#1C2A39] mb-1">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7A8B7B]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#2B2B2B]"
                    />
                  </div>

                  {submitFeedback && (
                    <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                      {submitFeedback}
                    </p>
                  )}

                  {/* Primary CTA Button strictly following specs: Deep Sacred Blue bg, Dawn Gold text, hover inverted */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-[#1C2A39] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1C2A39] font-bold text-sm tracking-wide rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                        Unlocking Your Sample...
                      </span>
                    ) : (
                      <>
                        <span>📥</span>
                        <span>Send Me the Free Sample & Exercises</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Page 1 Footer */}
            <div className="mt-8 text-center text-xs text-[#7A8B7B] space-y-1">
              <p className="italic">We respect your privacy and your journey. Unsubscribe at any time.</p>
              <p>© 2026 C. Lamont Patrick | Kya Daisy Publishing</p>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2: WELCOME LETTER */}
        {/* ========================================================================= */}
        {(viewMode === 'continuous' || activeSection === 'letter') && (
          <section
            id="author-letter"
            className="bg-[#F9F6F0] border border-[#7A8B7B]/30 rounded-2xl p-6 sm:p-12 shadow-sm relative overflow-hidden"
          >
            {/* Page Indicator Badge */}
            <div className="inline-block px-3 py-1 bg-[#7A8B7B]/15 text-[#7A8B7B] rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
              Page 2 • Author Letter
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1C2A39] mb-6 border-b border-[#D4AF37]/30 pb-3">
              A Note From the Author
            </h2>

            {/* Personal Vulnerable Letter from C. Lamont Patrick */}
            <div className="text-[#2B2B2B] space-y-4 text-sm sm:text-base leading-relaxed text-justify">
              <p>
                I remember the exact year I sat with my head in my hands, looking at the wreckage left behind by my addiction. 
                I had broken promises to people who loved me, shattered my own self-respect, and convinced myself that my story was permanently over. 
                There was a time when I believed that the church and the world had room only for respectable, unblemished testimonies. 
                I thought God looked at my broken record, folded His arms, and walked in the opposite direction.
              </p>
              <p>
                There was a time when I believed that my past disqualified me from ever having anything meaningful to offer another human being. 
                Shame whispered that I should hide in the back row, keep my mouth shut, and live as an invisible spectator. 
                My journey taught me something I did not learn quickly: God does not waste a single drop of your tears. 
                The very terrain where you almost died is the terrain God equips you to guide others through. A wounded person who has encountered grace is the most credible witness on earth.
              </p>
              <p>
                When Isaiah stood in the presence of God in Isaiah 6, he didn’t begin with a polished resume. He cried out because his lips were unclean. 
                And yet, when the Lord asked, <em>"Whom shall I send?"</em>, Isaiah was ready to answer. God does not call the equipped; He redeems the willing. 
                As you step into this October study on PURPOSE, take off the heavy armor of pretending. Sit down with me. You don’t have to prove anything here. 
                Let’s walk together.
              </p>
            </div>

            {/* Author Signature */}
            <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-script-sacred text-2xl sm:text-3xl text-[#1C2A39] font-semibold">
                  — C. Lamont Patrick
                </p>
                <p className="text-xs text-[#7A8B7B] mt-1">
                  Author, <em>Sacred Steps to Redemption</em> • Redeemed Brother
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleReadAloud}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isReadingAloud
                      ? 'bg-[#D4AF37] text-[#1C2A39] border-[#D4AF37]'
                      : 'bg-white border-[#7A8B7B]/30 text-[#1C2A39] hover:border-[#D4AF37]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {isReadingAloud ? 'Pause Reading' : 'Listen to Letter'}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PAGE 3: SAMPLE CHAPTER - DAY 276 */}
        {/* ========================================================================= */}
        {(viewMode === 'continuous' || activeSection === 'sample') && (
          <section
            id="sample-chapter"
            className="bg-[#F9F6F0] border border-[#7A8B7B]/30 rounded-2xl p-6 sm:p-12 shadow-sm space-y-8"
          >
            {/* Header info */}
            <div>
              <p className="text-xs font-bold tracking-widest text-[#7A8B7B] uppercase mb-1">
                OCTOBER • PURPOSE • DAY 276 OF 30
              </p>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1C2A39]">
                Transforming Pain into Ministry
              </h2>
            </div>

            {/* Scripture Block with Dawn Gold Left Border */}
            <div className="border-l-4 border-[#D4AF37] pl-5 py-2 bg-white/60 rounded-r-xl">
              <blockquote className="font-serif-sacred italic text-base sm:text-lg text-[#2B2B2B] leading-relaxed">
                “Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me.”
              </blockquote>
              <cite className="block text-xs font-bold tracking-wider text-[#1C2A39] uppercase mt-2 not-italic">
                — Isaiah 6:8, KJV
              </cite>
            </div>

            {/* What This Means */}
            <div className="space-y-3">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#1C2A39]">
                What This Means
              </h3>
              <div className="text-[#2B2B2B] text-sm sm:text-base leading-relaxed space-y-3 text-justify">
                <p>
                  In the 12-Step tradition, Step 12 is about carrying the message to someone who is still suffering. 
                  It is not about becoming a spiritual guru or pretending you have arrived at perfection. 
                  It is simply one hungry person telling another where they discovered fresh bread.
                </p>
                <p>
                  Your scars are not badges of shame; in Christ’s hands, they are your credentials. 
                  When you sit across a coffee table from someone trembling in early recovery or paralyzed by guilt, 
                  your honesty gives them permission to breathe. God does not waste a single valley you have crawled out of.
                </p>
              </div>
            </div>

            {/* The Sacred S.T.E.P. Method™ */}
            <div className="bg-white/80 border border-[#D4AF37]/50 rounded-xl p-5 sm:p-7 shadow-sm space-y-5">
              <h3 className="font-cinzel text-lg font-bold text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2">
                The Sacred S.T.E.P. Method™
              </h3>

              <div className="space-y-4 text-sm sm:text-base">
                {/* S - Scripture */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#1C2A39] text-[#D4AF37] font-cinzel font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    S
                  </span>
                  <div>
                    <strong className="text-[#1C2A39] block text-xs tracking-wider uppercase">Scripture</strong>
                    <span className="text-[#2B2B2B] font-medium">Isaiah 6:8</span>
                  </div>
                </div>

                {/* T - Truth */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#1C2A39] text-[#D4AF37] font-cinzel font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    T
                  </span>
                  <div>
                    <strong className="text-[#1C2A39] block text-xs tracking-wider uppercase">Truth</strong>
                    <p className="text-xs text-rose-800 italic mt-0.5">
                      <strong>Lie:</strong> “My past failures make me useless to God and to other people.”
                    </p>
                    <p className="text-sm font-semibold text-[#1C2A39] mt-0.5">
                      <strong>Truth:</strong> God redeems my brokenness into a vessel of comfort and purpose for others.
                    </p>
                  </div>
                </div>

                {/* E - Embrace */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#1C2A39] text-[#D4AF37] font-cinzel font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    E
                  </span>
                  <div>
                    <strong className="text-[#1C2A39] block text-xs tracking-wider uppercase">Embrace (Affirmation)</strong>
                    <p className="font-serif-sacred italic text-base text-[#1C2A39] mt-0.5">
                      “Here am I, Lord. Use my story and my redeemed life to bring hope to someone today.”
                    </p>
                  </div>
                </div>

                {/* P - Practice */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#1C2A39] text-[#D4AF37] font-cinzel font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    P
                  </span>
                  <div>
                    <strong className="text-[#1C2A39] block text-xs tracking-wider uppercase">Practice (Action Step)</strong>
                    <p className="text-sm text-[#2B2B2B] mt-0.5">
                      Send one text or make one call of encouragement to someone who is currently struggling, expecting nothing in return.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reflection & Prayer */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#1C2A39]">
                Reflection & Prayer
              </h3>

              <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-[#2B2B2B]">
                <li>How has God used a painful part of your past to comfort someone else recently?</li>
                <li>What lie tells you that you aren’t "far enough along" in recovery to help another person?</li>
                <li>Who is one person in your sphere of influence who needs to know there is hope?</li>
              </ol>

              {/* Conversational Prayer */}
              <div className="bg-[#7A8B7B]/10 border-l-4 border-[#7A8B7B] p-4 rounded-r-xl text-sm italic text-[#2B2B2B] leading-relaxed">
                <p className="font-medium not-italic text-[#1C2A39] text-xs uppercase tracking-wider mb-1">
                  Today's Conversational Prayer
                </p>
                “Lord, today I lay my broken story at Your feet. Don't let my past pain be wasted. Use my scars to speak of Your resurrection power. Here am I; send me into someone's dark day with a message of grace. In Jesus' name, Amen.”
              </div>
            </div>

            {/* Interactive Journal Space */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label htmlFor="journal-input" className="text-xs font-bold text-[#1C2A39] tracking-wide uppercase">
                  Write what God is showing you today:
                </label>
                {saveStatus && <span className="text-xs text-[#7A8B7B] italic">{saveStatus}</span>}
              </div>
              <textarea
                id="journal-input"
                rows={4}
                value={journalReflection}
                onChange={(e) => setJournalReflection(e.target.value)}
                onBlur={handleSaveResponses}
                placeholder="Quiet your heart and write your reflection here..."
                className="w-full p-3.5 bg-white border-b-2 border-t-0 border-x-0 border-[#7A8B7B] rounded-t-lg focus:outline-none focus:border-[#D4AF37] text-sm text-[#2B2B2B] leading-relaxed resize-y"
              />
              <p className="text-[11px] text-[#7A8B7B] italic">
                *(Design Note: Text saved automatically to your device session)*
              </p>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PAGE 4: GUIDED EXERCISE */}
        {/* ========================================================================= */}
        {(viewMode === 'continuous' || activeSection === 'exercise') && (
          <section
            id="guided-exercise"
            className="bg-[#F9F6F0] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-12 shadow-sm space-y-6"
          >
            {/* Header */}
            <div>
              <div className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#1C2A39] rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                Trauma-Informed Guided Exercise
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1C2A39]">
                Guided Exercise: The Wounded Healer
              </h2>
              <p className="font-serif-sacred italic text-sm sm:text-base text-[#D4AF37] mt-1 font-semibold">
                A Trauma-Informed Reflection for PURPOSE
              </p>
            </div>

            {/* Intro Text */}
            <div className="bg-white/70 p-4 rounded-xl border border-[#7A8B7B]/30 text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
              <p>
                Take your time. There is no rush here. If this brings up heavy emotions, pause, breathe deeply, and reach out to a safe person. 
                Serving others must come from an overflowing cup, not from exhaustion or people-pleasing.
              </p>
            </div>

            {/* Step 1 - Muted Sage Border */}
            <div className="bg-[#F9F6F0] border border-[#7A8B7B] rounded-xl p-5 space-y-3 shadow-xs">
              <div>
                <h4 className="font-cinzel text-base font-bold text-[#1C2A39]">
                  Step 1: Name the Wound
                </h4>
                <p className="text-xs sm:text-sm text-[#2B2B2B] mt-1">
                  Identify the specific hardship, addiction, or season of grief that God has walked you through.
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C2A39] mb-1">
                  *The battle I survived that taught me God's mercy is:*
                </label>
                <input
                  type="text"
                  value={step1Response}
                  onChange={(e) => setStep1Response(e.target.value)}
                  onBlur={handleSaveResponses}
                  placeholder="e.g. The first 30 days of detox, or overcoming the shame of divorce..."
                  className="w-full px-3 py-2 text-sm bg-white border border-[#7A8B7B]/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            {/* Step 2 - Muted Sage Border */}
            <div className="bg-[#F9F6F0] border border-[#7A8B7B] rounded-xl p-5 space-y-3 shadow-xs">
              <div>
                <h4 className="font-cinzel text-base font-bold text-[#1C2A39]">
                  Step 2: Name the Grace
                </h4>
                <p className="text-xs sm:text-sm text-[#2B2B2B] mt-1">
                  What truth, scripture, or person did God use to pull you from that pit? Name the exact grace that sustained you.
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C2A39] mb-1">
                  *The grace that met me in my deepest valley was:*
                </label>
                <input
                  type="text"
                  value={step2Response}
                  onChange={(e) => setStep2Response(e.target.value)}
                  onBlur={handleSaveResponses}
                  placeholder="e.g. A friend who sat with me without judgment, Romans 8:1..."
                  className="w-full px-3 py-2 text-sm bg-white border border-[#7A8B7B]/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            {/* Step 3 - Dawn Gold Border (High Value Highlight) */}
            <div className="bg-[#F9F6F0] border-2 border-[#D4AF37] rounded-xl p-5 space-y-3 shadow-sm">
              <div>
                <h4 className="font-cinzel text-base font-bold text-[#1C2A39] flex items-center justify-between">
                  <span>Step 3: Build the Bridge</span>
                  <Sparkle className="w-4 h-4 text-[#D4AF37]" />
                </h4>
                <p className="text-xs sm:text-sm text-[#2B2B2B] mt-1">
                  Write out one concrete, humble action you can take to bridge your story into someone else's darkness.
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C2A39] mb-1">
                  *To build a bridge of hope for another soul this week, I will:*
                </label>
                <input
                  type="text"
                  value={step3Response}
                  onChange={(e) => setStep3Response(e.target.value)}
                  onBlur={handleSaveResponses}
                  placeholder="e.g. Listen quietly to a newcomer at a meeting and pray for them by name..."
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D4AF37] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1C2A39]"
                />
              </div>
            </div>

            {/* Author Note - Caveat Italic, Dawn Gold, Centered */}
            <div className="text-center pt-4">
              <p className="font-script-sacred text-xl sm:text-2xl text-[#D4AF37] font-medium">
                “God never wastes a hurt. Your deepest wound can become your greatest ministry.”
              </p>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PAGE 5: CONTINUE YOUR JOURNEY (UPSELL) */}
        {/* ========================================================================= */}
        {(viewMode === 'continuous' || activeSection === 'upsell') && (
          <section id="continue-journey" className="space-y-8">
            {/* Header & Narrative */}
            <div className="text-center space-y-3">
              <div className="w-12 h-1 bg-[#D4AF37] mx-auto rounded-full mb-3" />
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#1C2A39]">
                Continue Your Journey
              </h2>
              <div className="max-w-xl mx-auto text-[#2B2B2B] text-sm sm:text-base leading-relaxed space-y-2">
                <p>
                  You’ve just taken your first Sacred Step. But PURPOSE isn’t built in a day. 
                  It’s built the way a path is built across a field: one pass, then another, until the grass stops growing back.
                </p>
                <p className="font-medium text-[#1C2A39]">
                  If this sample resonated with you, the full journey is waiting.
                </p>
              </div>
            </div>

            {/* 3 Product Cards strictly formatted to Brandbook specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Product 1: The October Transformation Journal */}
              <div className="bg-[#F9F6F0] border-2 border-[#1C2A39] rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center font-bold text-lg">
                    📓
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-[#1C2A39] leading-snug">
                    The October Transformation Journal
                  </h3>
                  <p className="text-xs text-[#7A8B7B] font-semibold uppercase tracking-wider">
                    Workbook 30-Day Deep Dive • $14.99
                  </p>
                  <p className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
                    Want to go deeper? This 30-day workbook is built around PURPOSE. It includes expanded reflection questions, weekly check-ins, and trauma-informed exercises.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSelectedProduct({
                        title: 'The October Transformation Journal',
                        subtitle: '30 Days of Purpose & The Wounded Healer',
                        price: '$14.99',
                        description: 'A 128-page guided journal companion with daily S.T.E.P. entries, weekly accountability milestones, and trauma-informed recovery prompts.',
                        features: [
                          '30 Full Daily Guided S.T.E.P. Method entries',
                          'Trauma-informed exercises for processing shame',
                          'Weekly Heart Check-in & Victory milestones',
                          'Immediate PDF & Digital Companion Access'
                        ]
                      });
                    }}
                    className="w-full py-2.5 px-4 bg-[#1C2A39] hover:bg-[#D4AF37] hover:text-[#1C2A39] text-[#D4AF37] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Get October Journal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product 2: The 365 Biblical Affirmations Ebook */}
              <div className="bg-[#F9F6F0] border-2 border-[#1C2A39] rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#D4AF37] text-[#1C2A39] rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                  Most Complete
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center font-bold text-lg">
                    📖
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-[#1C2A39] leading-snug">
                    The 365 Biblical Affirmations Ebook
                  </h3>
                  <p className="text-xs text-[#7A8B7B] font-semibold uppercase tracking-wider">
                    Full-Year Guided Devotional • $24.99
                  </p>
                  <p className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
                    A full-year guided devotional walking through all 12 monthly themes. One Scripture, one truth, one affirmation, and one sacred step every single day.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSelectedProduct({
                        title: 'The 365 Biblical Affirmations Ebook',
                        subtitle: 'A Year of Daily Grace & Sustained Freedom',
                        price: '$24.99',
                        description: 'The definitive 365-day devotional companion by C. Lamont Patrick covering all 12 monthly themes from Identity to Redemption.',
                        features: [
                          '365 Days of Scripture, Truth, Embrace, & Practice',
                          '52 Weekly recovery themes & prayers',
                          'Compatible with Kindle, Apple Books, and PDF',
                          'Includes companion worship playlist links'
                        ]
                      });
                    }}
                    className="w-full py-2.5 px-4 bg-[#1C2A39] hover:bg-[#D4AF37] hover:text-[#1C2A39] text-[#D4AF37] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Get the 365 Ebook</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product 3: Sacred Steps Audio & Community */}
              <div className="bg-[#F9F6F0] border-2 border-[#1C2A39] rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center font-bold text-lg">
                    🎧
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-[#1C2A39] leading-snug">
                    Sacred Steps Audio & Community
                  </h3>
                  <p className="text-xs text-[#7A8B7B] font-semibold uppercase tracking-wider">
                    Free Weekly Community
                  </p>
                  <p className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
                    Join our YouTube channel for weekly 90-second devotionals, and listen to the companion worship music written for this exact journey.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSelectedProduct({
                        title: 'Sacred Steps Audio & Community',
                        subtitle: 'Weekly Encouragement on YouTube & Spotify',
                        price: 'Free Access',
                        description: 'A quiet, trauma-informed fellowship for fellow travelers on the recovery path. No condemnation, just honest companions.',
                        features: [
                          'Weekly 90-Second Devotionals with C. Lamont Patrick',
                          'Curated ambient soaking worship playlists',
                          'Monthly online prayer gatherings'
                        ]
                      });
                    }}
                    className="w-full py-2.5 px-4 bg-[#1C2A39] hover:bg-[#D4AF37] hover:text-[#1C2A39] text-[#D4AF37] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Join the Community</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-12 pb-6 border-t border-[#7A8B7B]/30 text-center space-y-2">
              <p className="font-serif-sacred italic text-base text-[#1C2A39] font-medium">
                "Sustained Walking. Daily Freedom."
              </p>
              <p className="text-xs text-[#7A8B7B]">
                © 2026 C. Lamont Patrick | Kya Daisy Publishing
              </p>
              <p className="text-[11px] text-[#7A8B7B]/80 font-mono">
                sacred-steps-affirmations.ai.studio
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Product Details Modal (Mock Checkout / Preview) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#F9F6F0] border-2 border-[#1C2A39] rounded-2xl p-6 sm:p-7 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between border-b border-[#D4AF37]/30 pb-3">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#1C2A39]">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-xs text-[#7A8B7B]">{selectedProduct.subtitle}</p>
                </div>
                <span className="text-sm font-bold text-[#D4AF37] bg-[#1C2A39] px-2.5 py-1 rounded-md">
                  {selectedProduct.price}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="bg-white/80 border border-[#7A8B7B]/30 rounded-xl p-3.5 space-y-2">
                <span className="text-xs font-bold text-[#1C2A39] uppercase tracking-wider block">
                  What’s Included:
                </span>
                <ul className="space-y-1.5 text-xs text-[#2B2B2B]">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    alert(`Thank you for your interest! In the production app, this connects to Kya Daisy Publishing checkout for ${selectedProduct.title}.`);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#1C2A39] hover:bg-[#D4AF37] hover:text-[#1C2A39] text-[#D4AF37] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors text-center"
                >
                  Continue to Order ({selectedProduct.price})
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="py-2.5 px-4 bg-white/60 hover:bg-white text-[#2B2B2B] text-xs font-semibold rounded-lg border border-[#7A8B7B]/40"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
