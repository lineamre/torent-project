import { useState, useEffect } from 'react';
import { TarotCard, DeckTheme } from '../types';
import { TAROT_DECK } from '../data/tarotDeck';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Sparkles, HeartHandshake, Compass, Zap, RotateCcw, Share2, LogIn, Cloud } from 'lucide-react';
import TarotCardView from './TarotCardView';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';
import confetti from 'canvas-confetti';

interface DailyDrawViewProps {
  deckTheme: DeckTheme;
  onInspectCard?: (card: TarotCard, isReversed: boolean) => void;
  onOpenAuthModal?: () => void;
}

export default function DailyDrawView({ deckTheme, onInspectCard, onOpenAuthModal }: DailyDrawViewProps) {
  const { user } = useAuth();
  const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const initDailyCard = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      hash = (hash << 5) - hash + todayStr.charCodeAt(i);
      hash |= 0;
    }
    const cardIndex = Math.abs(hash) % TAROT_DECK.length;
    const card = TAROT_DECK[cardIndex];
    const reversed = Math.abs(hash) % 4 === 0;

    setDailyCard(card);
    setIsReversed(reversed);
    setIsFlipped(false);
  };

  useEffect(() => {
    initDailyCard();
  }, []);

  const handleReveal = () => {
    if (isFlipped) return;
    haptic.cardFlip();
    sound.playFlip();
    setIsFlipped(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFE600', '#00F2FE', '#FF007F'],
      });
    } catch {}
  };

  if (!dailyCard) return null;

  return (
    <div id="daily-draw-screen" className="w-full max-w-xl mx-auto px-4 py-4 flex flex-col items-center gap-5">
      {/* Header Info */}
      <div className="flex flex-col items-center text-center gap-1.5">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 text-xs font-mono font-bold uppercase tracking-wider">
          <Sun className="w-3.5 h-3.5" />
          <span>Solar Transmission</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F3FF]">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
        <p className="text-xs text-[#9D94B8] max-w-sm">
          {!isFlipped
            ? 'Touch the card below to align your daily focus with the cosmic frequency.'
            : 'Your quantum focus archetype for today.'}
        </p>
      </div>

      {/* 3D Card Interactive Stage */}
      <div className="relative py-2">
        <TarotCardView
          card={dailyCard}
          isFlipped={isFlipped}
          isReversed={isReversed}
          size="lg"
          theme={deckTheme}
          showInspectButton={false}
          onClick={handleReveal}
        />
      </div>

      {/* Action / Reveal Button */}
      {!isFlipped ? (
        <button
          id="reveal-daily-card-btn"
          onClick={handleReveal}
          className="px-8 py-3.5 rounded-2xl bg-[#FFE600] text-[#080612] font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,230,0,0.35)] active:scale-95 animate-pulse"
        >
          <Sparkles className="w-4 h-4" />
          <span>Reveal Today’s Energy</span>
        </button>
      ) : (
        /* Revealed Content Cards */
        <div className="w-full flex flex-col gap-3.5 animate-in fade-in zoom-in-95 duration-300">
          {/* Card Summary Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#16112B]/90 border border-white/15 backdrop-blur-xl flex flex-col gap-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFE600]">
                  Arcana #{dailyCard.number} • {dailyCard.element}
                </span>
                <h3 className="font-serif font-bold text-xl text-[#F5F3FF]">
                  {dailyCard.name}
                </h3>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  isReversed
                    ? 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/40'
                    : 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40'
                }`}
              >
                {isReversed ? '↺ Reversed' : '✦ Upright'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#D1CBE8] leading-relaxed">
              {isReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning}
            </p>
          </div>

          {/* Actionable Advice */}
          <div className="p-4 rounded-2xl bg-[#100B24] border border-white/10 flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Daily Action Focus
            </span>
            <p className="text-xs text-[#D1CBE8] leading-relaxed">
              {dailyCard.advice}
            </p>
          </div>

          {/* Sacred Affirmation */}
          <div className="p-4 rounded-2xl bg-[#100B24] border border-[#FFE600]/30 flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5" />
              Daily Affirmation
            </span>
            <p className="text-xs sm:text-sm text-[#F5F3FF] italic font-serif leading-relaxed">
              "{dailyCard.affirmation}"
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                haptic.cardSelect();
                onInspectCard?.(dailyCard, isReversed);
              }}
              className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-[#F5F3FF] font-semibold text-xs transition-colors active:scale-95 text-center"
            >
              Explore Full Lore
            </button>
            <button
              onClick={() => {
                haptic.tick();
                initDailyCard();
                sound.playDeal();
              }}
              className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-[#9D94B8] hover:text-[#F5F3FF] transition-colors active:scale-95"
              title="Reshuffle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
