import React from 'react';
import {
  Info,
  Layers,
  Cpu,
  Globe,
  BookOpen,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Code2,
  Sparkles
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="view-content-container">
      {/* 1. Main Academic Overview Card matching Panel 9 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #0d1e38 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(13, 30, 56, 0.3)',
              flexShrink: 0
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M4 18h16M6 14h12M8 10h8M10 6h4M12 2v4" />
            </svg>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              About This Project
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6, maxWidth: '820px' }}>
              This research initiative aims to preserve and unlock South India's ancient epigraphic heritage by leveraging modern Computer Vision and Deep Learning pipelines to segment, recognize, reconstruct, and translate ancient Tamil stone inscriptions, copper plates, and manuscripts into modern Tamil Unicode and multilingual translations.
            </p>
          </div>
        </div>

        {/* 3 Summary Feature Cards matching Panel 9 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
              <Layers size={18} />
              <span>Ancient Scripts</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#475569' }}>
              Tamil-Brahmi, Vattezhuthu, Grantha, and Medieval Chola Tamil scripts spanning 3rd c. BCE to 14th c. CE.
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c3aed', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
              <Cpu size={18} />
              <span>Technologies</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#475569' }}>
              Deep Learning CNN-BiLSTM-CTC, Vision Transformers, CLAHE Image Enhancement & MarianMT NMT.
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
              <Globe size={18} />
              <span>Research Goal</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#475569' }}>
              Digital Preservation, Epigraph Accessibility, Palaeographical Verification, and Educational Outreach.
            </div>
          </div>
        </div>

        {/* Project Team & Department Info matching Panel 9 */}
        <div
          style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="#2563eb" />
            <div>
              <strong style={{ color: '#1e3a8a', fontSize: '0.88rem' }}>Project Team & Institution:</strong>
              <div style={{ color: '#3b82f6', fontSize: '0.8rem' }}>
                Final Year B.E. / B.Tech Computer Science and Engineering &bull; Major Capstone Project
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>
            Tamil Epigraph AI &bull; Preserving the Past, Empowering the Future
          </div>
        </div>
      </div>

      {/* 2. Detailed Problem Statement & Proposed Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Problem Statement */}
        <div className="card">
          <h3 className="card-title" style={{ color: '#b91c1c', marginBottom: '10px' }}>
            <Info size={18} color="#dc2626" />
            Problem Statement
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '12px' }}>
            Ancient Tamil inscriptions contain invaluable historical records of temple endowments, civil administrations, royal edicts, and classical literature. However, manual epigraph decipherment faces immense hurdles:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>Severe Physical Weathering:</strong> Centuries of rain, wind erosion, flaking, and stone cracks degrade stroke legibility.</li>
            <li><strong>Palaeographical Script Drift:</strong> Tamil characters evolved drastically from Brahmi to Vattezhuthu to Grantha and modern script.</li>
            <li><strong>Scarcity of Epigraphy Experts:</strong> Only a handful of trained epigraphists can decipher weathered 2000-year-old rock beds.</li>
            <li><strong>Linguistic Barriers:</strong> Ancient Tamil syntax is inaccessible to global historians without automated translation.</li>
          </ul>
        </div>

        {/* Proposed Solution */}
        <div className="card">
          <h3 className="card-title" style={{ color: '#15803d', marginBottom: '10px' }}>
            <Sparkles size={18} color="#16a34a" />
            Proposed AI Solution & Novelty
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '12px' }}>
            An integrated deep learning pipeline designed specifically for epigraphic stone textures and ligature-heavy Dravidian scripts:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>Adaptive Preprocessing:</strong> CLAHE + bilateral filtering isolates engraved chisel depths regardless of uneven lighting.</li>
            <li><strong>Multi-Script Classification:</strong> Unified recognition model handling Tamil-Brahmi, Vattezhuthu, and Grantha.</li>
            <li><strong>Unicode Reconstruction:</strong> Maps ancient palaeographic allographs to standard modern Tamil characters.</li>
            <li><strong>Contextual Translation:</strong> Transformer-based Neural Machine Translation generates multilingual scholarly translations.</li>
          </ul>
        </div>
      </div>

      {/* 3. Supported Scripts Deep Overview */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="card-title" style={{ marginBottom: '16px' }}>
          <BookOpen size={18} color="#2563eb" />
          Supported Ancient Scripts & Chronology
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[
            {
              name: 'Tamil-Brahmi',
              tamil: 'தமிழ்-பிராமி',
              era: '3rd c. BCE – 1st c. CE',
              sites: 'Mangulam, Sittanavasal, Keeladi, Pugalur',
              features: 'Straight geometric chisel strokes, distinct pulli marks, retroflex ழ and ள consonants.',
              sample: '𑀓 𑀢 𑀧 𑀫 𑀵 𑀦'
            },
            {
              name: 'Vattezhuthu',
              tamil: 'வட்டெழுத்து',
              era: '4th – 11th c. CE',
              sites: 'Tirupparankunram, Kalugumalai, Chera & Pandya grants',
              features: 'Graceful circular curvilinear strokes, cursive loops, common across southern Tamil Nadu and Kerala.',
              sample: '𑌇 𑌤 𑌪 𑌣 𑌯 𑌮'
            },
            {
              name: 'Grantha Script',
              tamil: 'கிரந்த எழுத்து',
              era: '6th – 14th c. CE',
              sites: 'Pallava rock-cut temples, Mahabalipuram, Kanchipuram',
              features: 'Intricate conjunct ligatures designed for Sanskrit-Tamil bilingual royal eulogies (Prashastis).',
              sample: '𑌶𑍍𑌰𑍀 𑌸𑍍𑌵 𑌧 𑌨'
            },
            {
              name: 'Medieval Tamil',
              tamil: 'மத்தியகால தமிழ்',
              era: '9th – 13th c. CE',
              sites: 'Thanjavur Big Temple, Gangaikonda Cholapuram, Chidambaram',
              features: 'Transitional Chola script with modern-like consonant loops and flourishing vowel kombu markers.',
              sample: 'க த ப ம ழ ன'
            }
          ].map((script, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-tamil), serif', color: '#1e3a8a', marginBottom: '4px' }}>
                  {script.sample}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{script.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600 }}>{script.tamil}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', margin: '4px 0 8px 0', fontWeight: 600 }}>
                  Era: {script.era}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4 }}>
                  {script.features}
                </p>
              </div>
              <div style={{ marginTop: '12px', fontSize: '0.7rem', color: '#94a3b8', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                Sites: {script.sites}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
