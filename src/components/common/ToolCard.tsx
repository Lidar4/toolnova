import React from 'react';
import { ToolItem } from '../../types/tools';
import { ToolIcon } from './ToolIcon';
import { ArrowRight, Star } from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
  isFavorite?: boolean;
  onSelect: (toolId: string) => void;
  onToggleFavorite?: (e: React.MouseEvent, toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite = false,
  onSelect,
  onToggleFavorite,
}) => {
  const isAi = tool.category === 'ai';

  return (
    <div
      id={`tool-card-${tool.id}`}
      onClick={() => onSelect(tool.id)}
      className="group relative flex flex-col justify-between p-5 md:p-6 bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400/80 transition-all duration-200 cursor-pointer text-left focus-within:ring-2 focus-within:ring-blue-600 focus-within:outline-none"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(tool.id);
        }
      }}
    >
      <div>
        {/* Top bar: Icon, Badge, and Favorite Toggle */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
              isAi
                ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                : 'bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
            }`}
          >
            <ToolIcon name={tool.iconName} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.badge && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  tool.badge === 'Popular'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : tool.badge === 'AI'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {tool.badge}
              </span>
            )}

            {onToggleFavorite && (
              <button
                type="button"
                id={`favorite-btn-${tool.id}`}
                aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(e, tool.id);
                }}
                className={`p-1.5 rounded-md transition-colors ${
                  isFavorite
                    ? 'text-amber-500 hover:text-amber-600 hover:bg-amber-50'
                    : 'text-slate-300 hover:text-amber-400 hover:bg-slate-100'
                }`}
              >
                <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Title and Category */}
        <div className="mb-1.5">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            {tool.category.toUpperCase()} TOOL
          </span>
          <h3 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
        </div>

        {/* Short explanation */}
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      {/* Primary Action Button */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:text-blue-800">
        <span>Use Tool</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};
