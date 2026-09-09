import React, { useState, useEffect } from 'react';
import { UploadBox } from '../common/UploadBox';
import { Download, RefreshCw, Scissors, Sparkles, Layers, Sliders } from 'lucide-react';

export const BackgroundRemoverWorkspace: React.FC = () => {
  const [imageFile, setImageFile] = useState<{ name: string; src: string } | null>(null);
  const [bgMode, setBgMode] = useState<'transparent' | 'white' | 'dark' | 'blue'>('transparent');
  const [tolerance, setTolerance] = useState<number>(35);
  const [feather, setFeather] = useState<number>(2);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleLoadSample = () => {
    // Generate sample product / subject on clean studio background
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Light background
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, 800, 800);

      // Draw stylized product (e.g., sleek camera/lens or sphere)
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(400, 400, 220, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(400, 400, 160, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ToolNova Cutout', 400, 390);
      ctx.font = '20px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('Sample Subject Demo', 400, 430);

      const src = canvas.toDataURL('image/png');
      setImageFile({
        name: 'sample-product-cutout.png',
        src,
      });
      processImageCutout(src, bgMode, tolerance);
    }
  };

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageFile({ name: file.name, src });
      processImageCutout(src, bgMode, tolerance);
    };
    reader.readAsDataURL(file);
  };

  const processImageCutout = (src: string, mode: string, tol: number) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw original
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample corner color as background reference
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      const threshold = tol * 2.5;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean color distance from background
        const dist = Math.sqrt(
          Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
        );

        if (dist < threshold) {
          if (mode === 'transparent') {
            data[i + 3] = 0; // Transparent
          } else if (mode === 'white') {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
          } else if (mode === 'dark') {
            data[i] = 15;
            data[i + 1] = 23;
            data[i + 2] = 42;
            data[i + 3] = 255;
          } else if (mode === 'blue') {
            data[i] = 30;
            data[i + 1] = 64;
            data[i + 2] = 175;
            data[i + 3] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setResultUrl(URL.createObjectURL(blob));
        }
        setIsProcessing(false);
      }, 'image/png');
    };
    img.src = src;
  };

  useEffect(() => {
    if (imageFile) {
      processImageCutout(imageFile.src, bgMode, tolerance);
    }
  }, [bgMode, tolerance]);

  const handleDownload = () => {
    if (!resultUrl || !imageFile) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    const baseName = imageFile.name.substring(0, imageFile.name.lastIndexOf('.')) || imageFile.name;
    a.download = `${baseName}-cutout.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      {!imageFile ? (
        <UploadBox
          accept="image/*"
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          title="Upload image to remove background"
          subtitle="Isolate portrait, product, or logo subject with edge detection"
          sampleButtonLabel="Try Sample Product"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Backdrop:</span>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'transparent', label: 'Transparent' },
                  { id: 'white', label: 'Solid White' },
                  { id: 'dark', label: 'Studio Dark' },
                  { id: 'blue', label: 'Royal Blue' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBgMode(item.id as any)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                      bgMode === item.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Tolerance:</span>
              <input
                type="range"
                min="10"
                max="80"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-28 accent-blue-600"
              />
              <span className="text-xs font-bold text-slate-700 w-8">{tolerance}%</span>
            </div>
          </div>

          {/* Canvas Preview with checkered transparent background option */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 uppercase mb-2">Original</span>
              <img src={imageFile.src} alt="Original input" className="max-h-72 object-contain rounded-lg bg-white" />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
              <span className="text-xs font-bold text-blue-600 uppercase mb-2">Isolated Cutout Result</span>
              <div
                className="w-full h-72 flex items-center justify-center rounded-lg overflow-hidden border border-slate-300"
                style={{
                  backgroundImage:
                    bgMode === 'transparent'
                      ? 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)'
                      : 'none',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                }}
              >
                {resultUrl ? (
                  <img src={resultUrl} alt="Cutout" className="max-h-72 object-contain" />
                ) : (
                  <span className="text-slate-400 text-sm">Isolating edges...</span>
                )}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Remove Another
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!resultUrl || isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all duration-150"
            >
              <Download className="w-4 h-4" />
              <span>Download Cutout PNG</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
