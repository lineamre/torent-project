import { ReadingFocusId, ReadingFocusOption } from '../types';

export const READING_FOCUSES: ReadingFocusOption[] = [
  {
    id: 'love',
    name: 'Love & Romance',
    topic: 'Love, Soulmates & Relationships',
    colorName: 'Red',
    colorHex: '#EF4444',
    bgGradient: 'from-rose-950/80 via-[#200A14]/90 to-[#12050B]',
    borderClass: 'border-rose-500/60 hover:border-rose-400',
    glowClass: 'shadow-[0_0_25px_rgba(239,68,68,0.35)]',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    icon: '❤️',
    tagline: 'Heart connection, soulmates, romantic clarity & emotional harmony',
    defaultQuestions: [
      'What energy is surrounding my romantic life and relationships right now?',
      'How can my partner and I deepen our emotional connection and trust?',
      'What qualities should I cultivate to attract my ideal soulmate?',
      'What healing is needed to fully open my heart to true love?',
      'What is the next chapter in my current relationship or love journey?'
    ],
    oraclePersona: 'You are the Empress of Hearts, an empathetic, intuitive reader focused on emotional vulnerability, authentic romantic connection, soulmate alignment, and heart healing.'
  },
  {
    id: 'future',
    name: 'Future & Destiny',
    topic: 'Upcoming Events, Career & Tomorrow',
    colorName: 'Blue',
    colorHex: '#3B82F6',
    bgGradient: 'from-blue-950/80 via-[#0B172E]/90 to-[#060D1E]',
    borderClass: 'border-blue-500/60 hover:border-blue-400',
    glowClass: 'shadow-[0_0_25px_rgba(59,130,246,0.35)]',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    icon: '🔮',
    tagline: 'Upcoming opportunities, foresight, timeline shifts & destiny paths',
    defaultQuestions: [
      'What major opportunities and developments are coming in my near future?',
      'What will be the outcome if I pursue this new career or life path?',
      'What hidden obstacles or surprises should I prepare for in the next cycle?',
      'What is the cosmic trajectory of my current goals and projects?',
      'What strategic next move will bring me the greatest long-term success?'
    ],
    oraclePersona: 'You are the High Seer of Timelines, a prophetic, clear-sighted visionary focused on forecasting upcoming cycles, timeline shifts, and future possibilities.'
  },
  {
    id: 'life',
    name: 'Life & Purpose',
    topic: 'Life Path, Deep Self & Spiritual Growth',
    colorName: 'Black',
    colorHex: '#18181B',
    bgGradient: 'from-zinc-900/90 via-[#121216]/95 to-[#09090C]',
    borderClass: 'border-zinc-500/60 hover:border-zinc-300',
    glowClass: 'shadow-[0_0_25px_rgba(255,255,255,0.18)]',
    badgeClass: 'bg-zinc-700/30 text-zinc-200 border-zinc-500/40',
    icon: '🌌',
    tagline: 'Life meaning, overcoming challenges, shadow work & self-mastery',
    defaultQuestions: [
      'What is my soul’s highest life purpose and lesson in this season?',
      'How can I overcome current life stress and cultivate inner peace?',
      'What outdated habits or emotional baggage am I ready to release?',
      'What dormant strengths and gifts within me are waiting to awaken?',
      'How can I align my daily actions with my true authentic self?'
    ],
    oraclePersona: 'You are the Sage of Life Mastery, a grounded, philosophically profound guide focused on life purpose, inner resilience, self-discovery, and personal evolution.'
  },
  {
    id: 'fortune',
    name: 'Money & Fortune',
    topic: 'Wealth, Abundance, Luck & Career Growth',
    colorName: 'Gold',
    colorHex: '#F59E0B',
    bgGradient: 'from-amber-950/80 via-[#261706]/90 to-[#140C03]',
    borderClass: 'border-amber-400/60 hover:border-amber-300',
    glowClass: 'shadow-[0_0_25px_rgba(245,158,11,0.35)]',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    icon: '💰',
    tagline: 'Financial wealth, business fortune, luck, abundance & prosperity',
    defaultQuestions: [
      'How can I attract new financial abundance and lucrative opportunities?',
      'What is the fortune and money outlook for my business or career this year?',
      'What smart financial decisions or investments will maximize my prosperity?',
      'What money mindset blocks or fears are holding back my wealth flow?',
      'Where is unexpected good fortune or luck most likely to find me?'
    ],
    oraclePersona: 'You are the Solar King of Fortune, an inspiring, practical, wealth-focused mentor guiding financial abundance, career victory, prosperity, and strategic luck.'
  }
];

export const DEFAULT_FOCUS = READING_FOCUSES[0]; // Red: Love as default, or Gold

export function getFocusById(id: ReadingFocusId): ReadingFocusOption {
  return READING_FOCUSES.find((f) => f.id === id) || READING_FOCUSES[0];
}
