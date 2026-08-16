import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User as UserIcon,
  LogOut,
  Cloud,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Sparkles,
  BookmarkCheck,
  Copy,
  Check,
  ExternalLink,
  Download,
  Trash2,
  Mail,
  Zap,
} from 'lucide-react';
import { haptic } from '../utils/haptics';
import { sound } from '../utils/audio';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  readingsCount: number;
  onClearCloudData?: () => void;
  onExportData?: () => void;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  readingsCount,
  onClearCloudData,
  onExportData,
}: UserProfileModalProps) {
  const { user, userProfile, signOut } = useAuth();
  const [copiedUid, setCopiedUid] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!isOpen || !user) return null;

  const handleCopyUid = () => {
    haptic.tick();
    navigator.clipboard.writeText(user.uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleSignOutClick = async () => {
    haptic.tick();
    setIsSigningOut(true);
    try {
      await signOut();
      sound.playDeal();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const memberSince = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Active Explorer';

  const lastLogin = user.metadata.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Just now';

  return (
    <div
      id="user-profile-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="user-profile-modal-card"
        className="w-full max-w-md bg-[#16112B] border border-[#FFE600]/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-[#F5F3FF] flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#FFE600]/20 text-[#FFE600]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h3 className="font-serif font-bold text-lg text-white">
              Account & Identity
            </h3>
          </div>
          <button
            id="close-profile-modal-btn"
            onClick={() => {
              haptic.tick();
              onClose();
            }}
            className="text-xs font-mono font-bold text-[#9D94B8] hover:text-white px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>

        {/* User Identity Profile Card */}
        <div className="bg-[#100B24] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="relative">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User Avatar'}
                className="w-14 h-14 rounded-2xl border-2 border-[#FFE600]/60 shadow-[0_0_15px_rgba(255,230,0,0.3)] object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFE600]/30 to-[#F59E0B]/20 border-2 border-[#FFE600]/60 flex items-center justify-center text-xl text-[#FFE600] font-serif font-bold">
                {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
              </div>
            )}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#16112B] flex items-center justify-center text-[10px] text-black font-bold shadow"
              title="Verified Google Account"
            >
              ✓
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-base text-white truncate">
                {user.displayName || 'Google Seeker'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-[#9D94B8] truncate mt-0.5 font-mono">
              <Mail className="w-3 h-3 text-[#FFE600] flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>

            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Google Authenticated
              </span>
            </div>
          </div>
        </div>

        {/* User UID & Security Access Pill */}
        <div className="bg-[#100B24]/70 border border-white/10 rounded-2xl p-3 flex items-center justify-between gap-2 text-xs">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#9D94B8] font-mono uppercase tracking-wider">
              Firebase Security Access UID:
            </span>
            <span className="font-mono text-[#D1CBE8] truncate text-[11px]">
              {user.uid}
            </span>
          </div>
          <button
            id="copy-uid-btn"
            onClick={handleCopyUid}
            className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-[#FFE600] border border-white/10 text-[11px] font-mono flex items-center gap-1 active:scale-95 transition-all flex-shrink-0"
            title="Copy UID"
          >
            {copiedUid ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedUid ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Cloud Firestore Storage Records Summary */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#100B24] border border-white/10 rounded-2xl p-3 flex flex-col">
            <span className="text-[10px] font-mono text-[#9D94B8] uppercase tracking-wider flex items-center gap-1">
              <BookmarkCheck className="w-3 h-3 text-[#FFE600]" />
              Cloud Readings
            </span>
            <span className="text-xl font-serif font-bold text-[#FFE600] mt-1">
              {readingsCount}
            </span>
            <span className="text-[10px] text-[#9D94B8] font-mono mt-0.5">
              Encrypted in Firestore
            </span>
          </div>

          <div className="bg-[#100B24] border border-white/10 rounded-2xl p-3 flex flex-col">
            <span className="text-[10px] font-mono text-[#9D94B8] uppercase tracking-wider flex items-center gap-1">
              <Cloud className="w-3 h-3 text-[#00F2FE]" />
              Cloud Sync
            </span>
            <span className="text-sm font-semibold text-emerald-300 mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Connected
            </span>
            <span className="text-[10px] text-[#9D94B8] font-mono mt-0.5 truncate">
              Last: {lastLogin}
            </span>
          </div>
        </div>

        {/* Account Info Timestamps */}
        <div className="bg-[#100B24]/40 border border-white/5 rounded-2xl p-3 text-[11px] font-mono text-[#9D94B8] flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#FFE600]" />
              Member Since:
            </span>
            <span className="text-[#D1CBE8] font-semibold">{memberSince}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#00F2FE]" />
              Access Rule:
            </span>
            <span className="text-emerald-400 font-semibold">Owner-Only Private Access</span>
          </div>
        </div>

        {/* Cloud Actions (Export, Clear, Sign Out) */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
          {onExportData && (
            <button
              id="profile-export-data-btn"
              onClick={() => {
                haptic.tick();
                onExportData();
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[#F5F3FF] border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Export Cloud Journal Data (JSON)</span>
            </button>
          )}

          <button
            id="profile-sign-out-btn"
            onClick={handleSignOutClick}
            disabled={isSigningOut}
            className="w-full py-2.5 px-4 rounded-2xl bg-[#FF007F]/10 hover:bg-[#FF007F]/20 text-[#FF007F] hover:text-white border border-[#FF007F]/30 text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isSigningOut ? 'Signing Out...' : 'Sign Out of Google Account'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
