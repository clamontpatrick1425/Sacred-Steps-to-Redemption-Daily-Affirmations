import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Check, X, ShieldCheck, Sun } from 'lucide-react';
import { leadMagnetService } from '../../services/leadMagnetService';

interface DailyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyReminderModal: React.FC<DailyReminderModalProps> = ({ isOpen, onClose }) => {
  const currentState = leadMagnetService.getState();
  const [enabled, setEnabled] = useState(currentState.reminderEnabled);
  const [time, setTime] = useState(currentState.reminderTime || '07:00');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    const res = await leadMagnetService.setReminder(enabled, time);
    setStatusMessage(res.message);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-md bg-[#F9F6F0] rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 text-[#2B2B2B]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#7A8B7B] hover:text-[#1C2A39] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-12 h-12 rounded-full bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center mb-2.5 shadow-md">
              <Bell className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#7A8B7B]">
              Daily Retention & Grace
            </span>
            <h3 className="font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#1C2A39] mt-0.5">
              Morning Sacred Step Reminder
            </h3>
            <p className="font-['Caveat',cursive] text-lg text-[#D4AF37]">
              “Your daily Sacred Step is ready. ‘Here am I; send me.’ awaits you.”
            </p>
          </div>

          <div className="space-y-4">
            {/* Toggle Switch */}
            <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#D4AF37]/30 shadow-xs">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <div className="font-bold text-xs text-[#1C2A39]">Daily Morning Notification</div>
                  <div className="text-[11px] text-[#7A8B7B]">A gentle chime and Scripture anchor</div>
                </div>
              </div>

              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#D4AF37] cursor-pointer"
              />
            </div>

            {/* Time Picker */}
            {enabled && (
              <div className="p-3.5 bg-white rounded-xl border border-[#D4AF37]/30 shadow-xs">
                <label className="block text-xs font-semibold text-[#1C2A39] mb-1.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Preferred Quiet Dawn Hour</span>
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F9F6F0] border border-[#D4AF37]/30 text-sm font-semibold text-[#1C2A39] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            )}

            {statusMessage && (
              <p className="text-xs text-emerald-700 font-semibold text-center bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                {statusMessage}
              </p>
            )}

            <button
              onClick={handleSave}
              className="w-full min-h-[46px] py-3 rounded-full bg-[#1C2A39] hover:bg-[#D4AF37] text-[#F9F6F0] hover:text-[#1C2A39] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  <span>Preferences Saved</span>
                </>
              ) : (
                <span>Save Reminder Preferences</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A8B7B] text-center pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Never guilt-inducing. Only peaceful encouragement.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
