import React from 'react';
import { CATEGORIES, TOOLS } from '../../data/toolsData';
import { ToolCategory } from '../../types/tools';
import { ToolIcon } from '../common/ToolIcon';
import { ArrowRight, Layers } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (category: ToolCategory) => void;
  onSelectTool: (toolId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  onSelectTool,
}) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 text-left">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
          Explore by Category
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Organized for Fast Discovery
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Find the right utility quickly across our four primary tool suites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => {
          const catTools = TOOLS.filter((t) => t.category === cat.id);

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ToolIcon name={cat.iconName} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {catTools.length} tools
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Quick sub-links */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  {catTools.slice(0, 3).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onSelectTool(t.id)}
                      className="w-full text-left text-xs font-medium text-slate-600 hover:text-blue-600 flex items-center justify-between py-1 transition-colors"
                    >
                      <span className="truncate">{t.name}</span>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className="w-full text-center text-xs font-bold text-blue-700 hover:text-blue-800 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View All {cat.name}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
