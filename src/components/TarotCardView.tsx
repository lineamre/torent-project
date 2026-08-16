import { useState } from 'react';
import { TarotCard, DeckTheme, ReadingFocusId } from '../types';
import { Sparkles, RefreshCw, Eye } from 'lucide-react';

interface TarotCardViewProps {
  card: TarotCard;
  isFlipped: boolean;
  isReversed?: boolean;
  onClick?: () => void;
  onInspect?: () => void;
  size?: 'sm' | 'md' | 'lg';
  theme?: DeckTheme;
  readingFocus?: ReadingFocusId;
  showInspectButton?: boolean;
  disableFlip?: boolean;
}

export default function TarotCardView({
  card,
  isFlipped,
  isReversed = false,
  onClick,
  onInspect,
  size = 'md',
  theme = 'banana-cyber',
  readingFocus,
  showInspectButton = true,
  disableFlip = false,
}: TarotCardViewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Size dimensions
  const sizeClasses = {
    sm: 'w-[125px] h-[210px] text-xs',
    md: 'w-[160px] sm:w-[185px] h-[270px] sm:h-[310px] text-sm',
    lg: 'w-[220px] sm:w-[260px] h-[360px] sm:h-[420px] text-base',
  }[size];

  const getFocusDesign = () => {
    // If readingFocus is explicitly supplied, prioritize it (Red: Love, Blue: Future, Black: Life, Gold: Fortune)
    if (readingFocus === 'love') {
      return {
        bg: 'bg-gradient-to-br from-[#2D0A16] via-[#16040A] to-[#220710] border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.3)]',
        hoverBorder: 'group-hover:border-rose-400 group-hover:shadow-[0_0_35px_rgba(244,63,94,0.55)]',
        accent: 'text-rose-400 border-rose-500/40',
        sigil: '❤️',
        sigilClass: 'text-rose-400 drop-shadow-[0_0_12px_#F43F5E]',
        frontBorder: 'border-rose-500/80 shadow-[0_0_35px_rgba(244,63,94,0.35)]',
        topBg: 'bg-[#240813]/90 border-rose-500/40',
        bottomBg: 'bg-[#240813]/95 border-rose-500/40',
        focusTag: 'Love & Romance',
        glowColor: '#EF4444',
      };
    }

    if (readingFocus === 'future') {
      return {
        bg: 'bg-gradient-to-br from-[#0B1E3F] via-[#050E21] to-[#081730] border-blue-500/60 shadow-[0_0_30px_rgba(59,130,246,0.3)]',
        hoverBorder: 'group-hover:border-blue-400 group-hover:shadow-[0_0_35px_rgba(59,130,246,0.55)]',
        accent: 'text-blue-400 border-blue-500/40',
        sigil: '🔮',
        sigilClass: 'text-blue-400 drop-shadow-[0_0_12px_#3B82F6]',
        frontBorder: 'border-blue-500/80 shadow-[0_0_35px_rgba(59,130,246,0.35)]',
        topBg: 'bg-[#08152D]/90 border-blue-500/40',
        bottomBg: 'bg-[#08152D]/95 border-blue-500/40',
        focusTag: 'Future & Destiny',
        glowColor: '#3B82F6',
      };
    }

    if (readingFocus === 'life') {
      return {
        bg: 'bg-gradient-to-br from-[#1C1C22] via-[#0D0D11] to-[#17171C] border-zinc-400/60 shadow-[0_0_30px_rgba(255,255,255,0.15)]',
        hoverBorder: 'group-hover:border-zinc-200 group-hover:shadow-[0_0_35px_rgba(255,255,255,0.35)]',
        accent: 'text-zinc-200 border-zinc-400/40',
        sigil: '🌌',
        sigilClass: 'text-zinc-100 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]',
        frontBorder: 'border-zinc-300 shadow-[0_0_35px_rgba(255,255,255,0.2)]',
        topBg: 'bg-[#141418]/90 border-zinc-500/40',
        bottomBg: 'bg-[#141418]/95 border-zinc-500/40',
        focusTag: 'Life & Purpose',
        glowColor: '#E4E4E7',
      };
    }

    if (readingFocus === 'fortune') {
      return {
        bg: 'bg-gradient-to-br from-[#331C04] via-[#1A0E02] to-[#261503] border-amber-400/70 shadow-[0_0_30px_rgba(245,158,11,0.35)]',
        hoverBorder: 'group-hover:border-amber-300 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]',
        accent: 'text-amber-400 border-amber-400/40',
        sigil: '💰',
        sigilClass: 'text-amber-300 drop-shadow-[0_0_12px_#F59E0B]',
        frontBorder: 'border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.4)]',
        topBg: 'bg-[#211204]/90 border-amber-400/40',
        bottomBg: 'bg-[#211204]/95 border-amber-400/40',
        focusTag: 'Money & Fortune',
        glowColor: '#F59E0B',
      };
    }

    // Default Deck Themes
    switch (theme) {
      case 'cosmic-gold':
        return {
          bg: 'bg-gradient-to-br from-[#2a1708] via-[#140b04] to-[#241306] border-amber-400/50 shadow-amber-500/20',
          hoverBorder: 'group-hover:border-amber-400 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.45)]',
          accent: 'text-amber-400 border-amber-400/40',
          sigil: '✦',
          sigilClass: 'text-amber-400 drop-shadow-[0_0_10px_#F59E0B]',
          frontBorder: 'border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.35)]',
          topBg: 'bg-[#1E1106]/90 border-amber-400/30',
          bottomBg: 'bg-[#1E1106]/95 border-amber-400/30',
          focusTag: 'Tarot Arcana',
          glowColor: '#F59E0B',
        };
      case 'neon-matrix':
        return {
          bg: 'bg-gradient-to-br from-[#062428] via-[#041215] to-[#041d20] border-cyan-400/50 shadow-cyan-500/20',
          hoverBorder: 'group-hover:border-cyan-400 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.45)]',
          accent: 'text-cyan-400 border-cyan-400/40',
          sigil: '⌬',
          sigilClass: 'text-cyan-400 drop-shadow-[0_0_10px_#00F2FE]',
          frontBorder: 'border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.35)]',
          topBg: 'bg-[#06181C]/90 border-cyan-400/30',
          bottomBg: 'bg-[#06181C]/95 border-cyan-400/30',
          focusTag: 'Matrix Arcana',
          glowColor: '#00F2FE',
        };
      case 'void-amethyst':
        return {
          bg: 'bg-gradient-to-br from-[#230a38] via-[#10041a] to-[#1a082b] border-purple-400/50 shadow-purple-500/20',
          hoverBorder: 'group-hover:border-purple-400 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]',
          accent: 'text-purple-400 border-purple-400/40',
          sigil: '✧',
          sigilClass: 'text-purple-400 drop-shadow-[0_0_10px_#A855F7]',
          frontBorder: 'border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.35)]',
          topBg: 'bg-[#180628]/90 border-purple-400/30',
          bottomBg: 'bg-[#180628]/95 border-purple-400/30',
          focusTag: 'Amethyst Arcana',
          glowColor: '#A855F7',
        };
      default: // banana-cyber
        return {
          bg: 'bg-gradient-to-br from-[#1F183E] via-[#120B29] to-[#100B24] border-[#FFE600]/50 shadow-[0_0_30px_rgba(255,230,0,0.25)]',
          hoverBorder: 'group-hover:border-[#FFE600] group-hover:shadow-[0_0_35px_rgba(255,230,0,0.45)]',
          accent: 'text-[#FFE600] border-[#FFE600]/40',
          sigil: '⚡',
          sigilClass: 'text-[#FFE600] drop-shadow-[0_0_10px_#FFE600]',
          frontBorder: 'border-[#FFE600] shadow-[0_0_35px_rgba(255,230,0,0.35)]',
          topBg: 'bg-[#160E2E]/90 border-amber-400/30',
          bottomBg: 'bg-[#160E2E]/95 border-amber-400/30',
          focusTag: 'Original RWS',
          glowColor: '#FFE600',
        };
    }
  };

  const focusStyle = getFocusDesign();

  return (
    <div
      id={`tarot-card-wrapper-${card.id}`}
      className={`relative select-none perspective-[1200px] cursor-pointer group transition-all duration-300 ${sizeClasses}`}
      onClick={!disableFlip ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] rounded-2xl ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        } ${isHovered && !isFlipped ? '-translate-y-2.5 scale-[1.02]' : ''}`}
      >
        {/* ================= CARD BACK ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl [backface-visibility:hidden] p-2 sm:p-2.5 flex flex-col items-center justify-center border-2 ${focusStyle.bg} shadow-2xl transition-all duration-300 ${focusStyle.hoverBorder}`}
        >
          <div className="w-full h-full rounded-xl border border-white/15 p-2 flex flex-col items-center justify-between relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_75%)]">
            {/* Corner Glyphs */}
            <div className="w-full flex justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-[#F5F3FF] opacity-80">
              <span className="font-bold">{focusStyle.focusTag}</span>
              <span>1909 RWS</span>
            </div>

            {/* Central Mystic Sigil */}
            <div className="relative flex items-center justify-center my-auto">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed animate-[spin_25s_linear_infinite] flex items-center justify-center opacity-60"
                style={{ borderColor: focusStyle.glowColor }}
              />
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border absolute flex items-center justify-center bg-black/75 shadow-lg"
                style={{ borderColor: focusStyle.glowColor }}
              >
                <span className={`text-xl sm:text-2xl animate-pulse filter ${focusStyle.sigilClass}`}>
                  {focusStyle.sigil}
                </span>
              </div>
            </div>

            {/* Bottom Details */}
            <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] text-[#9D94B8] font-mono">
              <span>✦ RIDER-WAITE ✦</span>
              <span>P.C. SMITH</span>
            </div>

            {/* Shimmer line effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          </div>
        </div>

        {/* ================= CARD FRONT (ORIGINAL 1909 RWS ARTWORK) ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] p-1.5 sm:p-2 flex flex-col justify-between border-2 bg-[#120B24] ${focusStyle.frontBorder} text-[#F5F3FF] overflow-hidden`}
        >
          <div
            className={`w-full h-full flex flex-col justify-between transition-transform duration-500 rounded-xl overflow-hidden relative bg-[#0A0614] border border-white/15 ${
              isReversed ? 'rotate-180' : ''
            }`}
          >
            {/* Top Bar Header: Roman Numeral & Element */}
            <div className={`z-10 px-2 py-1 ${focusStyle.topBg} flex items-center justify-between text-[10px] sm:text-xs font-serif font-bold text-[#F5F3FF]`}>
              <span className="font-mono text-[10px] tracking-wider font-bold" style={{ color: focusStyle.glowColor }}>
                {card.number}
              </span>
              <span className="text-[10px] text-[#E2DCF5] flex items-center gap-1 font-mono uppercase tracking-wider">
                <span>{card.symbol}</span>
                <span className="hidden sm:inline">{card.suit}</span>
              </span>
            </div>

            {/* Central Stage: Original Rider-Waite-Smith Illustration Artwork */}
            <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden bg-[#1a1429]">
              {!imageError && card.image ? (
                <img
                  src={card.image}
                  alt={`Original 1909 Rider-Waite Tarot card: ${card.name}`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-80 blur-xs'
                  }`}
                  loading="lazy"
                />
              ) : (
                /* High-detail decorative fallback if image is loading / offline */
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-[#1C1236] via-[#120B24] to-[#0A0517]">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative mb-2"
                    style={{
                      background: `radial-gradient(circle, ${focusStyle.glowColor}40 0%, transparent 75%)`,
                    }}
                  >
                    <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                      {card.icon}
                    </span>
                  </div>
                  <span className="text-[11px] font-serif font-bold text-[#F5F3FF]">
                    {card.name}
                  </span>
                  <span className="text-[9px] font-mono mt-0.5" style={{ color: focusStyle.glowColor }}>
                    Original 1909 Archetype
                  </span>
                </div>
              )}

              {/* Subtle vintage parchment vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Bottom Ribbon Bar: Authentic Name & Orientation Pill */}
            <div className={`z-10 px-2 py-1 sm:py-1.5 ${focusStyle.bottomBg} flex flex-col items-center justify-center text-center`}>
              <div className="font-serif font-bold text-[11px] sm:text-xs text-[#F5F3FF] tracking-wide truncate w-full">
                {card.name}
              </div>

              <div className="flex items-center justify-center gap-1 mt-0.5">
                {isReversed ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-widest bg-[#FF007F]/25 text-[#FF007F] border border-[#FF007F]/40 font-mono">
                    <RefreshCw className="w-2 h-2" />
                    Reversed
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-widest font-mono"
                    style={{
                      backgroundColor: `${focusStyle.glowColor}25`,
                      color: focusStyle.glowColor,
                      border: `1px solid ${focusStyle.glowColor}50`,
                    }}
                  >
                    <Sparkles className="w-2 h-2" />
                    Upright
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Inspect Lens Trigger */}
          {isFlipped && showInspectButton && onInspect && (
            <button
              id={`inspect-card-btn-${card.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onInspect();
              }}
              title="Inspect original card symbolism & meaning"
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/80 hover:bg-white text-zinc-300 hover:text-black border border-white/30 transition-colors z-30 shadow-lg active:scale-90"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
