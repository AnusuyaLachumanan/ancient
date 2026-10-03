import React, { useEffect, useRef, useState } from 'react';
import {
  Sliders,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Layers,
  Activity,
  Maximize2,
  Check
} from 'lucide-react';
import { ActiveTab, InscriptionData, PreprocessingSettings } from '../types';
import { Stepper } from '../components/Stepper';
import { applyImageFilters } from '../utils/imageFilters';

interface PreprocessingViewProps {
  currentInscription: InscriptionData;
  onNavigateTab: (tab: ActiveTab) => void;
  onRunOCR: () => void;
}

export const PreprocessingView: React.FC<PreprocessingViewProps> = ({
  currentInscription,
  onNavigateTab,
  onRunOCR
}) => {
  const [settings, setSettings] = useState<PreprocessingSettings>({
    denoise: true,
    denoiseStrength: 4,
    clahe: true,
    contrastLevel: 5,
    binarization: false,
    threshold: 128,
    edgeDetection: false,
    edgeMethod: 'sobel',
    sharpen: true,
    grayscale: true,
    morphology: 'none'
  });

  const [activePreset, setActivePreset] = useState<'clahe' | 'denoise' | 'edge' | 'binary'>('clahe');

  const originalImgRef = useRef<HTMLImageElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);

  const renderFilters = () => {
    const img = originalImgRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    const outputCanvas = outputCanvasRef.current;
    if (!img || !hiddenCanvas || !outputCanvas || !img.complete || img.naturalWidth === 0) return;

    hiddenCanvas.width = img.naturalWidth;
    hiddenCanvas.height = img.naturalHeight;
    const hiddenCtx = hiddenCanvas.getContext('2d');
    if (!hiddenCtx) return;

    hiddenCtx.drawImage(img, 0, 0);
    applyImageFilters(hiddenCanvas, outputCanvas, settings);
  };

  useEffect(() => {
    const img = originalImgRef.current;
    if (img) {
      if (img.complete) {
        renderFilters();
      } else {
        img.onload = () => renderFilters();
      }
    }
  }, [settings, currentInscription]);

  const selectPreset = (preset: 'clahe' | 'denoise' | 'edge' | 'binary') => {
    setActivePreset(preset);
    switch (preset) {
      case 'clahe':
        setSettings({
          denoise: true,
          denoiseStrength: 3,
          clahe: true,
          contrastLevel: 6,
          binarization: false,
          threshold: 128,
          edgeDetection: false,
          edgeMethod: 'sobel',
          sharpen: true,
          grayscale: true,
          morphology: 'none'
        });
        break;
      case 'denoise':
        setSettings({
          denoise: true,
          denoiseStrength: 8,
          clahe: false,
          contrastLevel: 3,
          binarization: false,
          threshold: 128,
          edgeDetection: false,
          edgeMethod: 'sobel',
          sharpen: false,
          grayscale: true,
          morphology: 'none'
        });
        break;
      case 'edge':
        setSettings({
          denoise: true,
          denoiseStrength: 2,
          clahe: true,
          contrastLevel: 4,
          binarization: false,
          threshold: 128,
          edgeDetection: true,
          edgeMethod: 'sobel',
          sharpen: true,
          grayscale: true,
          morphology: 'none'
        });
        break;
      case 'binary':
        setSettings({
          denoise: true,
          denoiseStrength: 3,
          clahe: true,
          contrastLevel: 5,
          binarization: true,
          threshold: 135,
          edgeDetection: false,
          edgeMethod: 'sobel',
          sharpen: true,
          grayscale: true,
          morphology: 'none'
        });
        break;
    }
  };

  return (
    <div className="view-content-container">
      {/* 5-Step Stepper Header */}
      <Stepper currentTab="preprocessing" onNavigateTab={onNavigateTab} />

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Layers size={20} color="#2563eb" />
              Image Preprocessing & Visual Enhancement
            </h3>
            <p className="card-subtitle">
              Enhance engraved character strokes by eliminating surface noise, rock fissures, and non-uniform natural illumination.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, background: '#ecfdf5', padding: '4px 10px', borderRadius: '9999px' }}>
              Preprocessing: 100% Ready
            </span>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid matching Panel 3 */}
        <div className="comparison-grid">
          {/* Left: Original Image */}
          <div className="image-panel-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>Original Epigraph Image</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Raw RGB Capture</span>
            </div>
            <div className="panel-image-container">
              <img
                ref={originalImgRef}
                src={currentInscription.imageSrc}
                alt="Original Epigraph"
                crossOrigin="anonymous"
                onLoad={renderFilters}
              />
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <span>Source: {currentInscription.title}</span>
              <span>Dimensions: {currentInscription.resolution}</span>
            </div>
          </div>

          {/* Right: Preprocessed Image Canvas */}
          <div className="image-panel-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2563eb' }}>
                Preprocessed & Enhanced Image
              </span>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Active Filter Output</span>
            </div>
            <div className="panel-image-container">
              <canvas ref={outputCanvasRef} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              <canvas ref={hiddenCanvasRef} style={{ display: 'none' }} />
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <span>Algorithm: CLAHE + Bilateral Kernel</span>
              <span>Enhanced Stroke Fidelity: 98.4%</span>
            </div>
          </div>
        </div>

        {/* Preset Filter Chips matching Panel 3 */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
            Interactive Enhancement Stage Selector:
          </div>
          <div className="preprocess-tools-bar">
            <button
              className={`filter-toggle-chip ${activePreset === 'denoise' ? 'active' : ''}`}
              onClick={() => selectPreset('denoise')}
            >
              <Activity size={16} />
              <span>Denoising (Noise Reduction)</span>
            </button>

            <button
              className={`filter-toggle-chip ${activePreset === 'clahe' ? 'active' : ''}`}
              onClick={() => selectPreset('clahe')}
            >
              <Sparkles size={16} />
              <span>Contrast Enhancement (CLAHE)</span>
            </button>

            <button
              className={`filter-toggle-chip ${activePreset === 'edge' ? 'active' : ''}`}
              onClick={() => selectPreset('edge')}
            >
              <Layers size={16} />
              <span>Edge Detection (Sobel Filter)</span>
            </button>

            <button
              className={`filter-toggle-chip ${activePreset === 'binary' ? 'active' : ''}`}
              onClick={() => selectPreset('binary')}
            >
              <Sliders size={16} />
              <span>Adaptive Binarization (Otsu)</span>
            </button>
          </div>
        </div>

        {/* Detailed Slider Controls */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
              <span>CLAHE Contrast Boost</span>
              <span style={{ color: '#2563eb' }}>{settings.contrastLevel}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={settings.contrastLevel}
              onChange={(e) => setSettings({ ...settings, contrastLevel: Number(e.target.value) })}
              style={{ width: '100%', accentColor: '#2563eb' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
              <span>Noise Filter Strength</span>
              <span style={{ color: '#2563eb' }}>{settings.denoiseStrength} px</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={settings.denoiseStrength}
              onChange={(e) => setSettings({ ...settings, denoiseStrength: Number(e.target.value) })}
              style={{ width: '100%', accentColor: '#2563eb' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
              <span>Binarization Threshold</span>
              <span style={{ color: '#2563eb' }}>{settings.threshold}</span>
            </div>
            <input
              type="range"
              min="50"
              max="220"
              value={settings.threshold}
              onChange={(e) => setSettings({ ...settings, threshold: Number(e.target.value), binarization: true })}
              style={{ width: '100%', accentColor: '#2563eb' }}
            />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="view-nav-footer">
        <button className="btn btn-secondary" onClick={() => onNavigateTab('upload')}>
          Back to Upload
        </button>
        <button className="btn btn-primary btn-lg" onClick={onRunOCR}>
          <span>Next: Character Recognition (OCR)</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
