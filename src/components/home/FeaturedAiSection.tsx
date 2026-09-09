import React from 'react';
import { TOOLS } from '../../data/toolsData';
import { ToolCard } from '../common/ToolCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedAiSectionProps {
  onSelectTool: (toolId: string) => void;
  onViewCategory: () => void;
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, toolId: string) => void;
}

export const FeaturedAiSection: React.FC<FeaturedAiSectionProps> = ({
  onSelectTool,
  onViewCategory,
  favorites,
  onToggleFavorite,
}) => {
  const aiTools = TOOLS.filter((tool) => tool.category === 'ai');

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
        {/* Subtle geometric backdrop without tacky gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800/80 text-indigo-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Featured Writing & Language Utilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Practical AI Tools Built for Daily Work
              </h2>
              <p className="text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                Refined assistants to draft engaging captions, summarize extensive documents, and rewrite sentences cleanly.
              </p>
            </div>

            <button
              type="button"
              onClick={onViewCategory}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              <span>Explore AI Utilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {aiTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onSelect={onSelectTool}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
