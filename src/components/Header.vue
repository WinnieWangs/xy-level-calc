<template>
  <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white">
          <i class="fa fa-line-chart text-xl"></i>
        </div>
        <h1 class="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">等级升级计算器</h1>
      </div>
      <div class="text-sm text-gray-500 flex items-center gap-2">
        <i class="fa fa-info-circle text-primary"></i>
        <span>精准计算升级所需资源与最优购买方案</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}
</style>
