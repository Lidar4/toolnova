import React from 'react';
import { MousePointerClick, UploadCloud, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: MousePointerClick,
      title: 'Choose a tool',
      desc: 'Search or select from our organized suite of image, PDF, AI, and design utilities.',
    },
    {
      step: '02',
      icon: UploadCloud,
      title: 'Upload / enter your content',
      desc: 'Drag and drop files or paste your text directly into the focused workspace.',
    },
    {
      step: '03',
      icon: CheckCircle,
      title: 'Get your result instantly',
      desc: 'Download your optimized files or copy formatted output with zero wait times.',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-14 text-left">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
          Simple Workflow
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How ToolNova Works
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          No sign-up forms, no subscription prompts, and no convoluted pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 relative shadow-xs"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-200 font-mono">
                  {item.step}
                </span>
              </div>

              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
