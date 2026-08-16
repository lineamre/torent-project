// Oracle Voice Synthesis Engine with Natural Female Neural Voice Selection & Cadenced Speech
import { translateReadingToTagalog, cleanTagalogForSpeech } from './tagalogTarot';

export type VoicePersona = 'mystic-priestess' | 'celestial-guide' | 'serene-oracle';

export interface OracleVoiceInfo {
  name: string;
  voiceURI: string;
  lang: string;
  isFemale: boolean;
  isNeural: boolean;
}

type SpeechStateListener = (state: {
  isSpeaking: boolean;
  isPaused: boolean;
  textSnippet: string;
  currentChunkIndex: number;
  totalChunks: number;
  language: 'en' | 'tl';
}) => void;

class OracleVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechStateListener> = new Set();
  
  public autoSpeakOnFinish: boolean = true;
  public rate: number = 0.90; // Serene, meditative cadence
  public pitch: number = 1.10; // Gentle, clear natural female pitch
  public selectedVoiceURI: string | null = null;
  public currentLanguage: 'en' | 'tl' = 'en';
  public availableVoices: SpeechSynthesisVoice[] = [];
  
  // Chunking queue to avoid WebSpeech cutoffs and enable human-like breathing pauses
  private speechChunks: string[] = [];
  private currentChunkIndex: number = 0;
  private isProcessingQueue: boolean = false;
  private onQueueFinish?: () => void;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadStoredSettings();
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private loadStoredSettings() {
    try {
      const storedAuto = localStorage.getItem('nb_oracle_auto_voice');
      if (storedAuto !== null) {
        this.autoSpeakOnFinish = storedAuto === 'true';
      }
      const storedRate = localStorage.getItem('nb_oracle_voice_rate');
      if (storedRate) {
        this.rate = parseFloat(storedRate);
      }
      const storedPitch = localStorage.getItem('nb_oracle_voice_pitch');
      if (storedPitch) {
        this.pitch = parseFloat(storedPitch);
      }
      const storedLang = localStorage.getItem('nb_oracle_voice_lang');
      if (storedLang === 'tl' || storedLang === 'en') {
        this.currentLanguage = storedLang;
      }
      const storedVoiceURI = localStorage.getItem('nb_oracle_voice_uri');
      if (storedVoiceURI) {
        this.selectedVoiceURI = storedVoiceURI;
      }
    } catch {
      // Storage unavailable
    }
  }

  public setAutoSpeak(enabled: boolean) {
    this.autoSpeakOnFinish = enabled;
    try {
      localStorage.setItem('nb_oracle_auto_voice', String(enabled));
    } catch {}
  }

  public setLanguage(lang: 'en' | 'tl') {
    this.currentLanguage = lang;
    try {
      localStorage.setItem('nb_oracle_voice_lang', lang);
    } catch {}
    this.notify();
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.7, Math.min(1.3, rate));
    try {
      localStorage.setItem('nb_oracle_voice_rate', String(this.rate));
    } catch {}
  }

  public setPitch(pitch: number) {
    this.pitch = Math.max(0.9, Math.min(1.35, pitch));
    try {
      localStorage.setItem('nb_oracle_voice_pitch', String(this.pitch));
    } catch {}
  }

  public setSelectedVoice(voiceURI: string) {
    this.selectedVoiceURI = voiceURI;
    try {
      localStorage.setItem('nb_oracle_voice_uri', voiceURI);
    } catch {}
  }

  private initVoices() {
    if (!this.synth) return;
    this.availableVoices = this.synth.getVoices();
  }

  /**
   * Filter and score the most natural Tagalog / Filipino voices available.
   */
  public getTagalogVoices(): SpeechSynthesisVoice[] {
    if (!this.synth || this.availableVoices.length === 0) return [];

    return this.availableVoices
      .filter((v) => {
        const lang = v.lang.toLowerCase();
        const name = v.name.toLowerCase();
        return (
          lang.includes('fil') ||
          lang.includes('tl') ||
          lang.startsWith('fil-ph') ||
          lang.startsWith('tl-ph') ||
          name.includes('filipino') ||
          name.includes('tagalog')
        );
      })
      .sort((a, b) => {
        const aNeural = a.name.toLowerCase().includes('natural') || a.name.toLowerCase().includes('neural') ? 1 : 0;
        const bNeural = b.name.toLowerCase().includes('natural') || b.name.toLowerCase().includes('neural') ? 1 : 0;
        return bNeural - aNeural;
      });
  }

  /**
   * Filter and score the most natural, expressive female voices available on the device.
   */
  public getFemaleVoices(): SpeechSynthesisVoice[] {
    if (!this.synth || this.availableVoices.length === 0) return [];

    const femaleKeywords = [
      'female', 'woman', 'girl', 'jenny', 'aria', 'samantha', 'victoria', 'karen',
      'moira', 'serena', 'sonia', 'ava', 'allison', 'kendra', 'salli', 'joanna',
      'ivy', 'emma', 'amy', 'libby', 'fiona', 'tessa', 'nicky', 'zoe', 'zira',
      'claire', 'julie', 'catherine', 'hazel', 'susan', 'michelle', 'stephanie', 'blessica'
    ];

    const maleKeywords = [
      'male', 'man', 'boy', 'david', 'mark', 'george', 'james', 'daniel',
      'alex', 'oliver', 'guy', 'paul', 'tom', 'fred', 'brian', 'richard'
    ];

    // Score voice suitability
    const scored = this.availableVoices.map(v => {
      const name = v.name.toLowerCase();
      const uri = v.voiceURI.toLowerCase();
      const lang = v.lang.toLowerCase();
      let score = 0;

      // Prefer English or Filipino
      if (this.currentLanguage === 'tl') {
        if (lang.includes('fil') || lang.includes('tl')) score += 100;
      } else {
        if (lang.startsWith('en')) score += 10;
        if (lang.startsWith('en-us') || lang.startsWith('en-gb') || lang.startsWith('en-au')) score += 5;
      }

      // Check female markers
      if (femaleKeywords.some(kw => name.includes(kw) || uri.includes(kw))) {
        score += 50;
      }

      // Heavily penalize male keywords
      if (maleKeywords.some(kw => name.includes(kw) || uri.includes(kw))) {
        score -= 60;
      }

      // Reward natural / neural / premium engines
      if (name.includes('natural') || uri.includes('natural') || name.includes('online')) score += 25;
      if (name.includes('neural') || uri.includes('neural') || name.includes('wavenet')) score += 30;
      if (name.includes('enhanced') || name.includes('premium')) score += 20;
      if (name.includes('google uk english female')) score += 35;
      if (name.includes('google us english')) score += 15;

      return { voice: v, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .map(item => item.voice);
  }

  public findBestFemaleOracleVoice(targetLang?: 'en' | 'tl'): SpeechSynthesisVoice | null {
    if (!this.synth || this.availableVoices.length === 0) return null;
    const lang = targetLang || this.currentLanguage;

    // 1. Explicit user selection
    if (this.selectedVoiceURI) {
      const found = this.availableVoices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (found) return found;
    }

    // 2. If Tagalog requested, check Tagalog voices first
    if (lang === 'tl') {
      const tlVoices = this.getTagalogVoices();
      if (tlVoices.length > 0) {
        return tlVoices[0];
      }
    }

    // 3. Ranked natural female voices
    const femaleList = this.getFemaleVoices();
    if (femaleList.length > 0) {
      return femaleList[0];
    }

    // 4. Fallback to any English or device voice
    const enVoice = this.availableVoices.find(v => v.lang.startsWith('en'));
    return enVoice || this.availableVoices[0] || null;
  }

  /**
   * Transforms raw markdown into poetic, naturally spoken oracle prose
   * with smooth phrasing and pronunciation enhancements.
   */
  public sanitizeForSpeech(markdown: string): string {
    if (!markdown) return '';

    let textToProcess = markdown;

    // If Tagalog is active, ensure any English fragments/headers are completely translated
    if (this.currentLanguage === 'tl') {
      textToProcess = translateReadingToTagalog(textToProcess);
      textToProcess = cleanTagalogForSpeech(textToProcess);
    }

    return textToProcess
      // Section headers converted to natural spoken transitions (English & Tagalog)
      .replace(/###\s*✦?\s*The Core Message & Overview/gi, 'In the core message of your reading. ')
      .replace(/###\s*✦?\s*The Quantum Synthesis/gi, 'In the quantum synthesis of your spread. ')
      .replace(/###\s*✦?\s*Ang Pangkalahatang Mensahe at Gabay/gi, 'Sa pangkalahatang mensahe ng iyong mga baraha. ')
      .replace(/###\s*✦?\s*Ang Banal na Mensahe at Buod/gi, 'Sa banal na buod ng iyong kapalaran. ')
      .replace(/###\s*⚡?\s*Card-by-Card Breakdown/gi, 'Looking at the card matrix. ')
      .replace(/###\s*⚡?\s*Card Matrix Breakdown/gi, 'Looking at the card matrix. ')
      .replace(/###\s*⚡?\s*Pagsusuri sa Bawat Baraha/gi, 'Sa pagsusuri sa bawat baraha. ')
      .replace(/###\s*⚡?\s*Kahulugan ng mga Baraha sa Iyong Hanay/gi, 'Para sa mga baraha sa iyong hanay. ')
      .replace(/###\s*🔑?\s*Practical Advice & Next Steps/gi, 'For your practical advice and next steps. ')
      .replace(/###\s*🔑?\s*Transformational Directives?/gi, 'For your transformational guidance. ')
      .replace(/###\s*🔑?\s*Mga Praktikal na Payo at Hakbang na Dapat Gawin/gi, 'Para sa mga praktikal na payo at hakbang. ')
      .replace(/###\s*🔑?\s*Gabay sa Pagkilos at Pagsulong/gi, 'Para sa gabay sa pagkilos. ')
      .replace(/###\s*✨?\s*Your Personal Affirmation/gi, 'And your personal affirmation. ')
      .replace(/###\s*✨?\s*Cosmic Affirmation/gi, 'And your sacred affirmation. ')
      .replace(/###\s*✨?\s*Ang Iyong Banal na Paninindigan \(Affirmation\)/gi, 'At ang iyong banal na paninindigan. ')
      // Strip remaining headers
      .replace(/^#{1,6}\s+/gm, '')
      // Upright and reversed vocal naturalization
      .replace(/✦\s*Upright/gi, this.currentLanguage === 'tl' ? 'nakatayo' : 'upright')
      .replace(/↺\s*Reversed/gi, this.currentLanguage === 'tl' ? 'pabaligtad' : 'reversed')
      .replace(/✦\s*Nakatayo/gi, 'nakatayo')
      .replace(/↺\s*Pabaligtad/gi, 'pabaligtad')
      // Strip markdown emphasis
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      // Strip symbols
      .replace(/[✦⚡🔑✨↺★●◆■▶]/g, '')
      // Strip horizontal rules
      .replace(/---/g, ' ')
      // Strip bullet points & numbered lists to flowing sentences
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      // Naturalize quotation marks into spoken breath pauses
      .replace(/["“”]/g, '')
      // Format multiple line breaks into clear pauses
      .replace(/\n\n+/g, '. ')
      .replace(/\n/g, ' ')
      // Clean duplicate spaces and punctuation
      .replace(/\s+/g, ' ')
      .replace(/\.{2,}/g, '.')
      .trim();
  }


  /**
   * Splits text into short, natural speech chunks (under 160 characters)
   * around natural punctuation boundaries to ensure silky-smooth continuous speech.
   */
  private splitIntoSpeechChunks(text: string): string[] {
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const chunks: string[] = [];

    for (const s of sentences) {
      const trimmed = s.trim();
      if (!trimmed) continue;

      if (trimmed.length <= 150) {
        chunks.push(trimmed);
      } else {
        // Split on commas or clauses
        const parts = trimmed.split(/,\s+/);
        let temp = '';
        for (const p of parts) {
          if ((temp + p).length < 140) {
            temp = temp ? `${temp}, ${p}` : p;
          } else {
            if (temp) chunks.push(temp);
            temp = p;
          }
        }
        if (temp) chunks.push(temp);
      }
    }

    return chunks.filter(c => c.length > 0);
  }

  public subscribe(listener: SpeechStateListener): () => void {
    this.listeners.add(listener);
    this.notify();
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(textSnippet: string = '') {
    const isSpeaking = this.isProcessingQueue || (this.synth ? this.synth.speaking && !this.synth.paused : false);
    const isPaused = this.synth ? this.synth.paused : false;
    this.listeners.forEach(cb =>
      cb({
        isSpeaking,
        isPaused,
        textSnippet,
        currentChunkIndex: this.currentChunkIndex,
        totalChunks: this.speechChunks.length,
        language: this.currentLanguage,
      })
    );
  }

  /**
   * Recite text with sequential natural female voice queue.
   */
  public speak(rawText: string, onFinish?: () => void, targetLang?: 'en' | 'tl') {
    if (!this.synth) return;

    if (targetLang) {
      this.currentLanguage = targetLang;
    }

    this.stop(); // Stop any active speech

    const spokenText = this.sanitizeForSpeech(rawText);
    if (!spokenText) return;

    this.speechChunks = this.splitIntoSpeechChunks(spokenText);
    this.currentChunkIndex = 0;
    this.isProcessingQueue = true;
    this.onQueueFinish = onFinish;

    this.playNextChunk();
  }

  private playNextChunk() {
    if (!this.synth || !this.isProcessingQueue) return;

    if (this.currentChunkIndex >= this.speechChunks.length) {
      this.isProcessingQueue = false;
      this.currentUtterance = null;
      this.notify('');
      if (this.onQueueFinish) {
        this.onQueueFinish();
      }
      return;
    }

    const chunk = this.speechChunks[this.currentChunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunk);
    
    // Explicitly set language tag so browser speech engines (Google TTS, iOS, Android) use Filipino phonetics
    if (this.currentLanguage === 'tl') {
      utterance.lang = 'fil-PH';
    } else {
      utterance.lang = 'en-US';
    }

    // Choose best female voice for active language
    const bestFemale = this.findBestFemaleOracleVoice(this.currentLanguage);
    if (bestFemale) {
      utterance.voice = bestFemale;
      if (bestFemale.lang) {
        utterance.lang = bestFemale.lang;
      }
    }

    // Natural female voice cadence and gentle pitch curve
    utterance.rate = this.currentLanguage === 'tl' ? Math.max(0.85, this.rate * 0.95) : this.rate;
    utterance.pitch = this.pitch;

    utterance.onstart = () => {
      this.notify(chunk);
    };

    utterance.onend = () => {
      this.currentChunkIndex++;
      // Subtle natural breathing pause before next sentence
      setTimeout(() => {
        if (this.isProcessingQueue) {
          this.playNextChunk();
        }
      }, 90);
    };

    utterance.onerror = (e) => {
      console.warn('Speech chunk error, advancing gracefully:', e);
      this.currentChunkIndex++;
      if (this.currentChunkIndex < this.speechChunks.length && this.isProcessingQueue) {
        this.playNextChunk();
      } else {
        this.isProcessingQueue = false;
        this.notify('');
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.notify();
    }
  }

  public togglePlayPause(rawText?: string) {
    if (!this.synth) return;
    if (this.isProcessingQueue || this.synth.speaking) {
      if (this.synth.paused) {
        this.resume();
      } else {
        this.pause();
      }
    } else if (rawText) {
      this.speak(rawText);
    }
  }

  public stop() {
    this.isProcessingQueue = false;
    this.speechChunks = [];
    this.currentChunkIndex = 0;
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
      this.notify('');
    }
  }

  public isSpeaking(): boolean {
    return Boolean(this.isProcessingQueue || (this.synth && this.synth.speaking && !this.synth.paused));
  }

  public isPaused(): boolean {
    return Boolean(this.synth && this.synth.paused);
  }
}

export const oracleVoice = new OracleVoiceEngine();
