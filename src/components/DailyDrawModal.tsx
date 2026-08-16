import { useState, useEffect } from 'react';
import { TarotCard, DeckTheme } from '../types';
import { TAROT_DECK } from '../data/tarotDeck';
import { X, Sun, Sparkles, RefreshCw, Compass, HeartHandshake } from 'lucide-react';
import TarotCardView from './TarotCardView';
import OracleVoicePlayer from './OracleVoicePlayer';
import { sound } from '../utils/audio';

interface DailyDrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  deckTheme: DeckTheme;
}

export default function DailyDrawModal({ isOpen, onClose, deckTheme }: DailyDrawModalProps) {
  const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Deterministic or freshly shuffled daily seed
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
      sound.playDeal();
    }
  }, [isOpen]);

  if (!isOpen || !dailyCard) return null;

  const dailySpeechText = `Card of the Day: ${dailyCard.name}, ${isReversed ? 'Reversed' : 'Upright'}. ${isReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning}. Directive: ${dailyCard.advice}. Affirmation: ${dailyCard.affirmation}.`;

  return (
    <div
      id="daily-draw-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="daily-draw-modal-container"
        className="relative w-full max-w-lg bg-[#16112B]/95 border border-[#FFE600]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,230,0,0.25)] text-[#F5F3FF] flex flex-col items-center gap-5 text-center overflow-y-auto max-h-[90vh] backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="daily-draw-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#9D94B8] hover:text-[#F5F3FF] border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 text-xs font-mono font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5" />
            <span>Card of the Day</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F3FF] mt-1">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>
          <p className="text-xs text-[#9D94B8]">
            {!isFlipped ? 'Tap the card to reveal today’s quantum guidance' : 'Today’s Sovereign Focus Archetype'}
          </p>
        </div>

        {/* 3D Card Draw */}
        <div className="my-2">
          <TarotCardView
            card={dailyCard}
            isFlipped={isFlipped}
            isReversed={isReversed}
            size="lg"
            theme={deckTheme}
            showInspectButton={false}
            onClick={() => {
              if (!isFlipped) {
                setIsFlipped(true);
                sound.playFlip();
              }
            }}
          />
        </div>

        {/* Revealed Insights */}
        {isFlipped ? (
          <div className="flex flex-col gap-3 w-full animate-in fade-in zoom-in-95 duration-300 text-left">
            {/* Voice player */}
            <OracleVoicePlayer
              textToSpeak={dailySpeechText}
              compact={false}
              label="Daily Oracle Voice"
            />

            <div className="p-4 rounded-2xl bg-[#100B24] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[#F5F3FF]">
                  {dailyCard.name}
                </span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    isReversed
                      ? 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/40'
                      : 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40'
                  }`}
                >
                  {isReversed ? '↺ Reversed' : '✦ Upright'}
                </span>
              </div>
              <p className="text-xs text-[#D1CBE8] leading-relaxed">
                {isReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#100B24] border border-[#FFE600]/25 flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1">
                <HeartHandshake className="w-3 h-3 text-[#FFE600]" />
                Daily Affirmation
              </span>
              <p className="text-xs text-[#D1CBE8] italic font-serif leading-relaxed">
                "{dailyCard.affirmation}"
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#FFE600] text-[#080612] font-bold text-xs hover:bg-amber-300 transition-colors mt-1 shadow-[0_0_20px_rgba(255,230,0,0.3)]"
            >
              Anchor This Guidance & Close
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsFlipped(true);
              sound.playFlip();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#FFE600] text-[#080612] font-bold text-xs hover:bg-amber-300 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,230,0,0.4)] animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reveal Daily Archetype</span>
          </button>
        )}
      </div>
    </div>
  );
}
