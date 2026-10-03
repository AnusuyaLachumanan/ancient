import React, { useState } from 'react';
import { ActiveTab, InscriptionData, LanguageCode } from './types';
import { sampleInscriptions } from './data/sampleInscriptions';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProcessingAnimationModal } from './components/ProcessingAnimationModal';

import { DashboardView } from './views/DashboardView';
import { UploadView } from './views/UploadView';
import { PreprocessingView } from './views/PreprocessingView';
import { RecognitionView } from './views/RecognitionView';
import { ReconstructionView } from './views/ReconstructionView';
import { TranslationView } from './views/TranslationView';
import { ResultsView } from './views/ResultsView';
import { HistoryView } from './views/HistoryView';
import { ModelPerformanceView } from './views/ModelPerformanceView';
import { DatasetView } from './views/DatasetView';
import { AboutView } from './views/AboutView';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [currentInscription, setCurrentInscription] = useState<InscriptionData>(sampleInscriptions[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState<boolean>(false);

  // Handle selecting a benchmark sample
  const handleSelectInscription = (inscription: InscriptionData) => {
    setCurrentInscription(inscription);
  };

  // Handle custom image file upload
  const handleCustomImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const customItem: InscriptionData = {
          ...sampleInscriptions[0],
          id: `custom-upload-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          imageSrc: e.target.result as string,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          resolution: 'Custom User Upload',
          imageType: file.type || 'image/jpeg'
        };
        setCurrentInscription(customItem);
        setActiveTab('preprocessing');
      }
    };
    reader.readAsDataURL(file);
  };

  // Start animated AI analysis workflow
  const handleTriggerAnalysis = () => {
    setIsProcessingModalOpen(true);
  };

  const handleProcessingComplete = () => {
    setIsProcessingModalOpen(false);
    setActiveTab('results');
  };

  const handleUpdateTamilText = (newText: string) => {
    setCurrentInscription((prev) => ({
      ...prev,
      modernTamilText: newText
    }));
  };

  const handleResetAnalysis = () => {
    setCurrentInscription(sampleInscriptions[0]);
    setActiveTab('upload');
  };

  return (
    <div className="app-container">
      {/* 1. Dark Heritage Navy Sidebar */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 2. Main Viewport Content Area */}
      <div className="main-wrapper">
        <Header
          activeTab={activeTab}
          isDemoMode={isDemoMode}
          onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
          currentInscription={currentInscription}
        />

        <main>
          {activeTab === 'home' && (
            <DashboardView
              onNavigateTab={setActiveTab}
              onSelectSample={handleSelectInscription}
              currentInscription={currentInscription}
              onStartAnalysis={handleTriggerAnalysis}
            />
          )}

          {activeTab === 'upload' && (
            <UploadView
              currentInscription={currentInscription}
              onSelectInscription={handleSelectInscription}
              onNavigateTab={setActiveTab}
              onCustomImageUpload={handleCustomImageUpload}
            />
          )}

          {activeTab === 'preprocessing' && (
            <PreprocessingView
              currentInscription={currentInscription}
              onNavigateTab={setActiveTab}
              onRunOCR={handleTriggerAnalysis}
            />
          )}

          {activeTab === 'recognition' && (
            <RecognitionView
              currentInscription={currentInscription}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'reconstruction' && (
            <ReconstructionView
              currentInscription={currentInscription}
              onNavigateTab={setActiveTab}
              onUpdateTamilText={handleUpdateTamilText}
            />
          )}

          {activeTab === 'translation' && (
            <TranslationView
              currentInscription={currentInscription}
              onNavigateTab={setActiveTab}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          )}

          {activeTab === 'results' && (
            <ResultsView
              currentInscription={currentInscription}
              onNavigateTab={setActiveTab}
              selectedLanguage={selectedLanguage}
              onResetAnalysis={handleResetAnalysis}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              onNavigateTab={setActiveTab}
              onSelectInscription={handleSelectInscription}
            />
          )}

          {activeTab === 'performance' && <ModelPerformanceView />}

          {activeTab === 'dataset' && <DatasetView />}

          {activeTab === 'about' && <AboutView />}
        </main>
      </div>

      {/* 3. AI Pipeline Processing Animation Modal */}
      <ProcessingAnimationModal
        isOpen={isProcessingModalOpen}
        onComplete={handleProcessingComplete}
      />
    </div>
  );
};
