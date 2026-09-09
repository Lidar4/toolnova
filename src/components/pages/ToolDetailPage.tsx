import React, { useState } from 'react';
import { ToolItem } from '../../types/tools';
import { CATEGORIES, TOOLS } from '../../data/toolsData';
import { Breadcrumb } from '../common/Breadcrumb';
import { ToolWorkspaceRenderer } from '../tools/ToolWorkspaceRenderer';
import { ToolCard } from '../common/ToolCard';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { ToolIcon } from '../common/ToolIcon';
import { CheckCircle, HelpCircle, ChevronDown, ChevronUp, Star, ShieldCheck, Zap, Info } from 'lucide-react';

interface ToolDetailPageProps {
  tool: ToolItem;
  onNavigateHome: () => void;
  onNavigateCategory: (category: string) => void;
  onSelectTool: (toolId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, toolId: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({
  tool,
  onNavigateHome,
  onNavigateCategory,
  onSelectTool,
  isFavorite,
  onToggleFavorite,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const category = CATEGORIES.find((c) => c.id === tool.category);
  const relatedTools = TOOLS.filter((t) => tool.relatedToolIds.includes(t.id));

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-6 md:py-10">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', onClick: onNavigateHome },
            {
              label: category ? category.name : 'Tools',
              onClick: () => onNavigateCategory(tool.category),
            },
            { label: tool.name, isCurrent: true },
          ]}
        />

        {/* Tool Header Info */}
        <div className="mb-6 md:mb-8 text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                {category?.name || 'Utility'}
              </span>
              {tool.badge && (
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">
                  {tool.badge}
                </span>
              )}
            </div>

            <button
              type="button"
              id="tool-favorite-toggle"
              onClick={(e) => onToggleFavorite(e, tool.id)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
              <span>{isFavorite ? 'Bookmarked' : 'Add to Favorites'}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {tool.name}
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {tool.fullDescription}
          </p>
        </div>

        {/* Main Interactive Tool Workspace */}
        <div id="main-tool-workspace" className="mb-8">
          <ToolWorkspaceRenderer tool={tool} />
        </div>

        {/* Ad Placeholder below Tool Result as specified in Section 10 */}
        <AdPlaceholder slot="tool-bottom" className="my-8" />

        {/* Information Section: How It Works & Features */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-10">
          {/* How to Use Steps (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 text-left shadow-xs">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>How to Use {tool.name}</span>
            </h2>

            <div className="space-y-6">
              {tool.howItWorks.map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-slate-800">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Specs (5 cols) */}
          <div className="md:col-span-5 space-y-6 text-left">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Key Features</span>
              </h2>

              <ul className="space-y-2.5">
                {tool.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Supported Formats Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Supported Formats</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {tool.supportedFormats.map((fmt) => (
                  <span
                    key={fmt}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-200"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tool-specific FAQ */}
        {tool.faq.length > 0 && (
          <div className="my-10 bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 text-left shadow-xs">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="divide-y divide-slate-100">
              {tool.faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-sm md:text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span>{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="text-xs md:text-sm text-slate-600 mt-2.5 leading-relaxed pr-6">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Tools Shelf */}
        {relatedTools.length > 0 && (
          <div className="my-12 text-left">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Related Tools</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complementary utilities to streamline your workflow.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateCategory(tool.category)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View all {category?.shortName}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedTools.map((relTool) => (
                <ToolCard
                  key={relTool.id}
                  tool={relTool}
                  onSelect={onSelectTool}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
