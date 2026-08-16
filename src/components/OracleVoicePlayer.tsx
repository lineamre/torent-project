import { useState, useEffect, useMemo } from 'react';
import { Volume2, Play, Pause, Square, Sparkles, Gauge, Radio, Mic, ChevronDown, Check, UserCheck, Languages } from 'lucide-react';
import { oracleVoice } from '../utils/speech';
import { haptic } from '../utils/haptics';
import { sound } from '../utils/audio';

interface OracleVoicePlayerProps {
  textToSpeak: string;
  autoSpokenOnFinish?: boolean;
  className?: string;
  compact?: boolean;
  label?: string;
  language?: 'en' | 'tl';
  onLanguageChange?: (lang: 'en' | 'tl') => void;
}

export default function OracleVoicePlayer({
  textToSpeak,
  autoSpokenOnFinish = false,
  className = '',
  compact = false,
  label = 'Oracle Voice Narrator',
  language,
  onLanguageChange,
}: OracleVoicePlayerProps) {
  const [speechState, setSpeechState] = useState({
    isSpeaking: false,
    isPaused: false,
    textSnippet: '',
    currentChunkIndex: 0,
    totalChunks: 0,
    language: oracleVoice.currentLanguage,
  });
  const [autoSpeak, setAutoSpeak] = useState(oracleVoice.autoSpeakOnFinish);
  const [rate, setRate] = useState(oracleVoice.rate);
  const [pitch, setPitch] = useState(oracleVoice.pitch);
  const [activeLang, setActiveLang] = useState<'en' | 'tl'>(language || oracleVoice.currentLanguage);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(oracleVoice.selectedVoiceURI || '');
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  // Sync external language prop if provided
  useEffect(() => {
    if (language && language !== activeLang) {
      setActiveLang(language);
      oracleVoice.setLanguage(language);
    }
  }, [language]);

  // Available female & tagalog voices detected on this device
  const femaleVoices = useMemo(() => {
    return oracleVoice.getFemaleVoices();
  }, [speechState.isSpeaking, activeLang]);

  const tagalogVoices = useMemo(() => {
    return oracleVoice.getTagalogVoices();
  }, [speechState.isSpeaking]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const unsubscribe = oracleVoice.subscribe((state) => {
      setSpeechState(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isSupported) return null;

  const handlePlayPause = () => {
    haptic.tick();
    sound.playDeal();
    if (speechState.isSpeaking || speechState.isPaused) {
      oracleVoice.togglePlayPause(textToSpeak);
    } else {
      oracleVoice.speak(textToSpeak, undefined, activeLang);
    }
  };

  const handleStop = () => {
    haptic.tick();
    oracleVoice.stop();
  };

  const handleToggleLang = (target: 'en' | 'tl') => {
    haptic.tick();
    setActiveLang(target);
    oracleVoice.setLanguage(target);
    if (onLanguageChange) {
      onLanguageChange(target);
    }
    if (speechState.isSpeaking) {
      oracleVoice.speak(textToSpeak, undefined, target);
    }
  };

  const handleToggleAuto = () => {
    haptic.tick();
    const next = !autoSpeak;
    setAutoSpeak(next);
    oracleVoice.setAutoSpeak(next);
  };

  const handleCycleRate = () => {
    haptic.tick();
    const nextRate = rate === 0.85 ? 0.95 : rate === 0.95 ? 1.1 : 0.85;
    setRate(nextRate);
    oracleVoice.setRate(nextRate);
    if (speechState.isSpeaking) {
      oracleVoice.speak(textToSpeak, undefined, activeLang);
    }
  };

  const handleSelectVoice = (uri: string) => {
    haptic.tick();
    setSelectedVoiceURI(uri);
    oracleVoice.setSelectedVoice(uri);
    setShowVoiceMenu(false);
    if (speechState.isSpeaking) {
      oracleVoice.speak(textToSpeak, undefined, activeLang);
    }
  };

  const handleCycleTone = () => {
    haptic.tick();
    const nextPitch = pitch === 1.10 ? 1.20 : pitch === 1.20 ? 1.02 : 1.10;
    setPitch(nextPitch);
    oracleVoice.setPitch(nextPitch);
    if (speechState.isSpeaking) {
      oracleVoice.speak(textToSpeak, undefined, activeLang);
    }
  };

  const currentVoiceName = useMemo(() => {
    const v = oracleVoice.findBestFemaleOracleVoice(activeLang);
    if (!v) return activeLang === 'tl' ? 'Filipino Oracle Voice' : 'Natural Priestess Voice';
    return v.name
      .replace(/Microsoft\s+/i, '')
      .replace(/Google\s+/i, '')
      .replace(/Online\s+\(Natural\)/i, 'Natural')
      .replace(/\s*-\s*English.*/i, '')
      .replace(/\(Enhanced\)/i, 'HD')
      .replace(/\(Premium\)/i, 'Pro');
  }, [selectedVoiceURI, femaleVoices, activeLang]);

  const isActive = speechState.isSpeaking || speechState.isPaused;

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <button
          onClick={handlePlayPause}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all active:scale-95 border ${
            speechState.isSpeaking
              ? 'bg-[#FFE600] text-black border-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.4)] animate-pulse'
              : 'bg-white/10 text-[#FFE600] hover:bg-white/20 border-[#FFE600]/30'
          }`}
          title={speechState.isSpeaking ? 'Pause voice narration' : `Listen to ${activeLang === 'tl' ? 'Tagalog' : 'English'} voice`}
        >
          {speechState.isSpeaking ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
          <span className="font-medium">
            {speechState.isSpeaking
              ? 'Pause'
              : activeLang === 'tl'
              ? '🇵🇭 Tinig ng Babaylan'
              : 'Hear Priestess'}
          </span>
        </button>

        {/* Quick Language Toggle in Compact Mode */}
        <button
          onClick={() => handleToggleLang(activeLang === 'en' ? 'tl' : 'en')}
          className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-white/5 hover:bg-white/15 text-[#FFE600] border border-white/15 transition-all"
          title={`Switch voice language to ${activeLang === 'en' ? 'Tagalog (Filipino)' : 'English'}`}
        >
          {activeLang === 'tl' ? '🇵🇭 TL' : '🇬🇧 EN'}
        </button>

        {isActive && (
          <button
            onClick={handleStop}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#9D94B8] hover:text-white transition-colors"
            title="Stop voice"
          >
            <Square className="w-3 h-3 fill-current" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      id="oracle-voice-player-panel"
      className={`relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#1E143E]/95 via-[#150F2C]/95 to-[#0F1E3D]/95 border border-[#FFE600]/35 shadow-[0_0_25px_rgba(255,230,0,0.12)] backdrop-blur-xl flex flex-col gap-3 ${className}`}
    >
      {/* Top Row: Visualizer & Voice Persona Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${
              speechState.isSpeaking
                ? 'bg-[#FFE600]/25 border-[#FFE600] text-[#FFE600] shadow-[0_0_18px_rgba(255,230,0,0.4)]'
                : 'bg-white/5 border-white/10 text-[#9D94B8]'
            }`}
          >
            <Volume2 className={`w-5 h-5 ${speechState.isSpeaking ? 'animate-bounce' : ''}`} />
          </div>

          <div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
                {label}
              </span>
              
              {/* Language Selector Badges */}
              <div className="flex items-center bg-black/40 rounded-xl p-0.5 border border-white/15">
                <button
                  onClick={() => handleToggleLang('en')}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    activeLang === 'en'
                      ? 'bg-[#FFE600] text-black shadow-sm'
                      : 'text-[#9D94B8] hover:text-white'
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => handleToggleLang('tl')}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                    activeLang === 'tl'
                      ? 'bg-[#FFE600] text-black shadow-sm'
                      : 'text-[#9D94B8] hover:text-white'
                  }`}
                >
                  🇵🇭 Tagalog
                </button>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#E0AAFF]/20 text-[#E0AAFF] border border-[#E0AAFF]/30 flex items-center gap-1">
                <UserCheck className="w-2.5 h-2.5" />
                {activeLang === 'tl' ? 'Tinig ng Babaylan' : 'Female Priestess'}
              </span>

              {speechState.isSpeaking && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40 animate-pulse">
                  Chanting
                </span>
              )}
              {speechState.isPaused && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Paused
                </span>
              )}
            </div>

            {/* Dynamic Soundwave Visualizer & Active Snippet */}
            <div className="flex items-center gap-1.5 mt-1.5 h-3.5">
              {[5, 12, 7, 15, 9, 14, 6, 11, 15, 8, 13, 6].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    speechState.isSpeaking
                      ? 'bg-gradient-to-t from-[#FFE600] via-[#E0AAFF] to-[#00F2FE]'
                      : 'bg-white/20'
                  }`}
                  style={{
                    height: speechState.isSpeaking
                      ? `${Math.max(4, Math.min(16, h * (0.8 + 0.5 * Math.sin(Date.now() / 120 + i))))}px`
                      : '3px',
                  }}
                />
              ))}
              <span className="text-[11px] text-[#D1CBE8] font-mono ml-2 truncate max-w-[200px] sm:max-w-[280px]">
                {speechState.isSpeaking
                  ? speechState.textSnippet || (activeLang === 'tl' ? 'Binibigkas ang banal na propesiya...' : 'Chanting sacred guidance...')
                  : `${currentVoiceName} (${activeLang === 'tl' ? 'Tagalog' : 'English'})`}
              </span>
            </div>
          </div>
        </div>

        {/* Controls Actions */}
        <div className="flex items-center flex-wrap gap-2 sm:ml-auto">
          {/* Main Play / Pause Button */}
          <button
            id="oracle-voice-play-toggle-btn"
            onClick={handlePlayPause}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all active:scale-95 shadow-md ${
              speechState.isSpeaking
                ? 'bg-[#FFE600] hover:bg-amber-300 text-black shadow-[0_0_20px_rgba(255,230,0,0.4)]'
                : speechState.isPaused
                ? 'bg-amber-400 text-black'
                : 'bg-white/10 hover:bg-[#FFE600] text-[#FFE600] hover:text-black border border-[#FFE600]/40'
            }`}
          >
            {speechState.isSpeaking ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : speechState.isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{activeLang === 'tl' ? 'Pakinggan sa Tagalog' : 'Hear Priestess Voice'}</span>
              </>
            )}
          </button>

          {/* Stop Button */}
          {isActive && (
            <button
              onClick={handleStop}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#9D94B8] hover:text-white border border-white/10 transition-colors"
              title="Stop voice"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          {/* Voice Selector Dropdown Toggle */}
          {femaleVoices.length > 1 && (
            <div className="relative">
              <button
                onClick={() => setShowVoiceMenu(!showVoiceMenu)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-[#E0AAFF] border border-[#E0AAFF]/30 text-xs font-mono transition-colors"
                title="Choose voice persona"
              >
                <Mic className="w-3 h-3 text-[#FFE600]" />
                <span className="truncate max-w-[90px]">{currentVoiceName}</span>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </button>

              {showVoiceMenu && (
                <div
                  id="oracle-voice-dropdown"
                  className="absolute right-0 top-full mt-2 w-64 bg-[#181133] border border-white/20 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto"
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFE600] px-2 py-1 font-bold border-b border-white/10 mb-1 flex items-center justify-between">
                    <span>Available Voices</span>
                    <span className="text-[9px] text-[#9D94B8]">
                      {activeLang === 'tl' ? '🇵🇭 Filipino Priority' : '🇬🇧 Natural Voices'}
                    </span>
                  </div>

                  {femaleVoices.map((v) => {
                    const isSelected = v.voiceURI === (selectedVoiceURI || oracleVoice.findBestFemaleOracleVoice(activeLang)?.voiceURI);
                    const cleanName = v.name
                      .replace(/Microsoft\s+/i, '')
                      .replace(/Google\s+/i, '')
                      .replace(/Online\s+\(Natural\)/i, 'Natural');
                    const isFil = v.lang.toLowerCase().includes('fil') || v.lang.toLowerCase().includes('tl');

                    return (
                      <button
                        key={v.voiceURI}
                        onClick={() => handleSelectVoice(v.voiceURI)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#FFE600]/20 text-[#FFE600] font-bold border border-[#FFE600]/40'
                            : 'hover:bg-white/10 text-[#D1CBE8]'
                        }`}
                      >
                        <div className="flex flex-col truncate">
                          <span className="truncate flex items-center gap-1">
                            {isFil ? '🇵🇭' : '✦'} {cleanName}
                          </span>
                          <span className="text-[9px] text-[#9D94B8] font-mono">{v.lang}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#FFE600] flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Fine Tuning (Speed, Pitch, Auto-Voice) */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/10 text-[11px] font-mono text-[#9D94B8]">
        <div className="flex items-center gap-2">
          {/* Speed / Pace cycle */}
          <button
            onClick={handleCycleRate}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#D1CBE8] hover:text-white border border-white/10 transition-colors"
            title="Cycle Voice Speed"
          >
            <Gauge className="w-3 h-3 text-[#FFE600]" />
            <span>Pace: {rate === 0.85 ? 'Serene (0.85x)' : rate === 0.95 ? 'Normal (0.95x)' : 'Brisk (1.1x)'}</span>
          </button>

          {/* Tone / Pitch cycle */}
          <button
            onClick={handleCycleTone}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#D1CBE8] hover:text-white border border-white/10 transition-colors"
            title="Cycle Voice Tone Pitch"
          >
            <Sparkles className="w-3 h-3 text-[#00F2FE]" />
            <span>Tone: {pitch === 1.10 ? 'Warm Mystical' : pitch === 1.20 ? 'High Ethereal' : 'Deep Grounded'}</span>
          </button>
        </div>

        {/* Auto-recite on reading revelation */}
        <button
          onClick={handleToggleAuto}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors border ${
            autoSpeak
              ? 'bg-[#00F2FE]/15 text-[#00F2FE] border-[#00F2FE]/30 font-bold'
              : 'bg-white/5 text-[#9D94B8] border-white/10 hover:text-white'
          }`}
          title="Toggle auto-recitation when reading opens"
        >
          <Radio className="w-3 h-3" />
          <span>Auto-Chant: {autoSpeak ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    </div>
  );
}
