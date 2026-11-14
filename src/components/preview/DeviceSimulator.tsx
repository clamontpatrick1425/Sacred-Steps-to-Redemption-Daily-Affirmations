import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Eye, 
  EyeOff, 
  Wifi, 
  BatteryMedium, 
  Signal, 
  Layers, 
  Compass, 
  Sparkles,
  ChevronDown,
  Monitor,
  Tablet,
  Check,
  Power
} from 'lucide-react';
import { 
  DeviceId, 
  DeviceOrientation, 
  StudioBackdrop, 
  DEVICE_CATALOG, 
  DeviceSpec 
} from './types';

interface DeviceSimulatorProps {
  children: React.ReactNode;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({ children }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<DeviceId>(() => {
    // Detect if already on a physical mobile screen
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 'responsive';
    }
    return 'iphone-15-pro';
  });

  const [orientation, setOrientation] = useState<DeviceOrientation>('portrait');
  const [scaleMode, setScaleMode] = useState<'fit' | '100' | '85' | '75'>('fit');
  const [showFrame, setShowFrame] = useState<boolean>(true);
  const [backdrop, setBackdrop] = useState<StudioBackdrop>('cathedral');
  const [currentTime, setCurrentTime] = useState<string>('9:41');
  const [isScreenLocked, setIsScreenLocked] = useState<boolean>(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [computedFitScale, setComputedFitScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenContentRef = useRef<HTMLDivElement>(null);

  const activeDevice: DeviceSpec = DEVICE_CATALOG[selectedDeviceId];

  // Keep simulated status bar clock updated to current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formatted = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Compute "Fit to Screen" scaling based on viewport available height
  useEffect(() => {
    if (selectedDeviceId === 'responsive') return;

    const calculateScale = () => {
      if (!containerRef.current) return;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      const phoneHeight = orientation === 'portrait' 
        ? activeDevice.screen.height + (showFrame ? activeDevice.bezelWidth * 2 : 0)
        : activeDevice.screen.width + (showFrame ? activeDevice.bezelWidth * 2 : 0);

      const phoneWidth = orientation === 'portrait' 
        ? activeDevice.screen.width + (showFrame ? activeDevice.bezelWidth * 2 : 0)
        : activeDevice.screen.height + (showFrame ? activeDevice.bezelWidth * 2 : 0);

      // Reserve space for top studio controls bar (~60px) and margins
      const availableHeight = Math.max(windowHeight - 90, 400);
      const availableWidth = Math.max(windowWidth - 40, 320);

      const heightRatio = availableHeight / phoneHeight;
      const widthRatio = availableWidth / phoneWidth;

      const fit = Math.min(heightRatio, widthRatio, 1);
      setComputedFitScale(Math.max(Number(fit.toFixed(2)), 0.45));
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [selectedDeviceId, orientation, showFrame, activeDevice]);

  // Determine active scale multiplier
  const effectiveScale = scaleMode === 'fit' 
    ? computedFitScale 
    : scaleMode === '100' ? 1 : scaleMode === '85' ? 0.85 : 0.75;

  // Screen dimensions with orientation applied
  const screenWidth = orientation === 'portrait' ? activeDevice.screen.width : activeDevice.screen.height;
  const screenHeight = orientation === 'portrait' ? activeDevice.screen.height : activeDevice.screen.width;

  const handleScrollToTop = () => {
    if (screenContentRef.current) {
      screenContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const backdropClasses = {
    cathedral: 'bg-radial-[at_top] from-[#233548] via-[#1C2A39] to-[#111B24] text-[#F9F6F0]',
    sand: 'bg-radial-[at_top] from-[#F4EFE6] via-[#EFE8DA] to-[#DFD6C3] text-[#2B2B2B]',
    studio: 'bg-[#12161A] text-[#F9F6F0]'
  };

  // If in responsive mode, render the direct web view with a quiet floating launcher
  if (selectedDeviceId === 'responsive') {
    return (
      <div className="min-h-screen relative bg-[#F9F6F0]">
        {children}

        {/* Floating Device Preview Trigger Bar */}
        <div className="fixed bottom-20 right-4 z-50 animate-fadeIn">
          <div className="bg-[#1C2A39]/95 text-[#F9F6F0] p-1.5 rounded-full shadow-2xl border border-[#D4AF37]/40 backdrop-blur-md flex items-center gap-1.5">
            <button
              onClick={() => setSelectedDeviceId('iphone-15-pro')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37] hover:bg-white/10 transition-colors cursor-pointer"
              title="Open Phone Preview"
            >
              <Smartphone className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif]">Phone Simulator</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col items-center select-none overflow-x-hidden transition-colors duration-500 ${backdropClasses[backdrop]}`}
    >
      {/* 1. TOP STUDIO CONTROLS BAR */}
      <header className="w-full z-40 bg-[#1C2A39]/90 backdrop-blur-md border-b border-[#D4AF37]/25 px-4 py-2.5 shadow-md flex items-center justify-between gap-2 flex-wrap">
        {/* Left: Brand & Device Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Smartphone className="w-5 h-5 stroke-[2]" />
            <span className="font-serif-sacred font-bold text-base tracking-wide text-[#F9F6F0] hidden sm:inline">
              Sacred Device Studio
            </span>
          </div>

          {/* Device Model Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
              className="flex items-center gap-2 bg-[#233548] hover:bg-[#2c425a] text-[#F9F6F0] border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer shadow-xs"
            >
              <span className="font-semibold text-[#D4AF37]">{activeDevice.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-200 ${isSelectorOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSelectorOpen && (
              <div 
                className="absolute left-0 mt-1.5 w-64 bg-[#1C2A39] border border-[#D4AF37]/35 rounded-xl shadow-2xl py-1.5 z-50 animate-fadeIn"
                onClick={() => setIsSelectorOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]/80 border-b border-white/10">
                  Select Phone / Device
                </div>
                {Object.values(DEVICE_CATALOG).map((dev) => {
                  const isCur = dev.id === selectedDeviceId;
                  return (
                    <button
                      key={dev.id}
                      onClick={() => {
                        setSelectedDeviceId(dev.id);
                        setIsSelectorOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        isCur 
                          ? 'bg-[#D4AF37]/15 text-[#D4AF37] font-semibold' 
                          : 'text-[#F9F6F0]/90 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {dev.os === 'iOS' && <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />}
                        {dev.os === 'Android' && <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
                        {dev.os === 'iPadOS' && <Tablet className="w-3.5 h-3.5 text-sky-400" />}
                        {dev.os === 'Web' && <Monitor className="w-3.5 h-3.5 text-amber-300" />}
                        <div>
                          <div className="leading-tight">{dev.name}</div>
                          <div className="text-[10px] text-white/50">{dev.description}</div>
                        </div>
                      </div>
                      {isCur && <Check className="w-4 h-4 text-[#D4AF37]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Controls & Studio Preferences */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Orientation Rotate */}
          <button
            onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
            title={`Rotate to ${orientation === 'portrait' ? 'Landscape' : 'Portrait'}`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#233548] hover:bg-[#2c425a] text-[#F9F6F0] border border-white/10 text-xs font-medium transition-all cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline capitalize">{orientation}</span>
          </button>

          {/* Scale Presets */}
          <div className="flex items-center bg-[#233548] border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setScaleMode('fit')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                scaleMode === 'fit' ? 'bg-[#D4AF37] text-[#1C2A39] shadow-xs' : 'text-white/70 hover:text-white'
              }`}
              title={`Fit viewport (${Math.round(computedFitScale * 100)}%)`}
            >
              Fit ({Math.round(computedFitScale * 100)}%)
            </button>
            <button
              onClick={() => setScaleMode('100')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                scaleMode === '100' ? 'bg-[#D4AF37] text-[#1C2A39] shadow-xs' : 'text-white/70 hover:text-white'
              }`}
              title="100% Native size"
            >
              100%
            </button>
            <button
              onClick={() => setScaleMode('75')}
              className={`px-1.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer hidden md:inline ${
                scaleMode === '75' ? 'bg-[#D4AF37] text-[#1C2A39] shadow-xs' : 'text-white/70 hover:text-white'
              }`}
              title="75% compact"
            >
              75%
            </button>
          </div>

          {/* Toggle Bezel Frame */}
          <button
            onClick={() => setShowFrame(!showFrame)}
            title={showFrame ? 'Hide Frame Bezel' : 'Show Frame Bezel'}
            className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
              showFrame 
                ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]' 
                : 'bg-[#233548] border-white/10 text-white/60 hover:text-white'
            }`}
          >
            {showFrame ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>

          {/* Backdrop Studio Style Switcher */}
          <div className="flex items-center gap-1 bg-[#233548] border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setBackdrop('cathedral')}
              title="Sacred Cathedral Backdrop"
              className={`w-6 h-6 rounded flex items-center justify-center transition-all cursor-pointer ${
                backdrop === 'cathedral' ? 'bg-[#1C2A39] text-[#D4AF37] shadow-xs ring-1 ring-[#D4AF37]' : 'text-white/50 hover:text-white'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-blue-900 border border-[#D4AF37]" />
            </button>
            <button
              onClick={() => setBackdrop('sand')}
              title="Dawn Warm Sand Backdrop"
              className={`w-6 h-6 rounded flex items-center justify-center transition-all cursor-pointer ${
                backdrop === 'sand' ? 'bg-[#F9F6F0] text-[#1C2A39] shadow-xs ring-1 ring-[#D4AF37]' : 'text-white/50 hover:text-white'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-[#EFE8DA] border border-[#7A8B7B]" />
            </button>
            <button
              onClick={() => setBackdrop('studio')}
              title="Minimalist Studio Backdrop"
              className={`w-6 h-6 rounded flex items-center justify-center transition-all cursor-pointer ${
                backdrop === 'studio' ? 'bg-black text-[#D4AF37] shadow-xs ring-1 ring-[#D4AF37]' : 'text-white/50 hover:text-white'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-700" />
            </button>
          </div>

          {/* Full Browser Mode Quick Switch */}
          <button
            onClick={() => setSelectedDeviceId('responsive')}
            title="Switch to Full Web View"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#D4AF37] text-[#1C2A39] font-bold text-xs hover:bg-[#e4be42] transition-colors cursor-pointer shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Native View</span>
          </button>
        </div>
      </header>

      {/* 2. SIMULATOR STAGE / CANVAS */}
      <main className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 overflow-auto">
        <div 
          className="relative transition-transform duration-300 ease-out flex items-center justify-center origin-top"
          style={{ transform: `scale(${effectiveScale})` }}
        >
          {/* HARDWARE CHASSIS / FRAME (Only if showFrame is true) */}
          <div
            className={`relative transition-all duration-300 ${
              showFrame 
                ? 'p-[11px] rounded-[58px] bg-gradient-to-b from-[#404347] via-[#2A2B2E] to-[#1A1A1C] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.15),0_0_0_4px_rgba(30,30,30,0.8)]' 
                : 'rounded-none shadow-2xl'
            }`}
            style={{
              borderRadius: showFrame ? activeDevice.borderRadius + 10 : 0
            }}
          >
            {/* External Hardware Buttons on Chassis */}
            {showFrame && (
              <>
                {/* Left Side: Mute / Action & Volume */}
                <div className="absolute -left-[4px] top-[110px] w-[4px] h-[28px] bg-[#3B3D42] rounded-l-[3px] shadow-xs" />
                <div className="absolute -left-[4px] top-[155px] w-[4px] h-[52px] bg-[#3B3D42] rounded-l-[3px] shadow-xs" />
                <div className="absolute -left-[4px] top-[220px] w-[4px] h-[52px] bg-[#3B3D42] rounded-l-[3px] shadow-xs" />

                {/* Right Side: Power / Sleep Button */}
                <button
                  onClick={() => setIsScreenLocked(!isScreenLocked)}
                  title={isScreenLocked ? 'Power On Screen' : 'Simulate Screen Lock / Power'}
                  className="absolute -right-[4px] top-[170px] w-[4px] h-[75px] bg-[#3B3D42] hover:bg-[#D4AF37] rounded-r-[3px] shadow-xs transition-colors cursor-pointer"
                />
              </>
            )}

            {/* SCREEN VIEWPORT CONTAINER */}
            <div
              className="relative overflow-hidden bg-[#F9F6F0] flex flex-col shadow-inner"
              style={{
                width: screenWidth,
                height: screenHeight,
                borderRadius: showFrame ? activeDevice.borderRadius : 0,
                // Crucial: transform containment for fixed bottom tabs & modals
                transform: 'translateZ(0)'
              }}
            >
              {/* TOP STATUS BAR (Dynamic Island / Punch Hole & OS Status Icons) */}
              <div 
                className={`sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-6 select-none transition-colors ${
                  activeDevice.cameraType === 'classic-bezel' 
                    ? 'h-6 bg-[#1C2A39] text-[#F9F6F0]' 
                    : 'h-11 bg-transparent text-[#1C2A39]'
                }`}
              >
                {/* Left: Real-time clock */}
                <span className="font-semibold text-xs tracking-tight pl-1 font-['Plus_Jakarta_Sans',sans-serif]">
                  {currentTime}
                </span>

                {/* Center: Camera Cutout / Notch / Dynamic Island */}
                {activeDevice.cameraType === 'dynamic-island' && (
                  <div 
                    title="iPhone Dynamic Island"
                    className="absolute left-1/2 -translate-x-1/2 top-2.5 h-[30px] w-[118px] bg-black rounded-full flex items-center justify-between px-3 shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    {/* Front Camera lens reflection */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a1128] border border-[#1b264f] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#1e3a8a]/60" />
                    </div>
                    {/* FaceID sensor aperture */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#050505]" />
                  </div>
                )}

                {activeDevice.cameraType === 'punch-hole' && (
                  <div 
                    title="Centered Punch Hole Camera"
                    className="absolute left-1/2 -translate-x-1/2 top-3 w-3 h-3 bg-black rounded-full border border-slate-800 shadow-xs flex items-center justify-center"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#112244]" />
                  </div>
                )}

                {activeDevice.cameraType === 'classic-bezel' && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-12 h-1 bg-white/20 rounded-full" />
                )}

                {/* Right: Connectivity & Battery Icons */}
                <div className="flex items-center gap-1.5 text-current pr-1">
                  <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span className="text-[10px] font-bold tracking-tight">5G</span>
                  <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px] font-semibold tabular-nums">98%</span>
                    <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>
              </div>

              {/* SCREEN CONTENT AREA (The Full Sacred Steps App) */}
              <div 
                ref={screenContentRef}
                className="flex-1 w-full overflow-y-auto overflow-x-hidden relative"
                style={{
                  // iOS safe area padding at bottom to clear the home indicator bar
                  paddingBottom: showFrame ? '20px' : '0px'
                }}
              >
                {isScreenLocked ? (
                  /* Simulated Lock Screen */
                  <div className="h-full w-full bg-[#1C2A39] text-[#F9F6F0] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
                    <Sparkles className="w-8 h-8 text-[#D4AF37] mb-4 animate-pulse" />
                    <div className="text-4xl font-serif-sacred font-bold text-[#F9F6F0] mb-1">
                      {currentTime}
                    </div>
                    <div className="text-xs text-[#D4AF37] font-sans-sacred uppercase tracking-widest mb-8">
                      Sacred Steps to Redemption
                    </div>
                    <p className="font-['Caveat',cursive] text-xl text-[#F9F6F0]/90 mb-6">
                      “A Path to Recovery, A Life in Grace.”
                    </p>
                    <button
                      onClick={() => setIsScreenLocked(false)}
                      className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#1C2A39] font-semibold text-xs hover:bg-white transition-colors cursor-pointer"
                    >
                      Tap or Click to Unlock
                    </button>
                  </div>
                ) : (
                  children
                )}
              </div>

              {/* BOTTOM HOME INDICATOR / NAVIGATION BAR */}
              {showFrame && !isScreenLocked && (
                <div 
                  onClick={handleScrollToTop}
                  title="Home Indicator (Tap to scroll to top)"
                  className="sticky bottom-0 left-0 right-0 h-6 bg-transparent flex items-center justify-center z-50 cursor-pointer group"
                >
                  {activeDevice.os === 'Android' ? (
                    <div className="w-20 h-1 bg-black/40 group-hover:bg-[#D4AF37] rounded-full transition-colors" />
                  ) : activeDevice.cameraType === 'classic-bezel' ? (
                    <div className="w-10 h-10 -mt-2 rounded-full border-2 border-[#D4AF37]/50 flex items-center justify-center group-hover:border-[#D4AF37]">
                      <div className="w-8 h-8 rounded-full border border-black/10" />
                    </div>
                  ) : (
                    <div className="w-32 h-1 bg-black/50 group-hover:bg-[#D4AF37] rounded-full transition-colors" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 3. BOTTOM INFO FOOTER BAR */}
      <footer className="w-full py-2 px-4 bg-[#1C2A39]/80 border-t border-white/5 text-[11px] text-[#F9F6F0]/70 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Testing Live: <strong>{activeDevice.name}</strong></span>
          <span className="hidden sm:inline">({activeDevice.description})</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Click bottom bar to scroll top</span>
          <span>·</span>
          <span>Click right side button to test screen sleep</span>
          <span>·</span>
          <button 
            onClick={() => setSelectedDeviceId('responsive')}
            className="text-[#D4AF37] hover:underline cursor-pointer"
          >
            Direct Web View
          </button>
        </div>
      </footer>
    </div>
  );
};
