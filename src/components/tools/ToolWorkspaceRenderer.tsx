import React from 'react';
import { ToolItem } from '../../types/tools';
import { ImageCompressorWorkspace } from './ImageCompressorWorkspace';
import { ImageResizerWorkspace } from './ImageResizerWorkspace';
import { FormatConverterWorkspace } from './FormatConverterWorkspace';
import { BackgroundRemoverWorkspace } from './BackgroundRemoverWorkspace';
import { PdfMergeWorkspace } from './PdfMergeWorkspace';
import { PdfToImageWorkspace } from './PdfToImageWorkspace';
import { ImageToPdfWorkspace } from './ImageToPdfWorkspace';
import { QrGeneratorWorkspace } from './QrGeneratorWorkspace';
import { AiCaptionWorkspace } from './AiCaptionWorkspace';
import { AiSummarizerWorkspace } from './AiSummarizerWorkspace';
import { AiRewriterWorkspace } from './AiRewriterWorkspace';
import { ThumbnailMakerWorkspace } from './ThumbnailMakerWorkspace';
import { SocialImageMakerWorkspace } from './SocialImageMakerWorkspace';
import { UploadBox } from '../common/UploadBox';
import { Info, RefreshCw } from 'lucide-react';

interface ToolWorkspaceRendererProps {
  tool: ToolItem;
}

export const ToolWorkspaceRenderer: React.FC<ToolWorkspaceRendererProps> = ({ tool }) => {
  switch (tool.id) {
    case 'image-compressor':
      return <ImageCompressorWorkspace />;
    case 'image-resizer':
      return <ImageResizerWorkspace />;
    case 'jpg-to-png':
      return <FormatConverterWorkspace mode="jpg-to-png" />;
    case 'png-to-jpg':
      return <FormatConverterWorkspace mode="png-to-jpg" />;
    case 'background-remover':
      return <BackgroundRemoverWorkspace />;
    case 'pdf-merge':
      return <PdfMergeWorkspace />;
    case 'pdf-to-image':
      return <PdfToImageWorkspace />;
    case 'image-to-pdf':
      return <ImageToPdfWorkspace />;
    case 'qr-generator':
      return <QrGeneratorWorkspace />;
    case 'ai-caption-generator':
      return <AiCaptionWorkspace />;
    case 'ai-summarizer':
      return <AiSummarizerWorkspace />;
    case 'ai-rewriter':
      return <AiRewriterWorkspace />;
    case 'youtube-thumbnail-maker':
      return <ThumbnailMakerWorkspace />;
    case 'social-image-maker':
      return <SocialImageMakerWorkspace />;
    default:
      return <DefaultWorkspace tool={tool} />;
  }
};

const DefaultWorkspace: React.FC<{ tool: ToolItem }> = ({ tool }) => (
  <div className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm md:p-8">
    <UploadBox
      onFileSelect={() => undefined}
      title={`Upload file for ${tool.name}`}
      subtitle="This tool is not configured for browser-side processing yet. Choose a supported tool from the Tools page."
      sampleButtonLabel="Browse supported tools"
    />
    <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900" role="status">
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p>This tool is coming soon. No output will be reported until real processing is available.</p>
    </div>
    <button type="button" onClick={() => window.location.hash = '#all-tools'} className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
      <RefreshCw className="size-4" />
      Browse available tools
    </button>
  </div>
);
