import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProcessingAnimationModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

interface StepItem {
  id: number;
  label: string;
  sublabel: string;
}

export const ProcessingAnimationModal: React.FC<ProcessingAnimationModalProps> = ({
  isOpen,
  onComplete
}) => {
  const steps: StepItem[] = [
    { id: 1, label: 'Image Acquired & Validated', sublabel: 'Resolution check & metadata indexing' },
    { id: 2, label: 'Bilateral Noise Reduction Applied', sublabel: 'Surface abrasion and grain filtered' },
    { id: 3, label: 'CLAHE Contrast Enhancement', sublabel: 'Histogram equalized across stone contours' },
    { id: 4, label: 'Character Region Segmentation', sublabel: 'Connected component bounding boxes isolated' },
    { id: 5, label: 'Script Detected: Vattezhuthu / Brahmi', sublabel: 'Palaeographic classifier confidence > 94%' },
    { id: 6, label: 'Deep Learning OCR Classification', sublabel: 'CNN-BiLSTM CTC sequence recognition' },
    { id: 7, label: 'Modern Tamil Unicode Reconstruction', sublabel: 'Glyph-to-Unicode phonetic mapping' },
    { id: 8, label: 'ISO-15919 Transliteration Generated', sublabel: 'Standard epigraph romanization' },
    { id: 9, label: 'Neural Multilingual Translation Ready', sublabel: 'Transformer sequence-to-sequence synthesis' },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setIsFinished(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsFinished(true);
          // Trigger confetti on complete
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch (e) {
            // ignore if canvas unavailable
          }
          setTimeout(() => {
            onComplete();
          }, 900);
          return prev;
        }
      });
    }, 420);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round((currentStepIndex / steps.length) * 100));

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog" style={{ maxWidth: '520px', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.2)'
            }}
          >
            {isFinished ? (
              <CheckCircle2 size={32} color="#10b981" />
            ) : (
              <Loader2 size={30} className="animate-spin" />
            )}
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
            {isFinished ? 'Analysis Completed Successfully!' : 'AI Inscription Pipeline Running...'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Processing ancient epigraph through computer vision & deep learning OCR models
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
            <span style={{ color: '#2563eb' }}>Pipeline Progress</span>
            <span style={{ color: '#0f172a' }}>{progressPercent}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
                borderRadius: '9999px',
                transition: 'width 0.35s ease'
              }}
            />
          </div>
        </div>

        {/* Step checklist */}
        <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
          {steps.map((step, idx) => {
            const isDone = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: isCurrent ? '#eff6ff' : isDone ? '#f8fafc' : 'transparent',
                  border: isCurrent ? '1px solid #bfdbfe' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ marginTop: '2px' }}>
                  {isDone ? (
                    <CheckCircle2 size={16} color="#10b981" />
                  ) : isCurrent ? (
                    <Loader2 size={16} color="#2563eb" className="animate-spin" />
                  ) : (
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid #cbd5e1' }} />
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: isCurrent || isDone ? 700 : 500,
                      color: isCurrent ? '#1d4ed8' : isDone ? '#0f172a' : '#94a3b8'
                    }}
                  >
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{step.sublabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
