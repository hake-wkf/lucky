import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiConfigured: !!ai });
});

// Detailed Financial & Luck Analysis Endpoint
app.post("/api/analyze-luck", async (req, res) => {
  try {
    const {
      testMode = "multi_dimension",
      userProfile = {},
      scores = {},
      selectedCards = [],
      diceResults = [],
      answers = [],
      focusTopic = "财运理财与投资收益",
    } = req.body;

    if (!ai) {
      // Fallback if GEMINI_API_KEY is not configured on server
      return res.json({
        isAI: false,
        summary: "财帛能量平稳充盈，正财固本，偏财择时。今日宜理性复盘仓位，把握14:00-16:00投资交易黄金期。",
        overallScore: Math.floor(80 + Math.random() * 16),
        luckTier: "金玉满堂 · 财源滚滚",
        dimensionScores: {
          career: scores.career || 85,
          wealth: scores.wealth || 92,
          love: scores.love || 80,
          health: scores.health || 85,
          serendipity: scores.serendipity || 88,
        },
        hourlyForecast: [
          { hour: "06:00", score: 78, trend: "up", advice: "晨起梳理财经要闻与今日资金安排" },
          { hour: "09:00", score: 88, trend: "up", advice: "开盘高能期，适合处理关键商务与交易决断" },
          { hour: "12:00", score: 82, trend: "stable", advice: "午盘观望，保持冷静，避免冲动加仓" },
          { hour: "15:00", score: 95, trend: "up", advice: "偏财与贵人运高光期，适合商务签约与收获成果" },
          { hour: "18:00", score: 86, trend: "down", advice: "交流投资经验，与同行朋友聚会" },
          { hour: "21:00", score: 80, trend: "stable", advice: "复盘资产组合，规划中长期财富复利" },
        ],
        detailedAnalysis: {
          careerDetail: "商业能力与职场说服力显著增强。在合同签署、项目谈判或薪酬汇报中具备极高气场，宜把握下午时段推进核心商业议题。",
          wealthDetail: "正财运稳健，投资偏财运处于上升通道。对市场风向感应敏锐，但需设定止盈止损线，严禁追涨杀跌或听信未经核实的小道消息。",
          loveDetail: "人际社交带有强烈的‘和气生财’磁场，适合参加行业交流或商务晚宴，结识高价值合作伙伴。",
          healthDetail: "精力处于高位，但需防范长时间盯盘或思考财务方案带来的眼干与肩颈疲劳。建议定时补水并进行肢体拉伸。",
          serendipityDetail: "贵人运来自资深长辈或行业先行者，适时倾听经验指点能帮你避开上万元的潜在投资盲区。",
        },
        luckyElements: {
          color: { name: "琥珀琉璃金", hex: "#F59E0B", description: "蕴含强大财富磁场，提升商业决策自信" },
          numbers: [6, 8, 9],
          direction: "东南财位",
          timeSlot: "14:00 - 16:00",
          gemOrItem: "黄水晶/黄铜质感名片盒",
          foodOrDrink: "桂花乌龙茶 / 坚果饮料",
        },
        actionableAdvice: {
          dos: [
            "完成今日资产组合与现金收支复盘",
            "在14:00-16:00高光期进行关键商业谈判",
            "整理办公桌与理财卡槽，保持财气通透",
            "表达对商业合作者的感恩致意",
          ],
          donts: [
            "切忌在情绪剧烈波动时做出高杠杆理财决定",
            "避免与他人无谓争论行情涨跌",
            "切勿冲动进行未经风险评估的大额消费",
          ],
          mindsetTip: "“财不入急门，顺势方能大发。”保持理性与纪律是最高级的生财之道。",
          miniRitual: "用温水洗手后，双手合十静坐1分钟，深呼吸5次，默念“我迎接正向能量与财富丰盛降临”。",
        },
        quote: "君子爱财，取之有道；用之有度，用之有节。",
      });
    }

    // Call Gemini API with Heavy Focus on Financial & Investment Luck
    const prompt = `你是一位精通金融投资心理学、商业财富决策、传统易学与概率风控的顶尖财运与财富分析大师。
用户特别要求关注【财务、财运、理财与投资】类型。请根据用户的运势测试数据，生成一份极其详尽、深刻、具有高度可操作性与风控价值的【专属财务与投资运势深度解盘报告】。

【用户测试数据】
- 测试模式: ${testMode}
- 用户背景: 姓名/昵称: ${userProfile.name || "使用者"}, 星座/生肖: ${userProfile.zodiac || "未提供"}, 年龄段: ${userProfile.ageGroup || "未提供"}, 核心焦点: ${focusTopic || "财运理财与投资收益"}
- 维度测试分数: 事业商业=${scores.career || 80}, 财富投资=${scores.wealth || 85}, 情感人际=${scores.love || 80}, 健康精力=${scores.health || 80}, 贵人金源=${scores.serendipity || 85}
- 抽牌/灵感卡片: ${JSON.stringify(selectedCards)}
- 摇签/掷币结果: ${JSON.stringify(diceResults)}
- 心理问答/决策模拟: ${JSON.stringify(answers)}

【生成核心要求】
1. 深度侧重【财务、正财、偏财、股市/理财/创业投资择时、避坑风控与财富复利】！
2. 给出极具金融风控参考价值的Dos and Donts，包含最佳交易/谈判窗口期、止盈止损心态调适、开运财位与随身信物。
3. 必须严格按照指定JSON Schema格式返回。

返回的JSON结构必须符合以下Schema：
{
  "summary": "一句高度概括的财运总评与投资择时要领",
  "overallScore": 数字(1-100),
  "luckTier": "四字或八字财富运势古风称号，如：金玉满堂·财源滚滚",
  "dimensionScores": {
    "career": 数字(1-100),
    "wealth": 数字(1-100),
    "love": 数字(1-100),
    "health": 数字(1-100),
    "serendipity": 数字(1-100)
  },
  "hourlyForecast": [
    { "hour": "06:00", "score": 数字, "trend": "up"|"down"|"stable", "advice": "具体建议" },
    { "hour": "09:00", "score": 数字, "trend": "up"|"down"|"stable", "advice": "具体建议" },
    { "hour": "12:00", "score": 数字, "trend": "up"|"down"|"stable", "advice": "具体建议" },
    { "hour": "15:00", "score": 数字, "trend": "up"|"down"|"stable", "advice": "具体建议" },
    { "hour": "18:00", "score": 数字, "trend": "up"|"down"|"stable", "advice": "具体建议" },
    { "hour": "21:00", "score": 数字, "trend": "up"|"down"|"stable", "advice": "具体建议" }
  ],
  "detailedAnalysis": {
    "careerDetail": "详细事业与商业变现解析（至少150字，包含合同签单、薪酬谈判、业务拓展）",
    "wealthDetail": "详细正财与偏财/投资深度解析（至少180字，包含买卖择时、防范高风险套牢、资产仓位配置建议）",
    "loveDetail": "详细人际关系与‘和气生财’磁场解析（至少150字，商业人脉与合作伙伴沟通）",
    "healthDetail": "详细精力与决策头脑健康解析（至少120字，盯盘看报防疲劳与理性心态保持）",
    "serendipityDetail": "详细贵人金源与冷门投资灵感解析（至少120字，如何接引贵人资源与捕捉市场先机）"
  },
  "luckyElements": {
    "color": { "name": "颜色名称", "hex": "16进制颜色代码", "description": "为何此色能聚财/旺财" },
    "numbers": [数字, 数字, 数字],
    "direction": "吉利财位",
    "timeSlot": "最佳投资/交易/谈判窗口期",
    "gemOrItem": "开运聚财信物",
    "foodOrDrink": "开运饮食建议"
  },
  "actionableAdvice": {
    "dos": ["具体财务/理财建议1", "具体建议2", "具体建议3", "具体建议4"],
    "donts": ["理财避坑事项1", "避忌事项2", "避忌事项3"],
    "mindsetTip": "投资者心态调适与财富复利金句",
    "miniRitual": "简易保运/聚财仪式步骤描述"
  },
  "quote": "关于财富、理财或古典财商的哲理名言"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            overallScore: { type: Type.INTEGER },
            luckTier: { type: Type.STRING },
            dimensionScores: {
              type: Type.OBJECT,
              properties: {
                career: { type: Type.INTEGER },
                wealth: { type: Type.INTEGER },
                love: { type: Type.INTEGER },
                health: { type: Type.INTEGER },
                serendipity: { type: Type.INTEGER },
              },
              required: ["career", "wealth", "love", "health", "serendipity"],
            },
            hourlyForecast: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hour: { type: Type.STRING },
                  score: { type: Type.INTEGER },
                  trend: { type: Type.STRING },
                  advice: { type: Type.STRING },
                },
                required: ["hour", "score", "trend", "advice"],
              },
            },
            detailedAnalysis: {
              type: Type.OBJECT,
              properties: {
                careerDetail: { type: Type.STRING },
                wealthDetail: { type: Type.STRING },
                loveDetail: { type: Type.STRING },
                healthDetail: { type: Type.STRING },
                serendipityDetail: { type: Type.STRING },
              },
              required: ["careerDetail", "wealthDetail", "loveDetail", "healthDetail", "serendipityDetail"],
            },
            luckyElements: {
              type: Type.OBJECT,
              properties: {
                color: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    hex: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                  required: ["name", "hex", "description"],
                },
                numbers: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                direction: { type: Type.STRING },
                timeSlot: { type: Type.STRING },
                gemOrItem: { type: Type.STRING },
                foodOrDrink: { type: Type.STRING },
              },
              required: ["color", "numbers", "direction", "timeSlot", "gemOrItem", "foodOrDrink"],
            },
            actionableAdvice: {
              type: Type.OBJECT,
              properties: {
                dos: { type: Type.ARRAY, items: { type: Type.STRING } },
                donts: { type: Type.ARRAY, items: { type: Type.STRING } },
                mindsetTip: { type: Type.STRING },
                miniRitual: { type: Type.STRING },
              },
              required: ["dos", "donts", "mindsetTip", "miniRitual"],
            },
            quote: { type: Type.STRING },
          },
          required: [
            "summary",
            "overallScore",
            "luckTier",
            "dimensionScores",
            "hourlyForecast",
            "detailedAnalysis",
            "luckyElements",
            "actionableAdvice",
            "quote",
          ],
        },
      },
    });

    if (!response.text) {
      throw new Error("Empty AI response");
    }

    const data = JSON.parse(response.text);
    res.json({ isAI: true, ...data });
  } catch (error: any) {
    console.error("Error analyzing luck with Gemini:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI analysis" });
  }
});

// Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luck Tester Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
