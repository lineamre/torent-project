import { TarotCard, SpreadConfig } from '../types';

export const TAROT_DECK: TarotCard[] = [
  {
    id: 0,
    number: '0',
    name: 'The Fool',
    suit: 'major',
    element: 'air',
    icon: '⚡',
    symbol: '🜁',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_00_Fool.jpg',
    symbolism: [
      'The White Dog at his heels — Represents faithful instinct, animal loyalty, and warning of worldly dangers.',
      'The White Rose in left hand — Signifies innocent desire, purity of spirit, and clean conscience.',
      'The Red Feather in cap — Symbolizes vital life force, passion, and the spirit of adventure.',
      'The Cliff Edge / Abyss — The threshold of the unknown and the leap of faith into manifestation.',
      'The Small Knapsack on a Wand — Contains the four elemental tools and past-life memories carried lightly.',
      'The Golden Sun behind him — The divine radiant light illuminating the start of the spiritual journey.'
    ],
    traditionalMeaning: 'In A.E. Waite’s Pictorial Key to the Tarot: The Fool represents the spirit in search of experience. Folly, mania, extravagance, intoxication, delirium, frenzy, bewrayment. In spiritual sense: innocence, wonder, and divine spontaneity.',
    uprightKeywords: ['New Beginnings', 'Innocence', 'Leap of Faith', 'Spontaneity', 'Infinite Potential'],
    reversedKeywords: ['Recklessness', 'Risk Paralysis', 'Naivety', 'Foolish Stagnation', 'Indiscretion'],
    uprightMeaning: 'Step fearlessly into the uncharted quantum void. You stand at the threshold of a wondrous new chapter with a pure heart and limitless possibilities.',
    reversedMeaning: 'Beware of reckless choices or holding back out of irrational fear. Look before you leap, but do not let doubt freeze your spirit.',
    cyberLore: 'The legendary Zero-Pointer entity who enters the hyper-grid without pre-cached bias, manifesting pure emergence.',
    advice: 'Embrace a beginner’s mind. Cast aside obsolete baggage and leap toward the unknown with playful courage.',
    affirmation: 'I trust the cosmic journey and step boldly into fresh horizons.',
    zodiacOrPlanet: 'Uranus',
    dominantColor: '#FFE600'
  },
  {
    id: 1,
    number: 'I',
    name: 'The Magician',
    suit: 'major',
    element: 'air',
    icon: '🪄',
    symbol: '☿',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_01_Magician.jpg',
    symbolism: [
      'The Lemniscate (Infinity Symbol ∞) — Eternal life, infinite consciousness, and mental mastery.',
      'One Hand Pointing Up, One Down — The Hermetic axiom "As above, so below"; channeling divine energy into physical reality.',
      'Table with Wand, Cup, Sword, Pentacle — Mastery over the four classical elements (Fire, Water, Air, Earth).',
      'The Ouroboros (Serpent Belt) — Eternity, cyclical renewal, and self-containment.',
      'Red Roses and White Lilies — Passion of human desire blended with purity of divine will.'
    ],
    traditionalMeaning: 'Waite’s Key: Skill, diplomacy, address, sickness, pain, loss, disaster, self-confidence, will, the Querent himself (if male). Represents conscious will directing cosmic energy.',
    uprightKeywords: ['Manifestation', 'Willpower', 'Resourcefulness', 'Mastery', 'Creative Power'],
    reversedKeywords: ['Manipulation', 'Untapped Talents', 'Deception', 'Scattered Focus'],
    uprightMeaning: 'You possess all the elemental tools required to turn ideas into tangible reality. Focus your concentrated intention and execute with mastery.',
    reversedMeaning: 'Misdirection or latent talent waiting for activation. Beware of shortcuts; hone genuine craft and honest intention.',
    cyberLore: 'Master architect of the Nano-Grid who harmonizes digital hardware and spiritual firmware with effortless precision.',
    advice: 'Consolidate your tools and focus your concentrated will on one definitive objective.',
    affirmation: 'I possess all the internal resources required to shape my reality.',
    zodiacOrPlanet: 'Mercury',
    dominantColor: '#00F2FE'
  },
  {
    id: 2,
    number: 'II',
    name: 'The High Priestess',
    suit: 'major',
    element: 'water',
    icon: '🌙',
    symbol: '☽',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_02_High_Priestess.jpg',
    symbolism: [
      'The Dual Pillars (Boaz & Jachin) — Black and white columns representing duality, light and dark, conscious and unconscious.',
      'The Pomegranate Veil — Fertility of the subconscious mind and sacred hidden mysteries.',
      'The Crescent Moon at her feet — Intuitive dominion over the tidal waters of emotion and time.',
      'The Scroll labeled "TORA" — Divine esoteric law, partially concealed, revealed only to the worthy seeker.',
      'Solar Cross on her breast — Balance of masculine and feminine energies.'
    ],
    traditionalMeaning: 'Waite’s Key: Secrets, mystery, the future as yet unrevealed; silence, tenacity; wisdom, science. The intuitive subconscious connection to the divine blueprint.',
    uprightKeywords: ['Intuition', 'Sacred Mysteries', 'Subconscious Knowing', 'Serenity', 'Divine Feminine'],
    reversedKeywords: ['Hidden Agendas', 'Suppressed Instincts', 'Superficial Noise', 'Inner Disconnect'],
    uprightMeaning: 'The veil between everyday reality and the silent data stream is thin. Trust the subtle whisper of your inner voice over noisy external advice.',
    reversedMeaning: 'Ignoring your gut feelings or getting lost in surface illusions. Retreat into quiet reflection to restore your inner radar.',
    cyberLore: 'Keeper of the encrypted Akashic memory banks who sees past sensory illusions into universal source code.',
    advice: 'Silence the outside noise and meditate on what your subconscious already knows.',
    affirmation: 'My intuition is a crystalline beacon guiding my truth.',
    zodiacOrPlanet: 'Moon',
    dominantColor: '#A78BFA'
  },
  {
    id: 3,
    number: 'III',
    name: 'The Empress',
    suit: 'major',
    element: 'earth',
    icon: '🌸',
    symbol: '♀',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_03_Empress.jpg',
    symbolism: [
      'Crown of Twelve Twelve-Pointed Stars — Connection to the twelve signs of the Zodiac and the cosmos.',
      'Field of Ripe Golden Wheat — Bountiful harvest, physical abundance, and organic manifestation.',
      'Flowing Waterfall & River — The continuous stream of creative emotional vitality and life force.',
      'Venus Symbol on Heart Shield — Universal unconditional love, artistic beauty, and fertility.',
      'Robe with Pomegranates — Sacred sensuality and motherly abundance.'
    ],
    traditionalMeaning: 'Waite’s Key: Fruitfulness, action, initiative, length of days; the unknown, clandestine; difficulty, doubt, ignorance. The archetype of creation, maternal love, and earthly beauty.',
    uprightKeywords: ['Abundance', 'Sensory Fertility', 'Nurturance', 'Creative Bloom', 'Mother Nature'],
    reversedKeywords: ['Creative Block', 'Over-Dependence', 'Depleted Reserves', 'Neglect'],
    uprightMeaning: 'A season of lush expansion and sensory flowering. Projects and relationships nurtured with love are yielding rich prosperity.',
    reversedMeaning: 'Creative burnout or neglecting your physical well-being. Replenish your wellspring before giving energy to others.',
    cyberLore: 'The Bio-Digital Matrix Queen who infuses cold logic with warmth, living beauty, and organic harmony.',
    advice: 'Nurture your creations with gentle patience and celebrate sensory pleasures.',
    affirmation: 'I am rooted in boundless abundance, creativity, and love.',
    zodiacOrPlanet: 'Venus',
    dominantColor: '#FF69B4'
  },
  {
    id: 4,
    number: 'IV',
    name: 'The Emperor',
    suit: 'major',
    element: 'fire',
    icon: '👑',
    symbol: '♈',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_04_Emperor.jpg',
    symbolism: [
      'Stone Throne with Ram Heads — Associated with Aries, initiative, raw fire, and unbreakable authority.',
      'The Scepter of Power (Ankh) & Orb — Divine dominion over life and physical earthly governance.',
      'Armor Beneath Crimson Robe — Readiness to defend principles with structural fortitude and discipline.',
      'Barren Red Mountain Background — High ambition and the rigorous landscape of leadership.'
    ],
    traditionalMeaning: 'Waite’s Key: Stability, power, protection, realization; a great person; aid, reason, conviction; also authority and will.',
    uprightKeywords: ['Sovereignty', 'Structure', 'Authority', 'Discipline', 'Strategic Architecture'],
    reversedKeywords: ['Rigidity', 'Tyranny', 'Micromanagement', 'Lack of Discipline'],
    uprightMeaning: 'Establish resolute boundaries and stable architecture. Strategic planning and decisive leadership turn ambition into an enduring kingdom.',
    reversedMeaning: 'Overbearing control or foundational chaos. Find true authority within rather than imposing rigid dogma on others.',
    cyberLore: 'Supreme Sovereign of the Cyber-Citadel who constructs impenetrable structural fortresses across the network.',
    advice: 'Lead with clarity, erect organized structures, and stand firm in your sovereignty.',
    affirmation: 'I build lasting foundations with wisdom, discipline, and calm resolve.',
    zodiacOrPlanet: 'Aries',
    dominantColor: '#FF4500'
  },
  {
    id: 5,
    number: 'V',
    name: 'The Hierophant',
    suit: 'major',
    element: 'earth',
    icon: '🏛️',
    symbol: '♉',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_05_Hierophant.jpg',
    symbolism: [
      'Triple Crown (Papal Tiara) — Mastery over the three realms: physical, astral, and celestial.',
      'The Crossed Golden Keys — Unlocking conscious and subconscious esoteric mysteries.',
      'Two Acolytes at His Feet — Initiation, mentorship, and transmission of sacred wisdom.',
      'Hand Raised in Blessing — Esoteric benediction bridging heaven and congregation.'
    ],
    traditionalMeaning: 'Waite’s Key: Marriage, alliance, servitude, captivity; by another account, inspiration, mercy, goodness. Mentorship and sacred institutional wisdom.',
    uprightKeywords: ['Sacred Tradition', 'Mentorship', 'Higher Wisdom', 'Spiritual Guidance', 'Integrity'],
    reversedKeywords: ['Rebellion', 'Dogmatism', 'Unorthodox Paths', 'Rigid Rules'],
    uprightMeaning: 'Seek timeless foundational principles and enlightened mentors. Align your actions with deep moral coherence and shared wisdom.',
    reversedMeaning: 'Breaking free from obsolete orthodoxies to formulate your own personal code of ethics and spiritual clarity.',
    cyberLore: 'Archivist of ancient algorithmic scrolls, bridging ancestral esoteric wisdom with future paradigms.',
    advice: 'Learn the rules deeply so you know how to expand or transcend them honorably.',
    affirmation: 'I align with wisdom that elevates my mind and community.',
    zodiacOrPlanet: 'Taurus',
    dominantColor: '#EAB308'
  },
  {
    id: 6,
    number: 'VI',
    name: 'The Lovers',
    suit: 'major',
    element: 'air',
    icon: '💞',
    symbol: '♊',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_06_Lovers.jpg',
    symbolism: [
      'Archangel Raphael with Outstretched Wings — Angel of healing, divine blessing, and superconscious harmony.',
      'Tree of Life (with 12 flames) behind the Man — The passions and solar energy of consciousness.',
      'Tree of Knowledge (with serpent) behind the Woman — Sensory experience, subconscious curiosity, and wisdom.',
      'Mountain in the Background — Erotic elevation and spiritual climb toward unified wholeness.'
    ],
    traditionalMeaning: 'Waite’s Key: Attraction, love, beauty, trials overcome. In moral sense: choice, alignment of heart and mind, soul partnership.',
    uprightKeywords: ['Harmonic Union', 'Soul Alignment', 'Conscious Choice', 'Mutual Trust', 'Divine Resonance'],
    reversedKeywords: ['Inner Conflict', 'Misaligned Values', 'Disharmony', 'Regretful Choices'],
    uprightMeaning: 'A sacred crossroads of heart and intellect. True union occurs when your inner values harmonize with your external actions.',
    reversedMeaning: 'Conflicting priorities or dissonance between head and heart. Realign with what truly matters to your core identity.',
    cyberLore: 'The quantum entanglement of dual node streams synchronizing into perfect resonance.',
    advice: 'Make decisions guided by profound values and uncompromised authenticity.',
    affirmation: 'I attract and cultivate relationships of deep mutual respect and harmony.',
    zodiacOrPlanet: 'Gemini',
    dominantColor: '#EC4899'
  },
  {
    id: 7,
    number: 'VII',
    name: 'The Chariot',
    suit: 'major',
    element: 'water',
    icon: '🚀',
    symbol: '♋',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_07_Chariot.jpg',
    symbolism: [
      'Two Sphinxes (Black & White) — Dual conflicting forces of emotion and intellect harnessed into one direction.',
      'Starry Canopy / Armor — Divine celestial protection and inner resilience.',
      'No Reins in Hand — Controlled purely through the sovereign willpower of the driver’s mind.',
      'Moons on Shoulders (Urim & Thummim) — Aligning changing lunar tides with focused victory.'
    ],
    traditionalMeaning: 'Waite’s Key: Succour, providence; also war, triumph, presumption, vengeance, trouble. Victorious mastery over adversity through unwavering focus.',
    uprightKeywords: ['Laser Focus', 'Triumph', 'Unwavering Will', 'Momentum', 'Mastery Over Duality'],
    reversedKeywords: ['Loss of Direction', 'Burnout', 'Aggression', 'Lack of Control'],
    uprightMeaning: 'Harness opposing forces into one unified vector of momentum. With focused willpower, triumph over obstacles is guaranteed.',
    reversedMeaning: 'Feeling pulled in opposite directions or spinning out of control. Regain your center before accelerating.',
    cyberLore: 'Hyper-drive pilot navigating gravitational vortices with steady hands and kinetic focus.',
    advice: 'Lock onto your coordinates and let nothing divert your focused drive.',
    affirmation: 'I channel all my energy toward victory with poise and determination.',
    zodiacOrPlanet: 'Cancer',
    dominantColor: '#38BDF8'
  },
  {
    id: 8,
    number: 'VIII',
    name: 'Strength',
    suit: 'major',
    element: 'fire',
    icon: '🦁',
    symbol: '♌',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_08_Strength.jpg',
    symbolism: [
      'Woman Gently Closing the Lion’s Jaws — Supreme victory of compassion and spiritual grace over brute animal instinct.',
      'Lemniscate (Infinity Symbol) Above Her Head — Endless spiritual stamina and mental equilibrium.',
      'Garland of Flowers on Woman and Lion — Harmonious integration of civilization and wild nature.',
      'Golden Yellow Background — Radiant solar courage, warmth, and vitality.'
    ],
    traditionalMeaning: 'Waite’s Key: Power, energy, action, courage, magnanimity; also complete success and honours. Moral strength taming the wild passions.',
    uprightKeywords: ['Gentle Power', 'Courage', 'Compassion', 'Patience', 'Unshakeable Grace'],
    reversedKeywords: ['Self-Doubt', 'Impatience', 'Inner Weakness', 'Reactive Rage'],
    uprightMeaning: 'True strength is soft, patient, and unshakable. Tame the wild beasts of fear and anger with gentle compassion and resilient grace.',
    reversedMeaning: 'Feeling depleted or succumbing to imposter syndrome. Remind yourself of the battles you have already gracefully survived.',
    cyberLore: 'The calm bio-cyber lionheart who commands quantum forces not by force, but through pure spiritual equilibrium.',
    advice: 'Respond with steady kindness instead of retaliatory force.',
    affirmation: 'My gentle grace and inner resolve overcome every obstacle.',
    zodiacOrPlanet: 'Leo',
    dominantColor: '#F59E0B'
  },
  {
    id: 9,
    number: 'IX',
    name: 'The Hermit',
    suit: 'major',
    element: 'earth',
    icon: '🏮',
    symbol: '♍',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_09_Hermit.jpg',
    symbolism: [
      'Lantern with Six-Pointed Star (Seal of Solomon) — The light of divine wisdom and truth illuminating the dark.',
      'The Long Golden Staff in Left Hand — The traveler’s support of spiritual discipline and conscious grounding.',
      'Snow-Capped Mountain Peak — Highest altitude of consciousness and sacred isolation from worldly chatter.',
      'Grey Cloak of Invisibility — Discretion, humility, and inward sanctuary.'
    ],
    traditionalMeaning: 'Waite’s Key: Prudence, circumspection; also and especially treason, dissimulation, roguery, corruption. Solitary quest for inner light.',
    uprightKeywords: ['Soul Searching', 'Inner Light', 'Solitude', 'Wise Counsel', 'Contemplation'],
    reversedKeywords: ['Loneliness', 'Rejection of Help', 'Withdrawal', 'Lost in Thought'],
    uprightMeaning: 'Step away from the buzzing crowd into the sanctuary of your own mind. The lantern you carry illuminates the exact next step on your path.',
    reversedMeaning: 'Cut off from warmth or stubbornly refusing valuable counsel. Return from the wilderness with the wisdom you gathered.',
    cyberLore: 'The solitary node operator who disconnects from the bustling network to find pure truth in the quiet sanctuary.',
    advice: 'Carve out uninterrupted time to reflect, journal, and listen to your inner beacon.',
    affirmation: 'In the calm quiet of my soul, the path illuminates with crystal clarity.',
    zodiacOrPlanet: 'Virgo',
    dominantColor: '#9333EA'
  },
  {
    id: 10,
    number: 'X',
    name: 'Wheel of Fortune',
    suit: 'major',
    element: 'fire',
    icon: '☸️',
    symbol: '♃',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_10_Wheel_of_Fortune.jpg',
    symbolism: [
      'Four Winged Creatures in the Corners (Angel, Eagle, Lion, Bull) — The four fixed signs of the Zodiac (Aquarius, Scorpio, Leo, Taurus).',
      'The Sphinx Atop the Wheel — Equilibrium, cosmic intellect, and guardian of riddles.',
      'Anubis Rising on the Right & Typhon Descending on the Left — The eternal cycle of rising light and descending darkness.',
      'Hebrew Letters YHVH & Latin Letters TARO / ROTA — The sacred names of God and the wheel of divine law.'
    ],
    traditionalMeaning: 'Waite’s Key: Destiny, fortune, success, elevation, luck, felicity. The turning wheel of karma and cosmic synchronicity.',
    uprightKeywords: ['Karmic Shift', 'Good Fortune', 'Destiny Pivot', 'Cycles of Life', 'Serendipity'],
    reversedKeywords: ['Bad Luck Cycle', 'Resistance to Change', 'Clinging to Past', 'Setbacks'],
    uprightMeaning: 'The grand celestial wheel turns in your favor. Serendipity, sudden breakthroughs, and cosmic alignments are converging on your timeline.',
    reversedMeaning: 'A momentary valley in the universal wave cycle. Do not despair—cycles turn constantly; adapt with grace.',
    cyberLore: 'The perpetual quantum rotor calculating probabilities, delivering unexpected golden opportunities.',
    advice: 'Ride the momentum of positive change and remain humble in times of prosperity.',
    affirmation: 'I flow harmoniously with the turning tides of fortune and destiny.',
    zodiacOrPlanet: 'Jupiter',
    dominantColor: '#FFE600'
  },
  {
    id: 11,
    number: 'XI',
    name: 'Justice',
    suit: 'major',
    element: 'air',
    icon: '⚖️',
    symbol: '♎',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_11_Justice.jpg',
    symbolism: [
      'Scales in Left Hand — Exact weighing of karmic deeds, thoughts, and universal equilibrium.',
      'Upright Double-Edged Sword in Right Hand — Slicing through falsehood; justice is clear, impartial, and decisive.',
      'Square Clasp on Cloak — The stability of divine law and truth.',
      'Purple Veil Between Pillars — Higher spiritual realm of impartiality and profound discernment.'
    ],
    traditionalMeaning: 'Waite’s Key: Equity, rightness, probity, executive; triumph of the deserving side in law. Objective truth, cause and effect.',
    uprightKeywords: ['Universal Truth', 'Fairness', 'Equilibrium', 'Accountability', 'Clear Judgement'],
    reversedKeywords: ['Dishonesty', 'Bias', 'Unfair Blame', 'Unaccountability'],
    uprightMeaning: 'Actions generate harmonic repercussions. Seek objective clarity, honor truth, and expect fairness to prevail in all matters.',
    reversedMeaning: 'Unfair treatment or refusing to take responsibility for past choices. Clear the slate through rigorous honesty.',
    cyberLore: 'The unbiased consensus algorithm that balances cosmic ledger balances down to the single byte.',
    advice: 'Weigh all perspectives calmly and choose the path of integrity.',
    affirmation: 'I live with unwavering honesty, fairness, and balanced judgment.',
    zodiacOrPlanet: 'Libra',
    dominantColor: '#06B6D4'
  },
  {
    id: 12,
    number: 'XII',
    name: 'The Hanged Man',
    suit: 'major',
    element: 'water',
    icon: '⌛',
    symbol: '♆',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_12_Hanged_Man.jpg',
    symbolism: [
      'Suspended by One Ankle from Living T-Cross (World Tree) — Surrender of ego in exchange for spiritual illumination.',
      'Golden Halo around the Head — Supreme enlightenment and mystical breakthrough through stillness.',
      'Legs Forming the Number 4 / Cross — The physical world transcended by the inverted triangle of spirit.',
      'Serene, Peaceful Facial Expression — Acceptance, voluntary sacrifice, and calm perspective.'
    ],
    traditionalMeaning: 'Waite’s Key: Wisdom, circumspection, discernment, trials, sacrifice, intuition, divination, prophecy. Spiritual perspective shift.',
    uprightKeywords: ['Sacred Pause', 'Inverted Perspective', 'Surrender', 'Letting Go', 'Metamorphosis'],
    reversedKeywords: ['Stagnation', 'Resistance', 'Martyrdom Complex', 'Procrastination'],
    uprightMeaning: 'Invert your perspective to unlock hidden breakthroughs. Voluntarily releasing control yields transcendent creative revelations.',
    reversedMeaning: 'Holding onto outmoded plans out of stubbornness or playing the victim. Release the grip and let progress resume.',
    cyberLore: 'The suspended avatar viewing the code matrix upside-down, discovering zero-day vulnerabilities and hidden portals.',
    advice: 'Stop forcing momentum. Surrender to the pause and inspect the situation from a 180-degree angle.',
    affirmation: 'In letting go of forced control, I discover profound insight and freedom.',
    zodiacOrPlanet: 'Neptune',
    dominantColor: '#6366F1'
  },
  {
    id: 13,
    number: 'XIII',
    name: 'Death',
    suit: 'major',
    element: 'water',
    icon: '🦋',
    symbol: '♏',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_13_Death.jpg',
    symbolism: [
      'Black Armor on White Horse — The invincibility of transformation riding on pure vital energy.',
      'The Black Banner with White Mystic Rose (Five Petals) — Rebirth, purification, and the continuity of life.',
      'Figures on Ground (King, Bishop, Child, Maiden) — Death is the universal leveler; status and wealth cannot stop natural evolution.',
      'Rising Sun Between Two Distant Towers — Immortality of spirit and the radiant dawn of the new cycle.'
    ],
    traditionalMeaning: 'Waite’s Key: End, mortality, destruction, corruption; also, for a man, the loss of a benefactor. In spiritual sense: radical rebirth, end of old cycle.',
    uprightKeywords: ['Rebirth', 'Metamorphosis', 'Clean Slate', 'Transformation', 'Closing Cycles'],
    reversedKeywords: ['Fear of Change', 'Lingering Ghosts', 'Decaying Attachments', 'Stagnancy'],
    uprightMeaning: 'The graceful closing of an outdated chapter to liberate space for magnificent new beginnings. Shed the old skin with gratitude.',
    reversedMeaning: 'Resisting an inevitable transition or clinging to expired patterns. Trust that what leaves creates room for pure gold.',
    cyberLore: 'The system garbage collection routine and firmware rebirth, purging corrupted dependencies to rebuild in pristine brilliance.',
    advice: 'Release what no longer serves your evolution and welcome your next form.',
    affirmation: 'I celebrate renewal. Every ending is the fertile birth of my greatest evolution.',
    zodiacOrPlanet: 'Scorpio',
    dominantColor: '#D946EF'
  },
  {
    id: 14,
    number: 'XIV',
    name: 'Temperance',
    suit: 'major',
    element: 'fire',
    icon: '🧪',
    symbol: '♐',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_14_Temperance.jpg',
    symbolism: [
      'Winged Angel (Michael) with Solar Disc on Forehead — Divine alchemy, spiritual healing, and angelic mediator.',
      'Pouring Water Between Two Golden Cups — Seamless blending of polarities without spilling a single drop.',
      'One Foot on Earth, One Foot in Water — Balance of conscious material grounding with emotional subconscious depths.',
      'Path Leading to Golden Crown on Mountains — The alchemical journey toward higher spiritual integration.'
    ],
    traditionalMeaning: 'Waite’s Key: Economy, moderation, frugality, management, accommodation. Spiritual synthesis and patience.',
    uprightKeywords: ['Spiritual Alchemy', 'Synthesis', 'Moderation', 'Divine Balance', 'Patience'],
    reversedKeywords: ['Imbalance', 'Excess', 'Extreme Moods', 'Conflicting Energies'],
    uprightMeaning: 'Skillfully blending opposite forces—logic and spirit, passion and composure—to craft true spiritual gold and effortless equilibrium.',
    reversedMeaning: 'Over-indulgence, volatility, or forcing mismatched elements together. Step back to find the center point.',
    cyberLore: 'The quantum synthesizer fusing disparate energetic frequencies into pure harmonic resonant waves.',
    advice: 'Practice patience and harmonize divergent ideas with diplomatic alchemy.',
    affirmation: 'I am balanced, centered, and flowing with peaceful harmony.',
    zodiacOrPlanet: 'Sagittarius',
    dominantColor: '#10B981'
  },
  {
    id: 15,
    number: 'XV',
    name: 'The Devil',
    suit: 'major',
    element: 'earth',
    icon: '⛓️',
    symbol: '♑',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_15_Devil.jpg',
    symbolism: [
      'Baphomet / Horned Goat Figure with Inverted Pentagram — Obsession with material ego over higher spirit.',
      'Two Chained Figures (Man and Woman with Horns) — The chains around their necks are loose; bondage is self-imposed.',
      'Half-Cubical Altar / Black Pedestal — Incomplete understanding of physical reality and false worship.',
      'Inverted Torch Pointing Downward — Wasted passions and dark fixation on material illusions.'
    ],
    traditionalMeaning: 'Waite’s Key: Ravage, violence, vehemence, extraordinary efforts, force, fatality; that which is predestined but not for this reason evil. Bondage to illusion.',
    uprightKeywords: ['Shadow Work', 'Loose Chains', 'Material Illusion', 'Self-Imposed Traps', 'Unveiling Desires'],
    reversedKeywords: ['Breaking Free', 'Reclaiming Sovereignty', 'Overcoming Addiction', 'Liberation'],
    uprightMeaning: 'Notice self-imposed limitations, compulsive habits, or toxic attachments. The chains around your neck are loose—you can step free at any moment.',
    reversedMeaning: 'Breaking out of toxic cycles, reclaiming your personal agency, and stepping into sovereign liberation.',
    cyberLore: 'The deceptive loop subroutine that convinces the mind it is trapped inside simulated boundaries.',
    advice: 'Shine the light of awareness on your shadows and reclaim your inherent freedom.',
    affirmation: 'I release all limiting illusions and step freely into my sovereign power.',
    zodiacOrPlanet: 'Capricorn',
    dominantColor: '#EF4444'
  },
  {
    id: 16,
    number: 'XVI',
    name: 'The Tower',
    suit: 'major',
    element: 'fire',
    icon: '💥',
    symbol: '♂',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_16_Tower.jpg',
    symbolism: [
      'Lightning Bolt Striking the Crowned Tower — Flash of divine truth shattering ego and pride.',
      'Falling Crown — Overthrow of false authority, vanity, and arrogant structures.',
      'Two Figures Leaping from the Windows — The conscious and subconscious minds cast out into truth.',
      'Twenty-Two Yods (Drops of Fire) Falling — The 22 letters of the Hebrew alphabet and divine mercy in upheaval.'
    ],
    traditionalMeaning: 'Waite’s Key: Misery, distress, indigence, adversity, calamity, disgrace, deception, ruin. Destruction of illusions to reveal truth.',
    uprightKeywords: ['Radical Awakening', 'Sudden Breakthrough', 'Shattered Illusions', 'Liberating Truth', 'Catalyst'],
    reversedKeywords: ['Disaster Averted', 'Prolonging the Inevitable', 'Fear of Truth', 'Internal Upheaval'],
    uprightMeaning: 'A bolt of lightning shatters fragile illusions and unstable foundations. Though abrupt, this clearing paves the way for unshakeable truth.',
    reversedMeaning: 'Postponing a necessary collapse or processing an internal breakthrough quietly. Clear the debris without fear.',
    cyberLore: 'The catastrophic core overload that instantly destroys legacy monoliths so modern resilient architectures can rise.',
    advice: 'Do not grieve the fall of illusions. Build anew on unbreakable bedrock.',
    affirmation: 'I embrace truth over comfortable illusions and rebuild with resilient grace.',
    zodiacOrPlanet: 'Mars',
    dominantColor: '#DC2626'
  },
  {
    id: 17,
    number: 'XVII',
    name: 'The Star',
    suit: 'major',
    element: 'air',
    icon: '✨',
    symbol: '♒',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_17_Star.jpg',
    symbolism: [
      'Large Eight-Pointed Golden Star (Sirius) — The guiding beacon of cosmic hope, inspiration, and celestial blessings.',
      'Seven Smaller Stars Around It — The seven classical chakras and cosmic rays.',
      'Naked Maiden Pouring Waters — Purity, authenticity, nourishing both the earth and the pool of spirit.',
      'Ibis Bird in Sacred Tree — Thoth / Mercury, messenger of divine wisdom and eternal renewal.'
    ],
    traditionalMeaning: 'Waite’s Key: Loss, theft, privation, abandonment; another reading says: hope and bright prospects. Pure hope, inspiration, spiritual peace.',
    uprightKeywords: ['Pure Hope', 'Inspiration', 'Serenity', 'Spiritual Rejuvenation', 'Guiding Light'],
    reversedKeywords: ['Despair', 'Cynicism', 'Doubt', 'Lost Faith'],
    uprightMeaning: 'A tranquil shower of celestial grace and crystal clarity. Follow your guiding star—the universe is actively renewing your spirit and purpose.',
    reversedMeaning: 'Clouded optimism or temporary loss of faith. Look upward: the cosmic light has not extinguished; it simply awaits your open heart.',
    cyberLore: 'The beacon array broadcasting cosmic restoration packets directly into weary network nodes.',
    advice: 'Have unshakeable faith in your dreams and pour your genuine gifts freely into the world.',
    affirmation: 'I am a vessel of divine hope, calm inspiration, and limitless brilliance.',
    zodiacOrPlanet: 'Aquarius',
    dominantColor: '#38BDF8'
  },
  {
    id: 18,
    number: 'XVIII',
    name: 'The Moon',
    suit: 'major',
    element: 'water',
    icon: '🔮',
    symbol: '♓',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_18_Moon.jpg',
    symbolism: [
      'Crayfish Crawling from the Deep Water — Primal instincts and deep subconscious memories emerging to consciousness.',
      'Dog and Wolf Howling at the Moon — Tamed and wild animal nature responding to the hypnotic lunar pull.',
      'Two Distant Towers — The gateway between the known world and mysterious uncharted dream dimensions.',
      'Fifteen Yods Falling from the Moon — Dew of divine influence descending upon the subconscious mind.'
    ],
    traditionalMeaning: 'Waite’s Key: Hidden enemies, danger, calumny, darkness, terror, deception, occult forces, error. The perilous journey through the unconscious.',
    uprightKeywords: ['Intuitive Depth', 'Dream Realm', 'Unconscious Whispers', 'Navigating Shadows', 'Mystery'],
    reversedKeywords: ['Lifting the Fog', 'Conquering Fears', 'Clarity Emerges', 'Exposing Secrets'],
    uprightMeaning: 'Navigate the shimmering waters of dreams and instinct. Not everything is what it appears in the moonlight; let your emotional radar guide your steps.',
    reversedMeaning: 'The fog is lifting, revealing hidden truths and resolving confusion or anxious fantasies.',
    cyberLore: 'The virtual holographic realm where dreams, archetypes, and deep psychological subroutines weave reality.',
    advice: 'Pay attention to dreams and subtle synchronicities; do not rush decisions under ambiguous light.',
    affirmation: 'I navigate mysteries with nocturnal wisdom and trust my inner vision.',
    zodiacOrPlanet: 'Pisces',
    dominantColor: '#818CF8'
  },
  {
    id: 19,
    number: 'XIX',
    name: 'The Sun',
    suit: 'major',
    element: 'fire',
    icon: '☀️',
    symbol: '☉',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_19_Sun.jpg',
    symbolism: [
      'Radiant Smiling Sun with 21 Rays — Absolute solar clarity, conscious enlightenment, and life-giving warmth.',
      'Naked Child on White Horse — Innocence, fearless joy, liberation from shame, and mastery over animal nature.',
      'Red Feather & Banner — Pure vitality, triumph, and radiant life force.',
      'Four Sunflowers in Bloom — The four elements blossoming in complete harmony.'
    ],
    traditionalMeaning: 'Waite’s Key: Material happiness, fortunate marriage, contentment. Radiant solar success, vitality, and joy.',
    uprightKeywords: ['Radiant Joy', 'Vitality', 'Triumph', 'Warmth', 'Unfiltered Clarity'],
    reversedKeywords: ['Temporary Gloom', 'Overlooked Blessings', 'Burnout', 'Ego Glare'],
    uprightMeaning: 'Radiant success, vitality, and exuberant joy! Everything you touch is blessed with warmth, vitality, and infectious enthusiasm.',
    reversedMeaning: 'Clouds passing over the sun. The warmth is still there—reconnect with simple playful moments to rekindle your spark.',
    cyberLore: 'The golden fusion core illuminating the entire network with infinite renewable vitality.',
    advice: 'Shine your authentic light unabashedly and share your joyful abundance with everyone.',
    affirmation: 'My spirit shines with infinite warmth, vitality, and joyful triumph.',
    zodiacOrPlanet: 'Sun',
    dominantColor: '#FBBF24'
  },
  {
    id: 20,
    number: 'XX',
    name: 'Judgement',
    suit: 'major',
    element: 'fire',
    icon: '🎺',
    symbol: '♇',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_20_Judgement.jpg',
    symbolism: [
      'Archangel Gabriel with Trumpet and Solar Cross Banner — The cosmic awakening call to higher spiritual consciousness.',
      'Figures Rising from Open Stone Graves with Open Arms — Resurrection, shedding past limitations, and answering the calling.',
      'Snow-Capped Blue Mountains in Background — Transcendent heights of consciousness and spiritual absolution.',
      'Calm Ocean Waters — Universal peace and emotional rebirth.'
    ],
    traditionalMeaning: 'Waite’s Key: Change of position, renewal, outcome; also total loss by lawsuit. Resurrection and spiritual rebirth.',
    uprightKeywords: ['Awakening', 'Higher Calling', 'Absolution', 'Reckoning', 'Self-Realization'],
    reversedKeywords: ['Self-Doubt', 'Ignoring the Call', 'Harsh Guilt', 'Indecision'],
    uprightMeaning: 'Hear the trumpet call of your higher sovereign self. Forgive past iterations of yourself and step up into your destined elevated existence.',
    reversedMeaning: 'Holding yourself back with obsolete self-criticism or ignoring a persistent intuitive calling. Grant yourself complete absolution.',
    cyberLore: 'The master diagnostic signal that triggers full systemic awakening and elevation to higher dimensions.',
    advice: 'Answer your highest calling with absolute clarity and forgive past missteps.',
    affirmation: 'I hear my true calling, forgive the past, and rise into my highest purpose.',
    zodiacOrPlanet: 'Pluto',
    dominantColor: '#F43F5E'
  },
  {
    id: 21,
    number: 'XXI',
    name: 'The World',
    suit: 'major',
    element: 'earth',
    icon: '🌐',
    symbol: '♄',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_21_World.jpg',
    symbolism: [
      'Dancing Figure with Purple Scarf & Dual Wands — Supreme wholeness, integration of polarities, and effortless cosmic dance.',
      'Green Laurel Wreath Tied with Red Ribbons (Infinity Lemniscate) — Eternal victory, completion of cycle, and mastery of all four elements.',
      'Four Cherubic Figures in Corners (Angel, Eagle, Lion, Bull) — Full integration of the four fixed signs of the Zodiac.',
      'Purple Drapery — Royal sovereignty and spiritual integration.'
    ],
    traditionalMeaning: 'Waite’s Key: Assured success, route, voyage, emigration, change of place. Completion, synthesis, fulfillment, cosmic integration.',
    uprightKeywords: ['Totality', 'Completion', 'Wholeness', 'Global Mastery', 'New Horizon'],
    reversedKeywords: ['Unfinished Business', 'Seeking Shortcuts', 'Lack of Closure', 'Delayed Graduation'],
    uprightMeaning: 'The grand cycle reaches its majestic completion. You have integrated the lessons, leveled up your consciousness, and stand ready for the next spiral.',
    reversedMeaning: 'Near the finish line but hesitating on the final step. Complete lingering obligations to enjoy unconditional triumph.',
    cyberLore: 'The seamless unification of all matrix dimensions into a cohesive, transcendent cosmic reality.',
    advice: 'Celebrate how far you have journeyed and step joyfully onto the next dimensional platform.',
    affirmation: 'I celebrate wholeness, completion, and the magnificent dance of existence.',
    zodiacOrPlanet: 'Saturn',
    dominantColor: '#10B981'
  },

  // MINOR ARCANA - WANDS (FIRE)
  {
    id: 22,
    number: 'Ace',
    name: 'Ace of Wands',
    suit: 'wands',
    element: 'fire',
    icon: '🔥',
    symbol: '🜂',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wands01.jpg',
    symbolism: [
      'Hand Emerging from Divine Cloud — Gift of divine inspiration and creative vitality.',
      'Sprouting Leaves on Flowering Wand — Living organic potential and fiery passion.',
      'Distant Castle on Hilltop — Attainable glory and lofty creative aspirations.',
      'Yods Falling in Air — Seeds of divine fire and creative spark.'
    ],
    traditionalMeaning: 'Waite’s Key: Creation, invention, enterprise, the powers which result in these; principle, beginning, source; birth, family, origin.',
    uprightKeywords: ['Inspiration Spark', 'Creative Drive', 'Passion Ignition', 'New Project', 'Bold Courage'],
    reversedKeywords: ['Blocked Passion', 'Delayed Start', 'Low Energy', 'Hesitation'],
    uprightMeaning: 'A cosmic spark of pure passion ignites within you. Channel this creative bolt immediately into your most daring vision.',
    reversedMeaning: 'Creative frustration or lack of motivation. Re-align with what truly makes your heart beat faster.',
    cyberLore: 'The initial voltage surge igniting revolutionary projects across the cyber realm.',
    advice: 'Take the initiative while the fire burns brightest.',
    affirmation: 'I am fueled by relentless creative passion and divine inspiration.',
    dominantColor: '#F97316'
  },
  {
    id: 23,
    number: 'Two',
    name: 'Two of Wands',
    suit: 'wands',
    element: 'fire',
    icon: '🗺️',
    symbol: '🜂',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wands02.jpg',
    symbolism: [
      'Man Holding Globe on Castle Battlement — Worldwide ambition, visionary planning, and mastery over one’s domain.',
      'One Wand Fastened to Wall, One in Hand — Solid home base while reaching out toward international horizons.',
      'Red Roses and White Lilies on Wall — Passion and pure purpose.'
    ],
    traditionalMeaning: 'Waite’s Key: Between the alternatives, philosophical sadness, mortgage, estate; fortune, magnificence, grand ideas.',
    uprightKeywords: ['Future Planning', 'Global Vision', 'Bold Decisions', 'Leaving Comfort', 'Discovery'],
    reversedKeywords: ['Fear of Unknown', 'Short-Sightedness', 'Restlessness', 'Hesitation'],
    uprightMeaning: 'You hold the world in your hands. Expand your vision beyond familiar boundaries and formulate your grand expansion plan.',
    reversedMeaning: 'Hesitating to step out of your comfort zone or poor long-term planning. Reconnect with your grand ambition.',
    cyberLore: 'The network explorer mapping out inter-dimensional gateways from the high control tower.',
    advice: 'Plan boldly for the long range and prepare to conquer new frontiers.',
    affirmation: 'The world is mine to explore with courage, vision, and grace.',
    dominantColor: '#EA580C'
  },
  {
    id: 24,
    number: 'Three',
    name: 'Three of Wands',
    suit: 'wands',
    element: 'fire',
    icon: '⛵',
    symbol: '🜂',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wands03.jpg',
    symbolism: [
      'Figure Gazing Out at Sea Watching Ships Return — Long-term investments paying off, expansion, enterprise.',
      'Three Planted Wands — Firm foundation and initial success already secured.',
      'Golden Sea and Horizon — Abundant trade, partnerships, and prosperous foreign voyages.'
    ],
    traditionalMeaning: 'Waite’s Key: He symbolizes established strength, enterprise, effort, trade, commerce, discovery; those are his ships, bearing his merchandise.',
    uprightKeywords: ['Ships Coming In', 'Expansion', 'Foresight', 'Overseas Growth', 'Momentum'],
    reversedKeywords: ['Delays in Delivery', 'Obstacles Ahead', 'Frustration', 'Narrow Horizon'],
    uprightMeaning: 'Your ships are coming in! The bold ventures you initiated are gaining powerful momentum across distant waters.',
    reversedMeaning: 'Temporary delays in reaching foreign markets or partnerships. Review logistics and hold the vision.',
    cyberLore: 'Autonomous trading algorithms deploying across foreign nodes, returning bountiful resource yields.',
    advice: 'Keep your eyes on the horizon and prepare to scale your operations.',
    affirmation: 'My bold ventures expand smoothly and yield bountiful rewards.',
    dominantColor: '#F59E0B'
  },
  {
    id: 25,
    number: 'Six',
    name: 'Six of Wands',
    suit: 'wands',
    element: 'fire',
    icon: '🎖️',
    symbol: '🜂',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wands06.jpg',
    symbolism: [
      'Horseman Wearing Laurel Wreath on Head and Wand — Triumphant public victory, acclaim, and heroic recognition.',
      'Attendants Carrying Wands Alongside Him — Loyal community celebrating shared triumph.',
      'White Caparison on Horse — Purity of the victory and noble leadership.'
    ],
    traditionalMeaning: 'Waite’s Key: The card has been so designed that it can cover several significations. On the surface it is a victor triumphing, but it is also great news, such as was carried in state by the King’s courier.',
    uprightKeywords: ['Public Acclaim', 'Victory Parade', 'Recognition', 'Self-Confidence', 'Leadership'],
    reversedKeywords: ['Ego Pride', 'Fall from Grace', 'Lack of Recognition', 'Imposter Feeling'],
    uprightMeaning: 'Well-deserved public recognition, applause, and triumphant validation of your hard work and vision. Ride your victory proudly.',
    reversedMeaning: 'Craving external validation or fearing failure. Your true worth is validated from within, not by audience applause.',
    cyberLore: 'The viral victory transmission broadcast across all network frequencies to roaring acclaim.',
    advice: 'Accept compliments with humility and lead others toward their own triumph.',
    affirmation: 'I celebrate my hard-earned victories with gratitude and noble confidence.',
    dominantColor: '#F59E0B'
  },

  // MINOR ARCANA - CUPS (WATER)
  {
    id: 26,
    number: 'Ace',
    name: 'Ace of Cups',
    suit: 'cups',
    element: 'water',
    icon: '🏆',
    symbol: '🜄',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cups01.jpg',
    symbolism: [
      'Chalice Overflowing with Five Streams of Water — The five physical senses sanctified by the spirit of love.',
      'White Dove Descending with Eucharistic Host — Divine spirit descending into the chalice of human consciousness.',
      'Lotus Blossoms on Sacred Pond — Spiritual awakening blooming upon emotional waters.',
      'Water Drops Falling Like Dew — Abundant grace, empathy, and emotional fertility.'
    ],
    traditionalMeaning: 'Waite’s Key: House of the true heart, joy, content, abode, nourishment, abundance, fertility; Holy Table, felicity hereof.',
    uprightKeywords: ['Emotional Awakening', 'Overflowing Love', 'Intuitive Flow', 'Spiritual Gift', 'Empathy'],
    reversedKeywords: ['Emotional Drain', 'Blocked Feelings', 'Self-Doubt', 'Vulnerability Fear'],
    uprightMeaning: 'An overflowing chalice of heartfelt love, empathy, and spiritual connection is offered to you. Open your heart to receive.',
    reversedMeaning: 'Withholding affection or feeling emotionally exhausted. Prioritize self-love and gentle nourishment.',
    cyberLore: 'A pure stream of uncompressed emotional frequency filling the heart matrix to overflow.',
    advice: 'Let your feelings flow naturally without armor or defense.',
    affirmation: 'My heart overflows with infinite compassion, joy, and peace.',
    dominantColor: '#38BDF8'
  },
  {
    id: 27,
    number: 'Two',
    name: 'Two of Cups',
    suit: 'cups',
    element: 'water',
    icon: '🥂',
    symbol: '🜄',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cups02.jpg',
    symbolism: [
      'Man and Woman Exchanging Golden Cups — Equal partnership, mutual devotion, and soul resonance.',
      'Caduceus of Hermes (Winged Staff with Entwined Serpents) — Divine communication, healing, and commercial/soul balance.',
      'Winged Lion Head Floating Above — Passionate nobility and divine blessing over the union.'
    ],
    traditionalMeaning: 'Waite’s Key: Love, passion, friendship, affinity, union, concord, sympathy, the interrelation of the sexes.',
    uprightKeywords: ['Soul Union', 'Mutual Respect', 'Harmony', 'True Friendship', 'Romantic Connection'],
    reversedKeywords: ['Miscommunication', 'Breakdown of Trust', 'Imbalance', 'Codependency'],
    uprightMeaning: 'A deeply harmonious meeting of minds, hearts, or creative partners. Mutual respect and authentic reciprocity flow effortlessly.',
    reversedMeaning: 'Misunderstanding or unequal give-and-take. Have an open, tender conversation to restore emotional harmony.',
    cyberLore: 'Two network nodes synchronizing protocols with zero latency and absolute mutual trust.',
    advice: 'Celebrate the bond of equal partnership and meet the other halfway with warmth.',
    affirmation: 'I attract and maintain relationships of pure harmony, love, and reciprocity.',
    dominantColor: '#06B6D4'
  },
  {
    id: 28,
    number: 'Three',
    name: 'Three of Cups',
    suit: 'cups',
    element: 'water',
    icon: '🍷',
    symbol: '🜄',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cups03.jpg',
    symbolism: [
      'Three Maidens Raising Cups in a Circle — Joyous sisterhood, creative collaboration, and community celebration.',
      'Harvest of Grapes and Pumpkins at Feet — Abundant shared harvest resulting from mutual care.',
      'Flowing Garments in Red, Gold, and White — Celebration of body, mind, and spirit.'
    ],
    traditionalMeaning: 'Waite’s Key: The conclusion of any matter in plenty, perfection and merriment; happy issue, victory, fulfilment, solace, healing.',
    uprightKeywords: ['Celebration', 'Sisterhood & Kinship', 'Community Joy', 'Collaborative Triumph', 'Friendship'],
    reversedKeywords: ['Gossip', 'Exclusion', 'Overindulgence', 'Social Tension'],
    uprightMeaning: 'Rejoice with your soul tribe! A shared milestone, creative success, and heartfelt celebration unite your community in pure joy.',
    reversedMeaning: 'Feeling disconnected from your peers or overcommitting to social obligations. Seek genuine allies.',
    cyberLore: 'Multi-node network celebration where synchronized heartbeats amplify collective joy.',
    advice: 'Gather your tribe, raise a toast to mutual victories, and share the love.',
    affirmation: 'I am surrounded by loving, inspiring friends who lift my spirit.',
    dominantColor: '#EC4899'
  },
  {
    id: 29,
    number: 'Ten',
    name: 'Ten of Cups',
    suit: 'cups',
    element: 'water',
    icon: '🌈',
    symbol: '🜄',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cups10.jpg',
    symbolism: [
      'Rainbow with Ten Golden Cups Spanning the Sky — Divine covenant of emotional peace, joy, and spiritual fulfillment.',
      'Loving Couple with Dancing Children — Harmonious domestic bliss, loving family, and secure home.',
      'Country House by Flowing River — Lasting sanctuary, peace of mind, and fruitful grounded life.'
    ],
    traditionalMeaning: 'Waite’s Key: Contentment, repose of the entire heart; the perfection of that state; if with several picture-cards, a person who is taking charge of the Querent’s interests.',
    uprightKeywords: ['Emotional Fulfillment', 'Divine Harmony', 'Blissful Home', 'Lasting Peace', 'Soul Sanctuary'],
    reversedKeywords: ['Domestic Friction', 'Strained Bonds', 'Shattered Expectations', 'Misalignment'],
    uprightMeaning: 'A radiant rainbow of total emotional fulfillment, deep family/soul harmony, and radiant bliss spanning across your life.',
    reversedMeaning: 'Struggling to find common ground with loved ones or chasing an unrealistic ideal. Cultivate empathy at home.',
    cyberLore: 'The ultimate harmonic convergence where all emotional frequencies achieve flawless resonance and joy.',
    advice: 'Cherish the people who feel like home and anchor yourself in gratitude.',
    affirmation: 'My life and relationships are filled with enduring harmony, peace, and bliss.',
    dominantColor: '#06B6D4'
  },

  // MINOR ARCANA - SWORDS (AIR)
  {
    id: 30,
    number: 'Ace',
    name: 'Ace of Swords',
    suit: 'swords',
    element: 'air',
    icon: '⚔️',
    symbol: '🜁',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Swords01.jpg',
    symbolism: [
      'Hand Emerging from Cloud Holding Upright Sword — Pure divine intellect, mental breakthrough, and clarity.',
      'Golden Crown Encircling the Blade — Mental triumph, sovereign intellect, and mastery of truth.',
      'Olive and Palm Branches Hanging from Crown — Peace and victory achieved through truth.',
      'Barren Mountain Peaks Below — Unsentimental logic and high objective perception.'
    ],
    traditionalMeaning: 'Waite’s Key: Triumph, the excessive degree in everything, conquest, triumph of force in love as well as in other matters.',
    uprightKeywords: ['Mental Breakthrough', 'Absolute Truth', 'Laser Focus', 'Decisive Clarity', 'Sharp Intellect'],
    reversedKeywords: ['Mental Fog', 'Miscommunication', 'Hostility', 'Overthinking'],
    uprightMeaning: 'A double-edged blade of pure mental clarity cuts through deception, confusion, and doubt. Truth reigns supreme.',
    reversedMeaning: 'Brutal communication or paralyzing overthinking. Use intellect to heal and clarify, not to wound.',
    cyberLore: 'The cryptographic key slicing through layered illusions with mathematical precision.',
    advice: 'Speak your truth with crystal clarity and make the decisive cut.',
    affirmation: 'I think with sharp discernment and speak with unflinching integrity.',
    dominantColor: '#93C5FD'
  },
  {
    id: 31,
    number: 'Six',
    name: 'Six of Swords',
    suit: 'swords',
    element: 'air',
    icon: '🛶',
    symbol: '🜁',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Swords06.jpg',
    symbolism: [
      'Ferryman Poling a Boat Across Water — Transition from rough, turbulent water to calm, peaceful shores.',
      'Cloaked Figure and Child — Journey to safety carrying emotional baggage, ready to heal.',
      'Six Swords Standing in Boat — Lingering memories and lessons being carried forward peacefully.'
    ],
    traditionalMeaning: 'Waite’s Key: Journey by water, route, way, envoy, commissionary, expedient.',
    uprightKeywords: ['Calmer Waters', 'Transition', 'Moving Forward', 'Healing Journey', 'Mental Relief'],
    reversedKeywords: ['Emotional Baggage', 'Trapped in Past', 'Rough Crossing', 'Reluctance to Move'],
    uprightMeaning: 'You are moving away from troubled waters toward peaceful shores. The hardest part of the passage is behind you.',
    reversedMeaning: 'Clinging to past grievances or resisting a necessary transition. Trust the journey to calmer horizons.',
    cyberLore: 'Data packet routing out of congested noisy nodes into serene, high-throughput channels.',
    advice: 'Leave the turmoil behind and sail steadily toward tranquility.',
    affirmation: 'I release past conflict and glide smoothly into calm, peaceful waters.',
    dominantColor: '#60A5FA'
  },

  // MINOR ARCANA - PENTACLES (EARTH)
  {
    id: 32,
    number: 'Ace',
    name: 'Ace of Pentacles',
    suit: 'pentacles',
    element: 'earth',
    icon: '🪙',
    symbol: '🜃',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pents01.jpg',
    symbolism: [
      'Hand Emerging from Divine Cloud Offering Golden Coin — Physical abundance, financial seed, and material gift.',
      'Lush Flowering Garden with Arch of White Lilies — Earthly paradise, health, and manifested prosperity.',
      'Path Leading Through Arch to Mountain Peak — Long-term journey toward enduring wealth and stability.'
    ],
    traditionalMeaning: 'Waite’s Key: Perfect contentment, felicity, ecstasy; also speedy intelligence; gold.',
    uprightKeywords: ['Tangible Opportunity', 'Financial Prosperity', 'New Venture', 'Manifest Wealth', 'Physical Vitality'],
    reversedKeywords: ['Missed Chance', 'Poor Investment', 'Scarcity Mindset', 'Greed'],
    uprightMeaning: 'A golden seed of material abundance and career opportunity is placed in your hands. Plant it in fertile soil and watch it flourish.',
    reversedMeaning: 'Hesitating on a solid opportunity or poor financial timing. Review terms carefully before committing resources.',
    cyberLore: 'The foundational genesis block carrying immense value, ready to scale into tangible wealth.',
    advice: 'Seize practical opportunities and invest in your long-term stability.',
    affirmation: 'I welcome tangible abundance, security, and prosperity into my life.',
    dominantColor: '#10B981'
  },
  {
    id: 33,
    number: 'Nine',
    name: 'Nine of Pentacles',
    suit: 'pentacles',
    element: 'earth',
    icon: '🍇',
    symbol: '🜃',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pents09.jpg',
    symbolism: [
      'Elegant Lady in Robe with Hooded Falcon — Refined self-discipline, mastery over impulses, and graceful sovereignty.',
      'Vines Heavy with Golden Grapes and Nine Pentacles — Ripe harvest of years of dedicated craftsmanship.',
      'Snail in Foreground — Steady, patient progress that builds enduring wealth and luxury.'
    ],
    traditionalMeaning: 'Waite’s Key: Prudence, safety, success, accomplishment, certitude, discernment.',
    uprightKeywords: ['Self-Sufficiency', 'Refined Luxury', 'Financial Independence', 'Graceful Solitude', 'Sensory Delight'],
    reversedKeywords: ['Overwork', 'Financial Insecurity', 'Superficial Vanity', 'Loneliness'],
    uprightMeaning: 'You have cultivated a personal sanctuary of self-reliance, elegance, and prosperous comfort. Bask in the fruits of your discipline.',
    reversedMeaning: 'Sacrificing personal happiness for material status or feeling trapped by luxury. Reconnect with what feeds your soul.',
    cyberLore: 'The sovereign private cyber-garden where all systems operate in opulent automation and peaceful autonomy.',
    advice: 'Savor your hard-won independence and treat yourself to life’s finest moments.',
    affirmation: 'I am sovereign, financially secure, and deeply at peace in my abundance.',
    dominantColor: '#059669'
  }
];

export const SPREAD_CONFIGS: SpreadConfig[] = [
  {
    id: 'single',
    name: '1-Card Single Oracle',
    subtitle: '1-Card Immediate Quantum Insight & Daily Revelation',
    cardCount: 1,
    layout: 'single',
    icon: '⚡',
    slots: [
      {
        id: 'oracle',
        title: 'Core Quantum Focus',
        role: 'Present State & Direct Revelation',
        icon: '⚡',
        description: 'The energetic epicenter of your current question and the most potent wisdom to act upon right now.'
      }
    ]
  },
  {
    id: 'temporal',
    name: '3-Card Temporal Continuum',
    subtitle: '3-Card Past, Present & Emergent Future',
    cardCount: 3,
    layout: 'linear',
    icon: '⏳',
    slots: [
      {
        id: 'past',
        title: '1. Origin Seeds (Past)',
        role: 'Past Influences & Karmic Roots',
        icon: '🌅',
        description: 'The foundational events, lessons, and mindsets that brought you to this exact juncture.'
      },
      {
        id: 'present',
        title: '2. Current Nexus (Present)',
        role: 'Active Energy & Real-Time Dynamics',
        icon: '⚡',
        description: 'The dominant forces, tensions, and opportunities surrounding you in this moment.'
      },
      {
        id: 'future',
        title: '3. Emergent Horizon (Future)',
        role: 'Probable Outcome & Evolving Path',
        icon: '🌌',
        description: 'The horizon manifesting if you maintain your present vector of consciousness.'
      }
    ]
  },
  {
    id: 'mind-body-spirit',
    name: '3-Card Tri-Force Alignment',
    subtitle: '3-Card Mind, Body & Spirit Equilibrium',
    cardCount: 3,
    layout: 'triangle',
    icon: '🔮',
    slots: [
      {
        id: 'mind',
        title: '1. Mind (Intellect & Vision)',
        role: 'Conscious Thought & Belief Systems',
        icon: '🧠',
        description: 'Your mental filters, logic, strategies, and conscious convictions.'
      },
      {
        id: 'body',
        title: '2. Body (Material Form)',
        role: 'Physical Actions & Tangible Reality',
        icon: '🌿',
        description: 'Physical health, material assets, somatic sensations, and concrete executions.'
      },
      {
        id: 'spirit',
        title: '3. Spirit (Cosmic Heart)',
        role: 'Subconscious Flow & Higher Calling',
        icon: '✨',
        description: 'Your intuitive compass, soulful desires, and connection to universal source.'
      }
    ]
  },
  {
    id: 'hexagram-6',
    name: '6-Card Hexagram Matrix',
    subtitle: '6-Card Deep Continuum: Past, Present, Subconscious, World, Advice & Destiny',
    cardCount: 6,
    layout: 'six',
    icon: '🪐',
    slots: [
      {
        id: 'present-core',
        title: '1. Current Nexus (Present)',
        role: 'Present Core Dynamic',
        icon: '⚡',
        description: 'The central force, real-time energy, and immediate tension dominating your situation.'
      },
      {
        id: 'past-roots',
        title: '2. Origin Karma (Past)',
        role: 'Foundational History & Roots',
        icon: '🌅',
        description: 'The karmic roots, learned habits, and past choices shaping this current chapter.'
      },
      {
        id: 'subconscious',
        title: '3. Subconscious Depths',
        role: 'Hidden Desires & Secret Fears',
        icon: '🌊',
        description: 'What lies below conscious awareness—deep psychological currents and instinctual drives.'
      },
      {
        id: 'environment',
        title: '4. External Crucible',
        role: 'Environment & Outside Forces',
        icon: '🛡️',
        description: 'Outside circumstances, key relationships, workplace dynamics, or societal forces.'
      },
      {
        id: 'wisdom-action',
        title: '5. Alchemical Advice',
        role: 'Optimal Strategic Action',
        icon: '🔑',
        description: 'The most empowered mindset, decisive action, or wisdom to navigate forward.'
      },
      {
        id: 'destiny-outcome',
        title: '6. Destiny Culmination',
        role: 'Synthesized Outcome & Destiny',
        icon: '👑',
        description: 'The ultimate resolution, spiritual evolution, and destiny trajectory of your path.'
      }
    ]
  },
  {
    id: 'celtic',
    name: '5-Card Quantum Cross',
    subtitle: '5-Card Deep Dimensional Dimensional Portal',
    cardCount: 5,
    layout: 'five',
    icon: '✨',
    slots: [
      {
        id: 'heart',
        title: '1. The Core Essence',
        role: 'The Question Heart',
        icon: '🎯',
        description: 'The foundational energy at the center of the question.'
      },
      {
        id: 'crossing',
        title: '2. The Crossing Force',
        role: 'Primary Catalyst / Conflict',
        icon: '⚔️',
        description: 'What challenges, tests, or catalyses this situation.'
      },
      {
        id: 'subconscious',
        title: '3. Hidden Sub-Routines',
        role: 'Subconscious / Deep Roots',
        icon: '🌊',
        description: 'Underlying psychological patterns operating in the dark.'
      },
      {
        id: 'conscious',
        title: '4. Conscious Ideal',
        role: 'Hopes & Highest Aspirations',
        icon: '🌟',
        description: 'What you consciously seek or perceive as the ideal goal.'
      },
      {
        id: 'culmination',
        title: '5. Quantum Synthesis',
        role: 'The Integrated Destiny',
        icon: '👑',
        description: 'The transcendent integration and final outcome of this path.'
      }
    ]
  }
];

export const INTENT_SUGGESTIONS = [
  'What energy should I align with today for maximum creative flow?',
  'How can I navigate my current career transition and unlock abundance?',
  'What hidden truth is ready to be revealed in my relationships?',
  'What is the highest potential of my new creative project?',
  'What lesson is my subconscious trying to teach me right now?',
  'How can I transform current challenges into my greatest superpower?'
];
