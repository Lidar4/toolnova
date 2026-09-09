import React from 'react';
import { Zap, ShieldCheck, Smartphone, CheckCircle, Smile } from 'lucide-react';

export const TrustValueStrip: React.FC = () => {
  const items = [
    { icon: Zap, label: 'Fast Processing', sub: 'Instant execution in-browser' },
    { icon: Smile, label: 'Easy to Use', sub: 'Zero complicated setup' },
    { icon: CheckCircle, label: 'Free Online Tools', sub: 'No forced paywalls' },
    { icon: Smartphone, label: 'Mobile Friendly', sub: 'Comfortable one-hand touch' },
    { icon: ShieldCheck, label: 'Privacy Conscious', sub: 'Client-side processing' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-4">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 ${idx !== 0 ? 'pt-3 md:pt-0 md:pl-4' : ''}`}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-xs font-bold text-slate-900 truncate">
                    {item.label}
                  </span>
                  <span className="block text-[11px] text-slate-500 truncate">
                    {item.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
