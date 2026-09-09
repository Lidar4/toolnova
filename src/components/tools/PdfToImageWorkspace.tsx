import React, { useState } from 'react';
import { UploadBox } from '../common/UploadBox';
import { Download, RefreshCw, FileImage, CheckSquare, Square } from 'lucide-react';

export const PdfToImageWorkspace: React.FC = () => {
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [format, setFormat] = useState<'png' | 'jpg'>('png');
  const [dpi, setDpi] = useState<150 | 300>(150);
  const [selectedPages, setSelectedPages] = useState<number[]>([1, 2, 3]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedImages, setExtractedImages] = useState<string[] | null>(null);

  const samplePages = [
    { pageNum: 1, title: 'Document Title & Intro', previewColor: '#e0e7ff' },
    { pageNum: 2, title: 'Key Data Visualizations', previewColor: '#f1f5f9' },
    { pageNum: 3, title: 'Summary & Approvals', previewColor: '#fef3c7' },
  ];

  const handleLoadSample = () => {
    setPdfLoaded(true);
    setExtractedImages(null);
  };

  const togglePage = (p: number) => {
    setSelectedPages((prev) => (prev.includes(p) ? prev.filter((i) => i !== p) : [...prev, p]));
  };

  const handleExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      // Generate clean extracted page image dataUrls
      const urls = selectedPages.map((p) => {
        const canvas = document.createElement('canvas');
        canvas.width = dpi === 300 ? 1600 : 800;
        canvas.height = dpi === 300 ? 2200 : 1100;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#1e3a8a';
          ctx.fillRect(40, 40, canvas.width - 80, 80);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 32px sans-serif';
          ctx.fillText(`PDF Page ${p} - ToolNova Export`, 70, 95);

          ctx.fillStyle = '#334155';
          ctx.font = '24px sans-serif';
          ctx.fillText(`Extracted at ${dpi} DPI (${format.toUpperCase()})`, 70, 180);

          // Simulated document lines
          ctx.fillStyle = '#e2e8f0';
          for (let y = 240; y < canvas.height - 100; y += 40) {
            ctx.fillRect(70, y, canvas.width - 140, 16);
          }
        }
        return canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg');
      });
      setExtractedImages(urls);
      setIsExtracting(false);
    }, 800);
  };

  const handleDownloadSingle = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `pdf-page-${selectedPages[index]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      {!pdfLoaded ? (
        <UploadBox
          accept="application/pdf"
          onFileSelect={() => handleLoadSample()}
          onLoadSample={handleLoadSample}
          title="Upload PDF to extract pages as images"
          subtitle="Convert all or selected pages into crystal-clear PNG or JPG images"
          supportedFormatsText="Supports PDF files (Up to 50MB)"
          sampleButtonLabel="Try Sample Document (3 Pages)"
        />
      ) : (
        <div className="space-y-6">
          {/* Settings Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Format:</span>
              <div className="flex items-center gap-1">
                {(['png', 'jpg'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormat(fmt)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border transition-colors ${
                      format === fmt
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Resolution:</span>
              <div className="flex items-center gap-1">
                {([150, 300] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDpi(d)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border transition-colors ${
                      dpi === d
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d} DPI {d === 300 ? '(Print)' : '(Standard)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Page Selector Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase">
                Select Pages to Convert ({selectedPages.length} of 3 selected)
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelectedPages(selectedPages.length === 3 ? [] : [1, 2, 3])
                }
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                {selectedPages.length === 3 ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {samplePages.map((page) => {
                const isChecked = selectedPages.includes(page.pageNum);
                return (
                  <div
                    key={page.pageNum}
                    onClick={() => togglePage(page.pageNum)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">Page {page.pageNum}</span>
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <div
                      className="h-36 rounded-lg border border-slate-200 flex items-center justify-center p-2 text-center"
                      style={{ backgroundColor: page.previewColor }}
                    >
                      <span className="text-xs font-medium text-slate-600">{page.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extracted Image Previews if ready */}
          {extractedImages && (
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                Extracted Images ({extractedImages.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {extractedImages.map((url, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg border border-emerald-200 text-center space-y-2">
                    <img src={url} alt={`Page ${selectedPages[i]}`} className="h-36 object-contain mx-auto border" />
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(url, i)}
                      className="w-full py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Page {selectedPages[i]}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setPdfLoaded(false)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Choose Another PDF
            </button>

            <button
              type="button"
              id="pdf-to-img-extract-btn"
              onClick={handleExtract}
              disabled={isExtracting || selectedPages.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all"
            >
              <FileImage className="w-4 h-4" />
              <span>{isExtracting ? 'Extracting Pages...' : `Convert ${selectedPages.length} Pages`}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
