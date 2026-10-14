export type LuckTestMode = 'today_luck' | 'quantum' | 'tarot' | 'coins' | 'decision_lab';

export interface UserProfile {
  name: string;
  zodiac: string;
  ageGroup: string;
  focusTopic: string;
}

export interface FortuneCard {
  id: string;
  name: string;
  title: string;
  element: '金' | '木' | '水' | '火' | '土';
  keyword: string;
  description: string;
  advice: string;
  iconName: string;
  color: string;
  bgGradient: string;
}

export interface QuestionOption {
  label: string;
  score: {
    career: number;
    wealth: number;
    love: number;
    health: number;
    serendipity: number;
  };
  tag: string;
}

export interface QuestionItem {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

export interface HourlyPoint {
  hour: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  advice: string;
}

export interface DimensionScores {
  career: number;
  wealth: number;
  love: number;
  health: number;
  serendipity: number;
}

export interface DetailedAnalysis {
  careerDetail: string;
  wealthDetail: string;
  loveDetail: string;
  healthDetail: string;
  serendipityDetail: string;
}

export interface LuckyElements {
  color: {
    name: string;
    hex: string;
    description: string;
  };
  numbers: number[];
  direction: string;
  timeSlot: string;
  gemOrItem: string;
  foodOrDrink: string;
}

export interface ActionableAdvice {
  dos: string[];
  donts: string[];
  mindsetTip: string;
  miniRitual: string;
}

export interface LuckReport {
  id: string;
  timestamp: string;
  testMode: LuckTestMode;
  userProfile: UserProfile;
  summary: string;
  overallScore: number;
  luckTier: string;
  dimensionScores: DimensionScores;
  hourlyForecast: HourlyPoint[];
  detailedAnalysis: DetailedAnalysis;
  luckyElements: LuckyElements;
  actionableAdvice: ActionableAdvice;
  quote: string;
  isAI?: boolean;
}

export interface DecisionScenario {
  id: string;
  title: string;
  description: string;
  baseProbability: number; // e.g. 50%
  icon: string;
}
