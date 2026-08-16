import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ReadingFocusId, SpreadConfig } from '../types';
import { getFocusById } from '../data/readingFocuses';
import { Sparkles, Shuffle, Zap } from 'lucide-react';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface CardShuffleLoaderProps {
  readingFocus: ReadingFocusId;
  currentSpread: SpreadConfig;
  onShuffleComplete?: () => void;
}

export default function CardShuffleLoader({
  readingFocus,
  currentSpread,
  onShuffleComplete,
}: CardShuffleLoaderProps) {
  const focusObj = getFocusById(readingFocus);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [progress, setProgress] = useState(15);

  const phaseMessages = [
    `Gathering 78 Major & Minor Archetypes...`,
    `Riffle Shuffling & Attuning ${focusObj.colorName} Energies...`,
    `Focusing Intent on "${focusObj.name}"...`,
    `Dealing ${currentSpread.name} (${currentSpread.cardCount} Cards)...`,
  ];

  useEffect(() => {
    // Stage 0: Initial Gather
    const t0 = setTimeout(() => {
      setPhase(1);
      setProgress(40);
      sound.playShuffle();
      haptic.shuffle();
    }, 450);

    // Stage 1: Riffle & Fan
    const t1 = setTimeout(() => {
      setPhase(2);
      setProgress(75);
      sound.playShuffle();
      haptic.shuffle();
    }, 1050);

    // Stage 2: Attunement & Deal Ready
    const t2 = setTimeout(() => {
      setPhase(3);
      setProgress(100);
      sound.playDeal();
      haptic.cardFlip();
    }, 1650);

    // Stage 3: Complete
    const t3 = setTimeout(() => {
      if (onShuffleComplete) {
        onShuffleComplete();
      }
    }, 2100);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onShuffleComplete]);

  // Card deck layers for riffle shuffle animation
  const cardLayers = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div
      id="tarot-card-shuffle-loader"
      className="relative w-full py-10 sm:py-14 px-4 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background Radial Glow aligned with focus color */}
      <motion.div
        animate={{
          scale: [0.9, 1.25, 0.95],
          opacity: [0.25, 0.55, 0.3],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none filter blur-3xl"
        style={{
          background: `radial-gradient(circle, ${focusObj.colorHex}55 0%, rgba(147, 51, 234, 0.25) 50%, transparent 75%)`,
        }}
      />

      {/* Orbiting Cosmic Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-dashed pointer-events-none opacity-40"
        style={{ borderColor: focusObj.colorHex }}
      />

      {/* Animated 3D Tarot Deck Shuffling Container */}
      <div className="relative w-44 h-64 sm:w-52 sm:h-72 flex items-center justify-center my-4 perspective-1000">
        {cardLayers.map((cardIndex) => {
          const isLeftDeck = cardIndex % 2 === 0;
          const stagger = cardIndex * 0.05;

          // Compute motion variants based on shuffle phase
          let xOffset = 0;
          let yOffset = cardIndex * -2;
          let rotateAngle = (cardIndex - 4) * 1.5;
          let scaleVal = 1;
          let zIndexVal = cardIndex;

          if (phase === 0) {
            // Stacked and hovering
            yOffset = cardIndex * -3;
            rotateAngle = (cardIndex - 4) * 2;
          } else if (phase === 1) {
            // Split into two decks (riffle split)
            xOffset = isLeftDeck ? -55 + cardIndex * 2 : 55 - cardIndex * 2;
            yOffset = isLeftDeck ? -8 : 8;
            rotateAngle = isLeftDeck ? -14 + cardIndex * 2 : 14 - cardIndex * 2;
            scaleVal = 0.96;
          } else if (phase === 2) {
            // Interleaving & fanning wave
            const fanAngle = (cardIndex - 4) * 8;
            xOffset = Math.sin((cardIndex - 4) * 0.4) * 40;
            yOffset = Math.abs(cardIndex - 4) * 3 - 6;
            rotateAngle = fanAngle;
            scaleVal = 1.02;
          } else if (phase === 3) {
            // Neatly squared, aligned, glowing top
            xOffset = 0;
            yOffset = cardIndex * -2.5;
            rotateAngle = 0;
            scaleVal = cardIndex === cardLayers.length - 1 ? 1.05 : 1;
          }

          return (
            <motion.div
              key={cardIndex}
              animate={{
                x: xOffset,
                y: yOffset,
                rotate: rotateAngle,
                scale: scaleVal,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 20,
                delay: stagger,
              }}
              style={{
                zIndex: zIndexVal,
                boxShadow:
                  cardIndex === cardLayers.length - 1
                    ? `0 0 35px ${focusObj.colorHex}60, 0 10px 25px rgba(0,0,0,0.8)`
                    : '0 4px 15px rgba(0,0,0,0.5)',
              }}
              className="absolute w-32 h-52 sm:w-36 sm:h-56 rounded-2xl border flex flex-col justify-between p-2.5 bg-[#0D081E] overflow-hidden"
            >
              {/* Card Outer Border & Pattern */}
              <div
                className="w-full h-full rounded-xl border flex flex-col items-center justify-between p-2 relative overflow-hidden"
                style={{
                  borderColor: `${focusObj.colorHex}60`,
                  background:
                    cardIndex === cardLayers.length - 1
                      ? `linear-gradient(145deg, #1C1036, #090514, ${focusObj.colorHex}25)`
                      : 'linear-gradient(145deg, #140C29, #090514)',
                }}
              >
                {/* Corner Sigils */}
                <div className="w-full flex justify-between items-center text-[10px] opacity-70">
                  <span style={{ color: focusObj.colorHex }}>✦</span>
                  <span className="font-mono text-[9px]" style={{ color: focusObj.colorHex }}>
                    {focusObj.icon}
                  </span>
                  <span style={{ color: focusObj.colorHex }}>✦</span>
                </div>

                {/* Center Shimmering Mandala & Focus Icon */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={
                      cardIndex === cardLayers.length - 1
                        ? { rotate: 360, scale: [1, 1.12, 1] }
                        : {}
                    }
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center text-lg"
                    style={{
                      borderColor: focusObj.colorHex,
                      backgroundColor: `${focusObj.colorHex}15`,
                    }}
                  >
                    <span>{focusObj.icon}</span>
                  </motion.div>
                </div>

                {/* Bottom Sigils */}
                <div className="w-full flex justify-between items-center text-[10px] opacity-70">
                  <span style={{ color: focusObj.colorHex }}>✧</span>
                  <span className="text-[8px] font-mono tracking-widest uppercase text-[#9D94B8]">
                    LEO
                  </span>
                  <span style={{ color: focusObj.colorHex }}>✧</span>
                </div>

                {/* Light Sweep Highlight */}
                {cardIndex === cardLayers.length - 1 && (
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Status Bar & Stage Description */}
      <div className="w-full max-w-sm flex flex-col items-center gap-2.5 mt-3 text-center z-10">
        <div className="flex items-center gap-2">
          <Shuffle className="w-4 h-4 animate-spin" style={{ color: focusObj.colorHex }} />
          <span
            className="text-xs font-mono font-bold uppercase tracking-widest"
            style={{ color: focusObj.colorHex }}
          >
            {focusObj.name} Oracle Active
          </span>
          <Sparkles className="w-3.5 h-3.5" style={{ color: focusObj.colorHex }} />
        </div>

        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-sm sm:text-base font-serif font-bold text-[#F5F3FF]"
        >
          {phaseMessages[phase]}
        </motion.p>

        {/* Progress Track */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: focusObj.colorHex,
              boxShadow: `0 0 12px ${focusObj.colorHex}`,
            }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[10px] font-mono text-[#9D94B8] px-1">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Riffle & Overhand Shuffle</span>
          </span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
