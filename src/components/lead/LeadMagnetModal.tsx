import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Sparkles, 
  Check, 
  Download, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  X, 
  Server, 
  Send,
  CalendarCheck2
} from 'lucide-react';
import { leadMagnetService, ESPProvider, ESPResponse } from '../../services/leadMagnetService';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessUnlock: () => void;
  dayAttempted?: number;
  daysOfUsage?: number;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({
  isOpen,
  onClose,
  onSuccessUnlock,
  dayAttempted = 8,
  daysOfUsage = 7
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [provider, setProvider] = useState<ESPProvider>('ConvertKit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [espResult, setEspResult] = useState<ESPResponse | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const source = dayAttempted > 7 ? `day_${dayAttempted}_gate` : '7_day_usage_milestone';
    const res = await leadMagnetService.submitEmail(email, name, source, provider);
    setIsSubmitting(false);

    if (res.success) {
      setEspResult(res);
      setSubmitted(true);
      onSuccessUnlock();
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleRestore = async () => {
    setIsRestoring(true);
    setErrorMessage('');
    const res = await leadMagnetService.restoreAccess(email);
    setIsRestoring(false);
    if (res.success) {
      setEspResult(res);
      setSubmitted(true);
      onSuccessUnlock();
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleDownloadGuide = () => {
    leadMagnetService.downloadPrayerGuide();
  };

  const handleDismiss = () => {
    leadMagnetService.dismiss7DayModal();
    onClose();
  };

  return (
    <AnimatePresence>
      <div key="lead-magnet-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/85 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-[#F9F6F0] text-[#2B2B2B] rounded-2xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden p-6 sm:p-8 my-auto"
        >
          {/* Close / Dismiss Button */}
          <button
            onClick={handleDismiss}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 text-[#7A8B7B] hover:text-[#1C2A39] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div className="space-y-5">
              {/* Top Accent Icon & Badge */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center mb-3 shadow-md border border-[#D4AF37]/50">
                  <CalendarCheck2 className="w-7 h-7 stroke-[1.75]" />
                </div>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#1C2A39] text-[11px] font-bold uppercase tracking-wider mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>7 Days Walked in Grace</span>
                </div>

                <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-bold text-[#1C2A39] mt-1 leading-snug">
                  Unlock the full 365-day journey
                </h2>
                <p className="font-['Caveat',cursive] text-xl text-[#D4AF37] mt-0.5">
                  Receive your free “30-Day Redemption Prayer Guide”
                </p>
              </div>

              {/* Emotional/Compassionate Description in C. Lamont Patrick's Voice */}
              <div className="bg-[#7A8B7B]/10 rounded-xl p-4 border-l-4 border-l-[#D4AF37] text-sm text-[#2B2B2B] leading-relaxed">
                <p className="font-['Plus_Jakarta_Sans',sans-serif]">
                  You have walked 7 sacred days with us. Day 8 and the rest of the year are ready for you. Enter your email below to unlock the complete 365-day devotional and receive our free <em>30-Day Redemption Prayer Guide</em> delivered straight to your inbox.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#1C2A39] uppercase tracking-wider mb-1.5 font-['Plus_Jakarta_Sans',sans-serif]">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Friend in Christ"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2B2B2B] placeholder-[#2B2B2B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-['Plus_Jakarta_Sans',sans-serif] text-sm shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C2A39] uppercase tracking-wider mb-1.5 font-['Plus_Jakarta_Sans',sans-serif]">
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2B2B2B] placeholder-[#2B2B2B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-['Plus_Jakarta_Sans',sans-serif] text-sm shadow-xs"
                    />
                    <Mail className="w-4 h-4 text-[#7A8B7B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Mock ESP Provider Selection */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-semibold text-[#7A8B7B] uppercase tracking-wider flex items-center gap-1">
                      <Server className="w-3 h-3 text-[#D4AF37]" />
                      <span>Mock ESP Integration</span>
                    </label>
                    <span className="text-[10px] text-[#7A8B7B]/80 font-mono">Simulated Webhook</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['ConvertKit', 'Mailchimp', 'Resend'] as ESPProvider[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setProvider(p)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          provider === p
                            ? 'bg-[#1C2A39] text-[#D4AF37] border-[#D4AF37] shadow-xs'
                            : 'bg-white border-[#D4AF37]/30 text-[#1C2A39]/70 hover:bg-[#F9F6F0]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-700 font-semibold text-center">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isRestoring}
                  className="w-full min-h-[50px] py-3.5 px-6 rounded-full bg-[#1C2A39] hover:bg-[#D4AF37] text-[#F9F6F0] hover:text-[#1C2A39] font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Connecting to {provider}...
                    </span>
                  ) : (
                    <>
                      <span>Join Community & Unlock Full 365 Days</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Restore Access for Returning Readers */}
                <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-[#7A8B7B]">
                  <span>Already walked with us?</span>
                  <button
                    type="button"
                    onClick={handleRestore}
                    disabled={isSubmitting || isRestoring}
                    className="font-semibold text-[#1C2A39] hover:text-[#D4AF37] underline underline-offset-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isRestoring ? 'Restoring...' : 'Restore Access'}
                  </button>
                </div>
              </form>

              {/* Privacy Reassurance */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A8B7B] text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Zero spam. No shame. Free prayer guide attached immediately.</span>
              </div>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="space-y-5 text-center py-2 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-[#1C2A39] flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8 text-[#D4AF37] stroke-[3]" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#7A8B7B]">
                  Welcome to the Community
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-3xl font-bold text-[#1C2A39] mt-1">
                  Full 365-Day Journey Unlocked
                </h3>
                <p className="font-['Caveat',cursive] text-2xl text-[#1C2A39] mt-1.5">
                  “Old things are passed away; behold, all things are become new.”
                </p>
              </div>

              {/* ESP Transmission Confirmation Banner */}
              {espResult && (
                <div className="p-3 bg-[#7A8B7B]/15 border border-[#7A8B7B]/30 rounded-xl text-left text-xs font-['Plus_Jakarta_Sans',sans-serif] space-y-1">
                  <div className="flex items-center justify-between text-[#1C2A39] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Sent via {espResult.provider}
                    </span>
                    <span className="font-mono text-[10px] text-[#7A8B7B]">{espResult.subscriberId}</span>
                  </div>
                  <p className="text-[#2B2B2B]/80 text-[11px] leading-relaxed">
                    A confirmation welcome email with your prayer guide was queued for <strong>{email}</strong>.
                  </p>
                </div>
              )}

              {/* Lead Magnet Download Box */}
              <div className="bg-white border border-[#D4AF37]/35 rounded-xl p-5 shadow-xs text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#1C2A39] text-[#D4AF37] rounded-xl shrink-0">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1C2A39]">
                      30-Day Redemption Prayer Guide
                    </h4>
                    <p className="text-xs text-[#7A8B7B] mt-0.5">
                      Thirty biblical prayers for breaking chains, walking in freedom, and silence of shame.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDownloadGuide}
                  className="mt-4 w-full py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c29f31] text-[#1C2A39] text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free Prayer Guide Now (Printable TXT)</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#1C2A39] hover:bg-[#D4AF37] text-[#F9F6F0] hover:text-[#1C2A39] font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold transition-colors duration-300 cursor-pointer shadow-md"
              >
                Continue Today’s Sacred Step
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

