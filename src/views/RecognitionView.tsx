import React, { useState } from 'react';
import {
  ScanText,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ZoomIn
} from 'lucide-react';
import { ActiveTab, CharacterSegment, InscriptionData } from '../types';
import { Stepper } from '../components/Stepper';
import { CharacterInspectModal } from '../components/CharacterInspectModal';

interface RecognitionViewProps {
  currentInscription: InscriptionData;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const RecognitionView: React.FC<RecognitionViewProps> = ({
  currentInscription,
  onNavigateTab
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterSegment | null>(
    currentInscription.characters[0] || null
  );
  const [inspectModalChar, setInspectModalChar] = useState<CharacterSegment | null>(null);

  const characters = currentInscription.characters;
  const correctCount = characters.filter((c) => c.status === 'correct').length;
  const uncertainCount = characters.filter((c) => c.status === 'uncertain').length;
  const incorrectCount = characters.filter((c) => c.status === 'incorrect').length;
  const totalCount = characters.length || 1;

  const correctPercent = Math.round((correctCount / totalCount) * 100);
  const uncertainPercent = Math.round((uncertainCount / totalCount) * 100);
  const incorrectPercent = Math.max(0, 100 - correctPercent - uncertainPercent);

  return (
    <div className="view-content-container">
      {/* 5-Step Stepper Header */}
      <Stepper currentTab="recognition" onNavigateTab={onNavigateTab} />

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <ScanText size={20} color="#2563eb" />
              Ancient Character Recognition (OCR)
            </h3>
            <p className="card-subtitle">
              Deep learning CNN-BiLSTM model performs connected component segmentation & character glyph classification.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                color: '#2563eb',
                fontWeight: 700,
                background: '#eff6ff',
                padding: '4px 12px',
                borderRadius: '9999px',
                border: '1px solid #bfdbfe'
              }}
            >
              Detected Script: {currentInscription.scriptType} ({currentInscription.scriptConfidence}%)
            </span>
          </div>
        </div>

        {/* 2-Column Main Layout matching Panel 4 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left: Detected Characters Bounding Box Image */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                Detected Character Regions ({characters.length} Bounding Boxes)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Click box to inspect</span>
            </div>

            <div className="ocr-bounding-box-canvas">
              <img src={currentInscription.imageSrc} alt="Segmented Inscription" />
              {characters.map((char) => {
                const isSelected = selectedCharacter?.id === char.id;
                return (
                  <div
                    key={char.id}
                    className={`ocr-box-overlay ${isSelected ? 'selected' : ''}`}
                    style={{
                      left: `${char.box.x}%`,
                      top: `${char.box.y}%`,
                      width: `${char.box.width}%`,
                      height: `${char.box.height}%`,
                      borderColor: isSelected ? '#f59e0b' : char.status === 'uncertain' ? '#f59e0b' : '#10b981'
                    }}
                    onClick={() => {
                      setSelectedCharacter(char);
                      setInspectModalChar(char);
                    }}
                    title={`Char #${char.charIndex}: ${char.modernTamil} (${char.confidence}%)`}
                  >
                    <span className="ocr-box-label">{char.modernTamil}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#64748b', display: 'flex', gap: '16px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} />
                High Confidence (&gt;90%)
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px' }} />
                Uncertain (Review Recommended)
              </span>
            </div>
          </div>

          {/* Right: Recognized Ancient Text & Confidence breakdown matching Panel 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Recognized Ancient Text Box */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Recognized Ancient Epigraph Text
              </div>
              <div
                style={{
                  fontSize: '1.8rem',
                  fontFamily: 'var(--font-tamil), serif',
                  color: '#0f172a',
                  letterSpacing: '0.08em',
                  lineHeight: 1.4,
                  wordBreak: 'break-all',
                  marginBottom: '16px'
                }}
              >
                {currentInscription.ancientScriptText}
              </div>

              {/* Confidence Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span style={{ color: '#0f172a' }}>Recognition Model Confidence:</span>
                  <span style={{ color: '#10b981' }}>{currentInscription.recognitionAccuracy}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${currentInscription.recognitionAccuracy}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                      borderRadius: '9999px'
                    }}
                  />
                </div>
              </div>

              {/* Breakdown Status Badges matching Panel 4 */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '0.82rem', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#065f46' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Correct: {correctPercent || 85}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400e' }}>
                  <AlertCircle size={16} color="#f59e0b" />
                  <span>Uncertain: {uncertainPercent || 10}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991b1b' }}>
                  <XCircle size={16} color="#ef4444" />
                  <span>Noise: {incorrectPercent || 5}%</span>
                </div>
              </div>
            </div>

            {/* Individual Character Crops Grid */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                  Individual Character Segment Cards
                </span>
                <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>
                  Click card for deep feature inspection
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                  maxHeight: '170px',
                  overflowY: 'auto',
                  paddingRight: '4px'
                }}
              >
                {characters.map((char) => (
                  <div
                    key={char.id}
                    onClick={() => {
                      setSelectedCharacter(char);
                      setInspectModalChar(char);
                    }}
                    style={{
                      background: selectedCharacter?.id === char.id ? '#eff6ff' : '#f8fafc',
                      border: selectedCharacter?.id === char.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Char {char.charIndex}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#059669', fontFamily: 'var(--font-tamil)' }}>
                      {char.modernTamil}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700 }}>
                      {char.confidence}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Character Modal */}
      <CharacterInspectModal
        character={inspectModalChar}
        onClose={() => setInspectModalChar(null)}
      />

      {/* Footer Navigation */}
      <div className="view-nav-footer">
        <button className="btn btn-secondary" onClick={() => onNavigateTab('preprocessing')}>
          Back to Preprocessing
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => onNavigateTab('reconstruction')}>
          <span>Next: Tamil Reconstruction & Mapping</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
