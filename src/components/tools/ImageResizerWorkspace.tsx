import React, { useState, useEffect } from 'react';
import { UploadBox } from '../common/UploadBox';
import { Download, RefreshCw, Lock, Unlock, Scaling, CheckCircle2 } from 'lucide-react';

export const ImageResizerWorkspace: React.FC = () => {
  const [imageFile, setImageFile] = useState<{
    name: string;
    originalWidth: number;
    originalHeight: number;
    src: string;
  } | null>(null);

  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1080);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [resizedBlobUrl, setResizedBlobUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoadSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 1600, 900);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1600, 900);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 52px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Sample 1600 × 900 Graphic', 800, 440);

      ctx.font = '24px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Ready for dimension resizing test', 800, 490);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setImageFile({
        name: 'sample-wide-banner.jpg',
        originalWidth: 1600,
        originalHeight: 900,
        src: dataUrl,
      });
      setTargetWidth(1080);
      setTargetHeight(Math.round((1080 * 900) / 1600));
    }
  };

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImageFile({
          name: file.name,
          originalWidth: img.naturalWidth || img.width,
          originalHeight: img.naturalHeight || img.height,
          src,
        });
        setTargetWidth(img.naturalWidth || img.width);
        setTargetHeight(img.naturalHeight || img.height);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockAspectRatio && imageFile && imageFile.originalWidth > 0) {
      const ratio = imageFile.originalHeight / imageFile.originalWidth;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockAspectRatio && imageFile && imageFile.originalHeight > 0) {
      const ratio = imageFile.originalWidth / imageFile.originalHeight;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const handleApplyPreset = (w: number, h: number) => {
    setTargetWidth(w);
    setTargetHeight(h);
  };

  const handleScalePercent = (percent: number) => {
    if (!imageFile) return;
    const factor = percent / 100;
    setTargetWidth(Math.round(imageFile.originalWidth * factor));
    setTargetHeight(Math.round(imageFile.originalHeight * factor));
  };

  // Generate resized preview
  useEffect(() => {
    if (!imageFile || targetWidth <= 0 || targetHeight <= 0) return;

    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setResizedBlobUrl(url);
            }
            setIsProcessing(false);
          },
          'image/png'
        );
      } else {
        setIsProcessing(false);
      }
    };
    img.src = imageFile.src;
  }, [imageFile, targetWidth, targetHeight]);

  const handleDownload = () => {
    if (!resizedBlobUrl || !imageFile) return;
    const a = document.createElement('a');
    a.href = resizedBlobUrl;
    const extIdx = imageFile.name.lastIndexOf('.');
    const baseName = extIdx !== -1 ? imageFile.name.substring(0, extIdx) : imageFile.name;
    a.download = `${baseName}-${targetWidth}x${targetHeight}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      {!imageFile ? (
        <UploadBox
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          title="Upload image to resize"
          subtitle="Set custom dimensions or pick standard social media aspect ratios"
          sampleButtonLabel="Try Sample Banner"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Target Dimensions
              </span>
              <span className="text-xs text-slate-500">
                Original: {imageFile.originalWidth} × {imageFile.originalHeight} px
              </span>
            </div>

            {/* Inputs & Lock */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">W:</span>
                <input
                  type="number"
                  min="10"
                  max="8000"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-24 px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <span className="text-xs text-slate-400">px</span>
              </div>

              <button
                type="button"
                onClick={() => setLockAspectRatio(!lockAspectRatio)}
                className={`p-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  lockAspectRatio
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
                }`}
                title={lockAspectRatio ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
              >
                {lockAspectRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{lockAspectRatio ? 'Ratio Locked' : 'Free Ratio'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">H:</span>
                <input
                  type="number"
                  min="10"
                  max="8000"
                  value={targetHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-24 px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <span className="text-xs text-slate-400">px</span>
              </div>

              {/* Percentage scaling chips */}
              <div className="flex items-center gap-1 ml-auto">
                {[25, 50, 75, 200].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleScalePercent(pct)}
                    className="px-2 py-1 text-[11px] font-semibold bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Presets */}
            <div className="pt-2 border-t border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                Presets:
              </span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                {[
                  { label: 'Instagram Square (1080×1080)', w: 1080, h: 1080 },
                  { label: 'Instagram Story (1080×1920)', w: 1080, h: 1920 },
                  { label: 'YouTube (1280×720)', w: 1280, h: 720 },
                  { label: 'Full HD (1920×1080)', w: 1920, h: 1080 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleApplyPreset(preset.w, preset.h)}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-md transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Container */}
          <div className="p-6 border border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Canvas Output Preview ({targetWidth} × {targetHeight} px)
            </span>
            {resizedBlobUrl ? (
              <img
                src={resizedBlobUrl}
                alt="Resized preview"
                className="max-h-80 object-contain rounded-lg border border-slate-300 bg-white shadow-xs"
              />
            ) : (
              <div className="py-16 text-slate-400 text-sm">Rendering dimensions...</div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Resize Another
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!resizedBlobUrl || isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all duration-150"
            >
              <Download className="w-4 h-4" />
              <span>Download Resized PNG</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
