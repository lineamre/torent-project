import React from 'react';
import {
  Sparkles,
  ArrowRight,
  X,
  Compass,
  Zap,
  Layers,
  Heart,
  Volume2,
  HelpCircle,
  CheckCircle2,
  Flame,
  Shield,
  Coins,
} from 'lucide-react';
import { AppLanguage } from '../types';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface NewUserWelcomeModalProps {
  isOpen: boolean;
  onStartGuide: () => void;
  onSkipGuide: () => void;
  appLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
}

export default function NewUserWelcomeModal({
  isOpen,
  onStartGuide,
  onSkipGuide,
  appLanguage = 'en',
  onLanguageChange,
}: NewUserWelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="new-user-welcome-modal-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 select-none"
    >
      <div
        id="new-user-welcome-modal-card"
        className="relative w-full max-w-lg bg-[#140E29]/98 border-2 border-[#FFE600] rounded-3xl p-5 sm:p-8 shadow-[0_0_80px_rgba(255,230,0,0.35)] text-[#F5F3FF] backdrop-blur-2xl flex flex-col gap-4 sm:gap-5 animate-in zoom-in-95 duration-250 max-h-[92vh] overflow-y-auto"
      >
        {/* Glow backdrop decorative accent */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-24 bg-[#FFE600]/25 blur-3xl rounded-full pointer-events-none" />

        {/* Top Header with Close & Language Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/40 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE600] animate-pulse" />
              <span>{appLanguage === 'tl' ? 'Bagong Gumagamit' : 'New User Welcome'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  haptic.tick();
                  onLanguageChange('en');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  appLanguage === 'en'
                    ? 'bg-[#FFE600] text-black shadow-sm'
                    : 'text-[#9D94B8] hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  haptic.tick();
                  onLanguageChange('tl');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  appLanguage === 'tl'
                    ? 'bg-[#FFE600] text-black shadow-sm'
                    : 'text-[#9D94B8] hover:text-white'
                }`}
              >
                🇵🇭 TL
              </button>
            </div>

            <button
              id="new-user-modal-close-btn"
              onClick={() => {
                haptic.tick();
                onSkipGuide();
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-[#9D94B8] hover:text-white transition-colors"
              title="Close and skip"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Greeting */}
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight flex items-center justify-center sm:justify-start gap-2">
            <span>{appLanguage === 'tl' ? 'Gusto mo ba ng Tour o Gabay?' : 'Take the Quick Tour?'}</span>
            <span className="text-2xl animate-bounce">✨</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#D1CBE8] font-sans leading-relaxed">
            {appLanguage === 'tl'
              ? 'Maligayang pagdating sa Neo-Arcana Cyber-Tarot! Piliin kung nais mong mag-Tour (may nakaiilaw na bilog na napakadaling sundan) o Laktawan (Skip) upang magsimula agad.'
              : 'Welcome to the Cyber-Mystic Tarot Oracle! Choose whether to take the easy glowing circle walkthrough or skip right to dealing your cards.'}
          </p>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 text-left">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2 sm:gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#FF2A6D]/20 text-[#FF2A6D] flex items-center justify-center font-bold text-sm flex-shrink-0">
              ❤️
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                {appLanguage === 'tl' ? '4 na Kulay' : '4 Magic Colors'}
              </span>
              <span className="text-[10px] text-[#9D94B8] leading-tight">
                {appLanguage === 'tl' ? 'Pag-ibig, Bukas, Buhay, Pera' : 'Love, Future, Life & Wealth'}
              </span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2 sm:gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center font-bold text-sm flex-shrink-0">
              🃏
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                {appLanguage === 'tl' ? '1, 3, o 6 Baraha' : '1, 3, or 6 Cards'}
              </span>
              <span className="text-[10px] text-[#9D94B8] leading-tight">
                {appLanguage === 'tl' ? 'Mabilis o Malalim na Basa' : 'Single to Hexagram'}
              </span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2 sm:gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#FFE600]/20 text-[#FFE600] flex items-center justify-center font-bold text-sm flex-shrink-0">
              🪄
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                {appLanguage === 'tl' ? '3D Deck Shuffle' : '3D Deck Shuffle'}
              </span>
              <span className="text-[10px] text-[#9D94B8] leading-tight">
                {appLanguage === 'tl' ? 'Umiikot at Lumilipad' : 'Smooth realistic animation'}
              </span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2 sm:gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#A855F7]/20 text-[#A855F7] flex items-center justify-center font-bold text-sm flex-shrink-0">
              🎙️
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                {appLanguage === 'tl' ? 'Boses Babaylan' : 'Philippine Voice'}
              </span>
              <span className="text-[10px] text-[#9D94B8] leading-tight">
                {appLanguage === 'tl' ? 'Tagalog AI Audio' : 'Spoken Oracle Narration'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Tour vs Skip (Two prominent big buttons) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
          {/* Skip Button */}
          <button
            id="welcome-modal-skip-guide-btn"
            onClick={() => {
              haptic.tick();
              sound.playFlip();
              onSkipGuide();
            }}
            className="order-2 sm:order-1 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-[#D1CBE8] hover:text-white border border-white/15 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
          >
            <span>{appLanguage === 'tl' ? 'Laktawan (Skip Guide)' : 'Skip Guide / No Thanks'}</span>
          </button>

          {/* Primary Start Tour Button */}
          <button
            id="welcome-modal-start-guide-btn"
            onClick={() => {
              haptic.tick();
              sound.playSparkle();
              onStartGuide();
            }}
            className="order-1 sm:order-2 flex-1 px-6 py-3.5 rounded-2xl bg-[#FFE600] hover:bg-[#FFE600]/90 text-black font-black text-xs sm:text-sm tracking-wide shadow-[0_0_35px_rgba(255,230,0,0.5)] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '6s' }} />
            <span>{appLanguage === 'tl' ? '👉 Simulan ang Tour (Start Tour)' : '👉 Start Tour (How to Use)'}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Reassurance text */}
        <p className="text-[10px] sm:text-[11px] text-center text-[#9D94B8] font-mono">
          {appLanguage === 'tl'
            ? '💡 Pwede mong buksan muli ang Tour kahit kailan sa pamamagitan ng pagpindot sa "Tutorial" button.'
            : '💡 You can also restart this guide anytime by clicking "Tutorial" in the top bar.'}
        </p>
      </div>
    </div>
  );
}
