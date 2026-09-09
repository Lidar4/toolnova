import React, { useState, useEffect, useRef } from 'react';
import { UploadBox } from '../common/UploadBox';
import { Download, RefreshCw, CheckCircle2, ArrowDownRight, Sliders, ShieldCheck } from 'lucide-react';

export const ImageCompressorWorkspace: React.FC = () => {
  const [imageFile, setImageFile] = useState<{ name: string; size: number; src: string } | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedResult, setCompressedResult] = useState<{
    blobUrl: string;
    size: number;
    reductionPercent: number;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'comparison' | 'compressed'>('comparison');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate clean sample graphic when "Try sample" is clicked
  const handleLoadSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw modern geometric high-res photo-like scene
      const grad = ctx.createLinearGradient(0, 0, 1200, 800);
      grad.addColorStop(0, '#1e3a8a');
      grad.addColorStop(0.5, '#3b82f6');
      grad.addColorStop(1, '#06b6d4');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 800);

      // Add architectural geometry
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(600, 400, 260, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ToolNova High-Res Photography Sample', 600, 390);

      ctx.font = '22px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText('1200 × 800px • Test client-side compression instantly', 600, 435);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
      // Approx 380 KB
      setImageFile({
        name: 'toolnova-sample-scenery.jpg',
        size: 420500,
        src: dataUrl,
      });
    }
  };

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageFile({
        name: file.name,
        size: file.size,
        src: e.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  // Perform compression whenever image or quality changes
  useEffect(() => {
    if (!imageFile) {
      setCompressedResult(null);
      return;
    }

    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const qRatio = quality / 100;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const compressedSize = blob.size;
              const reduction = Math.max(0, Math.round(((imageFile.size - compressedSize) / imageFile.size) * 100));
              setCompressedResult({
                blobUrl: url,
                size: compressedSize,
                reductionPercent: reduction,
              });
            }
            setIsProcessing(false);
          },
          'image/jpeg',
          qRatio
        );
      } else {
        setIsProcessing(false);
      }
    };
    img.src = imageFile.src;
  }, [imageFile, quality]);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    return (kb / 1024).toFixed(2) + ' MB';
  };

  const handleDownload = () => {
    if (!compressedResult || !imageFile) return;
    const a = document.createElement('a');
    a.href = compressedResult.blobUrl;
    const extIdx = imageFile.name.lastIndexOf('.');
    const baseName = extIdx !== -1 ? imageFile.name.substring(0, extIdx) : imageFile.name;
    a.download = `${baseName}-compressed.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (compressedResult) {
      URL.revokeObjectURL(compressedResult.blobUrl);
    }
    setImageFile(null);
    setCompressedResult(null);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      <canvas ref={canvasRef} className="hidden" />

      {!imageFile ? (
        <UploadBox
          accept="image/jpeg,image/png,image/webp"
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          title="Upload image to compress"
          subtitle="Drag and drop or browse from your device. Processing stays in your browser."
          supportedFormatsText="JPEG, PNG, WEBP (Max 30MB)"
          sampleButtonLabel="Try Sample Photo"
        />
      ) : (
        <div className="space-y-6">
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality:</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="20"
                  max="95"
                  step="5"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-32 sm:w-44 accent-blue-600 cursor-pointer"
                  aria-label="Compression quality slider"
                />
                <span className="text-sm font-bold text-slate-900 w-10">{quality}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('comparison')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  viewMode === 'comparison'
                    ? 'bg-white text-blue-700 border-blue-300 shadow-xs'
                    : 'text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Split Comparison
              </button>
              <button
                type="button"
                onClick={() => setViewMode('compressed')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  viewMode === 'compressed'
                    ? 'bg-white text-blue-700 border-blue-300 shadow-xs'
                    : 'text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Compressed Only
              </button>
            </div>
          </div>

          {/* Size & Savings Statistics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Original Size</span>
              <p className="text-base font-bold text-slate-800">{formatBytes(imageFile.size)}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Compressed Size</span>
              <p className="text-base font-bold text-blue-700">
                {isProcessing ? 'Calculating...' : compressedResult ? formatBytes(compressedResult.size) : '...'}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Size Reduction</span>
              <p className="text-base font-bold text-emerald-600 flex items-center">
                <ArrowDownRight className="w-4 h-4 mr-0.5" />
                {compressedResult ? `${compressedResult.reductionPercent}% saved` : '0%'}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Privacy Guarantee</span>
              <p className="text-xs font-medium text-slate-600 flex items-center gap-1 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% On-Device</span>
              </p>
            </div>
          </div>

          {/* Image Preview Canvas */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900/5">
            {viewMode === 'comparison' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                <div className="p-4 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-500 mb-2 uppercase">Original</span>
                  <div className="w-full max-h-80 flex items-center justify-center overflow-hidden rounded-lg bg-white border border-slate-200">
                    <img
                      src={imageFile.src}
                      alt="Original source"
                      className="max-h-80 object-contain w-auto"
                    />
                  </div>
                </div>

                <div className="p-4 flex flex-col items-center">
                  <span className="text-xs font-bold text-blue-600 mb-2 uppercase">Compressed Result</span>
                  <div className="w-full max-h-80 flex items-center justify-center overflow-hidden rounded-lg bg-white border border-slate-200">
                    {compressedResult ? (
                      <img
                        src={compressedResult.blobUrl}
                        alt="Compressed outcome"
                        className="max-h-80 object-contain w-auto"
                      />
                    ) : (
                      <div className="py-20 text-slate-400 text-sm">Processing image...</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center">
                {compressedResult ? (
                  <img
                    src={compressedResult.blobUrl}
                    alt="Compressed output"
                    className="max-h-96 object-contain rounded-lg border border-slate-200 bg-white"
                  />
                ) : (
                  <div className="py-20 text-slate-400 text-sm">Processing image...</div>
                )}
              </div>
            )}
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              id="compressor-reset-btn"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Compress Another Image
            </button>

            <button
              type="button"
              id="compressor-download-btn"
              onClick={handleDownload}
              disabled={!compressedResult || isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all duration-150"
            >
              <Download className="w-4 h-4" />
              <span>Download Compressed Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
