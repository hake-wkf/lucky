import React, { useState } from 'react';
import { DimensionScores } from '../../types';
import { Dices, Sparkles, RotateCcw } from 'lucide-react';

interface CoinTossProps {
  onComplete: (diceResults: any[], scores: DimensionScores) => void;
}

export const CoinToss: React.FC<CoinTossProps> = ({ onComplete }) => {
  const [tosses, setTosses] = useState<Array<{ coins: number[]; sum: number; lineType: string }>>([]);
  const [isTossing, setIsTossing] = useState(false);
  const [currentCoins, setCurrentCoins] = useState<number[]>([1, 1, 1]); // 1=Heads(阳), 0=Tails(阴)

  const lineNames = [
    '初爻 (本金基业)',
    '二爻 (人和合作)',
    '三爻 (变局动爻)',
    '四爻 (进阶增值)',
    '五爻 (财帛尊位)',
    '上爻 (极定落袋)',
  ];

  const handleToss = () => {
    if (tosses.length >= 6 || isTossing) return;

    setIsTossing(true);

    let frames = 0;
    const interval = setInterval(() => {
      setCurrentCoins([
        Math.random() > 0.5 ? 1 : 0,
        Math.random() > 0.5 ? 1 : 0,
        Math.random() > 0.5 ? 1 : 0,
      ]);
      frames++;

      if (frames >= 12) {
        clearInterval(interval);
        setIsTossing(false);

        const finalCoins = [
          Math.random() > 0.5 ? 1 : 0,
          Math.random() > 0.5 ? 1 : 0,
          Math.random() > 0.5 ? 1 : 0,
        ];
        const sum = finalCoins.reduce((a, b) => a + b, 0);

        let lineType = '老阳 (变线)';
        if (sum === 3) lineType = '老阳 (偏财动爻)';
        else if (sum === 2) lineType = '少阴 (正财静爻)';
        else if (sum === 1) lineType = '少阳 (稳健静爻)';
        else if (sum === 0) lineType = '老阴 (风控动爻)';

        setCurrentCoins(finalCoins);
        setTosses((prev) => [...prev, { coins: finalCoins, sum, lineType }]);
      }
    }, 60);
  };

  const handleFinish = () => {
    if (tosses.length < 6) return;

    const totalSum = tosses.reduce((acc, curr) => acc + curr.sum, 0); // 0..18
    // Calculate luck scores
    const baseScore = 72 + Math.round((totalSum / 18) * 25);

    onComplete(tosses, {
      wealth: Math.min(99, baseScore + 6),
      career: Math.min(98, baseScore + 2),
      love: Math.min(98, baseScore - 2 + (totalSum % 4)),
      health: Math.min(98, baseScore + 1),
      serendipity: Math.min(98, baseScore + 4),
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
          <Dices className="w-3.5 h-3.5 text-emerald-400" />
          经典六爻金钱卦 / 财运变数摇测
        </span>
        <h2 className="text-2xl font-bold text-indigo-100 mt-2">六爻财运阴阳变数摇测</h2>
        <p className="text-xs text-indigo-300/70 mt-1">
          连续摇掷 3 枚开运金币共 6 次（已摇掷 {tosses.length} / 6 次），推演财富卦象与行情变数
        </p>
      </div>

      {/* Coin Motion Stage */}
      <div className="bg-[#050508] border border-indigo-500/20 rounded-2xl p-6 mb-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex gap-6 mb-4">
          {currentCoins.map((val, idx) => (
            <div
              key={idx}
              className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-xl transition-transform duration-200 ${
                isTossing ? 'animate-bounce border-amber-400 bg-amber-500/20' : ''
              } ${
                val === 1
                  ? 'border-amber-400 bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-amber-500/30'
                  : 'border-indigo-500/40 bg-[#080812] text-indigo-200'
              }`}
            >
              {val === 1 ? '阳 (字)' : '阴 (花)'}
            </div>
          ))}
        </div>

        <button
          onClick={handleToss}
          disabled={isTossing || tosses.length >= 6}
          className="px-6 py-2.5 bg-[#0d0d1a] hover:bg-indigo-950/60 border border-indigo-500/30 text-amber-300 font-semibold text-xs rounded-xl disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Dices className={`w-4 h-4 ${isTossing ? 'animate-spin' : ''}`} />
          {isTossing ? '正在摇动开运金币...' : tosses.length >= 6 ? '已完成6爻摇掷' : '摇掷第 ' + (tosses.length + 1) + ' 爻'}
        </button>
      </div>

      {/* Hexagram Lines Display */}
      <div className="bg-[#050508] border border-indigo-500/20 rounded-xl p-4 mb-6">
        <h3 className="text-xs font-semibold text-indigo-300/70 mb-3 uppercase tracking-wider">财富卦象排盘 (自下而上)</h3>

        <div className="space-y-2 flex flex-col-reverse">
          {lineNames.map((name, idx) => {
            const toss = tosses[idx];
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-all ${
                  toss
                    ? 'bg-[#0d0d1a] border-indigo-500/40 text-indigo-100'
                    : 'bg-[#080812] border-indigo-500/10 text-indigo-400/40'
                }`}
              >
                <span className="font-mono">{name}</span>

                {toss ? (
                  <div className="flex items-center gap-3">
                    {/* Line graphic representation */}
                    <div className="flex gap-1 items-center">
                      {toss.sum % 2 === 1 ? (
                        <div className="w-16 h-2 bg-amber-400 rounded-xs" />
                      ) : (
                        <div className="flex gap-2">
                          <div className="w-7 h-2 bg-indigo-500 rounded-xs" />
                          <div className="w-7 h-2 bg-indigo-500 rounded-xs" />
                        </div>
                      )}
                    </div>
                    <span className="font-mono font-bold text-amber-300">{toss.lineType}</span>
                  </div>
                ) : (
                  <span className="text-indigo-400/40 font-mono">待摇掷</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-indigo-500/20">
        <button
          onClick={() => setTosses([])}
          disabled={tosses.length === 0}
          className="px-4 py-2 text-xs font-semibold rounded-lg text-indigo-300/70 hover:text-indigo-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 清空重新摇签
        </button>

        <button
          onClick={handleFinish}
          disabled={tosses.length < 6}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-white/20 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider"
        >
          解卦生成财运报告 <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
