import React, { useState } from 'react';
import { UserProfile, DimensionScores } from '../../types';
import { Sparkles, DollarSign, TrendingUp, Briefcase, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';

interface TodayLuckCalculatorProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onCalculateTodayLuck: (scores: DimensionScores, focusTopic: string) => void;
}

export const TodayLuckCalculator: React.FC<TodayLuckCalculatorProps> = ({
  userProfile,
  onUpdateProfile,
  onCalculateTodayLuck,
}) => {
  const [selectedFocus, setSelectedFocus] = useState<string>(userProfile.focusTopic || '综合财运与正偏财收益');
  const [nameInput, setNameInput] = useState(userProfile.name || '使用者');
  const [zodiacInput, setZodiacInput] = useState(userProfile.zodiac || '天秤座');

  const todayStr = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const focusOptions = [
    {
      id: '综合财运与正偏财收益',
      label: '💰 综合财运 (正财+偏财)',
      desc: '全方位推演今日赚钱磁场、薪酬、副业红利与理财收益',
      icon: DollarSign,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    },
    {
      id: '股市波段与交易择时',
      label: '📈 股市波段与买卖择时',
      desc: '推演今日大盘走势感应、高光交易窗口与止盈止损心态',
      icon: TrendingUp,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    },
    {
      id: '商务签约与薪酬变现',
      label: '💼 商务签约与薪酬谈判',
      desc: '评估商业合同签署、贵人引资、薪水绩效与业务拓展',
      icon: Briefcase,
      color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
    },
    {
      id: '理财配置与仓位风控',
      label: '🏦 理财配置与防踩坑',
      desc: '锁定固定收益组合、规避高杠杆陷阱与情绪化冲动消费',
      icon: ShieldCheck,
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
    },
  ];

  const handleCalculate = () => {
    // Update profile
    onUpdateProfile({
      ...userProfile,
      name: nameInput.trim() || '使用者',
      zodiac: zodiacInput,
      focusTopic: selectedFocus,
    });

    // Randomize initial base scores tuned around 85-95 for luck calculation
    const baseScore = Math.floor(82 + Math.random() * 14);
    const scores: DimensionScores = {
      wealth: Math.min(99, Math.max(75, baseScore + (selectedFocus.includes('股市') ? 6 : 4))),
      career: Math.min(99, Math.max(75, baseScore + (selectedFocus.includes('商务') ? 6 : 2))),
      love: Math.min(98, Math.max(70, baseScore - 2)),
      health: Math.min(98, Math.max(75, baseScore + 1)),
      serendipity: Math.min(99, Math.max(78, baseScore + 5)),
    };

    onCalculateTodayLuck(scores, selectedFocus);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0d0d1a] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(79,70,229,0.15)] relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header / Date Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#050508] border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{todayStr}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            今日财运与投资运势推演
          </h2>
          <p className="text-xs text-indigo-300/70 max-w-md mx-auto">
            无需复杂问答测试，一键感应今日正财偏财气场、高光交易窗口与转运战术
          </p>
        </div>

        {/* User Quick Info */}
        <div className="bg-[#050508] border border-indigo-500/20 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-indigo-300/80 mb-1">
              测算者称呼
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="请输入您的称呼..."
              className="w-full bg-[#080812] border border-indigo-500/30 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-indigo-400/40 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-indigo-300/80 mb-1">
              星座 / 属性
            </label>
            <select
              value={zodiacInput}
              onChange={(e) => setZodiacInput(e.target.value)}
              className="w-full bg-[#080812] border border-indigo-500/30 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {[
                '白羊座',
                '金牛座',
                '双子座',
                '巨蟹座',
                '狮子座',
                '处女座',
                '天秤座',
                '天蝎座',
                '射手座',
                '摩羯座',
                '水瓶座',
                '双鱼座',
              ].map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Focus Selector */}
        <div>
          <label className="block text-xs font-bold text-indigo-200 mb-2.5">
            请选择今日重点关注的财务领域：
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focusOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedFocus === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFocus(opt.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? `${opt.color} shadow-[0_0_20px_rgba(245,158,11,0.25)] border-amber-400/80`
                      : 'bg-[#050508] border-indigo-500/20 text-indigo-300/70 hover:bg-indigo-950/30 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-[#080812] border border-indigo-500/20 shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{opt.label}</h4>
                    <p className="text-[11px] text-indigo-300/60 mt-1 leading-normal">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Big Action Button */}
        <div className="pt-2 text-center">
          <button
            onClick={handleCalculate}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-sm font-black rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] border border-white/40 cursor-pointer transition-all flex items-center justify-center gap-2 mx-auto uppercase tracking-wider"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            一键推演今日财运与投资择时
            <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-[11px] text-indigo-300/60 block mt-2.5">
            ⚡ 由 Gemini AI 结合金融理财与传统运势模型即时算法生成
          </span>
        </div>
      </div>
    </div>
  );
};
