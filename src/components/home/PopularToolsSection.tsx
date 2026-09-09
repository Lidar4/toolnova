import React from 'react';
import { TOOLS, POPULAR_TOOL_IDS } from '../../data/toolsData';
import { ToolCard } from '../common/ToolCard';
import { ArrowRight, Flame } from 'lucide-react';

interface PopularToolsSectionProps {
  onSelectTool: (toolId: string) => void;
  onViewAll: () => void;
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, toolId: string) => void;
}

export const PopularToolsSection: React.FC<PopularToolsSectionProps> = ({
  onSelectTool,
  onViewAll,
  favorites,
  onToggleFavorite,
}) => {
  const popularTools = TOOLS.filter((tool) => POPULAR_TOOL_IDS.includes(tool.id)).slice(0, 8);

  return (
    <section id="popular-tools-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 text-left">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Most Used Utilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Everyday Tools
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Quickly access our most requested utilities for images, documents, and content.
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg border border-blue-200 transition-colors"
        >
          <span>View All 14 Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {popularTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isFavorite={favorites.includes(tool.id)}
            onSelect={onSelectTool}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
};
