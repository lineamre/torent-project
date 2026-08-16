import { TarotCard, SpreadSlot, ReadingFocusId } from '../types';

/**
 * High-Quality Filipino / Tagalog Tarot Localization Engine & Linguistic Resource
 * Provides culturally authentic, warm, poetic, and grammatically impeccable Filipino interpretations.
 */

export const TAGALOG_CARD_NAMES: Record<string, string> = {
  // Major Arcana (0 - 21)
  'The Fool': 'Ang Hangal (Ang Manlalakbay)',
  'The Magician': 'Ang Salamangkero',
  'The High Priestess': 'Ang Kataas-taasang Babaylan',
  'The Empress': 'Ang Emperatris (Inang Kalikasan)',
  'The Emperor': 'Ang Emperador (Ang Pinuno)',
  'The Hierophant': 'Ang Banal na Guro (Ang Hieropante)',
  'The Lovers': 'Ang Magkasintahan (Tunay na Pag-ibig)',
  'The Chariot': 'Ang Karwahe ng Tagumpay',
  'Strength': 'Lakas ng Loob at Katatagan',
  'The Hermit': 'Ang Ermitanyo (Ang Naghahanap ng Liwanag)',
  'Wheel of Fortune': 'Gulong ng Palad (Gulong ng Kapalaran)',
  'Justice': 'Katarungan at Katotohanan',
  'The Hanged Man': 'Ang Nakabitin (Bagong Pananaw)',
  'Death': 'Pagbabago at Bagong Simula (Kamatayan)',
  'Temperance': 'Pagtitimpi at Balanse',
  'The Devil': 'Ang Tukso (Mga Gapos ng Isip)',
  'The Tower': 'Ang Tore ng Biglaang Pagbabago',
  'The Star': 'Ang Bituin ng Pag-asa at Pangarap',
  'The Moon': 'Ang Buwan ng Misteryo at Kutob',
  'The Sun': 'Ang Araw ng Kaligayahan at Tagumpay',
  'Judgement': 'Ang Paghuhukom (Paggising ng Diwa)',
  'The World': 'Ang Daigdig ng Kaganapan',

  // Wands / Baston (Fire / Apoy - Passion, Action, Ambition)
  'Ace of Wands': 'Alas ng Baston (Kislap ng Bagong Inspirasyon)',
  'Two of Wands': 'Dalawa ng Baston (Pagpaplano at Malayong Pananaw)',
  'Three of Wands': 'Tatlo ng Baston (Pag-abante at Pagpapalawak)',
  'Four of Wands': 'Apat ng Baston (Pagdiriwang, Pamilya at Tahanan)',
  'Five of Wands': 'Lima ng Baston (Tunggalian at Kompetisyon)',
  'Six of Wands': 'Anim ng Baston (Tagumpay at Karangalan)',
  'Seven of Wands': 'Pito ng Baston (Paninindigan at Pagtatanggol)',
  'Eight of Wands': 'Walo ng Baston (Mabilis na Pagkilos at Magandang Balita)',
  'Nine of Wands': 'Siyam ng Baston (Katatagan sa Kabila ng Pagod)',
  'Ten of Wands': 'Sampu ng Baston (Mabigat na Dalahin at Responsibilidad)',
  'Page of Wands': 'Tagapagbalita ng Baston (Kasiglahan at Bagong Simula)',
  'Knight of Wands': 'Kabalyero ng Baston (Matapang na Aksyon at Sigasig)',
  'Queen of Wands': 'Reyna ng Baston (Kumpyansa, Karisma at Talino)',
  'King of Wands': 'Hari ng Baston (Mahusay na Pamumuno at Pangitain)',

  // Cups / Kopa (Water / Tubig - Love, Emotion, Relationships)
  'Ace of Cups': 'Alas ng Kopa (Umaapaw na Pag-ibig at Biyaya)',
  'Two of Cups': 'Dalawa ng Kopa (Pagtatagpo ng Dalawang Puso)',
  'Three of Cups': 'Tatlo ng Kopa (Kasayahan at Pagkakaisa ng Magkakaibigan)',
  'Four of Cups': 'Apat ng Kopa (Pagninilay at Pagkabagot)',
  'Five of Cups': 'Lima ng Kopa (Panghihinayang at Paghilom ng Luha)',
  'Six of Cups': 'Anim ng Kopa (Matatamis na Alaala ng Nakaraan)',
  'Seven of Cups': 'Pito ng Kopa (Mga Pangarap at Maraming Pagpipilian)',
  'Eight of Cups': 'Walo ng Kopa (Paglisan Patungo sa Mas Makabuluhang Landas)',
  'Nine of Cups': 'Siyam ng Kopa (Katuparan ng mga Hiling ng Puso)',
  'Ten of Cups': 'Sampu ng Kopa (Wagas na Ligaya at Masayang Tahanan)',
  'Page of Cups': 'Tagapagbalita ng Kopa (Mensahe ng Puso at Pagkalinga)',
  'Knight of Cups': 'Kabalyero ng Kopa (Romantikong Alok at Alindog)',
  'Queen of Cups': 'Reyna ng Kopa (Malalim na Damdamin at Kutob ng Ina)',
  'King of Cups': 'Hari ng Kopa (Kapanatagan ng Puso at Karunungan)',

  // Swords / Espada (Air / Hangin - Mind, Truth, Challenges, Clarity)
  'Ace of Swords': 'Alas ng Espada (Kalinawan ng Isip at Katotohanan)',
  'Two of Swords': 'Dalawa ng Espada (Alanganing Desisyon at Pagtitimbang)',
  'Three of Swords': 'Tatlo ng Espada (Sugat ng Puso at Kalungkutan)',
  'Four of Swords': 'Apat ng Espada (Pahinga, Pananahimik at Pagbawi ng Lakas)',
  'Five of Swords': 'Lima ng Espada (Walang Saysay na Hidwaan)',
  'Six of Swords': 'Anim ng Espada (Paglalakbay Patungo sa Payapang Tubig)',
  'Seven of Swords': 'Pito ng Espada (Katusuhan at Lihim na Hakbang)',
  'Eight of Swords': 'Walo ng Espada (Nakalilitong Isipan at Gapos ng Pangamba)',
  'Nine of Swords': 'Siyam ng Espada (Labis na Pag-aalala at Bangungot ng Isip)',
  'Ten of Swords': 'Sampu ng Espada (Katapusan ng Paghihirap at Bagong Bukang-liwayway)',
  'Page of Swords': 'Tagapagbalita ng Espada (Kuryosidad at Pagiging Alerto)',
  'Knight of Swords': 'Kabalyero ng Espada (Mabilis at Determinadong Aksyon)',
  'Queen of Swords': 'Reyna ng Espada (Tapat, Matapang at Matalas na Isip)',
  'King of Swords': 'Hari ng Espada (Katarungan, Batas at Makatwirang Pasya)',

  // Pentacles / Barya (Earth / Lupa - Wealth, Health, Material Security)
  'Ace of Pentacles': 'Alas ng Barya (Bagong Oportunidad sa Pera at Yaman)',
  'Two of Pentacles': 'Dalawa ng Barya (Balanse sa Buhay, Trabaho at Gastusin)',
  'Three of Pentacles': 'Tatlo ng Barya (Pagtutulungan sa Trabaho at Proyekto)',
  'Four of Pentacles': 'Apat ng Barya (Pag-iingat sa Yaman at Pagkipot ng Kamay)',
  'Five of Pentacles': 'Lima ng Barya (Panandaliang Pagsubok sa Pera at Pangangailangan)',
  'Six of Pentacles': 'Anim ng Barya (Pagbibigayan, Kawanggawa at Pagtulong)',
  'Seven of Pentacles': 'Pito ng Barya (Pagtitiyaga, Pagsisikap at Pag-aani)',
  'Eight of Pentacles': 'Walo ng Barya (Kasipagan at Pagpapahusay ng Galing)',
  'Nine of Pentacles': 'Siyam ng Barya (Kasaganaan, Kalayaan at Kaginhawaan)',
  'Ten of Pentacles': 'Sampu ng Barya (Pamanang Yaman at Matatag na Kinabukasan)',
  'Page of Pentacles': 'Tagapagbalita ng Barya (Magandang Balita sa Hanapbuhay at Pag-aaral)',
  'Knight of Pentacles': 'Kabalyero ng Barya (Matiyagang Pagsisikap at Katapatan)',
  'Queen of Pentacles': 'Reyna ng Barya (Mapag-aruga, Masinop at Maunlad na Pamumuhay)',
  'King of Pentacles': 'Hari ng Barya (Tagumpay sa Negosyo, Yaman at Katatagan)',
};

export const TAGALOG_KEYWORDS: Record<string, string> = {
  'New Beginnings': 'Bagong Simula',
  'Innocence': 'Kalinisan ng Kalooban',
  'Leap of Faith': 'Tiwala sa Tadhana',
  'Spontaneity': 'Kusang-loob at Sigla',
  'Infinite Potential': 'Walang Hanggang Kakayahan',
  'Manifestation': 'Pagtupad ng mga Pangarap',
  'Willpower': 'Tibay at Lakas ng Loob',
  'Resourcefulness': 'Diskarte at Dunong',
  'Mastery': 'Kahusayan sa Larangan',
  'Creative Power': 'Malikhaing Kapangyarihan',
  'Intuition': 'Kutob at Bulong ng Puso',
  'Sacred Knowledge': 'Banal na Karunungan',
  'Divine Feminine': 'Banal na Pagkalinga',
  'The Subconscious': 'Kailaliman ng Damdamin',
  'Inner Voice': 'Tinig ng Konsensya',
  'Fertility': 'Kasaganahan at Biyaya',
  'Abundance': 'Masaganang Pamumuhay',
  'Nurturing': 'Mapag-aruga at Maalaga',
  'Sensuality': 'Kagandahan at Sigla',
  'Authority': 'Karapatan at Pamumuno',
  'Structure': 'Kaayusan at Disiplina',
  'Control': 'Pamamahala sa Sarili',
  'Fatherhood': 'Sandigan at Gabay ng Pamilya',
  'Tradition': 'Kaugalian at Mabubuting Aral',
  'Spiritual Wisdom': 'Espirituwal na Liwanag',
  'Belief Systems': 'Matatag na Pananampalataya',
  'Conformity': 'Pagsunod sa Tamang Landas',
  'Love': 'Tunay at Wagas na Pag-ibig',
  'Harmony': 'Kapayapaan at Pagkakasundo',
  'Relationships': 'Ugnayan ng mga Puso',
  'Values Alignment': 'Pagtutugma ng Layunin',
  'Choices': 'Matalinong Pagpili',
  'Victory': 'Tagumpay',
  'Determination': 'Matatag na Hangarin',
  'Self-Discipline': 'Disiplina sa Sarili',
  'Courage': 'Lakas ng Loob at Katapangan',
  'Persuasion': 'Mabuting Panghihikayat',
  'Influence': 'Magandang Halimbawa',
  'Compassion': 'Malasakit at Pagmamahal sa Kapwa',
  'Soul-Searching': 'Paghahanap sa Sarili',
  'Introspection': 'Tahimik na Pagninilay',
  'Inner Guidance': 'Gabay mula sa Loob',
  'Good Luck': 'Magandang Kapalaran',
  'Karma': 'Bunga ng mga Mabubuting Gawa',
  'Life Cycles': 'Gulong ng Buhay',
  'Destiny': 'Tadhana',
  'A Turning Point': 'Mahalagang Pagbabago',
  'Justice': 'Katarungan',
  'Fairness': 'Pantay na Pagtingin',
  'Truth': 'Katotohanan',
  'Cause and Effect': 'Bunga ng mga Desisyon',
  'Law': 'Batas at Kaayusan',
  'Pause': 'Panandaliang Paghinto',
  'Surrender': 'Pagpaparaya sa Plano ng Diyos',
  'Letting Go': 'Pagbitaw sa mga Mabigat',
  'New Perspectives': 'Bagong Pananaw sa Buhay',
  'Endings': 'Wakas ng Lumang Kabanata',
  'Change': 'Pagbabago',
  'Transformation': 'Pagbabagong-anyo',
  'Transition': 'Paglipat sa Mas Magandang Yugto',
  'Balance': 'Balanse at Kapanatagan',
  'Moderation': 'Katamtaman at Payapang Buhay',
  'Patience': 'Mahabang Pagtitiyaga',
  'Purpose': 'Tunay na Layunin sa Buhay',
  'Shadow Self': 'Nakatagong Kahinaan',
  'Attachment': 'Labis na Pagkapit',
  'Addiction': 'Masamang Kasanayan',
  'Restriction': 'Gapos ng Isipan',
  'Sudden Change': 'Biglaang Pagbabago',
  'Upheaval': 'Pagsubok na Magbubukas ng Mata',
  'Chaos': 'Kaguluhan',
  'Revelation': 'Pagsisiwalat ng Katotohanan',
  'Awakening': 'Paggising ng Kamalayan',
  'Hope': 'Pag-asa',
  'Faith': 'Matatag na Pananalig',
  'Inspiration': 'Inspirasyon sa Buhay',
  'Optimism': 'Positibong Pananaw',
  'Illusion': 'Maling Akala',
  'Fear': 'Pangamba at Takot',
  'Anxiety': 'Labis na Pag-aalala',
  'Subconscious': 'Kailaliman ng Damdamin',
  'Positivity': 'Kasiglahan ng Loob',
  'Fun': 'Kaligayahan',
  'Warmth': 'Init ng Pagmamahal',
  'Success': 'Tagumpay',
  'Celebration': 'Masayang Pagdiriwang',
  'Judgement': 'Paghuhukom at Pagsusuri',
  'Rebirth': 'Muling Pagkabuhay ng mga Pangarap',
  'Inner Calling': 'Tawag ng Puso',
  'Absolution': 'Pagpapatawad sa Sarili at Kapwa',
  'Completion': 'Kaganapan ng mga Minimithi',
  'Integration': 'Pagkakaisa at Kabuuan',
  'Accomplishment': 'Nakamit na Tagumpay',
  'Travel': 'Paglalakbay sa Malayo',

  // Reversed Keywords
  'Recklessness': 'Padalos-dalos na Pagkilos',
  'Risk Paralysis': 'Takot Sumubok sa Bago',
  'Naivety': 'Kulang sa Pag-iingat',
  'Foolish Stagnation': 'Pag-aatubili sa Buhay',
  'Indiscretion': 'Kawalan ng Pag-iingat',
  'Manipulation': 'Panlilinlang',
  'Untapped Talents': 'Nakatagong Galing',
  'Deception': 'Kasinungalingan',
  'Scattered Focus': 'Watak-watak na Isip',
  'Secrets': 'Mga Lihim',
  'Disconnected from Intuition': 'Naliligaw sa Sariling Kutob',
  'Withdrawal': 'Paglayo sa Kapwa',
  'Creative Block': 'Pagkaubos ng Ideya',
  'Dependence on Others': 'Labis na Pag-asa sa Iba',
  'Smothering': 'Labis na Paghihigpit',
  'Tyranny': 'Mapanupil na Pamumuno',
  'Rigidity': 'Kasukdulan sa Higpit',
  'Coldness': 'Malamig na Pakikitungo',
  'Rebellion': 'Paghihimagsik',
  'Personal Beliefs': 'Sariling Paninindigan',
  'Freedom': 'Kalayaan',
  'Disharmony': 'Kawalang-kasunduan',
  'Imbalance': 'Kakulangan sa Balanse',
  'Misalignment of Values': 'Salungat na Hangarin',
  'Self-Doubt': 'Pagdududa sa Sarili',
  'Lack of Direction': 'Kawalan ng Malinaw na Landas',
  'Aggression': 'Karahasan at Init ng Ulo',
  'Raw Emotion': 'Matingkad na Damdamin',
  'Loneliness': 'Pangungulila',
  'Isolation': 'Pag-iisa',
  'Lost Your Way': 'Naligaw ng Landas',
  'Bad Luck': 'Panandaliang Pagsubok',
  'Resistance to Change': 'Pagtanggi sa Pagbabago',
  'Breaking Cycles': 'Pagsira sa Masamang Nakagawian',
  'Dishonesty': 'Kawalang-katapatan',
  'Unfairness': 'Kawalan ng Katarungan',
  'Lack of Accountability': 'Pagtakas sa Pananagutan',
  'Avoidance': 'Pagtakas sa Harapan',
  'Stagnation': 'Kawalang-pag-usad',
  'Resistance': 'Panlalaban sa Tadhana',
  'Fear of Change': 'Takot sa Bagong Yugto',
  'Holding On': 'Ayaw Magbitaw sa Lumipas',
  'Stagnant Energy': 'Mabigat na Pakiramdam',
  'Excess': 'Labis na Pagpapakasasa',
  'Lack of Balance': 'Kakulangan sa Balanse',
  'Extreme Behavior': 'Labis na Pagkilos',
  'Releasing Limiting Beliefs': 'Pagpapalaya sa Takot',
  'Exploring Dark Thoughts': 'Pag-unawa sa Sariling Kahinaan',
  'Disaster Avoided': 'Naiwasang Kapahamakan',
  'Delayed Inevitable': 'Naantalang Pagbabago',
  'Fear of Suffering': 'Takot Masaktan Muli',
  'Lack of Faith': 'Panghihina ng Pananalig',
  'Despair': 'Kawalan ng Pag-asa',
  'Discouragement': 'Panghihina ng Loob',
  'Release of Fear': 'Pagpawi sa Pangamba',
  'Repressed Emotion': 'Kinikimkim na Luha',
  'Inner Clarity': 'Lihim na Kalinawan',
  'Inner Child': 'Batang Diwa sa Loob',
  'Feeling Down': 'Mabigat na Kalooban',
  'Overly Optimistic': 'Labis na Pag-aasam',
  'Self-Criticism': 'Panghuhusga sa Sarili',
  'Ignoring the Call': 'Pagtanggi sa Tawag ng Puso',
  'Doubt': 'Alinlangan',
  'Incompletion': 'Hindi Natapos na Bagay',
  'Lack of Closure': 'Kakulangan sa Pagtatapos',
  'Shortcuts': 'Maling Pagpapaikli ng Daan',
};

export const TAGALOG_FOCUS_TITLES: Record<ReadingFocusId, { name: string; desc: string }> = {
  love: {
    name: 'Pag-ibig, Relasyon at Puso',
    desc: 'Gabay sa pag-ibig, kapareha sa buhay, at pakikipagkapwa',
  },
  future: {
    name: 'Hinaharap, Kapalaran at Tadhana',
    desc: 'Mga parating na kabanata, tamang panahon, at direksyon sa buhay',
  },
  life: {
    name: 'Buhay, Layunin at Lakas ng Loob',
    desc: 'Lakas ng kalooban, tunay na misyon sa buhay, at personal na paglago',
  },
  fortune: {
    name: 'Pera, Trabaho at Kasaganaan',
    desc: 'Yaman, tagumpay sa hanapbuhay, negosyo, at pinansyal na suwerte',
  },
};

export const TAGALOG_SLOT_ROLES: Record<string, string> = {
  'Past': 'Nakalipas (Ang Pinagmulan)',
  'Present': 'Kasalukuyan (Kung Nasaan Ka Ngayon)',
  'Future': 'Hinaharap (Ang Paparating na Bukas)',
  'Situation': 'Ang Sitwasyon (Ang Tunay na Kalagayan)',
  'Challenge': 'Ang Pagsubok (Ang Dapat Malampasan)',
  'Outcome': 'Ang Kalalabasan (Ang Bunga ng Iyong Pasya)',
  'Mind': 'Isipan (Ang Iyong Pananaw at Iniisip)',
  'Body': 'Katawan (Ang Pisikal na Aksyon at Kalusugan)',
  'Spirit': 'Espiritu (Ang Kailaliman ng Kaluluwa)',
  'Foundation': 'Sandigan (Ang Pinag-ugatan ng Lahat)',
  'Advice': 'Payo at Gabay (Ang Nararapat Gawin)',
  'Hopes & Fears': 'Mga Pangarap at Pangamba',
  'Potential': 'Maaaring Marating at Tagumpay',
  'Conscious': 'Malay na Isipan',
  'Subconscious': 'Kailaliman ng Damdamin',
  'Environment': 'Kapaligiran at mga Taong Nakapaligid',
};

/**
 * Handcrafted, fluent, uplifting Filipino translations for cards
 */
export const TAGALOG_CARD_CORE: Record<
  string,
  {
    upright: string;
    reversed: string;
    advice: string;
    affirmation: string;
  }
> = {
  'The Fool': {
    upright: 'Buong tapang kang humakbang sa bagong kabanata ng iyong buhay. Ikaw ay nasa bungad ng isang magandang simula nang may malinis na puso at walang katapusang oportunidad.',
    reversed: 'Mag-ingat sa mga padalos-dalos na desisyon o ang labis na takot na pumipigil sa iyo. Tumingin bago tumalon, ngunit huwag hayaang lamunin ng alinlangan ang iyong diwa.',
    advice: 'Yakapin ang isang sariwang pananaw. Iwanan ang lumang dalahin at humakbang pasulong nang may kumpyansa.',
    affirmation: 'Nagtitiwala ako sa plano ng tadhana at buong tapang akong sumasalubong sa bagong bukang-liwayway.',
  },
  'The Magician': {
    upright: 'Taglay mo ang lahat ng talino, diskarte, at kakayahan upang gawing totoo ang iyong mga pangarap. Ituon ang iyong buong pansin at kumilos nang may kahusayan.',
    reversed: 'May natatago kang talento na hindi mo pa nagagamit, o kaya ay nawawala ka sa pokus dahil sa panlilinlang ng iba. Magpakatotoo sa sarili at ituon ang isip sa tama.',
    advice: 'Pagsama-samahin ang iyong mga kasanayan at ituon ang iyong determinasyon sa iisang malinaw na layunin.',
    affirmation: 'Taglay ko ang lahat ng lakas at karunungan upang hubugin ang aking magandang kinabukasan.',
  },
  'The High Priestess': {
    upright: 'Makinig nang mabuti sa bulong ng iyong kutob at kailaliman ng puso. Huwag magmadali; may mga banal na sagot na unti-unting lilitaw kapag ikaw ay nanahimik.',
    reversed: 'Huwag balewalain ang iyong kutob dahil lamang sa ingay ng ibang tao. Maglaan ng sandali sa pananahimik upang marinig muli ang sariling katotohanan.',
    advice: 'Patahimikin ang ingay sa paligid at magnilay sa kung ano ang tunay na alam ng iyong puso.',
    affirmation: 'Ang aking kutob ay isang maliwanag na ilaw na gumagabay sa aking bawat desisyon.',
  },
  'The Empress': {
    upright: 'Panahon ito ng kasaganaan, pagmamahal, at masaganang ani. Ang iyong pag-aaruga at pagtitiyaga ay magbubunga ng magagandang biyaya sa iyong pamilya at buhay.',
    reversed: 'Maaaring labis mong inuuna ang kapakanan ng iba habang napapabayaan mo ang sarili. Maglaan ng oras upang alagaan at mahalin ang iyong sarili.',
    advice: 'Magtanim ng kabutihan at pag-ibig; malugod na tanggapin ang mga biyayang inihahain ng buhay.',
    affirmation: 'Puno ako ng sigla, pagmamahal, at kasaganaan; karapat-dapat ako sa lahat ng kabutihan.',
  },
  'The Emperor': {
    upright: 'Oras ito upang maging matatag na pinuno ng iyong sariling buhay. Ang disiplina, maayos na plano, at matatag na hangarin ang magdadala sa iyo sa tagumpay.',
    reversed: 'Mag-ingat sa labis na pagiging mahigpit o ang pagkawala ng kontrol sa sarili. Maging mapagpakumbaba at bukas sa payo ng mga taong nagmamalasakit.',
    advice: 'Bumuo ng matibay na plano at magkaroon ng disiplina sa pagtupad ng iyong mga pangako.',
    affirmation: 'Ako ang may hawak ng aking kapalaran; may katatagan at karunungan ako sa bawat pagpapasya.',
  },
  'The Hierophant': {
    upright: 'Ang mga aral ng tradisyon, mabuting payo ng mga nakatatanda, at matatag na pananampalataya ang iyong magiging gabay sa panahong ito.',
    reversed: 'Panahon upang suriin ang mga paniniwalang hindi na nakakatulong sa iyong paglago. Hanapin ang sarili mong paninindigan at katotohanan.',
    advice: 'Humingi ng payo sa mga taong may malalim na karunungan at manatiling tapat sa iyong prinsipyo.',
    affirmation: 'Ang aking pananampalataya at mabubuting aral ang sandigan ng aking kapayapaan.',
  },
  'The Lovers': {
    upright: 'Isang malalim na pagkakaisa ng puso, tapat na pag-ibig, o mahalagang pagpili na naaayon sa iyong tunay na damdamin. Piliin ang landas ng pagmamahal.',
    reversed: 'May hindi pagkakaunawaan o salungat na hangarin. Makipag-usap nang tapat at buksan ang puso upang maibalik ang dating tamis at pagkakasundo.',
    advice: 'Piliin kung ano ang nagbibigay sa iyo ng kapayapaan ng puso at manatiling tapat sa iyong minamahal.',
    affirmation: 'Binubuksan ko ang aking puso sa wagas, tapat, at mapagkalingang pag-ibig.',
  },
  'The Chariot': {
    upright: 'Tagumpay laban sa lahat ng pagsubok! Sa pamamagitan ng determinasyon at sipag, malalampasan mo ang anumang balakid at mararating ang tagumpay.',
    reversed: 'Huwag magpadala sa galit o labis na pagmamadali. Hawakan nang mahigpit ang renda ng iyong emosyon upang hindi ka madapa sa daan.',
    advice: 'Manatiling nakatuon sa iyong mithiin; huwag hayaang mawala ang iyong kumpyansa at pokus.',
    affirmation: 'May lakas at tibay ako upang lampasan ang anumang hamon at magtagumpay sa aking landas.',
  },
  'Strength': {
    upright: 'Ang tunay na lakas ay hindi nagmumula sa dahas kundi sa kabutihan ng puso, pasensya, at matibay na pananampalataya. Kakayanin mo ang lahat.',
    reversed: 'Nanghihina ang iyong loob dahil sa pagod o pagdududa sa sarili. Alalahanin na marami ka nang nalampasang pagsubok noong nakaraan.',
    advice: 'Harapin ang mga pagsubok nang may mahinahong puso at matatag na pananalig.',
    affirmation: 'Puno ng katatagan at kabutihan ang aking puso; walang pagsubok na hindi ko kayang malampasan.',
  },
  'The Hermit': {
    upright: 'Maglaan ng panahon para sa tahimik na pagninilay. Ang liwanag ng karunungan ay matatagpuan mo sa iyong sariling katahimikan at pananalangin.',
    reversed: 'Huwag lubos na ibukod ang sarili sa mundo dahil sa tampo o lungkot. Buksan muli ang iyong pinto sa mga taong nagmamalasakit sa iyo.',
    advice: 'Pakinggan ang tinig ng iyong kaluluwa sa pamamagitan ng panalangin at katahimikan.',
    affirmation: 'Ang liwanag ng aking kaluluwa ang nagtuturo sa akin ng tamang daan.',
  },
  'Wheel of Fortune': {
    upright: 'Umiikot ang gulong ng palad pabor sa iyo! Parating na ang magagandang oportunidad, suwerte, at panibagong ginhawa matapos ang mahabang pagtitiis.',
    reversed: 'Ang buhay ay may tag-araw at tag-ulan. Huwag mawalan ng pag-asa kung may kaunting pagkaantala; laging may bukang-liwayway pagkatapos ng dilim.',
    advice: 'Yakapin ang mga pagbabago at samantalahin ang magagandang pagkakataong dumarating sa iyo.',
    affirmation: 'Tinatanggap ko ang magandang kapalaran, suwerte, at biyayang nakalaan para sa akin.',
  },
  'Justice': {
    upright: 'Mananaig ang katotohanan at katarungan. Ang bawat mabuting gawa mo ay susuklian ng pantay na biyaya at kapayapaan.',
    reversed: 'Maging tapat sa sarili at huwag magtago sa likod ng mga palusot. Harapin ang katotohanan upang maging malaya ang iyong kalooban.',
    advice: 'Maging patas sa pakikitungo sa kapwa at gumawa ng mga desisyong makatwiran at malinis.',
    affirmation: 'Namumuhay ako sa katotohanan, katarungan, at malinis na konsensya.',
  },
  'The Hanged Man': {
    upright: 'Panandaliang huminto upang tingnan ang buhay sa ibang anggulo. Ang pagpaparaya sa sariling pagmamadali ay magbubukas ng pambihirang karunungan.',
    reversed: 'Huwag magtiis sa isang bagay na wala nang patutunguhan. Oras na upang kumilos at huwag nang maghintay sa wala.',
    advice: 'Magbitaw sa labis na pagnanais na kontrolin ang lahat; magtiwala sa tamang panahon ng Diyos.',
    affirmation: 'Payapa kong tinatanggap ang tamang panahon at nagkakaroon ako ng bagong pananaw sa buhay.',
  },
  'Death': {
    upright: 'Wakas ng lumang kabanata at pagsilang ng bago at mas magandang yugto. Huwag matakot magpaalam sa nakaraan upang salubungin ang bagong buhay.',
    reversed: 'Pagtanggi sa pagbabago dahil sa takot sa hinaharap. Pakawalan na ang lumipas upang makapasok ang bagong biyaya sa iyong palad.',
    advice: 'Pakawalan ang mga bagay na tapos na ang panahon upang magkaroon ng puwang para sa mga bagong biyaya.',
    affirmation: 'Malugod kong tinatanggap ang bawat pagbabago at handa ako sa panibagong simula ng aking buhay.',
  },
  'Temperance': {
    upright: 'Balanse, kapayapaan, at paghilom ng damdamin. Sa pamamagitan ng hinahon at pagtitimpi, magkakaroon ng harmony ang lahat ng aspeto ng iyong buhay.',
    reversed: 'Kakulangan sa balanse o labis na pagpapakasasa sa isang bagay. Ibalik ang disiplina at alagaan ang iyong kalusugan at kapayapaan.',
    advice: 'Manatiling mahinahon at hanapin ang gitna sa lahat ng iyong ginagawa at nararamdaman.',
    affirmation: 'Balanse, payapa, at malusog ang aking buong pagkatao sa bawat araw.',
  },
  'The Devil': {
    upright: 'Paalala na suriin ang mga tukso, maling kaugalian, o mga taong nagdudulot ng pasakit sa iyo. Tandaan: ikaw ang may hawak ng susi sa iyong kalayaan.',
    reversed: 'Paggising mula sa panlilinlang at pagkalas sa mga gapos ng takot o masamang bisyo. Malaya ka na upang magsimula muli.',
    advice: 'Putulin ang mga ugnayan at gawi na sumisira sa iyong kapayapaan at kinabukasan.',
    affirmation: 'Malaya ako sa anumang takot o gapos; ako ay nilikha para sa liwanag at tagumpay.',
  },
  'The Tower': {
    upright: 'Biglaang pagbabago na magigiba sa mga maling akala, ngunit ito ay magbibigay-daan upang maitayo mo ang iyong buhay sa mas matatag na pundasyon.',
    reversed: 'Naiwasan ang isang malaking kapahamakan o unti-unting pagbangon mula sa isang pagsubok. Maging matalino sa muling pagtayo.',
    advice: 'Huwag matakot kung may gumuho mang plano; magtiwala na may mas matibay at magandang itatayo para sa iyo.',
    affirmation: 'Matatag akong tatayo sa gitna ng anumang unos; ang Diyos ang aking sandigan.',
  },
  'The Star': {
    upright: 'Puno ng pag-asa, inspirasyon, at pananampalataya. Ang iyong mga panalangin ay dinidinig, at may magandang bukas na naghihintay sa iyo.',
    reversed: 'Panghihina ng pananalig dahil sa mga kabiguan. Huwag mawalan ng pag-asa; ang bituin ng iyong kapalaran ay patuloy na nagniningning para sa iyo.',
    advice: 'Panatilihin ang positibong pananaw at buksan ang puso sa mga magagandang sorpresa ng buhay.',
    affirmation: 'Puno ako ng pag-asa, liwanag, at pananalig; may magandang bukas na nakalaan sa akin.',
  },
  'The Moon': {
    upright: 'Makinig sa iyong kutob at maging mapagmasid. Huwag magdesisyon habang malabo pa ang mga detalye; hintayin ang pagsikat ng liwanag ng katotohanan.',
    reversed: 'Nalilinawan na ang mga dating lihim o kalituhan. Nawawala na ang pangamba at lumalabas na ang tunay na katotohanan.',
    advice: 'Mag-ingat sa mga mabulaklak na salita at magtiwala sa iyong sariling pakiramdam.',
    affirmation: 'Ang aking panloob na liwanag ang pumapawi sa lahat ng dilim at takot.',
  },
  'The Sun': {
    upright: 'Wagas na kaligayahan, tagumpay, sigla, at masaganang biyaya! Ito ay isa sa pinakamapalad na baraha na nagpapahiwatig ng tagumpay sa lahat ng iyong balak.',
    reversed: 'Medyo natatabunan ng kaunting ulap ang iyong saya, ngunit panandalian lamang ito. Hanapin ang maliliit na bagay na nagpapasalamat sa iyong puso.',
    advice: 'Ibahagi ang iyong ngiti at saya sa iba; sulitin ang bawat sandali ng tagumpay at ginhawa.',
    affirmation: 'Nagniningning ang aking buhay sa saya, kalusugan, at masaganang tagumpay.',
  },
  'Judgement': {
    upright: 'Paggising ng iyong kaluluwa at tawag ng iyong tunay na misyon. Panahon na upang magpatawad sa nakaraan at humarap sa iyong magandang kinabukasan.',
    reversed: 'Labis na panghuhusga sa sarili o hindi pagdinig sa tawag ng puso dahil sa hiya o takot. Patawarin ang sarili at magsimula nang panibago.',
    advice: 'Pakinggan ang tawag ng iyong puso at magpatawad upang maging ganap ang iyong kapayapaan.',
    affirmation: 'Pinapatawad ko ang aking sarili at buong puso kong tinatanggap ang aking banal na misyon.',
  },
  'The World': {
    upright: 'Kaganapan ng iyong mga pinagpaguran, tagumpay sa malaking layunin, at kapayapaan ng kalooban. Nakarating ka na sa isang magandang tagumpay!',
    reversed: 'Kailangan pa ng kaunting pagsisikap upang matapos ang isang bagay. Huwag tatamarin sa huling hakbang; tapusin ito nang buong giting.',
    advice: 'Ipagdiwang ang iyong mga narating at magpasalamat sa lahat ng aral at biyayang natanggap.',
    affirmation: 'Ganap at mapayapa ang aking buhay; ipinagdiriwang ko ang aking tagumpay at kasaganaan.',
  },
};

/**
 * Get localized card name
 */
export function getCardNameTagalog(cardName: string): string {
  if (!cardName) return '';
  return TAGALOG_CARD_NAMES[cardName] || cardName;
}

/**
 * Get localized slot role
 */
export function getSlotTitleTagalog(slotTitle: string): string {
  if (!slotTitle) return '';
  return TAGALOG_SLOT_ROLES[slotTitle] || slotTitle;
}

/**
 * Get localized slot role description
 */
export function getSlotRoleTagalog(slotRole: string): string {
  if (!slotRole) return '';
  if (TAGALOG_SLOT_ROLES[slotRole]) return TAGALOG_SLOT_ROLES[slotRole];

  return slotRole
    .replace(/Where you came from|Origin|Root/gi, 'Ang iyong pinagmulan')
    .replace(/Where you stand now|Current energy/gi, 'Kung nasaan ka ngayon')
    .replace(/Where you are heading|Potential future/gi, 'Ang iyong patutunguhan')
    .replace(/The underlying situation/gi, 'Ang kasalukuyang kalagayan')
    .replace(/Obstacle to overcome/gi, 'Ang balakid na dapat malampasan')
    .replace(/Final resolution/gi, 'Ang huling kalalabasan')
    .replace(/Mental clarity/gi, 'Kalinawan ng isip')
    .replace(/Physical vitality/gi, 'Lakas ng katawan')
    .replace(/Spiritual alignment/gi, 'Ugnayan sa espirituwal');
}

/**
 * Localize individual keyword
 */
export function translateKeywordTagalog(keyword: string): string {
  if (!keyword) return '';
  const trimmed = keyword.trim();
  return TAGALOG_KEYWORDS[trimmed] || trimmed;
}

/**
 * Clean and prepare text specifically for smooth Filipino Voice Synthesizers
 */
export function cleanTagalogForSpeech(text: string): string {
  if (!text) return '';

  return text
    // Replace markdown headers with natural spoken Filipino pauses
    .replace(/###\s*✦?\s*Ang Pangkalahatang Mensahe at Gabay/gi, 'Sa pangkalahatang mensahe at gabay. ')
    .replace(/###\s*✦?\s*The Core Message & Overview/gi, 'Sa pangkalahatang mensahe at gabay. ')
    .replace(/###\s*⚡?\s*Pagsusuri sa Bawat Baraha/gi, 'Sa pagsusuri sa bawat baraha. ')
    .replace(/###\s*⚡?\s*Card-by-Card Breakdown/gi, 'Sa pagsusuri sa bawat baraha. ')
    .replace(/###\s*🔑?\s*Mga Praktikal na Payo at Hakbang na Dapat Gawin/gi, 'Para sa mga praktikal na payo at hakbang. ')
    .replace(/###\s*🔑?\s*Practical Advice & Next Steps/gi, 'Para sa mga praktikal na payo at hakbang. ')
    .replace(/###\s*✨?\s*Ang Iyong Banal na Paninindigan \(Affirmation\)/gi, 'At ang iyong banal na paninindigan. ')
    .replace(/###\s*✨?\s*Your Personal Affirmation/gi, 'At ang iyong banal na paninindigan. ')
    // Convert remaining symbols and formatting
    .replace(/Posisyon\s*(\d+)/gi, 'Posisyon bilang $1')
    .replace(/Position\s*(\d+)/gi, 'Posisyon bilang $1')
    .replace(/Nakatayo\s*✦/gi, 'Nakatayo. ')
    .replace(/Pabaligtad\s*↺/gi, 'Pabaligtad. ')
    .replace(/Upright\s*✦/gi, 'Nakatayo. ')
    .replace(/Reversed\s*↺/gi, 'Pabaligtad. ')
    .replace(/[✦⚡🔑✨↺★●◆■▶]/g, '')
    .replace(/[*_#>`~]/g, '')
    .replace(/---/g, '. ')
    .replace(/:\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Translates a complete English reading markdown into eloquent, deep, natural Tagalog.
 */
export function translateReadingToTagalog(
  markdownText: string,
  readingFocus: ReadingFocusId = 'love',
  question: string = ''
): string {
  if (!markdownText) return '';

  const focusInfo = TAGALOG_FOCUS_TITLES[readingFocus] || TAGALOG_FOCUS_TITLES.love;

  let translated = markdownText;

  // 1. Replace Section Headings with rich, authentic Filipino oracle headers
  translated = translated
    .replace(/###\s*✦?\s*The Core Message & Overview/gi, '### ✦ Ang Pangkalahatang Mensahe at Gabay')
    .replace(/###\s*✦?\s*The Quantum Synthesis/gi, '### ✦ Ang Banal na Mensahe at Buod')
    .replace(/###\s*⚡?\s*Card-by-Card Breakdown/gi, '### ⚡ Pagsusuri sa Bawat Baraha')
    .replace(/###\s*⚡?\s*Card Matrix Breakdown/gi, '### ⚡ Kahulugan ng mga Baraha sa Iyong Hanay')
    .replace(/###\s*⚡?\s*Card Meanings in Your Spread/gi, '### ⚡ Kahulugan ng mga Baraha sa Iyong Hanay')
    .replace(/###\s*🔑?\s*Practical Advice & Next Steps/gi, '### 🔑 Mga Praktikal na Payo at Hakbang na Dapat Gawin')
    .replace(/###\s*🔑?\s*Transformational Directives?/gi, '### 🔑 Gabay sa Pagkilos at Pagsulong')
    .replace(/###\s*✨?\s*Your Personal Affirmation/gi, '### ✨ Ang Iyong Banal na Paninindigan (Affirmation)')
    .replace(/###\s*✨?\s*Cosmic Affirmation/gi, '### ✨ Ang Iyong Banal na Paninindigan (Affirmation)');

  // 2. Replace metadata labels
  translated = translated
    .replace(/\*\*Focus Area:\*\*/gi, '**Larangan ng Pagbasa:**')
    .replace(/\*\*Your Question:\*\*/gi, '**Ang Iyong Tanong:**')
    .replace(/\*\*Inquiry:\*\*/gi, '**Ang Iyong Tanong:**')
    .replace(/Upright\s*✦/gi, 'Nakatayo ✦')
    .replace(/Reversed\s*↺/gi, 'Pabaligtad ↺')
    .replace(/Position\s+(\d+)/gi, 'Posisyon $1')
    .replace(/Slot\s+(\d+)/gi, 'Posisyon $1');

  // 3. Translate known focus topics
  translated = translated
    .replace(/Love, Relationships & Emotional Connection/gi, 'Pag-ibig, Relasyon at Puso')
    .replace(/Love, Romance, Soulmates & Relationships/gi, 'Pag-ibig, Relasyon, Kapareha at Puso')
    .replace(/Future, Upcoming Milestones & Destiny/gi, 'Hinaharap, Kapalaran at Tadhana')
    .replace(/Future, Upcoming Destiny, Career & Timing/gi, 'Hinaharap, Kapalaran, Tagumpay at Tadhana')
    .replace(/Life Purpose, Inner Resilience & Spiritual Growth/gi, 'Buhay, Layunin at Lakas ng Loob')
    .replace(/Life Purpose, Inner Self, Mindset & Resilience/gi, 'Buhay, Layunin ng Kaluluwa at Lakas ng Loob')
    .replace(/Money, Career Success & Financial Fortune/gi, 'Pera, Trabaho at Kasaganaan')
    .replace(/Money, Wealth, Prosperity, Career & Financial Fortune/gi, 'Pera, Yaman, Negosyo at Pinansyal na Suwerte')
    .replace(/General Clarity & Direction/gi, 'Pangkalahatang Gabay sa Buhay');

  // 4. Translate all 78 card names appearing anywhere in the text
  Object.entries(TAGALOG_CARD_NAMES).forEach(([enName, tlName]) => {
    const reg = new RegExp(`\\b${enName}\\b`, 'gi');
    translated = translated.replace(reg, tlName);
  });

  // 5. Translate spread position titles
  Object.entries(TAGALOG_SLOT_ROLES).forEach(([enSlot, tlSlot]) => {
    const reg = new RegExp(`\\b${enSlot}\\b`, 'gi');
    translated = translated.replace(reg, tlSlot);
  });

  // 6. Translate common full divinatory phrases
  translated = translated
    .replace(/In this \*\*(.*?)\*\* reading focused on \*\*(.*?)\*\*, the cards indicate a powerful turning point\./gi, 'Sa **$1** na pagbasang ito na nakatuon sa **$2**, ipinababatid ng mga sagradong baraha na ikaw ay nasa isang mahalagang yugto ng pagbabago.')
    .replace(/In this (.*?) reading focused on (.*?), the cards indicate a powerful turning point\./gi, 'Sa $1 na pagbasang ito na nakatuon sa $2, ipinababatid ng mga baraha ang isang mahalagang pagbabago.')
    .replace(/You are moving from past lessons into a fresh cycle of clarity and personal strength\./gi, 'Mula sa mga aral ng nakaraan, lumilipat ka ngayon patungo sa bagong liwanag, kumpyansa, at tagumpay.')
    .replace(/The overall message is one of reassurance: the answers you are seeking will unfold through steady action, genuine self-trust, and staying aligned with your core values\./gi, 'Ang pangkalahatang mensahe ay puno ng pag-asa: ang mga sagot na iyong hinahanap ay darating sa pamamagitan ng tapat na pagkilos, tiwala sa sarili, at pananatili sa iyong kabutihan.')
    .replace(/Focus on internal reflection, healing any hesitation or unblocking emotional flow\./gi, 'Maglaan ng panahon sa tahimik na pagninilay, paghilumin ang alinlangan, at pakawalan ang mabigat na damdamin.')
    .replace(/Strong positive momentum and clear blessings in this area\./gi, 'Mayroong malakas na daloy ng biyaya, suwerte, at positibong kaganapan sa larangang ito.')
    .replace(/Reflect on (.*?): Take a quiet moment to release doubts or overthinking around "(.*?)"\. Focus on gentle progress and clear boundaries\./gi, 'Pagninilay sa $1: Maglaan ng sandali upang pakawalan ang takot at pangamba ukol sa "$2". Manatiling mahinahon at alagaan ang sariling kapakanan.')
    .replace(/Embrace (.*?): Step forward with confidence in "(.*?)"\. Trust your instincts and take concrete action today\./gi, 'Tanggapin ang Biyaya ng $1: Buong tapang na humakbang pasulong para sa "$2". Magtiwala sa iyong kutob at magsimula ngayon.')
    .replace(/I trust my path, I welcome abundance and clarity into my life, and I step forward with full confidence\./gi, 'Nagtitiwala ako sa plano ng tadhana, malugod kong tinatanggap ang kasaganaan at kalinawan sa aking buhay, at buong tapang akong humahakbang pasulong.')
    .replace(/I trust the cosmic journey and step boldly into fresh horizons\./gi, 'Nagtitiwala ako sa banal na paglalakbay at buong tapang akong humahakbang sa bagong bukang-liwayway.')
    .replace(/The oracle transmission is complete\. Meditate on the symbols drawn\./gi, 'Ang pagbasa ng banal na kapalaran ay handa na. Magnilay sa mga simbolong lumabas sa iyong baraha.')
    .replace(/Take time to reflect on/gi, 'Maglaan ng panahon upang magnilay sa')
    .replace(/Step forward with confidence/gi, 'Humakbang pasulong nang may tiwala sa sarili')
    .replace(/Trust your intuition/gi, 'Magtiwala sa iyong kutob')
    .replace(/A fresh cycle begins/gi, 'Isang bagong kabanata ang nagsisimula')
    .replace(/Inner peace and clarity/gi, 'Kapayapaan ng loob at kalinawan ng isip')
    .replace(/Blessings and abundance/gi, 'Mga biyaya at kasaganaan')
    .replace(/Release any fears or doubts/gi, 'Pakawalan ang takot at pag-aalinlangan')
    .replace(/Healing and renewal/gi, 'Paghilom at panibagong lakas');

  // 7. Translate keywords
  Object.entries(TAGALOG_KEYWORDS).forEach(([enKw, tlKw]) => {
    const reg = new RegExp(`\\b${enKw}\\b`, 'gi');
    translated = translated.replace(reg, tlKw);
  });

  return translated;
}

/**
 * Builds a 100% native Tagalog procedural prophecy when AI is loading or offline.
 */
export function generateProceduralSynthesisTagalog(
  question: string | undefined,
  spreadName: string,
  cards: Array<{
    slotTitle: string;
    slotRole: string;
    cardName: string;
    isReversed: boolean;
    keywords?: string[];
    meaning?: string;
  }>,
  readingFocus: ReadingFocusId = 'love'
): string {
  const focusObj = TAGALOG_FOCUS_TITLES[readingFocus] || TAGALOG_FOCUS_TITLES.love;
  const inquiry = question?.trim() || `Gabay at kalinawan para sa ${focusObj.name}`;

  const majorThemes = cards
    .map((c) => {
      const tlCardName = TAGALOG_CARD_NAMES[c.cardName] || c.cardName;
      const orient = c.isReversed ? 'Pabaligtad ↺' : 'Nakatayo ✦';
      const slotName = TAGALOG_SLOT_ROLES[c.slotTitle] || c.slotTitle;
      const cardCore = TAGALOG_CARD_CORE[c.cardName];
      const meaningText = c.isReversed
        ? cardCore?.reversed ||
          'Paalala na magnilay muna nang taimtim, paghilumin ang mga alinlangan, at huwag magmadali sa mga desisyon ukol dito.'
        : cardCore?.upright ||
          'Isang malakas na tanda ng biyaya, kalinawan ng isip, at bukas na pinto para sa iyong tagumpay at kapayapaan.';

      return `- **${slotName} (${tlCardName} - ${orient})**: ${meaningText}`;
    })
    .join('\n\n');

  const directives = cards.slice(0, 3).map((c, i) => {
    const tlCardName = TAGALOG_CARD_NAMES[c.cardName] || c.cardName;
    const slotName = TAGALOG_SLOT_ROLES[c.slotTitle] || c.slotTitle;
    const cardCore = TAGALOG_CARD_CORE[c.cardName];
    if (c.isReversed) {
      return `${i + 1}. **Pagninilay sa ${tlCardName}**: ${cardCore?.advice || `Maglaan ng sandali upang pakawalan ang takot at pagdududa ukol sa iyong ${slotName}. Manatiling mahinahon at alagaan ang sariling kapakanan.`}`;
    }
    return `${i + 1}. **Tanggapin ang Biyaya ng ${tlCardName}**: ${cardCore?.advice || `Buong tapang na humakbang pasulong para sa iyong ${slotName}. Magtiwala sa iyong sariling kakayahan at magsimula ngayon nang may tiwala sa Maykapal.`}`;
  });

  return `### ✦ Ang Pangkalahatang Mensahe at Gabay

**Larangan ng Pagbasa:** ${focusObj.name}  
**Ang Iyong Tanong:** *"${inquiry}"*

Sa **${spreadName}** na pagbasang ito na nakatuon sa **${focusObj.name}**, ipinababatid ng mga sagradong baraha na ikaw ay nasa isang mahalagang yugto ng pagbabago. Matapos ang mga pagsubok at aral ng nakaraan, sumisikat na ang bagong liwanag at kasaganaan. Ang pangkalahatang mensahe ay puno ng pag-asa: ang mga sagot at biyayang iyong inaasam ay unti-unting matutupad sa pamamagitan ng matatag na pananalig, malinis na hangarin, at tiwala sa sarili.

---

### ⚡ Pagsusuri sa Bawat Baraha

${majorThemes}

---

### 🔑 Mga Praktikal na Payo at Hakbang na Dapat Gawin

${directives.join('\n\n')}

---

### ✨ Ang Iyong Banal na Paninindigan (Affirmation)

> *"Nagtitiwala ako sa plano ng tadhana. Malugod kong tinatanggap ang kapayapaan, kasaganaan, kalusugan, at tunay na pag-ibig sa aking buhay, at buong tapang akong humahakbang pasulong."*`;
}
