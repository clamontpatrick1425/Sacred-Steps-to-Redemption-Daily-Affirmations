import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Image as ImageIcon, 
  RefreshCw,
  Sun
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { analyticsService } from '../../services/analyticsService';

interface ShareGraphicModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  scriptureRef: string;
  scriptureText: string;
  embrace: string;
  truth: string;
  practiceStep?: string;
  themeTitle?: string;
}

export type GraphicMode = 'embrace' | 'truth' | 'full_step';

export const ShareGraphicModal: React.FC<ShareGraphicModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  scriptureRef,
  scriptureText,
  embrace,
  truth,
  practiceStep,
  themeTitle = 'A Path to Recovery, A Life in Grace'
}) => {
  const cardDomRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<GraphicMode>('embrace');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copyImageSuccess, setCopyImageSuccess] = useState<boolean>(false);

  // Function to capture the card DOM element as a crisp square PNG using html2canvas
  const generateGraphicWithHtml2Canvas = async (): Promise<string | null> => {
    if (!cardDomRef.current) return null;

    setIsCapturing(true);
    try {
      // Small tick to ensure fonts and styles are loaded
      await document.fonts?.ready;

      const canvas = await html2canvas(cardDomRef.current, {
        scale: 2, // Generates high-res 1080x1080 square output
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#F9F6F0',
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure cloned card is fully visible and rendered
          const clonedCard = clonedDoc.getElementById('sacred-share-card');
          if (clonedCard) {
            clonedCard.style.display = 'flex';
          }
        }
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setCapturedImageUrl(dataUrl);
      setIsCapturing(false);
      return dataUrl;
    } catch (err) {
      console.error('Error generating graphic with html2canvas:', err);
      setIsCapturing(false);
      return null;
    }
  };

  // Re-generate preview whenever modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        generateGraphicWithHtml2Canvas();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCapturedImageUrl('');
    }
  }, [isOpen, mode, dayNumber]);

  if (!isOpen) return null;

  // Direct download handler
  const handleDownloadImage = async () => {
    let urlToDownload = capturedImageUrl;
    if (!urlToDownload) {
      const freshUrl = await generateGraphicWithHtml2Canvas();
      if (!freshUrl) return;
      urlToDownload = freshUrl;
    }

    const link = document.createElement('a');
    link.download = `Sacred_Steps_Day_${dayNumber}_${mode}.png`;
    link.href = urlToDownload;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    analyticsService.trackShareGraphicGenerated(dayNumber, 'png_html2canvas');
  };

  // Copy Image directly to clipboard if browser supports ClipboardItem
  const handleCopyImageToClipboard = async () => {
    try {
      if (!cardDomRef.current) return;
      const canvas = await html2canvas(cardDomRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#F9F6F0',
        logging: false
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            setCopyImageSuccess(true);
            setTimeout(() => setCopyImageSuccess(false), 2500);
            analyticsService.trackShareGraphicGenerated(dayNumber, 'copy_image_clipboard');
          } else {
            // Fallback to text copy
            handleCopyText();
          }
        } catch {
          handleCopyText();
        }
      }, 'image/png');
    } catch {
      handleCopyText();
    }
  };

  const handleCopyText = () => {
    const textToCopy = `“${mode === 'embrace' ? embrace : truth}”\n\n— ${scriptureRef}\nFrom Sacred Steps Daily Grace: https://sacred-steps-affirmations.ai.studio/`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    analyticsService.trackShareGraphicGenerated(dayNumber, 'copy_text');
  };

  const handleNativeShare = async () => {
    const activeText = mode === 'embrace' ? embrace : truth;
    const shareData = {
      title: `Sacred Steps Day ${dayNumber} Affirmation`,
      text: `“${activeText}” — ${scriptureRef}`,
      url: 'https://sacred-steps-affirmations.ai.studio/'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        analyticsService.trackShareGraphicGenerated(dayNumber, 'web_share');
      } catch {
        // user dismissed share sheet
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1C2A39]/85 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-xl bg-[#F9F6F0] rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-4 sm:p-6 my-auto text-[#2B2B2B]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/25">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center shadow-xs">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#1C2A39]">
                  Branded Shareable Graphic
                </h3>
                <p className="text-[11px] text-[#7A8B7B] font-['Plus_Jakarta_Sans',sans-serif]">
                  Captured in 1080×1080 square format with html2canvas
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 rounded-full text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Toggle Graphic Theme Mode */}
          <div className="grid grid-cols-3 gap-1.5 bg-[#1C2A39]/10 p-1 rounded-xl my-3 font-['Plus_Jakarta_Sans',sans-serif]">
            <button
              onClick={() => setMode('embrace')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer truncate ${
                mode === 'embrace'
                  ? 'bg-[#1C2A39] text-[#D4AF37] shadow-xs'
                  : 'text-[#1C2A39]/70 hover:text-[#1C2A39]'
              }`}
            >
              Embrace
            </button>
            <button
              onClick={() => setMode('truth')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer truncate ${
                mode === 'truth'
                  ? 'bg-[#1C2A39] text-[#D4AF37] shadow-xs'
                  : 'text-[#1C2A39]/70 hover:text-[#1C2A39]'
              }`}
            >
              Truth
            </button>
            <button
              onClick={() => setMode('full_step')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer truncate ${
                mode === 'full_step'
                  ? 'bg-[#1C2A39] text-[#D4AF37] shadow-xs'
                  : 'text-[#1C2A39]/70 hover:text-[#1C2A39]'
              }`}
            >
              Daily S.T.E.P.
            </button>
          </div>

          {/* Hidden Source DOM Node specifically formatted for html2canvas to capture */}
          <div className="overflow-hidden h-0 w-0 opacity-0 pointer-events-none">
            <div
              id="sacred-share-card"
              ref={cardDomRef}
              style={{
                width: '540px',
                height: '540px',
                backgroundColor: '#F9F6F0',
                color: '#2B2B2B',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                position: 'relative',
                fontFamily: '"Plus Jakarta Sans", sans-serif'
              }}
            >
              {/* Dual Gold Borders with Corner Accents */}
              <div
                style={{
                  position: 'absolute',
                  inset: '16px',
                  border: '3px solid #D4AF37',
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '22px',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  pointerEvents: 'none'
                }}
              />

              {/* Corner Ornaments */}
              <div style={{ position: 'absolute', top: '13px', left: '13px', width: '9px', height: '9px', backgroundColor: '#D4AF37', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', top: '13px', right: '13px', width: '9px', height: '9px', backgroundColor: '#D4AF37', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '13px', left: '13px', width: '9px', height: '9px', backgroundColor: '#D4AF37', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '13px', right: '13px', width: '9px', height: '9px', backgroundColor: '#D4AF37', borderRadius: '50%' }} />

              {/* Top Header Motif & Day Counter */}
              <div style={{ textAlign: 'center', paddingTop: '10px', zIndex: 10 }}>
                {/* Sacred Motif */}
                <div style={{ display: 'inline-block', marginBottom: '4px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#7A8B7B', textTransform: 'uppercase' }}>
                  DAY {dayNumber} OF 365 · SACRED S.T.E.P.
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase', marginTop: '2px' }}>
                  {mode === 'embrace' && 'DAILY EMBRACE AFFIRMATION'}
                  {mode === 'truth' && 'BIBLICAL TRUTH'}
                  {mode === 'full_step' && 'SACRED DAILY DEVOTIONAL'}
                </div>
              </div>

              {/* Card Center Content based on Mode */}
              <div style={{ textAlign: 'center', padding: '0 16px', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {mode === 'embrace' && (
                  <div>
                    <p style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      fontSize: '26px',
                      lineHeight: '1.35',
                      color: '#1C2A39',
                      margin: '0 0 16px 0'
                    }}>
                      “{embrace.replace(/[“”"]/g, '')}”
                    </p>
                    <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 14px auto', opacity: 0.7 }} />
                    <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '17px', fontWeight: 700, color: '#1C2A39' }}>
                      {scriptureRef}
                    </div>
                    <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: '14px', color: '#2B2B2B', marginTop: '4px', lineHeight: '1.3' }}>
                      {scriptureText}
                    </div>
                  </div>
                )}

                {mode === 'truth' && (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#7A8B7B', marginBottom: '8px', textTransform: 'uppercase' }}>
                      The Truth That Replaces The Lie
                    </div>
                    <p style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '1.45',
                      color: '#1C2A39',
                      margin: '0 0 16px 0'
                    }}>
                      {truth}
                    </p>
                    <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 14px auto', opacity: 0.7 }} />
                    <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '17px', fontWeight: 700, color: '#1C2A39' }}>
                      {scriptureRef}
                    </div>
                  </div>
                )}

                {mode === 'full_step' && (
                  <div style={{ textAlign: 'left', padding: '0 8px', fontSize: '12px' }}>
                    <div style={{ marginBottom: '8px', borderLeft: '3px solid #D4AF37', paddingLeft: '8px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8B7B', textTransform: 'uppercase' }}>Scripture</div>
                      <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '14px', fontWeight: 700, color: '#1C2A39' }}>{scriptureRef}</div>
                      <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', color: '#2B2B2B', fontSize: '12px' }}>{scriptureText}</div>
                    </div>
                    <div style={{ marginBottom: '8px', borderLeft: '3px solid #7A8B7B', paddingLeft: '8px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8B7B', textTransform: 'uppercase' }}>Truth</div>
                      <div style={{ color: '#2B2B2B', lineHeight: '1.3' }}>{truth}</div>
                    </div>
                    <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '8px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#D4AF37', textTransform: 'uppercase' }}>Embrace</div>
                      <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontWeight: 600, color: '#1C2A39', fontSize: '13px' }}>
                        “{embrace.replace(/[“”"]/g, '')}”
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Watermark & Footer */}
              <div style={{ textAlign: 'center', paddingBottom: '10px', zIndex: 10 }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#7A8B7B',
                  letterSpacing: '1px'
                }}>
                  sacred-steps-affirmations.ai.studio
                </div>
              </div>
            </div>
          </div>

          {/* Visual Display Container: Renders Captured Image or Preview */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-inner bg-[#F9F6F0] flex items-center justify-center p-1">
            {capturedImageUrl ? (
              <img
                src={capturedImageUrl}
                alt="Branded Sacred Steps Square Affirmation Graphic"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#7A8B7B]">
                <Sparkles className="w-6 h-6 animate-spin text-[#D4AF37]" />
                <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif]">
                  Rendering square graphic with html2canvas...
                </span>
              </div>
            )}

            {isCapturing && (
              <div className="absolute inset-0 bg-[#F9F6F0]/70 backdrop-blur-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#D4AF37] animate-spin" />
                <span className="text-xs font-semibold text-[#1C2A39]">Capturing DOM...</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 space-y-2 font-['Plus_Jakarta_Sans',sans-serif]">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadImage}
                disabled={isCapturing}
                className="min-h-[46px] py-2.5 px-4 rounded-xl bg-[#1C2A39] hover:bg-[#D4AF37] text-[#F9F6F0] hover:text-[#1C2A39] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download (1080×1080)</span>
              </button>

              <button
                onClick={handleNativeShare}
                disabled={isCapturing}
                className="min-h-[46px] py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c29f31] text-[#1C2A39] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Share2 className="w-4 h-4" />
                <span>Share to Social</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyImageToClipboard}
                className="py-2.5 px-3 rounded-xl border border-[#D4AF37]/40 text-xs font-semibold text-[#1C2A39] hover:bg-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copyImageSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Image Copied!</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Copy Image to Clipboard</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyText}
                className="py-2.5 px-3 rounded-xl border border-[#D4AF37]/40 text-xs font-semibold text-[#1C2A39] hover:bg-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Text Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#7A8B7B]" />
                    <span>Copy Quote Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

