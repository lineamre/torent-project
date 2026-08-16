import { useState, useRef } from 'react';
import { SpreadConfig, DealtCard, DeckTheme, ReadingFocusId } from '../types';
import { SPREAD_CONFIGS } from '../data/tarotDeck';
import { READING_FOCUSES, getFocusById } from '../data/readingFocuses';
import { Sparkles, Shuffle, Wand2, ArrowRight, Lightbulb, Zap, CheckCircle2, Heart, Compass, Shield, Coins, Eye } from 'lucide-react';
import TarotCardView from './TarotCardView';
import CardShuffleLoader from './CardShuffleLoader';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface SpreadBoardProps {
  currentSpread: SpreadConfig;
  onSelectSpread: (spread: SpreadConfig) => void;
  readingFocus: ReadingFocusId;
  onSelectFocus: (focus: ReadingFocusId) => void;
  question: string;
  onQuestionChange: (q: string) => void;
  dealtCards: DealtCard[];
  isShuffling: boolean;
  onShuffleAndDeal: () => void;
  onFlipCard: (index: number) => void;
  onFlipAll: () => void;
  onInspectCard: (card: DealtCard) => void;
  onOpenPopoutCard?: (index: number) => void;
  onOpenFullPopout?: () => void;
  hasAiInterpretation?: boolean;
  onOpenGuideModal?: (stepNumber?: number) => void;
  deckTheme: DeckTheme;
}

export default function SpreadBoard({
  currentSpread,
  onSelectSpread,
  readingFocus = 'love',
  onSelectFocus,
  question,
  onQuestionChange,
  dealtCards,
  isShuffling,
  onShuffleAndDeal,
  onFlipCard,
  onFlipAll,
  onInspectCard,
  onOpenPopoutCard,
  onOpenFullPopout,
  deckTheme,
}: SpreadBoardProps) {
  const [showPrompts, setShowPrompts] = useState(false);
  const questionInputRef = useRef<HTMLInputElement>(null);

  const activeFocusObj = getFocusById(readingFocus);
  const allFlipped = dealtCards.length > 0 && dealtCards.every((c) => c.isFlipped);
  const someFlipped = dealtCards.some((c) => c.isFlipped);

  const getFocusIcon = (id: ReadingFocusId) => {
    switch (id) {
      case 'love':
        return <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />;
      case 'future':
        return <Compass className="w-3.5 h-3.5 text-blue-400" />;
      case 'life':
        return <Shield className="w-3.5 h-3.5 text-zinc-300" />;
      case 'fortune':
        return <Coins className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />;
    }
  };

  return (
    <div id="spread-board-main" className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 flex flex-col gap-4">
      {/* 1. COLOR-CODED READING FOCUS SELECTOR (RED = LOVE, BLUE = FUTURE, BLACK = LIFE, GOLD = MONEY/FORTUNE) */}
      <div className="bg-[#140E29]/90 border border-white/15 rounded-3xl p-3.5 sm:p-4 backdrop-blur-2xl shadow-xl flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{activeFocusObj.icon}</span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F5F3FF]">
              Color Reading Focus
            </span>
          </div>
          <span
            className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
            style={{
              color: activeFocusObj.colorHex,
              backgroundColor: `${activeFocusObj.colorHex}20`,
              borderColor: `${activeFocusObj.colorHex}50`,
            }}
          >
            {activeFocusObj.colorName}: {activeFocusObj.name}
          </span>
        </div>

        {/* 4 Focus Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {READING_FOCUSES.map((focus) => {
            const isSelected = readingFocus === focus.id;
            return (
              <button
                key={focus.id}
                id={`focus-select-btn-${focus.id}`}
                onClick={() => {
                  haptic.cardSelect();
                  sound.playCosmicChime();
                  onSelectFocus(focus.id);
                }}
                className={`relative p-3 rounded-2xl flex flex-col items-start gap-1.5 text-left border transition-all active:scale-95 ${
                  isSelected
                    ? `bg-gradient-to-b ${focus.bgGradient} ${focus.borderClass} ${focus.glowClass}`
                    : 'bg-[#100A20]/80 text-[#D1CBE8] border-white/10 hover:border-white/30 hover:bg-white/5'
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: focus.colorHex,
                        boxShadow: `0 0 20px ${focus.colorHex}50`,
                      }
                    : {}
                }
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{focus.icon}</span>
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded"
                      style={{
                        backgroundColor: `${focus.colorHex}25`,
                        color: focus.colorHex,
                        border: `1px solid ${focus.colorHex}40`,
                      }}
                    >
                      {focus.colorName}
                    </span>
                  </div>
                  {isSelected && (
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: focus.colorHex }}
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className={`text-xs font-bold font-serif ${isSelected ? 'text-white' : 'text-[#E2DCF5]'}`}>
                    {focus.name}
                  </span>
                  <span className="text-[10px] text-[#9D94B8] line-clamp-1 mt-0.5">
                    {focus.topic}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MATERIAL 3 SPREAD SELECTION FILTER CHIPS */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F5F3FF] flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5" style={{ color: activeFocusObj.colorHex }} />
            Sacred Layout
          </span>
          <span className="text-[11px] text-[#9D94B8] font-mono">
            {currentSpread.cardCount} {currentSpread.cardCount === 1 ? 'Card' : 'Cards'} Active
          </span>
        </div>

        {/* Scrollable Material 3 Chips Container */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
          {SPREAD_CONFIGS.map((spread) => {
            const isActive = currentSpread.id === spread.id;
            return (
              <button
                key={spread.id}
                id={`spread-select-${spread.id}`}
                onClick={() => {
                  haptic.tick();
                  onSelectSpread(spread);
                  sound.playDeal();
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 border transition-all active:scale-95 ${
                  isActive
                    ? 'font-bold shadow-lg'
                    : 'bg-[#16112B]/80 text-[#D1CBE8] border-white/15 hover:bg-white/10'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: activeFocusObj.colorHex,
                        color: readingFocus === 'life' ? '#ffffff' : '#080612',
                        borderColor: activeFocusObj.colorHex,
                        boxShadow: `0 0 20px ${activeFocusObj.colorHex}50`,
                      }
                    : {}
                }
              >
                {isActive ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  getFocusIcon(readingFocus)
                )}
                <span>{spread.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-black/20' : 'bg-white/10 text-[#9D94B8]'
                  }`}
                >
                  {spread.cardCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MATERIAL 3 FILLED FOCUS INQUIRY TEXT FIELD */}
      <div
        className="bg-[#16112B]/80 border rounded-3xl p-4 sm:p-5 backdrop-blur-2xl shadow-lg transition-all"
        style={{ borderColor: `${activeFocusObj.colorHex}40` }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="focus-question-input"
            className="text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5"
            style={{ color: activeFocusObj.colorHex }}
          >
            <Zap className="w-3.5 h-3.5" />
            Focus Question ({activeFocusObj.name})
          </label>
          <button
            id="toggle-intent-suggestions-btn"
            onClick={() => {
              haptic.tick();
              setShowPrompts(!showPrompts);
            }}
            className="text-[11px] flex items-center gap-1 transition-colors font-mono"
            style={{ color: activeFocusObj.colorHex }}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showPrompts ? 'Hide Suggestions' : `Sample ${activeFocusObj.colorName} Questions`}
          </button>
        </div>

        <div className="relative flex items-center">
          <input
            ref={questionInputRef}
            id="focus-question-input"
            type="text"
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder={`Ask anything about ${activeFocusObj.topic.toLowerCase()}...`}
            className="w-full bg-[#100B24]/90 border border-white/10 focus:border-white/40 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#F5F3FF] placeholder-[#9D94B8]/50 outline-none transition-all"
          />
          {question && (
            <button
              onClick={() => {
                haptic.tick();
                onQuestionChange('');
              }}
              className="absolute right-3 text-xs text-[#9D94B8] hover:text-white px-2 py-1 rounded-lg bg-white/10"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tailored Intent Suggestions for Chosen Color Focus */}
        {showPrompts && (
          <div className="flex flex-wrap gap-1.5 pt-3 animate-in fade-in duration-200">
            {activeFocusObj.defaultQuestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  haptic.tick();
                  onQuestionChange(item);
                  sound.playFlip();
                }}
                className="text-[11px] px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-[#D1CBE8] hover:text-white border border-white/10 transition-colors text-left"
                style={{ borderColor: `${activeFocusObj.colorHex}30` }}
              >
                "{item}"
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. TAROT DEALING STAGE & SLOTS */}
      <div
        id="tarot-dealing-stage"
        className="w-full min-h-[360px] sm:min-h-[420px] rounded-3xl bg-[#16112B]/50 backdrop-blur-xl border p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl transition-all"
        style={{ borderColor: `${activeFocusObj.colorHex}25` }}
      >
        {isShuffling ? (
          /* Multi-layer 3D Riffle & Fan Tarot Deck Shuffle Animation */
          <CardShuffleLoader
            readingFocus={readingFocus}
            currentSpread={currentSpread}
          />
        ) : dealtCards.length === 0 ? (
          /* Empty state prompt */
          <div className="flex flex-col items-center justify-center gap-3 py-14 text-center max-w-md">
            <div
              className="w-16 h-16 rounded-3xl border flex items-center justify-center text-3xl shadow-xl"
              style={{
                backgroundColor: `${activeFocusObj.colorHex}15`,
                borderColor: `${activeFocusObj.colorHex}40`,
                boxShadow: `0 0 25px ${activeFocusObj.colorHex}30`,
              }}
            >
              {activeFocusObj.icon}
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F3FF] mt-1">
              Ready for {activeFocusObj.name} Reading
            </h3>
            <p className="text-xs sm:text-sm text-[#9D94B8] leading-relaxed">
              Focus on your <strong>{activeFocusObj.colorName} ({activeFocusObj.topic})</strong> intent and tap <strong>Shuffle & Deal</strong> below.
            </p>
          </div>
        ) : (
          /* Active Dealt Spread Layout */
          <div className="w-full flex flex-col items-center gap-5">
            {/* Spread Title Banner */}
            <div className="text-center flex flex-col items-center gap-1">
              <div
                className="text-xs font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border flex items-center gap-1.5"
                style={{
                  backgroundColor: `${activeFocusObj.colorHex}15`,
                  borderColor: `${activeFocusObj.colorHex}40`,
                  color: activeFocusObj.colorHex,
                }}
              >
                <span>{activeFocusObj.icon}</span>
                <span>{activeFocusObj.name} • {currentSpread.name}</span>
              </div>
              <p className="text-xs text-[#9D94B8]">{currentSpread.subtitle}</p>
            </div>

            {/* Render Cards in Responsive Grid/Flex */}
            <div className="w-full flex flex-wrap items-start justify-center gap-4 sm:gap-6 py-2">
              {dealtCards.map((item, idx) => (
                <div
                  key={idx}
                  id={`card-slot-${idx}`}
                  className="flex flex-col items-center gap-2.5 animate-in fade-in zoom-in-90 duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Position Tag / Role */}
                  <div className="flex flex-col items-center text-center max-w-[160px]">
                    <span
                      className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase"
                      style={{ color: activeFocusObj.colorHex }}
                    >
                      {item.slot.title}
                    </span>
                    <span className="text-[10px] text-[#9D94B8] mt-0.5 line-clamp-1">
                      {item.slot.role}
                    </span>
                  </div>

                  {/* 3D Tarot Card Component with color-coded Focus theme */}
                  <TarotCardView
                    card={item.card}
                    isFlipped={item.isFlipped}
                    isReversed={item.isReversed}
                    size="md"
                    theme={deckTheme}
                    readingFocus={readingFocus}
                    onClick={() => {
                      if (!item.isFlipped) {
                        haptic.cardFlip();
                        onFlipCard(idx);
                      } else if (onOpenPopoutCard) {
                        haptic.cardSelect();
                        onOpenPopoutCard(idx);
                      }
                    }}
                    onInspect={() => {
                      if (onOpenPopoutCard) {
                        onOpenPopoutCard(idx);
                      } else {
                        onInspectCard(item);
                      }
                    }}
                  />

                  {/* Status Indicator */}
                  {!item.isFlipped ? (
                    <button
                      onClick={() => {
                        haptic.cardFlip();
                        onFlipCard(idx);
                      }}
                      className="text-[11px] hover:underline font-mono flex items-center gap-1 animate-pulse mt-0.5 active:scale-95"
                      style={{ color: activeFocusObj.colorHex }}
                    >
                      <span>Touch to Reveal</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (onOpenPopoutCard) {
                          haptic.cardSelect();
                          onOpenPopoutCard(idx);
                        } else {
                          onInspectCard(item);
                        }
                      }}
                      className="text-[10px] hover:text-white px-2.5 py-0.5 rounded-full border font-mono mt-0.5 active:scale-95 flex items-center gap-1 transition-all"
                      style={{
                        backgroundColor: `${activeFocusObj.colorHex}20`,
                        borderColor: `${activeFocusObj.colorHex}50`,
                        color: activeFocusObj.colorHex,
                      }}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Read Symbolism</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Banner to Pop Out Full Spread Reading */}
            {someFlipped && onOpenFullPopout && (
              <div className="w-full pt-2 flex justify-center animate-in fade-in duration-200">
                <button
                  id="popout-full-reading-banner-btn"
                  onClick={() => {
                    haptic.cardSelect();
                    onOpenFullPopout();
                  }}
                  className="px-5 py-2.5 rounded-2xl text-black font-bold text-xs tracking-wider uppercase shadow-xl hover:opacity-95 active:scale-95 transition-all flex items-center gap-2"
                  style={{
                    backgroundColor: activeFocusObj.colorHex,
                    color: readingFocus === 'life' ? '#ffffff' : '#080612',
                    boxShadow: `0 0 30px ${activeFocusObj.colorHex}60`,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pop Out {activeFocusObj.name} Reading ({dealtCards.filter((c) => c.isFlipped).length}/{dealtCards.length} Revealed)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. ANDROID MATERIAL 3 ACTION BAR & FLOATING ACTION BUTTON */}
      <div className="flex items-center justify-between gap-3 p-3 bg-[#16112B]/90 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-xl">
        <div className="text-xs text-[#D1CBE8] pl-2 hidden sm:flex items-center gap-1.5 font-mono">
          <span className="text-base">{activeFocusObj.icon}</span>
          <span>Focusing on <strong>{activeFocusObj.colorName} ({activeFocusObj.name})</strong></span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {dealtCards.length > 0 && !allFlipped && (
            <button
              id="flip-all-cards-btn"
              onClick={() => {
                haptic.cardFlip();
                onFlipAll();
              }}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F5F3FF] text-xs font-semibold border border-white/15 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Reveal All</span>
            </button>
          )}

          {/* Material 3 Extended FAB with active focus color */}
          <button
            id="shuffle-and-deal-btn"
            onClick={() => {
              haptic.shuffle();
              onShuffleAndDeal();
            }}
            disabled={isShuffling}
            className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 shadow-xl disabled:opacity-50"
            style={{
              backgroundColor: activeFocusObj.colorHex,
              color: readingFocus === 'life' ? '#ffffff' : '#080612',
              boxShadow: `0 0 25px ${activeFocusObj.colorHex}50`,
            }}
          >
            <Shuffle className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
            <span>
              {isShuffling
                ? 'Shuffling...'
                : dealtCards.length === 0
                ? `Deal ${activeFocusObj.name}`
                : `Redeal ${activeFocusObj.name}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
