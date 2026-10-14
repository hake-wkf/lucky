import React, { useState } from 'react';
import { LuckReport } from '../types';
import { RadarChart } from './RadarChart';
import { HourlyChart } from './HourlyChart';
import {
  Sparkles,
  Briefcase,
  TrendingUp,
  Heart,
  Activity,
  Compass,
  CheckCircle2,
  XCircle,
  Share2,
  Copy,
  Printer,
  RotateCcw,
  Check,
  DollarSign,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface ReportViewProps {
  report: LuckReport;
  onRetest: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onRetest }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'elements' | 'action' | 'export'>('overview');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'overview' as const, label: '气运灵球与五维雷达', icon: Sparkles },
    { id: 'details' as const, label: '财运投资与各领域拆解', icon: TrendingUp },
    { id: 'elements' as const, label: '财位与开运理财元素', icon: Compass },
    { id: 'action' as const, label: '买卖战术与保运仪式', icon: CheckCircle2 },
    { id: 'export' as const, label: '生成专属战术卡片', icon: Share2 },
  ];

  const handleCopyText = () => {
    const text = `【${report.userProfile.name} 的专属财运与投资运势深度解盘】\n运势等级：${report.luckTier} (${report.overallScore}分)\n总评：${report.summary}\n\n幸运颜色：${report.luckyElements.color.name}\n吉利财位：${report.luckyElements.direction}\n高光交易窗口：${report.luckyElements.timeSlot}\n\n理财/投资宜做：\n${report.actionableAdvice.dos.map((d) => `• ${d}`).join('\n')}\n\n理财防坑避忌：\n${report.actionableAdvice.donts.map((d) => `• ${d}`).join('\n')}\n\n心态调适：${report.actionableAdvice.mindsetTip}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Top Banner & Immersive Luck Orb Hero Section */}
      <div className="bg-[#080812] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)]">
        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Luck Orb Component (Immersive UI Signature) */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950/40 to-transparent rounded-3xl border border-indigo-500/20 p-6 relative w-full lg:w-80 shrink-0">
            <span className="text-xs text-indigo-400 tracking-widest uppercase mb-4 font-mono">
              ✦ 您的实时运势与财运指数 ✦
            </span>

            {/* The Orb */}
            <div className="w-56 h-56 rounded-full bg-[#0a0a1f] border-2 border-indigo-500/50 shadow-[0_0_80px_rgba(79,70,229,0.35)] flex items-center justify-center relative my-2">
              <div className="absolute inset-3 rounded-full border border-dashed border-indigo-400/40 animate-spin-slow" />
              <div className="flex flex-col items-center z-10">
                <span className="text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] font-mono">
                  {report.overallScore}
                </span>
                <span className="text-sm font-extrabold text-amber-400 uppercase tracking-widest mt-1">
                  {report.luckTier.split('·')[0] || '大吉'}
                </span>
              </div>
            </div>

            <span className="text-[11px] text-indigo-300/70 mt-3 font-mono">
              检测时刻: {report.timestamp}
            </span>
          </div>

          {/* Right: Summary & Financial Insights */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#0d0d1a] border border-indigo-500/30 text-indigo-200">
                测算使用者：{report.userProfile.name || '使用者'} ({report.userProfile.zodiac})
              </span>
              {report.isAI && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> AI 深度解盘
                </span>
              )}
            </div>

            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/40 text-amber-300 font-bold text-base tracking-wider mb-2">
                {report.luckTier}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 leading-snug">
                “{report.summary}”
              </h2>
            </div>

            <p className="text-xs text-indigo-300/70 italic bg-indigo-950/30 p-3 rounded-xl border border-indigo-500/20">
              “{report.quote}”
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-[#0d0d1a] border border-indigo-500/20 p-3 rounded-xl text-center">
                <span className="text-[10px] text-indigo-400 block font-semibold">财富与理财</span>
                <span className="text-lg font-mono font-bold text-emerald-400">{report.dimensionScores.wealth}分</span>
              </div>
              <div className="bg-[#0d0d1a] border border-indigo-500/20 p-3 rounded-xl text-center">
                <span className="text-[10px] text-indigo-400 block font-semibold">商业与事业</span>
                <span className="text-lg font-mono font-bold text-amber-400">{report.dimensionScores.career}分</span>
              </div>
              <div className="bg-[#0d0d1a] border border-indigo-500/20 p-3 rounded-xl text-center">
                <span className="text-[10px] text-indigo-400 block font-semibold">贵人金源</span>
                <span className="text-lg font-mono font-bold text-purple-400">{report.dimensionScores.serendipity}分</span>
              </div>
              <div className="bg-[#0d0d1a] border border-indigo-500/20 p-3 rounded-xl text-center">
                <span className="text-[10px] text-indigo-400 block font-semibold">吉利财位</span>
                <span className="text-xs font-bold text-amber-300 block truncate mt-1">{report.luckyElements.direction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Retest Controls */}
        <div className="mt-6 pt-4 border-t border-indigo-500/20 flex items-center justify-between text-xs text-indigo-300/70">
          <span className="font-mono">系统状态: 密文安全加密模式 (Encrypted)</span>
          <button
            onClick={onRetest}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(79,70,229,0.4)] border border-white/20 flex items-center gap-1.5 cursor-pointer transition-all uppercase tracking-wider"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 重新感应气运
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center bg-[#080812] p-1.5 rounded-2xl border border-indigo-500/20 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-white/20'
                  : 'text-indigo-300/70 hover:text-indigo-100 hover:bg-indigo-950/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & RADAR & HOURLY */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 5D Radar Box */}
            <div className="bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-6 flex flex-col items-center justify-center">
              <h3 className="text-sm font-bold text-indigo-200 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                五维气场能量分布雷达 (包含财富与商机)
              </h3>
              <RadarChart scores={report.dimensionScores} size={290} />
            </div>

            {/* Quick Dimension Breakdown List */}
            <div className="bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-indigo-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                各维度当前能量状态
              </h3>

              <div className="space-y-3">
                {[
                  { label: '财富/理财与投资', score: report.dimensionScores.wealth, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400' },
                  { label: '商业/事业与签单', score: report.dimensionScores.career, icon: Briefcase, color: 'text-amber-400', bg: 'bg-amber-400' },
                  { label: '贵人相助与金源', score: report.dimensionScores.serendipity, icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-400' },
                  { label: '决策头脑与精力', score: report.dimensionScores.health, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400' },
                  { label: '人际与和气生财', score: report.dimensionScores.love, icon: Heart, color: 'text-pink-400', bg: 'bg-pink-400' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-[#050508] border border-indigo-500/10 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-28 bg-indigo-950/60 rounded-full h-2 overflow-hidden border border-indigo-500/20">
                          <div className={`h-full ${item.bg}`} style={{ width: `${item.score}%` }} />
                        </div>
                        <span className={`text-xs font-mono font-bold ${item.color}`}>{item.score}分</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 24-Hour Luck Rhythm Chart */}
          <HourlyChart forecast={report.hourlyForecast} />
        </div>
      )}

      {/* TAB 2: DETAILED ANALYSIS */}
      {activeTab === 'details' && (
        <div className="space-y-4">
          {[
            {
              title: '正财与偏财/投资深度解析',
              icon: TrendingUp,
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
              score: report.dimensionScores.wealth,
              content: report.detailedAnalysis.wealthDetail,
            },
            {
              title: '商业洽谈、薪酬与事业签单',
              icon: Briefcase,
              color: 'text-amber-400',
              border: 'border-amber-500/30',
              score: report.dimensionScores.career,
              content: report.detailedAnalysis.careerDetail,
            },
            {
              title: '贵人金源与冷门商业灵感',
              icon: Sparkles,
              color: 'text-purple-400',
              border: 'border-purple-500/30',
              score: report.dimensionScores.serendipity,
              content: report.detailedAnalysis.serendipityDetail,
            },
            {
              title: '和气生财与商业人脉气场',
              icon: Heart,
              color: 'text-pink-400',
              border: 'border-pink-500/30',
              score: report.dimensionScores.love,
              content: report.detailedAnalysis.loveDetail,
            },
            {
              title: '盯盘决策头脑与精力调适',
              icon: Activity,
              color: 'text-blue-400',
              border: 'border-blue-500/30',
              score: report.dimensionScores.health,
              content: report.detailedAnalysis.healthDetail,
            },
          ].map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className={`bg-[#0d0d1a] border ${sec.border} rounded-2xl p-6 backdrop-blur-md hover:border-indigo-500/50 transition-all`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${sec.color}`} />
                    {sec.title}
                  </h3>
                  <span className={`text-sm font-mono font-bold ${sec.color}`}>
                    {sec.score} 分
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: LUCKY ELEMENTS */}
      {activeTab === 'elements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Color */}
          <div className="bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs text-indigo-400 font-semibold block mb-2">🎨 今日旺财开运主色调</span>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl border border-indigo-500/40 shadow-md"
                  style={{ backgroundColor: report.luckyElements.color.hex || '#F59E0B' }}
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{report.luckyElements.color.name}</h4>
                  <span className="text-[10px] font-mono text-indigo-300">{report.luckyElements.color.hex}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-normal">{report.luckyElements.color.description}</p>
            </div>
          </div>

          {/* Direction */}
          <div className="bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-5">
            <span className="text-xs text-indigo-400 font-semibold block mb-2">🧭 今日大吉财位与纳气方向</span>
            <div className="text-2xl font-bold text-amber-300 my-2">{report.luckyElements.direction}</div>
            <p className="text-xs text-slate-400">将办公/看盘电脑面向此方位，或向此方向出行洽谈商业议题</p>
          </div>

          {/* Time Slot */}
          <div className="bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-5">
            <span className="text-xs text-indigo-400 font-semibold block mb-2">⏰ 最佳投资/交易/买卖高光窗口</span>
            <div className="text-xl font-bold font-mono text-emerald-400 my-2">{report.luckyElements.timeSlot}</div>
            <p className="text-xs text-slate-400">安排核心商务谈判、买卖择时或资金调配的最佳高能时段</p>
          </div>

          {/* Numbers */}
          <div className="bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-5">
            <span className="text-xs text-indigo-400 font-semibold block mb-2">🔢 旺财吉利数字</span>
            <div className="flex gap-2 my-3">
              {report.luckyElements.numbers.map((n, i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-xl bg-[#050508] border border-amber-500/40 text-amber-300 font-mono font-bold text-lg flex items-center justify-center shadow-md"
                >
                  {n}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">理财组合挂单、交易尾数或重要密码可优先选用</p>
          </div>

          {/* Gem / Item */}
          <div className="bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-5">
            <span className="text-xs text-indigo-400 font-semibold block mb-2">💎 开运随身聚财信物</span>
            <div className="text-sm font-bold text-purple-300 my-2">{report.luckyElements.gemOrItem}</div>
            <p className="text-xs text-slate-400">随身携带或置于看盘案头，稳定磁场，防范财气外泄</p>
          </div>

          {/* Food & Drink */}
          <div className="bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-5">
            <span className="text-xs text-indigo-400 font-semibold block mb-2">🍵 凝神聚财饮食建议</span>
            <div className="text-sm font-bold text-sky-300 my-2">{report.luckyElements.foodOrDrink}</div>
            <p className="text-xs text-slate-400">温润脾胃，舒缓交易紧绷神经，保持大脑清醒理性</p>
          </div>
        </div>
      )}

      {/* TAB 4: ACTIONABLE ADVICE */}
      {activeTab === 'action' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DOS */}
            <div className="bg-[#0d0d1a] border border-emerald-500/30 rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                理财/投资宜做 (Financial Dos)
              </h3>
              <ul className="space-y-2.5">
                {report.actionableAdvice.dos.map((item, idx) => (
                  <li key={idx} className="bg-[#050508] border border-indigo-500/10 rounded-xl p-3 text-xs text-slate-200 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONTS */}
            <div className="bg-[#0d0d1a] border border-rose-500/30 rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                财务防坑避忌 (Financial Donts)
              </h3>
              <ul className="space-y-2.5">
                {report.actionableAdvice.donts.map((item, idx) => (
                  <li key={idx} className="bg-[#050508] border border-indigo-500/10 rounded-xl p-3 text-xs text-slate-200 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mindset & Mini Ritual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mindset */}
            <div className="bg-[#0d0d1a] border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                投资者心态调适与纪律法则
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#050508] p-4 rounded-xl border border-indigo-500/20 italic">
                “{report.actionableAdvice.mindsetTip}”
              </p>
            </div>

            {/* Mini Ritual */}
            <div className="bg-[#0d0d1a] border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-indigo-300 mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                简易聚财/稳定气场小仪式
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#050508] p-4 rounded-xl border border-indigo-500/20">
                {report.actionableAdvice.miniRitual}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EXPORT & SHARE CARD */}
      {activeTab === 'export' && (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-full max-w-md bg-[#080812] border-2 border-indigo-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(79,70,229,0.25)] relative overflow-hidden print:border-amber-600 print:text-black">
            {/* Card Watermark */}
            <div className="text-center space-y-3 relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">
                ✦ FORTUNE & INVESTMENT LAB ✦
              </span>
              <h3 className="text-2xl font-black text-amber-300">{report.luckTier}</h3>
              <div className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                {report.overallScore} <span className="text-sm text-indigo-300/70 font-normal">/ 100分</span>
              </div>

              <div className="bg-[#050508] border border-indigo-500/20 rounded-xl p-3 text-xs text-slate-200 leading-relaxed">
                “{report.summary}”
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] pt-2">
                <div className="bg-[#050508] p-2 rounded-lg border border-indigo-500/20">
                  <span className="text-indigo-400 block text-[10px]">旺财主色</span>
                  <span className="font-bold text-amber-300">{report.luckyElements.color.name}</span>
                </div>
                <div className="bg-[#050508] p-2 rounded-lg border border-indigo-500/20">
                  <span className="text-indigo-400 block text-[10px]">吉利财位</span>
                  <span className="font-bold text-emerald-300">{report.luckyElements.direction}</span>
                </div>
                <div className="bg-[#050508] p-2 rounded-lg border border-indigo-500/20">
                  <span className="text-indigo-400 block text-[10px]">高光时段</span>
                  <span className="font-bold text-sky-300">{report.luckyElements.timeSlot}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-500/20 flex items-center justify-between text-[10px] text-indigo-300/60">
                <span>测试者：{report.userProfile.name || '使用者'}</span>
                <span>{report.timestamp}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyText}
              className="px-5 py-2.5 bg-[#0d0d1a] hover:bg-indigo-950/60 text-indigo-200 font-bold text-xs rounded-xl border border-indigo-500/30 flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? '已复制财运战术文本' : '复制财运战术文本'}
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-white/20"
            >
              <Printer className="w-4 h-4" /> 打印 / 保存 PDF 报告
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
