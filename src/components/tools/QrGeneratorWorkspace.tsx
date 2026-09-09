import React, { useState, useMemo, useRef } from 'react';
import { generateQrMatrix } from '../../utils/qrCode';
import { Download, Copy, Check, QrCode, Globe, Wifi, Mail, AlignLeft, RefreshCw } from 'lucide-react';

export const QrGeneratorWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'url' | 'text' | 'wifi' | 'email'>('url');
  const [urlInput, setUrlInput] = useState('https://toolnova.app');
  const [textInput, setTextInput] = useState('Welcome to ToolNova Free Online Tools!');
  const [wifiSsid, setWifiSsid] = useState('Guest_WiFi');
  const [wifiPass, setWifiPass] = useState('SecretKey2026');
  const [emailInput, setEmailInput] = useState('support@example.com');
  const [emailSubject, setEmailSubject] = useState('Feedback');

  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState<number>(280);
  const [copied, setCopied] = useState(false);

  // Compute payload based on active tab
  const payload = useMemo(() => {
    switch (activeTab) {
      case 'url':
        return urlInput.trim() || 'https://toolnova.app';
      case 'text':
        return textInput.trim() || 'ToolNova';
      case 'wifi':
        return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`;
      case 'email':
        return `mailto:${emailInput}?subject=${encodeURIComponent(emailSubject)}`;
      default:
        return urlInput;
    }
  }, [activeTab, urlInput, textInput, wifiSsid, wifiPass, emailInput, emailSubject]);

  // Generate QR Matrix
  const matrix = useMemo(() => {
    try {
      return generateQrMatrix(payload);
    } catch {
      return generateQrMatrix('https://toolnova.app');
    }
  }, [payload]);

  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    const scale = 4; // High DPI for crisp print
    const matrixLen = matrix.length;
    canvas.width = size * scale;
    canvas.height = size * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Padding (quiet zone)
    const padding = 4;
    const totalCells = matrixLen + padding * 2;
    const cellSize = canvas.width / totalCells;

    ctx.fillStyle = fgColor;
    for (let r = 0; r < matrixLen; r++) {
      for (let c = 0; c < matrixLen; c++) {
        if (matrix[r][c]) {
          ctx.fillRect((c + padding) * cellSize, (r + padding) * cellSize, cellSize + 0.5, cellSize + 0.5);
        }
      }
    }

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `toolnova-qr-${activeTab}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSvg = () => {
    const matrixLen = matrix.length;
    const padding = 4;
    const totalCells = matrixLen + padding * 2;
    const cellSize = 10;
    const svgDim = totalCells * cellSize;

    let rects = '';
    for (let r = 0; r < matrixLen; r++) {
      for (let c = 0; c < matrixLen; c++) {
        if (matrix[r][c]) {
          rects += `<rect x="${(c + padding) * cellSize}" y="${(r + padding) * cellSize}" width="${cellSize}" height="${cellSize}" fill="${fgColor}" />\n`;
        }
      }
    }

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgDim} ${svgDim}" width="${svgDim}" height="${svgDim}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  ${rects}
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolnova-qr-${activeTab}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form & Customization */}
        <div className="lg:col-span-7 space-y-6">
          {/* Data Type Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select QR Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  activeTab === 'url'
                    ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Website URL</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wifi')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  activeTab === 'wifi'
                    ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Wi-Fi Network</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  activeTab === 'text'
                    ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Plain Text</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  activeTab === 'email'
                    ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Dynamic Inputs */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            {activeTab === 'url' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Target Website URL
                </label>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Users who scan will be instantly taken to this link.
                </p>
              </div>
            )}

            {activeTab === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="Home or Office Wi-Fi"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Wi-Fi Password
                  </label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    placeholder="Enter network password"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Content / Message
                </label>
                <textarea
                  rows={3}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type any message, note, or ID number..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                />
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Default Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="e.g., Question about product"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Color & Size Customization */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Foreground Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-md cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono font-medium text-slate-700">{fgColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-md cursor-pointer border border-slate-200"
                />
                <span className="text-xs font-mono font-medium text-slate-700">{bgColor}</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                QR Preview Size
              </label>
              <input
                type="range"
                min="200"
                max="360"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live QR Code Preview & Download */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Live Instant Preview
          </span>

          {/* Render Vector SVG Preview */}
          <div
            className="p-4 rounded-xl border border-slate-200 shadow-sm transition-all"
            style={{ backgroundColor: bgColor }}
          >
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${matrix.length + 8} ${matrix.length + 8}`}
              className="max-w-full h-auto"
            >
              <rect width="100%" height="100%" fill={bgColor} />
              {matrix.map((row, r) =>
                row.map((val, c) => {
                  if (!val) return null;
                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={c + 4}
                      y={r + 4}
                      width="1"
                      height="1"
                      fill={fgColor}
                    />
                  );
                })
              )}
            </svg>
          </div>

          <p className="text-[11px] text-slate-500 mt-3 text-center">
            Standard high-contrast static code. Never expires.
          </p>

          {/* Action Buttons */}
          <div className="w-full space-y-2 mt-5">
            <button
              type="button"
              id="qr-download-png"
              onClick={handleDownloadPng}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res PNG</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="qr-download-svg"
                onClick={handleDownloadSvg}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Vector SVG</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied' : 'Copy Content'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
