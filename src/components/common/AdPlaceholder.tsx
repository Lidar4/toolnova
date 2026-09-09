import React from 'react';

interface AdPlaceholderProps {
  slot: 'top-banner' | 'in-feed' | 'tool-bottom' | 'footer-banner';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, className = '' }) => {
  // Respecting Section 10: Distinct, non-deceptive ad placeholder clearly marked as sponsor space
  return (
    <div
      id={`ad-placeholder-${slot}`}
      className={`w-full max-w-5xl mx-auto my-6 px-4 ${className}`}
      aria-label="Advertisement placeholder"
    >
      <div className="border border-dashed border-slate-300 rounded-lg bg-slate-50/75 p-3 text-center transition-colors">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-slate-400 uppercase mb-2">
          <span>SPONSORED SPACE</span>
          <span className="bg-slate-200/70 text-slate-500 px-1.5 py-0.5 rounded text-[10px]">AD SLOT #{slot}</span>
        </div>
        <div className="h-16 md:h-20 flex items-center justify-center border border-slate-200/80 rounded bg-white/70">
          <p className="text-xs text-slate-400 font-medium select-none">
            Reserved for Ethical, Contextual Sponsor Ads (728×90 / Responsive)
          </p>
        </div>
      </div>
    </div>
  );
};
