export type ToolCategory = 'image' | 'pdf' | 'ai' | 'design';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  accentColor: string;
  badgeBg: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  shortDescription: string;
  fullDescription: string;
  badge?: 'Popular' | 'New' | 'Fast' | 'AI';
  iconName: string;
  supportedFormats: string[];
  keywords: string[];
  howItWorks: {
    step: number;
    title: string;
    desc: string;
  }[];
  features: string[];
  faq: {
    q: string;
    a: string;
  }[];
  relatedToolIds: string[];
}
