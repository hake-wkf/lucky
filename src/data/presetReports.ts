import { LuckReport, LuckTestMode, UserProfile, DimensionScores } from '../types';

export function generatePresetReport(
  testMode: LuckTestMode,
  userProfile: UserProfile,
  scores: DimensionScores,
  extraData: any = {}
): LuckReport {
  const overallScore = Math.round(
    (scores.career + scores.wealth + scores.love + scores.health + scores.serendipity) / 5
  );

  let luckTier = '金玉满堂 · 财源滚滚';
  let summary = '财帛宫磁场异常充盈升腾，正财偏财双轮驱动！当下正是投资择时与把握金源的黄金窗口期。';

  if (overallScore >= 90) {
    luckTier = '紫气东来 · 鸿运当头';
    summary = '财帛与贵人双星齐聚，投资气场高能升腾！适合果断布局高价值项目与承接丰厚财富。';
  } else if (overallScore >= 82) {
    luckTier = '金玉满堂 · 财源滚滚';
    summary = '财运稳中有升，市场资讯与投资资源正悄然向你倾斜，宜乘胜追击，锁定收益。';
  } else if (overallScore >= 74) {
    luckTier = '稳扎稳打 · 固本培元';
    summary = '正财基业稳固，偏财需防范急躁。适合精细耕耘理财组合，防守反击蓄力破局。';
  } else {
    luckTier = '避锐蓄力 · 防守对冲';
    summary = '市场变局前夕需沉住气，控制仓位与杠杆，防范情绪化决策，保本蓄力待时而动。';
  }

  const nowStr = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    id: 'report_' + Date.now(),
    timestamp: nowStr,
    testMode,
    userProfile,
    summary,
    overallScore,
    luckTier,
    dimensionScores: scores,
    hourlyForecast: [
      { hour: '06:00', score: Math.min(100, overallScore - 5), trend: 'up', advice: '晨间复盘全球市场动态与财经资讯，梳理今日资金流水安排' },
      { hour: '09:00', score: Math.min(100, overallScore + 6), trend: 'up', advice: '开盘与高能工作期，适合处理关键财务决策、商务签单与资金划拨' },
      { hour: '12:00', score: Math.min(100, overallScore - 2), trend: 'stable', advice: '午间宜小憩并复盘午盘走向，严禁冲动加仓或盲目高跟投资' },
      { hour: '15:00', score: Math.min(100, overallScore + 8), trend: 'up', advice: '偏财与贵人运最旺盛窗口期，适合商务交流、收尾交易与获取内参消息' },
      { hour: '18:00', score: Math.min(100, overallScore - 3), trend: 'down', advice: '宜放松身心，与优质商业伙伴社交聚餐，在轻松氛围中交流投资心得' },
      { hour: '21:00', score: Math.min(100, overallScore - 6), trend: 'stable', advice: '晚间适合自我理财复盘、研读财报与规划中长期资产配置，切忌熬夜看盘' },
    ],
    detailedAnalysis: {
      careerDetail:
        '【事业与商业签单解析】当前事业磁场与商业变现力同步增强。你的专业能力在谈判与项目推进中具备极高说服力。若涉及薪酬谈判、商务合同签订或招商引资，今日下午14:00-16:00是破局黄金期。建议明确核心底线，以务实且富有远见的方案打动合作伙伴。',
      wealthDetail:
        '【财富与投资收益解析】正财运平稳厚重，多劳多得的法则依然生效，项目分红与薪酬回报有超预期迹象。偏财/投资运方面，市场直觉敏锐，在优质资产买卖或短线波段上有不错的气场加成。但必须严格设定止盈止损点，将30%-50%的获利资金划拨至固定收益或黄金保本仓位，实现财富滚雪球。',
      loveDetail:
        '【人际与商业贵人解析】社交磁场带有强烈的“和气生财”特征。单身者有机会在高端商业论坛、理财沙龙或专业社群中结识志同道合且有经济实力的新朋友；有伴侣者适合共同规划家庭资产大账本，坦诚交流财务目标能让关系更加紧密稳固。',
      healthDetail:
        '【健康与决策精力解析】精力充沛但脑力消耗较大。长时间盯盘或阅读财报易引发眼干与肩颈紧绷。建议遵守“20-20-20”护眼法则，每工作1小时起身饮用一杯桂花乌龙茶，做3分钟深呼吸拉伸，保持决策神经敏锐。',
      serendipityDetail:
        '【贵人金源与突发幸运解析】贵人运隐藏在资深长辈、业内先行者或跨界投资人的闲聊中。当你在某个标的或商业决策上遇到疑惑时，不妨主动向值得信任的前辈请教，对方的一句经验之谈往往能帮你避开数万元的潜在陷阱。',
    },
    luckyElements: {
      color: { name: '琥珀琉璃金', hex: '#F59E0B', description: '蕴含博大丰盛的财富磁场，可大幅提升个人商业气场与决断自信' },
      numbers: [6, 8, 9],
      direction: '东南财位 / 正东方',
      timeSlot: '14:00 - 16:00 (未时)',
      gemOrItem: '黄水晶/黄铜质感名片盒或随身理财貔貅信物',
      foodOrDrink: '桂花乌龙茶 / 热坚果乳饮',
    },
    actionableAdvice: {
      dos: [
        '优先处理并落实现金流收支与投资组合复盘',
        '在下午高光窗口期主动与关键客户或商务伙伴沟通',
        '整理办公桌与钱包卡槽，保持财位气场通透整洁',
        '向给予你商业启发的合作者发一条致谢消息',
      ],
      donts: [
        '切忌在情绪剧烈波动或市场暴跌时追涨杀跌冲动交易',
        '避免在社交平台与他人无谓争论行情多空',
        '切勿听信未经核实的小道消息盲目加高杠杆',
      ],
      mindsetTip: '“胜人者有力，自胜者强；财不入急门，顺势方能大发。”保持内心沉静与理智纪律。',
      miniRitual: '用温水洗净双手，将右手放在心脏上方静坐1分钟，深深吸气5次，默念“我与财富磁场和谐同频，理性与丰盛随我而行”。',
    },
    quote: '君子爱财，取之有道；用之有度，用之有节。保持理智与定力，财富与时间皆是你的朋友。',
    isAI: false,
  };
}
