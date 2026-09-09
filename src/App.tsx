/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { TOOLS, CATEGORIES } from './data/toolsData';
import { ToolCategory, ToolItem } from './types/tools';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { TrustValueStrip } from './components/home/TrustValueStrip';
import { PopularToolsSection } from './components/home/PopularToolsSection';
import { CategorySection } from './components/home/CategorySection';
import { FeaturedAiSection } from './components/home/FeaturedAiSection';
import { HowItWorks } from './components/home/HowItWorks';
import { MobileFirstSection } from './components/home/MobileFirstSection';
import { FaqSection } from './components/home/FaqSection';
import { AllToolsPage } from './components/pages/AllToolsPage';
import { ToolDetailPage } from './components/pages/ToolDetailPage';
import { ToolSearchModal } from './components/common/ToolSearchModal';
import { FavoritesModal } from './components/common/FavoritesModal';
import { AdPlaceholder } from './components/common/AdPlaceholder';
import {
  getFavorites,
  toggleFavoriteStorage,
  clearFavoritesStorage,
  addRecentTool,
} from './utils/storage';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'all' | 'category' | 'tool'>('home');
  const [activeToolId, setActiveToolId] = useState<string>('image-compressor');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('image');

  // Modals & Storage State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Sync hash with views
  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash === 'all-tools') {
      setCurrentView('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash.startsWith('category/')) {
      const cat = hash.split('/')[1] as ToolCategory;
      if (CATEGORIES.some((c) => c.id === cat)) {
        setActiveCategory(cat);
        setCurrentView('category');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash.startsWith('tool/')) {
      const tid = hash.split('/')[1];
      if (TOOLS.some((t) => t.id === tid)) {
        setActiveToolId(tid);
        setCurrentView('tool');
        addRecentTool(tid);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  // Initialize
  useEffect(() => {
    setFavorites(getFavorites());
    parseHash();

    const handleHashChange = () => parseHash();
    window.addEventListener('hashchange', handleHashChange);

    // Keyboard shortcut Cmd+K or Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [parseHash]);

  // Navigation handlers
  const navigateToHome = () => {
    window.location.hash = '#home';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAllTools = () => {
    window.location.hash = '#all-tools';
    setCurrentView('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (cat: ToolCategory) => {
    setActiveCategory(cat);
    window.location.hash = `#category/${cat}`;
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectTool = (toolId: string) => {
    setActiveToolId(toolId);
    window.location.hash = `#tool/${toolId}`;
    setCurrentView('tool');
    addRecentTool(toolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    const updated = toggleFavoriteStorage(toolId);
    setFavorites(updated);
  };

  const handleClearFavorites = () => {
    clearFavoritesStorage();
    setFavorites([]);
  };

  const activeTool = TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Header */}
      <Header
        currentCategory={currentView === 'category' ? activeCategory : currentView}
        onNavigateHome={navigateToHome}
        onNavigateAllTools={navigateToAllTools}
        onNavigateCategory={navigateToCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-150">
            {/* Hero Section */}
            <Hero
              onSearchClick={() => setIsSearchOpen(true)}
              onExploreAll={navigateToAllTools}
              onScrollToPopular={() => {
                const el = document.getElementById('popular-tools-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectTool={selectTool}
            />

            {/* Trust and Values Strip */}
            <TrustValueStrip />

            {/* Ad slot between hero and popular tools */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 my-6">
              <AdPlaceholder slot="home-top" />
            </div>

            {/* Popular Tools Section */}
            <PopularToolsSection
              onSelectTool={selectTool}
              onViewAll={navigateToAllTools}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />

            {/* Category Discovery Section */}
            <CategorySection
              onSelectCategory={navigateToCategory}
              onSelectTool={selectTool}
            />

            {/* Featured AI Section */}
            <FeaturedAiSection
              onSelectTool={selectTool}
              onViewCategory={() => navigateToCategory('ai')}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />

            {/* How It Works */}
            <HowItWorks />

            {/* Mobile First Section */}
            <MobileFirstSection />

            {/* FAQ Section */}
            <FaqSection />

            {/* Bottom Ad Placeholder on Home */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
              <AdPlaceholder slot="home-bottom" />
            </div>
          </div>
        )}

        {(currentView === 'all' || currentView === 'category') && (
          <div className="animate-in fade-in duration-150">
            <AllToolsPage
              initialCategory={currentView === 'category' ? activeCategory : 'all'}
              onNavigateHome={navigateToHome}
              onSelectTool={selectTool}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}

        {currentView === 'tool' && (
          <div className="animate-in fade-in duration-150">
            <ToolDetailPage
              tool={activeTool}
              onNavigateHome={navigateToHome}
              onNavigateCategory={navigateToCategory}
              onSelectTool={selectTool}
              isFavorite={favorites.includes(activeTool.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectTool={selectTool}
        onSelectCategory={navigateToCategory}
        onNavigateHome={navigateToHome}
      />

      {/* Quick Search Modal (⌘K) */}
      <ToolSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={selectTool}
      />

      {/* Saved Favorites Drawer/Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onSelectTool={selectTool}
        onToggleFavorite={handleToggleFavorite}
        onClearFavorites={handleClearFavorites}
      />
    </div>
  );
}
