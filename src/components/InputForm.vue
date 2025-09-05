<template>
  <div class="bg-white rounded-2xl p-6 md:p-8 card-shadow h-full">
    <h3 class="text-xl font-bold mb-6 pb-3 border-b border-gray-100">
      <i class="fa fa-pencil-square-o text-primary mr-2"></i>输入信息
    </h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="space-y-2">
        <label for="currentLevel" class="block text-sm font-medium text-gray-700">
          当前等级
        </label>
        <input 
          type="number" 
          id="currentLevel" 
          min="1" 
          :value="currentLevel"
          @input="$emit('update:currentLevel', parseInt($event.target.value) || 1)"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 input-focus transition-all"
          required
        >
      </div>
      
      <div class="space-y-2">
        <label for="currentExp" class="block text-sm font-medium text-gray-700">
          当前等级已获得经验
        </label>
        <input 
          type="number" 
          id="currentExp" 
          min="0" 
          :value="currentExp"
          @input="$emit('update:currentExp', parseInt($event.target.value) || 0)"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 input-focus transition-all"
          required
        >
      </div>
      
      <div class="space-y-2">
        <label for="targetLevel" class="block text-sm font-medium text-gray-700">
          目标等级
        </label>
        <input 
          type="number" 
          id="targetLevel" 
          min="1" 
          :value="targetLevel"
          @input="$emit('update:targetLevel', parseInt($event.target.value) || 1)"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 input-focus transition-all"
          required
        >
      </div>
      
      <div class="space-y-2">
        <label for="targetExp" class="block text-sm font-medium text-gray-700">
          目标等级需要达到的经验
        </label>
        <input 
          type="number" 
          id="targetExp" 
          min="0" 
          :value="targetExp"
          @input="$emit('update:targetExp', parseInt($event.target.value) || 0)"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 input-focus transition-all"
          required
        >
      </div>
      
      <div class="space-y-2">
        <label for="daysLeft" class="block text-sm font-medium text-gray-700">
          距离活动结束天数
        </label>
        <input 
          type="number" 
          id="daysLeft" 
          min="1" 
          :value="daysLeft"
          @input="$emit('update:daysLeft', parseInt($event.target.value) || 1)"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 input-focus transition-all"
          required
        >
      </div>
      
      <div class="flex items-center space-x-4">
        <span class="block text-sm font-medium text-gray-700">
          是否有通行证
        </span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            :checked="hasPass"
            @change="$emit('update:hasPass', $event.target.checked)"
            class="sr-only"
          >
          <div class="w-14 h-7 bg-gray-300 rounded-full transition-colors duration-300 ease-in-out" 
               :class="{ 'bg-primary': hasPass }">
            <div class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ml-1.5 mt-1"
                 :class="{ 'translate-x-7': hasPass }"></div>
          </div>
        </label>
      </div>
      
      <div class="space-y-2">
        <label for="expPerAdventure" class="block text-sm font-medium text-gray-700">
          单次历练获得人参果个数
        </label>
        <input 
          type="number" 
          id="expPerAdventure" 
          min="0" 
          :value="expPerAdventure"
          @input="$emit('update:expPerAdventure', parseInt($event.target.value) || 0)"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 input-focus transition-all"
          required
        >
      </div>
      
      <button 
        type="submit" 
        class="w-full gradient-bg text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 btn-hover mt-4"
      >
        <i class="fa fa-calculator"></i>
        <span>计算升级需求</span>
      </button>
    </form>
    
    <!-- 错误提示 -->
    <div v-if="errorMessage" class="mt-4 text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-100">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>

// 定义接收的props
const props = defineProps({
  currentLevel: {
    type: Number,
    required: true
  },
  currentExp: {
    type: Number,
    required: true
  },
  targetLevel: {
    type: Number,
    required: true
  },
  targetExp: {
    type: Number,
    required: true
  },
  daysLeft: {
    type: Number,
    required: true
  },
  hasPass: {
    type: Boolean,
    required: true
  },
  expPerAdventure: {
    type: Number,
    required: true
  },
  errorMessage: {
    type: String,
    default: ''
  }
});

// 定义要触发的事件
const emit = defineEmits([
  'update:currentLevel',
  'update:currentExp',
  'update:targetLevel',
  'update:targetExp',
  'update:daysLeft',
  'update:hasPass',
  'update:expPerAdventure',
  'calculate'
]);

// 处理表单提交
const handleSubmit = () => {
  emit('calculate');
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}
</style>
