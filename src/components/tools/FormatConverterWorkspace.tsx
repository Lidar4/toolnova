import React, { useState } from 'react';
import { UploadBox } from '../common/UploadBox';
import { Download, RefreshCw, ArrowRightLeft } from 'lucide-react';

interface FormatConverterWorkspaceProps {
  mode: 'jpg-to-png' | 'png-to-jpg';
}

export const FormatConverterWorkspace: React.FC<FormatConverterWorkspaceProps> = ({ mode }) => {
  const isJpgToPng = mode === 'jpg-to-png';
  const targetExt = isJpgToPng ? 'png' : 'jpg';
  const targetMime = isJpgToPng ? 'image/png' : 'image/jpeg';

  const [imageFile, setImageFile] = useState<{ name: string; src: string; size: number } | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [fillColor, setFillColor] = useState<string>('#ffffff');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoadSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1e40af';
      ctx.fillRect(0, 0, 800, 600);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Sample ${isJpgToPng ? 'JPG' : 'PNG'} Asset`, 400, 290);
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#bfdbfe';
      ctx.fillText(`Ready for direct client-side ${targetExt.toUpperCase()} conversion`, 400, 335);

      const src = canvas.toDataURL(isJpgToPng ? 'image/jpeg' : 'image/png');
      setImageFile({
        name: `sample-asset.${isJpgToPng ? 'jpg' : 'png'}`,
        src,
        size: 145000,
      });
      triggerConversion(src);
    }
  };

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageFile({
        name: file.name,
        src,
        size: file.size,
      });
      triggerConversion(src);
    };
    reader.readAsDataURL(file);
  };

  const triggerConversion = (src: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (!isJpgToPng) {
          // Fill background for PNG to JPG transparency
          ctx.fillStyle = fillColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setConvertedUrl(URL.createObjectURL(blob));
              setConvertedSize(blob.size);
            }
            setIsProcessing(false);
          },
          targetMime,
          isJpgToPng ? undefined : 0.92
        );
      }
    };
    img.src = src;
  };

  const handleDownload = () => {
    if (!convertedUrl || !imageFile) return;
    const a = document.createElement('a');
    a.href = convertedUrl;
    const baseName = imageFile.name.substring(0, imageFile.name.lastIndexOf('.')) || imageFile.name;
    a.download = `${baseName}.${targetExt}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      {!imageFile ? (
        <UploadBox
          accept={isJpgToPng ? 'image/jpeg' : 'image/png'}
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          title={`Upload ${isJpgToPng ? 'JPG' : 'PNG'} to Convert to ${targetExt.toUpperCase()}`}
          subtitle="Instant client-side transformation without file upload limits"
          supportedFormatsText={isJpgToPng ? 'Supports .jpg, .jpeg' : 'Supports .png'}
          sampleButtonLabel="Try Sample File"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Conversion:</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {isJpgToPng ? 'JPG → PNG (Lossless)' : 'PNG → JPG (Web Optimized)'}
              </span>
            </div>

            {!isJpgToPng && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Background fill:</span>
                <input
                  type="color"
                  value={fillColor}
                  onChange={(e) => {
                    setFillColor(e.target.value);
                    if (imageFile) triggerConversion(imageFile.src);
                  }}
                  className="w-7 h-7 rounded border border-slate-300 cursor-pointer"
                  title="Color used for transparent regions"
                />
              </div>
            )}
          </div>

          {/* Converted Preview */}
          <div className="p-6 border border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Converted {targetExt.toUpperCase()} Output
            </span>
            {convertedUrl ? (
              <img
                src={convertedUrl}
                alt="Converted result"
                className="max-h-80 object-contain rounded-lg border border-slate-300 bg-white"
              />
            ) : (
              <div className="py-16 text-slate-400 text-sm">Converting file...</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Convert Another
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!convertedUrl || isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all duration-150"
            >
              <Download className="w-4 h-4" />
              <span>Download {targetExt.toUpperCase()}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
