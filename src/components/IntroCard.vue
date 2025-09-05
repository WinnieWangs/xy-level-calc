<template>
  <div class="bg-white rounded-2xl p-6 mb-8 card-shadow">
    <div class="flex flex-col md:flex-row gap-6 items-center">
      <div class="flex-1">
        <h2 class="text-2xl font-bold mb-3 text-dark">快速计算升级需求</h2>
        <p class="text-gray-600 mb-4">输入您的当前等级、经验值、目标等级和活动剩余天数，系统将为您计算所需的人参果数量及最优礼包购买方案。</p>
        <div class="flex flex-wrap gap-3">
          <div class="flex items-center gap-1 text-sm text-gray-600">
            <i class="fa fa-check-circle text-secondary"></i>
            <span>自动计算各级所需经验</span>
          </div>
          <div class="flex items-center gap-1 text-sm text-gray-600">
            <i class="fa fa-check-circle text-secondary"></i>
            <span>智能推荐礼包组合</span>
          </div>
          <div class="flex items-center gap-1 text-sm text-gray-600">
            <i class="fa fa-check-circle text-secondary"></i>
            <span>考虑每日可领取资源</span>
          </div>
        </div>
      </div>
      <div class="w-full md:w-40 h-40 flex items-center justify-center">
        <div class="relative w-32 h-32 animate-pulse-slow">
          <img src="https://picsum.photos/seed/fruit/200/200" alt="人参果图标" class="w-full h-full object-contain rounded-full">
          <div class="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
            +10
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.1);
}
</style>
