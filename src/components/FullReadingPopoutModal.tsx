import { DealtCard, SpreadConfig, DeckTheme, ReadingFocusId } from '../types';
import { X, Sparkles, Wand2 } from 'lucide-react';
import ReadingInterpretation from './ReadingInterpretation';
import { haptic } from '../utils/haptics';
import { getFocusById } from '../data/readingFocuses';

interface FullReadingPopoutModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function FullReadingPopoutModal({
  isOpen,
  onClose,
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
}: FullReadingPopoutModalProps) {
  if (!isOpen) return null;
  const focusObj = getFocusById(readingFocus);

  return (
    <div
      id="full-reading-popout-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-250"
      onClick={() => {
        haptic.tick();
        onClose();
      }}
    >
      <div
        id="full-reading-popout-container"
        className="relative w-full max-w-4xl bg-[#140E29]/98 border-t sm:border rounded-t-3xl sm:rounded-3xl shadow-2xl text-[#F5F3FF] overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col backdrop-blur-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-250"
        style={{ borderColor: `${focusObj.colorHex}50` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Android Material 3 Drag Handle */}
        <div className="w-12 h-1.5 rounded-full bg-white/30 mx-auto mt-3 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3 border-b border-white/10 bg-[#16112B]/90 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: focusObj.colorHex }} />
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: focusObj.colorHex }}
            >
              <span>{focusObj.icon}</span>
              {focusObj.name} Oracle Reading Pop-Out
            </span>
          </div>

          <button
            id="full-reading-popout-close-btn"
            onClick={() => {
              haptic.tick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#9D94B8] hover:text-[#F5F3FF] border border-white/10 transition-colors active:scale-90"
            title="Close Pop-Out"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4">
          <ReadingInterpretation
            currentSpread={currentSpread}
            readingFocus={readingFocus}
            question={question}
            dealtCards={dealtCards}
            aiInterpretation={aiInterpretation}
            isLoadingAi={isLoadingAi}
            onSaveToJournal={onSaveToJournal}
            isSaved={isSaved}
            onReplayReading={() => {
              onReplayReading();
              onClose();
            }}
            onRegenerateAi={onRegenerateAi}
          />
        </div>
      </div>
    </div>
  );
}
