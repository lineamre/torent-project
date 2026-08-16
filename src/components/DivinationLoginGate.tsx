import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Sparkles,
  Lock,
  Cloud,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Stars,
  Compass,
} from 'lucide-react';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface DivinationLoginGateProps {
  onExploreCards?: () => void;
  onOpenGuideModal?: () => void;
}

export default function DivinationLoginGate({
  onExploreCards,
  onOpenGuideModal,
}: DivinationLoginGateProps) {
  const { signInWithGoogle, isLoadingAuth, error, clearError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    haptic.tick();
    setIsSigningIn(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        sound.playCosmicChime();
        haptic.success();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      id="divination-login-gate"
      className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Leo Cyber-Mystic Portal Sigil */}
      <div className="relative flex flex-col items-center">
        {/* Glowing aura rings */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#FFE600]/20 via-[#00F2FE]/20 to-[#FF007F]/20 rounded-full blur-2xl opacity-60 animate-pulse pointer-events-none" />

        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#1E163B] to-[#0D0820] border-2 border-[#FFE600]/70 flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_35px_rgba(255,230,0,0.35)] select-none">
          ♌
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#FFE600] text-black shadow-lg">
            <Lock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Sanctuary Headline */}
      <div className="flex flex-col items-center text-center gap-2 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sanctuary Authentication Required</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight mt-1">
          Sign In to Begin Your Tarot Reading
        </h2>

        <p className="text-xs sm:text-sm text-[#9D94B8] leading-relaxed">
          Connect your Google (Gmail) account to unlock the quantum spread matrix, synthesize AI oracle insights, and store your readings in your private Firestore destiny journal.
        </p>
      </div>

      {/* Error Alert if any */}
      {error && (
        <div className="w-full max-w-md p-3.5 rounded-2xl bg-[#FF007F]/15 border border-[#FF007F]/30 text-xs text-[#FF80BF] flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="ml-2 text-white underline hover:no-underline font-mono text-[11px]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Primary Action Button: Google Sign-In */}
      <div className="w-full max-w-sm flex flex-col gap-2.5">
        <button
          id="gate-google-signin-btn"
          onClick={handleSignIn}
          disabled={isLoadingAuth || isSigningIn}
          className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,230,0,0.4)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group border border-white"
        >
          {/* Google G Logo */}
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
          <span>
            {isSigningIn || isLoadingAuth
              ? 'Opening Google Login...'
              : 'Sign in with Google (Gmail)'}
          </span>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[11px] text-center text-[#9D94B8] font-mono">
          🔒 Secure 1-Click Login • Private Owner Access Control
        </p>
      </div>

      {/* Feature Value Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="bg-[#16112B]/80 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 backdrop-blur-xl">
          <div className="p-2 w-fit rounded-xl bg-[#FFE600]/15 text-[#FFE600]">
            <Cloud className="w-4 h-4" />
          </div>
          <h4 className="font-serif font-bold text-sm text-white">Private Grimoire</h4>
          <p className="text-xs text-[#9D94B8] leading-relaxed">
            Every card drawn and AI synthesis is stored in your personal Firestore collection.
          </p>
        </div>

        <div className="bg-[#16112B]/80 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 backdrop-blur-xl">
          <div className="p-2 w-fit rounded-xl bg-[#00F2FE]/15 text-[#00F2FE]">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="font-serif font-bold text-sm text-white">AI Oracle Synthesis</h4>
          <p className="text-xs text-[#9D94B8] leading-relaxed">
            Custom quantum interpretations generated in both English and Tagalog dialects.
          </p>
        </div>

        <div className="bg-[#16112B]/80 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 backdrop-blur-xl">
          <div className="p-2 w-fit rounded-xl bg-purple-500/15 text-purple-300">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-serif font-bold text-sm text-white">Identity Access Rules</h4>
          <p className="text-xs text-[#9D94B8] leading-relaxed">
            Protected by Firebase rules; only your authenticated Gmail ID can access your history.
          </p>
        </div>
      </div>

      {/* Secondary Actions (Browse Deck / Lore Guide) */}
      <div className="flex items-center gap-3 pt-2 flex-wrap justify-center">
        {onExploreCards && (
          <button
            onClick={() => {
              haptic.tick();
              onExploreCards();
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#D1CBE8] hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>Browse 78-Card Grimoire Encyclopedia</span>
          </button>
        )}

        {onOpenGuideModal && (
          <button
            onClick={() => {
              haptic.tick();
              onOpenGuideModal();
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#9D94B8] hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>How Tarot Divination Works</span>
          </button>
        )}
      </div>
    </div>
  );
}
