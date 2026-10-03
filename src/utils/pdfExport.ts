import { jsPDF } from 'jspdf';
import { InscriptionData, LanguageCode } from '../types';
import { languageOptions } from '../data/mockData';

export function generateResearchReportPDF(
  inscription: InscriptionData,
  selectedLang: LanguageCode = 'en'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const langObj = languageOptions.find(l => l.code === selectedLang) || languageOptions[0];
  const translatedText = inscription.translations[selectedLang] || inscription.translations.en;

  // Primary Header Bar
  doc.setFillColor(14, 30, 56); // Deep Heritage Navy
  doc.rect(0, 0, 210, 32, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('TAMIL EPIGRAPH AI — DIGITAL EPIGRAPHY REPORT', 14, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 220, 255);
  doc.text('AI-Based Ancient Tamil Inscription Recognition, Transliteration & Translation System', 14, 21);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')} | Reference: ${inscription.museumRef || 'ASI-EP-DEMO'}`, 14, 27);

  let y = 42;

  // Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 38, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('INSCRIPTION METADATA', 20, y + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Title / Site: ${inscription.title}`, 20, y + 15);
  doc.text(`Detected Script: ${inscription.scriptType} (Confidence: ${inscription.scriptConfidence}%)`, 20, y + 21);
  doc.text(`Period & Dynasty: ${inscription.period} — ${inscription.dynasty}`, 20, y + 27);
  doc.text(`Location / Provenance: ${inscription.location}`, 20, y + 33);

  // Stats on Right of Metadata Box
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(14, 30, 56);
  doc.text(`Recognition Accuracy: ${inscription.recognitionAccuracy}%`, 120, y + 21);
  doc.text(`Translation Confidence: ${inscription.translationConfidence}%`, 120, y + 27);
  doc.text(`Segmented Characters: ${inscription.characters.length} glyphs`, 120, y + 33);

  y += 46;

  // Reconstructed Text Section
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(14, y, 182, 30, 3, 3, 'FD');

  doc.setTextColor(30, 58, 138);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('RECONSTRUCTED TAMIL UNICODE TEXT', 20, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  const splitModern = doc.splitTextToSize(inscription.modernTamilText, 170);
  doc.text(splitModern, 20, y + 16);

  y += 38;

  // Transliteration Section
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, 182, 28, 3, 3, 'FD');

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('ISO-15919 / ROMAN TRANSLITERATION', 20, y + 7);

  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  const splitTranslit = doc.splitTextToSize(inscription.isoTransliteration, 170);
  doc.text(splitTranslit, 20, y + 15);

  y += 36;

  // Translation Section
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(14, y, 182, 34, 3, 3, 'FD');

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`NEURAL MACHINE TRANSLATION (${langObj.name.toUpperCase()})`, 20, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  const splitTrans = doc.splitTextToSize(`"${translatedText}"`, 170);
  doc.text(splitTrans, 20, y + 16);

  y += 42;

  // Archaeological & Historical Context
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(14, y, 182, 30, 3, 3, 'FD');

  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('HISTORICAL CONTEXT & ARCHAEOLOGICAL NOTES', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(69, 26, 3);
  const splitHistory = doc.splitTextToSize(inscription.historicalContext + ' ' + inscription.archaeologicalNotes, 170);
  doc.text(splitHistory, 20, y + 14);

  // Footer / Academic Disclaimer
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Final Year Computer Science Engineering Project | Digital Epigraphy & AI Inscription Pipeline | Prototype Demonstration',
    105,
    285,
    { align: 'center' }
  );

  doc.save(`${inscription.id}-research-report.pdf`);
}
