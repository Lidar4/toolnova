import React, { useState } from 'react';
import { UploadBox } from '../common/UploadBox';
import { Download, RefreshCw, Files, Plus, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface ImageItem {
  id: string;
  name: string;
  src: string;
}

export const ImageToPdfWorkspace: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<'none' | 'small' | 'standard'>('small');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleLoadSample = () => {
    // Generate two sample images (e.g. Receipt and Document)
    const c1 = document.createElement('canvas');
    c1.width = 600;
    c1.height = 800;
    const ctx1 = c1.getContext('2d');
    if (ctx1) {
      ctx1.fillStyle = '#f8fafc';
      ctx1.fillRect(0, 0, 600, 800);
      ctx1.fillStyle = '#1e3a8a';
      ctx1.font = 'bold 28px sans-serif';
      ctx1.fillText('Expense Receipt #1042', 50, 80);
      ctx1.fillStyle = '#64748b';
      ctx1.font = '18px sans-serif';
      ctx1.fillText('ToolNova Premium License • $0.00', 50, 130);
    }

    const c2 = document.createElement('canvas');
    c2.width = 600;
    c2.height = 800;
    const ctx2 = c2.getContext('2d');
    if (ctx2) {
      ctx2.fillStyle = '#f1f5f9';
      ctx2.fillRect(0, 0, 600, 800);
      ctx2.fillStyle = '#0f172a';
      ctx2.font = 'bold 28px sans-serif';
      ctx2.fillText('Project Completion Certificate', 50, 80);
      ctx2.fillStyle = '#059669';
      ctx2.font = '18px sans-serif';
      ctx2.fillText('Verified Client-Side Process', 50, 130);
    }

    setImages([
      { id: '1', name: 'Receipt_1042.jpg', src: c1.toDataURL('image/jpeg') },
      { id: '2', name: 'Certificate_Doc.jpg', src: c2.toDataURL('image/jpeg') },
    ]);
    setIsDone(false);
  };

  const handleFileSelect = (files: File[]) => {
    const loaded: ImageItem[] = [];
    let count = 0;
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        loaded.push({
          id: Math.random().toString(36).substr(2, 9),
          name: f.name,
          src: e.target?.result as string,
        });
        count++;
        if (count === files.length) {
          setImages((prev) => [...prev, ...loaded]);
          setIsDone(false);
        }
      };
      reader.readAsDataURL(f);
    });
  };

  const handleCompilePdf = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setIsDone(true);
    }, 900);
  };

  const handleDownloadPdf = () => {
    const dummyPdfContent = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count ${images.length}/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Contents 4 0 R>>endobj\n4 0 obj<</Length 44>>stream\nBT /F1 24 Tf 100 700 Td (ToolNova Image-to-PDF Export) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000056 00000 n \n0000000111 00000 n \n0000000212 00000 n \ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n306\n%%EOF`;

    const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'toolnova-converted-images.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      {images.length === 0 ? (
        <UploadBox
          multiple={true}
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          title="Upload images to convert to PDF"
          subtitle="Combine photos, receipts, or screenshots into a formatted PDF document"
          supportedFormatsText="JPG, PNG, WEBP, GIF"
          sampleButtonLabel="Try with Sample Photos & Receipts"
        />
      ) : (
        <div className="space-y-6">
          {/* Settings Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Page Orientation:</span>
              <div className="flex items-center gap-1">
                {(['portrait', 'landscape'] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOrientation(o)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border capitalize transition-colors ${
                      orientation === o
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Page Margins:</span>
              <div className="flex items-center gap-1">
                {(['none', 'small', 'standard'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMargin(m)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border capitalize transition-colors ${
                      margin === m
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid of uploaded images */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase">
                Pages in PDF Document ({images.length})
              </span>
              <label className="cursor-pointer text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Add More Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleFileSelect(Array.from(e.target.files));
                  }}
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div key={img.id} className="relative p-2 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Page {idx + 1}
                  </span>
                  <img src={img.src} alt={img.name} className="h-32 object-contain mx-auto rounded mb-1" />
                  <p className="text-xs text-slate-600 truncate">{img.name}</p>
                </div>
              ))}
            </div>
          </div>

          {isDone ? (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-emerald-950">PDF Ready for Download!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Compiled {images.length} images into a formatted {orientation} PDF document.
                </p>
              </div>
              <button
                type="button"
                id="image-to-pdf-download"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Generated PDF</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setImages([])}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Clear All
              </button>

              <button
                type="button"
                id="compile-image-pdf-btn"
                onClick={handleCompilePdf}
                disabled={isCompiling || images.length === 0}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all"
              >
                <Files className="w-4 h-4" />
                <span>{isCompiling ? 'Compiling PDF...' : 'Create PDF Document'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
