import { QuestionItem } from '../types';

export const QUANTUM_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    category: '财运直觉与市场敏锐度',
    title: '当你面对一个波动较大但潜在回报极高的理财/投资机会时，你的第一反应是？',
    subtitle: '测试你的财富风控意识、偏财直觉与资金气场波动',
    options: [
      {
        label: '迅速研究底层逻辑与风险收益比，分批小仓位建仓试水',
        score: { career: 88, wealth: 95, love: 80, health: 88, serendipity: 92 },
        tag: '理智猎手',
      },
      {
        label: '凭直觉果断抓住核心时机下注，相信自己的第一感官',
        score: { career: 85, wealth: 92, love: 82, health: 82, serendipity: 95 },
        tag: '敏锐破局',
      },
      {
        label: '观望市场情绪与资深投资者意见，等待回调再择机入场',
        score: { career: 90, wealth: 88, love: 85, health: 90, serendipity: 80 },
        tag: '稳健蓄力',
      },
      {
        label: '优先确保本金绝对安全，将资金配置于固定收益或货币基金',
        score: { career: 82, wealth: 80, love: 88, health: 92, serendipity: 75 },
        tag: '绝对防守',
      },
    ],
  },
  {
    id: 2,
    category: '资金决策与买卖窗口期',
    title: '如果在交易或大额消费前，眼前突然出现一个象征金钱气场的随机能量结界，你会选择？',
    subtitle: '检测你的即时财运加成、偏财爆发力与决断气魄',
    options: [
      {
        label: '选择金色与紫气缠绕的能量核，追求正财与偏财双轮驱动',
        score: { career: 90, wealth: 96, love: 82, health: 85, serendipity: 94 },
        tag: '财源广进',
      },
      {
        label: '选择青翠与碧蓝相间的能量核，追求资产稳步增值与无忧回撤',
        score: { career: 92, wealth: 90, love: 85, health: 92, serendipity: 85 },
        tag: '源远流长',
      },
      {
        label: '选择烈焰朱红能量核，寻求短线突破与突发意外喜讯',
        score: { career: 86, wealth: 88, love: 90, health: 80, serendipity: 96 },
        tag: '奇迹爆发',
      },
      {
        label: '选择沉稳深邃的大地能量核，专注于守财与资产沉淀',
        score: { career: 85, wealth: 86, love: 80, health: 95, serendipity: 80 },
        tag: '固本培元',
      },
    ],
  },
  {
    id: 3,
    category: '商业谈判与贵人金源',
    title: '在重要的商业合作、薪酬谈判或项目招商中，你最看重对方的哪项特质？',
    subtitle: '映射你的人际财气凝聚力与贵人招财磁场',
    options: [
      {
        label: '有雄厚的资金资源与强有力的信用履约背书',
        score: { career: 92, wealth: 94, love: 80, health: 85, serendipity: 90 },
        tag: '强强联手',
      },
      {
        label: '思路敏捷、能带来全新商业模式或冷门获利通道',
        score: { career: 88, wealth: 92, love: 85, health: 82, serendipity: 96 },
        tag: '降维打击',
      },
      {
        label: '合作态度真诚坦荡，利益分成机制合理透明',
        score: { career: 86, wealth: 88, love: 92, health: 90, serendipity: 88 },
        tag: '和气生财',
      },
      {
        label: '拥有庞大的行业高端人脉圈，能互相介绍关键客群',
        score: { career: 90, wealth: 90, love: 88, health: 86, serendipity: 95 },
        tag: '贵人引路',
      },
    ],
  },
  {
    id: 4,
    category: '财富复利与资产配置',
    title: '当你意外获得一笔可观的投资获利或额外分红时，你的资金划拨计划是？',
    subtitle: '测算你的财富留存率、复利增长潜能与金钱循环健康度',
    options: [
      {
        label: '50%转入稳健核心资产，30%作为机动跟投资金，20%改善生活',
        score: { career: 92, wealth: 98, love: 86, health: 90, serendipity: 92 },
        tag: '完美财商',
      },
      {
        label: '全部继续投入高收益标的，追求资金效率最大化',
        score: { career: 85, wealth: 90, love: 75, health: 78, serendipity: 90 },
        tag: '高能激进',
      },
      {
        label: '大部分转存定期或黄金防守，锁定已到手收益',
        score: { career: 86, wealth: 88, love: 80, health: 92, serendipity: 78 },
        tag: '落袋为安',
      },
      {
        label: '投资于个人核心技能、高端圈子与专业工具设备',
        score: { career: 96, wealth: 92, love: 85, health: 88, serendipity: 94 },
        tag: '自我杠杆',
      },
    ],
  },
];

export const DECISION_SCENARIOS = [
  {
    id: 'stock_trading',
    title: '股市/加密波段择时决策',
    description: '模拟短线加仓、止盈止损与抄底拐点处的交易胜率与财运加成。',
    baseProbability: 58,
    icon: 'TrendingUp',
  },
  {
    id: 'asset_allocation',
    title: '核心资产配置与避险',
    description: '测算黄金、固定收益与风险资产组合的年化胜率与抗回撤力。',
    baseProbability: 68,
    icon: 'DollarSign',
  },
  {
    id: 'startup_invest',
    title: '项目跟投与商业试水',
    description: '评估创业跟投、新业务拓展或副业开辟的获利概率与贵人支持度。',
    baseProbability: 55,
    icon: 'Briefcase',
  },
  {
    id: 'salary_negotiation',
    title: '加薪谈判与商务签单',
    description: '模拟合同签订、项目报价与薪酬加薪谈判的成交破局气场。',
    baseProbability: 65,
    icon: 'Award',
  },
];
