import React, { useState } from 'react';
import {
  Languages,
  ArrowRight,
  Copy,
  Check,
  Volume2,
  Sparkles,
  BookOpen,
  ArrowRightLeft
} from 'lucide-react';
import { ActiveTab, InscriptionData, LanguageCode } from '../types';
import { languageOptions } from '../data/mockData';
import { Stepper } from '../components/Stepper';
import { speakText } from '../utils/audio';

interface TranslationViewProps {
  currentInscription: InscriptionData;
  onNavigateTab: (tab: ActiveTab) => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const TranslationView: React.FC<TranslationViewProps> = ({
  currentInscription,
  onNavigateTab,
  selectedLanguage,
  onSelectLanguage
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [translitScheme, setTranslitScheme] = useState<'iso' | 'academic'>('iso');

  const currentTranslation =
    currentInscription.translations[selectedLanguage] || currentInscription.translations.en;
  const langMeta = languageOptions.find((l) => l.code === selectedLanguage) || languageOptions[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTranslation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSpeakTamil = () => {
    speakText(currentInscription.modernTamilText, 'ta-IN');
  };

  const handleSpeakTranslation = () => {
    const langCodeMap: Record<LanguageCode, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      ml: 'ml-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      fr: 'fr-FR',
      de: 'de-DE',
      sa: 'hi-IN',
      es: 'es-ES'
    };
    speakText(currentTranslation, langCodeMap[selectedLanguage] || 'en-US');
  };

  return (
    <div className="view-content-container">
      {/* 5-Step Stepper Header */}
      <Stepper currentTab="translation" onNavigateTab={onNavigateTab} />

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Languages size={20} color="#2563eb" />
              Multilingual Neural Translation & Transliteration
            </h3>
            <p className="card-subtitle">
              Translating recognized epigraph text into modern research languages using Transformer Neural Machine Translation.
            </p>
          </div>

          {/* Language Selector matching Panel 6 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Select Target Language:</span>
            <select
              className="language-dropdown-select"
              value={selectedLanguage}
              onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
            >
              {languageOptions.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.flag} {opt.name} ({opt.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Column Split: Source Tamil vs Translated Text */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Source Modern Tamil */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Source Reconstructed Tamil
              </span>
              <button className="btn btn-secondary btn-sm" onClick={handleSpeakTamil}>
                <Volume2 size={13} />
                <span>Listen</span>
              </button>
            </div>

            <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-tamil)', color: '#0f172a', lineHeight: 1.7, minHeight: '80px' }}>
              {currentInscription.modernTamilText}
            </div>

            <div style={{ marginTop: '14px', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <span>Script: {currentInscription.scriptType}</span>
              <span>Source Era: {currentInscription.period}</span>
            </div>
          </div>

          {/* Translated Text matching Panel 6 */}
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Translated Text ({langMeta.name})
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn btn-secondary btn-sm" onClick={handleSpeakTranslation}>
                  <Volume2 size={13} />
                  <span>Listen</span>
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
                  {isCopied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.6, minHeight: '80px' }}>
              {currentTranslation}
            </div>

            {/* Translation Confidence matching Panel 6 */}
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#166534' }}>
                Translation Confidence: {currentInscription.translationConfidence}%
              </span>
              <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>
                NMT BLEU Score: 38.6
              </span>
            </div>
          </div>
        </div>

        {/* Transliteration Section */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={17} color="#2563eb" />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                Standard Epigraphical Transliteration
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className={`btn btn-sm ${translitScheme === 'iso' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTranslitScheme('iso')}
              >
                ISO-15919 Standard
              </button>
              <button
                className={`btn btn-sm ${translitScheme === 'academic' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTranslitScheme('academic')}
              >
                Academic Romanization
              </button>
            </div>
          </div>

          <div
            style={{
              padding: '14px 18px',
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.05rem',
              color: '#1e293b',
              lineHeight: 1.6
            }}
          >
            {translitScheme === 'iso'
              ? currentInscription.isoTransliteration
              : currentInscription.academicTransliteration}
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
            Note: Transliteration provides direct phonetic character romanization without translation semantics, preserving original consonant diacritics (e.g. ḻ, ṇ, ṟ, ṉ).
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="view-nav-footer">
        <button className="btn btn-secondary" onClick={() => onNavigateTab('reconstruction')}>
          Back to Reconstruction
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => onNavigateTab('results')}>
          <span>Next: Complete Results & Confidence</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
