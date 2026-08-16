import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Helper to delay execution
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Executes AI generation with automatic fast-failover on 503/429 high demand spikes
 * and fallback cascade across top supported models:
 * 'gemini-3.7-flash' -> 'gemini-flash-latest' -> 'gemini-3.1-flash-lite'
 */
async function generateWithFallback(
  ai: GoogleGenAI,
  contents: any,
  systemInstruction?: string,
  temperature: number = 0.85
): Promise<string | undefined> {
  const models = ['gemini-3.7-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];

  for (let m = 0; m < models.length; m++) {
    const modelName = models[m];

    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature,
        },
      });

      if (response.text && response.text.trim().length > 0) {
        return response.text;
      }
    } catch (err: any) {
      const isUnavailable =
        err?.status === 503 ||
        err?.code === 503 ||
        err?.message?.includes('503') ||
        err?.message?.includes('high demand') ||
        err?.message?.includes('UNAVAILABLE') ||
        err?.status === 429 ||
        err?.code === 429 ||
        err?.message?.includes('429') ||
        err?.message?.includes('RESOURCE_EXHAUSTED');

      console.warn(
        `[Gemini API] Model ${modelName} transient issue (status: ${err?.status || err?.code || 'unknown'}). Cascading to next available oracle engine...`
      );

      // Brief pause before trying alternative model to allow network/socket breath
      if (m < models.length - 1) {
        await sleep(250);
      }
    }
  }

  return undefined;
}

const TAGALOG_CARD_NAMES_SERVER: Record<string, string> = {
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

  // Wands / Baston (Fire)
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

  // Cups / Kopa (Water)
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

  // Swords / Espada (Air)
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

  // Pentacles / Barya (Earth)
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

function translateTextProceduralToTagalog(text: string): string {
  if (!text) return '';
  let res = text
    .replace(/###\s*✦?\s*The Core Message & Overview/gi, '### ✦ Ang Pangkalahatang Mensahe at Gabay')
    .replace(/###\s*✦?\s*The Quantum Synthesis/gi, '### ✦ Ang Banal na Mensahe at Buod')
    .replace(/###\s*⚡?\s*Card-by-Card Breakdown/gi, '### ⚡ Pagsusuri sa Bawat Baraha')
    .replace(/###\s*⚡?\s*Card Meanings in Your Spread/gi, '### ⚡ Kahulugan ng mga Baraha sa Iyong Hanay')
    .replace(/###\s*🔑?\s*Practical Advice & Next Steps/gi, '### 🔑 Mga Praktikal na Payo at Hakbang na Dapat Gawin')
    .replace(/###\s*✨?\s*Your Personal Affirmation/gi, '### ✨ Ang Iyong Banal na Paninindigan (Affirmation)')
    .replace(/\*\*Focus Area:\*\*/gi, '**Larangan ng Pagbasa:**')
    .replace(/\*\*Your Question:\*\*/gi, '**Ang Iyong Tanong:**')
    .replace(/Upright\s*✦/gi, 'Nakatayo ✦')
    .replace(/Reversed\s*↺/gi, 'Pabaligtad ↺')
    .replace(/Love, Relationships & Emotional Connection/gi, 'Pag-ibig, Relasyon at Puso')
    .replace(/Future, Upcoming Milestones & Destiny/gi, 'Hinaharap, Kapalaran at Tadhana')
    .replace(/Life Purpose, Inner Resilience & Spiritual Growth/gi, 'Buhay, Layunin at Lakas ng Loob')
    .replace(/Money, Career Success & Financial Fortune/gi, 'Pera, Trabaho at Kasaganaan')
    .replace(/General Clarity & Direction/gi, 'Pangkalahatang Gabay sa Buhay')
    .replace(/In this \*\*(.*?)\*\* reading focused on \*\*(.*?)\*\*, the cards indicate a powerful turning point\./gi, 'Sa **$1** na pagbasang ito na nakatuon sa **$2**, ipinababatid ng mga sagradong baraha na ikaw ay nasa isang mahalagang yugto ng pagbabago.')
    .replace(/You are moving from past lessons into a fresh cycle of clarity and personal strength\./gi, 'Mula sa mga aral ng nakaraan, lumilipat ka ngayon patungo sa bagong liwanag, kumpyansa, at tagumpay.')
    .replace(/The overall message is one of reassurance: the answers you are seeking will unfold through steady action, genuine self-trust, and staying aligned with your core values\./gi, 'Ang pangkalahatang mensahe ay puno ng pag-asa: ang mga sagot na iyong hinahanap ay darating sa pamamagitan ng tapat na pagkilos, tiwala sa sarili, at pananatili sa iyong kabutihan.');

  Object.entries(TAGALOG_CARD_NAMES_SERVER).forEach(([en, tl]) => {
    res = res.replace(new RegExp(`\\b${en}\\b`, 'gi'), tl);
  });

  return res;
}

/**
 * Rich algorithmic synthesis builder that weaves cards, positions, and inquiry
 * into a complete, beautifully structured divinatory reading when AI models are unavailable.
 */
function generateProceduralSynthesis(
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
  readingFocus?: string,
  language: string = 'en'
): string {
  const isTagalog = language === 'tl';

  if (isTagalog) {
    const focusTopic =
      readingFocus === 'love'
        ? 'Pag-ibig, Relasyon at Puso'
        : readingFocus === 'future'
        ? 'Hinaharap, Kapalaran at Tadhana'
        : readingFocus === 'life'
        ? 'Buhay, Layunin at Lakas ng Loob'
        : readingFocus === 'fortune'
        ? 'Pera, Trabaho at Kasaganaan'
        : 'Pangkalahatang Gabay sa Buhay';

    const inquiry = question?.trim() || `Gabay at kalinawan para sa ${focusTopic}`;
    const majorThemes = cards
      .map((c) => {
        const tlName = TAGALOG_CARD_NAMES_SERVER[c.cardName] || c.cardName;
        const orient = c.isReversed ? 'Pabaligtad ↺' : 'Nakatayo ✦';
        const meaningText = c.isReversed
          ? 'Paalala na magnilay muna nang taimtim, paghilumin ang mga alinlangan, at huwag magmadali sa mga desisyon.'
          : 'Isang malakas na tanda ng biyaya, kalinawan ng isip, at bukas na pinto para sa iyong tagumpay.';
        return `- **${c.slotTitle} (${tlName} - ${orient})**: ${meaningText}`;
      })
      .join('\n\n');

    const primaryDirectives = cards.slice(0, 3).map((c, i) => {
      const tlName = TAGALOG_CARD_NAMES_SERVER[c.cardName] || c.cardName;
      if (c.isReversed) {
        return `${i + 1}. **Pagninilay sa ${tlName}**: Maglaan ng sandali upang pakawalan ang takot at pagdududa ukol sa iyong "${c.slotTitle}". Manatiling mahinahon at alagaan ang sariling kapakanan.`;
      }
      return `${i + 1}. **Tanggapin ang Biyaya ng ${tlName}**: Buong tapang na humakbang pasulong para sa iyong "${c.slotTitle}". Magtiwala sa iyong sariling kakayahan at magsimula ngayon.`;
    });

    return `### ✦ Ang Pangkalahatang Mensahe at Gabay

**Larangan ng Pagbasa:** ${focusTopic}  
**Ang Iyong Tanong:** *"${inquiry}"*

Sa **${spreadName}** na pagbasang ito na nakatuon sa **${focusTopic}**, ipinababatid ng mga sagradong baraha na ikaw ay nasa isang mahalagang yugto ng pagbabago. Matapos ang mga pagsubok at aral ng nakaraan, sumisikat na ang bagong liwanag at kalinawan. Ang pangkalahatang mensahe ay puno ng pag-asa: ang mga sagot at biyayang iyong inaasam ay unti-unting matutupad sa pamamagitan ng matatag na pananalig, malinis na hangarin, at tiwala sa sarili.

---

### ⚡ Pagsusuri sa Bawat Baraha

${majorThemes}

---

### 🔑 Mga Praktikal na Payo at Hakbang na Dapat Gawin

${primaryDirectives.join('\n\n')}

---

### ✨ Ang Iyong Banal na Paninindigan (Affirmation)

> *"Nagtitiwala ako sa plano ng tadhana, malugod kong tinatanggap ang kasaganaan, kalusugan, at pag-ibig sa aking buhay, at buong tapang akong humahakbang pasulong."*`;
  }

  const focusTopic =
    readingFocus === 'love'
      ? 'Love, Relationships & Emotional Connection'
      : readingFocus === 'future'
      ? 'Future, Upcoming Milestones & Destiny'
      : readingFocus === 'life'
      ? 'Life Purpose, Inner Resilience & Spiritual Growth'
      : readingFocus === 'fortune'
      ? 'Money, Career Success & Financial Fortune'
      : 'General Clarity & Direction';

  const inquiry = question?.trim() || `Guidance on ${focusTopic}`;
  const majorThemes = cards
    .map(
      (c) =>
        `- **${c.slotTitle} (${c.cardName} - ${c.isReversed ? 'Reversed ↺' : 'Upright ✦'})**: ${c.meaning || (c.isReversed ? 'Focus on internal reflection, healing any hesitation or unblocking emotional flow.' : 'Strong positive momentum and clear blessings in this area.')}`
    )
    .join('\n');

  const primaryDirectives = cards.slice(0, 3).map((c, i) => {
    if (c.isReversed) {
      return `${i + 1}. **Reflect on ${c.cardName}**: Take a quiet moment to release doubts or overthinking around "${c.slotTitle}". Focus on gentle progress and clear boundaries.`;
    }
    return `${i + 1}. **Embrace ${c.cardName}**: Step forward with confidence in "${c.slotTitle}". Trust your instincts and take concrete action today.`;
  });

  return `### ✦ The Core Message & Overview

**Focus Area:** ${focusTopic}  
**Your Question:** *"${inquiry}"*

In this **${spreadName}** reading focused on **${focusTopic}**, the cards indicate a powerful turning point. You are moving from past lessons into a fresh cycle of clarity and personal strength. The overall message is one of reassurance: the answers you are seeking will unfold through steady action, genuine self-trust, and staying aligned with your core values.

---

### ⚡ Card Meanings in Your Spread

${majorThemes}

---

### 🔑 Practical Advice & Next Steps

${primaryDirectives.join('\n\n')}

---

### ✨ Your Personal Affirmation

> *"I trust my path, I welcome abundance and clarity into my life, and I step forward with full confidence."*`;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Tarot Reading Generation Endpoint
app.post('/api/tarot/ai-reading', async (req, res) => {
  const { question, spreadName, cards, readingFocus, language } = req.body;
  const isTagalog = language === 'tl';

  const focusTopic =
    readingFocus === 'love'
      ? (isTagalog ? 'Pag-ibig, Relasyon, Kapareha at Puso' : 'Love, Romance, Soulmates & Relationships (Red Focus)')
      : readingFocus === 'future'
      ? (isTagalog ? 'Hinaharap, Kapalaran, Tagumpay at Tadhana' : 'Future, Upcoming Destiny, Career & Timing (Blue Focus)')
      : readingFocus === 'life'
      ? (isTagalog ? 'Buhay, Layunin ng Kaluluwa at Lakas ng Loob' : 'Life Purpose, Inner Self, Mindset & Resilience (Black Focus)')
      : readingFocus === 'fortune'
      ? (isTagalog ? 'Pera, Yaman, Negosyo at Pinansyal na Suwerte' : 'Money, Wealth, Prosperity, Career & Financial Fortune (Gold Focus)')
      : (isTagalog ? 'Pangkalahatang Gabay sa Buhay' : 'General Life Guidance');

  try {
    const ai = getGeminiClient();

    if (!ai) {
      const reading = generateProceduralSynthesis(
        question,
        spreadName || 'Tarot Spread',
        cards || [],
        readingFocus,
        isTagalog ? 'tl' : 'en'
      );
      return res.json({
        success: true,
        source: 'procedural-oracle',
        reading,
      });
    }

    const cardsPrompt = (cards || [])
      .map(
        (c: any, i: number) =>
          `[Position ${i + 1}] ${c.slotTitle} (${c.slotRole}): ${c.cardName} (Orientation: ${c.isReversed ? 'Reversed ↺' : 'Upright ✦'})\n- Keywords: ${c.keywords?.join(', ') || 'N/A'}\n- Meaning: ${c.meaning || 'N/A'}`
      )
      .join('\n\n');

    const prompt = isTagalog
      ? `You are "Tarot Reading Leo", a warm, wise, compassionate, Filipino-speaking tarot reader. Provide a complete, fluent, and inspiring reading written entirely in warm, respectful, natural Filipino/Tagalog (Tagalog language).

Reading Focus Area: ${focusTopic}
Ang Tanong ng Nagpapakonsulta:
"${question || `Gabay at kalinawan para sa ${focusTopic}`}"

Spread: ${spreadName || 'Tarot Spread'}

Mga Barahang Nabunot:
${cardsPrompt}

Please provide a clear, inspiring, and easy-to-read tarot interpretation in fluent Tagalog/Filipino specifically addressing their ${focusTopic} focus.
Format your response in clean, well-spaced Markdown with these exact section headings:

### ✦ Ang Pangkalahatang Mensahe at Gabay
Sumulat ng 2 talata sa malinaw at nakapagpapatibay na Tagalog na nagpapaliwanag kung ano ang sinasabi ng mga barahang ito ukol sa kanilang ${focusTopic}, kung nasaan sila ngayon, at anong magagandang pagbabago ang paparating.

### ⚡ Pagsusuri sa Bawat Baraha
Para sa bawat barahang nabunot sa posisyon nito, sumulat ng 2-3 pangungusap sa simpleng Tagalog kung ano ang ibig sabihin nito para sa kanilang ${focusTopic}.

### 🔑 Mga Praktikal na Payo at Hakbang na Dapat Gawin
Magbigay ng 2-3 malinaw na bilang (numbered bullets) ng mga payo at praktikal na hakbang na madaling magagawa sa pang-araw-araw na buhay para sa kanilang ${focusTopic}.

### ✨ Ang Iyong Banal na Paninindigan (Affirmation)
Magbigay ng isang maikli, makapangyarihan at positibong affirmation quote sa blockquote (> "...") sa Tagalog para sa kanilang ${focusTopic}.

Panatilihing magiliw, may malasakit, malinaw, at puno ng inspirasyon ang pananalita.`
      : `You are "Tarot Reading Leo", a warm, wise, compassionate, and easy-to-understand tarot reader. Your goal is to provide a reading that is crystal-clear, relatable, empowering, and directly focused on the seeker's chosen topic.

Reading Focus Area: ${focusTopic}
The seeker asked:
"${question || `Guidance and clarity regarding ${focusTopic}`}"

Spread: ${spreadName || 'Tarot Spread'}

Cards Drawn:
${cardsPrompt}

Please provide a clear, inspiring, and easy-to-read tarot interpretation specifically addressing their ${focusTopic} focus.
Format your response in clean, well-spaced Markdown with these exact section headings:

### ✦ The Core Message & Overview
Provide a clear, 2-paragraph overview in plain, warm, uplifting English explaining what these cards say about their ${focusTopic}, where they stand right now, and what positive shifts are approaching.

### ⚡ Card-by-Card Breakdown
For each drawn card in its position, write a short 2-3 sentence explanation in simple terms explaining what it specifically means for their ${focusTopic}.

### 🔑 Practical Advice & Next Steps
Provide 2-3 clear, numbered bullet points with simple, actionable advice the seeker can actually do in daily life to improve their ${focusTopic}.

### ✨ Your Personal Affirmation
Provide one short, powerful, inspiring quote/mantra in a blockquote (> "...") tailored to their ${focusTopic} for the seeker to remember.

Keep all explanations grounded, positive, easy to read, and empowering.`;

    const generatedText = await generateWithFallback(
      ai,
      prompt,
      isTagalog
        ? 'Ikaw si Tarot Reading Leo: isang maunawain, marunong, at magiliw na Tagalog tarot reader na nagbibigay ng malinaw na gabay sa pag-ibig, kapalaran, buhay, at kayamanan.'
        : 'You are Tarot Reading Leo: a warm, insightful, easy-to-understand tarot reader providing clear, practical guidance on love, future, life, and fortune.',
      0.7
    );

    if (generatedText) {
      return res.json({
        success: true,
        source: 'gemini-oracle',
        reading: generatedText,
      });
    }

    // Fallback if all API models were busy
    const fallbackReading = generateProceduralSynthesis(
      question,
      spreadName || 'Tarot Spread',
      cards || [],
      readingFocus,
      isTagalog ? 'tl' : 'en'
    );
    return res.json({
      success: true,
      source: 'resilient-oracle',
      reading: fallbackReading,
    });
  } catch (error: any) {
    console.error('Error generating AI tarot reading:', error);
    const fallbackReading = generateProceduralSynthesis(
      question,
      spreadName || 'Tarot Spread',
      cards || [],
      readingFocus,
      isTagalog ? 'tl' : 'en'
    );
    return res.json({
      success: true,
      source: 'fallback-oracle',
      reading: fallbackReading,
    });
  }
});

// Dedicated Translation Endpoint (English <-> Tagalog)
app.post('/api/tarot/translate', async (req, res) => {
  const { text, targetLang = 'tl', readingFocus } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text to translate is required' });
  }

  try {
    const ai = getGeminiClient();
    if (!ai) {
      const proceduralTranslation = translateTextProceduralToTagalog(text);
      return res.json({
        success: true,
        source: 'procedural-translator',
        translatedText: proceduralTranslation || text,
      });
    }

    const prompt = `You are a revered Filipino spiritual guide, master tarot reader, and native Tagalog writer.
Translate the following English Tarot reading into warm, fluent, compassionate, poetic, and culturally authentic Filipino/Tagalog (Wika ng Pag-ibig, Karunungan at Kapalaran).

CRITICAL TRANSLATION RULES:
1. Speak in natural, respectful, empathetic Filipino (conversational yet deeply spiritual, like a wise elder or compassionate Babaylan).
2. DO NOT produce stiff, word-for-word, or robotic machine translation. Rephrase sentences so they flow musically and gracefully in Tagalog.
3. Use correct Tagalog terminology for tarot elements:
   - "Upright" -> "Nakatayo ✦"
   - "Reversed" -> "Pabaligtad ↺"
   - "The Fool" -> "Ang Hangal (Ang Manlalakbay)"
   - "Wheel of Fortune" -> "Gulong ng Palad"
   - "The High Priestess" -> "Ang Kataas-taasang Babaylan"
   - "The Sun" -> "Ang Araw ng Kaligayahan"
   - "Wands" -> "Baston", "Cups" -> "Kopa", "Swords" -> "Espada", "Pentacles" -> "Barya"
4. Format all headings using these exact standard headers:
   - "### ✦ Ang Pangkalahatang Mensahe at Gabay"
   - "### ⚡ Pagsusuri sa Bawat Baraha"
   - "### 🔑 Mga Praktikal na Payo at Hakbang na Dapat Gawin"
   - "### ✨ Ang Iyong Banal na Paninindigan (Affirmation)"
5. Preserve all Markdown structure, bullet points, numbers, and blockquotes (> "...").

English Tarot Reading to Translate:
${text}`;

    const translatedText = await generateWithFallback(
      ai,
      prompt,
      'Ikaw ay isang dalubhasang Tagalog tarot master na nagsasalin ng mga banal na mensahe sa pinakamagandang wikang Filipino—puno ng malasakit, karunungan, liwanag, at tunay na pag-asa.',
      0.5
    );

    if (translatedText && translatedText !== text) {
      return res.json({
        success: true,
        source: 'gemini-translator',
        translatedText,
      });
    }

    const proceduralTranslation = translateTextProceduralToTagalog(text);
    return res.json({
      success: true,
      source: 'fallback-translator',
      translatedText: proceduralTranslation || text,
    });
  } catch (err) {
    console.error('Translation error:', err);
    const proceduralTranslation = translateTextProceduralToTagalog(text);
    return res.json({
      success: true,
      source: 'error-fallback',
      translatedText: proceduralTranslation || text,
    });
  }
});

// Follow-up chat with the Oracle
app.post('/api/tarot/ai-chat', async (req, res) => {
  const { history, message, readingContext } = req.body;

  try {
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        reply: `The Oracle hears your query: "${message}". The celestial cards encourage you to trust your internal knowing. Ground yourself in the present moment and take the step that feels most resonant with your authentic heart.`,
      });
    }

    const systemInstruction = `You are the Nano Banana Cyber-Oracle continuing an intimate spiritual consultation about a tarot reading.
Active Reading Context:
Question: ${readingContext?.question || 'General'}
Spread: ${readingContext?.spreadName || 'Tarot'}
Cards Dealt: ${readingContext?.cardsSummary || 'Active Spread'}

Respond with concise, deeply comforting, perceptive, and illuminating answers (1-2 paragraphs max). Keep the tone mystical yet practical.`;

    const chatContents = (history || []).map((h: any) => ({
      role: h.role === 'oracle' ? 'model' : 'user',
      parts: [{ text: h.text }],
    }));

    chatContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const reply = await generateWithFallback(ai, chatContents, systemInstruction, 0.8);

    if (reply) {
      return res.json({
        success: true,
        reply,
      });
    }

    return res.json({
      success: true,
      reply: 'The ethereal waves momentarily shimmer. Reflect on your core intention; the answer you seek is already whispering in your heart.',
    });
  } catch (error) {
    console.error('Chat error:', error);
    return res.json({
      success: true,
      reply: 'The ethereal waves momentarily shimmer. Reflect on your core intention; the answer you seek is already whispering in your heart.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nano Banana Neo-Arcana Tarot Server running on http://localhost:${PORT}`);
  });
}

startServer();

