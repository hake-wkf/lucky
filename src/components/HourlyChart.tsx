import React from 'react';
import { HourlyPoint } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface HourlyChartProps {
  forecast: HourlyPoint[];
}

export const HourlyChart: React.FC<HourlyChartProps> = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const maxScore = 100;

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            24小时运势波动与时段避坑图
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">精准掌握全天能量高光时刻，合理安排要事与休息</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {forecast.map((pt, idx) => {
          const heightPercent = Math.max(20, (pt.score / maxScore) * 100);
          
          let barBg = 'bg-gradient-to-t from-slate-700 to-amber-500';
          let textColor = 'text-amber-400';
          if (pt.score >= 88) {
            barBg = 'bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-300';
            textColor = 'text-yellow-300';
          } else if (pt.score < 75) {
            barBg = 'bg-gradient-to-t from-slate-700 to-indigo-500';
            textColor = 'text-indigo-300';
          }

          return (
            <div
              key={idx}
              className="flex flex-col justify-between bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 hover:border-amber-500/40 transition-all group"
            >
              {/* Header: Hour & Trend */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-slate-300 font-semibold">{pt.hour}</span>
                <span className="flex items-center">
                  {pt.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                  {pt.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
                  {pt.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
                </span>
              </div>

              {/* Bar Visual */}
              <div className="h-20 w-full bg-slate-950/60 rounded-lg p-1 flex items-end justify-center relative overflow-hidden mb-2">
                <div
                  className={`w-full rounded-md ${barBg} transition-all duration-700 ease-out group-hover:brightness-110`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className={`absolute bottom-1 font-mono text-xs font-bold ${textColor} drop-shadow`}>
                  {pt.score}分
                </span>
              </div>

              {/* Hourly Advice */}
              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 title={pt.advice}">
                {pt.advice}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
