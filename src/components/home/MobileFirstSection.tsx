import React from 'react';
import { Smartphone, Check, Zap, Touchpad } from 'lucide-react';

export const MobileFirstSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="bg-slate-100/80 border border-slate-200 rounded-3xl p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile-Optimized Web App</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Powerful tools that fit right in your pocket.
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Every tool in ToolNova is engineered for smooth one-hand operation on mobile screens. No native app installation or account registration is required—simply open your mobile browser, drop your file, and get your work done in seconds.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Tap-to-upload camera & gallery support',
                'Comfortable 44px+ touch targets',
                'Zero mobile data wasted on heavy uploads',
                'Full responsive preview canvases',
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Clean Mobile Representation Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 sm:w-72 bg-white rounded-3xl border-4 border-slate-800 shadow-xl overflow-hidden p-4 space-y-3 text-left">
              {/* Phone top bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-100">
                <span>9:41</span>
                <span className="font-bold text-slate-700">ToolNova Web</span>
                <span>100%</span>
              </div>

              {/* Mobile Tool Card Mock */}
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-2">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Active Workspace</span>
                <p className="text-xs font-bold text-slate-800">Image Compressor</p>
                <div className="h-16 rounded-lg bg-white border border-dashed border-blue-300 flex items-center justify-center text-[11px] text-blue-600 font-medium">
                  Tap to Select from Photos
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Quality</span>
                  <span className="font-bold text-slate-800">75%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-3/4 rounded-full" />
                </div>
              </div>

              <button
                type="button"
                className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold text-center"
              >
                Download Compressed File
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
