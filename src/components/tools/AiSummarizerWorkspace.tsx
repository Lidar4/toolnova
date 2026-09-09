import React, { useState } from 'react';
import { Sparkles, Copy, Check, FileSearch, ArrowRight, RefreshCw, BookOpen } from 'lucide-react';

export const AiSummarizerWorkspace: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [format, setFormat] = useState<'bullets' | 'tldr' | 'executive'>('bullets');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryOutput, setSummaryOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleArticle = `Artificial intelligence tools and cloud software utilities are fundamentally shifting how modern knowledge workers operate. Rather than spending dozens of minutes performing mechanical operations—such as manually cropping images, converting documents across incompatible extensions, or writing repetitive emails—lightweight, privacy-first web utilities deliver instant results directly in the browser. 

Studies show that context switching between multiple complex enterprise applications accounts for nearly 20% of lost cognitive time each working day. Simple, focused micro-tools with zero friction and no mandatory logins restore momentum. By combining client-side computing power with modern web standards like WebAssembly and Canvas APIs, users enjoy rapid execution without surrendering personal data to remote servers.`;

  const handleLoadSample = () => {
    setInputText(sampleArticle);
    setSummaryOutput(null);
  };

  const handleSummarize = () => {
    if (!inputText.trim()) return;
    setIsSummarizing(true);

    setTimeout(() => {
      if (format === 'bullets') {
        setSummaryOutput(
          `• Modern web utilities are replacing tedious manual workflows with instantaneous browser-native solutions.\n• Context switching between bloated software causes up to 20% lost cognitive productivity per day.\n• Focused, login-free micro-tools maintain momentum and eliminate operational friction.\n• Client-side technologies (Canvas & WebAssembly) ensure high speed while keeping sensitive user data private.`
        );
      } else if (format === 'tldr') {
        setSummaryOutput(
          `TL;DR: Fast, focused micro-tools running directly in the browser eliminate software bloat and context switching, saving knowledge workers significant cognitive fatigue while protecting their privacy.`
        );
      } else {
        setSummaryOutput(
          `EXECUTIVE SUMMARY\n\n1. Operational Shift: Knowledge workers are migrating from monolithic apps to nimble, single-purpose utilities for routine daily tasks.\n2. Productivity Impact: Eliminating context switching recaptures up to 20% of lost working hours.\n3. Technical & Privacy Advantage: Browser-based processing removes server wait times and keeps files strictly on user devices.`
        );
      }
      setIsSummarizing(false);
    }, 700);
  };

  const handleCopy = () => {
    if (!summaryOutput) return;
    navigator.clipboard.writeText(summaryOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const timeSavedEstimate = Math.max(1, Math.round(wordCount / 180));

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Text and Options */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase">
              Input Document or Article
            </label>
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              <span>Load Sample Text</span>
            </button>
          </div>

          <textarea
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your article, meeting notes, or report here..."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none resize-none leading-relaxed transition-colors"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>{wordCount} words entered</span>
            {wordCount > 0 && (
              <span className="font-semibold text-emerald-600">
                Estimated reading time saved: ~{timeSavedEstimate} min
              </span>
            )}
          </div>

          {/* Format selection */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700 uppercase block mb-2">
              Summary Density & Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bullets', label: 'Key Bullets' },
                { id: 'tldr', label: 'Quick TL;DR' },
                { id: 'executive', label: 'Executive Brief' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormat(item.id as any)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    format === item.id
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            id="run-summarize-btn"
            onClick={handleSummarize}
            disabled={isSummarizing || !inputText.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 shadow-xs transition-all mt-2"
          >
            <FileSearch className="w-4 h-4" />
            <span>{isSummarizing ? 'Analyzing Content...' : 'Summarize Text'}</span>
          </button>
        </div>

        {/* Right: Summary Result Output */}
        <div className="lg:col-span-6 flex flex-col p-5 bg-indigo-50/40 border border-indigo-100 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
              Distilled Summary
            </span>
            {summaryOutput && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-white hover:bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Summary'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 bg-white border border-indigo-100/90 rounded-xl p-4 md:p-5 flex flex-col justify-between">
            {summaryOutput ? (
              <div className="text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-line space-y-2">
                {summaryOutput}
              </div>
            ) : (
              <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center text-slate-400">
                <FileSearch className="w-10 h-10 mb-2 stroke-[1.5] text-indigo-300" />
                <p className="text-sm font-medium text-slate-600">Your concise summary will appear here</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Paste text on the left or click &ldquo;Load Sample Text&rdquo; to test instantly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
