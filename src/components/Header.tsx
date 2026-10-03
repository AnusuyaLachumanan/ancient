import React from 'react';
import { Sparkles, User, HelpCircle, FileText } from 'lucide-react';
import { ActiveTab, InscriptionData } from '../types';
import { generateResearchReportPDF } from '../utils/pdfExport';

interface HeaderProps {
  activeTab: ActiveTab;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  currentInscription: InscriptionData;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  isDemoMode,
  onToggleDemoMode,
  currentInscription
}) => {
  const getTabTitle = (tab: ActiveTab): { title: string; subtitle: string } => {
    switch (tab) {
      case 'home':
        return { title: 'Ancient Tamil Inscription Recognition & Multilingual Translation', subtitle: 'Overview & Digital Heritage Dashboard' };
      case 'upload':
        return { title: 'Upload Inscription Image', subtitle: 'Step 1: High-Resolution Epigraph Image Acquisition' };
      case 'preprocessing':
        return { title: 'Image Preprocessing & Enhancement', subtitle: 'Step 2: Bilateral Denoising, CLAHE & Adaptive Binarization' };
      case 'recognition':
        return { title: 'Ancient Character Recognition (OCR)', subtitle: 'Step 3: Character Region Segmentation & Deep Glyph Classification' };
      case 'reconstruction':
        return { title: 'Tamil Text Reconstruction', subtitle: 'Step 4: Ancient Glyph to Modern Unicode Tamil Mapping' };
      case 'translation':
        return { title: 'Multilingual Translation & Transliteration', subtitle: 'Step 5: Neural Machine Translation & ISO-15919 Romanization' };
      case 'results':
        return { title: 'Results & Confidence Analysis', subtitle: 'Comprehensive Archaeological Summary & Confidence Gauges' };
      case 'history':
        return { title: 'Epigraph Scan History', subtitle: 'Previously Processed Inscriptions & Translation Archive' };
      case 'performance':
        return { title: 'Deep Learning Model Performance', subtitle: 'Training Loss/Accuracy, Confusion Matrix & CER Metrics' };
      case 'dataset':
        return { title: 'Ancient Tamil Inscription Dataset Corpus', subtitle: 'Distribution of Brahmi, Vattezhuthu, Grantha & Medieval Inscriptions' };
      case 'about':
        return { title: 'About the Project & Research Pipeline', subtitle: 'Final Year CSE Project Documentation & Architecture' };
      default:
        return { title: 'Tamil Inscription AI', subtitle: 'Digital Epigraphy Platform' };
    }
  };

  const { title } = getTabTitle(activeTab);

  return (
    <header className="top-header">
      <div className="header-left">
        <div className="header-title">
          <span>{title}</span>
          <span className="header-badge">
            <Sparkles size={12} />
            AI Research Prototype
          </span>
        </div>
      </div>

      <div className="header-right">
        {/* Quick PDF export if viewing results */}
        {activeTab === 'results' && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => generateResearchReportPDF(currentInscription)}
            title="Download Academic Research Report PDF"
          >
            <FileText size={15} />
            <span>Export Report</span>
          </button>
        )}

        {/* Demo Mode Toggle */}
        <div
          className="demo-mode-pill"
          title="Toggle Prototype Demonstration Mode"
          onClick={onToggleDemoMode}
          style={{ cursor: 'pointer' }}
        >
          <div className="pulse-dot" />
          <span>{isDemoMode ? 'Demo Mode: Active' : 'Live Mode'}</span>
        </div>

        {/* User Profile Avatar */}
        <button className="user-avatar-btn" title="Final Year CSE Research Scholar">
          <User size={18} />
        </button>
      </div>
    </header>
  );
};
