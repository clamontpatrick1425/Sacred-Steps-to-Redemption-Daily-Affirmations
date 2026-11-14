import React from 'react';
import { Volume2, VolumeX, ShieldAlert, HeartHandshake, RotateCcw } from 'lucide-react';

interface MobileHeaderProps {
  onOpenRescue: () => void;
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
  graceActive: boolean;
  onToggleGraceMode: () => void;
  onOpenRestore?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onOpenRescue,
  isAmbientPlaying,
  onToggleAmbient,
  graceActive,
  onToggleGraceMode,
  onOpenRestore
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#1C2A39] text-[#F9F6F0] border-b border-[#D4AF37]/20 px-4 py-3 shadow-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Brand Zone: Clean wordmark in Cormorant Garamond */}
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M6 8h12" />
          </svg>
          <span className="font-serif-sacred text-xl tracking-wide font-semibold text-[#F9F6F0]">
            Sacred Steps
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Grace Mode Indicator / Toggle */}
          <button
            onClick={onToggleGraceMode}
            title={graceActive ? "Grace Mode Active: No condemnation" : "Activate Grace Mode"}
            aria-label="Toggle Grace Mode"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              graceActive
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                : 'bg-white/5 text-[#F9F6F0]/70 hover:text-[#F9F6F0] border border-white/10'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{graceActive ? 'Grace Active' : 'Grace Mode'}</span>
          </button>

          {/* Sacred Ambient Sound Quick Toggle */}
          <button
            onClick={onToggleAmbient}
            title={isAmbientPlaying ? "Mute Sacred Audio" : "Play Ambient Sacred Chords"}
            aria-label="Toggle Sacred Soundscape"
            className={`min-h-[38px] min-w-[38px] rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isAmbientPlaying
                ? 'bg-[#D4AF37] text-[#1C2A39] shadow-sm'
                : 'bg-white/10 text-[#F9F6F0] hover:bg-white/20'
            }`}
          >
            {isAmbientPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-70" />
            )}
          </button>

          {/* Restore Access & Data Backup Button */}
          {onOpenRestore && (
            <button
              onClick={onOpenRestore}
              className="min-h-[38px] min-w-[38px] rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-[#F9F6F0] transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Restore Access, Purchases, or Data Backup"
              aria-label="Restore"
            >
              <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
            </button>
          )}

          {/* Quick Rescue Button - 1 tap from anywhere */}
          <button
            onClick={onOpenRescue}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/40 rounded-lg text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer"
            title="Emergency Rescue for hard moments"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Rescue</span>
          </button>
        </div>
      </div>
    </header>
  );
};
