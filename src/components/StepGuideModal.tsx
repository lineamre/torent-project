import { useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  Zap,
  Shuffle,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Compass,
  HeartHandshake,
  Layers,
  HelpCircle,
  Sun,
  Flame,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { SPREAD_CONFIGS } from '../data/tarotDeck';
import { SpreadConfig } from '../types';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface StepGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStepIndex: number;
  onSelectSpread?: (spread: SpreadConfig) => void;
  onShuffleAndDeal?: () => void;
  onFlipAll?: () => void;
  onFocusQuestion?: () => void;
  onTriggerVoice?: () => void;
}

export default function StepGuideModal({
  isOpen,
  onClose,
  currentStepIndex,
  onSelectSpread,
  onShuffleAndDeal,
  onFlipAll,
  onFocusQuestion,
  onTriggerVoice,
}: StepGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'steps' | 'spreads' | 'wisdom' | 'voice'>('steps');
  const [selectedStep, setSelectedStep] = useState<number>(currentStepIndex || 1);

  if (!isOpen) return null;

  const readingSteps = [
    {
      step: 1,
      title: 'Choose Your Sacred Spread',
      subtitle: 'Select the geometric matrix that fits your inquiry',
      icon: Layers,
      color: '#FFE600',
      actionLabel: 'Browse Spreads',
      description:
        'Every spread arranges cards in specific positional relationships. Choose a Single Card for a daily focus, the 3-Card Continuum for temporal flow (Past/Present/Future), or the 10-Card Celtic Cross for deep life exploration.',
      tips: [
        'Single Card: Quick daily guidance or binary decisions',
        '3-Card Temporal: Past influences, current reality, and upcoming trajectory',
        'Decision Matrix: Comparing two divergent pathways',
        'Celtic Cross: Comprehensive panoramic life audit',
      ],
      action: () => {
        onClose();
        const el = document.getElementById('spread-select-single');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      step: 2,
      title: 'Channel Your Inquiry & Intent',
      subtitle: 'Anchor your conscious awareness onto your question',
      icon: Zap,
      color: '#00F2FE',
      actionLabel: 'Set Question',
      description:
        'Formulate an open-ended question that fosters personal empowerment, clarity, and self-reflection rather than passive fate.',
      tips: [
        'Prefer "What energy should I embody..." over "Will I get..."',
        'Ask "How can I overcome this roadblock..." for actionable counsel',
        'Tap the "Inspire Intent" bulb for pre-tuned quantum prompts',
        'Leaving the field open invites a pure spontaneous cosmic transmission',
      ],
      action: () => {
        onClose();
        if (onFocusQuestion) {
          onFocusQuestion();
        } else {
          const input = document.getElementById('focus-question-input') as HTMLInputElement;
          input?.focus();
          input?.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      step: 3,
      title: 'Shuffle & Cast Into the Field',
      subtitle: 'Activate the 78-card archetypal matrix',
      icon: Shuffle,
      color: '#FF007F',
      actionLabel: 'Shuffle & Deal Now',
      description:
        'Tap the Shuffle & Deal button to randomize the deck with realistic physics and deal face-down cards into the active spread positions.',
      tips: [
        'Take a deep breath and center your mind during the shuffle',
        'Each draw incorporates upright and reversed archetypal polarities',
        'Procedural audio frequencies harmonize with the deal',
      ],
      action: () => {
        onClose();
        if (onShuffleAndDeal) {
          onShuffleAndDeal();
        } else {
          const btn = document.getElementById('shuffle-and-deal-btn');
          btn?.click();
        }
      },
    },
    {
      step: 4,
      title: 'Touch & Reveal the Arcana',
      subtitle: 'Flip each card to discover its positional guidance',
      icon: Sparkles,
      color: '#FFE600',
      actionLabel: 'Reveal Cards',
      description:
        'Touch cards individually to flip them with authentic haptic feedback, or tap "Reveal All" to unveil the complete constellation simultaneously.',
      tips: [
        'Upright cards represent direct, outward, unhindered expression',
        'Reversed cards signal internal reflection, blockage, or inverted lessons',
        'Tap "Pop Out Reading" on any revealed card for deep position insight',
      ],
      action: () => {
        onClose();
        if (onFlipAll) {
          onFlipAll();
        } else {
          const btn = document.getElementById('flip-all-cards-btn');
          btn?.click();
        }
      },
    },
    {
      step: 5,
      title: 'Receive Oracle Synthesis & Voice',
      subtitle: 'Listen to the integrated reading from the Tarot Leo Oracle',
      icon: Volume2,
      color: '#A78BFA',
      actionLabel: 'Listen to Oracle',
      description:
        'Once all cards are unveiled, the Tarot Reading Leo Oracle weaves the archetypes into a cohesive psychological and spiritual narrative, spoken aloud via high-fidelity female voice narration.',
      tips: [
        'Listen with headphones for a meditative immersive experience',
        'Adjust voice cadence (0.85x–1.1x) and pitch tone in the player',
        'Ask follow-up questions in the interactive Oracle Chat console',
        'Save your reading to the permanent Reading Journal',
      ],
      action: () => {
        onClose();
        if (onTriggerVoice) {
          onTriggerVoice();
        } else {
          const btn = document.getElementById('oracle-voice-play-toggle-btn');
          btn?.click();
          btn?.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  ];

  return (
    <div
      id="step-guide-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="step-guide-modal-card"
        className="w-full max-w-2xl bg-[#140E29] border border-[#FFE600]/30 rounded-3xl shadow-2xl text-[#F5F3FF] flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#1C1238] to-[#120B26]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFE600]/25 to-amber-500/20 border border-[#FFE600]/40 flex items-center justify-center text-lg text-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.3)]">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  Tarot Reading Leo Guide & Steps
                </h3>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/30">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-[#9D94B8] font-mono">
                Master the arcana, sacred spreads & Oracle voice reading
              </p>
            </div>
          </div>

          <button
            id="close-step-guide-modal-btn"
            onClick={() => {
              haptic.tick();
              onClose();
            }}
            className="p-2 rounded-2xl bg-white/5 hover:bg-white/15 text-[#9D94B8] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Chips */}
        <div className="flex items-center gap-1.5 p-2 sm:px-4 bg-[#0E091D] border-b border-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'steps', label: '5-Step Reading Flow', icon: Zap },
            { id: 'spreads', label: 'Sacred Spreads', icon: Layers },
            { id: 'wisdom', label: 'Tarot Wisdom & Leo Lore', icon: Sun },
            { id: 'voice', label: 'Voice & Oracle Audio', icon: Volume2 },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`guide-tab-${tab.id}`}
                onClick={() => {
                  haptic.tick();
                  sound.playDeal();
                  setActiveTab(tab.id as any);
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-2xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#FFE600] text-black shadow-[0_0_15px_rgba(255,230,0,0.3)]'
                    : 'text-[#9D94B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 text-xs sm:text-sm text-[#D1CBE8]">
          {/* TAB 1: 5-STEP INTERACTIVE ROADMAP */}
          {activeTab === 'steps' && (
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-2xl bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-between">
                <span className="text-xs text-[#FFE600] font-mono font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tap any step below to explore tips and trigger immediate action
                </span>
                <span className="text-[10px] font-mono text-white/70">
                  Step {selectedStep} of 5
                </span>
              </div>

              {/* Clickable Step Selector Bar */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {readingSteps.map((s) => {
                  const isSelected = selectedStep === s.step;
                  const isCurrent = currentStepIndex === s.step;
                  const isDone = currentStepIndex > s.step;
                  const StepIcon = s.icon;
                  return (
                    <button
                      key={s.step}
                      id={`step-guide-select-${s.step}`}
                      onClick={() => {
                        haptic.tick();
                        sound.playFlip();
                        setSelectedStep(s.step);
                      }}
                      className={`p-2 sm:p-2.5 rounded-2xl border flex flex-col items-center text-center transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#FFE600]/20 border-[#FFE600] text-white shadow-[0_0_15px_rgba(255,230,0,0.25)]'
                          : isCurrent
                          ? 'bg-[#00F2FE]/15 border-[#00F2FE]/60 text-[#00F2FE]'
                          : isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-[#100B24] border-white/10 text-[#9D94B8] hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-1">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <StepIcon className="w-4 h-4" style={{ color: isSelected ? '#FFE600' : undefined }} />
                        )}
                      </div>
                      <span className="font-mono text-[10px] font-bold">Step {s.step}</span>
                      <span className="text-[9px] truncate w-full hidden sm:inline text-[#9D94B8] mt-0.5">
                        {s.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Step Deep Dive Card */}
              {(() => {
                const currentData = readingSteps.find((s) => s.step === selectedStep) || readingSteps[0];
                const IconComponent = currentData.icon;
                return (
                  <div className="p-4 sm:p-5 rounded-3xl bg-[#100B24] border border-white/15 flex flex-col gap-3 shadow-inner">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                          style={{ backgroundColor: `${currentData.color}25`, border: `1px solid ${currentData.color}` }}
                        >
                          <IconComponent className="w-4 h-4" style={{ color: currentData.color }} />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                            Step {currentData.step}: {currentData.title}
                          </h4>
                          <p className="text-[11px] text-[#9D94B8]">{currentData.subtitle}</p>
                        </div>
                      </div>

                      <button
                        id={`execute-step-${currentData.step}-btn`}
                        onClick={() => {
                          haptic.cardSelect();
                          sound.playCosmicChime();
                          currentData.action();
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#FFE600] text-black font-mono font-bold text-xs hover:bg-amber-300 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                      >
                        <span>{currentData.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-[#D1CBE8] leading-relaxed">
                      {currentData.description}
                    </p>

                    <div className="bg-[#181133] p-3 rounded-2xl border border-white/10 flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1">
                        <Lightbulb className="w-3 h-3 text-[#FFE600]" />
                        Key Divinatory Recommendations
                      </span>
                      <ul className="space-y-1">
                        {currentData.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-[#9D94B8] flex items-start gap-2">
                            <span className="text-[#FFE600] font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 2: SACRED SPREADS */}
          {activeTab === 'spreads' && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-[#9D94B8] leading-relaxed">
                Choose the geometric archetype arrangement matching the granularity of your inquiry:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPREAD_CONFIGS.map((sp) => (
                  <div
                    key={sp.id}
                    className="p-4 rounded-2xl bg-[#100B24] border border-white/10 hover:border-[#FFE600]/40 transition-all flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-sm text-[#FFE600]">{sp.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30">
                          {sp.cardCount} {sp.cardCount === 1 ? 'Card' : 'Cards'}
                        </span>
                      </div>
                      <p className="text-xs text-[#9D94B8] mb-2">{sp.subtitle}</p>
                      <div className="flex flex-wrap gap-1">
                        {sp.slots.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 text-[#D1CBE8] font-mono border border-white/5"
                          >
                            {idx + 1}. {s.title}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        haptic.tick();
                        sound.playDeal();
                        if (onSelectSpread) onSelectSpread(sp);
                        onClose();
                      }}
                      className="mt-2 w-full py-2 rounded-xl bg-white/10 hover:bg-[#FFE600] text-[#D1CBE8] hover:text-black text-xs font-mono font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Select Spread</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TAROT WISDOM & LEO SOLAR ENERGY */}
          {activeTab === 'wisdom' && (
            <div className="flex flex-col gap-3.5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#1E1238] to-purple-600/15 border border-[#FFE600]/30 flex flex-col gap-2">
                <h4 className="font-serif font-bold text-base text-[#FFE600] flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#FFE600]" />
                  The Solar Leo Essence in Divination
                </h4>
                <p className="text-xs text-[#D1CBE8] leading-relaxed">
                  Leo is governed by the Sun—the celestial center of vital warmth, radiant clarity, and heart-centered courage. In Tarot Reading Leo, cards are interpreted not through fatalism or fear, but through sovereign empowerment and luminous insight.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#100B24] border border-white/10 flex flex-col gap-1.5">
                  <span className="font-serif font-bold text-xs text-[#FFE600] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
                    Upright Arcana
                  </span>
                  <p className="text-xs text-[#9D94B8] leading-relaxed">
                    Direct archetypal expression. Energy flowing outward constructively, aligned with conscious manifestation and natural harmony.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#100B24] border border-white/10 flex flex-col gap-1.5">
                  <span className="font-serif font-bold text-xs text-[#00F2FE] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#00F2FE]" />
                    Reversed Arcana
                  </span>
                  <p className="text-xs text-[#9D94B8] leading-relaxed">
                    Internalized, shadowed, or resisting force. Directs attention inward toward healing, resolving resistance, or re-centering energy.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#100B24] border border-white/10 flex flex-col gap-2">
                <span className="font-serif font-bold text-xs text-[#F5F3FF] flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#FF007F]" />
                  How to Formulate Potent Questions
                </span>
                <div className="space-y-1.5 text-xs text-[#9D94B8]">
                  <p>✨ <strong>Open Questions:</strong> "What energy will assist me in resolving this challenge?"</p>
                  <p>🔑 <strong>Self-Agency:</strong> "What unconscious patterns are ready to be transformed?"</p>
                  <p>⚡ <strong>Direction:</strong> "What wisdom does the universe invite me to step into next?"</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VOICE & AUDIO GUIDE */}
          {activeTab === 'voice' && (
            <div className="flex flex-col gap-3.5">
              <div className="p-4 rounded-2xl bg-[#100B24] border border-[#FFE600]/30 flex flex-col gap-2">
                <h4 className="font-serif font-bold text-base text-[#FFE600] flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#FFE600]" />
                  Natural Female Oracle Voice Narration
                </h4>
                <p className="text-xs text-[#D1CBE8] leading-relaxed">
                  Upon revealing all cards and generating the reading, the Oracle Voice Engine automatically recites your reading in a calm, female priestess tone.
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#D1CBE8]">
                <div className="p-3 rounded-xl bg-[#16102D] border border-white/10 flex items-start gap-2.5">
                  <span className="text-[#FFE600] font-mono font-bold text-sm">1.</span>
                  <div>
                    <strong className="text-white">Auto-Voice on Finish:</strong> Automatically starts reciting after synthesis completes. Toggle anytime via the Auto-Voice button.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#16102D] border border-white/10 flex items-start gap-2.5">
                  <span className="text-[#00F2FE] font-mono font-bold text-sm">2.</span>
                  <div>
                    <strong className="text-white">Vocal Tone & Priestess Selector:</strong> Choose from high-fidelity natural female voices and adjust pace from 0.85x (meditative) to 1.1x (brisk).
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#16102D] border border-white/10 flex items-start gap-2.5">
                  <span className="text-[#A78BFA] font-mono font-bold text-sm">3.</span>
                  <div>
                    <strong className="text-white">Procedural Ambient Drone:</strong> Toggle 432Hz cosmic alchemical drone frequencies in the top app bar for enhanced meditation.
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  haptic.tick();
                  onClose();
                  const player = document.getElementById('oracle-voice-play-toggle-btn');
                  player?.click();
                }}
                className="w-full py-2.5 rounded-2xl bg-[#FFE600] text-black font-bold text-xs font-mono hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Test Oracle Voice Now</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-white/10 flex items-center justify-between bg-[#0E091D]">
          <span className="text-[11px] text-[#9D94B8] font-mono">
            Tarot Reading Leo • Interactive Guide
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
