import React, { useState } from 'react';
import { QUANTUM_QUESTIONS } from '../../data/questions';
import { DimensionScores, UserProfile } from '../../types';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

interface QuantumTestProps {
  userProfile: UserProfile;
  onComplete: (scores: DimensionScores, answers: Record<string, string>) => void;
}

export const QuantumTest: React.FC<QuantumTestProps> = ({ userProfile, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isPulseTesting, setIsPulseTesting] = useState(false);
  const [pulseProgress, setPulseProgress] = useState(0);

  const currentQ = QUANTUM_QUESTIONS[currentStep];

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentStep]: optIndex }));
  };

  const handleNext = () => {
    if (currentStep < QUANTUM_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final Step: Quantum Pulse Resonance Calibration
      runPulseCalibration();
    }
  };

  const runPulseCalibration = () => {
    setIsPulseTesting(true);
    setPulseProgress(0);

    const interval = setInterval(() => {
      setPulseProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishTest();
          return 100;
        }
        return prev + 5;
      });
    }, 60);
  };

  const finishTest = () => {
    // Calculate aggregate scores from answers
    const aggregated: DimensionScores = {
      career: 0,
      wealth: 0,
      love: 0,
      health: 0,
      serendipity: 0,
    };

    const answerTags: Record<string, string> = {};

    QUANTUM_QUESTIONS.forEach((q, idx) => {
      const selectedIndex = selectedAnswers[idx] ?? 0;
      const opt = q.options[selectedIndex];
      answerTags[q.category] = opt.label;

      aggregated.career += opt.score.career;
      aggregated.wealth += opt.score.wealth;
      aggregated.love += opt.score.love;
      aggregated.health += opt.score.health;
      aggregated.serendipity += opt.score.serendipity;
    });

    const totalCount = QUANTUM_QUESTIONS.length;
    aggregated.career = Math.round(aggregated.career / totalCount);
    aggregated.wealth = Math.round(aggregated.wealth / totalCount);
    aggregated.love = Math.round(aggregated.love / totalCount);
    aggregated.health = Math.round(aggregated.health / totalCount);
    aggregated.serendipity = Math.round(aggregated.serendipity / totalCount);

    onComplete(aggregated, answerTags);
  };

  if (isPulseTesting) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[420px] bg-[#0d0d1a] rounded-2xl border border-indigo-500/30">
        <div className="relative mb-8">
          {/* Animated Glowing Ring */}
          <div className="w-32 h-32 rounded-full border-4 border-indigo-500/20 border-t-indigo-400 animate-spin flex items-center justify-center" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-indigo-100 mb-2">Gemini AI 正在全维解盘并推演财运战术...</h3>
        <p className="text-xs text-indigo-300/70 mb-6 max-w-sm">
          融合 {userProfile.name || '您'} 的风险直觉偏好、财帛气场与市场投资概率...
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs bg-[#050508] rounded-full h-3 p-0.5 overflow-hidden border border-indigo-500/30">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-150 shadow-[0_0_10px_rgba(79,70,229,0.8)]"
            style={{ width: `${pulseProgress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-amber-400 font-bold mt-2">{pulseProgress}%</span>
      </div>
    );
  }

  const selectedOptIndex = selectedAnswers[currentStep];

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0d0d1a] border border-indigo-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-indigo-500/20">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-amber-300 border border-indigo-500/30">
            {currentQ.category}
          </span>
          <h2 className="text-lg font-bold text-indigo-100 mt-2">五维财运与能量共振测试</h2>
        </div>
        <span className="font-mono text-sm text-indigo-300/70">
          {currentStep + 1} / {QUANTUM_QUESTIONS.length}
        </span>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2 mb-6">
        {QUANTUM_QUESTIONS.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              idx === currentStep
                ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                : idx < currentStep
                ? 'bg-emerald-500'
                : 'bg-[#050508]'
            }`}
          />
        ))}
      </div>

      {/* Question Content */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-indigo-100 mb-1">{currentQ.title}</h3>
        <p className="text-xs text-indigo-300/70">{currentQ.subtitle}</p>

        {/* Options */}
        <div className="space-y-3 mt-6">
          {currentQ.options.map((opt, optIndex) => {
            const isSelected = selectedOptIndex === optIndex;
            return (
              <button
                key={optIndex}
                onClick={() => handleSelectOption(optIndex)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500/60 text-indigo-100 shadow-[0_0_15px_rgba(79,70,229,0.2)]'
                    : 'bg-[#050508] border-indigo-500/10 text-indigo-300/70 hover:bg-indigo-950/30 hover:border-indigo-500/30'
                }`}
              >
                <div className="mt-0.5">
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-indigo-500/30 group-hover:border-amber-400/60" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium block leading-snug">{opt.label}</span>
                  <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#080812] text-indigo-300/80 border border-indigo-500/20">
                    {opt.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-indigo-500/20">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 text-xs font-semibold rounded-lg text-indigo-300/70 hover:text-indigo-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 上一题
        </button>

        <button
          onClick={handleNext}
          disabled={selectedOptIndex === undefined}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-white/20 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
        >
          {currentStep === QUANTUM_QUESTIONS.length - 1 ? '启动深度财运解盘' : '下一题'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
