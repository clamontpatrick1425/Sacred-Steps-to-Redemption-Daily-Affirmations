import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Wind, Sliders } from 'lucide-react';
import { sacredAudio } from '../../services/audioService';

export const SacredSanctuary: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(sacredAudio.isPlaying());
  const [currentPreset, setCurrentPreset] = useState<string>(sacredAudio.getCurrentPreset());
  const [volume, setVolume] = useState<number>(sacredAudio.getVolume());

  // Breathwork state
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale Peace' | 'Hold Grace' | 'Exhale Shame' | 'Rest in Christ'>('Inhale Peace');
  const [breathSeconds, setBreathSeconds] = useState<number>(4);
  const [breathCyclesCompleted, setBreathCyclesCompleted] = useState<number>(0);

  const presets = [
    {
      id: 'dawn-cathedral',
      title: 'Dawn Cathedral Chords',
      desc: 'Warm sacred D-major 9th pad with golden harmonic glow',
      mood: 'Illumination & Hope'
    },
    {
      id: 'still-waters',
      title: 'Still Waters Stream',
      desc: 'Gentle morning water ripples with 432Hz healing fifths',
      mood: 'Psalm 23 Stillness'
    },
    {
      id: 'sanctuary-drone',
      title: 'Sanctuary Deep Drone',
      desc: 'Continuous meditative grounding drone in F-sharp',
      mood: 'Anchored & Secure'
    }
  ];

  const handleTogglePlay = () => {
    const active = sacredAudio.toggleAmbient(currentPreset);
    setIsPlaying(active);
  };

  const handleSelectPreset = (presetId: string) => {
    setCurrentPreset(presetId);
    sacredAudio.startAmbient(presetId);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sacredAudio.setVolume(val);
  };

  // Breathwork timer logic: 4 seconds each (Inhale -> Hold -> Exhale -> Rest)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathSeconds((prevSec) => {
          if (prevSec > 1) {
            return prevSec - 1;
          }

          // Transition to next phase
          setBreathPhase((currentPhase) => {
            if (currentPhase === 'Inhale Peace') return 'Hold Grace';
            if (currentPhase === 'Hold Grace') return 'Exhale Shame';
            if (currentPhase === 'Exhale Shame') return 'Rest in Christ';
            // Completed 1 full box cycle
            setBreathCyclesCompleted((c) => c + 1);
            sacredAudio.playSacredChime();
            return 'Inhale Peace';
          });
          return 4;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isBreathingActive]);

  const handleToggleBreathwork = () => {
    if (!isBreathingActive) {
      setIsBreathingActive(true);
      setBreathSeconds(4);
      setBreathPhase('Inhale Peace');
      sacredAudio.playSacredChime();
      // Auto-start ambient if not already playing
      if (!isPlaying) {
        sacredAudio.startAmbient(currentPreset);
        setIsPlaying(true);
      }
    } else {
      setIsBreathingActive(false);
    }
  };

  const handleResetBreathwork = () => {
    setIsBreathingActive(false);
    setBreathSeconds(4);
    setBreathPhase('Inhale Peace');
  };

  // Scale calculations for breathing circle
  const getScaleClass = () => {
    if (!isBreathingActive) return 'scale-100';
    if (breathPhase === 'Inhale Peace') return 'scale-125 transition-transform duration-[4000ms] ease-out';
    if (breathPhase === 'Hold Grace') return 'scale-125 transition-transform duration-300';
    if (breathPhase === 'Exhale Shame') return 'scale-90 transition-transform duration-[4000ms] ease-in';
    return 'scale-90 transition-transform duration-300';
  };

  return (
    <div className="pb-28">
      {/* Visual Header */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#1C2A39]">
        <img
          src="/src/assets/images/sacred_still_waters_1790367305509.jpg"
          alt="Sacred tranquil still waters at morning sunrise"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A39] via-[#1C2A39]/65 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-5 text-[#F9F6F0]">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold">
            Sacred Audio & Mindfulness
          </span>
          <h1 className="font-serif-sacred text-2xl sm:text-3xl font-bold tracking-tight text-[#F9F6F0] mt-1">
            The Stillness Sanctuary
          </h1>
          <p className="font-script-sacred text-[#D4AF37] text-lg mt-0.5">
            “Be still, and know that I am God.” — Psalm 46:10
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-5 space-y-6">
        {/* Sacred Breathwork Section */}
        <section className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xs text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-[#7A8B7B]" />
            <h2 className="font-serif-sacred text-xl font-bold text-[#1C2A39]">
              Christ-Centered Breathwork
            </h2>
          </div>
          <p className="text-xs text-[#7A8B7B] max-w-sm mx-auto mb-6">
            A 4-step rhythm to regulate your nervous system and exchange human anxiety for divine grace.
          </p>

          {/* Animated Halo Breathing Guide */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-52 h-52">
              {/* Outer pulsing ring */}
              <div
                className={`absolute inset-0 rounded-full border-2 border-[#D4AF37]/40 ${
                  isBreathingActive ? 'animate-pulse' : ''
                }`}
              />

              {/* Core interactive circle */}
              <div
                className={`w-36 h-36 rounded-full bg-gradient-to-tr from-[#1C2A39] to-[#2B3E52] border-2 border-[#D4AF37] flex flex-col items-center justify-center text-[#F9F6F0] shadow-md transform ${getScaleClass()}`}
              >
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                  {isBreathingActive ? breathPhase : 'Tap Start'}
                </span>
                <span className="text-3xl font-bold font-serif-sacred mt-1 tabular-nums">
                  {isBreathingActive ? breathSeconds : '4s'}
                </span>
              </div>
            </div>

            {/* Instruction Cue */}
            <p className="font-serif-sacred text-base italic text-[#1C2A39] mt-4 min-h-[24px]">
              {isBreathingActive ? (
                breathPhase === 'Inhale Peace' ? 'Breathe in God’s unfailing peace...' :
                breathPhase === 'Hold Grace' ? 'Rest in His unwavering love...' :
                breathPhase === 'Exhale Shame' ? 'Release all shame and tension...' :
                'Be still in Christ’s presence...'
              ) : (
                'Find a comfortable posture and begin when ready.'
              )}
            </p>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleToggleBreathwork}
                className="min-h-[44px] px-6 py-2 bg-[#D4AF37] hover:bg-[#c29f31] text-[#1C2A39] font-semibold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                {isBreathingActive ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Stillness</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Begin Breathing</span>
                  </>
                )}
              </button>

              {isBreathingActive && (
                <button
                  onClick={handleResetBreathwork}
                  title="Reset"
                  className="min-h-[44px] min-w-[44px] rounded-xl border border-[#7A8B7B]/40 text-[#7A8B7B] hover:text-[#1C2A39] flex items-center justify-center transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            {breathCyclesCompleted > 0 && (
              <p className="text-xs text-[#7A8B7B] mt-3">
                {breathCyclesCompleted} sacred breath cycles completed
              </p>
            )}
          </div>
        </section>

        {/* Sacred Audio Soundscape Engine */}
        <section className="bg-white border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              <h2 className="font-serif-sacred text-lg font-bold text-[#1C2A39]">
                Ambient Sacred Soundscapes
              </h2>
            </div>
            <button
              onClick={handleTogglePlay}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPlaying
                  ? 'bg-[#1C2A39] text-[#D4AF37]'
                  : 'bg-[#D4AF37] text-[#1C2A39] hover:bg-[#c29f31]'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause Audio' : 'Play Soundscape'}</span>
            </button>
          </div>

          <p className="text-xs text-[#7A8B7B] leading-relaxed">
            Real procedural harmonic soundscapes designed to quiet racing thoughts and create holy focus.
          </p>

          {/* Sound Preset Cards */}
          <div className="space-y-2">
            {presets.map((preset) => {
              const isActive = currentPreset === preset.id && isPlaying;
              const isSelected = currentPreset === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1C2A39] text-[#F9F6F0] border-[#D4AF37]'
                      : 'bg-[#F9F6F0] text-[#1C2A39] border-transparent hover:border-[#D4AF37]/30'
                  }`}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-serif-sacred font-bold text-base">
                        {preset.title}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-[#F9F6F0]/80' : 'text-[#7A8B7B]'}`}>
                      {preset.desc}
                    </p>
                  </div>
                  <span className={`text-[11px] font-medium tracking-tight uppercase shrink-0 ${
                    isSelected ? 'text-[#D4AF37]' : 'text-[#7A8B7B]'
                  }`}>
                    {preset.mood}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Volume Control Slider */}
          <div className="pt-2 flex items-center gap-3">
            <VolumeX className="w-4 h-4 text-[#7A8B7B]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <Volume2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs text-[#7A8B7B] font-mono tabular-nums w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </section>

        {/* Scriptural Scripture of Rest */}
        <div className="bg-[#1C2A39] text-[#F9F6F0] rounded-2xl p-5 border border-[#D4AF37]/30 text-center space-y-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37] mx-auto" />
          <p className="font-serif-sacred text-base italic text-[#F9F6F0] leading-relaxed">
            “And after the earthquake a fire; but the Lord was not in the fire: and after the fire a still small voice.”
          </p>
          <span className="text-xs font-semibold text-[#D4AF37]">
            — 1 Kings 19:12
          </span>
        </div>
      </div>
    </div>
  );
};
