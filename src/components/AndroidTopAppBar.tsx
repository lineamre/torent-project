import { useState, useRef, useEffect } from 'react';
import { DeckTheme, AppLanguage } from '../types';
import { useAuth } from '../contexts/AuthContext';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Radio,
  Palette,
  Sun,
  MoreVertical,
  RotateCcw,
  HelpCircle,
  Smartphone,
  Maximize2,
  Share2,
  Mic,
  BookOpen,
  Languages,
  User as UserIcon,
  LogIn,
  ShieldCheck,
  Cloud,
} from 'lucide-react';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';
import { oracleVoice } from '../utils/speech';

interface AndroidTopAppBarProps {
  activeTab: 'reading' | 'explorer' | 'journal' | 'daily';
  onTabChange: (tab: 'reading' | 'explorer' | 'journal' | 'daily') => void;
  deckTheme: DeckTheme;
  onThemeChange: (theme: DeckTheme) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  droneActive: boolean;
  onToggleDrone: () => void;
  onResetReading?: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onOpenGuideModal?: () => void;
  currentLanguage?: AppLanguage;
  onLanguageChange?: (lang: AppLanguage) => void;
  onOpenAuthModal: () => void;
  onOpenProfileModal: () => void;
}

export default function AndroidTopAppBar({
  activeTab,
  onTabChange,
  deckTheme,
  onThemeChange,
  soundEnabled,
  onToggleSound,
  droneActive,
  onToggleDrone,
  onResetReading,
  isPhoneFrame,
  onTogglePhoneFrame,
  onOpenGuideModal,
  currentLanguage,
  onLanguageChange,
  onOpenAuthModal,
  onOpenProfileModal,
}: AndroidTopAppBarProps) {
  const { user, userProfile } = useAuth();
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const [autoVoice, setAutoVoice] = useState(oracleVoice.autoSpeakOnFinish);
  const [appLang, setAppLang] = useState<AppLanguage>(currentLanguage || oracleVoice.currentLanguage);
  const overflowRef = useRef<HTMLDivElement>(null);

  const handleToggleAutoVoice = () => {
    haptic.tick();
    const next = !autoVoice;
    setAutoVoice(next);
    oracleVoice.setAutoSpeak(next);
  };

  const handleToggleLanguage = (target: AppLanguage) => {
    haptic.tick();
    setAppLang(target);
    oracleVoice.setLanguage(target);
    if (onLanguageChange) {
      onLanguageChange(target);
    }
  };

  const themes: { id: DeckTheme; name: string; color: string; desc: string }[] = [
    { id: 'banana-cyber', name: 'Cyber Banana (Material You)', color: '#FFE600', desc: 'Dynamic cyber-yellow glow' },
    { id: 'cosmic-gold', name: 'Celestial Gold', color: '#F59E0B', desc: 'Solar alchemical warmth' },
    { id: 'neon-matrix', name: 'Cyan Matrix', color: '#00F2FE', desc: 'Quantum luminescence' },
    { id: 'void-amethyst', name: 'Void Amethyst', color: '#C084FC', desc: 'Deep cosmic mystic' },
  ];

  const getTitle = () => {
    switch (activeTab) {
      case 'reading':
        return { title: 'Divination Spread', subtitle: appLang === 'tl' ? 'Pahayag ng Kapalaran' : 'Universal Quantum Matrix' };
      case 'explorer':
        return { title: 'Arcana Grimoire', subtitle: appLang === 'tl' ? '78 Baraha ng Tarot' : '78 Archetype Vectors' };
      case 'journal':
        return { title: 'Destiny Journal', subtitle: appLang === 'tl' ? 'Nai-save na Pagbasa' : 'Saved Transmissions' };
      case 'daily':
        return { title: 'Card of the Day', subtitle: appLang === 'tl' ? 'Baraha ng Araw' : 'Daily Solar Archetype' };
    }
  };

  const { title, subtitle } = getTitle();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overflowRef.current && !overflowRef.current.contains(e.target as Node)) {
        setShowOverflowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-[#120D26]/90 border-b border-white/10 backdrop-blur-xl sticky top-0 z-40 px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between">
        {/* Left: Android App Branding & Title */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-transform"
          onClick={() => {
            haptic.tick();
            onTabChange('reading');
          }}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFE600]/25 to-[#F59E0B]/20 border border-[#FFE600]/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,230,0,0.25)] flex-shrink-0">
            ♌
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-base sm:text-lg text-[#F5F3FF] tracking-wide leading-none">
                Tarot Reading Leo
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40 leading-none">
                Oracle
              </span>
            </div>
            <span className="text-[11px] text-[#9D94B8] font-mono leading-tight mt-0.5">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Right: Android Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Google Account / Sign In Button */}
          {user ? (
            <button
              id="top-bar-user-avatar-btn"
              onClick={() => {
                haptic.tick();
                onOpenProfileModal();
              }}
              className="flex items-center gap-1.5 p-1 pr-2.5 rounded-full bg-white/10 hover:bg-[#FFE600]/20 border border-[#FFE600]/40 transition-all active:scale-95 group"
              title={`Logged in as ${user.email}`}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Account'}
                  className="w-6 h-6 rounded-full object-cover border border-[#FFE600]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#FFE600]/30 text-[#FFE600] flex items-center justify-center text-xs font-bold font-serif">
                  {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                </div>
              )}
              <span className="text-xs font-semibold text-[#F5F3FF] hidden md:inline truncate max-w-[100px]">
                {user.displayName?.split(' ')[0] || 'Account'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline" />
            </button>
          ) : (
            <button
              id="top-bar-google-signin-btn"
              onClick={() => {
                haptic.tick();
                onOpenAuthModal();
              }}
              className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm group"
              title="Sign in with Google (Gmail) for Cloud Sync"
            >
              {/* Google G mini icon */}
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.4 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.24C.45 8.14 0 9.97 0 12s.45 3.86 1.24 5.43l4.04-3.14z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.6 1.24 6.57l4.04 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Language Toggle Pill */}
          <button
            id="android-top-lang-btn"
            onClick={() => handleToggleLanguage(appLang === 'en' ? 'tl' : 'en')}
            className={`px-2.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border transition-all active:scale-90 ${
              appLang === 'tl'
                ? 'bg-[#FFE600] text-black border-[#FFE600] shadow-[0_0_12px_rgba(255,230,0,0.35)]'
                : 'bg-white/5 hover:bg-white/15 text-[#FFE600] border-[#FFE600]/30'
            }`}
            title={`Switch language: currently ${appLang === 'tl' ? 'Tagalog (Filipino)' : 'English'}`}
          >
            <span>{appLang === 'tl' ? '🇵🇭 TL' : '🇬🇧 EN'}</span>
          </button>

          {/* Guide & Steps Quick Button */}
          <button
            id="android-top-guide-btn"
            onClick={() => {
              haptic.tick();
              sound.playDeal();
              if (onOpenGuideModal) onOpenGuideModal();
            }}
            className="px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-[#FFE600]/20 text-[#FFE600] hover:text-white border border-[#FFE600]/30 text-xs font-mono font-bold flex items-center gap-1.5 active:scale-90 transition-all"
            title="Interactive Steps & Guide"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Daily Quick Launch */}
          <button
            id="android-top-daily-btn"
            onClick={() => {
              haptic.tick();
              onTabChange('daily');
            }}
            className={`p-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-90 ${
              activeTab === 'daily'
                ? 'bg-[#FFE600] text-[#080612] shadow-[0_0_15px_rgba(255,230,0,0.4)]'
                : 'text-[#FFE600] bg-[#FFE600]/10 hover:bg-[#FFE600]/20 border border-[#FFE600]/30'
            }`}
            title="Card of the Day"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Theme Palette Button */}
          <button
            id="android-top-theme-btn"
            onClick={() => {
              haptic.tick();
              setShowThemeDialog(true);
            }}
            className="p-2.5 rounded-full text-[#D1CBE8] hover:text-[#F5F3FF] hover:bg-white/10 active:scale-90 transition-all"
            title="Theme Palette"
          >
            <Palette className="w-4 h-4 text-[#FFE600]" />
          </button>

          {/* Ambient Drone Audio */}
          <button
            id="android-top-drone-btn"
            onClick={() => {
              haptic.tick();
              onToggleDrone();
            }}
            className={`p-2.5 rounded-full text-xs transition-all active:scale-90 ${
              droneActive
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.4)] animate-pulse'
                : 'text-[#9D94B8] hover:text-[#F5F3FF] hover:bg-white/10'
            }`}
            title={droneActive ? 'Stop Cosmic Drone' : 'Play Cosmic Drone'}
          >
            <Radio className="w-4 h-4" />
          </button>

          {/* Sound FX Toggle */}
          <button
            id="android-top-sound-btn"
            onClick={() => {
              haptic.tick();
              onToggleSound();
            }}
            className="p-2.5 rounded-full text-[#D1CBE8] hover:text-[#F5F3FF] hover:bg-white/10 active:scale-90 transition-all"
            title={soundEnabled ? 'Mute Haptics & Audio' : 'Unmute Haptics & Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#FFE600]" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {/* Android Overflow Menu (Three Dots) */}
          <div className="relative" ref={overflowRef}>
            <button
              id="android-overflow-menu-btn"
              onClick={() => {
                haptic.tick();
                setShowOverflowMenu(!showOverflowMenu);
              }}
              className="p-2.5 rounded-full text-[#D1CBE8] hover:text-[#F5F3FF] hover:bg-white/10 active:scale-90 transition-all"
              title="More Options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showOverflowMenu && (
              <div
                id="android-overflow-dropdown"
                className="absolute right-0 mt-2 w-64 bg-[#16112B] border border-white/15 rounded-3xl p-2 shadow-2xl z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 text-xs"
              >
                {/* User Account Quick Tile */}
                <div className="p-2.5 border-b border-white/10 mb-1">
                  {user ? (
                    <div
                      onClick={() => {
                        setShowOverflowMenu(false);
                        onOpenProfileModal();
                      }}
                      className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-2xl hover:bg-white/5 transition-colors"
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="avatar"
                          className="w-8 h-8 rounded-full border border-[#FFE600]"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#FFE600]/20 text-[#FFE600] flex items-center justify-center font-bold">
                          {user.displayName?.[0] || 'U'}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-white truncate text-xs">
                          {user.displayName || 'Google User'}
                        </span>
                        <span className="text-[10px] text-[#9D94B8] truncate font-mono">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowOverflowMenu(false);
                        onOpenAuthModal();
                      }}
                      className="w-full py-2 px-3 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold flex items-center justify-center gap-2 shadow transition-all active:scale-95"
                    >
                      <LogIn className="w-3.5 h-3.5 text-blue-600" />
                      <span>Sign In with Google</span>
                    </button>
                  )}
                </div>

                {/* Language Switch Section */}
                <div className="p-2 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[#9D94B8] font-mono flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-[#FFE600]" />
                    <span>Language / Wika</span>
                  </span>
                  <div className="flex items-center bg-black/40 rounded-xl p-0.5 border border-white/15">
                    <button
                      onClick={() => handleToggleLanguage('en')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                        appLang === 'en' ? 'bg-[#FFE600] text-black' : 'text-[#9D94B8] hover:text-white'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => handleToggleLanguage('tl')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                        appLang === 'tl' ? 'bg-[#FFE600] text-black' : 'text-[#9D94B8] hover:text-white'
                      }`}
                    >
                      🇵🇭 TL
                    </button>
                  </div>
                </div>

                {/* Account & Profile Modal item */}
                {user && (
                  <button
                    onClick={() => {
                      haptic.tick();
                      setShowOverflowMenu(false);
                      onOpenProfileModal();
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-white/10 text-[#00F2FE] hover:text-white flex items-center gap-2 transition-colors font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
                    <span>Manage Account & Cloud Sync</span>
                  </button>
                )}

                {/* Interactive Guide & Steps */}
                <button
                  onClick={() => {
                    haptic.tick();
                    setShowOverflowMenu(false);
                    if (onOpenGuideModal) onOpenGuideModal();
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-white/10 text-[#FFE600] hover:text-white flex items-center gap-2 transition-colors font-semibold"
                >
                  <BookOpen className="w-4 h-4 text-[#FFE600]" />
                  <span>Interactive Guide & Steps</span>
                </button>

                {/* Frame Toggle */}
                <button
                  onClick={() => {
                    haptic.tick();
                    onTogglePhoneFrame();
                    setShowOverflowMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-white/10 text-[#D1CBE8] hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {isPhoneFrame ? <Maximize2 className="w-4 h-4 text-[#00F2FE]" /> : <Smartphone className="w-4 h-4 text-[#00F2FE]" />}
                    <span>{isPhoneFrame ? 'Expanded Tablet Mode' : 'Phone Shell Mode'}</span>
                  </span>
                </button>

                {/* Auto-Voice Narration Toggle */}
                <button
                  onClick={() => {
                    handleToggleAutoVoice();
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-white/10 text-[#D1CBE8] hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#FFE600]" />
                    <span>Auto-Voice Reading</span>
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${autoVoice ? 'bg-[#00F2FE]/20 text-[#00F2FE]' : 'bg-white/10 text-[#9D94B8]'}`}>
                    {autoVoice ? 'ON' : 'OFF'}
                  </span>
                </button>

                {onResetReading && (
                  <button
                    onClick={() => {
                      haptic.tick();
                      onResetReading();
                      setShowOverflowMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-white/10 text-[#D1CBE8] hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-[#FFE600]" />
                    <span>Redeal Divination Spread</span>
                  </button>
                )}

                <div className="border-t border-white/10 my-1 pt-1 px-3 py-1 text-[10px] text-[#9D94B8] font-mono flex items-center justify-between">
                  <span>Tarot Reading Leo v3.8</span>
                  <span className="text-[#FFE600] flex items-center gap-1">
                    <Cloud className="w-2.5 h-2.5" />
                    Firestore Cloud
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Material 3 Theme Picker Modal / Dialog */}
      {showThemeDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setShowThemeDialog(false)}
        >
          <div
            className="w-full max-w-sm bg-[#16112B] border border-[#FFE600]/40 rounded-3xl p-6 shadow-2xl text-[#F5F3FF] flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#FFE600]" />
                Material You Theme
              </h3>
              <button
                onClick={() => setShowThemeDialog(false)}
                className="text-xs text-[#9D94B8] hover:text-white px-2 py-1"
              >
                Done
              </button>
            </div>
            <p className="text-xs text-[#9D94B8]">
              Select dynamic color accents matching Android Material 3 palettes.
            </p>

            <div className="flex flex-col gap-2">
              {themes.map((t) => {
                const isActive = deckTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      haptic.cardSelect();
                      onThemeChange(t.id);
                      sound.playFlip();
                      setShowThemeDialog(false);
                    }}
                    className={`p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all active:scale-95 ${
                      isActive
                        ? 'bg-[#FFE600]/15 border-[#FFE600] text-white shadow-[0_0_20px_rgba(255,230,0,0.2)]'
                        : 'bg-[#100B24]/80 border-white/10 text-[#D1CBE8] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{t.name}</span>
                      <span className="text-[11px] text-[#9D94B8]">{t.desc}</span>
                    </div>
                    <span
                      className="w-6 h-6 rounded-full border-2 border-white/20 shadow-md"
                      style={{ backgroundColor: t.color }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
