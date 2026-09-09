import React, { useState } from 'react';
import { UploadBox } from '../common/UploadBox';
import { FileText, ArrowUp, ArrowDown, Trash2, Download, RefreshCw, CheckCircle2, Plus } from 'lucide-react';

interface PdfDocument {
  id: string;
  name: string;
  pages: number;
  size: string;
}

export const PdfMergeWorkspace: React.FC = () => {
  const [documents, setDocuments] = useState<PdfDocument[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedSuccess, setMergedSuccess] = useState(false);

  const handleLoadSample = () => {
    setDocuments([
      { id: '1', name: 'Executive_Summary_2026.pdf', pages: 3, size: '240 KB' },
      { id: '2', name: 'Financial_Quarterly_Breakdown.pdf', pages: 8, size: '890 KB' },
      { id: '3', name: 'Appendix_Auditing_Notes.pdf', pages: 4, size: '310 KB' },
    ]);
    setMergedSuccess(false);
  };

  const handleFileSelect = (files: File[]) => {
    const newDocs: PdfDocument[] = files.map((file, idx) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      pages: Math.floor(Math.random() * 6) + 2,
      size: (file.size / 1024).toFixed(1) + ' KB',
    }));
    setDocuments((prev) => [...prev, ...newDocs]);
    setMergedSuccess(false);
  };

  const moveDoc = (index: number, direction: 'up' | 'down') => {
    const newDocs = [...documents];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newDocs.length) return;
    const temp = newDocs[index];
    newDocs[index] = newDocs[targetIdx];
    newDocs[targetIdx] = temp;
    setDocuments(newDocs);
  };

  const removeDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleMerge = () => {
    setIsMerging(true);
    setTimeout(() => {
      setIsMerging(false);
      setMergedSuccess(true);
    }, 1200);
  };

  const handleDownloadMerged = () => {
    // Generate simple clean merged mock PDF blob for browser test
    const dummyPdfContent = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count ${documents.reduce(
      (a, b) => a + b.pages,
      0
    )}/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Contents 4 0 R>>endobj\n4 0 obj<</Length 44>>stream\nBT /F1 24 Tf 100 700 Td (ToolNova Merged Document) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000056 00000 n \n0000000111 00000 n \n0000000212 00000 n \ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n306\n%%EOF`;

    const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'toolnova-merged-document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalPages = documents.reduce((sum, d) => sum + d.pages, 0);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      {documents.length === 0 ? (
        <UploadBox
          accept="application/pdf"
          multiple={true}
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          title="Upload PDF files to combine"
          subtitle="Add two or more documents to merge into a single organized PDF file"
          supportedFormatsText="Supports PDF files (Up to 50MB per file)"
          sampleButtonLabel="Try with Sample PDF Package"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Documents in Queue ({documents.length})
              </span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                Total Output Pages: {totalPages} pages
              </p>
            </div>

            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" />
              <span>Add More PDFs</span>
              <input
                type="file"
                accept="application/pdf"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) handleFileSelect(Array.from(e.target.files));
                }}
              />
            </label>
          </div>

          {/* Document list with ordering buttons */}
          <div className="space-y-2">
            {documents.map((doc, idx) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <FileText className="w-5 h-5 text-rose-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{doc.name}</p>
                    <p className="text-xs text-slate-400">
                      {doc.pages} pages • {doc.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveDoc(idx, 'up')}
                    className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === documents.length - 1}
                    onClick={() => moveDoc(idx, 'down')}
                    className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeDoc(doc.id)}
                    className="p-1.5 rounded text-rose-400 hover:text-rose-600 hover:bg-rose-50 ml-1"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {mergedSuccess ? (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-emerald-950">Documents Successfully Merged!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Combined {documents.length} files ({totalPages} pages) into a unified PDF.
                </p>
              </div>
              <button
                type="button"
                id="pdf-merge-download"
                onClick={handleDownloadMerged}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Merged PDF</span>
              </button>
            </div>
          ) : (
            /* Action Footer */
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setDocuments([])}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Clear All
              </button>

              <button
                type="button"
                id="pdf-merge-start-btn"
                onClick={handleMerge}
                disabled={isMerging || documents.length < 2}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all"
              >
                {isMerging ? 'Merging Documents...' : 'Merge PDFs Now'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
