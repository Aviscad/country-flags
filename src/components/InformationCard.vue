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
  <div class="fixed top-0 left-0 h-full w-full bg-slate-200 z-10 p-5">
    <button @click="close" class="border border-gray-500 rounded-md px-2">Back</button>
    <div>
      <h3>{{ props.info.name.common }}</h3>
      <img
        class="object-cover w-[250px] h-40"
        :src="props.info.flags.svg && props.info.flags.png"
        :alt="props.info.flags.alt && `Image of the flag of ${props.info.name.common}`"
      />
    </div>
  </div>
</template>
