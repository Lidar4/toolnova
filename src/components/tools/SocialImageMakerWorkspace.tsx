import React, { useState, useRef, useEffect } from 'react';
import { Download, Share2, Palette, Sparkles } from 'lucide-react';

export const SocialImageMakerWorkspace: React.FC = () => {
  const [ratio, setRatio] = useState<'1:1' | '4:5' | '9:16'>('1:1');
  const [headline, setHeadline] = useState('Build things people actually find useful.');
  const [author, setAuthor] = useState('@founder');
  const [theme, setTheme] = useState<'slate' | 'navy' | 'emerald' | 'sunset'>('navy');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dimensions = {
    '1:1': { w: 1080, h: 1080 },
    '4:5': { w: 1080, h: 1350 },
    '9:16': { w: 1080, h: 1920 },
  };

  const themes = {
    navy: { bg1: '#0f172a', bg2: '#1e3a8a', text: '#ffffff', sub: '#93c5fd' },
    slate: { bg1: '#1e293b', bg2: '#334155', text: '#ffffff', sub: '#cbd5e1' },
    emerald: { bg1: '#064e3b', bg2: '#065f46', text: '#ffffff', sub: '#a7f3d0' },
    sunset: { bg1: '#431407', bg2: '#9a3412', text: '#ffffff', sub: '#fed7aa' },
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = dimensions[ratio];
    canvas.width = w;
    canvas.height = h;

    const activeTheme = themes[theme];

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, activeTheme.bg1);
    grad.addColorStop(1, activeTheme.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle inner border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, w - 120, h - 120);

    // Center quotation / headline
    ctx.save();
    ctx.fillStyle = activeTheme.text;
    ctx.font = 'bold 56px sans-serif';
    ctx.textAlign = 'center';

    const words = headline.split(' ');
    let line = '';
    const maxLineW = w - 240;
    const lines: string[] = [];

    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      if (ctx.measureText(test).width > maxLineW && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = test;
      }
    }
    lines.push(line);

    const lineHeight = 72;
    const totalBlockH = lines.length * lineHeight;
    let startY = h / 2 - totalBlockH / 2;

    for (const l of lines) {
      ctx.fillText(l.trim(), w / 2, startY);
      startY += lineHeight;
    }

    // Author / Handle
    if (author.trim()) {
      ctx.fillStyle = activeTheme.sub;
      ctx.font = '600 32px sans-serif';
      ctx.fillText(author, w / 2, startY + 40);
    }
    ctx.restore();
  };

  useEffect(() => {
    renderCanvas();
  }, [ratio, headline, author, theme]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `social-post-${ratio.replace(':', '-')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '1:1', label: 'Square 1:1', sub: 'Instagram / Feed' },
                { id: '4:5', label: 'Portrait 4:5', sub: 'High Engagement' },
                { id: '9:16', label: 'Story 9:16', sub: 'Stories & Reels' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRatio(r.id as any)}
                  className={`py-2 px-2 text-center rounded-lg border transition-all ${
                    ratio === r.id
                      ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="block text-xs font-bold">{r.label}</span>
                  <span className="block text-[10px] text-slate-400">{r.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Quote or Announcement
            </label>
            <textarea
              rows={4}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Handle / Attribution
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. @yourbrand or Author Name"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Color Tone
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'navy', label: 'Deep Indigo Navy' },
                { id: 'slate', label: 'Minimalist Slate' },
                { id: 'emerald', label: 'Forest Green' },
                { id: 'sunset', label: 'Warm Sunset' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id as any)}
                  className={`py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    theme === t.id
                      ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            id="download-social-img-btn"
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-all mt-2"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res Graphic</span>
          </button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 md:p-6 bg-slate-900/5 border border-slate-200 rounded-2xl">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Social Format Preview ({dimensions[ratio].w} × {dimensions[ratio].h})
          </span>

          <div className="max-h-[380px] rounded-xl overflow-hidden shadow-md border border-slate-300 bg-slate-900 flex items-center justify-center">
            <canvas ref={canvasRef} className="max-h-[380px] w-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};
