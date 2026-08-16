import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Sparkles,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Smartphone,
  AlertCircle,
  X,
} from 'lucide-react';
import { haptic } from '../utils/haptics';
import { sound } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  title = 'Sign In with Google',
  subtitle = 'Connect your Gmail account to enable personal cloud journal synchronization & secure access control.',
}: AuthModalProps) {
  const { signInWithGoogle, isLoadingAuth, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    haptic.tick();
    setIsSubmitting(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        sound.playCosmicChime();
        haptic.success();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="auth-modal-card"
        className="w-full max-w-md bg-[#16112B] border border-[#FFE600]/50 rounded-3xl p-6 sm:p-7 shadow-2xl text-[#F5F3FF] flex flex-col gap-5 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-auth-modal-btn"
          onClick={() => {
            haptic.tick();
            clearError();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-[#9D94B8] hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Icon & Title */}
        <div className="flex flex-col items-center text-center gap-2 pt-1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFE600]/25 to-[#F59E0B]/20 border border-[#FFE600]/50 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(255,230,0,0.25)]">
            ♌
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#9D94B8] max-w-xs leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-[#FF007F]/15 border border-[#FF007F]/30 text-xs text-[#FF80BF] flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* Feature Highlights / Benefits */}
        <div className="flex flex-col gap-2.5 bg-[#100B24] border border-white/10 rounded-2xl p-4 text-xs">
          <div className="flex items-start gap-2.5">
            <span className="p-1.5 rounded-xl bg-[#FFE600]/15 text-[#FFE600] flex-shrink-0 mt-0.5">
              <Cloud className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white">Personal Cloud Destiny Archive</span>
              <span className="text-[#9D94B8] text-[11px] leading-relaxed">
                All your tarot readings, daily draws, and AI syntheses are stored permanently in Firestore database.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="p-1.5 rounded-xl bg-[#00F2FE]/15 text-[#00F2FE] flex-shrink-0 mt-0.5">
              <Lock className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white">Private Security Access Control</span>
              <span className="text-[#9D94B8] text-[11px] leading-relaxed">
                Strict Firebase security rules ensure only your authenticated Gmail UID can read and write your records.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="p-1.5 rounded-xl bg-purple-500/15 text-purple-300 flex-shrink-0 mt-0.5">
              <Smartphone className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-white">Multi-Device Synchronized</span>
              <span className="text-[#9D94B8] text-[11px] leading-relaxed">
                Seamlessly access your grimoire and saved spreads across any phone, tablet, or browser.
              </span>
            </div>
          </div>
        </div>

        {/* Sign in with Google (Gmail) Button */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            id="google-signin-action-btn"
            onClick={handleGoogleSignIn}
            disabled={isLoadingAuth || isSubmitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-sm flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Google G Logo */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <span>{isSubmitting || isLoadingAuth ? 'Connecting Google Account...' : 'Continue with Google (Gmail)'}</span>
          </button>

          <p className="text-[10px] text-center text-[#9D94B8] font-mono mt-1">
            Protected by Firebase Authentication & OAuth 2.0 Identity Protocol
          </p>
        </div>
      </div>
    </div>
  );
}
