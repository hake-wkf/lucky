import React, { useState } from 'react';
import { FORTUNE_CARDS } from '../../data/cards';
import { FortuneCard, DimensionScores } from '../../types';
import { Sparkles, Sun, Droplet, Mountain, Flame, Moon, Trees, Crown, RotateCcw } from 'lucide-react';

interface TarotDrawProps {
  onComplete: (selectedCards: FortuneCard[], scores: DimensionScores) => void;
}

export const TarotDraw: React.FC<TarotDrawProps> = ({ onComplete }) => {
  const [deck] = useState<FortuneCard[]>(() => [...FORTUNE_CARDS].sort(() => Math.random() - 0.5));
  const [selectedCards, setSelectedCards] = useState<FortuneCard[]>([]);

  const handlePickCard = (card: FortuneCard) => {
    if (selectedCards.find((c) => c.id === card.id)) return;
    if (selectedCards.length >= 3) return;

    setSelectedCards((prev) => [...prev, card]);
  };

  const handleFinish = () => {
    if (selectedCards.length < 3) return;

    // Calculate score boost based on selected cards
    let career = 82;
    let wealth = 85;
    let love = 80;
    let health = 82;
    let serendipity = 82;

    selectedCards.forEach((c) => {
      if (c.element === '木') {
        career += 8;
        wealth += 6;
      }
      if (c.element === '火') {
        wealth += 9;
        serendipity += 8;
      }
      if (c.element === '土') {
        wealth += 10;
        health += 6;
      }
      if (c.element === '金') {
        wealth += 12;
        career += 6;
      }
      if (c.element === '水') {
        love += 8;
        serendipity += 9;
      }
    });

    onComplete(selectedCards, {
      career: Math.min(99, career),
      wealth: Math.min(99, wealth),
      love: Math.min(99, love),
      health: Math.min(99, health),
      serendipity: Math.min(99, serendipity),
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-400" />;
      case 'Droplet':
        return <Droplet className="w-6 h-6 text-blue-400" />;
      case 'Mountain':
        return <Mountain className="w-6 h-6 text-emerald-400" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-red-400" />;
      case 'Moon':
        return <Moon className="w-6 h-6 text-indigo-400" />;
      case 'Trees':
        return <Trees className="w-6 h-6 text-green-400" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-pink-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-yellow-400" />;
    }
  };

  const cardPositions = ['① 本金与财基', '② 投资/交易拐点', '③ 财富与指引灵感'];

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          财运灵感牌阵测算
        </span>
        <h2 className="text-2xl font-bold text-indigo-100 mt-2">直觉财运灵感抽卡模式</h2>
        <p className="text-xs text-indigo-300/70 mt-1">
          屏息静心，在下方牌堆中凭第一直觉抽取 3 张旺财牌卡（已选 {selectedCards.length} / 3）
        </p>
      </div>

      {/* Selected Cards Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[0, 1, 2].map((slotIndex) => {
          const card = selectedCards[slotIndex];
          return (
            <div
              key={slotIndex}
              className={`h-56 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden ${
                card
                  ? 'border-indigo-500/60 bg-[#080812] shadow-[0_0_20px_rgba(79,70,229,0.25)]'
                  : 'border-indigo-500/20 bg-[#050508] text-indigo-400/50'
              }`}
            >
              <span className="absolute top-2.5 left-3 text-[10px] font-mono text-indigo-300 uppercase tracking-wider">
                {cardPositions[slotIndex]}
              </span>

              {card ? (
                <div className="flex flex-col items-center text-center animate-fade-in mt-3">
                  <div className="p-3 rounded-2xl bg-[#0d0d1a] border border-indigo-500/30 mb-2">
                    {getIcon(card.iconName)}
                  </div>
                  <h4 className="text-base font-bold text-amber-300">{card.name}</h4>
                  <span className="text-xs text-indigo-200 font-medium mb-1">{card.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                    {card.element}行 · {card.keyword}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center text-indigo-400/60">
                  <Sparkles className="w-8 h-8 mb-2 opacity-40 animate-pulse" />
                  <span className="text-xs">点击下方灵感牌放入</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Face-Down Deck */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-indigo-300/70 mb-3 text-center uppercase tracking-wider">
          可选旺财灵感牌堆 ({deck.length}张)
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {deck.map((card) => {
            const isPicked = selectedCards.some((c) => c.id === card.id);
            return (
              <button
                key={card.id}
                onClick={() => handlePickCard(card)}
                disabled={isPicked || selectedCards.length >= 3}
                className={`h-24 rounded-lg border transition-all flex flex-col items-center justify-center p-2 relative group cursor-pointer ${
                  isPicked
                    ? 'opacity-30 border-indigo-900 bg-[#050508] pointer-events-none'
                    : 'bg-gradient-to-br from-[#080812] via-indigo-950 to-[#050508] border-indigo-500/30 hover:border-amber-400/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30'
                }`}
              >
                <div className="w-8 h-8 rounded-full border border-indigo-400/30 flex items-center justify-center bg-[#050508] group-hover:border-amber-400">
                  <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-amber-400" />
                </div>
                <span className="text-[10px] text-indigo-300/70 mt-1 font-mono">
                  {isPicked ? '已选' : '抽取'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-indigo-500/20">
        <button
          onClick={() => setSelectedCards([])}
          disabled={selectedCards.length === 0}
          className="px-4 py-2 text-xs font-semibold rounded-lg text-indigo-300/70 hover:text-indigo-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 重选牌卡
        </button>

        <button
          onClick={handleFinish}
          disabled={selectedCards.length < 3}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-white/20 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider"
        >
          解牌并生成财运深度报告 <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
