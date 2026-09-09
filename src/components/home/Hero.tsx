import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';

interface HeroProps {
  onSearchClick: () => void;
  onExploreAll: () => void;
  onScrollToPopular: () => void;
  onSelectTool: (toolId: string) => void;
}

const ROTATING_PLACEHOLDERS = [
  'Compress an image...',
  'Create a QR code...',
  'Merge PDF files...',
  'Generate a caption...',
  'Resize photo dimensions...',
  'Remove background...',
];

export const Hero: React.FC<HeroProps> = ({
  onSearchClick,
  onExploreAll,
  onScrollToPopular,
  onSelectTool,
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-14 md:pt-18 md:pb-20 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Subtle Category Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5" />
          <span>All-in-One Free Online Tools Platform</span>
        </div>

        {/* Large, Confident, Not Oversized Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl mx-auto">
          Free tools for your everyday digital work.
        </h1>

        {/* Supporting Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Compress images, create QR codes, edit PDFs, generate captions and more — quickly and simply.
        </p>

        {/* Universal Tool Search Field (Visually Prominent) */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div
            id="hero-search-bar"
            onClick={onSearchClick}
            className="group flex items-center bg-white border-2 border-slate-300 hover:border-blue-600 rounded-2xl p-2 sm:p-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-colors mr-3 shrink-0">
              <Search className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Instant Tool Search
              </span>
              <span className="block text-sm sm:text-base font-medium text-slate-700">
                {ROTATING_PLACEHOLDERS[placeholderIndex]}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 pr-2">
              <kbd className="text-xs font-mono bg-slate-100 border border-slate-200 text-slate-500 px-2.5 py-1 rounded-md">
                ⌘K
              </kbd>
              <span className="text-xs font-bold text-white bg-blue-600 group-hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors">
                Search
              </span>
            </div>
          </div>

          {/* Quick Popular Tool Chips below Search */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular:</span>
            {[
              { id: 'image-compressor', label: 'Image Compressor' },
              { id: 'qr-generator', label: 'QR Generator' },
              { id: 'pdf-merge', label: 'PDF Merge' },
              { id: 'background-remover', label: 'Background Remover' },
              { id: 'ai-summarizer', label: 'AI Summarizer' },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => onSelectTool(chip.id)}
                className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 px-2.5 py-1 rounded-lg font-medium transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            id="hero-explore-btn"
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-sm transition-all"
          >
            <span>Explore All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="hero-popular-btn"
            onClick={onScrollToPopular}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors"
          >
            <span>Popular Tools</span>
          </button>
        </div>
      </div>
    </section>
  );
};
