import React, { useState } from 'react';
import {
  History as HistoryIcon,
  Eye,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Languages,
  X,
  Sparkles
} from 'lucide-react';
import { ActiveTab, HistoryItem, InscriptionData } from '../types';
import { initialHistoryItems } from '../data/mockData';
import { sampleInscriptions } from '../data/sampleInscriptions';
import { generateResearchReportPDF } from '../utils/pdfExport';

interface HistoryViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectInscription: (inscription: InscriptionData) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  onNavigateTab,
  onSelectInscription
}) => {
  const [historyList, setHistoryList] = useState<HistoryItem[]>(initialHistoryItems);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScriptFilter, setSelectedScriptFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previewItem, setPreviewItem] = useState<HistoryItem | null>(null);

  const filteredItems = historyList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translatedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetLanguage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScript =
      selectedScriptFilter === 'all' || item.scriptType === selectedScriptFilter;
    return matchesSearch && matchesScript;
  });

  const handleOpenInscription = (item: HistoryItem) => {
    const found = sampleInscriptions.find((s) => s.id === item.inscriptionId);
    if (found) {
      onSelectInscription(found);
      onNavigateTab('results');
    }
  };

  const handleDownloadItemReport = (item: HistoryItem) => {
    const found = sampleInscriptions.find((s) => s.id === item.inscriptionId);
    if (found) {
      generateResearchReportPDF(found, item.targetLanguageCode);
    }
  };

  return (
    <div className="view-content-container">
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <HistoryIcon size={20} color="#2563eb" />
              Epigraph Analysis History & Archive
            </h3>
            <p className="card-subtitle">
              Browse previously processed stone slabs, copper plates, and multilingual translations.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search scans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '7px 12px 7px 32px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <select
              value={selectedScriptFilter}
              onChange={(e) => setSelectedScriptFilter(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                backgroundColor: '#ffffff'
              }}
            >
              <option value="all">All Scripts</option>
              <option value="Tamil-Brahmi">Tamil-Brahmi</option>
              <option value="Vattezhuthu">Vattezhuthu</option>
              <option value="Grantha">Grantha</option>
              <option value="Medieval Tamil">Medieval Tamil</option>
            </select>
          </div>
        </div>

        {/* Data Table matching Panel 8 */}
        <div className="data-table-container">
          <table className="epigraph-data-table">
            <thead>
              <tr>
                <th style={{ width: '5%' }}>No.</th>
                <th style={{ width: '12%' }}>Image</th>
                <th style={{ width: '22%' }}>Date & Time</th>
                <th style={{ width: '18%' }}>Script Type</th>
                <th style={{ width: '15%' }}>Language</th>
                <th style={{ width: '13%' }}>Status</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                    No matching inscription scans found in archive.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                    <td>
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="table-thumb-img"
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.date}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.time}</div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#1d4ed8',
                          background: '#eff6ff',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}
                      >
                        {item.scriptType}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.targetLanguage}</td>
                    <td>
                      <span className="status-badge-pill completed">
                        <CheckCircle2 size={12} />
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setPreviewItem(item)}
                          title="View Quick Preview"
                          style={{ padding: '5px 8px' }}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleOpenInscription(item)}
                          title="Open in Pipeline"
                          style={{ padding: '5px 8px' }}
                        >
                          <Sparkles size={14} />
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleDownloadItemReport(item)}
                          title="Download PDF"
                          style={{ padding: '5px 8px' }}
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Panel 8 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px'
          }}
        >
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: currentPage === page ? '#2563eb' : '#ffffff',
                color: currentPage === page ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {page}
            </button>
          ))}
          <button
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Quick Preview Modal */}
      {previewItem && (
        <div className="modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="card-header" style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', margin: 0 }}>
              <div className="card-title">
                <Eye size={18} color="#2563eb" />
                {previewItem.title}
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <img
                src={previewItem.imageSrc}
                alt={previewItem.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
              />

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Modern Tamil Unicode
                </div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-tamil)', color: '#0f172a', marginTop: '2px' }}>
                  {previewItem.modernTamil}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                  Translation ({previewItem.targetLanguage})
                </div>
                <div style={{ fontSize: '1rem', color: '#1e293b', fontStyle: 'italic', marginTop: '2px' }}>
                  "{previewItem.translatedText}"
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setPreviewItem(null)}>
                Close
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => handleOpenInscription(previewItem)}>
                Open Full Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
