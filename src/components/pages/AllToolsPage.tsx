import React, { useState, useMemo } from 'react';
import { TOOLS, CATEGORIES, POPULAR_TOOL_IDS } from '../../data/toolsData';
import { ToolCategory, ToolItem } from '../../types/tools';
import { ToolCard } from '../common/ToolCard';
import { Breadcrumb } from '../common/Breadcrumb';
import { Search, SlidersHorizontal, Layers, X } from 'lucide-react';

interface AllToolsPageProps {
  initialCategory?: ToolCategory | 'all';
  onNavigateHome: () => void;
  onSelectTool: (toolId: string) => void;
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, toolId: string) => void;
}

export const AllToolsPage: React.FC<AllToolsPageProps> = ({
  initialCategory = 'all',
  onNavigateHome,
  onSelectTool,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'alpha' | 'newest'>('popular');

  const filteredTools = useMemo(() => {
    let list = [...TOOLS];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((t) => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'alpha') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    } else {
      // popular
      list.sort(
        (a, b) =>
          (POPULAR_TOOL_IDS.includes(b.id) ? 1 : 0) - (POPULAR_TOOL_IDS.includes(a.id) ? 1 : 0)
      );
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const activeCategoryInfo =
    selectedCategory !== 'all' ? CATEGORIES.find((c) => c.id === selectedCategory) : null;

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-6 md:py-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', onClick: onNavigateHome },
            {
              label: activeCategoryInfo ? activeCategoryInfo.name : 'All Tools Directory',
              isCurrent: true,
            },
          ]}
        />

        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {activeCategoryInfo ? activeCategoryInfo.name : 'All Online Tools'}
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            {activeCategoryInfo
              ? activeCategoryInfo.description
              : 'Explore our complete suite of free digital utilities for images, documents, writing, and design.'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter tools by keyword..."
                className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="alpha">Alphabetical (A-Z)</option>
                <option value="newest">Featured & Newest</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories ({TOOLS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = TOOLS.filter((t) => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Count notification */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredTools.length}</strong> utilities
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Tool Cards Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onSelect={onSelectTool}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No tools found</h3>
            <p className="text-xs text-slate-500">
              We couldn&apos;t find any tool matching &ldquo;{searchQuery}&rdquo;. Try another keyword or browse by category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
