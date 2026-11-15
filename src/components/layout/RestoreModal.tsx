import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  RotateCcw, 
  Download, 
  Upload, 
  KeyRound, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  HeartHandshake
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { leadMagnetService } from '../../services/leadMagnetService';
import { sacredAudio } from '../../services/audioService';

interface RestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataRestored?: () => void;
}

export const RestoreModal: React.FC<RestoreModalProps> = ({
  isOpen,
  onClose,
  onDataRestored
}) => {
  const [activeTab, setActiveTab] = useState<'access' | 'backup' | 'reset'>('access');
  const [emailInput, setEmailInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [jsonPaste, setJsonPaste] = useState('');
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Restore 365 Access
  const handleRestoreAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusMessage(null);

    const emailToUse = emailInput.trim() || 'friend@sacredsteps.walk';
    const res = await leadMagnetService.restoreAccess(emailToUse);
    setIsProcessing(false);

    if (res.success) {
      sacredAudio.playSacredChime();
      setStatusMessage({
        type: 'success',
        text: 'Access to the complete 365-day walk has been restored. Grace goes before you.'
      });
      if (onDataRestored) onDataRestored();
    } else {
      setStatusMessage({
        type: 'error',
        text: res.message
      });
    }
  };

  // Instant 1-tap unlock
  const handleInstantUnlock = async () => {
    setIsProcessing(true);
    setStatusMessage(null);
    const res = await leadMagnetService.restoreAccess('redeemed.traveler@sacredsteps.walk');
    setIsProcessing(false);
    if (res.success) {
      sacredAudio.playSacredChime();
      setStatusMessage({
        type: 'success',
        text: 'Full access unlocked. Every day, prayer guide, and workbook is ready for you.'
      });
      if (onDataRestored) onDataRestored();
    }
  };

  // Export Backup File
  const handleExportBackup = () => {
    const jsonStr = storageService.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sacred_Steps_Journal_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    sacredAudio.playSacredChime();
    setStatusMessage({
      type: 'success',
      text: 'Backup downloaded. Keep this file safe; your prayers and reflections belong to you.'
    });
  };

  // Import Backup from File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = storageService.restoreBackup(content);
      if (res.success) {
        sacredAudio.playSacredChime();
        setStatusMessage({ type: 'success', text: res.message });
        if (onDataRestored) onDataRestored();
      } else {
        setStatusMessage({ type: 'error', text: res.message });
      }
    };
    reader.readAsText(file);
  };

  // Import Backup from Pasted Text
  const handlePasteRestore = () => {
    if (!jsonPaste.trim()) return;
    const res = storageService.restoreBackup(jsonPaste.trim());
    if (res.success) {
      sacredAudio.playSacredChime();
      setStatusMessage({ type: 'success', text: res.message });
      setJsonPaste('');
      setShowJsonInput(false);
      if (onDataRestored) onDataRestored();
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Fresh Graceful Reset
  const handleGracefulReset = () => {
    storageService.restoreDefaults();
    leadMagnetService.resetLeadState();
    sacredAudio.playSacredChime();
    setConfirmReset(false);
    setStatusMessage({
      type: 'success',
      text: 'A clean slate is granted. "Old things are passed away; all things become new."'
    });
    if (onDataRestored) onDataRestored();
  };

  return (
    <AnimatePresence>
      <div key="restore-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-[#F9F6F0] text-[#2B2B2B] rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 text-[#7A8B7B] hover:text-[#1C2A39] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center mx-auto mb-3 border border-[#D4AF37]/50 shadow-md">
              <RotateCcw className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-bold text-[#1C2A39]">
              Restore & Preserve Your Walk
            </h2>
            <p className="font-['Caveat',cursive] text-lg text-[#D4AF37] mt-0.5">
              “I will restore to you the years that the locust hath eaten.” — Joel 2:25
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#D4AF37]/30 mb-5">
            <button
              onClick={() => { setActiveTab('access'); setStatusMessage(null); }}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'access'
                  ? 'border-b-2 border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              Restore Access
            </button>
            <button
              onClick={() => { setActiveTab('backup'); setStatusMessage(null); }}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'backup'
                  ? 'border-b-2 border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              Backup & Journal
            </button>
            <button
              onClick={() => { setActiveTab('reset'); setStatusMessage(null); }}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'reset'
                  ? 'border-b-2 border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              Fresh Start
            </button>
          </div>

          {/* Feedback Status Alert */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl mb-4 text-xs font-medium flex items-start gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border border-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{statusMessage.text}</span>
            </div>
          )}

          {/* Tab 1: Restore Access */}
          {activeTab === 'access' && (
            <div className="space-y-4">
              <div className="p-4 bg-white border border-[#D4AF37]/35 rounded-xl text-xs text-[#2B2B2B] leading-relaxed">
                <p className="font-semibold text-[#1C2A39] mb-1 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Returning Companion or Email Subscriber
                </p>
                <p className="text-[#2B2B2B]/80">
                  If you already signed up or purchased the journal / devotional on another device, enter your email below to instantly restore full 365-day access.
                </p>
              </div>

              <form onSubmit={handleRestoreAccess} className="space-y-3">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your subscribed email"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2B2B2B] placeholder-[#2B2B2B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="py-3 px-4 rounded-xl bg-[#1C2A39] hover:bg-[#D4AF37] text-[#F9F6F0] hover:text-[#1C2A39] text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? 'Verifying...' : 'Restore with Email'}
                  </button>

                  <button
                    type="button"
                    onClick={handleInstantUnlock}
                    disabled={isProcessing}
                    className="py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c49e29] text-[#1C2A39] text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant 1-Tap Unlock</span>
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A8B7B] text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>No password required. Grace never locks out a hungry heart.</span>
              </div>
            </div>
          )}

          {/* Tab 2: Backup & Restore Journal */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <p className="text-xs text-[#2B2B2B]/80 leading-relaxed">
                Your reflections, prayers, and milestones are stored securely on this device. You can download an offline copy or restore a past backup anytime.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="p-4 rounded-xl bg-white border border-[#D4AF37]/40 hover:border-[#D4AF37] text-left transition-all group shadow-xs cursor-pointer"
                >
                  <Download className="w-5 h-5 text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-xs text-[#1C2A39]">Export Journal Backup</div>
                  <div className="text-[11px] text-[#7A8B7B] mt-0.5">Save prayers & steps as .json file</div>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 rounded-xl bg-white border border-[#D4AF37]/40 hover:border-[#D4AF37] text-left transition-all group shadow-xs cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-[#1C2A39] mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-xs text-[#1C2A39]">Upload Backup File</div>
                  <div className="text-[11px] text-[#7A8B7B] mt-0.5">Restore from saved .json file</div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".json"
                    className="hidden"
                  />
                </button>
              </div>

              {/* Paste Text Fallback */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowJsonInput(!showJsonInput)}
                  className="text-xs text-[#1C2A39] underline underline-offset-2 hover:text-[#D4AF37] cursor-pointer"
                >
                  {showJsonInput ? 'Hide manual paste area' : 'Or paste backup text manually →'}
                </button>

                {showJsonInput && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={jsonPaste}
                      onChange={(e) => setJsonPaste(e.target.value)}
                      placeholder="Paste your JSON backup data here..."
                      rows={4}
                      className="w-full p-3 bg-white border border-[#D4AF37]/40 rounded-xl text-xs font-mono text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={handlePasteRestore}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#1C2A39] text-xs font-bold transition-all cursor-pointer"
                    >
                      Restore from Pasted Data
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Fresh Start */}
          {activeTab === 'reset' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-[#2B2B2B] leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#1C2A39]">
                  <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                  <span>The Grace of a Fresh Beginning</span>
                </div>
                <p className="text-[#2B2B2B]/80">
                  In Christ, starting over is never failure—it is the very rhythm of redemption. If your history feels cluttered or you want to restart Day 1 with clear vision, you can reset your walk here.
                </p>
              </div>

              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="w-full py-3.5 px-6 rounded-xl bg-white border border-rose-300 hover:bg-rose-50 text-rose-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Reset Progress & Begin Anew
                </button>
              ) : (
                <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-3">
                  <p className="text-xs font-semibold text-rose-900">
                    Would you like to reset your local journal and step history to a fresh start?
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleGracefulReset}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Yes, Begin Anew
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="py-2.5 px-4 rounded-lg bg-white border border-rose-200 text-rose-900 text-xs font-semibold hover:bg-rose-100/50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Close */}
          <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#1C2A39] text-xs font-semibold transition-all cursor-pointer"
            >
              Return to Sanctuary
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
