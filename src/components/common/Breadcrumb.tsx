import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs md:text-sm text-slate-500 mb-4 overflow-x-auto whitespace-nowrap py-1">
      <ol className="flex items-center space-x-1.5 md:space-x-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-400 shrink-0" />}
            {item.isCurrent ? (
              <span className="font-semibold text-slate-900 truncate" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className="hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
              >
                {idx === 0 && <Home className="w-3.5 h-3.5 shrink-0" />}
                <span>{item.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
