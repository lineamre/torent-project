import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Wand2,
  Zap,
  Layers,
  Heart,
  Shuffle,
  Volume2,
  Lock,
  Compass,
  Star,
  Flame,
} from 'lucide-react';
import { ReadingFocusId, AppLanguage } from '../types';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface SpotlightTarget {
  id: string;
  stepNumber: number;
  emoji: string;
  titleEn: string;
  titleTl: string;
  easyDescEn: string;
  easyDescTl: string;
  clickInstructionEn: string;
  clickInstructionTl: string;
  targetId: string;
  color: string;
  radiusPadding: number;
}

interface TutorialBubbleTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  appLanguage: AppLanguage;
  readingFocus: ReadingFocusId;
  onSelectFocus?: (focus: ReadingFocusId) => void;
  onSelectSpreadSample?: () => void;
  onSetQuestionSample?: () => void;
  onShuffleAndDeal?: () => void;
  onRevealSample?: () => void;
  onOpenPopoutSample?: () => void;
}

export default function TutorialBubbleTour({
  isOpen,
  onClose,
  onComplete,
  appLanguage = 'en',
  readingFocus = 'love',
  onSelectFocus,
  onSelectSpreadSample,
  onSetQuestionSample,
  onShuffleAndDeal,
  onRevealSample,
}: TutorialBubbleTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
  } | null>(null);

  const steps: SpotlightTarget[] = useMemo(
    () => [
      {
        id: 'step-focus',
        stepNumber: 1,
        emoji: '🎨',
        titleEn: 'Step 1: Pick a Magic Color!',
        titleTl: 'Hakbang 1: Pindutin ang Magic na Kulay!',
        easyDescEn:
          'Tap any color you like! ❤️ Red is for Love, 🧭 Blue is for Tomorrow, 🛡️ Black is for Life, and 💰 Gold is for Coins!',
        easyDescTl:
          'Pindutin ang kulay na gusto mo! ❤️ Pula para sa Pag-ibig, 🧭 Asul para sa Bukas, 🛡️ Itim para sa Buhay, at 💰 Ginto para sa Suwerte!',
        clickInstructionEn: '👇 TAP THIS GLOWING CIRCLE!',
        clickInstructionTl: '👇 PINDUTIN ANG NAKAIILAW NA BILOG!',
        targetId: 'focus-select-btn-love',
        color: '#FF2A6D',
        radiusPadding: 32,
      },
      {
        id: 'step-spread',
        stepNumber: 2,
        emoji: '🃏',
        titleEn: 'Step 2: Choose How Many Cards!',
        titleTl: 'Hakbang 2: Piliin kung Ilang Baraha!',
        easyDescEn:
          'Pick how many cards to play: 1 Card for quick magic ⚡, 3 Cards for Yesterday, Today & Tomorrow ⏳, or 6 Cards for everything 🔮!',
        easyDescTl:
          'Piliin kung ilang baraha: 1 Baraha para sa mabilis na sagot ⚡, o 3 Baraha para sa Kahapon, Ngayon at Bukas ⏳!',
        clickInstructionEn: '👇 TAP THIS CIRCLE TO PICK CARDS!',
        clickInstructionTl: '👇 PINDUTIN PARA PUMILI NG BARAHA!',
        targetId: 'spread-select-temporal_3',
        color: '#00F2FE',
        radiusPadding: 28,
      },
      {
        id: 'step-question',
        stepNumber: 3,
        emoji: '💡',
        titleEn: 'Step 3: What is Your Wish or Question?',
        titleTl: 'Hakbang 3: Ano ang Nais mong Itanong?',
        easyDescEn:
          'Tap this box to type what you want to know! Or tap the glowing lightbulb for fun ready-made questions!',
        easyDescTl:
          'Pindutin dito para ilagay ang iyong tanong! Pwede mo ring gamitin ang bumbilya para sa mga handang tanong!',
        clickInstructionEn: '👇 TAP THE QUESTION BOX!',
        clickInstructionTl: '👇 PINDUTIN ANG KAHON NG TANONG!',
        targetId: 'focus-question-input',
        color: '#FFE600',
        radiusPadding: 26,
      },
      {
        id: 'step-deal',
        stepNumber: 4,
        emoji: '🪄',
        titleEn: 'Step 4: Tap "Deal Cards" to Mix & Fly!',
        titleTl: 'Hakbang 4: Pindutin ang "Deal Cards"!',
        easyDescEn:
          'Tap the big glowing button! Watch the cards shuffle in 3D and fly onto the magic table!',
        easyDescTl:
          'Pindutin ang malaking buton! Panoorin ang mga baraha habang umiikot at lumilipad sa mesa!',
        clickInstructionEn: '👇 TAP "DEAL CARDS" NOW!',
        clickInstructionTl: '👇 PINDUTIN ANG "DEAL CARDS" DITO!',
        targetId: 'shuffle-and-deal-btn',
        color: '#A855F7',
        radiusPadding: 32,
      },
      {
        id: 'step-flip',
        stepNumber: 5,
        emoji: '✨',
        titleEn: 'Step 5: Tap the Mystery Card to Flip!',
        titleTl: 'Hakbang 5: Pindutin ang Baraha para Buksan!',
        easyDescEn:
          'Tap the face-down mystery card on the table to turn it over and reveal the secret magic picture inside!',
        easyDescTl:
          'Pindutin ang nakataob na baraha sa mesa upang baligtarin ito at makita ang sikretong larawan!',
        clickInstructionEn: '👇 TAP THE CARD TO FLIP!',
        clickInstructionTl: '👇 PINDUTIN ANG BARAHA!',
        targetId: 'tarot-dealing-stage',
        color: '#10B981',
        radiusPadding: 45,
      },
      {
        id: 'step-complete',
        stepNumber: 6,
        emoji: '🎉',
        titleEn: '🎉 YAY! You are a Magic Oracle Master!',
        titleTl: '🎉 YEHEY! Napakagaling mo!',
        easyDescEn:
          'You are all ready! You can pick colors, ask questions, deal cards, listen to the Babaylan Tagalog voice, and explore anytime!',
        easyDescTl:
          'Handa ka na! Maaari ka nang pumili ng kulay, magtanong, magbasa ng baraha, at makinig sa boses ng Babaylan!',
        clickInstructionEn: '🚀 TAP TO START PLAYING!',
        clickInstructionTl: '🚀 PINDUTIN PARA MAGSIMULA!',
        targetId: '',
        color: '#FFE600',
        radiusPadding: 50,
      },
    ],
    []
  );

  const currentStep = steps[currentStepIndex];
  const isFinalStep = currentStepIndex === steps.length - 1;

  // Measure and follow the target element position
  const updateSpotlight = useCallback(() => {
    if (!isOpen) return;

    if (!currentStep.targetId) {
      // Center screen for final celebration
      setSpotlightPos({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: 140,
        height: 140,
        radius: 80,
      });
      return;
    }

    const el = document.getElementById(currentStep.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxDim = Math.max(rect.width, rect.height);
      const radius = Math.max(maxDim / 2 + currentStep.radiusPadding, 48);

      setSpotlightPos({
        x: centerX,
        y: centerY,
        width: rect.width,
        height: rect.height,
        radius,
      });

      // Smooth scroll if target is partially offscreen
      if (
        rect.top < 60 ||
        rect.bottom > window.innerHeight - 60 ||
        rect.left < 20 ||
        rect.right > window.innerWidth - 20
      ) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // Fallback center
      setSpotlightPos({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: 120,
        height: 120,
        radius: 70,
      });
    }
  }, [isOpen, currentStep]);

  useEffect(() => {
    updateSpotlight();
    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight, true);

    const timer = setTimeout(updateSpotlight, 150);
    return () => {
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight, true);
      clearTimeout(timer);
    };
  }, [updateSpotlight]);

  if (!isOpen) return null;

  // Handle clicking the target circle or action
  const handleSpotlightClick = () => {
    haptic.tick();
    sound.playSparkle();

    // Trigger in-game corresponding state
    if (currentStepIndex === 0 && onSelectFocus) {
      onSelectFocus(readingFocus === 'love' ? 'future' : 'love');
      sound.playCosmicChime();
    } else if (currentStepIndex === 1 && onSelectSpreadSample) {
      onSelectSpreadSample();
      sound.playDeal();
    } else if (currentStepIndex === 2 && onSetQuestionSample) {
      onSetQuestionSample();
      sound.playFlip();
    } else if (currentStepIndex === 3 && onShuffleAndDeal) {
      onShuffleAndDeal();
      sound.playShuffle();
    } else if (currentStepIndex === 4 && onRevealSample) {
      onRevealSample();
      sound.playFlip();
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      sound.playCosmicChime();
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      haptic.tick();
      sound.playFlip();
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Determine speech bubble placement so it doesn't overlap the circle
  const bubblePlacement = () => {
    if (!spotlightPos || isFinalStep) return 'center';
    if (spotlightPos.y > window.innerHeight * 0.55) {
      return 'top';
    }
    return 'bottom';
  };

  const placement = bubblePlacement();

  return (
    <div
      id="tour-spotlight-overlay"
      className="fixed inset-0 z-50 overflow-hidden select-none"
    >
      {/* 1. DARK SCREEN WITH CIRCLE HOLE (SVG MASK SPOTLIGHT) */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none transition-all duration-300 ease-out"
        style={{ zIndex: 45 }}
      >
        <defs>
          <mask id="spotlight-cutout-mask">
            {/* Opaque white covers the entire screen */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black circle cuts a transparent hole right onto the target element */}
            {spotlightPos && (
              <circle
                cx={spotlightPos.x}
                cy={spotlightPos.y}
                r={spotlightPos.radius}
                fill="black"
                className="transition-all duration-300 ease-out"
              />
            )}
          </mask>
        </defs>

        {/* 90% Dark backdrop with transparent circle hole */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(4, 2, 10, 0.90)"
          mask="url(#spotlight-cutout-mask)"
        />
      </svg>

      {/* 2. GLOWING PULSING CIRCLE RING AROUND THE HOLE (CLICKABLE TARGET) */}
      {spotlightPos && !isFinalStep && (
        <div
          id="spotlight-interactive-circle-target"
          onClick={handleSpotlightClick}
          className="fixed rounded-full cursor-pointer transition-all duration-300 ease-out flex items-center justify-center group"
          style={{
            left: `${spotlightPos.x - spotlightPos.radius}px`,
            top: `${spotlightPos.y - spotlightPos.radius}px`,
            width: `${spotlightPos.radius * 2}px`,
            height: `${spotlightPos.radius * 2}px`,
            zIndex: 48,
          }}
          title="Click this glowing circle to continue!"
        >
          {/* Animated beacon pulses */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none"
            style={{ backgroundColor: currentStep.color }}
          />
          <div
            className="absolute -inset-2 rounded-full border-4 border-dashed animate-spin pointer-events-none opacity-80"
            style={{
              borderColor: currentStep.color,
              animationDuration: '8s',
            }}
          />
          {/* Glowing border ring */}
          <div
            className="absolute inset-0 rounded-full border-4 shadow-2xl transition-transform group-hover:scale-105 group-active:scale-95"
            style={{
              borderColor: currentStep.color,
              boxShadow: `0 0 45px ${currentStep.color}, inset 0 0 25px ${currentStep.color}60`,
            }}
          />

          {/* Floating animated hand icon pointing to click */}
          <div
            className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none animate-bounce"
            style={{ zIndex: 50 }}
          >
            <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,230,0,0.8)]">
              👆
            </span>
            <span
              className="text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-2xl text-black border-2 border-white whitespace-nowrap"
              style={{ backgroundColor: currentStep.color }}
            >
              {appLanguage === 'tl' ? currentStep.clickInstructionTl : currentStep.clickInstructionEn}
            </span>
          </div>
        </div>
      )}

      {/* 3. TOP SIMPLE BAR (STEP COUNTER & EASY EXIT) */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-[#16112B]/95 border border-[#FFE600]/40 rounded-2xl px-3.5 py-2 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg animate-bounce">{currentStep.emoji}</span>
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-[#FFE600]">
              {appLanguage === 'tl'
                ? `Hakbang ${currentStep.stepNumber} ng ${steps.length}`
                : `Step ${currentStep.stepNumber} of ${steps.length}`}
            </span>
            <span className="text-[9px] text-[#D1CBE8] font-mono">
              {appLanguage === 'tl' ? 'Pindutin ang bilog para magpatuloy!' : 'Click the glowing circle to learn!'}
            </span>
          </div>
        </div>

        <button
          id="skip-circle-tour-btn"
          onClick={() => {
            haptic.tick();
            onClose();
          }}
          className="text-[11px] font-mono text-[#D1CBE8] hover:text-white px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1 active:scale-95"
          title="Exit guide"
        >
          <span>{appLanguage === 'tl' ? 'Tapusin (Skip)' : 'Skip Guide'}</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. SUPER EASY 6-YEAR-OLD FRIENDLY SPEECH BUBBLE */}
      <div
        id="easy-tour-speech-bubble"
        className={`fixed z-50 left-1/2 -translate-x-1/2 w-11/12 max-w-md transition-all duration-300 ${
          isFinalStep || placement === 'center'
            ? 'top-1/2 -translate-y-1/2'
            : placement === 'top'
            ? 'top-16'
            : 'bottom-6'
        }`}
      >
        <div
          className="relative bg-[#181133]/98 border-3 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(255,230,0,0.35)] text-[#F5F3FF] backdrop-blur-2xl flex flex-col gap-3.5 animate-in zoom-in-95 duration-200"
          style={{ borderColor: currentStep.color }}
        >
          {/* Top Emoji Badge & Big Title */}
          <div className="flex items-start gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2 shadow-inner flex-shrink-0"
              style={{
                backgroundColor: `${currentStep.color}25`,
                borderColor: currentStep.color,
              }}
            >
              {currentStep.emoji}
            </div>

            <div className="flex flex-col flex-1">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-wider"
                style={{ color: currentStep.color }}
              >
                {appLanguage === 'tl' ? `HAKBANG ${currentStep.stepNumber}` : `STEP ${currentStep.stepNumber}`}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                {appLanguage === 'tl' ? currentStep.titleTl : currentStep.titleEn}
              </h3>
            </div>
          </div>

          {/* Simple Explanation for 6-Year-Olds */}
          <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-xs sm:text-sm text-[#F5F3FF] leading-relaxed font-sans font-medium">
            {appLanguage === 'tl' ? currentStep.easyDescTl : currentStep.easyDescEn}
          </div>

          {/* Big Action Button (Click circle or click this button!) */}
          <div className="flex items-center justify-between gap-2 pt-1">
            {currentStepIndex > 0 && !isFinalStep && (
              <button
                onClick={handlePrev}
                className="px-3 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-[#D1CBE8] text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{appLanguage === 'tl' ? 'Bumalik' : 'Back'}</span>
              </button>
            )}

            <button
              id="click-circle-action-next-btn"
              onClick={handleSpotlightClick}
              className="flex-1 py-3 px-5 rounded-2xl font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 text-black"
              style={{
                backgroundColor: currentStep.color,
                boxShadow: `0 0 25px ${currentStep.color}80`,
              }}
            >
              <span>
                {isFinalStep
                  ? appLanguage === 'tl'
                    ? '🚀 SIMULAN NA! (PLAY NOW!)'
                    : '🚀 START PLAYING NOW!'
                  : appLanguage === 'tl'
                  ? currentStep.clickInstructionTl
                  : currentStep.clickInstructionEn}
              </span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
