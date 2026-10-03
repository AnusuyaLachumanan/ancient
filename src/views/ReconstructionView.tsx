import React, { useState } from 'react';
import {
  Type,
  ArrowRight,
  Copy,
  Check,
  Volume2,
  Edit3,
  Download,
  CheckCircle2,
  Info,
  Layers
} from 'lucide-react';
import { ActiveTab, InscriptionData } from '../types';
import { Stepper } from '../components/Stepper';
import { speakText } from '../utils/audio';

interface ReconstructionViewProps {
  currentInscription: InscriptionData;
  onNavigateTab: (tab: ActiveTab) => void;
  onUpdateTamilText: (newText: string) => void;
}

export const ReconstructionView: React.FC<ReconstructionViewProps> = ({
  currentInscription,
  onNavigateTab,
  onUpdateTamilText
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(currentInscription.modernTamilText);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSpeak = () => {
    speakText(editedText, 'ta-IN');
  };

  const handleSaveEdit = () => {
    onUpdateTamilText(editedText);
    setIsEditing(false);
  };

  return (
    <div className="view-content-container">
      {/* 5-Step Stepper Header */}
      <Stepper currentTab="reconstruction" onNavigateTab={onNavigateTab} />

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Type size={20} color="#2563eb" />
              Tamil Text Reconstruction
            </h3>
            <p className="card-subtitle">
              Converting segmented ancient epigraph glyphs into standardized Modern Tamil Unicode representation.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleSpeak}>
              <Volume2 size={15} />
              <span>Audio Pronounce</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
              {isCopied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
              <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              className={`btn btn-sm ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => {
                if (isEditing) handleSaveEdit();
                else setIsEditing(true);
              }}
            >
              <Edit3 size={15} />
              <span>{isEditing ? 'Save Corrections' : 'Edit Text'}</span>
            </button>
          </div>
        </div>

        {/* Modern Tamil Text Box matching Panel 5 */}
        <div className="tamil-text-display-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Modern Tamil Unicode Text
            </span>
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
              Script Era: {currentInscription.period}
            </span>
          </div>

          {isEditing ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1.4rem',
                fontFamily: 'var(--font-tamil)',
                borderRadius: '8px',
                border: '2px solid #2563eb',
                outline: 'none',
                lineHeight: 1.6
              }}
            />
          ) : (
            <div className="tamil-output-text">
              {editedText}
            </div>
          )}

          {/* Confidence Indicator matching Panel 5 */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#0f172a' }}>Reconstruction Confidence:</span>
              <span style={{ color: '#10b981' }}>{currentInscription.recognitionAccuracy}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
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
        </div>

        {/* Character Mapping Table matching Panel 5 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 12px 0' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
              Character Mapping Table (Epigraph Glyph &rarr; Modern Tamil)
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Epigraphical Palaeography Rules
            </span>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
            <table className="mapping-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Ancient Character</th>
                  <th style={{ width: '10%', textAlign: 'center' }}>&rarr;</th>
                  <th style={{ width: '25%' }}>Modern Tamil</th>
                  <th style={{ width: '40%' }}>Linguistic & Epigraph Description</th>
                </tr>
              </thead>
              <tbody>
                {currentInscription.characterMapping.map((map, idx) => (
                  <tr key={idx}>
                    <td className="ancient-char-cell">{map.ancient}</td>
                    <td style={{ textAlign: 'center', color: '#94a3b8', fontWeight: 700 }}>&rarr;</td>
                    <td className="modern-char-cell">{map.modern}</td>
                    <td style={{ fontSize: '0.82rem', color: '#475569' }}>
                      <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>[{map.translit}]</strong> — {map.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="view-nav-footer">
        <button className="btn btn-secondary" onClick={() => onNavigateTab('recognition')}>
          Back to Recognition
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => onNavigateTab('translation')}>
          <span>Next: Multilingual Translation</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
