import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  onAuthChanged,
  signInWithGoogle,
  signOutUser,
  getUserProfile,
  syncUserProfile,
  UserProfileData,
  syncLocalReadingsToCloud,
} from '../lib/firebase';
import { ReadingRecord, DeckTheme, AppLanguage } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfileData | null;
  isLoadingAuth: boolean;
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void>;
  updateUserPreferences: (prefs: Partial<UserProfileData['preferences']>) => Promise<void>;
  syncLocalHistory: (localReadings: ReadingRecord[]) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    const unsubscribe = onAuthChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profile = await syncUserProfile(currentUser);
          setUserProfile(profile);
        } catch (err: any) {
          console.error('Error syncing profile:', err);
        }
      } else {
        setUserProfile(null);
      }
      setIsLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async (): Promise<User | null> => {
    try {
      setError(null);
      setIsLoadingAuth(true);
      const signedInUser = await signInWithGoogle();
      const profile = await getUserProfile(signedInUser.uid);
      setUserProfile(profile);
      return signedInUser;
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      let errorMsg = 'Failed to sign in with Google.';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign-in popup was closed before completing.';
      } else if (err.code === 'auth/popup-blocked') {
        errorMsg = 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      } else if (err.code === 'auth/unauthorized-domain') {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'your-site.netlify.app';
        errorMsg = `Unauthorized Domain (${currentHost}): Please add "${currentHost}" to Firebase Console -> Authentication -> Settings -> Authorized Domains.`;
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
      return null;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      await signOutUser();
      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      console.error('Sign-out failed:', err);
      setError(err.message || 'Failed to sign out.');
    }
  };

  const updateUserPreferences = async (prefs: Partial<UserProfileData['preferences']>) => {
    if (!user) return;
    try {
      const updated = await syncUserProfile(user, prefs);
      setUserProfile(updated);
    } catch (err) {
      console.error('Error updating preferences:', err);
    }
  };

  const syncLocalHistory = async (localReadings: ReadingRecord[]) => {
    if (!user) return;
    try {
      await syncLocalReadingsToCloud(user.uid, localReadings);
      const profile = await getUserProfile(user.uid);
      if (profile) setUserProfile(profile);
    } catch (err) {
      console.error('Error syncing local history to cloud:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isLoadingAuth,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
        updateUserPreferences,
        syncLocalHistory,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
