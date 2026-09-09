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
import { Download, RefreshCw, CheckCircle2 } from 'lucide-react';

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

const DefaultWorkspace: React.FC<{ tool: ToolItem }> = ({ tool }) => {
  const [fileLoaded, setFileLoaded] = React.useState(false);
  const [processed, setProcessed] = React.useState(false);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      {!fileLoaded ? (
        <UploadBox
          onFileSelect={() => {
            setFileLoaded(true);
            setTimeout(() => setProcessed(true), 600);
          }}
          onLoadSample={() => {
            setFileLoaded(true);
            setTimeout(() => setProcessed(true), 600);
          }}
          title={`Upload file for ${tool.name}`}
          subtitle="Fast local client-side processing directly in your browser"
          sampleButtonLabel="Try with Sample Data"
        />
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">Processing Completed</h4>
            <p className="text-xs text-slate-500">Your output file is ready for download.</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setFileLoaded(false);
                setProcessed(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Start Again
            </button>

            <button
              type="button"
              onClick={() => alert(`Downloaded output for ${tool.name}`)}
              disabled={!processed}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Result</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
