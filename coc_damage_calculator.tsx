import React, { useState } from 'react';
import { Calculator, Flame, Zap, Target, Shield } from 'lucide-react';

const FireballEarthquakeCalculator = () => {
  // 大火球数据
  const fireballData = [
    { level: 1, damage: 1500, multiplier: 4 },
    { level: 2, damage: 1500, multiplier: 4 },
    { level: 3, damage: 1700, multiplier: 4 },
    { level: 4, damage: 1800, multiplier: 4 },
    { level: 5, damage: 1800, multiplier: 4 },
    { level: 6, damage: 1950, multiplier: 4 },
    { level: 7, damage: 1950, multiplier: 4 },
    { level: 8, damage: 2050, multiplier: 4 },
    { level: 9, damage: 2050, multiplier: 5 },
    { level: 10, damage: 2200, multiplier: 5 },
    { level: 11, damage: 2350, multiplier: 5 },
    { level: 12, damage: 2650, multiplier: 5 },
    { level: 13, damage: 2650, multiplier: 5 },
    { level: 14, damage: 2750, multiplier: 5 },
    { level: 15, damage: 3100, multiplier: 5 },
    { level: 16, damage: 3100, multiplier: 5 },
    { level: 17, damage: 3250, multiplier: 5 },
    { level: 18, damage: 3400, multiplier: 6 },
    { level: 19, damage: 3400, multiplier: 6 },
    { level: 20, damage: 3500, multiplier: 6 },
    { level: 21, damage: 3650, multiplier: 6 },
    { level: 22, damage: 3650, multiplier: 6 },
    { level: 23, damage: 3650, multiplier: 6 },
    { level: 24, damage: 3900, multiplier: 6 },
    { level: 25, damage: 3900, multiplier: 6 },
    { level: 26, damage: 3950, multiplier: 6 },
    { level: 27, damage: 4100, multiplier: 6 }
  ];

  // 地震法术数据
  const earthquakeData = [
    { level: 1, percentage: 14.5 },
    { level: 2, percentage: 17 },
    { level: 3, percentage: 21 },
    { level: 4, percentage: 25 },
    { level: 5, percentage: 29 }
  ];

  // 难度模式数据
  const difficultyModes = {
    normal: { name: '普通', offensePenalty: 0, levelPenalty: 0, color: 'emerald' },
    expert: { name: '专家', offensePenalty: 0, levelPenalty: 0, color: 'blue' },
    master: { name: '大师', offensePenalty: 0, levelPenalty: 0, color: 'purple' },
    legend: { name: '传奇', offensePenalty: 0, levelPenalty: 6, color: 'orange' },
    esports: { name: '电竞', offensePenalty: 0, levelPenalty: 0, color: 'red' }
  };

  const [fireballLevel, setFireballLevel] = useState(27);
  const [earthquakeLevel, setEarthquakeLevel] = useState(5);
  const [earthquakeCount, setEarthquakeCount] = useState(4);
  const [buildingHP, setBuildingHP] = useState(5000);
  const [difficulty, setDifficulty] = useState('normal');

  // 计算地震法术的总伤害百分比（考虑递减）
  const calculateEarthquakeDamage = () => {
    const basePercentage = earthquakeData[earthquakeLevel - 1].percentage;
    let totalPercentage = 0;
    
    for (let i = 1; i <= earthquakeCount; i++) {
      totalPercentage += basePercentage / i;
    }
    
    return totalPercentage;
  };

  // 计算总伤害
  const calculateTotalDamage = () => {
    const mode = difficultyModes[difficulty];
    
    // 计算有效大火球等级（传奇模式-6级）
    let effectiveFireballLevel = fireballLevel - mode.levelPenalty;
    effectiveFireballLevel = Math.max(1, effectiveFireballLevel);
    
    const fireball = fireballData[effectiveFireballLevel - 1];
    
    // 大火球伤害计算（不受难度影响）
    let fireballDamage = fireball.damage;
    
    // 地震法术伤害计算（不受难度影响）
    const earthquakeTotalPercentage = calculateEarthquakeDamage();
    const earthquakeDamage = (buildingHP * earthquakeTotalPercentage) / 100;
    
    const totalDamage = fireballDamage + earthquakeDamage;
    const remainingHP = Math.max(0, buildingHP - totalDamage);
    const damagePercentage = ((totalDamage / buildingHP) * 100).toFixed(1);
    
    return {
      fireballBaseDamage: fireball.damage,
      fireballDamage: Math.round(fireballDamage),
      earthquakeDamage: Math.round(earthquakeDamage),
      earthquakePercentage: earthquakeTotalPercentage.toFixed(2),
      totalDamage: Math.round(totalDamage),
      remainingHP: Math.round(remainingHP),
      damagePercentage,
      isDestroyed: remainingHP === 0,
      effectiveFireballLevel,
      levelPenalty: mode.levelPenalty,
      offensePenalty: mode.offensePenalty,
      actualMultiplier: fireball.multiplier
    };
  };

  const result = calculateTotalDamage();

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100',
      blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
      purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
      orange: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100',
      red: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
    };
    return colors[color] || colors.emerald;
  };

  const getActiveColorClasses = (color) => {
    const colors = {
      emerald: 'bg-emerald-500 text-white border-emerald-600 shadow-lg',
      blue: 'bg-blue-500 text-white border-blue-600 shadow-lg',
      purple: 'bg-purple-500 text-white border-purple-600 shadow-lg',
      orange: 'bg-orange-500 text-white border-orange-600 shadow-lg',
      red: 'bg-red-500 text-white border-red-600 shadow-lg'
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 标题 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-800">部落冲突伤害计算器</h1>
          </div>
          <p className="text-center text-gray-500 mt-2">大火球 + 地震法术组合</p>
        </div>

        {/* 难度模式选择 */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-800">难度模式</h2>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {Object.entries(difficultyModes).map(([key, mode]) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`p-3 rounded-xl font-semibold transition-all border-2 ${
                  difficulty === key
                    ? getActiveColorClasses(mode.color)
                    : getColorClasses(mode.color)
                }`}
              >
                <div className="text-sm">{mode.name}</div>
                {mode.offensePenalty > 0 && (
                  <div className="text-xs mt-1 opacity-75">-{mode.offensePenalty}%</div>
                )}
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200">
            <p className="flex items-center gap-2">
              <span className="font-semibold">💡 提示：</span>
              难度不影响大火球伤害；传奇模式使装备等级-6
            </p>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 左列 */}
          <div className="space-y-6">
            {/* 大火球 */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-bold text-gray-800">大火球装备</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">装备等级</label>
                    <span className="text-2xl font-bold text-gray-800">{fireballLevel}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="27"
                    value={fireballLevel}
                    onChange={(e) => setFireballLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>27</span>
                  </div>
                </div>

                {result.levelPenalty > 0 && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <p className="text-sm text-red-700 font-medium">⚠️ 电竞模式等级惩罚：-{result.levelPenalty}级</p>
                    <p className="text-sm text-red-600 mt-1">有效等级：<span className="font-bold">{result.effectiveFireballLevel}</span></p>
                  </div>
                )}

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">基础伤害</span>
                    <span className="font-bold text-gray-800">{result.fireballBaseDamage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">伤害范围</span>
                    <span className="font-bold text-gray-800">{result.actualMultiplier}倍</span>
                  </div>
                  {result.offensePenalty > 0 && (
                    <>
                      <div className="border-t border-gray-300 pt-2"></div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">难度减益</span>
                        <span className="font-bold text-red-600">-{result.offensePenalty}%</span>
                      </div>
                    </>
                  )}
                  <div className="border-t border-gray-300 pt-2"></div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700">实际伤害</span>
                    <span className="text-xl font-bold text-orange-600">{result.fireballDamage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 地震法术 */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-600" />
                <h2 className="text-lg font-bold text-gray-800">地震法术</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">法术等级</label>
                    <span className="text-2xl font-bold text-gray-800">{earthquakeLevel}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={earthquakeLevel}
                    onChange={(e) => setEarthquakeLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>5</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">法术数量</label>
                    <span className="text-2xl font-bold text-gray-800">{earthquakeCount}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={earthquakeCount}
                    onChange={(e) => setEarthquakeCount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>8</span>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">单个法术伤害</span>
                    <span className="font-bold text-gray-800">{earthquakeData[earthquakeLevel - 1].percentage}%</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2"></div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700">总伤害（递减）</span>
                    <span className="text-xl font-bold text-yellow-600">{result.earthquakePercentage}%</span>
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t border-gray-300">
                    💡 不受难度模式影响
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右列 */}
          <div className="space-y-6">
            {/* 目标建筑 */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800">目标建筑</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">建筑血量</label>
                  <input
                    type="number"
                    value={buildingHP}
                    onChange={(e) => setBuildingHP(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition text-lg font-semibold"
                    min="1"
                    step="100"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-700">
                  💡 防御建筑血量不受难度模式影响
                </div>
              </div>
            </div>

            {/* 伤害结果 */}
            <div className={`rounded-2xl shadow-lg p-6 border-2 transition-all ${
              result.isDestroyed 
                ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-400' 
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
            }`}>
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  {result.isDestroyed ? '🎯 建筑摧毁！' : '📊 伤害统计'}
                </h2>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">大火球伤害</p>
                  <p className="text-2xl font-bold text-orange-600">{result.fireballDamage.toLocaleString()}</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">地震法术伤害</p>
                  <p className="text-2xl font-bold text-yellow-600">{result.earthquakeDamage.toLocaleString()}</p>
                </div>

                <div className="bg-white/70 backdrop-blur p-4 rounded-xl border-2 border-gray-300">
                  <p className="text-xs text-gray-600 mb-1">总伤害</p>
                  <p className="text-3xl font-bold text-gray-800">{result.totalDamage.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">占建筑血量的 {result.damagePercentage}%</p>
                </div>

                {!result.isDestroyed && (
                  <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">剩余血量</p>
                    <p className="text-2xl font-bold text-green-600">{result.remainingHP.toLocaleString()}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(result.remainingHP / buildingHP) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 说明 */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3">📖 计算说明</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <p className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">⚡</span>
                  <span>地震法术伤害递减：第1个100%效果，第2个50%，第3个33.3%，依此类推</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">🔥</span>
                  <span>大火球受难度模式影响，会降低进攻方伤害</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">🎮</span>
                  <span>电竞模式使装备等级-6级，同时保留进攻减益</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireballEarthquakeCalculator;