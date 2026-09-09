import React, { useState } from 'react';
import { Search, Menu, X, Star, Layers, Sparkles, Image, FileText, LayoutTemplate, ShieldCheck } from 'lucide-react';
import { ToolCategory } from '../../types/tools';

interface HeaderProps {
  currentCategory?: ToolCategory | 'all' | 'home';
  onNavigateHome: () => void;
  onNavigateAllTools: () => void;
  onNavigateCategory: (category: ToolCategory) => void;
  onOpenSearch: () => void;
  favoriteCount: number;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory = 'home',
  onNavigateHome,
  onNavigateAllTools,
  onNavigateCategory,
  onOpenSearch,
  favoriteCount,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 focus:outline-none group text-left"
            aria-label="ToolNova Home"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-blue-800 transition-colors">
              <span className="tracking-tighter">TN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-blue-700 transition-colors">
                ToolNova
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
                Free Online Utilities
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            <button
              type="button"
              onClick={onNavigateHome}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentCategory === 'home'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={onNavigateAllTools}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentCategory === 'all'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All Tools
            </button>

            <button
              type="button"
              onClick={() => onNavigateCategory('image')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentCategory === 'image'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Image Tools
            </button>

            <button
              type="button"
              onClick={() => onNavigateCategory('pdf')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentCategory === 'pdf'
                  ? 'bg-rose-50 text-rose-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              PDF Tools
            </button>

            <button
              type="button"
              onClick={() => onNavigateCategory('ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                currentCategory === 'ai'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>AI Tools</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateCategory('design')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentCategory === 'design'
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Design Tools
            </button>
          </nav>
        </div>

        {/* Right Actions: Search trigger, Favorites, Mobile button */}
        <div className="flex items-center gap-2.5">
          {/* Universal Search trigger button */}
          <button
            type="button"
            id="header-search-trigger"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 transition-colors"
            aria-label="Search tools shortcut"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search a tool...</span>
            <kbd className="hidden sm:inline text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarked / Favorites Shelf Trigger */}
          <button
            type="button"
            id="header-favorites-btn"
            onClick={onOpenFavorites}
            className="p-2 text-slate-500 hover:text-amber-500 hover:bg-slate-50 rounded-lg transition-colors relative"
            title="Saved Tools"
            aria-label="Saved Favorite Tools"
          >
            <Star className={`w-4 h-4 ${favoriteCount > 0 ? 'fill-amber-400 text-amber-500' : ''}`} />
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in fade-in duration-150">
          <button
            type="button"
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigateAllTools();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            All 14 Tools Directory
          </button>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
              Categories
            </span>
            <button
              type="button"
              onClick={() => {
                onNavigateCategory('image');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
            >
              <Image className="w-4 h-4 text-blue-600" />
              <span>Image Tools</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigateCategory('pdf');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>PDF Tools</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigateCategory('ai');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Writing Tools</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigateCategory('design');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2"
            >
              <LayoutTemplate className="w-4 h-4 text-emerald-600" />
              <span>Design Tools</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
