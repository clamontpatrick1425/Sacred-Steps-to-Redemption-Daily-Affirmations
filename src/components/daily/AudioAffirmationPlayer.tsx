import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Headphones, Sparkles, X } from 'lucide-react';
import { sacredAudio } from '../../services/audioService';
import { analyticsService } from '../../services/analyticsService';

interface AudioAffirmationPlayerProps {
  scriptureRef: string;
  scriptureText: string;
  truth: string;
  embrace: string;
  dayNumber: number;
  isOpen: boolean;
  onClose: () => void;
}

export const AudioAffirmationPlayer: React.FC<AudioAffirmationPlayerProps> = ({
  scriptureRef,
  scriptureText,
  truth,
  embrace,
  dayNumber,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pace, setPace] = useState<'gentle' | 'normal'>('gentle');
  const [currentSection, setCurrentSection] = useState<'all' | 'scripture' | 'truth' | 'embrace'>('all');

  useEffect(() => {
    return () => {
      sacredAudio.stopSpeaking();
    };
  }, []);

  if (!isOpen) return null;

  const handlePlay = (section: 'all' | 'scripture' | 'truth' | 'embrace' = 'all') => {
    if (isPlaying) {
      sacredAudio.stopSpeaking();
      setIsPlaying(false);
      return;
    }

    let textToSpeak = '';
    if (section === 'scripture') {
      textToSpeak = `Scripture anchor: ${scriptureRef}. ${scriptureText}`;
    } else if (section === 'truth') {
      textToSpeak = `The biblical truth for today: ${truth}`;
    } else if (section === 'embrace') {
      textToSpeak = `Embrace this truth: ${embrace}`;
    } else {
      // Full calm devotional with natural pauses
      textToSpeak = `Sacred Steps Day ${dayNumber}. Scripture anchor: ${scriptureRef}. ${scriptureText}. The truth replacing the lie: ${truth}. Embrace this truth in faith: ${embrace}. Walk in grace today.`;
    }

    setCurrentSection(section);
    analyticsService.track('audio_affirmation_played', { dayNumber, section });

    sacredAudio.speakDevotional(
      textToSpeak,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const handleStop = () => {
    sacredAudio.stopSpeaking();
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#7A8B7B]/15 border border-[#D4AF37]/35 rounded-2xl p-4 sm:p-5 shadow-sm text-[#1C2A39] mb-6 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-['Cormorant_Garamond',serif] font-bold text-lg leading-tight text-[#1C2A39]">
              Audio Devotional
            </h4>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#7A8B7B]">
              Calm, compassionate narration for quiet listening
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            handleStop();
            onClose();
          }}
          className="p-1.5 text-[#7A8B7B] hover:text-[#1C2A39] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          title="Close Audio Player"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Controls Bar */}
      <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePlay('all')}
            className={`min-h-[40px] px-4 rounded-full text-xs font-semibold font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isPlaying
                ? 'bg-[#D4AF37] text-[#1C2A39]'
                : 'bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#1C2A39]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Audio</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Listen to Day {dayNumber}</span>
              </>
            )}
          </button>

          {isPlaying && (
            <button
              onClick={handleStop}
              className="p-2 rounded-full border border-[#D4AF37]/30 text-[#1C2A39] hover:bg-white text-xs cursor-pointer"
              title="Restart"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Segment Jump Buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => handlePlay('scripture')}
            className="px-2.5 py-1 rounded-lg bg-white/60 hover:bg-white border border-[#D4AF37]/25 text-[11px] text-[#1C2A39] font-medium transition-colors cursor-pointer"
          >
            Scripture
          </button>
          <button
            onClick={() => handlePlay('truth')}
            className="px-2.5 py-1 rounded-lg bg-white/60 hover:bg-white border border-[#D4AF37]/25 text-[11px] text-[#1C2A39] font-medium transition-colors cursor-pointer"
          >
            Truth
          </button>
          <button
            onClick={() => handlePlay('embrace')}
            className="px-2.5 py-1 rounded-lg bg-white/60 hover:bg-white border border-[#D4AF37]/25 text-[11px] text-[#1C2A39] font-medium transition-colors cursor-pointer"
          >
            Embrace
          </button>
        </div>
      </div>

      {isPlaying && (
        <div className="mt-3 flex items-center gap-2 pt-2 border-t border-black/5 text-xs text-[#7A8B7B] animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Speaking with calm cadence. Breathe slowly and receive each word.</span>
        </div>
      )}
    </div>
  );
};
