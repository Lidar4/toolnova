import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { TOOLS, CATEGORIES, POPULAR_TOOL_IDS } from '../../data/toolsData';
import { ToolItem } from '../../types/tools';
import { ToolIcon } from './ToolIcon';

interface ToolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
  recentToolIds: string[];
}

export const ToolSearchModal: React.FC<ToolSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  recentToolIds,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Search logic matching title, description, category, and keywords
  const normalizedQuery = query.toLowerCase().trim();
  const searchResults: ToolItem[] = normalizedQuery
    ? TOOLS.filter((tool) => {
        const inName = tool.name.toLowerCase().includes(normalizedQuery);
        const inDesc = tool.shortDescription.toLowerCase().includes(normalizedQuery);
        const inCat = tool.category.toLowerCase().includes(normalizedQuery);
        const inKeywords = tool.keywords.some((k) => k.toLowerCase().includes(normalizedQuery));
        return inName || inDesc || inCat || inKeywords;
      })
    : [];

  const recentTools = TOOLS.filter((t) => recentToolIds.includes(t.id));
  const popularTools = TOOLS.filter((t) => POPULAR_TOOL_IDS.includes(t.id)).slice(0, 4);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (searchResults.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % searchResults.length);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (searchResults.length > 0) {
          setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (searchResults.length > 0 && searchResults[selectedIndex]) {
          onSelectTool(searchResults[selectedIndex].id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, onClose, onSelectTool]);

  if (!isOpen) return null;

  return (
    <div
      id="global-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 md:pt-24 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Tool Search"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search a tool... (e.g., compress, resize, pdf, qr, caption)"
            className="w-full text-base md:text-lg text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
            aria-label="Search tools"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              <span>ESC to close</span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {/* Active Search Results */}
          {query.trim() ? (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
                Found {searchResults.length} {searchResults.length === 1 ? 'tool' : 'tools'}
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-1.5">
                  {searchResults.map((tool, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={tool.id}
                        id={`search-result-${tool.id}`}
                        onClick={() => {
                          onSelectTool(tool.id);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-blue-900 border border-blue-200'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              tool.category === 'ai' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            <ToolIcon name={tool.iconName} className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm truncate">{tool.name}</span>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-600">
                                {tool.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5">{tool.shortDescription}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pl-3 shrink-0">
                          {isSelected && (
                            <span className="hidden sm:inline-flex items-center text-[10px] text-blue-600 font-medium">
                              Press <CornerDownLeft className="w-3 h-3 ml-1" />
                            </span>
                          )}
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm font-medium text-slate-600">No tools found matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try searching for &quot;compress&quot;, &quot;pdf&quot;, &quot;qr&quot;, &quot;social&quot;, or &quot;resize&quot;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Default State when Query is Empty: Recents, Popular, Categories */
            <div className="space-y-6">
              {recentTools.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Recently Opened</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recentTools.map((tool) => (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => {
                          onSelectTool(tool.id);
                          onClose();
                        }}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-left transition-colors"
                      >
                        <ToolIcon name={tool.iconName} className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800 truncate">{tool.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Utilities</span>
                </div>
                <div className="space-y-1.5">
                  {popularTools.map((tool) => (
                    <div
                      key={tool.id}
                      onClick={() => {
                        onSelectTool(tool.id);
                        onClose();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50/70 hover:border-blue-200 border border-transparent cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <ToolIcon name={tool.iconName} className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-800">{tool.name}</span>
                      </div>
                      <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                        Open <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
                  Browse by Category
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setQuery(cat.id);
                      }}
                      className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center transition-colors"
                    >
                      <span className="text-xs font-semibold text-slate-700 block">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Search 14+ instant utilities</span>
          <span>ToolNova Instant Engine</span>
        </div>
      </div>
    </div>
  );
};
