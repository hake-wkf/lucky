import React, { useState } from 'react';
import { DECISION_SCENARIOS } from '../../data/questions';
import { DimensionScores } from '../../types';
import { Play, Sparkles, Briefcase, TrendingUp, DollarSign, Award } from 'lucide-react';

interface DecisionLabProps {
  onComplete: (scenarioData: any, scores: DimensionScores) => void;
}

export const DecisionLab: React.FC<DecisionLabProps> = ({ onComplete }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState(DECISION_SCENARIOS[0].id);
  const [customTopic, setCustomTopic] = useState('');
  const [effortLevel, setEffortLevel] = useState(75);
  const [riskLevel, setRiskLevel] = useState(35);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<{
    successRate: number;
    luckBonus: number;
    trials: number[];
  } | null>(null);

  const scenario = DECISION_SCENARIOS.find((s) => s.id === selectedScenarioId) || DECISION_SCENARIOS[0];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResults(null);

    setTimeout(() => {
      const trials: number[] = [];
      let successes = 0;

      // Base probability boosted by effort and modified by risk & luck noise
      const baseProb = scenario.baseProbability + (effortLevel - 50) * 0.35 - (riskLevel - 30) * 0.25;

      for (let i = 0; i < 100; i++) {
        // Random Gaussian noise for luck
        const luckNoise = (Math.random() + Math.random() + Math.random() - 1.5) * 20;
        const score = Math.max(0, Math.min(100, baseProb + luckNoise));
        trials.push(score);
        if (score >= 60) successes++;
      }

      const luckBonus = Math.round((successes - baseProb) * 1.2);
      const finalResult = {
        successRate: successes,
        luckBonus,
        trials,
      };

      setSimulationResults(finalResult);
      setIsSimulating(false);
    }, 1200);
  };

  const handleFinish = () => {
    if (!simulationResults) return;

    const rate = simulationResults.successRate;
    onComplete(
      {
        scenarioTitle: scenario.title,
        customTopic: customTopic || scenario.title,
        effortLevel,
        riskLevel,
        simulationResults,
      },
      {
        wealth: selectedScenarioId === 'stock_trading' || selectedScenarioId === 'asset_allocation' ? Math.max(80, rate) : rate,
        career: selectedScenarioId === 'salary_negotiation' || selectedScenarioId === 'startup_invest' ? Math.max(80, rate) : 82,
        love: 82,
        health: 88 - Math.round(riskLevel / 5),
        serendipity: Math.min(99, Math.max(65, rate + simulationResults.luckBonus)),
      }
    );
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'DollarSign':
        return <DollarSign className="w-5 h-5 text-amber-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          财运与投资胜率实验室
        </span>
        <h2 className="text-2xl font-bold text-indigo-100 mt-2">100次财运与投资蒙特卡洛模拟</h2>
        <p className="text-xs text-indigo-300/70 mt-1">
          设定财务目标与建仓风控参数，通过 100次 随机试错测算当下财运胜率与交易加成
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {DECISION_SCENARIOS.map((sc) => {
          const isSelected = selectedScenarioId === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500/60 text-indigo-100 shadow-[0_0_20px_rgba(79,70,229,0.25)]'
                  : 'bg-[#050508] border-indigo-500/10 text-indigo-300/70 hover:bg-indigo-950/30'
              }`}
            >
              <div className="mt-0.5 p-2 rounded-lg bg-[#080812] border border-indigo-500/20">
                {renderIcon(sc.icon)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-100">{sc.title}</h4>
                <p className="text-xs text-indigo-300/70 mt-1 line-clamp-2">{sc.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Topic Input */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-indigo-200 mb-1.5">
          特定投资/财务目标说明（如“某股票加仓波段/新业务跟投”）
        </label>
        <input
          type="text"
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder={`例如：${scenario.title} - 明确的投资与财富标的...`}
          className="w-full bg-[#050508] border border-indigo-500/30 rounded-xl px-4 py-2.5 text-xs text-indigo-100 placeholder:text-indigo-400/40 focus:outline-none focus:border-indigo-400"
        />
      </div>

      {/* Sliders for Effort & Risk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-[#050508] border border-indigo-500/20 rounded-xl p-4">
        <div>
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-indigo-200">调研准备度 / 核心把控力</span>
            <span className="text-amber-400 font-mono font-bold">{effortLevel}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={effortLevel}
            onChange={(e) => setEffortLevel(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-indigo-200">市场波动性 / 回撤风险度</span>
            <span className="text-rose-400 font-mono font-bold">{riskLevel}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={riskLevel}
            onChange={(e) => setRiskLevel(Number(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Simulation Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-[0_0_25px_rgba(79,70,229,0.4)] border border-white/20 disabled:opacity-40 transition-all inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
          {isSimulating ? '正在进行100次财运与收益模拟演算...' : '运行100次财运与胜率演算'}
        </button>
      </div>

      {/* Simulation Results Display */}
      {simulationResults && (
        <div className="bg-[#050508] border border-amber-500/40 rounded-xl p-5 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-indigo-500/20">
            <div className="text-center sm:text-left">
              <span className="text-xs text-indigo-300/70">100次模拟获利概率</span>
              <div className="text-3xl font-extrabold text-amber-300 font-mono mt-0.5">
                {simulationResults.successRate}%
              </div>
            </div>

            <div className="text-center sm:text-left">
              <span className="text-xs text-indigo-300/70">偏财与气场加成因子</span>
              <div
                className={`text-2xl font-bold font-mono mt-0.5 ${
                  simulationResults.luckBonus >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {simulationResults.luckBonus >= 0 ? `+${simulationResults.luckBonus}%` : `${simulationResults.luckBonus}%`}
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] border border-white/20 cursor-pointer transition-all"
            >
              生成财运深度报告
            </button>
          </div>

          <p className="text-xs text-indigo-200 leading-relaxed">
            💡 <strong className="text-amber-300">演算结论：</strong> 在【{scenario.title}
            】模式下，结合您设置的 {effortLevel}% 准备度与 {riskLevel}% 风险度，模拟显示当下的财运胜率为{' '}
            <strong className="text-amber-300">{simulationResults.successRate}%</strong>。偏财磁场带来约{' '}
            <strong className="text-emerald-400">+{simulationResults.luckBonus}%</strong> 的额外气场加成。
          </p>
        </div>
      )}
    </div>
  );
};
