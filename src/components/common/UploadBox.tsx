import React, { useRef, useState } from 'react';
import { UploadCloud, FileUp, Sparkles } from 'lucide-react';

interface UploadBoxProps {
  accept?: string;
  multiple?: boolean;
  onFileSelect: (files: File[]) => void;
  onLoadSample?: () => void;
  title?: string;
  subtitle?: string;
  supportedFormatsText?: string;
  sampleButtonLabel?: string;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  accept = 'image/*',
  multiple = false,
  onFileSelect,
  onLoadSample,
  title = 'Drag & drop your files here',
  subtitle = 'or tap to browse from your computer or phone',
  supportedFormatsText = 'Supports JPG, PNG, WEBP up to 25MB',
  sampleButtonLabel = 'Try with Sample Image',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(Array.from(e.target.files));
    }
  };

  return (
    <div
      id="tool-upload-box"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 ${
        isDragging
          ? 'border-blue-600 bg-blue-50/50 scale-[0.99]'
          : 'border-slate-300 hover:border-blue-500 bg-white hover:bg-slate-50/60 shadow-sm'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        aria-label="Upload file input"
      />

      <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-inner">
          <UploadCloud className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
          <FileUp className="w-3.5 h-3.5 text-slate-500" />
          <span>{supportedFormatsText}</span>
        </div>

        {onLoadSample && (
          <div className="pt-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              id="try-sample-btn"
              onClick={onLoadSample}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg border border-blue-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              {sampleButtonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
