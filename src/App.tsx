import React, { useState, useEffect } from 'react';
import { LuckTestMode, UserProfile, LuckReport, DimensionScores } from './types';
import { Header } from './components/Header';
import { UserProfileModal } from './components/UserProfileModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { TodayLuckCalculator } from './components/modes/TodayLuckCalculator';
import { QuantumTest } from './components/modes/QuantumTest';
import { TarotDraw } from './components/modes/TarotDraw';
import { CoinToss } from './components/modes/CoinToss';
import { DecisionLab } from './components/modes/DecisionLab';
import { ReportView } from './components/ReportView';
import { generatePresetReport } from './data/presetReports';
import { Sparkles, Dices, Layers, Activity } from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState<LuckTestMode>('today_luck');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('luck_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: '灵犀',
      zodiac: '天秤座',
      ageGroup: '25-35岁',
      focusTopic: '综合财运与正偏财收益',
    };
  });

  const [reportsHistory, setReportsHistory] = useState<LuckReport[]>(() => {
    try {
      const saved = localStorage.getItem('luck_reports_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [currentReport, setCurrentReport] = useState<LuckReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Save profile & history changes
  useEffect(() => {
    localStorage.setItem('luck_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('luck_reports_history', JSON.stringify(reportsHistory));
  }, [reportsHistory]);

  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
  };

  const handleSelectMode = (mode: LuckTestMode) => {
    setActiveMode(mode);
    setCurrentReport(null);
  };

  const saveReportToStateAndHistory = (newReport: LuckReport) => {
    setCurrentReport(newReport);
    setReportsHistory((prev) => [newReport, ...prev.slice(0, 19)]); // keep latest 20
  };

  // Process Test Completion and request AI Analysis from Gemini Server
  const processTestCompletion = async (
    testMode: LuckTestMode,
    scores: DimensionScores,
    extraPayload: any = {}
  ) => {
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze-luck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testMode,
          userProfile,
          scores,
          selectedCards: extraPayload.selectedCards || [],
          diceResults: extraPayload.diceResults || [],
          answers: extraPayload.answers || [],
          focusTopic: userProfile.focusTopic,
        }),
      });

      if (!response.ok) {
        throw new Error('Server response error');
      }

      const data = await response.json();

      const nowStr = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      const report: LuckReport = {
        id: 'report_' + Date.now(),
        timestamp: nowStr,
        testMode,
        userProfile,
        summary: data.summary,
        overallScore: data.overallScore,
        luckTier: data.luckTier,
        dimensionScores: data.dimensionScores || scores,
        hourlyForecast: data.hourlyForecast || [],
        detailedAnalysis: data.detailedAnalysis,
        luckyElements: data.luckyElements,
        actionableAdvice: data.actionableAdvice,
        quote: data.quote || '山重水复疑无路，柳暗花明又一村。',
        isAI: data.isAI ?? true,
      };

      saveReportToStateAndHistory(report);
    } catch (err) {
      console.warn('Using local preset report fallback due to network or server config:', err);
      // Fallback
      const fallbackReport = generatePresetReport(testMode, userProfile, scores, extraPayload);
      saveReportToStateAndHistory(fallbackReport);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Header Navigation */}
      <Header
        activeMode={activeMode}
        onSelectMode={handleSelectMode}
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={reportsHistory.length}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col items-center">
        {/* Loading / AI Analyzing Animation State */}
        {isAnalyzing ? (
          <div className="my-auto flex flex-col items-center justify-center text-center py-20 animate-fade-in">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-amber-300 mb-2">
              Gemini AI 正在全维解盘并推演运势战术...
            </h2>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              融合易学哲学、概率统计与心理气场模型，为您梳理 24小时运势波动、五维能量分布与精准转运指南。
            </p>
          </div>
        ) : currentReport ? (
          /* Report View Mode */
          <ReportView
            report={currentReport}
            onRetest={() => setCurrentReport(null)}
          />
        ) : (
          /* Interactive Test Mode Views */
          <div className="w-full space-y-8 animate-fade-in">
            {/* Mode Intro Header */}
            {activeMode !== 'today_luck' && (
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 font-semibold inline-block">
                  ✦ 财运与气场实验室 ✦
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {activeMode === 'quantum' && '五维量子能量共振测试'}
                  {activeMode === 'tarot' && '财运灵感卡牌选择'}
                  {activeMode === 'coins' && '六爻金钱卦摇测'}
                  {activeMode === 'decision_lab' && '100次财运与胜率实验室'}
                </h2>
              </div>
            )}

            {/* Test Components */}
            {activeMode === 'today_luck' && (
              <TodayLuckCalculator
                userProfile={userProfile}
                onUpdateProfile={(updated) => setUserProfile(updated)}
                onCalculateTodayLuck={(scores, focusTopic) => {
                  setUserProfile((prev) => ({ ...prev, focusTopic }));
                  processTestCompletion('today_luck', scores, { focusTopic });
                }}
              />
            )}

            {activeMode === 'quantum' && (
              <QuantumTest
                userProfile={userProfile}
                onComplete={(scores, answers) =>
                  processTestCompletion('quantum', scores, { answers })
                }
              />
            )}

            {activeMode === 'tarot' && (
              <TarotDraw
                onComplete={(selectedCards, scores) =>
                  processTestCompletion('tarot', scores, { selectedCards })
                }
              />
            )}

            {activeMode === 'coins' && (
              <CoinToss
                onComplete={(diceResults, scores) =>
                  processTestCompletion('coins', scores, { diceResults })
                }
              />
            )}

            {activeMode === 'decision_lab' && (
              <DecisionLab
                onComplete={(scenarioData, scores) =>
                  processTestCompletion('decision_lab', scores, scenarioData)
                }
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-600">
        <p className="max-w-xl mx-auto px-4">
          运势分析基于随机概率模型与AI传统哲学启发，旨在提供正向心态暗示与积极行动参考。
        </p>
      </footer>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        onSave={handleSaveProfile}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        reports={reportsHistory}
        onSelectReport={(rep) => setCurrentReport(rep)}
        onClearHistory={() => setReportsHistory([])}
      />
    </div>
  );
}
