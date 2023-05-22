<script setup>
const props = defineProps(['info'])
const emit = defineEmits(['close'])

document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')

const close = () => {
  document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
  emit('close', false)
}
</script>
<template>
  <div @click="close" class="fixed top-0 left-0 text-yellow-300 h-full w-full bg-green-200 z-10">
    {{ props.info.name.common }}
  </div>
</template>
