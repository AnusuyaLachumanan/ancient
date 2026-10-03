import React from 'react';
import {
  UploadCloud,
  Play,
  Layers,
  Languages,
  Award,
  ArrowRight,
  Database,
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { ActiveTab, InscriptionData } from '../types';

interface DashboardViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectSample: (inscription: InscriptionData) => void;
  currentInscription: InscriptionData;
  onStartAnalysis: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onStartAnalysis,
}) => {
  return (
    <div className="view-content-container">
      {/* 1. Hero Banner matching Panel 1 of Screenshot */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge-tag">
            <Sparkles size={13} />
            AI-Powered Digital Epigraphy
          </div>
          <h2 className="hero-title">
            Ancient Tamil Inscription<br />
            Recognition &<br />
            Multilingual Translation
          </h2>
          <p className="hero-description">
            Upload an inscription image and convert ancient Tamil characters (Brahmi, Vattezhuthu, Grantha) into modern Tamil Unicode and translations using deep learning computer vision.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onNavigateTab('upload')}>
              <UploadCloud size={18} />
              <span>Upload Image</span>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onStartAnalysis}>
              <Play size={18} fill="#0f172a" />
              <span>View Demo</span>
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img src="/samples/hero_inscription.jpg" alt="Ancient Tamil Inscription" />
          <div className="hero-image-overlay" />
        </div>
      </div>

      {/* 2. Feature 3-Cards Row matching Panel 1 */}
      <div className="features-grid">
        {/* Feature 1: Recognition */}
        <div className="feature-card">
          <div className="feature-icon-box green">
            <Layers size={24} />
          </div>
          <div>
            <h4 className="feature-card-title">Script Recognition</h4>
            <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginBottom: '4px' }}>
              Brahmi / Vattezhuthu / Grantha
            </div>
            <p className="feature-card-desc">
              Multi-scale CNN & Vision Transformer models trained on segmented South Indian stone and copper plate epigraphs.
            </p>
          </div>
        </div>

        {/* Feature 2: Translation */}
        <div className="feature-card">
          <div className="feature-icon-box purple">
            <Languages size={24} />
          </div>
          <div>
            <h4 className="feature-card-title">Multilingual Translation</h4>
            <div style={{ fontSize: '0.78rem', color: '#7c3aed', fontWeight: 700, marginBottom: '4px' }}>
              Tamil → English, Hindi & More
            </div>
            <p className="feature-card-desc">
              Contextual Neural Machine Translation and ISO-15919 epigraphic transliteration for research accessibility.
            </p>
          </div>
        </div>

        {/* Feature 3: Confidence */}
        <div className="feature-card">
          <div className="feature-icon-box amber">
            <Award size={24} />
          </div>
          <div>
            <h4 className="feature-card-title">Confidence & Validation</h4>
            <div style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 700, marginBottom: '4px' }}>
              Character-level Accuracy
            </div>
            <p className="feature-card-desc">
              Probabilistic softmax confidence for every character glyph, enabling archaeological review and manual corrections.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Visual AI Pipeline Architecture Workflow */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Cpu size={18} color="#2563eb" />
              Proposed AI Epigraphy Processing Pipeline
            </h3>
            <p className="card-subtitle">
              End-to-end research architecture from weathered stone image to multilingual translation
            </p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => onNavigateTab('about')}>
            View Technical Specs
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '12px',
            alignItems: 'center',
            padding: '16px 0'
          }}
        >
          {[
            { step: '01', title: 'Image Upload', desc: 'Raw Epigraph', color: '#3b82f6' },
            { step: '02', title: 'Preprocessing', desc: 'CLAHE & Denoise', color: '#0ea5e9' },
            { step: '03', title: 'Segmentation', desc: 'Bounding Boxes', color: '#10b981' },
            { step: '04', title: 'OCR Model', desc: 'CNN + BiLSTM', color: '#8b5cf6' },
            { step: '05', title: 'Tamil Unicode', desc: 'Reconstruction', color: '#ec4899' },
            { step: '06', title: 'Transliteration', desc: 'ISO-15919', color: '#f59e0b' },
            { step: '07', title: 'NMT Translation', desc: '8+ Languages', color: '#10b981' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '14px 10px',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: item.color,
                  letterSpacing: '0.05em',
                  marginBottom: '4px'
                }}
              >
                STAGE {item.step}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Quick Prototype Statistics & Research Note */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Inscriptions Catalogued', value: '1,248+', sub: 'Epigraphica Indica Corpus' },
          { label: 'Segmented Glyphs', value: '142,500+', sub: 'Brahmi / Vattezhuthu' },
          { label: 'Recognition Accuracy', value: '94.8%', sub: 'Validation Benchmark' },
          { label: 'Languages Supported', value: '9 Dialects', sub: 'Neural Machine Translation' },
        ].map((stat, idx) => (
          <div key={idx} className="card" style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Research Disclaimer Box */}
      <div
        style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem',
          color: '#1e40af'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} color="#2563eb" />
          <span>
            <strong>Research Prototype Notice:</strong> Model performance metrics and character classifications represent current prototype baseline evaluations for academic demonstration.
          </span>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onNavigateTab('upload')}
          style={{ flexShrink: 0, marginLeft: '16px' }}
        >
          <span>Start Inscription Analysis</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
