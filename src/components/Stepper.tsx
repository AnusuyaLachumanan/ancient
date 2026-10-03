import React from 'react';
import { Check } from 'lucide-react';
import { ActiveTab } from '../types';

interface StepperProps {
  currentTab: ActiveTab;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const Stepper: React.FC<StepperProps> = ({ currentTab, onNavigateTab }) => {
  const steps: Array<{ id: ActiveTab; label: string; stepNumber: number }> = [
    { id: 'upload', label: 'Upload', stepNumber: 1 },
    { id: 'preprocessing', label: 'Preprocessing', stepNumber: 2 },
    { id: 'recognition', label: 'Recognition', stepNumber: 3 },
    { id: 'translation', label: 'Translation', stepNumber: 4 },
    { id: 'results', label: 'Results', stepNumber: 5 },
  ];

  const getStepIndex = (tab: ActiveTab): number => {
    switch (tab) {
      case 'upload': return 1;
      case 'preprocessing': return 2;
      case 'recognition': return 3;
      case 'reconstruction':
      case 'translation': return 4;
      case 'results': return 5;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentTab);

  if (currentIndex === 0) return null;

  return (
    <div className="stepper-container">
      <div className="stepper-wrapper">
        {steps.map((step, idx) => {
          const isCompleted = currentIndex > step.stepNumber;
          const isActive = currentIndex === step.stepNumber;

          return (
            <React.Fragment key={step.id}>
              <button
                className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => onNavigateTab(step.id)}
              >
                <div className="step-circle">
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : step.stepNumber}
                </div>
                <span className="step-label">{step.label}</span>
              </button>

              {idx < steps.length - 1 && (
                <div className={`step-divider-line ${currentIndex > step.stepNumber ? 'active' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
