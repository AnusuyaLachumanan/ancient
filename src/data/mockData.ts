import { HistoryItem, LanguageCode, PerformanceMetrics, ScriptType } from '../types';

export const languageOptions: Array<{ code: LanguageCode; name: string; nativeName: string; flag: string }> = [
  { code: 'en', name: 'English', nativeName: 'English (UK / US)', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français (French)', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch (German)', flag: '🇩🇪' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम् (Sanskrit)', flag: '🕉️' },
  { code: 'es', name: 'Spanish', nativeName: 'Español (Spanish)', flag: '🇪🇸' },
];

export const initialHistoryItems: HistoryItem[] = [
  {
    id: 'hist-1',
    inscriptionId: 'tirupparankunram-vattezhuthu',
    title: 'Tirupparankunram Vattezhuthu Stone Slab',
    imageSrc: '/samples/sample_vattezhuthu.jpg',
    date: '2026-04-28',
    time: '10:32 AM',
    scriptType: 'Vattezhuthu',
    targetLanguage: 'English',
    targetLanguageCode: 'en',
    recognitionAccuracy: 94.2,
    translationConfidence: 91.7,
    status: 'Completed',
    modernTamil: 'இது பாண்டிய மன்னன் குடிமகன் அமைத்த கல்வெட்டு ஆகும்.',
    translatedText: 'This is a stone inscription established by the citizen under the Pandya king.'
  },
  {
    id: 'hist-2',
    inscriptionId: 'mangulam-tamil-brahmi',
    title: 'Mangulam Tamil-Brahmi Cave Inscription',
    imageSrc: '/samples/sample_brahmi.jpg',
    date: '2026-04-27',
    time: '16:45 PM',
    scriptType: 'Tamil-Brahmi',
    targetLanguage: 'Hindi',
    targetLanguageCode: 'hi',
    recognitionAccuracy: 96.5,
    translationConfidence: 94.2,
    status: 'Completed',
    modernTamil: 'காடலன் வழுதியார் எண்த்து அமணன் இது...',
    translatedText: 'यह पांड्य राजा नेदुंचेळियन के शासनकाल में अधिकारी काडलन वळुती द्वारा जैन तपस्वी मुनि को दान में दी गई शिला शय्या है।'
  },
  {
    id: 'hist-3',
    inscriptionId: 'velvikudi-copper-plates',
    title: 'Velvikudi Copper Plate Grant',
    imageSrc: '/samples/sample_copper.jpg',
    date: '2026-04-26',
    time: '11:20 AM',
    scriptType: 'Grantha',
    targetLanguage: 'French',
    targetLanguageCode: 'fr',
    recognitionAccuracy: 95.8,
    translationConfidence: 93.4,
    status: 'Completed',
    modernTamil: 'ஸ்ரீ பாண்டிய மாறஞ்சடையன் வேள்விக்குடி கிராமத்தை...',
    translatedText: 'Charte sur plaque de cuivre attestant du renouvellement de la concession du village de Velvikudi...'
  },
  {
    id: 'hist-4',
    inscriptionId: 'thanjavur-rajaraja-chola',
    title: 'Thanjavur Brihadeeswarar Vimana Base',
    imageSrc: '/samples/sample_thanjavur.jpg',
    date: '2026-04-25',
    time: '14:10 PM',
    scriptType: 'Medieval Tamil',
    targetLanguage: 'English',
    targetLanguageCode: 'en',
    recognitionAccuracy: 97.4,
    translationConfidence: 95.8,
    status: 'Completed',
    modernTamil: 'ஸ்வஸ்திஸ்ரீ திருமாமகள் போல பெருநிலச் செல்வியும் தனக்கே உரிமை...',
    translatedText: 'Hail Prosperity! When the Goddess of Wealth and the Goddess of the Great Earth were wedded to him, King Rajaraja Chola made endowments...'
  },
  {
    id: 'hist-5',
    inscriptionId: 'tirupparankunram-vattezhuthu',
    title: 'Tirupparankunram Inscription Register II',
    imageSrc: '/samples/sample_vattezhuthu.jpg',
    date: '2026-04-24',
    time: '09:05 AM',
    scriptType: 'Vattezhuthu',
    targetLanguage: 'German',
    targetLanguageCode: 'de',
    recognitionAccuracy: 93.9,
    translationConfidence: 90.5,
    status: 'Completed',
    modernTamil: 'இது பாண்டிய மன்னன் குடிமகன் அமைத்த கல்வெட்டு ஆகும்.',
    translatedText: 'Dies ist eine Steininschrift, die von einem Bürger unter dem Pandya-König errichtet wurde.'
  }
];

export const performanceMetrics: PerformanceMetrics = {
  overallAccuracy: 95.4,
  precision: 94.8,
  recall: 93.9,
  f1Score: 94.3,
  characterErrorRate: 4.8,
  wordErrorRate: 7.2,
  bleuScore: 38.6,
  epochHistory: [
    { epoch: 5, trainAcc: 74.2, valAcc: 71.8, trainLoss: 0.82, valLoss: 0.89 },
    { epoch: 10, trainAcc: 82.5, valAcc: 80.1, trainLoss: 0.58, valLoss: 0.63 },
    { epoch: 15, trainAcc: 88.7, valAcc: 86.4, trainLoss: 0.41, valLoss: 0.46 },
    { epoch: 20, trainAcc: 92.3, valAcc: 90.2, trainLoss: 0.29, valLoss: 0.35 },
    { epoch: 25, trainAcc: 94.8, valAcc: 92.7, trainLoss: 0.21, valLoss: 0.28 },
    { epoch: 30, trainAcc: 96.6, valAcc: 94.5, trainLoss: 0.15, valLoss: 0.22 },
    { epoch: 35, trainAcc: 97.8, valAcc: 95.4, trainLoss: 0.11, valLoss: 0.19 }
  ],
  classAccuracy: [
    { script: 'Tamil-Brahmi', samples: 45200, accuracy: 96.5, f1: 95.8 },
    { script: 'Vattezhuthu', samples: 52100, accuracy: 94.7, f1: 94.1 },
    { script: 'Grantha', samples: 28400, accuracy: 95.8, f1: 95.2 },
    { script: 'Medieval Tamil', samples: 16800, accuracy: 97.4, f1: 96.9 }
  ]
};

export const datasetCorpusStats = {
  totalInscriptions: 1248,
  totalCharacters: 142500,
  scriptDistribution: [
    { name: 'Vattezhuthu (4th–11th c. CE)', count: 57000, percentage: 40, color: '#3b82f6' },
    { name: 'Tamil-Brahmi (3rd c. BCE–1st c. CE)', count: 49875, percentage: 35, color: '#10b981' },
    { name: 'Grantha (6th–14th c. CE)', count: 21375, percentage: 15, color: '#8b5cf6' },
    { name: 'Medieval Tamil (9th–13th c. CE)', count: 14250, percentage: 10, color: '#f59e0b' }
  ],
  mediumDistribution: [
    { medium: 'Rock & Cave Shelters', count: 432, percentage: 34.6 },
    { medium: 'Temple Granite Walls & Basements', count: 528, percentage: 42.3 },
    { medium: 'Copper Plates (Ceppēṭu)', count: 184, percentage: 14.7 },
    { medium: 'Hero Stones (Naṭukal)', count: 104, percentage: 8.4 }
  ],
  dataSplits: {
    train: 99750, // 70%
    validation: 21375, // 15%
    test: 21375 // 15%
  }
};
