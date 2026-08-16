import { useState, useMemo } from 'react';
import { TarotCard, DeckTheme } from '../types';
import { TAROT_DECK } from '../data/tarotDeck';
import { Search, Sparkles, BookOpen, X } from 'lucide-react';
import TarotCardView from './TarotCardView';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface CardExplorerProps {
  onSelectCard: (card: TarotCard) => void;
  deckTheme: DeckTheme;
}

export default function CardExplorer({ onSelectCard, deckTheme }: CardExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuit, setSelectedSuit] = useState<string>('all');
  const [selectedElement, setSelectedElement] = useState<string>('all');

  const filteredCards = useMemo(() => {
    return TAROT_DECK.filter((card) => {
      // Suit filter
      if (selectedSuit !== 'all' && card.suit !== selectedSuit) {
        return false;
      }
      // Element filter
      if (selectedElement !== 'all' && card.element !== selectedElement) {
        return false;
      }
      // Search text filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(q);
        const matchesNumber = card.number.toLowerCase().includes(q);
        const matchesKeywords = [...card.uprightKeywords, ...card.reversedKeywords].some((kw) =>
          kw.toLowerCase().includes(q)
        );
        const matchesLore = card.cyberLore.toLowerCase().includes(q);
        const matchesZodiac = card.zodiacOrPlanet?.toLowerCase().includes(q);
        const matchesTraditional = card.traditionalMeaning?.toLowerCase().includes(q);
        const matchesSymbolism = card.symbolism?.some((s) => s.toLowerCase().includes(q));

        if (!matchesName && !matchesNumber && !matchesKeywords && !matchesLore && !matchesZodiac && !matchesTraditional && !matchesSymbolism) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedSuit, selectedElement]);

  const suitFilters: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Arcana', icon: '✦' },
    { id: 'major', label: 'Major Arcana', icon: '👑' },
    { id: 'wands', label: 'Wands (Fire)', icon: '🔥' },
    { id: 'cups', label: 'Cups (Water)', icon: '🏆' },
    { id: 'swords', label: 'Swords (Air)', icon: '⚔️' },
    { id: 'pentacles', label: 'Pentacles (Earth)', icon: '🪙' },
  ];

  return (
    <div id="card-explorer-main" className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 flex flex-col gap-4">
      {/* Material 3 Search Bar & Filter Header */}
      <div className="bg-[#16112B]/90 border border-white/15 rounded-3xl p-4 sm:p-5 backdrop-blur-2xl flex flex-col gap-3.5 shadow-lg">
        {/* Material 3 Pill Search Bar */}
        <div className="relative w-full flex items-center bg-[#100B24] border border-white/15 focus-within:border-[#FFE600] rounded-full px-4 py-2.5 shadow-inner transition-all">
          <Search className="w-4 h-4 text-[#9D94B8] mr-2.5 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 78 cards by name, keyword, element..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#F5F3FF] placeholder-[#9D94B8]/60 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => {
                haptic.tick();
                setSearchQuery('');
              }}
              className="p-1 rounded-full hover:bg-white/10 text-[#9D94B8] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scrollable Material 3 Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {suitFilters.map((sf) => {
            const isActive = selectedSuit === sf.id;
            return (
              <button
                key={sf.id}
                onClick={() => {
                  haptic.tick();
                  setSelectedSuit(sf.id);
                  sound.playFlip();
                }}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#FFE600] text-[#080612] font-bold shadow-[0_0_15px_rgba(255,230,0,0.3)]'
                    : 'bg-[#100B24] text-[#D1CBE8] border border-white/10 hover:bg-white/10'
                }`}
              >
                <span>{sf.icon}</span>
                <span>{sf.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCards.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#16112B]/40 border border-white/5 flex flex-col items-center gap-2 text-[#9D94B8]">
          <p className="text-sm">No arcana match your search filter.</p>
          <button
            onClick={() => {
              haptic.tick();
              setSearchQuery('');
              setSelectedSuit('all');
            }}
            className="text-xs text-[#FFE600] font-mono hover:underline mt-1"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 pb-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                haptic.cardSelect();
                onSelectCard(card);
                sound.playFlip();
              }}
              className="flex flex-col items-center gap-2 group cursor-pointer p-2.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-[#FFE600]/30 transition-all active:scale-95"
            >
              <TarotCardView
                card={card}
                isFlipped={true}
                size="sm"
                theme={deckTheme}
                showInspectButton={false}
                disableFlip={true}
              />
              <div className="text-center w-full">
                <div className="text-xs font-serif font-bold text-[#F5F3FF] group-hover:text-[#FFE600] transition-colors truncate">
                  {card.name}
                </div>
                <div className="text-[10px] text-[#9D94B8] font-mono flex items-center justify-center gap-1">
                  <span>{card.number}</span>
                  <span>•</span>
                  <span className="capitalize">{card.element}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
