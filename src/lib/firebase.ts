import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ReadingRecord, DeckTheme, AppLanguage } from '../types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Cloud Firestore using database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: number;
  lastLoginAt: number;
  preferences: {
    language: AppLanguage;
    theme: DeckTheme;
    soundEnabled: boolean;
    droneActive: boolean;
    autoVoice: boolean;
  };
  stats: {
    totalReadings: number;
    dailyDrawsCount: number;
    lastReadingAt?: number;
  };
}

export interface UserDailyDrawRecord {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  cardId: number;
  cardName: string;
  isReversed: boolean;
  userNotes?: string;
}

// ----------------- AUTHENTICATION METHODS -----------------

/**
 * Sign in with Google (Gmail)
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await syncUserProfile(user);
    return user;
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign Out Error:', error);
    throw error;
  }
}

/**
 * Subscribe to Auth State Changes
 */
export function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// ----------------- FIRESTORE USER PROFILE -----------------

/**
 * Sync or create user profile document upon authentication
 */
export async function syncUserProfile(
  user: User,
  customPrefs?: Partial<UserProfileData['preferences']>
): Promise<UserProfileData> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  const now = Date.now();

  if (snap.exists()) {
    const existing = snap.data() as UserProfileData;
    const updated: Partial<UserProfileData> = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLoginAt: now,
    };
    if (customPrefs) {
      updated.preferences = {
        ...existing.preferences,
        ...customPrefs,
      };
    }
    await updateDoc(userRef, updated);
    return { ...existing, ...updated } as UserProfileData;
  } else {
    const newProfile: UserProfileData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Mystic Seeker',
      photoURL: user.photoURL,
      createdAt: now,
      lastLoginAt: now,
      preferences: {
        language: customPrefs?.language || 'en',
        theme: customPrefs?.theme || 'banana-cyber',
        soundEnabled: customPrefs?.soundEnabled ?? true,
        droneActive: customPrefs?.droneActive ?? false,
        autoVoice: customPrefs?.autoVoice ?? false,
      },
      stats: {
        totalReadings: 0,
        dailyDrawsCount: 0,
      },
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  }
}

/**
 * Fetch User Profile
 */
export async function getUserProfile(uid: string): Promise<UserProfileData | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfileData;
    }
    return null;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return null;
  }
}

/**
 * Update user preferences in cloud
 */
export async function updateUserCloudPreferences(
  uid: string,
  prefs: Partial<UserProfileData['preferences']>
) {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      preferences: prefs,
    });
  } catch (err) {
    console.error('Error updating user preferences:', err);
  }
}

// ----------------- FIRESTORE USER READINGS -----------------

/**
 * Save a tarot reading record into the user's private Firestore subcollection
 */
export async function saveUserReadingToCloud(
  uid: string,
  reading: ReadingRecord
): Promise<void> {
  try {
    const readingRef = doc(db, 'users', uid, 'readings', reading.id);
    await setDoc(readingRef, {
      ...reading,
      userId: uid,
      updatedAt: serverTimestamp(),
    });

    // Increment user's total readings count
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as UserProfileData;
      const currentCount = data.stats?.totalReadings || 0;
      await updateDoc(userRef, {
        'stats.totalReadings': currentCount + 1,
        'stats.lastReadingAt': reading.timestamp,
      });
    }
  } catch (err) {
    console.error('Error saving reading to Firestore:', err);
    throw err;
  }
}

/**
 * Fetch all readings for a specific user from Firestore
 */
export async function getUserReadingsFromCloud(uid: string): Promise<ReadingRecord[]> {
  try {
    const readingsCol = collection(db, 'users', uid, 'readings');
    const q = query(readingsCol, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const records: ReadingRecord[] = [];
    snapshot.forEach((docSnap) => {
      records.push(docSnap.data() as ReadingRecord);
    });
    return records;
  } catch (err) {
    console.error('Error getting readings from cloud:', err);
    return [];
  }
}

/**
 * Real-time listener for user readings
 */
export function subscribeToUserReadings(
  uid: string,
  onUpdate: (readings: ReadingRecord[]) => void
) {
  const readingsCol = collection(db, 'users', uid, 'readings');
  const q = query(readingsCol, orderBy('timestamp', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const records: ReadingRecord[] = [];
      snapshot.forEach((docSnap) => {
        records.push(docSnap.data() as ReadingRecord);
      });
      onUpdate(records);
    },
    (error) => {
      console.error('Error in readings snapshot listener:', error);
    }
  );
}

/**
 * Delete a user reading from Firestore
 */
export async function deleteUserReadingFromCloud(uid: string, readingId: string): Promise<void> {
  try {
    const readingRef = doc(db, 'users', uid, 'readings', readingId);
    await deleteDoc(readingRef);

    // Update count
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as UserProfileData;
      const currentCount = Math.max(0, (data.stats?.totalReadings || 1) - 1);
      await updateDoc(userRef, {
        'stats.totalReadings': currentCount,
      });
    }
  } catch (err) {
    console.error('Error deleting reading from cloud:', err);
    throw err;
  }
}

/**
 * Clear all user readings from Firestore
 */
export async function clearAllUserReadingsFromCloud(uid: string): Promise<void> {
  try {
    const readingsCol = collection(db, 'users', uid, 'readings');
    const snapshot = await getDocs(readingsCol);
    const batch = writeBatch(db);
    snapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    await batch.commit();

    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      'stats.totalReadings': 0,
    });
  } catch (err) {
    console.error('Error clearing readings from cloud:', err);
    throw err;
  }
}

/**
 * Sync local offline journal records to Cloud upon first login
 */
export async function syncLocalReadingsToCloud(uid: string, localReadings: ReadingRecord[]): Promise<void> {
  if (!localReadings || localReadings.length === 0) return;
  try {
    const cloudReadings = await getUserReadingsFromCloud(uid);
    const cloudIds = new Set(cloudReadings.map((r) => r.id));

    const toUpload = localReadings.filter((r) => !cloudIds.has(r.id));
    if (toUpload.length === 0) return;

    const batch = writeBatch(db);
    toUpload.forEach((reading) => {
      const docRef = doc(db, 'users', uid, 'readings', reading.id);
      batch.set(docRef, {
        ...reading,
        userId: uid,
      });
    });
    await batch.commit();

    // Update total count
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      'stats.totalReadings': cloudReadings.length + toUpload.length,
    });
  } catch (err) {
    console.error('Error migrating local readings to Firestore:', err);
  }
}

// ----------------- FIRESTORE USER DAILY DRAWS -----------------

/**
 * Save user daily solar draw
 */
export async function saveUserDailyDrawToCloud(
  uid: string,
  draw: UserDailyDrawRecord
): Promise<void> {
  try {
    const drawRef = doc(db, 'users', uid, 'daily_draws', draw.date);
    await setDoc(drawRef, {
      ...draw,
      userId: uid,
      updatedAt: serverTimestamp(),
    });

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as UserProfileData;
      const count = (data.stats?.dailyDrawsCount || 0) + 1;
      await updateDoc(userRef, {
        'stats.dailyDrawsCount': count,
      });
    }
  } catch (err) {
    console.error('Error saving daily draw to cloud:', err);
  }
}
