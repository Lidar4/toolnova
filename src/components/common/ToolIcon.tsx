import React from 'react';
import {
  Image,
  FileText,
  Sparkles,
  LayoutTemplate,
  Minimize2,
  Scaling,
  FileType2,
  RefreshCw,
  Scissors,
  Combine,
  FileImage,
  Files,
  MessageSquareText,
  FileSearch,
  PenTool,
  QrCode,
  Tv,
  Share2,
  HelpCircle,
  LucideProps,
} from 'lucide-react';

interface ToolIconProps extends LucideProps {
  name: string;
  className?: string;
}

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  Image,
  FileText,
  Sparkles,
  LayoutTemplate,
  Minimize2,
  Scaling,
  FileType2,
  RefreshCw,
  Scissors,
  Combine,
  FileImage,
  Files,
  MessageSquareText,
  FileSearch,
  PenTool,
  QrCode,
  Tv,
  Share2,
};

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = 'w-5 h-5', ...props }) => {
  const Component = ICON_MAP[name] || HelpCircle;
  return <Component className={className} {...props} />;
};
