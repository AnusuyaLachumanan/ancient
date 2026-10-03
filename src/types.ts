export type ScriptType = 'Tamil-Brahmi' | 'Vattezhuthu' | 'Grantha' | 'Medieval Tamil';

export type LanguageCode = 'en' | 'hi' | 'ml' | 'te' | 'kn' | 'fr' | 'de' | 'sa' | 'es';

export interface CharacterSegment {
  id: string;
  charIndex: number;
  ancientChar: string;
  modernTamil: string;
  transliteration: string;
  confidence: number;
  status: 'correct' | 'uncertain' | 'incorrect';
  box: {
    x: number; // percentage (0-100)
    y: number;
    width: number;
    height: number;
  };
  alternatives: Array<{
    char: string;
    confidence: number;
  }>;
  phonetic: string;
  codepoint: string;
}

export interface InscriptionData {
  id: string;
  title: string;
  tamilTitle: string;
  period: string;
  dynasty: string;
  location: string;
  scriptType: ScriptType;
  imageSrc: string;
  fileSize: string;
  resolution: string;
  imageType: string;
  ancientScriptText: string;
  modernTamilText: string;
  academicTransliteration: string;
  isoTransliteration: string;
  translations: Record<LanguageCode, string>;
  recognitionAccuracy: number;
  translationConfidence: number;
  scriptConfidence: number;
  characters: CharacterSegment[];
  characterMapping: Array<{
    ancient: string;
    modern: string;
    translit: string;
    description: string;
  }>;
  historicalContext: string;
  archaeologicalNotes: string;
  dateDiscovered?: string;
  museumRef?: string;
}

export interface PreprocessingSettings {
  denoise: boolean;
  denoiseStrength: number; // 1-10
  clahe: boolean;
  contrastLevel: number; // 1-10
  binarization: boolean;
  threshold: number; // 0-255
  edgeDetection: boolean;
  edgeMethod: 'sobel' | 'canny' | 'laplacian';
  sharpen: boolean;
  grayscale: boolean;
  morphology: 'none' | 'dilate' | 'erode';
}

export interface HistoryItem {
  id: string;
  inscriptionId: string;
  title: string;
  imageSrc: string;
  date: string;
  time: string;
  scriptType: ScriptType;
  targetLanguage: string;
  targetLanguageCode: LanguageCode;
  recognitionAccuracy: number;
  translationConfidence: number;
  status: 'Completed' | 'High Confidence' | 'Needs Review';
  modernTamil: string;
  translatedText: string;
}

export interface PerformanceMetrics {
  overallAccuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  characterErrorRate: number;
  wordErrorRate: number;
  bleuScore: number;
  epochHistory: Array<{
    epoch: number;
    trainAcc: number;
    valAcc: number;
    trainLoss: number;
    valLoss: number;
  }>;
  classAccuracy: Array<{
    script: ScriptType;
    samples: number;
    accuracy: number;
    f1: number;
  }>;
}

export type ActiveTab =
  | 'home'
  | 'upload'
  | 'preprocessing'
  | 'recognition'
  | 'reconstruction'
  | 'translation'
  | 'results'
  | 'history'
  | 'performance'
  | 'dataset'
  | 'about';
