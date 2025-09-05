<template>
  <div class="mt-8 bg-white rounded-2xl p-6 card-shadow">
    <h3 class="text-lg font-bold mb-4 flex items-center">
      <i class="fa fa-info-circle text-primary mr-2"></i>
      计算规则说明
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
      <div>
        <h4 class="font-medium text-gray-800 mb-2">等级经验规则</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li>1到100级：每级经验相差50，1级经验是250</li>
          <li>101级及以上：每级经验相差48，101级升级经验是5248</li>
        </ul>
      </div>
      <div>
        <h4 class="font-medium text-gray-800 mb-2">人参果与礼包规则</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li>6元礼包：1000人参果，每天限购3次（性价比最高）</li>
          <li>30元礼包：4500人参果，每天限购3次</li>
          <li>328元礼包：35000人参果，每天限购3次（性价比最低）</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.1);
}
</style>
