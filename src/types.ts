export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
export type ElementType = 'fire' | 'water' | 'air' | 'earth' | 'spirit';

export type ReadingFocusId = 'love' | 'future' | 'life' | 'fortune';

export interface ReadingFocusOption {
  id: ReadingFocusId;
  name: string;
  topic: string;
  colorName: string;
  colorHex: string;
  bgGradient: string;
  borderClass: string;
  glowClass: string;
  badgeClass: string;
  icon: string;
  tagline: string;
  defaultQuestions: string[];
  oraclePersona: string;
}

export interface TarotCard {
  id: number;
  number: string;
  name: string;
  suit: Suit;
  element: ElementType;
  icon: string;
  symbol: string;
  image: string;
  symbolism?: string[];
  traditionalMeaning?: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  cyberLore: string;
  advice: string;
  affirmation: string;
  zodiacOrPlanet?: string;
  dominantColor: string;
}

export interface SpreadSlot {
  id: string;
  title: string;
  role: string;
  description: string;
  icon?: string;
}

export interface SpreadConfig {
  id: string;
  name: string;
  subtitle: string;
  cardCount: number;
  layout: 'single' | 'linear' | 'triangle' | 'five' | 'celtic' | 'six' | 'hexagram';
  icon?: string;
  slots: SpreadSlot[];
}

export interface DealtCard {
  card: TarotCard;
  slot: SpreadSlot;
  isReversed: boolean;
  isFlipped: boolean;
}

export interface ReadingRecord {
  id: string;
  timestamp: number;
  question: string;
  spreadId: string;
  spreadName: string;
  cards: {
    cardId: number;
    slotId: string;
    slotTitle: string;
    isReversed: boolean;
  }[];
  aiInterpretation?: string;
  summary?: string;
  userNotes?: string;
  tags?: string[];
}

export type DeckTheme = 'banana-cyber' | 'cosmic-gold' | 'neon-matrix' | 'void-amethyst';

export type AppLanguage = 'en' | 'tl';

export interface AiChatMessage {
  role: 'user' | 'oracle';
  text: string;
  timestamp: number;
}
