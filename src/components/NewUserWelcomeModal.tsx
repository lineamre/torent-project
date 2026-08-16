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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="new-user-welcome-modal-card"
        className="relative w-full max-w-lg bg-[#140E29]/95 border-2 border-[#FFE600]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,230,0,0.25)] text-[#F5F3FF] backdrop-blur-2xl flex flex-col gap-5 animate-in zoom-in-95 duration-250"
      >
        {/* Glow backdrop decorative accent */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-16 bg-[#FFE600]/20 blur-3xl rounded-full pointer-events-none" />

        {/* Top Header with Close & Language Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE600] animate-pulse" />
              <span>{appLanguage === 'tl' ? 'Maligayang Pagdating' : 'Welcome to Neo-Arcana'}</span>
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
                className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all ${
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
                className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all ${
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
        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight flex items-center gap-2">
            <span>{appLanguage === 'tl' ? 'Gusto mo ba ng Gabay?' : 'Need a Quick Guide?'}</span>
            <span className="text-2xl animate-bounce">✨</span>
          </h2>
          <p className="text-sm sm:text-base text-[#D1CBE8] font-sans leading-relaxed">
            {appLanguage === 'tl'
              ? 'Bago ka ba rito? Maaari mong panoorin ang madaling interactive tour gamit ang mga bilog, o simulan agad ang pagbasa ng baraha!'
              : 'New to the Cyber-Mystic Tarot Oracle? Take a fun 30-second glowing circle walkthrough, or jump right into your divination!'}
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#FF2A6D]/20 text-[#FF2A6D] flex items-center justify-center font-bold text-sm flex-shrink-0">
              ❤️
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                {appLanguage === 'tl' ? '4 na Kulay' : '4 Magic Colors'}
              </span>
              <span className="text-[10px] text-[#9D94B8]">
                {appLanguage === 'tl' ? 'Pag-ibig, Bukas, Buhay, Pera' : 'Love, Future, Life & Wealth'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center font-bold text-sm flex-shrink-0">
              🃏
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                {appLanguage === 'tl' ? '1, 3, o 6 Baraha' : '1, 3, or 6 Spreads'}
              </span>
              <span className="text-[10px] text-[#9D94B8]">
                {appLanguage === 'tl' ? 'Mula 1 hanggang Hexagram' : 'Quick Oracle to Hexagram'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#FFE600]/20 text-[#FFE600] flex items-center justify-center font-bold text-sm flex-shrink-0">
              🪄
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                {appLanguage === 'tl' ? '3D Card Shuffling' : '3D Card Deck'}
              </span>
              <span className="text-[10px] text-[#9D94B8]">
                {appLanguage === 'tl' ? 'Umiikot at lumilipad' : 'Smooth realistic physics'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#A855F7]/20 text-[#A855F7] flex items-center justify-center font-bold text-sm flex-shrink-0">
              🎙️
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                {appLanguage === 'tl' ? 'Boses ng Babaylan' : 'Philippine Voice'}
              </span>
              <span className="text-[10px] text-[#9D94B8]">
                {appLanguage === 'tl' ? 'Makinig sa Tagalog AI' : 'Spoken Gemini AI Oracle'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Start Guide vs Skip Guide */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          {/* Skip Button */}
          <button
            id="welcome-modal-skip-guide-btn"
            onClick={() => {
              haptic.tick();
              sound.playFlip();
              onSkipGuide();
            }}
            className="order-2 sm:order-1 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/15 text-[#D1CBE8] hover:text-white border border-white/15 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>{appLanguage === 'tl' ? 'Laktawan (Skip Guide)' : 'Skip Guide'}</span>
          </button>

          {/* Primary Start Guide Button */}
          <button
            id="welcome-modal-start-guide-btn"
            onClick={() => {
              haptic.tick();
              sound.playSparkle();
              onStartGuide();
            }}
            className="order-1 sm:order-2 flex-1 px-6 py-3.5 rounded-2xl bg-[#FFE600] hover:bg-[#FFE600]/90 text-black font-black text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(255,230,0,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '6s' }} />
            <span>{appLanguage === 'tl' ? '👉 Simulan ang "How to Use" Guide!' : '👉 Start "How to Use" Guide!'}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Reassurance text */}
        <p className="text-[11px] text-center text-[#9D94B8] font-mono">
          {appLanguage === 'tl'
            ? 'Maaari mong buksan muli ang gabay anumang oras sa pamamagitan ng pagpindot sa "Tutorial" button.'
            : 'You can also restart this guide anytime by tapping "Tutorial" in the top bar.'}
        </p>
      </div>
    </div>
  );
}
