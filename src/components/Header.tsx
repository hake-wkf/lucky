import React from 'react';
import { LuckTestMode, UserProfile } from '../types';
import { Sparkles, Dices, Layers, Activity, History, User, DollarSign } from 'lucide-react';

interface HeaderProps {
  activeMode: LuckTestMode;
  onSelectMode: (mode: LuckTestMode) => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  onSelectMode,
  userProfile,
  onOpenProfile,
  onOpenHistory,
  historyCount,
}) => {
  const modes = [
    { id: 'today_luck' as const, name: '📅 今日财运推演', icon: Sparkles },
    { id: 'tarot' as const, name: '财运灵感卡', icon: Layers },
    { id: 'coins' as const, name: '六爻金钱卦', icon: Dices },
    { id: 'decision_lab' as const, name: '100次财运实验室', icon: Activity },
  ];

  return (
    <header className="w-full bg-[#080812] border-b border-indigo-500/20 sticky top-0 z-40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] shrink-0">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-widest text-indigo-100">
                财运与运气分析实验室
              </h1>
              <span className="text-[10px] font-mono text-indigo-400/60 uppercase tracking-wider">
                Fortune Lab v2.4
              </span>
            </div>
            <p className="text-[11px] text-indigo-300/70">
              侧重正财偏财 · 投资择时波段 · 全维战术分析
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center bg-[#050508] p-1 rounded-xl border border-indigo-500/20 overflow-x-auto max-w-full">
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onSelectMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] border border-white/20'
                    : 'text-indigo-300/70 hover:text-indigo-100 hover:bg-indigo-950/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {m.name}
              </button>
            );
          })}
        </div>

        {/* Cosmic Strength Badge & User Buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/30 items-center gap-1.5">
            <span>当前星象财运强度:</span>
            <span className="font-mono font-bold text-emerald-400">High (92%)</span>
          </div>

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d0d1a] hover:bg-indigo-950/60 border border-indigo-500/30 text-xs font-medium text-indigo-200 transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>{userProfile.name || '个人档案'}</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d0d1a] hover:bg-indigo-950/60 border border-indigo-500/30 text-xs font-medium text-indigo-200 transition-all cursor-pointer relative"
          >
            <History className="w-3.5 h-3.5 text-indigo-400" />
            <span>历史报告</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold font-mono flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
