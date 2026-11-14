import React, { useState } from 'react';
import { ShieldAlert, HeartHandshake, ArrowRight, X, Sparkles } from 'lucide-react';
import { RESCUE_CATEGORIES, RescueCategory } from '../../data/rescueCategories';
import { getWeekByNumber } from '../../data/weeksData';
import { sacredAudio } from '../../services/audioService';

interface RescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToWeek: (weekNumber: number) => void;
}

export const RescueModal: React.FC<RescueModalProps> = ({
  isOpen,
  onClose,
  onJumpToWeek
}) => {
  const [selectedRescue, setSelectedRescue] = useState<RescueCategory | null>(null);

  if (!isOpen) return null;

  const handleSelectCategory = (cat: RescueCategory) => {
    setSelectedRescue(cat);
    sacredAudio.playSacredChime();
  };

  const handleJumpToWeekDevotional = (weekNum: number) => {
    onJumpToWeek(weekNum);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fadeIn">
      <div className="bg-[#F9F6F0] w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto border border-[#D4AF37]/30 shadow-2xl flex flex-col">
        {/* Grab Handle for Mobile */}
        <div className="w-12 h-1.5 bg-[#7A8B7B]/30 rounded-full mx-auto my-3 sm:hidden" />

        {/* Modal Header */}
        <div className="px-5 py-3 border-b border-[#D4AF37]/20 flex items-center justify-between bg-white rounded-t-3xl sm:rounded-t-2xl">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 className="font-serif-sacred text-xl font-bold text-[#1C2A39]">
                Rescue & Grounding Sanctuary
              </h2>
              <p className="text-[11px] text-[#7A8B7B]">
                Immediate scriptural shelter for the hardest moments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#7A8B7B] hover:text-[#1C2A39] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {!selectedRescue ? (
            <>
              <p className="text-xs text-[#2B2B2B] leading-relaxed">
                As the book guides: <span className="italic">“On a hard day, open to whatever matches what you’re facing — shame, fear, anger, grief — and start there.”</span>
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {RESCUE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat)}
                    className="w-full text-left p-3.5 bg-white hover:bg-white/80 border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-xl transition-all shadow-xs flex items-center justify-between group active:scale-[0.99]"
                  >
                    <div className="pr-3">
                      <h3 className="font-serif-sacred text-base font-bold text-[#1C2A39] group-hover:text-[#D4AF37] transition-colors">
                        {cat.emotion}
                      </h3>
                      <p className="text-xs text-[#7A8B7B] mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#7A8B7B] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              {/* Back to selection */}
              <button
                onClick={() => setSelectedRescue(null)}
                className="text-xs text-[#7A8B7B] hover:text-[#1C2A39] flex items-center gap-1 font-semibold"
              >
                ← Back to All Situations
              </button>

              {/* Title */}
              <div className="bg-white border-l-4 border-[#D4AF37] p-4 rounded-xl shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-[#7A8B7B] font-bold">
                  Facing
                </span>
                <h3 className="font-serif-sacred text-2xl font-bold text-[#1C2A39] mt-0.5">
                  {selectedRescue.emotion}
                </h3>
                <p className="text-xs text-[#7A8B7B] mt-1">
                  {selectedRescue.subtitle}
                </p>
              </div>

              {/* Anchor Scripture */}
              <div className="bg-[#1C2A39] text-[#F9F6F0] p-4 rounded-xl border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Anchor Scripture</span>
                </div>
                <p className="font-serif-sacred text-lg italic text-[#F9F6F0] leading-relaxed">
                  {selectedRescue.anchorScripture}
                </p>
              </div>

              {/* Truth Nugget */}
              <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/25 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-[#7A8B7B] font-bold block mb-1">
                  Truth to Disarm the Lie
                </span>
                <p className="text-sm text-[#1C2A39] leading-relaxed">
                  {selectedRescue.truthNugget}
                </p>
              </div>

              {/* Immediate Grounding Prayer */}
              <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#7A8B7B]/30">
                <span className="text-[11px] uppercase tracking-wider text-[#7A8B7B] font-bold block mb-1">
                  A Prayer for This Moment
                </span>
                <p className="font-serif-sacred text-base italic text-[#1C2A39] leading-relaxed">
                  “{selectedRescue.prayer}”
                </p>
              </div>

              {/* Concrete Action */}
              <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/20 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#1C2A39] block">
                    Immediate Sacred Step
                  </span>
                  <p className="text-xs text-[#2B2B2B] mt-0.5 leading-relaxed">
                    {selectedRescue.suggestedAction}
                  </p>
                </div>
              </div>

              {/* Jump to the Full Week */}
              <button
                onClick={() => handleJumpToWeekDevotional(selectedRescue.targetWeek)}
                className="w-full h-12 bg-[#1C2A39] hover:bg-[#25384d] text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
              >
                <span>Read Week {selectedRescue.targetWeek} Devotionals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
