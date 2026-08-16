import { useState } from 'react';
import { TarotCard, DeckTheme } from '../types';
import { X, Sparkles, RefreshCw, Compass, HeartHandshake, Zap, BookOpen, Eye, Info } from 'lucide-react';
import TarotCardView from './TarotCardView';
import { haptic } from '../utils/haptics';

interface CardModalProps {
  card: TarotCard | null;
  isReversed?: boolean;
  onClose: () => void;
  theme?: DeckTheme;
}

export default function CardModal({ card, isReversed: initialReversed = false, onClose, theme = 'banana-cyber' }: CardModalProps) {
  const [activeTab, setActiveTab] = useState<'symbolism' | 'traditional' | 'cyber'>('symbolism');
  const [isReversed, setIsReversed] = useState(initialReversed);

  if (!card) return null;

  return (
    <div
      id="card-modal-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={() => {
        haptic.tick();
        onClose();
      }}
    >
      <div
        id="card-modal-container"
        className="relative w-full max-w-3xl bg-[#16112B]/98 border-t sm:border border-[#FFE600]/40 rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_-10px_40px_rgba(0,0,0,0.9)] sm:shadow-[0_0_60px_rgba(255,230,0,0.25)] text-[#F5F3FF] overflow-y-auto max-h-[90vh] sm:max-h-[92vh] backdrop-blur-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Android Material 3 Drag Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-white/30 mx-auto mb-4 sm:hidden" />

        {/* Close Button */}
        <button
          id="card-modal-close-btn"
          onClick={() => {
            haptic.tick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#9D94B8] hover:text-[#F5F3FF] border border-white/10 transition-colors active:scale-90 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-7 items-center md:items-start">
          {/* Card Visual & Flip Orientation Switch */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <TarotCardView
              card={card}
              isFlipped={true}
              isReversed={isReversed}
              size="lg"
              theme={theme}
              showInspectButton={false}
              disableFlip={true}
            />
            
            {/* Orientation Toggle Button */}
            <button
              onClick={() => {
                haptic.tick();
                setIsReversed(!isReversed);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-[#FFE600] border border-[#FFE600]/30 transition-all active:scale-95 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReversed ? 'rotate-180 text-[#FF007F]' : 'text-[#00F2FE]'}`} />
              <span>Flip: {isReversed ? 'Reversed' : 'Upright'}</span>
            </button>

            <div className="text-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFE600]">
                {card.element} Element • {card.suit}
              </span>
            </div>
          </div>

          {/* Card Encyclopedia Details */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 font-mono">
                  Arcana #{card.number}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  1909 Rider-Waite-Smith
                </span>
                {card.zodiacOrPlanet && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30">
                    {card.zodiacOrPlanet}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F3FF] mt-1.5 flex items-center gap-3">
                {card.name}
              </h2>
            </div>

            {/* Navigation Tabs for Deep Dive */}
            <div className="flex items-center gap-2 p-1 bg-black/40 rounded-2xl border border-white/10 font-mono text-xs">
              <button
                onClick={() => {
                  haptic.tick();
                  setActiveTab('symbolism');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-all ${
                  activeTab === 'symbolism'
                    ? 'bg-[#FFE600] text-black font-bold shadow-md'
                    : 'text-[#9D94B8] hover:text-[#F5F3FF]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Original Art & Symbolism</span>
              </button>

              <button
                onClick={() => {
                  haptic.tick();
                  setActiveTab('traditional');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-all ${
                  activeTab === 'traditional'
                    ? 'bg-[#00F2FE] text-black font-bold shadow-md'
                    : 'text-[#9D94B8] hover:text-[#F5F3FF]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Traditional Meaning</span>
              </button>

              <button
                onClick={() => {
                  haptic.tick();
                  setActiveTab('cyber');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-all ${
                  activeTab === 'cyber'
                    ? 'bg-[#FF007F] text-white font-bold shadow-md'
                    : 'text-[#9D94B8] hover:text-[#F5F3FF]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Cyber Lore</span>
              </button>
            </div>

            {/* Tab 1: Original Symbolism Breakdown */}
            {activeTab === 'symbolism' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 font-mono">
                    <Info className="w-4 h-4 text-amber-400" />
                    Pamela Colman Smith’s 1909 Original Iconography
                  </div>
                  {card.symbolism && card.symbolism.length > 0 ? (
                    <ul className="space-y-2 text-xs sm:text-sm text-[#D1CBE8]">
                      {card.symbolism.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#FFE600] font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-[#D1CBE8]">
                      Original 1909 Rider-Waite-Smith classical archetype containing the sacred geometric and esoteric symbols of the Golden Dawn tradition.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Traditional A.E. Waite Divination & Meanings */}
            {activeTab === 'traditional' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                {card.traditionalMeaning && (
                  <div className="p-4 rounded-2xl bg-[#00F2FE]/10 border border-[#00F2FE]/30">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#00F2FE] uppercase tracking-wider mb-1.5 font-mono">
                      <BookOpen className="w-4 h-4" />
                      The Pictorial Key to the Tarot (1909)
                    </div>
                    <p className="text-xs sm:text-sm text-[#D1CBE8] italic font-serif leading-relaxed">
                      "{card.traditionalMeaning}"
                    </p>
                  </div>
                )}

                {/* Upright vs Reversed Deep Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={`p-3.5 rounded-2xl border ${!isReversed ? 'bg-[#00F2FE]/15 border-[#00F2FE]/50' : 'bg-black/30 border-white/5 opacity-70'}`}>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#00F2FE] uppercase tracking-wider mb-1 font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      Upright Meaning
                    </div>
                    <p className="text-xs text-[#D1CBE8] leading-relaxed">
                      {card.uprightMeaning}
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${isReversed ? 'bg-[#FF007F]/15 border-[#FF007F]/50' : 'bg-black/30 border-white/5 opacity-70'}`}>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF007F] uppercase tracking-wider mb-1 font-mono">
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reversed Meaning
                    </div>
                    <p className="text-xs text-[#D1CBE8] leading-relaxed">
                      {card.reversedMeaning}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Cyber Lore & Modern Matrix Interpretation */}
            {activeTab === 'cyber' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-[#FFE600]/10 border border-[#FFE600]/30">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFE600] uppercase tracking-wider mb-1.5 font-mono">
                    <Zap className="w-4 h-4" />
                    Cyber-Mystic Matrix Lore
                  </div>
                  <p className="text-xs sm:text-sm text-[#D1CBE8] italic font-serif leading-relaxed">
                    "{card.cyberLore}"
                  </p>
                </div>
              </div>
            )}

            {/* Upright vs Reversed Keywords */}
            <div className="space-y-2">
              <div className={`p-3 rounded-2xl border ${!isReversed ? 'bg-[#00F2FE]/10 border-[#00F2FE]/30' : 'bg-black/20 border-white/5'}`}>
                <div className="text-[10px] font-mono font-bold text-[#00F2FE] uppercase tracking-wider mb-1.5">
                  Upright Resonance Keywords
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {card.uprightKeywords.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-0.5 rounded-xl bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-3 rounded-2xl border ${isReversed ? 'bg-[#FF007F]/10 border-[#FF007F]/30' : 'bg-black/20 border-white/5'}`}>
                <div className="text-[10px] font-mono font-bold text-[#FF007F] uppercase tracking-wider mb-1.5">
                  Reversed / Shadow Keywords
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {card.reversedKeywords.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-0.5 rounded-xl bg-[#FF007F]/15 text-[#FF007F] border border-[#FF007F]/30">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actionable Directive & Affirmation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#100B24] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFE600] uppercase tracking-wider mb-1 font-mono">
                  <Compass className="w-3.5 h-3.5" />
                  Actionable Directive
                </div>
                <p className="text-xs text-[#D1CBE8] leading-relaxed">
                  {card.advice}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#100B24] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFE600] uppercase tracking-wider mb-1 font-mono">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Sacred Affirmation
                </div>
                <p className="text-xs text-[#D1CBE8] italic leading-relaxed">
                  "{card.affirmation}"
                </p>
              </div>
            </div>

            {/* Android Dismiss Button */}
            <button
              onClick={() => {
                haptic.tick();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F5F3FF] font-semibold text-xs transition-colors mt-1 active:scale-95 shadow-sm"
            >
              Close Card Archetype
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
