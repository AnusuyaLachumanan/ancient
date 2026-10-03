import React from 'react';
import { X, CheckCircle, AlertCircle, Sparkles, Volume2 } from 'lucide-react';
import { CharacterSegment } from '../types';
import { speakText } from '../utils/audio';

interface CharacterInspectModalProps {
  character: CharacterSegment | null;
  onClose: () => void;
}

export const CharacterInspectModal: React.FC<CharacterInspectModalProps> = ({ character, onClose }) => {
  if (!character) return null;

  const handleSpeak = () => {
    speakText(character.modernTamil, 'ta-IN');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <div className="card-header" style={{ padding: '20px 24px 16px 24px', borderBottom: '1px solid #e2e8f0', margin: 0 }}>
          <div className="card-title" style={{ fontSize: '1.1rem' }}>
            <Sparkles size={18} color="#2563eb" />
            Character Segment #{character.charIndex} Deep Inspection
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Top Row: Ancient Glyph vs Modern Tamil */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div
              style={{
                background: '#0f172a',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                color: '#ffffff',
                border: '1px solid #1e293b'
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Ancient Glyph Inscription
              </div>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-tamil), serif', lineHeight: 1.2 }}>
                {character.ancientChar}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '6px' }}>
                Box: [{character.box.x}%, {character.box.y}%]
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                border: '1.5px solid #cbd5e1'
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Predicted Modern Tamil
              </div>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-tamil)', color: '#059669', lineHeight: 1.2 }}>
                {character.modernTamil}
              </div>
              <button
                onClick={handleSpeak}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '6px', padding: '4px 10px', fontSize: '0.75rem' }}
              >
                <Volume2 size={13} />
                <span>Pronounce</span>
              </button>
            </div>
          </div>

          {/* Character Linguistic Details */}
          <div
            style={{
              background: '#f1f5f9',
              borderRadius: '10px',
              padding: '14px 18px',
              marginBottom: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              fontSize: '0.82rem'
            }}
          >
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>Transliteration</span>
              <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{character.transliteration}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>Phonetic Class</span>
              <strong style={{ color: '#0f172a' }}>{character.phonetic}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>Unicode Codepoint</span>
              <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{character.codepoint}</strong>
            </div>
          </div>

          {/* Softmax Probability Distribution (Top-3 Predictions) */}
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Deep Learning Classifier Softmax Probabilities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 600 }}>1. Primary: {character.modernTamil} (Rank 1)</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>{character.confidence}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${character.confidence}%`, height: '100%', background: '#10b981' }} />
              </div>

              {character.alternatives.map((alt, idx) => (
                <div key={idx} style={{ marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
                    <span>{idx + 2}. Alternative: {alt.char}</span>
                    <span>{alt.confidence}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginTop: '2px' }}>
                    <div style={{ width: `${alt.confidence * 4}%`, height: '100%', background: '#94a3b8' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
};
