import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

interface AppErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class AppErrorBoundary extends Component<any, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false, message: 'Something went wrong while loading ToolNova.' };

  static getDerivedStateFromError(error: unknown): AppErrorBoundaryState {
    const message = error instanceof Error && error.message ? error.message : 'Something went wrong while loading ToolNova.';
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error('[ToolNova] Unhandled application error', error, errorInfo);
  }

  handleReload = () => window.location.reload();

  handleHome = () => {
    window.location.hash = '#home';
    (this as unknown as { setState: (nextState: AppErrorBoundaryState) => void }).setState({ hasError: false, message: '' });
  };

  render() {
    const props = (this as unknown as { props: { children?: ReactNode } }).props;
    if (!this.state.hasError) return props.children;

    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16 font-sans text-slate-800">
        <section className="mx-auto flex max-w-xl flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-700" aria-hidden="true">
            <AlertTriangle className="size-7" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">ToolNova</p>
            <h1 className="text-2xl font-bold text-slate-900">We hit a snag</h1>
            <p className="text-sm leading-6 text-slate-600">{this.state.message}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={this.handleReload} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              <RotateCcw className="size-4" /> Reload
            </button>
            <button type="button" onClick={this.handleHome} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Home className="size-4" /> Back to Home
            </button>
          </div>
        </section>
      </main>
    );
  }
}
