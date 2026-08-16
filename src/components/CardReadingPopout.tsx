import { useState } from 'react';
import { DealtCard, SpreadConfig, DeckTheme, ReadingFocusId } from '../types';
import { X, Sparkles, RefreshCw, Compass, HeartHandshake, ChevronLeft, ChevronRight, Eye, Wand2, BookOpen, Layers } from 'lucide-react';
import TarotCardView from './TarotCardView';
import OracleVoicePlayer from './OracleVoicePlayer';
import { haptic } from '../utils/haptics';
import { sound } from '../utils/audio';
import { getFocusById } from '../data/readingFocuses';
import { oracleVoice } from '../utils/speech';
import { TAGALOG_CARD_NAMES, TAGALOG_SLOT_ROLES, TAGALOG_CARD_CORE, getSlotRoleTagalog, translateKeywordTagalog, translateReadingToTagalog } from '../utils/tagalogTarot';

interface CardReadingPopoutProps {
  dealtCard: DealtCard;
  cardIndex: number;
  totalCards: number;
  spread: SpreadConfig;
  readingFocus?: ReadingFocusId;
  question?: string;
  theme?: DeckTheme;
  onClose: () => void;
  onNavigateCard?: (newIndex: number) => void;
  onOpenFullSynthesis?: () => void;
  onInspectSymbolism?: (card: DealtCard) => void;
  allRevealed?: boolean;
}

export default function CardReadingPopout({
  dealtCard,
  cardIndex,
  totalCards,
  spread,
  readingFocus = 'love',
  question,
  theme = 'banana-cyber',
  onClose,
  onNavigateCard,
  onOpenFullSynthesis,
  onInspectSymbolism,
  allRevealed = false,
}: CardReadingPopoutProps) {
  const { card, slot, isReversed } = dealtCard;
  const focusObj = getFocusById(readingFocus);
  const isTagalog = oracleVoice.currentLanguage === 'tl';
  const tagalogCardName = TAGALOG_CARD_NAMES[card.name] || card.name;
  const tagalogSlotTitle = TAGALOG_SLOT_ROLES[slot.title] || slot.title;
  const tagalogSlotRole = getSlotRoleTagalog(slot.role);

  const rawMeaning = isReversed ? card.reversedMeaning : card.uprightMeaning;
  const tagalogCore = TAGALOG_CARD_CORE[card.name];
  
  const displayMeaning = isTagalog
    ? (isReversed ? (tagalogCore?.reversed || translateReadingToTagalog(rawMeaning, readingFocus)) : (tagalogCore?.upright || translateReadingToTagalog(rawMeaning, readingFocus)))
    : rawMeaning;
  const displayAdvice = isTagalog
    ? (tagalogCore?.advice || translateReadingToTagalog(card.advice, readingFocus))
    : card.advice;
  const displayAffirmation = isTagalog
    ? (tagalogCore?.affirmation || translateReadingToTagalog(card.affirmation, readingFocus))
    : card.affirmation;

  const handleNext = () => {
    if (cardIndex < totalCards - 1 && onNavigateCard) {
      haptic.tick();
      sound.playFlip();
      onNavigateCard(cardIndex + 1);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0 && onNavigateCard) {
      haptic.tick();
      sound.playFlip();
      onNavigateCard(cardIndex - 1);
    }
  };

  const voiceNarrative = isTagalog
    ? `Posisyon: ${tagalogSlotTitle}. ${tagalogSlotRole}. Baraha: ${tagalogCardName}, ${isReversed ? 'Pabaligtad' : 'Nakatayo'}. Pagbasa: ${displayMeaning}. Gabay: ${displayAdvice}. Paninindigan: ${displayAffirmation}.`
    : `Position: ${slot.title}. ${slot.role}. Archetype: ${card.name}, ${isReversed ? 'Reversed' : 'Upright'}. Reading: ${rawMeaning}. Directive: ${card.advice}. Affirmation: ${card.affirmation}.`;

  return (
    <div
      id="card-reading-popout-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={() => {
        haptic.tick();
        onClose();
      }}
    >
      <div
        id="card-reading-popout-container"
        className="relative w-full max-w-2xl bg-[#140E29]/95 border-t sm:border border-[#FFE600]/40 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.9)] sm:shadow-[0_0_60px_rgba(255,230,0,0.3)] text-[#F5F3FF] overflow-y-auto max-h-[92vh] sm:max-h-[88vh] backdrop-blur-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-250 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Android Material 3 Drag Handle */}
        <div className="w-12 h-1.5 rounded-full bg-white/30 mx-auto sm:hidden" />

        {/* Top Header Bar with Slot Indicator and Close */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 flex items-center gap-1">
              <Wand2 className="w-3 h-3" />
              {isTagalog ? `Posisyon ${cardIndex + 1} sa ${totalCards}` : `Slot ${cardIndex + 1} of ${totalCards}`}
            </span>
            <span className="text-xs text-[#9D94B8] font-mono truncate max-w-[160px] sm:max-w-[240px]">
              {spread.name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Quick Navigation Between Cards */}
            {onNavigateCard && (
              <div className="flex items-center gap-1 mr-2 bg-black/40 rounded-xl p-0.5 border border-white/10">
                <button
                  onClick={handlePrev}
                  disabled={cardIndex === 0}
                  className="p-1 rounded-lg text-[#9D94B8] hover:text-white disabled:opacity-30 disabled:hover:text-[#9D94B8] transition-colors"
                  title="Previous Card Reading"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-mono px-1 text-[#FFE600]">
                  {cardIndex + 1}/{totalCards}
                </span>
                <button
                  onClick={handleNext}
                  disabled={cardIndex === totalCards - 1}
                  className="p-1 rounded-lg text-[#9D94B8] hover:text-white disabled:opacity-30 disabled:hover:text-[#9D94B8] transition-colors"
                  title="Next Card Reading"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              id="card-popout-close-btn"
              onClick={() => {
                haptic.tick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#9D94B8] hover:text-[#F5F3FF] border border-white/10 transition-colors active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Position Meaning Focus Badge */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FFE600]/15 via-[#1A1238] to-[#00F2FE]/10 border border-[#FFE600]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {slot.icon && (
              <span className="text-xl p-2 rounded-xl bg-white/10 border border-white/15">
                {slot.icon}
              </span>
            )}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFE600] font-bold">
                {isTagalog ? `Posisyon: ${tagalogSlotTitle}` : `Position: ${slot.title}`}
              </span>
              <p className="text-xs text-[#D1CBE8] font-serif italic mt-0.5">
                {isTagalog ? tagalogSlotRole : slot.role}
              </p>
            </div>
          </div>
          {question && (
            <div className="text-[11px] text-[#9D94B8] bg-black/40 px-2.5 py-1 rounded-xl border border-white/10 max-w-xs truncate">
              {isTagalog ? `Tanong: "${question}"` : `Inquiry: "${question}"`}
            </div>
          )}
        </div>

        {/* Main Card Revelation Stage */}
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          {/* Card Visual & Inspect Action */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <TarotCardView
              card={card}
              isFlipped={true}
              isReversed={isReversed}
              size="md"
              theme={theme}
              readingFocus={readingFocus}
              showInspectButton={false}
              disableFlip={true}
            />

            {onInspectSymbolism && (
              <button
                onClick={() => {
                  haptic.cardSelect();
                  onInspectSymbolism(dealtCard);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FFE600] hover:text-black text-xs font-mono text-[#FFE600] border border-[#FFE600]/30 transition-all active:scale-95 shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isTagalog ? 'Simbolismo at Sining' : 'Symbolism & Art'}</span>
              </button>
            )}
          </div>

          {/* Card Divinatory Message for this Position */}
          <div className="flex-1 flex flex-col gap-3 w-full">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#FFE600] border border-white/15">
                  Arcana #{card.number} • {card.element}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full font-mono ${
                    isReversed
                      ? 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/40'
                      : 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40'
                  }`}
                >
                  {isReversed ? (isTagalog ? '↺ Pabaligtad' : '↺ Reversed') : (isTagalog ? '✦ Nakatayo' : '✦ Upright')}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F3FF] mt-1">
                {isTagalog ? tagalogCardName : card.name}
              </h3>
              {isTagalog && (
                <div className="text-xs text-[#9D94B8] font-mono">
                  {card.name}
                </div>
              )}
            </div>

            {/* Position Interpretation Revelation Box */}
            <div className="p-3.5 rounded-2xl bg-[#0D071E] border border-white/10 shadow-inner flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#00F2FE] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
                  {isTagalog ? 'Pangitain sa Posisyong Ito' : 'Divinatory Reading in this Position'}
                </div>
                
                {/* Compact Voice Player for this card */}
                <OracleVoicePlayer
                  compact={true}
                  language={isTagalog ? 'tl' : 'en'}
                  textToSpeak={voiceNarrative}
                />
              </div>
              <p className="text-xs sm:text-sm text-[#F5F3FF] leading-relaxed font-serif">
                {displayMeaning}
              </p>
            </div>

            {/* Keyword Resonance */}
            <div className="flex flex-wrap gap-1.5">
              {(isReversed ? card.reversedKeywords : card.uprightKeywords).map((kw, i) => (
                <span
                  key={i}
                  className={`text-xs px-2.5 py-0.5 rounded-xl font-mono ${
                    isReversed
                      ? 'bg-[#FF007F]/15 text-[#FF007F] border border-[#FF007F]/30'
                      : 'bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30'
                  }`}
                >
                  {isTagalog ? translateKeywordTagalog(kw) : kw}
                </span>
              ))}
            </div>

            {/* Actionable Advice & Affirmation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#FFE600] uppercase mb-1">
                  <Compass className="w-3 h-3" />
                  {isTagalog ? 'Gabay sa Pagkilos' : 'Directive'}
                </div>
                <p className="text-[#D1CBE8] leading-relaxed line-clamp-3">
                  {displayAdvice}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#FFE600] uppercase mb-1">
                  <HeartHandshake className="w-3 h-3" />
                  {isTagalog ? 'Banal na Paninindigan' : 'Affirmation'}
                </div>
                <p className="text-[#D1CBE8] italic leading-relaxed line-clamp-3">
                  "{displayAffirmation}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            {cardIndex > 0 && onNavigateCard && (
              <button
                onClick={handlePrev}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#D1CBE8] transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{isTagalog ? 'Nakaraang Baraha' : 'Prev Card'}</span>
              </button>
            )}

            {cardIndex < totalCards - 1 && onNavigateCard && (
              <button
                onClick={handleNext}
                className="px-3 py-2 rounded-xl bg-[#FFE600]/20 hover:bg-[#FFE600]/30 text-xs font-semibold text-[#FFE600] border border-[#FFE600]/30 transition-colors flex items-center gap-1"
              >
                <span>{isTagalog ? 'Susunod na Baraha' : 'Next Card'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {allRevealed && onOpenFullSynthesis && (
              <button
                id="popout-view-full-synthesis-btn"
                onClick={() => {
                  haptic.success();
                  onOpenFullSynthesis();
                }}
                className="px-4 py-2 rounded-xl bg-[#FFE600] hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,230,0,0.3)] flex items-center gap-1.5 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isTagalog ? 'Buong Mensahe ng Hanay' : 'Full Spread Synthesis'}</span>
              </button>
            )}

            <button
              onClick={() => {
                haptic.tick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#F5F3FF] transition-colors active:scale-95"
            >
              {isTagalog ? 'Bumalik sa Hanay' : 'Back to Spread'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

