const RECENTS_KEY = 'toolnova_recents_v1';
const FAVORITES_KEY = 'toolnova_favorites_v1';

export const getRecentTools = (): string[] => {
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    return raw ? JSON.parse(raw) : ['image-compressor', 'qr-generator'];
  } catch {
    return ['image-compressor', 'qr-generator'];
  }
};

export const addRecentTool = (toolId: string) => {
  try {
    const recents = getRecentTools().filter((id) => id !== toolId);
    recents.unshift(toolId);
    // Keep top 6
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents.slice(0, 6)));
  } catch {
    // ignore
  }
};

export const getFavoriteTools = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['image-compressor', 'qr-generator'];
  } catch {
    return ['image-compressor', 'qr-generator'];
  }
};

export const getFavorites = getFavoriteTools;

export const toggleFavoriteStorage = (toolId: string): string[] => {
  try {
    const current = getFavoriteTools();
    const exists = current.includes(toolId);
    const updated = exists ? current.filter((id) => id !== toolId) : [...current, toolId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getFavoriteTools();
  }
};

export const toggleFavoriteTool = (toolId: string): boolean => {
  const updated = toggleFavoriteStorage(toolId);
  return updated.includes(toolId);
};

export const clearFavoritesStorage = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch {
    // ignore
  }
};
