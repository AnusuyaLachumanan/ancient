import React from 'react';
import {
  Activity,
  Layers,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ShieldAlert,
  BarChart3,
  GitBranch
} from 'lucide-react';
import { performanceMetrics } from '../data/mockData';

export const ModelPerformanceView: React.FC = () => {
  return (
    <div className="view-content-container">
      {/* Disclaimer Banner */}
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
          <strong>Academic Research Notice:</strong> All performance metrics, loss curves, and confusion matrix values represent prototype experimental evaluations and baseline benchmark logs for project demonstration.
        </span>
      </div>

      {/* Top 4 Key Evaluation Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Overall Recognition Accuracy', value: `${performanceMetrics.overallAccuracy}%`, sub: 'Character-level top-1' },
          { label: 'Weighted F1-Score', value: `${performanceMetrics.f1Score}%`, sub: 'Precision: 94.8% | Recall: 93.9%' },
          { label: 'Character Error Rate (CER)', value: `${performanceMetrics.characterErrorRate}%`, sub: 'Levenshtein edit distance' },
          { label: 'Translation BLEU Score', value: `${performanceMetrics.bleuScore}`, sub: 'IndicTrans benchmark' },
        ].map((m, idx) => (
          <div key={idx} className="card" style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
              {m.label}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
              {m.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid: Training Curves & Confusion Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Training vs Validation Accuracy Curve */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title" style={{ fontSize: '1rem' }}>
                <TrendingUp size={16} color="#2563eb" />
                Training vs Validation Accuracy (35 Epochs)
              </h3>
              <p className="card-subtitle">Convergence curve over 142,500 training samples</p>
            </div>
          </div>

          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '16px 8px', borderBottom: '2px solid #e2e8f0' }}>
            {performanceMetrics.epochHistory.map((ep, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                  {/* Train Acc Bar */}
                  <div
                    style={{
                      width: '12px',
                      height: `${ep.trainAcc * 1.8}px`,
                      background: '#3b82f6',
                      borderRadius: '3px 3px 0 0'
                    }}
                    title={`Epoch ${ep.epoch} Train Acc: ${ep.trainAcc}%`}
                  />
                  {/* Val Acc Bar */}
                  <div
                    style={{
                      width: '12px',
                      height: `${ep.valAcc * 1.8}px`,
                      background: '#10b981',
                      borderRadius: '3px 3px 0 0'
                    }}
                    title={`Epoch ${ep.epoch} Val Acc: ${ep.valAcc}%`}
                  />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '6px' }}>Ep {ep.epoch}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '12px', fontSize: '0.78rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }} />
              <span>Training Accuracy ({performanceMetrics.epochHistory[6].trainAcc}%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }} />
              <span>Validation Accuracy ({performanceMetrics.epochHistory[6].valAcc}%)</span>
            </div>
          </div>
        </div>

        {/* Script-wise Performance Breakdown */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title" style={{ fontSize: '1rem' }}>
                <BarChart3 size={16} color="#2563eb" />
                Script Class Performance Breakdown
              </h3>
              <p className="card-subtitle">Evaluation across ancient Tamil epigraphic variants</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {performanceMetrics.classAccuracy.map((cls, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ color: '#0f172a' }}>{cls.script} ({cls.samples.toLocaleString()} glyphs)</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{cls.accuracy}% (F1: {cls.f1}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${cls.accuracy}%`,
                      height: '100%',
                      background: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : idx === 2 ? '#8b5cf6' : '#f59e0b',
                      borderRadius: '9999px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', background: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', color: '#64748b' }}>
            High performance on Medieval Tamil due to stroke continuity; Tamil-Brahmi and Vattezhuthu variations handle erosion via CLAHE features.
          </div>
        </div>
      </div>

      {/* Deep Learning Model Architecture Diagram */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Cpu size={18} color="#2563eb" />
              Proposed Deep Learning System Architecture
            </h3>
            <p className="card-subtitle">
              Multi-stage pipeline: ResNet-50 Feature Extractor &rarr; BiLSTM Sequence Encoder &rarr; CTC Decoder &rarr; MarianMT NMT
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {[
            {
              layer: 'Layer 1: Input & Enhancement',
              name: 'CLAHE + Bilateral Filtering',
              params: 'Adaptive kernel 8x8, clip limit 3.0',
              role: 'Surface noise elimination & chisel depth accentuation'
            },
            {
              layer: 'Layer 2: Feature Extraction',
              name: 'ResNet-50 / CNN Backbone',
              params: '23.5M Params, 2048-dim feature maps',
              role: 'Hierarchical edge, stroke curve, and loop representations'
            },
            {
              layer: 'Layer 3: Sequence Modeling',
              name: 'Bidirectional LSTM (2 Layers)',
              params: '512 Hidden Units, Dropout 0.3',
              role: 'Captures spatial left-to-right epigraphic ligature context'
            },
            {
              layer: 'Layer 4: CTC Glyph Transcription',
              name: 'Connectionist Temporal Loss',
              params: 'Vocabulary: 247 Tamil Unicode Glyphs',
              role: 'Aligns variable-width stone character bounds without rigid slicing'
            },
            {
              layer: 'Layer 5: Neural MT',
              name: 'Transformer Seq2Seq',
              params: '6 Encoder / 6 Decoder layers',
              role: 'Translates reconstructed Tamil syntax into target languages'
            }
          ].map((arch, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {arch.layer}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  {arch.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                  {arch.params}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: 1.4 }}>
                  {arch.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
