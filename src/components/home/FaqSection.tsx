import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is ToolNova?',
      a: 'ToolNova is a fast, clean, and reliable all-in-one free online tools platform designed to handle everyday digital tasks—including image compression, image resizing, format conversion, PDF merging, QR code generation, and AI writing utilities.',
    },
    {
      q: 'Are all tools on ToolNova free to use?',
      a: 'Yes, all tools currently provided on ToolNova are free to use without mandatory sign-up, subscriptions, or hidden charges.',
    },
    {
      q: 'Can I use ToolNova on my mobile phone?',
      a: 'Absolutely. ToolNova is designed mobile-first and functions smoothly directly in modern mobile web browsers like Chrome, Safari, and Firefox with touch-friendly controls.',
    },
    {
      q: 'Are my uploaded images and documents stored on your servers?',
      a: 'No. Image tools (such as Image Compressor, Resizer, and Converters) and QR generators execute locally inside your web browser using HTML5 Canvas APIs. Your files are not uploaded or permanently archived on any remote server.',
    },
    {
      q: 'What file formats are supported across the platform?',
      a: 'Depending on the tool, ToolNova supports JPG, PNG, WEBP, and PDF documents. Detailed supported format tags are visible in each respective tool workspace.',
    },
    {
      q: 'Will you add more tools in the future?',
      a: 'Yes! ToolNova is architected with a modular system that allows new utilities in media, audio, code, and documents to be added seamlessly without altering the core user experience.',
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-14 text-left">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
          Got Questions?
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Honest, clear answers about how ToolNova works and our commitment to utility.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {faqs.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="p-5 md:p-6 transition-colors">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left text-base md:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-3" />
                )}
              </button>

              {isOpen && (
                <p className="text-xs md:text-sm text-slate-600 mt-3 leading-relaxed pr-6">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
