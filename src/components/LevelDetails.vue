<template>
  <div class="mt-6 text-sm">
    <details class="group">
      <summary class="flex items-center cursor-pointer font-medium text-gray-700">
        <i class="fa fa-list-ul mr-2 text-primary"></i>
        查看等级经验明细
        <i class="fa fa-chevron-down ml-2 text-xs transition-transform duration-300 group-open:rotate-180"></i>
      </summary>
      <div class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-2 max-h-60 overflow-y-auto">
        <template v-for="(detail, index) in levelDetails" :key="index">
          <div class="py-2 border-b border-gray-200 last:border-0">
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
        </template>
      </div>
    </details>
  </div>
</template>

<script setup>
const props = defineProps({
  levelDetails: { type: Array, default: () => [] }
});
</script>
