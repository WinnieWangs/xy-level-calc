<template>
  <div class="bg-white rounded-2xl p-6 md:p-8 card-shadow h-full">
    <h3 class="text-xl font-bold mb-6 pb-3 border-b border-gray-100">
      <i class="fa fa-bar-chart text-primary mr-2"></i>计算结果
    </h3>
    
    <!-- 初始提示 -->
    <div v-if="showInitial" class="py-12 text-center text-gray-500">
      <div class="w-16 h-16 mx-auto mb-4 text-gray-300">
        <i class="fa fa-calculator text-4xl"></i>
      </div>
      <p>请输入信息并点击计算按钮获取结果</p>
    </div>
    
    <!-- 结果展示 - 确保v-if条件正确 -->
    <div v-else class="space-y-6 animate-fadeIn">
      <!-- 总览卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <h4 class="text-sm text-gray-500 mb-1">所需总经验</h4>
          <div class="text-2xl font-bold text-primary">{{ totalExpNeeded.toLocaleString() }}</div>
        </div>
        <div class="p-4 bg-green-50 rounded-xl border border-green-100">
          <h4 class="text-sm text-gray-500 mb-1">所需人参果总数</h4>
          <div class="text-2xl font-bold text-secondary">{{ totalFruitsNeeded.toLocaleString() }}</div>
        </div>
        <div class="p-4 bg-orange-50 rounded-xl border border-orange-100">
          <h4 class="text-sm text-gray-500 mb-1">需额外购买人参果</h4>
          <div class="text-2xl font-bold text-accent">{{ fruitsToBuy.toLocaleString() }}</div>
        </div>
      </div>
      
      <!-- 每日可获得 -->
      <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6">
        <h4 class="font-medium mb-3 flex items-center">
          <i class="fa fa-calendar-check-o text-primary mr-2"></i>
          活动期间可获得的人参果
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">每日可领取:</span>
            <span class="font-medium">{{ dailyFreeFruits.toLocaleString() }} 个</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">活动剩余天数:</span>
            <span class="font-medium">{{ daysLeft }} 天</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">总计可领取:</span>
            <span class="font-medium text-secondary">{{ freeFruits.toLocaleString() }} 个</span>
          </div>
        </div>
      </div>
      
      <!-- 礼包购买建议 -->
      <div>
        <h4 class="font-medium mb-4 flex items-center">
          <i class="fa fa-shopping-cart text-primary mr-2"></i>
          推荐礼包购买方案
        </h4>
        <div class="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 mb-4">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium">预计总花费</span>
            <span class="text-xl font-bold text-primary">¥{{ totalCost.toLocaleString() }}</span>
          </div>
          <div class="text-sm text-gray-600 mb-3">可获得 <span class="font-medium">{{ totalFruitsFromPacks.toLocaleString() }}</span> 个人参果</div>
        </div>
        
        <div class="space-y-3 max-h-60 overflow-y-auto pr-2">
          <template v-if="packsToBuy.length > 0">
            <div v-for="(pack, index) in packsToBuy" :key="index" class="p-3 bg-white rounded-lg border border-gray-100 flex justify-between items-center">
              <div>
                <div class="font-medium">¥{{ pack.price }} 礼包 × {{ pack.count }}</div>
                <div class="text-sm text-gray-500">{{ pack.fruits.toLocaleString() }} 人参果/个</div>
              </div>
              <div class="text-right">
                <div class="font-medium text-primary">{{ pack.totalFruits.toLocaleString() }} 人参果</div>
                <div class="text-sm text-gray-500">¥{{ pack.totalPrice }}</div>
              </div>
            </div>
          </template>
          <template v-else>
            <p class="text-gray-500 text-center py-4">无需购买任何礼包，每日领取的人参果已足够</p>
          </template>
        </div>
      </div>
      
      <!-- 等级经验明细 -->
      <div class="mt-6 text-sm">
        <details class="group">
          <summary class="flex items-center cursor-pointer font-medium text-gray-700">
            <i class="fa fa-list-ul mr-2 text-primary"></i>
            查看等级经验明细
            <i class="fa fa-chevron-down ml-2 text-xs transition-transform duration-300 group-open:rotate-180"></i>
          </summary>
          <div class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-2 max-h-60 overflow-y-auto">
            <div v-for="(detail, index) in levelDetails" :key="index" class="py-2 border-b border-gray-200 last:border-0">
              <div class="flex justify-between items-center">
                <span>
                  <template v-if="detail.fromLevel === detail.toLevel">
                    {{ detail.fromLevel }}级 达到 {{ detail.expNeeded }} 经验
                  </template>
                  <template v-else>
                    {{ detail.fromLevel }} → {{ detail.toLevel }}级
                  </template>
                </span>
                <span class="font-medium text-primary">{{ detail.expNeeded.toLocaleString() }} 经验</span>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义props，确保所有必要属性都被正确传递
const props = defineProps({
  showInitial: { type: Boolean, default: true },
  totalExpNeeded: { type: Number, default: 0 },
  totalFruitsNeeded: { type: Number, default: 0 },
  fruitsToBuy: { type: Number, default: 0 },
  daysLeft: { type: Number, default: 0 },
  freeFruits: { type: Number, default: 0 },
  totalCost: { type: Number, default: 0 },
  totalFruitsFromPacks: { type: Number, default: 0 },
  packsToBuy: { type: Array, default: () => [] },
  levelDetails: { type: Array, default: () => [] },
  dailyFreeFruits: { type: Number, default: 0 }
});
</script>
