import { useState, useEffect, useCallback } from 'react';
import { TarotCard, SpreadConfig, DealtCard, ReadingRecord, DeckTheme, ReadingFocusId, AppLanguage } from './types';
import { TAROT_DECK, SPREAD_CONFIGS } from './data/tarotDeck';
import { getFocusById } from './data/readingFocuses';
import { useAuth } from './contexts/AuthContext';
import {
  saveUserReadingToCloud,
  deleteUserReadingFromCloud,
  clearAllUserReadingsFromCloud,
  subscribeToUserReadings,
  syncLocalReadingsToCloud,
} from './lib/firebase';
import AndroidStatusBar from './components/AndroidStatusBar';
import AndroidTopAppBar from './components/AndroidTopAppBar';
import AndroidBottomNav from './components/AndroidBottomNav';
import AndroidGestureBar from './components/AndroidGestureBar';
import CosmicCanvas from './components/CosmicCanvas';
import SpreadBoard from './components/SpreadBoard';
import ReadingInterpretation from './components/ReadingInterpretation';
import CardExplorer from './components/CardExplorer';
import JournalView from './components/JournalModal';
import DailyDrawView from './components/DailyDrawView';
import DivinationLoginGate from './components/DivinationLoginGate';
import CardModal from './components/CardModal';
import DailyDrawModal from './components/DailyDrawModal';
import CardReadingPopout from './components/CardReadingPopout';
import FullReadingPopoutModal from './components/FullReadingPopoutModal';
import StepGuideModal from './components/StepGuideModal';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import { sound } from './utils/audio';
import { haptic } from './utils/haptics';
import { oracleVoice } from './utils/speech';
import confetti from 'canvas-confetti';

const STORAGE_KEY_JOURNAL = 'neo_arcana_tarot_journal';
const STORAGE_KEY_THEME = 'neo_arcana_tarot_theme';
const STORAGE_KEY_LANG = 'neo_arcana_tarot_lang';

export default function App() {
  const { user, userProfile, updateUserPreferences } = useAuth();

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<'reading' | 'explorer' | 'journal' | 'daily'>('reading');
  const [inspectedCard, setInspectedCard] = useState<{ card: TarotCard; isReversed: boolean } | null>(null);
  const [isDailyDrawOpen, setIsDailyDrawOpen] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [guideModalInitialStep, setGuideModalInitialStep] = useState<number>(1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Language State ('en' | 'tl')
  const [appLanguage, setAppLanguage] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return (saved as AppLanguage) || 'en';
  });

  const handleLanguageChange = (lang: AppLanguage) => {
    setAppLanguage(lang);
    localStorage.setItem(STORAGE_KEY_LANG, lang);
    oracleVoice.setLanguage(lang);
    if (user) {
      updateUserPreferences({ language: lang });
    }
  };

  // Customization & Audio
  const [deckTheme, setDeckTheme] = useState<DeckTheme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    return (saved as DeckTheme) || 'banana-cyber';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [droneActive, setDroneActive] = useState(false);

  // Tarot Reading State (Focus: Red=Love, Blue=Future, Black=Life, Gold=Money/Fortune)
  const [readingFocus, setReadingFocus] = useState<ReadingFocusId>('love');
  const [currentSpread, setCurrentSpread] = useState<SpreadConfig>(SPREAD_CONFIGS[1]); // Default: 3-card Temporal Continuum
  const [question, setQuestion] = useState(getFocusById('love').defaultQuestions[0]);
  const [dealtCards, setDealtCards] = useState<DealtCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isCurrentReadingSaved, setIsCurrentReadingSaved] = useState(false);

  // Pop-out Reading State
  const [popoutCardIndex, setPopoutCardIndex] = useState<number | null>(null);
  const [isFullReadingPopoutOpen, setIsFullReadingPopoutOpen] = useState(false);

  // Journal History
  const [journalReadings, setJournalReadings] = useState<ReadingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_JOURNAL);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Subscribe to real-time Firestore readings when user is authenticated
  useEffect(() => {
    if (!user) {
      // Revert to local storage if user logged out
      try {
        const saved = localStorage.getItem(STORAGE_KEY_JOURNAL);
        if (saved) setJournalReadings(JSON.parse(saved));
      } catch {}
      return;
    }

    // First, sync any existing offline readings to the cloud
    try {
      const local = localStorage.getItem(STORAGE_KEY_JOURNAL);
      if (local) {
        const parsed: ReadingRecord[] = JSON.parse(local);
        if (parsed.length > 0) {
          syncLocalReadingsToCloud(user.uid, parsed);
        }
      }
    } catch (e) {
      console.error('Migration error:', e);
    }

    // Subscribe to Firestore updates
    const unsubscribe = subscribeToUserReadings(user.uid, (cloudReadings) => {
      setJournalReadings(cloudReadings);
      try {
        localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(cloudReadings));
      } catch {}
    });

    return () => unsubscribe();
  }, [user]);

  // Sync cloud preferences into local state upon user login
  useEffect(() => {
    if (userProfile?.preferences) {
      const { language, theme, soundEnabled: soundPref, droneActive: dronePref } = userProfile.preferences;
      if (language && language !== appLanguage) {
        setAppLanguage(language);
        oracleVoice.setLanguage(language);
      }
      if (theme && theme !== deckTheme) {
        setDeckTheme(theme);
      }
      if (soundPref !== undefined && soundPref !== soundEnabled) {
        setSoundEnabled(soundPref);
        sound.enabled = soundPref;
      }
      if (dronePref !== undefined && dronePref !== droneActive) {
        setDroneActive(dronePref);
      }
    }
  }, [userProfile]);

  // Save theme
  const handleThemeChange = (theme: DeckTheme) => {
    setDeckTheme(theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    if (user) {
      updateUserPreferences({ theme });
    }
  };

  // Sound toggles
  const handleToggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (user) {
      updateUserPreferences({ soundEnabled: next });
    }
  };

  const handleToggleDrone = () => {
    const active = sound.toggleDrone();
    setDroneActive(active);
    if (user) {
      updateUserPreferences({ droneActive: active });
    }
  };

  // Switch reading focus & reset board for a fresh prediction
  const handleSelectFocus = (focus: ReadingFocusId) => {
    setReadingFocus(focus);
    const focusObj = getFocusById(focus);
    setQuestion(focusObj.defaultQuestions[0]);
    setDealtCards([]);
    setAiInterpretation('');
    setIsCurrentReadingSaved(false);
    setPopoutCardIndex(null);
    setIsFullReadingPopoutOpen(false);
    setInspectedCard(null);
  };

  // Deal spread logic
  const handleShuffleAndDeal = () => {
    haptic.shuffle();
    sound.playShuffle();
    setIsShuffling(true);
    setAiInterpretation('');
    setIsCurrentReadingSaved(false);
    setPopoutCardIndex(null);
    setIsFullReadingPopoutOpen(false);

    setTimeout(() => {
      // Shuffle full deck
      const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
      const newDealt: DealtCard[] = currentSpread.slots.map((slot, index) => {
        const card = shuffled[index % shuffled.length];
        const isReversed = Math.random() < 0.28; // 28% chance of reversed orientation
        return {
          card,
          slot,
          isReversed,
          isFlipped: false,
        };
      });

      setDealtCards(newDealt);
      setIsShuffling(false);
      sound.playDeal();
    }, 2000);
  };

  // Generate AI / Procedural Oracle Interpretation
  const generateReadingSynthesis = useCallback(
    async (cards: DealtCard[], customQuestion?: string, focusId?: ReadingFocusId, targetLang?: AppLanguage) => {
      if (!cards || cards.length === 0) return;
      setIsLoadingAi(true);
      sound.playCosmicChime();
      haptic.success();

      // Trigger celebratory cosmic confetti burst
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ffe600', '#00f2fe', '#ff007f', '#ffffff'],
        });
      } catch {}

      const activeFocus = focusId || readingFocus;
      const activeQ = (customQuestion !== undefined ? customQuestion : question).trim();
      const activeLanguage = targetLang || appLanguage;

      try {
        const payload = {
          question: activeQ,
          spreadName: currentSpread.name,
          readingFocus: activeFocus,
          language: activeLanguage,
          cards: cards.map((c) => ({
            slotTitle: c.slot.title,
            slotRole: c.slot.role,
            cardName: c.card.name,
            isReversed: c.isReversed,
            keywords: c.isReversed ? c.card.reversedKeywords : c.card.uprightKeywords,
            meaning: c.isReversed ? c.card.reversedMeaning : c.card.uprightMeaning,
          })),
        };

        const response = await fetch('/api/tarot/ai-reading', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data && data.reading) {
          setAiInterpretation(data.reading);
        } else {
          setAiInterpretation(
            activeLanguage === 'tl'
              ? 'Ang pagbasa ng banal na kapalaran ay handa na. Magnilay sa mga simbolong lumabas sa iyong baraha.'
              : 'The oracle transmission is complete. Meditate on the symbols drawn.'
          );
        }
      } catch (err) {
        console.error('Error getting oracle synthesis:', err);
        setAiInterpretation(
          activeLanguage === 'tl'
            ? 'Tahimik ang mga linya ng quantum. Damhin ang kahulugan ng bawat arketipo sa iyong pagbasa.'
            : 'The quantum channels are quiet. Contemplate the archetypal meanings revealed in your spread.'
        );
      } finally {
        setIsLoadingAi(false);
      }
    },
    [question, currentSpread, readingFocus, appLanguage]
  );

  // Flip individual card & pop out its reading
  const handleFlipCard = (index: number) => {
    const isAlreadyFlipped = dealtCards[index]?.isFlipped;
    haptic.cardFlip();
    sound.playFlip();

    let updated = dealtCards;
    if (!isAlreadyFlipped) {
      updated = dealtCards.map((c, i) => (i === index ? { ...c, isFlipped: true } : c));
      setDealtCards(updated);
    }

    // Pop out the card's reading revelation immediately
    setPopoutCardIndex(index);

    // If all cards flipped, trigger synthesis
    if (updated.every((c) => c.isFlipped)) {
      setTimeout(() => {
        generateReadingSynthesis(updated, question, readingFocus);
      }, 500);
    }
  };

  // Navigate popout cards with auto-flip
  const handleNavigatePopoutCard = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < dealtCards.length) {
      if (!dealtCards[newIndex].isFlipped) {
        const updated = dealtCards.map((c, i) => (i === newIndex ? { ...c, isFlipped: true } : c));
        setDealtCards(updated);
        if (updated.every((c) => c.isFlipped)) {
          generateReadingSynthesis(updated, question, readingFocus);
        }
      }
      setPopoutCardIndex(newIndex);
    }
  };

  // Flip all cards at once and pop out reading
  const handleFlipAll = () => {
    haptic.cardFlip();
    sound.playFlip();
    const updated = dealtCards.map((c) => ({ ...c, isFlipped: true }));
    setDealtCards(updated);
    setPopoutCardIndex(0);
    setTimeout(() => {
      generateReadingSynthesis(updated, question, readingFocus);
    }, 400);
  };

  // Save current reading to Journal (Firestore Cloud + Local)
  const handleSaveToJournal = async (notes?: string, tags?: string[]) => {
    if (dealtCards.length === 0) return;

    haptic.success();
    sound.playCosmicChime();

    const newRecord: ReadingRecord = {
      id: `reading_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      question: question.trim(),
      spreadId: currentSpread.id,
      spreadName: currentSpread.name,
      cards: dealtCards.map((c) => ({
        cardId: c.card.id,
        slotId: c.slot.id,
        slotTitle: c.slot.title,
        isReversed: c.isReversed,
      })),
      aiInterpretation,
      userNotes: notes || '',
      tags: tags || [],
    };

    const updatedJournal = [newRecord, ...journalReadings];
    setJournalReadings(updatedJournal);
    setIsCurrentReadingSaved(true);

    try {
      localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(updatedJournal));
    } catch {}

    // Save directly to Firestore under authenticated user
    if (user) {
      try {
        await saveUserReadingToCloud(user.uid, newRecord);
      } catch (err) {
        console.error('Error saving to Firestore cloud:', err);
      }
    }
  };

  // Delete journal entry
  const handleDeleteReading = async (id: string) => {
    haptic.tick();
    const updated = journalReadings.filter((r) => r.id !== id);
    setJournalReadings(updated);
    try {
      localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(updated));
    } catch {}
    sound.playDeal();

    if (user) {
      try {
        await deleteUserReadingFromCloud(user.uid, id);
      } catch (err) {
        console.error('Error deleting from Firestore cloud:', err);
      }
    }
  };

  // Clear all journal
  const handleClearAllJournal = async () => {
    haptic.tick();
    setJournalReadings([]);
    try {
      localStorage.removeItem(STORAGE_KEY_JOURNAL);
    } catch {}
    sound.playDeal();

    if (user) {
      try {
        await clearAllUserReadingsFromCloud(user.uid);
      } catch (err) {
        console.error('Error clearing Firestore cloud:', err);
      }
    }
  };

  // Auto initialize first spread when user is authenticated
  useEffect(() => {
    if (user && dealtCards.length === 0) {
      handleShuffleAndDeal();
    }
  }, [user]);

  const allCardsRevealed = dealtCards.length > 0 && dealtCards.every((c) => c.isFlipped);

  return (
    <div className="min-h-screen bg-[#080612] text-[#F5F3FF] font-sans relative selection:bg-[#FFE600] selection:text-[#080612] flex flex-col justify-center items-center overflow-x-hidden p-0 sm:p-2 lg:p-4">
      {/* Immersive UI Ambient Glow Blurs */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFE600] rounded-full blur-[140px] opacity-15" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00F2FE] rounded-full blur-[140px] opacity-15" />
        <div className="absolute top-[40%] right-[-5%] w-[35%] h-[35%] bg-[#FF007F] rounded-full blur-[150px] opacity-10" />
      </div>

      {/* Background Interactive Cosmic Starfield */}
      <CosmicCanvas theme={deckTheme} />

      {/* Android Device Shell Container */}
      <div
        className={`w-full relative z-10 flex flex-col justify-between bg-[#0E091F]/95 backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] border border-white/10 transition-all ${
          isPhoneFrame
            ? 'max-w-md min-h-[92vh] sm:rounded-[40px] overflow-hidden my-auto border-zinc-700/60 ring-1 ring-white/10'
            : 'max-w-6xl min-h-screen sm:min-h-[95vh] sm:rounded-3xl overflow-hidden'
        }`}
      >
        {/* 1. Android Status Bar */}
        <AndroidStatusBar soundEnabled={soundEnabled} />

        {/* 2. Material 3 Top App Bar */}
        <AndroidTopAppBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          deckTheme={deckTheme}
          onThemeChange={handleThemeChange}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          droneActive={droneActive}
          onToggleDrone={handleToggleDrone}
          onResetReading={handleShuffleAndDeal}
          isPhoneFrame={isPhoneFrame}
          onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
          currentLanguage={appLanguage}
          onLanguageChange={handleLanguageChange}
          onOpenGuideModal={() => {
            setGuideModalInitialStep(dealtCards.length === 0 ? 1 : !allCardsRevealed ? 4 : 5);
            setIsGuideModalOpen(true);
          }}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />

        {/* 3. Main Screen View Transitions */}
        <div className="flex-1 flex flex-col overflow-y-auto pb-20">
          {/* Tab 1: Divination Spread */}
          {activeTab === 'reading' && (
            <main className="flex flex-col gap-4 animate-in fade-in duration-200">
              {!user ? (
                <DivinationLoginGate
                  onExploreCards={() => setActiveTab('explorer')}
                  onOpenGuideModal={() => {
                    setGuideModalInitialStep(1);
                    setIsGuideModalOpen(true);
                  }}
                />
              ) : (
                <>
                  <SpreadBoard
                    currentSpread={currentSpread}
                    onSelectSpread={(spread) => {
                      setCurrentSpread(spread);
                      setDealtCards([]);
                      setAiInterpretation('');
                      setPopoutCardIndex(null);
                      setIsFullReadingPopoutOpen(false);
                    }}
                    readingFocus={readingFocus}
                    onSelectFocus={handleSelectFocus}
                    question={question}
                    onQuestionChange={setQuestion}
                    dealtCards={dealtCards}
                    isShuffling={isShuffling}
                    onShuffleAndDeal={handleShuffleAndDeal}
                    onFlipCard={handleFlipCard}
                    onFlipAll={handleFlipAll}
                    onInspectCard={(item) =>
                      setInspectedCard({ card: item.card, isReversed: item.isReversed })
                    }
                    onOpenPopoutCard={(idx) => setPopoutCardIndex(idx)}
                    onOpenFullPopout={() => setIsFullReadingPopoutOpen(true)}
                    hasAiInterpretation={!!aiInterpretation}
                    onOpenGuideModal={(step) => {
                      if (step) setGuideModalInitialStep(step);
                      setIsGuideModalOpen(true);
                    }}
                    deckTheme={deckTheme}
                  />

                  {/* If all cards are revealed or synthesis is available */}
                  {allCardsRevealed && (
                    <div className="px-3 sm:px-4">
                      <ReadingInterpretation
                        currentSpread={currentSpread}
                        readingFocus={readingFocus}
                        question={question}
                        dealtCards={dealtCards}
                        aiInterpretation={aiInterpretation}
                        isLoadingAi={isLoadingAi}
                        onSaveToJournal={handleSaveToJournal}
                        isSaved={isCurrentReadingSaved}
                        onReplayReading={handleShuffleAndDeal}
                        onRegenerateAi={() => generateReadingSynthesis(dealtCards, question, readingFocus)}
                      />
                    </div>
                  )}
                </>
              )}
            </main>
          )}

          {/* Tab 2: Grimoire Archetype Explorer */}
          {activeTab === 'explorer' && (
            <main className="animate-in fade-in duration-200">
              <CardExplorer
                onSelectCard={(card) => setInspectedCard({ card, isReversed: false })}
                deckTheme={deckTheme}
              />
            </main>
          )}

          {/* Tab 3: Daily Card of the Day */}
          {activeTab === 'daily' && (
            <main className="animate-in fade-in duration-200">
              <DailyDrawView
                deckTheme={deckTheme}
                onInspectCard={(card, isReversed) => setInspectedCard({ card, isReversed })}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            </main>
          )}

          {/* Tab 4: Reading Journal */}
          {activeTab === 'journal' && (
            <main className="animate-in fade-in duration-200">
              <JournalView
                readings={journalReadings}
                onDeleteReading={handleDeleteReading}
                onClearAll={handleClearAllJournal}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            </main>
          )}
        </div>

        {/* 4. Android Fixed Bottom Navigation Bar & Home Gesture Pill */}
        <div className="sticky bottom-0 left-0 right-0 z-40 flex flex-col">
          <AndroidBottomNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            journalCount={journalReadings.length}
          />
          <AndroidGestureBar />
        </div>
      </div>

      {/* Card Reading Pop-out (Pops out when card is opened/flipped) */}
      {popoutCardIndex !== null && dealtCards[popoutCardIndex] && (
        <CardReadingPopout
          dealtCard={dealtCards[popoutCardIndex]}
          cardIndex={popoutCardIndex}
          totalCards={dealtCards.length}
          spread={currentSpread}
          readingFocus={readingFocus}
          question={question}
          theme={deckTheme}
          onClose={() => setPopoutCardIndex(null)}
          onNavigateCard={handleNavigatePopoutCard}
          onOpenFullSynthesis={() => {
            setPopoutCardIndex(null);
            setIsFullReadingPopoutOpen(true);
          }}
          onInspectSymbolism={(item) => {
            setInspectedCard({ card: item.card, isReversed: item.isReversed });
          }}
          allRevealed={allCardsRevealed}
        />
      )}

      {/* Full Spread Reading Pop-out Modal */}
      <FullReadingPopoutModal
        isOpen={isFullReadingPopoutOpen}
        onClose={() => setIsFullReadingPopoutOpen(false)}
        currentSpread={currentSpread}
        readingFocus={readingFocus}
        question={question}
        dealtCards={dealtCards}
        aiInterpretation={aiInterpretation}
        isLoadingAi={isLoadingAi}
        onSaveToJournal={handleSaveToJournal}
        isSaved={isCurrentReadingSaved}
        onReplayReading={handleShuffleAndDeal}
        onRegenerateAi={() => generateReadingSynthesis(dealtCards, question, readingFocus)}
      />

      {/* Card Inspector Material 3 Bottom Sheet */}
      {inspectedCard && (
        <CardModal
          card={inspectedCard.card}
          isReversed={inspectedCard.isReversed}
          onClose={() => setInspectedCard(null)}
          theme={deckTheme}
        />
      )}

      {/* Daily Card Draw Modal (if triggered via modal trigger) */}
      <DailyDrawModal
        isOpen={isDailyDrawOpen}
        onClose={() => setIsDailyDrawOpen(false)}
        deckTheme={deckTheme}
      />

      {/* Interactive Step-by-Step & Lore Guide Modal */}
      <StepGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        currentStepIndex={guideModalInitialStep}
        onSelectSpread={(spread) => {
          setCurrentSpread(spread);
          setDealtCards([]);
          setAiInterpretation('');
        }}
        onShuffleAndDeal={handleShuffleAndDeal}
        onFlipAll={handleFlipAll}
        onFocusQuestion={() => {
          const input = document.getElementById('focus-question-input') as HTMLInputElement;
          input?.focus();
          input?.scrollIntoView({ behavior: 'smooth' });
        }}
        onTriggerVoice={() => {
          const btn = document.getElementById('oracle-voice-play-toggle-btn');
          btn?.click();
          btn?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Google Authentication (Gmail Sign-In) Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* User Account & Security Access Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        readingsCount={journalReadings.length}
        onExportData={() => {
          const dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(
              JSON.stringify(
                {
                  account: user ? { email: user.email, uid: user.uid } : null,
                  profile: userProfile,
                  readings: journalReadings,
                },
                null,
                2
              )
            );
          const downloadAnchor = document.createElement('a');
          downloadAnchor.setAttribute('href', dataStr);
          downloadAnchor.setAttribute(
            'download',
            `tarot-leo-cloud-backup-${user ? user.email?.split('@')[0] : 'backup'}-${Date.now()}.json`
          );
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();
        }}
      />
    </div>
  );
}
