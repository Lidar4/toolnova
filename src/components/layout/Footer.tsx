import React from 'react';
import { ToolCategory } from '../../types/tools';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTool: (toolId: string) => void;
  onSelectCategory: (cat: ToolCategory) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTool,
  onSelectCategory,
  onNavigateHome,
}) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 text-left pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                <span>TN</span>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                ToolNova
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An all-in-one free online tools platform created to simplify everyday digital work. Fast, reliable, and privacy-conscious micro-utilities built for professionals, students, and creators worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Client-side processing guarantees your files stay on your device.</span>
            </div>
          </div>

          {/* Image Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Image Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('image-compressor')}
                  className="hover:text-white transition-colors"
                >
                  Image Compressor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('image-resizer')}
                  className="hover:text-white transition-colors"
                >
                  Image Resizer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('jpg-to-png')}
                  className="hover:text-white transition-colors"
                >
                  JPG to PNG Converter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('png-to-jpg')}
                  className="hover:text-white transition-colors"
                >
                  PNG to JPG Converter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('background-remover')}
                  className="hover:text-white transition-colors"
                >
                  Background Remover
                </button>
              </li>
            </ul>
          </div>

          {/* PDF Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              PDF Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('pdf-merge')}
                  className="hover:text-white transition-colors"
                >
                  PDF Merge Tool
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('pdf-to-image')}
                  className="hover:text-white transition-colors"
                >
                  PDF to Image Extractor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('image-to-pdf')}
                  className="hover:text-white transition-colors"
                >
                  Image to PDF Converter
                </button>
              </li>
            </ul>
          </div>

          {/* AI Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              AI Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('ai-caption-generator')}
                  className="hover:text-white transition-colors"
                >
                  AI Caption Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('ai-summarizer')}
                  className="hover:text-white transition-colors"
                >
                  AI Text Summarizer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('ai-rewriter')}
                  className="hover:text-white transition-colors"
                >
                  AI Rewriter & Polisher
                </button>
              </li>
            </ul>
          </div>

          {/* Design & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Design & Codes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('qr-generator')}
                  className="hover:text-white transition-colors"
                >
                  QR Code Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('youtube-thumbnail-maker')}
                  className="hover:text-white transition-colors"
                >
                  YouTube Thumbnail Maker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('social-image-maker')}
                  className="hover:text-white transition-colors"
                >
                  Social Media Image Maker
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal notices */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ToolNova. All rights reserved. Free, open, and accessible tools.</p>
          <div className="flex items-center gap-6">
            <span>Client-First Architecture</span>
            <span>No Cookies Tracked</span>
            <span>Zero Deceptive Dark Patterns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
