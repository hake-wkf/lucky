import React from 'react';
import { LuckReport } from '../types';
import { X, Trash2, ArrowUpRight, Sparkles, History } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reports: LuckReport[];
  onSelectReport: (report: LuckReport) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  reports,
  onSelectReport,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 shadow-2xl flex flex-col justify-between animate-slide-left">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">测算历史与走势对比</h3>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of saved reports */}
          {reports.length === 0 ? (
            <div className="text-center py-16 text-slate-500 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto opacity-30 animate-pulse" />
              <p className="text-xs">暂无历史测算记录，快去完成一次运势测试吧！</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => {
                    onSelectReport(rep);
                    onClose();
                  }}
                  className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="space-y-1 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-300">{rep.luckTier}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {rep.testMode}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-1">{rep.summary}</p>

                    <span className="text-[10px] font-mono text-slate-500 block">{rep.timestamp}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-amber-400">{rep.overallScore}</div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 ml-auto transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Button */}
        {reports.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onClearHistory}
              className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl border border-rose-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> 清空所有历史记录
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
