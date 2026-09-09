import React, { useState } from 'react';
import { PenTool, Copy, Check, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

export const AiRewriterWorkspace: React.FC = () => {
  const [inputText, setInputText] = useState('We need to make sure that our web application is very fast and does not take too much time when users are loading pages.');
  const [mode, setMode] = useState<'fluent' | 'formal' | 'creative' | 'shorten'>('fluent');
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenText, setRewrittenText] = useState<string>(
    'We must ensure our web application loads swiftly and delivers near-instant page transitions for users.'
  );
  const [copied, setCopied] = useState(false);

  const sampleInputs = [
    'I am writing this email because I want to ask you if you are free for a quick meeting tomorrow afternoon.',
    'The report was made by the team and it shows a lot of big problems with our current system.',
  ];

  const handleRewrite = () => {
    if (!inputText.trim()) return;
    setIsRewriting(true);

    setTimeout(() => {
      let result = '';
      if (mode === 'formal') {
        result = `We must ensure that our web application maintains optimal performance and minimizes latency during page loads.`;
      } else if (mode === 'shorten') {
        result = `Our web application must load fast and eliminate page delays.`;
      } else if (mode === 'creative') {
        result = `Lightning-fast load times and frictionless transitions should define every single interaction in our app.`;
      } else {
        // Fluent
        result = `We should optimize our web application for rapid load times and seamless user navigation.`;
      }
      setRewrittenText(result);
      setIsRewriting(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      <div className="space-y-6">
        {/* Style selection bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Rewriting Style:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'fluent', label: 'Fluent & Natural' },
              { id: 'formal', label: 'Professional / Formal' },
              { id: 'shorten', label: 'Concise & Short' },
              { id: 'creative', label: 'Engaging & Creative' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  mode === item.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input side */}
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase">Original Text</label>
              <button
                type="button"
                onClick={() => setInputText(sampleInputs[Math.floor(Math.random() * sampleInputs.length)])}
                className="text-[11px] font-semibold text-indigo-600 hover:underline"
              >
                Try sample sentence
              </button>
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste sentence or paragraph to polish..."
              className="w-full flex-1 p-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none resize-none leading-relaxed transition-colors"
            />
          </div>

          {/* Output side */}
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-indigo-700 uppercase">Improved Version</label>
              {rewrittenText && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <div className="w-full flex-1 p-3.5 text-sm bg-indigo-50/40 border border-indigo-200 rounded-xl flex items-center leading-relaxed text-slate-800">
              {isRewriting ? (
                <span className="text-slate-400 text-xs">Polishing sentence flow...</span>
              ) : (
                <p>{rewrittenText || 'Click Rewrite Now to generate an improved sentence.'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            id="run-rewrite-btn"
            onClick={handleRewrite}
            disabled={isRewriting || !inputText.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition-all"
          >
            <PenTool className="w-4 h-4" />
            <span>{isRewriting ? 'Refining...' : 'Rewrite Sentence'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
