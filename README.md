# Tamil Epigraph AI (Ancient Tamil Inscription Recognition, Transliteration & Translation)

An AI/Deep Learning-assisted research prototype for recognizing, reconstructing, transliterating, and translating ancient Tamil stone inscriptions, copper plates, and manuscripts into modern Tamil Unicode and multilingual translations.

---

## 🏛️ Project Objective

Ancient Tamil inscriptions (Tamil-Brahmi, Vattezhuthu, Grantha, and Medieval Tamil) contain valuable cultural, historical, and linguistic records. Due to centuries of weathering, erosion, and script evolution, manual decipherment is challenging.

This system provides an end-to-end computer vision and deep learning pipeline to:
1. **Acquire & Preprocess Inscriptions**: Enhance weathered stone chisel strokes using CLAHE, Bilateral Denoising, and Adaptive Thresholding.
2. **Segment Character Regions**: Detect individual character bounding boxes and regions of interest.
3. **Recognize Ancient Glyphs**: Classify characters across Tamil-Brahmi (3rd c. BCE), Vattezhuthu (4th–11th c. CE), Grantha (6th–14th c. CE), and Medieval Chola Tamil (9th–13th c. CE).
4. **Reconstruct Tamil Unicode**: Map recognized ancient palaeographic glyphs into standardized Modern Tamil Unicode text.
5. **Epigraphical Transliteration**: Generate ISO-15919 and Academic Roman transliterations preserving phonetics and diacritics.
6. **Multilingual Translation**: Neural Machine Translation into English, Hindi, Malayalam, Telugu, Kannada, French, German, Spanish, and Sanskrit.
7. **Verification & Research Confidence**: Softmax character-level confidence scores, side-by-side comparisons, and downloadable academic PDF reports.

---

## 🚀 Key Modules & UI Features

- **Dashboard / Home**: Hero banner with high-resolution epigraphs, feature highlights, and a 7-stage interactive pipeline flow.
- **Image Upload**: Drag & drop zone with support for JPG, PNG, BMP, TIFF, plus benchmark sample epigraphs (Mangulam Cave, Tirupparankunram, Velvikudi Copper Plates, Thanjavur Big Temple).
- **Image Preprocessing**: Side-by-side comparison of original vs preprocessed images with real-time canvas filters (CLAHE, Denoising, Sobel Edge Detection, Otsu Binarization).
- **Ancient Character Recognition (OCR)**: Bounding box overlays, character confidence status indicators (Correct, Uncertain, Noise), and deep glyph inspection modals.
- **Tamil Reconstruction**: Modern Tamil Unicode editor, confidence gauges, and Character Mapping Table (Ancient Glyph ➔ Modern Tamil).
- **Multilingual Translation**: Neural Machine Translation with speech synthesis and transliteration scheme selectors.
- **Results & Confidence**: Circular accuracy gauges, character-wise confidence distribution bar charts, and PDF report export.
- **Scan History**: Searchable archive of processed epigraphs with timestamps, target languages, and quick preview modals.
- **Model Performance**: Loss and accuracy curves, confusion matrix, CER metrics, and 5-layer deep learning architecture diagram.
- **Dataset Corpus**: Distribution metrics of 142,500 segmented glyphs across stone caverns, temple plinths, and copper grants.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Modern CSS Design System (South Indian Heritage Navy `#0d1e38` + Clean Research UI)
- **Icons**: Lucide React
- **Image Processing**: HTML5 Canvas Filters (CLAHE approximation, Sobel, Otsu)
- **Audio**: Web Speech API for Tamil and multilingual pronunciation
- **PDF Generation**: jsPDF

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/AnusuyaLachumanan/ancient.git
cd ancient

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📜 Academic Research Disclaimer
*This system is developed as a Final Year Computer Science Engineering Capstone Project. All accuracy scores and classifications represent prototype evaluations.*
