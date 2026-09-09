import React from 'react';
import { TOOLS } from '../../data/toolsData';
import { ToolCard } from './ToolCard';
import { X, Star, Trash2 } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onSelectTool: (toolId: string) => void;
  onToggleFavorite: (e: React.MouseEvent, toolId: string) => void;
  onClearFavorites: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onSelectTool,
  onToggleFavorite,
  onClearFavorites,
}) => {
  if (!isOpen) return null;

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Your Bookmarked Tools ({favoriteTools.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {favoriteTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isFavorite={true}
                  onSelect={(id) => {
                    onSelectTool(id);
                    onClose();
                  }}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <Star className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No favorite tools saved yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the bookmark star on any tool card or workspace to pin your most-used utilities here for 1-click access.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteTools.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Saved locally in your browser</span>
            <button
              type="button"
              onClick={onClearFavorites}
              className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
