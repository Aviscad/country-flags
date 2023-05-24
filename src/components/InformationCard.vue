<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
//const props = defineProps(['info'])
const emit = defineEmits(['close'])
//const router = useRouter()
const route = useRoute()

console.log(route.params.name)

const dialog = ref(null)

document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')

const close = () => {
  document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
  emit('close', false)
}

onMounted(() => {
  dialog.value.focus()
})
</script>
<template>
  <!-- Modal gets lost when scrolling -->
  <div
    class="fixed left-0 bottom-0 top-[60px] h-full w-full bg-slate-200 z-10 p-5 outline-none"
    tabindex="0"
    ref="dialog"
    role="dialog"
    aria-hidden="true"
    @keydown.esc="close"
    @keydown.delete="close"
  >
    <button @click="close" class="border border-gray-500 rounded-md px-2">Back</button>
    <div class="flex flex-col items-center justify-center">
      {{ route.params.name }}
      <!-- <img
        class="object-cover h-52 w-full"
        :src="props.info.flags.svg && props.info.flags.png"
        :alt="props.info.flags.alt && `Image of the flag of ${props.info.name.common}`"
      />
    </div><h3>{{ props.info.name.common }}</h3> -->
    </div>
  </div>
</template>
