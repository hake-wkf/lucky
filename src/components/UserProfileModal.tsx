import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, User, Sparkles } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: UserProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [zodiac, setZodiac] = useState(profile.zodiac);
  const [ageGroup, setAgeGroup] = useState(profile.ageGroup);
  const [focusTopic, setFocusTopic] = useState(profile.focusTopic);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || '使用者',
      zodiac: zodiac || '白羊座',
      ageGroup: ageGroup || '25-35岁',
      focusTopic: focusTopic || '综合运势',
    });
    onClose();
  };

  const zodiacOptions = [
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
    '生肖鼠',
    '生肖牛',
    '生肖虎',
    '生肖兔',
    '生肖龙',
    '生肖蛇',
    '生肖马',
    '生肖羊',
    '生肖猴',
    '生肖鸡',
    '生肖狗',
    '生肖猪',
  ];

  const focusOptions = [
    '综合运势与整体气场',
    '职场升迁与学业突破',
    '财富积累与投资理财',
    '感情桃花与人际人缘',
    '身体精力与睡眠调适',
    '近期重大决策风险防范',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">个人命运档案设置</h3>
            <p className="text-xs text-slate-400">完善个人信息可显著提升AI测算报告的精准度</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">使用者称呼 / 昵称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入称呼，如：灵犀"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">星座 / 生肖</label>
            <select
              value={zodiac}
              onChange={(e) => setZodiac(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              {zodiacOptions.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">年龄段</label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="18-24岁">18-24岁 (学业/职场萌芽期)</option>
              <option value="25-35岁">25-35岁 (事业冲刺/黄金成长期)</option>
              <option value="36-50岁">36-50岁 (中流砥柱/沉淀蓄势期)</option>
              <option value="50岁以上">50岁以上 (通达智慧期)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">最关心的核心领域</label>
            <select
              value={focusTopic}
              onChange={(e) => setFocusTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              {focusOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> 保存档案
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
