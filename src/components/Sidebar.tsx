import React from 'react';
import {
  Home,
  UploadCloud,
  Layers,
  ScanText,
  Type,
  Languages,
  Award,
  History,
  Activity,
  Database,
  Info,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const mainNavItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'upload', label: 'Upload', icon: <UploadCloud size={18} /> },
    { id: 'history', label: 'History', icon: <History size={18} /> },
    { id: 'about', label: 'About', icon: <Info size={18} /> },
  ];

  const pipelineNavItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'preprocessing', label: 'Preprocessing', icon: <Layers size={18} /> },
    { id: 'recognition', label: 'OCR Recognition', icon: <ScanText size={18} /> },
    { id: 'reconstruction', label: 'Tamil Reconstruction', icon: <Type size={18} /> },
    { id: 'translation', label: 'Translation', icon: <Languages size={18} /> },
    { id: 'results', label: 'Results & Confidence', icon: <Award size={18} /> },
  ];

  const researchNavItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'performance', label: 'Model Performance', icon: <Activity size={18} /> },
    { id: 'dataset', label: 'Dataset Corpus', icon: <Database size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <div>
        {/* Sidebar Header Brand */}
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M4 18h16M6 14h12M8 10h8M10 6h4M12 2v4" />
            </svg>
          </div>
          <div className="sidebar-brand-text">
            <h1>Tamil Epigraph AI</h1>
            <p>Digital Epigraphy</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="sidebar-nav-section-title">Main Portal</div>
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="sidebar-nav-section-title">AI Pipeline</div>
          {pipelineNavItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="sidebar-nav-section-title">Research & Analysis</div>
          {researchNavItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* South Indian Temple Gopuram Line Art & Motto */}
      <div className="sidebar-footer">
        <svg
          className="gopuram-artwork"
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Kalasam Finials */}
          <circle cx="80" cy="12" r="3" fill="#60a5fa" />
          <path d="M80 15v8M74 23h12M76 20h8" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          {/* Tier 1 (Apex) */}
          <path d="M72 23L70 34h20l-2-11H72z" fill="rgba(147, 197, 253, 0.15)" stroke="#93c5fd" strokeWidth="1.2" />
          <path d="M76 34v-5h8v5" stroke="#60a5fa" strokeWidth="1" />
          {/* Tier 2 */}
          <path d="M65 34L61 50h38l-4-16H65z" fill="rgba(147, 197, 253, 0.1)" stroke="#93c5fd" strokeWidth="1.2" />
          <path d="M70 50v-8h6v8M84 50v-8h6v8" stroke="#60a5fa" strokeWidth="1" />
          {/* Tier 3 */}
          <path d="M55 50L49 70h62l-6-20H55z" fill="rgba(147, 197, 253, 0.12)" stroke="#93c5fd" strokeWidth="1.2" />
          <path d="M60 70v-10h8v10M76 70v-10h8v10M92 70v-10h8v10" stroke="#60a5fa" strokeWidth="1" />
          {/* Tier 4 */}
          <path d="M43 70L36 96h88l-7-26H43z" fill="rgba(147, 197, 253, 0.1)" stroke="#93c5fd" strokeWidth="1.2" />
          <path d="M48 96v-14h10v14M68 96v-14h10v14M88 96v-14h10v14M102 96v-14h10v14" stroke="#60a5fa" strokeWidth="1" />
          {/* Tier 5 (Base Gopuram) */}
          <path d="M30 96L20 128h120l-10-32H30z" fill="rgba(147, 197, 253, 0.15)" stroke="#93c5fd" strokeWidth="1.5" />
          <path d="M38 128v-18h12v18M62 128v-18h12v18M86 128v-18h12v18M110 128v-18h12v18" stroke="#93c5fd" strokeWidth="1.2" />
          {/* Main Royal Gateway Arch */}
          <path d="M64 165v-26a16 16 0 0132 0v26" fill="rgba(37, 99, 235, 0.3)" stroke="#60a5fa" strokeWidth="1.8" />
          {/* Base Foundation Plinth */}
          <rect x="12" y="128" width="136" height="37" rx="2" fill="rgba(15, 23, 42, 0.4)" stroke="#93c5fd" strokeWidth="1.5" />
          <line x1="8" y1="165" x2="152" y2="165" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="sidebar-footer-motto">Preserving Our Ancient Heritage</div>
        <div className="sidebar-footer-sub">Deep Learning Epigraphy</div>
      </div>
    </aside>
  );
};
