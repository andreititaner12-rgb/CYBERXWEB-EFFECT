import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CyberX Web App Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0e0e18] border border-[#E32124]/40 shadow-[0_0_40px_rgba(227,33,36,0.25)] space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#E32124]/10 border border-[#E32124]/30 flex items-center justify-center mx-auto text-[#E32124]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-display font-black uppercase text-white tracking-wider">
                СБОЙ СЕССИИ // CYBERX CLIENT
              </h2>
              <p className="text-xs text-zinc-400 mt-2 font-normal leading-relaxed">
                Произошла ошибка при загрузке компонентов. Вы можете перезагрузить сессию или сбросить временный кэш.
              </p>
              {this.state.error?.message && (
                <div className="mt-3 p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] text-zinc-400 text-left font-mono truncate">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-[#E32124] hover:bg-[#FF2A2E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Перезагрузить</span>
              </button>

              <button
                onClick={this.handleResetStorage}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-white/10"
              >
                Сброс кэша
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
