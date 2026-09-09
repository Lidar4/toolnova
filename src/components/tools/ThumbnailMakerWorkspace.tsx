import React, { useState, useRef, useEffect } from 'react';
import { Download, Tv, Sparkles, RefreshCw, Palette, Type } from 'lucide-react';

export const ThumbnailMakerWorkspace: React.FC = () => {
  const [headline, setHeadline] = useState('MASTER THIS IN 10 MINUTES!');
  const [subtext, setSubtext] = useState('Step-by-Step Practical Blueprint');
  const [badgeText, setBadgeText] = useState('NEW 2026');
  const [theme, setTheme] = useState<'midnight' | 'crimson' | 'emerald' | 'amber'>('midnight');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const themes = {
    midnight: { bg1: '#0f172a', bg2: '#1e3a8a', badgeBg: '#3b82f6', badgeText: '#ffffff', accent: '#60a5fa' },
    crimson: { bg1: '#450a0a', bg2: '#991b1b', badgeBg: '#f87171', badgeText: '#450a0a', accent: '#fca5a5' },
    emerald: { bg1: '#064e3b', bg2: '#047857', badgeBg: '#34d399', badgeText: '#064e3b', accent: '#a7f3d0' },
    amber: { bg1: '#451a03', bg2: '#b45309', badgeBg: '#f59e0b', badgeText: '#451a03', accent: '#fde68a' },
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 1280;
    const h = 720;
    canvas.width = w;
    canvas.height = h;

    const activeTheme = themes[theme];

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, activeTheme.bg1);
    grad.addColorStop(1, activeTheme.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Modern background geometric accents
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(1100, 200, 350, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.beginPath();
    ctx.arc(1100, 200, 300, 0, Math.PI * 2);
    ctx.fill();

    // Badge Pill
    if (badgeText.trim()) {
      ctx.save();
      ctx.fillStyle = activeTheme.badgeBg;
      const badgeW = 200;
      const badgeH = 54;
      const bx = 100;
      const by = 110;

      // Rounded rectangle
      ctx.beginPath();
      ctx.roundRect(bx, by, badgeW, badgeH, 12);
      ctx.fill();

      ctx.fillStyle = activeTheme.badgeText;
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(badgeText.toUpperCase(), bx + badgeW / 2, by + 36);
      ctx.restore();
    }

    // Headline with strong contrast shadow
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px sans-serif';
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 6;

    // Word wrapping for large headline
    const words = headline.split(' ');
    let line = '';
    let y = 280;
    const lineHeight = 75;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 980 && i > 0) {
        ctx.fillText(line, 100, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 100, y);
    ctx.restore();

    // Subtext
    if (subtext.trim()) {
      ctx.save();
      ctx.fillStyle = activeTheme.accent;
      ctx.font = '600 32px sans-serif';
      ctx.fillText(subtext, 100, y + 68);
      ctx.restore();
    }

    // Watermark
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '500 20px sans-serif';
    ctx.fillText('Created with ToolNova • Free YouTube Thumbnail Maker', 100, 660);
    ctx.restore();
  };

  useEffect(() => {
    renderCanvas();
  }, [headline, subtext, badgeText, theme]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'youtube-thumbnail-1280x720.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Main Video Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. HOW TO GROW 10X FASTER"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Sub-headline / Punchline
            </label>
            <input
              type="text"
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              placeholder="e.g. The exact workflow nobody shares"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Highlight Badge
            </label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              placeholder="e.g. MUST WATCH or NEW"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Color Palette Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'midnight', label: 'Midnight Blue' },
                { id: 'crimson', label: 'Crimson Bold' },
                { id: 'emerald', label: 'Emerald Tech' },
                { id: 'amber', label: 'Sunset Amber' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id as any)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
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

          <div className="pt-2">
            <button
              type="button"
              id="download-thumbnail-btn"
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download 1280×720 PNG</span>
            </button>
          </div>
        </div>

        {/* Live Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 md:p-6 bg-slate-900/5 border border-slate-200 rounded-2xl">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Exact 16:9 YouTube Dimension (1280 × 720)
          </span>

          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md border border-slate-300 bg-slate-900">
            <canvas ref={canvasRef} className="w-full h-full object-contain" />
          </div>

          <p className="text-[11px] text-slate-500 mt-3 text-center">
            Compliant with YouTube 2MB limit and 1280x720 recommended specification.
          </p>
        </div>
      </div>
    </div>
  );
};
