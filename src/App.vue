<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
    <Header />
    
    <main class="flex-grow container mx-auto px-4 py-8 md:py-12">
      <div class="max-w-5xl mx-auto">
        <IntroCard />
        
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <!-- 输入表单区域 -->
          <div class="lg:col-span-2">
            <InputForm 
              :currentLevel="currentLevel"
              :currentExp="currentExp"
              :targetLevel="targetLevel"
              :targetExp="targetExp"
              :daysLeft="daysLeft"
              :hasPass="hasPass"
              :expPerAdventure="expPerAdventure"
              :errorMessage="errorMessage"
              @update:currentLevel="val => currentLevel = val"
              @update:currentExp="val => currentExp = val"
              @update:targetLevel="val => targetLevel = val"
              @update:targetExp="val => targetExp = val"
              @update:daysLeft="val => daysLeft = val"
              @update:hasPass="val => hasPass = val"
              @update:expPerAdventure="val => expPerAdventure = val"
              @calculate="handleCalculate"
            />
          </div>
          
          <!-- 结果展示区域 -->
          <div class="lg:col-span-3">
            <ResultDisplay 
              :showInitial="!showResult"
              :totalExpNeeded="totalExpNeeded"
              :totalFruitsNeeded="totalFruitsNeeded"
              :fruitsToBuy="fruitsToBuy"
              :daysLeft="daysLeft"
              :freeFruits="freeFruits"
              :totalCost="totalCost"
              :totalFruitsFromPacks="totalFruitsFromPacks"
              :packsToBuy="packsToBuy"
              :levelDetails="levelDetails"
              :dailyFreeFruits="dailyFreeFruits"
            />
          </div>
        </div>
        
        <RulesInfo />
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Header from './components/Header.vue';
import IntroCard from './components/IntroCard.vue';
import InputForm from './components/InputForm.vue';
import ResultDisplay from './components/ResultDisplay.vue';
import RulesInfo from './components/RulesInfo.vue';
import Footer from './components/Footer.vue';

// 从localStorage加载保存的数据，没有则使用默认值
const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('levelCalculatorData');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }
  
  // 默认值
  return {
    currentLevel: 1,
    currentExp: 0,
    targetLevel: 5,
    targetExp: 0,
    daysLeft: 7,
    hasPass: true, // 默认有通行证
    expPerAdventure: 385 // 默认单次历练获得的人参果个数
  };
};

// 保存数据到localStorage
const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem('levelCalculatorData', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data to localStorage', e);
  }
};

// 状态变量 - 从本地缓存加载
const savedData = loadFromLocalStorage();
const currentLevel = ref(savedData.currentLevel);
const currentExp = ref(savedData.currentExp);
const targetLevel = ref(savedData.targetLevel);
const targetExp = ref(savedData.targetExp);
const daysLeft = ref(savedData.daysLeft);
const hasPass = ref(savedData.hasPass);
const expPerAdventure = ref(savedData.expPerAdventure);
const errorMessage = ref('');
const showResult = ref(false);

// 计算结果变量
const totalExpNeeded = ref(0);
const totalFruitsNeeded = ref(0);
const fruitsToBuy = ref(0);
const freeFruits = ref(0);
const totalCost = ref(0);
const totalFruitsFromPacks = ref(0);
const packsToBuy = ref([]);
const levelDetails = ref([]);
const dailyFreeFruits = ref(0);

// 监听所有输入数据变化，保存到localStorage
watch([currentLevel, currentExp, targetLevel, targetExp, daysLeft, hasPass, expPerAdventure], () => {
  saveToLocalStorage({
    currentLevel: currentLevel.value,
    currentExp: currentExp.value,
    targetLevel: targetLevel.value,
    targetExp: targetExp.value,
    daysLeft: daysLeft.value,
    hasPass: hasPass.value,
    expPerAdventure: expPerAdventure.value
  });
}, { deep: true });

// 礼包信息（按性价比排序：6元 > 30元 > 328元）
const packs = [
  { price: 6, fruits: 1000, maxPerDay: 3, ratio: 1000/6 },    // 最高性价比
  { price: 30, fruits: 4500, maxPerDay: 3, ratio: 4500/30 },  // 中等性价比
  { price: 328, fruits: 35000, maxPerDay: 3, ratio: 35000/328 } // 最低性价比
];

// 基础免费人参果
const baseFreeFruits = 3500;
// 通行证额外人参果
const passExtraFruits = 500;
// 每日历练次数
const dailyAdventureCount = 6;

// 获取指定等级的升级所需经验
const getLevelExp = (level) => {
  if (level < 1) return 0;
  
  // 1到100级：每级经验相差50，1级经验是250
  if (level <= 100) {
    return 250 + (level - 1) * 50;
  } 
  // 101级及以上：每级经验相差48，101级升级经验是5248
  else {
    return 5248 + (level - 101) * 48;
  }
};

// 计算从当前状态到目标状态所需的总经验
const calculateTotalExpNeeded = () => {
  let totalExp = 0;
  const details = [];
  
  // 如果当前等级等于目标等级
  if (currentLevel.value === targetLevel.value) {
    // 检查当前经验是否已超过目标经验
    if (currentExp.value >= targetExp.value) {
      return { totalExp: 0, levelDetails: [] };
    } else {
      const needed = targetExp.value - currentExp.value;
      details.push({
        fromLevel: currentLevel.value,
        toLevel: targetLevel.value,
        expNeeded: needed,
        isPartial: true
      });
      return { totalExp: needed, levelDetails: details };
    }
  }
  
  // 添加当前等级所需的剩余经验
  const currentLevelExp = getLevelExp(currentLevel.value);
  const currentLevelRemaining = currentLevelExp - currentExp.value;
  details.push({
    fromLevel: currentLevel.value,
    toLevel: currentLevel.value + 1,
    expNeeded: currentLevelRemaining,
    isPartial: true
  });
  totalExp += currentLevelRemaining;
  
  // 添加中间等级的完整经验
  for (let level = currentLevel.value + 1; level < targetLevel.value; level++) {
    const exp = getLevelExp(level);
    details.push({
      fromLevel: level,
      toLevel: level + 1,
      expNeeded: exp,
      isPartial: false
    });
    totalExp += exp;
  }
  
  // 添加目标等级所需的部分经验
  if (targetLevel.value > currentLevel.value) {
    details.push({
      fromLevel: targetLevel.value,
      toLevel: targetLevel.value,
      expNeeded: targetExp.value,
      isPartial: true
    });
    totalExp += targetExp.value;
  }
  
  return { totalExp, levelDetails: details };
};

// 计算需要购买的人参果数量
const calculateFruitsToBuy = (totalExp) => {
  // 总人参果需求 = 总经验 / 10（向上取整）
  const totalFruitsNeeded = Math.ceil(totalExp / 10);
  
  // 活动期间可免费获得的人参果
  // 公式：3500 + (有通行证 ? 500 : 0) + 单次历练获得人参果个数 * 6
  const dailyFreeFruits = baseFreeFruits + 
    (hasPass.value ? passExtraFruits : 0) + 
    (expPerAdventure.value * dailyAdventureCount);
  
  const freeFruits = daysLeft.value * dailyFreeFruits;
  
  // 需要购买的人参果（不能为负数）
  const fruitsToBuy = Math.max(0, totalFruitsNeeded - freeFruits);
  
  return { totalFruitsNeeded, freeFruits, fruitsToBuy, dailyFreeFruits };
};

// 计算最优礼包购买方案（按性价比优先）
const calculateOptimalPacks = (fruitsNeeded) => {
  let remaining = fruitsNeeded;
  const packsToBuy = [];
  
  // 按性价比从高到低购买礼包
  packs.forEach(pack => {
    const maxPossible = pack.maxPerDay * daysLeft.value;
    if (remaining <= 0) return;
    
    // 计算需要购买的数量（不超过最大可能）
    let count = Math.min(Math.ceil(remaining / pack.fruits), maxPossible);
    
    if (count > 0) {
      packsToBuy.push({
        ...pack,
        count,
        totalFruits: count * pack.fruits,
        totalPrice: count * pack.price
      });
      
      remaining -= count * pack.fruits;
    }
  });
  
  // 如果还有剩余需求但无法通过礼包满足，购买最小的礼包
  if (remaining > 0) {
    const smallestPack = packs[0]; // 性价比最高的
    const maxPossible = smallestPack.maxPerDay * daysLeft.value;
    const countInPacks = packsToBuy.find(p => p.price === smallestPack.price)?.count || 0;
    
    if (countInPacks < maxPossible) {
      const count = Math.min(1, maxPossible - countInPacks);
      packsToBuy.push({
        ...smallestPack,
        count,
        totalFruits: count * smallestPack.fruits,
        totalPrice: count * smallestPack.price
      });
      remaining -= count * smallestPack.fruits;
    }
  }
  
  // 计算总花费和总获得的人参果
  const totalCost = packsToBuy.reduce((sum, pack) => sum + pack.totalPrice, 0);
  const totalFruits = packsToBuy.reduce((sum, pack) => sum + pack.totalFruits, 0);
  
  return { packsToBuy, totalCost, totalFruits };
};

// 处理计算逻辑
const handleCalculate = () => {
  errorMessage.value = '';
  showResult.value = false;
  
  // 验证输入
  if (currentLevel.value < 1 || targetLevel.value < 1 || daysLeft.value < 1) {
    errorMessage.value = '等级和剩余天数必须大于0';
    return;
  }
  
  if (currentExp.value < 0 || targetExp.value < 0) {
    errorMessage.value = '经验值不能为负数';
    return;
  }
  
  if (targetLevel.value < currentLevel.value) {
    errorMessage.value = '目标等级不能低于当前等级';
    return;
  }
  
  if (targetLevel.value === currentLevel.value && targetExp.value <= currentExp.value) {
    errorMessage.value = '目标经验不能小于或等于当前经验（同一等级时）';
    return;
  }
  
  // 检查当前经验是否超过当前等级的最大经验
  const currentLevelMaxExp = getLevelExp(currentLevel.value);
  if (currentExp.value > currentLevelMaxExp) {
    errorMessage.value = `当前经验不能超过${currentLevel.value}级的最大经验(${currentLevelMaxExp}点)`;
    return;
  }
  
  // 检查目标经验是否超过目标等级的最大经验
  const targetLevelMaxExp = getLevelExp(targetLevel.value);
  if (targetExp.value > targetLevelMaxExp) {
    errorMessage.value = `目标经验不能超过${targetLevel.value}级的最大经验(${targetLevelMaxExp}点)`;
    return;
  }
  
  // 计算所需总经验
  const { totalExp, levelDetails: details } = calculateTotalExpNeeded();
  
  // 如果不需要经验
  if (totalExp === 0) {
    errorMessage.value = '当前状态已满足或超过目标状态，无需额外经验';
    return;
  }
  
  // 计算人参果需求
  const { totalFruitsNeeded: fruitsNeeded, freeFruits: free, fruitsToBuy: toBuy, dailyFreeFruits: daily } = calculateFruitsToBuy(totalExp);
  
  // 更新dailyFreeFruits响应式变量
  dailyFreeFruits.value = daily;
  
  // 计算最优礼包方案
  const { packsToBuy: packs, totalCost: cost, totalFruits } = calculateOptimalPacks(toBuy);
  
  // 更新结果
  totalExpNeeded.value = totalExp;
  totalFruitsNeeded.value = fruitsNeeded;
  fruitsToBuy.value = toBuy;
  freeFruits.value = free;
  totalCost.value = cost;
  totalFruitsFromPacks.value = totalFruits;
  packsToBuy.value = packs;
  levelDetails.value = details;
  
  showResult.value = true;
};
</script>
