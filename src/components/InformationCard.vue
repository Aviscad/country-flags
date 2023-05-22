<script setup>
const props = defineProps(['info'])
defineEmits(['close'])
</script>
<template>
  <div
    @click="$emit('close', false)"
    class="absolute top-0 left-0 text-yellow-300 h-screen w-screen bg-green-200 z-10"
  >
    {{ props.info.name.common }}
  </div>
</template>
