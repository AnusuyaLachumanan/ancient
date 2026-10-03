import React, { useRef } from 'react';
import { UploadCloud, Image, ArrowRight, CheckCircle2, FileCheck, RefreshCw } from 'lucide-react';
import { ActiveTab, InscriptionData } from '../types';
import { sampleInscriptions } from '../data/sampleInscriptions';
import { Stepper } from '../components/Stepper';

interface UploadViewProps {
  currentInscription: InscriptionData;
  onSelectInscription: (inscription: InscriptionData) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onCustomImageUpload: (file: File) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  currentInscription,
  onSelectInscription,
  onNavigateTab,
  onCustomImageUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onCustomImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCustomImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="view-content-container">
      {/* 5-Step Stepper Header */}
      <Stepper currentTab="upload" onNavigateTab={onNavigateTab} />

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <UploadCloud size={20} color="#2563eb" />
              Upload Inscription Image
            </h3>
            <p className="card-subtitle">
              Upload a high-resolution photograph or rubbings of an ancient Tamil stone inscription, copper plate, or manuscript.
            </p>
          </div>
        </div>

        {/* Drag & Drop Upload Zone matching Panel 2 */}
        <div
          className="upload-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/bmp,image/tiff"
            style={{ display: 'none' }}
          />

          <div className="upload-icon-circle">
            <UploadCloud size={34} />
          </div>

          <div className="upload-main-text">Drag & Drop your image here</div>
          <div className="upload-sub-text">or click to browse from your device</div>
          <div className="upload-specs-pill">
            Supported formats: JPG, PNG, BMP, TIFF &bull; Max file size: 10MB
          </div>
        </div>

        {/* Sample Images Gallery matching Panel 2 */}
        <div className="samples-section-title">
          <Image size={17} color="#2563eb" />
          <span>Or select from Benchmark Research Epigraphs:</span>
        </div>

        <div className="sample-grid">
          {sampleInscriptions.map((sample) => {
            const isSelected = currentInscription.id === sample.id;

            return (
              <div
                key={sample.id}
                className={`sample-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectInscription(sample)}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={sample.imageSrc}
                    alt={sample.title}
                    className="sample-thumbnail"
                  />
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: '#2563eb',
                        color: '#ffffff',
                        borderRadius: '50%',
                        padding: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                      }}
                    >
                      <CheckCircle2 size={14} />
                    </div>
                  )}
                </div>

                <div className="sample-info">
                  <div className="sample-name" title={sample.title}>
                    {sample.title}
                  </div>
                  <div className="sample-script-tag">
                    {sample.scriptType} &bull; {sample.period}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Image Information Card */}
      <div className="card" style={{ background: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={currentInscription.imageSrc}
              alt="Selected Epigraph"
              style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
            />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                {currentInscription.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px', display: 'flex', gap: '12px' }}>
                <span><strong>Format:</strong> {currentInscription.imageType}</span>
                <span><strong>Resolution:</strong> {currentInscription.resolution}</span>
                <span><strong>Size:</strong> {currentInscription.fileSize}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => fileInputRef.current?.click()}>
              <RefreshCw size={14} />
              <span>Change Image</span>
            </button>
            <button className="btn btn-primary" onClick={() => onNavigateTab('preprocessing')}>
              <span>Proceed to Preprocessing</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="view-nav-footer">
        <button className="btn btn-secondary" onClick={() => onNavigateTab('home')}>
          Back to Dashboard
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => onNavigateTab('preprocessing')}>
          <span>Next: Preprocessing</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
