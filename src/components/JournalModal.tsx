import { useState } from 'react';
import { ReadingRecord } from '../types';
import { TAROT_DECK } from '../data/tarotDeck';
import { useAuth } from '../contexts/AuthContext';
import {
  BookmarkCheck,
  Trash2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  Cloud,
  Search,
  LogIn,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Flame,
  Moon,
  Coins,
  Shield,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface JournalViewProps {
  readings: ReadingRecord[];
  onDeleteReading: (id: string) => void;
  onClearAll: () => void;
  onOpenAuthModal?: () => void;
}

export default function JournalView({
  readings,
  onDeleteReading,
  onClearAll,
  onOpenAuthModal,
}: JournalViewProps) {
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredReadings = readings.filter((r) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      r.question.toLowerCase().includes(q) ||
      r.spreadName.toLowerCase().includes(q) ||
      r.userNotes?.toLowerCase().includes(q) ||
      r.cards.some((c) => {
        const card = TAROT_DECK.find((d) => d.id === c.cardId);
        return card?.name.toLowerCase().includes(q);
      })
    );
  });

  const handleExportJournal = () => {
    haptic.tick();
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            user: user ? { email: user.email, uid: user.uid } : null,
            totalReadings: readings.length,
            readings,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `tarot-leo-journal-${user ? user.email?.split('@')[0] : 'offline'}-${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    sound.playCosmicChime();
  };

  const handleCopyReading = (reading: ReadingRecord) => {
    haptic.tick();
    const cardList = reading.cards
      .map((c) => {
        const card = TAROT_DECK.find((d) => d.id === c.cardId);
        return `• ${c.slotTitle}: ${card?.name || 'Card'} (${c.isReversed ? 'Reversed ↺' : 'Upright ✦'})`;
      })
      .join('\n');

    const text = `♌ Tarot Reading Leo — Transmission Record\nQuestion: "${reading.question}"\nSpread: ${reading.spreadName}\nDate: ${new Date(reading.timestamp).toLocaleString()}\n\nCards:\n${cardList}\n\nInterpretation:\n${reading.aiInterpretation || 'None'}\n${reading.userNotes ? `\nPersonal Reflections:\n${reading.userNotes}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedId(reading.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="journal-view-main" className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 flex flex-col gap-4">
      {/* Material 3 Header Summary Bar */}
      <div className="bg-[#16112B]/90 border border-white/15 rounded-3xl p-4 sm:p-6 backdrop-blur-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1.5">
              <BookmarkCheck className="w-3.5 h-3.5" />
              Destiny Records
            </span>
            <span className="text-[11px] text-[#9D94B8] font-mono">
              {readings.length} {readings.length === 1 ? 'Reading' : 'Readings'}
            </span>

            {/* Cloud Sync Status Badge */}
            {user ? (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Cloud className="w-3 h-3" />
                <span>Synced: {user.email}</span>
              </span>
            ) : (
              <span className="text-[10px] font-mono text-[#9D94B8] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
                <Cloud className="w-3 h-3 text-zinc-500" />
                <span>Local Storage</span>
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F3FF] mt-1">
            Personal Tarot Journal
          </h2>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          {/* Sign In prompt if logged out */}
          {!user && onOpenAuthModal && (
            <button
              onClick={() => {
                haptic.tick();
                onOpenAuthModal();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-bold active:scale-95 transition-all shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-600" />
              <span>Sync with Google</span>
            </button>
          )}

          {readings.length > 0 && (
            <>
              <button
                id="export-journal-btn"
                onClick={handleExportJournal}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-[#F5F3FF] border border-white/10 text-xs font-semibold active:scale-95 transition-all"
                title="Export structured reading records JSON"
              >
                <Download className="w-3.5 h-3.5 text-[#FFE600]" />
                <span>Export JSON</span>
              </button>
              <button
                id="clear-all-readings-btn"
                onClick={() => {
                  haptic.tick();
                  if (
                    window.confirm(
                      user
                        ? 'Are you sure you want to delete all saved readings from your personal Google Cloud Firestore journal?'
                        : 'Are you sure you want to clear your local tarot journal history?'
                    )
                  ) {
                    onClearAll();
                  }
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#FF007F]/10 hover:bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/30 text-xs active:scale-95 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {readings.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-[#9D94B8] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search questions, spreads, card names, or notes..."
            className="w-full bg-[#16112B]/70 border border-white/10 focus:border-[#FFE600]/50 rounded-2xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-[#9D94B8] focus:outline-none transition-colors"
          />
        </div>
      )}

      {/* Reading List */}
      {readings.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#16112B]/40 border border-white/5 flex flex-col items-center gap-3 text-[#9D94B8]">
          <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
            📜
          </div>
          <h3 className="font-serif text-lg font-bold text-[#F5F3FF]">No Saved Transmissions</h3>
          <p className="text-xs sm:text-sm text-[#9D94B8] max-w-sm leading-relaxed">
            Perform a reading on the <strong>Divination</strong> tab, then tap <strong>Save to Journal</strong> to preserve your insights into your Firestore database.
          </p>
          {!user && onOpenAuthModal && (
            <button
              onClick={() => {
                haptic.tick();
                onOpenAuthModal();
              }}
              className="mt-2 px-5 py-2.5 rounded-2xl bg-[#FFE600] text-black font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(255,230,0,0.3)] active:scale-95 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign in with Google to enable Cloud Journal</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3 pb-6">
          {filteredReadings.map((reading) => {
            const isExpanded = expandedId === reading.id;
            const isCopied = copiedId === reading.id;
            return (
              <div
                key={reading.id}
                id={`journal-reading-${reading.id}`}
                className="bg-[#16112B]/85 border border-white/10 hover:border-[#FFE600]/40 rounded-3xl p-4 sm:p-5 backdrop-blur-xl transition-all flex flex-col gap-3 shadow-md"
              >
                {/* Header Summary */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
                  onClick={() => {
                    haptic.tick();
                    setExpandedId(isExpanded ? null : reading.id);
                    sound.playDeal();
                  }}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-[#9D94B8] font-mono flex-wrap">
                      <Calendar className="w-3 h-3 text-[#FFE600]" />
                      <span>
                        {new Date(reading.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span>•</span>
                      <span className="text-[#FFE600] font-bold">{reading.spreadName}</span>
                      {user && (
                        <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                          Cloud
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#F5F3FF] truncate">
                      {reading.question ? `"${reading.question}"` : 'General Quantum Transmission'}
                    </h3>

                    {/* Cards preview badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      {reading.cards.map((c, i) => {
                        const card = TAROT_DECK.find((d) => d.id === c.cardId);
                        return (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-0.5 rounded-xl bg-[#100B24] border border-white/10 text-[#D1CBE8] flex items-center gap-1"
                          >
                            <span>{card?.icon}</span>
                            <span>{card?.name}</span>
                            <span className="text-[10px] text-[#FFE600]">
                              {c.isReversed ? '↺' : '✦'}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Copy button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyReading(reading);
                      }}
                      className="p-2 rounded-xl text-[#9D94B8] hover:text-[#FFE600] hover:bg-white/5 transition-colors"
                      title="Copy reading summary"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        haptic.tick();
                        onDeleteReading(reading.id);
                      }}
                      className="p-2 rounded-xl text-[#9D94B8] hover:text-[#FF007F] hover:bg-white/5 transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="p-2 rounded-xl bg-white/5 text-[#9D94B8]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-3 border-t border-white/10 flex flex-col gap-3 animate-in fade-in duration-200">
                    {/* User Notes */}
                    {reading.userNotes && (
                      <div className="p-3.5 rounded-2xl bg-[#FFE600]/10 border border-[#FFE600]/30 text-xs text-[#F5F3FF] leading-relaxed">
                        <span className="font-bold text-[#FFE600] block mb-1 font-mono">
                          ✦ Personal Reflections:
                        </span>
                        {reading.userNotes}
                      </div>
                    )}

                    {/* Card by Card breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {reading.cards.map((c, i) => {
                        const card = TAROT_DECK.find((d) => d.id === c.cardId);
                        if (!card) return null;
                        return (
                          <div
                            key={i}
                            className="bg-[#100B24] border border-white/10 rounded-2xl p-3 flex flex-col gap-1 text-xs"
                          >
                            <span className="text-[10px] font-mono text-[#FFE600] font-bold uppercase truncate">
                              {c.slotTitle}
                            </span>
                            <div className="flex items-center gap-1.5 font-serif font-bold text-white">
                              <span>{card.icon}</span>
                              <span className="truncate">{card.name}</span>
                              <span className="text-[10px] text-[#00F2FE] font-mono">
                                ({c.isReversed ? 'Rev' : 'Up'})
                              </span>
                            </div>
                            <p className="text-[11px] text-[#9D94B8] leading-relaxed line-clamp-3">
                              {c.isReversed ? card.reversedMeaning : card.uprightMeaning}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* AI Oracle Synthesis */}
                    {reading.aiInterpretation && (
                      <div className="p-4 rounded-2xl bg-[#080612]/70 border border-white/10 text-xs sm:text-sm text-[#D1CBE8] prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-[#FFE600] font-serif italic leading-relaxed">
                        <ReactMarkdown>{reading.aiInterpretation}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
