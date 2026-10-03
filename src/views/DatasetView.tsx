import React from 'react';
import {
  Database,
  Upload,
  Plus,
  FolderOpen,
  PieChart,
  HardDrive,
  FileCheck,
  ShieldAlert
} from 'lucide-react';
import { datasetCorpusStats } from '../data/mockData';

export const DatasetView: React.FC = () => {
  return (
    <div className="view-content-container">
      {/* Disclaimer */}
      <div
        style={{
          background: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          color: '#92400e'
        }}
      >
        <ShieldAlert size={20} color="#d97706" />
        <span>
          <strong>Dataset Metadata Notice:</strong> The numbers below outline the benchmark corpus architecture compiled from Archaeological Survey of India (ASI) & Tamil Nadu State Department of Archaeology epigraph volumes for prototype demonstration.
        </span>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Database size={20} color="#2563eb" />
              Ancient Tamil Inscription Corpus Architecture
            </h3>
            <p className="card-subtitle">
              Comprehensive repository of segmented character crops across stone caverns, temple plinths, and royal copper grants.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm">
              <Upload size={14} />
              <span>Upload Dataset Batch</span>
            </button>
            <button className="btn btn-primary btn-sm">
              <Plus size={14} />
              <span>Add Inscription Specimen</span>
            </button>
          </div>
        </div>

        {/* 4 Script Corpus Distribution Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {datasetCorpusStats.scriptDistribution.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '18px',
                borderTop: `4px solid ${item.color}`
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '6px 0' }}>
                {item.count.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: item.color }}>
                {item.percentage}% of Character Corpus
              </div>
            </div>
          ))}
        </div>

        {/* Physical Medium Distribution & Train/Val/Test Splits */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Medium Distribution */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
              Epigraph Medium Distribution
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {datasetCorpusStats.mediumDistribution.map((m, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    <span>{m.medium}</span>
                    <span style={{ color: '#2563eb' }}>{m.count} records ({m.percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${m.percentage}%`, height: '100%', background: '#2563eb' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Train / Validation / Test Splits */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
              Dataset Partition Splits (142,500 Segmented Characters)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ color: '#059669' }}>Training Set (70%)</span>
                  <span style={{ fontWeight: 700 }}>{datasetCorpusStats.dataSplits.train.toLocaleString()} glyphs</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: '#10b981' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ color: '#2563eb' }}>Validation Set (15%)</span>
                  <span style={{ fontWeight: 700 }}>{datasetCorpusStats.dataSplits.validation.toLocaleString()} glyphs</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '15%', height: '100%', background: '#3b82f6' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ color: '#d97706' }}>Held-out Test Set (15%)</span>
                  <span style={{ fontWeight: 700 }}>{datasetCorpusStats.dataSplits.test.toLocaleString()} glyphs</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '15%', height: '100%', background: '#f59e0b' }} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px', fontSize: '0.75rem', color: '#64748b' }}>
              Augmentations applied: Elastic deformation, Gaussian blur, random perspective tilt, and simulated chisel erosion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
