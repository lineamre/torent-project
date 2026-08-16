import { useState, useRef, useEffect, useMemo } from 'react';
import { DealtCard, SpreadConfig, AiChatMessage, ReadingFocusId } from '../types';
import { Sparkles, BookmarkPlus, Copy, Check, MessageSquare, Send, RefreshCw, Compass, HeartHandshake, Zap, ChevronDown, ChevronUp, Volume2, Languages, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sound } from '../utils/audio';
import { oracleVoice } from '../utils/speech';
import OracleVoicePlayer from './OracleVoicePlayer';
import { getFocusById } from '../data/readingFocuses';
import { translateReadingToTagalog, TAGALOG_CARD_NAMES, TAGALOG_SLOT_ROLES, TAGALOG_FOCUS_TITLES } from '../utils/tagalogTarot';

interface ReadingInterpretationProps {
  currentSpread: SpreadConfig;
  readingFocus?: ReadingFocusId;
  question: string;
  dealtCards: DealtCard[];
  aiInterpretation: string;
  isLoadingAi: boolean;
  onSaveToJournal: (notes?: string, tags?: string[]) => void;
  isSaved: boolean;
  onReplayReading: () => void;
  onRegenerateAi?: () => void;
}

export default function ReadingInterpretation({
  currentSpread,
  readingFocus = 'love',
  question,
  dealtCards,
  aiInterpretation,
  isLoadingAi,
  onSaveToJournal,
  isSaved,
  onReplayReading,
  onRegenerateAi,
}: ReadingInterpretationProps) {
  const [copied, setCopied] = useState(false);
  const [journalNotes, setJournalNotes] = useState('');
  const [showNotesForm, setShowNotesForm] = useState(false);
  const focusObj = getFocusById(readingFocus);

  // Language & Translation State (English <-> Tagalog)
  const [activeLang, setActiveLang] = useState<'en' | 'tl'>(oracleVoice.currentLanguage || 'en');
  const [tagalogInterpretation, setTagalogInterpretation] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Oracle Follow-up Chat
  const [chatMessages, setChatMessages] = useState<AiChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-speak voice on reading completion
  const spokenInterpretationRef = useRef<string | null>(null);

  // Check if original AI interpretation is already Tagalog
  const isOriginalAiTagalog = useMemo(() => {
    return (
      aiInterpretation.includes('Ang Pangkalahatang Mensahe') ||
      aiInterpretation.includes('Pagsusuri sa Bawat Baraha') ||
      aiInterpretation.includes('Larangan ng Pagbasa') ||
      aiInterpretation.includes('Banal na Paninindigan')
    );
  }, [aiInterpretation]);

  // Determine current active text instantly with zero delay
  const currentDisplayText = useMemo(() => {
    if (activeLang === 'tl') {
      if (tagalogInterpretation) return tagalogInterpretation;
      if (isOriginalAiTagalog) return aiInterpretation;
      return translateReadingToTagalog(aiInterpretation, readingFocus, question);
    } else {
      return aiInterpretation;
    }
  }, [activeLang, tagalogInterpretation, isOriginalAiTagalog, aiInterpretation, readingFocus, question]);

  // Handle Tagalog Translation
  const handleTranslateToTagalog = async () => {
    setActiveLang('tl');
    oracleVoice.setLanguage('tl');

    if (tagalogInterpretation || isOriginalAiTagalog) {
      return;
    }

    // Set immediate rich local procedural Tagalog so UI switches in 0ms
    const immediateLocal = translateReadingToTagalog(aiInterpretation, readingFocus, question);
    setTagalogInterpretation(immediateLocal);

    setIsTranslating(true);
    sound.playDeal();

    try {
      const res = await fetch('/api/tarot/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: aiInterpretation,
          targetLang: 'tl',
          readingFocus,
        }),
      });

      const data = await res.json();
      if (data && data.translatedText && data.translatedText !== aiInterpretation) {
        setTagalogInterpretation(data.translatedText);
      }
    } catch (err) {
      console.warn('Tagalog network translation fallback:', err);
    } finally {
      setIsTranslating(false);
      sound.playCosmicChime();
    }
  };

  const handleLanguageSwitch = (target: 'en' | 'tl') => {
    setActiveLang(target);
    oracleVoice.setLanguage(target);
    if (target === 'tl' && !tagalogInterpretation && !isOriginalAiTagalog) {
      handleTranslateToTagalog();
    }
  };

  // Reset tagalog cache if new AI reading generated
  useEffect(() => {
    setTagalogInterpretation('');
  }, [aiInterpretation]);

  useEffect(() => {
    if (currentDisplayText && !isLoadingAi && spokenInterpretationRef.current !== currentDisplayText) {
      spokenInterpretationRef.current = currentDisplayText;
      if (oracleVoice.autoSpeakOnFinish) {
        const timer = setTimeout(() => {
          oracleVoice.speak(currentDisplayText, undefined, activeLang);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentDisplayText, isLoadingAi, activeLang]);

  useEffect(() => {
    return () => {
      oracleVoice.stop();
    };
  }, []);

  useEffect(() => {
    if (showChat) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, showChat]);

  const handleCopyReading = () => {
    const cardSummary = dealtCards
      .map(
        (c, i) =>
          `${i + 1}. [${c.slot.title}] ${c.card.name} (${c.isReversed ? 'Reversed' : 'Upright'})\n   Keywords: ${(c.isReversed ? c.card.reversedKeywords : c.card.uprightKeywords).join(', ')}`
      )
      .join('\n');

    const textToCopy = `✦ NANO BANANA NEO-ARCANA TAROT TRANSMISSION ✦\n\nLanguage: ${activeLang === 'tl' ? 'Tagalog (Filipino)' : 'English'}\nQuestion: "${question || 'General Quantum Insight'}"\nSpread: ${currentSpread.name} (${currentSpread.subtitle})\nDate: ${new Date().toLocaleString()}\n\nCARDS DRAWN:\n${cardSummary}\n\nORACLE SYNTHESIS:\n${currentDisplayText}\n\nGenerated with Tarot Reading Leo.`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    sound.playFlip();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    sound.playDeal();

    const newHistory: AiChatMessage[] = [
      ...chatMessages,
      { role: 'user', text: userMsg, timestamp: Date.now() },
    ];
    setChatMessages(newHistory);
    setIsChatLoading(true);

    try {
      const cardsSummary = dealtCards
        .map((c) => `${c.slot.title}: ${c.card.name} (${c.isReversed ? 'Reversed' : 'Upright'})`)
        .join(', ');

      const res = await fetch('/api/tarot/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: newHistory,
          message: userMsg,
          readingContext: {
            question: question || 'General',
            spreadName: currentSpread.name,
            cardsSummary,
          },
        }),
      });

      const data = await res.json();
      if (data && data.reply) {
        setChatMessages([
          ...newHistory,
          { role: 'oracle', text: data.reply, timestamp: Date.now() },
        ]);
        sound.playFlip();
      }
    } catch {
      setChatMessages([
        ...newHistory,
        {
          role: 'oracle',
          text: 'The ethereal waves momentarily shimmer. Center your awareness in your breath; the answer you seek is already forming within.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div
      id="reading-interpretation-section"
      className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500"
    >
      {/* 1. SYNTHESIS HEADER & ACTIONS */}
      <div className="bg-[#16112B]/80 border border-[#FFE600]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col gap-6 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/3 w-80 h-20 bg-[#FFE600]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-4">
            {/* Glowing round glyph badge from Immersive UI spec */}
            <div className="w-14 h-14 rounded-full border border-[#FFE600]/40 flex items-center justify-center bg-[#FFE600]/10 text-2xl shadow-[0_0_20px_rgba(255,230,0,0.25)] flex-shrink-0">
              ✦
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${focusObj.colorHex}20`,
                    color: focusObj.colorHex,
                    borderColor: `${focusObj.colorHex}50`,
                  }}
                >
                  <span>{focusObj.icon}</span>
                  <span>{focusObj.colorName}: {focusObj.name}</span>
                </span>
                <span className="text-xs text-[#9D94B8] font-mono">
                  {new Date().toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F3FF] mt-1">
                {currentSpread.name}
              </h2>
              {question && (
                <p className="text-xs sm:text-sm text-[#9D94B8] mt-0.5 italic">
                  Focus Inquiry: "{question}"
                </p>
              )}
            </div>
          </div>

          {/* Action buttons & Resonance Meter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Arcana Resonance Indicator (from Immersive UI spec) */}
            <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-4">
              <span className="text-[10px] uppercase tracking-wider text-[#9D94B8] font-mono">Arcana Resonance</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-[#FFE600] shadow-[0_0_10px_#FFE600]" />
                </div>
                <span className="text-xs text-[#FFE600] font-mono font-bold">92%</span>
              </div>
            </div>

            <button
              id="copy-reading-btn"
              onClick={handleCopyReading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-[#D1CBE8] border border-white/10 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#FFE600]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              id="save-to-journal-trigger-btn"
              onClick={() => setShowNotesForm(!showNotesForm)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSaved
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-[#FFE600]/20 hover:bg-[#FFE600]/30 text-[#FFE600] border border-[#FFE600]/40 shadow-[0_0_15px_rgba(255,230,0,0.2)]'
              }`}
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>{isSaved ? 'Saved in Journal' : 'Save to Journal'}</span>
            </button>
          </div>
        </div>

        {/* Optional Journal Notes Dropdown */}
        {showNotesForm && (
          <div className="p-4 rounded-2xl bg-[#080612]/70 border border-[#FFE600]/30 flex flex-col gap-3 animate-in fade-in duration-200">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFE600]">
              Personal Journal Reflections & Notes
            </label>
            <textarea
              value={journalNotes}
              onChange={(e) => setJournalNotes(e.target.value)}
              placeholder="Jot down feelings, thoughts, synchronicities, or immediate action plans regarding this reading..."
              className="w-full bg-[#100B24] border border-white/15 focus:border-[#FFE600] rounded-xl p-3 text-xs sm:text-sm text-[#F5F3FF] placeholder-[#9D94B8]/50 outline-none h-20 resize-none font-sans"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNotesForm(false)}
                className="px-3 py-1.5 text-xs text-[#9D94B8] hover:text-[#F5F3FF]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onSaveToJournal(journalNotes);
                  setShowNotesForm(false);
                  sound.playCosmicChime();
                }}
                className="px-4 py-1.5 rounded-xl bg-[#FFE600] text-[#080612] font-bold text-xs hover:bg-amber-300 transition-colors shadow-[0_0_15px_rgba(255,230,0,0.3)]"
              >
                Save Reflection
              </button>
            </div>
          </div>
        )}

        {/* 2. AI ORACLE SYNTHESIS DISPLAY */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#00F2FE] flex items-center gap-2 font-bold">
              <Zap className="w-3.5 h-3.5 text-[#FFE600]" />
              {activeLang === 'tl' ? 'Pahayag at Banal na Gabay ng Oracle' : 'Oracle Transmission & Guidance'}
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switch Tabs (English <-> Tagalog) */}
              <div className="flex items-center bg-black/40 rounded-2xl p-1 border border-white/15 shadow-inner">
                <button
                  id="reading-lang-en-btn"
                  onClick={() => handleLanguageSwitch('en')}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    activeLang === 'en'
                      ? 'bg-[#FFE600] text-black shadow-[0_0_12px_rgba(255,230,0,0.35)]'
                      : 'text-[#9D94B8] hover:text-white'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>

                <button
                  id="reading-lang-tl-btn"
                  onClick={() => handleLanguageSwitch('tl')}
                  disabled={isTranslating}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    activeLang === 'tl'
                      ? 'bg-[#FFE600] text-black shadow-[0_0_12px_rgba(255,230,0,0.35)]'
                      : 'text-[#9D94B8] hover:text-white'
                  }`}
                >
                  <span>🇵🇭</span>
                  <span>{isTranslating ? 'Isinasalin...' : 'Tagalog'}</span>
                  {activeLang !== 'tl' && (
                    <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.2 rounded-full border border-red-500/30">
                      Bago
                    </span>
                  )}
                </button>
              </div>

              {onRegenerateAi && (
                <button
                  id="regenerate-ai-reading-btn"
                  onClick={onRegenerateAi}
                  disabled={isLoadingAi}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/15 text-[#FFE600] border border-[#FFE600]/30 text-xs font-mono transition-all disabled:opacity-40 active:scale-95"
                  title="Request a fresh Oracle transmission"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingAi ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{isLoadingAi ? 'Synthesizing...' : 'Re-synthesize'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Tagalog Translation Notice Banner */}
          {activeLang === 'tl' && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-red-500/15 via-blue-500/10 to-amber-500/15 border border-[#FFE600]/30 flex items-center justify-between text-xs font-mono text-[#F5F3FF]">
              <div className="flex items-center gap-2">
                <span className="text-base">🇵🇭</span>
                <span className="text-[#FFE600] font-bold">Nakatakda sa Wikang Tagalog / Filipino:</span>
                <span className="text-[#D1CBE8] hidden sm:inline">Ang pagbasa at boses ng Babaylan ay binibigkas sa Tagalog.</span>
              </div>
              <button
                onClick={() => handleLanguageSwitch('en')}
                className="text-[11px] underline text-[#00F2FE] hover:text-white ml-2 flex-shrink-0"
              >
                Switch to English
              </button>
            </div>
          )}

          {isLoadingAi ? (
            <div className="p-6 rounded-2xl bg-[#080612]/60 border border-white/5 flex items-center justify-center gap-3 text-[#D1CBE8] animate-pulse">
              <Sparkles className="w-5 h-5 text-[#FFE600] animate-spin" />
              <span className="text-sm font-mono">
                Decoupling quantum matrix & synthesizing AI Oracle prophecy...
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Oracle Voice Narration Player with Language Support */}
              <OracleVoicePlayer
                textToSpeak={currentDisplayText}
                autoSpokenOnFinish={true}
                language={activeLang}
                onLanguageChange={(lang) => handleLanguageSwitch(lang)}
                label={activeLang === 'tl' ? 'Tinig ng Babaylan (Tagalog Voice)' : 'Oracle Voice Narration'}
              />

              <div className="p-5 sm:p-8 rounded-3xl bg-[#100B24]/95 border border-[#FFE600]/30 text-[#F5F3FF] leading-relaxed text-sm sm:text-base shadow-2xl backdrop-blur-md">
                <ReactMarkdown
                  components={{
                    h3: ({ children }) => (
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#FFE600] flex items-center gap-2 mt-6 mb-3 pt-3 border-t border-white/10 first:mt-0 first:pt-0 first:border-0">
                        <Sparkles className="w-4 h-4 text-[#FFE600] flex-shrink-0" />
                        <span>{children}</span>
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="font-serif font-bold text-base text-amber-200 mt-4 mb-2">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm sm:text-base text-[#E2DCF5] leading-relaxed my-2.5 font-sans">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-white text-[#FFE600]">
                        {children}
                      </strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-2.5 my-3 pl-1 sm:pl-2 font-sans">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="space-y-2.5 my-3 pl-1 sm:pl-2 font-sans list-decimal list-inside">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm sm:text-base text-[#E2DCF5] leading-relaxed flex items-start gap-2 bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                        <span className="text-[#FFE600] font-bold mt-0.5">•</span>
                        <div className="flex-1">{children}</div>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-4 p-4 rounded-2xl bg-gradient-to-r from-[#FFE600]/15 to-purple-900/20 border-l-4 border-[#FFE600] text-amber-100 text-sm sm:text-base italic">
                        {children}
                      </blockquote>
                    ),
                    hr: () => <hr className="border-white/10 my-4" />,
                  }}
                >
                  {currentDisplayText}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* 3. CARD MATRIX BREAKDOWN */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#FFE600] flex items-center gap-1.5 font-bold">
              <Compass className="w-3.5 h-3.5" />
              {activeLang === 'tl' ? 'Pagsusuri sa bawat Baraha at Posisyon' : 'Individual Archetype Vectors'}
            </h3>
            {activeLang === 'tl' && (
              <span className="text-[10px] font-mono text-[#00F2FE] bg-[#00F2FE]/10 px-2 py-0.5 rounded-full border border-[#00F2FE]/20">
                🇵🇭 Wikang Filipino
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dealtCards.map((item, idx) => {
              const tlCardName = TAGALOG_CARD_NAMES[item.card.name] || item.card.name;
              const tlSlotRole = TAGALOG_SLOT_ROLES[item.slot.title] || item.slot.role;

              const keywords = item.isReversed
                ? item.card.reversedKeywords
                : item.card.uprightKeywords;
              const meaning = item.isReversed
                ? item.card.reversedMeaning
                : item.card.uprightMeaning;

              return (
                <div
                  key={idx}
                  id={`breakdown-card-${idx}`}
                  className="p-4 sm:p-5 rounded-2xl bg-[#100B24]/80 border border-white/10 hover:border-[#FFE600]/40 transition-all flex flex-col justify-between gap-3 shadow-lg group backdrop-blur-md"
                >
                  <div>
                    {/* Position and Orientation */}
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-[#FFE600] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        {item.slot.icon && <span>{item.slot.icon}</span>}
                        <span>{item.slot.title}</span>
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          item.isReversed
                            ? 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/40'
                            : 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40'
                        }`}
                      >
                        {item.isReversed
                          ? (activeLang === 'tl' ? '↺ Pabaligtad' : '↺ Reversed')
                          : (activeLang === 'tl' ? '✦ Nakatayo' : '✦ Upright')}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#9D94B8] font-mono mb-2">
                      {activeLang === 'tl' ? tlSlotRole : item.slot.role}
                    </div>

                    {/* Card Name */}
                    <div className="flex items-center gap-2 font-serif font-bold text-base text-[#F5F3FF]">
                      <span>{item.card.icon}</span>
                      <span>{activeLang === 'tl' ? tlCardName : item.card.name}</span>
                      {activeLang === 'tl' && (
                        <span className="text-[10px] text-[#9D94B8] font-sans font-normal">
                          ({item.card.name})
                        </span>
                      )}
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1.5 my-2.5">
                      {keywords.slice(0, 3).map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#D1CBE8] border border-white/10"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* Meaning */}
                    <p className="text-xs text-[#D1CBE8] leading-relaxed mt-1">
                      {meaning}
                    </p>
                  </div>

                  {/* Advice & Affirmation */}
                  <div className="pt-2 border-t border-white/10 text-[11px] text-amber-200/90 italic flex items-center gap-1.5">
                    <HeartHandshake className="w-3 h-3 text-[#FFE600] flex-shrink-0" />
                    <span>"{item.card.affirmation}"</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. INTERACTIVE ORACLE FOLLOW-UP CHAT */}
        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          <button
            id="toggle-oracle-chat-btn"
            onClick={() => setShowChat(!showChat)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[#F5F3FF] border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <MessageSquare className="w-4 h-4 text-[#FFE600]" />
              <span>Consult the Cyber-Oracle (Ask Follow-up Questions)</span>
              {chatMessages.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FFE600]/20 text-[#FFE600] text-[10px] font-mono">
                  {chatMessages.length} Messages
                </span>
              )}
            </div>
            {showChat ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-[#9D94B8]" />}
          </button>

          {showChat && (
            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[#080612]/90 border border-white/10 animate-in fade-in duration-200">
              {/* Message log */}
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                {chatMessages.length === 0 ? (
                  <div className="text-xs text-[#9D94B8] text-center py-4 italic">
                    Have a question about a specific card or how to apply this reading? Ask the Nano Banana Oracle below.
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'ml-auto bg-[#FFE600]/20 text-[#F5F3FF] border border-[#FFE600]/40 rounded-tr-sm'
                          : 'mr-auto bg-[#100B24] text-[#D1CBE8] border border-white/10 rounded-tl-sm'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold text-[#FFE600] mb-0.5">
                        {msg.role === 'user' ? '✦ You' : '⚡ Cyber-Oracle'}
                      </span>
                      <p>{msg.text}</p>
                    </div>
                  ))
                )}
                {isChatLoading && (
                  <div className="flex items-center gap-2 text-xs text-[#FFE600] font-mono p-2 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Oracle is attuning to your inquiry...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendChatMessage();
                  }}
                  placeholder="Ask a clarifying question about your cards..."
                  className="flex-1 bg-[#100B24] border border-white/15 focus:border-[#FFE600] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F5F3FF] placeholder-[#9D94B8]/50 outline-none"
                />
                <button
                  onClick={handleSendChatMessage}
                  disabled={!chatInput.trim() || isChatLoading}
                  className="p-2.5 rounded-xl bg-[#FFE600] text-[#080612] font-bold hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(255,230,0,0.3)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
