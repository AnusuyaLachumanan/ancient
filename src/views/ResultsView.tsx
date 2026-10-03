import React, { useState } from 'react';
import {
  Award,
  Download,
  RotateCcw,
  Sparkles,
  FileText,
  Share2,
  CheckCircle2,
  BookOpen,
  Volume2,
  Eye
} from 'lucide-react';
import { ActiveTab, InscriptionData, LanguageCode } from '../types';
import { languageOptions } from '../data/mockData';
import { Stepper } from '../components/Stepper';
import { generateResearchReportPDF } from '../utils/pdfExport';
import { speakText } from '../utils/audio';

interface ResultsViewProps {
  currentInscription: InscriptionData;
  onNavigateTab: (tab: ActiveTab) => void;
  selectedLanguage: LanguageCode;
  onResetAnalysis: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  currentInscription,
  onNavigateTab,
  selectedLanguage,
  onResetAnalysis
}) => {
  const [showSideBySide, setShowSideBySide] = useState<boolean>(false);
  const langObj = languageOptions.find((l) => l.code === selectedLanguage) || languageOptions[0];
  const translatedText =
    currentInscription.translations[selectedLanguage] || currentInscription.translations.en;

  const handleDownloadPDF = () => {
    generateResearchReportPDF(currentInscription, selectedLanguage);
  };

  const handleDownloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            project: 'Tamil Epigraph AI',
            inscription: currentInscription,
            selectedLanguage,
            translation: translatedText,
            timestamp: new Date().toISOString()
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentInscription.id}-epigraph-data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="view-content-container">
      {/* 5-Step Stepper Header */}
      <Stepper currentTab="results" onNavigateTab={onNavigateTab} />

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Award size={20} color="#2563eb" />
              Comprehensive Results & Confidence Analysis
            </h3>
            <p className="card-subtitle">
              Archaeological verification report, character-wise confidence score distribution, and multilingual translations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowSideBySide(!showSideBySide)}>
              <Eye size={15} />
              <span>{showSideBySide ? 'Standard View' : 'Original vs AI Comparison'}</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDownloadPDF}>
              <Download size={15} />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Inscription vs AI Recognition (when toggled or visible) */}
        {showSideBySide && (
          <div
            style={{
              background: '#f8fafc',
              border: '2px dashed #93c5fd',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}
          >
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '14px' }}>
              Side-by-Side: Original Inscription vs AI Reconstruction
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  ORIGINAL STONE EPIGRAPH
                </div>
                <img
                  src={currentInscription.imageSrc}
                  alt="Original Epigraph"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                    RECONSTRUCTED UNICODE TAMIL
                  </div>
                  <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-tamil)', color: '#0f172a', lineHeight: 1.6, background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    {currentInscription.modernTamilText}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', margin: '8px 0 4px 0' }}>
                    ENGLISH TRANSLATION
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#1e293b', fontStyle: 'italic', background: '#f0fdf4', padding: '10px 12px', borderRadius: '8px', border: '1px solid #86efac' }}>
                    "{currentInscription.translations.en}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Split matching Panel 7 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left Column: Final Output Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} color="#2563eb" />
                Final Synthesized Output
              </div>

              {/* Ancient Text Block */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Ancient Script ({currentInscription.scriptType})
                </div>
                <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-tamil), serif', color: '#1e3a8a', marginTop: '2px' }}>
                  {currentInscription.ancientScriptText}
                </div>
              </div>

              {/* Modern Tamil Block */}
              <div style={{ marginBottom: '14px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Modern Tamil Unicode
                  </div>
                  <button
                    onClick={() => speakText(currentInscription.modernTamilText, 'ta-IN')}
                    style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    <Volume2 size={13} />
                    <span>Pronounce</span>
                  </button>
                </div>
                <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-tamil)', color: '#0f172a', marginTop: '2px', lineHeight: 1.6 }}>
                  {currentInscription.modernTamilText}
                </div>
              </div>

              {/* Translation Block */}
              <div style={{ paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#166534', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  {langObj.name} Translation
                </div>
                <div style={{ fontSize: '1.05rem', color: '#0f172a', marginTop: '4px', lineHeight: 1.5, fontWeight: 500 }}>
                  "{translatedText}"
                </div>
              </div>
            </div>

            {/* Historical Metadata Pill */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '14px 18px', fontSize: '0.82rem', color: '#92400e' }}>
              <strong>Epigraph Context:</strong> {currentInscription.historicalContext}
            </div>
          </div>

          {/* Right Column: Circular Accuracy Gauges & Character Bar Chart matching Panel 7 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 2 Circular Radial Gauges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Recognition Accuracy Gauge */}
              <div className="radial-gauge-card">
                <div
                  className="radial-gauge-circle"
                  style={{
                    background: `conic-gradient(#10b981 ${currentInscription.recognitionAccuracy * 3.6}deg, #e2e8f0 0deg)`
                  }}
                >
                  <div
                    style={{
                      width: '94px',
                      height: '94px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span className="radial-gauge-value" style={{ color: '#065f46' }}>
                      {currentInscription.recognitionAccuracy}%
                    </span>
                  </div>
                </div>
                <div className="radial-gauge-label">Recognition Accuracy</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>Character-level match</div>
              </div>

              {/* Translation Confidence Gauge */}
              <div className="radial-gauge-card">
                <div
                  className="radial-gauge-circle"
                  style={{
                    background: `conic-gradient(#2563eb ${currentInscription.translationConfidence * 3.6}deg, #e2e8f0 0deg)`
                  }}
                >
                  <div
                    style={{
                      width: '94px',
                      height: '94px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span className="radial-gauge-value" style={{ color: '#1e3a8a' }}>
                      {currentInscription.translationConfidence}%
                    </span>
                  </div>
                </div>
                <div className="radial-gauge-label">Translation Confidence</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>Semantic score</div>
              </div>
            </div>

            {/* Character-wise Confidence Bar Chart matching Panel 7 */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                  Character-wise Confidence Distribution
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Position Index (1-{currentInscription.characters.length})</span>
              </div>

              <div className="confidence-bar-chart">
                {currentInscription.characters.slice(0, 10).map((char, idx) => {
                  const heightPercent = Math.max(30, char.confidence);
                  return (
                    <div key={char.id} className="chart-bar-column" title={`${char.modernTamil}: ${char.confidence}%`}>
                      <div
                        className="chart-bar-fill"
                        style={{
                          height: `${heightPercent}%`,
                          background: char.confidence > 93 ? 'linear-gradient(180deg, #34d399 0%, #059669 100%)' : 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)'
                        }}
                      />
                      <span className="chart-bar-label">{char.modernTamil}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons matching Panel 7 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary" onClick={handleDownloadPDF}>
              <Download size={16} />
              <span>Download PDF Result</span>
            </button>
            <button className="btn btn-secondary" onClick={handleDownloadJSON}>
              <FileText size={16} />
              <span>Export JSON Metadata</span>
            </button>
          </div>

          <button className="btn btn-secondary btn-lg" onClick={onResetAnalysis}>
            <RotateCcw size={16} />
            <span>Analyze Another Image</span>
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="view-nav-footer">
        <button className="btn btn-secondary" onClick={() => onNavigateTab('translation')}>
          Back to Translation
        </button>
        <button className="btn btn-primary" onClick={() => onNavigateTab('history')}>
          <span>View Scan History & Archive</span>
        </button>
      </div>
    </div>
  );
};
