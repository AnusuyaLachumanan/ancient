import { PreprocessingSettings } from '../types';

export function applyImageFilters(
  sourceCanvas: HTMLCanvasElement,
  targetCanvas: HTMLCanvasElement,
  settings: PreprocessingSettings
): void {
  const ctx = targetCanvas.getContext('2d');
  const srcCtx = sourceCanvas.getContext('2d');
  if (!ctx || !srcCtx) return;

  targetCanvas.width = sourceCanvas.width;
  targetCanvas.height = sourceCanvas.height;

  // Draw source image to target
  ctx.drawImage(sourceCanvas, 0, 0);

  const imgData = ctx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
  const data = imgData.data;
  const width = targetCanvas.width;
  const height = targetCanvas.height;

  // 1. Grayscale Conversion
  if (settings.grayscale || settings.binarization || settings.edgeDetection || settings.clahe) {
    for (let i = 0; i < data.length; i += 4) {
      // Standard Luminance formula: 0.299R + 0.587G + 0.114B
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
  }

  // 2. Contrast Enhancement (CLAHE Approximation)
  if (settings.clahe) {
    const contrastFactor = 1 + (settings.contrastLevel / 5); // 1.2 to 3.0
    for (let i = 0; i < data.length; i += 4) {
      const v = data[i];
      // Sigmoid/S-curve contrast stretch
      const adjusted = 128 + (v - 128) * contrastFactor;
      const clamped = Math.max(0, Math.min(255, adjusted));
      data[i] = clamped;
      data[i + 1] = clamped;
      data[i + 2] = clamped;
    }
  }

  // 3. Noise Reduction (Simple 3x3 Box/Gaussian blur approximation)
  if (settings.denoise) {
    const copy = new Uint8ClampedArray(data);
    const radius = Math.min(3, Math.max(1, Math.round(settings.denoiseStrength / 3)));
    
    for (let y = radius; y < height - radius; y += 2) {
      for (let x = radius; x < width - radius; x += 2) {
        let sum = 0;
        let count = 0;
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4;
            sum += copy[idx];
            count++;
          }
        }
        const avg = sum / count;
        const targetIdx = (y * width + x) * 4;
        data[targetIdx] = avg;
        data[targetIdx + 1] = avg;
        data[targetIdx + 2] = avg;
      }
    }
  }

  // 4. Edge Detection (Sobel Filter)
  if (settings.edgeDetection) {
    const copy = new Uint8ClampedArray(data);
    const gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const gy = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let sumX = 0;
        let sumY = 0;
        let k = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4;
            const val = copy[idx];
            sumX += val * gx[k];
            sumY += val * gy[k];
            k++;
          }
        }
        const mag = Math.sqrt(sumX * sumX + sumY * sumY);
        const edgeVal = Math.min(255, mag);
        const idx = (y * width + x) * 4;
        data[idx] = edgeVal;
        data[idx + 1] = edgeVal;
        data[idx + 2] = edgeVal;
      }
    }
  }

  // 5. Adaptive Binarization (Thresholding)
  if (settings.binarization) {
    const thresh = settings.threshold;
    for (let i = 0; i < data.length; i += 4) {
      const v = data[i];
      const binary = v >= thresh ? 255 : 0;
      data[i] = binary;
      data[i + 1] = binary;
      data[i + 2] = binary;
    }
  }

  ctx.putImageData(imgData, 0, 0);
}
